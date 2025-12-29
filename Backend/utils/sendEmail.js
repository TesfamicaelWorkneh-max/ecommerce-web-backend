import dotenv from "dotenv";
import brevo from "@getbrevo/brevo";

dotenv.config();

const apiKey = process.env.BREVO_API_KEY;
const senderEmail = process.env.BREVO_SENDER_EMAIL; // must be verified in Brevo

// Initialize Brevo API
const apiInstance = new brevo.TransactionalEmailsApi();
const apiKeyAuth = apiInstance.authentications["apiKey"];
apiKeyAuth.apiKey = apiKey;

/**
 * Send email via Brevo API (Gmail-friendly)
 */
export const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log(`📤 Sending email to: ${to}`);

    const emailData = {
      sender: {
        name: "Tesfa",
        email: senderEmail,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
      textContent: html.replace(/<[^>]*>/g, ""), // fallback plain text
      replyTo: {
        email: senderEmail,
        name: "Tesfamicael",
      },
      headers: {
        "X-Mailer": "Brevo-API",
      },
    };

    const response = await apiInstance.sendTransacEmail(emailData);

    console.log("✅ Email sent successfully!");
    console.log("📧 Message ID:", response.messageId);

    return {
      success: true,
      messageId: response.messageId,
      data: response,
    };
  } catch (error) {
    console.error("❌ Brevo API Error:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response:", error.response.body);
      if (error.response.body)
        console.error("Error message:", error.response.body.message);
    }
    throw new Error(
      `Email sending failed: ${error.message || "Unknown error"}`
    );
  }
};

/**
 * Test email function
 */
export const sendTestEmail = async (recipientEmail) => {
  return sendEmail({
    to: recipientEmail,
    subject: "✅ Test Email from E-Commerce Server",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #4CAF50;">🎉 Brevo API Test Successful!</h1>
        <p>Your Brevo API is working and Gmail-friendly!</p>
        <p>Time: ${new Date().toLocaleString()}</p>
      </div>
    `,
  });
};
