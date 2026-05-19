import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../src/api/axios";
import { Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Compass,
  Loader2,
  Mountain,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  Star,
  Wind,
  Thermometer,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Users,
  Shield,
  PhoneCall,
} from "lucide-react";

/* ─────────────────────────── HELPERS ─────────────────────────── */
const BASE_URL = "http://localhost:8000";

const resolveImage = (raw) => {
  if (!raw) return null;
  if (typeof raw === "string")
    return raw.startsWith("http") ? raw : `${BASE_URL}/${raw}`;
  if (raw?.url)
    return raw.url.startsWith("http") ? raw.url : `${BASE_URL}/${raw.url}`;
  if (typeof raw === "object" && raw !== null) {
    const fallbackProp = raw.src || raw.path || raw.image;
    if (typeof fallbackProp === "string")
      return fallbackProp.startsWith("http")
        ? fallbackProp
        : `${BASE_URL}/${fallbackProp}`;
  }
  return null;
};

const FALLBACK_BANNER =
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600";

/* ─────────────────────────── DESIGN TOKENS ─────────────────────────── */
const fonts = {
  display: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  body: "'Outfit', 'DM Sans', 'Segoe UI', system-ui, sans-serif",
};

/* ─────────────────────────── SUB-COMPONENTS ─────────────────────────── */

function SectionHeading({ children, sub }) {
  return (
    <div className="mb-8">
      <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-500 mb-2">
        {sub || "\u00A0"}
      </p>
      <h2
        className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight"
        style={{ fontFamily: fonts.display, letterSpacing: "-0.01em" }}
      >
        {children}
      </h2>
      <div className="mt-3 flex items-center gap-2">
        <div className="w-8 h-[2px] bg-amber-400 rounded-full" />
        <div className="w-2 h-[2px] bg-amber-200 rounded-full" />
      </div>
    </div>
  );
}

