import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";

import axios from "axios";

import { v4 as uuidv4 } from "uuid";

/* =========================
   CARD CHECKOUT
========================= */

export const createCheckout =
  async (req, res) => {
    try {
      const { bookingId } =
        req.body;

      const booking =
        await Booking.findById(
          bookingId
        ).populate("trip");

      if (!booking) {
        return res.status(404).json({
          message:
            "Booking not found",
        });
      }

      const transactionId =
        uuidv4();

      await Payment.create({
        bookingId:
          booking._id,

        amount:
          booking.totalAmount,

        method: "card",

        transactionId,

        status: "pending",
      });

      const fakeGatewayUrl =
        `${process.env.CLIENT_URL}/payment-success?bookingId=${booking._id}&transactionId=${transactionId}`;

      res.json({
        paymentUrl:
          fakeGatewayUrl,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

/* =========================
   KHALTI PAYMENT
========================= */

export const createKhaltiPayment =
  async (req, res) => {
    try {
      const { bookingId } =
        req.body;

      const booking =
        await Booking.findById(
          bookingId
        ).populate("trip");

      if (!booking) {
        return res.status(404).json({
          message:
            "Booking not found",
        });
      }

      const response =
        await axios.post(
          "https://a.khalti.com/api/v2/epayment/initiate/",
          {
            return_url:
              `${process.env.CLIENT_URL}/payment-success`,

            website_url:
              process.env.CLIENT_URL,

            amount:
              booking.totalAmount *
              100,

            purchase_order_id:
              booking._id.toString(),

            purchase_order_name:
              booking.trip.title,

            customer_info: {
              name: `${booking.buyer.firstName} ${booking.buyer.lastName}`,

              email:
                booking.buyer.email,
            },
          },
          {
            headers: {
              Authorization:
                `Key ${process.env.KHALTI_SECRET_KEY}`,

              "Content-Type":
                "application/json",
            },
          }
        );

      await Payment.create({
        bookingId:
          booking._id,

        amount:
          booking.totalAmount,

        method: "khalti",

        transactionId:
          uuidv4(),

        status: "pending",
      });

      res.json({
        paymentUrl:
          response.data
            .payment_url,
      });
    } catch (err) {
      console.log(
        "KHALTI ERROR:",
        err.response?.data ||
          err.message
      );

      res.status(500).json({
        message:
          "Khalti payment failed",
      });
    }
  };