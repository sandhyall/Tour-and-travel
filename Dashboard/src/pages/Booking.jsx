import { useEffect, useState } from "react";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import {
  Search,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Users,
  DollarSign,
  CalendarDays,
  Eye,
  X,
} from "lucide-react";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  

  const [selectedSlip, setSelectedSlip] = useState(null);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/bookings", {
        headers: getAuthHeader(),
      });


      let bookingsArray = [];
      if (Array.isArray(data)) {
        bookingsArray = data;
      } else if (data?.bookings && Array.isArray(data.bookings)) {
        bookingsArray = data.bookings;
      } else if (data?.data && Array.isArray(data.data)) {
        bookingsArray = data.data;
      }

      setBookings(bookingsArray);
    } catch (err) {
      console.error("Fetch bookings error:", err);
      toast.error("Failed to load backend booking records.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    const updateToast = toast.loading(`Updating lifecycle status to ${status}...`);
    try {
      await axios.put(
        `/bookings/${id}/status`,
        { status },
        { headers: getAuthHeader() }
      );

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id
            ? { ...b, bookingStatus: status } 
            : b
        )
      );
      toast.success(`Status updated to ${status}!`, { id: updateToast });
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Backend state synchronization failure.", { id: updateToast });
    }
  };

  const safeBookings = Array.isArray(bookings) ? bookings : [];

  const filtered = safeBookings.filter((b) => {
    const term = search.toLowerCase();
    const name = `${b?.buyer?.firstName || ""} ${b?.buyer?.lastName || ""}`.toLowerCase();
    const tripTitle = b?.trip?.title?.toLowerCase() || "";
    const invoiceNum = b?.invoiceNumber?.toLowerCase() || "";

    return name.includes(term) || tripTitle.includes(term) || invoiceNum.includes(term);
  });

  const stats = {
    total: safeBookings.length,
    revenue: safeBookings.reduce((acc, curr) => {
      const isPaid = curr?.paymentStatus === "paid" || curr?.successfulPaymentId?.status === "success";
      return acc + (isPaid ? curr?.totalAmount || 0 : 0);
    }, 0),
    confirmed: safeBookings.filter((b) => b?.bookingStatus === "confirmed").length,
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 lg:ml-72 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header & Stats Cards */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">
              Booking Pipeline Operations
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Total Bookings</p>
                  <p className="text-2xl font-black text-slate-900">{stats.total}</p>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <DollarSign size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Verified Paid Revenue</p>
                  <p className="text-2xl font-black text-slate-900">${stats.revenue.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Confirmed Expeditions</p>
                  <p className="text-2xl font-black text-slate-900">{stats.confirmed}</p>
                </div>
              </div>
            </div>

            {/* Search Filter input */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search passenger name, trip, or invoice..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all shadow-sm text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Table Element */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200">
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Customer / Contact</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Trip / Package Details</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Price</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Tracking Status</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Audit Slips</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="p-12 text-center text-slate-400 text-sm font-medium">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                          Querying system records...
                        </div>
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-12 text-center text-slate-400 text-sm">
                        No active booking records discovered matching query.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((b) => {
                      const calculatedPaymentStatus = b.successfulPaymentId?.status || b.paymentStatus || "pending";

                      return (
                        <tr key={b._id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="p-4 whitespace-nowrap">
                            <p className="text-sm font-semibold text-slate-800">
                              {b.buyer?.firstName || "Unknown"} {b.buyer?.lastName || "User"}
                            </p>
                            <p className="text-[11px] text-slate-400 font-mono">
                              {b.buyer?.email || "missing-email"}
                            </p>
                          </td>
                          <td className="p-4">
                            {b.invoiceNumber && (
                              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border inline-block mb-1">
                                {b.invoiceNumber}
                              </span>
                            )}
                            <p className="font-semibold text-slate-900 text-sm line-clamp-1">
                              {b.trip?.title || b.packageName || "Deleted Expedition Link"}
                            </p>
                            <p className="text-[11px] flex items-center gap-1 text-slate-400 mt-0.5">
                              <CalendarDays size={12} />
                              {b.travelDate ? new Date(b.travelDate).toLocaleDateString("en-US", {
                                month: 'short', day: 'numeric', year: 'numeric'
                              }) : "Date Missing"} • {b.numberOfPeople || 1} Pax
                            </p>
                          </td>
                          <td className="p-4 text-center font-bold text-slate-800 text-sm whitespace-nowrap">
                            ${b.totalAmount || 0}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <div className="flex flex-col gap-1 w-24">
                              <span className={`text-[9px] tracking-wider text-center px-2 py-0.5 rounded-full font-black uppercase border ${
                                calculatedPaymentStatus === "success" || calculatedPaymentStatus === "paid"
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                  : "bg-amber-50 text-amber-600 border-amber-100"
                              }`}>
                                Pay: {calculatedPaymentStatus === "success" ? "paid" : calculatedPaymentStatus}
                              </span>
                              
                              <span className={`text-[9px] tracking-wider text-center px-2 py-0.5 rounded-full font-black uppercase border ${
                                b.bookingStatus === "confirmed"
                                  ? "bg-blue-50 text-blue-600 border-blue-100"
                                  : b.bookingStatus === "cancelled"
                                  ? "bg-rose-50 text-rose-600 border-rose-100"
                                  : "bg-amber-50 text-amber-600 border-amber-100"
                              }`}>
                                Book: {b.bookingStatus || "pending"}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <div className="flex flex-col gap-1.5 items-start">
                              {/* Option A: Digital Ticket PDF */}
                              {b.ticketPdf && (
                                <a href={b.ticketPdf} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-indigo-600 hover:underline font-bold text-xs">
                                  <FileText size={13} /> Ticket PDF
                                </a>
                              )}
                              {/* Option B: Bank Transfer Bank Slip Verification image */}
                              {b.bankSlipUrl || b.paymentDetails?.bankSlip ? (
                                <button 
                                  onClick={() => setSelectedSlip(b.bankSlipUrl || b.paymentDetails?.bankSlip)}
                                  className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded border border-amber-100"
                                >
                                  <Eye size={13} /> View Slip
                                </button>
                              ) : (
                                !b.ticketPdf && <span className="text-slate-300 text-xs">No Attachments</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <div className="flex items-center justify-center gap-0.5">
                              <button
                                onClick={() => updateStatus(b._id, "confirmed")}
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                                title="Approve & Confirm"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button
                                onClick={() => updateStatus(b._id, "pending")}
                                className="p-2 text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                                title="Set Back to Pending"
                              >
                                <Clock size={18} />
                              </button>
                              <button
                                onClick={() => updateStatus(b._id, "cancelled")}
                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                                title="Cancel Booking Allocation"
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

      {/* BANK SLIP VIEWING MODAL COMPONENT */}
      {selectedSlip && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative border border-slate-100">
            <button 
              onClick={() => setSelectedSlip(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="text-amber-500" /> Uploaded Transaction Receipt Audit
            </h3>
            <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 max-h-[60vh] flex items-center justify-center">
              <img 
                src={selectedSlip.startsWith('http') ? selectedSlip : `http://localhost:5000${selectedSlip}`} 
                alt="Bank Transfer Receipt Slip" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback string manipulation if public directory asset linking fails
                  e.target.src = "https://placehold.co/600x400?text=Receipt+Slip+Asset+Not+Found";
                }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Verify signatures, timestamps, and matching evaluation amounts before setting the account system to confirmed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}