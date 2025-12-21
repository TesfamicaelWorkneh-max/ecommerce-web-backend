import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { sendQuery } from "../controllers/contactController.js";

const router = express.Router();

// Contact form submission
router.post("/", protect, sendQuery);

export default router;
