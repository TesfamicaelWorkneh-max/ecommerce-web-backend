import express from "express";
import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create new category
router.post("/", protect, adminOnly, addCategory);

// Get all categories
router.get("/", protect, getCategories);
// Update category
router.put("/:id", protect, adminOnly, updateCategory);

// Delete category
router.delete("/:id", protect, adminOnly, deleteCategory);

export default router;
