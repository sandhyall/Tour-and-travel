import { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/buttons.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/auth/login", {
        email,
        password
      });

      login(data.token, {
        name: "Admin User",
        email: email,
        role: "Administrator"
      });
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      
      <div style={styles.leftPanel}>
        <h1 style={styles.brand}>Himalaya Admin</h1>
        <p style={styles.subtitle}>
          Manage Nepal • Bhutan • Tibet Packages
        </p>
      </div>

      <div style={styles.rightPanel}>
        <form onSubmit={handleSubmit} style={styles.form}>

          <h2 style={styles.title}>Admin Login</h2>

          <input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p style={styles.hint}>
            Default: admin@travel.com / admin123
          </p>

        </form>
      </div>

    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    flexWrap: "wrap",
    fontFamily: "Arial"
  },

  leftPanel: {
    flex: 1,
    minWidth: "300px",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },

  brand: {
    fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
    marginBottom: "10px",
    fontWeight: "700"
  },

  subtitle: {
    opacity: 0.8,
    textAlign: "center",
    fontSize: "clamp(0.9rem, 3vw, 1.1rem)"
  },

  rightPanel: {
    flex: 1,
    minWidth: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },

  form: {
    width: "100%",
    maxWidth: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    backgroundColor: "#fff"
  },

  title: {
    textAlign: "center",
    color: "#1a1a2e",
    fontSize: "1.5rem",
    fontWeight: "600",
    margin: "0 0 10px 0"
  },

  input: {
    padding: "12px 16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
    backgroundColor: "#f8f9fa"
  },

  button: {
    padding: "12px 24px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)"
  },

  hint: {
    fontSize: "0.85rem",
    textAlign: "center",
    opacity: 0.7,
    color: "#666",
    margin: "10px 0 0 0"
  }
};