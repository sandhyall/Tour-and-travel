import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import {
  Calendar,
  ChevronRight,
  ChevronLeft,
  Flame,
  Gem,
  Mountain,
  Map,
  MapPin,
  Loader2,
  ArrowUpRight,
  Tag,
} from "lucide-react";

const Everest = () => {
  const [allTrips, setAllTrips] = useState([]);
  const [activeTab, setActiveTab] = useState("best-sellers");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollRef = useRef(null);

  const tabs = [
    {
      id: "best-sellers",
      label: "Best Sellers 2026",
      icon: <Flame className="w-3.5 h-3.5" />,
      accent: "#E8520A",
    },
    {
      id: "luxury",
      label: "Luxury VIP",
      icon: <Gem className="w-3.5 h-3.5" />,
      accent: "#2563EB",
    },
    {
      id: "peak-climbing",
      label: "Peak Climbing",
      icon: <Mountain className="w-3.5 h-3.5" />,
      accent: "#374151",
    },
    {
      id: "short-treks",
      label: "Short Treks",
      icon: <Map className="w-3.5 h-3.5" />,
      accent: "#059669",
    },
    {
      id: "bhutan-tours",
      label: "Bhutan Tours",
      icon: <MapPin className="w-3.5 h-3.5" />,
      accent: "#DC2626",
    },
  ];

  const activeAccent = tabs.find((t) => t.id === activeTab)?.accent || "#111";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/trips");
        const tripsArray = Array.isArray(response.data)
          ? response.data
          : response.data.trips || [];
        setAllTrips(tripsArray);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load trips");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const checkScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScrollState);
    checkScrollState();
    return () => el.removeEventListener("scroll", checkScrollState);
  }, [activeTab]);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
    }
  };

  const getActivePackages = () => {
    if (!Array.isArray(allTrips) || allTrips.length === 0) return [];
    const keyMap = {
      "best-sellers": "isBestSeller2026",
      luxury: "isLuxuryVIP",
      "peak-climbing": "isPeakClimbing",
      "short-treks": "isShortTrek",
      "bhutan-tours": "isBhutanTour",
    };
    return allTrips.filter((pkg) => pkg[keyMap[activeTab]] === true);
  };

  if (loading) {
    return (
      <div className="min-h-[420px] flex flex-col items-center justify-center bg-white gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
        <span className="text-[11px] tracking-[0.15em] uppercase text-gray-300 font-medium">
          Loading Expeditions
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[260px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[13px] text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-[11px] tracking-[0.12em] uppercase text-gray-500 border border-gray-200 px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const activePackages = getActivePackages();

  return (
    <section className="w-full bg-white">
      <style>{`
        .ev-scroll::-webkit-scrollbar { display: none; }
        .ev-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        .ev-card {
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .ev-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06);
        }
        .ev-card:hover .ev-img {
          transform: scale(1.04);
        }
        .ev-img {
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .ev-tab-ink {
          transition: left 0.25s cubic-bezier(0.4,0,0.2,1), width 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .ev-arrow-btn {
          transition: background 0.18s, opacity 0.18s, transform 0.18s;
        }
        .ev-arrow-btn:hover { background: #111; }
        .ev-arrow-btn:hover svg { color: #fff; }
        .ev-arrow-btn:active { transform: scale(0.94); }
        .ev-arrow-btn:disabled { opacity: 0; pointer-events: none; }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-5 md:px-14 py-10">
        <div className="flex flex-col items-center text-center mb-12">
          <p className=" tracking-[0.25em] text-base uppercase text-orange-600 font-bold mb-3">
            Handpicked Journeys
          </p>

          <h2 className="text-[28px] md:text-[36px] font-bold text-gray-950 tracking-tight mb-2">
            Explore Our Collections
          </h2>

          {activePackages.length > 0 && (
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
              {activePackages.length} active expeditions available
            </span>
          )}
        </div>

        <div className="flex justify-center   w-full mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
            flex items-center gap-2 px-6 py-2.5 rounded-full border text-[13px] font-medium
            transition-all duration-300 ease-in-out whitespace-nowrap
            ${
              isActive
                ? "bg-white border-orange-500 text-orange-600 shadow-sm shadow-orange-100"
                : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }
          `}
                >
                  <span
                    className={isActive ? "text-orange-500" : "text-gray-400"}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

      
        {activePackages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-150 rounded-2xl bg-gray-50/40">
            <Mountain className="w-8 h-8 text-gray-200 mb-3" />
            <p className="text-[13px] text-gray-400">
              No expeditions in this category yet
            </p>
            <p className="text-[11px] text-gray-300 mt-1">
              {allTrips.length} total trips in database
            </p>
          </div>
        ) : (
          <div className="relative">
           
            <button
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              className="ev-arrow-btn absolute left-[-16px] top-[40%] -translate-y-1/2 z-20
                         w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center
                         justify-center shadow-md hidden md:flex"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>

            <div
              ref={scrollRef}
              onScroll={checkScrollState}
              className="ev-scroll flex gap-4 overflow-x-auto pb-6"
            >
              {activePackages.map((pkg) => {
                const imgUrl =
                  pkg.featuredImage?.url ||
                  pkg.featuredImage ||
                  (Array.isArray(pkg.gallery) && pkg.gallery[0]?.url) ||
                  (Array.isArray(pkg.gallery) && pkg.gallery[0]) ||
                  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600";

                const tripId = pkg._id || pkg.id;
                const hasDiscount =
                  pkg.oldPrice > pkg.price && pkg.oldPrice > 0;
                const discountPct = hasDiscount
                  ? Math.round((1 - pkg.price / pkg.oldPrice) * 100)
                  : 0;

                return (
                  <Link
                    to={`/feature/${tripId}`}
                    key={tripId}
                    className="ev-card group shrink-0 w-[272px] bg-white rounded-2xl
                               border border-gray-100 overflow-hidden flex flex-col"
                  >
                    <div className="h-[176px] w-full overflow-hidden bg-gray-100 relative">
                      <img
                        src={imgUrl}
                        alt={pkg.title}
                        className="ev-img w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600";
                        }}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    
                      {hasDiscount && (
                        <div
                          className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm
                                        rounded-md px-2 py-1 border border-gray-100/60 shadow-sm"
                        >
                          <Tag className="w-2.5 h-2.5 text-orange-500" />
                          <span className="text-[10px] font-bold text-orange-600">
                            {discountPct}% OFF
                          </span>
                        </div>
                      )}

                     
                      <div
                        className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/90
                                      backdrop-blur-sm flex items-center justify-center
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-gray-800" />
                      </div>
                    </div>

                 
                    <div className="p-4 flex-grow flex flex-col gap-3">
                    
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Calendar className="w-3 h-3" />
                          {pkg.duration ? `${pkg.duration}D` : "—"}
                        </span>
                        {pkg.region && (
                          <>
                            <span className="text-gray-200 text-[10px]">•</span>
                            <span className="text-[11px] text-gray-400 truncate max-w-[120px]">
                              {pkg.region}
                            </span>
                          </>
                        )}
                        {pkg.difficulty && (
                          <span
                            className="ml-auto text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              background:
                                pkg.difficulty === "Easy"
                                  ? "#ECFDF5"
                                  : pkg.difficulty === "Moderate"
                                    ? "#FFF7ED"
                                    : "#FFF1F2",
                              color:
                                pkg.difficulty === "Easy"
                                  ? "#059669"
                                  : pkg.difficulty === "Moderate"
                                    ? "#EA580C"
                                    : "#DC2626",
                            }}
                          >
                            {pkg.difficulty}
                          </span>
                        )}
                      </div>

                      <h3 className="text-[14px] font-bold text-gray-900 leading-snug line-clamp-2 flex-grow">
                        {pkg.title}
                      </h3>

                      
                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex items-end justify-between">
                          <div>
                            {hasDiscount && (
                              <span className="block text-[10px] text-gray-300 line-through leading-none mb-0.5">
                                USD {pkg.oldPrice.toLocaleString()}
                              </span>
                            )}
                            <div className="flex items-baseline gap-1">
                              <span className="text-[10px] text-gray-400 font-medium">
                                from
                              </span>
                              <span className="text-[20px] font-black text-gray-950 tracking-tight leading-none">
                                ${pkg.price?.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div
                            className="text-[10px] font-semibold tracking-wide uppercase
                                       border px-2.5 py-1.5 rounded-lg transition-colors duration-200
                                       group-hover:bg-gray-950 group-hover:text-white group-hover:border-gray-950
                                       text-gray-700 border-gray-200"
                          >
                            Book
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}

            
            </div>

          
            <button
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              className="ev-arrow-btn absolute right-[-16px] top-[40%] -translate-y-1/2 z-20
                         w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center
                         justify-center shadow-md hidden md:flex"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Everest;
