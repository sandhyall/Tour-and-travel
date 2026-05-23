import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";
import cloudinary from "../config/cloudinary.js"; 
import { sendBookingEmail } from "../utils/sendBookingEmail.js"; 

import Payment from "../models/Payment.js";


// ─────────────────────────────────────────────
// HELPER: generate invoice number
// ─────────────────────────────────────────────
const generateInvoiceNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `INV-${timestamp}-${random}`;
};

// ─────────────────────────────────────────────
// CREATE BOOKING
// POST /api/bookings
// ─────────────────────────────────────────────
export const createBooking = async (req, res) => {
  try {
    const {
      tripId,
      buyer,
      participants,
      numberOfPeople,
      travelDate,
      packageName,
      packagePrice,
    } = req.body;

    // 1. Fetch trip
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // 2. Match travel date (compare YYYY-MM-DD strings to avoid TZ drift)
    const inputDate = new Date(travelDate);
    const inputDateStr = inputDate.toISOString().split("T")[0];

    const selectedDate = trip.availableDates.find(
      (d) => new Date(d.date).toISOString().split("T")[0] === inputDateStr
    );

    if (!selectedDate) {
      return res.status(400).json({ message: "Selected date is unavailable" });
    }

    // 3. Seat availability check
    const seatsRemaining = selectedDate.totalSeats - selectedDate.bookedSeats;
    if (numberOfPeople > seatsRemaining) {
      return res.status(400).json({
        message: `Only ${seatsRemaining} seat(s) remaining for this date`,
      });
    }

    // 4. Reserve seats immediately (prevent double-booking under concurrent requests)
    selectedDate.bookedSeats += numberOfPeople;
    if (selectedDate.bookedSeats >= selectedDate.totalSeats) {
      selectedDate.status = "full";
    } else if (selectedDate.bookedSeats / selectedDate.totalSeats >= 0.8) {
      selectedDate.status = "limited";
    }
    await trip.save();

    // 5. Create booking with a unique invoice number
    const booking = await Booking.create({
      trip: tripId,
      buyer,
      participants,
      numberOfPeople,
      travelDate: inputDate,
      packageName, 
      packagePrice, 
      totalAmount: (packagePrice || trip.price) * numberOfPeople,
      bookingStatus: "pending",
      invoiceNumber: generateInvoiceNumber(),
      // packageName stored via custom field — add to schema if needed
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("createBooking error:", err);
    res.status(400).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────
// UPLOAD BANK SLIP
// POST /api/bookings/:id/slip
// Middleware: upload.single("slip")
// ─────────────────────────────────────────────
export const uploadSlip = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Ensure the authenticated user owns this booking
    if (booking.buyer.email !== req.user?.email && req.user?.role !== "admin") {
      return res.status(403).json({ message: "Not authorised to update this booking" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No slip file provided" });
    }

    // Upload to Cloudinary (multer-storage-cloudinary populates req.file.path/filename,
    // OR plain multer populates req.file.buffer — handle both below)
    let uploadResult;

    if (req.file.path) {
      // multer-storage-cloudinary: file already on cloud, path = secure_url
      uploadResult = { secure_url: req.file.path, public_id: req.file.filename };
    } else if (req.file.buffer) {
      // plain memoryStorage multer: upload buffer manually
      uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "bank_slips", resource_type: "auto" },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(req.file.buffer);
      });
    } else {
      return res.status(500).json({ message: "File storage misconfiguration" });
    }

    // Persist slip URL on booking
    booking.bankSlip = {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
    // Also expose bankSlipUrl as a top-level shortcut used by the admin frontend
    booking.set("bankSlipUrl", uploadResult.secure_url, { strict: false });

    await booking.save();

    res.json({
      message: "Bank slip uploaded successfully",
      bankSlipUrl: uploadResult.secure_url,
      booking,
    });
  } catch (err) {
    console.error("uploadSlip error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────
// VERIFY BOOKING (admin manual verification)
// PUT /api/bookings/:id/verify
// ─────────────────────────────────────────────
export const verifyBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("trip", "title");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Mark as confirmed and record who verified & when
    booking.bookingStatus = "confirmed";
    booking.verifiedAt = new Date();
    booking.verifiedBy = req.user?._id ?? null;

    await booking.save();

    // Fire confirmation email (non-blocking — don't fail the response if email fails)
    sendBookingEmail({
      to: booking.buyer.email,
      type: "confirmed",
      booking,
    }).catch((emailErr) =>
      console.error("Confirmation email failed:", emailErr.message)
    );

    res.json({ message: "Booking verified and confirmed", booking });
  } catch (err) {
    console.error("verifyBooking error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────
// GET ALL BOOKINGS (admin)
// GET /api/bookings/all
// ─────────────────────────────────────────────
export const getAllBookings = async (req, res) => {
  try {
    // Optional query filters: ?status=pending&page=1&limit=20
    const { status, page = 1, limit = 50 } = req.query;

    const filter = {};
    if (status) filter.bookingStatus = status;

    const skip = (Number(page) - 1) * Number(limit);

    const [bookings, total] = await Promise.all([
      Booking.find(filter)
        .populate("trip", "title slug country heroImage")
        .populate("successfulPaymentId")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Booking.countDocuments(filter),
    ]);

    res.json({
      bookings,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    console.error("getAllBookings error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────
// UPDATE BOOKING STATUS (admin)
// PUT /api/bookings/:id/status
// Body: { status: "confirmed" | "pending" | "cancelled" }
// ─────────────────────────────────────────────
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["pending", "confirmed", "cancelled"];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Allowed values: ${allowed.join(", ")}`,
      });
    }

    const booking = await Booking.findById(req.params.id).populate("trip", "title");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const previousStatus = booking.bookingStatus;
    booking.bookingStatus = status;

    // If cancelling, release the reserved seats back to the trip
    if (status === "cancelled" && previousStatus !== "cancelled") {
      const trip = await Trip.findById(booking.trip._id ?? booking.trip);
      if (trip) {
        const dateEntry = trip.availableDates.find(
          (d) =>
            new Date(d.date).toISOString().split("T")[0] ===
            new Date(booking.travelDate).toISOString().split("T")[0]
        );
        if (dateEntry) {
          dateEntry.bookedSeats = Math.max(
            0,
            dateEntry.bookedSeats - booking.numberOfPeople
          );
          // Reopen date if it was full/limited
          if (dateEntry.status === "full" || dateEntry.status === "limited") {
            dateEntry.status = "available";
          }
          await trip.save();
        }
      }
    }

    await booking.save();

    // Non-blocking status-change email
    sendBookingEmail({
      to: booking.buyer.email,
      type: status,
      booking,
    }).catch((err) =>
      console.error(`Status email (${status}) failed:`, err.message)
    );

    res.json({ message: `Booking status updated to "${status}"`, booking });
  } catch (err) {
    console.error("updateBookingStatus error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────
// GET BOOKED DATES FOR A TRIP
// GET /api/bookings/trip/:tripId
// ─────────────────────────────────────────────
export const getBookedDates = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId).select("availableDates");
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.json(trip.availableDates);
  } catch (err) {
    console.error("getBookedDates error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────
// RESEND PENDING CONFIRMATION EMAILS (admin utility)
// POST /api/bookings/resend-emails
// Body: { bookingId? } — omit to resend all pending
// ─────────────────────────────────────────────
export const resendPendingEmails = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // If a specific bookingId provided, resend just that one
    if (bookingId) {
      const booking = await Booking.findById(bookingId).populate("trip", "title");
      if (!booking) return res.status(404).json({ message: "Booking not found" });

      await sendBookingEmail({
        to: booking.buyer.email,
        type: booking.bookingStatus,
        booking,
      });

      return res.json({ message: "Email resent", sent: 1 });
    }

    // Otherwise resend to all pending bookings (batch with delay to respect rate limits)
    const pendingBookings = await Booking.find({ bookingStatus: "pending" })
      .populate("trip", "title")
      .lean();

    let sent = 0;
    const failed = [];

    for (const booking of pendingBookings) {
      try {
        await sendBookingEmail({
          to: booking.buyer.email,
          type: "pending",
          booking,
        });
        sent++;
        // Small delay to avoid hitting email provider rate limits
        await new Promise((r) => setTimeout(r, 200));
      } catch (emailErr) {
        console.error(`Email failed for booking ${booking._id}:`, emailErr.message);
        failed.push(booking._id);
      }
    }

    res.json({
      message: `Emails resent: ${sent} sent, ${failed.length} failed`,
      sent,
      failed,
    });
  } catch (err) {
    console.error("resendPendingEmails error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────
// CONFIRM BOOKING + PAYMENT TOGETHER
// PUT /api/bookings/:id/confirm-all
// ─────────────────────────────────────────────


export const confirmBookingAndPayment = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Confirm booking
    booking.bookingStatus = "confirmed";

    // Find existing payment
    let payment = await Payment.findOne({
      bookingId: booking._id,
    });

    // Create payment if not exists
    if (!payment) {
      payment = await Payment.create({
        bookingId: booking._id,
        amount: booking.totalAmount,
        method: "swift_bank_transfer",
        status: "success",
        transactionId: `MANUAL-${Date.now()}`,
      });
    } else {
      payment.status = "success";
      await payment.save();
    }

    // Attach successful payment
    booking.successfulPaymentId = payment._id;

    await booking.save();

    res.json({
      message: "Booking and payment confirmed",
      booking,
      payment,
    });
  } catch (err) {
    console.error("CONFIRM ALL ERROR:");
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};