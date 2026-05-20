// import express from "express";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";
// import { getDashboardStats } from "../controllers/dashboardController.js";

// const router = express.Router();

// router.get("/", protect, adminOnly, getDashboardStats);

// export default router;

import express from "express";
import {
  getDashboardStats,
  getBookingsByDate,
  getMonthlyRevenue,
  getCalendar
} from "../controllers/dashboardController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getDashboardStats);
router.get("/stats", protect, getDashboardStats);

router.get("/revenue", protect, getMonthlyRevenue);

router.get(
  "/calendar",
  protect,
 getCalendar
  
);


export default router;