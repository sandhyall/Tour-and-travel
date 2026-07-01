// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "../../api/axios";
// import { Calendar, Award, ArrowUpRight, Loader2, MapPin } from "lucide-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const categoryConfig = {
//   standard: { label: "Standard", bg: "#EFF6FF", text: "#1D4ED8", dot: "#3B82F6" },
//   budget:   { label: "Budget",   bg: "#FFFBEB", text: "#B45309", dot: "#F59E0B" },
//   luxury:   { label: "Luxury",   bg: "#F5F3FF", text: "#6D28D9", dot: "#8B5CF6" },
//   comfort:  { label: "Comfort",  bg: "#ECFDF5", text: "#065F46", dot: "#10B981" },
// };

// const difficultyStyle = {
//   Easy:     { background: "#ECFDF5", color: "#059669" },
//   Moderate: { background: "#FFF7ED", color: "#EA580C" },
//   Hard:     { background: "#FEF2F2", color: "#DC2626" },
// };

// const FALLBACK_IMAGE =
//   "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80";

// const PopularTreks = () => {
//   const [treks, setTreks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPopularTreks = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get("/trips");
//         setTreks(Array.isArray(data) ? data : data.trips || []);
//       } catch {
//         setError("Failed to load trips. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPopularTreks();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-[260px] sm:min-h-[340px] flex flex-col items-center justify-center gap-3 bg-white">
//         <Loader2 className="w-7 h-7 animate-spin text-gray-300" />
//         <span className="text-[10px] tracking-[0.2em] uppercase text-gray-300 font-semibold">
//           Loading Expeditions
//         </span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-[220px] sm:min-h-[260px] flex items-center justify-center bg-white px-4">
//         <div className="text-center">
//           <p className="text-[13px] text-gray-400 mb-3">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="text-[11px] tracking-[0.12em] uppercase text-gray-500 border border-gray-200 px-4 py-2 hover:bg-gray-50 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 overflow-hidden">
//       <style>{`
// /* =========================
//    PREMIUM DESIGN SYSTEM
// ========================= */

// .pt-card {
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   background: #ffffff;
//   border: 1px solid rgba(0,0,0,0.06);
//   border-radius: 22px;
//   overflow: hidden;
//   transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
//   will-change: transform;
//   position: relative;
// }

// .pt-card::before {
//   content: "";
//   position: absolute;
//   inset: 0;
//   background: radial-gradient(circle at top, rgba(0,0,0,0.04), transparent 60%);
//   opacity: 0;
//   transition: opacity 0.4s ease;
//   pointer-events: none;
// }

// .pt-card:hover {
//   transform: translateY(-10px);
//   box-shadow: 0 30px 60px rgba(0,0,0,0.12);
// }

// .pt-card:hover::before {
//   opacity: 1;
// }

// /* IMAGE ZOOM (premium cinematic feel) */
// .pt-img {
//   transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
// }

// .pt-card:hover .pt-img {
//   transform: scale(1.12);
// }

// /* TITLE PREMIUM SHIFT */
// .pt-title {
//   transition: all 0.3s ease;
//   letter-spacing: -0.02em;
// }

// .pt-card:hover .pt-title {
//   color: #111827;
// }

// /* BOOK BUTTON PREMIUM */
// .pt-book-btn {
//   background: #fff;
//   border: 1px solid rgba(0,0,0,0.1);
//   transition: all 0.3s ease;
//   position: relative;
//   overflow: hidden;
// }

// .pt-book-btn::after {
//   content: "";
//   position: absolute;
//   inset: 0;
//   background: linear-gradient(120deg, transparent, rgba(0,0,0,0.08), transparent);
//   transform: translateX(-100%);
// }

// .pt-card:hover .pt-book-btn {
//   background: #111827;
//   color: white;
//   border-color: #111827;
// }

// .pt-card:hover .pt-book-btn::after {
//   animation: shine 1.2s ease;
// }

// @keyframes shine {
//   100% { transform: translateX(100%); }
// }

// /* ARROW FLOAT */
// .pt-arrow {
//   opacity: 0;
//   transform: translateY(10px);
//   transition: all 0.3s ease;
// }

// .pt-card:hover .pt-arrow {
//   opacity: 1;
//   transform: translateY(0);
// }

// /* BADGES (premium glass style) */
// .badge-glass {
//   backdrop-filter: blur(10px);
//   background: rgba(255,255,255,0.85);
//   border: 1px solid rgba(255,255,255,0.4);
// }

