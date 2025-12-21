import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

import {
  getAllUsers,
  blockUser,
  unblockUser,
  makeAdmin,
  removeAdmin,
  deleteUser,
} from "../controllers/adminUserController.js";

const router = express.Router();

// =========================
// USER MANAGEMENT
// =========================
router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id/block", protect, adminOnly, blockUser);
router.put("/users/:id/unblock", protect, adminOnly, unblockUser);
router.put("/users/:id/make-admin", protect, adminOnly, makeAdmin);
router.put("/users/:id/remove-admin", protect, adminOnly, removeAdmin);
router.delete("/users/:id", protect, adminOnly, deleteUser);

export default router;
