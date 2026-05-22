import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { Calendar, CheckCircle2, Award, ArrowUpRight, Loader2, MapPin } from "lucide-react";

const categoryConfig = {
  standard: {
    label: "Standard",
    bg: "#EFF6FF",
    text: "#1D4ED8",
    dot: "#3B82F6",
  },
  budget: {
    label: "Budget",
    bg: "#FFFBEB",
    text: "#B45309",
    dot: "#F59E0B",
  },
  luxury: {
    label: "Luxury",
    bg: "#F5F3FF",
    text: "#6D28D9",
    dot: "#8B5CF6",
  },
  comfort: {
    label: "Comfort",
    bg: "#ECFDF5",
    text: "#065F46",
    dot: "#10B981",
  },
};

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
      } catch (err) {
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
        <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
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

  const dynamicCountry = treks[0]?.country || "Everest Base Camp";

  return (
    <section className="bg-white py-16 px-5 md:px-14">
      <style>{`
        .pt-card {
          transition: transform 0.32s cubic-bezier(0.25,0.46,0.45,0.94),
                      box-shadow 0.32s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .pt-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.09), 0 6px 16px rgba(0,0,0,0.05);
        }
        .pt-card:hover .pt-img { transform: scale(1.05); }
        .pt-img {
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .pt-book-btn {
          transition: background 0.18s, color 0.18s, border-color 0.18s;
        }
        .pt-card:hover .pt-book-btn {
          background: #111;
          color: #fff;
          border-color: #111;
        }
        .pt-title {
          transition: color 0.18s;
        }
        .pt-card:hover .pt-title { color: #B45309; }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-gray-400 font-semibold mb-2">
              <MapPin className="w-3 h-3 inline-block mr-1 -mt-0.5" />
              Curated Packages
            </p>
            <h2 className="text-[28px] md:text-[34px] font-black text-gray-950 leading-none tracking-tight">
              Popular {dynamicCountry} Options
            </h2>
          </div>
          <p className="text-[13px] text-gray-400 max-w-sm leading-relaxed md:text-right">
            Packages matched to your pace, comfort, and adventure goals.
          </p>
        </div>

        {/* Thin accent rule */}
        <div className="w-full h-px bg-gray-100 mb-10" />

        {treks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-200 rounded-2xl">
            <p className="text-[13px] text-gray-400">No trips found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treks.map((trek) => {
              const currentId = trek._id || trek.id;
              const config = categoryConfig[trek.categoryType] || categoryConfig.standard;
              const features = trek.highlights?.slice(0, 3) || [];
              const hasDiscount = trek.oldPrice > trek.price && trek.oldPrice > 0;
              const discountPct = hasDiscount
                ? Math.round((1 - trek.price / trek.oldPrice) * 100)
                : 0;

              const tripImage =
                trek.featuredImage?.url ||
                trek.featuredImage ||
                trek.heroImage?.url ||
                "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80";

              return (
                <Link
                  to={`/feature/${currentId}`}
                  key={currentId}
                  className="pt-card group bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={tripImage}
                      alt={trek.title || "Trip"}
                      className="pt-img w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80";
                      }}
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                    {/* Category badge */}
                    <div
                      className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm"
                      style={{ background: config.bg, color: config.text }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: config.dot }}
                      />
                      {config.label}
                    </div>

                    {/* Discount badge */}
                    {hasDiscount && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold tracking-wide px-2 py-1 rounded-md shadow-sm">
                        {discountPct}% OFF
                      </div>
                    )}

                    {/* Best seller badge */}
                    {trek.isBestSeller2026 && (
                      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-xl shadow-md flex items-center gap-2 border border-gray-100/60">
                        <Award className="text-amber-500 shrink-0 w-4 h-4" />
                        <div className="leading-none">
                          <p className="text-[8px] text-gray-400 uppercase font-extrabold tracking-wider">
                            Travelers' Choice
                          </p>
                          <p className="text-[11px] font-black text-gray-900 mt-0.5">
                            Best of 2026
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Arrow hint */}
                    <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-800" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">

                    {/* Meta */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex items-center gap-1 text-[11px] text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {trek.duration || "—"} Days
                      </span>
                      {trek.difficulty && (
                        <>
                          <span className="text-gray-200">•</span>
                          <span
                            className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              background:
                                trek.difficulty === "Easy" ? "#ECFDF5"
                                : trek.difficulty === "Moderate" ? "#FFF7ED"
                                : "#FFF1F2",
                              color:
                                trek.difficulty === "Easy" ? "#059669"
                                : trek.difficulty === "Moderate" ? "#EA580C"
                                : "#DC2626",
                            }}
                          >
                            {trek.difficulty}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="pt-title text-[15px] font-bold text-gray-900 leading-snug line-clamp-2 mb-4 min-h-[2.8rem]">
                      {trek.title || "Untitled Expedition"}
                    </h3>

                    {/* Features */}
                    {features.length > 0 && (
                      <ul className="space-y-1.5 mb-5">
                        {features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-[12px] text-gray-500"
                          >
                            <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                            <span className="truncate">
                              {typeof feature === "string" ? feature : feature.text || ""}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Spacer */}
                    <div className="flex-grow" />

                    {/* Divider + Pricing + CTA */}
                    <div className="pt-4 border-t border-gray-100 mt-3">
                      <div className="flex items-end justify-between">
                        <div>
                          {hasDiscount && (
                            <span className="block text-[10px] text-gray-300 line-through leading-none mb-0.5">
                              USD {trek.oldPrice?.toLocaleString()}
                            </span>
                          )}
                          <div className="flex items-baseline gap-1">
                            <span className="text-[10px] text-gray-400">from</span>
                            <span className="text-[22px] font-black text-gray-950 tracking-tight leading-none">
                              ${trek.price?.toLocaleString() || "0"}
                            </span>
                          </div>
                        </div>

                        <button className="pt-book-btn text-[10px] font-semibold tracking-wide uppercase border border-gray-200 text-gray-700 px-3 py-2 rounded-lg">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Footer CTA */}
        {treks.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Link
              to="/trips"
              className="group flex items-center gap-2 text-[12px] font-semibold tracking-wide uppercase text-gray-600 border border-gray-200 px-6 py-3 rounded-full hover:bg-gray-950 hover:text-white hover:border-gray-950 transition-all duration-200"
            >
              View All Expeditions
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularTreks;