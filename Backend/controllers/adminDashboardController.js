// import User from "../models/User.model.js";
// import Product from "../models/Products.model.js";
// import Order from "../models/Order.model.js";

// const MONTHS = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];
// export const getAdminStats = async (req, res) => {
//   try {
//     // Users
//     const totalUsers = await User.countDocuments();
//     const verifiedUsers = await User.countDocuments({ isVerified: true });
//     const blockedUsers = await User.countDocuments({ isBlocked: true });

//     // Products
//     const totalProducts = await Product.countDocuments();
//     const soldProducts = await Product.countDocuments({ isSold: true });
//     const unsoldProducts = await Product.countDocuments({ isSold: false });

//     // Orders
//     const totalOrders = await Order.countDocuments();
//     const pendingOrders = await Order.countDocuments({ status: "pending" });
//     const processingOrders = await Order.countDocuments({
//       status: "processing",
//     });
//     const shippedOrders = await Order.countDocuments({ status: "shipped" });
//     const deliveredOrders = await Order.countDocuments({ status: "delivered" });

//     // Revenue
//     const revenueAgg = await Order.aggregate([
//       { $match: { status: "delivered" } },
//       { $group: { _id: null, revenue: { $sum: "$total" } } },
//     ]);

//     const totalRevenue = revenueAgg[0]?.revenue || 0;

//     res.json({
//       users: {
//         total: totalUsers,
//         verified: verifiedUsers,
//         blocked: blockedUsers,
//       },
//       products: {
//         total: totalProducts,
//         sold: soldProducts,
//         unsold: unsoldProducts,
//       },
//       orders: {
//         total: totalOrders,
//         pending: pendingOrders,
//         processing: processingOrders,
//         shipped: shippedOrders,
//         delivered: deliveredOrders,
//       },
//       revenue: totalRevenue,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Admin stats error", error });
//   }
// };

// // =====================================
// // 2️⃣ MONTHLY ORDERS CHART
// // =====================================
// export const getOrdersChart = async (req, res) => {
//   try {
//     const orders = await Order.aggregate([
//       {
//         $group: {
//           _id: { month: { $month: "$createdAt" } },
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { "_id.month": 1 } },
//     ]);

//     const chart = orders.map((o) => ({
//       month: MONTHS[o._id.month - 1],
//       orders: o.count,
//     }));

//     res.json(chart);
//   } catch (error) {
//     res.status(500).json({ message: "Orders chart error", error });
//   }
// };

// // =====================================
// // 3️⃣ MONTHLY USER SIGN-UP CHART
// // =====================================
// export const getUsersChart = async (req, res) => {
//   try {
//     const users = await User.aggregate([
//       {
//         $group: {
//           _id: { month: { $month: "$createdAt" } },
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { "_id.month": 1 } },
//     ]);

//     const chart = users.map((u) => ({
//       month: MONTHS[u._id.month - 1],
//       users: u.count,
//     }));

//     res.json(chart);
//   } catch (error) {
//     res.status(500).json({ message: "Users chart error", error });
//   }
// };

// // =====================================
// // 4️⃣ MONTHLY REVENUE CHART
// // =====================================
// export const getRevenueChart = async (req, res) => {
//   try {
//     const revenue = await Order.aggregate([
//       { $match: { status: "delivered" } },
//       {
//         $group: {
//           _id: { month: { $month: "$deliveredAt" } },
//           revenue: { $sum: "$total" },
//         },
//       },
//       { $sort: { "_id.month": 1 } },
//     ]);

//     const chart = revenue.map((r) => ({
//       month: MONTHS[r._id.month - 1],
//       revenue: r.revenue,
//     }));

//     res.json(chart);
//   } catch (error) {
//     res.status(500).json({ message: "Revenue chart error", error });
//   }
// };
// controllers/adminDashboard.controller.js
// controllers/adminDashboard.controller.js
import User from "../models/User.model.js";
import Product from "../models/Products.model.js";
import Order from "../models/Order.model.js";
import Category from "../models/Category.model.js";

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

