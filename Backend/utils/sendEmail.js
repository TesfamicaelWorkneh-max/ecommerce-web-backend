// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// const EMAIL_USER = process.env.EMAIL_USER; // your Gmail
// const EMAIL_PASS = process.env.EMAIL_PASS; // app password

// // Create transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS,
//   },
// });

// export const sendEmail = async ({ to, subject, html }) => {
//   const mailOptions = {
//     from: EMAIL_USER,
//     to,
//     subject,
//     html,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info.response);
//     return info;
//   } catch (error) {
//     console.error("Nodemailer error:", error);
//     throw new Error("Email could not be sent");
//   }
// };
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const EMAIL_USER = process.env.EMAIL_USER;
// const EMAIL_PASS = process.env.EMAIL_PASS;

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// export const sendEmail = async ({ to, subject, html }) => {
//   try {
//     const info = await transporter.sendMail({
//       from: EMAIL_USER,
//       to,
//       subject,
//       html,
//     });

//     console.log("Email sent:", info.messageId);
//     return info;
//   } catch (error) {
//     console.error("Nodemailer error:", error);
//     throw new Error("Email could not be sent");
//   }
// };
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Use secure port for Gmail
  secure: false, // true for 465
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // allows self-signed certs (Render safe)
  },
});

// Test transporter once at startup
transporter.verify((err, success) => {
  if (err) {
    console.error("⚠️ Nodemailer transporter error:", err);
  } else {
    console.log("✅ Nodemailer transporter ready");
  }
});

export const sendEmail = async ({ to, subject, html }) => {
  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error("Email credentials are not set in environment variables!");
  }

  try {
    const info = await transporter.sendMail({
      from: `"Your App Name" <${EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`📧 Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("❌ Nodemailer send error:", error);
    throw new Error("Email could not be sent. Check credentials or network.");
  }
};
