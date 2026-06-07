import express from "express";
import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  getTrip,
  addTripDate,
} from "../controllers/tripController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ✅ Upload fields now include brochure PDF, itinerary PDF, and guide photo
router.post(
  "/",
upload.fields([
  { name: "featuredImage", maxCount: 1 },
  { name: "gallery", maxCount: 20 },
  { name: "brochure", maxCount: 1 },
  { name: "itineraryPdf", maxCount: 1 },
  { name: "guidePhoto", maxCount: 1 },
  { name: "mapImage", maxCount: 1 },
]),
  createTrip
);

router.get("/", getTrips);

// ✅ Slug route BEFORE :id to prevent routing conflicts
router.get("/slug/:slug", getTrip);

router.get("/:id", getTripById);

router.put(
  "/:id",
  upload.fields([
  { name: "featuredImage", maxCount: 1 },
  { name: "gallery", maxCount: 20 },
  { name: "brochure", maxCount: 1 },
  { name: "itineraryPdf", maxCount: 1 },
  { name: "guidePhoto", maxCount: 1 },
  { name: "mapImage", maxCount: 1 },
]),
  updateTrip
);

router.delete("/:id", deleteTrip);

// ✅ Add a date variant to a trip
router.post("/add-date", addTripDate);

export default router;