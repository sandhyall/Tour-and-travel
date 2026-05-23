import { useEffect, useState } from "react";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import {
  CheckCircle,
  XCircle,
  Search,
  ClipboardList,
  AlertCircle
} from "lucide-react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Helper function to format authorization headers uniformly
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // ========================
  // FETCH BOOKINGS
  // ========================
  // ========================
  // FETCH BOOKINGS
  // ========================
  const fetchBookings = async () => {
    try {
      setLoading(true);
      
      // FIXED: Added "/all" to match your backend route pattern
      const { data } = await axios.get("/bookings/all", {
        headers: getAuthHeaders(),
      });

      // Flexible extraction setup to match data shape safely
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
      console.error("Fetch bookings layout error:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ========================
  // UPDATE STATUS (Optimistic State Update)
  // ========================
  // const updateStatus = async (id, status) => {
  //   try {
  //     await axios.put(
  //       `/bookings/${id}/status`,
  //       { status },
  //       { headers: getAuthHeaders() }
  //     );
      
  //     // Optimistically update state instantly instead of firing another expensive HTTP fetch call
  //     setBookings((prevBookings) =>
  //       prevBookings.map((b) =>
  //         b._id === id ? { ...b, bookingStatus: status } : b
  //       )
  //     );
  //   } catch (err) {
  //     console.error("Status synchronization failed:", err);
  //     alert(err.response?.data?.message || "Operational status update failed.");
  //   }
  // };

  //Update booking and payment
  // ─────────────────────────────────────────────
// CONFIRM BOOKING + PAYMENT TOGETHER
// PUT /api/bookings/:id/confirm-all
// ─────────────────────────────────────────────

const confirmAll = async (id) => {
  try {
    const { data } = await axios.put(
      `/bookings/${id}/confirm-all`,
      {},
      { headers: getAuthHeaders() }
    );

    // update UI instantly
    setBookings((prev) =>
      prev.map((b) =>
        b._id === id
          ? {
              ...b,
              bookingStatus: "confirmed",
              paymentStatus: "success",
              successfulPaymentId: {
                ...b.successfulPaymentId,
                status: "success",
              },
            }
          : b
      )
    );
  } catch (err) {
    console.error(err);
    alert("Failed to confirm booking + payment");
  }
};


const updateStatus = async (id, status) => {
  try {
    await axios.put(
      `/bookings/${id}/status`,
      { status },
      { headers: getAuthHeaders() }
    );

    // update UI instantly
    setBookings((prevBookings) =>
      prevBookings.map((b) =>
        b._id === id
          ? {
              ...b,
              bookingStatus: status,
            }
          : b
      )
    );
  } catch (err) {
    console.error("Status synchronization failed:", err);

    alert(
      err.response?.data?.message ||
        "Operational status update failed."
    );
  }
};
  // ========================
  // STATUS COLOR MAPPER
  // ========================
  const getStatusColor = (status) => {
    const normalize = status?.toLowerCase() || "pending";
    if (["paid", "confirmed", "success"].includes(normalize)) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (["cancelled", "failed", "rejected"].includes(normalize)) {
      return "bg-rose-50 text-rose-700 border-rose-200";
    }
    // Default fallback to pending/amber state
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  // ========================
  // FILTER & SEARCH BOOKINGS
  // ========================
  const safeBookings = Array.isArray(bookings) ? bookings : [];

  const filteredBookings = safeBookings.filter((b) => {
    const term = searchTerm.toLowerCase();
    const firstName = b?.buyer?.firstName || "";
    const lastName = b?.buyer?.lastName || "";
    const name = `${firstName} ${lastName}`.toLowerCase();
    const email = b?.buyer?.email?.toLowerCase() || "";
    const trip = b?.trip?.title?.toLowerCase() || b?.packageName?.toLowerCase() || "";
    const invoice = b?.invoiceNumber?.toLowerCase() || "";

    return (
      name.includes(term) || 
      email.includes(term) || 
      trip.includes(term) ||
      invoice.includes(term)
    );
  });

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 lg:ml-72 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ClipboardList className="text-indigo-600" />
                Admin Bookings
              </h1>
              <p className="text-sm text-slate-500">
                Manage all trip bookings and update operational statuses
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-xs text-sm"
                placeholder="Search name, trip, invoice..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* TABLE CONTAINER */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Invoice / Trip</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Travel Date</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Status Flags</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="p-12 text-center text-slate-400 font-medium">
                        <div className="flex justify-center items-center gap-2">
                          <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                          Loading secure booking system logs...
                        </div>
                      </td>
                    </tr>
                  ) : filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-12 text-center text-slate-400">
                        No official matching bookings caught in current stream.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => {
                      const calculatedPaymentStatus = b.successfulPaymentId?.status || b.paymentStatus || "pending";
                      const currentBookingStatus = b.bookingStatus || "pending";
                      
                      return (
                        <tr key={b._id} className="hover:bg-slate-50/40 transition-colors">
                          
                          {/* INVOICE & TRIP */}
                          <td className="p-4">
                            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border inline-block mb-1">
                              {b.invoiceNumber || "NO-INVOICE"}
                            </span>
                            <div className="font-semibold text-slate-900 line-clamp-1">
                              {b.trip?.title || b.packageName || "Deleted Expedition Link"}
                            </div>
                          </td>

                          {/* CUSTOMER */}
                          <td className="p-4">
                            <div className="font-medium text-slate-900">
                              {b.buyer?.firstName || "Guest"} {b.buyer?.lastName || "User"}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              {b.buyer?.email || "N/A"}
                            </div>
                          </td>

                          {/* DATE */}
                          <td className="p-4 text-slate-600 whitespace-nowrap">
                            {b.travelDate ? new Date(b.travelDate).toLocaleDateString("en-US", {
                              year: 'numeric', month: 'short', day: 'numeric'
                            }) : "-"}
                          </td>

                          {/* AMOUNT */}
                         <td className="p-4 whitespace-nowrap">
  <div className="font-bold text-slate-900">
    ${b.totalAmount ? b.totalAmount.toLocaleString() : "0"}
  </div>

  {(b.bankSlip?.url || b.bankSlipUrl) && (
    <a
      href={b.bankSlip?.url || b.bankSlipUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[11px] text-indigo-600 hover:text-indigo-800 underline mt-1 inline-block"
    >
      View Payment Slip
    </a>
  )}
</td>

                          {/* STATUS BADGES */}
                          <td className="p-4 whitespace-nowrap">
                            <div className="flex flex-col gap-1 w-28">
                              <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border text-center ${getStatusColor(calculatedPaymentStatus)}`}>
                                Pay: {calculatedPaymentStatus}
                              </span>
                              <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full border text-center ${getStatusColor(currentBookingStatus)}`}>
                                Book: {currentBookingStatus}
                              </span>
                            </div>
                          </td>

                          {/* ACTIONS */}
                          <td className="p-4 text-center whitespace-nowrap">
                            <div className="flex justify-center gap-0.5">
                              <button
  onClick={() => confirmAll(b._id)}
  title="Confirm Booking + Payment"
  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
>


                                <CheckCircle size={18} />
                              </button>

                              <button
                                onClick={() => updateStatus(b._id, "pending")}
                                title="Revert back to Pending State"
                                className="p-2 text-amber-500 hover:bg-amber-50 rounded-xl transition-colors"
                              >
                                <AlertCircle size={18} />
                              </button>

                              <button
                                onClick={() => updateStatus(b._id, "cancelled")}
                                title="Reject & Cancel Order"
                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
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
    </div>
  );
}