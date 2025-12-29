// import React, { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import { fetchWithAuth } from "../utils/auth";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [ordersChart, setOrdersChart] = useState([]);
//   const [usersChart, setUsersChart] = useState([]);
//   const [revenueChart, setRevenueChart] = useState([]);
//   const admin = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (!admin?.accessToken) return;

//     const fetchStats = async () => {
//       try {
//         const res = await fetchWithAuth(
//           `${BACKEND_URL}/api/adminanalytics/stats`
//         );
//         const data = await res.json();
//         setStats(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     const fetchCharts = async () => {
//       try {
//         const [ordersRes, usersRes, revenueRes] = await Promise.all([
//           fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/chart/orders`),
//           fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/chart/users`),
//           fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/chart/revenue`),
//         ]);

//         setOrdersChart(await ordersRes.json());
//         setUsersChart(await usersRes.json());
//         setRevenueChart(await revenueRes.json());
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchStats();
//     fetchCharts();
//   }, [admin?.token]);

//   if (!stats)
//     return (
//       <p className="text-white text-center mt-20 text-xl animate-pulse">
//         Loading dashboard...
//       </p>
//     );

//   const charts = [
//     {
//       title: "Monthly Users",
//       data: usersChart,
//       type: "bar",
//       dataKey: "users",
//       color: "#10B981",
//     },
//     {
//       title: "Monthly Orders",
//       data: ordersChart,
//       type: "bar",
//       dataKey: "orders",
//       color: "#3B82F6",
//     },
//     {
//       title: "Monthly Revenue",
//       data: revenueChart,
//       type: "line",
//       dataKey: "revenue",
//       color: "#F59E0B",
//     },
//   ];

//   return (
//     <div className="min-h-screen  sm:p-12  text-white">
//       <h1 className="text-4xl font-bold mb-12 text-center text-green-400 tracking-wide drop-shadow-lg">
//         Admin Dashboard
//       </h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
//         <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
//           <h2 className="text-2xl font-semibold mb-3">Users</h2>
//           <p>
//             Total: <span className="font-bold">{stats.users.total}</span>
//           </p>
//           <p>
//             Verified:{" "}
//             <span className="font-bold text-green-400">
//               {stats.users.verified}
//             </span>
//           </p>
//           <p>
//             Blocked:{" "}
//             <span className="font-bold text-red-500">
//               {stats.users.blocked}
//             </span>
//           </p>
//         </div>
//         <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
//           <h2 className="text-2xl font-semibold mb-3">Products</h2>
//           <p>
//             Total: <span className="font-bold">{stats.products.total}</span>
//           </p>
//           <p>
//             Sold:{" "}
//             <span className="font-bold text-green-400">
//               {stats.products.sold}
//             </span>
//           </p>
//           <p>
//             Unsold:{" "}
//             <span className="font-bold text-yellow-400">
//               {stats.products.unsold}
//             </span>
//           </p>
//         </div>
//         <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
//           <h2 className="text-2xl font-semibold mb-3">Orders</h2>
//           <p>
//             Total: <span className="font-bold">{stats.orders.total}</span>
//           </p>
//           <p>
//             Pending:{" "}
//             <span className="font-bold text-yellow-400">
//               {stats.orders.pending}
//             </span>
//           </p>
//           <p>
//             Processing:{" "}
//             <span className="font-bold text-blue-400">
//               {stats.orders.processing}
//             </span>
//           </p>
//           <p>
//             Delivered:{" "}
//             <span className="font-bold text-green-400">
//               {stats.orders.delivered}
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {charts.map((chart, idx) => (
//           <div
//             key={idx}
//             className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-green-500/30 transition-all"
//           >
//             <h2 className="text-xl font-semibold mb-4 text-center">
//               {chart.title}
//             </h2>
//             <ResponsiveContainer width="100%" height={250}>
//               {chart.type === "bar" ? (
//                 <BarChart data={chart.data}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#555" />
//                   <XAxis dataKey="month" stroke="#fff" />
//                   <YAxis stroke="#fff" />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#1E293B",
//                       border: "none",
//                     }}
//                   />
//                   <Legend />
//                   <Bar
//                     dataKey={chart.dataKey}
//                     fill={chart.color}
//                     radius={[4, 4, 0, 0]}
//                   />
//                 </BarChart>
//               ) : (
//                 <LineChart data={chart.data}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#555" />
//                   <XAxis dataKey="month" stroke="#fff" />
//                   <YAxis stroke="#fff" />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#1E293B",
//                       border: "none",
//                     }}
//                   />
//                   <Legend />
//                   <Line
//                     type="monotone"
//                     dataKey={chart.dataKey}
//                     stroke={chart.color}
//                     strokeWidth={3}
//                   />
//                 </LineChart>
//               )}
//             </ResponsiveContainer>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;import React, { useEffect, useState } from "react";
// Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Calendar,
  Activity,
  Download,
  TrendingUp,
  TrendingDown,
  Eye,
} from "lucide-react";
import { fetchWithAuth } from "../utils/auth";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [ordersChart, setOrdersChart] = useState([]);
  const [usersChart, setUsersChart] = useState([]);
  const [revenueChart, setRevenueChart] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const admin = JSON.parse(localStorage.getItem("user"));

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    if (!admin?.accessToken) return;

    try {
      setLoading(true);

      // Fetch all data in parallel
      const [
        statsRes,
        ordersChartRes,
        usersChartRes,
        revenueChartRes,
        productsRes,
        ordersRes,
      ] = await Promise.all([
        fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/stats`),
        fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/chart/orders`),
        fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/chart/users`),
        fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/chart/revenue`),
        fetchWithAuth(`${BACKEND_URL}/api/products`),
        fetchWithAuth(`${BACKEND_URL}/api/orders/all`),
      ]);

      // Process stats
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      // Process charts
      const ordersChartData = await ordersChartRes.json();
      if (ordersChartData.success) setOrdersChart(ordersChartData.data);

      const usersChartData = await usersChartRes.json();
      if (usersChartData.success) setUsersChart(usersChartData.data);

      const revenueChartData = await revenueChartRes.json();
      if (revenueChartData.success) setRevenueChart(revenueChartData.data);

      // Process top products
      const productsData = await productsRes.json();
      if (productsData.products || productsData.data) {
        const products = productsData.products || productsData.data || [];
        // Sort by popularity (likes) and get top 5
        const sortedProducts = [...products]
          .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
          .slice(0, 5)
          .map((product, index) => ({
            id: product._id || `product-${index}`,
            name: product.name || "Unnamed Product",
            likes: product.likes?.length || 0,
            revenue: product.price * (product.likes?.length || 0),
            stock: product.stock || 0,
            image:
              product.image ||
              product.images?.[0] ||
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
            price: product.price || 0,
          }));
        setTopProducts(sortedProducts);
      }

      // Process recent activities (orders)
      const ordersData = await ordersRes.json();
      if (ordersData.orders || ordersData.data) {
        const orders = ordersData.orders || ordersData.data || [];
        const activities = orders.slice(0, 5).map((order) => ({
          id: order._id,
          user: order.user?.name || order.user?.email || "Customer",
          action: `Placed order #${order._id.slice(-6)}`,
          time: formatTimeAgo(order.createdAt),
          amount: order.total ? `$${order.total.toFixed(2)}` : "$0.00",
          status: order.status,
        }));
        setRecentActivities(activities);
      }

      setLastUpdated(new Date());
      toast.success("Dashboard updated successfully!");
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Refresh every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [admin?.accessToken]);

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  // Quick stats calculations
  const quickStats = stats
    ? [
        {
          title: "Total Revenue",
          value: formatCurrency(stats.revenue?.total || 0),
          change: stats.revenue?.change || 0,
          icon: <DollarSign className="w-6 h-6" />,
          color: "from-green-500 to-emerald-500",
          bgColor: "bg-green-900/20",
        },
        {
          title: "Total Orders",
          value: (stats.orders?.total || 0).toLocaleString(),
          change: stats.orders?.change || 0,
          icon: <ShoppingCart className="w-6 h-6" />,
          color: "from-blue-500 to-cyan-500",
          bgColor: "bg-blue-900/20",
        },
        {
          title: "Active Users",
          value: (stats.users?.total || 0).toLocaleString(),
          change: stats.users?.change || 0,
          icon: <Users className="w-6 h-6" />,
          color: "from-purple-500 to-pink-500",
          bgColor: "bg-purple-900/20",
        },
        {
          title: "Total Products",
          value: (stats.products?.total || 0).toLocaleString(),
          icon: <Package className="w-6 h-6" />,
          color: "from-orange-500 to-red-500",
          bgColor: "bg-orange-900/20",
        },
      ]
    : [];

  // Charts configuration
  const charts = [
    {
      title: "Monthly Users",
      data: usersChart,
      type: "bar",
      dataKey: "users",
      color: "#10B981",
    },
    {
      title: "Monthly Orders",
      data: ordersChart,
      type: "bar",
      dataKey: "orders",
      color: "#3B82F6",
    },
    {
      title: "Monthly Revenue",
      data: revenueChart,
      type: "line",
      dataKey: "revenue",
      color: "#F59E0B",
    },
  ];

  // Order status data for pie chart
  const orderStatusData = stats?.orders
    ? [
        { name: "Pending", value: stats.orders.pending, color: "#F59E0B" },
        {
          name: "Processing",
          value: stats.orders.processing,
          color: "#3B82F6",
        },
        { name: "Shipped", value: stats.orders.shipped, color: "#8B5CF6" },
        { name: "Delivered", value: stats.orders.delivered, color: "#10B981" },
        { name: "Cancelled", value: stats.orders.cancelled, color: "#EF4444" },
      ].filter((item) => item.value > 0)
    : [];

  // Export dashboard data
  const exportDashboardData = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      stats,
      charts: {
        orders: ordersChart,
        users: usersChart,
        revenue: revenueChart,
      },
      topProducts,
      recentActivities,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dashboard-export-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Dashboard data exported successfully!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">Loading dashboard data...</p>
          <p className="text-slate-500 text-sm mt-2">
            Please wait while we fetch your analytics
          </p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 text-red-400">
            <svg
              className="w-full h-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.968-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Failed to Load Dashboard
          </h3>
          <p className="text-slate-400 mb-6">
            Unable to fetch dashboard data. Please check your connection.
          </p>
          <button
            onClick={fetchDashboardData}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white p-2">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {admin?.name || "Admin"}! 👋
            </h1>
            <p className="text-slate-400 mt-2">
              Here's what's happening with your store today.
            </p>
            {lastUpdated && (
              <div className="mt-2 text-sm text-slate-500">
                Last updated:{" "}
                {lastUpdated.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={fetchDashboardData}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Refresh</span>
            </button>
            <button
              onClick={exportDashboardData}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm hover:scale-[1.02] transition-all duration-200 group`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform`}
              >
                <div className="text-white">{stat.icon}</div>
              </div>
              {stat.change !== undefined && (
                <div
                  className={`flex items-center px-2 py-1 rounded-lg text-sm font-medium ${
                    stat.change >= 0
                      ? "bg-green-900/30 text-green-400"
                      : "bg-red-900/30 text-red-400"
                  }`}
                >
                  {stat.change >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  <span>{Math.abs(stat.change).toFixed(1)}%</span>
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
            <p className="text-slate-400">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2 text-blue-400" />
            Order Status Overview
          </h3>
          <div className="space-y-3">
            {[
              {
                label: "Pending",
                value: stats.orders?.pending || 0,
                color: "text-yellow-400",
              },
              {
                label: "Processing",
                value: stats.orders?.processing || 0,
                color: "text-blue-400",
              },
              {
                label: "Shipped",
                value: stats.orders?.shipped || 0,
                color: "text-purple-400",
              },
              {
                label: "Delivered",
                value: stats.orders?.delivered || 0,
                color: "text-green-400",
              },
              {
                label: "Cancelled",
                value: stats.orders?.cancelled || 0,
                color: "text-red-400",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-slate-400">{item.label}</span>
                <span className={`font-semibold ${item.color}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Product Inventory</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">Total Products</span>
                <span className="text-white">{stats.products?.total || 0}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">Out of Stock</span>
                <span className="text-red-400">
                  {stats.products?.outOfStock || 0}
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{
                    width: `${((stats.products?.outOfStock || 0) / (stats.products?.total || 1)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">Low Stock</span>
                <span className="text-yellow-400">
                  {stats.products?.lowStock || 0}
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{
                    width: `${((stats.products?.lowStock || 0) / (stats.products?.total || 1)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">User Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <div>
                <div className="text-sm text-slate-400">Total Users</div>
                <div className="text-xl font-bold">
                  {stats.users?.total || 0}
                </div>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-green-900/20 border border-green-800/30 rounded-lg">
                <div className="text-sm text-green-400">Verified</div>
                <div className="text-lg font-bold">
                  {stats.users?.verified || 0}
                </div>
              </div>
              <div className="p-3 bg-red-900/20 border border-red-800/30 rounded-lg">
                <div className="text-sm text-red-400">Blocked</div>
                <div className="text-lg font-bold">
                  {stats.users?.blocked || 0}
                </div>
              </div>
              <div className="p-3 bg-purple-900/20 border border-purple-800/30 rounded-lg">
                <div className="text-sm text-purple-400">Admins</div>
                <div className="text-lg font-bold">
                  {stats.users?.admins || 0}
                </div>
              </div>
              <div className="p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                <div className="text-sm text-blue-400">This Month</div>
                <div className="text-lg font-bold">
                  {stats.users?.currentMonth || 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {charts.map((chart, idx) => (
          <div
            key={idx}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">{chart.title}</h2>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-xs bg-slate-700 rounded">
                  {chart.type === "line" ? "Line" : "Bar"}
                </button>
                <span className="text-sm text-slate-400">Last 12 months</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              {chart.type === "bar" ? (
                <BarChart data={chart.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      color: "white",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [
                      chart.dataKey === "revenue"
                        ? formatCurrency(value)
                        : value,
                      chart.dataKey.charAt(0).toUpperCase() +
                        chart.dataKey.slice(1),
                    ]}
                  />
                  <Legend />
                  <Bar
                    dataKey={chart.dataKey}
                    fill={chart.color}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              ) : (
                <LineChart data={chart.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis
                    stroke="#9CA3AF"
                    tickFormatter={(value) =>
                      formatCurrency(value).replace("$", "")
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      color: "white",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [formatCurrency(value), "Revenue"]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={chart.dataKey}
                    stroke={chart.color}
                    strokeWidth={3}
                    dot={{ stroke: chart.color, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Products */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              Top Products by Popularity
            </h2>
            <a
              href="/admin/products"
              className="text-green-400 hover:text-green-300 text-sm font-medium flex items-center"
            >
              View All Products →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="py-3 px-4 text-left text-slate-400 font-medium">
                    Product
                  </th>
                  <th className="py-3 px-4 text-left text-slate-400 font-medium">
                    Likes
                  </th>
                  <th className="py-3 px-4 text-left text-slate-400 font-medium">
                    Stock
                  </th>
                  <th className="py-3 px-4 text-left text-slate-400 font-medium">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {topProducts.length > 0 ? (
                  topProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg mr-3 overflow-hidden bg-slate-700 flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src =
                                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
                              }}
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate">
                              {product.name}
                            </div>
                            <div className="text-sm text-slate-400">
                              ${product.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-purple-400">
                          {product.likes}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div
                          className={`font-semibold ${
                            product.stock === 0
                              ? "text-red-400"
                              : product.stock < 10
                                ? "text-yellow-400"
                                : "text-green-400"
                          }`}
                        >
                          {product.stock}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-green-400">
                          {formatCurrency(product.revenue)}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-500">
                      No product data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities & Order Status */}
        <div className="space-y-8">
          {/* Recent Activities */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Activities</h2>
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div
                    key={activity.id || index}
                    className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          activity.status === "delivered"
                            ? "bg-green-500/20"
                            : activity.status === "pending"
                              ? "bg-yellow-500/20"
                              : "bg-blue-500/20"
                        }`}
                      >
                        <span className="text-white font-bold">
                          {activity.user.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium truncate">
                            {activity.user}
                          </h4>
                          <span className="text-xs text-slate-400 whitespace-nowrap">
                            {activity.time}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 mt-1 truncate">
                          {activity.action}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-300">
                            {activity.status}
                          </span>
                          <span className="text-sm font-semibold text-green-400">
                            {activity.amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <div className="w-12 h-12 mx-auto mb-3 text-slate-600">
                    <Activity className="w-full h-full" />
                  </div>
                  <p>No recent activities</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Status Pie Chart */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Order Distribution</h2>
              <span className="text-sm text-slate-400">
                Total: {stats.orders?.total || 0}
              </span>
            </div>
            {orderStatusData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        percent > 0.05
                          ? `${name}: ${(percent * 100).toFixed(0)}%`
                          : ""
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        color: "white",
                        borderRadius: "8px",
                      }}
                      formatter={(value, name) => [value, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {orderStatusData.map((status, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 bg-slate-800/30 rounded"
                    >
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: status.color }}
                      ></div>
                      <span className="text-sm text-slate-300 flex-1">
                        {status.name}:
                      </span>
                      <span className="text-sm font-semibold">
                        {status.value}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-slate-500">
                No order data available for chart
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 pt-6 border-t border-slate-800 text-sm text-slate-500">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>Dashboard data updates automatically every 5 minutes</div>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <span>Total Categories: {stats.categories?.total || 0}</span>
            <span>Paid Orders: {stats.orders?.paid || 0}</span>
            <span>Unpaid Orders: {stats.orders?.unpaid || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
