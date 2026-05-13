import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/buttons.css";

export default function Trips() {

  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  const fetchTrips = async () => {
    try {

      const { data } =
        await axios.get("/trips");

      setTrips(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const deleteTrip = async (id) => {

    if (
      !window.confirm(
        "Delete this trip?"
      )
    ) return;

    try {

      await axios.delete(
        `/trips/${id}`
      );

      fetchTrips();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Sidebar />

      <div
        className="trips-container"
        style={styles.container}
      >

        <div style={styles.header}>

          <h1 style={styles.title}>
            🌍 All Trips
          </h1>

          <p style={styles.subtitle}>
            Manage all your travel
            experiences
          </p>

        </div>

        {trips.length === 0 ? (

          <div style={styles.emptyState}>
            <p>
              No trips found.
              Create one to get
              started!
            </p>
          </div>

        ) : (

          <div style={styles.grid}>

            {trips.map((trip) => (

              <div
                key={trip._id}
                style={styles.card}
              >

                {/* IMAGE */}
                <div
                  style={
                    styles.imageContainer
                  }
                >

                  <img
                    src={
                      trip.heroImage?.url
                    }
                    alt={trip.title}
                    style={styles.image}
                  />

                  <div style={styles.badge}>
                    {trip.country}
                  </div>

                </div>

                {/* CONTENT */}
                <div style={styles.content}>

                  <h3 style={styles.cardTitle}>
                    {trip.title}
                  </h3>

                  {trip.duration && (
                    <p style={styles.duration}>
                      ⏱️{" "}
                      {trip.duration} days
                    </p>
                  )}

                  {trip.difficulty && (
                    <p style={styles.duration}>
                      📊 Difficulty:{" "}
                      {
                        trip.difficulty
                      }
                    </p>
                  )}

                  {trip.maxAltitude && (
                    <p style={styles.duration}>
                      🏔️ Max Altitude:{" "}
                      {
                        trip.maxAltitude
                      }
                    </p>
                  )}

                  {(trip.startPoint ||
                    trip.endPoint) && (
                    <p style={styles.duration}>
                      📍{" "}
                      {trip.startPoint ||
                        "N/A"}{" "}
                      →
                      {" "}
                      {trip.endPoint ||
                        "N/A"}
                    </p>
                  )}

                  {trip.overview && (
                    <p style={styles.overview}>
                      {trip.overview.substring(
                        0,
                        80
                      )}
                      ...
                    </p>
                  )}

                  {/* PRICE */}
                  <div
                    style={
                      styles.priceSection
                    }
                  >

                    <span
                      style={
                        styles.price
                      }
                    >
                      ₹{trip.price}
                    </span>

                    {trip.oldPrice && (
                      <span
                        style={
                          styles.oldPrice
                        }
                      >
                        ₹
                        {
                          trip.oldPrice
                        }
                      </span>
                    )}

                  </div>

                  {/* SUMMARY */}
                  <div
                    style={
                      styles.detailsSummary
                    }
                  >

                    {trip.includes &&
                      trip.includes
                        .length > 0 && (

                      <span
                        style={
                          styles.badge2
                        }
                      >
                        ✓{" "}
                        {
                          trip.includes
                            .length
                        }{" "}
                        Includes
                      </span>
                    )}

                    {trip.packages &&
                      trip.packages
                        .length > 0 && (

                      <span
                        style={
                          styles.badge2
                        }
                      >
                        📦{" "}
                        {
                          trip.packages
                            .length
                        }{" "}
                        Packages
                      </span>
                    )}

                    {trip.faqs &&
                      trip.faqs.length >
                        0 && (

                      <span
                        style={
                          styles.badge2
                        }
                      >
                        ❓{" "}
                        {
                          trip.faqs
                            .length
                        }{" "}
                        FAQs
                      </span>
                    )}

                  </div>

                  {/* AVAILABLE DATES */}
                  {trip.availableDates &&
                    trip.availableDates
                      .length > 0 && (

                    <div
                      style={
                        styles.dateSection
                      }
                    >

                      <h4
                        style={
                          styles.dateTitle
                        }
                      >
                        📅 Available
                        Dates
                      </h4>

                      <div
                        style={
                          styles.dateList
                        }
                      >

                        {trip.availableDates
                          .slice(0, 3)
                          .map(
                            (
                              d,
                              i
                            ) => {

                              const remainingSeats =
                                d.totalSeats -
                                d.bookedSeats;

                              return (

                                <div
                                  key={i}
                                  style={{
                                    ...styles.dateBadge,

                                    backgroundColor:
                                      remainingSeats <=
                                      0
                                        ? "#ffe5e5"
                                        : "#e7f7ee",

                                    color:
                                      remainingSeats <=
                                      0
                                        ? "#dc3545"
                                        : "#198754",
                                  }}
                                >

                                  <div>
                                    {new Date(
                                      d.date
                                    ).toLocaleDateString()}
                                  </div>

                                  <small>
                                    {remainingSeats <=
                                    0
                                      ? "Fully Booked"
                                      : `${remainingSeats} seats left`}
                                  </small>

                                </div>
                              );
                            }
                          )}

                        {trip.availableDates
                          .length >
                          3 && (

                          <div
                            style={
                              styles.moreDates
                            }
                          >
                            +
                            {trip
                              .availableDates
                              .length -
                              3}{" "}
                            more dates
                          </div>
                        )}

                      </div>

                    </div>
                  )}

                  {/* BUTTONS */}
                  <div
                    style={
                      styles.buttonGroup
                    }
                  >

                    <button
                      style={
                        styles.editButton
                      }

                      onClick={() =>
                        navigate(
                          `/edit/${trip._id}`
                        )
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button
                      style={
                        styles.dateButton
                      }

                      onClick={() =>
                        navigate(
                          `/trip-dates/${trip._id}`
                        )
                      }
                    >
                      📅 Dates
                    </button>

                    <button
                      style={
                        styles.deleteButton
                      }

                      onClick={() =>
                        deleteTrip(
                          trip._id
                        )
                      }
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </>
  );
}

const styles = {

  container: {
    padding: "20px",
    backgroundColor:
      "#f8f9fa",
    minHeight: "100vh",
    marginLeft: "260px",
  },

  header: {
    marginBottom: "40px",
    paddingBottom: "20px",
    borderBottom:
      "3px solid #007bff",
  },

  title: {
    fontSize:
      "clamp(1.8rem, 4vw, 2.5rem)",
    color: "#1a1a2e",
    margin:
      "0 0 10px 0",
    fontWeight: "600",
  },

  subtitle: {
    color: "#666",
    fontSize:
      "clamp(0.9rem, 2vw, 1rem)",
    margin: "0",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.08)",
    border:
      "1px solid #e9ecef",
    display: "flex",
    flexDirection:
      "column",
  },

  imageContainer: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
    backgroundColor:
      "#e9ecef",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  badge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor:
      "#007bff",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
  },

  content: {
    padding: "20px",
    display: "flex",
    flexDirection:
      "column",
    flex: 1,
  },

  cardTitle: {
    fontSize: "1.3rem",
    color: "#1a1a2e",
    margin:
      "0 0 12px 0",
    fontWeight: "600",
  },

  duration: {
    fontSize: "0.9rem",
    color: "#666",
    margin:
      "0 0 8px 0",
  },

  overview: {
    fontSize: "0.9rem",
    color: "#999",
    margin:
      "0 0 15px 0",
  },

  priceSection: {
    marginBottom: "12px",
    display: "flex",
    alignItems:
      "center",
    gap: "10px",
  },

  price: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#007bff",
  },

  oldPrice: {
    fontSize: "0.9rem",
    color: "#999",
    textDecoration:
      "line-through",
  },

  detailsSummary: {
    display: "flex",
    gap: "8px",
    marginBottom: "15px",
    flexWrap: "wrap",
  },

  badge2: {
    backgroundColor:
      "#e7f3ff",
    color: "#007bff",
    padding: "5px 10px",
    borderRadius: "15px",
    fontSize: "0.8rem",
    fontWeight: "600",
  },

  dateSection: {
    marginBottom: "15px",
  },

  dateTitle: {
    fontSize: "0.9rem",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#333",
  },

  dateList: {
    display: "flex",
    flexDirection:
      "column",
    gap: "8px",
  },

  dateBadge: {
    padding: "8px 10px",
    borderRadius: "8px",
    fontSize: "0.8rem",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems:
      "center",
    fontWeight: "600",
  },

  moreDates: {
    fontSize: "0.8rem",
    color: "#666",
    textAlign: "center",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "auto",
    flexWrap: "wrap",
  },

  editButton: {
    flex: 1,
    padding: "10px 15px",
    backgroundColor:
      "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
  },

  dateButton: {
    flex: 1,
    padding: "10px 15px",
    backgroundColor:
      "#198754",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
  },

  deleteButton: {
    flex: 1,
    padding: "10px 15px",
    backgroundColor:
      "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
  },

  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor:
      "#fff",
    borderRadius: "12px",
    color: "#999",
  },
};