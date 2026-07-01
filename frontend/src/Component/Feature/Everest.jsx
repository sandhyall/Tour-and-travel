import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import {
  Calendar,
  Flame,
  Gem,
  Mountain,
  Map,
  MapPin,
  Loader2,
  ArrowUpRight,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  cardVariant,
  scaleHover,
} from "../animations/MotionVariant";

const FALLBACK_BANNER =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop";

const Everest = () => {
  const [allTrips, setAllTrips] = useState([]);
  const [activeTab, setActiveTab] = useState("best-sellers");
  const [loading, setLoading] = useState(true);

  const tabs = [
    {
      id: "best-sellers",
      label: "Best Sellers 2026",
      icon: <Flame className="w-4 h-4" />,
    },
    { id: "luxury", label: "Luxury VIP", icon: <Gem className="w-4 h-4" /> },
    {
      id: "peak-climbing",
      label: "Peak Climbing",
      icon: <Mountain className="w-4 h-4" />,
    },
    {
      id: "short-treks",
      label: "Short Treks",
      icon: <Map className="w-4 h-4" />,
    },
    {
      id: "bhutan-tours",
      label: "Bhutan Tours",
      icon: <MapPin className="w-4 h-4" />,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/trips");
        setAllTrips(Array.isArray(data) ? data : data.trips || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const resolveImage = (img) => {
    if (!img) return FALLBACK_BANNER;
    if (typeof img === "string") return img;
    if (img?.url) return img.url;
    return FALLBACK_BANNER;
  };

  const keyMap = {
    "best-sellers": "isBestSeller2026",
    luxury: "isLuxuryVIP",
    "peak-climbing": "isPeakClimbing",
    "short-treks": "isShortTrek",
    "bhutan-tours": "isBhutanTour",
  };

  const activePackages = allTrips.filter(
    (pkg) => pkg[keyMap[activeTab]] === true,
  );

  if (loading) {
    return (
      <div className="min-h-[300px] sm:min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <section className="w-full bg-stone-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="uppercase tracking-[3px] sm:tracking-[4px] text-emerald-700 text-[11px] sm:text-xs font-bold mb-2 sm:mb-3">
            Discover Adventures
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 px-2">
            Explore Our Collections
          </h2>

          <p className="text-sm sm:text-base text-gray-500 mt-3 sm:mt-4 max-w-2xl mx-auto px-2">
            Handpicked Himalayan journeys crafted for unforgettable memories.
          </p>
        </motion.div>

        {/* Tabs: horizontally scrollable on mobile, wraps + centers on larger screens */}
        <div className="mb-10 sm:mb-14 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible no-scrollbar pb-2 sm:pb-0">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`flex-shrink-0 flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-emerald-700 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-200"
                }`}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7"
          >
            {activePackages.length > 0 ? (
              activePackages.map((pkg) => {
                const bannerImage = resolveImage(pkg.heroImage?.url);

                return (
                  <motion.div
                    key={pkg._id || pkg.id}
                    variants={cardVariant}
                    whileHover={scaleHover.whileHover}
                  >
                    <Link
                      to={`/feature/${pkg._id || pkg.id}`}
                      className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 block"
                    >
                      <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                        <img
                          src={bannerImage}
                          alt={pkg.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/90 px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold text-emerald-700">
                          {pkg.difficulty || "Moderate"}
                        </div>

                        <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5">
                          <h3 className="text-white text-lg sm:text-xl font-bold line-clamp-2">
                            {pkg.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {pkg.duration || "N/A"} Days
                        </div>

                        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                          <div>
                            <p className="text-[10px] sm:text-xs text-gray-400 uppercase">
                              Starting From
                            </p>
                            <h4 className="text-xl sm:text-2xl font-black text-gray-900">
                              ${pkg.price?.toLocaleString() || "0"}
                            </h4>
                          </div>

                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-700 transition-all flex-shrink-0"
                          >
                            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 group-hover:text-white" />
                          </motion.div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-14 sm:py-20">
                <Mountain className="w-12 h-12 sm:w-14 sm:h-14 mx-auto text-gray-300 mb-4 sm:mb-5" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
                  No Packages Found
                </h3>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Everest;