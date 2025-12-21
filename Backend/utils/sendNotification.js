// backend/utils/sendNotification.js
import Notification from "../models/Notification.model.js";
import User from "../models/User.model.js";
import { sendEmail } from "./sendEmail.js";
import { getIO } from "../socket.js";

// Web-push configuration
let webpush = null;
let vapidConfigured = false;

// Initialize web-push only if VAPID keys are available
const initializeWebPush = async () => {
  try {
    const webPushModule = await import("web-push");
    webpush = webPushModule.default;

    const publicKey = process.env.VAPID_PUBLIC_KEY;
    const privateKey = process.env.VAPID_PRIVATE_KEY;

    if (publicKey && privateKey && publicKey.trim() && privateKey.trim()) {
      console.log("🔐 Initializing web-push with VAPID keys...");
      webpush.setVapidDetails(
        `mailto:${process.env.EMAIL_USER || "admin@example.com"}`,
        publicKey.trim(),
        privateKey.trim()
      );
      vapidConfigured = true;
      console.log("✅ Web-push initialized successfully");
    } else {
      console.warn(
        "⚠️ VAPID keys missing or empty. Push notifications disabled."
      );
    }
  } catch (error) {
    console.warn("❌ Failed to initialize web-push:", error.message);
  }
};

// Initialize on import
initializeWebPush();

// Notification templates
const notificationTemplates = {
  order_placed: {
    title: "🎉 Order Confirmed!",
    message: "Your order #{orderNumber} has been placed successfully!",
    type: "order",
    priority: "medium",
    icon: "shopping-bag",
  },
  order_status_update: (status) => ({
    title: "📦 Order Status Update",
    message: `Your order status has been updated to "${status}"`,
    type: "order_status",
    priority: "medium",
    icon: "package",
  }),
  return_request_submitted: {
    title: "📝 Return Request Submitted",
    message: "Your return request has been submitted and is under review",
    type: "return_request",
    priority: "medium",
    icon: "rotate-ccw",
  },
  return_status_update: (status) => ({
    title: "🔄 Return Status Update",
    message: `Your return request status has been updated to "${status}"`,
    type: "return_status",
    priority: "medium",
    icon: "refresh-ccw",
  }),
  admin_new_order: {
    title: "🛒 New Order Received",
    message: "A new order has been placed! Click to view details.",
    type: "admin_alert",
    priority: "high",
    icon: "alert-circle",
  },
  admin_new_return: {
    title: "📦 New Return Request",
    message: "A customer has submitted a new return request",
    type: "admin_alert",
    priority: "high",
    icon: "alert-triangle",
  },
};

// Email templates
const emailTemplates = {
  order_placed: (data) => ({
    subject: `Order Confirmation #${data.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">🎉 Order Confirmed!</h2>
        <p>Thank you for your order! Your order #${data.orderNumber} has been received and is being processed.</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Order Details:</strong></p>
          <p>Order Number: ${data.orderNumber}</p>
          <p>Total Amount: $${data.total}</p>
        </div>
        <p>You can track your order from your account dashboard.</p>
      </div>
    `,
  }),
  return_status_update: (data) => ({
    subject: `Return Status Update - ${data.status}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Return Status Update</h2>
        <p>Your return request status has been updated to: <strong>${data.status}</strong></p>
        ${data.adminNotes ? `<p><strong>Admin Notes:</strong> ${data.adminNotes}</p>` : ""}
        ${data.trackingNumber ? `<p><strong>Tracking Number:</strong> ${data.trackingNumber}</p>` : ""}
      </div>
    `,
  }),
};

