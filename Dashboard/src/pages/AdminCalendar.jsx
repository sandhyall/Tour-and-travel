import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import { Calendar as CalendarIcon, Users, CheckCircle2, AlertCircle, Info } from "lucide-react";
import "react-calendar/dist/Calendar.css";
// import "../styles/admin-calendar.css"; 

export default function AdminCalendar() {
  const [data, setData] = useState([]);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchCalendar();
  }, []);

  const fetchCalendar = async () => {
    try {
      const res = await axios.get("/dashboard/calendar");
      setData(res.data);
    } catch (err) {
      console.error("Calendar data fetch error:", err);
    }
  };

 const getDayData = (date) => {
  const d = date.toLocaleDateString('en-CA'); 
  return data.find((x) => x.date === d);
};

const groupedData = data.reduce((acc, item) => {
  if (!acc[item.date]) {
    acc[item.date] = {
      date: item.date,
      bookings: [],
      count: 0,
      remainingSeats: 999
    };
  }

  acc[item.date].bookings.push(item);
  acc[item.date].count += 1;

  return acc;
}, {});

const handleClickDay = (date) => {
  setSelectedDate(date);

  const d = date.toLocaleDateString("en-CA");

  const found = data.filter((x) => x.date === d);

  setSelectedBookings(found);
};

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 lg:ml-72 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <CalendarIcon className="text-indigo-600" />
                Trip Schedule & Bookings
              </h1>
              <p className="text-slate-500 text-sm mt-1">Monitor daily trip density and remaining seat capacity.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Calendar Card */}
            <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                onClickDay={handleClickDay}
                className="border-none w-full admin-custom-calendar"
                tileContent={({ date }) => {
  const dayData = getDayData(date);

  if (!dayData) return null;

  const isFull = dayData.remainingSeats <= 0;

  return (
    <div className="flex flex-col items-center mt-1">
      <div className={`text-[10px] font-bold px-1.5 rounded-full ${
        isFull ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
      }`}>
        {dayData.count}
      </div>

      <div className="flex gap-0.5 mt-0.5">
        {(dayData?.bookings || []).slice(0, 3).map((_, i) => (
          <span
            key={i}
            className={`w-1 h-1 rounded-full ${
              isFull ? 'bg-rose-400' : 'bg-indigo-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}}
                tileClassName={({ date }) => {
                  const dayData = getDayData(date);
                  if (!dayData) return "text-slate-400";
                  return dayData.remainingSeats <= 0 ? "bg-rose-50/50" : "bg-emerald-50/30";
                }}
              />
              
              {/* Legend */}
              <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500 border-t pt-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-emerald-100 border border-emerald-200 rounded-sm"></span> Available
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-rose-100 border border-rose-200 rounded-sm"></span> Full/Over
                </div>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 min-h-[400px] flex flex-col">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-slate-800">
                    {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </h2>
                  <p className="text-xs text-slate-400">Scheduled Bookings</p>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                  {selectedBookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                      <Info size={32} strokeWidth={1.5} className="mb-2 opacity-20" />
                      <p className="text-sm italic">No trips scheduled for this date</p>
                    </div>
                  ) : (
                    selectedBookings.map((b) => (
  <div key={b.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors">
    
    <div className="flex justify-between items-start mb-2">
      <span className="text-xs font-bold text-indigo-600 uppercase tracking-tighter">
        Trip ID: {(b.id || "").slice(-5)}
      </span>

      {b.payment === "paid" ? (
        <CheckCircle2 size={14} className="text-emerald-500" />
      ) : (
        <AlertCircle size={14} className="text-amber-500" />
      )}
    </div>

    <h4 className="text-sm font-semibold text-slate-800 leading-snug mb-1">
      {b.title || "Trip"}
    </h4>

    <div className="flex items-center gap-3 mt-3 text-[11px] font-medium text-slate-500 uppercase">
      <span className="flex items-center gap-1">
        <Users size={12} /> {b.people || 0}
      </span>
    </div>

  </div>
))
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}