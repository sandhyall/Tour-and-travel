import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Bookings() {

  const [bookings, setBookings] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const fetchData = async () => {
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
    fetchData();
  }, []);

  const updateStatus =
    async (id, status) => {
      try {
        await axios.put(
          `/bookings/${id}/status`,
          { status }
        );

        fetchData();
      } catch (err) {
        console.log(err);
      }
    };

  const filtered =
    bookings.filter((b) => {

      const name =
        `${b.buyer?.firstName || ""} ${b.buyer?.lastName || ""}`;

      return name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );
    });

  return (
    <div style={styles.container}>

      <h1>Bookings</h1>

      <input
        placeholder="Search by customer name..."
        style={styles.search}
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <div style={styles.tableWrap}>
        <table style={styles.table}>

          <thead>
            <tr>

              <th>Name</th>

              <th>Trip</th>

              <th>Travel Date</th>

              <th>People</th>

              <th>Amount</th>

              <th>Payment</th>

              <th>Booking</th>

              <th>Ticket</th>

              <th>Action</th>

            </tr>
          </thead>

          <tbody>
            {filtered.map((b) => (

              <tr key={b._id}>

                <td>
                  {b.buyer?.firstName}{" "}
                  {b.buyer?.lastName}
                </td>

                <td>
                  {b.trip?.title}
                </td>

                <td>
                  {new Date(
                    b.travelDate
                  ).toDateString()}
                </td>

                <td>
                  {
                    b.numberOfPeople
                  }
                </td>

                <td>
                  $
                  {b.totalAmount}
                </td>

                {/* PAYMENT STATUS */}
                <td>
                  <span
                    style={{
                      ...styles.status,

                      background:
                        b.paymentStatus ===
                        "paid"
                          ? "#22c55e"
                          : b.paymentStatus ===
                            "pending"
                          ? "#f59e0b"
                          : "#ef4444",
                    }}
                  >
                    {
                      b.paymentStatus
                    }
                  </span>
                </td>

                {/* BOOKING STATUS */}
                <td>
                  <span
                    style={{
                      ...styles.status,

                      background:
                        b.bookingStatus ===
                        "confirmed"
                          ? "#2563eb"
                          : b.bookingStatus ===
                            "cancelled"
                          ? "#ef4444"
                          : "#6b7280",
                    }}
                  >
                    {
                      b.bookingStatus
                    }
                  </span>
                </td>

                {/* PDF TICKET */}
                <td>
                  {b.ticketPdf ? (
                    <a
                      href={
                        b.ticketPdf
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    "-"
                  )}
                </td>

                {/* ACTIONS */}
                <td>
                  <div
                    style={{
                      display:
                        "flex",

                      gap: "6px",

                      flexWrap:
                        "wrap",
                    }}
                  >

                    <button
                      style={
                        styles.approve
                      }

                      onClick={() =>
                        updateStatus(
                          b._id,
                          "confirmed"
                        )
                      }
                    >
                      Confirm
                    </button>

                    <button
                      style={
                        styles.pending
                      }

                      onClick={() =>
                        updateStatus(
                          b._id,
                          "pending"
                        )
                      }
                    >
                      Pending
                    </button>

                    <button
                      style={
                        styles.cancel
                      }

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
  );
}

const styles = {

  container: {
    marginLeft: 260,
    padding: 20,
    background: "#f8f9fa",
    minHeight: "100vh",
  },

  search: {
    padding: 12,
    marginBottom: 15,
    width: "320px",
    maxWidth: "100%",
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  tableWrap: {
    overflowX: "auto",
    background: "#fff",
    borderRadius: 10,
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px",
  },

  status: {
    padding: "5px 10px",
    borderRadius: 6,
    color: "white",
    fontSize: 13,
    textTransform:
      "capitalize",
  },

  approve: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "8px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },

  pending: {
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "8px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },

  cancel: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
};