import React, { useState } from "react";
import {
  MessageCircle,
  User,
  Mail,
} from "lucide-react";

import {
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";

import axios from "../../api/axios";

import logo from "../../assets/logo.png";
import footer from "../../assets/footer.png";

const Footer = () => {


  const [newsletter, setNewsletter] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");


  const handleChange = (e) => {
    setNewsletter({
      ...newsletter,
      [e.target.name]: e.target.value,
    });
  };

  

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

      setNewsletter({
        name: "",
        email: "",
      });

      console.log(res.data);

    } catch (err) {
      console.log(err);

      setError("Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full font-sans bg-[#f9fafb]">

    

      <div className="bg-[#0b2545] py-12 px-6">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="text-white text-left md:max-w-md">

            <h3 className="text-2xl font-bold mb-2">
              Subscribe Our E-Newsletter
            </h3>

            <p className="text-blue-100 text-sm opacity-80">
              Sign up for Deals and Discount.
              Get News, Notifications and Updates
              about recent Events and Offers.
            </p>

          </div>

        
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row w-full md:w-auto gap-0 bg-white rounded-sm shadow-lg overflow-hidden"
          >

            <div className="flex items-center px-4 border-b sm:border-b-0 sm:border-r border-gray-200">

              <User
                size={18}
                className="text-gray-400 mr-2"
              />

              <input
                type="text"
                name="name"
                value={newsletter.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="p-3 outline-none w-full sm:w-40"
                required
              />
            </div>

            <div className="flex items-center px-4">

              <Mail
                size={18}
                className="text-gray-400 mr-2"
              />

              <input
                type="email"
                name="email"
                value={newsletter.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="p-3 outline-none w-full sm:w-52"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#00a8e8] hover:bg-[#007ea7] text-white font-bold py-3 px-8 transition-colors uppercase tracking-wider text-sm"
            >
              {loading ? "Submitting..." : "Subscribe"}
            </button>

          </form>
        </div>

     
        <div className="max-w-6xl mx-auto mt-4">

          {success && (
            <p className="text-green-300 text-sm">
              {success}
            </p>
          )}

          {error && (
            <p className="text-red-300 text-sm">
              {error}
            </p>
          )}

        </div>
      </div>

     

      <img
        src={footer}
        alt="Mountain landscape footer background"
        className="w-full h-auto block"
      />

    

      <div className="bg-white text-gray-600 py-16 px-10">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* LOGO */}
          <div className="space-y-4">

            <img
              src={logo}
              alt="Company Logo"
              className="h-16 w-auto"
            />

            <p className="text-sm italic leading-relaxed">
              <strong>Our Mission:</strong>
              {" "}
              To provide unparalleled travel experiences
              by combining sustainable practices with
              authentic cultural immersion.
            </p>
          </div>

        
          <div>

            <h4 className="text-gray-900 font-bold mb-6 uppercase tracking-wider text-sm">
              Destinations
            </h4>

            <ul className="space-y-3 text-sm">

              {[
                "Nepal",
                "Bhutan",
                "Tibet",
                "Multi Country",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-[#00a8e8] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}

            </ul>
          </div>

        
          <div>

            <h4 className="text-gray-900 font-bold mb-6 uppercase tracking-wider text-sm">
              Company
            </h4>

            <ul className="space-y-3 text-sm">

              {[
                "About Us",
                "Meet Our Team",
                "Awards and Achievements",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-[#00a8e8] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}

            </ul>
          </div>

        
          <div>

            <h4 className="text-gray-900 font-bold mb-6 uppercase tracking-wider text-sm">
              Get In Touch
            </h4>

            <p className="text-sm leading-relaxed">
              Have questions?
              Our experts are ready to help you
              plan your perfect trip.
            </p>

          </div>
        </div>
      </div>

     

      <div className="bg-gray-50 py-6 px-10 border-t border-gray-200">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

          <p>
            © 2026 Company Name.
            All rights reserved.
          </p>

          <div className="flex gap-4">

            {[
              FaFacebookF,
              FaInstagram,
              FaYoutube,
              FaTwitter,
            ].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social Media Link"
                className="bg-gray-200 p-2 rounded-full hover:bg-[#00a8e8] hover:text-white transition-all"
              >
                <Icon size={16} />
              </a>
            ))}

          </div>
        </div>
      </div>

   
      

    </footer>
  );
};

export default Footer;