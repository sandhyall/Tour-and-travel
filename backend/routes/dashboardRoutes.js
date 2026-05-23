import express from "express";
import { 
  getDashboardStats, 
  getMonthlyRevenue, 
  getBookingsByDate, 
  getCalendar 
} from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Ensure these match your axios calls
router.get("/summary", protect, getDashboardStats);
router.get("/revenue", protect, getMonthlyRevenue);
router.get("/calendar", protect, getCalendar);
router.get("/dates", protect, getBookingsByDate);

export default router;