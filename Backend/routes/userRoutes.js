import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  getUserStats,
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes (if any) would go here

// Protected routes
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/delete-account").delete(protect, deleteUserAccount);

// Admin only routes
router.route("/stats").get(protect, adminOnly, getUserStats);

export default router;
