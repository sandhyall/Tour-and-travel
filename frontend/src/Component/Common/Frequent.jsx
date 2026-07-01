import React, { useState } from "react";

const faqData = [
  {
    question: "Why travel with Wales Tour and Travel?",
    answer:
      "Wales Tour and Travel provides personalized services, expert local guides, and 24/7 support to ensure your journey through the Himalayas is seamless and unforgettable.",
  },
  {
    question:
      "What trekking packages does Wales Tour and Travel offer in Nepal?",
    answer:
      "We offer a wide range of packages including Everest Base Camp, Annapurna Circuit, Langtang Valley treks, and many off-the-beaten-path adventures tailored to your needs.",
  },
  {
    question: "Are your trekking packages suitable for beginners?",
    answer:
      "Yes, we have packages designed for all levels. From short, easy hikes for beginners to challenging high-altitude expeditions for experienced trekkers.",
  },
  {
    question:
      "Can I customize a private tour itinerary with Wales Tour and Travel?",
    answer:
      "Absolutely! We specialize in custom itineraries. You can choose your own dates, pace, and specific destinations you'd like to visit.",
  },
  {
    question: "Where can I exchange money upon arrival in Nepal?",
    answer:
      "You can exchange money at the Tribhuvan International Airport or at various authorized money exchange counters in Thamel, Kathmandu.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Our policy is flexible. Generally, cancellations made 30 days prior to departure receive a full refund minus a small administrative fee. Specific details depend on the package booked.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 relative inline-block">
            Frequently Asked Questions by Travelers
            <span className="block w-16 h-1 bg-green-500 mx-auto mt-2"></span>
          </h2>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="border-b border-gray-100 last:border-none"
              >
                <button
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition-colors group"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span
                    className={`text-lg ${isOpen ? "text-blue-600 font-semibold" : "text-gray-700"}`}
                  >
                    {item.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 bg-blue-50/30">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;