function TripBadge({ label, variant = "default" }) {
  const styles = {
    bestseller: "bg-amber-500 text-white",
    luxury: "bg-gray-950 text-white",
    peak: "bg-rose-600 text-white",
    short: "bg-emerald-600 text-white",
    bhutan: "bg-teal-700 text-white",
    default: "bg-gray-800 text-white",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[9px] font-black tracking-[0.2em] uppercase rounded ${styles[variant]}`}
    >
      {label}
    </span>
  );
}

function DifficultyPill({ label }) {
  const map = {
    Easy: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Moderate: "bg-sky-50 text-sky-700 border border-sky-200",
    Strenuous: "bg-orange-50 text-orange-700 border border-orange-200",
    Extreme: "bg-red-50 text-red-700 border border-red-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold ${
        map[label] || "bg-gray-100 text-gray-600 border border-gray-200"
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}

function AccordionFAQ({ faqs }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="divide-y divide-gray-100">
      {faqs.map((faq, idx) => (
        <div key={idx}>
          <button
            onClick={() => setOpen(open === idx ? null : idx)}
            className="w-full flex items-center justify-between gap-4 py-4 text-left group"
          >
            <span className="text-sm font-semibold text-gray-800 group-hover:text-amber-600 transition-colors leading-snug">
              {faq.question}
            </span>
            <span
              className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                open === idx
                  ? "bg-amber-500 border-amber-500 text-white"
                  : "border-gray-200 text-gray-400 group-hover:border-amber-300"
              }`}
            >
              {open === idx ? (
                <ChevronUp size={12} />
              ) : (
                <ChevronDown size={12} />
              )}
            </span>
          </button>
          {open === idx && (
            <div className="pb-4">
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line pl-4 border-l-2 border-amber-300 italic">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */
const Everestfeature = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const fetchTripDetail = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/trips/${id}`);
        setTrip(data);
        const banner =
          resolveImage(data.bannerImage || data.featuredImage) ||
          FALLBACK_BANNER;
        const galleryArr = (data.galleryImages || data.gallery || [])
          .map(resolveImage)
          .filter(Boolean);
        setLightboxImages(Array.from(new Set([banner, ...galleryArr])));
      } catch (err) {
        setError("Failed to load trip details.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTripDetail();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!galleryOpen) return;
      if (e.key === "Escape") setGalleryOpen(false);
      if (e.key === "ArrowLeft")
        setGalleryIndex(
          (p) => (p - 1 + lightboxImages.length) % lightboxImages.length,
        );
      if (e.key === "ArrowRight")
        setGalleryIndex((p) => (p + 1) % lightboxImages.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryOpen, lightboxImages]);

  const openLightboxAt = (imgUrl) => {
    const index = lightboxImages.indexOf(imgUrl);
    setGalleryIndex(index !== -1 ? index : lightboxImages.length);
    if (index === -1) setLightboxImages((prev) => [...prev, imgUrl]);
    setGalleryOpen(true);
  };

  /* ── LOADING ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-5">
          <div className="relative mx-auto w-14 h-14">
            <Loader2 className="w-14 h-14 animate-spin text-amber-300 absolute inset-0" />
            <Mountain className="w-6 h-6 text-amber-600 absolute inset-0 m-auto" />
          </div>
          <p
            className="text-[10px] font-bold tracking-[0.35em] uppercase text-gray-400"
            style={{ fontFamily: fonts.body }}
          >
            Preparing Your Expedition
          </p>
        </div>
      </div>
    );
  }

  /* ── ERROR ── */
  if (error || !trip) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center">
          <Mountain size={32} className="text-gray-300" />
        </div>
        <div className="text-center space-y-1">
          <p
            className="font-bold text-gray-900 text-lg"
            style={{ fontFamily: fonts.display }}
          >
            {error || "Trip not found"}
          </p>
          <p className="text-sm text-gray-400">Please go back and try again.</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm transition-colors"
        >
          <ArrowLeft size={14} /> Go Back
        </button>
      </div>
    );
  }

  const bannerImage =
    resolveImage(trip.bannerImage || trip.featuredImage) || FALLBACK_BANNER;
  const rawGallery = trip.galleryImages || trip.gallery || [];

  return (
    <div
      className="min-h-screen bg-white antialiased"
      style={{ fontFamily: fonts.body }}
    >
      {/* ════════════════════════ HERO ════════════════════════ */}
      <div className="relative h-[72vh] min-h-[540px] overflow-hidden">
        <img
          src={bannerImage}
          alt={trip.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.42) saturate(0.8)" }}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_BANNER;
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 38%, rgba(0,0,0,0.7) 72%, rgba(0,0,0,0.92) 100%)",
          }}
        />

        {/* Top bar */}
        <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 md:px-14 pt-7 z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2.5 text-white/80 hover:text-white transition-all group"
          >
            <span className="w-9 h-9 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all">
              <ArrowLeft size={14} />
            </span>
            <span className="text-xs font-semibold tracking-wide hidden sm:block">
              Back to Trips
            </span>
          </button>
          <button
            onClick={() => openLightboxAt(bannerImage)}
            className="flex items-center gap-2 text-white/60 hover:text-white text-xs font-semibold tracking-wide transition-colors"
          >
            <Maximize2 size={12} />
            <span className="hidden sm:block">View Photos</span>
          </button>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 inset-x-0 px-6 md:px-14 pb-14 z-10">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-wrap gap-2 mb-5">
              {trip.isBestSeller2026 && (
                <TripBadge label="Best Seller 2026" variant="bestseller" />
              )}
              {trip.isLuxuryVIP && (
                <TripBadge label="Luxury VIP" variant="luxury" />
              )}
              {trip.isPeakClimbing && (
                <TripBadge label="Peak Climbing" variant="peak" />
              )}
              {trip.isShortTrek && (
                <TripBadge label="Short Trek" variant="short" />
              )}
              {trip.isBhutanTour && (
                <TripBadge label="Bhutan Tour" variant="bhutan" />
              )}
            </div>

            <p className="text-amber-400 text-[10px] font-bold tracking-[0.35em] uppercase mb-3">
              {trip.categoryType || "Classic"} Trek &nbsp;·&nbsp;{" "}
              {trip.country || "Nepal"}
            </p>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-7 max-w-4xl"
              style={{ fontFamily: fonts.display, letterSpacing: "-0.02em" }}
            >
              {trip.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white/85 text-xs font-medium px-4 py-2 rounded-full">
                <Clock size={12} className="text-amber-400" />
                {trip.duration || "N/A"} Days
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white/85 text-xs font-medium px-4 py-2 rounded-full">
                <MapPin size={12} className="text-amber-400" />
                {trip.startPoint || "Kathmandu"}
              </span>
              {trip.maxAltitude && (
                <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white/85 text-xs font-medium px-4 py-2 rounded-full">
                  <Mountain size={12} className="text-amber-400" />
                  {trip.maxAltitude}
                </span>
              )}
              <DifficultyPill label={trip.difficulty || "Moderate"} />
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════ BODY ════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-14 py-16 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
        {/* ══ MAIN CONTENT ══ */}
        <div className="space-y-16 min-w-0">
          {/* STATS GRID */}
          <section>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-transparent" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: Compass,
                    label: "Country",
                    value: trip.country || "Nepal",
                  },
                  {
                    icon: Clock,
                    label: "Duration",
                    value: `${trip.duration || "12"} Days`,
                  },
                  {
                    icon: Mountain,
                    label: "Difficulty",
                    value: trip.difficulty || "Strenuous",
                  },
                  {
                    icon: Wind,
                    label: "Activity",
                    value: trip.activity || "Trekking",
                  },
                  {
                    icon: Mountain,
                    label: "Max. Altitude",
                    value: trip.maxAltitude || "5,555 m",
                  },
                  {
                    icon: Calendar,
                    label: "Best Season",
                    value: trip.bestSeason || "Mar–May, Sep–Nov",
                  },
                  {
                    icon: Star,
                    label: "Accommodation",
                    value: trip.accommodation || "Lodge / Hotels",
                  },
                  {
                    icon: Thermometer,
                    label: "Meals",
                    value: trip.meals || "Included",
                  },
                  {
                    icon: MapPin,
                    label: "Start / End Point",
                    value: trip.startPoint || "Kathmandu",
                  },
                ].map(({ icon: Icon, label, value }, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-5 py-5 hover:bg-amber-50/30 transition-colors border-b border-r border-gray-100 last:border-r-0"
                    style={{
                      borderRight:
                        (i + 1) % 3 !== 0 ? "1px solid #f3f4f6" : "none",
                      borderBottom: i < 6 ? "1px solid #f3f4f6" : "none",
                    }}
                  >
                    <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      <Icon
                        size={15}
                        className="text-amber-500 stroke-[1.75]"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* OVERVIEW */}
          <section>
            <SectionHeading sub="About This Journey">
              Expedition Overview
            </SectionHeading>
            <div className="text-[15px] text-gray-600 leading-[1.9] whitespace-pre-line">
              {trip.overview ||
                "No overview has been added for this expedition yet."}
            </div>
          </section>

          {/* GALLERY */}
          {rawGallery.length > 0 && (
            <section>
              <SectionHeading sub="Moments From The Trail">
                Photo Gallery{" "}
                <span
                  className="text-gray-300 font-light"
                  style={{ fontFamily: fonts.body, fontSize: "1rem" }}
                >
                  ({rawGallery.length})
                </span>
              </SectionHeading>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* Large feature image */}
                {(() => {
                  const first = resolveImage(rawGallery[0]);
                  return first ? (
                    <button
                      onClick={() => openLightboxAt(first)}
                      className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden bg-gray-100 group aspect-square sm:aspect-auto focus:outline-none focus:ring-2 focus:ring-amber-400"
                      style={{ minHeight: "200px" }}
                    >
                      <img
                        src={first}
                        alt="Gallery feature"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/600x600";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300" />
                    </button>
                  ) : null;
                })()}

                {/* Thumbnail grid */}
                {rawGallery.slice(1, 5).map((rawImg, i) => {
                  const resolvedUrl = resolveImage(rawImg);
                  if (!resolvedUrl) return null;
                  return (
                    <button
                      key={i}
                      onClick={() => openLightboxAt(resolvedUrl)}
                      className="relative rounded-xl overflow-hidden bg-gray-100 group aspect-square focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <img
                        src={resolvedUrl}
                        alt={`Gallery ${i + 2}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/300x300";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                        <Maximize2
                          size={16}
                          className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow"
                        />
                      </div>
                      {i === 3 && rawGallery.length > 5 && (
                        <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center">
                          <span
                            className="text-white font-bold text-xl leading-none"
                            style={{ fontFamily: fonts.display }}
                          >
                            +{rawGallery.length - 5}
                          </span>
                          <span className="text-gray-300 text-[9px] font-bold uppercase tracking-[0.2em] mt-1">
                            more
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* HIGHLIGHTS */}
          {trip.highlights?.length > 0 && (
            <section>
              <SectionHeading sub="What Makes This Special">
                Key Highlights
              </SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trip.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-gray-100 hover:border-amber-200 hover:shadow-sm transition-all duration-200 group"
                  >
                    <div className="mt-1 w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {typeof item === "string" ? item : item.text}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ITINERARY */}
          {trip.itinerary?.length > 0 && (
            <section>
              <SectionHeading sub="Complete Day-by-Day Breakdown">
                Detailed Itinerary
              </SectionHeading>
              <div className="space-y-2">
                {trip.itinerary.map((day, idx) => {
                  const isOpen = activeDay === idx;
                  return (
                    <div
                      key={idx}
                      className={`rounded-xl border overflow-hidden transition-all duration-200 ${
                        isOpen
                          ? "border-amber-200 shadow-sm shadow-amber-50"
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <button
                        onClick={() => setActiveDay(isOpen ? -1 : idx)}
                        className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors ${
                          isOpen
                            ? "bg-amber-50/40"
                            : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`shrink-0 w-10 h-10 rounded-xl flex flex-col items-center justify-center transition-all ${
                            isOpen
                              ? "bg-amber-500 text-white"
                              : "bg-gray-50 border border-gray-200 text-gray-500"
                          }`}
                        >
                          <span className="text-[8px] font-bold uppercase tracking-wider leading-none opacity-70">
                            {isOpen ? "Day" : "D"}
                          </span>
                          <span className="text-sm font-bold leading-tight">
                            {day.day || idx + 1}
                          </span>
                        </div>
                        <span className="flex-1 text-sm font-semibold text-gray-900 leading-snug">
                          {day.title}
                        </span>
                        <span
                          className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            isOpen
                              ? "bg-amber-500 text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {isOpen ? (
                            <ChevronUp size={12} />
                          ) : (
                            <ChevronDown size={12} />
                          )}
                        </span>
                      </button>
                      {isOpen && day.description && (
                        <div className="px-6 py-5 bg-white border-t border-amber-100 text-sm text-gray-600 leading-[1.85] whitespace-pre-line">
                          {day.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* INCLUDES / EXCLUDES */}
          <section>
            <SectionHeading sub="Package Scope">
              What's Included & Excluded
            </SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 flex items-center gap-3 border-b border-gray-100 bg-white">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <CheckCircle size={14} className="text-emerald-500" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800">
                    What's Included
                  </h3>
                </div>
                <div className="p-5 bg-white space-y-3">
                  {trip.includes?.map((inc, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <span className="text-emerald-500 font-bold text-base leading-none mt-0.5 shrink-0">
                        ✓
                      </span>
                      <span className="leading-snug">
                        {typeof inc === "string" ? inc : inc.text}
                      </span>
                    </div>
                  )) ?? (
                    <p className="text-sm text-gray-400 italic">
                      Standard logistics included.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 flex items-center gap-3 border-b border-gray-100 bg-white">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center">
                    <XCircle size={14} className="text-rose-400" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800">
                    What's Excluded
                  </h3>
                </div>
                <div className="p-5 bg-white space-y-3">
                  {trip.excludes?.map((exc, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <span className="text-rose-400 font-bold text-base leading-none mt-0.5 shrink-0">
                        ✕
                      </span>
                      <span className="leading-snug">
                        {typeof exc === "string" ? exc : exc.text}
                      </span>
                    </div>
                  )) ?? (
                    <p className="text-sm text-gray-400 italic">
                      Personal gear excluded.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          {trip.faqs?.length > 0 && (
            <section>
              <SectionHeading sub="Common Questions">
                Frequently Asked Questions
              </SectionHeading>
              <div className="bg-white border border-gray-100 rounded-2xl px-6 py-2">
                <AccordionFAQ faqs={trip.faqs} />
              </div>
            </section>
          )}
        </div>

        <aside ref={sidebarRef}>
          <div className="sticky top-6 space-y-4">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg shadow-gray-100/80">
              <div className="h-1.5 bg-gradient-to-r from-amber-500 to-amber-300" />
              <div className="px-6 pt-6 pb-5">
                {trip.oldPrice > 0 && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm line-through text-gray-300">
                      USD {trip.oldPrice.toLocaleString()}
                    </span>
                    {trip.oldPrice - trip.price > 0 && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-full">
                        Save USD {(trip.oldPrice - trip.price).toLocaleString()}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-baseline gap-1.5">
                  <span
                    className="text-4xl font-bold text-gray-950 leading-none"
                    style={{ fontFamily: fonts.display }}
                  >
                    {trip.price
                      ? `USD ${trip.price.toLocaleString()}`
                      : "Contact Us"}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium mt-1.5 tracking-wide">
                  per person · all inclusive
                </p>
              </div>

              <div className="px-6 pb-5 space-y-2.5">
                <button className="w-full bg-gray-950 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm tracking-wide">
                  Book This Expedition
                </button>
                <button className="w-full flex items-center justify-center gap-2 border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold py-3 rounded-xl transition-colors text-sm">
                  <Download size={14} />
                  Download Brochure
                </button>
              </div>

              <div className="mx-6 mb-6 grid grid-cols-2 gap-2.5 pt-4 border-t border-gray-100">
                {[
                  { icon: Shield, text: "Free cancellation" },
                  { icon: Users, text: "Small groups" },
                  { icon: Star, text: "Expert guides" },
                  { icon: CheckCircle, text: "Secure booking" },
                ].map(({ icon: Icon, text }, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-[11px] text-gray-500 font-medium"
                  >
                    <Icon size={12} className="text-amber-400 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {trip.availableDates?.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-amber-500" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                      Upcoming Departures
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {trip.availableDates.length} dates
                  </span>
                </div>
                <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
                  {trip.availableDates.map((date, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {date.date}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5 font-medium">
                          {date.totalSeats || "Open"} seats
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${
                          date.status === "available"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {date.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-950 rounded-2xl p-5 text-center space-y-3">
              <PhoneCall size={18} className="text-amber-400 mx-auto" />

              <div>
                <p className="text-sm font-semibold text-white">
                  Need a custom booking?
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Group rates & private departures available
                </p>
              </div>

              <Link
                to="/contact-us"
                className="block w-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black py-2.5 rounded-xl transition-colors text-center"
              >
                Contact Our Team →
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {galleryOpen && lightboxImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/97 flex flex-col"
          onClick={() => setGalleryOpen(false)}
        >
          <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 py-5 z-10">
            <span className="text-xs text-white/50 font-semibold tracking-widest">
              {String(galleryIndex + 1).padStart(2, "0")} /{" "}
              {String(lightboxImages.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => setGalleryOpen(false)}
              className="w-10 h-10 rounded-full bg-white/8 hover:bg-white/15 text-white flex items-center justify-center transition-colors border border-white/10 focus:outline-none"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center relative px-16">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setGalleryIndex(
                  (p) =>
                    (p - 1 + lightboxImages.length) % lightboxImages.length,
                );
              }}
              className="absolute left-4 w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 text-white flex items-center justify-center border border-white/10 transition-all focus:outline-none"
            >
              <ChevronLeft size={20} />
            </button>

            <img
              src={lightboxImages[galleryIndex]}
              alt={`Photo ${galleryIndex + 1}`}
              className="max-w-full max-h-[78vh] rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/800x600?text=Unavailable";
              }}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setGalleryIndex((p) => (p + 1) % lightboxImages.length);
              }}
              className="absolute right-4 w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 text-white flex items-center justify-center border border-white/10 transition-all focus:outline-none"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {lightboxImages.length > 1 && (
            <div
              className="pb-7 flex items-center justify-center gap-1.5 overflow-x-auto px-6"
              onClick={(e) => e.stopPropagation()}
            >
              {lightboxImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIndex(i)}
                  className={`shrink-0 w-14 h-10 rounded-lg overflow-hidden border-[1.5px] transition-all focus:outline-none ${
                    i === galleryIndex
                      ? "border-amber-400 opacity-100 scale-105"
                      : "border-transparent opacity-35 hover:opacity-60"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Everestfeature;
