// import React, { useState, useRef, useEffect } from "react";
// import axios from "../../api/axios";
// import {
//   Calendar,
//   ChevronRight,
//   Flame,
//   Gem,
//   Mountain,
//   Map,
//   MapPin,
//   Loader2,
// } from "lucide-react";

// const Everest = () => {
//   const [allTrips, setAllTrips] = useState([]);
//   const [activeTab, setActiveTab] = useState("best-sellers");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const scrollRef = useRef(null);

//   const tabs = [
//     {
//       id: "best-sellers",
//       label: "Best Sellers 2026",
//       icon: <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />,
//     },
//     {
//       id: "luxury",
//       label: "Luxury VIP Tours",
//       icon: <Gem className="w-4 h-4 text-blue-500" />,
//     },
//     {
//       id: "peak-climbing",
//       label: "Peak Climbing",
//       icon: <Mountain className="w-4 h-4 text-gray-600" />,
//     },
//     {
//       id: "short-treks",
//       label: "Short Treks",
//       icon: <Map className="w-4 h-4 text-green-600" />,
//     },
//     {
//       id: "bhutan-tours",
//       label: "Bhutan Tours",
//       icon: <MapPin className="w-4 h-4 text-red-500" />,
//     },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await axios.get("/trips");

//         const tripsArray = Array.isArray(response.data)
//           ? response.data
//           : response.data.trips || [];

//         console.log(" Trips Array:", tripsArray);
//         setAllTrips(tripsArray);
//       } catch (err) {
//         console.error("Error fetching trips:", err);
//         setError(err.response?.data?.message || "Data Loading ....");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const getActivePackages = () => {
//     if (!Array.isArray(allTrips) || allTrips.length === 0) return [];

//     return allTrips.filter((pkg) => {
//       switch (activeTab) {
//         case "best-sellers":
//           return pkg.isBestSeller2026 === true;
//         case "luxury":
//           return pkg.isLuxuryVIP === true;
//         case "peak-climbing":
//           return pkg.isPeakClimbing === true;
//         case "short-treks":
//           return pkg.isShortTrek === true;
//         case "bhutan-tours":
//           return pkg.isBhutanTour === true;
//         default:
//           return false;
//       }
//     });
//   };

//   const scrollRight = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: 310, behavior: "smooth" });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center bg-white">
//         <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-12 text-red-500 text-center font-medium">{error}</div>
//     );
//   }

//   const activePackages = getActivePackages();

//   return (
//     <div className="w-full bg-white px-4 md:px-16 py-8 font-sans">
//       <div className="max-w-[1400px] mx-auto">
//         <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar mb-8 gap-x-8 whitespace-nowrap">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 pb-3 px-1 transition-all relative ${
//                 activeTab === tab.id
//                   ? "text-black font-bold border-b-2 border-black"
//                   : "text-gray-400 hover:text-gray-700"
//               }`}
//             >
//               {tab.icon}
//               <span className="text-[14px] tracking-wide">{tab.label}</span>
//             </button>
//           ))}
//         </div>

//         <div className="relative group">
//           {activePackages.length === 0 ? (
//             <div className="text-center py-12 text-gray-400 text-sm border border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
//               <br />
//               <span className="text-[11px] text-gray-300">
//                 Total Trips in DB: {allTrips.length}
//               </span>
//             </div>
//           ) : (
//             <div
//               ref={scrollRef}
//               className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-6"
//             >
//               {activePackages.map((pkg) => {
//                 const imgUrl =
//                   pkg.featuredImage?.url ||
//                   pkg.featuredImage ||
//                   (Array.isArray(pkg.gallery) && pkg.gallery[0]?.url) ||
//                   (Array.isArray(pkg.gallery) && pkg.gallery[0]) ||
//                   "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600";

//                 return (
//                   <div
//                     key={pkg._id || pkg.id}
//                     className="min-w-[290px] max-w-[290px] bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300"
//                   >
//                     <Link
//                     to={`/feature/${tripId}`}
//                     key={tripId}
//                     className="min-w-[290px] max-w-[290px] bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
//                   >
//                     <div className="h-[180px] w-full relative bg-gray-50">
//                       <img
//                         src={imgUrl}
//                         alt={pkg.title}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.src =
//                             "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600";
//                         }}
//                       />

//                       {activeTab === "best-sellers" &&
//                         pkg.oldPrice > pkg.price && (
//                           <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 shadow-sm border border-gray-100/50">
//                             <div className="bg-orange-500 p-0.5 rounded text-[8px]">
//                               <Flame className="w-2.5 h-2.5 text-white fill-white" />
//                             </div>
//                             <div className="flex flex-col leading-tight">
//                               <span className="text-[7px] text-gray-400 uppercase tracking-tighter font-semibold">
//                                 Special Offer
//                               </span>
//                               <span className="text-orange-600 text-[9px]">
//                                 Best Deal
//                               </span>
//                             </div>
//                           </div>
//                         )}
//                     </div>

//                     <div className="p-5 flex-grow flex flex-col justify-between min-h-[190px]">
//                       <div>
//                         <div className="flex items-center gap-1.5 text-gray-400 text-[12px] mb-2">
//                           <Calendar className="w-3.5 h-3.5 text-gray-400" />
//                           <span>
//                             {pkg.duration ? `${pkg.duration} Days` : "N/A"}
//                           </span>
//                         </div>

//                         <h3 className="font-bold text-[15px] text-gray-900 leading-snug line-clamp-2">
//                           {pkg.title}
//                         </h3>
//                       </div>

