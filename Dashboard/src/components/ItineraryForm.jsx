export default function ItineraryBuilder({ data, setData }) {

  const addDay = () => {
    setData([
      ...data,
      { day: data.length + 1, title: "", description: "", meals: "" }
    ]);
  };

  const removeDay = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const update = (i, key, value) => {
    const copy = [...data];
    copy[i][key] = value;
    setData(copy);
  };

  return (
    <div style={styles.container}>
      {data.map((d, i) => (
        <div key={i} style={styles.dayBox}>
          {/* Day Header */}
          <div style={styles.dayHeader}>
            <h4 style={styles.dayTitle}>📅 Day {i + 1}</h4>
            {data.length > 1 && (
              <button 
                type="button" 
                style={styles.removeButton}
                onClick={() => removeDay(i)}
              >
                ✕
              </button>
            )}
          </div>

          {/* Day Title Input */}
          <input
            placeholder="Day Title (e.g., Arrival & City Tour)"
            value={d.title || ""}
            style={styles.input}
            onChange={(e)=>update(i,"title",e.target.value)}
          />

          {/* Day Description */}
          <textarea
            placeholder="Day Description (activities, places to visit, etc.)"
            value={d.description || ""}
            style={{...styles.input, ...styles.textarea}}
            onChange={(e)=>update(i,"description",e.target.value)}
          />

          {/* Meals Input */}
          <input
            placeholder="Meals Included (e.g., Breakfast, Lunch, Dinner)"
            value={d.meals || ""}
            style={styles.input}
            onChange={(e)=>update(i,"meals",e.target.value)}
          />
        </div>
      ))}

      <button type="button" style={styles.addButton} onClick={addDay}>
        ➕ Add Another Day
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  dayBox: {
    padding: "20px",
    border: "2px solid #e9ecef",
    borderRadius: "10px",
    backgroundColor: "#fff",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)"
  },
  dayHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    paddingBottom: "12px",
    borderBottom: "2px solid #f0f0f0"
  },
  dayTitle: {
    color: "#1a1a2e",
    fontSize: "1.1rem",
    margin: "0",
    fontWeight: "600"
  },
  removeButton: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    fontSize: "1.2rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    fontWeight: "bold"
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "12px",
    border: "2px solid #e9ecef",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    transition: "all 0.3s ease",
    boxSizing: "border-box"
  },
  textarea: {
    minHeight: "100px",
    resize: "vertical"
  },
  addButton: {
    padding: "12px 24px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
    marginTop: "10px"
  }
};