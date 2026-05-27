import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../src/api/axios";
import { Calendar, Award, ArrowUpRight, Loader2, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const categoryConfig = {
  standard: {
    label: "Standard",
    bg: "#EFF6FF",
    text: "#1D4ED8",
    dot: "#3B82F6",
  },
  budget: { label: "Budget", bg: "#FFFBEB", text: "#B45309", dot: "#F59E0B" },
  luxury: { label: "Luxury", bg: "#F5F3FF", text: "#6D28D9", dot: "#8B5CF6" },
  comfort: { label: "Comfort", bg: "#ECFDF5", text: "#065F46", dot: "#10B981" },
};

const difficultyStyle = {
  Easy: { background: "#ECFDF5", color: "#059669" },
  Moderate: { background: "#FFF7ED", color: "#EA580C" },
  Hard: { background: "#FEF2F2", color: "#DC2626" },
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80";

const PopularBhutan = () => {
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBhutanTrips = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/trips");
        const allTrips = Array.isArray(data) ? data : data.trips || [];

        const bhutanTrips = allTrips.filter(
          (t) => t.country?.toLowerCase() === "bhutan",
        );
        setTreks(bhutanTrips);
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBhutanTrips();
  }, []);

  if (loading) return null;

  return (
    <section className="bg-white py-20 px-5 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-5">
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-emerald-600 font-bold mb-3 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> Kingdom of Bhutan
            </p>
            <h2 className="text-[30px] md:text-[40px] font-black text-gray-950 tracking-tight leading-none">
              Popular Bhutan Treks
            </h2>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="popular-slider"
        >
          {treks.map((trek) => {
            const tripImage =
              trek.featuredImage?.url ||
              trek.featuredImage ||
              trek.heroImage?.url ||
              FALLBACK_IMAGE;
            const config =
              categoryConfig[trek.categoryType] ?? categoryConfig.standard;
            const diffStyle =
              difficultyStyle[trek.difficulty] ?? difficultyStyle.Hard;

            return (
              <SwiperSlide key={trek._id || trek.id}>
                <Link
                  to={`/feature/${trek._id || trek.id}`}
                  className="pt-card group bg-white rounded-3xl overflow-hidden border border-gray-100 block h-full"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={tripImage}
                      alt={trek.title}
                      className="pt-img w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />
                    <div
                      className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase"
                      style={{ background: config.bg, color: config.text }}
                    >
                      {config.label}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[18px] font-bold text-gray-900 mb-2">
                      {trek.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-4">
                      <span
                        className="text-[10px] uppercase font-bold px-2 py-1 rounded"
                        style={diffStyle}
                      >
                        {trek.difficulty}
                      </span>
                    </div>
                    <p className="text-[20px] font-black mt-4">
                      USD {trek.price?.toLocaleString()}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularBhutan;
