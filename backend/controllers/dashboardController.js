import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      totalTrips,
      revenueAgg,
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ bookingStatus: "pending" }),
      Booking.countDocuments({ bookingStatus: "confirmed" }),
      Booking.countDocuments({ bookingStatus: "cancelled" }),
      Trip.countDocuments(),
      Booking.aggregate([
        { $match: { bookingStatus: "confirmed" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
    ]);

    const totalRevenue = revenueAgg[0]?.total ?? 0;

    res.json({
      totalBookings,
      pendingBookings,
      confirmedBookings,
      verifiedPayments: confirmedBookings,
      cancelledBookings,
      totalTrips,
      totalRevenue,
    });
  } catch (err) {
    console.error("getDashboardStats error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getMonthlyRevenue = async (req, res) => {
  try {
    const data = await Booking.aggregate([
      { $match: { bookingStatus: "confirmed" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(data);
  } catch (err) {
    console.error("getMonthlyRevenue error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getCalendar = async (req, res) => {
  try {
    const data = await Booking.aggregate([
      { $match: { bookingStatus: { $ne: "cancelled" } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$travelDate" } },
          bookingCount: { $sum: 1 },
          totalPeople: { $sum: "$numberOfPeople" },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 60 },
    ]);

    res.json(
      data.map((d) => ({
        date: d._id,
        bookingCount: d.bookingCount,
        totalPeople: d.totalPeople,
        totalRevenue: d.totalRevenue,
      })),
    );
  } catch (err) {
    console.error("getCalendar error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getBookingsByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res
        .status(400)
        .json({ message: "date query param required (YYYY-MM-DD)" });
    }

    const start = new Date(`${date}T00:00:00.000Z`);
    const end = new Date(`${date}T23:59:59.999Z`);

    const bookings = await Booking.find({
      travelDate: { $gte: start, $lte: end },
      bookingStatus: { $ne: "cancelled" },
    })
      .populate("trip", "title slug")
      .sort({ createdAt: -1 })
      .lean();

    res.json(bookings);
  } catch (err) {
    console.error("getBookingsByDate error:", err);
    res.status(500).json({ message: err.message });
  }
};
