import React from "react";
import { MessageCircle, CircleFadingPlus } from "lucide-react";
import { FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import logo from "../../assets/logo.png"

const Footer = () => {
  // via.placeholder.com बन्द भएकोले placehold.co मा चेन्ज गरिएको छ
  // भोलि ब्याकइन्डबाट आउँदा यी लिङ्कहरू सिधै डेटाबेसको इमेज युआरएलसँग रिप्लेस हुन्छन्
  const associations = [
    "https://placehold.co/80x50?text=Travelife",
    "https://placehold.co/80x50?text=TAAN",
    "https://placehold.co/80x50?text=NMA",
    "https://placehold.co/80x50?text=KEEP",
    "https://placehold.co/80x50?text=PATA",
  ];

  return (
    <footer className="w-full font-sans">
      {/* Newsletter Section */}
      <div className="bg-[#4a3f35] py-10 px-6 text-center">
        <h3 className="text-white text-xl font-bold mb-6 tracking-widest uppercase">
          Sign up for our newsletter
        </h3>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full md:w-1/3 p-3 outline-none rounded-sm"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full md:w-1/3 p-3 outline-none rounded-sm"
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 transition-colors w-full md:w-auto rounded-sm">
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* Associations Section */}
      <div className="bg-[#fdf5e6] py-12 px-6 text-center border-b border-gray-200">
        <h3 className="text-gray-800 text-lg font-bold mb-8 uppercase tracking-wider">
          We're associated with
        </h3>

        <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
          {associations.map((src, index) => (
            <div
              key={index}
              className="bg-white p-2 border border-gray-200 rounded shadow-sm flex items-center justify-center"
            >
              <img
                src={src}
                alt="Association Logo"
                className="h-12 w-auto grayscale hover:grayscale-0 transition-all object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="bg-[#2c3338] text-gray-300 py-16 px-10">
        {/* grid col-cols-1 देखि ठूला स्क्रिनमा ५ वटा कोलम हुने गरी मिलाइएको छ */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          
          {/* Logo & Slogan (यसलाई अझै राम्रो बनाइएको छ) */}
          <div className="flex flex-col items-start lg:col-span-1">
            <a href="/" className="mb-4 inline-block">
              <img
                src={logo}
                alt="Company Logo"
                className="h-14 md:h-16 w-auto object-contain max-w-full" 
                // brightness-200 हटाइएको छ। यदि डार्क ब्याकग्राउन्डमा लोगो कालो भएर नदेखिएको हो भने, 
                // 'invert brightness-0' (सेतो बनाउन) वा 'drop-shadow-md' प्रयोग गर्न सक्नुहुन्छ।
              />
            </a>
            <p className="italic text-sm text-gray-400 leading-relaxed">
              Experience the difference ...
            </p>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Destinations</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Nepal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bhutan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tibet</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Multi Country</a></li>
            </ul>
          </div>

          {/* Activities */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Main Activities</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Trekking in Nepal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Luxury Treks</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Climbing and Expedition</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mountain Biking</a></li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Useful Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Site Map</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Reviews & Social Media */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Recommendation Logos */}
          <div className="flex items-center gap-6 opacity-70">
            <span className="text-xs uppercase tracking-wider">Recommended on:</span>
            <img
              src="https://placehold.co/100x20?text=Tripadvisor"
              alt="Tripadvisor Badge"
              className="h-5 object-contain"
            />
            <img
              src="https://placehold.co/80x20?text=Google"
              alt="Google Review Badge"
              className="h-5 object-contain"
            />
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <span className="text-sm">Follow us:</span>

            <div className="flex gap-2">
              <a
                href="#"
                className="bg-blue-600 p-2 rounded-full text-white hover:scale-110 transition duration-200"
                aria-label="Facebook"
              >
                <CircleFadingPlus size={18} />
              </a>

              <a
                href="#"
                className="bg-pink-600 p-2 rounded-full text-white hover:scale-110 transition duration-200"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="bg-red-600 p-2 rounded-full text-white hover:scale-110 transition duration-200"
                aria-label="Youtube"
              >
                <FaYoutube size={18} />
              </a>

              <a
                href="#"
                className="bg-blue-400 p-2 rounded-full text-white hover:scale-110 transition duration-200"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button 
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-2xl hover:bg-blue-600 transition duration-200 z-50 active:scale-95"
        aria-label="Open Chat"
      >
        <MessageCircle size={28} />
      </button>
    </footer>
  );
};

export default Footer;