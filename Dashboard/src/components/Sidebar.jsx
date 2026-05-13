import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaPlus, FaList, FaChartBar, FaBars, FaTimes, FaCalendarAlt, FaBookOpen, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, loginTime } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getLoginDuration = () => {
    if (!loginTime) return "Just now";
    const loginDate = new Date(loginTime);
    const now = new Date();
    const diffMs = now - loginDate;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="sidebar-mobile-toggle" onClick={toggleSidebar}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>✈️ Travel Admin</h2>
          <p style={styles.subtitle}>Dashboard Panel</p>
        </div>

        {/* User Stats Section */}
        {user && (
          <div style={styles.userSection}>
            <div style={styles.userAvatar}>
              <FaUser size={24} />
            </div>
            <h3 style={styles.userName}>{user.name}</h3>
            <p style={styles.userRole}>{user.role}</p>
            <p style={styles.userEmail}>{user.email}</p>
            <p style={styles.loginStatus}>
              🟢 Logged in {getLoginDuration()}
            </p>
          </div>
        )}

        {/* Navigation Links */}
        <nav style={styles.nav}>
          <Link 
            className={`sidebar-link ${isActive("/") || isActive("/dashboard") ? 'active' : ''}`}
            to="/"
            onClick={() => setIsOpen(false)}
          >
            <FaHome style={styles.icon} /> Dashboard
          </Link>

          <Link 
            className={`sidebar-link ${isActive("/add-trip") || isActive("/add") ? 'active' : ''}`}
            to="/add-trip"
            onClick={() => setIsOpen(false)}
          >
            <FaPlus style={styles.icon} /> Add Trip
          </Link>

          
          <Link 
            className={`sidebar-link ${isActive("/trips") ? 'active' : ''}`}
            to="/trips"
            onClick={() => setIsOpen(false)}
          >
            <FaList style={styles.icon} /> Trips
          </Link>

          <Link 
            className={`sidebar-link ${isActive("/admin-bookings") ? 'active' : ''}`}
            to="/admin-bookings"
            onClick={() => setIsOpen(false)}
          >
            <FaBookOpen style={styles.icon} /> Admin Bookings
          </Link>

          <Link 
            className={`sidebar-link ${isActive("/admin-calendar") ? 'active' : ''}`}
            to="/admin-calendar"
            onClick={() => setIsOpen(false)}
          >
            <FaCalendarAlt style={styles.icon} /> Admin Calendar
          </Link>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={styles.logoutButton}
          className="sidebar-logout-btn"
        >
          <FaSignOutAlt style={styles.icon} /> Logout
        </button>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>Travel Wales © 2024</p>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
}



const styles = {
  header: {
    padding: "25px 20px",
    borderBottom: "2px solid rgba(0, 123, 255, 0.2)",
    backgroundColor: "rgba(0, 123, 255, 0.05)"
  },
  title: {
    color: "#fff",
    margin: "0 0 5px 0",
    fontSize: "1.3rem",
    fontWeight: "700",
    letterSpacing: "0.5px"
  },
  subtitle: {
    color: "#b3b3cc",
    margin: "0",
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  userSection: {
    padding: "20px",
    backgroundColor: "rgba(0, 123, 255, 0.1)",
    borderBottom: "2px solid rgba(0, 123, 255, 0.2)",
    textAlign: "center",
    margin: "0"
  },
  userAvatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 123, 255, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 12px",
    color: "#007bff",
    fontSize: "1.5rem"
  },
  userName: {
    color: "#fff",
    margin: "0 0 5px 0",
    fontSize: "1rem",
    fontWeight: "600"
  },
  userRole: {
    color: "#b3b3cc",
    margin: "0 0 3px 0",
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  userEmail: {
    color: "#999",
    margin: "0 0 8px 0",
    fontSize: "0.8rem"
  },
  loginStatus: {
    color: "#4caf50",
    margin: "0",
    fontSize: "0.8rem",
    fontWeight: "600"
  },
  nav: {
    flex: 1,
    padding: "20px 0",
    display: "flex",
    flexDirection: "column"
  },
  icon: {
    fontSize: "1.1rem",
    minWidth: "20px"
  },
  logoutButton: {
    width: "90%",
    margin: "20px auto",
    padding: "12px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(220, 53, 69, 0.3)"
  },
  footer: {
    padding: "20px",
    borderTop: "1px solid rgba(0, 123, 255, 0.1)",
    textAlign: "center"
  },
  footerText: {
    color: "#666",
    fontSize: "0.8rem",
    margin: "0"
  }
};