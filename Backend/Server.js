import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { v2 as cloudinary } from "cloudinary"; // Add this
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import adminUserRoutes from "./routes/adminUser.js";
import adminDashboardAnalitics from "./routes/adminDashboard.js";
import path from "path";
import { fileURLToPath } from "url";
import { initSocket } from "./socket.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import paymentRoutes from "./routes/paymentRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import returnRoutes from "./routes/returnRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import { Server } from "socket.io";
import dns from "dns";
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const app = express();
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN, // Uses the URL from your .env file
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.set("trust proxy", 1);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// Static files - keep for legacy images during migration
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

dns.setDefaultResultOrder("ipv4first");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Routes
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/return-requests", returnRoutes);
app.use("/api/adminanalytics", adminDashboardAnalitics);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin", adminUserRoutes);
app.use("/api/payment", paymentRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    cloudinary: !!process.env.CLOUDINARY_CLOUD_NAME,
    uploads: true,
  });
});

const server = http.createServer(app);
initSocket(server);

server.listen(process.env.PORT || 3000, () =>
  console.log("🚀 Server running on port 3000")
);

export { server };