// /* SWIPER PREMIUM */
// .popular-slider {
//   padding-bottom: 60px !important;
//   overflow: visible !important;
// }

// @media (min-width: 640px) {
//   .popular-slider {
//     padding-bottom: 70px !important;
//   }
// }

// .popular-slider .swiper-slide {
//   transition: transform 0.4s ease;
//   height: auto;
// }

// .popular-slider .swiper-slide-active {
//   transform: scale(1.03);
// }

// /* NAV BUTTONS PREMIUM — hidden on small screens, shown from md up */
// .popular-slider .swiper-button-prev,
// .popular-slider .swiper-button-next {
//   display: none;
//   width: 44px;
//   height: 44px;
//   border-radius: 999px;
//   background: rgba(255,255,255,0.9);
//   backdrop-filter: blur(10px);
//   border: 1px solid rgba(0,0,0,0.08);
//   box-shadow: 0 10px 30px rgba(0,0,0,0.08);
//   transition: all 0.3s ease;
// }

// @media (min-width: 768px) {
//   .popular-slider .swiper-button-prev,
//   .popular-slider .swiper-button-next {
//     display: flex;
//     width: 52px;
//     height: 52px;
//   }
// }

// .popular-slider .swiper-button-prev:hover,
// .popular-slider .swiper-button-next:hover {
//   background: #111827;
//   color: #fff;
// }

// .popular-slider .swiper-button-prev:after,
// .popular-slider .swiper-button-next:after {
//   font-size: 18px;
// }

// @media (min-width: 768px) {
//   .popular-slider .swiper-button-prev:after,
//   .popular-slider .swiper-button-next:after {
//     font-size: 20px;
//   }
// }

// /* PAGINATION */
// .popular-slider .swiper-pagination-bullet {
//   width: 8px;
//   height: 8px;
//   background: rgba(0,0,0,0.2);
//   transition: all 0.3s ease;
// }

// .popular-slider .swiper-pagination-bullet-active {
//   width: 22px;
//   border-radius: 999px;
//   background: #111827;
// }

// /* SECTION HEADER */
// h2 {
//   letter-spacing: -0.03em;
// }

// /* SUBTEXT */
// p {
//   line-height: 1.6;
// }
// `}</style>

//       <div className="max-w-7xl mx-auto">
       
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-14 gap-4 sm:gap-5">
//           <div>
//             <p className="text-[10px] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-amber-600 font-bold mb-2 sm:mb-3 flex items-center gap-2">
//               <MapPin className="w-3.5 h-3.5" />
//               Curated Packages
//             </p>
//             <h2 className="text-[26px] sm:text-[30px] md:text-[40px] font-black text-gray-950 tracking-tight leading-none">
//               Popular Treks
//             </h2>
//           </div>
//           <p className="text-[13px] sm:text-[14px] text-gray-500 max-w-md leading-relaxed md:text-right">
//             Discover handpicked Himalayan adventures crafted for every type of traveler — from
//             luxury escapes to epic expeditions.
//           </p>
//         </div>

       
//         {treks.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-16 sm:py-20 border border-dashed border-gray-200 rounded-3xl px-4 text-center">
//             <p className="text-[13px] text-gray-400">No trips found.</p>
//           </div>
//         ) : (
//           <Swiper
//             modules={[Navigation, Pagination, Autoplay]}
//             spaceBetween={20}
//             slidesPerView={1}
//             navigation
//             pagination={{ clickable: true }}
//             autoplay={{ delay: 3500, disableOnInteraction: false }}
//             breakpoints={{
//               480:  { slidesPerView: 1.15, spaceBetween: 20 },
//               640:  { slidesPerView: 1.6, spaceBetween: 20 },
//               768:  { slidesPerView: 2, spaceBetween: 24 },
//               1024: { slidesPerView: 3, spaceBetween: 24 },
//               1400: { slidesPerView: 4, spaceBetween: 24 },
//             }}
//             className="popular-slider"
//           >
//             {treks.map((trek) => {
//               const currentId = trek._id || trek.id;
//               const config = categoryConfig[trek.categoryType] ?? categoryConfig.standard;
//               const features = trek.highlights?.slice(0, 3) ?? [];
//               const hasDiscount = trek.oldPrice > trek.price && trek.oldPrice > 0;
//               const discountPct = hasDiscount
//                 ? Math.round((1 - trek.price / trek.oldPrice) * 100)
//                 : 0;
//               const tripImage =
//                 trek.featuredImage?.url || trek.featuredImage || trek.heroImage?.url || FALLBACK_IMAGE;
//               const diffStyle = difficultyStyle[trek.difficulty] ?? difficultyStyle.Hard;

