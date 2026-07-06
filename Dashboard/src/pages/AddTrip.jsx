import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import ListBuilder from "../components/ListBuilder";
import ItineraryBuilder from "../components/ItineraryForm";
import PackageBuilder from "../components/PackageBuilder";
import PackingCategory from "../components/PackingCategory"

import { Save, Menu, X as XIcon } from "lucide-react";
import {
  FaCloudUploadAlt,
  FaTrash,
  FaImages,
  FaPlus,
  FaTags,
  FaCalendarAlt,
  FaAward,
  FaMap,
  FaFilePdf,
  FaUserTie,
} from "react-icons/fa";

export default function AddTrip() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  guideName: "",
  guideBio: "",
  guideExperience: "",
  guideLanguages: "",

  note: "",
  luklaFlightInfo: "",
  relatedInformation: "",
  bestTime: "",
  whyChoose: "",

  // ✅ Packing List
  packingList: {
    general: [],
    upperBody: [],
    torso: [],
    lowerBody: [],
    hands: [],
    feet: [],
    undergarments: [],
    otherEssentials: [],
    optionalItems: [],
  },
});

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  // ✅ NEW: PDF + guide photo state
  const [brochureFile, setBrochureFile] = useState(null);
  const [itineraryPdfFile, setItineraryPdfFile] = useState(null);
  const [guidePhotoFile, setGuidePhotoFile] = useState(null);
  const [guidePhotoPreview, setGuidePhotoPreview] = useState(null);
  const [mapImageFile, setMapImageFile] = useState(null);
  const [mapImagePreview, setMapImagePreview] = useState(null);

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

      if (guidePhotoPreview) URL.revokeObjectURL(guidePhotoPreview);
      if (mapImagePreview) URL.revokeObjectURL(mapImagePreview);
    };
  }, [featuredImage, gallery, guidePhotoPreview, mapImagePreview]);

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


  const addPackingItem = (category) => {
  setForm((prev) => ({
    ...prev,
    packingList: {
      ...prev.packingList,
      [category]: [...prev.packingList[category], ""],
    },
  }));
};

const removePackingItem = (category, index) => {
  setForm((prev) => ({
    ...prev,
    packingList: {
      ...prev.packingList,
      [category]: prev.packingList[category].filter((_, i) => i !== index),
    },
  }));
};

