import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function ListBuilder({ title = "", data = [], setData }) {

  const [value, setValue] = useState("");

  const add = () => {
    if (value.trim()) {
      setData([...data, value]);
      setValue("");
    }
  };

  const remove = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      add();
    }
  };

  return (
    <div style={styles.container}>
      {/* Input Section */}
      <div style={styles.inputSection}>
        <input 
          value={value} 
          placeholder={`Add a new ${title?.toLowerCase?.() || "item"} item...`}
          style={styles.input}
          onChange={(e)=>setValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button type="button" style={styles.addButton} onClick={add}>
          ➕ Add
        </button>
      </div>

      {/* Items List */}
      <div style={styles.listContainer}>
        {data.length === 0 ? (
          <p style={styles.emptyText}>No items added yet</p>
        ) : (
          <ul style={styles.list}>
            {data.map((d, i) => (
              <li key={i} style={styles.listItem}>
                <span style={styles.itemText}>{d}</span>
                <button 
                  type="button"
                  style={styles.removeItemButton}
                  onClick={() => remove(i)}
                >
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  inputSection: {
    display: "flex",
    gap: "8px",
    alignItems: "stretch"
  },
  input: {
    flex: 1,
    padding: "12px 15px",
    border: "2px solid #e9ecef",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    transition: "all 0.3s ease",
    boxSizing: "border-box"
  },
  addButton: {
    padding: "12px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(40, 167, 69, 0.2)",
    whiteSpace: "nowrap"
  },
  listContainer: {
    borderTop: "2px solid #e9ecef",
    paddingTop: "12px"
  },
  list: {
    listStyle: "none",
    padding: "0",
    margin: "0",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 15px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #e9ecef",
    borderRadius: "8px",
    transition: "all 0.3s ease"
  },
  itemText: {
    color: "#1a1a2e",
    fontSize: "0.95rem",
    fontWeight: "500"
  },
  removeItemButton: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "0.8rem"
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontSize: "0.9rem",
    padding: "20px",
    margin: "0"
  }
};