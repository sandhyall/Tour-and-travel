import React from "react";

const Aboutus = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 text-gray-800 font-sans">
      <div className="relative w-full overflow-hidden rounded-xl shadow-lg aspect-video mb-12">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/HTDPh7nj9PE"
          title="Wales Tour and Travel Feature Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>

      <div className="space-y-12">
        <div className="space-y-6 text-lg leading-relaxed border-l-4 border-[#f1b400] pl-6">
          <p>
            <span className="font-bold">Wales Tour and Travel</span> is a
            premier adventure travel company based in Nepal, specializing in
            trekking, mountain biking, peak climbing, rafting, wildlife safaris,
            cultural tours, and fully customized travel itineraries. We offer a
            comprehensive range of expertly designed pre-planned itineraries as
            well as tailor-made travel planning services across{" "}
            <span className="font-bold">Nepal, Bhutan,</span> and{" "}
            <span className="font-bold">Tibet</span>.
          </p>
          <p>
            Our team is dedicated to delivering exceptional travel experiences
            while upholding the principles of sustainable and responsible
            tourism in all destinations where we operate. Whether you are a solo
            traveler, a family, a student group, or a corporate team, Wales Tour
            and Travel ensures every journey is safe, memorable, and
            authentically Himalayan.
          </p>
        </div>

        <div className="py-8 border-t border-gray-100">
          <h2 className="text-3xl font-bold mb-6 uppercase tracking-tight">
            The Story of Wales
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Founded with a mission to provide authentic Himalayan travel
            experiences, Wales Tour and Travel began as a locally owned tour
            operator. With the goal of making it a fully Nepali-owned inbound
            operator in Kathmandu, we have established a strong international
            presence, connecting travelers from all over the world to the
            majestic Himalayas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[#f1b400]">
              Our Vision
            </h2>
            <p className="text-lg leading-relaxed">
              Our vision is clear: to be a leading travel company in Nepal,
              trusted by travelers worldwide for delivering safe, authentic, and
              responsible travel experiences across the Himalayas. We are deeply
              committed to sustainable tourism and supporting local communities.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-[#f1b400]">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed">
              Our mission is to operate high-quality adventure travel
              experiences while maintaining the highest standards of safety and
              service. We actively promote eco-friendly practices by minimizing
              plastic use and partnering with environmentally responsible
              hotels.
            </p>
          </div>
        </div>

        <div className="bg-[#2c3338] text-white p-10 rounded-xl shadow-inner">
          <h2 className="text-3xl font-bold mb-10 text-center">
            What Matters to Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="font-bold text-xl text-[#f1b400]">
                Customer Satisfaction
              </h3>
              <p className="text-gray-300">
                We care deeply about our travelers' comfort and safety, making
                every journey seamless and personalized.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-xl text-[#f1b400]">
                Preserving the Himalayas
              </h3>
              <p className="text-gray-300">
                Protecting the natural environment and cultural heritage is
                central to our work. We promote sustainable practices.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-xl text-[#f1b400]">
                Trust & Transparency
              </h3>
              <p className="text-gray-300">
                We operate with honesty and professionalism, ensuring travelers
                feel well-informed at every step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