export const sendNotification = async (
  userId,
  message,
  type = "order",
  data = {},
  options = {}
) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.warn(`User ${userId} not found for notification`);
      return null;
    }

    // Get template if available
    let template;
    if (options.template && notificationTemplates[options.template]) {
      template =
        typeof notificationTemplates[options.template] === "function"
          ? notificationTemplates[options.template](data)
          : notificationTemplates[options.template];
    }

    // Create notification
    const notification = await Notification.create({
      user: userId,
      title: template?.title || options.title || getDefaultTitle(type),
      message: template?.message || message,
      type: template?.type || type,
      priority: template?.priority || options.priority || "medium",
      icon: template?.icon || options.icon || "bell",
      data: {
        ...data,
        notificationId: undefined,
      },
      actionUrl: options.actionUrl,
      actionLabel: options.actionLabel,
      expiresAt:
        options.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    // Send real-time notification via Socket.io
    try {
      const io = getIO();
      if (io) {
        io.to(`user_${userId}`).emit("notification", {
          _id: notification._id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          icon: notification.icon,
          priority: notification.priority,
          data: notification.data,
          actionUrl: notification.actionUrl,
          actionLabel: notification.actionLabel,
          createdAt: notification.createdAt,
          timeAgo: "Just now",
        });
      }
    } catch (socketErr) {
      console.warn("Socket emit failed:", socketErr.message);
    }

    // Send browser push notification if available
    if (user.pushSubscription && webpush && vapidConfigured) {
      try {
        const subscription = JSON.parse(user.pushSubscription);

        const payload = JSON.stringify({
          title: notification.title,
          body: notification.message,
          icon: "/logo.png",
          badge: "/badge.png",
          data: {
            url:
              notification.actionUrl ||
              `${process.env.FRONTEND_URL || "http://localhost:5173"}/notifications`,
            notificationId: notification._id.toString(),
            type: notification.type,
          },
        });

        await webpush.sendNotification(subscription, payload);
        console.log(`📱 Push notification sent to user ${userId}`);
      } catch (pushErr) {
        console.warn("Push notification failed:", pushErr.message);
        if (pushErr.statusCode === 410 || pushErr.statusCode === 404) {
          await User.findByIdAndUpdate(userId, {
            $unset: { pushSubscription: 1 },
          });
        }
      }
    }

    // Send email for important notifications
    if (
      options.sendEmail !== false &&
      ["order", "order_status", "return_status", "payment"].includes(type)
    ) {
      try {
        let emailContent;

        if (options.template && emailTemplates[options.template]) {
          emailContent = emailTemplates[options.template](data);
        } else {
          emailContent = {
            subject: notification.title,
            html: `<p>${notification.message}</p>`,
          };
        }

        await sendEmail({
          to: user.email,
          subject: emailContent.subject,
          html: emailContent.html,
        });
        console.log(`📧 Email sent to ${user.email}`);
      } catch (emailErr) {
        console.error("Email send failed:", emailErr.message);
      }
    }

    console.log(`✅ Notification sent to user ${userId}`);
    return notification;
  } catch (error) {
    console.error("sendNotification error:", error);
    return null;
  }
};

export const sendBulkNotifications = async (
  userIds,
  message,
  type,
  data,
  options
) => {
  const notifications = [];
  for (const userId of userIds) {
    const notification = await sendNotification(
      userId,
      message,
      type,
      data,
      options
    );
    if (notification) {
      notifications.push(notification);
    }
  }
  return notifications;
};

export const markNotificationDelivered = async (notificationId) => {
  return await Notification.findByIdAndUpdate(
    notificationId,
    {
      delivered: true,
      deliveredAt: new Date(),
    },
    { new: true }
  );
};

function getDefaultTitle(type) {
  const titles = {
    order: "📦 Order Update",
    order_status: "🔄 Status Changed",
    return_request: "📝 Return Request",
    return_status: "🔄 Return Update",
    payment: "💰 Payment Update",
    shipping: "🚚 Shipping Update",
    promotion: "🎉 Special Offer",
    system: "⚙️ System Notification",
    admin_alert: "👨‍💼 Admin Alert",
  };
  return titles[type] || "🔔 Notification";
}
