import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

import trekImage from "../../assets/trekImage.webp";
import travel from "../../assets/Travel.webp";
import tek from "../../assets/trek.webp";


const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const TrustedPartner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.15, once: false });

  const anim = (delay = 0) =>
    isInView ? "visible" : "hidden";

  return (
    <section
      ref={ref}
      className="bg-stone-50 py-16 sm:py-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

      
        <motion.h2
          variants={fadeUp(0)}
          initial="hidden"
          animate={anim()}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12 sm:mb-16 leading-tight"
        >
          Your Trusted Partner for{" "}
          <br className="hidden sm:block" />
          <span className="text-emerald-700">
            Himalayan Treks &amp; Tours
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={anim()}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            <div className="col-span-2 overflow-hidden rounded-2xl shadow-lg">
              <img
                src={trekImage}
                alt="Himalayan trek"
                className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 md:hover:scale-105"
              />
            </div>

            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={tek}
                alt="Trek"
                loading="lazy"
                decoding="async"
                className="w-full h-40 sm:h-48 object-cover transition-transform duration-700 md:hover:scale-105"
              />
            </div>

            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={travel}
                alt="Travel"
                loading="lazy"
                decoding="async"
                className="w-full h-40 sm:h-48 object-cover transition-transform duration-700 md:hover:scale-105"
              />
            </div>
          </motion.div>

          <div className="space-y-5 text-gray-700">

            <motion.h3
              variants={fadeUp(0.15)}
              initial="hidden"
              animate={anim()}
              className="text-xl sm:text-2xl font-bold text-gray-900"
            >
              Welcome to Wales Trek and Travel
            </motion.h3>

            <motion.p
              variants={fadeUp(0.2)}
              initial="hidden"
              animate={anim()}
              className="text-base sm:text-lg leading-relaxed"
            >
              <strong>Wales Trek and Travel</strong> is a premier adventure
              travel company in Nepal…
            </motion.p>

            <motion.p
              variants={fadeUp(0.25)}
              initial="hidden"
              animate={anim()}
              className="text-base sm:text-lg leading-relaxed"
            >
              We take pride in our high success rate and safety…
            </motion.p>

            <motion.p
              variants={fadeUp(0.3)}
              initial="hidden"
              animate={anim()}
              className="text-base sm:text-lg leading-relaxed"
            >
              Committed to responsible tourism…
            </motion.p>

            <motion.div
              variants={fadeUp(0.38)}
              initial="hidden"
              animate={anim()}
              className="pt-2"
            >
              <Link
                to="/about-us"
                className="inline-block bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold py-3.5 px-9 rounded-lg shadow-md transition-colors duration-200 text-sm sm:text-base"
              >
                Read more about us
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartner;