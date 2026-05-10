import React, { useState } from "react";
import { ChevronDown, Play, X } from "lucide-react";

const WhyAce = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const videoData = {
    embedUrl: "https://www.youtube.com/embed/bFy6jTEHlzQ?autoplay=1",
    thumbnail: "https://i.ytimg.com/vi/bFy6jTEHlzQ/maxresdefault.jpg",
  };

  const reasons = [
    {
      title: "Local Himalayan Experts",
      content:
        "Our team consists of locals who have spent their lives exploring the peaks. We offer insider knowledge that only a native expert can provide.",
    },
    {
      title: "High Standard of Safety prioritized",
      content:
        "Safety is our number one priority. We provide high-quality gear, satellite phones, and oxygen cylinders on every high-altitude trek.",
    },
    {
      title: "Unbeatable Value",
      content:
        "We offer premium services at competitive prices, ensuring you get the best experience for every dollar spent.",
    },
    {
      title: "Top Notch Service",
      content:
        "From arrival to departure, our staff ensures every detail of your trip is handled with professional care.",
    },
    {
      title: "Fast response time",
      content:
        "Our support team is available 24/7 to answer your queries within minutes, not days.",
    },
    {
      title: "Award-Winning Company",
      content:
        "Recognized globally for our excellence in travel and sustainability in the Himalayan region.",
    },
    {
      title: "Group Discounts",
      content:
        "Traveling with friends? We offer special pricing for groups of 4 or more.",
    },
    {
      title: "Pre-booked Domestic Flights",
      content:
        "No more waiting in line. We handle all domestic flight logistics to make your travel seamless.",
    },
  ];

  return (
    <div className="font-sans bg-white">
      <div className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <img
          src={videoData.thumbnail}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Video Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />

        <div className="relative z-20 text-center px-6 max-w-4xl">
          <p className="text-white text-xl md:text-3xl font-light italic leading-relaxed mb-10 drop-shadow-lg">
            "Ace the Himalaya is an idea, that aims to share with the world the
            passion of travel in the Himalayan region and assist visitors in
            achieving their desire to create everlasting memories."
          </p>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="group relative inline-flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping group-hover:bg-white/40" />
            <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xl">
              <Play fill="black" size={28} className="ml-1" />
            </div>
          </button>
        </div>
      </div>

      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4">
          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-400 transition-colors"
          >
            <X size={40} />
          </button>
          <div className="w-full max-w-5xl aspect-video shadow-2xl">
            <iframe
              className="w-full h-full rounded-lg"
              src={videoData.embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <h1 className="text-6xl font-black mb-4 tracking-tighter uppercase">
              Why Ace?
            </h1>
            <p className="text-gray-500 text-xl font-medium">
              17 reasons why you should choose Ace for your next adventure!
            </p>
          </div>
          <button
            onClick={() => setOpenIndex(null)}
            className="border-2 border-black px-8 py-2 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 text-xs"
          >
            Expand / Collapse All
          </button>
        </div>

        <div className="divide-y divide-gray-200 border-t border-gray-200">
          {reasons.map((reason, index) => (
            <div key={index} className="overflow-hidden">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between py-10 text-left group transition-all"
              >
                <div className="flex items-center">
                  <span className="text-5xl font-light text-gray-200 mr-10 transition-colors group-hover:text-gray-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-3xl font-normal transition-all duration-300 ${openIndex === index ? "text-green-700 translate-x-2" : "text-gray-800"}`}
                  >
                    {reason.title}
                  </span>
                </div>
                <div
                  className={`transition-transform duration-500 ${openIndex === index ? "rotate-180" : ""}`}
                >
                  <ChevronDown
                    size={28}
                    strokeWidth={1.5}
                    className={
                      openIndex === index ? "text-green-700" : "text-gray-400"
                    }
                  />
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-96 opacity-100 mb-10" : "max-h-0 opacity-0"}`}
              >
                <div className="pl-24 pr-12 text-gray-600 text-xl leading-relaxed">
                  {reason.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyAce;
