import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { Calendar, MapPin, ArrowRight, Loader2, Mountain } from "lucide-react";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchTrips = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get("/trips");
        if (!cancelled) setTrips(Array.isArray(data) ? data : data.trips || []);
      } catch (err) {
        console.error("Error fetching trips:", err);
        if (!cancelled)
          setError("Unable to load trips. Please try again later.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTrips();
    return () => (cancelled = true);
  }, []);

  const showMore = () => setVisibleCount((c) => c + 6);

  if (loading)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
        <p className="text-xs font-bold tracking-widest uppercase text-stone-400">
          Trips loading...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl border border-red-100 font-medium text-sm shadow-2xs">
          {error}
        </div>
      </div>
    );

  const visible = trips.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-stone-50/50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-black tracking-[0.25em] text-amber-500 uppercase block mb-3">
            Explore Trips
          </span>
          <h1
            className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            All Available Trips
          </h1>
          <div className="w-16 h-1 bg-amber-400 mx-auto mb-6 rounded-full" />
        </div>

        {trips.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-stone-200/60 p-8 max-w-md mx-auto">
            <Mountain className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500 font-medium text-sm">
              No trips are currently available.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visible.map((trip) => {
                const id = trip._id || trip.id;

                const imageUrl =
                  trip.featuredImage?.url ||
                  trip.featuredImage ||
                  trip.bannerImage ||
                  trip.heroImage?.url ||
                  FALLBACK_IMG;

                return (
                  <Link
                    to={`/feature/${id}`}
                    key={id}
                    className="group bg-white rounded-2xl overflow-hidden border border-stone-200/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
                  >
                    <div className="relative h-56 w-full overflow-hidden bg-stone-100 shrink-0">
                      <img
                        src={imageUrl}
                        alt={trip.title || "Trip"}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                        onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                      />
                      {trip.categoryType && (
                        <span className="absolute top-4 right-4 bg-stone-900/80 text-white font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm backdrop-blur-xs">
                          {trip.categoryType}
                        </span>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-stone-900 mb-3 leading-snug group-hover:text-amber-600 transition-colors line-clamp-2">
                        {trip.title}
                      </h3>
                      <div className="flex items-center gap-4 text-stone-500 text-xs font-bold uppercase tracking-wider mt-auto">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {trip.duration || "N/A"} Days
                        </span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-base font-black text-stone-900">
                          {trip.price
                            ? `USD ${trip.price.toLocaleString()}`
                            : "Contact Us"}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center hover:bg-amber-500 transition-colors">
                          <ArrowRight size={15} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {visibleCount < trips.length && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={showMore}
                  className="px-8 py-3 bg-stone-900 text-white font-bold rounded-full hover:bg-amber-500 transition-all"
                >
                  Show more trips
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Trips;
