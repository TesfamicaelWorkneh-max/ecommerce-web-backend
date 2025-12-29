// backend/routes/paymentRoutes.js
// import express from "express";
// import { protect,adminOnly } from "../middleware/authMiddleware.js";
// import {
//   initChapaPayment,
//   verifyChapaPayment,
// } from "../controllers/paymentController.js";

// const router = express.Router();

// router.post("/chapa/init", protect,adminOnly, initChapaPayment);
// router.get("/chapa/verify/:tx_ref", verifyChapaPayment);

// export default router;
// routes/paymentRoutes.js
import express from "express";
import {
  initChapaPayment,
  verifyChapaPayment,
  checkPaymentStatus,
  createCODOrder,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Chapa Payment Routes
router.post("/chapa/init", protect, initChapaPayment);
router.get("/chapa/verify/:tx_ref", verifyChapaPayment);
router.get("/status/:tx_ref", protect, checkPaymentStatus);

// COD Order Route
router.post("/cod", protect, createCODOrder);

export default router;