//               return (
//                 <SwiperSlide key={currentId} className="h-auto">
//                   <Link
//                     to={`/feature/${currentId}`}
//                     className="pt-card group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100"
//                   >
                   
//                     <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-gray-100 shrink-0">
//                       <img
//                         src={tripImage}
//                         alt={trek.title || "Trip"}
//                         loading="lazy"
//                         className="pt-img w-full h-full object-cover"
//                         onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
//                       />
                    
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                     
//                       <div
//                         className="badge-glass absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold"
//                         style={{ background: config.bg, color: config.text }}
//                       >
//                         <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: config.dot }} />
//                         {config.label}
//                       </div>

                     
//                       {hasDiscount && (
//                         <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-amber-500 text-white text-[9px] sm:text-[10px] font-bold tracking-wide px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-lg">
//                           {discountPct}% OFF
//                         </div>
//                       )}

                   
//                       {trek.isBestSeller2026 && (
//                         <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl shadow-lg flex items-center gap-2">
//                           <Award className="text-amber-500 shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                           <div className="leading-none">
//                             <p className="text-[7px] sm:text-[8px] text-gray-400 uppercase font-extrabold tracking-wider">
//                               Travelers' Choice
//                             </p>
//                             <p className="text-[10px] sm:text-[11px] font-black text-gray-900 mt-1">Best of 2026</p>
//                           </div>
//                         </div>
//                       )}

                     
//                       <div className="pt-arrow absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
//                         <ArrowUpRight className="w-4 h-4 text-gray-800" />
//                       </div>
//                     </div>

                   
//                     <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-grow">
                     
//                       <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
//                         <span className="flex items-center gap-1 text-[11px] text-gray-400">
//                           <Calendar className="w-3 h-3 shrink-0" />
//                           {trek.duration || "—"} Days
//                         </span>
//                         {trek.difficulty && (
//                           <>
//                             <span className="text-gray-200" aria-hidden>•</span>
//                             <span
//                               className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
//                               style={diffStyle}
//                             >
//                               {trek.difficulty}
//                             </span>
//                           </>
//                         )}
//                       </div>

                     
//                       <h3 className="pt-title text-[16px] sm:text-[18px] font-bold text-gray-900 leading-snug line-clamp-2 mb-4 sm:mb-5 min-h-[44px] sm:min-h-[56px]">
//                         {trek.title || "Untitled Expedition"}
//                       </h3>

                     
//                       {features.length > 0 && (
//                         <ul className="space-y-2 mb-5 sm:mb-6">
//                           {features.map((feature, i) => (
//                             <li key={i} className="flex items-start gap-2 text-[12px] sm:text-[13px] text-gray-500">
//                               <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
//                               <span className="truncate">
//                                 {typeof feature === "string" ? feature : feature.text || ""}
//                               </span>
//                             </li>
//                           ))}
//                         </ul>
//                       )}

//                       <div className="flex-grow" />

                      
//                       <div className="pt-4 sm:pt-5 border-t border-gray-100 mt-3">
//                         <div className="flex flex-wrap items-end justify-between gap-3">
//                           <div>
//                             {hasDiscount && (
//                               <span className="block text-[11px] text-gray-300 line-through mb-1">
//                                 USD {trek.oldPrice?.toLocaleString()}
//                               </span>
//                             )}
//                             <div className="flex items-end gap-1">
//                               <span className="text-[11px] text-gray-400 mb-1">from</span>
//                               <span className="text-[24px] sm:text-[28px] font-black text-gray-950 tracking-tight leading-none">
//                                 ${trek.price?.toLocaleString() || "0"}
//                               </span>
//                             </div>
//                           </div>
//                           <button className="pt-book-btn text-[10px] sm:text-[11px] font-bold tracking-wide uppercase border border-gray-200 text-gray-700 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl">
//                             Book Now
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </SwiperSlide>
//               );
//             })}
//           </Swiper>
//         )}


//         {treks.length > 0 && (
//           <div className="mt-10 sm:mt-14 flex justify-center">
//             <Link
//               to="/trips"
//               className="group flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold tracking-wide uppercase text-gray-700 border border-gray-200 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-gray-950 hover:text-white hover:border-gray-950 transition-all duration-300"
//             >
//               View All Expeditions
//               <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
//             </Link>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default PopularTreks;

