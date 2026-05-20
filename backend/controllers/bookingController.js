import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";
import Payment from "../models/Payment.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";


import {
  sendBookingEmail,
} from "../utils/sendBookingEmail.js";

import {
  generateTicketPdf,
} from "../utils/generateTicketPdf.js";


export const createBooking = async (
  req,
  res
) => {
  try {
    const {
      tripId,
      buyer,
      participants,
      numberOfPeople,
      travelDate,
      paymentMethod,
    } = req.body;

    const trip =
      await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

const selectedDate = new Date(travelDate).getTime();

const matchedDate = trip.availableDates.find(
  (d) =>
    new Date(d.date).toISOString().split("T")[0] ===
    new Date(travelDate).toISOString().split("T")[0]
);

if (!matchedDate) {
  return res.status(400).json({
    message: "Selected date not available",
  });
}


    // if (!selectedDate) {
    //   return res.status(400).json({
    //     message:
    //       "Date unavailable",
    //   });
    // }

    const remainingSeats =
      matchedDate.totalSeats -
      matchedDate.bookedSeats;

    if (
      numberOfPeople >
      remainingSeats
    ) {
      return res.status(400).json({
        message:
          "Not enough seats",
      });
    }

    const totalAmount =
      trip.price *
      numberOfPeople;

    const booking =
      await Booking.create({
        trip: tripId,
        buyer,
        participants,
        numberOfPeople,
        travelDate,
        totalAmount,

        paymentMethod:
          paymentMethod || "card",

        paymentStatus:
          "pending",

        bookingStatus:
          "pending",
      });

    await Payment.create({
      bookingId: booking._id,

      amount: totalAmount,

      method:
        paymentMethod || "card",

      status: "pending",
    });

    res.status(201).json(
      booking
    );
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const uploadSlip =
  async (req, res) => {
    try {
      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

const result = await cloudinary.uploader.upload(req.file.path);

booking.bankSlip = {
  url: result.secure_url,
  public_id: result.public_id,
};

      await booking.save();

      await Payment.create({
        bookingId: booking._id,
        amount: booking.totalAmount,
        method: "swift_bank_transfer",
        status: "pending",
      });

      res.json({
        success: true,
        message:
          "Slip uploaded successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  const uploadBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream =
      cloudinary.uploader.upload_stream(
        { folder: "bank-slips" },
        (err, result) => {
          if (err) return reject(err);

          resolve(result);
        }
      );

    streamifier
      .createReadStream(buffer)
      .pipe(stream);
  });
};

// export const verifyBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id).populate("trip");

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     booking.paymentStatus = "paid";
//     booking.bookingStatus = "confirmed";
//     await booking.save();

//     const trip = await Trip.findById(booking.trip._id);

//     if (!trip) {
//       return res.status(404).json({ message: "Trip not found" });
//     }

//     const bookingDate = new Date(booking.travelDate)
//       .toISOString()
//       .split("T")[0];

//     const selectedDate = trip.availableDates.find((d) => {
//       return new Date(d.date).toISOString().split("T")[0] === bookingDate;
//     });

//     if (!selectedDate) {
//       return res.status(400).json({
//         message: "Matching travel date not found in trip",
//       });
//     }

//     // SAFE UPDATE (IMPORTANT FIX)
//     selectedDate.bookedSeats =
//       (selectedDate.bookedSeats || 0) + booking.numberOfPeople;

//     const remaining =
//       selectedDate.totalSeats - selectedDate.bookedSeats;

//     if (remaining <= 0) {
//       selectedDate.status = "full";
//     }

//     trip.markModified("availableDates");
//     await trip.save();

//     await Payment.findOneAndUpdate(
//       { bookingId: booking._id },
//       { status: "success" }
//     );

//     const pdfPath = await generateTicketPdf(booking);

//     booking.ticketPdf = pdfPath;
//     await booking.save();

//     await sendBookingEmail(booking, pdfPath);

//     return res.json({ success: true });
//   } catch (err) {
//     console.error("VERIFY ERROR:", err);
//     return res.status(500).json({
//       message: err.message,
//     });
//   }
// };

export const verifyBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("trip");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const trip = await Trip.findById(booking.trip._id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const bookingDate = new Date(booking.travelDate)
      .toISOString()
      .split("T")[0];

    const selectedDate = trip.availableDates.find(
      (d) =>
        new Date(d.date).toISOString().split("T")[0] === bookingDate
    );

    if (!selectedDate) {
      return res.status(400).json({
        message: "Matching travel date not found"
      });
    }

    // update booking
    booking.paymentStatus = "paid";
    booking.bookingStatus = "confirmed";
    await booking.save();

    selectedDate.bookedSeats =
      (selectedDate.bookedSeats || 0) + booking.numberOfPeople;

    await trip.save();

    await Payment.findOneAndUpdate(
      { bookingId: booking._id },
      { status: "success" }
    );

    // PDF
    const pdfPath = await generateTicketPdf(booking);
    booking.ticketPdf = pdfPath;
    await booking.save();

    // EMAIL (IMPORTANT FIX)
    try {
      await sendBookingEmail({
        email: booking.buyer.email,
        booking,
      });
    } catch (err) {
      console.error("EMAIL ERROR:", err);
    }

    return res.json({ success: true });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};
export const getAllBookings =
  async (req, res) => {
    try {
      const bookings =
        await Booking.find()
          .populate("trip")
          .sort({
            createdAt: -1,
          });

      res.json(bookings);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const { status } = req.body;

    const allowedStatuses = ["pending", "confirmed", "cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid booking status",
      });
    }

    booking.bookingStatus = status;

    await booking.save();

    res.json({
      success: true,
      booking,
    });
  } catch (err) {
    console.error("STATUS ERROR:", err);
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getBookedDates =
  async (req, res) => {
    try {
      const trip =
        await Trip.findById(
          req.params.tripId
        );

      if (!trip) {
        return res.status(404)
          .json({
            message:
              "Trip not found",
          });
      }

      res.json(
        trip.availableDates
      );
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };