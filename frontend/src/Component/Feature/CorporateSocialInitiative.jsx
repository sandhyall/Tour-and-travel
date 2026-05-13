import React from "react";

const CorporateSocialInitiative = () => {
  const socialProjects = [
    {
      title: "COVID-19 EMERGENCY RESPONSE",
      description:
        "The Covid-19 pandemic and the lockdown stopped people from working and engaging in economic activities. Assessing the situations, we decided the best thing to do is to help by providing relief supplies.",
      image:
        "https://images.unsplash.com/photo-1584483766114-2ace6bdf2491?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "NEPAL EARTHQUAKE RELIEF",
      description:
        "Ace the Himalaya in co-operation with Sambhav Nepal participated in different earthquake relief distribution programs and is actively working to benefit the affected areas and people of Nepal.",
      image:
        "https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "COMMUNITY SUPPORT THROUGH SAMBHAV NEPAL",
      description:
        "Ace the Himalaya fully supports as well as works closely with the social organization Sambhav Nepal Foundation to enhance community projects and social activities.",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "GUIDE AND PORTER POLICY",
      description:
        "We employ only local leaders and staff to help sustain the local communities we work with. We want to create the best working conditions for our trekking staff.",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=600",
    },
  ];

  return (
    <div className="font-sans text-gray-900 bg-white">
      <div className="w-full h-[450px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1500"
          alt="Children in Nepal"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <nav className="text-sm text-blue-600 mb-10 flex items-center gap-2">
          <span className="hover:underline cursor-pointer">home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">csi</span>
        </nav>

        <div className="max-w-6xl">
          <h1 className="text-5xl font-black mb-10 tracking-tight uppercase">
            Corporate Social Initiative (CSI)
          </h1>

          <div className="space-y-8 text-[17px] leading-relaxed text-gray-700">
            <p>
              We are well aware of our Corporate Social Initiative and have
              integrated self-regulation into our business model. Our CSI policy
              functions as a built-in, self-regulating mechanism whereby we
              monitor and ensure that all our business practices adherence to
              the law, ethical standards, international norms, and of course,
              sustainability.
            </p>
            <p>
              We believe that businesses should embrace responsibility for the
              impact of their activities on the environment, consumers,
              employees, communities, and all other members of the public
              sphere. Furthermore, businesses should proactively promote the
              public interest by encouraging community growth and development.
            </p>
            <p>
              Ace the Himalaya in cooperation with{" "}
              <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                Sambhav Nepal
              </span>{" "}
              is involved in different social activities such as Child
              Sponsorship, Nepal Earthquake relief, and so on.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-20">
          {socialProjects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="overflow-hidden mb-6 bg-gray-100 aspect-[16/10]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h2 className="text-2xl font-bold mb-4 tracking-tight uppercase">
                {project.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-8 left-8 z-40 bg-white/90 p-2 shadow-lg border border-gray-100 rounded">
        <img
          src="https://www.travelife.info/logos/travelife_certified_logo.png"
          alt="Travelife"
          className="h-12"
        />
      </div>
    </div>
  );
};

export default CorporateSocialInitiative;
