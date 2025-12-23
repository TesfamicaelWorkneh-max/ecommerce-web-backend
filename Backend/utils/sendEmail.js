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

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // MUST be false for 587
  auth: {
    user: process.env.BREVO_SMTP_USER, // 9ea5bd001@smtp-brevo.com
    pass: process.env.BREVO_SMTP_PASS, // SMTP KEY (NOT Gmail)
  },
  tls: {
    rejectUnauthorized: false, // avoids TLS issues on Render
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Tesfamicael" <worknehtesfamicael707@gmail.com>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Email send failed:", err);
    throw new Error("Email could not be sent");
  }
};
