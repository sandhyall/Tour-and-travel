import React from "react";

const CorporateSocialInitiative = () => {
  const socialProjects = [
    {
      title: "COVID-19 EMERGENCY RESPONSE",
      description:
        "The Covid-19 pandemic and the lockdown stopped people from working and engaging in economic activities. Assessing the situations, we decided the best thing to do is to help by providing relief supplies.",
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=85&w=900",
    },
    {
      title: "NEPAL EARTHQUAKE RELIEF",
      description:
        "Ace the Himalaya in co-operation with Sambhav Nepal participated in different earthquake relief distribution programs and is actively working to benefit the affected areas and people of Nepal.",
      image:
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=85&w=900",
    },
    {
      title: "COMMUNITY SUPPORT THROUGH SAMBHAV NEPAL",
      description:
        "Ace the Himalaya fully supports as well as works closely with the social organization Sambhav Nepal Foundation to enhance community projects and social activities.",
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=85&w=900",
    },
    {
      title: "GUIDE AND PORTER POLICY",
      description:
        "We employ only local leaders and staff to help sustain the local communities we work with. We want to create the best working conditions for our trekking staff.",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=85&w=900",
    },
  ];

  return (
    <div className="font-sans text-gray-900 bg-white">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div className="relative w-full h-[420px] sm:h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=85&w=1600"
          alt="Community support in Nepal"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-12 max-w-7xl mx-auto">
          <span className="inline-block uppercase tracking-[0.3em] text-emerald-400 text-xs font-bold mb-3">
            Our Commitment
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
            Corporate Social <br className="hidden sm:block" /> Initiative
          </h1>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-20">

        <nav className="text-sm text-blue-600 mb-10 flex items-center gap-2">
          <span className="hover:underline cursor-pointer">home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">csi</span>
        </nav>

        <div className="max-w-4xl mb-16 sm:mb-24">
          <div className="w-16 h-1 bg-emerald-500 rounded-full mb-8" />
          <div className="space-y-6 text-[17px] sm:text-lg leading-8 text-gray-600">
            <p>
              We are well aware of our Corporate Social Initiative and have
              integrated self-regulation into our business model.
            </p>
            <p>
              We believe that businesses should embrace responsibility for their impact on society and environment.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <p className="uppercase tracking-[0.25em] text-xs text-emerald-500 font-bold mb-3">
            Our Initiatives
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
            Social Projects & Programs
          </h2>
          <div className="w-12 h-1 bg-emerald-500 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 sm:gap-y-20">
          {socialProjects.map((project, index) => (
            <div key={index} className="group cursor-pointer">

              <div className="overflow-hidden rounded-2xl mb-6 bg-gray-100 aspect-[16/10] shadow-md">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>

              <div className="w-8 h-0.5 bg-emerald-500 rounded-full mb-4 group-hover:w-14 transition-all duration-300" />

              <h2 className="text-xl sm:text-2xl font-bold mb-3 uppercase text-gray-900">
                {project.title}
              </h2>

              <p className="text-gray-500 leading-7 text-base sm:text-lg">
                {project.description}
              </p>

            </div>
          ))}
        </div>

        <div className="mt-20 sm:mt-28 bg-[#0b2545] rounded-3xl px-8 sm:px-14 py-12 sm:py-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: "5,000+", label: "Families Supported" },
            { value: "12", label: "Active Programs" },
            { value: "15+", label: "Years of Service" },
            { value: "100%", label: "Local Hiring" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl sm:text-4xl font-black text-white mb-2">{value}</p>
              <p className="text-xs sm:text-sm text-blue-200/70 uppercase tracking-widest font-semibold">
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default CorporateSocialInitiative;