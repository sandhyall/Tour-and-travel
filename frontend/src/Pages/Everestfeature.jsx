import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../src/api/axios";
import { Link } from "react-router-dom";
import BookingModal from "../Component/BookingModal";
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
  Package,
  Tag,
  ArrowRight,
  Globe,
  BadgeCheck,
  Map,
  FileText,
  UserCheck,
  Languages,
  Briefcase,
  ExternalLink,
  ZoomIn,
} from "lucide-react";

import Note from "../Pages/Note";
import LuklaFlightInfo from "../Pages/LuklaFlightInfo";
import PackingList from "../Pages/PackingList";
import RelatedInformation from "../Pages/RelatedInformation";
import BestTime from "../Pages/BestTime";
import WhyChoose from "../Pages/WhyChoose";

const BASE_URL = "http://localhost:8000";

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

const FALLBACK_BANNER =
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600";

const fonts = {
  display: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  body: "'Nunito Sans', 'Lato', 'Segoe UI', system-ui, sans-serif",
};

if (typeof document !== "undefined" && !document.getElementById("trip-fonts")) {
  const link = document.createElement("link");
  link.id = "trip-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Nunito+Sans:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(link);
}

function SectionHeading({ children, sub }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-500 mb-2">
        {sub || "\u00A0"}
      </p>
      <h2
        className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
        style={{ fontFamily: fonts.display, letterSpacing: "-0.01em" }}
      >
        {children}
      </h2>
      <div className="mt-3 flex items-center gap-2">
        <div className="w-8 h-[2px] bg-emerald-400 rounded-full" />
        <div className="w-2 h-[2px] bg-emerald-200 rounded-full" />
      </div>
    </div>
  );
}

