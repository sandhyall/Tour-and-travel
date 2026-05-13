import { useEffect, useState } from "react";

import Calendar from "react-calendar";

import axios from "../api/axios";

import Sidebar from "../components/Sidebar";

import "react-calendar/dist/Calendar.css";

export default function
AdminCalendar() {

  const [data, setData] =
    useState([]);

  const [selectedBookings,
    setSelectedBookings] =
    useState([]);

  useEffect(() => {
    fetchCalendar();
  }, []);

  const fetchCalendar =
    async () => {
      try {
        const res =
          await axios.get(
            "/dashboard/calendar"
          );

        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

  const getDayData = (
    date
  ) => {
    const d =
      date.toISOString()
        .split("T")[0];

    return data.find(
      (x) => x.date === d
    );
  };

  const handleClickDay =
    (date) => {
      const found =
        getDayData(date);

      setSelectedBookings(
        found?.bookings || []
      );
    };

  return (
    <>
      <Sidebar />

      <div
        className="admin-calendar-container"
        style={styles.container}
      >
        <div style={styles.header}>
          <h1 style={styles.title}>
            📅 Admin Calendar
          </h1>

          <p style={styles.subtitle}>
            View booking counts
            and trip schedules
          </p>
        </div>

        <div
          style={
            styles.calendarContainer
          }
        >
          <Calendar
            onClickDay={
              handleClickDay
            }

            tileContent={({
              date,
            }) => {
              const dayData =
                getDayData(
                  date
                );

              if (!dayData)
                return null;

              return (
                <div
                  style={
                    styles.tileContent
                  }
                >
                  <span
                    style={{
                      ...styles.count,

                      color:
                        dayData.remainingSeats <=
                        0
                          ? "#dc3545"
                          : "#28a745",
                    }}
                  >
                    {
                      dayData.count
                    }
                  </span>

                  <span
                    style={
                      styles.bookingText
                    }
                  >
                    bookings
                  </span>
                </div>
              );
            }}

            tileClassName={({
              date,
            }) => {
              const dayData =
                getDayData(
                  date
                );

              if (!dayData)
                return "";

              if (
                dayData.remainingSeats <=
                0
              ) {
                return "full-booked";
              }

              return "available-date";
            }}
          />
        </div>

        {/* BOOKINGS LIST */}

        <div
          style={{
            marginTop: "30px",
            background:
              "#fff",
            padding: "20px",
            borderRadius:
              "10px",
          }}
        >
          <h2>
            Selected Date
            Bookings
          </h2>

          {selectedBookings.length ===
          0 ? (
            <p>
              No bookings found
            </p>
          ) : (
            selectedBookings.map(
              (b) => (
                <div
                  key={b._id}
                  style={{
                    padding:
                      "10px",
                    borderBottom:
                      "1px solid #eee",
                  }}
                >
                  <strong>
                    {
                      b.buyer
                        ?.firstName
                    }{" "}
                    {
                      b.buyer
                        ?.lastName
                    }
                  </strong>

                  <p>
                    {
                      b.trip
                        ?.title
                    }
                  </p>

                  <p>
                    {
                      b.numberOfPeople
                    }{" "}
                    People
                  </p>

                  <p>
                    {
                      b.paymentStatus
                    }
                  </p>
                </div>
              )
            )
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
 
  container: {
    marginLeft: "260px",
    padding: "20px",
    backgroundColor:
      "#f8f9fa",
    minHeight: "100vh",
  },

  header: {
    marginBottom: "30px",
    textAlign: "center",
  },

  title: {
    color: "#1a1a2e",
    fontSize: "2rem",
  },

  subtitle: {
    color: "#666",
  },

  calendarContainer: {
    backgroundColor:
      "#fff",
    padding: "20px",
    borderRadius: "10px",
  },

  tileContent: {
    display: "flex",
    flexDirection:
      "column",
    alignItems: "center",
  },

  count: {
    fontWeight: "bold",
  },

  bookingText: {
    fontSize: "0.7rem",
  },
  
};