import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import video1 from "../../assets/video5.mp4";
import video2 from "../../assets/video2.mp4";
import video3 from "../../assets/video3.mp4";
import video4 from "../../assets/video4.mp4";
import photo from "../../assets/photo.jpg";
import photo1 from "../../assets/photo1.jpg";
import photo2 from "../../assets/photo2.jpg";
import photo3 from "../../assets/photo3.jpg";

const testimonials = [
  {
    id: 1,
    name: "Jason Ogasian",
    location: "Manaslu Circuit Trek",
    embedUrl: video1,
    thumbnail: photo,
  },
  {
    id: 2,
    name: "Simon & Group",
    location: "Annapurna Base Camp Trek",
    embedUrl: video2,
    thumbnail: photo1,
  },
  {
    id: 3,
    name: "Daroga Lal Yadav",
    location: "Everest Base Camp Trek",
    embedUrl: video3,
    thumbnail: photo2,
  },
  {
    id: 4,
    name: "Kaitlyn & Team",
    location: "Everest Base Camp Trek",
    embedUrl: video4,
    thumbnail: photo3,
  },
];

const Aced = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.2,
    once: false,
  });

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
        <h2 className="text-4xl font-bold text-gray-800">They  Wales Trek and Travel!</h2>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Hear what our travelers have to say about their experience.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              y: 60,
              scale: 0.95,
            }}
            animate={
              isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40 }
            }
            transition={{
              duration: 0.6,
              delay: index * 0.1,
            }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            className="cursor-pointer group"
            onClick={() => setSelectedVideo(item.embedUrl)}
          >
            <div className="relative overflow-hidden rounded-2xl aspect-video mb-4 shadow-md group-hover:shadow-xl transition-all duration-300">
              <img
                src={item.thumbnail}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                  }}
                  className="bg-white/90 p-3 rounded-full shadow-lg"
                >
                  <svg
                    className="w-8 h-8 text-black ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.841z" />
                  </svg>
                </motion.div>
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

      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
          >
            <button
              className="absolute -top-10 right-0 text-white text-xl font-bold hover:text-gray-300"
              onClick={() => setSelectedVideo(null)}
            >
              Close ✕
            </button>

            <iframe
              src={selectedVideo}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Video Player"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Aced;
