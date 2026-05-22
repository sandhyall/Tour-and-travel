import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

// ── Palette ─────────────────────────────────────────────────────────────────
const palette = {
  blue:    { bg: "#EBF3FF", border: "#3B82F6", text: "#1D4ED8", icon: "#3B82F6" },
  emerald: { bg: "#ECFDF5", border: "#10B981", text: "#047857", icon: "#10B981" },
  amber:   { bg: "#FFFBEB", border: "#F59E0B", text: "#B45309", icon: "#F59E0B" },
  rose:    { bg: "#FFF1F2", border: "#F43F5E", text: "#BE123C", icon: "#F43F5E" },
  violet:  { bg: "#F5F3FF", border: "#8B5CF6", text: "#6D28D9", icon: "#8B5CF6" },
  slate:   { bg: "#F8FAFC", border: "#94A3B8", text: "#475569", icon: "#94A3B8" },
};

// ── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #E2E8F0",
      borderRadius: 10,
      padding: "10px 16px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      fontSize: 13,
    }}>
      <p style={{ margin: "0 0 6px", fontWeight: 600, color: "#0F172A" }}>{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ margin: "2px 0", color: p.color }}>
          {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</strong>
        </p>
      ))}
    </div>
  );
};

// ── Status Badge ─────────────────────────────────────────────────────────────
const statusConfig = {
  pending:   { label: "Pending",   bg: "#FFFBEB", color: "#B45309", dot: "#F59E0B" },
  verified:  { label: "Completed", bg: "#ECFDF5", color: "#047857", dot: "#10B981" },
  cancelled: { label: "Cancelled", bg: "#FFF1F2", color: "#BE123C", dot: "#F43F5E" },
};

// ── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const [stats, setStats]             = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [showGraphs, setShowGraphs]   = useState(false);
  const [loading, setLoading]         = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, revenueRes] = await Promise.all([
          axios.get("/dashboard/summary"),
          axios.get("/dashboard/revenue"),
        ]);

        setStats(statsRes.data || {});

        const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        setRevenueData(
          Array.isArray(revenueRes.data)
            ? revenueRes.data.map((item) => ({
                month:   monthNames[item._id - 1] || `M${item._id}`,
                revenue: item.revenue || 0,
              }))
            : []
        );
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#F8FAFC" }}>
        <div style={{ textAlign: "center" }}>
          <div style={spinnerStyle} />
          <p style={{ marginTop: 16, fontSize: 15, color: "#64748B", fontWeight: 500 }}>Loading dashboard…</p>
        </div>
      </div>
    );
  }

  const total     = stats.totalBookings    || 0;
  const pending   = stats.pendingBookings  || 0;
  const verified  = stats.verifiedPayments || 0;
  const cancelled = stats.cancelledBookings || 0;

  const barData = [{ name: "Overview", Total: total, Pending: pending, Completed: verified, Cancelled: cancelled }];

  // Donut segments (simple inline SVG)
  const donutSegments = [
    { label: "Completed", value: verified,  color: "#10B981" },
    { label: "Pending",   value: pending,   color: "#F59E0B" },
    { label: "Cancelled", value: cancelled, color: "#F43F5E" },
  ].filter(s => s.value > 0);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFC", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sidebar />

      <main style={{ flex: 1, marginLeft: 256, padding: "36px 40px", maxWidth: "calc(100vw - 256px)" }}>

        {/* ── Header ── */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36, paddingBottom: 28, borderBottom: "1.5px solid #E2E8F0" }}>
          <div>
            <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94A3B8" }}>
              Admin Panel
            </p>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.5px" }}>
              Wales Trek &amp; Travel
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: 14, color: "#64748B" }}>
              Dashboard overview — {new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button onClick={() => navigate("/add-trip")} style={btnPrimary}>+ Add New Trip</button>
            <button onClick={() => setShowGraphs(!showGraphs)} style={showGraphs ? btnActiveSecondary : btnSecondary}>
              {showGraphs ? "Hide Analytics" : "Show Analytics"}
            </button>
          </div>
        </header>

        {/* ── Top Stat Cards: Trips + Revenue ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 20 }}>
          <StatCard title="Total Trips"   value={stats.totalTrips ?? 0}  subtitle="Active packages"   color="blue"   icon={<PlaneIcon />} />
          <StatCard title="Total Revenue" value={`₹${(stats.totalRevenue || 0).toLocaleString("en-IN")}`} subtitle="From verified payments" color="amber" icon={<CoinIcon />} />
        </div>

        {/* ── Booking Status Row ── */}
        <SectionLabel>Booking Status</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 36 }}>

          {/* Total bookings */}
          <div style={statusCardBase("#F8FAFC", "#E2E8F0")}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3B82F6" }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94A3B8" }}>
                Total Bookings
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 30, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>{total}</p>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#94A3B8" }}>All time</p>
          </div>

          {/* Pending */}
          <BookingStatusCard
            label="Pending"
            value={pending}
            total={total}
            color="#F59E0B"
            bg="#FFFBEB"
            border="#FDE68A"
            icon={<ClockIcon color="#F59E0B" />}
          />

          {/* Completed */}
          <BookingStatusCard
            label="Completed"
            value={verified}
            total={total}
            color="#10B981"
            bg="#ECFDF5"
            border="#A7F3D0"
            icon={<CheckIcon />}
          />

          {/* Cancelled */}
          <BookingStatusCard
            label="Cancelled"
            value={cancelled}
            total={total}
            color="#F43F5E"
            bg="#FFF1F2"
            border="#FECDD3"
            icon={<XIcon />}
          />
        </div>

       
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20, marginBottom: 36 }}>

         
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", padding: "24px" }}>
            <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#0F172A" }}>Booking Mix</p>
            <p style={{ margin: "0 0 20px", fontSize: 12, color: "#94A3B8" }}>Status distribution</p>

            {total === 0 ? (
              <p style={{ fontSize: 13, color: "#94A3B8", textAlign: "center", paddingTop: 20 }}>No bookings yet</p>
            ) : (
              <>
                {/* Stacked bar */}
                <div style={{ display: "flex", height: 10, borderRadius: 6, overflow: "hidden", marginBottom: 20, background: "#F1F5F9" }}>
                  {donutSegments.map((s) => (
                    <div key={s.label} style={{
                      width: `${(s.value / total) * 100}%`,
                      background: s.color,
                      transition: "width 0.4s ease",
                    }} />
                  ))}
                </div>

                {/* Legend */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { label: "Completed", value: verified,  color: "#10B981" },
                    { label: "Pending",   value: pending,   color: "#F59E0B" },
                    { label: "Cancelled", value: cancelled, color: "#F43F5E" },
                  ].map((s) => (
                    <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color }} />
                        <span style={{ fontSize: 13, color: "#374151" }}>{s.label}</span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{s.value}</span>
                        <span style={{ fontSize: 12, color: "#94A3B8", marginLeft: 6 }}>
                          {total ? `${((s.value / total) * 100).toFixed(0)}%` : "—"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Mini summary table */}
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #F1F5F9" }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0F172A" }}>Key Metrics</p>
              <p style={{ margin: "3px 0 0", fontSize: 12, color: "#94A3B8" }}>Derived from booking data</p>
            </div>
            {[
              {
                label: "Conversion rate",
                value: total ? `${((verified / total) * 100).toFixed(1)}%` : "—",
                hint: "Verified / total bookings",
                good: true,
              },
              {
                label: "Avg. revenue / trip",
                value: stats.totalTrips ? `₹${Math.round((stats.totalRevenue || 0) / stats.totalTrips).toLocaleString("en-IN")}` : "—",
                hint: "Total revenue ÷ trips",
                good: true,
              },
              {
                label: "Pending rate",
                value: total ? `${((pending / total) * 100).toFixed(1)}%` : "—",
                hint: "Awaiting payment verification",
                good: false,
              },
              {
                label: "Cancellation rate",
                value: total ? `${((cancelled / total) * 100).toFixed(1)}%` : "—",
                hint: "Cancelled / total bookings",
                good: false,
              },
            ].map((row, i, arr) => (
              <div key={row.label} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 24px",
                borderBottom: i < arr.length - 1 ? "1px solid #F8FAFC" : "none",
              }}>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{row.label}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94A3B8" }}>{row.hint}</p>
                </div>
                <span style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: row.value === "—" ? "#94A3B8" : row.good ? "#047857" : "#BE123C",
                  letterSpacing: "-0.3px",
                }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

      
        {showGraphs && (
          <>
            <SectionLabel>Analytics</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 36 }}>

              <ChartCard title="Monthly Revenue" subtitle="Verified bookings only">
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={revenueData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false}
                           tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#3B82F6" strokeWidth={2.5}
                      dot={{ r: 4, fill: "#3B82F6", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Booking Breakdown" subtitle="Total · Pending · Completed · Cancelled">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={barData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }} barGap={4}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} iconType="circle" iconSize={8} />
                    <Bar dataKey="Total"     fill="#3B82F6" radius={[4,4,0,0]} name="Total" />
                    <Bar dataKey="Pending"   fill="#F59E0B" radius={[4,4,0,0]} name="Pending" />
                    <Bar dataKey="Completed" fill="#10B981" radius={[4,4,0,0]} name="Completed" />
                    <Bar dataKey="Cancelled" fill="#F43F5E" radius={[4,4,0,0]} name="Cancelled" />
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

// ── BookingStatusCard ────────────────────────────────────────────────────────
function BookingStatusCard({ label, value, total, color, bg, border, icon }) {
  const pct = total > 0 ? ((value / total) * 100).toFixed(0) : 0;
  return (
    <div style={{ ...statusCardBase(bg, border) }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94A3B8" }}>
            {label}
          </span>
        </div>
        <div style={{ color, opacity: 0.8 }}>{icon}</div>
      </div>
      <p style={{ margin: 0, fontSize: 30, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>{value}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
        {/* Mini progress bar */}
        <div style={{ flex: 1, height: 4, borderRadius: 4, background: "#E2E8F0", overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", borderRadius: 4, background: color, transition: "width 0.5s ease" }} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color, minWidth: 30 }}>{pct}%</span>
      </div>
    </div>
  );
}

// ── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ title, value, subtitle, color, icon }) {
  const p = palette[color];
  return (
    <div style={{
      background: "#fff", borderRadius: 14,
      border: `1px solid ${p.border}22`,
      padding: "22px 24px",
      borderTop: `3px solid ${p.border}`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "#94A3B8" }}>
            {title}
          </p>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>{value}</h2>
          <p style={{ margin: "5px 0 0", fontSize: 12, color: "#94A3B8" }}>{subtitle}</p>
        </div>
        <div style={{
          width: 42, height: 42, borderRadius: 10, background: p.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: p.icon, flexShrink: 0,
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", padding: "24px 20px 16px" }}>
      <div style={{ marginBottom: 20 }}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0F172A" }}>{title}</p>
        <p style={{ margin: "3px 0 0", fontSize: 12, color: "#94A3B8" }}>{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{ margin: "0 0 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94A3B8" }}>
      {children}
    </p>
  );
}

// ── Shared card base ─────────────────────────────────────────────────────────
const statusCardBase = (bg, border) => ({
  background: bg,
  borderRadius: 14,
  border: `1px solid ${border}`,
  padding: "20px 20px 16px",
});

// ── Icons ────────────────────────────────────────────────────────────────────
const PlaneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4c-1 0-1.5.5-3.5 2.5L11 8 2.8 6.2c-.5-.1-.9.4-.8.9L3.3 9c.1.5.5.8 1 .9L8 11l-4 4H2l-1 2 3 1 1 3 2-1v-2l4-4 1.2 3.7c.1.5.4.9.9 1l2.1.4c.5.1 1-.3.9-.8z"/>
  </svg>
);
const CoinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const ClockIcon = ({ color = "currentColor" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ── Spinner ──────────────────────────────────────────────────────────────────
const spinnerStyle = {
  width: 36, height: 36, borderRadius: "50%",
  border: "3px solid #E2E8F0", borderTopColor: "#3B82F6",
  animation: "spin 0.8s linear infinite", margin: "0 auto",
};
if (typeof document !== "undefined" && !document.getElementById("__spin_kf")) {
  const s = document.createElement("style");
  s.id = "__spin_kf";
  s.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
  document.head.appendChild(s);
}

// ── Button styles ─────────────────────────────────────────────────────────────
const btnPrimary = {
  background: "#2563EB", color: "#fff", border: "none", borderRadius: 9,
  padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "0.01em",
};
const btnSecondary = {
  background: "#fff", color: "#374151", border: "1px solid #E2E8F0", borderRadius: 9,
  padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer",
};
const btnActiveSecondary = {
  ...btnSecondary, background: "#EFF6FF", color: "#1D4ED8", borderColor: "#BFDBFE",
};