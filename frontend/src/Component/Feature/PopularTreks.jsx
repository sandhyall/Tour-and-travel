import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { Calendar, Award, ArrowUpRight, Loader2, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const categoryConfig = {
  standard: { label: "Standard", bg: "#EFF6FF", text: "#1D4ED8", dot: "#3B82F6" },
  budget:   { label: "Budget",   bg: "#FFFBEB", text: "#B45309", dot: "#F59E0B" },
  luxury:   { label: "Luxury",   bg: "#F5F3FF", text: "#6D28D9", dot: "#8B5CF6" },
  comfort:  { label: "Comfort",  bg: "#ECFDF5", text: "#065F46", dot: "#10B981" },
};

const difficultyStyle = {
  Easy:     { background: "#ECFDF5", color: "#059669" },
  Moderate: { background: "#FFF7ED", color: "#EA580C" },
  Hard:     { background: "#FEF2F2", color: "#DC2626" },
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80";

const PopularTreks = () => {
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularTreks = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/trips");
        setTreks(Array.isArray(data) ? data : data.trips || []);
      } catch {
        setError("Failed to load trips. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchPopularTreks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[340px] flex flex-col items-center justify-center gap-3 bg-white">
        <Loader2 className="w-7 h-7 animate-spin text-gray-300" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-gray-300 font-semibold">
          Loading Expeditions
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[260px] flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-[13px] text-gray-400 mb-3">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-[11px] tracking-[0.12em] uppercase text-gray-500 border border-gray-200 px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const dynamicCountry = treks[0]?.country || "Himalayan";

  return (
    <section className="bg-white py-20 px-5 md:px-10 overflow-hidden">
      <style>{`
        /* ── Card ── */
        .pt-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }
        .pt-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.10), 0 6px 16px rgba(0,0,0,0.06);
        }

        /* ── Image zoom ── */
        .pt-img {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }
        .pt-card:hover .pt-img {
          transform: scale(1.08);
        }

        /* ── Book button ── */
        .pt-book-btn {
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .pt-card:hover .pt-book-btn {
          background-color: #111827;
          color: #ffffff;
          border-color: #111827;
        }

        /* ── Title colour shift ── */
        .pt-title {
          transition: color 0.2s ease;
        }
        .pt-card:hover .pt-title {
          color: #B45309;
        }

        /* ── Arrow icon reveal ── */
        .pt-arrow {
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .pt-card:hover .pt-arrow {
          opacity: 1;
        }

        /* ── Swiper overrides ── */
        .popular-slider {
          padding-bottom: 60px !important;
          overflow: visible !important;
        }
        .popular-slider .swiper-slide {
          height: auto;
        }

        /* Nav buttons */
        .popular-slider .swiper-button-prev,
        .popular-slider .swiper-button-next {
          width: 48px;
          height: 48px;
          border-radius: 9999px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 30px rgba(0,0,0,0.10);
          color: #111827;
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .popular-slider .swiper-button-prev:hover,
        .popular-slider .swiper-button-next:hover {
          background-color: #111827;
          color: #ffffff;
          border-color: #111827;
        }
        .popular-slider .swiper-button-prev::after,
        .popular-slider .swiper-button-next::after {
          font-size: 14px;
          font-weight: 900;
        }

        /* Pagination dots */
        .popular-slider .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          opacity: 1;
          transition: width 0.2s ease, background-color 0.2s ease;
        }
        .popular-slider .swiper-pagination-bullet-active {
          width: 26px;
          border-radius: 9999px;
          background: #111827;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-5">
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-amber-600 font-bold mb-3 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              Curated Packages
            </p>
            <h2 className="text-[30px] md:text-[40px] font-black text-gray-950 tracking-tight leading-none">
              Popular {dynamicCountry} Treks
            </h2>
          </div>
          <p className="text-[14px] text-gray-500 max-w-md leading-relaxed md:text-right">
            Discover handpicked Himalayan adventures crafted for every type of traveler — from
            luxury escapes to epic expeditions.
          </p>
        </div>

        {/* Empty state */}
        {treks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-200 rounded-3xl">
            <p className="text-[13px] text-gray-400">No trips found.</p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640:  { slidesPerView: 1 },
              768:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1400: { slidesPerView: 4 },
            }}
            className="popular-slider"
          >
            {treks.map((trek) => {
              const currentId = trek._id || trek.id;
              const config = categoryConfig[trek.categoryType] ?? categoryConfig.standard;
              const features = trek.highlights?.slice(0, 3) ?? [];
              const hasDiscount = trek.oldPrice > trek.price && trek.oldPrice > 0;
              const discountPct = hasDiscount
                ? Math.round((1 - trek.price / trek.oldPrice) * 100)
                : 0;
              const tripImage =
                trek.featuredImage?.url || trek.featuredImage || trek.heroImage?.url || FALLBACK_IMAGE;
              const diffStyle = difficultyStyle[trek.difficulty] ?? difficultyStyle.Hard;

              return (
                <SwiperSlide key={currentId} className="h-auto">
                  <Link
                    to={`/feature/${currentId}`}
                    className="pt-card group bg-white rounded-3xl overflow-hidden border border-gray-100"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-gray-100 shrink-0">
                      <img
                        src={tripImage}
                        alt={trek.title || "Trip"}
                        className="pt-img w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                      />
                      {/* gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                      {/* Category badge */}
                      <div
                        className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm"
                        style={{ background: config.bg, color: config.text }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: config.dot }} />
                        {config.label}
                      </div>

                      {/* Discount badge */}
                      {hasDiscount && (
                        <div className="absolute top-4 right-4 bg-amber-500 text-white text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-lg shadow-lg">
                          {discountPct}% OFF
                        </div>
                      )}

                      {/* Best seller badge */}
                      {trek.isBestSeller2026 && (
                        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-2xl shadow-lg flex items-center gap-2">
                          <Award className="text-amber-500 shrink-0 w-4 h-4" />
                          <div className="leading-none">
                            <p className="text-[8px] text-gray-400 uppercase font-extrabold tracking-wider">
                              Travelers' Choice
                            </p>
                            <p className="text-[11px] font-black text-gray-900 mt-1">Best of 2026</p>
                          </div>
                        </div>
                      )}

                      {/* Arrow icon */}
                      <div className="pt-arrow absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                        <ArrowUpRight className="w-4 h-4 text-gray-800" />
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Duration + difficulty */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Calendar className="w-3 h-3 shrink-0" />
                          {trek.duration || "—"} Days
                        </span>
                        {trek.difficulty && (
                          <>
                            <span className="text-gray-200" aria-hidden>•</span>
                            <span
                              className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
                              style={diffStyle}
                            >
                              {trek.difficulty}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="pt-title text-[18px] font-bold text-gray-900 leading-snug line-clamp-2 mb-5 min-h-[56px]">
                        {trek.title || "Untitled Expedition"}
                      </h3>

                      {/* Highlights */}
                      {features.length > 0 && (
                        <ul className="space-y-2 mb-6">
                          {features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-[13px] text-gray-500">
                              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                              <span className="truncate">
                                {typeof feature === "string" ? feature : feature.text || ""}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex-grow" />

                      {/* Price + CTA */}
                      <div className="pt-5 border-t border-gray-100 mt-3">
                        <div className="flex items-end justify-between">
                          <div>
                            {hasDiscount && (
                              <span className="block text-[11px] text-gray-300 line-through mb-1">
                                USD {trek.oldPrice?.toLocaleString()}
                              </span>
                            )}
                            <div className="flex items-end gap-1">
                              <span className="text-[11px] text-gray-400 mb-1">from</span>
                              <span className="text-[28px] font-black text-gray-950 tracking-tight leading-none">
                                ${trek.price?.toLocaleString() || "0"}
                              </span>
                            </div>
                          </div>
                          <button className="pt-book-btn text-[11px] font-bold tracking-wide uppercase border border-gray-200 text-gray-700 px-4 py-3 rounded-xl">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        {/* View all */}
        {treks.length > 0 && (
          <div className="mt-14 flex justify-center">
            <Link
              to="/trips"
              className="group flex items-center gap-2 text-[12px] font-semibold tracking-wide uppercase text-gray-700 border border-gray-200 px-7 py-3 rounded-full hover:bg-gray-950 hover:text-white hover:border-gray-950 transition-all duration-300"
            >
              View All Expeditions
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularTreks;