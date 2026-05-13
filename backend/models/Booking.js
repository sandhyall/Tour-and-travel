import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
  dob: String,
  phone: String,
  nationality: String,
  passportNumber: String,
  notes: String,
});

const bookingSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
    },

    buyer: {
      firstName: String,
      lastName: String,
      email: String,
    },

    participants: [participantSchema],

    numberOfPeople: Number,

    // selected calendar date
    travelDate: Date,

    totalAmount: Number,

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
        "refunded",
      ],
      default: "pending",
    },

    // ✅ NEW
    bookingStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "cancelled",
        "completed",
      ],
      default: "pending",
    },

    // ✅ STRIPE
    stripeSessionId: String,

    stripePaymentIntentId: String,

    // BANK SLIP
    bankSlip: {
      url: String,
      public_id: String,
    },

    // PDF ticket
    ticketPdf: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "Booking",
  bookingSchema
);