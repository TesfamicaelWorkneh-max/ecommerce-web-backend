import express from "express";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

import {
  getAdminStats,
  getOrdersChart,
  getUsersChart,
  getRevenueChart,
} from "../controllers/adminDashboardController.js";
const router = express.Router();
router.get("/stats", protect, adminOnly, getAdminStats);
router.get("/chart/orders", protect, adminOnly, getOrdersChart);
router.get("/chart/users", protect, adminOnly, getUsersChart);
router.get("/chart/revenue", protect, adminOnly, getRevenueChart);
export default router;
