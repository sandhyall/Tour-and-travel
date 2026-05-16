import { useState } from "react";
import axios from "../api/axios";

export default function ApiTester() {
  const [bookingId, setBookingId] = useState("");
  const [tripId, setTripId] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const callApi = async (fn) => {
    setLoading(true);
    try {
      const res = await fn();
      setOutput(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setOutput(JSON.stringify(err.response?.data || err.message, null, 2));
    } finally {
      setLoading(false);
    }
  };

  // Reusable Tailwind classes for consistency
  const sectionCard =
    "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md";
  const btnPrimary =
    "px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-sm transition-all active:scale-95 disabled:opacity-50";
  const inputStyle =
    "w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm transition-all mb-3";
  const labelStyle =
    "block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <span className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
              🧪
            </span>
            System API Tester
          </h2>
          <p className="text-slate-500 mt-2">
            Internal endpoint verification for Travel Wales Admin
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* DASHBOARD SECTION */}
            <section className={sectionCard}>
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                📊 Dashboard Stats
              </h3>
              <button
                className={btnPrimary}
                onClick={() => callApi(() => axios.get("/dashboard/stats"))}
              >
                Fetch Stats JSON
              </button>
            </section>

            {/* TRIPS SECTION */}
            <section className={sectionCard}>
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                ✈️ Trips Management
              </h3>
              <div className="flex flex-col gap-3">
                <button
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-semibold text-sm transition-all"
                  onClick={() => callApi(() => axios.get("/trips"))}
                >
                  List All Trips
                </button>
                <div className="pt-3 border-t border-slate-100">
                  <label className={labelStyle}>Specific Trip ID</label>
                  <input
                    className={inputStyle}
                    placeholder="e.g. 64b2f..."
                    value={tripId}
                    onChange={(e) => setTripId(e.target.value)}
                  />
                  <button
                    className="w-full py-2 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-lg font-bold text-xs transition-all"
                    onClick={() => callApi(() => axios.get(`/trips/${tripId}`))}
                  >
                    GET TRIP BY ID
                  </button>
                </div>
              </div>
            </section>

            {/* PAYMENT SECTION */}
            <section className={sectionCard}>
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                💳 Bank Gateway Test
              </h3>
              <label className={labelStyle}>Booking Reference</label>
              <input
                className={inputStyle}
                placeholder="BK-XXXX"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
              />
              <button
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm shadow-lg shadow-emerald-100 transition-all"
                onClick={() =>
                  callApi(() => axios.post("/payment/bank", { bookingId }))
                }
              >
                Trigger Bank Webhook
              </button>
            </section>
          </div>

          {/* Output Column */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 rounded-2xl shadow-2xl h-full flex flex-col overflow-hidden border border-slate-800">
              <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {loading ? "Requesting..." : "Response Console"}
                </span>
                <button
                  onClick={() => setOutput("")}
                  className="text-slate-400 hover:text-white text-xs font-bold transition-colors"
                >
                  CLEAR
                </button>
              </div>

              <div className="flex-1 p-6 overflow-auto custom-scrollbar">
                <pre className="font-mono text-sm leading-relaxed text-emerald-400 whitespace-pre-wrap">
                  {output || "// Select an action to view data output..."}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-10 text-center text-slate-400 text-xs font-medium">
        Authenticated Session as Admin • Environment:{" "}
        <span className="text-indigo-500">Production/v1</span>
      </div>
    </div>
  );
}
