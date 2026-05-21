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

    console.log(
      "SENDING EMAIL TO:",
      email
    );

    // CHECK SMTP
    await transporter.verify();

    console.log(
      "SMTP READY"
    );

    const attachments = [];

    // attach pdf if exists
    if (
      booking.ticketPdf &&
      fs.existsSync(
        booking.ticketPdf
      )
    ) {
      attachments.push({
        filename:
          "ticket.pdf",

        path:
          booking.ticketPdf,
      });
    }

    await transporter.sendMail({
      from: `"Travel Booking" <${process.env.EMAIL_USER}>`,

      to: email,

      subject:
        "Booking Confirmed",

      html: `
        <h2>
          Booking Confirmed
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
          Travelers:
          ${booking.numberOfPeople}
        </p>

        <p>
          Total:
          USD ${booking.totalAmount}
        </p>

        <p>
          Thank you for booking with us.
        </p>
      `,

      attachments,
    });

    console.log(
      "EMAIL SENT SUCCESSFULLY"
    );
  };