// backend/routes/notificationRoutes.js
import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  getMyNotifications,
  markNotificationRead,
  markAllRead,
  getUnreadCount,
  deleteNotification,
  deleteMultipleNotifications,
  getNotificationStats,
} from "../controllers/notificationController.js";
import {
  subscribeToPush,
  unsubscribeFromPush,
  testPushNotification,
  getVapidPublicKey,
} from "../controllers/pushController.js";

const router = express.Router();

// Notifications
router.get("/", protect, getMyNotifications);
router.get("/stats", protect, getNotificationStats);
router.get("/unread-count", protect, getUnreadCount);
router.put("/:id/read", protect, markNotificationRead);
router.put("/read-all", protect, markAllRead);
router.delete("/:id", protect, deleteNotification);
router.delete("/", protect, deleteMultipleNotifications);

// Push notifications
router.get("/push/public-key", protect, getVapidPublicKey);
router.post("/push/subscribe", protect, subscribeToPush);
router.delete("/push/unsubscribe", protect, unsubscribeFromPush);
router.post("/push/test", protect, testPushNotification);

export default router;
