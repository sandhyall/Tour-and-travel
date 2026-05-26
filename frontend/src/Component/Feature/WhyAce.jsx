import React, { useState } from "react";
import { ChevronDown, Play, X } from "lucide-react";
import ace from "../../assets/Ace.png";

const WhyAce = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const videoData = {
    embedUrl: "",
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const reasons = [
    {
      title: "Local Himalayan Experts",
      content:
        "At Wales Trek and Travel, our guides and travel experts are born and raised in the Himalayan region. Their deep knowledge of local culture, mountain trails, and traditions allows us to create truly authentic travel experiences.",
    },
    {
      title: "Safety Always Comes First",
      content:
        "Your safety is our highest priority. We follow strict safety procedures, provide professional guides, first aid support, and maintain high standards throughout every trek and expedition.",
    },
    {
      title: "Best Value for Your Adventure",
      content:
        "We offer premium trekking and tour experiences at fair and competitive prices, ensuring travelers receive exceptional value without compromising quality or comfort.",
    },
    {
      title: "Professional & Personalized Service",
      content:
        "From the moment you contact us until your departure, our dedicated team ensures personalized care, smooth logistics, and excellent customer service throughout your journey.",
    },
    {
      title: "Fast & Reliable Communication",
      content:
        "Our support team responds quickly to inquiries and provides clear information to help travelers plan their Himalayan adventures with confidence.",
    },
    {
      title: "Experienced & Trusted Company",
      content:
        "Wales Trek and Travel has built a strong reputation among travelers worldwide for professionalism, reliability, and unforgettable Himalayan experiences.",
    },
    {
      title: "Special Discounts for Groups",
      content:
        "Traveling with friends, family, or a group? We provide attractive group discounts and customized itineraries designed to fit your travel needs.",
    },
    {
      title: "Hassle-Free Travel Arrangements",
      content:
        "We organize transportation, accommodations, domestic flights, permits, and logistics so you can focus entirely on enjoying your adventure.",
    },
    {
      title: "Sustainable Tourism Practices",
      content:
        "We are committed to responsible tourism by supporting local communities, reducing environmental impact, and promoting eco-friendly travel practices.",
    },
    {
      title: "Tailor-Made Travel Experiences",
      content:
        "Every traveler is unique. We create customized trekking, cultural, luxury, and adventure itineraries based on your interests, travel style, and schedule.",
    },
  ];

  return (
    <div className="font-sans bg-[#faf8f3] text-gray-900">

      {/* HERO SECTION */}
      <div className="relative h-[75vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-black">

        <img
          src={ace}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Wales Trek and Travel"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

        <div className="relative z-20 text-center px-6 max-w-5xl">

          <p className="uppercase tracking-[0.35em] text-[#f1b400] text-sm font-bold mb-6">
            Why Choose Wales Trek and Travel
          </p>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
            Explore The Himalayas <br />
            With Confidence
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 font-light leading-relaxed mb-12 max-w-4xl mx-auto">
            “Wales Trek and Travel was founded with a passion for sharing
            the beauty, culture, and adventure of the Himalayas while
            creating meaningful and unforgettable travel experiences.”
          </p>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="group inline-flex items-center gap-4 bg-[#f1b400] hover:bg-[#dca400] text-black px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl hover:scale-105"
          >
            <span className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play size={18} fill="white" />
            </span>

            Watch Our Story
          </button>
        </div>
      </div>

      {/* VIDEO MODAL */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4">

          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-400 transition-colors"
          >
            <X size={40} />
          </button>

          <div className="w-full max-w-6xl aspect-video shadow-2xl">
            <iframe
              className="w-full h-full rounded-2xl"
              src={videoData.embedUrl}
              title="Wales Trek and Travel Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* CONTENT SECTION */}
      <div className="max-w-6xl mx-auto py-24 px-6">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20">

          <div className="max-w-3xl">

            <p className="uppercase tracking-[0.25em] text-sm text-[#f1b400] font-bold mb-5">
              Trusted Himalayan Specialists
            </p>

            <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-none mb-6">
              Why Travelers <br />
              Choose Us
            </h2>

            <div className="w-24 h-1 bg-[#f1b400] rounded-full mb-8"></div>

            <p className="text-xl text-gray-600 leading-relaxed">
              Discover why thousands of travelers from around the world
              trust Wales Trek and Travel for unforgettable Himalayan
              trekking and adventure experiences.
            </p>
          </div>

          <button
            onClick={() => setOpenIndex(null)}
            className="border-2 border-black px-8 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 text-xs"
          >
            Collapse All
          </button>
        </div>

        {/* ACCORDION */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">

          {reasons.map((reason, index) => (
            <div
              key={index}
              className="border-b border-gray-100 last:border-b-0"
            >

              {/* BUTTON */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between px-8 md:px-12 py-8 text-left group transition-all"
              >

                <div className="flex items-center gap-6 md:gap-10">

                  <span className="text-4xl md:text-5xl font-black text-gray-200 group-hover:text-[#f1b400] transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`text-xl md:text-3xl font-semibold transition-all duration-300 ${
                      openIndex === index
                        ? "text-[#b8860b] translate-x-2"
                        : "text-gray-800"
                    }`}
                  >
                    {reason.title}
                  </span>
                </div>

                <div
                  className={`transition-transform duration-500 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown
                    size={30}
                    strokeWidth={1.8}
                    className={
                      openIndex === index
                        ? "text-[#b8860b]"
                        : "text-gray-400"
                    }
                  />
                </div>
              </button>

              {/* CONTENT */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-24 md:pl-36 pr-10 md:pr-16 pb-10 text-gray-600 text-lg leading-9">
                  {reason.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-24 bg-[#2c3338] rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">

          <p className="uppercase tracking-[0.25em] text-sm text-[#f1b400] font-bold mb-5">
            Begin Your Adventure
          </p>

          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Discover The Magic Of The Himalayas
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-9 mb-10">
            Whether you dream of trekking to Everest Base Camp,
            exploring ancient Himalayan cultures, or experiencing luxury
            mountain adventures, Wales Trek and Travel is here to make
            your journey extraordinary.
          </p>

          <button className="bg-[#f1b400] hover:bg-[#dca400] text-black font-black px-10 py-5 rounded-2xl transition-all duration-300 shadow-lg hover:scale-105 uppercase tracking-[0.15em] text-sm">
            Plan Your Trip
          </button>
        </div>

      </div>
    </div>
  );
};

export default WhyAce;