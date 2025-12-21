// // // // // backend/routes/returnRoutes.js
// // // // import express from "express";
// // // // import {
// // // //   createReturnRequest,
// // // //   getMyReturnRequests,
// // // //   getAllReturnRequests,
// // // //   getReturnRequest,
// // // //   updateReturnStatus,
// // // //   cancelReturnRequest,
// // // //   getReturnStats,
// // // // } from "../controllers/returnController.js";
// // // // import {
// // // //   uploadReturnProof,
// // // //   uploadReturnImages,
// // // //   handleSingleUpload,
// // // //   handleMultipleUpload,
// // // // } from "../utils/uploadutils.js";
// // // // import { protect, adminOnly } from "../middleware/authMiddleware.js";

// // // // const router = express.Router();

// // // // // Upload routes - ADD THESE
// // // // router.post(
// // // //   "/upload/return-proof",
// // // //   protect,
// // // //   uploadReturnProof.single("image"),
// // // //   handleSingleUpload
// // // // );

// // // // router.post(
// // // //   "/upload/return-images",
// // // //   protect,
// // // //   uploadReturnImages.array("images", 5),
// // // //   handleMultipleUpload
// // // // );

// // // // // User routes
// // // // router.route("/").post(protect, createReturnRequest);
// // // // router.route("/my-requests").get(protect, getMyReturnRequests);
// // // // router.route("/:id").get(protect, getReturnRequest);
// // // // router.route("/:id/cancel").put(protect, cancelReturnRequest);

// // // // // Admin routes
// // // // router.route("/admin/all").get(protect, adminOnly, getAllReturnRequests);
// // // // router.route("/admin/:id/status").put(protect, adminOnly, updateReturnStatus);
// // // // router.route("/admin/stats").get(protect, adminOnly, getReturnStats);

// // // // export default router;
// // // import express from "express";
// // // import {
// // //   createReturnRequest,
// // //   getMyReturnRequests,
// // //   getAllReturnRequests,
// // //   getReturnRequest,
// // //   updateReturnStatus,
// // //   cancelReturnRequest,
// // //   getReturnStats,
// // //   deleteReturnImages,
// // // } from "../controllers/returnController.js";
// // // import {
// // //   uploadReturnProof,
// // //   uploadReturnImages,
// // //   handleSingleUpload,
// // //   handleMultipleUpload,
// // // } from "../utils/returnUploadsUtils.js";
// // // import { protect, adminOnly } from "../middleware/authMiddleware.js";

// // // const router = express.Router();

// // // // Upload routes - These upload to Cloudinary
// // // // router.post(
// // // //   "/upload/return-proof",
// // // //   protect,
// // // //   uploadReturnProof.single("image"),
// // // //   handleSingleUpload
// // // // );

// // // // router.post(
// // // //   "/upload/return-images",
// // // //   protect,
// // // //   uploadReturnImages.array("images", 5),
// // // //   handleMultipleUpload
// // // // );

// // // // Delete return images (cleanup)
// // // router.delete("/delete-images", protect, deleteReturnImages);

// // // // User routes
// // // router.route("/").post(protect, createReturnRequest);
// // // router.route("/my-requests").get(protect, getMyReturnRequests);
// // // router.route("/:id").get(protect, getReturnRequest);
// // // router.route("/:id/cancel").put(protect, cancelReturnRequest);

// // // // Admin routes
// // // router.route("/admin/all").get(protect, adminOnly, getAllReturnRequests);
// // // router.route("/admin/:id/status").put(protect, adminOnly, updateReturnStatus);
// // // router.route("/admin/stats").get(protect, adminOnly, getReturnStats);

// // // export default router;
// // import express from "express";
// // import {
// //   createReturnRequest,
// //   getMyReturnRequests,
// //   getAllReturnRequests,
// //   getReturnRequest,
// //   updateReturnStatus,
// //   cancelReturnRequest,
// //   getReturnStats,
// //   deleteReturnImages,
// // } from "../controllers/returnController.js";
// // import { protect, adminOnly } from "../middleware/authMiddleware.js";

// // const router = express.Router();

// // // Test route
// // router.get("/test", (req, res) => {
// //   res.json({
// //     success: true,
// //     message: "Return routes are working",
// //     endpoints: [
// //       { method: "POST", path: "/", description: "Create return request" },
// //       { method: "GET", path: "/my-requests", description: "Get user requests" },
// //       {
// //         method: "GET",
// //         path: "/admin",
// //         description: "Get all requests (admin)",
// //       },
// //       { method: "GET", path: "/:id", description: "Get single request" },
// //       { method: "PUT", path: "/:id/cancel", description: "Cancel request" },
// //       {
// //         method: "PUT",
// //         path: "/:id/status",
// //         description: "Update status (admin)",
// //       },
// //       { method: "GET", path: "/admin/stats", description: "Get stats (admin)" },
// //     ],
// //   });
// // });

