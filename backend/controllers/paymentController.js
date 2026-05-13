import stripe from "../config/stripe.js";

import Booking from "../models/Booking.js";

import Payment from "../models/Payment.js";

import { sendBookingEmail }
from "../utils/sendBookingEmail.js";



export const createStripeCheckout =
  async (req, res) => {
    try {
      const { bookingId } =
        req.body;

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

      const session =
        await stripe.checkout.sessions.create(
          {
            payment_method_types:
              ["card"],

            mode: "payment",

            customer_email:
              booking.buyer.email,

            line_items: [
              {
                price_data: {
                  currency: "usd",

                  product_data: {
                    name:
                      booking.trip
                        .title,
                  },

                  unit_amount:
                    booking.totalAmount *
                    100,
                },

                quantity: 1,
              },
            ],

            success_url:
              `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url:
              `${process.env.CLIENT_URL}/payment-failed`,

            metadata: {
              bookingId:
                booking._id.toString(),
            },
          }
        );

      booking.stripeSessionId =
        session.id;

      await booking.save();

      await Payment.create({
        bookingId:
          booking._id,

        amount:
          booking.totalAmount,

        method: "stripe",

        stripeSessionId:
          session.id,

        status: "pending",
      });

      res.json({
        url: session.url,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };


