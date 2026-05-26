import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "../../api/axios";
import logo from "../../assets/logo.png";

// ── Data ────────────────────────────────────────────────────────────────────

const LOCATIONS = [
  { name: "Nepal", flag: "🇳🇵" },
  { name: "America", flag: "🇺🇸" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "UK", flag: "🇬🇧" },
];

const COMPANY_LINKS = {
  About: [
    { label: "About Us", to: "/about-us" },
    { label: "Meet Our Team", to: "/meet-our-team" },
    { label: "Why Wales?", to: "/why-ace" },
    { label: "CSI", to: "/csi" },
    { label: "Legal Documents", to: "/legal-documents" },
    { label: "Terms & Conditions", to: "/terms-and-conditions" },
  ],
  Connect: [
    { label: "Sign Up for Newsletter", to: "/sign-up-for-newsletter" },
    { label: "Contact Us", to: "/contact-us" },
  ],
};

// ── Icons ────────────────────────────────────────────────────────────────────

const MountainIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M3 20l4-8 3 5 4-10 4 13" />
    <path d="M3 20h18" strokeWidth="1" opacity="0.3" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="9" height="9" fill="white">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 14 14" width="12" height="12" fill="currentColor">
    <path d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L7 8.88l-3.09 1.63.59-3.44L2 4.632l3.455-.502L7 1z" />
  </svg>
);

