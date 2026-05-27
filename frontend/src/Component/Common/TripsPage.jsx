import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import {
  Calendar,
  MapPin,
  Mountain,
  ArrowRight,
  Loader2,
  Trees,
  Landmark,
  Compass,
} from "lucide-react";


const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80";



const COUNTRY_CONFIG = {
  nepal: {
    label: "Explore The Himalayas",
    title: "Expeditions in Nepal",
    description:
      "Discover Nepal's famous trekking destinations, mountain expeditions, and cultural tour packages. Choose the perfect adventure that suits your travel style.",
    accentColor: "amber",
    EmptyIcon: Mountain,
    badgeField: "difficulty",
    overlayField: "maxAltitude",
    overlayIcon: Mountain,
    loadingText: "Nepal Expeditions Loading...",
  },
  bhutan: {
    label: "The Land of Gross National Happiness",
    title: "Expeditions in Bhutan",
    description:
      "Explore Bhutan's ancient monasteries, cultural heritage, and eco-friendly trekking adventures. Experience the unique beauty, traditions, and peaceful landscapes of Bhutan.",
    accentColor: "emerald",
    EmptyIcon: Trees,
    badgeField: "categoryType",
    overlayField: "startPoint",
    overlayIcon: MapPin,
    loadingText: "Bhutan Kingdom Packages Loading...",
  },
  tibet: {
    label: "The Roof of the World",
    title: "Expeditions in Tibet",
    description:
      "Discover the mystical beauty of Tibet through ancient monasteries, the sacred Lake Mansarovar, and breathtaking Himalayan landscapes. Experience the unique Tibetan culture and spiritual heritage.",
    accentColor: "cyan",
    EmptyIcon: Landmark,
    badgeField: "categoryType",
    overlayField: "startPoint",
    overlayIcon: MapPin,
    loadingText: "Tibet Expeditions Loading...",
  },
};



const ACCENT = {
  amber: {
    spinner: "text-amber-500",
    label: "text-amber-500",
    bar: "bg-amber-400",
    badge: "bg-stone-900/80",          
    overlayIcon: "text-amber-500",
    titleHover: "group-hover:text-amber-600",
    arrowHover: "group-hover:bg-amber-500 group-hover:text-stone-950",
  },
  emerald: {
    spinner: "text-emerald-600",
    label: "text-emerald-600",
    bar: "bg-emerald-500",
    badge: "bg-emerald-600",
    overlayIcon: "text-emerald-600",
    titleHover: "group-hover:text-emerald-600",
    arrowHover: "group-hover:bg-emerald-600 group-hover:text-white",
  },
  cyan: {
    spinner: "text-cyan-600",
    label: "text-cyan-600",
    bar: "bg-cyan-500",
    badge: "bg-cyan-600",
    overlayIcon: "text-cyan-600",
    titleHover: "group-hover:text-cyan-600",
    arrowHover: "group-hover:bg-cyan-600 group-hover:text-white",
  },
};




const TripsPage = ({ country }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const config = COUNTRY_CONFIG[country];
  const accent = ACCENT[config.accentColor];

  const {
    EmptyIcon,
    overlayIcon: OverlayIcon,
    badgeField,
    overlayField,
  } = config;

  
  const countryLabel =
    country.charAt(0).toUpperCase() + country.slice(1);

  useEffect(() => {
    let cancelled = false;

    const fetchTrips = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get("/trips");
        if (!cancelled) {
          setTrips(
            data.filter((t) => t.country?.toLowerCase() === country)
          );
        }
      } catch (err) {
        console.error(`Error fetching ${country} trips:`, err);
        if (!cancelled) {
          setError("Unable to load data. Please try again later.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTrips();

   
    return () => {
      cancelled = true;
    };
  }, [country]);


  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white gap-3">
        <Loader2 className={`w-10 h-10 animate-spin ${accent.spinner}`} />
        <p className="text-xs font-bold tracking-widest uppercase text-stone-400">
          {config.loadingText}
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

        <div className="text-center mb-16">
          <span
            className={`text-xs font-black tracking-[0.25em] ${accent.label} uppercase block mb-3`}
          >
            {config.label}
          </span>

          <h1
            className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {config.title}
          </h1>

          <div className={`w-16 h-1 ${accent.bar} mx-auto mb-6 rounded-full`} />

          <p className="text-stone-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {config.description}
          </p>
        </div>

     
        {trips.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-stone-200/60 p-8 max-w-md mx-auto">
            <EmptyIcon className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500 font-medium text-sm">
              No trips are currently available for {countryLabel}.
            </p>
          </div>
        ) : (
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => {
              const tripId = trip._id || trip.id;
              const imageUrl =
                trip.featuredImage?.url ||
                trip.featuredImage ||
                trip.bannerImage ||
                FALLBACK_IMG;
              const badgeValue = trip[badgeField];
              const overlayValue = trip[overlayField];

              return (
                <Link
                  to={`/feature/${tripId}`}
                  key={tripId}
                  className="group bg-white rounded-2xl overflow-hidden border border-stone-200/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
                >
                 
                  <div className="relative h-56 w-full overflow-hidden bg-stone-100 shrink-0">
                    <img
                      src={imageUrl}
                      alt={trip.title || `${countryLabel} Trip`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMG;
                      }}
                    />

                 
                    {badgeValue && (
                      <span
                        className={`absolute top-4 right-4 ${accent.badge} text-white font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm backdrop-blur-xs`}
                      >
                        {badgeValue}
                      </span>
                    )}

                  
                    {overlayValue && (
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-stone-800 text-[11px] font-bold flex items-center gap-1 shadow-sm border border-stone-100">
                        <OverlayIcon
                          size={12}
                          className={accent.overlayIcon}
                        />
                        {overlayValue}
                      </div>
                    )}
                  </div>

                
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                     
                      <div className="flex items-center gap-4 text-stone-500 text-xs font-bold uppercase tracking-wider mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="text-stone-400" />
                          {trip.duration || "N/A"} Days
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} className="text-stone-400" />
                          {trip.startPoint || "Kathmandu"}
                        </span>
                      </div>

                     
                      <h3
                        className={`text-lg font-bold text-stone-900 mb-3 leading-snug ${accent.titleHover} transition-colors line-clamp-2 min-h-[3rem]`}
                      >
                        {trip.title}
                      </h3>
                    </div>

                 
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

                      <div
                        className={`w-8 h-8 rounded-full bg-stone-50 text-stone-700 ${accent.arrowHover} flex items-center justify-center transition-all`}
                      >
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

export default TripsPage;