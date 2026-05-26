import React from "react";
import about from "../../assets/about.png";

const Aboutus = () => {
  return (
    <section className="bg-[#faf8f3] py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* HERO IMAGE */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-20">
          <img
            src={about}
            alt="Wales Trek and Travel"
            className="w-full h-[320px] md:h-[550px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          <div className="absolute bottom-10 left-10 max-w-2xl">
            <p className="uppercase tracking-[0.3em] text-sm text-[#f1b400] font-semibold mb-4">
              Explore The Himalayas
            </p>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              About Wales Trek <br /> & Travel
            </h1>

            <p className="mt-5 text-lg text-gray-200 leading-relaxed">
              Creating unforgettable Himalayan journeys with passion,
              authenticity, and responsible tourism.
            </p>
          </div>
        </div>

        {/* INTRO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <p className="uppercase tracking-[0.25em] text-sm text-[#f1b400] font-bold mb-4">
              Who We Are
            </p>

            <h2 className="text-4xl font-black text-[#1f2937] leading-tight mb-6">
              Nepal’s Trusted Himalayan Adventure Company
            </h2>

            <div className="w-24 h-1 bg-[#f1b400] rounded-full mb-8"></div>

            <p className="text-lg leading-9 text-gray-700 mb-6">
              <span className="font-bold text-black">
                Wales Trek and Travel
              </span>{" "}
              is a premier adventure travel company based in Nepal,
              specializing in trekking, mountain expeditions, cultural
              journeys, luxury holidays, peak climbing, rafting,
              jungle safaris, helicopter tours, and tailor-made
              Himalayan adventures.
            </p>

            <p className="text-lg leading-9 text-gray-700 mb-6">
              Founded by passionate tourism professionals and experienced
              Himalayan guides, our company was created with one simple
              vision — to provide travelers with authentic, safe, and
              life-changing experiences in the heart of the Himalayas.
            </p>

            <p className="text-lg leading-9 text-gray-700">
              We proudly operate across{" "}
              <span className="font-bold text-black">Nepal</span>,{" "}
              <span className="font-bold text-black">Bhutan</span>, and{" "}
              <span className="font-bold text-black">Tibet</span>,
              offering carefully designed adventures that combine
              breathtaking landscapes, cultural immersion, and
              personalized service.
            </p>
          </div>

          {/* RIGHT STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-5xl font-black text-[#f1b400] mb-3">
                15+
              </h3>
              <p className="text-xl font-bold text-gray-900 mb-2">
                Years Experience
              </p>
              <p className="text-gray-600 leading-relaxed">
                Years of expertise creating safe and unforgettable
                trekking and travel experiences in the Himalayas.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-5xl font-black text-[#f1b400] mb-3">
                5000+
              </h3>
              <p className="text-xl font-bold text-gray-900 mb-2">
                Happy Travelers
              </p>
              <p className="text-gray-600 leading-relaxed">
                Travelers from around the world trust us for memorable
                journeys and exceptional hospitality.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-5xl font-black text-[#f1b400] mb-3">
                97%
              </h3>
              <p className="text-xl font-bold text-gray-900 mb-2">
                Success Rate
              </p>
              <p className="text-gray-600 leading-relaxed">
                High trek success rates through expert planning,
                professional guides, and strong safety standards.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-5xl font-black text-[#f1b400] mb-3">
                24/7
              </h3>
              <p className="text-xl font-bold text-gray-900 mb-2">
                Customer Support
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dedicated travel support before, during, and after every
                adventure.
              </p>
            </div>
          </div>
        </div>

        {/* STORY */}
        <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16 mb-20 border border-gray-100">
          <div className="max-w-5xl">
            <p className="uppercase tracking-[0.25em] text-sm text-[#f1b400] font-bold mb-4">
              Our Story
            </p>

            <h2 className="text-4xl font-black text-gray-900 mb-8">
              The Journey of Wales Trek and Travel
            </h2>

            <div className="space-y-7 text-lg leading-9 text-gray-700">
              <p>
                Wales Trek and Travel began with a deep passion for the
                mountains, people, and culture of Nepal. What started as
                a small local trekking company has grown into a trusted
                Himalayan travel brand serving adventurers from across
                the globe.
              </p>

              <p>
                Our founders spent years exploring remote Himalayan
                trails, guiding trekkers through breathtaking mountain
                landscapes, and understanding what travelers truly seek
                during their adventures. Through these experiences, they
                realized that travel should not only be exciting but
                also meaningful, safe, and responsible.
              </p>

              <p>
                Over the years, Wales Trek and Travel has successfully
                organized trekking expeditions, cultural tours, luxury
                holidays, educational travel programs, and mountain
                adventures for thousands of travelers from Europe,
                America, Australia, and Asia.
              </p>

              <p>
                Today, we continue to combine local expertise with
                international standards, ensuring every traveler enjoys
                authentic experiences, professional service, and
                unforgettable memories in the Himalayas.
              </p>
            </div>
          </div>
        </div>

        {/* VISION & MISSION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          <div className="bg-[#1f2937] text-white rounded-3xl p-10 shadow-2xl">
            <p className="uppercase tracking-[0.2em] text-[#f1b400] text-sm font-bold mb-4">
              Our Vision
            </p>

            <h2 className="text-4xl font-black mb-6">
              Inspiring Responsible Himalayan Travel
            </h2>

            <p className="text-lg leading-9 text-gray-300">
              Our vision is to become one of the most trusted and
              respected Himalayan travel companies in the world by
              delivering authentic, sustainable, and unforgettable
              travel experiences.
            </p>

            <p className="text-lg leading-9 text-gray-300 mt-6">
              We aim to inspire travelers to explore the natural beauty,
              cultural richness, and spiritual heritage of Nepal,
              Bhutan, and Tibet while supporting local communities and
              protecting fragile mountain environments.
            </p>
          </div>

          <div className="bg-[#f1b400] rounded-3xl p-10 shadow-2xl">
            <p className="uppercase tracking-[0.2em] text-black text-sm font-bold mb-4">
              Our Mission
            </p>

            <h2 className="text-4xl font-black text-black mb-6">
              Delivering Extraordinary Adventures
            </h2>

            <p className="text-lg leading-9 text-gray-900">
              Our mission is to provide world-class trekking and travel
              experiences with the highest standards of safety, service,
              professionalism, and sustainability.
            </p>

            <p className="text-lg leading-9 text-gray-900 mt-6">
              We are committed to offering personalized journeys,
              supporting local economies, promoting eco-friendly
              tourism, and ensuring every traveler leaves the Himalayas
              with unforgettable memories and meaningful experiences.
            </p>
          </div>
        </div>

        {/* VALUES */}
        <div className="bg-[#2c3338] rounded-3xl p-10 md:p-16 text-white shadow-2xl">
          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.25em] text-sm text-[#f1b400] font-bold mb-4">
              Our Core Values
            </p>

            <h2 className="text-4xl md:text-5xl font-black">
              What Matters to Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-[#f1b400] mb-5">
                Customer Satisfaction
              </h3>

              <p className="text-gray-300 leading-8">
                Our travelers are at the heart of everything we do.
                From the moment you contact us until the end of your
                journey, we focus on delivering personalized service,
                comfort, safety, and unforgettable experiences.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-[#f1b400] mb-5">
                Sustainable Tourism
              </h3>

              <p className="text-gray-300 leading-8">
                We strongly believe in responsible travel practices that
                protect the Himalayas and support local communities. We
                actively encourage eco-friendly tourism and cultural
                preservation in every destination we operate.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-[#f1b400] mb-5">
                Trust & Professionalism
              </h3>

              <p className="text-gray-300 leading-8">
                Transparency, honesty, and professionalism define our
                company. We are committed to maintaining high standards
                in communication, operations, safety management, and
                customer care.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Aboutus;