// backend/controllers/pushController.js
import User from "../models/User.model.js";

// Web-push configuration
let webpush = null;
let vapidConfigured = false;

// Initialize web-push
const initializeWebPush = async () => {
  try {
    const webPushModule = await import("web-push");
    webpush = webPushModule.default;

    const publicKey = process.env.VAPID_PUBLIC_KEY;
    const privateKey = process.env.VAPID_PRIVATE_KEY;

    if (publicKey && privateKey && publicKey.trim() && privateKey.trim()) {
      webpush.setVapidDetails(
        `mailto:${process.env.EMAIL_USER || "admin@example.com"}`,
        publicKey.trim(),
        privateKey.trim()
      );
      vapidConfigured = true;
    }
  } catch (error) {
    console.warn("Failed to initialize web-push:", error.message);
  }
};

// Initialize on import
initializeWebPush();

export const subscribeToPush = async (req, res) => {
  try {
    const { subscription } = req.body;

    if (!subscription) {
      return res.status(400).json({
        success: false,
        message: "Push subscription is required",
      });
    }

    // Save subscription to user
    await User.findByIdAndUpdate(req.user._id, {
      pushSubscription: JSON.stringify(subscription),
    });

    // Send welcome push notification
    if (vapidConfigured) {
      try {
        const payload = JSON.stringify({
          title: "🔔 Notifications Enabled!",
          body: "You'll now receive important updates via push notifications.",
          icon: "/logo.png",
          data: {
            url: process.env.FRONTEND_URL || "http://localhost:5173",
          },
        });

        await webpush.sendNotification(subscription, payload);
      } catch (pushErr) {
        console.warn("Welcome push notification failed:", pushErr.message);
      }
    }

    res.json({
      success: true,
      message: "Push notifications enabled successfully",
    });
  } catch (error) {
    console.error("Push subscription error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to enable push notifications",
    });
  }
};

export const unsubscribeFromPush = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $unset: { pushSubscription: 1 },
    });

    res.json({
      success: true,
      message: "Push notifications disabled",
    });
  } catch (error) {
    console.error("Push unsubscribe error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to disable push notifications",
    });
  }
};

export const testPushNotification = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user?.pushSubscription) {
      return res.status(400).json({
        success: false,
        message: "No push subscription found",
      });
    }

    if (!vapidConfigured) {
      return res.status(400).json({
        success: false,
        message: "Push notifications not configured",
      });
    }

    const payload = JSON.stringify({
      title: "✅ Test Notification",
      body: "This is a test push notification!",
      icon: "/logo.png",
      data: {
        url: process.env.FRONTEND_URL || "http://localhost:5173",
        test: true,
      },
    });

    await webpush.sendNotification(JSON.parse(user.pushSubscription), payload);

    res.json({
      success: true,
      message: "Test push notification sent",
    });
  } catch (error) {
    console.error("Test push error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send test notification",
    });
  }
};

export const getVapidPublicKey = async (req, res) => {
  res.json({
    success: true,
    data: {
      publicKey: process.env.VAPID_PUBLIC_KEY,
      vapidConfigured,
    },
  });
};
