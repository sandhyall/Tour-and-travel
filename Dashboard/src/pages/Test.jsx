import { useState } from "react";
import axios from "../api/axios";

export default function ApiTester() {
  const [bookingId, setBookingId] = useState("");
  const [tripId, setTripId] = useState("");
  const [output, setOutput] = useState("");

  const callApi = async (fn) => {
    try {
      const res = await fn();
      setOutput(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setOutput(JSON.stringify(err.response?.data || err.message, null, 2));
    }
  };

  return (
    <div style={styles.container}>
      <h2>🧪 Backend API Tester</h2>

      {/* DASHBOARD */}
      <div style={styles.box}>
        <h3>📊 Dashboard Stats</h3>
        <button onClick={() => callApi(() => axios.get("/dashboard/stats"))}>
          Test Stats API
        </button>
      </div>

      {/* TRIPS */}
      <div style={styles.box}>
        <h3>✈️ Trips</h3>

        <button onClick={() => callApi(() => axios.get("/trips"))}>
          Get All Trips
        </button>

        <input
          placeholder="Trip ID"
          value={tripId}
          onChange={(e) => setTripId(e.target.value)}
        />

        <button
          onClick={() =>
            callApi(() => axios.get(`/trips/${tripId}`))
          }
        >
          Get Trip By ID
        </button>
      </div>

      {/* BOOKINGS */}
      <div style={styles.box}>
        <h3>📅 Bookings</h3>
        <button onClick={() => callApi(() => axios.get("/bookings"))}>
          Get Bookings
        </button>
      </div>

      {/* PAYMENT TEST */}
      <div style={styles.box}>
        <h3>💳 Bank Payment</h3>

        <input
          placeholder="Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
        />

        <button
          onClick={() =>
            callApi(() =>
              axios.post("/payment/bank", {
                bookingId,
              })
            )
          }
        >
          Test Bank Payment
        </button>
      </div>

      {/* OUTPUT */}
      <div style={styles.output}>
        <h3>📤 Response Output</h3>
        <pre>{output || "Run an API to see response..."}</pre>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "sans-serif",
  },

  box: {
    padding: "15px",
    border: "1px solid #ddd",
    marginBottom: "15px",
    borderRadius: "8px",
  },

  output: {
    marginTop: "20px",
    padding: "15px",
    background: "#111",
    color: "#0f0",
    borderRadius: "8px",
  },
};