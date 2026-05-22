import nodemailer from "nodemailer";
import fs from "fs";

// GLOBAL TRANSPORTER
export const transporter =
  nodemailer.createTransport({
    host: "smtp.gmail.com",

    port: 465,

    secure: true,

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

export const sendBookingEmail =
  async ({
    email,
    booking,
  }) => {

    const transporter =
      nodemailer.createTransport({
        service: "smtp.gmail.com",

        auth: {
          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS,
        },
      });

    await transporter.sendMail({
      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "Booking Confirmed",

      html: `
      <h2>
        Your booking is confirmed
      </h2>

      <p>
        Trip:
        ${booking.trip.title}
      </p>

      <p>
        Date:
        ${new Date(
          booking.travelDate
        ).toDateString()}
      </p>

      <p>
        People:
        ${booking.numberOfPeople}
      </p>

      <p>
        Amount Paid:
        $${booking.totalAmount}
      </p>

      <h3>
        Thank you for booking
        with us.
      </h3>
      `,
    });
  };