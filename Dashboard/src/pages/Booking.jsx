import { useEffect, useState } from "react";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import {
  Search,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Users,
  DollarSign,
  CalendarDays,
} from "lucide-react";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/bookings");
      
      // ✅ सुरक्षा: यदि ब्याकइन्डले अब्जेक्ट (जस्तै { bookings: [...] }) पठायो भने पनि सुरक्षित राख्ने
      if (Array.isArray(data)) {
        setBookings(data);
      } else if (data && Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      } else {
        setBookings([]); // गल्ती डेटा आए खाली एरे सेट गर्ने
      }
    } catch (err) {
      console.error(err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/bookings/${id}/status`, { status });
      fetchData();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // ✅ सुरक्षा: bookings एरे हो कि होइन चेक गरेर मात्र फिल्टर गर्ने
  const safeBookings = Array.isArray(bookings) ? bookings : [];

  const filtered = safeBookings.filter((b) => {
    const name = `${b?.buyer?.firstName || ""} ${b?.buyer?.lastName || ""}`;
    return name.toLowerCase().includes(search.toLowerCase());
  });

  // Simple Stats Calculation (using safeBookings)
  const stats = {
    total: safeBookings.length,
    revenue: safeBookings.reduce(
      (acc, curr) =>
        acc + (curr?.paymentStatus === "paid" ? curr?.totalAmount || 0 : 0),
      0,
    ),
    confirmed: safeBookings.filter((b) => b?.bookingStatus === "confirmed").length,
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 lg:ml-72 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header & Stats */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">
              Booking Overview
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    Total Bookings
                  </p>
                  <p className="text-xl font-bold">{stats.total}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <DollarSign size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    Paid Revenue
                  </p>
                  <p className="text-xl font-bold">${stats.revenue}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    Confirmed
                  </p>
                  <p className="text-xl font-bold">{stats.confirmed}</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search customer name..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Customer</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Trip Info</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Amount</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Ticket</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="p-12 text-center text-slate-400">
                        Loading data...
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-12 text-center text-slate-400">
                        No bookings found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((b) => (
                      <tr key={b._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <p className="text-sm font-semibold text-slate-800">
                            {b.buyer?.firstName} {b.buyer?.lastName}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate max-w-[150px]">
                            {b.buyer?.email}
                          </p>
                        </td>
                        <td className="p-4 text-sm text-slate-600">
                          <p className="font-medium line-clamp-1">
                            {b.trip?.title}
                          </p>
                          <p className="text-[11px] flex items-center gap-1 text-slate-400 mt-1">
                            <CalendarDays size={12} />{" "}
                            {b.travelDate ? new Date(b.travelDate).toLocaleDateString() : "N/A"} •{" "}
                            {b.numberOfPeople || 0} Ppl
                          </p>
                        </td>
                        <td className="p-4 text-center font-bold text-slate-800 text-sm">
                          ${b.totalAmount || 0}
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border w-fit ${
                                b.paymentStatus === "paid"
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                  : "bg-amber-50 text-amber-600 border-amber-100"
                              }`}
                            >
                              {b.paymentStatus || "pending"}
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border w-fit ${
                                b.bookingStatus === "confirmed"
                                  ? "bg-blue-50 text-blue-600 border-blue-100"
                                  : "bg-slate-50 text-slate-500 border-slate-100"
                              }`}
                            >
                              {b.bookingStatus || "pending"}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          {b.ticketPdf ? (
                            <a
                              href={b.ticketPdf}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-bold text-xs"
                            >
                              <FileText size={14} /> View
                            </a>
                          ) : (
                            <span className="text-slate-300 text-xs">N/A</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => updateStatus(b._id, "confirmed")}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Confirm"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() => updateStatus(b._id, "pending")}
                              className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              title="Set Pending"
                            >
                              <Clock size={18} />
                            </button>
                            <button
                              onClick={() => updateStatus(b._id, "cancelled")}
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Cancel"
                            >
                              <XCircle size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
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