const updatePackingItem = (category, index, value) => {
  setForm((prev) => {
    const updated = [...prev.packingList[category]];
    updated[index] = value;

    return {
      ...prev,
      packingList: {
        ...prev.packingList,
        [category]: updated,
      },
    };
  });
};

  const handleDateChange = (index, field, value) => {
    setAvailableDates((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };
  const addDateRow = () =>
    setAvailableDates((prev) => [
      ...prev,
      { date: "", totalSeats: "", price: "", status: "available" },
    ]);
  const removeDateRow = (index) =>
    setAvailableDates((prev) => prev.filter((_, i) => i !== index));

  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (featuredImage?.preview) URL.revokeObjectURL(featuredImage.preview);
      setFeaturedImage(
        Object.assign(file, { preview: URL.createObjectURL(file) }),
      );
    }
  };
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) }),
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

  // ✅ NEW: Guide photo handler
  const handleGuidePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (guidePhotoPreview) URL.revokeObjectURL(guidePhotoPreview);
      setGuidePhotoFile(file);
      setGuidePhotoPreview(URL.createObjectURL(file));
    }
  };
  const removeGuidePhoto = () => {
    if (guidePhotoPreview) URL.revokeObjectURL(guidePhotoPreview);
    setGuidePhotoFile(null);
    setGuidePhotoPreview(null);
  };

  const handleMapImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (mapImagePreview) URL.revokeObjectURL(mapImagePreview);

      setMapImageFile(file);
      setMapImagePreview(URL.createObjectURL(file));
    }
  };

  const removeMapImage = () => {
    if (mapImagePreview) URL.revokeObjectURL(mapImagePreview);

    setMapImageFile(null);
    setMapImagePreview(null);
  };

  const handleFaqChange = (index, field, value) => {
    setFaqs((prev) =>
      prev.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)),
    );
  };
  const addFaq = () =>
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  const removeFaq = (index) =>
    setFaqs((prev) => prev.filter((_, i) => i !== index));

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

      guideName: "",
      guideBio: "",
      guideExperience: "",
      guideLanguages: "",
      note: "",
      luklaFlightInfo: "",
      relatedInformation: "",
      bestTime: "",
      whyChoose: "",

      packingList: {
  general: [],
  upperBody: [],
  torso: [],
  lowerBody: [],
  hands: [],
  feet: [],
  undergarments: [],
  otherEssentials: [],
  optionalItems: [],
},
    });
    setFeaturedImage(null);
    setGallery([]);
    setBrochureFile(null);
    setItineraryPdfFile(null);
    setMapImageFile(null);
    setMapImagePreview(null);
    setGuidePhotoFile(null);
    setGuidePhotoPreview(null);
    setItinerary([]);
    setIncludes([]);
    setExcludes([]);
    setHighlights([]);
    setPackages([]);
    setFaqs([{ question: "", answer: "" }]);
    setAvailableDates([
      { date: "", totalSeats: "", price: "", status: "available" },
    ]);
  };

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
      if (key === "mapImage") return; // skip file field
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    const filteredDates = availableDates.filter(
      (d) => d.date !== "" && d.totalSeats !== "",
    );
    formData.append("itinerary", JSON.stringify(itinerary));
    formData.append("includes", JSON.stringify(includes));
    formData.append("excludes", JSON.stringify(excludes));
    formData.append("highlights", JSON.stringify(highlights));
    formData.append("faqs", JSON.stringify(faqs));
    formData.append("packages", JSON.stringify(packages));
    formData.append("availableDates", JSON.stringify(filteredDates));
    formData.append("note", form.note);
    formData.append("luklaFlightInfo", form.luklaFlightInfo);
    formData.append("relatedInformation", form.relatedInformation);
    formData.append("bestTime", form.bestTime);
    formData.append("whyChoose", form.whyChoose);
    formData.append(
  "packingList",
  JSON.stringify(form.packingList)
);

    if (featuredImage) formData.append("featuredImage", featuredImage);
    gallery.forEach((file) => formData.append("gallery", file));

    // ✅ NEW: Append PDF and guide photo files
    if (brochureFile) formData.append("brochure", brochureFile);
    if (itineraryPdfFile) formData.append("itineraryPdf", itineraryPdfFile);
    if (guidePhotoFile) formData.append("guidePhoto", guidePhotoFile);
    if (mapImageFile) formData.append("mapImage", mapImageFile);
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
    "w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 text-sm sm:text-base";
  const labelStyle =
    "block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1";

  return (
    <div className="flex bg-[#f8fafc] min-h-screen font-sans antialiased text-slate-900">
      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile, fixed on desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 xl:p-12 min-w-0">
        <div className="max-w-5xl mx-auto">
          {/* ── Mobile top bar ── */}
          <div className="flex items-center gap-3 mb-6 lg:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-600"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Create Expedition <span className="text-indigo-600">.</span>
            </h1>
          </div>

          <header className="mb-8 sm:mb-12 hidden lg:block">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Create Expedition <span className="text-indigo-600">.</span>
            </h1>
          </header>

          {submitSuccess && (
            <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
              <span className="text-emerald-600 text-lg shrink-0">✓</span>
              <p className="text-emerald-800 font-semibold text-sm">
                Expedition published successfully! The form has been reset.
              </p>
            </div>
          )}
          {submitError && (
            <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
              <span className="text-red-500 text-lg shrink-0">✕</span>
              <p className="text-red-700 font-semibold text-sm">
                {submitError}
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6 sm:space-y-10 lg:space-y-12"
            encType="multipart/form-data"
          >
            {/* ── MEDIA GALLERY ── */}
            <section className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-violet-600 rounded-l-2xl sm:rounded-l-3xl" />
              <h2 className="text-lg sm:text-xl font-black mb-5 sm:mb-8 ml-2">
                🖼️ Media Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
                {/* Cover Image */}
                <div className="md:col-span-1 space-y-2">
                  <label className={labelStyle}>Cover Image</label>
                  <div className="relative border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-2xl h-48 sm:h-64 flex flex-col items-center justify-center bg-slate-50 overflow-hidden group transition-all">
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
                          size={28}
                        />
                        <span className="text-sm font-bold text-slate-600">
                          Upload Cover
                        </span>
                        <span className="text-xs text-slate-400 mt-1">
                          JPG, PNG, WEBP
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

                {/* Gallery */}
                <div className="md:col-span-2 space-y-2">
                  <label className={labelStyle}>Gallery Images</label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-2xl p-4 sm:p-6 min-h-48 sm:min-h-64 flex flex-col bg-slate-50 transition-all">
                    <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-4 mb-4">
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
                        <FaImages className="text-slate-400 mb-1" size={18} />
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
                      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-4">
                        <p className="text-sm font-medium text-slate-400">
                          No gallery images uploaded yet
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* ── PRIMARY INFORMATION ── */}
            <section className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-indigo-600 rounded-l-2xl sm:rounded-l-3xl" />
              <h2 className="text-lg sm:text-xl font-black mb-5 sm:mb-8 ml-2">
                📍 Primary Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6">
                <div className="sm:col-span-2 md:col-span-4">
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
                <div className="sm:col-span-2 md:col-span-2">
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
                <div className="sm:col-span-1 md:col-span-2">
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
                <div className="sm:col-span-1 md:col-span-2">
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
                <div className="sm:col-span-2 md:col-span-2">
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
                <div className="sm:col-span-2 md:col-span-6">
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

            {/* ── SERVICE TIERS ── */}
            <section className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-blue-500 rounded-l-2xl sm:rounded-l-3xl" />
              <h2 className="text-lg sm:text-xl font-black mb-4 sm:mb-6 flex items-center gap-3 ml-2">
                <FaAward className="text-blue-500" /> Service Tiers & Popular
                Badges
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
                <div className="sm:col-span-1 md:col-span-2 flex items-end">
                  <label className="w-full flex items-center gap-3 p-3 sm:p-4 border border-slate-100 bg-slate-50/50 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all select-none">
                    <input
                      type="checkbox"
                      name="badge"
                      checked={form.badge}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-indigo-500 border-slate-300 shrink-0"
                    />
                    <div>
                      <span className="block text-sm font-bold text-slate-700">
                        Mark as Popular Trek (Homepage Default)
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* ── PROMOTIONAL CATEGORIES ── */}
            <section className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-emerald-500 rounded-l-2xl sm:rounded-l-3xl" />
              <h2 className="text-lg sm:text-xl font-black mb-4 sm:mb-6 flex items-center gap-3 ml-2">
                <FaTags className="text-emerald-500" /> Promotional Categories &
                Tabs
              </h2>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 sm:mb-6">
                Active Content Filter Tabs for Homepage Display:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {form.country === "Nepal" && (
                  <>
                    {[
                      {
                        name: "isBestSeller2026",
                        label: "Best Seller 2026",
                        sub: "Trending journeys",
                      },
                      {
                        name: "isLuxuryVIP",
                        label: "Luxury / VIP Tour",
                        sub: "Premium packages",
                      },
                      {
                        name: "isPeakClimbing",
                        label: "Peak Climbing",
                        sub: "High expeditions",
                      },
                      {
                        name: "isShortTrek",
                        label: "Short Trek",
                        sub: "Under 7 days",
                      },
                    ].map(({ name, label, sub }) => (
                      <label
                        key={name}
                        className="flex items-center gap-3 p-3 sm:p-4 border border-slate-100 bg-slate-50/50 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all select-none"
                      >
                        <input
                          type="checkbox"
                          name={name}
                          checked={form[name]}
                          onChange={handleInputChange}
                          className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-indigo-500 border-slate-300 shrink-0"
                        />
                        <div>
                          <span className="block text-sm font-bold text-slate-700">
                            {label}
                          </span>
                          <span className="block text-[11px] text-slate-400 font-medium">
                            {sub}
                          </span>
                        </div>
                      </label>
                    ))}
                  </>
                )}
                {form.country === "Bhutan" && (
                  <label className="flex items-center gap-3 p-3 sm:p-4 border border-emerald-200 bg-emerald-50/30 rounded-2xl cursor-not-allowed select-none col-span-full">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      readOnly
                      className="w-5 h-5 rounded-lg text-emerald-600 border-slate-300 cursor-not-allowed shrink-0"
                    />
                    <div>
                      <span className="block text-sm font-bold text-emerald-800">
                        Bhutan Exclusive Active
                      </span>
                      <span className="block text-[11px] text-emerald-600 font-medium">
                        यो ट्रिप स्वतः भूटान ट्याब मा देखा पर्नेछ।
                      </span>
                    </div>
                  </label>
                )}
                {form.country === "Tibet" && (
                  <label className="flex items-center gap-3 p-3 sm:p-4 border border-blue-200 bg-blue-50/30 rounded-2xl cursor-not-allowed select-none col-span-full">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      readOnly
                      className="w-5 h-5 rounded-lg text-blue-600 border-slate-300 cursor-not-allowed shrink-0"
                    />
                    <div>
                      <span className="block text-sm font-bold text-blue-800">
                        Tibet Exclusive Active
                      </span>
                      <span className="block text-[11px] text-blue-600 font-medium">
                        यो ट्रिप स्वतः तिब्बत ट्याब मा देखा पर्नेछ।
                      </span>
                    </div>
                  </label>
                )}
              </div>
            </section>

            {/* ── AVAILABLE DATES ── */}
            <section className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-cyan-500 rounded-l-2xl sm:rounded-l-3xl" />
              <div className="flex flex-wrap justify-between items-center gap-3 mb-5 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-black flex items-center gap-2 sm:gap-3 ml-2">
                  <FaCalendarAlt className="text-cyan-500" />
                  <span>Operational Fixed Dates</span>
                </h2>
                <button
                  type="button"
                  onClick={addDateRow}
                  className="px-3 sm:px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all"
                >
                  <FaPlus size={11} /> Add Date Slot
                </button>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {availableDates.map((item, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-100"
                  >
                    {/* Mobile: stacked; Tablet+: grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                          Departure Date
                        </label>
                        <input
                          type="date"
                          value={item.date}
                          onChange={(e) =>
                            handleDateChange(index, "date", e.target.value)
                          }
                          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-cyan-500 text-slate-700 font-medium text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                          Total Seats
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 15"
                          value={item.totalSeats}
                          onChange={(e) =>
                            handleDateChange(
                              index,
                              "totalSeats",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-cyan-500 text-slate-700 font-medium text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                          Custom Price ($)
                        </label>
                        <input
                          type="number"
                          placeholder="Optional"
                          value={item.price}
                          onChange={(e) =>
                            handleDateChange(index, "price", e.target.value)
                          }
                          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-cyan-500 text-slate-700 font-medium text-sm transition-all"
                        />
                      </div>
                      <div className="flex items-end gap-2">
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
                            className="p-2.5 sm:p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors shrink-0"
                          >
                            <FaTrash size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── PACKAGE BUILDER ── */}
            <section className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-emerald-600 rounded-l-2xl sm:rounded-l-3xl" />
              <h2 className="text-lg sm:text-xl font-black mb-3 sm:mb-4 flex items-center gap-2 ml-2">
                <Save className="text-blue-500" size={18} /> Budget Tier
                Configurations
              </h2>
              <PackageBuilder data={packages} setData={setPackages} />
            </section>

            {/* ── TECHNICAL DETAILS ── */}
            <section className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-blue-600 rounded-l-2xl sm:rounded-l-3xl" />
              <h2 className="text-lg sm:text-xl font-black mb-5 sm:mb-8 ml-2">
                ⚙️ Technical Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
                <div className="sm:col-span-2">
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

            {/* ── ROUTE MAP IMAGE ── */}
            <section className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-teal-500 rounded-l-2xl sm:rounded-l-3xl" />

              <h2 className="text-lg sm:text-xl font-black mb-4 flex items-center gap-3 ml-2">
                <FaMap className="text-teal-500" />
                Route Map Image
              </h2>

              <p className="text-sm text-slate-500 mb-6 ml-2">
                Upload a trek route map image. Users can view and download it
                from the trip page.
              </p>

              <div className="max-w-xl">
                <div className="relative border-2 border-dashed border-slate-200 hover:border-teal-400 rounded-2xl h-72 flex items-center justify-center bg-slate-50 overflow-hidden group transition-all">
                  {mapImagePreview ? (
                    <>
                      <img
                        src={mapImagePreview}
                        alt="Route Map"
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <button
                          type="button"
                          onClick={removeMapImage}
                          className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                      <FaMap size={40} className="text-slate-400 mb-3" />

                      <span className="font-bold text-slate-700">
                        Upload Route Map
                      </span>

                      <span className="text-xs text-slate-400 mt-1">
                        JPG, PNG, WEBP
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMapImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </section>

            {/* ✅ NEW ── DOWNLOADABLE DOCUMENTS ── */}
            <section className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-rose-500 rounded-l-2xl sm:rounded-l-3xl" />
              <h2 className="text-lg sm:text-xl font-black mb-2 sm:mb-4 flex items-center gap-2 sm:gap-3 ml-2">
                <FaFilePdf className="text-rose-500" /> Downloadable Documents
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-5 sm:mb-6 ml-2">
                Upload PDF files that travellers can download from the trip
                detail page.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Brochure PDF */}
                <div className="p-4 sm:p-5 border-2 border-dashed border-slate-200 hover:border-rose-400 rounded-2xl bg-slate-50 transition-all space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                      <FaFilePdf size={14} className="text-rose-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">
                        Trip Brochure
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Full overview, highlights & inclusions
                      </p>
                    </div>
                  </div>
                  {brochureFile ? (
                    <div className="flex items-center justify-between bg-rose-50 border border-rose-200 rounded-xl px-3 py-2.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <FaFilePdf
                          size={12}
                          className="text-rose-500 shrink-0"
                        />
                        <span className="text-xs font-semibold text-rose-700 truncate">
                          {brochureFile.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setBrochureFile(null)}
                        className="ml-2 p-1 text-rose-400 hover:text-rose-600 transition-colors shrink-0"
                      >
                        <XIcon size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block w-full text-center py-2.5 rounded-xl bg-white border border-slate-200 hover:border-rose-400 hover:bg-rose-50 transition-all">
                      <span className="text-xs font-bold text-slate-600">
                        Choose PDF File
                      </span>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setBrochureFile(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Itinerary PDF */}
                <div className="p-4 sm:p-5 border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl bg-slate-50 transition-all space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <FaFilePdf size={14} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">
                        Detailed Itinerary PDF
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Day-by-day schedule with logistics
                      </p>
                    </div>
                  </div>
                  {itineraryPdfFile ? (
                    <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <FaFilePdf
                          size={12}
                          className="text-blue-500 shrink-0"
                        />
                        <span className="text-xs font-semibold text-blue-700 truncate">
                          {itineraryPdfFile.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setItineraryPdfFile(null)}
                        className="ml-2 p-1 text-blue-400 hover:text-blue-600 transition-colors shrink-0"
                      >
                        <XIcon size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block w-full text-center py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all">
                      <span className="text-xs font-bold text-slate-600">
                        Choose PDF File
                      </span>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setItineraryPdfFile(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </section>

            {/* ✅ NEW ── LEAD GUIDE ── */}
            <section className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-amber-500 rounded-l-2xl sm:rounded-l-3xl" />
              <h2 className="text-lg sm:text-xl font-black mb-2 sm:mb-4 flex items-center gap-2 sm:gap-3 ml-2">
                <FaUserTie className="text-amber-500" /> Lead Guide Profile
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-5 sm:mb-6 ml-2">
                Add the expert guide for this expedition. This will be displayed
                on the trip detail page.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5 sm:gap-8">
                {/* Guide Photo */}
                <div className="space-y-2">
                  <label className={labelStyle}>Guide Photo</label>
                  <div className="relative border-2 border-dashed border-slate-200 hover:border-amber-400 rounded-2xl aspect-square flex flex-col items-center justify-center bg-slate-50 overflow-hidden group transition-all max-w-[200px] mx-auto md:mx-0">
                    {guidePhotoPreview ? (
                      <>
                        <img
                          src={guidePhotoPreview}
                          alt="Guide"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                          <button
                            type="button"
                            onClick={removeGuidePhoto}
                            className="p-2.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full p-4 text-center">
                        <FaUserTie
                          className="text-slate-400 group-hover:text-amber-500 mb-2 transition-colors"
                          size={28}
                        />
                        <span className="text-xs font-bold text-slate-600">
                          Upload Photo
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleGuidePhotoChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Guide Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelStyle}>Guide Full Name</label>
                    <input
                      name="guideName"
                      value={form.guideName}
                      onChange={handleInputChange}
                      className={inputStyle}
                      placeholder="e.g., Pemba Sherpa"
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>Experience</label>
                    <input
                      name="guideExperience"
                      value={form.guideExperience}
                      onChange={handleInputChange}
                      className={inputStyle}
                      placeholder="e.g., 15+ Years"
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>Languages Spoken</label>
                    <input
                      name="guideLanguages"
                      value={form.guideLanguages}
                      onChange={handleInputChange}
                      className={inputStyle}
                      placeholder="e.g., Nepali, English, Hindi"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelStyle}>Bio / Description</label>
                    <textarea
                      name="guideBio"
                      value={form.guideBio}
                      onChange={handleInputChange}
                      rows="3"
                      className={inputStyle}
                      placeholder="Brief biography of the lead guide..."
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <h2 className="text-2xl font-bold mb-6">
                Extra Trek Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className={labelStyle}>Note</label>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={handleInputChange}
                    rows={4}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Lukla Flight Information</label>
                  <textarea
                    name="luklaFlightInfo"
                    value={form.luklaFlightInfo}
                    onChange={handleInputChange}
                    rows={4}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Related Information</label>
                  <textarea
                    name="relatedInformation"
                    value={form.relatedInformation}
                    onChange={handleInputChange}
                    rows={6}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Best Time</label>
                  <textarea
                    name="bestTime"
                    value={form.bestTime}
                    onChange={handleInputChange}
                    rows={6}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Why Choose This Trek</label>
                  <textarea
                    name="whyChoose"
                    value={form.whyChoose}
                    onChange={handleInputChange}
                    rows={6}
                    className={inputStyle}
                  />
                </div>
              </div>
            </section>

            {/* ── PACKING LIST ── */}
<section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
  <h2 className="text-2xl font-bold mb-6">
    Things to Pack
  </h2>

  <PackingCategory
    packingList={form.packingList}
    addPackingItem={addPackingItem}
    removePackingItem={removePackingItem}
    updatePackingItem={updatePackingItem}
  />
</section>

            {/* ── LIST BUILDERS ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 border-t-4 border-t-amber-400">
                <h3 className="font-black text-slate-800 mb-4 text-sm sm:text-base">
                  ⭐ Highlights
                </h3>
                <ListBuilder
                  data={highlights}
                  setData={setHighlights}
                  title="Highlight"
                />
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 border-t-4 border-t-green-400">
                <h3 className="font-black text-slate-800 mb-4 text-sm sm:text-base">
                  ✅ Includes
                </h3>
                <ListBuilder
                  data={includes}
                  setData={setIncludes}
                  title="Inclusions"
                />
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 border-t-4 border-t-red-400">
                <h3 className="font-black text-slate-800 mb-4 text-sm sm:text-base">
                  ❌ Excludes
                </h3>
                <ListBuilder
                  data={excludes}
                  setData={setExcludes}
                  title="Exclusions"
                />
              </div>
            </div>

            {/* ── ITINERARY ── */}
            <section className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-8 lg:p-10">
              <h2 className="text-lg sm:text-xl font-black mb-4 sm:mb-6">
                🗺️ Tactical Route Itinerary
              </h2>
              <ItineraryBuilder
                itinerary={itinerary}
                setItinerary={setItinerary}
              />
            </section>

            {/* ── FAQ ── */}
            <section className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-8 lg:p-10">
              <div className="flex flex-wrap justify-between items-center gap-3 mb-5 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-black">
                  💬 Frequently Asked Questions
                </h2>
                <button
                  type="button"
                  onClick={addFaq}
                  className="px-3 sm:px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                  <FaPlus size={10} /> Add Q&A Block
                </button>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 relative group"
                  >
                    <input
                      placeholder="Question..."
                      value={faq.question}
                      onChange={(e) =>
                        handleFaqChange(index, "question", e.target.value)
                      }
                      className="w-full px-3 sm:px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-semibold text-sm text-slate-700"
                    />
                    <textarea
                      rows="2"
                      placeholder="Answer..."
                      value={faq.answer}
                      onChange={(e) =>
                        handleFaqChange(index, "answer", e.target.value)
                      }
                      className="w-full px-3 sm:px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm text-slate-600 font-medium"
                    />
                    {faqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFaq(index)}
                        className="absolute top-2 right-2 p-1.5 sm:p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <FaTrash size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ── SUBMIT ── */}
            <div className="flex justify-end pt-2 pb-8 sm:pb-12">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 text-sm sm:text-base"
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
