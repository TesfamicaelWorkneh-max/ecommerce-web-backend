// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import http from "http";
// import { v2 as cloudinary } from "cloudinary"; // Add this
// import authRoutes from "./routes/authRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import notificationRoutes from "./routes/notificationRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import adminUserRoutes from "./routes/adminUser.js";
// import adminDashboardAnalitics from "./routes/adminDashboard.js";
// import path from "path";
// import { fileURLToPath } from "url";
// import { initSocket } from "./socket.js";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import returnRoutes from "./routes/returnRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// import { protect } from "./middleware/authMiddleware.js";
// import { Server } from "socket.io";
// import dns from "dns";
// dotenv.config();

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// const app = express();
// const corsOptions = {
//   origin: process.env.CLIENT_ORIGIN, // Uses the URL from your .env file
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
// app.set("trust proxy", 1);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.use(express.json({ limit: "50mb" }));

// // Static files - keep for legacy images during migration
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// dns.setDefaultResultOrder("ipv4first");
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.log("❌ MongoDB connection error:", err));

// // Routes
// app.use("/api/cart", cartRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/upload", uploadRoutes);
// app.use("/api/return-requests", returnRoutes);
// app.use("/api/adminanalytics", adminDashboardAnalitics);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/admin", adminUserRoutes);
// app.use("/api/payment", paymentRoutes);

// // Health check
// app.get("/api/health", (req, res) => {
//   res.json({
//     status: "ok",
//     cloudinary: !!process.env.CLOUDINARY_CLOUD_NAME,
//     uploads: true,
//   });
// });

// const server = http.createServer(app);
// initSocket(server);

// server.listen(process.env.PORT || 3000, () =>
//   console.log("🚀 Server running on port 3000")
// );

// export { server };
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { v2 as cloudinary } from "cloudinary";
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

// ========== SIMPLE & RELIABLE CORS FIX ==========
// Use environment variable or default to your frontend
// const allowedOrigin = process.env.CLIENT_ORIGIN;

// // Alternative 1: Use the cors package with simple configuration
// app.use(
//   cors({
//     origin: allowedOrigin,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
//   })
// );
const allowedOrigins = [
  "http://localhost:5174", // local dev

  "https://ecommerce-web-backend-s9ta.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman / server requests
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    credentials: true,
  })
);
// Alternative 2: OR use manual CORS headers (even simpler)
/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});
*/

// ========== TRUST PROXY & OTHER MIDDLEWARE ==========
app.set("trust proxy", 1);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ========== DATABASE CONNECTION ==========
dns.setDefaultResultOrder("ipv4first");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ========== ROUTES ==========
// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({
    message: "Server is running!",
    origin: req.headers.origin,
    allowedOrigin: allowedOrigins,
    timestamp: new Date().toISOString(),
  });
});

// All your routes
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
    cors: {
      allowedOrigin: allowedOrigins,
      requestOrigin: req.headers.origin || "none",
    },
    timestamp: new Date().toISOString(),
  });
});

// ========== SERVER INITIALIZATION ==========
const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
  console.log("🌐 Allowed origin:", allowedOrigins);
  console.log("📡 Test endpoints:");
  console.log(`   - http://localhost:${PORT}/api/test`);
  console.log(`   - http://localhost:${PORT}/api/health`);
});

export { server };
