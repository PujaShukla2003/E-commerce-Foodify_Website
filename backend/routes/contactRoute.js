import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/send", async (req, res) => {
  const { name, email, phone, subject, inquiry, message } = req.body;

  try {
    // Gmail SMTP Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  // ✅ from .env
        pass: process.env.EMAIL_PASS,  // ✅ app password
      },
    });

    const mailOptions = {
      from: email,  // user ka email
      to: process.env.EMAIL_USER,  // ✅ tumhe yahan mail milega
      subject: `📩 New Contact Form: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Inquiry: ${inquiry}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "✅ Message sent successfully!" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ message: "❌ Failed to send message." });
  }
});

export default router;
