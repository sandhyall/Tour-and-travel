import nodemailer from "nodemailer";

export const sendBookingEmail = async ({ email, booking }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // ✅ FIXED
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Booking Confirmed 🎉",

    html: `
      <h2>Your booking is confirmed</h2>

      <p><b>Trip:</b> ${booking.trip?.title}</p>

      <p><b>Date:</b> ${new Date(booking.travelDate).toDateString()}</p>

      <p><b>People:</b> ${booking.numberOfPeople}</p>

      <p><b>Amount Paid:</b> $${booking.totalAmount}</p>

      <h3>Thank you for booking with us ❤️</h3>
    `,
  });
};