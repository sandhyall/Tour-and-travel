import React from "react";

const MeetOurTeam = () => {
  const teamMembers = [
    {
      name: "RAJENDRA NEUPANE",
      role: "Senior Trekking Guide",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=500&h=650",
    },
    {
      name: "MILAN ADHIKARI",
      role: "Adventure Travel Expert",
      image:
        "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=500&h=650",
    },
    {
      name: "PASANG DAWA",
      role: "Mountain Expedition Leader",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=500&h=650",
    },
  ];

  return (
    <div className="bg-[#faf8f3] text-gray-900 font-sans">

      {/* HERO SECTION */}
      <div className="relative w-full h-[420px] md:h-[620px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1500"
          alt="Wales Trek and Travel Team"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>

        <div className="absolute bottom-12 left-6 md:left-16 max-w-3xl">
          <p className="uppercase tracking-[0.3em] text-emerald-500 text-sm font-bold mb-4">
            Meet The Experts
          </p>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Meet Our Team
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
            Passionate Himalayan professionals dedicated to creating
            unforgettable adventures with Wales Trek and Travel.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* BREADCRUMB */}
        <nav className="text-sm text-gray-500 mb-8">
          <span className="hover:text-[#f1b400] cursor-pointer">
            Home
          </span>

          <span className="mx-3 text-gray-300">{">"}</span>

          <span className="text-emerald-500 font-semibold">
            Meet Our Team
          </span>
        </nav>

        {/* TITLE */}
        <div className="max-w-4xl mb-16">
          <p className="uppercase tracking-[0.25em] text-sm text-emerald-500 font-bold mb-4">
            Wales Trek and Travel
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
            The People Behind Your Himalayan Journey
          </h2>

          <div className="w-24 h-1 bg-emerald-500 rounded-full mb-8"></div>

          <div className="space-y-7 text-lg leading-9 text-gray-700">
            <p>
              At{" "}
              <span className="font-bold text-black">
                Wales Trek and Travel
              </span>
              , our greatest strength is our dedicated and experienced
              team of travel experts, trekking leaders, mountain guides,
              and adventure specialists.
            </p>

            <p>
              Our team members come from different Himalayan regions of
              Nepal and possess deep knowledge of local culture,
              traditions, trekking routes, mountain safety, and
              responsible tourism practices.
            </p>

            <p>
              Every guide at Wales Trek and Travel is professionally
              trained, government licensed, and experienced in handling
              trekking expeditions, cultural tours, peak climbing, and
              high-altitude adventures.
            </p>

            <p>
              We proudly maintain high standards of customer care,
              communication, and safety. Our multilingual guides speak
              fluent English and several international languages,
              helping travelers feel comfortable and connected
              throughout their journey.
            </p>

            <p>
              Whether you are trekking to Everest Base Camp, exploring
              the cultural heritage of Kathmandu, or discovering the
              hidden beauty of Bhutan and Tibet, our passionate team is
              committed to making your experience authentic, safe, and
              unforgettable.
            </p>

            <p className="font-semibold text-black">
              At Wales Trek and Travel, we believe travel is not just
              about reaching destinations — it is about building
              meaningful experiences and lifelong memories.
            </p>
          </div>
        </div>

        {/* VALUES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="w-14 h-14 rounded-2xl bg-[#f1b400]/15 flex items-center justify-center mb-6">
              <span className="text-2xl">🏔️</span>
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Experienced Guides
            </h3>

            <p className="text-gray-600 leading-8">
              Our trekking leaders and guides are highly experienced in
              Himalayan adventures and mountain safety.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="w-14 h-14 rounded-2xl bg-[#f1b400]/15 flex items-center justify-center mb-6">
              <span className="text-2xl">🌏</span>
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Local Expertise
            </h3>

            <p className="text-gray-600 leading-8">
              We provide authentic local experiences with deep cultural
              knowledge and responsible tourism values.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="w-14 h-14 rounded-2xl bg-[#f1b400]/15 flex items-center justify-center mb-6">
              <span className="text-2xl">❤️</span>
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Personalized Service
            </h3>

            <p className="text-gray-600 leading-8">
              We focus on creating safe, memorable, and personalized
              adventures for every traveler.
            </p>
          </div>

        </div>

        {/* TEAM SECTION */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.25em] text-sm text-emerald-500 font-bold mb-4">
            Our Professionals
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Meet The Team
          </h2>
        </div>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden aspect-[4/5]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>

              {/* INFO */}
              <div className="p-8 text-center">
                <h3 className="text-2xl font-black tracking-tight uppercase text-gray-900">
                  {member.name}
                </h3>

                <div className="w-16 h-1 bg-emerald-500 rounded-full mx-auto my-4"></div>

                <p className="text-gray-600 text-lg">
                  {member.role}
                </p>
              </div>

            </div>
          ))}

        </div>

        {/* BOTTOM CTA */}
        <div className="mt-24 bg-[#2c3338] rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
          <p className="uppercase tracking-[0.25em] text-sm text-emerald-500 font-bold mb-4">
            Start Your Adventure
          </p>

          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Explore The Himalayas With Us
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-9 mb-10">
            Let the experienced team at Wales Trek and Travel guide you
            through the breathtaking mountains, cultures, and hidden
            wonders of Nepal, Bhutan, and Tibet.
          </p>

          <button onClick={() => window.location.href = "/contact-us"} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:scale-105">
            Contact Our Team
          </button>
        </div>

      </div>
    </div>
  );
};

export default MeetOurTeam;