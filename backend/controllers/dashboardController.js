// import Trip from "../models/Trip.js";
// import Booking from "../models/Booking.js";

// export const getDashboardStats = async (req, res) => {
//   try {
//     const totalTrips = await Trip.countDocuments();
//     const totalBookings = await Booking.countDocuments();

//     const pendingBookings = await Booking.countDocuments({
//       paymentStatus: "pending"
//     });

//     const verifiedBookings = await Booking.countDocuments({
//       paymentStatus: "verified"
//     });

//     const revenue = await Booking.aggregate([
//       { $match: { paymentStatus: "verified" } },
//       {
//         $group: {
//           _id: null,
//           total: { $sum: "$totalAmount" }
//         }
//       }
//     ]);

//     // Monthly revenue
//     const monthlyRevenue = await Booking.aggregate([
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           revenue: { $sum: "$totalAmount" }
//         }
//       }
//     ]);

//     // Weekly bookings
//     const weeklyBookings = await Booking.aggregate([
//       {
//         $group: {
//           _id: { $dayOfWeek: "$createdAt" },
//           bookings: { $sum: 1 }
//         }
//       }
//     ]);

//     // Country distribution
//     const countryDistribution = await Booking.aggregate([
//       {
//         $lookup: {
//           from: "trips",
//           localField: "trip",
//           foreignField: "_id",
//           as: "tripData"
//         }
//       },
//       { $unwind: "$tripData" },
//       {
//         $group: {
//           _id: "$tripData.country",
//           value: { $sum: 1 }
//         }
//       }
//     ]);

//     res.json({
//       totalTrips,
//       totalBookings,
//       pendingBookings,
//       verifiedBookings,
//       totalRevenue: revenue[0]?.total || 0,

//       monthlyRevenue: monthlyRevenue.map(m => ({
//         name: `M${m._id}`,
//         revenue: m.revenue
//       })),

//       weeklyBookings: weeklyBookings.map(w => ({
//         name: `D${w._id}`,
//         bookings: w.bookings
//       })),

//       countryDistribution: countryDistribution.map(c => ({
//         name: c._id,
//         value: c.value
//       }))
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalTrips = await Trip.countDocuments({});
    const totalBookings = await Booking.countDocuments();

    const totalRevenueAgg = await Booking.aggregate([
      { $match: { paymentStatus: "verified" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    const pendingBookings = await Booking.countDocuments({
      paymentStatus: "pending"
    });

    const verifiedPayments = await Booking.countDocuments({
      paymentStatus: "verified"
    });

    res.json({
      totalTrips,
      totalBookings,
      totalRevenue,
      pendingBookings,
      verifiedPayments
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getMonthlyRevenue = async (req, res) => {
  try {
    const data = await Booking.aggregate([
      { $match: { paymentStatus: "verified" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getBookingsByDate = async (req, res) => {
  try {
    const data = await Booking.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$travelDate" }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

