import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";

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
    } = req.body;

    const trip =
      await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    // FIND SELECTED DATE
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

    // PREVENT OVERBOOKING
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

        paymentStatus:
          "pending",

        bookingStatus:
          "pending",
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