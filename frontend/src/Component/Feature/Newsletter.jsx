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
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight uppercase">
          Sign Up For Newsletter
        </h2>

        <p className="text-gray-200 text-lg mb-8 max-w-3xl">
          Sign up today and subscribe to our newsletter for monthly giveaways,
          engaging stories, special offers & more!
        </p>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-white text-gray-900 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-white text-gray-900 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>

          {success && <p className="text-green-400 text-sm">{success}</p>}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-40 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 transition-colors duration-300 uppercase tracking-wide flex items-center justify-center gap-2"
          >
            <Mail size={18} />
            {loading ? "Sending..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