import { useCallback, useEffect, useState } from "react";
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

// Pull a usable image URL out of whatever shape the API sends back.
// Only ever returns a string (or null), never an object, so <img src>
// can't end up rendering "[object Object]".
const resolveImage = (trek) => {
  if (typeof trek.featuredImage === "string") return trek.featuredImage;
  if (trek.featuredImage?.url) return trek.featuredImage.url;
  if (typeof trek.heroImage === "string") return trek.heroImage;
  if (trek.heroImage?.url) return trek.heroImage.url;
  return FALLBACK_IMAGE;
};

const PopularTreks = () => {
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPopularTreks = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError(null);

      // Ask the API for popular trips specifically. Some backends expose
      // a dedicated flag/sort/limit for this instead of just "/trips".
      const { data } = await axios.get("/trips", {
        params: { popular: true, limit: 8, sort: "-bookings" },
        signal,
      });

      const list = Array.isArray(data) ? data : data.trips || [];

      // Fallback: if the "popular" filter isn't supported server-side and
      // just returns everything unfiltered, at least try to sort client-side
      // by an isBestSeller2026 / bookings-style signal before trimming.
      const popularOnly = list.some((t) => t.isBestSeller2026 || t.isPopular)
        ? list.filter((t) => t.isBestSeller2026 || t.isPopular)
        : list;

      setTreks(popularOnly.slice(0, 8));
    } catch (err) {
      if (axios.isCancel?.(err) || err.name === "CanceledError") return;
      console.error("Failed to fetch popular treks:", err);
      setError("Failed to load trips. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchPopularTreks(controller.signal);
    return () => controller.abort();
  }, [fetchPopularTreks]);

  if (loading) {
    return (
      <div className="min-h-[260px] sm:min-h-[340px] flex flex-col items-center justify-center gap-3 bg-white">
        <Loader2 className="w-7 h-7 animate-spin text-gray-300" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-gray-300 font-semibold">
          Loading Expeditions
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[220px] sm:min-h-[260px] flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <p className="text-[13px] text-gray-400 mb-3">{error}</p>
          <button
            onClick={() => fetchPopularTreks()}
            className="text-[11px] tracking-[0.12em] uppercase text-gray-500 border border-gray-200 px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 overflow-hidden">
      <style>{`
/* =========================
   PREMIUM DESIGN SYSTEM
========================= */

.pt-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 22px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
  position: relative;
}

.pt-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top, rgba(0,0,0,0.04), transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.pt-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.12);
}

.pt-card:hover::before {
  opacity: 1;
}

/* IMAGE ZOOM (premium cinematic feel) */
.pt-img {
  transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.pt-card:hover .pt-img {
  transform: scale(1.12);
}

/* TITLE PREMIUM SHIFT */
.pt-title {
  transition: all 0.3s ease;
  letter-spacing: -0.02em;
}

.pt-card:hover .pt-title {
  color: #111827;
}

/* BOOK BUTTON PREMIUM */
.pt-book-btn {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.pt-book-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent, rgba(0,0,0,0.08), transparent);
  transform: translateX(-100%);
}

.pt-card:hover .pt-book-btn {
  background: #111827;
  color: white;
  border-color: #111827;
}

.pt-card:hover .pt-book-btn::after {
  animation: shine 1.2s ease;
}

@keyframes shine {
  100% { transform: translateX(100%); }
}

/* ARROW FLOAT */
.pt-arrow {
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.pt-card:hover .pt-arrow {
  opacity: 1;
  transform: translateY(0);
}

/* BADGES (premium glass style) */
.badge-glass {
  backdrop-filter: blur(10px);
  background: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.4);
}

/* SWIPER PREMIUM */
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
  transition: transform 0.4s ease;
  height: auto;
}

.popular-slider .swiper-slide-active {
  transform: scale(1.03);
}

/* NAV BUTTONS PREMIUM — hidden on small screens, shown from md up */
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

/* PAGINATION */
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

/* SECTION HEADER */
h2 {
  letter-spacing: -0.03em;
}

/* SUBTEXT */
p {
  line-height: 1.6;
}
`}</style>

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-14 gap-4 sm:gap-5">
          <div>
            <p className="text-[10px] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-amber-600 font-bold mb-2 sm:mb-3 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              Curated Packages
            </p>
            <h2 className="text-[26px] sm:text-[30px] md:text-[40px] font-black text-gray-950 tracking-tight leading-none">
              Popular Treks
            </h2>
          </div>
          <p className="text-[13px] sm:text-[14px] text-gray-500 max-w-md leading-relaxed md:text-right">
            Discover handpicked Himalayan adventures crafted for every type of traveler — from
            luxury escapes to epic expeditions.
          </p>
        </div>

        {treks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 border border-dashed border-gray-200 rounded-3xl px-4 text-center">
            <p className="text-[13px] text-gray-400">No trips found.</p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              480:  { slidesPerView: 1.15, spaceBetween: 20 },
              640:  { slidesPerView: 1.6, spaceBetween: 20 },
              768:  { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1400: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="popular-slider"
          >
            {treks.map((trek, index) => {
              // Fall back to index only if the API genuinely sends no id —
              // keeps React keys unique even with malformed data.
              const currentId = trek._id || trek.id || `trek-${index}`;
              const config = categoryConfig[trek.categoryType] ?? categoryConfig.standard;
              const features = trek.highlights?.slice(0, 3) ?? [];
              const hasDiscount = trek.oldPrice > trek.price && trek.oldPrice > 0;
              const discountPct = hasDiscount
                ? Math.round((1 - trek.price / trek.oldPrice) * 100)
                : 0;
              const tripImage = resolveImage(trek);
              const diffStyle = difficultyStyle[trek.difficulty] ?? difficultyStyle.Hard;

              return (
                <SwiperSlide key={currentId} className="h-auto">
                  <Link
                    to={`/feature/${currentId}`}
                    className="pt-card group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100"
                  >

                    <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-gray-100 shrink-0">
                      <img
                        src={tripImage}
                        alt={trek.title || "Trip"}
                        loading="lazy"
                        className="pt-img w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                      <div
                        className="badge-glass absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold"
                        style={{ background: config.bg, color: config.text }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: config.dot }} />
                        {config.label}
                      </div>

                      {hasDiscount && (
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-amber-500 text-white text-[9px] sm:text-[10px] font-bold tracking-wide px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-lg">
                          {discountPct}% OFF
                        </div>
                      )}

                      {trek.isBestSeller2026 && (
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl shadow-lg flex items-center gap-2">
                          <Award className="text-amber-500 shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <div className="leading-none">
                            <p className="text-[7px] sm:text-[8px] text-gray-400 uppercase font-extrabold tracking-wider">
                              Travelers' Choice
                            </p>
                            <p className="text-[10px] sm:text-[11px] font-black text-gray-900 mt-1">Best of 2026</p>
                          </div>
                        </div>
                      )}

                      <div className="pt-arrow absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                        <ArrowUpRight className="w-4 h-4 text-gray-800" />
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-grow">

                      <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
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

                      <h3 className="pt-title text-[16px] sm:text-[18px] font-bold text-gray-900 leading-snug line-clamp-2 mb-4 sm:mb-5 min-h-[44px] sm:min-h-[56px]">
                        {trek.title || "Untitled Expedition"}
                      </h3>

                      {features.length > 0 && (
                        <ul className="space-y-2 mb-5 sm:mb-6">
                          {features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-[12px] sm:text-[13px] text-gray-500">
                              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                              <span className="truncate">
                                {typeof feature === "string" ? feature : feature.text || ""}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex-grow" />

                      <div className="pt-4 sm:pt-5 border-t border-gray-100 mt-3">
                        <div className="flex flex-wrap items-end justify-between gap-3">
                          <div>
                            {hasDiscount && (
                              <span className="block text-[11px] text-gray-300 line-through mb-1">
                                USD {trek.oldPrice?.toLocaleString()}
                              </span>
                            )}
                            <div className="flex items-end gap-1">
                              <span className="text-[11px] text-gray-400 mb-1">from</span>
                              <span className="text-[24px] sm:text-[28px] font-black text-gray-950 tracking-tight leading-none">
                                ${trek.price?.toLocaleString() || "0"}
                              </span>
                            </div>
                          </div>
                          <button className="pt-book-btn text-[10px] sm:text-[11px] font-bold tracking-wide uppercase border border-gray-200 text-gray-700 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl">
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

        {treks.length > 0 && (
          <div className="mt-10 sm:mt-14 flex justify-center">
            <Link
              to="/trips"
              className="group flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold tracking-wide uppercase text-gray-700 border border-gray-200 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-gray-950 hover:text-white hover:border-gray-950 transition-all duration-300"
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