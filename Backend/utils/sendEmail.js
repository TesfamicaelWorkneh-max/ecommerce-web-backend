import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER; // your Gmail
const EMAIL_PASS = process.env.EMAIL_PASS; // app password

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Nodemailer error:", error);
    throw new Error("Email could not be sent");
  }
};
