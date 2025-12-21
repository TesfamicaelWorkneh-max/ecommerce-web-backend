// import { Server } from "socket.io";
// import jwt from "jsonwebtoken";
// import User from "./models/User.model.js";

// let io = null;

// export const initSocket = (server) => {
//   if (io) return io;

//   io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST", "PUT"],
//       credentials: true,
//     },
//   });

//   io.use(async (socket, next) => {
//     try {
//       const token = socket.handshake.auth?.token;
//       if (!token) return next();

//       const decoded = jwt.verify(
//         token,
//         process.env.JWT_SECRET || "yourjwtsecret"
//       );

//       const user = await User.findById(decoded.id).select("_id role");
//       if (user) {
//         socket.user = { id: user._id.toString(), role: user.role };
//       }

//       next();
//     } catch (err) {
//       console.log("Socket auth error:", err.message);
//       next();
//     }
//   });

//   io.on("connection", (socket) => {
//     console.log("🟢 Socket connected:", socket.id);

//     if (socket.user?.id) {
//       socket.join(socket.user.id);
//     }

//     socket.on("join", (roomId) => {
//       if (roomId) socket.join(roomId.toString());
//     });

//     socket.on("disconnect", () => {
//       console.log("🔴 Socket disconnected:", socket.id);
//     });
//   });

//   return io;
// };

// export const getIO = () => {
//   if (!io) {
//     console.warn("⚠️ getIO called before initSocket");
//     return null;
//   }
//   return io;
// };

// backend/socket.js
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "./models/User.model.js";

let io = null;

export const initSocket = (server) => {
  if (io) return io;

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next();

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("_id name role");

      if (user) socket.user = user;
      next();
    } catch (err) {
      next();
    }
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on("joinProduct", (productId) => {
      socket.join(productId);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) return null;
  return io;
};
