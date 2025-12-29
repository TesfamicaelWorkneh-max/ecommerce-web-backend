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
// routes/adminDashboard.js
// routes/adminDashboard.js
import express from "express";
import {
  getAdminStats,
  getOrdersChart,
  getUsersChart,
  getRevenueChart,
} from "../controllers/adminDashboardController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply adminOnly middleware to all routes
router.use(protect, adminOnly);

// Dashboard stats
router.get("/stats", getAdminStats);

// Charts
router.get("/chart/orders", getOrdersChart);
router.get("/chart/users", getUsersChart);
router.get("/chart/revenue", getRevenueChart);

export default router;
