import express from "express";
import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  getTrip
} from "../controllers/tripController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ✅ FIXED: Field names now perfectly match what your controller reads
router.post(
  "/",
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "gallery", maxCount: 20 }
  ]),
  createTrip
);

router.get("/", getTrips);

// ✅ Add your get by slug route below the ID route to prevent routing conflicts
router.get("/slug/:slug", getTrip);

router.get("/:id", getTripById);

router.put(
  "/:id",
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "gallery", maxCount: 20 },
  ]),
  updateTrip
);

router.delete("/:id", deleteTrip);

export default router;