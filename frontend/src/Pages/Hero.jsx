import React from "react";
import { Search, Users, Star, DollarSign, Leaf } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import video from "../assets/video1.mp4";

export default function Hero() {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <motion.section
      style={{ opacity }}
      className="relative h-screen w-full overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <motion.div
        style={{ y }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 text-center text-white"
      >
        <motion.span
          initial={{ opacity: 0, y: -30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="mb-3 sm:mb-4 inline-block rounded-full border border-white/30 px-4 sm:px-6 py-1.5 sm:py-2 text-[11px] sm:text-sm tracking-widest uppercase backdrop-blur-md"
        >
          Wales Trek and Travel
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
        >
          Discover the Majesty of <br />
          <span className="text-emerald-400">The Himalayas</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-7 sm:mb-10 text-sm sm:text-lg md:text-xl text-gray-200 max-w-xs sm:max-w-xl md:max-w-2xl"
        >
          Experience authentic adventures, sustainable journeys, and
          professional guidance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-full max-w-xs sm:max-w-lg md:max-w-2xl group"
        >
          <input
            type="text"
            placeholder="Where do you want to go?"
            className="w-full rounded-full py-3.5 sm:py-5 pl-5 sm:pl-8 pr-14 sm:pr-16 text-sm sm:text-lg text-gray-900 outline-none shadow-2xl focus:ring-4 focus:ring-emerald-500/50 transition-all duration-300"
          />

          <button className="absolute right-1.5 sm:right-2 top-1.5 sm:top-2 bottom-1.5 sm:bottom-2 bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 sm:p-3 rounded-full transition-all duration-300 hover:scale-105">
            <Search size={18} className="sm:hidden" />
            <Search size={24} className="hidden sm:block" />
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-0 z-10 w-full bg-white/10 backdrop-blur-md py-5 sm:py-8 border-t border-white/10"
      >
        <div className="mx-auto grid grid-cols-2 sm:flex sm:flex-wrap max-w-6xl items-center justify-around gap-x-4 gap-y-5 sm:gap-8 text-white px-5 sm:px-6">
          {[
            { icon: Users, title: "19 Years+", desc: "Experience" },
            { icon: Star, title: "3350+", desc: "Reviews" },
            { icon: DollarSign, title: "Best Price", desc: "Guaranteed" },
            { icon: Leaf, title: "Eco Friendly", desc: "Travel" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              className="flex items-center gap-2.5 sm:gap-4 justify-center sm:justify-start"
            >
              <item.icon
                size={24}
                className="text-emerald-400 sm:hidden shrink-0"
              />
              <item.icon
                size={32}
                className="text-emerald-400 hidden sm:block shrink-0"
              />
              <div>
                <p className="font-bold text-sm sm:text-lg whitespace-nowrap">
                  {item.title}
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider opacity-80 whitespace-nowrap">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
