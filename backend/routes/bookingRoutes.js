import express from "express";

import {
  createBooking,
  uploadSlip,
  verifyBooking,
  getAllBookings,
  updateBookingStatus,
  getBookedDates,
  resendPendingEmails,
} from "../controllers/bookingController.js";

import {
  upload,
} from "../middleware/uploadMiddleware.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  transporter
} from "../utils/sendBookingEmail.js";
import fs from "fs";

const router = express.Router();

router.post("/", createBooking);

router.post(
  "/:id/slip",
  upload.single("file"),
  uploadSlip
);

router.get(
  "/trip/:tripId",
  getBookedDates
);

router.get(
  "/",
  protect,
  getAllBookings
);

router.put(
  "/:id/verify",
  protect,
  verifyBooking
);

router.put(
  "/:id/status",
  protect,
  updateBookingStatus
);

router.post(
  "/resend-emails",
  resendPendingEmails
);



export default router;