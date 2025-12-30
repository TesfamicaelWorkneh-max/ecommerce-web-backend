// // // backend/controllers/orderController.js
// // import Order from "../models/Order.model.js";
// // import Cart from "../models/Cart.model.js";
// // import { sendNotification } from "../utils/sendNotification.js";
// // import User from "../models/User.model.js";

// // // Helper to generate order number
// // const generateOrderNumber = () => {
// //   const timestamp = Date.now().toString().slice(-8);
// //   const random = Math.floor(Math.random() * 1000)
// //     .toString()
// //     .padStart(3, "0");
// //   return `ORD${timestamp}${random}`;
// // };

// // export const getDeliveredOrders = async (req, res) => {
// //   try {
// //     const userId = req.user._id;

// //     const orders = await Order.find({
// //       user: userId,
// //       status: "delivered",
// //     })
// //       .populate("items.product")
// //       .sort({ createdAt: -1 });

// //     res.json({
// //       success: true,
// //       count: orders.length,
// //       data: orders,
// //     });
// //   } catch (err) {
// //     console.error("Get delivered orders error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: process.env.NODE_ENV === "development" ? err.message : undefined,
// //     });
// //   }
// // };

// // export const getMyOrders = async (req, res) => {
// //   try {
// //     const userId = req.user._id;

// //     const orders = await Order.find({
// //       user: userId,
// //       status: { $ne: "delivered" }, // exclude delivered orders
// //     })
// //       .populate("items.product")
// //       .sort({ createdAt: -1 });

// //     res.status(200).json({
// //       success: true,
// //       count: orders.length,
// //       data: orders,
// //     });
// //   } catch (err) {
// //     console.error("Get my orders error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: process.env.NODE_ENV === "development" ? err.message : undefined,
// //     });
// //   }
// // };

// // export const createOrder = async (req, res) => {
// //   try {
// //     const userId = req.user._id;
// //     const cart = await Cart.findOne({ user: userId }).populate("items.product");

// //     if (!cart || cart.items.length === 0) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Cart is empty",
// //       });
// //     }

// //     const total = cart.items.reduce(
// //       (sum, item) => sum + item.product.price * item.quantity,
// //       0
// //     );

// //     // Generate order number
// //     const orderNumber = generateOrderNumber();

// //     const order = await Order.create({
// //       user: userId,
// //       orderNumber,
// //       items: cart.items.map((i) => ({
// //         product: i.product._id,
// //         productName: i.product.name,
// //         quantity: i.quantity,
// //         price: i.product.price,
// //         image: i.product.images?.[0] || null,
// //       })),
// //       total,
// //       shippingAddress: req.body.shippingAddress || {},
// //       paymentMethod: req.body.paymentMethod || "credit_card",
// //       status: "pending",
// //     });

// //     // CLEAR CART
// //     cart.items = [];
// //     await cart.save();

// //     // === ENHANCED NOTIFICATION: Notify user ===
// //     await sendNotification(
// //       userId,
// //       `Your order #${orderNumber} has been placed successfully! Total: $${total.toFixed(2)}`,
// //       "order",
// //       {
// //         orderId: order._id,
// //         orderNumber: orderNumber,
// //         total: total,
// //         itemsCount: order.items.length,
// //         estimatedDelivery: "3-5 business days",
// //         paymentMethod: order.paymentMethod,
// //         status: "pending",
// //       },
// //       {
// //         title: "🎉 Order Confirmed!",
// //         priority: "high",
// //         icon: "shopping-bag",
// //         sendEmail: true,
// //         actionUrl: `${process.env.FRONTEND_URL}/orders/${order._id}`,
// //         actionLabel: "Track Order",
// //       }
// //     );

// //     // === ENHANCED NOTIFICATION: Notify all admins ===
// //     const admins = await User.find({ role: "admin" });
// //     const adminNotificationPromises = admins.map((admin) =>
// //       sendNotification(
// //         admin._id,
// //         `New order #${orderNumber} received - Total: $${total.toFixed(2)}`,
// //         "admin_alert",
// //         {
// //           orderId: order._id,
// //           orderNumber: orderNumber,
// //           total: total,
// //           itemsCount: order.items.length,
// //           userName: req.user.name,
// //           userEmail: req.user.email,
// //           status: "pending",
// //         },
// //         {
// //           title: "🛒 New Order Received",
// //           priority: "high",
// //           icon: "alert-circle",
// //           actionUrl: `${process.env.FRONTEND_URL}/admin/orders/${order._id}`,
// //           actionLabel: "View Order",
// //           sendEmail: true,
// //         }
// //       )
// //     );

// //     await Promise.all(adminNotificationPromises);

// //     res.status(201).json({
// //       success: true,
// //       message: "Order created successfully",
// //       data: {
// //         order,
// //         orderNumber,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Create order error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: process.env.NODE_ENV === "development" ? err.message : undefined,
// //     });
// //   }
// // };

// // export const getAllOrders = async (req, res) => {
// //   try {
// //     const { status, page = 1, limit = 20, search, sort = "newest" } = req.query;
// //     const query = {};

// //     // Filter by status if provided
// //     if (status && status !== "all") {
// //       query.status = status;
// //     }

// //     // Search functionality
// //     if (search) {
// //       query.$or = [
// //         { orderNumber: { $regex: search, $options: "i" } },
// //         { "user.name": { $regex: search, $options: "i" } },
// //         { "user.email": { $regex: search, $options: "i" } },
// //         { "items.productName": { $regex: search, $options: "i" } },
// //       ];
// //     }

// //     // Sort functionality
// //     let sortOption = { createdAt: -1 }; // Default: newest first
// //     if (sort === "oldest") {
// //       sortOption = { createdAt: 1 };
// //     } else if (sort === "total_high") {
// //       sortOption = { total: -1 };
// //     } else if (sort === "total_low") {
// //       sortOption = { total: 1 };
// //     }

