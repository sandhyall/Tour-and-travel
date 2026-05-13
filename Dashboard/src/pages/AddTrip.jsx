import { useState } from "react";
import axios from "../api/axios";
import ItineraryBuilder from "../components/ItineraryForm";
import PackageBuilder from "../components/PackageBuilder";
import ListBuilder from "../components/ListBuilder";
import Sidebar from "../components/Sidebar";
import "../styles/buttons.css";

export default function AddTrip() {

  const [form, setForm] = useState({
    title: "",
    country: "Nepal",
    duration: "",
    price: "",
    oldPrice: "",
    overview: "",

    // ✅ NEW FIELDS
    difficulty: "",
    activity: "",
    maxAltitude: "",
    bestSeason: "",
    startPoint: "",
    endPoint: "",
    meals: "",
    accommodation: ""
  });

  const [heroImage, setHeroImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  const [itinerary, setItinerary] = useState([]);
  const [packages, setPackages] = useState([]);
  const [includes, setIncludes] = useState([]);
  const [excludes, setExcludes] = useState([]);
  const [highlights, setHighlights] = useState([]);

  // ✅ NEW: FAQs STATE
  const [faqs, setFaqs] = useState([]);
  const [availableDates, setAvailableDates] =
  useState([]);

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
      fd.append(
  "availableDates",
  JSON.stringify(
    availableDates || []
  )
);
      // images
      if (heroImage) {
        fd.append("heroImage", heroImage);
      }

      if (gallery.length > 0) {
        gallery.forEach(img => fd.append("galleryImages", img));
      }

      const res = await axios.post("/trips", fd);

      console.log("CREATED:", res.data);
      alert("Trip Created Successfully");

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
      alert("Failed to create trip");
    }
  };

  return (
    <>
      <Sidebar />

      <div className="add-trip-container" style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>✈️ Add New Trip</h1>
          <p style={styles.subtitle}>Create an exciting new travel experience</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* BASIC INFO */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📍 Trip Information</h2>

            <input
              placeholder="Trip Title"
              style={styles.input}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <select
              style={styles.input}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            >
              <option>Nepal</option>
              <option>Bhutan</option>
              <option>Tibet</option>
            </select>

            {/* NEW FIELDS ROW 1 */}
            <div style={styles.gridContainer}>
              <input placeholder="Duration (days)" type="number"
                style={styles.input}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />
              <input placeholder="Base Price" type="number"
                style={styles.input}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>

            {/* NEW FIELDS ROW 2 */}
            <div style={styles.gridContainer}>
              <input placeholder="Difficulty (Easy/Moderate/Hard)"
                style={styles.input}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              />
              <input placeholder="Activity (Trekking/Hiking/etc)"
                style={styles.input}
                onChange={(e) => setForm({ ...form, activity: e.target.value })}
              />
            </div>

            {/* NEW FIELDS ROW 3 */}
            <div style={styles.gridContainer}>
              <input placeholder="Max Altitude"
                style={styles.input}
                onChange={(e) => setForm({ ...form, maxAltitude: e.target.value })}
              />
              <input placeholder="Best Season"
                style={styles.input}
                onChange={(e) => setForm({ ...form, bestSeason: e.target.value })}
              />
            </div>

            {/* NEW FIELDS ROW 4 */}
            <div style={styles.gridContainer}>
              <input placeholder="Start Point"
                style={styles.input}
                onChange={(e) => setForm({ ...form, startPoint: e.target.value })}
              />
              <input placeholder="End Point"
                style={styles.input}
                onChange={(e) => setForm({ ...form, endPoint: e.target.value })}
              />
            </div>

            {/* NEW FIELDS ROW 5 */}
            <div style={styles.gridContainer}>
              <input placeholder="Meals Included"
                style={styles.input}
                onChange={(e) => setForm({ ...form, meals: e.target.value })}
              />
              <input placeholder="Accommodation"
                style={styles.input}
                onChange={(e) => setForm({ ...form, accommodation: e.target.value })}
              />
            </div>

            <textarea
              placeholder="Trip Overview"
              style={{ ...styles.input, ...styles.textarea }}
              onChange={(e) => setForm({ ...form, overview: e.target.value })}
            />
          </div>

          {/* IMAGES */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🖼️ Images</h2>

            <div style={styles.uploadContainer}>
              <label style={styles.label}>Hero Image</label>
              <input type="file"
                style={styles.fileInput}
                onChange={(e) => setHeroImage(e.target.files[0])}
              />
            </div>

            <div style={styles.uploadContainer}>
              <label style={styles.label}>Gallery Images</label>
              <input type="file" multiple
                style={styles.fileInput}
                onChange={(e) => setGallery(Array.from(e.target.files))}
              />
            </div>
          </div>

          {/* DYNAMIC */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📅 Itinerary</h2>
            <ItineraryBuilder data={itinerary} setData={setItinerary} />
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>💼 Packages</h2>
            <PackageBuilder data={packages} setData={setPackages} />
          </div>

          {/* AVAILABLE DATES */}

<div style={styles.section}>

  <h2 style={styles.sectionTitle}>
    📅 Available Dates
  </h2>

  {availableDates.map(
    (d, i) => (

      <div
        key={i}
        style={
          styles.dateGrid
        }
      >

        <input
          type="date"

          style={styles.input}

          value={d.date}

          onChange={(e) => {

            const updated =
              [
                ...availableDates,
              ];

            updated[i].date =
              e.target.value;

            setAvailableDates(
              updated
            );
          }}
        />

        <input
          type="number"

          placeholder="Total Seats"

          style={styles.input}

          value={
            d.totalSeats
          }

          onChange={(e) => {

            const updated =
              [
                ...availableDates,
              ];

            updated[
              i
            ].totalSeats =
              e.target.value;

            setAvailableDates(
              updated
            );
          }}
        />

        <input
          type="number"

          placeholder="Special Price"

          style={styles.input}

          value={d.price}

          onChange={(e) => {

            const updated =
              [
                ...availableDates,
              ];

            updated[i].price =
              e.target.value;

            setAvailableDates(
              updated
            );
          }}
        />

      </div>

    )
  )}

  <button
    type="button"

    style={styles.submitButton}

    onClick={() =>
      setAvailableDates([
        ...availableDates,

        {
          date: "",

          totalSeats: "",

          price: "",
        },
      ])
    }
  >
    + Add Available Date
  </button>

</div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>⭐ Highlights</h2>
            <ListBuilder data={highlights} setData={setHighlights} />
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📌 Includes</h2>
            <ListBuilder data={includes} setData={setIncludes} />
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>❌ Excludes</h2>
            <ListBuilder data={excludes} setData={setExcludes} />
          </div>

          {/* ✅ NEW FAQ SECTION */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>❓ FAQs</h2>

            {faqs.map((f, i) => (
              <div key={i}>
                <input
                  placeholder="Question"
                  style={styles.input}
                  value={f.question}
                  onChange={(e) => {
                    const updated = [...faqs];
                    updated[i].question = e.target.value;
                    setFaqs(updated);
                  }}
                />

                <input
                  placeholder="Answer"
                  style={styles.input}
                  value={f.answer}
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
              onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}
              style={styles.submitButton}
            >
              + Add FAQ
            </button>
          </div>
          <button type="submit" style={styles.submitButton}>
            🚀 Create Trip
          </button>

        </form>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    marginLeft: "260px",
  },

  header: {
    marginBottom: "40px",
    paddingBottom: "20px",
    borderBottom: "3px solid #007bff",
  },

  title: {
    fontSize: "2.5rem",
    color: "#1a1a2e",
    margin: "0 0 10px 0",
    fontWeight: "600",
  },

  subtitle: {
    color: "#666",
    fontSize: "1rem",
    margin: "0",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    maxWidth: "800px",
  },

  section: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    border: "1px solid #e9ecef",
  },

  sectionTitle: {
    fontSize: "1.3rem",
    color: "#1a1a2e",
    marginBottom: "20px",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "15px",
    border: "2px solid #e9ecef",
    borderRadius: "8px",
    fontSize: "0.95rem",
    boxSizing: "border-box",
  },

  textarea: {
    minHeight: "120px",
    resize: "vertical",
  },

  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },

  uploadContainer: {
    marginBottom: "20px",
    paddingBottom: "20px",
    borderBottom: "1px solid #e9ecef",
  },

  label: {
    display: "block",
    fontSize: "0.95rem",
    fontWeight: "600",
    marginBottom: "10px",
  },

  fileInput: {
    width: "100%",
    padding: "10px",
    border: "2px dashed #007bff",
    borderRadius: "8px",
    backgroundColor: "#f0f7ff",
  },

  helpText: {
    fontSize: "0.85rem",
    color: "#999",
    marginTop: "8px",
  },

  submitButton: {
    padding: "15px 30px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
    width: "100%",
  },
  dateGrid: {
  display: "grid",

  gridTemplateColumns:
    "1fr 1fr 1fr",

  gap: "15px",

  marginBottom: "15px",
},

};
const media = `
@media (max-width: 1024px) {

  .add-trip-container {
    margin-left: 0 !important;
    padding: 15px !important;
  }

}

@media (max-width: 768px) {

  .add-trip-container {
    padding: 10px !important;
  }

}

@media (max-width: 768px) {

  .date-grid {
    grid-template-columns: 1fr !important;
  }

}
`;

if (typeof document !== "undefined") {

  const style =
    document.createElement(
      "style"
    );

  style.innerHTML = media;

  document.head.appendChild(
    style
  );
}