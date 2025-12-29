// import express from "express";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";

// import {
//   getAllUsers,
//   blockUser,
//   unblockUser,
//   makeAdmin,
//   removeAdmin,
//   deleteUser,
// } from "../controllers/adminUserController.js";

// const router = express.Router();

// // =========================
// // USER MANAGEMENT
// // =========================
// router.get("/users", protect, adminOnly, getAllUsers);
// router.put("/users/:id/block", protect, adminOnly, blockUser);
// router.put("/users/:id/unblock", protect, adminOnly, unblockUser);
// router.put("/users/:id/make-admin", protect, adminOnly, makeAdmin);
// router.put("/users/:id/remove-admin", protect, adminOnly, removeAdmin);
// router.delete("/users/:id", protect, adminOnly, deleteUser);

// export default router;
import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

import {
  getUserStats,
  getAllUsers,
  blockUser,
  unblockUser,
  makeAdmin,
  removeAdmin,
  deleteUser,
  forceLogout,
  bulkBlockUsers,
  bulkUnblockUsers,
  bulkMakeAdmin,
  bulkRemoveAdmin,
  bulkDeleteUsers,
} from "../controllers/adminUserController.js";

const router = express.Router();

// =========================
// USER MANAGEMENT
// =========================
router.get("/users/stats", protect, adminOnly, getUserStats);
router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id/block", protect, adminOnly, blockUser);
router.put("/users/:id/unblock", protect, adminOnly, unblockUser);
router.put("/users/:id/make-admin", protect, adminOnly, makeAdmin);
router.put("/users/:id/remove-admin", protect, adminOnly, removeAdmin);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.post("/users/:id/force-logout", protect, adminOnly, forceLogout);

// =========================
// BULK OPERATIONS
// =========================
router.post("/users/bulk-block", protect, adminOnly, bulkBlockUsers);
router.post("/users/bulk-unblock", protect, adminOnly, bulkUnblockUsers);
router.post("/users/bulk-make-admin", protect, adminOnly, bulkMakeAdmin);
router.post("/users/bulk-remove-admin", protect, adminOnly, bulkRemoveAdmin);
router.post("/users/bulk-delete", protect, adminOnly, bulkDeleteUsers);

export default router;
