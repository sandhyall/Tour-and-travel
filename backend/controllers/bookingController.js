import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";
import Payment from "../models/Payment.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import { sendBookingEmail } from "../utils/sendBookingEmail.js";
import { generateTicketPdf } from "../utils/generateTicketPdf.js";

// Helper function to handle buffer-based Cloudinary streaming uploads safely
const uploadBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "bank-slips" },
      { folder: "bank-slips" },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/* ==========================================================================
   CREATE BOOKING
   ========================================================================== */
export const createBooking = async (req, res) => {
  try {
    const {
      tripId,
      buyer,
      participants,
      numberOfPeople,
      travelDate,
      paymentMethod,
    } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // Ensure strict ISO string comparisons across timezones
    const selectedDate = trip.availableDates.find(
      (d) =>
        new Date(d.date).toISOString().slice(0, 10) ===
        new Date(travelDate).toISOString().slice(0, 10)
    );

    if (!selectedDate) {
      return res.status(400).json({ message: "Selected travel date is not available" });
    }

    const remaining = selectedDate.totalSeats - (selectedDate.bookedSeats || 0);
    if (numberOfPeople > remaining) {
      return res.status(400).json({ message: "Not enough seats available for this date" });
    }

    // Fixed: All payment schema adjustments are stripped completely from this operation block
    const totalAmount = trip.price * numberOfPeople;

    // FIX: Generate a random unique invoice number to clear the E11000 null index crash
    const uniqueInvoice = `INV-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const booking = await Booking.create({
      trip: tripId,
      buyer,
      participants,
      numberOfPeople,
      travelDate,
      totalAmount,
      invoiceNumber: uniqueInvoice, // <-- ADDED THIS VARIABLE
    });

    // Enforce 1 Booking = 1 Payment document rule smoothly via upserts
    await Payment.findOneAndUpdate(
      { bookingId: booking._id },
      {
        amount: totalAmount,
        method: paymentMethod || "card",
        status: "pending",
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(booking);
  } catch (err) {
    // Enhanced error catching visibility in console log
    console.error("CREATE BOOKING CONTROLLER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ==========================================================================
   UPLOAD BANK SLIP (SWIFT)
   ========================================================================== */
export const uploadSlip = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (!req.file) return res.status(400).json({ message: "No bank slip file uploaded" });

    let result;
    // Hybrid support for both disk storage (path) and memory storage (buffer)
    if (req.file.path) {
      result = await cloudinary.uploader.upload(req.file.path, { folder: "bank-slips" });
    } else if (req.file.buffer) {
      result = await uploadBuffer(req.file.buffer);
    } else {
      throw new Error("Multer file storage configuration signature is unknown.");
    }

    booking.bankSlip = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    await booking.save();

    // Securely link or override previous payment states with the bank transfer option
    await Payment.findOneAndUpdate(
      { bookingId: booking._id },
      {
        amount: booking.totalAmount,
        method: "swift_bank_transfer",
        status: "pending",
      },
      { upsert: true }
    );

    res.json({ success: true, message: "Bank slip uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ==========================================================================
   VERIFY / CONFIRM BOOKING
   ========================================================================== */
export const verifyBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("trip");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const trip = await Trip.findById(booking.trip._id);
    if (!trip) return res.status(404).json({ message: "Associated Trip record not found" });

    const bookingDate = new Date(booking.travelDate).toISOString().split("T")[0];
    const selectedDate = trip.availableDates.find(
      (d) => new Date(d.date).toISOString().split("T")[0] === bookingDate
    );

    if (!selectedDate) {
      return res.status(400).json({ message: "Matching travel date context not found in trip records" });
    }

    // Update global state tracking values safely
    booking.bookingStatus = "confirmed";
    
    // Process payment verification document state safely 
    const finalPayment = await Payment.findOneAndUpdate(
      { bookingId: booking._id },
      { status: "success" },
      { new: true }
    );

    // Save explicit fast pointer location parameter reference to final successful tracking token
    if (finalPayment) {
      booking.successfulPaymentId = finalPayment._id;
    }

    // Allocate seats cleanly and avoid subdocument save omissions
    selectedDate.bookedSeats = (selectedDate.bookedSeats || 0) + booking.numberOfPeople;
    
    if (selectedDate.bookedSeats >= selectedDate.totalSeats) {
      selectedDate.status = "full";
    }

    trip.markModified("availableDates"); // Forces Mongoose to scan inner array updates perfectly
    await trip.save();

    // PDF generation workflow operations
    const pdfPath = await generateTicketPdf(booking);
    booking.ticketPdf = pdfPath;
    await booking.save();

    // Non-blocking dispatch logic keeps email failures from rolling back structural state
    try {
      await sendBookingEmail({
        email: booking.buyer.email,
        booking,
        pdfPath, // Added payload pointer variable path reference context
      });
    } catch (err) {
      console.error("NON-BLOCKING BACKGROUND DISPATCH EMAIL ERROR:", err);
    }

    return res.json({ success: true, booking });
  } catch (err) {
    console.error("VERIFY CONTROLLER ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};

/* ==========================================================================
   GET ALL BOOKINGS
   ========================================================================== */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("trip")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ==========================================================================
   UPDATE STATUS MANUALLY
   ========================================================================== */
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["pending", "confirmed", "cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid booking status variant" });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.bookingStatus = status;
    await booking.save();

    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ==========================================================================
   GET BOOKED DATES LIST
   ========================================================================== */
export const getBookedDates = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) return res.status(404).json({ message: "Trip details not found" });

    res.json(trip.availableDates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};