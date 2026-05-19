import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { 
  X, 
  Save, 
  MapPin, 
  Image as ImageIcon, 
  ArrowLeft,
  Eye
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import ItineraryBuilder from "../components/ItineraryForm";
import PackageBuilder from "../components/PackageBuilder";
import ListBuilder from "../components/ListBuilder";

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    country: "Nepal",
    category: "",
    categoryType: "standard", 
    duration: "",
    price: "",
    oldPrice: "",
    overview: "",
    difficulty: "",
    activity: "",
    maxAltitude: "",
    bestSeason: "",
    startPoint: "",
    endPoint: "",
    meals: "",
    accommodation: "",
    
    // Operational categories state matrix variables
    isBestSeller2026: false,
    isLuxuryVIP: false,
    isPeakClimbing: false,
    isShortTrek: false,
    isBhutanTour: false,
    isTibetTour: false, // 🎯 New Field for Tibet routing
  });

  // Track raw file state for new uploads
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  // Track current image references from the DB to display placeholders/previews
  const [existingHero, setExistingHero] = useState("");
  const [existingGallery, setExistingGallery] = useState([]);
  
  // Track schema dates so edits don't inadvertently blow away logistics
  const [availableDates, setAvailableDates] = useState([]);

  // Dynamic state arrays
  const [itinerary, setItinerary] = useState([]);
  const [packages, setPackages] = useState([]);
  const [includes, setIncludes] = useState([]);
  const [excludes, setExcludes] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await axios.get(`/trips/${id}`);
        setForm({
          title: data.title || "",
          country: data.country || "Nepal",
          category: data.category || "",
          categoryType: data.categoryType || "standard", 
          duration: data.duration || "",
          price: data.price || "",
          oldPrice: data.oldPrice || "",
          overview: data.overview || "",
          difficulty: data.difficulty || "",
          activity: data.activity || "",
          maxAltitude: data.maxAltitude || "",
          bestSeason: data.bestSeason || "",
          startPoint: data.startPoint || "",
          endPoint: data.endPoint || "",
          meals: data.meals || "",
          accommodation: data.accommodation || "",
          isBestSeller2026: data.isBestSeller2026 || false,
          isLuxuryVIP: data.isLuxuryVIP || false,
          isPeakClimbing: data.isPeakClimbing || false,
          isShortTrek: data.isShortTrek || false,
          isBhutanTour: data.isBhutanTour || false,
          isTibetTour: data.isTibetTour || false, // 🎯 Backend bata dynamic check lyaune
        });

        setItinerary(data.itinerary || []);
        setPackages(data.packages || []);
        setIncludes(data.includes || []);
        setExcludes(data.excludes || []);
        setHighlights(data.highlights || []);
        setFaqs(data.faqs || []);
        setAvailableDates(data.availableDates || []);

        setExistingHero(data.featuredImage?.url || data.featuredImage || data.heroImage?.url || "");
        setExistingGallery(data.gallery || data.galleryImages || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchTrip();
  }, [id]);

  // Clean up object URLs to prevent browser memory leaks
  useEffect(() => {
    return () => {
      if (featuredImage?.preview) URL.revokeObjectURL(featuredImage.preview);
      gallery.forEach((img) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
    };
  }, [featuredImage, gallery]);

  /* ==========================================================================
     🌍 AUTOMATED COUNTRY CONDITIONAL ROUTING HANDLER (EDIT ENGINE)
     ========================================================================== */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setForm((prev) => {
      let updatedForm = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Dropdown ma country active swtich huda conditions auto sync hunchha:
      if (name === "country") {
        if (value === "Nepal") {
          updatedForm.isBhutanTour = false;
          updatedForm.isTibetTour = false;
        } else if (value === "Bhutan") {
          updatedForm.isBhutanTour = true;
          updatedForm.isTibetTour = false;
          updatedForm.isPeakClimbing = false;
          updatedForm.isShortTrek = false;
          updatedForm.isBestSeller2026 = false;
          updatedForm.isLuxuryVIP = false;
        } else if (value === "Tibet") {
          updatedForm.isBhutanTour = false;
          updatedForm.isTibetTour = true;
          updatedForm.isPeakClimbing = false;
          updatedForm.isShortTrek = false;
          updatedForm.isBestSeller2026 = false;
          updatedForm.isLuxuryVIP = false;
        }
      }

      return updatedForm;
    });
  };

  const handleHeroImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (featuredImage?.preview) URL.revokeObjectURL(featuredImage.preview);
      setFeaturedImage(Object.assign(file, { preview: URL.createObjectURL(file) }));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const filesWithPreview = files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setGallery((prev) => [...prev, ...filesWithPreview]);
  };

  const handleFaqChange = (index, field, value) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      )
    );
  };

  const handleRemoveExistingGalleryItem = (indexToRemove) => {
    setExistingGallery((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleRemoveStagedGalleryItem = (indexToRemove) => {
    setGallery((prev) => {
      const target = prev[indexToRemove];
      if (target?.preview) URL.revokeObjectURL(target.preview);
      return prev.filter((_, idx) => idx !== indexToRemove);
    });
  };

  /* ==========================================================================
     API DISPATCH WITH STATE NORMALIZATION
     ========================================================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      
      // Update data logic arrays before posting out
      const finalizedForm = { ...form };
      if (finalizedForm.country === "Bhutan") {
        finalizedForm.isBhutanTour = true;
        finalizedForm.isTibetTour = false;
      } else if (finalizedForm.country === "Tibet") {
        finalizedForm.isTibetTour = true;
        finalizedForm.isBhutanTour = false;
      } else {
        finalizedForm.isBhutanTour = false;
        finalizedForm.isTibetTour = false;
      }

      Object.keys(finalizedForm).forEach((k) => {
        if (finalizedForm[k] !== undefined && finalizedForm[k] !== null) {
          fd.append(k, finalizedForm[k]);
        }
      });

      fd.append("itinerary", JSON.stringify(itinerary));
      fd.append("packages", JSON.stringify(packages));
      fd.append("includes", JSON.stringify(includes));
      fd.append("excludes", JSON.stringify(excludes));
      fd.append("highlights", JSON.stringify(highlights));
      fd.append("faqs", JSON.stringify(faqs));
      fd.append("availableDates", JSON.stringify(availableDates));
      fd.append("existingGallery", JSON.stringify(existingGallery));

      if (featuredImage) {
        fd.append("featuredImage", featuredImage);
      }
      if (gallery.length > 0) {
        gallery.forEach((img) => fd.append("gallery", img));
      }

      await axios.put(`/trips/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Trip Configuration Updated Successfully ✨");
      navigate("/trips");
    } catch (err) {
      console.error("Submission failed:", err.response?.data || err.message);
      alert(`Update failed: ${err.response?.data?.message || "Internal Server Error"}`);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium text-sm shadow-sm";
  const sectionClass =
    "bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6";
  const labelClass =
    "block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5";
  const checkboxLabelClass = 
    "flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-100/70 transition-all text-xs font-bold text-slate-700 uppercase tracking-wide";

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900 antialiased font-sans">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 lg:p-12 max-w-5xl">
        <header className="mb-10 pb-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button 
              type="button"
              onClick={() => navigate("/trips")}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-wider mb-3"
            >
              <ArrowLeft size={14} /> Back To Inventory
            </button>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Edit Expedition Profile <span className="text-indigo-600">.</span>
            </h1>
            <p className="text-slate-500 text-xs font-medium mt-1">
              Adjust logistics, itinerary matrices, and active media galleries.
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
          
          {/* MAP CONFIGS SECTION */}
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
              <MapPin size={18} className="text-indigo-500" /> Core Logistical Profiles
            </h2>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Trip Title</label>
                <input
                  name="title"
                  className={inputClass}
                  placeholder="e.g. Everest Base Camp Trek"
                  value={form.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Destination Country</label>
                  <select
                    name="country"
                    className={inputClass}
                    value={form.country}
                    onChange={handleInputChange}
                  >
                    <option value="Nepal">Nepal</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Tibet">Tibet</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Trip Category</label>
                  <select
                    name="category"
                    className={inputClass}
                    value={form.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Trekking">Trekking</option>
                    <option value="Tour">Tour</option>
                    <option value="Peak Climbing">Peak Climbing</option>
                    <option value="Expedition">Expedition</option>
                    <option value="Day Tours">Day Tours</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Category Type</label>
                  <select
                    name="categoryType"
                    className={inputClass}
                    value={form.categoryType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="standard">Standard</option>
                    <option value="luxury">Luxury</option>
                    <option value="budget">Budget</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Duration</label>
                  <input
                    name="duration"
                    className={inputClass}
                    placeholder="e.g. 14 Days"
                    value={form.duration}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className={labelClass}>Current Booking Cost ($)</label>
                  <input
                    name="price"
                    type="number"
                    className={inputClass}
                    placeholder="e.g. 1450"
                    value={form.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Old Cut Price ($)</label>
                  <input
                    name="oldPrice"
                    type="number"
                    className={inputClass}
                    placeholder="e.g. 1750"
                    value={form.oldPrice}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Difficulty Grade</label>
                  <input
                    name="difficulty"
                    className={inputClass}
                    placeholder="e.g. Strenuous"
                    value={form.difficulty}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className={labelClass}>Peak Altitude Threshold</label>
                  <input
                    name="maxAltitude"
                    className={inputClass}
                    placeholder="e.g. 5,545m (Kala Patthar)"
                    value={form.maxAltitude}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className={labelClass}>Optimized Climbing Season</label>
                  <input
                    name="bestSeason"
                    className={inputClass}
                    placeholder="e.g. March - May / Sept - Nov"
                    value={form.bestSeason}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* 🏷️ DYNAMIC CONDITIONAL PROMOTIONAL CATEGORIES */}
              <div className="pt-2">
                <label className={labelClass}>Promotional Categories & Tab Visibility</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  
                  {/* Rendering options when country is Nepal */}
                  {form.country === "Nepal" && (
                    <>
                      <label className={checkboxLabelClass}>
                        <input
                          type="checkbox"
                          name="isBestSeller2026"
                          checked={form.isBestSeller2026}
                          onChange={handleInputChange}
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                        />
                        🔥 Best Seller 2026
                      </label>

                      <label className={checkboxLabelClass}>
                        <input
                          type="checkbox"
                          name="isLuxuryVIP"
                          checked={form.isLuxuryVIP}
                          onChange={handleInputChange}
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                        />
                        💎 Luxury VIP Tour
                      </label>

                      <label className={checkboxLabelClass}>
                        <input
                          type="checkbox"
                          name="isPeakClimbing"
                          checked={form.isPeakClimbing}
                          onChange={handleInputChange}
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                        />
                        🏔️ Peak Climbing
                      </label>

                      <label className={checkboxLabelClass}>
                        <input
                          type="checkbox"
                          name="isShortTrek"
                          checked={form.isShortTrek}
                          onChange={handleInputChange}
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                        />
                        🥾 Short Trek
                      </label>
                    </>
                  )}

                  {/* Rendering options when country is Bhutan */}
                  {form.country === "Bhutan" && (
                    <label className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl cursor-not-allowed select-none md:col-span-3 text-xs font-bold text-emerald-800">
                      <input
                        type="checkbox"
                        name="isBhutanTour"
                        checked={form.isBhutanTour}
                        disabled
                        className="w-4 h-4 rounded text-emerald-600 border-slate-300 cursor-not-allowed"
                      />
                      🇧🇹 Bhutan Exclusive Active (स्वतः भूटान ट्याब फिल्टरमा देखा पर्नेछ)
                    </label>
                  )}

                  {/* Rendering options when country is Tibet */}
                  {form.country === "Tibet" && (
                    <label className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-xl cursor-not-allowed select-none md:col-span-3 text-xs font-bold text-blue-800">
                      <input
                        type="checkbox"
                        name="isTibetTour"
                        checked={form.isTibetTour}
                        disabled
                        className="w-4 h-4 rounded text-blue-600 border-slate-300 cursor-not-allowed"
                      />
                      🇨🇳 Tibet Exclusive Active (स्वतः तिब्बत ट्याब फिल्टरमा देखा पर्नेछ)
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass}>Operational Summary / Overview</label>
                <textarea
                  name="overview"
                  className={`${inputClass} min-h-[140px] p-4 resize-none leading-relaxed`}
                  placeholder="Provide deep architectural overview regarding route challenges..."
                  value={form.overview}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* DIGITAL ASSET MANAGEMENT */}
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
              <ImageIcon size={18} className="text-emerald-500" /> Digital Asset Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="p-5 border border-slate-100 bg-slate-50/50 rounded-2xl space-y-4">
                <label className={labelClass}>Hero Banner Image</label>
                {(featuredImage?.preview || existingHero) && (
                  <div className="h-40 w-full relative rounded-xl overflow-hidden bg-slate-900 border border-slate-100 group shadow-inner">
                    <img 
                      src={featuredImage?.preview || existingHero} 
                      alt="Hero preview" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent flex items-end p-3">
                      <span className="text-[10px] bg-slate-900/80 text-slate-200 font-bold px-2 py-0.5 rounded backdrop-blur-xs uppercase tracking-wide inline-flex items-center gap-1">
                        <Eye size={10} /> Live Profile Rendering
                      </span>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 transition-all cursor-pointer"
                  onChange={handleHeroImageChange}
                />
              </div>

              <div className="p-5 border border-slate-100 bg-slate-50/50 rounded-2xl space-y-4">
                <label className={labelClass}>Gallery Collection Updates</label>
                
                <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto p-2 bg-white border border-slate-100 rounded-xl shadow-inner">
                  {existingGallery.map((img, idx) => {
                    const srcUrl = img.url || img;
                    return (
                      <div key={`exist-${idx}`} className="relative h-14 rounded-lg overflow-hidden border border-slate-200 group bg-slate-100">
                        <img src={srcUrl} className="w-full h-full object-cover" alt="Remote DB asset" />
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingGalleryItem(idx)}
                          className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} strokeWidth={3} />
                        </button>
                      </div>
                    );
                  })}

                  {gallery.map((img, idx) => (
                    <div key={`staged-${idx}`} className="relative h-14 rounded-lg overflow-hidden border border-emerald-300 group bg-slate-100 ring-2 ring-emerald-500/20">
                      <img src={img.preview} className="w-full h-full object-cover" alt="Local staged blob" />
                      <button
                        type="button"
                        onClick={() => handleRemoveStagedGalleryItem(idx)}
                        className="absolute inset-0 bg-slate-900/90 text-amber-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} strokeWidth={3} />
                      </button>
                    </div>
                  ))}
                </div>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="block w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all cursor-pointer"
                  onChange={handleGalleryChange}
                />
              </div>

            </div>
          </section>

          {/* BUILDERS MODULES */}
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              📅 Itinerary Planner
            </h2>
            <ItineraryBuilder data={itinerary} setData={setItinerary} />
          </section>

          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              💼 Service Packages
            </h2>
            <PackageBuilder data={packages} setData={setPackages} />
          </section>

          {/* LIST BUILDERS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={sectionClass}>
              <h2 className="text-lg font-bold text-slate-800">⭐ Highlights</h2>
              <ListBuilder title="Highlight" data={highlights} setData={setHighlights} />
            </div>
            
            <div className={sectionClass}>
              <h2 className="text-lg font-bold text-slate-800">📌 Includes</h2>
              <ListBuilder title="Include" data={includes} setData={setIncludes} />
            </div>

            <div className={sectionClass}>
              <h2 className="text-lg font-bold text-slate-800">❌ Excludes</h2>
              <ListBuilder title="Exclude" data={excludes} setData={setExcludes} />
            </div>
          </div>

          {/* FREQUENTLY ASKED QUESTIONS */}
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-slate-800 border-b pb-3 mb-4 text-center md:text-left">
              ❓ Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2 relative group"
                >
                  <input
                    placeholder="The Question..."
                    className={`${inputClass} font-semibold`}
                    value={f.question}
                    onChange={(e) => handleFaqChange(i, "question", e.target.value)}
                  />
                  <textarea
                    placeholder="The Answer..."
                    className={`${inputClass} text-sm`}
                    value={f.answer}
                    onChange={(e) => handleFaqChange(i, "answer", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setFaqs(faqs.filter((_, idx) => idx !== i))}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="w-full py-3 border-2 border-dashed border-blue-200 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}
              >
                + Add New FAQ Item
              </button>
            </div>
          </section>

          {/* ACTIONS FOOTER BAR */}
          <div className="flex items-center gap-4 pt-6 sticky bottom-6 bg-[#f8fafc]/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/60 z-20">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-md shadow-lg shadow-indigo-200 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Save size={18} /> Save & Update Trip Configuration
            </button>
            <button
              type="button"
              onClick={() => navigate("/trips")}
              className="px-8 bg-slate-200 hover:bg-slate-300 text-slate-700 py-4 rounded-xl font-bold text-md transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}