// import Booking from "../models/Booking.js";
// import Trip from "../models/Trip.js";
// import cloudinary from "../config/cloudinary.js";
// import { sendBookingEmail } from "../utils/sendBookingEmail.js";


// const generateInvoiceNumber = () => {
//   const timestamp = Date.now().toString(36).toUpperCase();
//   const random = Math.random().toString(36).substring(2, 6).toUpperCase();
//   return `INV-${timestamp}-${random}`;
// };


// export const createBooking = async (req, res) => {
//   try {
//     const {
//       tripId,
//       buyer,
//       participants,
//       numberOfPeople,
//       travelDate,
//       packageName,
//       packagePrice,
//       paymentMethod, 
//     } = req.body;

    
//     const trip = await Trip.findById(tripId);
//     if (!trip) return res.status(404).json({ message: "Trip not found" });

    
//     const inputDate = new Date(travelDate);
//     const inputDateStr = inputDate.toISOString().split("T")[0];

//     const selectedDate = trip.availableDates.find(
//       (d) => new Date(d.date).toISOString().split("T")[0] === inputDateStr,
//     );

//     if (!selectedDate) {
//       return res.status(400).json({ message: "Selected date is unavailable" });
//     }

   
//     const seatsRemaining = selectedDate.totalSeats - selectedDate.bookedSeats;
//     if (numberOfPeople > seatsRemaining) {
//       return res.status(400).json({
//         message: `Only ${seatsRemaining} seat(s) remaining for this date`,
//       });
//     }

  
//     selectedDate.bookedSeats += numberOfPeople;
//     if (selectedDate.bookedSeats >= selectedDate.totalSeats) {
//       selectedDate.status = "full";
//     } else if (selectedDate.bookedSeats / selectedDate.totalSeats >= 0.8) {
//       selectedDate.status = "limited";
//     }
//     await trip.save();

   
//     const booking = await Booking.create({
//       trip: tripId,
//       buyer,
//       participants,
//       numberOfPeople,
//       travelDate: inputDate,
//       packageName,
//       packagePrice,
//       paymentMethod: paymentMethod ?? "card",
//       totalAmount: (packagePrice || trip.price) * numberOfPeople,
//       bookingStatus: "pending",
//       invoiceNumber: generateInvoiceNumber(),
//     });

   
//     sendBookingEmail({
//       to: buyer.email,
//       type: "pending",
//       booking: {
//         ...booking.toObject(),
//         trip: { title: trip.title },
//         paymentMethod: paymentMethod ?? "card",
//       },
//     }).catch((emailErr) =>
//       console.error("Pending booking email failed:", emailErr.message),
//     );

//     res.status(201).json(booking);
//   } catch (err) {
//     console.error("createBooking error:", err);
//     res.status(400).json({ message: err.message });
//   }
// };


// export const uploadSlip = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

   
//     if (booking.buyer.email !== req.user?.email && req.user?.role !== "admin") {
//       return res
//         .status(403)
//         .json({ message: "Not authorised to update this booking" });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: "No slip file provided" });
//     }

//     let uploadResult;

//     if (req.file.path) {
//       uploadResult = {
//         secure_url: req.file.path,
//         public_id: req.file.filename,
//       };
//     } else if (req.file.buffer) {
//       uploadResult = await new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "bank_slips", resource_type: "auto" },
//           (error, result) => (error ? reject(error) : resolve(result)),
//         );
//         stream.end(req.file.buffer);
//       });
//     } else {
//       return res.status(500).json({ message: "File storage misconfiguration" });
//     }

//     booking.bankSlip = {
//       url: uploadResult.secure_url,
//       public_id: uploadResult.public_id,
//     };

//     await booking.save();

//     res.json({
//       message: "Bank slip uploaded successfully",
//       bankSlipUrl: uploadResult.secure_url,
//       booking,
//     });
//   } catch (err) {
//     console.error("uploadSlip error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };


// export const verifyBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id).populate(
//       "trip",
//       "title",
//     );
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     booking.bookingStatus = "confirmed";
//     booking.verifiedAt = new Date();
//     booking.verifiedBy = req.user?._id ?? null;

//     await booking.save();

//     sendBookingEmail({
//       to: booking.buyer.email,
//       type: "confirmed",
//       booking,
//     }).catch((emailErr) =>
//       console.error("Confirmation email failed:", emailErr.message),
//     );

//     res.json({ message: "Booking verified and confirmed", booking });
//   } catch (err) {
//     console.error("verifyBooking error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };


// export const getAllBookings = async (req, res) => {
//   try {
//     const { status, page = 1, limit = 50 } = req.query;

//     const filter = {};
//     if (status) filter.bookingStatus = status;

//     const skip = (Number(page) - 1) * Number(limit);

//     const [bookings, total] = await Promise.all([
//       Booking.find(filter)
//         .populate("trip", "title slug country heroImage")
//         .populate("successfulPaymentId")
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(Number(limit))
//         .lean(),
//       Booking.countDocuments(filter),
//     ]);

//     res.json({
//       bookings,
//       total,
//       page: Number(page),
//       pages: Math.ceil(total / Number(limit)),
//     });
//   } catch (err) {
//     console.error("getAllBookings error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };


// export const updateBookingStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const allowed = ["pending", "confirmed", "cancelled"];

//     if (!allowed.includes(status)) {
//       return res.status(400).json({
//         message: `Invalid status. Allowed values: ${allowed.join(", ")}`,
//       });
//     }

