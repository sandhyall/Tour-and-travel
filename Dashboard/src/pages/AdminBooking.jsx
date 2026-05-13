import { useEffect, useState } from "react";
import axios from "../api/axios";

import Sidebar from "../components/Sidebar";

import "../styles/buttons.css";

export default function AdminBookings() {
  const [bookings, setBookings] =
    useState([]);

  const fetchBookings =
    async () => {
      try {
        const { data } =
          await axios.get(
            "/bookings"
          );

        setBookings(data);
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    fetchBookings();
  }, []);

  const verify =
    async (id) => {
      try {
        await axios.put(
          `/bookings/${id}/verify`
        );

        fetchBookings();
      } catch (err) {
        console.log(err);
      }
    };

  const updateStatus =
    async (id, status) => {
      try {
        await axios.put(
          `/bookings/${id}/status`,
          { status }
        );

        fetchBookings();
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <>
      <Sidebar />

      <div
        className="admin-bookings-container"
        style={styles.container}
      >
        <div style={styles.header}>
          <h1 style={styles.title}>
            📋 Admin Bookings
          </h1>

          <p style={styles.subtitle}>
            Manage and verify
            customer bookings
          </p>
        </div>

        <div
          style={
            styles.tableContainer
          }
        >
          <table
            style={styles.table}
          >
            <thead>
              <tr>
                <th style={styles.th}>
                  Trip
                </th>

                <th style={styles.th}>
                  Customer
                </th>

                <th style={styles.th}>
                  Email
                </th>

                <th style={styles.th}>
                  People
                </th>

                <th style={styles.th}>
                  Travel Date
                </th>

                <th style={styles.th}>
                  Amount
                </th>

                <th style={styles.th}>
                  Payment
                </th>

                <th style={styles.th}>
                  Booking
                </th>

                <th style={styles.th}>
                  Slip
                </th>

                <th style={styles.th}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b._id}
                  style={styles.tr}
                >
                  <td style={styles.td}>
                    {b.trip?.title}
                  </td>

                  <td style={styles.td}>
                    {
                      b.buyer
                        ?.firstName
                    }{" "}
                    {
                      b.buyer
                        ?.lastName
                    }
                  </td>

                  <td style={styles.td}>
                    {
                      b.buyer?.email
                    }
                  </td>

                  <td style={styles.td}>
                    {
                      b.numberOfPeople
                    }
                  </td>

                  <td style={styles.td}>
                    {new Date(
                      b.travelDate
                    ).toDateString()}
                  </td>

                  <td style={styles.td}>
                    $
                    {b.totalAmount}
                  </td>

                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,

                        backgroundColor:
                          b.paymentStatus ===
                          "paid"
                            ? "#28a745"
                            : b.paymentStatus ===
                              "pending"
                            ? "#ffc107"
                            : "#dc3545",
                      }}
                    >
                      {
                        b.paymentStatus
                      }
                    </span>
                  </td>

                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,

                        backgroundColor:
                          b.bookingStatus ===
                          "confirmed"
                            ? "#007bff"
                            : "#6c757d",
                      }}
                    >
                      {
                        b.bookingStatus
                      }
                    </span>
                  </td>

                  <td style={styles.td}>
                    {b.bankSlip
                      ?.url && (
                      <a
                        href={
                          b
                            .bankSlip
                            .url
                        }
                        target="_blank"
                        rel="noreferrer"
                        style={
                          styles.link
                        }
                      >
                        View Slip
                      </a>
                    )}
                  </td>

                  <td style={styles.td}>
                    <div
                      style={{
                        display:
                          "flex",
                        gap: "8px",
                        flexWrap:
                          "wrap",
                      }}
                    >
                      {b.paymentStatus !==
                        "paid" && (
                        <button
                          onClick={() =>
                            verify(
                              b._id
                            )
                          }
                          style={
                            styles.button
                          }
                        >
                          Verify
                        </button>
                      )}

                      <button
                        style={{
                          ...styles.button,
                          backgroundColor:
                            "#dc3545",
                        }}
                        onClick={() =>
                          updateStatus(
                            b._id,
                            "cancelled"
                          )
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    marginLeft: "260px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },

  header: {
    marginBottom: "30px",
    textAlign: "center",
  },

  title: {
    color: "#333",
    margin: "0 0 10px 0",
    fontSize: "2rem",
    fontWeight: "bold",
  },

  subtitle: {
    color: "#666",
    margin: 0,
  },

  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px",
    textAlign: "left",
  },

  tr: {
    borderBottom:
      "1px solid #dee2e6",
  },

  td: {
    padding: "12px",
  },

  status: {
    padding: "4px 8px",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "0.8rem",
    textTransform:
      "capitalize",
  },

  button: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};