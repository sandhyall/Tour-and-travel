import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit3,
  Calendar,
  Trash2,
  Clock,
  BarChart3,
  Mountain,
  Compass,
  CheckCircle2,
  Layers,
  Image as ImageIcon,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTrips = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/trips");
      setTrips(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching trips:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const deleteTrip = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this trip? This action cannot be undone.",
      )
    )
      return;
    try {
      await axios.delete(`/trips/${id}`);
      fetchTrips();
    } catch (err) {
      console.error("Error deleting trip:", err);
    }
  };

  const getCountryBadgeStyle = (country) => {
    switch (country?.toLowerCase()) {
      case "nepal":
        return "bg-red-50 text-red-700 border-red-100";
      case "bhutan":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "tibet":
        return "bg-blue-50 text-blue-700 border-blue-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  // ग्यालरीबाट इमेज एरे सुरक्षित रूपमा निकाल्न सहयोगी फङ्सन
  const getGalleryArray = (trip) => {
    const gallery = trip.gallery || trip.galleryImages || [];
    return Array.isArray(gallery) ? gallery : [];
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-900">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 lg:p-12">
        {/* HEADER SECTION WITH ACTION BUTTON */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Expedition Inventory <span className="text-indigo-600">.</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              Manage and update your Himalayan trekking packages and tours.
            </p>
          </div>
          {trips.length > 0 && (
            <button
              onClick={() => navigate("/add-trip")}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-sm shadow-indigo-500/10 transition-all active:scale-95"
            >
              <Plus size={16} /> Create Expedition
            </button>
          )}
        </header>

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-slate-400 text-xs font-semibold mt-4 tracking-wider uppercase">
              Loading Expeditions...
            </p>
          </div>
        ) : trips.length === 0 ? (
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm max-w-2xl mx-auto my-12">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Compass size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              No Expeditions Found
            </h3>
            <p className="text-slate-400 text-sm font-medium mt-2 max-w-sm mx-auto">
              Your inventory is empty. Start by creating your first Himalayan
              adventure package.
            </p>
            <button
              onClick={() => navigate("/add-trip")}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/10 transition-all"
            >
              <Plus size={16} /> Create First Trip
            </button>
          </div>
        ) : (
          /* TRIPS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {trips.map((trip) => {
              const galleryImages = getGalleryArray(trip);

              return (
                <div
                  key={trip._id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col group transition-all hover:shadow-md hover:border-slate-200/80"
                >
                  {/* MAIN HERO IMAGE & COUNTRY BADGE */}
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={
                        trip.heroImage?.url ||
                        trip.featuredImage?.url ||
                        trip.featuredImage ||
                        (galleryImages[0]?.url || galleryImages[0]) ||
                        "https://placehold.co/500x300?text=No+Hero+Image"
                      }
                      alt={trip.title}
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/500x300?text=No+Image";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest shadow-sm border ${getCountryBadgeStyle(
                        trip.country,
                      )}`}
                    >
                      {trip.country}
                    </div>
                  </div>

                  {/* CONTENT SECTION */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-slate-800 leading-snug tracking-tight mb-3 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {trip.title}
                    </h3>

                    {/* NEW: DYNAMIC GALLERY PREVIEW SECTION */}
                    <div className="mb-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                        <ImageIcon size={11} className="text-slate-400" />
                        Gallery Collection ({galleryImages.length})
                      </span>
                      
                      {galleryImages.length > 0 ? (
                        <div className="grid grid-cols-4 gap-2">
                          {galleryImages.slice(0, 4).map((img, index) => {
                            const imgUrl = img?.url || img; // अब्जेक्ट वा स्ट्रिङ दुवैलाई व्यवस्थापन गर्न
                            return (
                              <div 
                                key={index} 
                                className="relative h-12 rounded-lg overflow-hidden border border-slate-100 bg-slate-50"
                              >
                                <img
                                  src={imgUrl}
                                  alt={`Gallery ${index + 1}`}
                                  className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                                  onError={(e) => {
                                    e.target.src = "https://placehold.co/100x100?text=Error";
                                  }}
                                />
                                {/* यदि ४ वटा भन्दा धेरै इमेज छन् भने अन्तिममा +Count देखाउने */}
                                {index === 3 && galleryImages.length > 4 && (
                                  <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center backdrop-blur-[1px]">
                                    <span className="text-white text-[10px] font-black">
                                      +{galleryImages.length - 4}
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-400 italic bg-slate-50/50 rounded-lg p-2 border border-dashed border-slate-200 text-center">
                          No collection images added.
                        </div>
                      )}
                    </div>

                    {/* KEY METRICS GRID */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-3.5 bg-slate-50/80 rounded-xl mb-4 border border-slate-100/50">
                      <div className="flex flex-col items-center text-center">
                        <Clock size={14} className="text-indigo-500 mb-1" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Duration
                        </span>
                        <span className="text-xs font-bold text-slate-700 mt-0.5">
                          {trip.duration ? `${trip.duration} Days` : "--"}
                        </span>
                      </div>
                      <div className="flex flex-col items-center text-center border-x border-slate-200/60">
                        <BarChart3 size={14} className="text-emerald-500 mb-1" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Grade
                        </span>
                        <span className="text-xs font-bold text-slate-700 mt-0.5 truncate max-w-full px-1">
                          {trip.difficulty || "--"}
                        </span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <Mountain size={14} className="text-amber-500 mb-1" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Altitude
                        </span>
                        <span className="text-xs font-bold text-slate-700 mt-0.5 truncate max-w-full px-1">
                          {trip.maxAltitude || "--"}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-400 text-xs font-medium leading-relaxed line-clamp-2 mb-5">
                      {trip.overview ||
                        "No overview summary provided for this expedition."}
                    </p>

                    {/* PRICE BLOCK */}
                    <div className="flex items-baseline gap-2 mb-5">
                      <span className="text-2xl font-black text-slate-900">
                        ${trip.price}
                      </span>
                      {trip.oldPrice && (
                        <span className="text-xs text-slate-300 line-through font-semibold">
                          ${trip.oldPrice}
                        </span>
                      )}
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-auto">
                        Per Person
                      </span>
                    </div>

                    {/* STATS BADGES */}
                    <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-slate-100">
                      {trip.includes?.length > 0 && (
                        <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-100 text-slate-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tight">
                          <CheckCircle2 size={10} className="text-emerald-500" />{" "}
                          {trip.includes.length} Services
                        </span>
                      )}
                      {trip.itinerary?.length > 0 && (
                        <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-100 text-slate-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tight">
                          <Layers size={10} className="text-indigo-500" />{" "}
                          {trip.itinerary.length} Days Plan
                        </span>
                      )}
                    </div>

                    {/* SYSTEM ACTIONS */}
                    <div className="grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-slate-100/60">
                      <button
                        type="button"
                        onClick={() => navigate(`/edit/${trip._id}`)}
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-100 hover:border-indigo-100 transition-all active:scale-95 group/btn"
                      >
                        <Edit3
                          size={14}
                          className="text-slate-400 group-hover/btn:text-indigo-600 transition-colors"
                        />
                        <span className="text-[9px] font-bold uppercase tracking-wider mt-1.5">
                          Edit
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate(`/trip-dates/${trip._id}`)}
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-100 hover:border-emerald-100 transition-all active:scale-95 group/btn"
                      >
                        <Calendar
                          size={14}
                          className="text-slate-400 group-hover/btn:text-emerald-600 transition-colors"
                        />
                        <span className="text-[9px] font-bold uppercase tracking-wider mt-1.5">
                          Dates
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteTrip(trip._id)}
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-600 border border-slate-100 hover:border-red-100 transition-all active:scale-95 group/btn"
                      >
                        <Trash2
                          size={14}
                          className="text-slate-400 group-hover/btn:text-red-600 transition-colors"
                        />
                        <span className="text-[9px] font-bold uppercase tracking-wider mt-1.5">
                          Delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}