// Helper function to calculate percentage change
const calculatePercentageChange = (current, previous) => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return ((current - previous) / previous) * 100;
};

// Get current and last month date ranges
const getDateRanges = () => {
  const now = new Date();

  // Current month
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // Last month
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  return {
    currentMonth: { start: currentMonthStart, end: currentMonthEnd },
    lastMonth: { start: lastMonthStart, end: lastMonthEnd },
  };
};

// =====================================
// 1️⃣ ADMIN DASHBOARD STATS
// =====================================
export const getAdminStats = async (req, res) => {
  try {
    console.log("🔄 Fetching admin stats...");

    // Basic counts (existing)
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalOrders = await Order.countDocuments();

    // User stats
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const blockedUsers = await User.countDocuments({ isBlocked: true });
    const adminUsers = await User.countDocuments({ role: "admin" });

    // Order status counts
    const pendingOrders = await Order.countDocuments({ status: "pending" });
    const processingOrders = await Order.countDocuments({
      status: "processing",
    });
    const shippedOrders = await Order.countDocuments({ status: "shipped" });
    const deliveredOrders = await Order.countDocuments({ status: "delivered" });
    const cancelledOrders = await Order.countDocuments({ status: "cancelled" });

    // Payment status
    const paidOrders = await Order.countDocuments({ paymentStatus: "paid" });
    const unpaidOrders = await Order.countDocuments({
      paymentStatus: "unpaid",
    });

    // Revenue calculation
    const deliveredOrdersList = await Order.find({ status: "delivered" });
    let totalRevenue = 0;
    deliveredOrdersList.forEach((order) => {
      totalRevenue += order.total || 0;
    });

    // Get date ranges for comparison
    const { currentMonth, lastMonth } = getDateRanges();

    // Current month stats
    const currentMonthOrders = await Order.countDocuments({
      createdAt: { $gte: currentMonth.start, $lte: currentMonth.end },
    });

    const currentMonthUsers = await User.countDocuments({
      createdAt: { $gte: currentMonth.start, $lte: currentMonth.end },
    });

    const currentMonthRevenueOrders = await Order.find({
      status: "delivered",
      createdAt: { $gte: currentMonth.start, $lte: currentMonth.end },
    });
    let currentMonthRevenue = 0;
    currentMonthRevenueOrders.forEach((order) => {
      currentMonthRevenue += order.total || 0;
    });

    // Last month stats
    const lastMonthOrders = await Order.countDocuments({
      createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
    });

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
    });

    const lastMonthRevenueOrders = await Order.find({
      status: "delivered",
      createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
    });
    let lastMonthRevenue = 0;
    lastMonthRevenueOrders.forEach((order) => {
      lastMonthRevenue += order.total || 0;
    });

    // Calculate percentage changes
    const ordersChange = calculatePercentageChange(
      currentMonthOrders,
      lastMonthOrders
    );
    const usersChange = calculatePercentageChange(
      currentMonthUsers,
      lastMonthUsers
    );
    const revenueChange = calculatePercentageChange(
      currentMonthRevenue,
      lastMonthRevenue
    );

    // Top categories
    const topCategories = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $project: {
          name: 1,
          productCount: { $size: "$products" },
        },
      },
      { $sort: { productCount: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          verified: verifiedUsers,
          blocked: blockedUsers,
          admins: adminUsers,
          currentMonth: currentMonthUsers,
          lastMonth: lastMonthUsers,
          change: usersChange,
        },
        products: {
          total: totalProducts,
          outOfStock: await Product.countDocuments({ stock: 0 }),
          lowStock: await Product.countDocuments({
            stock: { $gt: 0, $lt: 10 },
          }),
        },
        categories: {
          total: totalCategories,
          topCategories: topCategories,
        },
        orders: {
          total: totalOrders,
          pending: pendingOrders,
          processing: processingOrders,
          shipped: shippedOrders,
          delivered: deliveredOrders,
          cancelled: cancelledOrders,
          paid: paidOrders,
          unpaid: unpaidOrders,
          currentMonth: currentMonthOrders,
          lastMonth: lastMonthOrders,
          change: ordersChange,
        },
        revenue: {
          total: totalRevenue,
          currentMonth: currentMonthRevenue,
          lastMonth: lastMonthRevenue,
          change: revenueChange,
        },
        dateRanges: {
          currentMonth: {
            start: currentMonth.start,
            end: currentMonth.end,
          },
          lastMonth: {
            start: lastMonth.start,
            end: lastMonth.end,
          },
        },
      },
    });

    console.log("✅ Admin stats fetched successfully");
  } catch (error) {
    console.error("❌ Admin stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin statistics",
      error: error.message,
    });
  }
};

