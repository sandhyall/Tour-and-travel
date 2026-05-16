import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateTicketPdf =
  async (booking) => {
    return new Promise(
      (resolve, reject) => {
        try {
          const dir =
            "uploads/tickets";

          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
              recursive: true,
            });
          }

          const filePath =
            path.join(
              dir,
              `ticket-${booking._id}.pdf`
            );

          const doc =
            new PDFDocument();

          const stream =
            fs.createWriteStream(
              filePath
            );

          doc.pipe(stream);

          doc
            .fontSize(24)
            .text(
              "Travel Booking Confirmation",
              {
                align: "center",
              }
            );

          doc.moveDown();

          doc
            .fontSize(16)
            .text(
              `Trip: ${booking.trip.title}`
            );

          doc.text(
            `Customer: ${booking.buyer.firstName} ${booking.buyer.lastName}`
          );

          doc.text(
            `Email: ${booking.buyer.email}`
          );

          doc.text(
            `Travel Date: ${new Date(
              booking.travelDate
            ).toDateString()}`
          );

          doc.text(
            `People: ${booking.numberOfPeople}`
          );

          doc.text(
            `Total Amount: USD ${booking.totalAmount}`
          );

          doc.text(
            `Booking Status: ${booking.bookingStatus}`
          );

          doc.text(
            `Payment Status: ${booking.paymentStatus}`
          );

          doc.moveDown();

          doc.text(
            "Thank you for booking with us."
          );

          doc.end();

          stream.on(
            "finish",
            () => resolve(filePath)
          );
        } catch (err) {
          reject(err);
        }
      }
    );
  };