// //     // Execute query with pagination
// //     const [orders, total] = await Promise.all([
// //       Order.find(query)
// //         .populate("user", "name email phone")
// //         .populate("items.product")
// //         .sort(sortOption)
// //         .skip((page - 1) * limit)
// //         .limit(parseInt(limit)),
// //       Order.countDocuments(query),
// //     ]);

// //     // Get counts by status
// //     const statusCounts = await Order.aggregate([
// //       {
// //         $group: {
// //           _id: "$status",
// //           count: { $sum: 1 },
// //         },
// //       },
// //     ]);

// //     res.json({
// //       success: true,
// //       data: orders,
// //       pagination: {
// //         total,
// //         page: Number(page),
// //         limit: Number(limit),
// //         pages: Math.ceil(total / limit),
// //       },
// //       stats: {
// //         statusCounts,
// //         totalRevenue: await Order.aggregate([
// //           { $match: { status: "delivered" } },
// //           { $group: { _id: null, total: { $sum: "$total" } } },
// //         ]).then((result) => result[0]?.total || 0),
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Get all orders error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: process.env.NODE_ENV === "development" ? err.message : undefined,
// //     });
// //   }
// // };

// // export const updateOrderStatus = async (req, res) => {
// //   try {
// //     const orderId = req.params.id;
// //     const { status, adminNotes, trackingNumber, estimatedDelivery } = req.body;

// //     const order = await Order.findById(orderId).populate("user", "name email");

// //     if (!order) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Order not found",
// //       });
// //     }

// //     // Store old status for notification
// //     const oldStatus = order.status;

// //     // Update order
// //     order.status = status;
// //     if (adminNotes) order.adminNotes = adminNotes;
// //     if (trackingNumber) order.trackingNumber = trackingNumber;
// //     if (estimatedDelivery) order.estimatedDelivery = estimatedDelivery;

// //     // Set timestamps based on status
// //     if (status === "processing" && !order.processingAt) {
// //       order.processingAt = new Date();
// //     } else if (status === "shipped" && !order.shippedAt) {
// //       order.shippedAt = new Date();
// //     } else if (status === "delivered" && !order.deliveredAt) {
// //       order.deliveredAt = new Date();
// //     } else if (status === "cancelled" && !order.cancelledAt) {
// //       order.cancelledAt = new Date();
// //     }

// //     await order.save();

// //     // === ENHANCED NOTIFICATIONS: Status update notifications ===

// //     // Status configuration for consistent messaging
// //     const statusConfig = {
// //       processing: {
// //         title: "🔄 Order Processing",
// //         message: "Your order is now being processed",
// //         priority: "medium",
// //         sendEmail: true,
// //       },
// //       shipped: {
// //         title: "🚚 Order Shipped!",
// //         message: `Your order has been shipped! ${trackingNumber ? `Tracking: ${trackingNumber}` : ""}`,
// //         priority: "high",
// //         sendEmail: true,
// //       },
// //       out_for_delivery: {
// //         title: "📦 Out for Delivery",
// //         message: "Your order is out for delivery today!",
// //         priority: "high",
// //         sendEmail: true,
// //       },
// //       delivered: {
// //         title: "🎉 Order Delivered!",
// //         message: "Your order has been delivered successfully!",
// //         priority: "high",
// //         sendEmail: true,
// //       },
// //       cancelled: {
// //         title: "❌ Order Cancelled",
// //         message: `Your order has been cancelled. ${adminNotes ? `Reason: ${adminNotes}` : ""}`,
// //         priority: "high",
// //         sendEmail: true,
// //       },
// //       on_hold: {
// //         title: "⏸️ Order On Hold",
// //         message: "Your order is currently on hold",
// //         priority: "medium",
// //         sendEmail: true,
// //       },
// //       refunded: {
// //         title: "💰 Order Refunded",
// //         message: "Your order has been refunded",
// //         priority: "high",
// //         sendEmail: true,
// //       },
// //     };

// //     // Notify user about status change
// //     const config = statusConfig[status];
// //     if (config && oldStatus !== status) {
// //       await sendNotification(
// //         order.user._id,
// //         config.message,
// //         "order_status",
// //         {
// //           orderId: order._id,
// //           orderNumber: order.orderNumber,
// //           status: status,
// //           oldStatus: oldStatus,
// //           adminNotes: adminNotes || "",
// //           trackingNumber: trackingNumber || "",
// //           estimatedDelivery: estimatedDelivery || "",
// //           updatedBy: req.user.name,
// //           total: order.total,
// //           itemsCount: order.items.length,
// //         },
// //         {
// //           title: config.title,
// //           priority: config.priority,
// //           sendEmail: config.sendEmail,
// //           icon:
// //             status === "delivered"
// //               ? "party-popper"
// //               : status === "shipped"
// //                 ? "truck"
// //                 : status === "cancelled"
// //                   ? "x-circle"
// //                   : status === "refunded"
// //                     ? "dollar-sign"
// //                     : "package",
// //           actionUrl: `${process.env.FRONTEND_URL}/orders/${order._id}`,
// //           actionLabel: "View Order",
// //         }
// //       );
// //     }

// //     // Notify admin who updated (optional, for tracking)
// //     if (req.user.role === "admin" && oldStatus !== status) {
// //       await sendNotification(
// //         req.user._id,
// //         `You updated order #${order.orderNumber} from ${oldStatus} to ${status}`,
// //         "system",
// //         {
// //           orderId: order._id,
// //           orderNumber: order.orderNumber,
// //           oldStatus: oldStatus,
// //           newStatus: status,
// //           userName: order.user.name,
// //           total: order.total,
// //         },
// //         {
// //           title: "📝 Order Updated",
// //           priority: "low",
// //           icon: "edit",
// //           actionUrl: `${process.env.FRONTEND_URL}/admin/orders/${order._id}`,
// //         }
// //       );
// //     }

