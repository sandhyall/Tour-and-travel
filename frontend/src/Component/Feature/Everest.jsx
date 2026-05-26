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

const FALLBACK_BANNER =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop";

const Everest = () => {
  const [allTrips, setAllTrips] = useState([]);
  const [activeTab, setActiveTab] = useState("best-sellers");
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: "best-sellers", label: "Best Sellers 2026", icon: <Flame className="w-4 h-4" /> },
    { id: "luxury", label: "Luxury VIP", icon: <Gem className="w-4 h-4" /> },
    { id: "peak-climbing", label: "Peak Climbing", icon: <Mountain className="w-4 h-4" /> },
    { id: "short-treks", label: "Short Treks", icon: <Map className="w-4 h-4" /> },
    { id: "bhutan-tours", label: "Bhutan Tours", icon: <MapPin className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get("/trips");

        setAllTrips(Array.isArray(data) ? data : data.trips || []);
      } catch (err) {
        console.error("Error fetching trips:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ FIXED IMAGE HANDLER (IMPORTANT)
  const resolveImage = (img) => {
    if (!img) return FALLBACK_BANNER;
    if (typeof img === "string") return img;
    if (img?.url) return img.url;
    return FALLBACK_BANNER;
  };

  // Tabs filter
  const getActivePackages = () => {
    const keyMap = {
      "best-sellers": "isBestSeller2026",
      luxury: "isLuxuryVIP",
      "peak-climbing": "isPeakClimbing",
      "short-treks": "isShortTrek",
      "bhutan-tours": "isBhutanTour",
    };

    return allTrips.filter((pkg) => pkg[keyMap[activeTab]] === true);
  };

  const activePackages = getActivePackages();

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <section className="w-full bg-stone-50 py-16">
      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="uppercase tracking-[4px] text-emerald-700 text-xs font-bold mb-3">
            Discover Adventures
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-gray-900">
            Explore Our Collections
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Handpicked Himalayan journeys crafted for unforgettable memories.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-emerald-700 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        {activePackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">

            {activePackages.map((pkg) => {
             
              const bannerImage = resolveImage(pkg.heroImage?.url);

              return (
                <Link
                  key={pkg._id || pkg.id}
                  to={`/feature/${pkg._id || pkg.id}`}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
                >

                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={bannerImage}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_BANNER;
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      {pkg.difficulty || "Moderate"}
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="text-white text-xl font-bold line-clamp-2">
                        {pkg.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Calendar className="w-4 h-4" />
                      {pkg.duration || "N/A"} Days
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">

                      <div>
                        <p className="text-xs text-gray-400 uppercase">
                          Starting From
                        </p>
                        <h4 className="text-2xl font-black text-gray-900">
                          ${pkg.price?.toLocaleString() || "0"}
                        </h4>
                      </div>

                      <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-700 transition-all">
                        <ArrowUpRight className="w-5 h-5 text-emerald-700 group-hover:text-white transition-all" />
                      </div>

                    </div>

                  </div>
                </Link>
              );
            })}

          </div>
        ) : (
          <div className="text-center py-20">
            <Mountain className="w-14 h-14 mx-auto text-gray-300 mb-5" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Packages Found
            </h3>
            <p className="text-gray-500">
              Currently, no expeditions are available in this category.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Everest;