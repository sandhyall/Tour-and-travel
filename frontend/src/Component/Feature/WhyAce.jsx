import React, { useState } from "react";
import { ChevronDown, Play, X, Star, Shield, Globe, Users, Award, Mountain, Clock, Heart } from "lucide-react";
import ace from "../../assets/Ace.png";

const WhyAce = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const videoData = { embedUrl: "" };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  /* ── DATA ───────────────────────────────────────────────────── */

  const stats = [
    { value: "15+", label: "Years of Experience", icon: Clock },
    { value: "12,000+", label: "Happy Travelers", icon: Heart },
    { value: "4.9★", label: "Average Rating", icon: Star },
    { value: "50+", label: "Countries Served", icon: Globe },
    { value: "200+", label: "Trek Routes", icon: Mountain },
    { value: "100%", label: "Licensed & Certified", icon: Award },
  ];

  const features = [
    {
      icon: Shield,
      title: "Safety-First Approach",
      desc: "Every guide is trained in wilderness first aid, altitude sickness management, and emergency evacuation protocols. Your life is never a risk.",
      accent: "#10b981",
    },
    {
      icon: Users,
      title: "Born in the Himalayas",
      desc: "Our team isn't just experienced — they grew up on these trails. That local knowledge translates into hidden gems, authentic meals, and real connections.",
      accent: "#0b2545",
    },
    {
      icon: Globe,
      title: "Fully Customized Trips",
      desc: "No two travelers are the same. We build every itinerary from scratch around your pace, interests, fitness level, and budget — zero cookie-cutter packages.",
      accent: "#10b981",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      country: "United Kingdom",
      trek: "Everest Base Camp",
      rating: 5,
      text: "Wales Trek absolutely exceeded every expectation. The guides were phenomenal — knowledgeable, warm, and genuinely passionate about the mountains. Standing at Base Camp felt surreal, but the journey there was equally magical.",
      initials: "SM",
      color: "#0b2545",
    },
    {
      name: "Lukas Bauer",
      country: "Germany",
      trek: "Annapurna Circuit",
      rating: 5,
      text: "From the first email to the final goodbye, the team was responsive, professional, and caring. The Annapurna Circuit was breathtaking and the logistics were flawless. I will be back for Langtang next year!",
      initials: "LB",
      color: "#10b981",
    },
    {
      name: "Priya Sharma",
      country: "India",
      trek: "Bhutan Cultural Tour",
      rating: 5,
      text: "Bhutan with Wales Trek was life-changing. The cultural insights our guide shared were deep and authentic — this wasn't a tourist experience, it was a genuine cultural immersion. Highly recommend to everyone.",
      initials: "PS",
      color: "#2c3338",
    },
  ];

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

      {/* ══════════════════════════════════════════════════════════
          HERO — UNCHANGED
      ══════════════════════════════════════════════════════════ */}
      <div className="relative h-[75vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-black">
        <img
          src={ace}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Wales Trek and Travel"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-20 text-center px-6 max-w-5xl">
          <p className="uppercase tracking-[0.35em] text-emerald-500 text-sm font-bold mb-6">
            Why Choose Wales Trek and Travel
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
            Explore The Himalayas <br />
            With Confidence
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 font-light leading-relaxed mb-12 max-w-4xl mx-auto">
            "Wales Trek and Travel was founded with a passion for sharing the beauty, culture, and adventure of the Himalayas while creating meaningful and unforgettable travel experiences."
          </p>
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="group inline-flex items-center gap-4 bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl hover:scale-105"
          >
            <span className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play size={18} fill="white" />
            </span>
            Watch Our Story
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          VIDEO MODAL — UNCHANGED
      ══════════════════════════════════════════════════════════ */}
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
            />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          ★ NEW: STATS BAR
      ══════════════════════════════════════════════════════════ */}
      <div className="bg-[#0b2545] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map(({ value, label, icon: Icon }, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-2 group"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center mb-1 group-hover:bg-emerald-500/30 transition-colors duration-300">
                <Icon size={18} className="text-emerald-400" />
              </div>
              <span className="text-2xl md:text-3xl font-black text-white leading-none">
                {value}
              </span>
              <span className="text-xs text-blue-200/70 leading-tight font-medium uppercase tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          CONTENT SECTION
      ══════════════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto py-24 px-6">

        {/* HEADER — UNCHANGED */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div className="max-w-3xl">
            <p className="uppercase tracking-[0.25em] text-sm text-emerald-500 font-bold mb-5">
              Trusted Himalayan Specialists
            </p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-none mb-6">
              Why Travelers <br />
              Choose Us
            </h2>
            <div className="w-24 h-1 bg-emerald-500 rounded-full mb-8" />
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover why thousands of travelers from around the world trust Wales Trek and Travel for unforgettable Himalayan trekking and adventure experiences.
            </p>
          </div>
          <button
            onClick={() => setOpenIndex(null)}
            className="border-2 border-black px-8 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 text-xs whitespace-nowrap"
          >
            Collapse All
          </button>
        </div>

        {/* ══════════════════════════════════════════════════════
            ★ NEW: WHAT SETS US APART — 3 feature cards
        ══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map(({ icon: Icon, title, desc, accent }, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* accent strip */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                style={{ backgroundColor: accent }}
              />
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: accent + "18" }}
              >
                <Icon size={22} style={{ color: accent }} />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3 leading-snug">
                {title}
              </h3>
              <p className="text-sm text-gray-500 leading-7">{desc}</p>
            </div>
          ))}
        </div>

        {/* ACCORDION — UNCHANGED */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          {reasons.map((reason, index) => (
            <div key={index} className="border-b border-gray-100 last:border-b-0">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between px-8 md:px-12 py-8 text-left group transition-all"
              >
                <div className="flex items-center gap-6 md:gap-10">
                  <span className="text-4xl md:text-5xl font-black text-gray-200 group-hover:text-emerald-500 transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-xl md:text-3xl font-semibold transition-all duration-300 ${
                      openIndex === index ? "text-emerald-600 translate-x-2" : "text-gray-800"
                    }`}
                  >
                    {reason.title}
                  </span>
                </div>
                <div className={`transition-transform duration-500 ${openIndex === index ? "rotate-180" : ""}`}>
                  <ChevronDown
                    size={30}
                    strokeWidth={1.8}
                    className={openIndex === index ? "text-emerald-600" : "text-gray-400"}
                  />
                </div>
              </button>
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-24 md:pl-36 pr-10 md:pr-16 pb-10 text-gray-600 text-lg leading-9">
                  {reason.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════
            ★ NEW: TRAVELER REVIEWS
        ══════════════════════════════════════════════════════ */}
        <div className="mt-24">
          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.25em] text-sm text-emerald-500 font-bold mb-4">
              Real Experiences
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-5">
              What Our Travelers Say
            </h2>
            <div className="w-16 h-1 bg-emerald-500 rounded-full mx-auto mb-6" />
            <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
              Thousands of adventurers have trusted us with their dream Himalayan journey. Here's what a few of them had to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, country, trek, rating, text, initials, color }, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col gap-5"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-600 text-sm leading-7 flex-1">
                  "{text}"
                </p>

                {/* Trek badge */}
                <div
                  className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full self-start"
                  style={{ backgroundColor: color + "15", color }}
                >
                  <Mountain size={11} />
                  {trek}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm leading-tight">{name}</p>
                    <p className="text-xs text-gray-400">{country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rating summary strip */}
          <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl font-black text-gray-900 leading-none">4.9</div>
              <div>
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-500 font-medium">Average across all platforms</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
              {[
                { platform: "TripAdvisor", reviews: "1,200+" },
                { platform: "Google", reviews: "850+" },
                { platform: "Trustpilot", reviews: "430+" },
              ].map(({ platform, reviews }) => (
                <div key={platform} className="text-center px-5 py-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="font-black text-gray-900 text-sm">{reviews}</p>
                  <p className="text-xs text-gray-400">{platform}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM CTA — UNCHANGED */}
        <div className="mt-24 bg-[#2c3338] rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
          <p className="uppercase tracking-[0.25em] text-sm text-emerald-500 font-bold mb-5">
            Begin Your Adventure
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Discover The Magic Of The Himalayas
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-9 mb-10">
            Whether you dream of trekking to Everest Base Camp, exploring ancient Himalayan cultures, or experiencing luxury mountain adventures, Wales Trek and Travel is here to make your journey extraordinary.
          </p>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-10 py-5 rounded-2xl transition-all duration-300 shadow-lg hover:scale-105 uppercase tracking-[0.15em] text-sm">
            Plan Your Trip
          </button>
        </div>

      </div>
    </div>
  );
};

export default WhyAce;