import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
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

  // Track raw file state for new uploads
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  // Track current image references from the DB to display placeholders/previews
  const [existingHero, setExistingHero] = useState("");
  const [existingGallery, setExistingGallery] = useState([]);

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
        });

        // Set structural array properties
        setItinerary(data.itinerary || []);
        setPackages(data.packages || []);
        setIncludes(data.includes || []);
        setExcludes(data.excludes || []);
        setHighlights(data.highlights || []);
        setFaqs(data.faqs || []);

        // Handle variations of image formats from database schema safely
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

  // Safe FAQ state mutations using mapping array assignments
  const handleFaqChange = (index, field, value) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      
      // Append core form fields
      Object.keys(form).forEach((k) => {
        if (form[k] !== undefined && form[k] !== null) {
          fd.append(k, form[k]);
        }
      });

      // Append structural elements stringified for FormData transfer
      fd.append("itinerary", JSON.stringify(itinerary));
      fd.append("packages", JSON.stringify(packages));
      fd.append("includes", JSON.stringify(includes));
      fd.append("excludes", JSON.stringify(excludes));
      fd.append("highlights", JSON.stringify(highlights));
      fd.append("faqs", JSON.stringify(faqs));

      // Append image files matching backend Multer keys exactly
      if (featuredImage) {
        fd.append("featuredImage", featuredImage);
      }
      if (gallery.length > 0) {
        gallery.forEach((img) => fd.append("gallery", img));
      }

      await axios.put(`/trips/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Trip Updated Successfully ✨");
      navigate("/trips");
    } catch (err) {
      console.error("Submission failed:", err.response?.data || err.message);
      alert(`Update failed: ${err.response?.data?.message || "Internal Server Error"}`);
    }
  };

  const inputClass =
    "w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-700 font-medium";
  const sectionClass =
    "bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4";
  const labelClass =
    "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 ml-64 p-10 max-w-5xl">
        <header className="mb-10 pb-6 border-b-2 border-blue-600">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            ✏️ Edit Trip
          </h1>
          <p className="text-slate-500 mt-2 text-md">
            Update your Nepal, Bhutan, or Tibet itinerary details
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
          
          {/* BASIC INFO */}
          <section className={sectionClass}>
            <h2 className="text-xl font-bold text-slate-800 border-b pb-3 mb-4">
              📍 Trip Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Trip Title</label>
                <input
                  name="title"
                  className={inputClass}
                  placeholder="Enter trip title"
                  value={form.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  <label className={labelClass}>Duration (e.g. 12 Days)</label>
                  <input
                    name="duration"
                    className={inputClass}
                    value={form.duration}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Price (Current)</label>
                  <input
                    name="price"
                    className={inputClass}
                    value={form.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className={labelClass}>Difficulty Level</label>
                  <input
                    name="difficulty"
                    className={inputClass}
                    value={form.difficulty}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Max Altitude</label>
                  <input
                    name="maxAltitude"
                    className={inputClass}
                    value={form.maxAltitude}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className={labelClass}>Best Season</label>
                  <input
                    name="bestSeason"
                    className={inputClass}
                    value={form.bestSeason}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Overview</label>
                <textarea
                  name="overview"
                  className={`${inputClass} min-h-[150px] resize-none`}
                  value={form.overview}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* IMAGES MANAGEMENT WITH LIVE PREVIEWS */}
          <section className={sectionClass}>
            <h2 className="text-xl font-bold text-slate-800 border-b pb-3 mb-4">
              🖼️ Visual Media Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Featured / Hero Image Upload */}
              <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl space-y-4">
                <label className={labelClass}>Hero Banner Image</label>
                {(featuredImage?.preview || existingHero) && (
                  <div className="h-32 w-full relative rounded-lg overflow-hidden bg-slate-100 border">
                    <img 
                      src={featuredImage?.preview || existingHero} 
                      alt="Hero preview" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={handleHeroImageChange}
                />
              </div>

              {/* Gallery Collection Uploads */}
              <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl space-y-4">
                <label className={labelClass}>Gallery Collection Updates</label>
                <div className="flex gap-2 flex-wrap max-h-32 overflow-y-auto p-1 bg-slate-50 rounded-lg">
                  {gallery.length > 0 ? (
                    gallery.map((img, idx) => (
                      <img key={idx} src={img.preview} className="h-14 w-20 object-cover rounded border" alt="preview" />
                    ))
                  ) : (
                    existingGallery.map((img, idx) => (
                      <img key={idx} src={img.url || img} className="h-14 w-20 object-cover rounded border" alt="existing" />
                    ))
                  )}
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                  onChange={handleGalleryChange}
                />
              </div>

            </div>
          </section>

          {/* BUILDERS MODULES */}
          <section className={sectionClass}>
            <h2 className="text-xl font-bold text-slate-800">
              📅 Itinerary Planner
            </h2>
            <ItineraryBuilder data={itinerary} setData={setItinerary} />
          </section>

          <section className={sectionClass}>
            <h2 className="text-xl font-bold text-slate-800">
              💼 Service Packages
            </h2>
            <PackageBuilder data={packages} setData={setPackages} />
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={sectionClass}>
              <h2 className="text-xl font-bold text-slate-800">
                ⭐ Highlights
              </h2>
              <ListBuilder
                title="Highlight"
                data={highlights}
                setData={setHighlights}
              />
            </div>
            <div className={sectionClass}>
              <h2 className="text-xl font-bold text-slate-800">📌 Includes</h2>
              <ListBuilder
                title="Include"
                data={includes}
                setData={setIncludes}
              />
            </div>
          </div>

          {/* DYNAMIC FAQS WITH CORRECTED REACT UPDATE LIFECYCLES */}
          <section className={sectionClass}>
            <h2 className="text-xl font-bold text-slate-800 border-b pb-3 mb-4 text-center md:text-left">
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
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
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
          <div className="flex items-center gap-4 pt-6 sticky bottom-6 bg-slate-50/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all transform active:scale-95"
            >
              💾 Save & Update Trip
            </button>
            <button
              type="button"
              onClick={() => navigate("/trips")}
              className="px-8 bg-slate-200 hover:bg-slate-300 text-slate-700 py-4 rounded-xl font-bold text-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}