import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import { v4 as uuidv4 } from "uuid";

export const createCheckout =
  async (req, res) => {
    try {
      const { bookingId } = req.body;

      const booking =
        await Booking.findById(
          bookingId
        ).populate("trip");

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      const transactionId =
        uuidv4();

      await Payment.create({
        bookingId: booking._id,
        amount: booking.totalAmount,
        method: "card",
        transactionId,
        status: "pending",
      });

      /*
        Normally here you redirect
        to Himalayan Bank / Nabil /
        Nepal Payment Gateway
      */

      const fakeGatewayUrl =
        `${process.env.CLIENT_URL}/payment-success?bookingId=${booking._id}&transactionId=${transactionId}`;

      res.json({
        paymentUrl: fakeGatewayUrl,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };