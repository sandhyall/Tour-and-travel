// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import Sidebar from "../components/Sidebar";
// import { 
//   CheckCircle, 
//   XCircle, 
//   ExternalLink, 
//   Search, 
//   ClipboardList, 
//   User, 
//   Calendar, 
//   DollarSign 
// } from "lucide-react";

// export default function AdminBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("/bookings");
//       setBookings(data);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const verify = async (id) => {
//     if (!window.confirm("Verify this payment?")) return;
//     try {
//       await axios.put(`/bookings/${id}/verify`);
//       fetchBookings();
//     } catch (err) {
//       alert("Verification failed");
//     }
//   };

//   const updateStatus = async (id, status) => {
//     if (!window.confirm(`Mark booking as ${status}?`)) return;
//     try {
//       await axios.put(`/bookings/${id}/status`, { status });
//       fetchBookings();
//     } catch (err) {
//       alert("Status update failed");
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "paid": case "confirmed": return "bg-emerald-100 text-emerald-700 border-emerald-200";
//       case "pending": return "bg-amber-100 text-amber-700 border-amber-200";
//       case "cancelled": return "bg-rose-100 text-rose-700 border-rose-200";
//       default: return "bg-slate-100 text-slate-700 border-slate-200";
//     }
//   };

//   return (
//     <div className="flex bg-slate-50 min-h-screen">
//       <Sidebar />

//       <main className="flex-1 lg:ml-72 p-4 md:p-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
//                 <ClipboardList className="text-indigo-600" />
//                 Booking Management
//               </h1>
//               <p className="text-slate-500 text-sm mt-1">Review, verify payments, and track trip registrations.</p>
//             </div>
            
//             {/* Simple Search Mockup */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//               <input 
//                 type="text" 
//                 placeholder="Search bookings..." 
//                 className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64 transition-all"
//               />
//             </div>
//           </div>

//           {/* Table Container */}
//           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-slate-50 border-b border-slate-200">
//                     <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Trip Details</th>
//                     <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
//                     <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Travel Date</th>
//                     <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Finance</th>
//                     <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
//                     <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100">
//                   {loading ? (
//                     <tr><td colSpan="6" className="p-20 text-center text-slate-400">Loading bookings...</td></tr>
//                   ) : bookings.length === 0 ? (
//                     <tr><td colSpan="6" className="p-20 text-center text-slate-400">No bookings found.</td></tr>
//                   ) : bookings.map((b) => (
//                     <tr key={b._id} className="hover:bg-slate-50 transition-colors">
//                       {/* Trip Info */}
//                       <td className="p-4">
//                         <p className="font-semibold text-slate-800 line-clamp-1">{b.trip?.title}</p>
//                         <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
//                            ID: {b._id.slice(-6).toUpperCase()}
//                         </p>
//                       </td>

//                       {/* Customer Info */}
//                       <td className="p-4">
//                         <div className="flex items-center gap-2">
//                           <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold">
//                             {b.buyer?.firstName?.[0]}{b.buyer?.lastName?.[0]}
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium text-slate-700">{b.buyer?.firstName} {b.buyer?.lastName}</p>
//                             <p className="text-xs text-slate-400">{b.buyer?.email}</p>
//                           </div>
//                         </div>
//                       </td>

//                       {/* Date & People */}
//                       <td className="p-4">
//                         <div className="text-sm text-slate-600 flex items-center gap-1.5">
//                           <Calendar size={14} className="text-slate-400" />
//                           {new Date(b.travelDate).toLocaleDateString()}
//                         </div>
//                         <p className="text-xs text-slate-400 mt-1">{b.numberOfPeople} People</p>
//                       </td>

//                       {/* Price & Slip */}
//                       <td className="p-4">
//                         <div className="text-sm font-bold text-slate-800 flex items-center gap-0.5">
//                           <DollarSign size={14} />
//                           {b.totalAmount}
//                         </div>
//                         {b.bankSlip?.url && (
//                           <a 
//                             href={b.bankSlip.url} 
//                             target="_blank" 
//                             rel="noreferrer"
//                             className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center gap-1 mt-1 uppercase"
//                           >
//                             View Slip <ExternalLink size={10} />
//                           </a>
//                         )}
//                       </td>

//                       {/* Status Badges */}
//                       <td className="p-4">
//                         <div className="flex flex-col gap-1.5">
//                           <span className={`text-[10px] px-2 py-0.5 rounded-full border w-fit font-bold uppercase ${getStatusColor(b.paymentStatus)}`}>
//                             Payment: {b.paymentStatus}
//                           </span>
//                           <span className={`text-[10px] px-2 py-0.5 rounded-full border w-fit font-bold uppercase ${getStatusColor(b.bookingStatus)}`}>
//                             Booking: {b.bookingStatus}
//                           </span>
//                         </div>
//                       </td>

