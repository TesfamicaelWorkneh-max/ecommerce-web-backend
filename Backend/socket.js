// import { Server } from "socket.io";
// import jwt from "jsonwebtoken";
// import User from "./models/User.model.js";

// let io = null;

// export const initSocket = (server) => {
//   if (io) return io;

//   io = new Server(server, {
//     cors: {
//       origin: "https://ecommerce-web-backend-u4em.vercel.app",
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });

//   io.use(async (socket, next) => {
//     try {
//       const token = socket.handshake.auth?.token;
//       if (!token) return next();

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await User.findById(decoded.id).select("_id name role");

//       if (user) socket.user = user;
//       next();
//     } catch (err) {
//       next();
//     }
//   });

//   io.on("connection", (socket) => {
//     console.log("🟢 Socket connected:", socket.id);

//     socket.on("joinProduct", (productId) => {
//       socket.join(productId);
//     });

//     socket.on("disconnect", () => {
//       console.log("🔴 Socket disconnected:", socket.id);
//     });
//   });

//   return io;
// };

// export const getIO = () => {
//   if (!io) return null;
//   return io;
// };
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "./models/User.model.js";

let io = null;

export const initSocket = (server) => {
  if (io) return io;

  io = new Server(server, {
    cors: {
      origin: [
        "https://ecommerce-web-backend-u4em.vercel.app",
        "http://localhost:5174",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        console.log("❌ No token provided");
        return next(new Error("Authentication error"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select(
        "_id name email role"
      );

      if (!user) {
        console.log("❌ User not found");
        return next(new Error("User not found"));
      }

      socket.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      console.log(`✅ Authenticated: ${user.name} (${user.role})`);
      next();
    } catch (err) {
      console.log("❌ Socket auth error:", err.message);
      next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id, socket.user?.name);

    // Join admin room if user is admin
    if (socket.user?.role === "admin") {
      socket.join("admin");
      console.log(`👑 Admin ${socket.user.name} joined admin room`);
    }

    // Join user's personal room for private notifications
    if (socket.user?.id) {
      socket.join(`user_${socket.user.id}`);
    }

    socket.on("joinProduct", (productId) => {
      socket.join(`product_${productId}`);
      console.log(`📦 ${socket.user?.name} joined product room: ${productId}`);
    });

    socket.on("joinOrder", (orderId) => {
      socket.join(`order_${orderId}`);
      console.log(`📦 ${socket.user?.name} joined order room: ${orderId}`);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔴 Socket disconnected:", socket.id, "Reason:", reason);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

// Helper functions to emit notifications
export const emitAdminNotification = (data) => {
  const io = getIO();
  io.to("admin").emit("notification", {
    ...data,
    createdAt: new Date(),
    read: false,
    type: "admin",
  });
};

export const emitUserNotification = (userId, data) => {
  const io = getIO();
  io.to(`user_${userId}`).emit("notification", {
    ...data,
    createdAt: new Date(),
    read: false,
    type: "user",
  });
};

export const emitProductNotification = (productId, data) => {
  const io = getIO();
  io.to(`product_${productId}`).emit("notification", {
    ...data,
    createdAt: new Date(),
    read: false,
    type: "product",
  });
};

export const emitOrderNotification = (orderId, data) => {
  const io = getIO();
  io.to(`order_${orderId}`).emit("notification", {
    ...data,
    createdAt: new Date(),
    read: false,
    type: "order",
  });
};
