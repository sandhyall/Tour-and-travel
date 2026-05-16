import { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaImages, FaTrash } from "react-icons/fa";

import axios from "../api/axios";
import ItineraryBuilder from "../components/ItineraryForm";
import ListBuilder from "../components/ListBuilder";
import Sidebar from "../components/Sidebar";

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
  });

  // State for Files/Images
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  // Dynamic Array Fields
  const [itinerary, setItinerary] = useState([]);
  const [includes, setIncludes] = useState([]);
  const [excludes, setExcludes] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  // Cleanup Preview URLs to prevent Memory Leaks
  useEffect(() => {
    return () => {
      if (featuredImage?.preview) URL.revokeObjectURL(featuredImage.preview);
      gallery.forEach((img) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
    };
  }, [featuredImage, gallery]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Featured Image Selection
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

  // Gallery Images Selection (Multiple)
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

  // FAQ Handlers (Safely handles immutable React State changes)
  const handleFaqChange = (index, field, value) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      )
    );
  };

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData initialization for Multer handling
    const formData = new FormData();

    // 1. Append Text Inputs
    Object.keys(form).forEach((key) => {
      if (form[key] !== "") {
        formData.append(key, form[key]);
      }
    });

    // 2. Append Arrays (Must be JSON.stringify string format)
    formData.append("itinerary", JSON.stringify(itinerary));
    formData.append("includes", JSON.stringify(includes));
    formData.append("excludes", JSON.stringify(excludes));
    formData.append("highlights", JSON.stringify(highlights));
    formData.append("faqs", JSON.stringify(faqs));

    // 3. Append Single Featured Image
    if (featuredImage) {
      formData.append("featuredImage", featuredImage);
    }

    // 4. Append Multiple Gallery Images
    gallery.forEach((file) => {
      formData.append("gallery", file);
    });

    try {
      // Interceptor will inject Authorization Header automatically
      const response = await axios.post("/trips", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Expedition Published Successfully! 🚀");
      console.log("Success Response:", response.data);

      // Reset form states completely on success to allow clean subsequent inputs
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
      });
      setFeaturedImage(null);
      setGallery([]);
      setItinerary([]);
      setIncludes([]);
      setExcludes([]);
      setHighlights([]);
      setFaqs([{ question: "", answer: "" }]);

    } catch (error) {
      console.error("Error publishing expedition:", error);
      if (error.response?.status === 401) {
        alert("Session Expired or Unauthorized! Please log in again as an Admin.");
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
            {/* MEDIA GALLERY SECTION */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-violet-600"></div>
              <h2 className="text-xl font-black mb-8 flex items-center gap-3">
                🖼️ Media Gallery
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Featured Image */}
                <div className="md:col-span-1 space-y-2">
                  <label className={labelStyle}>Cover / Featured Image</label>
                  <div className="relative border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-2xl h-64 flex flex-col items-center justify-center bg-slate-50 overflow-hidden group transition-all">
                    {featuredImage ? (
                      <>
                        <img
                          src={featuredImage.preview}
                          alt="Featured Preview"
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

                {/* Gallery Grid */}
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
                            alt="Gallery Preview"
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

            {/* PRIMARY INFO */}
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
                  <label className={labelStyle}>Duration</label>
                  <input
                    name="duration"
                    value={form.duration}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., 14 Days"
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

            {/* LOGISTICS DETAILS */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
              <h2 className="text-xl font-black mb-8 flex items-center gap-3">
                ⚙️ Technical & Logistics Details
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
                    placeholder="e.g., Trekking, Climbing"
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
                    placeholder="e.g., Mar-May, Sep-Nov"
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
                <div className="md:col-span-1">
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
                    placeholder="e.g., Teahouse & Hotel"
                  />
                </div>
              </div>
            </section>

            {/* BUILDERS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 border-t-4 border-t-amber-400">
                <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                  ⭐ Highlights
                </h3>
                <ListBuilder
                  title="Highlight"
                  data={highlights}
                  setData={setHighlights}
                />
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 border-t-4 border-t-emerald-500">
                <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                  ✓ Includes
                </h3>
                <ListBuilder
                  title="Include"
                  data={includes}
                  setData={setIncludes}
                />
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 border-t-4 border-t-red-500">
                <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                  ✕ Excludes
                </h3>
                <ListBuilder
                  title="Exclude"
                  data={excludes}
                  setData={setExcludes}
                />
              </div>
            </div>

            {/* ITINERARY */}
            <section className="bg-white p-8 lg:p-10 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-black mb-8">🗺️ Day-by-Day Journey</h2>
              <ItineraryBuilder data={itinerary} setData={setItinerary} />
            </section>

            {/* FAQ SECTION */}
            <section className="bg-slate-900 rounded-3xl p-8 lg:p-10 text-white shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black flex items-center gap-3">
                  ❓ Frequently Asked Questions
                </h2>
                <button
                  type="button"
                  onClick={addFaq}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold transition-all"
                >
                  + Add FAQ
                </button>
              </div>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 relative group"
                  >
                    <button
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="absolute top-4 right-4 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      ✕
                    </button>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
                          Question
                        </label>
                        <input
                          value={faq.question}
                          onChange={(e) =>
                            handleFaqChange(index, "question", e.target.value)
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
                          Answer
                        </label>
                        <textarea
                          value={faq.answer}
                          onChange={(e) =>
                            handleFaqChange(index, "answer", e.target.value)
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-indigo-500 outline-none"
                          rows="2"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SUBMIT BUTTON */}
            <div className="sticky bottom-6 flex justify-center">
              <button
                type="submit"
                className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-700 transition-all uppercase tracking-widest"
              >
                Publish Expedition 🚀
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}