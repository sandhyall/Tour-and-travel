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

const usd = (n) =>
  `USD ${Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 0 })}`;

const fmt = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 10,
        padding: "10px 16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        fontSize: 13,
      }}
    >
      <p style={{ margin: "0 0 6px", fontWeight: 600, color: "#0F172A" }}>
        {label}
      </p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ margin: "2px 0", color: p.color }}>
          {p.name}:{" "}
          <strong>
            {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
          </strong>
        </p>
      ))}
    </div>
  );
};

const StatusPill = ({ status }) => {
  const map = {
    confirmed: { bg: "#ECFDF5", color: "#047857", label: "Confirmed" },
    pending: { bg: "#FFFBEB", color: "#B45309", label: "Pending" },
    cancelled: { bg: "#FFF1F2", color: "#BE123C", label: "Cancelled" },
  };
  const c = map[status?.toLowerCase()] ?? map.pending;
  return (
    <span
      style={{
        background: c.bg,
        color: c.color,
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        padding: "3px 10px",
        borderRadius: 999,
      }}
    >
      {c.label}
    </span>
  );
};

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [recentBooks, setRecentBooks] = useState([]);
  const [showGraphs, setShowGraphs] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const fetchAll = async () => {
      try {
        const [statsRes, revenueRes, bookingsRes] = await Promise.all([
          axios.get("/dashboard/summary", { headers }),
          axios.get("/dashboard/revenue", { headers }),
          axios.get("/bookings/all", { headers, params: { limit: 6 } }),
        ]);

        setStats(statsRes.data || {});

        const months = [
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
          "Dec",
        ];
        setRevenueData(
          Array.isArray(revenueRes.data)
            ? revenueRes.data.map((item) => ({
                month: months[(item._id ?? 1) - 1] ?? `M${item._id}`,
                revenue: item.revenue || 0,
              }))
            : [],
        );

        const raw = bookingsRes.data;
        setRecentBooks(
          Array.isArray(raw)
            ? raw.slice(0, 6)
            : Array.isArray(raw?.bookings)
              ? raw.bookings.slice(0, 6)
              : [],
        );
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#F8FAFC",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={spinnerStyle} />
          <p
            style={{
              marginTop: 16,
              fontSize: 15,
              color: "#64748B",
              fontWeight: 500,
            }}
          >
            Loading dashboard…
          </p>
        </div>
      </div>
    );
  }

  const total = stats.totalBookings || 0;
  const pending = stats.pendingBookings || 0;

  const confirmed = stats.confirmedBookings || stats.verifiedPayments || 0;
  const cancelled = stats.cancelledBookings || 0;

  const barData = [
    {
      name: "Overview",
      Total: total,
      Pending: pending,
      Confirmed: confirmed,
      Cancelled: cancelled,
    },
  ];

  const donutSegments = [
    { label: "Confirmed", value: confirmed, color: "#10B981" },
    { label: "Pending", value: pending, color: "#F59E0B" },
    { label: "Cancelled", value: cancelled, color: "#F43F5E" },
  ].filter((s) => s.value > 0);

  return (
    <div
      className="flex min-h-screen bg-slate-50"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-6 md:p-10 max-w-full">
        {/* ── Header ── */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 36,
            paddingBottom: 28,
            borderBottom: "1.5px solid #E2E8F0",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 4px",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#94A3B8",
              }}
            >
              Admin Panel
            </p>
            <h1
              style={{
                margin: 0,
                fontSize: 26,
                fontWeight: 800,
                color: "#0F172A",
                letterSpacing: "-0.5px",
              }}
            >
              Wales Trek &amp; Travel
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748B" }}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => navigate("/add-trip")} style={btnPrimary}>
              + Add New Trip
            </button>
            <button
              onClick={() => navigate("/admin-bookings")}
              style={btnSecondary}
            >
              View All Bookings
            </button>
            <button
              onClick={() => setShowGraphs(!showGraphs)}
              style={showGraphs ? btnActiveSecondary : btnSecondary}
            >
              {showGraphs ? "Hide Analytics" : "Show Analytics"}
            </button>
          </div>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 18,
            marginBottom: 18,
          }}
        >
          <StatCard
            title="Total Trips"
            value={stats.totalTrips ?? 0}
            subtitle="Active packages"
            color="#3B82F6"
            icon={<PlaneIcon />}
          />
          <StatCard
            title="Total Revenue"
            value={usd(stats.totalRevenue)}
            subtitle="From confirmed bookings"
            color="#10B981"
            icon={<CoinIcon />}
          />
          <StatCard
            title="Avg / Booking"
            value={total ? usd((stats.totalRevenue || 0) / total) : "—"}
            subtitle="Revenue per booking"
            color="#8B5CF6"
            icon={<TrendIcon />}
          />
        </div>

        <SectionLabel>Booking Status</SectionLabel>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <StatusCard
            label="Total"
            value={total}
            color="#3B82F6"
            bg="#EBF3FF"
            border="#BFDBFE"
            pct={100}
          />
          <StatusCard
            label="Confirmed"
            value={confirmed}
            color="#10B981"
            bg="#ECFDF5"
            border="#A7F3D0"
            pct={total ? (confirmed / total) * 100 : 0}
            icon={<CheckIcon />}
          />
          <StatusCard
            label="Pending"
            value={pending}
            color="#F59E0B"
            bg="#FFFBEB"
            border="#FDE68A"
            pct={total ? (pending / total) * 100 : 0}
            icon={<ClockIcon />}
          />
          <StatusCard
            label="Cancelled"
            value={cancelled}
            color="#F43F5E"
            bg="#FFF1F2"
            border="#FECDD3"
            pct={total ? (cancelled / total) * 100 : 0}
            icon={<XIcon />}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 18,
            marginBottom: 32,
          }}
        >
          <div style={card}>
            <CardTitle title="Booking Mix" sub="Status distribution" />
            {total === 0 ? (
              <p
                style={{
                  fontSize: 13,
                  color: "#94A3B8",
                  textAlign: "center",
                  paddingTop: 20,
                }}
              >
                No bookings yet
              </p>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    height: 10,
                    borderRadius: 6,
                    overflow: "hidden",
                    marginBottom: 20,
                    background: "#F1F5F9",
                  }}
                >
                  {donutSegments.map((s) => (
                    <div
                      key={s.label}
                      style={{
                        width: `${(s.value / total) * 100}%`,
                        background: s.color,
                        transition: "width 0.4s ease",
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {donutSegments.map((s) => (
                    <div
                      key={s.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 2,
                            background: s.color,
                          }}
                        />
                        <span style={{ fontSize: 13, color: "#374151" }}>
                          {s.label}
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#0F172A",
                          }}
                        >
                          {s.value}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            color: "#94A3B8",
                            marginLeft: 6,
                          }}
                        >
                          {`${((s.value / total) * 100).toFixed(0)}%`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div style={{ ...card, padding: 0, overflow: "hidden" }}>
            <div
              style={{
                padding: "20px 24px 16px",
                borderBottom: "1px solid #F1F5F9",
              }}
            >
              <CardTitle title="Key Metrics" sub="Derived from booking data" />
            </div>
            {[
              {
                label: "Confirmation rate",
                value: total
                  ? `${((confirmed / total) * 100).toFixed(1)}%`
                  : "—",
                hint: "Confirmed ÷ total bookings",
                good: true,
              },
              {
                label: "Avg. revenue / trip",
                value: stats.totalTrips
                  ? usd(
                      Math.round((stats.totalRevenue || 0) / stats.totalTrips),
                    )
                  : "—",
                hint: "Total revenue ÷ trips",
                good: true,
              },
              {
                label: "Pending rate",
                value: total ? `${((pending / total) * 100).toFixed(1)}%` : "—",
                hint: "Awaiting confirmation",
                good: false,
              },
              {
                label: "Cancellation rate",
                value: total
                  ? `${((cancelled / total) * 100).toFixed(1)}%`
                  : "—",
                hint: "Cancelled ÷ total bookings",
                good: false,
              },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 24px",
                  borderBottom:
                    i < arr.length - 1 ? "1px solid #F8FAFC" : "none",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#0F172A",
                    }}
                  >
                    {row.label}
                  </p>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: 11,
                      color: "#94A3B8",
                    }}
                  >
                    {row.hint}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "-0.3px",
                    color:
                      row.value === "—"
                        ? "#94A3B8"
                        : row.good
                          ? "#047857"
                          : "#BE123C",
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <SectionLabel>Recent Bookings</SectionLabel>
        <div
          style={{ ...card, padding: 0, overflow: "hidden", marginBottom: 32 }}
        >
          <div
            style={{
              padding: "18px 24px",
              borderBottom: "1px solid #F1F5F9",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CardTitle
              title="Latest 6 Bookings"
              sub="Most recent across all trips"
            />
            <button
              onClick={() => navigate("/admin/bookings")}
              style={{ ...btnSecondary, fontSize: 12, padding: "6px 14px" }}
            >
              View all →
            </button>
          </div>

          {recentBooks.length === 0 ? (
            <p
              style={{
                padding: 24,
                color: "#94A3B8",
                fontSize: 13,
                textAlign: "center",
              }}
            >
              No bookings yet.
            </p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr style={{ background: "#F8FAFC" }}>
                    {[
                      "Invoice",
                      "Customer",
                      "Trip",
                      "Date",
                      "Amount",
                      "Payment",
                      "Status",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "10px 16px",
                          textAlign: "left",
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.07em",
                          textTransform: "uppercase",
                          color: "#94A3B8",
                          borderBottom: "1px solid #E2E8F0",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentBooks.map((b, i) => {
                    const pmLabel =
                      b.paymentMethod === "swift_bank_transfer"
                        ? "Bank Transfer"
                        : b.paymentMethod === "card"
                          ? "Card / Gateway"
                          : b.paymentMethod
                            ? b.paymentMethod
                            : "—";

                    return (
                      <tr
                        key={b._id || i}
                        style={{ borderBottom: "1px solid #F1F5F9" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#FAFAFA")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#64748B",
                            fontFamily: "monospace",
                            fontSize: 11,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {b.invoiceNumber || "—"}
                        </td>
                        <td
                          style={{ padding: "12px 16px", whiteSpace: "nowrap" }}
                        >
                          <p
                            style={{
                              margin: 0,
                              fontWeight: 600,
                              color: "#0F172A",
                            }}
                          >
                            {b.buyer?.firstName || "Guest"}{" "}
                            {b.buyer?.lastName || ""}
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: 11,
                              color: "#94A3B8",
                            }}
                          >
                            {b.buyer?.email || ""}
                          </p>
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#374151",
                            maxWidth: 160,
                          }}
                        >
                          <p
                            style={{
                              margin: 0,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {b.trip?.title || b.packageName || "—"}
                          </p>
                          {b.packageName && b.trip?.title && (
                            <p
                              style={{
                                margin: 0,
                                fontSize: 11,
                                color: "#94A3B8",
                              }}
                            >
                              {b.packageName}
                            </p>
                          )}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#64748B",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {fmt(b.travelDate)}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontWeight: 700,
                            color: "#0F172A",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {usd(b.totalAmount)}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#64748B",
                            whiteSpace: "nowrap",
                            fontSize: 12,
                          }}
                        >
                          {pmLabel}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <StatusPill status={b.bookingStatus} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showGraphs && (
          <>
            <SectionLabel>Analytics</SectionLabel>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: 18,
                marginBottom: 36,
              }}
            >
              <ChartCard
                title="Monthly Revenue (USD)"
                sub="From confirmed bookings"
              >
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart
                    data={revenueData}
                    margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
                  >
                    <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12, fill: "#94A3B8" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#94A3B8" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue (USD)"
                      stroke="#3B82F6"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: "#3B82F6", strokeWidth: 0 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard
                title="Booking Breakdown"
                sub="Total · Pending · Confirmed · Cancelled"
              >
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart
                    data={barData}
                    margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
                    barGap={4}
                  >
                    <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: "#94A3B8" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#94A3B8" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                      iconType="circle"
                      iconSize={8}
                    />
                    <Bar dataKey="Total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    <Bar
                      dataKey="Pending"
                      fill="#F59E0B"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="Confirmed"
                      fill="#10B981"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="Cancelled"
                      fill="#F43F5E"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value, subtitle, color, icon }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        border: `1px solid ${color}22`,
        padding: "22px 24px",
        borderTop: `3px solid ${color}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <p
            style={{
              margin: "0 0 10px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "#94A3B8",
            }}
          >
            {title}
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.5px",
            }}
          >
            {value}
          </h2>
          <p style={{ margin: "5px 0 0", fontSize: 12, color: "#94A3B8" }}>
            {subtitle}
          </p>
        </div>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: `${color}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusCard({ label, value, color, bg, border, pct, icon }) {
  return (
    <div
      style={{
        background: bg,
        borderRadius: 14,
        border: `1px solid ${border}`,
        padding: "18px 18px 14px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: color,
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "#94A3B8",
            }}
          >
            {label}
          </span>
        </div>
        {icon && <div style={{ color, opacity: 0.8 }}>{icon}</div>}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 28,
          fontWeight: 800,
          color: "#0F172A",
          letterSpacing: "-0.5px",
        }}
      >
        {value}
      </p>
      <div
        style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}
      >
        <div
          style={{
            flex: 1,
            height: 4,
            borderRadius: 4,
            background: "#E2E8F0",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.min(pct, 100)}%`,
              height: "100%",
              borderRadius: 4,
              background: color,
              transition: "width 0.5s ease",
            }}
          />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color, minWidth: 30 }}>
          {Number(pct).toFixed(0)}%
        </span>
      </div>
    </div>
  );
}

function ChartCard({ title, sub, children }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        border: "1px solid #E2E8F0",
        padding: "22px 18px 14px",
      }}
    >
      <CardTitle title={title} sub={sub} />
      <div style={{ marginTop: 16 }}>{children}</div>
    </div>
  );
}

function CardTitle({ title, sub }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0F172A" }}>
        {title}
      </p>
      {sub && (
        <p style={{ margin: "3px 0 0", fontSize: 12, color: "#94A3B8" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p
      style={{
        margin: "0 0 12px",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#94A3B8",
      }}
    >
      {children}
    </p>
  );
}

const card = {
  background: "#fff",
  borderRadius: 14,
  border: "1px solid #E2E8F0",
  padding: "22px 24px",
};

const btnPrimary = {
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 9,
  padding: "9px 18px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};
const btnSecondary = {
  background: "#fff",
  color: "#374151",
  border: "1px solid #E2E8F0",
  borderRadius: 9,
  padding: "9px 18px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};
const btnActiveSecondary = {
  ...btnSecondary,
  background: "#EFF6FF",
  color: "#1D4ED8",
  borderColor: "#BFDBFE",
};

const PlaneIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4c-1 0-1.5.5-3.5 2.5L11 8 2.8 6.2c-.5-.1-.9.4-.8.9L3.3 9c.1.5.5.8 1 .9L8 11l-4 4H2l-1 2 3 1 1 3 2-1v-2l4-4 1.2 3.7c.1.5.4.9.9 1l2.1.4c.5.1 1-.3.9-.8z" />
  </svg>
);
const CoinIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const TrendIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
const ClockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const XIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const spinnerStyle = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "3px solid #E2E8F0",
  borderTopColor: "#3B82F6",
  animation: "spin 0.8s linear infinite",
  margin: "0 auto",
};
if (typeof document !== "undefined" && !document.getElementById("__spin_kf")) {
  const s = document.createElement("style");
  s.id = "__spin_kf";
  s.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
  document.head.appendChild(s);
}
