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
    <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 overflow-hidden">
      <style>{`
.popular-slider {
  padding-bottom: 60px !important;
  overflow: visible !important;
}

@media (min-width: 640px) {
  .popular-slider {
    padding-bottom: 70px !important;
  }
}

.popular-slider .swiper-slide {
  height: auto;
}

.popular-slider .swiper-button-prev,
.popular-slider .swiper-button-next {
  display: none;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .popular-slider .swiper-button-prev,
  .popular-slider .swiper-button-next {
    display: flex;
    width: 52px;
    height: 52px;
  }
}

.popular-slider .swiper-button-prev:hover,
.popular-slider .swiper-button-next:hover {
  background: #111827;
  color: #fff;
}

.popular-slider .swiper-button-prev:after,
.popular-slider .swiper-button-next:after {
  font-size: 18px;
}

@media (min-width: 768px) {
  .popular-slider .swiper-button-prev:after,
  .popular-slider .swiper-button-next:after {
    font-size: 20px;
  }
}

.popular-slider .swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background: rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.popular-slider .swiper-pagination-bullet-active {
  width: 22px;
  border-radius: 999px;
  background: #111827;
}

.pt-card {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.pt-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.12);
}

.pt-img {
  transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.pt-card:hover .pt-img {
  transform: scale(1.1);
}
`}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-14 gap-4 sm:gap-5">
          <div>
            <p className="text-[10px] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-emerald-600 font-bold mb-2 sm:mb-3 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> Kingdom of Bhutan
            </p>
            <h2 className="text-[26px] sm:text-[30px] md:text-[40px] font-black text-gray-950 tracking-tight leading-none">
              Popular Bhutan Treks
            </h2>
          </div>
        </div>

        {treks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 border border-dashed border-gray-200 rounded-3xl px-4 text-center">
            <p className="text-[13px] text-gray-400">No Bhutan trips found.</p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
            breakpoints={{
              480: { slidesPerView: 1.15, spaceBetween: 20 },
              640: { slidesPerView: 1.6, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
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
                <SwiperSlide key={trek._id || trek.id} className="h-auto">
                  <Link
                    to={`/feature/${trek._id || trek.id}`}
                    className="pt-card group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 block h-full"
                  >
                    <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-gray-100">
                      <img
                        src={tripImage}
                        alt={trek.title}
                        loading="lazy"
                        className="pt-img w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                      />
                      <div
                        className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase"
                        style={{ background: config.bg, color: config.text }}
                      >
                        {config.label}
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 lg:p-6">
                      <h3 className="text-[16px] sm:text-[18px] font-bold text-gray-900 mb-2 line-clamp-2">
                        {trek.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-3 sm:mt-4">
                        <span
                          className="text-[9px] sm:text-[10px] uppercase font-bold px-2 py-1 rounded"
                          style={diffStyle}
                        >
                          {trek.difficulty}
                        </span>
                      </div>
                      <p className="text-[18px] sm:text-[20px] font-black mt-3 sm:mt-4">
                        USD {trek.price?.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default PopularBhutan;