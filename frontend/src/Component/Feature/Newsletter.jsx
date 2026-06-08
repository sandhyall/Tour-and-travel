import React, { useState } from "react";
import { Mail } from "lucide-react";
import axios from "../../api/axios";

const Newsletter = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await axios.post("/contact", {
        name: formData.name,
        email: formData.email,
        subject: "Newsletter Subscription",
        message: `${formData.name} subscribed to newsletter`,
      });

      setSuccess(res.data.message || "Subscribed successfully!");

      setFormData({
        name: "",
        email: "",
      });
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full py-16 px-6 bg-gray-900 overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/80"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/30">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-green-300 mb-3">
            Exclusive travel updates
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">
            Join our travel newsletter
          </h2>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto">
            Get curated trip ideas, insider discounts, and destination stories
            delivered straight to your inbox every month.
          </p>
        </div>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-5 py-4 bg-white/95 text-gray-900 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              className="w-full px-5 py-4 bg-white/95 text-gray-900 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-300">
              No spam. Only curated travel inspiration and exclusive offers.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-400 text-white font-semibold px-7 py-3 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Mail size={18} />
              {loading ? "Sending..." : "Subscribe Now"}
            </button>
          </div>

          {success && <p className="text-green-300 text-sm">{success}</p>}
          {error && <p className="text-red-300 text-sm">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
