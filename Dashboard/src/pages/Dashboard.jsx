import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import "../styles/buttons.css";
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
  ResponsiveContainer
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
        const statsRes = await axios.get("/dashboard/stats");
        setStats(statsRes.data);

        const bookingsRes = await axios.get("/bookings");
        setBookings(bookingsRes.data || []);

        const revenueRes = await axios.get("/dashboard/revenue");
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        const formattedData = revenueRes.data.map((item) => ({
          month: monthNames[item._id - 1] || `M${item._id}`,
          revenue: item.revenue
        }));
        setRevenueData(formattedData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="dashboard-container" style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title} className="dashboard-title">
              📊 Dashboard
            </h1>
            <p style={styles.subtitle}>
              Welcome to Travel Wales Admin Panel
            </p>
          </div>
          <div style={styles.quickActions} className="quick-actions">
            <button
              style={styles.addButton}
              onClick={() => navigate("/add-trip")}
            >
              ➕ Add New Trip
            </button>
            <button
              style={{
                ...styles.addButton,
                backgroundColor: showGraphs ? "#28a745" : "#666"
              }}
              onClick={() => setShowGraphs(!showGraphs)}
            >
              📈 {showGraphs ? "Hide" : "Show"} Graphs
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <Card
            title="Total Trips"
            value={stats.totalTrips || 0}
            icon="✈️"
            color="#007bff"
          />
          <Card
            title="Total Bookings"
            value={stats.totalBookings || 0}
            icon="📅"
            color="#28a745"
          />
          <Card
            title="Total Revenue"
            value={"₹" + (stats.totalRevenue || 0)}
            icon="💰"
            color="#ffc107"
          />
          <Card
            title="Pending Bookings"
            value={stats.pendingBookings || 0}
            icon="⏳"
            color="#dc3545"
          />
        </div>

        {/* Graphs Section */}
        {showGraphs && (
          <div className="charts-grid" style={styles.chartsContainer}>
            {/* Monthly Revenue Chart */}
            {revenueData.length > 0 && (
              <div className="chart-section" style={styles.chartSection}>
                <h2 style={styles.chartTitle}>💰 Monthly Revenue</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                    <XAxis dataKey="month" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#007bff"
                      strokeWidth={2}
                      dot={{ fill: "#007bff", r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Stats Overview Chart */}
            <div className="chart-section" style={styles.chartSection}>
              <h2 style={styles.chartTitle}>📊 Booking Statistics</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    {
                      name: "Bookings",
                      total: stats.totalBookings,
                      pending: stats.pendingBookings,
                      verified: stats.verifiedPayments
                    }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                  <XAxis dataKey="name" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "8px"
                    }}
                  />
                  <Legend />
                  <Bar dataKey="total" fill="#007bff" name="Total Bookings" />
                  <Bar dataKey="pending" fill="#ffc107" name="Pending" />
                  <Bar dataKey="verified" fill="#28a745" name="Verified" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Analytics Section */}
        <div style={styles.analyticsSection}>
          <h2 style={styles.sectionTitle}>📈 Recent Bookings</h2>

          {bookings.length === 0 ? (
            <div style={styles.emptyState}>
              <p>No bookings yet</p>
            </div>
          ) : (
            <div style={styles.bookingsList}>
              {bookings.slice(0, 5).map((booking, idx) => (
                <div key={idx} style={styles.bookingItem} className="booking-item">
                  <div style={styles.bookingInfo}>
                    <h4 style={styles.bookingTitle}>
                      {booking.tripTitle || booking.trip?.title || "Trip"}
                    </h4>
                    <p style={styles.bookingDetails}>
                      👤 {booking.userName || booking.user?.name || "User"}
                    </p>
                    <p style={styles.bookingDetails}>
                      📅 {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div style={styles.bookingAmount}>
                    <p style={styles.amount}>
                      ₹{booking.totalPrice || booking.amount || 0}
                    </p>
                    <span
                      style={{
                        ...styles.status,
                        backgroundColor:
                          booking.status === "confirmed"
                            ? "#28a745"
                            : booking.status === "pending"
                              ? "#ffc107"
                              : "#dc3545"
                      }}
                    >
                      {booking.status || "pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Info */}
        <div style={styles.quickInfo}>
          <p style={styles.infoText}>
            💡 Manage Nepal, Bhutan, and Tibet trips easily from this
            dashboard.
          </p>
        </div>
      </div>
    </>
  );
}

function Card({ title, value, icon, color }) {
  return (
    <div style={{ ...styles.card, borderLeftColor: color }}>
      <div style={styles.cardIcon}>{icon}</div>
      <div style={styles.cardContent}>
        <p style={styles.cardTitle}>{title}</p>
        <h2 style={styles.cardValue}>{value}</h2>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    marginLeft: "260px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    paddingBottom: "20px",
    borderBottom: "3px solid #007bff",
    flexWrap: "wrap",
    gap: "20px"
  },
  title: {
    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
    color: "#1a1a2e",
    margin: "0 0 8px 0",
    fontWeight: "600"
  },
  subtitle: {
    color: "#666",
    fontSize: "0.95rem",
    margin: "0"
  },
  quickActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },
  addButton: {
    padding: "12px 24px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
    whiteSpace: "nowrap"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "40px"
  },
  chartsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
    gap: "20px",
    marginBottom: "40px"
  },
  chartSection: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e9ecef"
  },
  chartTitle: {
    fontSize: "1.2rem",
    color: "#1a1a2e",
    margin: "0 0 20px 0",
    fontWeight: "600"
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e9ecef",
    borderLeft: "4px solid #007bff",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    transition: "all 0.3s ease",
    cursor: "pointer"
  },
  cardIcon: {
    fontSize: "2.5rem",
    minWidth: "50px",
    textAlign: "center"
  },
  cardContent: {
    flex: 1
  },
  cardTitle: {
    color: "#999",
    fontSize: "0.9rem",
    margin: "0 0 5px 0",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  cardValue: {
    color: "#1a1a2e",
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    margin: "0",
    fontWeight: "700"
  },
  analyticsSection: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e9ecef",
    marginBottom: "30px"
  },
  sectionTitle: {
    fontSize: "1.3rem",
    color: "#1a1a2e",
    margin: "0 0 20px 0",
    fontWeight: "600"
  },
  bookingsList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  bookingItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
    transition: "all 0.3s ease",
    flexWrap: "wrap",
    gap: "15px"
  },
  bookingInfo: {
    flex: 1
  },
  bookingTitle: {
    color: "#1a1a2e",
    fontSize: "1rem",
    margin: "0 0 5px 0",
    fontWeight: "600"
  },
  bookingDetails: {
    color: "#999",
    fontSize: "0.85rem",
    margin: "3px 0"
  },
  bookingAmount: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap"
  },
  amount: {
    color: "#007bff",
    fontSize: "1.2rem",
    fontWeight: "700",
    margin: "0"
  },
  status: {
    padding: "6px 12px",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "0.8rem",
    fontWeight: "600",
    textTransform: "capitalize"
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#999"
  },
  quickInfo: {
    backgroundColor: "#e7f3ff",
    border: "1px solid #b3d9ff",
    padding: "15px 20px",
    borderRadius: "8px"
  },
  infoText: {
    color: "#0056b3",
    margin: "0",
    fontSize: "0.95rem"
  }
};