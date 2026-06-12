import React, { useState, useRef } from "react";
import axios from "../../api/axios";
import { Mail, Phone, MapPin, Clock, Send, ChevronDown, MessageCircle, CheckCircle2 } from "lucide-react";

/* ── Trip type options ──────────────────────────────────────────── */
const TRIP_TYPES = [
  "Everest Base Camp Trek",
  "Annapurna Circuit",
  "Langtang Valley Trek",
  "Manaslu Circuit",
  "Peak Climbing Expedition",
  "Cultural Tour – Kathmandu",
  "Bhutan Tour",
  "Tibet Tour",
  "Helicopter Tour",
  "Custom / Other",
];

/* ── Contact info cards ─────────────────────────────────────────── */
const INFO_CARDS = [
  {
    icon: <Mail size={22} />,
    label: "Email Us",
    value: "travelswales@gmail.com",
    sub: "We reply within 24 hours",
    href: "mailto:travelswales@gmail.com",
    color: "from-emerald-400/20 to-emerald-600/10",
    accent: "text-emerald-500",
  },
  {
    icon: <Phone size={22} />,
    label: "Call Us",
    value: "+977 970-3745286",
    sub: "Available 9 AM – 6 PM (NST)",
    href: "tel:+9779703745286",
    color: "from-amber-400/20 to-amber-600/10",
    accent: "text-[#f1b400]",
  },
  {
    icon: <MapPin size={22} />,
    label: "Visit Us",
    value: "Kathmandu, Nepal",
    sub: "Thamel, Main Tourism Hub",
    href: "https://maps.google.com/?q=Thamel,Kathmandu,Nepal",
    color: "from-sky-400/20 to-sky-600/10",
    accent: "text-sky-500",
  },
  {
    icon: <Clock size={22} />,
    label: "Working Hours",
    value: "Sun – Fri: 9AM – 6PM",
    sub: "Sat by appointment",
    href: null,
    color: "from-violet-400/20 to-violet-600/10",
    accent: "text-violet-400",
  },
];

