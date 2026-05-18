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

    // Email to company
    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: process.env.RECEIVER_EMAIL,

      subject: `New Contact Request - ${subject}`,

      html: `
        <h2>New Client Request</h2>

        <p><strong>Client Name:</strong> ${name}</p>

        <p><strong>Client Email:</strong> ${email}</p>

        <p><strong>Subject:</strong> ${subject}</p>

        <p><strong>Message:</strong></p>

        <div style="padding:10px;border:1px solid gray;">
          ${message}
        </div>
      `,
    });

    // Auto reply to client
    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: email,

      subject: "We Received Your Request",

      html: `
        <h2>Hello ${name}</h2>

        <p>Thank you for contacting us.</p>

        <p>
          We have successfully received your request.
          Our team will contact you soon.
        </p>

        <br/>

        <p>Regards,</p>

        <h3>Wales Travel</h3>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
};