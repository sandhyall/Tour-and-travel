import stripe from "../config/stripe.js";

import Booking from "../models/Booking.js";

import Payment from "../models/Payment.js";

import Trip from "../models/Trip.js";

import {
  sendBookingEmail,
} from "../utils/sendBookingEmail.js";

import {
  generateTicketPdf,
} from "../utils/generateTicketPdf.js";

export const stripeWebhook =
  async (req, res) => {
    const sig =
      req.headers[
        "stripe-signature"
      ];

    let event;

    try {
      event =
        stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env
            .STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
      return res
        .status(400)
        .send(
          `Webhook Error: ${err.message}`
        );
    }

    // PAYMENT SUCCESS
    if (
      event.type ===
      "checkout.session.completed"
    ) {
      const session =
        event.data.object;

      const bookingId =
        session.metadata.bookingId;

      const booking =
        await Booking.findById(
          bookingId
        ).populate("trip");

      if (!booking) {
        return res.status(404)
          .json({
            message:
              "Booking not found",
          });
      }

      if (
  booking.paymentStatus ===
  "paid"
) {

  return res.json({
    alreadyProcessed: true
  });
}

      // UPDATE BOOKING
      booking.paymentStatus =
        "paid";

      booking.bookingStatus =
        "confirmed";

      booking.stripePaymentIntentId =
        session.payment_intent;

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

      // UPDATE PAYMENT
      await Payment.findOneAndUpdate(
        {
          bookingId:
            booking._id,
        },
        {
          status: "success",

          stripePaymentIntentId:
            session.payment_intent,
        }
      );

      // GENERATE PDF
      const pdfPath =
        await generateTicketPdf(
          booking
        );

      booking.ticketPdf =
        pdfPath;

      await booking.save();

      // SEND EMAIL
      await sendBookingEmail(
        booking,
        pdfPath
      );
    }

    res.json({
      received: true,
    });
  };