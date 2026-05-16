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
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.post("/", createBooking);

router.post("/:id/slip", upload.single("file"), uploadSlip);

// CALENDAR
router.get("/trip/:tripId", getBookedDates);

// ADMIN
router.get("/", protect, getAllBookings);

router.put("/:id/verify", protect, verifyBooking);

router.put("/:id/status", protect, updateBookingStatus);

export default router;