// //     res.json({
// //       success: true,
// //       message: `Order status updated to ${status}`,
// //       data: order,
// //     });
// //   } catch (error) {
// //     console.error("Update order status error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: process.env.NODE_ENV === "development" ? error.message : undefined,
// //     });
// //   }
// // };

// // export const getActiveOrders = async (req, res) => {
// //   try {
// //     const userId = req.user._id;

// //     const orders = await Order.find({
// //       user: userId,
// //       status: { $ne: "delivered" },
// //     })
// //       .populate("items.product")
// //       .sort({ createdAt: -1 });

// //     res.json({
// //       success: true,
// //       count: orders.length,
// //       data: orders,
// //     });
// //   } catch (err) {
// //     console.error("Get active orders error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: process.env.NODE_ENV === "development" ? err.message : undefined,
// //     });
// //   }
// // };

// // export const getOrderById = async (req, res) => {
// //   try {
// //     const orderId = req.params.id;
// //     const userId = req.user._id;
// //     const isAdmin = req.user.role === "admin";

// //     const query = { _id: orderId };
// //     if (!isAdmin) {
// //       query.user = userId;
// //     }

// //     const order = await Order.findOne(query)
// //       .populate("user", "name email phone")
// //       .populate("items.product")
// //       .populate("returnRequests");

// //     if (!order) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Order not found",
// //       });
// //     }

// //     res.json({
// //       success: true,
// //       data: order,
// //     });
// //   } catch (err) {
// //     console.error("Get order by ID error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: process.env.NODE_ENV === "development" ? err.message : undefined,
// //     });
// //   }
// // };

// // export const getOrderStats = async (req, res) => {
// //   try {
// //     const isAdmin = req.user.role === "admin";
// //     const userId = req.user._id;

// //     const matchStage = isAdmin ? {} : { user: userId };

// //     const stats = await Order.aggregate([
// //       { $match: matchStage },
// //       {
// //         $group: {
// //           _id: "$status",
// //           count: { $sum: 1 },
// //           totalRevenue: { $sum: "$total" },
// //           averageOrderValue: { $avg: "$total" },
// //         },
// //       },
// //       {
// //         $project: {
// //           status: "$_id",
// //           count: 1,
// //           totalRevenue: 1,
// //           averageOrderValue: 1,
// //           _id: 0,
// //         },
// //       },
// //       { $sort: { count: -1 } },
// //     ]);

// //     // Get today's orders
// //     const today = new Date();
// //     today.setHours(0, 0, 0, 0);

// //     const todayOrders = await Order.countDocuments({
// //       ...matchStage,
// //       createdAt: { $gte: today },
// //     });

// //     // Get last 7 days data
// //     const last7Days = new Date();
// //     last7Days.setDate(last7Days.getDate() - 7);

// //     const last7DaysData = await Order.aggregate([
// //       {
// //         $match: {
// //           ...matchStage,
// //           createdAt: { $gte: last7Days },
// //         },
// //       },
// //       {
// //         $group: {
// //           _id: {
// //             $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
// //           },
// //           count: { $sum: 1 },
// //           revenue: { $sum: "$total" },
// //         },
// //       },
// //       { $sort: { _id: 1 } },
// //     ]);

// //     res.json({
// //       success: true,
// //       data: {
// //         statusStats: stats,
// //         todayOrders,
// //         last7Days: last7DaysData,
// //         totalOrders: stats.reduce((sum, stat) => sum + stat.count, 0),
// //         totalRevenue: stats.reduce((sum, stat) => sum + stat.totalRevenue, 0),
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Get order stats error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: process.env.NODE_ENV === "development" ? err.message : undefined,
// //     });
// //   }
// // };
// // backend/controllers/orderController.js
// import Order from "../models/Order.model.js";
// import Cart from "../models/Cart.model.js";
// import User from "../models/User.model.js";
// import {
//   sendNotification,
//   sendBulkNotifications,
// } from "../utils/sendNotification.js";

// // Helper to generate order number
// const generateOrderNumber = () => {
//   const timestamp = Date.now().toString().slice(-8);
//   const random = Math.floor(Math.random() * 1000)
//     .toString()
//     .padStart(3, "0");
//   return `ORD${timestamp}${random}`;
// };

// // Order status configuration for notifications
// const orderStatusConfig = {
//   processing: {
//     userTitle: "🔧 Processing Order",
//     userMessage: "We're now preparing your order #{orderNumber} for shipping.",
//     adminTitle: "⚙️ Order Processing",
//     adminMessage: "Order #{orderNumber} is now being processed",
//     priority: "medium",
//     sendEmail: true,
//     sendPush: true,
//   },
//   confirmed: {
//     userTitle: "✅ Order Confirmed",
//     userMessage: "Your order #{orderNumber} has been confirmed!",
//     adminTitle: "✅ Order Confirmed",
//     adminMessage: "Order #{orderNumber} has been confirmed",
//     priority: "medium",
//     sendEmail: true,
//     sendPush: true,
//   },
//   shipped: {
//     userTitle: "🚚 Order Shipped!",
//     userMessage:
//       "Your order #{orderNumber} has been shipped! Tracking: {trackingNumber}",
//     adminTitle: "📦 Order Shipped",
//     adminMessage: "Order #{orderNumber} has been shipped to {customerName}",
//     priority: "high",
//     sendEmail: true,
//     sendPush: true,
//   },
//   out_for_delivery: {
//     userTitle: "📦 Out for Delivery",
//     userMessage: "Your order #{orderNumber} is out for delivery today!",
//     adminTitle: "🚚 Out for Delivery",
//     adminMessage: "Order #{orderNumber} is out for delivery",
//     priority: "high",
//     sendEmail: true,
//     sendPush: true,
//   },
//   delivered: {
//     userTitle: "🎉 Order Delivered!",
//     userMessage: "Your order #{orderNumber} has been delivered successfully!",
//     adminTitle: "✅ Order Delivered",
//     adminMessage: "Order #{orderNumber} has been delivered to {customerName}",
//     priority: "high",
//     sendEmail: true,
//     sendPush: true,
//   },
//   cancelled: {
//     userTitle: "❌ Order Cancelled",
//     userMessage:
//       "Your order #{orderNumber} has been cancelled. Reason: {reason}",
//     adminTitle: "❌ Order Cancelled",
//     adminMessage: "Order #{orderNumber} has been cancelled",
//     priority: "high",
//     sendEmail: true,
//     sendPush: true,
//   },
//   refunded: {
//     userTitle: "💰 Refund Processed",
//     userMessage: "Your refund for order #{orderNumber} has been processed.",
//     adminTitle: "💰 Refund Issued",
//     adminMessage: "Refund issued for order #{orderNumber}",
//     priority: "high",
//     sendEmail: true,
//     sendPush: true,
//   },
// };