// =====================================
// 2️⃣ MONTHLY ORDERS CHART
// =====================================
export const getOrdersChart = async (req, res) => {
  try {
    console.log("📊 Fetching orders chart data...");

    const currentYear = new Date().getFullYear();
    const chartData = [];

    // Get orders for each month of current year
    for (let month = 0; month < 12; month++) {
      const monthStart = new Date(currentYear, month, 1);
      const monthEnd = new Date(currentYear, month + 1, 0);

      const orders = await Order.find({
        createdAt: { $gte: monthStart, $lte: monthEnd },
      });

      // Calculate revenue for this month (only delivered orders)
      const deliveredOrders = orders.filter(
        (order) => order.status === "delivered"
      );
      let monthRevenue = 0;
      deliveredOrders.forEach((order) => {
        monthRevenue += order.total || 0;
      });

      chartData.push({
        month: MONTHS[month],
        orders: orders.length,
        revenue: monthRevenue,
      });
    }

    res.json({
      success: true,
      data: chartData,
    });

    console.log("✅ Orders chart data fetched successfully");
  } catch (error) {
    console.error("❌ Orders chart error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders chart data",
      error: error.message,
    });
  }
};

// =====================================
// 3️⃣ MONTHLY USER SIGN-UP CHART
// =====================================
export const getUsersChart = async (req, res) => {
  try {
    console.log("👥 Fetching users chart data...");

    const currentYear = new Date().getFullYear();
    const chartData = [];

    // Get users for each month of current year
    for (let month = 0; month < 12; month++) {
      const monthStart = new Date(currentYear, month, 1);
      const monthEnd = new Date(currentYear, month + 1, 0);

      const userCount = await User.countDocuments({
        createdAt: { $gte: monthStart, $lte: monthEnd },
      });

      chartData.push({
        month: MONTHS[month],
        users: userCount,
      });
    }

    res.json({
      success: true,
      data: chartData,
    });

    console.log("✅ Users chart data fetched successfully");
  } catch (error) {
    console.error("❌ Users chart error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users chart data",
      error: error.message,
    });
  }
};

// =====================================
// 4️⃣ MONTHLY REVENUE CHART
// =====================================
export const getRevenueChart = async (req, res) => {
  try {
    console.log("💰 Fetching revenue chart data...");

    const currentYear = new Date().getFullYear();
    const chartData = [];

    // Get revenue for each month of current year (only delivered orders)
    for (let month = 0; month < 12; month++) {
      const monthStart = new Date(currentYear, month, 1);
      const monthEnd = new Date(currentYear, month + 1, 0);

      const deliveredOrders = await Order.find({
        status: "delivered",
        createdAt: { $gte: monthStart, $lte: monthEnd },
      });

      let monthRevenue = 0;
      deliveredOrders.forEach((order) => {
        monthRevenue += order.total || 0;
      });

      chartData.push({
        month: MONTHS[month],
        revenue: monthRevenue,
      });
    }

    res.json({
      success: true,
      data: chartData,
    });

    console.log("✅ Revenue chart data fetched successfully");
  } catch (error) {
    console.error("❌ Revenue chart error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch revenue chart data",
      error: error.message,
    });
  }
};
