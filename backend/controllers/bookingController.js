import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const {
      tripId,
      buyer,
      participants,
      numberOfPeople,
      travelDate,
    } = req.body;

    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    const selectedDate = trip.availableDates.find(
      (d) =>
        new Date(d.date).toISOString().split("T")[0] === travelDate
    );

    if (!selectedDate) {
      return res.status(400).json({
        message: "Date unavailable",
      });
    }

    const remainingSeats =
      selectedDate.totalSeats - selectedDate.bookedSeats;

    if (numberOfPeople > remainingSeats) {
      return res.status(400).json({
        message: "Not enough seats",
      });
    }

    const totalAmount = trip.price * numberOfPeople;

    const booking = await Booking.create({
      trip: tripId,
      buyer,
      participants,
      numberOfPeople,
      travelDate,
      totalAmount,
      paymentStatus: "pending",
      bookingStatus: "pending",
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET BOOKED DATES
export const getBookedDates = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.json(trip.availableDates);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ADMIN FUNCTIONS (placeholders if not built yet)
export const getAllBookings = async (req, res) => {
  res.json({ message: "getAllBookings not implemented yet" });
};

export const uploadSlip = async (req, res) => {
  res.json({ message: "uploadSlip not implemented yet" });
};

export const verifyBooking = async (req, res) => {
  res.json({ message: "verifyBooking not implemented yet" });
};

export const updateBookingStatus = async (req, res) => {
  res.json({ message: "updateBookingStatus not implemented yet" });
};