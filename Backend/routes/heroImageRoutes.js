// // import express from "express";
// // import { uploadToCloudinary } from "../middleware/uploadMiddleware.js"; // ✅ CORRECT
// // import {
// //   getHeroImage,
// //   uploadHeroImage,
// // } from "../controllers/heroImageController.js";
// // import { adminOnly } from "../middleware/authMiddleware.js";

// // const router = express.Router();

// // router.post(
// //   "/",
// //   ...uploadToCloudinary("hero-images", "image"), // ✅ spread works now
// //   uploadHeroImage
// // );

// // router.get("/", getHeroImage);

// // export default router;
// import express from "express";
// import { uploadToCloudinary } from "../middleware/uploadMiddleware.js";
// import {
//   getHeroImages,
//   uploadHeroImage,
// } from "../controllers/heroImageController.js";

// const router = express.Router();

// router.post(
//   "/",
//   ...uploadToCloudinary("hero-images", "image"),
//   uploadHeroImage
// );
// router.get("/", getHeroImages);

// export default router;
// In your heroImageRoutes.js or wherever you define routes
import express from "express";
import { uploadToCloudinary } from "../middleware/uploadMiddleware.js";
import {
  getHeroImages,
  uploadHeroImage,
  deleteHeroImage,
} from "../controllers/heroImageController.js";

const router = express.Router();

router.post(
  "/",
  ...uploadToCloudinary("hero-images", "image"),
  uploadHeroImage
);
router.get("/", getHeroImages);
router.delete("/delete", deleteHeroImage);

export default router;
