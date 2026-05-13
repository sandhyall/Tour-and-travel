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
  getMonthlyRevenue
} from "../controllers/dashboardController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getDashboardStats);
router.get("/stats", protect, getDashboardStats);

router.get("/revenue", protect, getMonthlyRevenue);

router.get(
  "/calendar",
  protect,
  async (req, res) => {
    try {
      const bookings =
        await Booking.find()
          .populate("trip");

      const grouped = {};

      bookings.forEach(
        (booking) => {
          const date =
            new Date(
              booking.travelDate
            )
              .toISOString()
              .split("T")[0];

          if (
            !grouped[date]
          ) {
            grouped[date] = {
              date,

              count: 0,

              bookings: [],

              remainingSeats: 999,
            };
          }

          grouped[
            date
          ].count += 1;

          grouped[
            date
          ].bookings.push(
            booking
          );

          const tripDate =
            booking.trip.availableDates.find(
              (d) =>
                new Date(
                  d.date
                )
                  .toISOString()
                  .split(
                    "T"
                  )[0] ===
                date
            );

          if (tripDate) {
            grouped[
              date
            ].remainingSeats =
              tripDate.totalSeats -
              tripDate.bookedSeats;
          }
        }
      );

      res.json(
        Object.values(
          grouped
        )
      );
    } catch (err) {
      res.status(500)
        .json({
          message:
            err.message,
        });
    }
  }
);


export default router;