import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { Calendar, CheckCircle2, Award } from "lucide-react";

const categoryConfig = {
  standard: { label: "Standard", color: "bg-blue-500" },
  budget: { label: "Budget", color: "bg-amber-500" },
  luxury: { label: "Luxury", color: "bg-purple-600" },
  comfort: { label: "Comfort", color: "bg-emerald-600" },
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
        setTreks(data);
      } catch (err) {
        console.error("Error fetching treks:", err);
        setError("डेटा लोड गर्न सकिएन। कृपया फेरि प्रयास गर्नुहोला।");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTreks();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-sm font-bold tracking-widest uppercase text-slate-400">
        Data Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center font-bold text-red-500">{error}</div>
    );
  }

  const dynamicCountry = treks[0]?.country || "Everest Base Camp";

  return (
    <section className="py-16 px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">
            Popular {dynamicCountry} Options
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Explore our most popular {dynamicCountry} packages and choose one
            that matches your pace, comfort, and adventure goals.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        {treks.length === 0 ? (
          <p className="text-center text-gray-400 font-medium">
            कुनै पनि ट्रिपहरू भेटिएनन्।
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treks.map((trek) => {
              const currentId = trek._id || trek.id;
              const config = categoryConfig[trek.categoryType] || categoryConfig.standard;
              const features = trek.highlights?.slice(0, 3) || [];

              const tripImage =
                trek.featuredImage?.url ||
                trek.featuredImage ||
                trek.heroImage?.url ||
                "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80";

              return (
                <Link
                  to={`/feature/${currentId}`}
                  key={currentId}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative h-60 w-full overflow-hidden shrink-0 bg-gray-100">
                    <img
                      src={tripImage}
                      alt={trek.title || "Trip Image"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80";
                      }}
                    />

                  
                    <div
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-[11px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-xs ${config.color}`}
                    >
                      <CheckCircle2 size={12} />
                      {config.label}
                    </div>

                  
                    {trek.isBestSeller2026 && (
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs p-2 rounded-xl shadow-md flex items-center gap-2 border border-gray-100">
                        <Award className="text-amber-500 shrink-0" size={18} />
                        <div className="leading-none">
                          <p className="text-[9px] text-gray-400 uppercase font-extrabold tracking-wider">
                            Travelers' Choice
                          </p>
                          <p className="text-[11px] font-black text-gray-900 mt-0.5">Best of the Best</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-gray-500 mb-2.5">
                        <Calendar size={15} className="text-gray-400" />
                        <span className="text-xs font-bold tracking-wide">
                          {trek.duration || "N/A"} Days
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-amber-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                        {trek.title || "Untitled Expedition"}
                      </h3>

                      <p className="text-gray-900 font-black text-lg mb-4">
                        <span className="text-xs text-gray-400 font-normal block tracking-wide">From</span>
                        USD {trek.price ? trek.price.toLocaleString() : "0"}
                      </p>

                      <hr className="mb-4 border-gray-100" />
                    </div>

                    {/* Features Bullet List */}
                    <ul className="space-y-2 mt-auto">
                      {features.length > 0 ? (
                        features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-gray-600 text-xs font-medium line-clamp-1"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                            <span className="truncate">
                              {typeof feature === "string" ? feature : feature.text || ""}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-400 text-xs italic">
                          No special highlights listed
                        </li>
                      )}
                    </ul>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularTreks;
