import { useEffect, useState } from "react";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  ClipboardList,
  FileText,
  Users,
  DollarSign,
  CalendarDays,
  Eye,
  X,
  ImageOff,
} from "lucide-react";

export default function AdminBookings() {
  const [bookings, setBookings]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [searchTerm, setSearchTerm]     = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedSlip, setSelectedSlip] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // ─── FETCH ────────────────────────────────────────────────────────────────
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/bookings/all", { headers: getAuthHeaders() });
      let arr = [];
      if (Array.isArray(data))                arr = data;
      else if (Array.isArray(data?.bookings)) arr = data.bookings;
      else if (Array.isArray(data?.data))     arr = data.data;
      setBookings(arr);
    } catch (err) {
      console.error("fetchBookings error:", err);
      toast.error("Failed to load bookings.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  // ─── UPDATE STATUS ────────────────────────────────────────────────────────
  const updateStatus = async (id, status) => {
    const tid = toast.loading(`Setting booking to ${status}…`);
    try {
      await axios.put(`/bookings/${id}/status`, { status }, { headers: getAuthHeaders() });
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, bookingStatus: status } : b)));
      toast.success(`Booking marked as ${status}`, { id: tid });
    } catch (err) {
      console.error("updateStatus error:", err);
      toast.error(err.response?.data?.message || "Update failed.", { id: tid });
    }
  };

  // ─── HELPERS ──────────────────────────────────────────────────────────────
  const statusBadge = (status) => {
    const s = status?.toLowerCase() || "pending";
    if (["confirmed", "paid", "success"].includes(s))  return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (["cancelled", "failed", "rejected"].includes(s)) return "bg-rose-50 text-rose-700 border-rose-200";
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  const resolveSlipUrl = (b) =>
    b?.bankSlip?.url || b?.bankSlipUrl || b?.paymentDetails?.bankSlip || null;

  // ─── DERIVED DATA ─────────────────────────────────────────────────────────
  const safe = Array.isArray(bookings) ? bookings : [];

  const filtered = safe.filter((b) => {
    const term  = searchTerm.toLowerCase();
    const name  = `${b?.buyer?.firstName ?? ""} ${b?.buyer?.lastName ?? ""}`.toLowerCase();
    const email = b?.buyer?.email?.toLowerCase() ?? "";
    const trip  = b?.trip?.title?.toLowerCase() ?? b?.packageName?.toLowerCase() ?? "";
    const inv   = b?.invoiceNumber?.toLowerCase() ?? "";
    const matchesSearch = !term || name.includes(term) || email.includes(term) || trip.includes(term) || inv.includes(term);
    const matchesFilter = filterStatus === "all" || b?.bookingStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total:     safe.length,
    confirmed: safe.filter((b) => b?.bookingStatus === "confirmed").length,
    pending:   safe.filter((b) => b?.bookingStatus === "pending").length,
    cancelled: safe.filter((b) => b?.bookingStatus === "cancelled").length,
    revenue:   safe
      .filter((b) => b?.bookingStatus === "confirmed")
      .reduce((acc, b) => acc + (b?.totalAmount || 0), 0),
  };

  const pmLabel = (b) =>
    b.paymentMethod === "swift_bank_transfer" ? "Bank Transfer"
    : b.paymentMethod === "card"              ? "Card / Gateway"
    : b.paymentMethod                         ? b.paymentMethod
    : "—";

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 lg:ml-72 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

          {/* ── HEADER ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ClipboardList className="text-indigo-600 shrink-0" size={22} />
                Booking Management
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">Review, verify, and manage all trip bookings</p>
            </div>
            {/* Search */}
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl w-full sm:w-64
                           focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-sm shadow-sm"
                placeholder="Name, email, trip, invoice…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: "Total",     value: stats.total,     icon: <Users size={16}/>,       bg: "bg-indigo-50",  text: "text-indigo-600" },
              { label: "Confirmed", value: stats.confirmed, icon: <CheckCircle size={16}/>, bg: "bg-emerald-50", text: "text-emerald-600" },
              { label: "Pending",   value: stats.pending,   icon: <Clock size={16}/>,       bg: "bg-amber-50",   text: "text-amber-600" },
              { label: "Cancelled", value: stats.cancelled, icon: <XCircle size={16}/>,     bg: "bg-rose-50",    text: "text-rose-600" },
            ].map((s) => (
              <div key={s.label}
                   className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 sm:gap-3">
                <div className={`p-2 sm:p-2.5 rounded-xl ${s.bg} ${s.text} shrink-0`}>{s.icon}</div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                  <p className="text-lg sm:text-xl font-black text-slate-900">{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue strip */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl p-4 sm:p-5 flex items-center gap-4 text-white shadow-md">
            <div className="p-2.5 sm:p-3 bg-white/20 rounded-xl shrink-0">
              <DollarSign size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold opacity-80 uppercase tracking-wider">Confirmed Revenue</p>
              <p className="text-2xl sm:text-3xl font-black">USD {stats.revenue.toLocaleString()}</p>
            </div>
          </div>

          {/* ── FILTER TABS ── */}
          <div className="flex gap-2 flex-wrap">
            {["all", "pending", "confirmed", "cancelled"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold capitalize border transition-all ${
                  filterStatus === s
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                }`}
              >
                {s === "all" ? `All (${stats.total})` : s}
              </button>
            ))}
          </div>

          {/* ── DESKTOP TABLE ── (hidden on mobile) */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/80 border-b border-slate-200">
                  <tr className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Invoice / Trip</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Date · Pax</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Slip</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="p-14 text-center text-slate-400">
                        <div className="flex justify-center items-center gap-2">
                          <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                          Loading bookings…
                        </div>
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="p-14 text-center text-slate-400">
                        No bookings match the current filter.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((b) => {
                      const slipUrl       = resolveSlipUrl(b);
                      const bookingStatus = b.bookingStatus || "pending";
                      const payStatus     = b.successfulPaymentId?.status || b.paymentStatus
                                           || (bookingStatus === "confirmed" ? "paid" : "pending");
                      return (
                        <tr key={b._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 max-w-[180px]">
                            <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border inline-block mb-1">
                              {b.invoiceNumber || "NO-INV"}
                            </span>
                            <p className="font-semibold text-slate-900 line-clamp-1 text-sm">
                              {b.trip?.title || b.packageName || "—"}
                            </p>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <p className="font-semibold text-slate-800">
                              {b.buyer?.firstName || "Guest"} {b.buyer?.lastName || ""}
                            </p>
                            <p className="text-[11px] text-slate-400 font-mono">{b.buyer?.email || "—"}</p>
                          </td>
                          <td className="p-4 whitespace-nowrap text-slate-600 text-xs">
                            <div className="flex items-center gap-1 mb-0.5">
                              <CalendarDays size={12} className="text-slate-400" />
                              {b.travelDate
                                ? new Date(b.travelDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                                : "—"}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={12} className="text-slate-400" />
                              {b.numberOfPeople || 1} traveler{b.numberOfPeople !== 1 ? "s" : ""}
                            </div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <p className="font-black text-slate-900 text-base">
                              USD {(b.totalAmount || 0).toLocaleString()}
                            </p>
                            {b.packagePrice && b.numberOfPeople > 1 && (
                              <p className="text-[11px] text-slate-400">
                                USD {b.packagePrice} × {b.numberOfPeople}
                              </p>
                            )}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <p className="text-xs font-semibold text-slate-700">{pmLabel(b)}</p>
                            <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 mt-1 rounded-full border inline-block ${statusBadge(payStatus)}`}>
                              {payStatus === "success" ? "paid" : payStatus}
                            </span>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <span className={`text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full border ${statusBadge(bookingStatus)}`}>
                              {bookingStatus}
                            </span>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            {slipUrl ? (
                              <button
                                onClick={() => setSelectedSlip({ url: slipUrl, invoiceNumber: b.invoiceNumber })}
                                className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 hover:bg-amber-100
                                           font-bold text-xs px-2.5 py-1 rounded-lg border border-amber-200 transition"
                              >
                                <Eye size={13} /> View Slip
                              </button>
                            ) : (
                              <span className="text-slate-300 text-xs">—</span>
                            )}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <div className="flex justify-center gap-0.5">
                              <button onClick={() => updateStatus(b._id, "confirmed")}
                                disabled={bookingStatus === "confirmed"} title="Confirm booking"
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed">
                                <CheckCircle size={18} />
                              </button>
                              <button onClick={() => updateStatus(b._id, "pending")}
                                disabled={bookingStatus === "pending"} title="Revert to pending"
                                className="p-2 text-amber-500 hover:bg-amber-50 rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed">
                                <Clock size={18} />
                              </button>
                              <button onClick={() => updateStatus(b._id, "cancelled")}
                                disabled={bookingStatus === "cancelled"} title="Cancel booking"
                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed">
                                <XCircle size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── MOBILE CARD LIST ── (shown only on mobile) */}
          <div className="md:hidden space-y-3">
            {loading ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-400 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  Loading bookings…
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-400 text-sm">
                No bookings match the current filter.
              </div>
            ) : (
              filtered.map((b) => {
                const slipUrl       = resolveSlipUrl(b);
                const bookingStatus = b.bookingStatus || "pending";
                const payStatus     = b.successfulPaymentId?.status || b.paymentStatus
                                     || (bookingStatus === "confirmed" ? "paid" : "pending");
                return (
                  <div key={b._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">

                    {/* Invoice + Trip */}
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border">
                          {b.invoiceNumber || "NO-INV"}
                        </span>
                        <span className="font-black text-slate-900 text-base shrink-0">
                          USD {(b.totalAmount || 0).toLocaleString()}
                        </span>
                      </div>
                      <p className="font-semibold text-slate-900 text-sm">{b.trip?.title || b.packageName || "—"}</p>
                    </div>

                    {/* Customer */}
                    <div className="border-t border-slate-100 pt-3">
                      <p className="font-semibold text-slate-800 text-sm">
                        {b.buyer?.firstName || "Guest"} {b.buyer?.lastName || ""}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">{b.buyer?.email || "—"}</p>
                    </div>

                    {/* Date & Pax */}
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500 border-t border-slate-100 pt-3">
                      <span className="flex items-center gap-1">
                        <CalendarDays size={12} />
                        {b.travelDate
                          ? new Date(b.travelDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                          : "—"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {b.numberOfPeople || 1} traveler{b.numberOfPeople !== 1 ? "s" : ""}
                      </span>
                      <span className="font-medium text-slate-600">{pmLabel(b)}</span>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
                      <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border ${statusBadge(payStatus)}`}>
                        Pay: {payStatus === "success" ? "paid" : payStatus}
                      </span>
                      <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border ${statusBadge(bookingStatus)}`}>
                        {bookingStatus}
                      </span>
                      {slipUrl && (
                        <button
                          onClick={() => setSelectedSlip({ url: slipUrl, invoiceNumber: b.invoiceNumber })}
                          className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 font-bold text-xs px-2 py-0.5 rounded-lg border border-amber-200"
                        >
                          <Eye size={12} /> View Slip
                        </button>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 border-t border-slate-100 pt-3">
                      <button onClick={() => updateStatus(b._id, "confirmed")}
                        disabled={bookingStatus === "confirmed"}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl text-xs font-bold transition border border-emerald-100 disabled:opacity-30 disabled:cursor-not-allowed">
                        <CheckCircle size={14} /> Confirm
                      </button>
                      <button onClick={() => updateStatus(b._id, "pending")}
                        disabled={bookingStatus === "pending"}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-xl text-xs font-bold transition border border-amber-100 disabled:opacity-30 disabled:cursor-not-allowed">
                        <Clock size={14} /> Pending
                      </button>
                      <button onClick={() => updateStatus(b._id, "cancelled")}
                        disabled={bookingStatus === "cancelled"}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl text-xs font-bold transition border border-rose-100 disabled:opacity-30 disabled:cursor-not-allowed">
                        <XCircle size={14} /> Cancel
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </main>

      {/* ── SLIP MODAL ── */}
      {selectedSlip && (
        <div
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedSlip(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-lg p-5 sm:p-6 shadow-2xl border border-slate-100 relative max-h-[95vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSlip(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition z-10"
            >
              <X size={18} />
            </button>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 flex items-center gap-2 pr-10">
              <FileText className="text-amber-500 shrink-0" size={20} />
              Bank Transfer Slip
            </h3>
            {selectedSlip.invoiceNumber && (
              <p className="text-xs font-mono text-slate-400 mb-4">Ref: {selectedSlip.invoiceNumber}</p>
            )}

            <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 flex-1 flex items-center justify-center min-h-0">
              <img
                src={
                  selectedSlip.url.startsWith("http")
                    ? selectedSlip.url
                    : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${selectedSlip.url}`
                }
                alt="Bank slip"
                className="w-full h-full object-contain max-h-[45vh]"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="hidden flex-col items-center gap-2 p-10 text-slate-400">
                <ImageOff size={40} className="opacity-40" />
                <p className="text-sm">Could not load slip image.</p>
                <a href={selectedSlip.url} target="_blank" rel="noreferrer"
                  className="text-indigo-600 text-xs underline">Open directly</a>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-3 text-center leading-relaxed">
              Verify the amount and sender details before confirming this booking.
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  const booking = bookings.find((b) => b.invoiceNumber === selectedSlip.invoiceNumber);
                  if (booking) updateStatus(booking._id, "confirmed");
                  setSelectedSlip(null);
                }}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-sm transition"
              >
                ✓ Confirm Booking
              </button>
              <button
                onClick={() => setSelectedSlip(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}