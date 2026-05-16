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

    bookingStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "cancelled",
      ],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: [
        "card",
        "swift_bank_transfer",
      ],
      default: "card",
    },

    transactionId: String,

    stripeSessionId: String,

    stripePaymentIntentId: String,

    swiftReferenceNumber: String,

    bankSlip: {
      url: String,
      public_id: String,
    },

    ticketPdf: String,

    invoiceNumber: String,

    confirmationEmailSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Booking",
  bookingSchema
);