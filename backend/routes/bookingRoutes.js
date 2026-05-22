import express from "express";
import {
  createBooking,
  uploadSlip,
  verifyBooking,
  getAllBookings,
  updateBookingStatus,
  getBookedDates,
} from "../controllers/bookingController.js";

import { upload } from "../middleware/uploadMiddleware.js";
// Merged named imports from the same file to keep imports clean
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// --- PUBLIC / GUEST ROUTES ---
// Anyone can view which dates are fully booked before making a decision
router.get("/trip/:tripId", getBookedDates);

// --- PROTECTED USER ROUTES ---
// Create booking (Authenticated users only)
router.post("/", protect, createBooking);

// Upload bank slip (Authenticated users only)
// CRITICAL FIX: Changed .single("slip") back to .single("file") to match your previous route 
// definition and avoid breaking your existing frontend FormData keys (e.g., formData.append("file", ...))
router.post("/:id/slip", protect, upload.single("file"), uploadSlip);

// --- ADMIN ONLY ROUTES ---
// Management endpoints restricted to administrative accounts
router.get("/all", protect, adminOnly, getAllBookings);
router.put("/:id/verify", protect, adminOnly, verifyBooking);
router.put("/:id/status", protect, adminOnly, updateBookingStatus);

export default router;