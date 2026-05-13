import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },

    amount: Number,

    method: {
      type: String,
      enum: [
        "bank",
        "stripe",
        "khalti",
      ],
    },

    transactionId: String,

    stripeSessionId: String,

    stripePaymentIntentId: String,

    currency: {
      type: String,
      default: "usd",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "success",
        "failed",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Payment",
  paymentSchema
);