import React from "react";
import { Link } from "react-router-dom";
import trekImage from "../../assets/trekImage.png";
import travel from "../../assets/Travel.png";
import tek from "../../assets/trek.png";

const TrustedPartner = () => {
  return (
    <section className="bg-stone-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-16 text-center">
          Your Trusted Partner for <br />
          <span className="text-emerald-700">Himalayan Treks & Tours</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <img src={trekImage} alt="Himalayan Trek" className="col-span-2 w-full h-64 object-cover rounded-2xl shadow-lg" />
            <img src={tek} alt="Mountain View" className="w-full h-48 object-cover rounded-2xl shadow-lg" />
            <img src={travel} alt="Travel Experience" className="w-full h-48 object-cover rounded-2xl shadow-lg" />
          </div>

          {/* Content */}
          <div className="space-y-6 text-gray-700">
            <h3 className="text-2xl font-bold text-gray-900">
              Welcome to Wales Trek and Travel
            </h3>
            <p className="leading-relaxed text-lg">
              <strong className="text-gray-900">Wales Trek and Travel</strong> is a 
              premier adventure travel company in Nepal. Founded by seasoned mountaineers, 
              we are dedicated to creating authentic, safe, and unforgettable 
              Himalayan journeys for travelers from across the globe.
            </p>

            <p className="leading-relaxed text-lg">
              We take pride in our <span className="font-bold text-gray-900">high success rate</span> and 
              exceptional safety standards. Whether you are seeking a challenging peak climb, 
              a cultural tour, or a luxury holiday, our expert guides ensure every step 
              of your journey is handled with professional care.
            </p>

            <p className="leading-relaxed text-lg">
              Committed to responsible tourism, we actively support local mountain 
              communities and ensure that our treks leave a positive impact on the 
              environment. Join us at Wales Trek and Travel to explore the majestic 
              landscapes of Nepal, Bhutan, and Tibet.
            </p>

            <div className="pt-4">
              <Link
                to="/about-us"
                className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-10 rounded-lg shadow-md transition duration-300"
              >
                Read more about us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartner;