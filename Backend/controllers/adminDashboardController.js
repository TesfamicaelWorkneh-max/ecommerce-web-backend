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

// Helper function for percentage calculation
const calculatePercentageChange = (current, previous) => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return ((current - previous) / previous) * 100;
};

// Get last month's date range
const getLastMonthRange = () => {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
  return { start: lastMonth, end: lastMonthEnd };
};

// Get current month's date range
const getCurrentMonthRange = () => {
  const now = new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start: currentMonthStart, end: currentMonthEnd };
};

// =====================================
// 1️⃣ ADMIN DASHBOARD STATS
// =====================================
export const getAdminStats = async (req, res) => {
  try {
    // Users
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const blockedUsers = await User.countDocuments({ isBlocked: true });

    // Products
    const totalProducts = await Product.countDocuments();
    const soldProducts = await Product.aggregate([
      { $match: { isSold: true } },
      { $group: { _id: null, total: { $sum: "$soldCount" } } },
    ]);
    const soldCount = soldProducts[0]?.total || 0;

    // Orders
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "pending" });
    const processingOrders = await Order.countDocuments({
      status: "processing",
    });
    const shippedOrders = await Order.countDocuments({ status: "shipped" });
    const deliveredOrders = await Order.countDocuments({ status: "delivered" });
    const cancelledOrders = await Order.countDocuments({ status: "cancelled" });

    // Revenue
    const revenueAgg = await Order.aggregate([
      { $match: { status: "delivered" } },
      { $group: { _id: null, revenue: { $sum: "$total" } } },
    ]);
    const totalRevenue = revenueAgg[0]?.revenue || 0;

    // Current month stats
    const currentMonth = getCurrentMonthRange();
    const lastMonth = getLastMonthRange();

    // Current month revenue
    const currentMonthRevenueAgg = await Order.aggregate([
      {
        $match: {
          status: "delivered",
          createdAt: { $gte: currentMonth.start, $lte: currentMonth.end },
        },
      },
      { $group: { _id: null, revenue: { $sum: "$total" } } },
    ]);
    const currentMonthRevenue = currentMonthRevenueAgg[0]?.revenue || 0;

    // Last month revenue
    const lastMonthRevenueAgg = await Order.aggregate([
      {
        $match: {
          status: "delivered",
          createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
        },
      },
      { $group: { _id: null, revenue: { $sum: "$total" } } },
    ]);
    const lastMonthRevenue = lastMonthRevenueAgg[0]?.revenue || 0;

    // Current month orders
    const currentMonthOrders = await Order.countDocuments({
      createdAt: { $gte: currentMonth.start, $lte: currentMonth.end },
    });

    // Last month orders
    const lastMonthOrders = await Order.countDocuments({
      createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
    });

    // Current month users
    const currentMonthUsers = await User.countDocuments({
      createdAt: { $gte: currentMonth.start, $lte: currentMonth.end },
    });

    // Last month users
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
    });

    // Current month products added
    const currentMonthProducts = await Product.countDocuments({
      createdAt: { $gte: currentMonth.start, $lte: currentMonth.end },
    });

    // Last month products added
    const lastMonthProducts = await Product.countDocuments({
      createdAt: { $gte: lastMonth.start, $lte: lastMonth.end },
    });

    // Calculate percentages
    const revenueChange = calculatePercentageChange(
      currentMonthRevenue,
      lastMonthRevenue
    );
    const ordersChange = calculatePercentageChange(
      currentMonthOrders,
      lastMonthOrders
    );
    const usersChange = calculatePercentageChange(
      currentMonthUsers,
      lastMonthUsers
    );
    const productsChange = calculatePercentageChange(
      currentMonthProducts,
      lastMonthProducts
    );

    res.json({
      users: {
        total: totalUsers,
        verified: verifiedUsers,
        blocked: blockedUsers,
        currentMonth: currentMonthUsers,
        lastMonth: lastMonthUsers,
        change: usersChange,
      },
      products: {
        total: totalProducts,
        sold: soldCount,
        unsold: totalProducts - soldCount,
        currentMonth: currentMonthProducts,
        lastMonth: lastMonthProducts,
        change: productsChange,
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        processing: processingOrders,
        shipped: shippedOrders,
        delivered: deliveredOrders,
        cancelled: cancelledOrders,
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
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({
      message: "Admin stats error",
      error: error.message,
    });
  }
};

// =====================================
// 2️⃣ MONTHLY ORDERS CHART
// =====================================
export const getOrdersChart = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const orders = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 },
          revenue: { $sum: "$total" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    // Create chart data for all months
    const chart = [];
    for (let i = 1; i <= 12; i++) {
      const monthData = orders.find((o) => o._id.month === i);
      chart.push({
        month: MONTHS[i - 1],
        orders: monthData?.count || 0,
        revenue: monthData?.revenue || 0,
      });
    }

    res.json(chart);
  } catch (error) {
    console.error("Orders chart error:", error);
    res.status(500).json({
      message: "Orders chart error",
      error: error.message,
    });
  }
};

// =====================================
// 3️⃣ MONTHLY USER SIGN-UP CHART
// =====================================
export const getUsersChart = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const users = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    // Create chart data for all months
    const chart = [];
    for (let i = 1; i <= 12; i++) {
      const monthData = users.find((u) => u._id.month === i);
      chart.push({
        month: MONTHS[i - 1],
        users: monthData?.count || 0,
      });
    }

    res.json(chart);
  } catch (error) {
    console.error("Users chart error:", error);
    res.status(500).json({
      message: "Users chart error",
      error: error.message,
    });
  }
};

// =====================================
// 4️⃣ MONTHLY REVENUE CHART
// =====================================
export const getRevenueChart = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const revenue = await Order.aggregate([
      {
        $match: {
          status: "delivered",
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          revenue: { $sum: "$total" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    // Create chart data for all months
    const chart = [];
    for (let i = 1; i <= 12; i++) {
      const monthData = revenue.find((r) => r._id.month === i);
      chart.push({
        month: MONTHS[i - 1],
        revenue: monthData?.revenue || 0,
      });
    }

    res.json(chart);
  } catch (error) {
    console.error("Revenue chart error:", error);
    res.status(500).json({
      message: "Revenue chart error",
      error: error.message,
    });
  }
};

// =====================================
// 5️⃣ TOP PRODUCTS DATA
// =====================================
export const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Product.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "items.product",
          as: "orderItems",
        },
      },
      {
        $addFields: {
          totalSold: {
            $sum: "$orderItems.items.quantity",
          },
          totalRevenue: {
            $multiply: ["$price", { $ifNull: ["$soldCount", 0] }],
          },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 10 },
      {
        $project: {
          name: 1,
          price: 1,
          image: 1,
          stock: 1,
          soldCount: 1,
          likesCount: 1,
          totalRevenue: 1,
          category: 1,
        },
      },
    ]);

    res.json(topProducts);
  } catch (error) {
    console.error("Top products error:", error);
    res.status(500).json({
      message: "Top products error",
      error: error.message,
    });
  }
};

// =====================================
// 6️⃣ RECENT ACTIVITIES
// =====================================
export const getRecentActivities = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("user", "name email")
      .populate("items.product", "name price");

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email createdAt");

    const activities = [
      ...recentOrders.map((order) => ({
        type: "order",
        user: order.user?.name || order.user?.email || "Customer",
        action: `Placed order #${order.orderNumber}`,
        amount: order.total,
        time: order.createdAt,
        details: `${order.items.length} items`,
      })),
      ...recentUsers.map((user) => ({
        type: "user",
        user: user.name || user.email,
        action: "Registered new account",
        amount: null,
        time: user.createdAt,
        details: "New user",
      })),
    ]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 10);

    res.json(activities);
  } catch (error) {
    console.error("Recent activities error:", error);
    res.status(500).json({
      message: "Recent activities error",
      error: error.message,
    });
  }
};