function TripBadge({ label, variant = "default" }) {
  const styles = {
    bestseller: "bg-emerald-500 text-white",
    luxury: "bg-gray-950 text-white",
    peak: "bg-rose-600 text-white",
    short: "bg-teal-600 text-white",
    bhutan: "bg-teal-700 text-white",
    tibet: "bg-blue-700 text-white",
    popular: "bg-violet-600 text-white",
    default: "bg-gray-800 text-white",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-black tracking-[0.2em] uppercase rounded ${styles[variant]}`}
    >
      {label}
    </span>
  );
}

function DifficultyPill({ label }) {
  const map = {
    Easy: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Moderate: "bg-sky-50 text-sky-700 border border-sky-200",
    Difficult: "bg-orange-50 text-orange-700 border border-orange-200",
    Strenuous: "bg-red-50 text-red-700 border border-red-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${map[label] || "bg-gray-100 text-gray-600 border border-gray-200"}`}
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
            <span
              className="text-base font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors leading-snug"
              style={{ fontFamily: fonts.body }}
            >
              {faq.question}
            </span>
            <span
              className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${open === idx ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-200 text-gray-400 group-hover:border-emerald-300"}`}
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
              <p
                className="text-sm text-gray-600 leading-relaxed whitespace-pre-line pl-4 border-l-2 border-emerald-300"
                style={{ fontFamily: fonts.body }}
              >
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PackageCard({ pkg }) {
  const [open, setOpen] = useState(false);
  const discount =
    pkg.oldPrice && pkg.price
      ? Math.round(((pkg.oldPrice - pkg.price) / pkg.oldPrice) * 100)
      : null;

  return (
    <div className="rounded-2xl border border-gray-100 overflow-hidden hover:border-emerald-200 hover:shadow-sm transition-all duration-200">
      <div className="px-5 py-4 bg-white flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <Tag size={14} className="text-emerald-500" />
          </div>
          <div>
            <p
              className="text-base font-bold text-gray-900"
              style={{ fontFamily: fonts.body }}
            >
              {pkg.name || "Package"}
            </p>
            {pkg.description && (
              <p
                className="text-sm text-gray-500 mt-0.5 leading-snug line-clamp-1"
                style={{ fontFamily: fonts.body }}
              >
                {pkg.description}
              </p>
            )}
          </div>
        </div>
        <div className="text-right shrink-0">
          {pkg.oldPrice && (
            <p className="text-sm text-gray-400 line-through font-medium">
              USD {Number(pkg.oldPrice).toLocaleString()}
            </p>
          )}
          <p
            className="text-lg font-bold text-gray-950 leading-tight"
            style={{ fontFamily: fonts.display }}
          >
            {pkg.price ? `USD ${Number(pkg.price).toLocaleString()}` : "—"}
          </p>
          {discount && (
            <span className="text-xs bg-emerald-100 text-emerald-700 font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {pkg.description && (
        <div className="px-5 pb-3 bg-white">
          <p
            className="text-sm text-gray-500 leading-relaxed"
            style={{ fontFamily: fonts.body }}
          >
            {pkg.description}
          </p>
        </div>
      )}

      {pkg.groupPricing?.length > 0 && (
        <div className="border-t border-gray-100">
          <button
            onClick={() => setOpen((p) => !p)}
            className="w-full flex items-center justify-between px-5 py-3 bg-gray-50 hover:bg-emerald-50/40 transition-colors text-left"
          >
            <span
              className="text-sm font-bold text-gray-600 flex items-center gap-1.5"
              style={{ fontFamily: fonts.body }}
            >
              <Users size={12} className="text-emerald-500" />
              Group Pricing ({pkg.groupPricing.length} tiers)
            </span>
            {open ? (
              <ChevronUp size={13} className="text-gray-400" />
            ) : (
              <ChevronDown size={13} className="text-gray-400" />
            )}
          </button>
          {open && (
            <div className="px-5 pb-4 bg-white space-y-2 pt-3">
              <div className="grid grid-cols-3 gap-2 mb-1">
                {["Min Pax", "Max Pax", "Price / Person"].map((h) => (
                  <span
                    key={h}
                    className="text-xs font-black uppercase tracking-widest text-gray-400"
                    style={{ fontFamily: fonts.body }}
                  >
                    {h}
                  </span>
                ))}
              </div>
              {pkg.groupPricing.map((tier, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 gap-2 items-center px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <span className="text-sm font-semibold text-gray-700">
                    {tier.minPax || "—"}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {tier.maxPax || "—"}
                  </span>
                  <span className="text-sm font-bold text-emerald-700">
                    {tier.pricePerPax
                      ? `USD ${Number(tier.pricePerPax).toLocaleString()}`
                      : "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const dateStatusStyle = (status) => {
  if (status === "available")
    return "bg-emerald-50 text-emerald-700 border border-emerald-200";
  if (status === "limited")
    return "bg-amber-50 text-amber-700 border border-amber-200";
  return "bg-red-50 text-red-500 border border-red-200";
};

function MapSection({ mapImage, mapLink }) {
  const [expanded, setExpanded] = useState(false);
  const imageUrl = resolveImage(mapImage);

  if (!imageUrl) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "trail-map.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <section>
      <SectionHeading sub="Route & Location">Trail Map</SectionHeading>

      <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-300 to-transparent" />

        <div className="px-4 sm:px-5 py-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <Map size={16} className="text-emerald-500" />
            </div>
            <div>
              <p
                className="text-base font-bold text-gray-900"
                style={{ fontFamily: fonts.body }}
              >
                Route & Trail Map
              </p>
              <p
                className="text-xs text-gray-400 font-medium mt-0.5"
                style={{ fontFamily: fonts.body }}
              >
                Full route overview with key landmarks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
  <button
    onClick={() => setExpanded((p) => !p)}
    className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-all border border-gray-200"
    style={{ fontFamily: fonts.body }}
  >
    {expanded ? (
      <>
        <ChevronUp size={12} /> Collapse
      </>
    ) : (
      <>
        <Maximize2 size={12} /> Expand
      </>
    )}
  </button>

  <button
    onClick={handleDownload}
    className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-white px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-500 transition-all border border-emerald-200"
    style={{ fontFamily: fonts.body }}
  >
    <Download size={12} /> Download Map
  </button>

  {mapLink && (
    <a
      href={mapLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-white px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-500 transition-all border border-blue-200"
      style={{ fontFamily: fonts.body }}
    >
      <ExternalLink size={12} /> Open in Maps
    </a>
  )}
</div>
        </div>

        <div
          className="relative bg-gray-100 overflow-hidden transition-all duration-500 ease-in-out"
          style={{ height: expanded ? "600px" : "380px" }}
        >
          <img
            src={imageUrl}
            alt="Trail Map"
            className="w-full h-full object-contain bg-gray-50"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/1200x600?text=Map+Unavailable";
            }}
          />

          <button
            onClick={() => setExpanded((p) => !p)}
            className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center shadow-sm hover:bg-white transition-all"
          >
            <ZoomIn size={14} className="text-gray-600" />
          </button>
        </div>

        <div className="px-4 sm:px-5 py-3 bg-gray-50 flex items-center gap-2 border-t border-gray-100">
          <MapPin size={11} className="text-emerald-400 shrink-0" />
          <p
            className="text-xs text-gray-400 font-medium"
            style={{ fontFamily: fonts.body }}
          >
            Click "Expand" for a larger view · Download for offline use
          </p>
        </div>
      </div>
    </section>
  );
}

function GuideSection({ guide }) {
  const photoUrl = resolveImage(guide?.photo) || guide?.photo?.url;
  const hasAnyInfo =
    guide?.name || guide?.bio || guide?.experience || guide?.languages;
  if (!hasAnyInfo) return null;

  return (
    <section>
      <SectionHeading sub="Your Expert In The Field">Lead Guide</SectionHeading>

      <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:border-emerald-200 transition-all duration-200">
        <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-300 to-transparent" />

        <div className="p-5 sm:p-6 bg-white">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="shrink-0 mx-auto sm:mx-0">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={guide.name || "Guide"}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-emerald-100 shadow-sm"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center">
                  <UserCheck size={32} className="text-emerald-400" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 w-full">
              {guide.name && (
                <h3
                  className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-2 text-center sm:text-left"
                  style={{ fontFamily: fonts.display }}
                >
                  {guide.name}
                </h3>
              )}

              <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
                {guide.experience && (
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full"
                    style={{ fontFamily: fonts.body }}
                  >
                    <Briefcase size={11} />
                    {guide.experience}
                  </span>
                )}
                {guide.languages && (
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full"
                    style={{ fontFamily: fonts.body }}
                  >
                    <Languages size={11} />
                    {guide.languages}
                  </span>
                )}
              </div>

              {guide.bio && (
                <p
                  className="text-base text-gray-600 leading-relaxed"
                  style={{ fontFamily: fonts.body, lineHeight: "1.8" }}
                >
                  {guide.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DownloadSection({ brochure, itineraryPdf }) {
  const hasBrochure = brochure?.url;
  const hasItineraryPdf = itineraryPdf?.url;
  if (!hasBrochure && !hasItineraryPdf) return null;

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, "_blank");
    }
  };

  const resources = [
    hasBrochure && {
      label: "Trip Brochure",
      desc: "Full overview, highlights & inclusions",
      url: brochure.url,
      filename: "trip-brochure.pdf",
      icon: FileText,
      color: "green",
    },
    hasItineraryPdf && {
      label: "Detailed Itinerary",
      desc: "Day-by-day schedule with logistics",
      url: itineraryPdf.url,
      filename: "trip-itinerary.pdf",
      icon: Map,
      color: "blue",
    },
  ].filter(Boolean);

  const colorMap = {
    green: {
      border: "border-emerald-200 hover:border-emerald-300",
      icon: "bg-emerald-50 border-emerald-100",
      iconColor: "text-emerald-500",
      btn: "bg-emerald-500 hover:bg-emerald-400 text-white",
    },
    blue: {
      border: "border-blue-200 hover:border-blue-300",
      icon: "bg-blue-50 border-blue-100",
      iconColor: "text-blue-500",
      btn: "bg-blue-600 hover:bg-blue-500 text-white",
    },
  };

  return (
    <section>
      <SectionHeading sub="Downloadable Resources">
        Trip Documents
      </SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map(
          ({ label, desc, url, filename, icon: Icon, color }, i) => {
            const c = colorMap[color];
            return (
              <div
                key={i}
                className={`rounded-2xl border bg-white overflow-hidden hover:shadow-md transition-all duration-200 ${c.border}`}
              >
                <div className="p-5 flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${c.icon}`}
                  >
                    <Icon size={20} className={c.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-base font-bold text-gray-900"
                      style={{ fontFamily: fonts.body }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-sm text-gray-500 mt-0.5 leading-snug"
                      style={{ fontFamily: fonts.body }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <button
                    onClick={() => handleDownload(url, filename)}
                    className={`w-full flex items-center justify-center gap-2 text-sm font-bold py-3 rounded-xl transition-colors ${c.btn}`}
                    style={{ fontFamily: fonts.body }}
                  >
                    <Download size={14} />
                    Download PDF
                  </button>
                </div>
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}

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
  const [bookingOpen, setBookingOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const fetchTripDetail = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/trips/${id}`);
        setTrip(data);
        const banner =
          resolveImage(
            data.bannerImage || data.featuredImage || data.heroImage,
          ) || FALLBACK_BANNER;
        const galleryArr = (data.galleryImages || data.gallery || [])
          .map(resolveImage)
          .filter(Boolean);
        setLightboxImages(Array.from(new Set([banner, ...galleryArr])));
      } catch {
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

  const handleBrochureDownload = async (url, filename = "brochure.pdf") => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-5">
          <div className="relative mx-auto w-14 h-14">
            <Loader2 className="w-14 h-14 animate-spin text-emerald-300 absolute inset-0" />
            <Mountain className="w-6 h-6 text-emerald-600 absolute inset-0 m-auto" />
          </div>
          <p
            className="text-sm font-bold tracking-[0.35em] uppercase text-gray-400"
            style={{ fontFamily: fonts.body }}
          >
            Preparing Your Expedition
          </p>
        </div>
      </div>
    );
  }

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
          <p
            className="text-sm text-gray-400"
            style={{ fontFamily: fonts.body }}
          >
            Please go back and try again.
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-colors"
          style={{ fontFamily: fonts.body }}
        >
          <ArrowLeft size={14} /> Go Back
        </button>
      </div>
    );
  }

  const bannerImage =
    resolveImage(trip.bannerImage || trip.featuredImage || trip.heroImage) ||
    FALLBACK_BANNER;
  const rawGallery = trip.galleryImages || trip.gallery || [];
  const packages = trip.packages || [];
  const availableDates = trip.availableDates || [];
  const itinerary = trip.itinerary || [];
  const includes = trip.includes || [];
  const excludes = trip.excludes || [];
  const highlights = trip.highlights || [];
  const faqs = trip.faqs || [];

  const categoryLabel =
    {
      standard: "Standard Trek",
      comfort: "Comfort Trek",
      luxury: "Luxury Trek",
    }[trip.categoryType] ||
    trip.categoryType ||
    "Classic";

  const nextDate = availableDates
    .filter((d) => d.status !== "sold-out" && d.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  return (
    <div
      className="min-h-screen bg-white antialiased"
      style={{ fontFamily: fonts.body }}
    >
      <div className="relative h-[72vh] min-h-[480px] sm:min-h-[540px] overflow-hidden">
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

        <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 sm:px-14 pt-6 z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2.5 text-white/80 hover:text-white transition-all group"
          >
            <span className="w-9 h-9 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all">
              <ArrowLeft size={14} />
            </span>
            <span
              className="text-[13px] font-semibold tracking-wide hidden sm:block"
              style={{ fontFamily: fonts.body }}
            >
              Back to Trips
            </span>
          </button>
          <button
            onClick={() => openLightboxAt(bannerImage)}
            className="flex items-center gap-2 text-white/60 hover:text-white text-xs font-semibold tracking-wide transition-colors"
            style={{ fontFamily: fonts.body }}
          >
            <Maximize2 size={12} />
            <span className="hidden sm:block">View Photos</span>
          </button>
        </div>

        <div className="absolute bottom-0 inset-x-0 px-4 sm:px-14 pb-12 z-10">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
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
              {trip.isTibetTour && (
                <TripBadge label="Tibet Tour" variant="tibet" />
              )}
              {trip.badge && <TripBadge label="Popular" variant="popular" />}
            </div>

            <p
              className="text-emerald-400 text-sm font-bold tracking-[0.35em] uppercase mb-3"
              style={{ fontFamily: fonts.body }}
            >
              {categoryLabel} &nbsp;·&nbsp; {trip.country || "Nepal"}
            </p>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6 max-w-4xl"
              style={{ fontFamily: fonts.display, letterSpacing: "-0.02em" }}
            >
              {trip.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {[
                { icon: Clock, text: `${trip.duration || "N/A"} Days` },
                { icon: MapPin, text: trip.startPoint || "Kathmandu" },
                ...(trip.maxAltitude
                  ? [{ icon: Mountain, text: trip.maxAltitude }]
                  : []),
              ].map(({ icon: Icon, text }, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white/85 text-sm font-medium px-3 sm:px-4 py-2 rounded-full"
                  style={{ fontFamily: fonts.body }}
                >
                  <Icon size={12} className="text-emerald-400" />
                  {text}
                </span>
              ))}
              <DifficultyPill label={trip.difficulty || "Moderate"} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-14 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16">
        <div className="space-y-14 min-w-0">
          <section>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-300 to-transparent" />
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
                    value: `${trip.duration || "—"} Days`,
                  },
                  {
                    icon: Mountain,
                    label: "Difficulty",
                    value: trip.difficulty || "—",
                  },
                  {
                    icon: Wind,
                    label: "Activity",
                    value: trip.activity || "Trekking",
                  },
                  {
                    icon: Mountain,
                    label: "Max. Altitude",
                    value: trip.maxAltitude || "—",
                  },
                  {
                    icon: Calendar,
                    label: "Best Season",
                    value: trip.bestSeason || "—",
                  },
                  {
                    icon: Star,
                    label: "Accommodation",
                    value: trip.accommodation || "—",
                  },
                  {
                    icon: Thermometer,
                    label: "Meals",
                    value: trip.meals || "—",
                  },
                  {
                    icon: MapPin,
                    label: "Start Point",
                    value: trip.startPoint || "—",
                  },
                  {
                    icon: MapPin,
                    label: "End Point",
                    value: trip.endPoint || "—",
                  },
                  { icon: BadgeCheck, label: "Category", value: categoryLabel },
                  {
                    icon: Globe,
                    label: "Activity Type",
                    value: trip.activity || "Trekking",
                  },
                ].map(({ icon: Icon, label, value }, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-4 sm:px-5 py-4 sm:py-5 hover:bg-emerald-50/30 transition-colors border-b border-r border-gray-100"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      <Icon
                        size={15}
                        className="text-emerald-500 stroke-[1.75]"
                      />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-0.5"
                        style={{ fontFamily: fonts.body }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-base font-bold text-gray-900 truncate"
                        style={{ fontFamily: fonts.body }}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <SectionHeading sub="About This Journey">
              Expedition Overview
            </SectionHeading>
            <div
              className="text-base text-gray-600 leading-[1.9] whitespace-pre-line"
              style={{ fontFamily: fonts.body }}
            >
              {trip.overview ||
                "No overview has been added for this expedition yet."}
            </div>
          </section>

          <Note note={trip.note} />
          <LuklaFlightInfo info={trip.luklaFlightInfo} />
          <PackingList packingList={trip.packingList} />
          <RelatedInformation text={trip.relatedInformation} />
          <BestTime text={trip.bestTime} />
          <WhyChoose text={trip.whyChoose} />

          {(trip.mapImage || trip.mapLink) && (
            <MapSection mapImage={trip.mapImage} mapLink={trip.mapLink} />
          )}

          {(trip.brochure?.url || trip.itineraryPdf?.url) && (
            <DownloadSection
              brochure={trip.brochure}
              itineraryPdf={trip.itineraryPdf}
            />
          )}

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
                {(() => {
                  const first = resolveImage(rawGallery[0]);
                  return first ? (
                    <button
                      onClick={() => openLightboxAt(first)}
                      className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden bg-gray-100 group aspect-square sm:aspect-auto focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
                {rawGallery.slice(1, 5).map((rawImg, i) => {
                  const resolvedUrl = resolveImage(rawImg);
                  if (!resolvedUrl) return null;
                  return (
                    <button
                      key={i}
                      onClick={() => openLightboxAt(resolvedUrl)}
                      className="relative rounded-xl overflow-hidden bg-gray-100 group aspect-square focus:outline-none focus:ring-2 focus:ring-emerald-400"
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

          {highlights.length > 0 && (
            <section>
              <SectionHeading sub="What Makes This Special">
                Key Highlights
              </SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all duration-200 group"
                  >
                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <span
                      className="text-base text-gray-700 leading-relaxed"
                      style={{ fontFamily: fonts.body }}
                    >
                      {typeof item === "string" ? item : item.text}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {itinerary.length > 0 && (
            <section>
              <SectionHeading sub="Complete Day-by-Day Breakdown">
                Detailed Itinerary
              </SectionHeading>

              {trip.itineraryPdf?.url && (
                <div className="mb-5 flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-blue-500 shrink-0" />
                    <p
                      className="text-[13px] font-semibold text-blue-800"
                      style={{ fontFamily: fonts.body }}
                    >
                      Download the full itinerary as a PDF for offline reference
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleBrochureDownload(
                        trip.itineraryPdf.url,
                        "trip-itinerary.pdf",
                      )
                    }
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-white bg-white hover:bg-blue-600 px-3 py-2 rounded-lg border border-blue-200 transition-all shrink-0"
                    style={{ fontFamily: fonts.body }}
                  >
                    <Download size={12} /> Download
                  </button>
                </div>
              )}

              <div className="space-y-2">
                {itinerary.map((day, idx) => {
                  const isOpen = activeDay === idx;
                  return (
                    <div
                      key={idx}
                      className={`rounded-xl border overflow-hidden transition-all duration-200 ${isOpen ? "border-emerald-200 shadow-sm shadow-emerald-50" : "border-gray-100 hover:border-gray-200"}`}
                    >
                      <button
                        onClick={() => setActiveDay(isOpen ? -1 : idx)}
                        className={`w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 text-left transition-colors ${isOpen ? "bg-emerald-50/40" : "bg-white hover:bg-gray-50"}`}
                      >
                        <div
                          className={`shrink-0 w-10 h-10 rounded-xl flex flex-col items-center justify-center transition-all ${isOpen ? "bg-emerald-500 text-white" : "bg-gray-50 border border-gray-200 text-gray-500"}`}
                        >
                          <span className="text-[8px] font-bold uppercase tracking-wider leading-none opacity-70">
                            {isOpen ? "Day" : "D"}
                          </span>
                          <span className="text-sm font-bold leading-tight">
                            {day.day || idx + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span
                            className="text-[15px] font-semibold text-gray-900 leading-snug block"
                            style={{ fontFamily: fonts.body }}
                          >
                            {day.title || day.heading}
                          </span>
                          <div className="flex flex-wrap gap-2 sm:gap-3 mt-1">
                            {day.meals && (
                              <span
                                className="text-xs text-gray-400 font-medium"
                                style={{ fontFamily: fonts.body }}
                              >
                                🍽 {day.meals}
                              </span>
                            )}
                            {day.accommodation && (
                              <span
                                className="text-xs text-gray-400 font-medium"
                                style={{ fontFamily: fonts.body }}
                              >
                                🏨 {day.accommodation}
                              </span>
                            )}
                            {day.altitude && (
                              <span
                                className="text-xs text-gray-400 font-medium"
                                style={{ fontFamily: fonts.body }}
                              >
                                ⛰ {day.altitude}
                              </span>
                            )}
                          </div>
                        </div>
                        <span
                          className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400"}`}
                        >
                          {isOpen ? (
                            <ChevronUp size={12} />
                          ) : (
                            <ChevronDown size={12} />
                          )}
                        </span>
                      </button>
                      {isOpen &&
                        (day.description || day.details || day.content) && (
                          <div
                            className="px-5 sm:px-6 py-5 bg-white border-t border-emerald-100 text-base text-gray-600 leading-[1.85] whitespace-pre-line"
                            style={{ fontFamily: fonts.body }}
                          >
                            {day.description || day.details || day.content}
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <section>
            <SectionHeading sub="Package Scope">
              What's Included &amp; Excluded
            </SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 flex items-center gap-3 border-b border-gray-100 bg-white">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <CheckCircle size={14} className="text-emerald-500" />
                  </div>
                  <h3
                    className="text-base font-bold text-gray-800"
                    style={{ fontFamily: fonts.body }}
                  >
                    What's Included
                  </h3>
                </div>
                <div className="p-5 bg-white space-y-3">
                  {includes.length > 0 ? (
                    includes.map((inc, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-600"
                      >
                        <span className="text-emerald-500 font-bold text-base leading-none mt-0.5 shrink-0">
                          ✓
                        </span>
                        <span
                          className="leading-snug"
                          style={{ fontFamily: fonts.body }}
                        >
                          {typeof inc === "string" ? inc : inc.text}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p
                      className="text-sm text-gray-400 italic"
                      style={{ fontFamily: fonts.body }}
                    >
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
                  <h3
                    className="text-base font-bold text-gray-800"
                    style={{ fontFamily: fonts.body }}
                  >
                    What's Excluded
                  </h3>
                </div>
                <div className="p-5 bg-white space-y-3">
                  {excludes.length > 0 ? (
                    excludes.map((exc, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-600"
                      >
                        <span className="text-rose-400 font-bold text-base leading-none mt-0.5 shrink-0">
                          ✕
                        </span>
                        <span
                          className="leading-snug"
                          style={{ fontFamily: fonts.body }}
                        >
                          {typeof exc === "string" ? exc : exc.text}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p
                      className="text-sm text-gray-400 italic"
                      style={{ fontFamily: fonts.body }}
                    >
                      Personal gear excluded.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {packages.length > 0 && (
            <section>
              <SectionHeading sub="Budget Tier Configurations">
                Pricing Packages
              </SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packages.map((pkg, i) => (
                  <PackageCard key={i} pkg={pkg} />
                ))}
              </div>
            </section>
          )}

          {availableDates.length > 0 && (
            <section>
              <SectionHeading sub="Operational Fixed Dates Matrix">
                Departure Dates &amp; Availability
              </SectionHeading>
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-300 to-transparent" />

                <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-gray-100 bg-gray-50/60">
                  {["Departure Date", "Seats", "Price", "Status"].map(
                    (h, i) => (
                      <span
                        key={i}
                        className={`text-[10px] font-black uppercase tracking-widest text-gray-400 ${i === 0 ? "" : i === 3 ? "text-center min-w-[80px]" : i === 2 ? "text-right min-w-[80px]" : "text-center min-w-[64px]"}`}
                        style={{ fontFamily: fonts.body }}
                      >
                        {h}
                      </span>
                    ),
                  )}
                </div>

                <div className="divide-y divide-gray-50">
                  {availableDates.map((d, idx) => {
                    const dateObj = d.date ? new Date(d.date) : null;
                    const soldOut = d.status === "sold-out";
                    return (
                      <div
                        key={idx}
                        className={`transition-colors ${soldOut ? "opacity-50" : "hover:bg-emerald-50/30"}`}
                      >
                        <div className="sm:hidden px-4 py-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {dateObj && (
                                <div className="shrink-0 w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 leading-none">
                                    {dateObj.toLocaleString("default", {
                                      month: "short",
                                    })}
                                  </span>
                                  <span className="text-base font-black text-gray-900 leading-tight">
                                    {dateObj.getDate()}
                                  </span>
                                </div>
                              )}
                              <div>
                                <p
                                  className="text-sm font-semibold text-gray-900"
                                  style={{ fontFamily: fonts.body }}
                                >
                                  {dateObj
                                    ? dateObj.toLocaleDateString("en-US", {
                                        weekday: "short",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })
                                    : d.date || "TBA"}
                                </p>
                                <p
                                  className="text-xs text-gray-400 font-medium"
                                  style={{ fontFamily: fonts.body }}
                                >
                                  {d.totalSeats
                                    ? `${d.totalSeats} seats`
                                    : "Open"}{" "}
                                  ·{" "}
                                  {d.price
                                    ? `USD ${Number(d.price).toLocaleString()}`
                                    : "Standard"}
                                </p>
                              </div>
                            </div>
                            <span
                              className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide capitalize ${dateStatusStyle(d.status)}`}
                            >
                              {d.status || "available"}
                            </span>
                          </div>
                          {!soldOut && (
                            <button
                              onClick={() => setBookingOpen(true)}
                              className="w-full text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-white py-2 rounded-lg transition-colors"
                              style={{ fontFamily: fonts.body }}
                            >
                              Book This Date
                            </button>
                          )}
                        </div>

                        <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-4">
                          <div className="flex items-center gap-3">
                            {dateObj && (
                              <div className="shrink-0 w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 leading-none">
                                  {dateObj.toLocaleString("default", {
                                    month: "short",
                                  })}
                                </span>
                                <span className="text-base font-black text-gray-900 leading-tight">
                                  {dateObj.getDate()}
                                </span>
                              </div>
                            )}
                            <div>
                              <p
                                className="text-sm font-semibold text-gray-900"
                                style={{ fontFamily: fonts.body }}
                              >
                                {dateObj
                                  ? dateObj.toLocaleDateString("en-US", {
                                      weekday: "short",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })
                                  : d.date || "TBA"}
                              </p>
                              {trip.duration && (
                                <p
                                  className="text-xs text-gray-400 font-medium mt-0.5"
                                  style={{ fontFamily: fonts.body }}
                                >
                                  {trip.duration}-day expedition
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="min-w-[64px] text-center">
                            {d.totalSeats ? (
                              <div className="flex flex-col items-center">
                                <Users
                                  size={13}
                                  className="text-gray-400 mb-0.5"
                                />
                                <span className="text-sm font-bold text-gray-700">
                                  {d.totalSeats}
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs text-gray-400">
                                Open
                              </span>
                            )}
                          </div>
                          <div className="min-w-[80px] text-right">
                            {d.price ? (
                              <p
                                className="text-sm font-bold text-gray-900"
                                style={{ fontFamily: fonts.display }}
                              >
                                USD {Number(d.price).toLocaleString()}
                              </p>
                            ) : (
                              <p className="text-xs text-gray-400">Standard</p>
                            )}
                          </div>
                          <div className="min-w-[80px] flex flex-col items-center gap-2">
                            <span
                              className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide capitalize ${dateStatusStyle(d.status)}`}
                            >
                              {d.status || "available"}
                            </span>
                            {!soldOut && (
                              <button
                                onClick={() => setBookingOpen(true)}
                                className="text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-white px-3 py-1 rounded-lg transition-colors"
                                style={{ fontFamily: fonts.body }}
                              >
                                Book
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {trip.guideInfo && <GuideSection guide={trip.guideInfo} />}

          {faqs.length > 0 && (
            <section>
              <SectionHeading sub="Common Questions">
                Frequently Asked Questions
              </SectionHeading>
              <div className="bg-white border border-gray-100 rounded-2xl px-5 sm:px-6 py-2">
                <AccordionFAQ faqs={faqs} />
              </div>
            </section>
          )}
        </div>

        <aside ref={sidebarRef} className="w-full">
          <div className="sticky top-6 space-y-4">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg shadow-gray-100/80">
              <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-300" />
              <div className="px-5 sm:px-6 pt-6 pb-5">
                {trip.oldPrice > 0 && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm line-through text-gray-300">
                      USD {Number(trip.oldPrice).toLocaleString()}
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
                      ? `USD ${Number(trip.price).toLocaleString()}`
                      : "Contact Us"}
                  </span>
                </div>
                <p
                  className="text-[12px] text-gray-400 font-medium mt-1.5 tracking-wide"
                  style={{ fontFamily: fonts.body }}
                >
                  per person · all inclusive
                </p>
              </div>

              <div className="px-5 sm:px-6 pb-5 space-y-2.5">
                <button
                  onClick={() => setBookingOpen(true)}
                  className="w-full bg-gray-950 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl transition-colors text-[15px] tracking-wide"
                  style={{ fontFamily: fonts.body }}
                >
                  Book This Expedition
                </button>

                {trip.brochure?.url ? (
                  <button
                    onClick={() =>
                      handleBrochureDownload(
                        trip.brochure.url,
                        "trip-brochure.pdf",
                      )
                    }
                    className="w-full flex items-center justify-center gap-2 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold py-3 rounded-xl transition-colors text-[15px]"
                    style={{ fontFamily: fonts.body }}
                  >
                    <Download size={14} /> Download Brochure
                  </button>
                ) : (
                  <button
                    className="w-full flex items-center justify-center gap-2 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold py-3 rounded-xl transition-colors text-[15px] opacity-50 cursor-not-allowed"
                    disabled
                    style={{ fontFamily: fonts.body }}
                  >
                    <Download size={14} /> Brochure Unavailable
                  </button>
                )}

                {trip.itineraryPdf?.url && (
                  <button
                    onClick={() =>
                      handleBrochureDownload(
                        trip.itineraryPdf.url,
                        "trip-itinerary.pdf",
                      )
                    }
                    className="w-full flex items-center justify-center gap-2 border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 rounded-xl transition-colors text-[15px]"
                    style={{ fontFamily: fonts.body }}
                  >
                    <FileText size={14} /> Download Itinerary
                  </button>
                )}
              </div>

              <div className="mx-5 sm:mx-6 mb-6 grid grid-cols-2 gap-2.5 pt-4 border-t border-gray-100">
                {[
                  { icon: Shield, text: "Free cancellation" },
                  { icon: Users, text: "Small groups" },
                  { icon: Star, text: "Expert guides" },
                  { icon: CheckCircle, text: "Secure booking" },
                ].map(({ icon: Icon, text }, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-[12px] text-gray-500 font-medium"
                    style={{ fontFamily: fonts.body }}
                  >
                    <Icon size={12} className="text-emerald-400 shrink-0" />{" "}
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {nextDate && (
              <div className="bg-white border border-emerald-200 rounded-2xl px-5 py-4">
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-500 mb-2 flex items-center gap-1.5"
                  style={{ fontFamily: fonts.body }}
                >
                  <Calendar size={11} /> Next Departure
                </p>
                <p
                  className="font-bold text-gray-900 text-[15px]"
                  style={{ fontFamily: fonts.body }}
                >
                  {new Date(nextDate.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <div className="flex items-center justify-between mt-2">
                  {nextDate.totalSeats && (
                    <span
                      className="text-[12px] text-gray-500 font-medium flex items-center gap-1"
                      style={{ fontFamily: fonts.body }}
                    >
                      <Users size={11} /> {nextDate.totalSeats} seats
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide capitalize ${dateStatusStyle(nextDate.status)}`}
                  >
                    {nextDate.status || "available"}
                  </span>
                </div>
              </div>
            )}

            {availableDates.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-emerald-500" />
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500"
                      style={{ fontFamily: fonts.body }}
                    >
                      Upcoming Departures
                    </span>
                  </div>
                  <span
                    className="text-[11px] text-gray-400 font-medium"
                    style={{ fontFamily: fonts.body }}
                  >
                    {availableDates.length} dates
                  </span>
                </div>
                <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
                  {availableDates.map((date, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer"
                      onClick={() => setBookingOpen(true)}
                    >
                      <div>
                        <p
                          className="text-[14px] font-semibold text-gray-800"
                          style={{ fontFamily: fonts.body }}
                        >
                          {date.date}
                        </p>
                        <p
                          className="text-[11px] text-gray-400 mt-0.5 font-medium"
                          style={{ fontFamily: fonts.body }}
                        >
                          {date.totalSeats
                            ? `${date.totalSeats} seats`
                            : "Open"}
                          {date.price
                            ? ` · USD ${Number(date.price).toLocaleString()}`
                            : ""}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${dateStatusStyle(date.status)}`}
                      >
                        {date.status || "available"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {packages.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                  <Package size={13} className="text-emerald-500" />
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500"
                    style={{ fontFamily: fonts.body }}
                  >
                    Available Packages
                  </span>
                </div>
                <div className="p-3 space-y-2">
                  {packages.map((pkg, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gray-50"
                    >
                      <span
                        className="text-[14px] font-semibold text-gray-700"
                        style={{ fontFamily: fonts.body }}
                      >
                        {pkg.name || `Package ${i + 1}`}
                      </span>
                      <span
                        className="text-[14px] font-bold text-gray-900"
                        style={{ fontFamily: fonts.body }}
                      >
                        {pkg.price
                          ? `USD ${Number(pkg.price).toLocaleString()}`
                          : "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {trip.guideInfo?.name && (
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                  <UserCheck size={13} className="text-emerald-500" />
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500"
                    style={{ fontFamily: fonts.body }}
                  >
                    Your Lead Guide
                  </span>
                </div>
                <div className="p-4 flex items-center gap-3">
                  {trip.guideInfo.photo?.url ? (
                    <img
                      src={trip.guideInfo.photo.url}
                      alt={trip.guideInfo.name}
                      className="w-12 h-12 rounded-xl object-cover border border-emerald-100"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                      <UserCheck size={20} className="text-emerald-400" />
                    </div>
                  )}
                  <div>
                    <p
                      className="text-[15px] font-bold text-gray-900"
                      style={{ fontFamily: fonts.body }}
                    >
                      {trip.guideInfo.name}
                    </p>
                    {trip.guideInfo.experience && (
                      <p
                        className="text-[12px] text-gray-400 mt-0.5"
                        style={{ fontFamily: fonts.body }}
                      >
                        {trip.guideInfo.experience}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-950 rounded-2xl p-5 text-center space-y-3">
              <PhoneCall size={18} className="text-emerald-400 mx-auto" />
              <div>
                <p
                  className="text-[15px] font-semibold text-white"
                  style={{ fontFamily: fonts.body }}
                >
                  Need a custom booking?
                </p>
                <p
                  className="text-[13px] text-gray-400 mt-0.5"
                  style={{ fontFamily: fonts.body }}
                >
                  Group rates &amp; private departures available
                </p>
              </div>
              <Link
                to="/contact-us"
                className="block w-full text-[13px] font-bold bg-emerald-500 hover:bg-emerald-400 text-black py-2.5 rounded-xl transition-colors text-center"
                style={{ fontFamily: fonts.body }}
              >
                Contact Our Team →
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <BookingModal
        trip={trip}
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      {galleryOpen && lightboxImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/97 flex flex-col"
          onClick={() => setGalleryOpen(false)}
        >
          <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 sm:px-6 py-5 z-10">
            <span
              className="text-xs text-white/50 font-semibold tracking-widest"
              style={{ fontFamily: fonts.body }}
            >
              {String(galleryIndex + 1).padStart(2, "0")} /{" "}
              {String(lightboxImages.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => setGalleryOpen(false)}
              className="w-10 h-10 rounded-full bg-white/8 hover:bg-white/15 text-white flex items-center justify-center transition-colors border border-white/10"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center relative px-12 sm:px-16">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setGalleryIndex(
                  (p) =>
                    (p - 1 + lightboxImages.length) % lightboxImages.length,
                );
              }}
              className="absolute left-3 sm:left-4 w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 text-white flex items-center justify-center border border-white/10 transition-all"
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
              className="absolute right-3 sm:right-4 w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 text-white flex items-center justify-center border border-white/10 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {lightboxImages.length > 1 && (
            <div
              className="pb-6 sm:pb-7 flex items-center justify-center gap-1.5 overflow-x-auto px-4 sm:px-6"
              onClick={(e) => e.stopPropagation()}
            >
              {lightboxImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIndex(i)}
                  className={`shrink-0 w-12 sm:w-14 h-9 sm:h-10 rounded-lg overflow-hidden border-[1.5px] transition-all ${i === galleryIndex ? "border-emerald-400 opacity-100 scale-105" : "border-transparent opacity-35 hover:opacity-60"}`}
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