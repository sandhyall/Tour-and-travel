import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import Trip from "../models/Trip.js";
import axios from "axios";
import { sendBookingEmail } from "../utils/sendBookingEmail.js";
import { generateTicketPdf } from "../utils/generateTicketPdf.js";

/* ==========================================================================
   CARD PAYMENT CONFIRMATION
   ========================================================================== */
export const confirmCardPayment = async (req, res) => {
  try {
    const { bookingId, transactionId } = req.body;

    // 1. FIND BOOKING
    const booking = await Booking.findById(bookingId).populate("trip");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 2. AVOID DOUBLE PAYMENT (Check the Payment collection, not Booking)
    const existingPayment = await Payment.findOne({ bookingId: booking._id });
    if (existingPayment && existingPayment.status === "success") {
      return res.json({
        success: true,
        message: "Payment already confirmed",
      });
    }

    // 3. UPDATE PAYMENT COLLECTION FIRST
    const payment = await Payment.findOneAndUpdate(
      { bookingId: booking._id },
      {
        status: "success",
        transactionId,
      },
      { upsert: true, new: true }
    );

    // 4. UPDATE BOOKING STATUS & POINTER
    booking.bookingStatus = "confirmed";
    if (payment) {
      booking.successfulPaymentId = payment._id;
    }
    await booking.save();

    // 5. UPDATE SEATS (SAFE WITH MARKMODIFIED)
    const trip = await Trip.findById(booking.trip._id);
    if (trip) {
      const selectedDate = trip.availableDates.find(
        (d) =>
          new Date(d.date).toISOString().slice(0, 10) ===
          new Date(booking.travelDate).toISOString().slice(0, 10)
      );

      if (selectedDate) {
        selectedDate.bookedSeats = (selectedDate.bookedSeats || 0) + booking.numberOfPeople;
        
        if (selectedDate.bookedSeats >= selectedDate.totalSeats) {
          selectedDate.status = "full";
        }

        // CRITICAL: Tells Mongoose to look inside the array so changes are pushed to DB
        trip.markModified("availableDates");
        await trip.save();
      }
    }

    // 6. GENERATE TICKET PDF
    const pdfPath = await generateTicketPdf(booking);
    booking.ticketPdf = pdfPath;
    await booking.save();

    // 7. SEND EMAIL (Non-blocking background dispatch)
    try {
      await sendBookingEmail({
        email: booking.buyer.email,
        booking,
        pdfPath,
      });
    } catch (emailErr) {
      console.error("BACKGROUND EMAIL ERROR:", emailErr.message);
    }

    // 8. RESPONSE
    res.json({
      success: true,
      message: "Payment confirmed successfully",
      booking,
    });
  } catch (err) {
    console.error("CONFIRM CARD PAYMENT ERROR:", err);
    res.status(500).json({
      message: err.message,
    });
  }
};

/* ==========================================================================
   KHALTI PAYMENT VERIFICATION
   ========================================================================== */
export const verifyKhaltiPayment = async (req, res) => {
  try {
    // Khalti returns these parameters via query strings or request body
    const { pidx, status, purchase_order_id } = req.body;

    if (!pidx || status !== "Completed") {
      return res.status(400).json({ 
        message: "Payment was not completed or tracking token is missing." 
      });
    }

    // 1. VERIFY WITH KHALTI SERVERS (The security step)
    const verificationResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const khaltiData = verificationResponse.data;

    // Check if Khalti official logs match a "Completed" successful transaction state
    if (khaltiData.status !== "Completed") {
      return res.status(400).json({ message: "Transaction verification failed on Khalti servers." });
    }

    // 2. FIND AND VALIDATE LINKED BOOKING
    const booking = await Booking.findById(purchase_order_id).populate("trip");
    if (!booking) {
      return res.status(404).json({ message: "Linked booking record not found." });
    }

    // 3. AVOID PROCESSING COPIES
    const existingPayment = await Payment.findOne({ bookingId: booking._id });
    if (existingPayment && existingPayment.status === "success") {
      return res.json({ success: true, message: "Payment already processed previously." });
    }

    // 4. UPDATE PAYMENT DOCUMENT
    const updatedPayment = await Payment.findOneAndUpdate(
      { bookingId: booking._id },
      {
        status: "success",
        transactionId: pidx, 
        metadata: khaltiData, // Logs the complete verification receipt safely inside the map field
      },
      { upsert: true, new: true }
    );

    // 5. CONFIRM BOOKING STATE
    booking.bookingStatus = "confirmed";
    if (updatedPayment) {
      booking.successfulPaymentId = updatedPayment._id;
    }
    await booking.save();

    // 6. ALLOCATE SEATS SAFELY
    const trip = await Trip.findById(booking.trip._id);
    if (trip) {
      const selectedDate = trip.availableDates.find(
        (d) =>
          new Date(d.date).toISOString().slice(0, 10) ===
          new Date(booking.travelDate).toISOString().slice(0, 10)
      );

      if (selectedDate) {
        selectedDate.bookedSeats = (selectedDate.bookedSeats || 0) + booking.numberOfPeople;
        
        if (selectedDate.bookedSeats >= selectedDate.totalSeats) {
          selectedDate.status = "full";
        }

        trip.markModified("availableDates");
        await trip.save();
      }
    }

    // 7. TICKETING & EMAIL DISPATCH
    const pdfPath = await generateTicketPdf(booking);
    booking.ticketPdf = pdfPath;
    await booking.save();

    try {
      await sendBookingEmail({
        email: booking.buyer.email,
        booking,
        pdfPath,
      });
    } catch (emailErr) {
      console.error("BACKGROUND KHALTI NOTIFICATION EMAIL ERROR:", emailErr.message);
    }

    res.json({
      success: true,
      message: "Khalti payment verified and booking confirmed successfully!",
      booking,
    });

  } catch (err) {
    console.error("KHALTI VERIFICATION CONTROLLER ERROR:", err.response?.data || err.message);
    res.status(500).json({ message: "Internal server validation processing failure." });
  }
};