import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await transporter.sendMail({
      from: `"Wales Travel" <${process.env.EMAIL_USER}>`,

      to: process.env.RECEIVER_EMAIL,

      replyTo: email,

      subject: `New Contact Request - ${subject}`,

      html: `
        <div style="font-family:Arial;padding:20px;">
          <h2>New Client Request</h2>

          <p><strong>Client Name:</strong> ${name}</p>

          <p><strong>Client Email:</strong> ${email}</p>

          <p><strong>Subject:</strong> ${subject}</p>

          <p><strong>Message:</strong></p>

          <div style="padding:15px;border:1px solid #ddd;border-radius:8px;">
            ${message}
          </div>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `"Wales Travel" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: "We Received Your Request",

      html: `
        <div style="font-family:Arial;padding:20px;">
          <h2>Hello ${name},</h2>

          <p>Thank you for contacting Wales Travel.</p>

          <p>
            We have successfully received your request.
            Our team will contact you soon.
          </p>

          <br/>

          <p>Regards,</p>

          <h3>Wales Travel Team</h3>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.log("EMAIL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Email sending failed",
      error: error.message,
    });
  }
};
