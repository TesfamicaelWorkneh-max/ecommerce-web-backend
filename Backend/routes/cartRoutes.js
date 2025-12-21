import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../Controllers/cartController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add/:productId", protect, addToCart); // ✅ FIXED
router.get("/", protect, getCart);
router.post("/remove", protect, removeFromCart);
router.post("/update/:productId", protect, updateCartItem);

export default router;
