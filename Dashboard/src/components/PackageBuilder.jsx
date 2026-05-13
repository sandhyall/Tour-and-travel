export default function PackageBuilder({ data, setData }) {

  const addPackage = () => {
    setData([
      ...data,
      {
        name: "",
        price: "",
        oldPrice: "",
        description: "",
        groupPricing: []
      }
    ]);
  };

  const removePackage = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const update = (i, key, value) => {
    const copy = [...data];
    copy[i][key] = value;
    setData(copy);
  };

  return (
    <div style={styles.container}>
      {data.map((p, i) => (
        <div key={i} style={styles.packageBox}>
          {/* Package Header */}
          <div style={styles.packageHeader}>
            <h4 style={styles.packageTitle}>💼 Package {i + 1}</h4>
            {data.length > 1 && (
              <button 
                type="button" 
                style={styles.removeButton}
                onClick={() => removePackage(i)}
              >
                ✕
              </button>
            )}
          </div>

          {/* Package Name */}
          <input 
            placeholder="Package Name (e.g., Standard, Premium, Luxury)"
            value={p.name || ""}
            style={styles.input}
            onChange={(e)=>update(i,"name",e.target.value)}
          />

          {/* Price Grid */}
          <div style={styles.priceGrid}>
            <input 
              type="number" 
              placeholder="Current Price (₹)"
              value={p.price || ""}
              style={styles.input}
              onChange={(e)=>update(i,"price",e.target.value)}
            />

            <input 
              type="number" 
              placeholder="Original Price (₹)"
              value={p.oldPrice || ""}
              style={styles.input}
              onChange={(e)=>update(i,"oldPrice",e.target.value)}
            />
          </div>

          {/* Description */}
          <textarea 
            placeholder="Package Description"
            value={p.description || ""}
            style={{...styles.input, ...styles.textarea}}
            onChange={(e)=>update(i,"description",e.target.value)}
          />
        </div>
      ))}

      <button type="button" style={styles.addButton} onClick={addPackage}>
        ➕ Add Another Package
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
  packageBox: {
    padding: "20px",
    border: "2px solid #e9ecef",
    borderRadius: "10px",
    backgroundColor: "#fff",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)"
  },
  packageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    paddingBottom: "12px",
    borderBottom: "2px solid #f0f0f0"
  },
  packageTitle: {
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
  priceGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px"
  },
  addButton: {
    padding: "12px 24px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
    marginTop: "10px"
  }
};