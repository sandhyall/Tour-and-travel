import React from "react";
import { Search, Users, Star, DollarSign, Leaf } from "lucide-react";
import video from "../assets/video1.mp4";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
    
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div> 
      </div>

    
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <span className="mb-4 inline-block rounded-full border border-white/30 px-6 py-2 text-sm font-medium tracking-widest uppercase backdrop-blur-sm">
          Wales Trek and Travel
        </span>
        
        <h1 className="mb-6 text-2xl font-bold leading-tight md:text-7xl">
          Discover the Majesty of <br />
          <span className="text-emerald-400">The Himalayas</span>
        </h1>

        <p className="mb-10 text-lg md:text-xl text-gray-200 max-w-2xl">
          Experience authentic adventures, sustainable journeys, and professional guidance.
        </p>

       
        <div className="relative w-full max-w-2xl group">
          <input
            type="text"
            placeholder="Where do you want to go?"
            className="w-full rounded-full py-5 pl-8 pr-16 text-lg text-gray-900 outline-none shadow-2xl focus:ring-4 focus:ring-emerald-500/50 transition-all duration-300"
          />
          <button className="absolute right-2 top-2 bottom-2 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition-colors">
            <Search size={24} />
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="absolute bottom-0 z-10 w-full bg-white/10 backdrop-blur-md py-8 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-around gap-8 text-white px-6">
          {[
            { icon: Users, title: "19 Years+", desc: "Experience" },
            { icon: Star, title: "3350+", desc: "Reviews" },
            { icon: DollarSign, title: "Best Price", desc: "Guaranteed" },
            { icon: Leaf, title: "Eco Friendly", desc: "Travel" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <item.icon size={32} className="text-emerald-400" />
              <div>
                <p className="font-bold text-lg">{item.title}</p>
                <p className="text-xs uppercase tracking-wider opacity-80">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;