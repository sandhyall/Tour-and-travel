import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/buttons.css";

import ItineraryBuilder from "../components/ItineraryForm";
import PackageBuilder from "../components/PackageBuilder";
import ListBuilder from "../components/ListBuilder";


export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  const [heroImage, setHeroImage] = useState(null);
  const [gallery, setGallery] = useState([]);

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

          // NEW FIELDS
          difficulty: data.difficulty || "",
          activity: data.activity || "",
          maxAltitude: data.maxAltitude || "",
          bestSeason: data.bestSeason || "",
          startPoint: data.startPoint || "",
          endPoint: data.endPoint || "",
          meals: data.meals || "",
          accommodation: data.accommodation || ""
        });

        setItinerary(data.itinerary || []);
        setPackages(data.packages || []);
        setIncludes(data.includes || []);
        setExcludes(data.excludes || []);
        setHighlights(data.highlights || []);
        setFaqs(data.faqs || []);

      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchTrip();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();

      // basic fields
      Object.keys(form).forEach(k => {
        if (form[k] !== undefined && form[k] !== null) {
          fd.append(k, form[k]);
        }
      });

      // JSON fields
      fd.append("itinerary", JSON.stringify(itinerary || []));
      fd.append("packages", JSON.stringify(packages || []));
      fd.append("includes", JSON.stringify(includes || []));
      fd.append("excludes", JSON.stringify(excludes || []));
      fd.append("highlights", JSON.stringify(highlights || []));
      fd.append("faqs", JSON.stringify(faqs || []));

      // images
      if (heroImage) {
        fd.append("heroImage", heroImage);
      }

      if (gallery.length > 0) {
        gallery.forEach(img => fd.append("galleryImages", img));
      }

      const res = await axios.put(`/trips/${id}`, fd);

      console.log("UPDATED:", res.data);
      alert("Trip Updated Successfully");

      navigate("/trips");

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
      alert("Update failed");
    }
  };

  return (
    <>
      <Sidebar />

      <div className="edit-trip-container" style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>✏️ Edit Trip</h1>
          <p style={styles.subtitle}>Update your travel experience details</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* BASIC INFO */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📍 Trip Information</h2>

            <input
              placeholder="Trip Title"
              value={form.title || ""}
              style={styles.input}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <select
              value={form.country || "Nepal"}
              style={styles.input}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            >
              <option>Nepal</option>
              <option>Bhutan</option>
              <option>Tibet</option>
            </select>

            <div style={styles.gridContainer}>
              <input
                placeholder="Duration"
                value={form.duration || ""}
                style={styles.input}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />
              <input
                placeholder="Price"
                value={form.price || ""}
                style={styles.input}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>

            <div style={styles.gridContainer}>
              <input
                placeholder="Difficulty"
                value={form.difficulty || ""}
                style={styles.input}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              />
              <input
                placeholder="Activity"
                value={form.activity || ""}
                style={styles.input}
                onChange={(e) => setForm({ ...form, activity: e.target.value })}
              />
            </div>

            <div style={styles.gridContainer}>
              <input
                placeholder="Max Altitude"
                value={form.maxAltitude || ""}
                style={styles.input}
                onChange={(e) => setForm({ ...form, maxAltitude: e.target.value })}
              />
              <input
                placeholder="Best Season"
                value={form.bestSeason || ""}
                style={styles.input}
                onChange={(e) => setForm({ ...form, bestSeason: e.target.value })}
              />
            </div>

            <div style={styles.gridContainer}>
              <input
                placeholder="Start Point"
                value={form.startPoint || ""}
                style={styles.input}
                onChange={(e) => setForm({ ...form, startPoint: e.target.value })}
              />
              <input
                placeholder="End Point"
                value={form.endPoint || ""}
                style={styles.input}
                onChange={(e) => setForm({ ...form, endPoint: e.target.value })}
              />
            </div>

            <div style={styles.gridContainer}>
              <input
                placeholder="Meals"
                value={form.meals || ""}
                style={styles.input}
                onChange={(e) => setForm({ ...form, meals: e.target.value })}
              />
              <input
                placeholder="Accommodation"
                value={form.accommodation || ""}
                style={styles.input}
                onChange={(e) => setForm({ ...form, accommodation: e.target.value })}
              />
            </div>

            <textarea
              placeholder="Overview"
              value={form.overview || ""}
              style={{ ...styles.input, height: "120px" }}
              onChange={(e) => setForm({ ...form, overview: e.target.value })}
            />
          </div>

          {/* IMAGES */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🖼️ Images</h2>

            <input type="file" style={styles.input}
              onChange={(e) => setHeroImage(e.target.files[0])}
            />

            <input type="file" multiple style={styles.input}
              onChange={(e) => setGallery([...e.target.files])}
            />
          </div>

          {/* DYNAMIC SECTIONS */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📅 Itinerary</h2>
            <ItineraryBuilder data={itinerary} setData={setItinerary} />
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>💼 Packages</h2>
            <PackageBuilder data={packages} setData={setPackages} />
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>⭐ Highlights</h2>
            <ListBuilder title="Highlights" data={highlights} setData={setHighlights} />
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📌 Includes</h2>
            <ListBuilder title="Includes" data={includes} setData={setIncludes} />
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>❌ Excludes</h2>
            <ListBuilder title="Excludes" data={excludes} setData={setExcludes} />
          </div>

          <div style={styles.section}>
  <h2 style={styles.sectionTitle}>❓ FAQs</h2>

  {faqs.map((f, i) => (
    <div key={i}>
      <input
        placeholder="Question"
        value={f.question}
        style={styles.input}
        onChange={(e) => {
          const updated = [...faqs];
          updated[i].question = e.target.value;
          setFaqs(updated);
        }}
      />

      <input
        placeholder="Answer"
        value={f.answer}
        style={styles.input}
        onChange={(e) => {
          const updated = [...faqs];
          updated[i].answer = e.target.value;
          setFaqs(updated);
        }}
      />
    </div>
  ))}

  <button
    type="button"
    style={styles.submitButton}
    onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}
  >
    + Add FAQ
  </button>
</div>

          {/* BUTTONS */}
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitButton}>
              💾 Update Trip
            </button>

            <button type="button" style={styles.cancelButton}
              onClick={() => navigate("/trips")}
            >
              ❌ Cancel
            </button>
          </div>

        </form>
      </div>
    </>
  );
}

/* SAME UI */
const styles = {
  container: {
    padding: "40px 20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    marginLeft: "260px"
  },
  header: {
    marginBottom: "40px",
    paddingBottom: "20px",
    borderBottom: "3px solid #007bff"
  },
  title: {
    fontSize: "2.5rem",
    color: "#1a1a2e",
    fontWeight: "600"
  },
  subtitle: {
    color: "#666",
    fontSize: "1rem"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    maxWidth: "800px"
  },
  section: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "10px",
    border: "1px solid #e9ecef"
  },
  sectionTitle: {
    fontSize: "1.3rem",
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "2px solid #e9ecef",
    borderRadius: "8px"
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px"
  },
  buttonGroup: {
    display: "flex",
    gap: "12px"
  },
  submitButton: {
    padding: "12px 30px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)"
  },
  cancelButton: {
    padding: "12px 30px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(108, 117, 125, 0.3)"
  }
};