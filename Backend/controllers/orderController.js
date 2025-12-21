// backend/controllers/orderController.js
import Order from "../models/Order.model.js";
import Cart from "../models/Cart.model.js";
import { sendNotification } from "../utils/sendNotification.js";
import User from "../models/User.model.js";

// Helper to generate order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `ORD${timestamp}${random}`;
};

export const getDeliveredOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({
      user: userId,
      status: "delivered",
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
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
      status: { $ne: "delivered" }, // exclude delivered orders
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
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
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Generate order number
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

    // CLEAR CART
    cart.items = [];
    await cart.save();

    // === ENHANCED NOTIFICATION: Notify user ===
    await sendNotification(
      userId,
      `Your order #${orderNumber} has been placed successfully! Total: $${total.toFixed(2)}`,
      "order",
      {
        orderId: order._id,
        orderNumber: orderNumber,
        total: total,
        itemsCount: order.items.length,
        estimatedDelivery: "3-5 business days",
        paymentMethod: order.paymentMethod,
        status: "pending",
      },
      {
        title: "🎉 Order Confirmed!",
        priority: "high",
        icon: "shopping-bag",
        sendEmail: true,
        actionUrl: `${process.env.FRONTEND_URL}/orders/${order._id}`,
        actionLabel: "Track Order",
      }
    );

    // === ENHANCED NOTIFICATION: Notify all admins ===
    const admins = await User.find({ role: "admin" });
    const adminNotificationPromises = admins.map((admin) =>
      sendNotification(
        admin._id,
        `New order #${orderNumber} received - Total: $${total.toFixed(2)}`,
        "admin_alert",
        {
          orderId: order._id,
          orderNumber: orderNumber,
          total: total,
          itemsCount: order.items.length,
          userName: req.user.name,
          userEmail: req.user.email,
          status: "pending",
        },
        {
          title: "🛒 New Order Received",
          priority: "high",
          icon: "alert-circle",
          actionUrl: `${process.env.FRONTEND_URL}/admin/orders/${order._id}`,
          actionLabel: "View Order",
          sendEmail: true,
        }
      )
    );

    await Promise.all(adminNotificationPromises);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: {
        order,
        orderNumber,
      },
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

export const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20, search, sort = "newest" } = req.query;
    const query = {};

    // Filter by status if provided
    if (status && status !== "all") {
      query.status = status;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: "i" } },
        { "user.name": { $regex: search, $options: "i" } },
        { "user.email": { $regex: search, $options: "i" } },
        { "items.productName": { $regex: search, $options: "i" } },
      ];
    }

    // Sort functionality
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    } else if (sort === "total_high") {
      sortOption = { total: -1 };
    } else if (sort === "total_low") {
      sortOption = { total: 1 };
    }

    // Execute query with pagination
    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate("user", "name email phone")
        .populate("items.product")
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(parseInt(limit)),
      Order.countDocuments(query),
    ]);

    // Get counts by status
    const statusCounts = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: orders,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
      stats: {
        statusCounts,
        totalRevenue: await Order.aggregate([
          { $match: { status: "delivered" } },
          { $group: { _id: null, total: { $sum: "$total" } } },
        ]).then((result) => result[0]?.total || 0),
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

export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status, adminNotes, trackingNumber, estimatedDelivery } = req.body;

    const order = await Order.findById(orderId).populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Store old status for notification
    const oldStatus = order.status;

    // Update order
    order.status = status;
    if (adminNotes) order.adminNotes = adminNotes;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (estimatedDelivery) order.estimatedDelivery = estimatedDelivery;

    // Set timestamps based on status
    if (status === "processing" && !order.processingAt) {
      order.processingAt = new Date();
    } else if (status === "shipped" && !order.shippedAt) {
      order.shippedAt = new Date();
    } else if (status === "delivered" && !order.deliveredAt) {
      order.deliveredAt = new Date();
    } else if (status === "cancelled" && !order.cancelledAt) {
      order.cancelledAt = new Date();
    }

    await order.save();

    // === ENHANCED NOTIFICATIONS: Status update notifications ===

    // Status configuration for consistent messaging
    const statusConfig = {
      processing: {
        title: "🔄 Order Processing",
        message: "Your order is now being processed",
        priority: "medium",
        sendEmail: true,
      },
      shipped: {
        title: "🚚 Order Shipped!",
        message: `Your order has been shipped! ${trackingNumber ? `Tracking: ${trackingNumber}` : ""}`,
        priority: "high",
        sendEmail: true,
      },
      out_for_delivery: {
        title: "📦 Out for Delivery",
        message: "Your order is out for delivery today!",
        priority: "high",
        sendEmail: true,
      },
      delivered: {
        title: "🎉 Order Delivered!",
        message: "Your order has been delivered successfully!",
        priority: "high",
        sendEmail: true,
      },
      cancelled: {
        title: "❌ Order Cancelled",
        message: `Your order has been cancelled. ${adminNotes ? `Reason: ${adminNotes}` : ""}`,
        priority: "high",
        sendEmail: true,
      },
      on_hold: {
        title: "⏸️ Order On Hold",
        message: "Your order is currently on hold",
        priority: "medium",
        sendEmail: true,
      },
      refunded: {
        title: "💰 Order Refunded",
        message: "Your order has been refunded",
        priority: "high",
        sendEmail: true,
      },
    };

    // Notify user about status change
    const config = statusConfig[status];
    if (config && oldStatus !== status) {
      await sendNotification(
        order.user._id,
        config.message,
        "order_status",
        {
          orderId: order._id,
          orderNumber: order.orderNumber,
          status: status,
          oldStatus: oldStatus,
          adminNotes: adminNotes || "",
          trackingNumber: trackingNumber || "",
          estimatedDelivery: estimatedDelivery || "",
          updatedBy: req.user.name,
          total: order.total,
          itemsCount: order.items.length,
        },
        {
          title: config.title,
          priority: config.priority,
          sendEmail: config.sendEmail,
          icon:
            status === "delivered"
              ? "party-popper"
              : status === "shipped"
                ? "truck"
                : status === "cancelled"
                  ? "x-circle"
                  : status === "refunded"
                    ? "dollar-sign"
                    : "package",
          actionUrl: `${process.env.FRONTEND_URL}/orders/${order._id}`,
          actionLabel: "View Order",
        }
      );
    }

    // Notify admin who updated (optional, for tracking)
    if (req.user.role === "admin" && oldStatus !== status) {
      await sendNotification(
        req.user._id,
        `You updated order #${order.orderNumber} from ${oldStatus} to ${status}`,
        "system",
        {
          orderId: order._id,
          orderNumber: order.orderNumber,
          oldStatus: oldStatus,
          newStatus: status,
          userName: order.user.name,
          total: order.total,
        },
        {
          title: "📝 Order Updated",
          priority: "low",
          icon: "edit",
          actionUrl: `${process.env.FRONTEND_URL}/admin/orders/${order._id}`,
        }
      );
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

export const getActiveOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({
      user: userId,
      status: { $ne: "delivered" },
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (err) {
    console.error("Get active orders error:", err);
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
    if (!isAdmin) {
      query.user = userId;
    }

    const order = await Order.findOne(query)
      .populate("user", "name email phone")
      .populate("items.product")
      .populate("returnRequests");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
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

    // Get today's orders
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = await Order.countDocuments({
      ...matchStage,
      createdAt: { $gte: today },
    });

    // Get last 7 days data
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const last7DaysData = await Order.aggregate([
      {
        $match: {
          ...matchStage,
          createdAt: { $gte: last7Days },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
          revenue: { $sum: "$total" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: {
        statusStats: stats,
        todayOrders,
        last7Days: last7DaysData,
        totalOrders: stats.reduce((sum, stat) => sum + stat.count, 0),
        totalRevenue: stats.reduce((sum, stat) => sum + stat.totalRevenue, 0),
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
