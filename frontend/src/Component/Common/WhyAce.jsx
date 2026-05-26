import React from "react";

const features = [
  {
    title: "Local Himalayan Experts",
    description:
      "Dedicated local professionals are primarily based in our travel destinations and work exclusively for Ace the Himalaya to give you an authentic Himalayan experience.",
    icon: (
      <svg
        className="w-12 h-12 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "High Standard of Safety prioritized",
    description:
      "Your safe and secure trip is our top priority. Fully health-trained guides and staff take care of you throughout the journey.",
    icon: (
      <svg
        className="w-12 h-12 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
  {
    title: "Unbeatable Value",
    description:
      "We at Ace the Himalaya carefully curate our itineraries with the best possible services to guarantee that we provide you with the best trip that is value for money.",
    icon: (
      <svg
        className="w-12 h-12 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Top-Notch Service",
    description:
      "Well-experienced professional guides and staff are dedicated to provide you with best quality trip experience.",
    icon: (
      <div className="bg-yellow-400 p-3 rounded-xl shadow-sm">
        <svg
          className="w-8 h-8 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      </div>
    ),
  },
  {
    title: "Socially Responsible",
    description:
      "Ace believes in giving back to society primarily through various charity works and encouraging local participation in social causes.",
    icon: (
      <svg
        className="w-12 h-12 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    title: "Guaranteed Departures",
    description:
      "Our trips have guaranteed departure dates. Once your booking is confirmed, your trip is guaranteed to run irrespective of the number of participants.",
    icon: (
      <svg
        className="w-12 h-12 text-blue-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 16l2 2 4-4"
        />
      </svg>
    ),
  },
];

const WhyAce = () => {
  return (
    <section className="py-16 bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 relative inline-block">
          Why Wales Trek & Travel?
          <span className="block w-12 h-1 bg-yellow-500 mx-auto mt-2"></span>
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto mt-6 mb-16 text-lg leading-relaxed">
          We have been helping you to explore the Himalayas since 2006. With
          local experts in Nepal, Bhutan & Tibet, we are dedicated to promoting
          eco-friendly and responsible tourism for your unforgettable Himalayan
          adventure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-6 h-16 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAce;
