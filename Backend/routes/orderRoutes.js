// // // // import express from "express";
// // // // import {
// // // //   createOrder,
// // // //   getMyOrders,
// // // //   getAllOrders,
// // // //   updateOrderStatus,
// // // //   getDeliveredOrders,
// // // //   getActiveOrders,
// // // // } from "../controllers/orderController.js";
// // // // import { protect, adminOnly } from "../middleware/authMiddleware.js";

// // // // const router = express.Router();
// // // // router.post("/create", protect, createOrder);
// // // // router.get("/my-orders", protect, getMyOrders);
// // // // router.get("/all", protect, adminOnly, getAllOrders);
// // // // router.put("/:id/status", protect, adminOnly, updateOrderStatus);
// // // // router.get("/delivered", protect, getDeliveredOrders);
// // // // router.get("/active", protect, getActiveOrders);
// // // // export default router;

// // // import express from "express";
// // // import {
// // //   createOrder,
// // //   getMyOrders,
// // //   getAllOrders,
// // //   updateOrderStatus,
// // //   getDeliveredOrders,
// // //   getActiveOrders,
// // // } from "../controllers/orderController.js";

// // // import { protect, adminOnly } from "../middleware/authMiddleware.js";

// // // const router = express.Router();

// // // router.post("/create", protect, createOrder);
// // // router.get("/my-orders", protect, getMyOrders);
// // // router.get("/all", protect, adminOnly, getAllOrders);
// // // router.put("/:id/status", protect, adminOnly, updateOrderStatus);
// // // router.get("/delivered", protect, getDeliveredOrders);
// // // router.get("/active", protect, getActiveOrders);

// // // // NEW (CHAPA PAYMENT VERIFY)
// // // router.get("/verify/:tx_ref", protect, async (req, res) => {
// // //   res.send("Payment verification will be done in paymentRoutes.js");
// // // });

// // // export default router;
// // // import express from "express";
// // // import {
// // //   createOrder,
// // //   getMyOrders,
// // //   getAllOrders,
// // //   getOrderDetails,
// // //   updateOrderStatus,
// // //   getDeliveredOrders,
// // //   getActiveOrders,
// // //   getOrderStats,
// // // } from "../controllers/orderController.js";

// // // import { protect, adminOnly } from "../middleware/authMiddleware.js";

// // // const router = express.Router();

// // // // USER ROUTES
// // // router.post("/create", protect, createOrder);
// // // router.get("/my-orders", protect, getMyOrders);
// // // router.get("/delivered", protect, getDeliveredOrders);
// // // router.get("/active", protect, getActiveOrders);

// // // // ADMIN ROUTES
// // // router.get("/admin/stats", protect, adminOnly, getOrderStats);
// // // router.get("/admin/all", protect, adminOnly, getAllOrders);
// // // router.get("/admin/:id", protect, adminOnly, getOrderDetails);
// // // router.put("/admin/:id/status", protect, adminOnly, updateOrderStatus);

// // // // GENERAL ORDER DETAILS (for both user and admin based on permissions)
// // // router.get("/:id", protect, getOrderDetails);

// // // export default router;
// // import express from "express";
// // import {
// //   createOrder,
// //   getMyOrders,
// //   getAllOrders,
// //   getOrderDetails,
// //   updateOrderStatus,
// //   getDeliveredOrders,
// //   getActiveOrders,
// //   getOrderStats,
// // } from "../controllers/orderController.js";

// // import { protect, adminOnly } from "../middleware/authMiddleware.js";

// // const router = express.Router();

// // // =========================
// // // USER ROUTES
// // // =========================
// // router.post("/create", protect, createOrder);
// // router.get("/my-orders", protect, getMyOrders);
// // router.get("/delivered", protect, getDeliveredOrders);
// // router.get("/active", protect, getActiveOrders);

// // // =========================
// // // ADMIN ROUTES
// // // =========================
// // // IMPORTANT: Specific routes must come BEFORE parameterized routes
// // router.get("/admin/stats", protect, adminOnly, getOrderStats);
// // router.get("/admin/all", protect, adminOnly, getAllOrders);
// // router.put("/admin/:id/status", protect, adminOnly, updateOrderStatus);
// // router.get("/admin/:id", protect, adminOnly, getOrderDetails);

// // // =========================
// // // GENERAL ROUTES (Order details - placed LAST)
// // // =========================
// // router.get("/:id", protect, getOrderDetails);

// // // Payment verification
// // router.get("/verify/:tx_ref", protect, async (req, res) => {
// //   res.send("Payment verification will be done in paymentRoutes.js");
// // });

// // export default router;
// import express from "express";
// import {
//   createOrder,
//   getMyOrders,
//   getAllOrders,
//   getOrderDetails,
//   updateOrderStatus,
//   getDeliveredOrders,
//   getActiveOrders,
//   getOrderStats,
// } from "../controllers/orderController.js";

// import { protect, adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // =========================
// // USER ROUTES
// // =========================
// router.post("/create", protect, createOrder);
// router.get("/my-orders", protect, getMyOrders);
// router.get("/delivered", protect, getDeliveredOrders);
// router.get("/active", protect, getActiveOrders);

// // =========================
// // ADMIN ROUTES
// // =========================
// // IMPORTANT: Specific routes must come BEFORE parameterized routes
// router.get("/admin/stats", protect, adminOnly, getOrderStats);
// router.get("/admin/all", protect, adminOnly, getAllOrders);
// router.put("/admin/:id/status", protect, adminOnly, updateOrderStatus);
// router.get("/admin/:id", protect, adminOnly, getOrderDetails);

// // =========================
// // BACKWARD COMPATIBILITY
// // =========================
// router.get("/all", protect, adminOnly, getAllOrders);
// router.get("/stats", protect, adminOnly, getOrderStats);
// router.put("/:id/status", protect, adminOnly, updateOrderStatus);

// // =========================
// // GENERAL ROUTES (Order details - placed LAST)
// // =========================
// router.get("/:id", protect, getOrderDetails);

// // Payment verification
// router.get("/verify/:tx_ref", protect, async (req, res) => {
//   res.send("Payment verification will be done in paymentRoutes.js");
// });

// export default router;
// routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  // getOrderDetails,
  updateOrderStatus,
  getDeliveredOrders,
  getActiveOrders,
  getOrderStats,
  getOrderById,
} from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/create", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/delivered", protect, getDeliveredOrders);
router.get("/active", protect, getActiveOrders);
// router.get("/:id", protect, getOrderDetails);

// Admin routes
router.get("/admin/stats", protect, adminOnly, getOrderStats);
router.get("/admin/all", protect, adminOnly, getAllOrders);
router.put("/admin/:id/status", protect, adminOnly, updateOrderStatus);
// router.get("/admin/:id", protect, adminOnly, getOrderDetails);

export default router;
