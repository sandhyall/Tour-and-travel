import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [bookings, setBookings] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [showGraphs, setShowGraphs] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, bookingsRes, revenueRes] = await Promise.all([
          axios.get("/dashboard/stats"),
          axios.get("/bookings"),
          axios.get("/dashboard/revenue"),
        ]);

        // Stats
        setStats(statsRes.data || {});

        // Bookings Fix
        const bookingsData = Array.isArray(bookingsRes.data)
          ? bookingsRes.data
          : bookingsRes.data.bookings || [];

        setBookings(bookingsData);

        // Revenue Formatting
        const monthNames = [
          "Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec",
        ];

        const formattedData = Array.isArray(revenueRes.data)
          ? revenueRes.data.map((item) => ({
              month: monthNames[item._id - 1] || `M${item._id}`,
              revenue: item.revenue || 0,
            }))
          : [];

        setRevenueData(formattedData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 transition-all duration-300">

        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b-2 border-blue-600">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              📊 Dashboard
            </h1>

            <p className="text-slate-500 mt-1">
              Welcome to Wales Trek & Travel Admin Panel
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/add-trip")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold"
            >
              ➕ Add New Trip
            </button>

            <button
              onClick={() => setShowGraphs(!showGraphs)}
              className={`px-5 py-2.5 rounded-lg font-semibold text-white ${
                showGraphs
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-slate-600 hover:bg-slate-700"
              }`}
            >
              📈 {showGraphs ? "Hide" : "Show"} Analytics
            </button>
          </div>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <StatCard
            title="Total Trips"
            value={stats.totalTrips}
            icon="✈️"
            color="blue"
          />

          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon="📅"
            color="emerald"
          />

          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue?.toLocaleString() || 0}`}
            icon="💰"
            color="amber"
          />

          <StatCard
            title="Pending"
            value={stats.pendingBookings}
            icon="⏳"
            color="red"
          />

        </div>

        {/* GRAPHS */}
        {showGraphs && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">

            {/* Revenue Chart */}
            <ChartWrapper title="💰 Monthly Revenue">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrapper>

            {/* Booking Chart */}
            <ChartWrapper title="📊 Booking Overview">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    {
                      name: "Stats",
                      total: stats.totalBookings || 0,
                      pending: stats.pendingBookings || 0,
                      verified: stats.verifiedPayments || 0,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Bar dataKey="total" fill="#3b82f6" name="Total" />
                  <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                  <Bar dataKey="verified" fill="#10b981" name="Verified" />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>

          </div>
        )}

        {/* BOOKINGS */}
     {/* BOOKINGS */}
<section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">

  <h2 className="text-xl font-bold text-slate-800 mb-6">
    📈 Recent Bookings
  </h2>

  <div className="space-y-4">

    {!Array.isArray(bookings) || bookings.length === 0 ? (
      <div className="text-center py-12 text-slate-400 font-medium">
        No bookings yet
      </div>
    ) : (
      bookings.slice(0, 5).map((booking, idx) => (
        <div
          key={booking._id || idx}
          className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border hover:shadow-sm transition"
        >

          {/* LEFT SIDE */}
          <div className="space-y-1">

            {/* Trip Title */}
            <h4 className="font-bold text-slate-800 text-lg">
              {booking.tripTitle || booking.trip?.title || "Unknown Trip"}
            </h4>

            {/* Booking ID */}
            <p className="text-xs text-slate-500">
              🆔 Booking ID:{" "}
              <span className="font-mono text-slate-700">
                {booking._id?.slice(-6).toUpperCase() || "N/A"}
              </span>
            </p>

            {/* User */}
            <p className="text-sm text-slate-500">
              👤 {booking.buyer?.firstName} {booking.buyer?.lastName} 
            </p>

            {/* Date */}
            <p className="text-sm text-slate-500">
              📅{" "}
              {booking.createdAt
                ? new Date(booking.createdAt).toLocaleDateString()
                : "No Date"}
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="text-right">

            {/* Amount */}
            <p className="text-xl font-bold text-blue-600">
              ${booking.totalAmount || booking.amount || 0}
            </p>

            {/* Status */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                booking.bookingStatus === "confirmed"
                  ? "bg-emerald-100 text-emerald-700"
                  : booking.bookingStatus === "pending"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {booking.bookingStatus || "pending"}
            </span>

          </div>

        </div>
      ))
    )}

  </div>
</section>

        {/* INFO */}
        <div className="bg-blue-600 rounded-xl p-4 text-white shadow-lg">
          💡 Pro Tip: You can manage Nepal, Bhutan, and Tibet itineraries from the Trips section.
        </div>

      </main>
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ title, value, icon, color }) {
  const colorMap = {
    blue: "border-blue-500",
    emerald: "border-emerald-500",
    amber: "border-amber-500",
    red: "border-red-500",
  };

  return (
    <div
      className={`bg-white p-6 rounded-2xl border-l-4 shadow-sm ${colorMap[color]}`}
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl">{icon}</div>

        <div>
          <p className="text-xs font-bold text-slate-400 uppercase">
            {title}
          </p>

          <h2 className="text-2xl font-extrabold text-slate-800">
            {value || 0}
          </h2>
        </div>
      </div>
    </div>
  );
}

/* ================= CHART WRAPPER ================= */
function ChartWrapper({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-6">
        {title}
      </h3>
      {children}
    </div>
  );
}