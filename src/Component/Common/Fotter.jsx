import React from "react";
import { MessageCircle, CircleFadingPlus } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  const associations = [
    "https://via.placeholder.com/80x50?text=Travelife",
    "https://via.placeholder.com/80x50?text=TAAN",
    "https://via.placeholder.com/80x50?text=NMA",
    "https://via.placeholder.com/80x50?text=KEEP",
    "https://via.placeholder.com/80x50?text=PATA",
  ];

  return (
    <footer className="w-full font-sans">
      <div className="bg-[#4a3f35] py-10 px-6 text-center">
        <h3 className="text-white text-xl font-bold mb-6 tracking-widest uppercase">
          Sign up for our newsletter
        </h3>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full md:w-1/3 p-3 outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full md:w-1/3 p-3 outline-none"
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 transition-colors w-full md:w-auto">
            SUBSCRIBE
          </button>
        </div>
      </div>

      <div className="bg-[#fdf5e6] py-12 px-6 text-center border-b border-gray-200">
        <h3 className="text-gray-800 text-lg font-bold mb-8 uppercase tracking-wider">
          We're associated with
        </h3>

        <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
          {associations.map((src, index) => (
            <div
              key={index}
              className="bg-white p-2 border border-gray-200 rounded shadow-sm"
            >
              <img
                src={src}
                alt="Association"
                className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#2c3338] text-gray-300 py-16 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-1">
            <img
              src="https://via.placeholder.com/150x80?text=LOGO+HERE"
              alt="Logo"
              className="mb-4 brightness-200"
            />
            <p className="italic text-sm text-gray-400">
              Experience the difference ...
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Destinations</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Nepal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Bhutan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Tibet
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Multi Country
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">
              Main Activities
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Trekking in Nepal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Luxury Treks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Climbing and Expedition
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Mountain Biking
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Useful Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Site Map
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 opacity-70">
            <span className="text-xs uppercase">Recommended on:</span>
            <img
              src="https://via.placeholder.com/100x20?text=Tripadvisor"
              alt="Tripadvisor"
              className="h-5"
            />
            <img
              src="https://via.placeholder.com/80x20?text=Google"
              alt="Google"
              className="h-5"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm">Follow us:</span>

            <div className="flex gap-2">
              <a
                href="#"
                className="bg-blue-600 p-2 rounded-full text-white hover:scale-110 transition"
              >
                <CircleFadingPlus size={18} />
              </a>

              <a
                href="#"
                className="bg-pink-600 p-2 rounded-full text-white hover:scale-110 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="bg-red-600 p-2 rounded-full text-white hover:scale-110 transition"
              >
                <FaYoutube />
              </a>

              <a
                href="#"
                className="bg-blue-400 p-2 rounded-full text-white hover:scale-110 transition"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>

      <button className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-2xl hover:bg-blue-600 transition z-50">
        <MessageCircle size={28} />
      </button>
    </footer>
  );
};

export default Footer;