//                       <div className="mt-4">
//                         {pkg.oldPrice > 0 && (
//                           <span className="text-gray-400 text-[11px] line-through block -mb-1">
//                             USD {pkg.oldPrice}
//                           </span>
//                         )}
//                         <span className="text-gray-400 text-[11px] font-medium inline-block mr-1">
//                           from
//                         </span>
//                         <div className="text-[18px] font-black text-gray-950 tracking-tight inline-block">
//                           USD {pkg.price}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {activePackages.length > 0 && (
//             <button
//               onClick={scrollRight}
//               className="absolute right-[-18px] top-[45%] -translate-y-1/2 bg-white rounded-full p-2.5 shadow-lg border border-gray-100 z-10 hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center"
//             >
//               <ChevronRight className="w-5 h-5 text-black" strokeWidth={2.5} />
//             </button>
//           )}
//         </div>
//       </div>

//       <style>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// };

// export default Everest;

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom"; // 🎯 रूटिङका लागि थपियो
import axios from "../../api/axios";
import {
  Calendar,
  ChevronRight,
  Flame,
  Gem,
  Mountain,
  Map,
  MapPin,
  Loader2,
} from "lucide-react";

const Everest = () => {
  const [allTrips, setAllTrips] = useState([]);
  const [activeTab, setActiveTab] = useState("best-sellers");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);

  const tabs = [
    {
      id: "best-sellers",
      label: "Best Sellers 2026",
      icon: <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />,
    },
    {
      id: "luxury",
      label: "Luxury VIP Tours",
      icon: <Gem className="w-4 h-4 text-blue-500" />,
    },
    {
      id: "peak-climbing",
      label: "Peak Climbing",
      icon: <Mountain className="w-4 h-4 text-gray-600" />,
    },
    {
      id: "short-treks",
      label: "Short Treks",
      icon: <Map className="w-4 h-4 text-green-600" />,
    },
    {
      id: "bhutan-tours",
      label: "Bhutan Tours",
      icon: <MapPin className="w-4 h-4 text-red-500" />,
    },
  ];

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
        console.error("Error fetching trips:", err);
        setError(err.response?.data?.message || "Data Loading Error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getActivePackages = () => {
    if (!Array.isArray(allTrips) || allTrips.length === 0) return [];

    return allTrips.filter((pkg) => {
      switch (activeTab) {
        case "best-sellers":
          return pkg.isBestSeller2026 === true;
        case "luxury":
          return pkg.isLuxuryVIP === true;
        case "peak-climbing":
          return pkg.isPeakClimbing === true;
        case "short-treks":
          return pkg.isShortTrek === true;
        case "bhutan-tours":
          return pkg.isBhutanTour === true;
        default:
          return false;
      }
    });
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 310, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 text-red-500 text-center font-medium">{error}</div>
    );
  }

  const activePackages = getActivePackages();

  return (
    <div className="w-full bg-white px-4 md:px-16 py-8 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar mb-8 gap-x-8 whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3 px-1 transition-all relative ${
                activeTab === tab.id
                  ? "text-black font-bold border-b-2 border-black"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {tab.icon}
              <span className="text-[14px] tracking-wide">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="relative group">
          {activePackages.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm border border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
              <span className="text-[11px] text-gray-300">
                Total Trips in DB: {allTrips.length}
              </span>
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-6"
            >
              {activePackages.map((pkg) => {
                const imgUrl =
                  pkg.featuredImage?.url ||
                  pkg.featuredImage ||
                  (Array.isArray(pkg.gallery) && pkg.gallery[0]?.url) ||
                  (Array.isArray(pkg.gallery) && pkg.gallery[0]) ||
                  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600";

                const tripId = pkg._id || pkg.id;

                return (
                
                  <Link
                    to={`/feature/${tripId}`}
                    key={tripId}
                    className="min-w-[290px] max-w-[290px] bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <div className="h-[180px] w-full relative bg-gray-50">
                      <img
                        src={imgUrl}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600";
                        }}
                      />

                      {activeTab === "best-sellers" &&
                        pkg.oldPrice > pkg.price && (
                          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 shadow-sm border border-gray-100/50">
                            <div className="bg-orange-500 p-0.5 rounded text-[8px]">
                              <Flame className="w-2.5 h-2.5 text-white fill-white" />
                            </div>
                            <div className="flex flex-col leading-tight">
                              <span className="text-[7px] text-gray-400 uppercase tracking-tighter font-semibold">
                                Special Offer
                              </span>
                              <span className="text-orange-600 text-[9px]">
                                Best Deal
                              </span>
                            </div>
                          </div>
                        )}
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between min-h-[190px]">
                      <div>
                        <div className="flex items-center gap-1.5 text-gray-400 text-[12px] mb-2">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>
                            {pkg.duration ? `${pkg.duration} Days` : "N/A"}
                          </span>
                        </div>

                        <h3 className="font-bold text-[15px] text-gray-900 leading-snug line-clamp-2">
                          {pkg.title}
                        </h3>
                      </div>

                      <div className="mt-4">
                        {pkg.oldPrice > 0 && (
                          <span className="text-gray-400 text-[11px] line-through block -mb-1">
                            USD {pkg.oldPrice}
                          </span>
                        )}
                        <span className="text-gray-400 text-[11px] font-medium inline-block mr-1">
                          from
                        </span>
                        <div className="text-[18px] font-black text-gray-950 tracking-tight inline-block">
                          USD {pkg.price}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {activePackages.length > 0 && (
            <button
              onClick={scrollRight}
              className="absolute right-[-18px] top-[45%] -translate-y-1/2 bg-white rounded-full p-2.5 shadow-lg border border-gray-100 z-10 hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-black" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Everest;