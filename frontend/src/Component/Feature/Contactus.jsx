import React, { useState } from "react";
import axios from "../../api/axios";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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

      const res = await axios.post("/contact", formData);

      setSuccess(res.data.message || "Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative h-64 bg-gray-900 flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80')",
          }}
        />
        <h1 className="relative text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">
          Contact Us
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT SIDE (unchanged) */}
        <div className="lg:col-span-1 space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Get in Touch
          </h2>
          <p className="text-gray-600">
            Planning your next adventure in Nepal? We are here to help.
          </p>
        </div>

        {/* FORM */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 md:p-12">

          <form className="space-y-6" onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-3 border rounded-lg"
                required
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-4 py-3 border rounded-lg"
                required
              />

            </div>

            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-4 py-3 border rounded-lg"
              required
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows="5"
              className="w-full px-4 py-3 border rounded-lg"
              required
            />

            {/* STATUS */}
            {success && (
              <p className="text-green-600 font-medium">{success}</p>
            )}
            {error && (
              <p className="text-red-600 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-max px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-2"
            >
              <Send size={18} />
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Contactus;