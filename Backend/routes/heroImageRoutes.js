import express from "express";
import { uploadToCloudinary } from "../middleware/uploadMiddleware.js"; // ✅ CORRECT
import {
  getHeroImage,
  uploadHeroImage,
} from "../controllers/heroImageController.js";
import { adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  ...uploadToCloudinary("hero-images", "image"), // ✅ spread works now
  uploadHeroImage
);

router.get("/", getHeroImage);

export default router;
