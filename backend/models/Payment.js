import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: [true, "Payment must be linked to a booking"],
      unique: true, // Prevents duplicate payment documents for a single booking
    },

    // Best Practice: Store amounts as integers in the smallest currency unit 
    // (e.g., Cents for USD, Paisa for NPR) to prevent floating-point math errors.
    amount: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: [0, "Amount cannot be negative"],
    },

    currency: {
      type: String,
      default: "usd",
      lowercase: true,
      trim: true,
    },

    method: {
      type: String,
      required: [true, "Payment method is required"],
      enum: {
        values: ["card", "swift_bank_transfer", "khalti"],
        message: "{VALUE} is not a supported payment method",
      },
    },

    // A universal ID from your gateway (Stripe PI, Khalti Pidx, SWIFT Ref)
    transactionId: {
      type: String,
      sparse: true, // Allows multiple 'null' or missing values if pending
      trim: true,
    },

    // Securely stores custom gateway payloads (e.g. status responses, logs)
    // without polluting your top-level schema fields.
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
      lowercase: true,
    },
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model("Payment", paymentSchema);