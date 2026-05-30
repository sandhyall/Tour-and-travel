import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../src/api/axios";
import {
  X, ChevronLeft, ChevronRight, Loader2, Mountain,
  Search, Image as ImageIcon, Filter, Maximize2,
} from "lucide-react";

const BASE_URL = "http://localhost:8000";

const resolveImage = (raw) => {
  if (!raw) return null;
  if (typeof raw === "string") return raw.startsWith("http") ? raw : `${BASE_URL}/${raw}`;
  if (raw?.url) return raw.url.startsWith("http") ? raw.url : `${BASE_URL}/${raw.url}`;
  if (raw?.src || raw?.path || raw?.image) {
    const fp = raw.src || raw.path || raw.image;
    return fp.startsWith("http") ? fp : `${BASE_URL}/${fp}`;
  }
  return null;
};


const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Syne:wght@400;500;600;700;800&display=swap');

  :root {
    --bg:       #f5f4f2;
    --surface:  #ffffff;
    --border:   #e2e0dc;
    --text-1:   #111110;
    --text-2:   #4a4845;
    --text-3:   #9a9791;
    --font-d:   'Cormorant Garamond', Georgia, serif;
    --font-b:   'Syne', system-ui, sans-serif;
    --t:        all 0.2s ease;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .gr { min-height: 100vh; background: var(--bg); color: var(--text-1); font-family: var(--font-b); }

  /* ── Header ── */
  .gh {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 18px 32px;
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }
  .gh-title {
    font-family: var(--font-d);
    font-size: 26px;
    font-weight: 300;
    letter-spacing: -0.01em;
    line-height: 1;
    white-space: nowrap;
  }
  .gh-title em { font-style: italic; }
  .gh-count {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-3);
    white-space: nowrap;
  }
  .gh-search {
    position: relative;
    flex: 1;
    min-width: 140px;
    max-width: 240px;
    margin-left: auto;
  }
  .gh-search svg { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--text-3); pointer-events: none; }
  .gh-search input {
    width: 100%;
    height: 32px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 0 10px 0 30px;
    font-size: 12px;
    font-family: var(--font-b);
    color: var(--text-1);
    outline: none;
    transition: var(--t);
  }
  .gh-search input:focus { border-color: var(--text-1); }
  .gh-search input::placeholder { color: var(--text-3); }

  /* ── Filters ── */
  .gf {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 32px;
    height: 40px;
    display: flex;
    align-items: center;
    gap: 4px;
    overflow-x: auto;
  }
  .gf::-webkit-scrollbar { height: 0; }
  .gf-label { font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-3); margin-right: 6px; white-space: nowrap; }
  .gf-btn {
    flex-shrink: 0;
    height: 24px;
    padding: 0 12px;
    border: 1px solid var(--border);
    background: transparent;
    border-radius: 2px;
    font-family: var(--font-b);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-2);
    cursor: pointer;
    transition: var(--t);
  }
  .gf-btn:hover { border-color: var(--text-1); color: var(--text-1); }
  .gf-btn.active { background: var(--text-1); border-color: var(--text-1); color: var(--bg); }

  /* ── Body ── */
  .gb { padding: 16px 32px 40px; display: flex; flex-direction: column; gap: 0; }

  /* ── Row ── */
  .grow-wrap {
    border-bottom: 1px solid var(--border);
    padding: 16px 0;
  }
  .grow-wrap:last-child { border-bottom: none; }
  .grow-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .grow-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-3);
  }
  .grow-nav { display: flex; gap: 4px; }
  .grow-nav-btn {
    width: 26px;
    height: 26px;
    border: 1px solid var(--border);
    background: var(--surface);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--text-2);
    transition: var(--t);
  }
  .grow-nav-btn:hover { border-color: var(--text-1); color: var(--text-1); }
  .grow-nav-btn:disabled { opacity: 0.3; cursor: default; }

  /* ── Slider track ── */
  .gslider-outer { overflow: hidden; }
  .gslider-track {
    display: flex;
    gap: 4px;
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
    will-change: transform;
  }

  /* ── Slide card ── */
  .gscard {
    flex-shrink: 0;
    width: 180px;
    height: 120px;
    position: relative;
    overflow: hidden;
    background: var(--border);
    border-radius: 2px;
    cursor: pointer;
  }
  @media (max-width: 600px) { .gscard { width: 140px; height: 94px; } }
  .gscard img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }
  .gscard:hover img { transform: scale(1.06); }
  .gscard-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0);
    transition: background 0.25s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 8px;
  }
  .gscard:hover .gscard-overlay { background: rgba(0,0,0,0.55); }
  .gscard-info {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    opacity: 0;
    transform: translateY(4px);
    transition: all 0.2s ease;
  }
  .gscard:hover .gscard-info { opacity: 1; transform: translateY(0); }
  .gscard-title {
    font-family: var(--font-d);
    font-size: 11px;
    font-weight: 400;
    color: #fff;
    line-height: 1.2;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .gscard-btns { display: flex; gap: 3px; flex-shrink: 0; margin-left: 4px; }
  .gscard-btn {
    width: 22px;
    height: 22px;
    border-radius: 2px;
    border: 1px solid rgba(255,255,255,0.25);
    background: rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    font-size: 10px;
    font-weight: 800;
    transition: var(--t);
  }
  .gscard-btn:hover { background: rgba(255,255,255,0.25); }
  .gscard-btn.p { background: rgba(255,255,255,0.92); color: #111; border-color: transparent; }
  .gscard-btn.p:hover { background: #fff; }
  .gscard-cover {
    position: absolute;
    top: 5px;
    left: 5px;
    background: var(--surface);
    color: var(--text-1);
    font-size: 7px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 2px 5px;
    border-radius: 1px;
    opacity: 0;
    transition: var(--t);
  }
  .gscard:hover .gscard-cover { opacity: 1; }

  /* ── Lightbox ── */
  .lb {
    position: fixed; inset: 0; z-index: 100;
    background: rgba(17,17,16,0.97);
    display: flex; flex-direction: column;
  }
  .lb-hd {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }
  .lb-hd-left p:first-child { font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.35); }
  .lb-hd-left p:last-child { font-family: var(--font-d); font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.25); margin-top: 1px; }
  .lb-hd-right { display: flex; gap: 8px; align-items: center; }
  .lb-trip-btn {
    height: 30px; padding: 0 14px;
    background: #fff; color: #111; border: none; border-radius: 2px;
    font-family: var(--font-b); font-size: 10px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer;
    transition: var(--t);
  }
  .lb-trip-btn:hover { background: #e8e8e8; }
  .lb-close-btn {
    width: 30px; height: 30px; border-radius: 2px;
    border: 1px solid rgba(255,255,255,0.12);
    background: transparent; color: rgba(255,255,255,0.5);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: var(--t);
  }
  .lb-close-btn:hover { border-color: rgba(255,255,255,0.3); color: #fff; }
  .lb-stage {
    flex: 1; display: flex; align-items: center; justify-content: center;
    position: relative; padding: 16px 64px; min-height: 0;
  }
  .lb-stage img { max-height: 100%; max-width: 100%; object-fit: contain; border-radius: 2px; }
  .lb-nav-btn {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 36px; height: 36px; border-radius: 2px;
    border: 1px solid rgba(255,255,255,0.12); background: transparent;
    color: rgba(255,255,255,0.5); display: flex; align-items: center;
    justify-content: center; cursor: pointer; transition: var(--t);
  }
  .lb-nav-btn:hover { border-color: rgba(255,255,255,0.3); color: #fff; background: rgba(255,255,255,0.06); }
  .lb-ft { flex-shrink: 0; padding: 10px 24px 16px; }
  .lb-ft-cap { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .lb-ft-trip { font-family: var(--font-d); font-size: 15px; font-weight: 300; color: rgba(255,255,255,0.65); font-style: italic; }
  .lb-ft-country { font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.22); }
  .lb-strip { display: flex; gap: 3px; overflow-x: auto; }
  .lb-strip::-webkit-scrollbar { height: 0; }
  .lb-thumb {
    flex-shrink: 0; width: 46px; height: 32px; overflow: hidden;
    border-radius: 1px; border: 1.5px solid transparent; cursor: pointer;
    opacity: 0.3; transition: var(--t); background: none; padding: 0;
  }
  .lb-thumb:hover { opacity: 0.65; }
  .lb-thumb.active { border-color: #fff; opacity: 1; }
  .lb-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* ── Empty / Loading ── */
  .g-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 20px; gap: 10px; }
  .g-empty svg { color: var(--border); }
  .g-empty p { font-size: 13px; color: var(--text-3); font-weight: 500; }
  .g-spin { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 20px; gap: 12px; }
  .g-spin p { font-size: 10px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: var(--text-3); }

  @keyframes spin { to { transform: rotate(360deg); } }
`;


function Lightbox({ images, index, onClose, onPrev, onNext, onGoToTrip }) {
  const img = images[index];
  if (!img) return null;
  return (
    <div className="lb" onClick={onClose}>
      <div className="lb-hd" onClick={(e) => e.stopPropagation()}>
        <div className="lb-hd-left">
          <p>{img.tripTitle || "Gallery"}</p>
          <p>{String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</p>
        </div>
        <div className="lb-hd-right">
          <button className="lb-trip-btn" onClick={() => onGoToTrip(img.tripId)}>View Trip →</button>
          <button className="lb-close-btn" onClick={onClose}><X size={13} /></button>
        </div>
      </div>
      <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
        <button className="lb-nav-btn" style={{ left: 12 }} onClick={onPrev}><ChevronLeft size={16} /></button>
        <img src={img.url} alt={img.tripTitle || ""} onError={(e) => { e.currentTarget.src = "https://placehold.co/800x600?text=Unavailable"; }} />
        <button className="lb-nav-btn" style={{ right: 12 }} onClick={onNext}><ChevronRight size={16} /></button>
      </div>
      <div className="lb-ft" onClick={(e) => e.stopPropagation()}>
        <div className="lb-ft-cap">
          <span className="lb-ft-trip">{img.tripTitle}</span>
          <span className="lb-ft-country">{img.country}</span>
        </div>
        <div className="lb-strip">
          {images.map((thumb, i) => (
  <button
    key={i}
    className={`lb-thumb${i === index ? " active" : ""}`}
    type="button"
    onClick={() => onGoToIndex(i)}
  >
    <img src={thumb.url} alt="" />
  </button>
))}
        </div>
      </div>
    </div>
  );
}


const CARD_W = 184; 

function SliderRow({ label, images, onOpen, onGoToTrip }) {
  const [offset, setOffset] = useState(0);
  const outerRef = useRef(null);

  const visibleCount = () => {
    if (!outerRef.current) return 6;
    return Math.floor(outerRef.current.offsetWidth / CARD_W);
  };

  const maxOffset = Math.max(0, images.length - visibleCount());
  const canPrev = offset > 0;
  const canNext = offset < maxOffset;

  const prev = () => setOffset((o) => Math.max(0, o - visibleCount()));
  const next = () => setOffset((o) => Math.min(maxOffset, o + visibleCount()));

  if (!images.length) return null;

  return (
    <div className="grow-wrap">
      <div className="grow-head">
        <span className="grow-label">{label} — {images.length} photos</span>
        <div className="grow-nav">
          <button className="grow-nav-btn" onClick={prev} disabled={!canPrev}><ChevronLeft size={13} /></button>
          <button className="grow-nav-btn" onClick={next} disabled={!canNext}><ChevronRight size={13} /></button>
        </div>
      </div>
      <div className="gslider-outer" ref={outerRef}>
        <div
          className="gslider-track"
          style={{ transform: `translateX(-${offset * CARD_W}px)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="gscard">
              <img
                src={img.url}
                alt={img.tripTitle}
                loading="lazy"
                onError={(e) => { e.currentTarget.src = "https://placehold.co/180x120/e2e0dc/999?text=✕"; }}
              />
              <div className="gscard-overlay">
                <div className="gscard-info">
                  <span className="gscard-title">{img.tripTitle}</span>
                  <div className="gscard-btns">
                    <button className="gscard-btn" onClick={(e) => { e.stopPropagation(); onOpen(img.globalIndex); }} title="Preview">
                      <Maximize2 size={9} />
                    </button>
                    <button className="gscard-btn p" onClick={(e) => { e.stopPropagation(); onGoToTrip(img.tripId); }} title="View Trip">
                      →
                    </button>
                  </div>
                </div>
              </div>
              {img.type === "cover" && <div className="gscard-cover">Cover</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function GalleryPage() {
  const navigate = useNavigate();
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

const goToTrip = useCallback((tripId) => {
  if (tripId) navigate(`/feature/${tripId}`);
}, [navigate]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/trips");
        const trips = Array.isArray(data) ? data : data.trips || data.data || [];
        const collected = [];
        trips.forEach((trip) => {
          const tripTitle = trip.title || "Untitled";
          const tripId = trip._id || trip.id;
          const country = trip.country || "Nepal";
          const hero = resolveImage(trip.featuredImage || trip.heroImage || trip.bannerImage);
          if (hero) collected.push({ url: hero, tripTitle, tripId, country, type: "cover" });
          (trip.galleryImages || trip.gallery || []).forEach((img) => {
            const url = resolveImage(img);
            if (url) collected.push({ url, tripTitle, tripId, country, type: "gallery" });
          });
        });
        setAllImages(collected);
      } catch { setError("Failed to load gallery."); }
      finally { setLoading(false); }
    })();
  }, []);

  const countries = ["All", ...Array.from(new Set(allImages.map((img) => img.country))).filter(Boolean)];

  
  const filtered = allImages
    .map((img, i) => ({ ...img, globalIndex: i }))
    .filter((img) => {
      if (activeFilter !== "All" && img.country !== activeFilter) return false;
      if (search.trim() && !img.tripTitle?.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

  
  const rowSize = Math.ceil(filtered.length / 3);
  const rows = [
    { label: "Row A", images: filtered.slice(0, rowSize) },
    { label: "Row B", images: filtered.slice(rowSize, rowSize * 2) },
    { label: "Row C", images: filtered.slice(rowSize * 2) },
  ].filter((r) => r.images.length > 0);


  const openAt = (globalIdx) => {
    const fi = filtered.findIndex((img) => img.globalIndex === globalIdx);
    setLightboxIndex(fi >= 0 ? fi : 0);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = useCallback(() => setLightboxIndex((p) => (p - 1 + filtered.length) % filtered.length), [filtered.length]);
  const nextImage = useCallback(() => setLightboxIndex((p) => (p + 1) % filtered.length), [filtered.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, prevImage, nextImage]);

  return (
    <div className="gr">
      <style>{css}</style>

     
      <div className="gh">
        <h1 className="gh-title">Expedition <em>Gallery</em></h1>
        {!loading && <span className="gh-count">{allImages.length} photographs</span>}
        <div className="gh-search">
          <Search size={13} />
          <input
            type="text"
            placeholder="Search trips…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

     
      <div className="gf">
        <span className="gf-label"><Filter size={10} style={{ display: "inline", marginRight: 4 }} />Filter</span>
        {countries.map((c) => (
          <button
            key={c}
            className={`gf-btn${activeFilter === c ? " active" : ""}`}
            onClick={() => setActiveFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

     
      <div className="gb">
        {loading && (
          <div className="g-spin">
            <div style={{ position: "relative", width: 40, height: 40 }}>
              <Loader2 style={{ width: 40, height: 40, animation: "spin 1s linear infinite", color: "#e2e0dc", position: "absolute", inset: 0 }} />
              <Mountain style={{ width: 16, height: 16, color: "#4a4845", position: "absolute", inset: 0, margin: "auto" }} />
            </div>
            <p>Loading Gallery…</p>
          </div>
        )}

        {!loading && error && (
          <div className="g-empty"><ImageIcon size={32} /><p>{error}</p></div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="g-empty"><ImageIcon size={32} /><p>No images found</p></div>
        )}

        {!loading && !error && rows.map((row, ri) => (
          <SliderRow
            key={ri}
            label={row.label}
            images={row.images}
            onOpen={openAt}
            onGoToTrip={goToTrip}
          />
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
          onGoToTrip={goToTrip}
        />
      )}
    </div>
  );
}