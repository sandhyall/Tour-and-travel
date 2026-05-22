import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  gender: { type: String, enum: ["male", "female", "other"] },
  dob: { type: Date }, // Changed to Date for reliable age metrics / sorting
  phone: { type: String, trim: true },
  nationality: { type: String, trim: true },
  passportNumber: { type: String, trim: true },
  notes: { type: String, trim: true },
});

const bookingSchema = new mongoose.Schema(
  {
    trip: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Trip",
      required: [true, "A booking must belong to a specific trip"]
    },

    buyer: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true, lowercase: true },
    },

    participants: [participantSchema],

    numberOfPeople: { 
      type: Number, 
      required: true, 
      min: [1, "Must book for at least 1 person"] 
    },
    
    travelDate: { 
      type: Date, 
      required: [true, "Travel date is required"] 
    },
    
    totalAmount: { 
      type: Number, 
      required: true, 
      min: 0 
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
      lowercase: true,
    },

   
    invoiceNumber: {
      type: String,
      unique: true,
      sparse: true 
    },

   
    successfulPaymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      default: null
    },

    // Kept here because it is a physical asset directly tied to verifying the booking manually
    bankSlip: {
      url: { type: String },
      public_id: { type: String },
    },

    ticketPdf: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);