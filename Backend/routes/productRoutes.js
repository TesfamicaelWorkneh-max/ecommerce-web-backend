// import express from "express";
// import multer from "multer";
// import {
//   createProduct,
//   getProductById,
//   getAllProductsGrouped,
//   updateProduct,
//   deleteProduct,
//   getAdminProducts,
//   getProductsByCategoryPaginated,
//   getRelatedProductsGrouped,
//   toggleLike,
//   getTopLikedProducts,
//   searchProducts,
//   getPopularSearches,
//   getCategoriesForSearch,
//   quickSearch,
//   getProductsByCategoryName,
// } from "../controllers/productController.js";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";
// import { upload, uploadToCloudinary } from "../middleware/uploadMiddleware.js";
// const router = express.Router();
// const productUpload = [upload.single("image"), uploadToCloudinary("products")];
// // Multer setup
// // const storage = multer.diskStorage({
// //   destination: "uploads/products",
// //   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// // });
// // const upload = multer({ storage });

// // 🔍 SEARCH ROUTES (Public - no authentication needed)
// // IMPORTANT: These must come BEFORE the dynamic /:id routes

// // ✅ Main search (public)
// router.get("/search", protect, searchProducts);

// // ✅ Popular searches (public)
// router.get("/popular-searches", protect, getPopularSearches);

// // ✅ Categories for search dropdown (public)
// router.get("/categories-for-search", protect, getCategoriesForSearch);

// // ✅ Quick search for autocomplete (public)
// router.get("/quick-search", protect, quickSearch);

// // ✅ Products by category name (public)
// router.get("/by-category/:categoryName", protect, getProductsByCategoryName);

// // ✅ GET all products grouped
// router.get("/", protect, getAllProductsGrouped);

// // ✅ GET single product - This comes AFTER static routes
// router.get("/admin", protect, adminOnly, getAdminProducts);
// router.get("/:id", protect, getProductById);

// // Other routes...

// router.get("/category/:name/paginated", getProductsByCategoryPaginated);
// router.get("/related/:id", protect, getRelatedProductsGrouped);
// router.get("/admin/top-liked", protect, adminOnly, getTopLikedProducts);
// router.post("/", protect, adminOnly, productUpload, createProduct);
// router.put("/:id", protect, adminOnly, productUpload, updateProduct);
// router.delete("/:id", protect, adminOnly, deleteProduct);
// router.post("/:id/like", protect, toggleLike);

// export default router;
// backend/routes/productRoutes.js (FIXED)
import express from "express";
import {
  createProduct,
  getProductById,
  getAllProductsGrouped,
  updateProduct,
  deleteProduct,
  getAdminProducts,
  getProductsByCategoryPaginated,
  getRelatedProductsGrouped,
  toggleLike,
  getTopLikedProducts,
  searchProducts,
  getPopularSearches,
  getCategoriesForSearch,
  quickSearch,
  getProductsByCategoryName,
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { upload, uploadToCloudinary } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// 🔍 SEARCH ROUTES
router.get("/search", protect, searchProducts);
router.get("/popular-searches", protect, getPopularSearches);
router.get("/categories-for-search", protect, getCategoriesForSearch);
router.get("/quick-search", protect, quickSearch);
router.get("/by-category/:categoryName", protect, getProductsByCategoryName);

// ✅ GET all products grouped
router.get("/", protect, getAllProductsGrouped);

// ✅ GET single product
router.get("/admin", protect, adminOnly, getAdminProducts);
router.get("/:id", protect, getProductById);

// Other routes...
router.get("/category/:name/paginated", getProductsByCategoryPaginated);
router.get("/related/:id", protect, getRelatedProductsGrouped);
router.get("/admin/top-liked", protect, adminOnly, getTopLikedProducts);

// ✅ CREATE product - USE ONLY ONE UPLOAD MIDDLEWARE
// Option A: Use uploadToCloudinary only (recommended)
router.post(
  "/",
  protect,
  adminOnly,
  uploadToCloudinary("products", "image"),
  createProduct
);

// Option B: Or use upload.single only (without Cloudinary for testing)
// router.post("/", protect, adminOnly, upload.single("image"), createProduct);

// ✅ UPDATE product
router.put(
  "/:id",
  protect,
  adminOnly,
  uploadToCloudinary("products", "image"),
  updateProduct
);

// ✅ DELETE product
router.delete("/:id", protect, adminOnly, deleteProduct);

// ✅ Like product
router.post("/:id/like", protect, toggleLike);

export default router;
