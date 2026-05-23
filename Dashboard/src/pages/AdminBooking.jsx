// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import Sidebar from "../components/Sidebar";
// import {
//   CheckCircle,
//   XCircle,
//   Search,
//   ClipboardList,
//   AlertCircle
// } from "lucide-react";

// export default function AdminBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Helper function to format authorization headers uniformly
//   const getAuthHeaders = () => {
//     const token = localStorage.getItem("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   };

//   // ========================
//   // FETCH BOOKINGS
//   // ========================
//   // ========================
//   // FETCH BOOKINGS
//   // ========================
//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
      
//       // FIXED: Added "/all" to match your backend route pattern
//       const { data } = await axios.get("/bookings/all", {
//         headers: getAuthHeaders(),
//       });

//       // Flexible extraction setup to match data shape safely
//       let bookingsArray = [];
//       if (Array.isArray(data)) {
//         bookingsArray = data;
//       } else if (data?.bookings && Array.isArray(data.bookings)) {
//         bookingsArray = data.bookings;
//       } else if (data?.data && Array.isArray(data.data)) {
//         bookingsArray = data.data;
//       }

//       setBookings(bookingsArray);
//     } catch (err) {
//       console.error("Fetch bookings layout error:", err);
//       setBookings([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   // ========================
//   // UPDATE STATUS (Optimistic State Update)
//   // ========================
//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(
//         `/bookings/${id}/status`,
//         { status },
//         { headers: getAuthHeaders() }
//       );
      
//       // Optimistically update state instantly instead of firing another expensive HTTP fetch call
//       setBookings((prevBookings) =>
//         prevBookings.map((b) =>
//           b._id === id ? { ...b, bookingStatus: status } : b
//         )
//       );
//     } catch (err) {
//       console.error("Status synchronization failed:", err);
//       alert(err.response?.data?.message || "Operational status update failed.");
//     }
//   };

//   // ========================
//   // STATUS COLOR MAPPER
//   // ========================
//   const getStatusColor = (status) => {
//     const normalize = status?.toLowerCase() || "pending";
//     if (["paid", "confirmed", "success"].includes(normalize)) {
//       return "bg-emerald-50 text-emerald-700 border-emerald-200";
//     }
//     if (["cancelled", "failed", "rejected"].includes(normalize)) {
//       return "bg-rose-50 text-rose-700 border-rose-200";
//     }
   
//     return "bg-amber-50 text-amber-700 border-amber-200";
//   };

 
//   const safeBookings = Array.isArray(bookings) ? bookings : [];

//   const filteredBookings = safeBookings.filter((b) => {
//     const term = searchTerm.toLowerCase();
//     const firstName = b?.buyer?.firstName || "";
//     const lastName = b?.buyer?.lastName || "";
//     const name = `${firstName} ${lastName}`.toLowerCase();
//     const email = b?.buyer?.email?.toLowerCase() || "";
//     const trip = b?.trip?.title?.toLowerCase() || b?.packageName?.toLowerCase() || "";
//     const invoice = b?.invoiceNumber?.toLowerCase() || "";

//     return (
//       name.includes(term) || 
//       email.includes(term) || 
//       trip.includes(term) ||
//       invoice.includes(term)
//     );
//   });

//   return (
//     <div className="flex bg-slate-50 min-h-screen">
//       <Sidebar />

//       <main className="flex-1 lg:ml-72 p-4 md:p-8">
//         <div className="max-w-7xl mx-auto">

//           {/* HEADER */}
//           <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
//                 <ClipboardList className="text-indigo-600" />
//                 Admin Bookings
//               </h1>
//               <p className="text-sm text-slate-500">
//                 Manage all trip bookings and update operational statuses
//               </p>
//             </div>

//             {/* SEARCH */}
//             <div className="relative">
//               <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
//               <input
//                 className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-xs text-sm"
//                 placeholder="Search name, trip, invoice..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* TABLE CONTAINER */}
//           <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
//                   <tr>
//                     <th className="p-4">Invoice / Trip</th>
//                     <th className="p-4">Customer</th>
//                     <th className="p-4">Travel Date</th>
//                     <th className="p-4">Total Amount</th>
//                     <th className="p-4">Status Flags</th>
                    
