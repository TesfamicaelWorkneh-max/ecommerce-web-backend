// backend/routes/paymentRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  initChapaPayment,
  verifyChapaPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/chapa/init", protect, initChapaPayment);
router.get("/chapa/verify/:tx_ref", verifyChapaPayment);

export default router;