//     const booking = await Booking.findById(req.params.id).populate(
//       "trip",
//       "title",
//     );
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     const previousStatus = booking.bookingStatus;
//     booking.bookingStatus = status;

   
//     if (status === "cancelled" && previousStatus !== "cancelled") {
//       const trip = await Trip.findById(booking.trip._id ?? booking.trip);
//       if (trip) {
//         const dateEntry = trip.availableDates.find(
//           (d) =>
//             new Date(d.date).toISOString().split("T")[0] ===
//             new Date(booking.travelDate).toISOString().split("T")[0],
//         );
//         if (dateEntry) {
//           dateEntry.bookedSeats = Math.max(
//             0,
//             dateEntry.bookedSeats - booking.numberOfPeople,
//           );
//           if (dateEntry.status === "full" || dateEntry.status === "limited") {
//             dateEntry.status = "available";
//           }
//           await trip.save();
//         }
//       }
//     }

//     await booking.save();

//     sendBookingEmail({
//       to: booking.buyer.email,
//       type: status,
//       booking,
//     }).catch((err) =>
//       console.error(`Status email (${status}) failed:`, err.message),
//     );

//     res.json({ message: `Booking status updated to "${status}"`, booking });
//   } catch (err) {
//     console.error("updateBookingStatus error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };


// export const getBookedDates = async (req, res) => {
//   try {
//     const trip = await Trip.findById(req.params.tripId).select(
//       "availableDates",
//     );
//     if (!trip) return res.status(404).json({ message: "Trip not found" });

//     res.json(trip.availableDates);
//   } catch (err) {
//     console.error("getBookedDates error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };


// export const resendPendingEmails = async (req, res) => {
//   try {
//     const { bookingId } = req.body;

//     if (bookingId) {
//       const booking = await Booking.findById(bookingId).populate(
//         "trip",
//         "title",
//       );
//       if (!booking)
//         return res.status(404).json({ message: "Booking not found" });

//       await sendBookingEmail({
//         to: booking.buyer.email,
//         type: booking.bookingStatus,
//         booking,
//       });

//       return res.json({ message: "Email resent", sent: 1 });
//     }

//     const pendingBookings = await Booking.find({ bookingStatus: "pending" })
//       .populate("trip", "title")
//       .lean();

//     let sent = 0;
//     const failed = [];

//     for (const booking of pendingBookings) {
//       try {
//         await sendBookingEmail({
//           to: booking.buyer.email,
//           type: "pending",
//           booking,
//         });
//         sent++;
//         await new Promise((r) => setTimeout(r, 200));
//       } catch (emailErr) {
//         console.error(
//           `Email failed for booking ${booking._id}:`,
//           emailErr.message,
//         );
//         failed.push(booking._id);
//       }
//     }

//     res.json({
//       message: `Emails resent: ${sent} sent, ${failed.length} failed`,
//       sent,
//       failed,
//     });
//   } catch (err) {
//     console.error("resendPendingEmails error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };
import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";
import cloudinary from "../config/cloudinary.js";
import { sendBookingEmail } from "../utils/sendBookingEmail.js";

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
      paymentMethod,          // "card" | "swift_bank_transfer"
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
      paymentMethod: paymentMethod ?? "card",
      totalAmount: (packagePrice || trip.price) * numberOfPeople,
      bookingStatus: "pending",
      invoiceNumber: generateInvoiceNumber(),
    });

    // 6. FIX: Send "pending" confirmation email immediately after booking is created.
    //    Attach trip title manually since the booking doc stores trip as an ObjectId.
    sendBookingEmail({
      to: buyer.email,
      type: "pending",
      booking: {
        ...booking.toObject(),
        trip: { title: trip.title },
        paymentMethod: paymentMethod ?? "card",
      },
    }).catch((emailErr) =>
      console.error("Pending booking email failed:", emailErr.message)
    );

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
          (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(req.file.buffer);
      });
    } else {
      return res
        .status(500)
        .json({ message: "File storage misconfiguration" });
    }

    // Save both shapes so any frontend read works:
    //   b.bankSlip.url       ← preferred (nested object)
    //   b.bankSlipUrl        ← flat convenience field
    booking.bankSlip = {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
    booking.bankSlipUrl = uploadResult.secure_url;

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
// VERIFY BOOKING (admin)
// PUT /api/bookings/:id/verify
// ─────────────────────────────────────────────
export const verifyBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "trip",
      "title"
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.bookingStatus = "confirmed";
    booking.verifiedAt = new Date();
    booking.verifiedBy = req.user?._id ?? null;

    await booking.save();

    // FIX: correct parameter shape — { to, type, booking }
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

    const booking = await Booking.findById(req.params.id).populate(
      "trip",
      "title"
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const previousStatus = booking.bookingStatus;
    booking.bookingStatus = status;

    // Release seats if cancelled
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
          if (
            dateEntry.status === "full" ||
            dateEntry.status === "limited"
          ) {
            dateEntry.status = "available";
          }
          await trip.save();
        }
      }
    }

    await booking.save();

    // FIX: correct parameter shape — { to, type, booking }
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
// GET BOOKED DATES (public)
// GET /api/bookings/trip/:tripId
// ─────────────────────────────────────────────
export const getBookedDates = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId).select(
      "availableDates"
    );
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.json(trip.availableDates);
  } catch (err) {
    console.error("getBookedDates error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────
// RESEND PENDING EMAILS (admin)
// POST /api/bookings/resend-emails
// ─────────────────────────────────────────────
export const resendPendingEmails = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (bookingId) {
      const booking = await Booking.findById(bookingId).populate(
        "trip",
        "title"
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
          emailErr.message
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