// export const getDeliveredOrders = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const orders = await Order.find({
//       user: userId,
//       status: "delivered",
//     })
//       .populate("items.product")
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       count: orders.length,
//       data: orders,
//     });
//   } catch (err) {
//     console.error("Get delivered orders error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: process.env.NODE_ENV === "development" ? err.message : undefined,
//     });
//   }
// };

// export const getMyOrders = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const orders = await Order.find({
//       user: userId,
//       status: { $ne: "delivered" },
//     })
//       .populate("items.product")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: orders.length,
//       data: orders,
//     });
//   } catch (err) {
//     console.error("Get my orders error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: process.env.NODE_ENV === "development" ? err.message : undefined,
//     });
//   }
// };

// export const createOrder = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const user = await User.findById(userId);

//     const cart = await Cart.findOne({ user: userId }).populate("items.product");

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Cart is empty",
//       });
//     }

//     const total = cart.items.reduce(
//       (sum, item) => sum + item.product.price * item.quantity,
//       0
//     );

//     // Generate order number
//     const orderNumber = generateOrderNumber();

//     const order = await Order.create({
//       user: userId,
//       orderNumber,
//       items: cart.items.map((i) => ({
//         product: i.product._id,
//         productName: i.product.name,
//         quantity: i.quantity,
//         price: i.product.price,
//         image: i.product.images?.[0] || null,
//       })),
//       total,
//       shippingAddress: req.body.shippingAddress || {},
//       paymentMethod: req.body.paymentMethod || "credit_card",
//       status: "pending",
//     });

//     // Clear cart
//     cart.items = [];
//     await cart.save();

