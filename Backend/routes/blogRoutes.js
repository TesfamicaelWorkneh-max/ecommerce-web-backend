import express from "express";
import {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  addComment,
  toggleLike,
  getBlogStats,
  searchBlogPosts,
  getSimilarPosts,
  getBlogArchive,
  getBlogPostById,
  updateBlogStatus,
} from "../controllers/blogController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { uploadToCloudinary } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Create middleware for blog image uploads
const uploadBlogImage = uploadToCloudinary("blog", "featuredImage");

// Public routes
router.get("/", getBlogPosts);
router.get("/search", searchBlogPosts);
router.get("/archive", getBlogArchive);
router.get("/:slug", getBlogPost);
router.get("/:id/similar", getSimilarPosts);
router.get("/post/:id", protect, adminOnly, getBlogPostById);
// Protected routes (authenticated users)
router.post("/:id/comments", protect, addComment);
router.post("/:id/like", protect, toggleLike);

// Admin routes (with image upload)
router.post("/", protect, adminOnly, ...uploadBlogImage, createBlogPost);
router.put("/:id", protect, adminOnly, ...uploadBlogImage, updateBlogPost);
router.delete("/:id", protect, adminOnly, deleteBlogPost);
router.get("/stats/all", protect, adminOnly, getBlogStats);
router.patch("/:id/status", protect, adminOnly, updateBlogStatus);

export default router;
