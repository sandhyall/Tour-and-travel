import express from "express";
import {
  createTrip,
  getTrips,
  getTripById,
  getTrip,
  updateTrip,
  deleteTrip,
  addTripDate,
} from "../controllers/tripController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* =========================
   CREATE TRIP
========================= */
router.post(
  "/",
  protect,
  adminOnly,
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  createTrip
);

/* =========================
   GET ALL TRIPS
========================= */
router.get("/", getTrips);

/* =========================
   ADD TRIP DATE (IMPORTANT)
========================= */
router.post("/dates", protect, adminOnly, addTripDate);

/* =========================
   GET BY SLUG (PUBLIC PAGE)
========================= */
router.get("/slug/:slug", getTrip);

/* =========================
   GET BY ID (ADMIN EDIT PAGE)
========================= */
router.get("/:id", getTripById);

/* =========================
   UPDATE TRIP
========================= */
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateTrip
);

/* =========================
   DELETE TRIP
========================= */
router.delete("/:id", protect, adminOnly, deleteTrip);

export default router;