//                       {/* Actions */}
//                       <td className="p-4">
//                         <div className="flex items-center justify-center gap-2">
//                           {b.paymentStatus !== "paid" && (
//                             <button
//                               onClick={() => verify(b._id)}
//                               className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg transition-all"
//                               title="Verify Payment"
//                             >
//                               <CheckCircle size={18} />
//                             </button>
//                           )}
//                           <button
//                             onClick={() => updateStatus(b._id, "cancelled")}
//                             className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition-all"
//                             title="Cancel Booking"
//                           >
//                             <XCircle size={18} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
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
import { 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Search, 
  ClipboardList, 
  Calendar, 
  DollarSign 
} from "lucide-react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/bookings");
      
      // FIX: Handle both direct array responses and nested object responses safely
      if (Array.isArray(data)) {
        setBookings(data);
      } else if (data && Array.isArray(data.bookings)) {
        setBookings(data.bookings); // If your backend wraps it in { bookings: [...] }
      } else if (data && Array.isArray(data.data)) {
        setBookings(data.data); // If your backend wraps it in { data: [...] }
      } else {
        setBookings([]); // Fallback to avoid breaking .filter()
      }
      
    } catch (err) {
      console.error("Fetch Error:", err);
      setBookings([]); // Fallback on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const verify = async (id) => {
    if (!window.confirm("Verify this payment?")) return;
    try {
      await axios.put(`/bookings/${id}/verify`);
      fetchBookings();
    } catch (err) {
      alert("Verification failed");
    }
  };

  const updateStatus = async (id, status) => {
    if (!window.confirm(`Mark booking as ${status}?`)) return;
    try {
      await axios.put(`/bookings/${id}/status`, { status });
      fetchBookings();
    } catch (err) {
      alert("Status update failed");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid": case "confirmed": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "cancelled": return "bg-rose-100 text-rose-700 border-rose-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  // FIX: Added an extra Array.isArray check here as an ultimate shield
  const filteredBookings = Array.isArray(bookings) 
    ? bookings.filter((b) => {
        const term = searchTerm.toLowerCase();
        const tripTitle = b.trip?.title?.toLowerCase() || "";
        const firstName = b.buyer?.firstName?.toLowerCase() || "";
        const lastName = b.buyer?.lastName?.toLowerCase() || "";
        const fullName = `${firstName} ${lastName}`;
        const email = b.buyer?.email?.toLowerCase() || "";

        return tripTitle.includes(term) || fullName.includes(term) || email.includes(term);
      })
    : [];

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 lg:ml-72 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ClipboardList className="text-indigo-600" />
                Booking Management
              </h1>
              <p className="text-slate-500 text-sm mt-1">Review, verify payments, and track trip registrations.</p>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search bookings..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64 transition-all"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Trip Details</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Travel Date</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Finance</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr><td colSpan="6" className="p-20 text-center text-slate-400">Loading bookings...</td></tr>
                  ) : filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-20 text-center text-slate-400">
                        {bookings.length === 0 ? "No bookings found." : "No matching results found."}
                      </td>
                    </tr>
                  ) : filteredBookings.map((b) => (
                    <tr key={b._id} className="hover:bg-slate-50 transition-colors">
                      {/* Trip Info */}
                      <td className="p-4">
                        <p className="font-semibold text-slate-800 line-clamp-1">{b.trip?.title}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                           ID: {b._id ? b._id.slice(-6).toUpperCase() : "N/A"}
                        </p>
                      </td>

                      {/* Customer Info */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold">
                            {b.buyer?.firstName?.[0]}{b.buyer?.lastName?.[0]}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700">{b.buyer?.firstName} {b.buyer?.lastName}</p>
                            <p className="text-xs text-slate-400">{b.buyer?.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Date & People */}
                      <td className="p-4">
                        <div className="text-sm text-slate-600 flex items-center gap-1.5">
                          <Calendar size={14} className="text-slate-400" />
                          {b.travelDate ? new Date(b.travelDate).toLocaleDateString() : "N/A"}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{b.numberOfPeople} People</p>
                      </td>

                      {/* Price & Slip */}
                      <td className="p-4">
                        <div className="text-sm font-bold text-slate-800 flex items-center gap-0.5">
                          <DollarSign size={14} />
                          {b.totalAmount}
                        </div>
                        {b.bankSlip?.url && (
                          <a 
                            href={b.bankSlip.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center gap-1 mt-1 uppercase"
                          >
                            View Slip <ExternalLink size={10} />
                          </a>
                        )}
                      </td>

                      {/* Status Badges */}
                      <td className="p-4">
                        <div className="flex flex-col gap-1.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border w-fit font-bold uppercase ${getStatusColor(b.paymentStatus)}`}>
                            Payment: {b.paymentStatus}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border w-fit font-bold uppercase ${getStatusColor(b.bookingStatus)}`}>
                            Booking: {b.bookingStatus}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          {b.paymentStatus !== "paid" && (
                            <button
                              onClick={() => verify(b._id)}
                              className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg transition-all"
                              title="Verify Payment"
                            >
                              <CheckCircle size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => updateStatus(b._id, "cancelled")}
                            className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition-all"
                            title="Cancel Booking"
                          >
                            <XCircle size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}