const ChevronDown = ({ open }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 12 12"
    fill="none"
    style={{
      marginLeft: 4,
      flexShrink: 0,
      transition: "transform 0.22s ease",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
    }}
  >
    <path
      d="M2 4l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Barlow:wght@400;500;600;700&display=swap');

  /* ---- tokens ---- */
  :root {
    --wtt-bg:        #0a0a0a;
    --wtt-bg-top:    #0f0f0f;
    --wtt-bg-panel:  #111111;
    --wtt-green:     #4caf50;
    --wtt-green-d:   #2e7d32;
    --wtt-green-dim: rgba(46,125,50,0.35);
    --wtt-gold:      #c9a84c;
    --wtt-cream:     #f5f0e8;
    --wtt-muted:     #a09a8e;
    --wtt-border:    rgba(255,255,255,0.06);
    --wtt-font:      'Barlow', sans-serif;
    --wtt-serif:     'Cormorant Garamond', serif;
    --wtt-radius:    4px;
    --wtt-shadow:    0 16px 48px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.4);
    --wtt-transition: 0.18s ease;
  }

  /* ---- topbar ---- */
  .wtt-topbar {
    background: var(--wtt-bg-top);
    border-bottom: 1px solid var(--wtt-border);
    padding: 6px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--wtt-font);
  }
  .wtt-topbar-left {
    font-size: 11px;
    color: var(--wtt-muted);
    letter-spacing: 0.06em;
  }
  .wtt-topbar-left strong { color: var(--wtt-green); font-weight: 600; }
  .wtt-topbar-right {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  .wtt-topbar-link {
    font-size: 10.5px;
    color: var(--wtt-muted);
    text-decoration: none;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: color var(--wtt-transition);
    cursor: pointer;
    background: none;
    border: none;
    font-family: var(--wtt-font);
  }
  .wtt-topbar-link:hover { color: var(--wtt-cream); }
  .wtt-topbar-sep { color: rgba(255,255,255,0.15); font-size: 11px; }

  /* ---- main navbar ---- */
  .wtt-navbar {
    background: var(--wtt-bg);
    border-bottom: 1px solid var(--wtt-green-dim);
    font-family: var(--wtt-font);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    height: 68px;
    position: relative;
    z-index: 100;
  }

  /* ---- brand ---- */
  .wtt-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    flex-shrink: 0;
    margin-right: 28px;
  }
  .wtt-brand-icon {
    width: 38px;
    height: 38px;
    border: 1.5px solid var(--wtt-green-d);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--wtt-green);
    flex-shrink: 0;
    transition: border-color var(--wtt-transition);
  }
  .wtt-brand:hover .wtt-brand-icon { border-color: var(--wtt-green); }
  .wtt-brand-name {
    font-family: var(--wtt-serif);
    color: var(--wtt-cream);
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1.1;
  }
  .wtt-brand-sub {
    display: block;
    font-size: 10px;
    font-family: var(--wtt-font);
    font-weight: 500;
    letter-spacing: 0.22em;
    color: var(--wtt-muted);
    text-transform: uppercase;
    margin-top: 3px;
  }

  /* ---- nav links row ---- */
  .wtt-nav-links {
    display: flex;
    align-items: center;
    gap: 2px;
    flex: 1;
  }

  /* base nav button / link */
  .wtt-nav-btn {
    color: var(--wtt-muted);
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 8px 13px;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: color var(--wtt-transition);
    position: relative;
    text-decoration: none;
    font-family: var(--wtt-font);
    height: 68px;
    white-space: nowrap;
  }
  .wtt-nav-btn::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 13px;
    right: 13px;
    height: 1.5px;
    background: var(--wtt-green);
    transform: scaleX(0);
    transition: transform 0.22s ease;
    transform-origin: left;
  }
  .wtt-nav-btn:hover,
  .wtt-nav-btn--active { color: var(--wtt-cream); }
  .wtt-nav-btn:hover::after,
  .wtt-nav-btn--active::after { transform: scaleX(1); }

  /* divider between groups */
  .wtt-nav-divider {
    width: 1px;
    height: 16px;
    background: rgba(255,255,255,0.08);
    margin: 0 4px;
    flex-shrink: 0;
  }

  /* ---- dropdown wrapper ---- */
  .wtt-dd-wrap { position: relative; }

  /* ---- trip mega panel ---- */
  .wtt-trip-panel {
    position: absolute;
    top: 100%;
    left: 0;
    background: var(--wtt-bg-panel);
    border: 1px solid var(--wtt-green-dim);
    border-top: 2px solid var(--wtt-green-d);
    min-width: 420px;
    padding: 20px;
    z-index: 200;
    box-shadow: var(--wtt-shadow);
    animation: wttPanelIn 0.15s ease forwards;
    transform-origin: top left;
  }
  .wtt-trip-panel-header {
    font-size: 9.5px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--wtt-green);
    font-weight: 600;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--wtt-green-dim);
    margin-bottom: 12px;
  }
  .wtt-trip-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
  }
  .wtt-trip-item {
    display: block;
    color: var(--wtt-muted);
    font-size: 13px;
    font-weight: 400;
    padding: 7px 10px;
    text-decoration: none;
    letter-spacing: 0.02em;
    border-radius: var(--wtt-radius);
    transition: color var(--wtt-transition), background var(--wtt-transition), padding-left var(--wtt-transition);
    font-family: var(--wtt-font);
    line-height: 1.35;
  }
  .wtt-trip-item:hover {
    color: var(--wtt-cream);
    background: rgba(46,125,50,0.1);
    padding-left: 14px;
  }
  .wtt-trip-empty {
    font-size: 12px;
    color: rgba(160,154,142,0.5);
    padding: 8px 10px;
    font-style: italic;
  }

  /* ---- company mega panel ---- */
  .wtt-company-panel {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--wtt-bg-panel);
    border: 1px solid var(--wtt-green-dim);
    border-top: 2px solid var(--wtt-green-d);
    width: 520px;
    padding: 28px 32px;
    z-index: 200;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 32px;
    box-shadow: var(--wtt-shadow);
    animation: wttCompanyIn 0.15s ease forwards;
    transform-origin: top center;
  }
  @keyframes wttCompanyIn {
    from { opacity: 0; transform: translateX(-50%) translateY(-6px) scale(0.98); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1); }
  }
  .wtt-col-title {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--wtt-green);
    font-weight: 600;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--wtt-green-dim);
    margin-bottom: 12px;
    font-family: var(--wtt-font);
  }
  .wtt-co-link {
    display: block;
    color: var(--wtt-muted);
    font-size: 13px;
    font-weight: 400;
    padding: 7px 0;
    text-decoration: none;
    letter-spacing: 0.03em;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: color var(--wtt-transition), padding-left var(--wtt-transition);
    font-family: var(--wtt-font);
  }
  .wtt-co-link:hover { color: var(--wtt-cream); padding-left: 8px; }

  @keyframes wttPanelIn {
    from { opacity: 0; transform: translateY(-6px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }

  /* ---- right utilities ---- */
  .wtt-nav-right {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  /* Top 10 button */
  .wtt-top10-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid var(--wtt-green-d);
    background: none;
    padding: 9px 18px;
    color: var(--wtt-cream);
    font-family: var(--wtt-font);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background var(--wtt-transition), border-color var(--wtt-transition), transform var(--wtt-transition);
    text-decoration: none;
    white-space: nowrap;
  }
  .wtt-top10-btn:hover {
    background: rgba(46,125,50,0.15);
    border-color: var(--wtt-green);
    transform: translateY(-1px);
  }
  .wtt-top10-btn:active { transform: translateY(0); }
  .wtt-top10-star { color: var(--wtt-gold); display: flex; align-items: center; }

  /* location picker */
  .wtt-loc-wrap { position: relative; }
  .wtt-loc-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--wtt-muted);
    font-size: 11px;
    font-family: var(--wtt-font);
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: color var(--wtt-transition);
    padding: 0;
    white-space: nowrap;
  }
  .wtt-loc-btn:hover { color: var(--wtt-cream); }
  .wtt-loc-flag { font-size: 15px; line-height: 1; }
  .wtt-loc-panel {
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
    background: var(--wtt-bg-panel);
    border: 1px solid var(--wtt-green-dim);
    min-width: 150px;
    z-index: 200;
    overflow: hidden;
    box-shadow: var(--wtt-shadow);
    animation: wttPanelIn 0.15s ease forwards;
    transform-origin: top right;
  }
  .wtt-loc-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    font-size: 12.5px;
    color: var(--wtt-muted);
    cursor: pointer;
    transition: background var(--wtt-transition), color var(--wtt-transition);
    font-family: var(--wtt-font);
    gap: 10px;
  }
  .wtt-loc-option:not(:last-child) { border-bottom: 1px solid rgba(255,255,255,0.05); }
  .wtt-loc-option:hover { background: rgba(46,125,50,0.12); color: var(--wtt-cream); }
  .wtt-loc-option--active { color: var(--wtt-green); }

  /* phone block */
  .wtt-phone-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border-left: 1px solid rgba(255,255,255,0.07);
    padding-left: 18px;
  }
  .wtt-phone-label {
    font-size: 9.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--wtt-muted);
    margin-bottom: 3px;
    font-weight: 500;
    font-family: var(--wtt-font);
  }
  .wtt-phone-num {
    font-size: 14px;
    font-weight: 700;
    color: var(--wtt-cream);
    letter-spacing: 0.04em;
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: var(--wtt-font);
  }
  .wtt-phone-icon {
    width: 16px;
    height: 16px;
    background: var(--wtt-green-d);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
`;

// ── Reusable dropdown hook ───────────────────────────────────────────────────

const useHoverDropdown = () => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);
  const show = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const hide = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };
  return { open, show, hide };
};

// ── Trip panel component ─────────────────────────────────────────────────────

const TripPanel = ({ countryLabel, trips }) => (
  <div className="wtt-trip-panel">
    <div className="wtt-trip-panel-header">{countryLabel} Expeditions</div>
    {trips.length === 0 ? (
      <p className="wtt-trip-empty">Loading trips…</p>
    ) : (
      <div className="wtt-trip-grid">
        {trips.map((trip) => (
          <Link
            key={trip._id}
            to={`/feature/${trip._id}`}
            className="wtt-trip-item"
          >
            {trip.title}
          </Link>
        ))}
      </div>
    )}
  </div>
);

// ── Main Navbar ──────────────────────────────────────────────────────────────

const Navbar = () => {
  const [location, setLocation] = useState(LOCATIONS[0]);
  const locRef = useRef(null);

  const nepal = useHoverDropdown();
  const bhutan = useHoverDropdown();
  const tibet = useHoverDropdown();
  const company = useHoverDropdown();
  const loc = useHoverDropdown();

  const [nepalTrips, setNepalTrips] = useState([]);
  const [bhutanTrips, setBhutanTrips] = useState([]);
  const [tibetTrips, setTibetTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await axios.get("/trips");
        setNepalTrips(data.filter((t) => t.country?.toLowerCase() === "nepal"));
        setBhutanTrips(
          data.filter((t) => t.country?.toLowerCase() === "bhutan"),
        );
        setTibetTrips(data.filter((t) => t.country?.toLowerCase() === "tibet"));
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrips();
  }, []);

  // Close location picker on outside click
  useEffect(() => {
    const handler = (e) => {
      if (locRef.current && !locRef.current.contains(e.target)) loc.hide();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <style>{styles}</style>

      <header>
        {/* ── Top bar ── */}
        <div className="wtt-topbar">
          <div className="wtt-topbar-left">
            Award-winning treks since 1995 &nbsp;·&nbsp;{" "}
            <strong>100% Satisfaction Guaranteed</strong>
          </div>
          <div className="wtt-topbar-right">
            <a href="tel:+9779851233710" className="wtt-topbar-link">
              +977 985 123 3710
            </a>
            <span className="wtt-topbar-sep">|</span>
            <Link to="/contact-us" className="wtt-topbar-link">
              Contact
            </Link>
            <span className="wtt-topbar-sep">|</span>
            <Link to="/sign-up-for-newsletter" className="wtt-topbar-link">
              Newsletter
            </Link>
          </div>
        </div>

        <nav className="wtt-navbar">
          <img src={logo} alt="Company Logo" className="h-[46px] w-auto" />

          <Link to="/" className="wtt-brand">
            <div>
              <div className="wtt-brand-name">Wales Trek &amp; Travel</div>
              <span className="wtt-brand-sub">Himalayan Specialists</span>
            </div>
          </Link>

          <div className="wtt-nav-links">
            <div
              className="wtt-dd-wrap"
              onMouseEnter={nepal.show}
              onMouseLeave={nepal.hide}
            >
              <button
                className={`wtt-nav-btn${nepal.open ? " wtt-nav-btn--active" : ""}`}
              >
                Nepal <ChevronDown open={nepal.open} />
              </button>
              {nepal.open && (
                <TripPanel countryLabel="Nepal" trips={nepalTrips} />
              )}
            </div>

            <div
              className="wtt-dd-wrap"
              onMouseEnter={bhutan.show}
              onMouseLeave={bhutan.hide}
            >
              <button
                className={`wtt-nav-btn${bhutan.open ? " wtt-nav-btn--active" : ""}`}
              >
                Bhutan <ChevronDown open={bhutan.open} />
              </button>
              {bhutan.open && (
                <TripPanel countryLabel="Bhutan" trips={bhutanTrips} />
              )}
            </div>

            <div
              className="wtt-dd-wrap"
              onMouseEnter={tibet.show}
              onMouseLeave={tibet.hide}
            >
              <button
                className={`wtt-nav-btn${tibet.open ? " wtt-nav-btn--active" : ""}`}
              >
                Tibet <ChevronDown open={tibet.open} />
              </button>
              {tibet.open && (
                <TripPanel countryLabel="Tibet" trips={tibetTrips} />
              )}
            </div>

            <div className="wtt-nav-divider" />

            <NavLink to="/tibet" className="wtt-nav-btn">
              Tibet Page
            </NavLink>

            <div className="wtt-nav-divider" />

            <div
              className="wtt-dd-wrap"
              onMouseEnter={company.show}
              onMouseLeave={company.hide}
            >
              <button
                className={`wtt-nav-btn${company.open ? " wtt-nav-btn--active" : ""}`}
              >
                Company <ChevronDown open={company.open} />
              </button>
              {company.open && (
                <div
                  className="wtt-company-panel"
                  onMouseEnter={company.show}
                  onMouseLeave={company.hide}
                >
                  {Object.entries(COMPANY_LINKS).map(([title, links]) => (
                    <div key={title}>
                      <div className="wtt-col-title">{title}</div>
                      {links.map(({ label, to }) => (
                        <Link key={to} to={to} className="wtt-co-link">
                          {label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="wtt-nav-right">
            <Link to="/top-treks" className="wtt-top10-btn">
              <span className="wtt-top10-star">
                <StarIcon />
              </span>
              Top 10 Treks
            </Link>

            <div
              className="wtt-loc-wrap"
              ref={locRef}
              onMouseEnter={loc.show}
              onMouseLeave={loc.hide}
            >
              <button
                className="wtt-loc-btn"
                aria-haspopup="listbox"
                aria-expanded={loc.open}
              >
                <span className="wtt-loc-flag">{location.flag}</span>
                {location.name}
                <ChevronDown open={loc.open} />
              </button>
              {loc.open && (
                <div className="wtt-loc-panel" role="listbox">
                  {LOCATIONS.map((l) => (
                    <div
                      key={l.name}
                      role="option"
                      aria-selected={l.name === location.name}
                      className={`wtt-loc-option${l.name === location.name ? " wtt-loc-option--active" : ""}`}
                      onClick={() => {
                        setLocation(l);
                        loc.hide();
                      }}
                    >
                      {l.name} <span className="wtt-loc-flag">{l.flag}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="wtt-phone-wrap">
              <div className="wtt-phone-label">Call us now</div>
              <div className="wtt-phone-num">
                <div className="wtt-phone-icon">
                  <PhoneIcon />
                </div>
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
