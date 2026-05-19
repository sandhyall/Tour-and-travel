import React, { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [location, setLocation] = useState({ name: "Nepal", flag: "🇳🇵" });
  const [isLocOpen, setIsLocOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  const locations = [
    { name: "Nepal", flag: "🇳🇵" },
    { name: "America", flag: "🇺🇸" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "UK", flag: "🇬🇧" },
  ];

  const companyLinks = [
    [
      "About-us",
      "Meet Our Team",
      "Why Ace?",
      "CSI",
      "Legal Documents",
      "Terms and Conditions",
    ],
    ["Sign Up for Newsletter", "Contact Us"],
  ];

  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between font-sans relative">
      <div className="flex flex-col items-start leading-tight">
        <h1 className="text-4xl font-serif font-bold tracking-tighter">
          Ace<span className="text-xs align-top">TM</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.2em]">the Himalaya</p>
      </div>

      <div className="hidden lg:flex items-center space-x-8 text-sm font-bold">
        <Link to="/nepal" className="flex items-center hover:text-gray-300">
          NEPAL <ChevronDown size={16} className="ml-1" />
        </Link>
        <Link to="/butan" className="flex items-center hover:text-gray-300">
          BHUTAN <ChevronDown size={16} className="ml-1" />
        </Link>
        <Link to="/tibet" className="flex items-center hover:text-gray-300">
          TIBET <ChevronDown size={16} className="ml-1" />
        </Link>

        <div
          className="relative group py-2"
          onMouseEnter={() => setIsCompanyOpen(true)}
          onMouseLeave={() => setIsCompanyOpen(false)}
        >
          <button className="flex items-center hover:text-gray-300 uppercase">
            COMPANY{" "}
            <ChevronDown
              size={16}
              className={`ml-1 transition-transform ${isCompanyOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isCompanyOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-white text-black shadow-2xl rounded-sm p-8 z-50 grid grid-cols-2 gap-x-12 border-t-4 border-green-600">
              {companyLinks.map((column, idx) => (
                <div key={idx} className="flex flex-col space-y-3">
                  {column.map((link) => (
                    <Link
                      key={link}
                      to={`/${link.toLowerCase().replace(/ /g, "-")}`}
                      className="text-[15px] font-medium hover:text-green-700 transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <Link className="flex items-center hover:text-gray-300">
          NEPAL TREKS <ChevronDown size={16} className="ml-1" />
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <button className="border border-white px-4 py-2 flex items-center hover:bg-white hover:text-black transition-all duration-300">
          <span className="mr-2 text-yellow-500">★</span>
          <span className="text-sm font-bold uppercase tracking-wide">
            Top 10 Treks
          </span>
        </button>

        <div className="flex flex-col items-end">
          <div className="relative">
            <button
              onClick={() => setIsLocOpen(!isLocOpen)}
              className="flex items-center text-[11px] mb-1 hover:text-gray-300"
            >
              <span className="uppercase tracking-wider">Change Location</span>
              <span className="ml-2">{location.flag}</span>
              <ChevronDown
                size={12}
                className={`ml-1 ${isLocOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isLocOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-white text-black rounded shadow-lg z-50 py-1">
                {locations.map((loc) => (
                  <div
                    key={loc.name}
                    className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer flex justify-between"
                    onClick={() => {
                      setLocation(loc);
                      setIsLocOpen(false);
                    }}
                  >
                    {loc.name} <span>{loc.flag}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center text-lg font-bold tracking-tight">
            <span className="text-green-500 mr-2">
              <Phone size={18} fill="currentColor" />
            </span>
            +9779851233710
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
