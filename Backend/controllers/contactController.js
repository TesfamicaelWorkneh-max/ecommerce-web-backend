import express from "express";
import { sendEmail } from "../utils/sendEmail.js";

export const sendQuery = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Admin email (configure this in your .env)
    const ADMIN_EMAIL = process.env.BREVO.SENDER_EMAIL;

    // Email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #4b5563; }
            .value { color: #1f2937; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From:</div>
                <div class="value">${name} (${email})</div>
              </div>
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value" style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 5px; border: 1px solid #e5e7eb;">${message}</div>
              </div>
              <div class="footer">
                <p>This email was sent from the contact form on LuxeCart website.</p>
                <p>Time: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to admin
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `New Contact Form: ${subject}`,
      html: emailHtml,
    });

    // Optional: Send auto-reply to user
    const userReplyHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .thank-you { font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 20px; }
            .info-box { background: white; padding: 20px; border-radius: 5px; border: 1px solid #e5e7eb; margin-bottom: 20px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Us!</h1>
            </div>
            <div class="content">
              <div class="thank-you">Hi ${name},</div>
              <div class="info-box">
                <p>We've received your message and our team will get back to you within 24 hours.</p>
                <p><strong>Here's what we received:</strong></p>
                <ul>
                  <li><strong>Subject:</strong> ${subject}</li>
                  <li><strong>Message:</strong> ${message.substring(0, 200)}${message.length > 200 ? "..." : ""}</li>
                </ul>
              </div>
              <p>In the meantime, you might find answers to common questions in our <a href="https://luxecart.com/faq">FAQ section</a>.</p>
              <div class="footer">
                <p>Best regards,<br>The LuxeCart Team</p>
                <p>Email: support@luxecart.com<br>Phone: +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send auto-reply to user
    await sendEmail({
      to: email,
      subject: "We've received your message - LuxeCart",
      html: userReplyHtml,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};