//     // ===== IMPORTANT: NO NOTIFICATIONS HERE =====
//     // New order notifications are now handled by the payment controller
//     // after successful payment (Chapa or COD)
//     // This prevents duplicate notifications

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       data: {
//         order,
//         orderNumber,
//       },
//     });
//   } catch (err) {
//     console.error("Create order error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: process.env.NODE_ENV === "development" ? err.message : undefined,
//     });
//   }
// };

// export const updateOrderStatus = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const {
//       status,
//       adminNotes,
//       trackingNumber,
//       estimatedDelivery,
//       notifyCustomer = true, // Default to true
//     } = req.body;

//     const order = await Order.findById(orderId)
//       .populate("user", "name email phone")
//       .populate("items.product");

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     const oldStatus = order.status;

//     // Don't update if status hasn't changed
//     if (oldStatus === status) {
//       return res.json({
//         success: true,
//         message: "Order status unchanged",
//         data: order,
//       });
//     }

//     // Update order
//     order.status = status;
//     if (adminNotes) order.adminNotes = adminNotes;
//     if (trackingNumber) order.trackingNumber = trackingNumber;
//     if (estimatedDelivery) order.estimatedDelivery = estimatedDelivery;

//     // Set timestamps based on status
//     const now = new Date();
//     if (status === "processing" && !order.processingAt) {
//       order.processingAt = now;
//     } else if (status === "shipped" && !order.shippedAt) {
//       order.shippedAt = now;
//     } else if (status === "delivered" && !order.deliveredAt) {
//       order.deliveredAt = now;
//     } else if (status === "cancelled" && !order.cancelledAt) {
//       order.cancelledAt = now;
//     }

//     await order.save();

//     // ===== NOTIFY USER ABOUT STATUS CHANGE =====
//     if (notifyCustomer && order.user?._id) {
//       const userConfig = orderStatusConfig[status];

//       if (userConfig) {
//         const userNotificationData = {
//           orderId: order._id,
//           orderNumber: order.orderNumber,
//           oldStatus,
//           newStatus: status,
//           adminNotes: adminNotes || "",
//           trackingNumber: trackingNumber || "",
//           estimatedDelivery: estimatedDelivery || "",
//           total: order.total,
//           itemsCount: order.items.length,
//           updatedBy: req.user.name || "Admin",
//           reason: adminNotes || "No reason provided",
//         };

//         const message = userConfig.userMessage
//           .replace(/{orderNumber}/g, order.orderNumber)
//           .replace(/{trackingNumber}/g, trackingNumber || "")
//           .replace(/{reason}/g, adminNotes || "No reason provided");

//         await sendNotification(
//           order.user._id,
//           message,
//           "order_status",
//           userNotificationData,
//           {
//             title: userConfig.userTitle,
//             priority: userConfig.priority,
//             icon: getStatusIcon(status),
//             sendEmail: userConfig.sendEmail,
//             sendPush: userConfig.sendPush,
//             actionUrl: `${process.env.FRONTEND_URL || "http://localhost:5173"}/orders/${order._id}`,
//             actionLabel: "View Order",
//           }
//         );

//         console.log(
//           `✅ Status change notification sent to user for order ${order.orderNumber}`
//         );
//       }
//     }

//     // ===== NOTIFY ADMINS ABOUT STATUS UPDATE =====
//     if (req.user.role === "admin") {
//       const admins = await User.find({
//         role: "admin",
//         _id: { $ne: req.user._id }, // Exclude the admin who made the change
//       }).select("_id");

//       if (admins.length > 0) {
//         const adminIds = admins.map((admin) => admin._id);
//         const adminConfig = orderStatusConfig[status];

//         if (adminConfig) {
//           const adminNotificationData = {
//             orderId: order._id,
//             orderNumber: order.orderNumber,
//             oldStatus,
//             newStatus: status,
//             customerName: order.user?.name || "Customer",
//             total: order.total,
//             itemsCount: order.items.length,
//             updatedBy: req.user.name,
//             adminNotes,
//           };

//           await sendBulkNotifications(
//             adminIds,
//             `Order #${order.orderNumber} status changed from ${oldStatus} to ${status} by ${req.user.name}`,
//             "admin_alert",
//             adminNotificationData,
//             {
//               title: "📝 Order Status Updated",
//               priority: "medium",
//               icon: "edit",
//               sendEmail: false,
//               sendPush: true,
//               actionUrl: `${process.env.FRONTEND_URL || "http://localhost:5173"}/admin/orders/${order._id}`,
//               actionLabel: "View Order",
//             }
//           );

//           console.log(
//             `✅ Status change notification sent to ${adminIds.length} admins for order ${order.orderNumber}`
//           );
//         }
//       }
//     }

//     res.json({
//       success: true,
//       message: `Order status updated to ${status}`,
//       data: order,
//     });
//   } catch (error) {
//     console.error("Update order status error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// };

// // Helper function to get icon based on status
// function getStatusIcon(status) {
//   const icons = {
//     processing: "package",
//     confirmed: "check-circle",
//     shipped: "truck",
//     out_for_delivery: "package",
//     delivered: "party-popper",
//     cancelled: "x-circle",
//     refunded: "credit-card",
//   };
//   return icons[status] || "package";
// }

// // export const getAllOrders = async (req, res) => {
// //   try {
// //     const { status, page = 1, limit = 20, search, sort = "newest" } = req.query;
// //     const query = {};

// //     // Filter by status if provided
// //     if (status && status !== "all") {
// //       query.status = status;
// //     }

// //     // Search functionality
// //     if (search) {
// //       query.$or = [
// //         { orderNumber: { $regex: search, $options: "i" } },
// //         { "user.name": { $regex: search, $options: "i" } },
// //         { "user.email": { $regex: search, $options: "i" } },
// //         { "items.productName": { $regex: search, $options: "i" } },
// //       ];
// //     }

// //     // Sort functionality
// //     let sortOption = { createdAt: -1 };
// //     if (sort === "oldest") {
// //       sortOption = { createdAt: 1 };
// //     } else if (sort === "total_high") {
// //       sortOption = { total: -1 };
// //     } else if (sort === "total_low") {
// //       sortOption = { total: 1 };
// //     }

// //     // Execute query with pagination
// //     const [orders, total] = await Promise.all([
// //       Order.find(query)
// //         .populate("user", "name email phone")
// //         .populate("items.product")
// //         .sort(sortOption)
// //         .skip((page - 1) * limit)
// //         .limit(parseInt(limit)),
// //       Order.countDocuments(query),
// //     ]);

// //     // Get counts by status
// //     const statusCounts = await Order.aggregate([
// //       {
// //         $group: {
// //           _id: "$status",
// //           count: { $sum: 1 },
// //         },
// //       },
// //     ]);

// //     res.json({
// //       success: true,
// //       data: orders,
// //       pagination: {
// //         total,
// //         page: Number(page),
// //         limit: Number(limit),
// //         pages: Math.ceil(total / limit),
// //       },
// //       stats: {
// //         statusCounts,
// //         totalRevenue: await Order.aggregate([
// //           { $match: { status: "delivered" } },
// //           { $group: { _id: null, total: { $sum: "$total" } } },
// //         ]).then((result) => result[0]?.total || 0),
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Get all orders error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: process.env.NODE_ENV === "development" ? err.message : undefined,
// //     });
// //   }
// // };
// // In your orderController.js, update the getAllOrders function:

// // export const getAllOrders = async (req, res) => {
// //   try {
// //     console.log("Get all orders called with query:", req.query);

// //     const { status, page = 1, limit = 20, search, sort = "newest" } = req.query;
// //     const query = {};

// //     // DEBUG: Log all statuses in database to see what we have
// //     const allStatuses = await Order.aggregate([
// //       { $group: { _id: "$status", count: { $sum: 1 } } },
// //     ]);
// //     console.log("📊 All statuses in database:", allStatuses);

// //     // Filter by status if provided
// //     if (status && status !== "all") {
// //       query.status = status;
// //       console.log(`🔍 Filtering by status: "${status}"`);
// //     }

// //     // Search functionality
// //     if (search) {
// //       query.$or = [
// //         { orderNumber: { $regex: search, $options: "i" } },
// //         { "user.name": { $regex: search, $options: "i" } },
// //         { "user.email": { $regex: search, $options: "i" } },
// //         { "items.productName": { $regex: search, $options: "i" } },
// //       ];
// //     }

// //     console.log("Query filter:", query);

// //     // Sort functionality
// //     let sortOption = { createdAt: -1 };
// //     if (sort === "oldest") {
// //       sortOption = { createdAt: 1 };
// //     } else if (sort === "total_high") {
// //       sortOption = { total: -1 };
// //     } else if (sort === "total_low") {
// //       sortOption = { total: 1 };
// //     }

// //     // Calculate skip value
// //     const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);

// //     // Execute query with pagination
// //     const [orders, total] = await Promise.all([
// //       Order.find(query)
// //         .populate("user", "name email phone")
// //         .populate("items.product")
// //         .sort(sortOption)
// //         .skip(skip)
// //         .limit(parseInt(limit)),
// //       Order.countDocuments(query),
// //     ]);

// //     console.log(`Found ${orders.length} orders out of ${total}`);

// //     // Log first few orders' statuses for debugging
// //     if (orders.length > 0) {
// //       console.log("📋 Sample order statuses:");
// //       orders.slice(0, 3).forEach((order, i) => {
// //         console.log(
// //           `  Order ${i + 1}: #${order.orderNumber} - Status: ${order.status}`
// //         );
// //       });
// //     }

// //     // Get counts by status - FIXED: Include all statuses, even with 0 count
// //     const allStatusCounts = await Order.aggregate([
// //       {
// //         $group: {
// //           _id: "$status",
// //           count: { $sum: 1 },
// //         },
// //       },
// //       { $sort: { count: -1 } },
// //     ]);

// //     console.log("📊 All status counts:", allStatusCounts);

// //     // Create a complete status count object with all possible statuses
// //     const completeStatusCounts = {};
// //     const allPossibleStatuses = [
// //       "pending",
// //       "processing",
// //       "confirmed",
// //       "shipped",
// //       "out_for_delivery",
// //       "delivered",
// //       "cancelled",
// //       "refunded",
// //     ];

// //     // Initialize all with 0
// //     allPossibleStatuses.forEach((status) => {
// //       completeStatusCounts[status] = 0;
// //     });

// //     // Update with actual counts
// //     allStatusCounts.forEach((stat) => {
// //       completeStatusCounts[stat._id] = stat.count;
// //     });

// //     // Calculate total revenue from delivered orders
// //     const revenueResult = await Order.aggregate([
// //       { $match: { status: "delivered" } },
// //       { $group: { _id: null, total: { $sum: "$total" } } },
// //     ]);
// //     const totalRevenue = revenueResult[0]?.total || 0;

// //     res.json({
// //       success: true,
// //       data: orders,
// //       pagination: {
// //         total,
// //         page: Number(page),
// //         limit: Number(limit),
// //         pages: Math.ceil(total / limit),
// //       },
// //       stats: {
// //         statusCounts: Object.entries(completeStatusCounts).map(
// //           ([status, count]) => ({
// //             _id: status,
// //             count,
// //           })
// //         ),
// //         totalRevenue,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Get all orders error:", err);
// //     res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //       error: err.message,
// //       stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
// //     });
// //   }
// // };

// export const getAllOrders = async (req, res) => {
//   try {
//     const { status, page = 1, limit = 20, search, sort = "newest" } = req.query;
//     const query = {};

//     // Filter by status if provided
//     if (status && status !== "all") {
//       query.status = status;
//     }

//     // Search functionality
//     if (search) {
//       query.$or = [
//         { orderNumber: { $regex: search, $options: "i" } },
//         { "user.name": { $regex: search, $options: "i" } },
//         { "user.email": { $regex: search, $options: "i" } },
//         { "items.productName": { $regex: search, $options: "i" } },
//       ];
//     }

//     // Sort functionality
//     let sortOption = { createdAt: -1 }; // Default: newest first
//     if (sort === "oldest") {
//       sortOption = { createdAt: 1 };
//     } else if (sort === "total_high") {
//       sortOption = { total: -1 };
//     } else if (sort === "total_low") {
//       sortOption = { total: 1 };
//     }

//     // Execute query with pagination
//     const [orders, total] = await Promise.all([
//       Order.find(query)
//         .populate("user", "name email phone")
//         .populate("items.product")
//         .sort(sortOption)
//         .skip((page - 1) * limit)
//         .limit(parseInt(limit)),
//       Order.countDocuments(query),
//     ]);

//     // Get counts by status
//     const statusCounts = await Order.aggregate([
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     res.json({
//       success: true,
//       data: orders,
//       pagination: {
//         total,
//         page: Number(page),
//         limit: Number(limit),
//         pages: Math.ceil(total / limit),
//       },
//       stats: {
//         statusCounts,
//         totalRevenue: await Order.aggregate([
//           { $match: { status: "delivered" } },
//           { $group: { _id: null, total: { $sum: "$total" } } },
//         ]).then((result) => result[0]?.total || 0),
//       },
//     });
//   } catch (err) {
//     console.error("Get all orders error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: process.env.NODE_ENV === "development" ? err.message : undefined,
//     });
//   }
// };
// export const getOrderById = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const userId = req.user._id;
//     const isAdmin = req.user.role === "admin";

//     const query = { _id: orderId };
//     if (!isAdmin) {
//       query.user = userId;
//     }

//     const order = await Order.findOne(query)
//       .populate("user", "name email phone address")
//       .populate("items.product")
//       .populate("returnRequests");

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: order,
//     });
//   } catch (err) {
//     console.error("Get order by ID error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: process.env.NODE_ENV === "development" ? err.message : undefined,
//     });
//   }
// };

// export const getOrderStats = async (req, res) => {
//   try {
//     const isAdmin = req.user.role === "admin";
//     const userId = req.user._id;

//     const matchStage = isAdmin ? {} : { user: userId };

//     const stats = await Order.aggregate([
//       { $match: matchStage },
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 },
//           totalRevenue: { $sum: "$total" },
//           averageOrderValue: { $avg: "$total" },
//         },
//       },
//       {
//         $project: {
//           status: "$_id",
//           count: 1,
//           totalRevenue: 1,
//           averageOrderValue: 1,
//           _id: 0,
//         },
//       },
//       { $sort: { count: -1 } },
//     ]);

//     // Get today's orders
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const todayOrders = await Order.countDocuments({
//       ...matchStage,
//       createdAt: { $gte: today },
//     });

//     // Get last 7 days data
//     const last7Days = new Date();
//     last7Days.setDate(last7Days.getDate() - 7);

//     const last7DaysData = await Order.aggregate([
//       {
//         $match: {
//           ...matchStage,
//           createdAt: { $gte: last7Days },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
//           },
//           count: { $sum: 1 },
//           revenue: { $sum: "$total" },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);

//     // Get order trends by hour (for today)
//     const todayHourly = await Order.aggregate([
//       {
//         $match: {
//           ...matchStage,
//           createdAt: { $gte: today },
//         },
//       },
//       {
//         $group: {
//           _id: { $hour: "$createdAt" },
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);

//     res.json({
//       success: true,
//       data: {
//         statusStats: stats,
//         todayOrders,
//         last7Days: last7DaysData,
//         todayHourly,
//         totalOrders: stats.reduce((sum, stat) => sum + stat.count, 0),
//         totalRevenue: stats.reduce((sum, stat) => sum + stat.totalRevenue, 0),
//         averageOrderValue:
//           stats.length > 0
//             ? stats.reduce((sum, stat) => sum + stat.averageOrderValue, 0) /
//               stats.length
//             : 0,
//       },
//     });
//   } catch (err) {
//     console.error("Get order stats error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: process.env.NODE_ENV === "development" ? err.message : undefined,
//     });
//   }
// };

// export const getActiveOrders = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const orders = await Order.find({
//       user: userId,
//       status: { $ne: "delivered" },
//     })
//       .populate("items.product")
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       count: orders.length,
//       data: orders,
//     });
//   } catch (err) {
//     console.error("Get active orders error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: process.env.NODE_ENV === "development" ? err.message : undefined,
//     });
//   }
// };
// // ================================
// // GET ORDER DETAILS (ADMIN)
// // ================================
// export const getOrderDetails = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const order = await Order.findById(id)
//       .populate("user", "name email phone address")
//       .populate("items.product")
//       .populate({
//         path: "returnRequests",
//         populate: {
//           path: "user",
//           select: "name email",
//         },
//       });

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: order,
//     });
//   } catch (err) {
//     console.error("Get order details error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: process.env.NODE_ENV === "development" ? err.message : undefined,
//     });
//   }
// };
import Order from "../models/Order.model.js";
import mongoose from "mongoose";

// Helper to generate order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `ORD${timestamp}${random}`;
};

// Order status configuration for notifications
const orderStatusConfig = {
  processing: {
    userTitle: "🔧 Processing Order",
    userMessage: "We're now preparing your order #{orderNumber} for shipping.",
    adminTitle: "⚙️ Order Processing",
    adminMessage: "Order #{orderNumber} is now being processed",
    priority: "medium",
    sendEmail: true,
    sendPush: true,
  },
  shipped: {
    userTitle: "🚚 Order Shipped!",
    userMessage:
      "Your order #{orderNumber} has been shipped! Tracking: {trackingNumber}",
    adminTitle: "📦 Order Shipped",
    adminMessage: "Order #{orderNumber} has been shipped to {customerName}",
    priority: "high",
    sendEmail: true,
    sendPush: true,
  },
  delivered: {
    userTitle: "🎉 Order Delivered!",
    userMessage: "Your order #{orderNumber} has been delivered successfully!",
    adminTitle: "✅ Order Delivered",
    adminMessage: "Order #{orderNumber} has been delivered to {customerName}",
    priority: "high",
    sendEmail: true,
    sendPush: true,
  },
  cancelled: {
    userTitle: "❌ Order Cancelled",
    userMessage:
      "Your order #{orderNumber} has been cancelled. Reason: {reason}",
    adminTitle: "❌ Order Cancelled",
    adminMessage: "Order #{orderNumber} has been cancelled",
    priority: "high",
    sendEmail: true,
    sendPush: true,
  },
};

export const getDeliveredOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId, status: "delivered" })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    console.error("Get delivered orders error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({
      user: userId,
      status: { $ne: "delivered" },
    })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    console.error("Get my orders error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const orderNumber = generateOrderNumber();

    const order = await Order.create({
      user: userId,
      orderNumber,
      items: cart.items.map((i) => ({
        product: i.product._id,
        productName: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
        image: i.product.images?.[0] || null,
      })),
      total,
      shippingAddress: req.body.shippingAddress || {},
      paymentMethod: req.body.paymentMethod || "credit_card",
      status: "pending",
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: { order, orderNumber },
    });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const {
      status,
      adminNotes,
      trackingNumber,
      estimatedDelivery,
      notifyCustomer = true,
    } = req.body;
    const order = await Order.findById(orderId)
      .populate("user", "name email phone")
      .populate("items.product");

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    const oldStatus = order.status;
    if (oldStatus === status)
      return res.json({
        success: true,
        message: "Order status unchanged",
        data: order,
      });

    order.status = status;
    if (adminNotes) order.adminNotes = adminNotes;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (estimatedDelivery) order.estimatedDelivery = estimatedDelivery;

    const now = new Date();
    if (status === "processing" && !order.processingAt)
      order.processingAt = now;
    else if (status === "shipped" && !order.shippedAt) order.shippedAt = now;
    else if (status === "delivered" && !order.deliveredAt)
      order.deliveredAt = now;
    else if (status === "cancelled" && !order.cancelledAt)
      order.cancelledAt = now;

    await order.save();

    if (notifyCustomer && order.user?._id) {
      const userConfig = orderStatusConfig[status];
      if (userConfig) {
        const userNotificationData = {
          orderId: order._id,
          orderNumber: order.orderNumber,
          oldStatus,
          newStatus: status,
          adminNotes: adminNotes || "",
          trackingNumber: trackingNumber || "",
          estimatedDelivery: estimatedDelivery || "",
          total: order.total,
          itemsCount: order.items.length,
          updatedBy: req.user.name || "Admin",
          reason: adminNotes || "No reason provided",
        };

        const message = userConfig.userMessage
          .replace(/{orderNumber}/g, order.orderNumber)
          .replace(/{trackingNumber}/g, trackingNumber || "")
          .replace(/{reason}/g, adminNotes || "No reason provided");

        await sendNotification(
          order.user._id,
          message,
          "order_status",
          userNotificationData,
          {
            title: userConfig.userTitle,
            priority: userConfig.priority,
            icon: getStatusIcon(status),
            sendEmail: userConfig.sendEmail,
            sendPush: userConfig.sendPush,
            actionUrl: `${process.env.FRONTEND_URL || "http://localhost:5173"}/orders/${order._id}`,
            actionLabel: "View Order",
          }
        );
      }
    }

    if (req.user.role === "admin") {
      const admins = await User.find({
        role: "admin",
        _id: { $ne: req.user._id },
      }).select("_id");
      if (admins.length > 0) {
        const adminIds = admins.map((admin) => admin._id);
        const adminConfig = orderStatusConfig[status];
        if (adminConfig) {
          const adminNotificationData = {
            orderId: order._id,
            orderNumber: order.orderNumber,
            oldStatus,
            newStatus: status,
            customerName: order.user?.name || "Customer",
            total: order.total,
            itemsCount: order.items.length,
            updatedBy: req.user.name,
            adminNotes,
          };

          await sendBulkNotifications(
            adminIds,
            `Order #${order.orderNumber} status changed from ${oldStatus} to ${status} by ${req.user.name}`,
            "admin_alert",
            adminNotificationData,
            {
              title: "📝 Order Status Updated",
              priority: "medium",
              icon: "edit",
              sendEmail: false,
              sendPush: true,
              actionUrl: `${process.env.FRONTEND_URL || "http://localhost:5173"}/admin/orders/${order._id}`,
              actionLabel: "View Order",
            }
          );
        }
      }
    }

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      data: order,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Helper function to get icon based on status
function getStatusIcon(status) {
  const icons = {
    processing: "package",
    shipped: "truck",
    delivered: "party-popper",
    cancelled: "x-circle",
  };
  return icons[status] || "package";
}

export const getAllOrders = async (req, res) => {
  try {
    console.log("📊 Get all orders called with query:", req.query);
    const { status, page = 1, limit = 20, search, sort = "newest" } = req.query;
    const query = {};

    if (status && status !== "all") query.status = status;
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: "i" } },
        { "user.name": { $regex: search, $options: "i" } },
        { "user.email": { $regex: search, $options: "i" } },
        { "items.productName": { $regex: search, $options: "i" } },
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };
    else if (sort === "total_high") sortOption = { total: -1 };
    else if (sort === "total_low") sortOption = { total: 1 };

    // Calculate skip for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get total count for pagination
    const total = await Order.countDocuments(query);

    // Fetch orders with pagination
    const orders = await Order.find(query)
      .populate("user", "name email phone")
      .populate("items.product")
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    // Get status counts (for current filters except pagination)
    const statusCounts = await Order.aggregate([
      { $match: query },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Calculate total revenue (only from delivered orders)
    const deliveredOrders = await Order.aggregate([
      { $match: { ...query, status: "delivered" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const totalRevenue = deliveredOrders[0]?.total || 0;

    // Calculate average order value
    const avgOrderValue = total > 0 ? totalRevenue / total : 0;

    console.log(
      `📊 Found ${orders.length} orders out of ${total}, status counts:`,
      statusCounts
    );

    res.json({
      success: true,
      data: orders,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
      stats: {
        statusCounts,
        totalRevenue,
        averageOrderValue: avgOrderValue,
      },
    });
  } catch (err) {
    console.error("Get all orders error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user._id;
    const isAdmin = req.user.role === "admin";
    const query = { _id: orderId };
    if (!isAdmin) query.user = userId;

    const order = await Order.findOne(query)
      .populate("user", "name email phone address")
      .populate("items.product")
      .populate("returnRequests");
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.json({ success: true, data: order });
  } catch (err) {
    console.error("Get order by ID error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const getOrderStats = async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";
    const userId = req.user._id;
    const matchStage = isAdmin ? {} : { user: userId };

    const stats = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalRevenue: { $sum: "$total" },
          averageOrderValue: { $avg: "$total" },
        },
      },
      {
        $project: {
          status: "$_id",
          count: 1,
          totalRevenue: 1,
          averageOrderValue: 1,
          _id: 0,
        },
      },
      { $sort: { count: -1 } },
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = await Order.countDocuments({
      ...matchStage,
      createdAt: { $gte: today },
    });

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    const last7DaysData = await Order.aggregate([
      { $match: { ...matchStage, createdAt: { $gte: last7Days } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
          revenue: { $sum: "$total" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const todayHourly = await Order.aggregate([
      { $match: { ...matchStage, createdAt: { $gte: today } } },
      { $group: { _id: { $hour: "$createdAt" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: {
        statusStats: stats,
        todayOrders,
        last7Days: last7DaysData,
        todayHourly,
        totalOrders: stats.reduce((sum, stat) => sum + stat.count, 0),
        totalRevenue: stats.reduce((sum, stat) => sum + stat.totalRevenue, 0),
        averageOrderValue:
          stats.length > 0
            ? stats.reduce((sum, stat) => sum + stat.averageOrderValue, 0) /
              stats.length
            : 0,
      },
    });
  } catch (err) {
    console.error("Get order stats error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const getActiveOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({
      user: userId,
      status: { $ne: "delivered" },
    })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    console.error("Get active orders error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const isAdmin = req.user.role === "admin";

    // Add validation for the ID parameter
    if (id === "all" || id === "undefined" || !id) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    // Validate if it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID format",
      });
    }

    const query = { _id: id };
    if (!isAdmin) query.user = userId;

    const order = await Order.findOne(query)
      .populate("user", "name email phone address")
      .populate("items.product")
      .populate("returnRequests");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({ success: true, data: order });
  } catch (err) {
    console.error("Get order details error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
