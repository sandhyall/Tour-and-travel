import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../src/api/axios";
import {
  Calendar,
  MapPin,
  Compass,
  ArrowRight,
  Loader2,
  Landmark,
} from "lucide-react";

const Tibet = () => {
  const [tibetTrips, setTibetTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTibetTrips = async () => {
      try {
        setLoading(true);

        // Fetch data from the shared trips endpoint
        const { data } = await axios.get("/trips");

        // Filter only Tibet trips
        const filtered = data.filter(
          (trip) => trip.country?.toLowerCase() === "tibet"
        );

        setTibetTrips(filtered);
      } catch (err) {
        console.error("Error fetching Tibet trips:", err);
        setError("Unable to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTibetTrips();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-600" />

        <p className="text-xs font-bold tracking-widest uppercase text-stone-400">
          Tibet Expeditions Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl border border-red-100 font-medium text-sm shadow-2xs">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50/50 py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-xs font-black tracking-[0.25em] text-cyan-600 uppercase block mb-3">
            The Roof of the World
          </span>

          <h1
            className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Expeditions in Tibet
          </h1>

          <div className="w-16 h-1 bg-cyan-500 mx-auto mb-6 rounded-full"></div>

          <p className="text-stone-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Discover the mystical beauty of Tibet through ancient monasteries,
            the sacred Lake Mansarovar, and breathtaking Himalayan landscapes.
            Experience the unique Tibetan culture and spiritual heritage.
          </p>
        </div>

        {/* Trips Grid Layout */}
        {tibetTrips.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-stone-200/60 p-8 max-w-md mx-auto">
            <Landmark className="w-12 h-12 text-stone-300 mx-auto mb-4" />

            <p className="text-stone-500 font-medium text-sm">
              No trips are currently available for Tibet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tibetTrips.map((trip) => {
              const tripId = trip._id || trip.id;

              // Image Fallback Handling
              const imageUrl =
                trip.featuredImage?.url ||
                trip.featuredImage ||
                trip.bannerImage ||
                "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80";

              return (
                <Link
                  to={`/feature/${tripId}`}
                  key={tripId}
                  className="group bg-white rounded-2xl overflow-hidden border border-stone-200/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
                >
                  {/* Image Holder */}
                  <div className="relative h-56 w-full overflow-hidden bg-stone-100 shrink-0">
                    <img
                      src={imageUrl}
                      alt={trip.title || "Tibet Trip"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80";
                      }}
                    />

                    {/* Category Type Badge */}
                    {trip.categoryType && (
                      <span className="absolute top-4 right-4 bg-cyan-600 text-white font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm">
                        {trip.categoryType}
                      </span>
                    )}

                    {/* Start Point Tag */}
                    {trip.startPoint && (
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-stone-800 text-[11px] font-bold flex items-center gap-1 shadow-sm border border-stone-100">
                        <MapPin
                          size={12}
                          className="text-cyan-600"
                        />
                        {trip.startPoint}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-stone-500 text-xs font-bold uppercase tracking-wider mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar
                            size={14}
                            className="text-stone-400"
                          />
                          {trip.duration || "N/A"} Days
                        </span>

                        <span className="flex items-center gap-1">
                          <Compass
                            size={14}
                            className="text-stone-400"
                          />
                          {trip.difficulty || "Moderate"}
                        </span>
                      </div>

                      {/* Trip Title */}
                      <h3 className="text-lg font-bold text-stone-900 mb-3 leading-snug group-hover:text-cyan-600 transition-colors line-clamp-2 min-h-[3rem]">
                        {trip.title}
                      </h3>
                    </div>

                    {/* Price and Action Footer */}
                    <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-stone-400 block font-bold tracking-wide uppercase">
                          Price from
                        </span>

                        <span className="text-base font-black text-stone-900">
                          {trip.price
                            ? `USD ${trip.price.toLocaleString()}`
                            : "Contact Us"}
                        </span>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-stone-50 text-stone-700 group-hover:bg-cyan-600 group-hover:text-white flex items-center justify-center transition-all">
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tibet;