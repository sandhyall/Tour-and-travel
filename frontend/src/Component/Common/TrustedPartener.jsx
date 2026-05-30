import React from "react";
import { Link } from "react-router-dom";
import trekImage from "../../assets/trekImage.png";
import travel from "../../assets/Travel.png";
import tek from "../../assets/trek.png";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const TrustedPartner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.3,
    once: false,
  });

  return (
    <section
      ref={ref}
      className="bg-stone-50 py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <motion.h2
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: -60, filter: "blur(8px)" }
          }
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold text-center mb-16"
        >
          Your Trusted Partner for <br />
          <span className="text-emerald-700">
            Himalayan Treks & Tours
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* IMAGE SECTION */}
          <motion.div
            animate={
              isInView
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: -100, scale: 1.05 }
            }
            transition={{ duration: 0.9 }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src={trekImage}
              className="col-span-2 w-full h-64 object-cover rounded-2xl shadow-lg"
            />
            <img
              src={tek}
              className="w-full h-48 object-cover rounded-2xl shadow-lg"
            />
            <img
              src={travel}
              className="w-full h-48 object-cover rounded-2xl shadow-lg"
            />
          </motion.div>

          {/* TEXT SECTION */}
          <motion.div
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: 100 }
            }
            transition={{ duration: 0.9 }}
            className="space-y-6 text-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900">
              Welcome to Wales Trek and Travel
            </h3>

            <p className="text-lg leading-relaxed">
              <strong>Wales Trek and Travel</strong> is a
              premier adventure travel company in Nepal...
            </p>

            <p className="text-lg leading-relaxed">
              We take pride in our high success rate and safety...
            </p>

            <p className="text-lg leading-relaxed">
              Committed to responsible tourism...
            </p>

            <motion.div
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <Link
                to="/about-us"
                className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-10 rounded-lg shadow-md"
              >
                Read more about us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartner;