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
  Clock,
  Star,
  Wind,
} from "lucide-react";

const BASE_URL = "http://localhost:8000";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80";

// ── Image resolver (matches your backend structure) ──────────────
const resolveImage = (raw) => {
  if (!raw) return null;
  if (typeof raw === "string")
    return raw.startsWith("http") ? raw : `${BASE_URL}/${raw}`;
  if (raw?.url)
    return raw.url.startsWith("http") ? raw.url : `${BASE_URL}/${raw.url}`;
  if (typeof raw === "object" && raw !== null) {
    const fp = raw.src || raw.path || raw.image;
    if (typeof fp === "string")
      return fp.startsWith("http") ? fp : `${BASE_URL}/${fp}`;
  }
  return null;
};

// ── Country config ───────────────────────────────────────────────
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
    heroGradient: "from-amber-900/60 via-stone-900/40 to-transparent",
    heroBg: "bg-amber-950",
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
    heroGradient: "from-emerald-900/60 via-stone-900/40 to-transparent",
    heroBg: "bg-emerald-950",
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
    heroGradient: "from-cyan-900/60 via-stone-900/40 to-transparent",
    heroBg: "bg-cyan-950",
  },
};

// ── Accent palette ───────────────────────────────────────────────
const ACCENT = {
  amber: {
    spinner: "text-amber-500",
    label: "text-amber-500",
    bar: "bg-amber-400",
    badge: "bg-amber-500",
    badgeText: "text-stone-950",
    overlayIcon: "text-amber-500",
    titleHover: "group-hover:text-amber-600",
    arrowBg: "bg-amber-500",
    arrowText: "text-stone-950",
    priceDot: "bg-amber-400",
    ctaBg: "bg-amber-500 hover:bg-amber-400",
    ctaText: "text-stone-950",
    tagBg: "bg-amber-50 text-amber-700 border-amber-100",
    highlightBorder: "group-hover:border-amber-300",
  },
  emerald: {
    spinner: "text-emerald-600",
    label: "text-emerald-600",
    bar: "bg-emerald-500",
    badge: "bg-emerald-600",
    badgeText: "text-white",
    overlayIcon: "text-emerald-600",
    titleHover: "group-hover:text-emerald-700",
    arrowBg: "bg-emerald-600",
    arrowText: "text-white",
    priceDot: "bg-emerald-400",
    ctaBg: "bg-emerald-600 hover:bg-emerald-500",
    ctaText: "text-white",
    tagBg: "bg-emerald-50 text-emerald-700 border-emerald-100",
    highlightBorder: "group-hover:border-emerald-300",
  },
  cyan: {
    spinner: "text-cyan-600",
    label: "text-cyan-600",
    bar: "bg-cyan-500",
    badge: "bg-cyan-600",
    badgeText: "text-white",
    overlayIcon: "text-cyan-600",
    titleHover: "group-hover:text-cyan-700",
    arrowBg: "bg-cyan-600",
    arrowText: "text-white",
    priceDot: "bg-cyan-400",
    ctaBg: "bg-cyan-600 hover:bg-cyan-500",
    ctaText: "text-white",
    tagBg: "bg-cyan-50 text-cyan-700 border-cyan-100",
    highlightBorder: "group-hover:border-cyan-300",
  },
};

// ── Difficulty color helper ──────────────────────────────────────
const difficultyStyle = (val) => {
  const v = val?.toLowerCase();
  if (v === "easy") return "bg-green-100 text-green-700 border-green-200";
  if (v === "moderate") return "bg-sky-100 text-sky-700 border-sky-200";
  if (v === "difficult") return "bg-orange-100 text-orange-700 border-orange-200";
  if (v === "strenuous") return "bg-red-100 text-red-700 border-red-200";
  return "bg-stone-100 text-stone-600 border-stone-200";
};

// ── Skeleton card ────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/60 animate-pulse">
      <div className="h-52 bg-stone-200 w-full" />
      <div className="p-5 space-y-3">
        <div className="flex gap-3">
          <div className="h-3 bg-stone-200 rounded w-20" />
          <div className="h-3 bg-stone-200 rounded w-24" />
        </div>
        <div className="h-5 bg-stone-200 rounded w-3/4" />
        <div className="h-4 bg-stone-200 rounded w-1/2" />
        <div className="h-px bg-stone-100 w-full mt-2" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-5 bg-stone-200 rounded w-24" />
          <div className="w-8 h-8 rounded-full bg-stone-200" />
        </div>
      </div>
    </div>
  );
}

// ── Trip Card ────────────────────────────────────────────────────
function TripCard({ trip, country, config, accent }) {
  const tripId = trip._id || trip.id;
  const countryLabel = country.charAt(0).toUpperCase() + country.slice(1);
  const { overlayIcon: OverlayIcon, badgeField, overlayField } = config;

  // Resolve image — check all possible fields your backend may use
  const imageUrl =
    resolveImage(trip.heroImage) ||
    resolveImage(trip.featuredImage) ||
    resolveImage(trip.bannerImage) ||
    resolveImage(trip.galleryImages?.[0]) ||
    FALLBACK_IMG;

  const badgeValue = trip[badgeField];
  const overlayValue = trip[overlayField];

  return (
    <Link
      to={`/feature/${tripId}`}
      className={`group bg-white rounded-2xl overflow-hidden border border-stone-200/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full ${accent.highlightBorder} border`}
      style={{ transform: "translateY(0)", transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease" }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {/* ── Image ── */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-100 shrink-0">
        <img
          src={imageUrl}
          alt={trip.title || `${countryLabel} Trip`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
        />

        {/* Dark gradient at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Badge top-right */}
        {badgeValue && (
          <span className={`absolute top-3 right-3 ${accent.badge} ${accent.badgeText} font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-lg shadow-sm`}>
            {badgeValue}
          </span>
        )}

        {/* Overlay pill bottom-left */}
        {overlayValue && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-stone-800 text-[11px] font-bold flex items-center gap-1.5 shadow-sm border border-white/60">
            <OverlayIcon size={11} className={accent.overlayIcon} />
            {overlayValue}
          </div>
        )}

        {/* Duration pill bottom-right */}
        {trip.duration && (
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg text-white text-[11px] font-bold flex items-center gap-1 border border-white/10">
            <Clock size={10} className="opacity-70" />
            {trip.duration}D
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="flex items-center gap-1 text-stone-400 text-[11px] font-semibold">
              <MapPin size={12} className="shrink-0" />
              {trip.startPoint || countryLabel}
            </span>

            {trip.difficulty && (
              <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${difficultyStyle(trip.difficulty)}`}>
                {trip.difficulty}
              </span>
            )}

            {trip.bestSeason && (
              <span className="text-[10px] text-stone-400 font-semibold">
                · {trip.bestSeason}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className={`text-[15px] font-bold text-stone-900 mb-3 leading-snug ${accent.titleHover} transition-colors line-clamp-2 min-h-[2.8rem]`}>
            {trip.title}
          </h3>

          {/* Tags row */}
          <div className="flex flex-wrap gap-1.5 mb-1">
            {trip.activity && (
              <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${accent.tagBg}`}>
                <Wind size={9} />
                {trip.activity}
              </span>
            )}
            {trip.accommodation && (
              <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${accent.tagBg}`}>
                <Star size={9} />
                {trip.accommodation}
              </span>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-stone-400 block font-bold tracking-widest uppercase mb-0.5">
              From
            </span>
            <span className="text-base font-black text-stone-900 leading-tight">
              {trip.price
                ? `USD ${Number(trip.price).toLocaleString()}`
                : "Contact Us"}
            </span>
            {trip.oldPrice > 0 && trip.oldPrice > trip.price && (
              <span className="text-[11px] text-stone-400 line-through ml-1.5">
                {Number(trip.oldPrice).toLocaleString()}
              </span>
            )}
          </div>

          <div className={`w-9 h-9 rounded-full ${accent.arrowBg} ${accent.arrowText} flex items-center justify-center shadow-sm transition-transform group-hover:scale-110`}>
            <ArrowRight size={15} />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Main Page ────────────────────────────────────────────────────
const TripsPage = ({ country }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const config = COUNTRY_CONFIG[country] || COUNTRY_CONFIG.nepal;
  const accent = ACCENT[config.accentColor];
  const { EmptyIcon } = config;
  const countryLabel = country.charAt(0).toUpperCase() + country.slice(1);

  useEffect(() => {
    let cancelled = false;

    const fetchTrips = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.get("/trips");

        if (!cancelled) {
          // Robust country match — trims whitespace, lowercases both sides
          const filtered = data.filter(
            (t) => t.country?.trim().toLowerCase() === country.trim().toLowerCase()
          );
          setTrips(filtered);
        }
      } catch (err) {
        console.error(`Error fetching ${country} trips:`, err);
        if (!cancelled) {
          setError("Unable to load trips. Please check your connection and try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTrips();
    return () => { cancelled = true; };
  }, [country, retryCount]);

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50/50">
        {/* Header skeleton */}
        <div className="py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14 space-y-3 animate-pulse">
              <div className="h-3 w-36 bg-stone-200 rounded mx-auto" />
              <div className="h-10 w-72 bg-stone-200 rounded mx-auto" />
              <div className="h-1 w-16 bg-stone-200 rounded mx-auto" />
              <div className="h-4 w-96 bg-stone-200 rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto">
            <EmptyIcon size={28} className="text-red-300" />
          </div>
          <div>
            <p className="font-bold text-stone-800 mb-1">Something went wrong</p>
            <p className="text-stone-500 text-sm leading-relaxed">{error}</p>
          </div>
          <button
            onClick={() => setRetryCount((c) => c + 1)}
            className={`px-6 py-2.5 rounded-xl ${accent.ctaBg} ${accent.ctaText} text-sm font-bold transition-colors`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── Empty ──
  if (trips.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50/50 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header still shown */}
          <PageHeader config={config} accent={accent} />

          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/60 max-w-md mx-auto shadow-sm">
            <EmptyIcon className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-700 font-bold text-base mb-1">No trips available</p>
            <p className="text-stone-400 text-sm">
              We're currently preparing new {countryLabel} expeditions. Check back soon!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Results ──
  return (
    <div className="min-h-screen bg-stone-50/50 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        <PageHeader config={config} accent={accent} tripCount={trips.length} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {trips.map((trip) => (
            <TripCard
              key={trip._id || trip.id}
              trip={trip}
              country={country}
              config={config}
              accent={accent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Page Header ──────────────────────────────────────────────────
function PageHeader({ config, accent, tripCount }) {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <span className={`text-[11px] font-black tracking-[0.25em] ${accent.label} uppercase block mb-3`}>
        {config.label}
      </span>

      <h1
        className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight mb-4"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        {config.title}
      </h1>

      <div className={`w-16 h-1 ${accent.bar} mx-auto mb-5 rounded-full`} />

      <p className="text-stone-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2">
        {config.description}
      </p>

      {tripCount > 0 && (
        <p className="mt-4 text-[12px] font-bold text-stone-400 tracking-wider">
          {tripCount} expedition{tripCount !== 1 ? "s" : ""} available
        </p>
      )}
    </div>
  );
}

export default TripsPage;