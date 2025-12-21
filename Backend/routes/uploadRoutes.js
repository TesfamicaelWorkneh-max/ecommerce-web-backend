// // backend/routes/uploadRoutes.js
// import express from "express";
// import { uploadReturnProof, uploadReturnImages } from "../utils/uploadutils.js";
// import {
//   handleSingleUpload,
//   handleMultipleUpload,
//   deleteUploadedFile,
//   getUploadStats,
// } from "../controllers/uploadController.js";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Upload single file (return proof)
// router.post(
//   "/return-proof",
//   protect,
//   uploadReturnProof.single("image"),
//   handleSingleUpload
// );

// // Upload multiple files (additional images)
// router.post(
//   "/return-images",
//   protect,
//   uploadReturnImages.array("images", 5),
//   handleMultipleUpload
// );

// // Delete uploaded file
// router.delete("/file", protect, deleteUploadedFile);

// // Get upload statistics (admin only)
// router.get("/stats", protect, adminOnly, getUploadStats);

// export default router;
import express from "express";
import { uploadReturnProof, uploadReturnImages } from "../utils/uploadutils.js";
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
