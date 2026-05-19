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
  /* ==========================================================================
     CORE STATE MANAGEMENT
     ========================================================================== */
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

    categoryType: "standard", // default Value
    badge: false, 


    // Reset bug bypass values declaration handles uncontrolled input safely
    isBestSeller2026: false,
    isLuxuryVIP: false,
    isPeakClimbing: false,
    isShortTrek: false,
    isBhutanTour: false,
  });

  // Media Collections File Upload State Array Buffers
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  // Data Structural Array Templates Builders
  const [highlights, setHighlights] = useState([]);
  const [includes, setIncludes] = useState([]);
  const [excludes, setExcludes] = useState([]);
  const [packages, setPackages] = useState([]);
  const [itinerary, setItinerary] = useState([]);

  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  // New Matrix Dynamic Matrix Scheduler Dates State Array
  const [availableDates, setAvailableDates] = useState([
    { date: "", totalSeats: "", price: "", status: "available" },
  ]);

  /* ==========================================================================
     CLEANUP MEMORY LEAKS ON UNMOUNT (BLOBS)
     ========================================================================== */
  useEffect(() => {
    return () => {
      if (featuredImage?.preview) URL.revokeObjectURL(featuredImage.preview);
      gallery.forEach((img) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
    };
  }, [featuredImage, gallery]);

 const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => {
      let updatedForm = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Yadi user le country dropdown select garyo bhane automated conditional mapping trigger hunchha:
      if (name === "country") {
        if (value === "Nepal") {
          updatedForm.isBhutanTour = false;
          updatedForm.isTibetTour = false;
        } else if (value === "Bhutan") {
          // Bhutan select huda direct Bhutan configuration parameters true, aru false hunchha
          updatedForm.isBhutanTour = true;
          updatedForm.isTibetTour = false;
          updatedForm.isPeakClimbing = false;
          updatedForm.isShortTrek = false;
          updatedForm.isBestSeller2026 = false;
          updatedForm.isLuxuryVIP = false;
        } else if (value === "Tibet") {
          // Tibet select huda Tibet tab routing active, aru reset hunchha
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
  /* ==========================================================================
     AVAILABLE DATES HANDLERS
     ========================================================================== */
  const handleDateChange = (index, field, value) => {
    setAvailableDates((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const addDateRow = () => {
    setAvailableDates([
      ...availableDates,
      { date: "", totalSeats: "", price: "", status: "available" },
    ]);
  };

  const removeDateRow = (index) => {
    setAvailableDates(availableDates.filter((_, i) => i !== index));
  };

  /* ==========================================================================
     MEDIA IMAGE SELECTION LOGIC
     ========================================================================== */
  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (featuredImage?.preview) URL.revokeObjectURL(featuredImage.preview);
      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setFeaturedImage(fileWithPreview);
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    setGallery((prev) => [...prev, ...newImages]);
  };

  const removeFeaturedImage = () => {
    if (featuredImage?.preview) URL.revokeObjectURL(featuredImage.preview);
    setFeaturedImage(null);
  };

  const removeGalleryImage = (index) => {
    const targetImage = gallery[index];
    if (targetImage?.preview) URL.revokeObjectURL(targetImage.preview);
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  /* ==========================================================================
     FAQ matrix configurations
     ========================================================================== */
  const handleFaqChange = (index, field, value) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq,
      ),
    );
  };

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));

  /* ==========================================================================
     API DISPATCH CORE LOGIC
     ========================================================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

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

    // 1. Append Text and Checkbox Inputs
    Object.keys(form).forEach((key) => {
      if (form[key] !== "") {
        formData.append(key, form[key]);
      }
    });

    // Valid matrix filtering array
    const filteredDates = availableDates.filter(
      (d) => d.date !== "" && d.totalSeats !== "",
    );

    // 2. Append Arrays (Must be JSON string format for backend parse)
    formData.append("itinerary", JSON.stringify(itinerary));
    formData.append("includes", JSON.stringify(includes));
    formData.append("excludes", JSON.stringify(excludes));
    formData.append("highlights", JSON.stringify(highlights));
    formData.append("faqs", JSON.stringify(faqs));
    formData.append("packages", JSON.stringify(packages));
    formData.append("availableDates", JSON.stringify(filteredDates));

    // 3. Append Single Featured Image File Binary
    if (featuredImage) {
      formData.append("featuredImage", featuredImage);
    }

    // 4. Append Multiple Gallery Images File Arrays Binaries
    gallery.forEach((file) => {
      formData.append("gallery", file);
    });

    try {
      const response = await axios.post("/trips", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Expedition Published Successfully! 🚀");
      console.log("Success Response:", response.data);

      // Reset form states completely to native baseline template structure
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
        isBestSeller2026: false,
        isLuxuryVIP: false,
        isPeakClimbing: false,
        isShortTrek: false,
        isBhutanTour: false,
      });
      setFeaturedImage(null);
      setGallery([]);
      setItinerary([]);
      setIncludes([]);
      setExcludes([]);
      setHighlights([]);
      setPackages([]);
      setFaqs([{ question: "", answer: "" }]);
      setAvailableDates([
        { date: "", totalSeats: "", price: "", status: "available" },
      ]);
    } catch (error) {
      console.error("Error publishing expedition:", error);
      if (error.response?.status === 401) {
        alert("Session Expired or Unauthorized! Please log in again.");
      } else {
        alert(error.response?.data?.message || "Failed to publish expedition.");
      }
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

          <form
            onSubmit={handleSubmit}
            className="space-y-12"
            encType="multipart/form-data"
          >
            {/* 🖼️ MEDIA GALLERY SECTION */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-violet-600"></div>
              <h2 className="text-xl font-black mb-8 flex items-center gap-3">
                🖼️ Media Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Featured Image */}
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
                        <span className="text-sm font-bold text-slate-600">
                          Upload Cover
                        </span>
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

                {/* Gallery Images */}
                <div className="md:col-span-2 space-y-2">
                  <label className={labelStyle}>Gallery Images</label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-2xl p-6 min-h-64 flex flex-col bg-slate-50 transition-all">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                      {gallery.map((img, index) => (
                        <div
                          key={index}
                          className="relative aspect-video rounded-xl overflow-hidden group border border-slate-200 shadow-sm"
                        >
                          <img
                            src={img.preview}
                            alt="Gallery"
                            className="w-full h-full object-cover"
                          />
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
                        <span className="text-xs font-bold text-slate-600">
                          Add More
                        </span>
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

            {/* 📍 PRIMARY INFO */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
              <h2 className="text-xl font-black mb-8 flex items-center gap-3">
                📍 Primary Information
              </h2>
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
                  ></textarea>
                </div>
              </div>
            </section>

            {/* 🌟 २. NEW: POPULAR TREKS TIERING & BADGE MANAGEMENT */}
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
                        यदि यो चेक गरियो भने, युजरले कुनै पनि ट्याब क्लिक नगर्दा सुरुमै यो ट्रेक देखिनेछ।
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* 🏷️ PROMOTIONAL CATEGORIES & TABS */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
              <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                <FaTags className="text-emerald-500" /> Promotional Categories & Tabs
              </h2>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
                Active Content Filter Tabs for Homepage Display:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Conditionally rendered based on Nepal selection */}
                {form.country === "Nepal" && (
                  <>
                    <label className="flex items-center gap-3 p-4 border border-slate-100 bg-slate-50/50 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all select-none">
                      <input
                        type="checkbox"
                        name="isBestSeller2026"
                        checked={form.isBestSeller2026}
                        onChange={handleInputChange}
                        className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-indigo-500 border-slate-300 transition-all cursor-pointer"
                      />
                      <div>
                        <span className="block text-sm font-bold text-slate-700">Best Seller 2026</span>
                        <span className="block text-[11px] text-slate-400 font-medium">Trending journeys</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-slate-100 bg-slate-50/50 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all select-none">
                      <input
                        type="checkbox"
                        name="isLuxuryVIP"
                        checked={form.isLuxuryVIP}
                        onChange={handleInputChange}
                        className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-indigo-500 border-slate-300 transition-all cursor-pointer"
                      />
                      <div>
                        <span className="block text-sm font-bold text-slate-700">Luxury / VIP Tour</span>
                        <span className="block text-[11px] text-slate-400 font-medium">Premium packages</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-slate-100 bg-slate-50/50 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all select-none">
                      <input
                        type="checkbox"
                        name="isPeakClimbing"
                        checked={form.isPeakClimbing}
                        onChange={handleInputChange}
                        className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-indigo-500 border-slate-300 transition-all cursor-pointer"
                      />
                      <div>
                        <span className="block text-sm font-bold text-slate-700">Peak Climbing</span>
                        <span className="block text-[11px] text-slate-400 font-medium">High expeditions</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-slate-100 bg-slate-50/50 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all select-none">
                      <input
                        type="checkbox"
                        name="isShortTrek"
                        checked={form.isShortTrek}
                        onChange={handleInputChange}
                        className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-indigo-500 border-slate-300 transition-all cursor-pointer"
                      />
                      <div>
                        <span className="block text-sm font-bold text-slate-700">Short Trek</span>
                        <span className="block text-[11px] text-slate-400 font-medium">Under 7 days</span>
                      </div>
                    </label>
                  </>
                )}

                {/* Bhutan Dynamic Selector Tab */}
                {form.country === "Bhutan" && (
                  <label className="flex items-center gap-3 p-4 border border-emerald-200 bg-emerald-50/30 rounded-2xl cursor-not-allowed select-none md:col-span-3">
                    <input
                      type="checkbox"
                      name="isBhutanTour"
                      checked={form.isBhutanTour}
                      disabled
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

                {/* Tibet Dynamic Selector Tab */}
                {form.country === "Tibet" && (
                  <label className="flex items-center gap-3 p-4 border border-blue-200 bg-blue-50/30 rounded-2xl cursor-not-allowed select-none md:col-span-3">
                    <input
                      type="checkbox"
                      name="isTibetTour"
                      checked={form.isTibetTour}
                      disabled
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

            {/* 📅 OPERATIONAL FIXED DATES MATRIX */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500"></div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black flex items-center gap-3">
                  <FaCalendarAlt className="text-cyan-500" /> Operational Fixed
                  Dates Matrix
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
                        onChange={(e) =>
                          handleDateChange(index, "date", e.target.value)
                        }
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-cyan-500 text-slate-700 font-medium text-sm transition-all"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                        Total Seats Capacity
                      </label>
                      <input
                        type="number"
                        placeholder="e.g., 15"
                        value={item.totalSeats}
                        onChange={(e) =>
                          handleDateChange(index, "totalSeats", e.target.value)
                        }
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-cyan-500 text-slate-700 font-medium text-sm transition-all"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                        Custom Variant Price ($)
                      </label>
                      <input
                        type="number"
                        placeholder="Optional (Default applies)"
                        value={item.price}
                        onChange={(e) =>
                          handleDateChange(index, "price", e.target.value)
                        }
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
                          onChange={(e) =>
                            handleDateChange(index, "status", e.target.value)
                          }
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

            {/* 📦 PACKAGE BUILDER SECTION */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <Save className="text-blue-500" size={18} /> Budget Tier
                Configurations
              </h2>
              <PackageBuilder data={packages} setData={setPackages} />
            </section>

            {/* ⚙️ TECHNICAL LOGISTICS DETAILS */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
              <h2 className="text-xl font-black mb-8 flex items-center gap-3">
                ⚙️ Technical Details
              </h2>
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

            {/* ⭐ DYNAMIC DATA BUILDERS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 border-t-4 border-t-amber-400">
                <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                  ⭐ Highlights
                </h3>
                <ListBuilder
                  data={highlights}
                  setData={setHighlights}
                  title="Highlight"
                />
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 border-t-4 border-t-green-400">
                <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                  ✅ Includes
                </h3>
                <ListBuilder
                  data={includes}
                  setData={setIncludes}
                  title="Inclusions"
                />
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 border-t-4 border-t-red-400">
                <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                  ❌ Excludes
                </h3>
                <ListBuilder
                  data={excludes}
                  setData={setExcludes}
                  title="Exclusions"
                />
              </div>
            </div>

            {/* 🗺️ ITINERARY TIMELINE SCHEDULER */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10">
              <h2 className="text-xl font-black mb-6">
                🗺️ Tactical Route Itinerary
              </h2>
              <ItineraryBuilder data={itinerary} setData={setItinerary} />
            </section>

            {/* 💬 FAQ MATRIX ACCORDION */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black">
                  💬 Frequently Asked Questions Matrix
                </h2>
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
                      placeholder="Question Architecture..."
                      value={faq.question}
                      onChange={(e) =>
                        handleFaqChange(index, "question", e.target.value)
                      }
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-semibold text-sm text-slate-700"
                    />
                    <textarea
                      rows="2"
                      placeholder="System resolution declaration..."
                      value={faq.answer}
                      onChange={(e) =>
                        handleFaqChange(index, "answer", e.target.value)
                      }
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

            {/* 🚀 DEPLOY BUTTON */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all transform active:scale-[0.98]"
              >
                Publish Operational Expedition Pipeline
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
