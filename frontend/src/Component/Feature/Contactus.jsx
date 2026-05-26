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

      setSuccess(res.data.message);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Failed to send message");
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
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Planning your next adventure in Nepal? Contact Wales Travel today.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <Mail className="text-blue-600" />

              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-gray-600">info@walestravel.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="text-blue-600" />

              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-gray-600">+977 9800000000</p>
              </div>
            </div>

            <div className="flex gap-4">
              <MapPin className="text-blue-600" />

              <div>
                <h4 className="font-semibold">Location</h4>
                <p className="text-gray-600">Kathmandu, Nepal</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="text-blue-600" />

              <div>
                <h4 className="font-semibold">Working Hours</h4>
                <p className="text-gray-600">Sun - Fri : 9AM - 6PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows="6"
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {success && (
              <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-all"
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