// // // User routes
// // router.post("/", protect, createReturnRequest);
// // router.get("/my-requests", protect, getMyReturnRequests);
// // router.get("/:id", protect, getReturnRequest);
// // router.put("/:id/cancel", protect, cancelReturnRequest);

// // // Admin routes
// // router.get("/admin", protect, adminOnly, getAllReturnRequests); // NOTE: Changed from "/admin/all" to "/admin"
// // router.put("/:id/status", protect, adminOnly, updateReturnStatus);
// // router.get("/admin/stats", protect, adminOnly, getReturnStats);

// // // Cleanup route
// // router.delete("/delete-images", protect, deleteReturnImages);

// // export default router;

// import express from "express";
// import {
//   createReturnRequest,
//   getMyReturnRequests,
//   getAllReturnRequests,
//   getReturnRequest,
//   updateReturnStatus,
//   cancelReturnRequest,
//   getReturnStats,
//   deleteReturnImages,
// } from "../controllers/returnController.js";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Test route
// router.get("/test", (req, res) => {
//   res.json({
//     success: true,
//     message: "Return routes are working",
//     endpoints: [
//       { method: "POST", path: "/", description: "Create return request" },
//       { method: "GET", path: "/my-requests", description: "Get user requests" },
//       {
//         method: "GET",
//         path: "/admin/all",
//         description: "Get all requests (admin)",
//       },
//       {
//         method: "GET",
//         path: "/request/:id",
//         description: "Get single request",
//       },
//       { method: "PUT", path: "/cancel/:id", description: "Cancel request" },
//       {
//         method: "PUT",
//         path: "/admin/status/:id",
//         description: "Update status (admin)",
//       },
//       { method: "GET", path: "/admin/stats", description: "Get stats (admin)" },
//     ],
//   });
// });

// // User routes
// router.post("/", protect, createReturnRequest);
// router.get("/my-requests", protect, getMyReturnRequests);
// router.get("/request/:id", protect, getReturnRequest); // Changed from '/:id' to '/request/:id'
// router.put("/cancel/:id", protect, cancelReturnRequest); // Changed from '/:id/cancel' to '/cancel/:id'

// // Admin routes - IMPORTANT: Use '/admin/all' instead of '/admin'
// router.get("/admin/all", protect, adminOnly, getAllReturnRequests);
// router.put("/admin/status/:id", protect, adminOnly, updateReturnStatus); // Changed from '/admin/:id/status'
// router.get("/admin/stats", protect, adminOnly, getReturnStats);

// // Cleanup route
// router.delete("/delete-images", protect, deleteReturnImages);

// export default router;
import express from "express";
import {
  createReturnRequest,
  getMyReturnRequests,
  getAllReturnRequests,
  getReturnRequest,
  updateReturnStatus,
  cancelReturnRequest,
  getReturnStats,
  deleteReturnImages,
} from "../controllers/returnController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Test route for debugging
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Return routes are working",
    timestamp: new Date().toISOString(),
    endpoints: [
      { method: "POST", path: "/", description: "Create return request" },
      {
        method: "GET",
        path: "/my-requests",
        description: "Get user's return requests",
      },
      {
        method: "GET",
        path: "/admin/all",
        description: "Get all return requests (admin)",
      },
      {
        method: "GET",
        path: "/request/:id",
        description: "Get single return request",
      },
      {
        method: "PUT",
        path: "/cancel/:id",
        description: "Cancel return request",
      },
      {
        method: "PUT",
        path: "/admin/status/:id",
        description: "Update return status (admin)",
      },
      {
        method: "GET",
        path: "/admin/stats",
        description: "Get return statistics (admin)",
      },
      {
        method: "DELETE",
        path: "/delete-images",
        description: "Delete return images",
      },
    ],
  });
});

// ================= USER ROUTES =================
router.post("/", protect, createReturnRequest);
router.get("/my-requests", protect, getMyReturnRequests);
router.get("/request/:id", protect, getReturnRequest); // Changed from /:id to /request/:id
router.put("/cancel/:id", protect, cancelReturnRequest); // Changed from /:id/cancel to /cancel/:id

// ================= ADMIN ROUTES =================
// IMPORTANT: These must come BEFORE any generic routes
router.get("/admin/all", protect, adminOnly, getAllReturnRequests); // Get all return requests
router.get("/admin/stats", protect, adminOnly, getReturnStats); // Get statistics
router.put("/admin/status/:id", protect, adminOnly, updateReturnStatus); // Update return status

// ================= CLEANUP ROUTES =================
router.delete("/delete-images", protect, deleteReturnImages);

export default router;
