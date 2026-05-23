import nodemailer from "nodemailer";

// SINGLE reusable transporter
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendBookingEmail = async ({
  to,
  type = "confirmed",
  booking,
}) => {
  try {
    let subject = "";
    let statusMessage = "";

    // Email type handling
    switch (type) {
      case "pending":
        subject = "Booking Received";
        statusMessage =
          "Your booking request has been received and is pending verification.";
        break;

      case "confirmed":
        subject = "Booking Confirmed";
        statusMessage =
          "Your booking has been confirmed successfully.";
        break;

      case "cancelled":
        subject = "Booking Cancelled";
        statusMessage =
          "Your booking has been cancelled.";
        break;

      default:
        subject = "Booking Update";
        statusMessage = "Your booking status has been updated.";
    }

    await transporter.sendMail({
      from: `"Tour & Travel" <${process.env.EMAIL_USER}>`,
      to,

      subject,

      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>${subject}</h2>

          <p>${statusMessage}</p>

          <hr />

          <p>
            <strong>Trip:</strong>
            ${booking.trip?.title || "Trip"}
          </p>

          <p>
            <strong>Date:</strong>
            ${new Date(
              booking.travelDate
            ).toDateString()}
          </p>

          <p>
            <strong>Travelers:</strong>
            ${booking.numberOfPeople}
          </p>

          <p>
            <strong>Total Amount:</strong>
            $${booking.totalAmount}
          </p>

          <p>
            <strong>Invoice:</strong>
            ${booking.invoiceNumber}
          </p>

          <br />

          <p>
            Thank you for booking with us.
          </p>
        </div>
      `,
    });

    console.log("Email sent to:", to);
  } catch (err) {
    console.error("sendBookingEmail error:", err.message);
  }
};