import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";
import Payment from "../models/Payment.js";


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

    const selectedDate =
      trip.availableDates.find(
        (d) =>
          new Date(d.date)
            .toISOString()
            .split("T")[0] ===
          travelDate
      );

    if (!selectedDate) {
      return res.status(400).json({
        message:
          "Date unavailable",
      });
    }

    const remainingSeats =
      selectedDate.totalSeats -
      selectedDate.bookedSeats;

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

      booking.paymentSlip =
        req.file.path;

      await booking.save();

      await Payment.create({
        bookingId: booking._id,
        amount: booking.totalAmount,
        method: "bank_transfer",
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

export const verifyBooking =
  async (req, res) => {
    try {
      const booking =
        await Booking.findById(
          req.params.id
        ).populate("trip");

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      booking.paymentStatus =
        "paid";

      booking.bookingStatus =
        "confirmed";

      await booking.save();

      // UPDATE SEATS
      const trip =
        await Trip.findById(
          booking.trip._id
        );

      const selectedDate =
        trip.availableDates.find(
          (d) =>
            new Date(d.date)
              .toISOString()
              .split("T")[0] ===
            new Date(
              booking.travelDate
            )
              .toISOString()
              .split("T")[0]
        );

      if (selectedDate) {
        selectedDate.bookedSeats +=
          booking.numberOfPeople;

        const remaining =
          selectedDate.totalSeats -
          selectedDate.bookedSeats;

        if (remaining <= 0) {
          selectedDate.status =
            "full";
        }
      }

      await trip.save();

      await Payment.findOneAndUpdate(
        {
          bookingId: booking._id,
        },
        {
          status: "success",
        }
      );

      const pdfPath =
        await generateTicketPdf(
          booking
        );

      booking.ticketPdf =
        pdfPath;

      await booking.save();

      await sendBookingEmail(
        booking,
        pdfPath
      );

      res.json({
        success: true,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
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

export const updateBookingStatus =
  async (req, res) => {
    try {
      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {
        return res.status(404)
          .json({
            message:
              "Booking not found",
          });
      }

      booking.paymentStatus =
        req.body.status;

      await booking.save();

      res.json(booking);
    } catch (err) {
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