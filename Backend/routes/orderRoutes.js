// import express from "express";
// import {
//   createOrder,
//   getMyOrders,
//   getAllOrders,
//   updateOrderStatus,
//   getDeliveredOrders,
//   getActiveOrders,
// } from "../controllers/orderController.js";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();
// router.post("/create", protect, createOrder);
// router.get("/my-orders", protect, getMyOrders);
// router.get("/all", protect, adminOnly, getAllOrders);
// router.put("/:id/status", protect, adminOnly, updateOrderStatus);
// router.get("/delivered", protect, getDeliveredOrders);
// router.get("/active", protect, getActiveOrders);
// export default router;

import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getDeliveredOrders,
  getActiveOrders,
} from "../controllers/orderController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/all", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
router.get("/delivered", protect, getDeliveredOrders);
router.get("/active", protect, getActiveOrders);

// NEW (CHAPA PAYMENT VERIFY)
router.get("/verify/:tx_ref", protect, async (req, res) => {
  res.send("Payment verification will be done in paymentRoutes.js");
});

export default router;
