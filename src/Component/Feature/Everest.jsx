import React, { useState, useRef } from "react";
import {
  Calendar,
  ChevronRight,
  Flame,
  Gem,
  Mountain,
  Map,
  MapPin,
} from "lucide-react";

const Everest = () => {
  const [activeTab, setActiveTab] = useState("best-sellers");

  const scrollRef = useRef(null);

  const tabs = [
    {
      id: "best-sellers",
      label: "Best Sellers for 2026",
      icon: <Flame className="w-5 h-5 text-orange-500" />,
    },

    {
      id: "luxury",
      label: "Luxury & VIP Adventures",
      icon: <Gem className="w-5 h-5 text-blue-600" />,
    },

    {
      id: "peak-climbing",
      label: "Peak Climbing",
      icon: <Mountain className="w-5 h-5 text-gray-700" />,
    },

    {
      id: "short-treks",
      label: "Short Treks",
      icon: <Map className="w-5 h-5 text-green-600" />,
    },

    {
      id: "bhutan-tours",
      label: "Bhutan Tours",
      icon: <MapPin className="w-5 h-5 text-red-600" />,
    },
  ];

  const packages = {
    "best-sellers": [
      {
        id: 1,
        title: "Everest Base Camp Trek",
        days: "14 Days",
        price: "1,550",
        image:
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
        badge: "Best of the Best",
      },

      {
        id: 2,
        title: "Everest Base Camp Trek with Helicopter Return",
        days: "12 Days",
        price: "2,350",
        image:
          "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=600",
      },

      {
        id: 3,
        title: "Annapurna Base Camp Trek",
        days: "13 Days",
        price: "1,050",
        image:
          "https://images.unsplash.com/photo-1585016495481-91613a3ab1bc?auto=format&fit=crop&q=80&w=600",
      },

      {
        id: 4,
        title: "Annapurna Circuit Trek",
        days: "16 Days",
        price: "1,420",
        image:
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
      },
    ],

    luxury: [
      {
        id: 5,
        title: "Luxury Everest Base Camp Heli Trek",
        days: "11 Days",
        price: "4,500",
        image:
          "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&q=80&w=600",
        badge: "Premium",
      },

      {
        id: 6,
        title: "Luxury Annapurna Heritage Trek",
        days: "10 Days",
        price: "3,200",
        image:
          "https://images.unsplash.com/photo-1521334885634-9552f105e991?auto=format&fit=crop&q=80&w=600",
      },
    ],

    "peak-climbing": [
      {
        id: 7,
        title: "Island Peak Climbing",
        days: "18 Days",
        price: "2,800",
        image:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
      },

      {
        id: 8,
        title: "Mera Peak Climbing",
        days: "20 Days",
        price: "3,100",
        image:
          "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=600",
      },
    ],

    "short-treks": [
      {
        id: 9,
        title: "Ghorepani Poon Hill Trek",
        days: "5 Days",
        price: "550",
        image:
          "https://images.unsplash.com/photo-1585016495481-91613a3ab1bc?auto=format&fit=crop&q=80&w=600",
      },

      {
        id: 10,
        title: "Everest View Trek",
        days: "7 Days",
        price: "950",
        image:
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
      },
    ],

    "bhutan-tours": [
      {
        id: 11,
        title: "Glimpse of Bhutan",
        days: "4 Days",
        price: "1,200",
        image:
          "https://images.unsplash.com/photo-1578500484596-f04642131238?auto=format&fit=crop&q=80&w=600",
      },
    ],
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 350,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-12 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar mb-10 gap-x-10 whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-4 px-1 transition-all duration-300 relative
              
              ${
                activeTab === tab.id
                  ? "text-black font-bold"
                  : "text-gray-500 hover:text-black"
              }
              
              `}
            >
              {tab.icon}

              <span className="text-[15px]">{tab.label}</span>

              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-black rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-10"
          >
            {packages[activeTab].map((pkg) => (
              <div
                key={pkg.id}
                className="min-w-[300px] max-w-[300px] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 relative overflow-hidden group">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {pkg.badge && (
                    <div className="absolute bottom-3 left-3 bg-white px-2 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 shadow-md border border-gray-100">
                      <div className="bg-orange-500 p-0.5 rounded text-[8px]">
                        <Flame className="w-3 h-3 text-white" fill="white" />
                      </div>

                      <div className="flex flex-col leading-none">
                        <span className="text-[8px] text-gray-500 uppercase tracking-tighter">
                          Travelers' Choice
                        </span>

                        <span>{pkg.badge}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-[13px] mb-2 font-medium">
                      <Calendar className="w-4 h-4" />

                      <span>{pkg.days}</span>
                    </div>

                    <h3 className="font-bold text-[17px] text-gray-900 leading-snug mb-4">
                      {pkg.title}
                    </h3>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mt-auto">
                    <span className="text-gray-500 text-[12px] block mb-0.5 font-medium">
                      from
                    </span>

                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-extrabold text-gray-900">
                        USD {pkg.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-[-15px] top-[40%] -translate-y-1/2 bg-white rounded-full p-3 shadow-xl border border-gray-100 z-10 hover:bg-gray-100 transition-all hover:scale-110 hidden md:flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6 text-black" strokeWidth={3} />
          </button>
        </div>
      </div>

      <style>{`

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

      `}</style>
    </div>
  );
};

export default Everest;
