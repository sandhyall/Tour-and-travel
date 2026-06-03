import React from "react";
import { Search, Users, Star, DollarSign, Leaf } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import video from "../assets/video1.mp4";

export default function Hero() {
  const { scrollY } = useScroll();

  // subtle parallax effects
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <motion.section
      style={{ opacity }}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 🎥 Background Video with slow zoom */}
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

      {/* 🌟 Content */}
      <motion.div
        style={{ y }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white"
      >
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: -30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="mb-4 inline-block rounded-full border border-white/30 px-6 py-2 text-sm tracking-widest uppercase backdrop-blur-md"
        >
          Wales Trek and Travel
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 text-3xl md:text-7xl font-bold leading-tight"
        >
          Discover the Majesty of <br />
          <span className="text-emerald-400">
            The Himalayas
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-10 text-lg md:text-xl text-gray-200 max-w-2xl"
        >
          Experience authentic adventures, sustainable journeys,
          and professional guidance.
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-full max-w-2xl group"
        >
          <input
            type="text"
            placeholder="Where do you want to go?"
            className="w-full rounded-full py-5 pl-8 pr-16 text-lg text-gray-900 outline-none shadow-2xl focus:ring-4 focus:ring-emerald-500/50 transition-all duration-300"
          />

          <button className="absolute right-2 top-2 bottom-2 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-105">
            <Search size={24} />
          </button>
        </motion.div>
      </motion.div>

      {/* 📊 Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-0 z-10 w-full bg-white/10 backdrop-blur-md py-8 border-t border-white/10"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-around gap-8 text-white px-6">
          {[
            { icon: Users, title: "19 Years+", desc: "Experience" },
            { icon: Star, title: "3350+", desc: "Reviews" },
            { icon: DollarSign, title: "Best Price", desc: "Guaranteed" },
            { icon: Leaf, title: "Eco Friendly", desc: "Travel" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              className="flex items-center gap-4"
            >
              <item.icon size={32} className="text-emerald-400" />
              <div>
                <p className="font-bold text-lg">{item.title}</p>
                <p className="text-xs uppercase tracking-wider opacity-80">
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