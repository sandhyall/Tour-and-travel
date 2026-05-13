import express from "express";
import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip
} from "../controllers/tripController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

/**
 * CREATE TRIP
 */
router.post(
  "/",
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 }
  ]),
  createTrip
);

/**
 * GET ALL TRIPS
 */
router.get("/", getTrips);

/**
 * GET SINGLE TRIP BY ID (IMPORTANT: put before slug if you use slug route)
 */
router.get("/:id", getTripById);

/**
 * UPDATE TRIP
 */
router.put(
  "/:id",
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 }
  ]),
  updateTrip
);

/**
 * DELETE TRIP
 */
router.delete("/:id", deleteTrip);

export default router;