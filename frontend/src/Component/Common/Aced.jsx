import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import photo from "../../assets/photo.webp";
import photo1 from "../../assets/photo1.webp";
import photo2 from "../../assets/photo2.webp";
import photo3 from "../../assets/photo3.webp";

const testimonials = [
  {
    id: 1,
    name: "Jason Ogasian",
    location: "Manaslu Circuit Trek",
    loadVideo: () => import("../../assets/video5.mp4"),
    thumbnail: photo,
  },
  {
    id: 2,
    name: "Simon & Group",
    location: "Annapurna Base Camp Trek",
    loadVideo: () => import("../../assets/video2.mp4"),
    thumbnail: photo1,
  },
  {
    id: 3,
    name: "Daroga Lal Yadav",
    location: "Everest Base Camp Trek",
    loadVideo: () => import("../../assets/video3.mp4"),
    thumbnail: photo2,
  },
  {
    id: 4,
    name: "Kaitlyn & Team",
    location: "Everest Base Camp Trek",
    loadVideo: () => import("../../assets/video4.mp4"),
    thumbnail: photo3,
  },
];

const Aced = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.2,
    once: false,
  });

  const handleSelect = async (item) => {
    try {
      setLoadingId(item.id);
      const module = await item.loadVideo();
      setSelectedVideo(module.default);
    } catch (err) {
      console.error("Failed to load video:", err);
    } finally {
      setLoadingId(null);
    }
  };

  const closeModal = () => setSelectedVideo(null);

  return (
    <div ref={ref} className="py-20 bg-white font-sans">
      <motion.div
        initial={{ opacity: 0, y: -60, filter: "blur(10px)" }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: -40 }
        }
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl font-bold text-gray-800">
          They Loved Wales Trek and Travel!
        </h2>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Hear what our travelers have to say about their experience.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="cursor-pointer group"
            onClick={() => handleSelect(item)}
          >
            <div className="relative overflow-hidden rounded-2xl aspect-video mb-4 shadow-md group-hover:shadow-xl transition-all duration-300">
              <img
                src={item.thumbnail}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                {loadingId === item.id ? (
                  <div className="bg-white/90 p-3 rounded-full shadow-lg">
                    <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="bg-white/90 p-3 rounded-full shadow-lg animate-pulse">
                    <svg
                      className="w-8 h-8 text-black ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.841z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <h3 className="font-bold text-gray-900 text-lg truncate">
                {item.name}
              </h3>
              <p className="text-gray-500 text-sm">{item.location}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-10 right-0 text-white text-xl font-bold hover:text-gray-300"
                onClick={closeModal}
              >
                Close ✕
              </button>

              <video
                src={selectedVideo}
                className="w-full h-full"
                controls
                autoPlay
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Aced;
