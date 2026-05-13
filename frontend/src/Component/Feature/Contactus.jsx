import React from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contactus = () => {
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
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-8">
              Planning your next adventure in Nepal? Our team at Wales Tour and
              Travel is here to help you craft the perfect itinerary.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Our Office</h4>
                <p className="text-gray-600">Kathmandu, Nepal</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Phone Number</h4>
                <p className="text-gray-600">+977 1-XXXXXXX</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Email Address</h4>
                <p className="text-gray-600">info@walestours.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Working Hours</h4>
                <p className="text-gray-600">Sun - Fri: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder=""
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Trekking Package Inquiry"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="5"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                placeholder="Tell us about your travel plans..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full md:w-max px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
            >
              <Send size={20} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
