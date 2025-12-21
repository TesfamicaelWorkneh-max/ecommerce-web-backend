import User from "../models/User.model.js";
import Product from "../models/Products.model.js";
import Order from "../models/Order.model.js";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const getAdminStats = async (req, res) => {
  try {
    // Users
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const blockedUsers = await User.countDocuments({ isBlocked: true });

    // Products
    const totalProducts = await Product.countDocuments();
    const soldProducts = await Product.countDocuments({ isSold: true });
    const unsoldProducts = await Product.countDocuments({ isSold: false });

    // Orders
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "pending" });
    const processingOrders = await Order.countDocuments({
      status: "processing",
    });
    const shippedOrders = await Order.countDocuments({ status: "shipped" });
    const deliveredOrders = await Order.countDocuments({ status: "delivered" });

    // Revenue
    const revenueAgg = await Order.aggregate([
      { $match: { status: "delivered" } },
      { $group: { _id: null, revenue: { $sum: "$total" } } },
    ]);

    const totalRevenue = revenueAgg[0]?.revenue || 0;

    res.json({
      users: {
        total: totalUsers,
        verified: verifiedUsers,
        blocked: blockedUsers,
      },
      products: {
        total: totalProducts,
        sold: soldProducts,
        unsold: unsoldProducts,
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        processing: processingOrders,
        shipped: shippedOrders,
        delivered: deliveredOrders,
      },
      revenue: totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: "Admin stats error", error });
  }
};

// =====================================
// 2️⃣ MONTHLY ORDERS CHART
// =====================================
export const getOrdersChart = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const chart = orders.map((o) => ({
      month: MONTHS[o._id.month - 1],
      orders: o.count,
    }));

    res.json(chart);
  } catch (error) {
    res.status(500).json({ message: "Orders chart error", error });
  }
};

// =====================================
// 3️⃣ MONTHLY USER SIGN-UP CHART
// =====================================
export const getUsersChart = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const chart = users.map((u) => ({
      month: MONTHS[u._id.month - 1],
      users: u.count,
    }));

    res.json(chart);
  } catch (error) {
    res.status(500).json({ message: "Users chart error", error });
  }
};

// =====================================
// 4️⃣ MONTHLY REVENUE CHART
// =====================================
export const getRevenueChart = async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      { $match: { status: "delivered" } },
      {
        $group: {
          _id: { month: { $month: "$deliveredAt" } },
          revenue: { $sum: "$total" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const chart = revenue.map((r) => ({
      month: MONTHS[r._id.month - 1],
      revenue: r.revenue,
    }));

    res.json(chart);
  } catch (error) {
    res.status(500).json({ message: "Revenue chart error", error });
  }
};
