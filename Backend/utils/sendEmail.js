// import dotenv from "dotenv";
// import brevo from "@getbrevo/brevo";

// dotenv.config();

// console.log("🔧 Checking Brevo configuration...");
// console.log("🔑 API Key exists:", !!process.env.BREVO_API_KEY);

// // Initialize Brevo API client
// const apiKey = process.env.BREVO_API_KEY;
// const sender = process.env.BREVO_SMTP_USER;
// // Create API instance - DIFFERENT INITIALIZATION
// const apiInstance = new brevo.TransactionalEmailsApi();
// const apiKeyAuth = apiInstance.authentications["apiKey"];
// apiKeyAuth.apiKey = apiKey;

// /**
//  * Send email using Brevo API
//  */
// export const sendEmail = async ({ to, subject, html }) => {
//   try {
//     console.log(`📤 Sending email to: ${to}`);

//     // Create email object
//     const emailData = {
//       sender: {
//         name: "Tesfamicael",
//         email: sender,
//       },
//       to: [{ email: to }],
//       subject: subject,
//       htmlContent: html,
//       textContent: html.replace(/<[^>]*>/g, ""),
//     };

//     console.log("📨 Calling Brevo API...");

//     // Send email
//     const response = await apiInstance.sendTransacEmail(emailData);

//     console.log("✅ Email sent successfully!");
//     console.log(`📧 Message ID: ${response.messageId}`);

//     return {
//       success: true,
//       messageId: response.messageId,
//       data: response,
//     };
//   } catch (error) {
//     console.error("❌ Brevo API Error:");

//     if (error.response) {
//       console.error("Status:", error.response.status);
//       console.error("Response:", error.response.body);

//       if (error.response.body) {
//         console.error("Error message:", error.response.body.message);
//       }
//     }

//     throw new Error(
//       `Email sending failed: ${error.message || "Unknown error"}`
//     );
//   }
// };

// /**
//  * Test email function
//  */
// export const sendTestEmail = async (recipientEmail) => {
//   try {
//     const result = await sendEmail({
//       to: recipientEmail,
//       subject: "✅ Test Email from E-Commerce Server",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px;">
//           <h1 style="color: #4CAF50;">🎉 Brevo API Test Successful!</h1>
//           <p>Your Brevo API is working on Render!</p>
//           <p>Time: ${new Date().toLocaleString()}</p>
//         </div>
//       `,
//     });

//     console.log("🎯 Test email result:", result);
//     return result;
//   } catch (error) {
//     console.error("❌ Test email failed:", error.message);
//     throw error;
//   }
// };

// // Verify configuration
// export const verifyBrevoConfig = () => {
//   if (!process.env.BREVO_API_KEY) {
//     console.error("❌ BREVO_API_KEY not set");
//     return false;
//   }

//   if (!process.env.BREVO_API_KEY.startsWith("xkeysib-")) {
//     console.error("❌ API Key format incorrect");
//     return false;
//   }

//   console.log("✅ Brevo API configured");
//   return true;
// };

// verifyBrevoConfig();
import dotenv from "dotenv";
import brevo from "@getbrevo/brevo";

dotenv.config();

const apiKey = process.env.BREVO_API_KEY;
const senderEmail = process.env.BREVO__SENDER_EMAIL; // must be verified in Brevo

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
