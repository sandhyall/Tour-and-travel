import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import ListBuilder from "../components/ListBuilder";
import ItineraryBuilder from "../components/ItineraryForm";
import PackageBuilder from "../components/PackageBuilder";

import { Save } from "lucide-react";
import {
  FaCloudUploadAlt,
  FaTrash,
  FaImages,
  FaPlus,
  FaTags,
  FaCalendarAlt,
  FaAward,
} from "react-icons/fa";

export default function AddTrip() {
  
  const [form, setForm] = useState({
    title: "",
    country: "Nepal",
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
    categoryType: "standard",
    badge: false,
    isBestSeller2026: false,
    isLuxuryVIP: false,
    isPeakClimbing: false,
    isShortTrek: false,
    isBhutanTour: false,
    isTibetTour: false,
  });

  
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  const [highlights, setHighlights] = useState([]);
  const [includes, setIncludes] = useState([]);
  const [excludes, setExcludes] = useState([]);
  const [packages, setPackages] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  const [availableDates, setAvailableDates] = useState([
    { date: "", totalSeats: "", price: "", status: "available" },
  ]);

 
  useEffect(() => {
    return () => {
      if (featuredImage?.preview) URL.revokeObjectURL(featuredImage.preview);
      gallery.forEach((img) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
    };
  
  }, []);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => {
      let updatedForm = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

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


  const handleDateChange = (index, field, value) => {
    setAvailableDates((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addDateRow = () => {
    setAvailableDates((prev) => [
      ...prev,
      { date: "", totalSeats: "", price: "", status: "available" },
    ]);
  };

  const removeDateRow = (index) => {
    setAvailableDates((prev) => prev.filter((_, i) => i !== index));
  };

  /* ==========================================================================
     MEDIA IMAGE HANDLERS
     ========================================================================== */
  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (featuredImage?.preview) URL.revokeObjectURL(featuredImage.preview);
      setFeaturedImage(Object.assign(file, { preview: URL.createObjectURL(file) }));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setGallery((prev) => [...prev, ...newImages]);
  };

  const removeFeaturedImage = () => {
    if (featuredImage?.preview) URL.revokeObjectURL(featuredImage.preview);
    setFeaturedImage(null);
  };

  const removeGalleryImage = (index) => {
    const target = gallery[index];
    if (target?.preview) URL.revokeObjectURL(target.preview);
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  /* ==========================================================================
     FAQ HANDLERS
     ========================================================================== */
  const handleFaqChange = (index, field, value) => {
    setFaqs((prev) =>
      prev.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq))
    );
  };

  const addFaq = () => setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  const removeFaq = (index) => setFaqs((prev) => prev.filter((_, i) => i !== index));

 
  const resetForm = () => {
    setForm({
      title: "",
      country: "Nepal",
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
      categoryType: "standard",
      badge: false,
      isBestSeller2026: false,
      isLuxuryVIP: false,
      isPeakClimbing: false,
      isShortTrek: false,
      isBhutanTour: false,
      isTibetTour: false,
    });
    setFeaturedImage(null);
    setGallery([]);
    setItinerary([]);
    setIncludes([]);
    setExcludes([]);
    setHighlights([]);
    setPackages([]);
    setFaqs([{ question: "", answer: "" }]);
    setAvailableDates([{ date: "", totalSeats: "", price: "", status: "available" }]);
  };

  /* ==========================================================================
     SUBMIT
     ========================================================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    
    if (!form.title.trim()) {
      setSubmitError("Expedition title is required.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);

    const formData = new FormData();

   
    const finalizedForm = {
      ...form,
      isBhutanTour: form.country === "Bhutan",
      isTibetTour: form.country === "Tibet",
    };

    
    Object.entries(finalizedForm).forEach(([key, value]) => {
     
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    });


    const filteredDates = availableDates.filter(
      (d) => d.date !== "" && d.totalSeats !== ""
    );

    formData.append("itinerary", JSON.stringify(itinerary));
    formData.append("includes", JSON.stringify(includes));
    formData.append("excludes", JSON.stringify(excludes));
    formData.append("highlights", JSON.stringify(highlights));
    formData.append("faqs", JSON.stringify(faqs));
    formData.append("packages", JSON.stringify(packages));
    formData.append("availableDates", JSON.stringify(filteredDates));

    if (featuredImage) {
      formData.append("featuredImage", featuredImage);
    }

    gallery.forEach((file) => {
      formData.append("gallery", file);
    });

    try {
     
      await axios.post("/trips", formData);

      setSubmitSuccess(true);
      resetForm();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error publishing expedition:", error);
      const msg =
        error.response?.status === 401
          ? "Session expired — please log in again."
          : error.response?.data?.message || "Failed to publish expedition.";
      setSubmitError(msg);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle =
    "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400";
  const labelStyle =
    "block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1";

  return (
    <div className="flex bg-[#f8fafc] min-h-screen font-sans antialiased text-slate-900">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Create Expedition <span className="text-indigo-600">.</span>
            </h1>
          </header>

         
          {submitSuccess && (
            <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
              <span className="text-emerald-600 text-lg">✓</span>
              <p className="text-emerald-800 font-semibold text-sm">
                Expedition published successfully! The form has been reset.
              </p>
            </div>
          )}
          {submitError && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3">
              <span className="text-red-500 text-lg">✕</span>
              <p className="text-red-700 font-semibold text-sm">{submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12" encType="multipart/form-data">
          
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-violet-600"></div>
              <h2 className="text-xl font-black mb-8">🖼️ Media Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               
                <div className="md:col-span-1 space-y-2">
                  <label className={labelStyle}>Cover Image</label>
                  <div className="relative border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-2xl h-64 flex flex-col items-center justify-center bg-slate-50 overflow-hidden group transition-all">
                    {featuredImage ? (
                      <>
                        <img
                          src={featuredImage.preview}
                          alt="Featured"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                          <button
                            type="button"
                            onClick={removeFeaturedImage}
                            className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full p-4 text-center">
                        <FaCloudUploadAlt
                          className="text-slate-400 group-hover:text-indigo-500 mb-2 transition-colors"
                          size={32}
                        />
                        <span className="text-sm font-bold text-slate-600">Upload Cover</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFeaturedImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

              
                <div className="md:col-span-2 space-y-2">
                  <label className={labelStyle}>Gallery Images</label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-2xl p-6 min-h-64 flex flex-col bg-slate-50 transition-all">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                      {gallery.map((img, index) => (
                        <div
                          key={index}
                          className="relative aspect-video rounded-xl overflow-hidden group border border-slate-200 shadow-sm"
                        >
                          <img src={img.preview} alt="Gallery" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(index)}
                              className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                      <label className="cursor-pointer border-2 border-dashed border-slate-300 hover:border-indigo-400 bg-white rounded-xl aspect-video flex flex-col items-center justify-center p-2 text-center transition-all hover:shadow-sm">
                        <FaImages className="text-slate-400 mb-1" size={20} />
                        <span className="text-xs font-bold text-slate-600">Add More</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleGalleryChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {gallery.length === 0 && (
                      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto">
                        <p className="text-sm font-medium text-slate-400">
                          No gallery images uploaded yet
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

          
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
              <h2 className="text-xl font-black mb-8">📍 Primary Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                <div className="md:col-span-4">
                  <label className={labelStyle}>Expedition Title</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., Annapurna Circuit Trek"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelStyle}>Region / Country</label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleInputChange}
                    className={inputStyle}
                  >
                    <option value="Nepal">Nepal</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Tibet">Tibet</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className={labelStyle}>Duration (Days)</label>
                  <input
                    type="number"
                    name="duration"
                    value={form.duration}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., 14"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelStyle}>Current Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., 1200"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelStyle}>Old Price ($)</label>
                  <input
                    type="number"
                    name="oldPrice"
                    value={form.oldPrice}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., 1500"
                  />
                </div>
                <div className="md:col-span-6">
                  <label className={labelStyle}>Marketing Overview</label>
                  <textarea
                    name="overview"
                    value={form.overview}
                    onChange={handleInputChange}
                    rows="3"
                    className={inputStyle}
                    placeholder="Compelling summary..."
                  />
                </div>
              </div>
            </section>

         
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
              <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                <FaAward className="text-blue-500" /> Service Tiers & Popular Badges
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={labelStyle}>Comfort/Service Category</label>
                  <select
                    name="categoryType"
                    value={form.categoryType}
                    onChange={handleInputChange}
                    className={inputStyle}
                  >
                    <option value="standard">Standard Trek</option>
                    <option value="comfort">Comfort Trek</option>
                    <option value="luxury">Luxury Trek</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex items-end">
                  <label className="w-full flex items-center gap-3 p-4 border border-slate-100 bg-slate-50/50 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all select-none">
                    <input
                      type="checkbox"
                      name="badge"
                      checked={form.badge}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-indigo-500 border-slate-300 transition-all cursor-pointer"
                    />
                    <div>
                      <span className="block text-sm font-bold text-slate-700">
                        Mark as Popular Trek (Homepage Default)
                      </span>
                      <span className="block text-[11px] text-slate-400 font-medium">
                        
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* 🏷️ PROMOTIONAL CATEGORIES */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
              <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                <FaTags className="text-emerald-500" /> Promotional Categories & Tabs
              </h2>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
                Active Content Filter Tabs for Homepage Display:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {form.country === "Nepal" && (
                  <>
                    {[
                      { name: "isBestSeller2026", label: "Best Seller 2026", sub: "Trending journeys" },
                      { name: "isLuxuryVIP", label: "Luxury / VIP Tour", sub: "Premium packages" },
                      { name: "isPeakClimbing", label: "Peak Climbing", sub: "High expeditions" },
                      { name: "isShortTrek", label: "Short Trek", sub: "Under 7 days" },
                    ].map(({ name, label, sub }) => (
                      <label
                        key={name}
                        className="flex items-center gap-3 p-4 border border-slate-100 bg-slate-50/50 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all select-none"
                      >
                        <input
                          type="checkbox"
                          name={name}
                          checked={form[name]}
                          onChange={handleInputChange}
                          className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-indigo-500 border-slate-300 transition-all cursor-pointer"
                        />
                        <div>
                          <span className="block text-sm font-bold text-slate-700">{label}</span>
                          <span className="block text-[11px] text-slate-400 font-medium">{sub}</span>
                        </div>
                      </label>
                    ))}
                  </>
                )}

                {form.country === "Bhutan" && (
                  <label className="flex items-center gap-3 p-4 border border-emerald-200 bg-emerald-50/30 rounded-2xl cursor-not-allowed select-none md:col-span-3">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      readOnly
                      className="w-5 h-5 rounded-lg text-emerald-600 border-slate-300 cursor-not-allowed"
                    />
                    <div>
                      <span className="block text-sm font-bold text-emerald-800">Bhutan Exclusive Active</span>
                      <span className="block text-[11px] text-emerald-600 font-medium">
                        यो ट्रिप स्वतः भूटान एक्सक्लुसिभ होमपेज ट्याब (Bhutan Tour Tab) मा देखा पर्नेछ।
                      </span>
                    </div>
                  </label>
                )}

                {form.country === "Tibet" && (
                  <label className="flex items-center gap-3 p-4 border border-blue-200 bg-blue-50/30 rounded-2xl cursor-not-allowed select-none md:col-span-3">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      readOnly
                      className="w-5 h-5 rounded-lg text-blue-600 border-slate-300 cursor-not-allowed"
                    />
                    <div>
                      <span className="block text-sm font-bold text-blue-800">Tibet Exclusive Active</span>
                      <span className="block text-[11px] text-blue-600 font-medium">
                        यो ट्रिप स्वतः तिब्बत एक्सक्लुसिभ होमपेज ट्याब (Tibet Tour Tab) मा देखा पर्नेछ।
                      </span>
                    </div>
                  </label>
                )}
              </div>
            </section>

            {/* 📅 AVAILABLE DATES MATRIX */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500"></div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black flex items-center gap-3">
                  <FaCalendarAlt className="text-cyan-500" /> Operational Fixed Dates Matrix
                </h2>
                <button
                  type="button"
                  onClick={addDateRow}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm transition-all"
                >
                  <FaPlus size={12} /> Add Date Slot
                </button>
              </div>

              <div className="space-y-4">
                {availableDates.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 items-end relative group"
                  >
                    <div className="sm:col-span-4">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                        Departure Date
                      </label>
                      <input
                        type="date"
                        value={item.date}
                        onChange={(e) => handleDateChange(index, "date", e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-cyan-500 text-slate-700 font-medium text-sm transition-all"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                        Total Seats
                      </label>
                      <input
                        type="number"
                        placeholder="e.g., 15"
                        value={item.totalSeats}
                        onChange={(e) => handleDateChange(index, "totalSeats", e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-cyan-500 text-slate-700 font-medium text-sm transition-all"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                        Custom Price ($)
                      </label>
                      <input
                        type="number"
                        placeholder="Optional"
                        value={item.price}
                        onChange={(e) => handleDateChange(index, "price", e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-cyan-500 text-slate-700 font-medium text-sm transition-all"
                      />
                    </div>
                    <div className="sm:col-span-2 flex items-center justify-between gap-2">
                      <div className="flex-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                          Status
                        </label>
                        <select
                          value={item.status}
                          onChange={(e) => handleDateChange(index, "status", e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-cyan-500 text-slate-700 font-medium text-sm transition-all"
                        >
                          <option value="available">Available</option>
                          <option value="limited">Limited</option>
                          <option value="sold-out">Sold Out</option>
                        </select>
                      </div>
                      {availableDates.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDateRow(index)}
                          className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors mb-0.5"
                        >
                          <FaTrash size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 📦 PACKAGE BUILDER */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <Save className="text-blue-500" size={18} /> Budget Tier Configurations
              </h2>
              <PackageBuilder data={packages} setData={setPackages} />
            </section>

            {/* ⚙️ TECHNICAL DETAILS */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
              <h2 className="text-xl font-black mb-8">⚙️ Technical Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={labelStyle}>Difficulty Level</label>
                  <select
                    name="difficulty"
                    value={form.difficulty}
                    onChange={handleInputChange}
                    className={inputStyle}
                  >
                    <option value="">Select Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Difficult">Difficult</option>
                    <option value="Strenuous">Strenuous</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>Activity Type</label>
                  <input
                    name="activity"
                    value={form.activity}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., Trekking"
                  />
                </div>
                <div>
                  <label className={labelStyle}>Max Altitude</label>
                  <input
                    name="maxAltitude"
                    value={form.maxAltitude}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., 5,416m"
                  />
                </div>
                <div>
                  <label className={labelStyle}>Best Season</label>
                  <input
                    name="bestSeason"
                    value={form.bestSeason}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., Mar-May"
                  />
                </div>
                <div>
                  <label className={labelStyle}>Start Point</label>
                  <input
                    name="startPoint"
                    value={form.startPoint}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., Kathmandu"
                  />
                </div>
                <div>
                  <label className={labelStyle}>End Point</label>
                  <input
                    name="endPoint"
                    value={form.endPoint}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., Pokhara"
                  />
                </div>
                <div>
                  <label className={labelStyle}>Meals Provided</label>
                  <input
                    name="meals"
                    value={form.meals}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., B/L/D"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelStyle}>Accommodation</label>
                  <input
                    name="accommodation"
                    value={form.accommodation}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., Teahouse"
                  />
                </div>
              </div>
            </section>

            {/* ⭐ LIST BUILDERS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 border-t-4 border-t-amber-400">
                <h3 className="font-black text-slate-800 mb-4">⭐ Highlights</h3>
                <ListBuilder data={highlights} setData={setHighlights} title="Highlight" />
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 border-t-4 border-t-green-400">
                <h3 className="font-black text-slate-800 mb-4">✅ Includes</h3>
                <ListBuilder data={includes} setData={setIncludes} title="Inclusions" />
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 border-t-4 border-t-red-400">
                <h3 className="font-black text-slate-800 mb-4">❌ Excludes</h3>
                <ListBuilder data={excludes} setData={setExcludes} title="Exclusions" />
              </div>
            </div>

            {/* 🗺️ ITINERARY */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10">
              <h2 className="text-xl font-black mb-6">🗺️ Tactical Route Itinerary</h2>
              <ItineraryBuilder itinerary={itinerary} setItinerary={setItinerary} />
            </section>

            {/* 💬 FAQ */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black">💬 Frequently Asked Questions</h2>
                <button
                  type="button"
                  onClick={addFaq}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                  <FaPlus size={10} /> Add Q&A Block
                </button>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 relative group"
                  >
                    <input
                      placeholder="Question..."
                      value={faq.question}
                      onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-semibold text-sm text-slate-700"
                    />
                    <textarea
                      rows="2"
                      placeholder="Answer..."
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm text-slate-600 font-medium"
                    />
                    {faqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFaq(index)}
                        className="absolute top-2 right-2 p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <FaTrash size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* 🚀 SUBMIT */}
            <div className="flex justify-end pt-4 pb-12">
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all transform active:scale-[0.98] flex items-center gap-3"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish Expedition"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}