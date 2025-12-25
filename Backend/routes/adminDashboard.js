// import express from "express";

// import { protect, adminOnly } from "../middleware/authMiddleware.js";

// import {
//   getAdminStats,
//   getOrdersChart,
//   getUsersChart,
//   getRevenueChart,
// } from "../controllers/adminDashboardController.js";
// const router = express.Router();
// router.get("/stats", protect, adminOnly, getAdminStats);
// router.get("/chart/orders", protect, adminOnly, getOrdersChart);
// router.get("/chart/users", protect, adminOnly, getUsersChart);
// router.get("/chart/revenue", protect, adminOnly, getRevenueChart);
// export default router;
import express from "express";
import {
  getAdminStats,
  getOrdersChart,
  getUsersChart,
  getRevenueChart,
  getTopProducts,
  getRecentActivities,
} from "../controllers/adminDashboardController.js";
import { adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Dashboard stats
router.get("/stats", adminOnly, getAdminStats);

// Charts
router.get("/chart/orders", adminOnly, getOrdersChart);
router.get("/chart/users", adminOnly, getUsersChart);
router.get("/chart/revenue", adminOnly, getRevenueChart);

// Top products
router.get("/top-products", adminOnly, getTopProducts);

// Recent activities
router.get("/recent-activities", adminOnly, getRecentActivities);

export default router;
