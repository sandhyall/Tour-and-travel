import React, { useState } from "react";
import { User, Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import newlogo from "../../assets/logo-removebg-preview.png";
import footer from "../../assets/footer.png";

/* ── Data ─────────────────────────────────────────────────────────── */
const companyLinks = [
  { label: "About Us", path: "/about-us" },
  { label: "Meet Our Team", path: "/meet-our-team" },
  { label: "Why Wales", path: "/why-ace" },
  { label: "Contact Us", path: "/contact-us" },
];

const destinationLinks = [
  { label: "Nepal", path: "/feature/nepal" },
  { label: "Bhutan", path: "/feature/bhutan" },
  { label: "Tibet", path: "/feature/tibet" },
  { label: "Multi Country", path: "/feature/multi-country" },
];

const trekLinks = [
  { label: "Everest Base Camp" },
  { label: "Annapurna Circuit" },
  { label: "Langtang Valley" },
  { label: "Manaslu Circuit" },
  { label: "Peak Climbing" },
];

const socialLinks = [
  { Icon: FaFacebookF, href: "https://www.facebook.com/walestrektravelnepal", label: "Facebook", color: "#1877F2" },
  { Icon: FaInstagram, href: "https://www.instagram.com/walestrektravelnepal", label: "Instagram", color: "#E1306C" },
  { Icon: FaYoutube, href: "https://www.youtube.com/@walestrektravelnepal", label: "YouTube", color: "#FF0000" },
  { Icon: FaTwitter, href: "https://twitter.com/walestrektravelnepal", label: "Twitter / X", color: "#1DA1F2" },
];

/* ── Footer Component ─────────────────────────────────────────────── */
const Footer = () => {
  const [newsletter, setNewsletter] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setNewsletter({ ...newsletter, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setSuccess("");
      setError("");
      const res = await axios.post("/contact", {
        name: newsletter.name,
        email: newsletter.email,
        subject: "Newsletter Subscription",
        message: `${newsletter.name} subscribed to newsletter.`,
      });
      setSuccess("Subscribed successfully!");
      setNewsletter({ name: "", email: "" });
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setError("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full font-sans">

      {/* ── NEWSLETTER BANNER ─────────────────────────────────────── */}
      <div className="relative bg-[#0b2545] overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-emerald-500/8 blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

            {/* Left: text */}
            <div className="text-center lg:text-left max-w-md">
              <p className="uppercase tracking-[0.3em] text-emerald-400 text-xs font-bold mb-3">
                Stay Updated
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-blue-200/80 text-sm leading-7">
                Get exclusive deals, trekking tips, destination guides, and the
                latest news from the Himalayas delivered to your inbox.
              </p>
            </div>

            {/* Right: form */}
            <div className="w-full lg:w-auto lg:min-w-[520px]">
              {success ? (
                <div className="flex items-center gap-4 bg-emerald-500/15 border border-emerald-400/30 rounded-2xl px-6 py-5">
                  <CheckCircle2 size={28} className="text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-white font-bold">You're subscribed!</p>
                    <p className="text-emerald-300/80 text-sm mt-0.5">
                      Thank you for joining our community. 🏔️
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-xl px-4 py-3 flex-1 focus-within:border-emerald-400 focus-within:bg-white/15 transition-all duration-200">
                      <User size={15} className="text-blue-300 flex-shrink-0" />
                      <input
                        type="text"
                        name="name"
                        value={newsletter.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="bg-transparent outline-none text-white placeholder-blue-300/60 text-sm w-full"
                        required
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-xl px-4 py-3 flex-1 focus-within:border-emerald-400 focus-within:bg-white/15 transition-all duration-200">
                      <Mail size={15} className="text-blue-300 flex-shrink-0" />
                      <input
                        type="email"
                        name="email"
                        value={newsletter.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="bg-transparent outline-none text-white placeholder-blue-300/60 text-sm w-full"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-700 disabled:cursor-not-allowed text-white font-bold px-7 py-3 rounded-xl transition-all duration-200 hover:scale-105 disabled:scale-100 whitespace-nowrap text-sm shadow-lg shadow-emerald-900/30"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send size={15} />
                      )}
                      {loading ? "Sending…" : "Subscribe"}
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-300 text-xs mt-3 ml-1">{error}</p>
                  )}
                  <p className="text-blue-300/50 text-xs mt-3 ml-1">
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── SCENIC IMAGE ──────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        <img
        src={footer}
        alt="Mountain landscape"
        className="w-full h-auto block object-cover"
      />
        <div className="absolute inset-0 pointer-events-none" />
      </div>

      {/* ── MAIN COLUMNS ──────────────────────────────────────────── */}
     <div className="bg-white text-gray-600 pt-10 pb-6 px-6">
  <div className="max-w-7xl mx-auto">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-7 mb-8">

      {/* Col 1 — Brand */}
      <div className="sm:col-span-2 lg:col-span-2 space-y-4">
        <img src={newlogo} alt="Wales Trek and Travel" className="h-14 w-auto" />

        <p className="text-sm leading-6 text-gray-500 max-w-xs">
          Nepal's premier adventure travel company — crafting authentic,
          safe, and unforgettable Himalayan journeys since 2009.
        </p>

        {/* Contact quick-info */}
        <div className="space-y-2">
          <a
            href="mailto:info@walestravel.com"
            className="flex items-center gap-3 text-sm text-gray-500 hover:text-emerald-600 transition-colors duration-200 group"
          >
            <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-emerald-50 flex items-center justify-center">
              <Mail size={13} className="text-emerald-500" />
            </div>
            info@walestravel.com
          </a>

          <a
            href="tel:+9779851233710"
            className="flex items-center gap-3 text-sm text-gray-500 hover:text-emerald-600 transition-colors duration-200 group"
          >
            <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-emerald-50 flex items-center justify-center">
              <Phone size={13} className="text-emerald-500" />
            </div>
            +977 9851 233 710
          </a>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
              <MapPin size={13} className="text-emerald-500" />
            </div>
            Thamel, Kathmandu, Nepal
          </div>
        </div>
      </div>

      {/* Col 2 */}
      <div>
        <h4 className="text-gray-900 font-bold mb-4 text-xs uppercase tracking-[0.2em]">
          Destinations
        </h4>

        <ul className="space-y-2.5">
          {destinationLinks.map(({ label, path }) => (
            <li key={label}>
              <Link className="text-sm text-gray-500 hover:text-emerald-500">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Col 3 */}
      <div>
        <h4 className="text-gray-900 font-bold mb-4 text-xs uppercase tracking-[0.2em]">
          Popular Treks
        </h4>

        <ul className="space-y-2.5">
          {trekLinks.map(({ label }) => (
            <li key={label} className="text-sm text-gray-500">
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* Col 4 — Company + Follow Us (NOW COMBINED) */}
      <div>
        <h4 className="text-gray-900 font-bold mb-4 text-xs uppercase tracking-[0.2em]">
          Company
        </h4>

        <ul className="space-y-2.5 mb-6">
  {companyLinks.map(({ label, path }) => (
    <li key={label}>
      <Link
        to={path}
        className="text-sm text-gray-500 hover:text-emerald-500"
      >
        {label}
      </Link>
    </li>
  ))}
</ul>

        {/* Follow Us moved here */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">
            Follow Us
          </p>

          <div className="flex gap-2.5 flex-wrap">
            {socialLinks.map(({ Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "";
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

    </div>

    {/* Divider */}
    <div className="border-t border-gray-100 pt-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">

        <p className="text-gray-400 text-sm text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="text-gray-600 font-semibold">
            Wales Trek and Travel
          </span>
          . All rights reserved.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
          {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(/ /g, "-")}`}
              className="hover:text-emerald-500"
            >
              {item}
            </Link>
          ))}
        </div>

      </div>
    </div>

  </div>
</div>

    </footer>
  );
};

export default Footer;