//                     <th className="p-4 text-center">Actions</th>
//                     <th className="p-4">Slip / Receipt</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
//                   {loading ? (
//                     <tr>
//                       <td colSpan="6" className="p-12 text-center text-slate-400 font-medium">
//                         <div className="flex justify-center items-center gap-2">
//                           <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//                           Loading secure booking system logs...
//                         </div>
//                       </td>
//                     </tr>
//                   ) : filteredBookings.length === 0 ? (
//                     <tr>
//                       <td colSpan="6" className="p-12 text-center text-slate-400">
//                         No official matching bookings caught in current stream.
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredBookings.map((b) => {
//                       const calculatedPaymentStatus = b.successfulPaymentId?.status || b.paymentStatus || "pending";
//                       const currentBookingStatus = b.bookingStatus || "pending";
                      
//                       return (
//                         <tr key={b._id} className="hover:bg-slate-50/40 transition-colors">
                          
//                           {/* INVOICE & TRIP */}
//                           <td className="p-4">
//                             <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border inline-block mb-1">
//                               {b.invoiceNumber || "NO-INVOICE"}
//                             </span>
//                             <div className="font-semibold text-slate-900 line-clamp-1">
//                               {b.trip?.title || b.packageName || "Deleted Expedition Link"}
//                             </div>
//                           </td>

//                           {/* CUSTOMER */}
//                           <td className="p-4">
//                             <div className="font-medium text-slate-900">
//                               {b.buyer?.firstName || "Guest"} {b.buyer?.lastName || "User"}
//                             </div>
//                             <div className="text-[11px] text-slate-400 font-mono">
//                               {b.buyer?.email || "N/A"}
//                             </div>
//                           </td>

//                           {/* DATE */}
//                           <td className="p-4 text-slate-600 whitespace-nowrap">
//                             {b.travelDate ? new Date(b.travelDate).toLocaleDateString("en-US", {
//                               year: 'numeric', month: 'short', day: 'numeric'
//                             }) : "-"}
//                           </td>

//                           {/* AMOUNT */}
//                           <td className="p-4 font-bold text-slate-900 whitespace-nowrap">
//                             ${b.totalAmount ? b.totalAmount.toLocaleString() : "0"}
//                           </td>

//                           {/* STATUS BADGES */}
//                           <td className="p-4 whitespace-nowrap">
//                             <div className="flex flex-col gap-1 w-28">
//                               <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border text-center ${getStatusColor(calculatedPaymentStatus)}`}>
//                                 Pay: {calculatedPaymentStatus}
//                               </span>
//                               <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border text-center ${getStatusColor(currentBookingStatus)}`}>
//                                 Book: {currentBookingStatus}
//                               </span>
//                             </div>
//                           </td>

//                           {/* ACTIONS */}
//                           <td className="p-4 text-center whitespace-nowrap">
//                             <div className="flex justify-center gap-0.5">
//                               <button
//                                 onClick={() => updateStatus(b._id, "confirmed")}
//                                 title="Approve & Confirm Booking"
//                                 className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
//                               >
//                                 <CheckCircle size={18} />
//                               </button>

//                               <button
//                                 onClick={() => updateStatus(b._id, "pending")}
//                                 title="Revert back to Pending State"
//                                 className="p-2 text-amber-500 hover:bg-amber-50 rounded-xl transition-colors"
//                               >
//                                 <AlertCircle size={18} />
//                               </button>

//                               <button
//                                 onClick={() => updateStatus(b._id, "cancelled")}
//                                 title="Reject & Cancel Order"
//                                 className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
//                               >
//                                 <XCircle size={18} />
//                               </button>
//                             </div>
//                           </td>

//                         </tr>
//                       );
//                     })
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//         </div>
//       </main>
//     </div>
//   );
// }

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
  const [bookings, setBookings]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedSlip, setSelectedSlip] = useState(null);  // { url, invoiceNumber }

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // ─── FETCH ────────────────────────────────────────────────────────────────
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/bookings/all", {
        headers: getAuthHeaders(),
      });

      let arr = [];
      if (Array.isArray(data))                          arr = data;
      else if (Array.isArray(data?.bookings))           arr = data.bookings;
      else if (Array.isArray(data?.data))               arr = data.data;

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
      await axios.put(
        `/bookings/${id}/status`,
        { status },
        { headers: getAuthHeaders() }
      );
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, bookingStatus: status } : b))
      );
      toast.success(`Booking marked as ${status}`, { id: tid });
    } catch (err) {
      console.error("updateStatus error:", err);
      toast.error(err.response?.data?.message || "Update failed.", { id: tid });
    }
  };

  // ─── HELPERS ──────────────────────────────────────────────────────────────
  const statusBadge = (status) => {
    const s = status?.toLowerCase() || "pending";
    if (["confirmed", "paid", "success"].includes(s))
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (["cancelled", "failed", "rejected"].includes(s))
      return "bg-rose-50 text-rose-700 border-rose-200";
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  // Resolve bank slip URL from either shape:
  //   { bankSlip: { url, public_id } }  ← what the controller saves
  //   { bankSlipUrl: "…" }              ← legacy flat field
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

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 lg:ml-72 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* ── HEADER ── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ClipboardList className="text-indigo-600" size={22} />
                Booking Management
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Review, verify, and manage all trip bookings
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl w-full md:w-64
                           focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-sm shadow-sm"
                placeholder="Name, email, trip, invoice…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total",     value: stats.total,     icon: <Users size={18}/>,       bg: "bg-indigo-50",  text: "text-indigo-600" },
              { label: "Confirmed", value: stats.confirmed, icon: <CheckCircle size={18}/>, bg: "bg-emerald-50", text: "text-emerald-600" },
              { label: "Pending",   value: stats.pending,   icon: <Clock size={18}/>,       bg: "bg-amber-50",   text: "text-amber-600" },
              { label: "Cancelled", value: stats.cancelled, icon: <XCircle size={18}/>,     bg: "bg-rose-50",    text: "text-rose-600" },
            ].map((s) => (
              <div key={s.label}
                   className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${s.bg} ${s.text}`}>{s.icon}</div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                  <p className="text-xl font-black text-slate-900">{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue strip */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl p-5 flex items-center gap-4 text-white shadow-md">
            <div className="p-3 bg-white/20 rounded-xl">
              <DollarSign size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold opacity-80 uppercase tracking-wider">
                Confirmed Revenue
              </p>
              <p className="text-3xl font-black">
                USD {stats.revenue.toLocaleString()}
              </p>
            </div>
          </div>

          {/* ── FILTER TABS ── */}
          <div className="flex gap-2 flex-wrap">
            {["all", "pending", "confirmed", "cancelled"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize border transition-all ${
                  filterStatus === s
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                }`}
              >
                {s === "all" ? `All (${stats.total})` : s}
              </button>
            ))}
          </div>

          {/* ── TABLE ── */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
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
                      const payStatus     = b.successfulPaymentId?.status
                                           || b.paymentStatus
                                           || (bookingStatus === "confirmed" ? "paid" : "pending");

                      // Payment method label
                      const pmLabel =
                        b.paymentMethod === "swift_bank_transfer" ? "Bank Transfer"
                        : b.paymentMethod === "card"              ? "Card / Gateway"
                        : b.paymentMethod                         ? b.paymentMethod
                        : "—";

                      return (
                        <tr key={b._id} className="hover:bg-slate-50/50 transition-colors">

                          {/* Invoice & Trip */}
                          <td className="p-4 max-w-[180px]">
                            <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border inline-block mb-1">
                              {b.invoiceNumber || "NO-INV"}
                            </span>
                            <p className="font-semibold text-slate-900 line-clamp-1 text-sm">
                              {b.trip?.title || b.packageName || "—"}
                            </p>
                            {b.packageName && b.trip?.title && (
                              <p className="text-[11px] text-slate-400">{b.packageName}</p>
                            )}
                          </td>

                          {/* Customer */}
                          <td className="p-4 whitespace-nowrap">
                            <p className="font-semibold text-slate-800">
                              {b.buyer?.firstName || "Guest"} {b.buyer?.lastName || ""}
                            </p>
                            <p className="text-[11px] text-slate-400 font-mono">
                              {b.buyer?.email || "—"}
                            </p>
                          </td>

                          {/* Date · Pax */}
                          <td className="p-4 whitespace-nowrap text-slate-600 text-xs">
                            <div className="flex items-center gap-1 mb-0.5">
                              <CalendarDays size={12} className="text-slate-400" />
                              {b.travelDate
                                ? new Date(b.travelDate).toLocaleDateString("en-US", {
                                    year: "numeric", month: "short", day: "numeric",
                                  })
                                : "—"}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={12} className="text-slate-400" />
                              {b.numberOfPeople || 1} traveler{b.numberOfPeople !== 1 ? "s" : ""}
                            </div>
                          </td>

                          {/* Amount */}
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

                          {/* Payment method + status */}
                          <td className="p-4 whitespace-nowrap">
                            <p className="text-xs font-semibold text-slate-700">{pmLabel}</p>
                            <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 mt-1 rounded-full border inline-block ${statusBadge(payStatus)}`}>
                              {payStatus === "success" ? "paid" : payStatus}
                            </span>
                          </td>

                          {/* Booking status */}
                          <td className="p-4 whitespace-nowrap">
                            <span className={`text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full border ${statusBadge(bookingStatus)}`}>
                              {bookingStatus}
                            </span>
                          </td>

                          {/* Slip */}
                          <td className="p-4 whitespace-nowrap">
                            {slipUrl ? (
                              <button
                                onClick={() =>
                                  setSelectedSlip({ url: slipUrl, invoiceNumber: b.invoiceNumber })
                                }
                                className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 hover:bg-amber-100
                                           font-bold text-xs px-2.5 py-1 rounded-lg border border-amber-200 transition"
                              >
                                <Eye size={13} /> View Slip
                              </button>
                            ) : (
                              <span className="text-slate-300 text-xs">—</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="p-4 whitespace-nowrap">
                            <div className="flex justify-center gap-0.5">
                              <button
                                onClick={() => updateStatus(b._id, "confirmed")}
                                disabled={bookingStatus === "confirmed"}
                                title="Confirm booking"
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button
                                onClick={() => updateStatus(b._id, "pending")}
                                disabled={bookingStatus === "pending"}
                                title="Revert to pending"
                                className="p-2 text-amber-500 hover:bg-amber-50 rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
                              >
                                <Clock size={18} />
                              </button>
                              <button
                                onClick={() => updateStatus(b._id, "cancelled")}
                                disabled={bookingStatus === "cancelled"}
                                title="Cancel booking"
                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
                              >
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

        </div>
      </main>

     
      {selectedSlip && (
        <div
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedSlip(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSlip(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
              <FileText className="text-amber-500" size={20} />
              Bank Transfer Slip
            </h3>
            {selectedSlip.invoiceNumber && (
              <p className="text-xs font-mono text-slate-400 mb-4">
                Ref: {selectedSlip.invoiceNumber}
              </p>
            )}

            <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 max-h-[60vh] flex items-center justify-center">
              <img
                src={
                  selectedSlip.url.startsWith("http")
                    ? selectedSlip.url
                    : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${selectedSlip.url}`
                }
                alt="Bank slip"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback if image fails to load */}
              <div
                className="hidden flex-col items-center gap-2 p-10 text-slate-400"
              >
                <ImageOff size={40} className="opacity-40" />
                <p className="text-sm">Could not load slip image.</p>
                <a
                  href={selectedSlip.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 text-xs underline"
                >
                  Open directly
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-3 text-center leading-relaxed">
              Verify the amount and sender details before confirming this booking.
            </p>

            {/* Quick-confirm from the modal */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  const booking = bookings.find(
                    (b) => b.invoiceNumber === selectedSlip.invoiceNumber
                  );
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