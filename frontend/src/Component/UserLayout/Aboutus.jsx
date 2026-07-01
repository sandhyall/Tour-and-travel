import React, { useEffect, useRef, useState } from "react";
import about from "../../assets/about.webp";
import photo5 from "../../assets/photo5.webp";
import photo4 from "../../assets/photo4.webp";
import photo3 from "../../assets/photo3.webp";
import photo2 from "../../assets/photo2.webp";


const Counter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const numeric = parseInt(target.replace(/\D/g, ""), 10);
          const duration = 1800;
          const steps = 60;
          const increment = numeric / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= numeric) {
              setCount(numeric);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};


const Aboutus = () => {
  const stats = [
    { value: "15", suffix: "+", label: "Years Experience", desc: "Crafting Himalayan adventures trusted by explorers worldwide." },
    { value: "5000", suffix: "+", label: "Happy Travelers", desc: "Guests from every continent who've journeyed with us." },
    { value: "97", suffix: "%", label: "Trek Success Rate", desc: "Achieved through expert planning and rigorous safety standards." },
    { value: "24", suffix: "/7", label: "Customer Support", desc: "Round-the-clock assistance before, during, and after every trip." },
  ];

  const values = [
    {
      icon: "🤝",
      title: "Customer First",
      desc: "Every decision we make centers on your safety, comfort, and satisfaction — from first contact to final farewell.",
    },
    {
      icon: "🌿",
      title: "Sustainable Tourism",
      desc: "We champion responsible travel that protects the Himalayas and uplifts the local communities we call home.",
    },
    {
      icon: "🏅",
      title: "Trust & Professionalism",
      desc: "Transparency, honesty, and world-class standards define every interaction and every expedition we lead.",
    },
  ];

  const milestones = [
    { year: "2009", event: "Founded in Kathmandu with a team of 3 passionate guides." },
    { year: "2013", event: "Expanded to Bhutan & Tibet routes; reached 500 happy trekkers." },
    { year: "2017", event: "Launched luxury expedition packages and helicopter tours." },
    { year: "2021", event: "Certified eco-friendly operator; 3,000+ lifetime guests served." },
    { year: "2024", event: "Recognized among Nepal's top 10 trekking companies." },
  ];

  return (
    <div className="bg-[#faf8f3] text-gray-900 font-sans">

    
      <div className="relative w-full h-[420px] md:h-[640px] overflow-hidden">
        <img
         src={about}
alt="Himalayan mountain panorama"
          className="w-full h-full object-cover scale-105"
          style={{ animation: "slowZoom 14s ease-in-out infinite alternate" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

      
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#faf8f3]"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />

        <div className="absolute bottom-20 left-6 md:left-16 max-w-3xl">
          <p className="uppercase tracking-[0.35em] text-emerald-400 text-xs font-bold mb-4">
            Our Story
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            About Wales Trek <br className="hidden md:block" />& Travel
          </h1>
          <p className="mt-5 text-base md:text-xl text-gray-200 leading-relaxed max-w-xl">
            Nepal's premier Himalayan adventure company — built on passion,
            trust, and a love for the mountains.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">

      
        <nav className="text-sm text-gray-500 mb-10">
          <span className="hover:text-[#f1b400] cursor-pointer transition-colors">Home</span>
          <span className="mx-3 text-gray-300">{">"}</span>
          <span className="text-emerald-500 font-semibold">About Us</span>
        </nav>

       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-28">

          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-emerald-500 font-bold mb-4">
              Who We Are
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
              Nepal's Trusted Himalayan Adventure Company
            </h2>
            <div className="w-24 h-1 bg-emerald-500 rounded-full mb-8" />

            <div className="space-y-5 text-base md:text-lg leading-8 md:leading-9 text-gray-700">
              <p>
                <span className="font-bold text-black">Wales Trek and Travel</span> is a
                premier adventure travel company based in Nepal, specialising in trekking,
                mountain expeditions, cultural journeys, luxury holidays, peak climbing,
                rafting, jungle safaris, helicopter tours, and tailor-made Himalayan adventures.
              </p>
              <p>
                Founded by passionate tourism professionals and experienced Himalayan guides,
                our company was built around one simple vision — to provide travelers with
                authentic, safe, and life-changing experiences in the heart of the Himalayas.
              </p>
              <p>
                We proudly operate across{" "}
                <span className="font-bold text-black">Nepal</span>,{" "}
                <span className="font-bold text-black">Bhutan</span>, and{" "}
                <span className="font-bold text-black">Tibet</span>, offering carefully
                designed adventures that blend breathtaking landscapes with cultural
                immersion and personalised service.
              </p>
            </div>
          </div>

          <div className="relative h-[380px] md:h-[520px]">
            <img
              src={photo5}
              alt="Everest Base Camp Trek"
              className="absolute top-0 left-0 w-[72%] h-[75%] object-cover rounded-3xl shadow-2xl"
            />
            <img
              src={photo4}
              alt="Nepal mountains"
              className="absolute bottom-0 right-0 w-[58%] h-[55%] object-cover rounded-3xl shadow-2xl border-4 border-[#faf8f3]"
            />
           
            <div className="absolute top-[38%] right-[28%] bg-emerald-500 text-white rounded-2xl px-4 py-3 shadow-xl text-center">
              <p className="text-2xl font-black leading-none">15+</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide mt-1 leading-tight">Years<br />of Trust</p>
            </div>
          </div>
        </div>

       
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-28">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-4xl md:text-5xl font-black text-emerald-500 mb-2">
                <Counter target={s.value} suffix={s.suffix} />
              </h3>
              <p className="text-base md:text-lg font-bold text-gray-900 mb-2">{s.label}</p>
              <p className="text-gray-500 text-sm leading-relaxed hidden md:block">{s.desc}</p>
            </div>
          ))}
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-28">

       
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <p className="uppercase tracking-[0.25em] text-xs text-emerald-500 font-bold mb-4">
              Our Story
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 leading-tight">
              The Journey of Wales Trek and Travel
            </h2>
            <div className="space-y-6 text-base md:text-lg leading-8 md:leading-9 text-gray-700">
              <p>
                Wales Trek and Travel began with a deep passion for the mountains, people,
                and culture of Nepal. What started as a small local trekking company has
                grown into a trusted Himalayan travel brand serving adventurers across the globe.
              </p>
              <p>
                Our founders spent years exploring remote Himalayan trails, guiding trekkers
                through breathtaking mountain landscapes, and learning what travelers truly
                seek. Through this, they realised travel should be exciting, meaningful,
                safe, and responsible.
              </p>
              <p>
                Today, we combine local expertise with international standards — ensuring
                every traveler enjoys authentic experiences, professional service, and
                unforgettable memories in the Himalayas.
              </p>
            </div>
          </div>

       
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-emerald-500 font-bold mb-4">
              Milestones
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10 leading-tight">
              How We Grew
            </h2>

            <div className="relative pl-8 border-l-2 border-emerald-200 space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className="relative group">
                  {/* Dot */}
                  <div className="absolute -left-[2.15rem] top-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-[#faf8f3] group-hover:scale-125 transition-transform duration-300" />
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-1">
                    {m.year}
                  </p>
                  <p className="text-gray-700 leading-7">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

       
        <div className="relative rounded-3xl overflow-hidden mb-28">
        
          <img
            src={photo3}
            alt="Himalayan peaks"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1f2937]/95 via-[#1f2937]/80 to-emerald-700/80" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 text-white">
            {/* Vision */}
            <div className="p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-white/10">
              <p className="uppercase tracking-[0.2em] text-emerald-400 text-xs font-bold mb-4">
                Our Vision
              </p>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                Inspiring Responsible Himalayan Travel
              </h2>
              <p className="text-base md:text-lg leading-8 text-gray-300">
                To become the world's most trusted Himalayan travel brand — delivering
                authentic, sustainable, and transformative experiences that connect people
                with the natural beauty, culture, and spirit of Nepal, Bhutan, and Tibet.
              </p>
              <p className="text-base md:text-lg leading-8 text-gray-300 mt-5">
                We envision a future where responsible travel lifts local communities and
                preserves the fragile mountain environments we love.
              </p>
            </div>

            {/* Mission */}
            <div className="p-10 md:p-14">
              <p className="uppercase tracking-[0.2em] text-emerald-400 text-xs font-bold mb-4">
                Our Mission
              </p>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                Delivering Extraordinary Adventures
              </h2>
              <p className="text-base md:text-lg leading-8 text-gray-300">
                To provide world-class trekking and travel experiences with the highest
                standards of safety, service, professionalism, and sustainability.
              </p>
              <p className="text-base md:text-lg leading-8 text-gray-300 mt-5">
                We are committed to personalised journeys, eco-friendly tourism, supporting
                local economies, and ensuring every traveler leaves the Himalayas with
                memories that last a lifetime.
              </p>
            </div>
          </div>
        </div>

   
        <div className="mb-28">
          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.25em] text-xs text-emerald-500 font-bold mb-4">
              Our Core Values
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900">
              What Matters to Us
            </h2>
            <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="group bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#f1b400]/15 flex items-center justify-center mb-6">
                  <span className="text-2xl">{v.icon}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">{v.title}</h3>
                <div className="w-12 h-1 bg-emerald-500 rounded-full mb-5 group-hover:w-20 transition-all duration-500" />
                <p className="text-gray-600 leading-8">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

   
        <div className="mb-28">
  <p className="uppercase tracking-[0.25em] text-xs text-emerald-500 font-bold mb-4 text-center">
    Our Adventures
  </p>

  <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-10">
    Captured Moments
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
  {[
    { src: photo2, alt: "Himalayan peaks panorama" },
    { src: photo5, alt: "Trekking trail Nepal" },
    { src: photo4, alt: "Mountain valley Nepal" },
    { src: photo3, alt: "Nepal mountain landscape with greenery" },
  ].map(({ src, alt }, i) => (
    <div
      key={i}
      className="overflow-hidden rounded-2xl aspect-square shadow-md group"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
    </div>
  ))}
</div>
</div>

      
        <div className="bg-[#2c3338] rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
          <p className="uppercase tracking-[0.25em] text-xs text-emerald-500 font-bold mb-4">
            Start Your Adventure
          </p>
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            Explore The Himalayas With Us
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-gray-300 leading-8 md:leading-9 mb-10">
            Let the experienced team at Wales Trek and Travel guide you through
            breathtaking mountains, vibrant cultures, and hidden wonders of Nepal, Bhutan, and Tibet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = "/contact-us"}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:scale-105"
            >
              Contact Our Team
            </button>
           
          </div>
        </div>

      </div>

    
      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1.05); }
          to   { transform: scale(1.12); }
        }
      `}</style>

    </div>
  );
};

export default Aboutus;