import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const STATUS_CONFIG = {
  pending: {
    subject: "⏳ Booking Received – Awaiting Confirmation",
    badge: "#F59E0B",
    badgeText: "PENDING",
    headline: "We've received your booking!",
    body: "Your booking is currently under review. Our team will confirm it shortly. You'll receive another email once it's verified.",
    paymentNote:
      "Your payment is being reviewed. If you paid by bank transfer, please allow 1–2 business days for verification.",
    paymentBg: "#fffbeb",
    paymentBorder: "#fde68a",
    paymentIcon: "⏳",
    paymentColor: "#92400e",
  },
  confirmed: {
    subject: "✅ Booking Confirmed – You're all set!",
    badge: "#10B981",
    badgeText: "CONFIRMED",
    headline: "Your booking is confirmed!",
    body: "Great news! Your booking has been verified and confirmed. Pack your bags — adventure awaits!",
    paymentNote: "Payment received and verified. Your spot is secured.",
    paymentBg: "#f0fdf4",
    paymentBorder: "#bbf7d0",
    paymentIcon: "✅",
    paymentColor: "#14532d",
  },
  cancelled: {
    subject: "❌ Booking Cancelled",
    badge: "#EF4444",
    badgeText: "CANCELLED",
    headline: "Your booking has been cancelled.",
    body: "Unfortunately, your booking has been cancelled. If you believe this is a mistake or need assistance, please contact us.",
    paymentNote:
      "If a payment was made, our team will process any applicable refund within 5–7 business days.",
    paymentBg: "#fef2f2",
    paymentBorder: "#fecaca",
    paymentIcon: "❌",
    paymentColor: "#7f1d1d",
  },
};

export const sendBookingEmail = async ({ to, type = "pending", booking }) => {
  const config = STATUS_CONFIG[type] ?? STATUS_CONFIG.pending;

  // trip may be a populated object or just an ID string
  const tripTitle = booking.trip?.title ?? booking.tripTitle ?? "Your Trip";

  const paymentMethodLabel =
    booking.paymentMethod === "swift_bank_transfer"
      ? "Bank Transfer"
      : booking.paymentMethod === "card"
        ? "Online (Card / Khalti / eSewa)"
        : booking.paymentMethod
          ? booking.paymentMethod
          : "Online Gateway";

  const paymentStatusMap = {
    pending: { label: "Awaiting Verification", color: "#D97706" },
    confirmed: { label: "Verified & Paid", color: "#059669" },
    cancelled: { label: "Cancelled", color: "#DC2626" },
  };
  const paymentStatus = paymentStatusMap[type] ?? paymentStatusMap.pending;

  const perPerson =
    booking.packagePrice ??
    (booking.numberOfPeople > 0
      ? (booking.totalAmount / booking.numberOfPeople).toFixed(2)
      : booking.totalAmount);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${config.subject}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:16px;overflow:hidden;
                      box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;width:100%;">

          <!-- ── HEADER ── -->
          <tr>
            <td style="background:#0f172a;padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.5px;">
                ✈ Travel Booking
              </h1>
              <p style="margin:6px 0 0;color:#94a3b8;font-size:13px;">
                Booking reference:
                <strong style="color:#f8fafc;">${booking.invoiceNumber ?? booking._id}</strong>
              </p>
            </td>
          </tr>

          <!-- ── STATUS BADGE + HEADLINE ── -->
          <tr>
            <td style="padding:28px 40px 0;">
              <span style="display:inline-block;background:${config.badge};color:#fff;
                           font-size:11px;font-weight:800;letter-spacing:1.5px;
                           padding:5px 14px;border-radius:999px;">
                ${config.badgeText}
              </span>
              <h2 style="margin:14px 0 6px;color:#0f172a;font-size:22px;font-weight:700;">
                ${config.headline}
              </h2>
              <p style="margin:0;color:#64748b;font-size:14px;line-height:1.6;">
                ${config.body}
              </p>
            </td>
          </tr>

          <!-- ── BOOKING DETAILS ── -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#f8fafc;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
                <tr style="background:#f1f5f9;">
                  <td colspan="2" style="padding:14px 20px;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#94a3b8;
                               letter-spacing:1px;text-transform:uppercase;">
                      Booking Details
                    </p>
                  </td>
                </tr>
                ${row("Trip", tripTitle)}
                ${row("Traveler", `${booking.buyer?.firstName ?? ""} ${booking.buyer?.lastName ?? ""}`.trim() || "—")}
                ${row("Email", booking.buyer?.email ?? "—")}
                ${row(
                  "Departure Date",
                  new Date(booking.travelDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }),
                )}
                ${row("No. of Travelers", booking.numberOfPeople)}
                ${row("Package", booking.packageName ?? "Standard")}
              </table>
            </td>
          </tr>

          <!-- ── PAYMENT DETAILS ── -->
          <tr>
            <td style="padding:20px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#f8fafc;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
                <tr style="background:#f1f5f9;">
                  <td colspan="2" style="padding:14px 20px;">
                    <p style="margin:0;font-size:11px;font-weight:700;color:#94a3b8;
                               letter-spacing:1px;text-transform:uppercase;">
                      💳 Payment Summary
                    </p>
                  </td>
                </tr>
                ${row("Payment Method", paymentMethodLabel)}
                ${row("Price per Person", `USD ${Number(perPerson).toLocaleString()}`)}
                ${row("Travelers", `× ${booking.numberOfPeople}`)}
                ${rowHighlight("Total Charged", `USD ${Number(booking.totalAmount).toLocaleString()}`)}
                ${row(
                  "Payment Status",
                  `<span style="color:${paymentStatus.color};font-weight:700;">${paymentStatus.label}</span>`,
                )}
              </table>
            </td>
          </tr>

          <!-- ── PAYMENT STATUS NOTICE ── -->
          <tr>
            <td style="padding:20px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:${config.paymentBg};border-radius:10px;
                            border:1px solid ${config.paymentBorder};">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;font-size:13px;color:${config.paymentColor};line-height:1.6;">
                      <strong>${config.paymentIcon} Payment Note:</strong><br/>
                      ${config.paymentNote}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;
                       padding:24px 40px;margin-top:28px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.8;">
                Questions? Reply to this email or contact our support team.<br/>
                <strong style="color:#0f172a;">Thank you for travelling with us!</strong>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const info = await transporter.sendMail({
    from: `"Travel Booking" <${process.env.EMAIL_USER}>`,
    to,
    subject: config.subject,
    html,
  });

  console.log(
    `[email] ${type} email sent → ${to} | messageId: ${info.messageId}`,
  );
  return info;
};

function row(label, value) {
  return `
    <tr style="border-top:1px solid #e2e8f0;">
      <td style="padding:12px 20px;font-size:13px;color:#64748b;width:42%;vertical-align:top;">${label}</td>
      <td style="padding:12px 20px;font-size:13px;color:#0f172a;font-weight:600;vertical-align:top;">${value ?? "—"}</td>
    </tr>`;
}

function rowHighlight(label, value) {
  return `
    <tr style="border-top:2px solid #e2e8f0;background:#fff;">
      <td style="padding:14px 20px;font-size:14px;color:#0f172a;font-weight:700;width:42%;vertical-align:top;">${label}</td>
      <td style="padding:14px 20px;font-size:18px;color:#0f172a;font-weight:800;vertical-align:top;">${value ?? "—"}</td>
    </tr>`;
}
