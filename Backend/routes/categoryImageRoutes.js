import express from "express";
import { uploadToCloudinary } from "../middleware/uploadMiddleware.js";
import {
  uploadCategoryImage,
  deleteCategoryImage,
} from "../controllers/categoryImageController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload category image
router.post(
  "/upload",
  protect,
  adminOnly,
  ...uploadToCloudinary("categories", "image"),
  uploadCategoryImage
);

// Delete category image
router.delete("/delete", protect, adminOnly, deleteCategoryImage);

export default router;
