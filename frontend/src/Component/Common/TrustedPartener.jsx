import React from "react";
import { Link } from "react-router-dom";

const TrustedPartner = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl text-center justify-between font-bold text-gray-800 mb-10">
        Your Trusted Partner for Himalayan Treks & Tours
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
          <div className="relative overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/HTDPh7nj9PE"
              title="YouTube video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="flex flex-col space-y-6 text-gray-700 leading-relaxed text-lg">
          <p>
            <span className="font-semibold text-gray-900">
              Ace the Himalaya
            </span>{" "}
            is a premier trekking and adventure travel company in Nepal, founded
            by a former mountain guide with a passion for creating safe,
            authentic, and unforgettable Himalayan journeys. Renowned for
            top-notch service, highly experienced guides, and exceptional safety
            standards, we proudly maintain an impressive 97.4% trek success
            rate.
          </p>

          <p>
            As a Travelife Certified company, we meet internationally recognized
            sustainability standards through independent assessment, reflecting
            our commitment to responsible tourism, environmental protection, and
            supporting local communities in line with GSTC Criteria.
          </p>

          <p>
            With the highest number of positive TripAdvisor reviews, Ace the
            Himalaya proudly stands as one of Nepal’s leading trekking and tour
            operators. We specialize in guided Himalayan treks, peak climbing,
            cultural tours, luxury holidays, and tailor-made adventure travel
            experiences across Nepal, Bhutan and Tibet.
          </p>

          <div className="pt-4">
            <Link
              to="/About-us"
              className="inline-block bg-[#f1b400] hover:bg-[#d49f00] text-black font-bold py-3 px-8 rounded-sm transition-colors shadow-md"
            >
              Read more about us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartner;
