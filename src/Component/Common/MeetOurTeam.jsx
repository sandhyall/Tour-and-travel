import React from "react";

const MeetOurTeam = () => {
  const teamMembers = [
    {
      name: "RAJENDRA NEUPANE",
      role: "Trekking Guide",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400&h=500",
    },
    {
      name: "MILAN ADHIKARI",
      role: "Trekking Guide",
      image:
        "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=400&h=500",
    },
    {
      name: "PASANG DAWA",
      role: "Trekking Guide",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400&h=500",
    },
  ];

  return (
    <div className="font-sans text-gray-900">
      <div className="w-full h-[500px] overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1500"
          alt="Annual Retreat"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <nav className="text-sm text-blue-600 mb-8">
          <span>home</span> <span className="text-gray-400 mx-2">{">"}</span>{" "}
          <span>meet our team</span>
        </nav>

        <h1 className="text-4xl font-bold mb-8">Meet Our Team</h1>

        <div className="space-y-6 text-lg leading-relaxed text-gray-700 max-w-5xl">
          <p>
            Our office staffs and leaders hail from the various regions and
            destinations that you will visit. While Ace the Himalaya's office
            staff hold the requisite experience and skill that their job
            demands, the guides are all licensed by the Ministry of Tourism,
            speak fluent English, Korean, German, Chinese, French, Russian and
            hold a high Altitude First Aid Certificate.
          </p>
          <p>
            They really enjoy what they do and express great joy in introducing
            you to favorite local places, people and the behind-the-scenes spots
            that would never otherwise be explored. As they open up, you will
            begin to learn about their own lifestyles and families.
          </p>
          <p className="font-medium">
            Our experienced and enthusiastic staff members at Ace will make sure
            that you receive the best service and attention throughout your
            stay.
          </p>
        </div>
      </div>

      {/* Team Grid Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full aspect-[4/5] overflow-hidden mb-4 bg-gray-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold tracking-tight uppercase">
                {member.name}
              </h3>
              <p className="text-gray-600 italic mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetOurTeam;
