// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   verifyEmail,
//   resendVerification,
//   forgotPassword,
//   resetPassword,
// } from "../controllers/authControllers.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/verify/:token", verifyEmail);
// router.post("/resend-verification", resendVerification);

// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);

// export default router;

import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  refreshToken,
  logoutUser,
} from "../controllers/authControllers.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify/:token", verifyEmail);
router.post("/resend-verification", protect, resendVerification);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// ⭐ NEW
router.get("/refresh-token", refreshToken);

// ⭐ NEW
router.post("/logout", logoutUser);

export default router;
