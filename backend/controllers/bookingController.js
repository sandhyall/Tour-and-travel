import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";
import cloudinary from "../config/cloudinary.js";
import { sendBookingEmail } from "../utils/sendBookingEmail.js";


const generateInvoiceNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `INV-${timestamp}-${random}`;
};


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
      paymentMethod, 
    } = req.body;

    // 1. Fetch trip
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    
    const inputDate = new Date(travelDate);
    const inputDateStr = inputDate.toISOString().split("T")[0];

    const selectedDate = trip.availableDates.find(
      (d) => new Date(d.date).toISOString().split("T")[0] === inputDateStr,
    );

    if (!selectedDate) {
      return res.status(400).json({ message: "Selected date is unavailable" });
    }

   
    const seatsRemaining = selectedDate.totalSeats - selectedDate.bookedSeats;
    if (numberOfPeople > seatsRemaining) {
      return res.status(400).json({
        message: `Only ${seatsRemaining} seat(s) remaining for this date`,
      });
    }

  
    selectedDate.bookedSeats += numberOfPeople;
    if (selectedDate.bookedSeats >= selectedDate.totalSeats) {
      selectedDate.status = "full";
    } else if (selectedDate.bookedSeats / selectedDate.totalSeats >= 0.8) {
      selectedDate.status = "limited";
    }
    await trip.save();

   
    const booking = await Booking.create({
      trip: tripId,
      buyer,
      participants,
      numberOfPeople,
      travelDate: inputDate,
      packageName,
      packagePrice,
      paymentMethod: paymentMethod ?? "card",
      totalAmount: (packagePrice || trip.price) * numberOfPeople,
      bookingStatus: "pending",
      invoiceNumber: generateInvoiceNumber(),
    });

   
    sendBookingEmail({
      to: buyer.email,
      type: "pending",
      booking: {
        ...booking.toObject(),
        trip: { title: trip.title },
        paymentMethod: paymentMethod ?? "card",
      },
    }).catch((emailErr) =>
      console.error("Pending booking email failed:", emailErr.message),
    );

    res.status(201).json(booking);
  } catch (err) {
    console.error("createBooking error:", err);
    res.status(400).json({ message: err.message });
  }
};


export const uploadSlip = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

   
    if (booking.buyer.email !== req.user?.email && req.user?.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorised to update this booking" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No slip file provided" });
    }

    let uploadResult;

    if (req.file.path) {
      uploadResult = {
        secure_url: req.file.path,
        public_id: req.file.filename,
      };
    } else if (req.file.buffer) {
      uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "bank_slips", resource_type: "auto" },
          (error, result) => (error ? reject(error) : resolve(result)),
        );
        stream.end(req.file.buffer);
      });
    } else {
      return res.status(500).json({ message: "File storage misconfiguration" });
    }

    booking.bankSlip = {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };

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


export const verifyBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "trip",
      "title",
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.bookingStatus = "confirmed";
    booking.verifiedAt = new Date();
    booking.verifiedBy = req.user?._id ?? null;

    await booking.save();

    sendBookingEmail({
      to: booking.buyer.email,
      type: "confirmed",
      booking,
    }).catch((emailErr) =>
      console.error("Confirmation email failed:", emailErr.message),
    );

    res.json({ message: "Booking verified and confirmed", booking });
  } catch (err) {
    console.error("verifyBooking error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const getAllBookings = async (req, res) => {
  try {
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


export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["pending", "confirmed", "cancelled"];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Allowed values: ${allowed.join(", ")}`,
      });
    }

    const booking = await Booking.findById(req.params.id).populate(
      "trip",
      "title",
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const previousStatus = booking.bookingStatus;
    booking.bookingStatus = status;

   
    if (status === "cancelled" && previousStatus !== "cancelled") {
      const trip = await Trip.findById(booking.trip._id ?? booking.trip);
      if (trip) {
        const dateEntry = trip.availableDates.find(
          (d) =>
            new Date(d.date).toISOString().split("T")[0] ===
            new Date(booking.travelDate).toISOString().split("T")[0],
        );
        if (dateEntry) {
          dateEntry.bookedSeats = Math.max(
            0,
            dateEntry.bookedSeats - booking.numberOfPeople,
          );
          if (dateEntry.status === "full" || dateEntry.status === "limited") {
            dateEntry.status = "available";
          }
          await trip.save();
        }
      }
    }

    await booking.save();

    sendBookingEmail({
      to: booking.buyer.email,
      type: status,
      booking,
    }).catch((err) =>
      console.error(`Status email (${status}) failed:`, err.message),
    );

    res.json({ message: `Booking status updated to "${status}"`, booking });
  } catch (err) {
    console.error("updateBookingStatus error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const getBookedDates = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId).select(
      "availableDates",
    );
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.json(trip.availableDates);
  } catch (err) {
    console.error("getBookedDates error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const resendPendingEmails = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (bookingId) {
      const booking = await Booking.findById(bookingId).populate(
        "trip",
        "title",
      );
      if (!booking)
        return res.status(404).json({ message: "Booking not found" });

      await sendBookingEmail({
        to: booking.buyer.email,
        type: booking.bookingStatus,
        booking,
      });

      return res.json({ message: "Email resent", sent: 1 });
    }

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
        await new Promise((r) => setTimeout(r, 200));
      } catch (emailErr) {
        console.error(
          `Email failed for booking ${booking._id}:`,
          emailErr.message,
        );
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
