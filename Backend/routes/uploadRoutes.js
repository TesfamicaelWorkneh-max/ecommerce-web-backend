import express from "express";
// import { uploadReturnProof, uploadReturnImages } from "./utils/uploadUtils.js";
import {
  uploadReturnProof,
  uploadReturnImages,
} from "../utils/returnUploadsUtils.js";
import {
  handleSingleUpload,
  handleMultipleUpload,
} from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload single file to Cloudinary (return proof)
router.post(
  "/return-proof",
  protect,
  uploadReturnProof.single("image"),
  handleSingleUpload
);

// Upload multiple files to Cloudinary (additional images)
router.post(
  "/return-images",
  protect,
  uploadReturnImages.array("images", 5),
  handleMultipleUpload
);

export default router;
