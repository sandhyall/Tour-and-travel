import React, { useState } from "react";
import { Link } from "react-router-dom";

// Replace with your actual logo import:
// import LogoImg from "../../assets/logo.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Barlow:wght@400;500;600;700&display=swap');

  .wtt-topbar {
    background: #0f0f0f;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    padding: 6px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Barlow', sans-serif;
  }
  .wtt-topbar-left {
    font-size: 11px;
    color: #a09a8e;
    letter-spacing: 0.06em;
  }
  .wtt-topbar-left strong {
    color: #4caf50;
    font-weight: 600;
  }
  .wtt-topbar-right {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  .wtt-topbar-link {
    font-size: 10.5px;
    color: #a09a8e;
    text-decoration: none;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: color 0.15s;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'Barlow', sans-serif;
  }
  .wtt-topbar-link:hover { color: #f5f0e8; }
  .wtt-topbar-sep { color: rgba(255, 255, 255, 0.15); font-size: 11px; }

  .wtt-navbar {
    background: #0a0a0a;
    border-bottom: 1px solid rgba(46, 125, 50, 0.35);
    font-family: 'Barlow', sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    height: 68px;
    position: relative;
    z-index: 100;
  }

  /* BRAND */
  .wtt-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
  }
  .wtt-brand-icon {
    width: 38px;
    height: 38px;
    border: 1.5px solid #2e7d32;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4caf50;
    flex-shrink: 0;
  }
  .wtt-brand-name {
    font-family: 'Cormorant Garamond', serif;
    color: #f5f0e8;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1.1;
  }
  .wtt-brand-sub {
    display: block;
    font-size: 10px;
    font-family: 'Barlow', sans-serif;
    font-weight: 500;
    letter-spacing: 0.22em;
    color: #a09a8e;
    text-transform: uppercase;
    margin-top: 2px;
  }

  /* NAV LINKS */
  .wtt-nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .wtt-nav-link {
    color: #a09a8e;
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 8px 14px;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: color 0.2s;
    position: relative;
    text-decoration: none;
    font-family: 'Barlow', sans-serif;
    height: 68px;
  }
  .wtt-nav-link:hover,
  .wtt-nav-link.active { color: #f5f0e8; }
  .wtt-nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 14px;
    right: 14px;
    height: 1.5px;
    background: #4caf50;
    transform: scaleX(0);
    transition: transform 0.2s;
    transform-origin: left;
  }
  .wtt-nav-link:hover::after,
  .wtt-nav-link.active::after { transform: scaleX(1); }

  /* CHEVRON */
  .wtt-chevron {
    width: 9px;
    height: 9px;
    border-right: 1.5px solid currentColor;
    border-bottom: 1.5px solid currentColor;
    transform: rotate(45deg) translateY(-2px);
    transition: transform 0.2s;
    flex-shrink: 0;
  }
  .wtt-chevron.open {
    transform: rotate(-135deg) translateY(-2px);
  }

  /* COMPANY MEGA DROPDOWN */
  .wtt-dropdown-wrap {
    position: relative;
  }
  .wtt-mega-dropdown {
    position: absolute;
    top: calc(100% + 0px);
    left: 50%;
    transform: translateX(-50%);
    background: #111111;
    border: 1px solid rgba(46, 125, 50, 0.35);
    border-top: 2px solid #2e7d32;
    width: 520px;
    padding: 28px 32px;
    z-index: 200;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 32px;
    animation: wttFadeIn 0.15s ease;
  }
  @keyframes wttFadeIn {
    from { opacity: 0; transform: translateX(-50%) translateY(-4px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  .wtt-dropdown-col-title {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #4caf50;
    font-weight: 600;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(46, 125, 50, 0.35);
    margin-bottom: 12px;
    font-family: 'Barlow', sans-serif;
  }
  .wtt-dropdown-item {
    display: block;
    color: #a09a8e;
    font-size: 13px;
    font-weight: 400;
    padding: 7px 0;
    text-decoration: none;
    letter-spacing: 0.03em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    transition: color 0.15s, padding-left 0.15s;
    font-family: 'Barlow', sans-serif;
  }
  .wtt-dropdown-item:hover {
    color: #f5f0e8;
    padding-left: 8px;
  }

  /* RIGHT SIDE */
  .wtt-nav-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .wtt-top10-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #2e7d32;
    background: none;
    padding: 9px 18px;
    color: #f5f0e8;
    font-family: 'Barlow', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .wtt-top10-btn:hover {
    background: rgba(46, 125, 50, 0.15);
    border-color: #4caf50;
  }
  .wtt-star { color: #c9a84c; font-size: 13px; }

  /* LOCATION */
  .wtt-loc-wrap { position: relative; }
  .wtt-loc-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    color: #a09a8e;
    font-size: 11px;
    font-family: 'Barlow', sans-serif;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: color 0.15s;
    padding: 0;
  }
  .wtt-loc-btn:hover { color: #f5f0e8; }
  .wtt-loc-dropdown {
    position: absolute;
    right: 0;
    top: calc(100% + 8px);
    background: #111111;
    border: 1px solid rgba(46, 125, 50, 0.35);
    min-width: 130px;
    z-index: 200;
    overflow: hidden;
    animation: wttFadeIn 0.15s ease;
  }
  .wtt-loc-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 14px;
    font-size: 12px;
    color: #a09a8e;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    font-family: 'Barlow', sans-serif;
  }
  .wtt-loc-item:hover {
    background: rgba(46, 125, 50, 0.12);
    color: #f5f0e8;
  }
  .wtt-loc-item.selected { color: #4caf50; }

  /* PHONE */
  .wtt-phone-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .wtt-phone-label {
    font-size: 9.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #a09a8e;
    margin-bottom: 3px;
    font-weight: 500;
  }
  .wtt-phone-num {
    font-size: 14px;
    font-weight: 700;
    color: #f5f0e8;
    letter-spacing: 0.04em;
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .wtt-phone-icon {
    width: 16px;
    height: 16px;
    background: #2e7d32;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
`;

const MountainIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 20l4-8 3 5 4-10 4 13" />
    <path d="M3 20h18" strokeWidth="1" opacity="0.3" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="9" height="9" fill="white">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
  </svg>
);

const LOCATIONS = [
  { name: "Nepal",     flag: "🇳🇵" },
  { name: "America",   flag: "🇺🇸" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "UK",        flag: "🇬🇧" },
];

const COMPANY_LINKS = {
  About: [
    { label: "About Us",            to: "/about-us" },
    { label: "Meet Our Team",       to: "/meet-our-team" },
    { label: "Why Wales?",          to: "/why-ace" },
    { label: "CSI",                 to: "/csi" },
    { label: "Legal Documents",     to: "/legal-documents" },
    { label: "Terms & Conditions",  to: "/terms-and-conditions" },
  ],
  Connect: [
    { label: "Sign Up for Newsletter", to: "/sign-up-for-newsletter" },
    { label: "Contact Us",             to: "/contact-us" },
  ],
};

const Navbar = () => {
  const [location, setLocation]         = useState(LOCATIONS[0]);
  const [isLocOpen, setIsLocOpen]       = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  return (
    <>
     
      <style>{styles}</style>

      <header>
       
        <div className="wtt-topbar">
          <div className="wtt-topbar-left">
            Award-winning treks since 1995 &nbsp;·&nbsp;{" "}
            <strong>100% Satisfaction Guaranteed</strong>
          </div>
         
        </div>

      
        <nav className="wtt-navbar">

        
          <Link to="/" className="wtt-brand">
            <div className="wtt-brand-icon">
              <MountainIcon />
            </div>
         
           
            <div className="wtt-brand-name">
              Wales Trek &amp; Travel
              <span className="wtt-brand-sub">Himalayan Specialists</span>
            </div>
          </Link>

          {/* Nav links */}
          <div className="wtt-nav-links">
            <Link to="/nepal"       className="wtt-nav-link">Nepal       <span className="wtt-chevron" /></Link>
            <Link to="/butan"      className="wtt-nav-link">Bhutan      <span className="wtt-chevron" /></Link>
            <Link to="/tibet"       className="wtt-nav-link">Tibet       <span className="wtt-chevron" /></Link>

            {/* Company dropdown */}
            <div
              className="wtt-dropdown-wrap"
              onMouseEnter={() => setIsCompanyOpen(true)}
              onMouseLeave={() => setIsCompanyOpen(false)}
            >
              <button className={`wtt-nav-link${isCompanyOpen ? " active" : ""}`}>
                Company
                <span className={`wtt-chevron${isCompanyOpen ? " open" : ""}`} />
              </button>

              {isCompanyOpen && (
                <div className="wtt-mega-dropdown">
                  {Object.entries(COMPANY_LINKS).map(([title, links]) => (
                    <div key={title}>
                      <div className="wtt-dropdown-col-title">{title}</div>
                      {links.map(({ label, to }) => (
                        <Link
                          key={to}
                          to={to}
                          className="wtt-dropdown-item"
                          onClick={() => setIsCompanyOpen(false)}
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/nepal-treks" className="wtt-nav-link">Nepal Treks <span className="wtt-chevron" /></Link>
          </div>

          {/* Right utilities */}
          <div className="wtt-nav-right">

            {/* Top 10 Treks CTA */}
            <Link to="/top-treks" style={{ textDecoration: "none" }}>
              <button className="wtt-top10-btn">
                <span className="wtt-star">★</span>
                Top 10 Treks
              </button>
            </Link>

            {/* Location switcher */}
            <div
              className="wtt-loc-wrap"
              onMouseEnter={() => setIsLocOpen(true)}
              onMouseLeave={() => setIsLocOpen(false)}
            >
              <button className="wtt-loc-btn">
                <span>{location.flag}</span>
                {location.name}
                <span className={`wtt-chevron${isLocOpen ? " open" : ""}`} style={{ width: 8, height: 8 }} />
              </button>

              {isLocOpen && (
                <div className="wtt-loc-dropdown">
                  {LOCATIONS.map((loc) => (
                    <div
                      key={loc.name}
                      className={`wtt-loc-item${loc.name === location.name ? " selected" : ""}`}
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

            {/* Phone */}
            <div className="wtt-phone-wrap">
              <div className="wtt-phone-label">Call us now</div>
              <div className="wtt-phone-num">
                <div className="wtt-phone-icon"><PhoneIcon /></div>
                +977 985 123 3710
              </div>
            </div>

          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;