/* ── FAQ data ───────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "How far in advance should I book a trek?",
    a: "We recommend booking at least 4–6 weeks in advance for popular routes like EBC or Annapurna Circuit, especially during peak seasons (March–May and Sept–Nov).",
  },
  {
    q: "Do I need travel insurance for trekking?",
    a: "Yes, travel insurance that covers high-altitude trekking and emergency evacuation is mandatory. We can recommend trusted providers if needed.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We offer a full refund up to 30 days before departure. Cancellations within 30–15 days receive a 50% refund. Within 14 days, deposits are non-refundable.",
  },
  {
    q: "Can you organise custom private treks?",
    a: "Absolutely! Tailor-made itineraries are one of our specialties. Just fill out the form with your preferences and our team will craft a personalized plan.",
  },
];

/* ── FAQ Accordion ──────────────────────────────────────────────── */
const FAQ = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="font-semibold text-gray-900 pr-4">{q}</span>
        <ChevronDown
          size={18}
          className={`text-emerald-500 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0px" }}
      >
        <p className="px-6 pb-5 text-gray-600 leading-7 bg-white">{a}</p>
      </div>
    </div>
  );
};

/* ── Main Component ─────────────────────────────────────────────── */
const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    tripType: "",
    travelers: "1",
    month: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const res = await axios.post("/contact", formData);
      setSuccess(res.data.message);
      setFormData({ name: "", email: "", subject: "", message: "", tripType: "", travelers: "1", month: "" });
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3.5 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 ${
      focusedField === field
        ? "border-emerald-500 bg-white shadow-[0_0_0_4px_rgba(16,185,129,0.08)]"
        : "border-gray-100 hover:border-gray-200"
    }`;

  return (
    <div className="bg-[#faf8f3] min-h-screen font-sans">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <div className="relative w-full h-[380px] md:h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600"
          alt="Nepal mountains"
          className="w-full h-full object-cover"
          style={{ animation: "slowZoom 14s ease-in-out infinite alternate" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#faf8f3]"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />

        <div className="absolute bottom-16 left-6 md:left-16 max-w-2xl">
          <p className="uppercase tracking-[0.35em] text-emerald-400 text-xs font-bold mb-4">
            Reach Out
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Contact Us
          </h1>
          <p className="mt-4 text-base md:text-xl text-gray-200 leading-relaxed">
            Let's plan your perfect Himalayan adventure together.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-12">
          <span className="hover:text-[#f1b400] cursor-pointer transition-colors">Home</span>
          <span className="mx-3 text-gray-300">{">"}</span>
          <span className="text-emerald-500 font-semibold">Contact Us</span>
        </nav>

        {/* ── INFO CARDS ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {INFO_CARDS.map((card, i) => (
            <a
              key={i}
              href={card.href || undefined}
              target={card.href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={`group bg-white rounded-3xl p-7 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${card.href ? "cursor-pointer" : "cursor-default"}`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-5 ${card.accent}`}>
                {card.icon}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{card.label}</p>
              <p className={`font-bold text-gray-900 text-base mb-1 group-hover:${card.accent} transition-colors duration-200`}>
                {card.value}
              </p>
              <p className="text-gray-500 text-sm">{card.sub}</p>
            </a>
          ))}
        </div>

        {/* ── FORM + SIDEBAR ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">

          {/* Left sidebar */}
          <div className="space-y-8">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs text-emerald-500 font-bold mb-4">
                Wales Trek & Travel
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">
                Plan Your Adventure With Us
              </h2>
              <div className="w-16 h-1 bg-emerald-500 rounded-full mb-6" />
              <p className="text-gray-600 leading-7">
                Whether you're dreaming of Everest Base Camp, a Bhutan cultural tour, or a custom Himalayan expedition — our expert team is here to make it happen.
              </p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/9779703745286"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-5 hover:bg-[#25D366]/15 transition-colors duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Chat on WhatsApp</p>
                <p className="text-gray-500 text-xs mt-0.5">Instant replies from our team</p>
              </div>
            </a>

            {/* Map embed */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-52 md:h-64">
              <iframe
                title="Wales Trek Kathmandu"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.827!2d85.3096!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb77fd4bd%3A0x58099b1e01c79b95!2sThamel%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2snp!4v1700000000000"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* ── FORM ───────────────────────────────────────────────── */}
          <div className="lg:col-span-2" ref={formRef}>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">

              {success ? (
                /* ── SUCCESS STATE ──────────────────────────────────── */
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">Message Sent!</h3>
                  <p className="text-gray-600 leading-7 max-w-sm mx-auto mb-8">{success}</p>
                  <button
                    onClick={() => setSuccess("")}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-2xl transition-all duration-200 hover:scale-105"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* ── FORM FIELDS ────────────────────────────────────── */
                <form onSubmit={handleSubmit} className="space-y-6">
  <div>
    <h3 className="text-xl font-black text-gray-900 mb-5">
      Contact Details
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Full Name *
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocusedField("name")}
          onBlur={() => setFocusedField(null)}
          placeholder="John Doe"
          className={inputClass("name")}
          required
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Email Address *
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
          placeholder="john@example.com"
          className={inputClass("email")}
          required
        />
      </div>
    </div>
  </div>

  <div className="border-t border-gray-100 pt-6">
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
        Subject *
      </label>

      <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        onFocus={() => setFocusedField("subject")}
        onBlur={() => setFocusedField(null)}
        placeholder="How can we help you?"
        className={inputClass("subject")}
        required
      />
    </div>
  </div>

  <div className="border-t border-gray-100 pt-6">
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
        Message *
      </label>

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        onFocus={() => setFocusedField("message")}
        onBlur={() => setFocusedField(null)}
        placeholder="Tell us about your travel plans or enquiry..."
        rows={6}
        className={inputClass("message")}
        required
      />

      <p className="text-right text-xs text-gray-400 mt-1.5">
        {formData.message.length} / 1000
      </p>
    </div>
  </div>

  {error && (
    <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm">
      {error}
    </div>
  )}

  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
    <p className="text-gray-400 text-xs leading-5 max-w-md">
      Your information is kept secure and used only to respond to your enquiry.
    </p>

    <button
      type="submit"
      disabled={loading}
      className="w-full sm:w-auto flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:scale-105 disabled:scale-100"
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send size={18} />
          Send Message
        </>
      )}
    </button>
  </div>
</form>
              )}
            </div>
          </div>
        </div>

        {/* ── FAQ ─────────────────────────────────────────────────── */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.25em] text-xs text-emerald-500 font-bold mb-4">Have Questions?</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-emerald-500 rounded-full mx-auto mt-6" />
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, i) => <FAQ key={i} {...faq} />)}
          </div>
        </div>

        {/* ── BOTTOM CTA ──────────────────────────────────────────── */}
        <div className="bg-[#2c3338] rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
          <p className="uppercase tracking-[0.25em] text-xs text-emerald-500 font-bold mb-4">Ready to Explore?</p>
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            Your Himalayan Adventure Awaits
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-300 leading-8 mb-10">
            From Everest Base Camp to the hidden valleys of Bhutan — our expert team is ready to craft the journey of a lifetime.
          </p>
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:scale-105"
          >
            Start Planning Now
          </button>
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

export default Contactus;