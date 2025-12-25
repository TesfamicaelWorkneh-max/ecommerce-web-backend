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
  TrendingUp,
  DollarSign,
  Calendar,
  Activity,
  Download,
} from "lucide-react";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [ordersChart, setOrdersChart] = useState([]);
  const [usersChart, setUsersChart] = useState([]);
  const [revenueChart, setRevenueChart] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const admin = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!admin?.accessToken) return;

    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [
          statsRes,
          ordersRes,
          usersRes,
          revenueRes,
          topProductsRes,
          activitiesRes,
        ] = await Promise.all([
          fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/stats`),
          fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/chart/orders`),
          fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/chart/users`),
          fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/chart/revenue`),
          fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/top-products`),
          fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/recent-activities`),
        ]);

        // Parse responses
        const statsData = await statsRes.json();
        const ordersChartData = await ordersRes.json();
        const usersChartData = await usersRes.json();
        const revenueChartData = await revenueRes.json();
        const topProductsData = await topProductsRes.json();
        const activitiesData = await activitiesRes.json();

        // Set states
        setStats(statsData);
        setOrdersChart(ordersChartData);
        setUsersChart(usersChartData);
        setRevenueChart(revenueChartData);

        // Process top products
        if (Array.isArray(topProductsData)) {
          const processedTopProducts = topProductsData
            .slice(0, 5)
            .map((product) => ({
              id: product._id,
              name: product.name,
              sales: product.soldCount || 0,
              revenue: `$${((product.price || 0) * (product.soldCount || 0)).toFixed(2)}`,
              stock: product.stock || 0,
              image:
                product.image ||
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
              price: product.price || 0,
            }));
          setTopProducts(processedTopProducts);
        }

        // Process recent activities
        if (Array.isArray(activitiesData)) {
          const processedActivities = activitiesData
            .slice(0, 5)
            .map((activity) => ({
              id: activity._id || Math.random(),
              user: activity.user || "Customer",
              action: activity.action || "Activity",
              time: formatTimeAgo(activity.time),
              orderTotal: activity.amount
                ? `$${activity.amount.toFixed(2)}`
                : "",
              type: activity.type || "general",
              details: activity.details || "",
            }));
          setRecentActivities(processedActivities);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        // Fallback to empty arrays
        setTopProducts([]);
        setRecentActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [admin?.accessToken]);

  const formatTimeAgo = (dateString) => {
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

  // Calculate real quick stats from fetched data
  const quickStats = stats
    ? [
        {
          title: "Total Revenue",
          value: `$${(stats.revenue?.total || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          change: `${stats.revenue?.change >= 0 ? "+" : ""}${(stats.revenue?.change || 0).toFixed(1)}%`,
          icon: <DollarSign className="w-6 h-6" />,
          color: "from-green-500 to-emerald-500",
          bgColor: "bg-green-900/20",
          isPositive: stats.revenue?.change >= 0,
        },
        {
          title: "Total Orders",
          value: (stats.orders?.total || 0).toLocaleString(),
          change: `${stats.orders?.change >= 0 ? "+" : ""}${(stats.orders?.change || 0).toFixed(1)}%`,
          icon: <ShoppingCart className="w-6 h-6" />,
          color: "from-blue-500 to-cyan-500",
          bgColor: "bg-blue-900/20",
          isPositive: stats.orders?.change >= 0,
        },
        {
          title: "Active Users",
          value: (stats.users?.total || 0).toLocaleString(),
          change: `${stats.users?.change >= 0 ? "+" : ""}${(stats.users?.change || 0).toFixed(1)}%`,
          icon: <Users className="w-6 h-6" />,
          color: "from-purple-500 to-pink-500",
          bgColor: "bg-purple-900/20",
          isPositive: stats.users?.change >= 0,
        },
        {
          title: "Total Products",
          value: (stats.products?.total || 0).toLocaleString(),
          change: `+${(((stats.products?.sold || 0) / (stats.products?.total || 1)) * 100).toFixed(1)}% sold`,
          icon: <Package className="w-6 h-6" />,
          color: "from-orange-500 to-red-500",
          bgColor: "bg-orange-900/20",
          isPositive: true,
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-400 text-lg">Failed to load dashboard data</p>
          <p className="text-slate-400 mt-2">
            Please check your connection and try again
          </p>
        </div>
      </div>
    );
  }

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

  // Process order status for pie chart
  const orderStatusData = stats.orders
    ? [
        { name: "Pending", value: stats.orders.pending, color: "#F59E0B" },
        {
          name: "Processing",
          value: stats.orders.processing,
          color: "#3B82F6",
        },
        { name: "Shipped", value: stats.orders.shipped, color: "#8B5CF6" },
        { name: "Delivered", value: stats.orders.delivered, color: "#10B981" },
        {
          name: "Cancelled",
          value: stats.orders.cancelled || 0,
          color: "#EF4444",
        },
      ].filter((item) => item.value > 0)
    : [];

  const exportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      stats,
      quickStats,
      charts: {
        usersChart,
        ordersChart,
        revenueChart,
      },
      topProducts,
      recentActivities,
      orderStatusData,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dashboard-report-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="text-white">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {admin?.name || "Admin"}!
            </h1>
            <p className="text-slate-400 mt-2">
              Here's what's happening with your store today.
            </p>
            <div className="mt-2 text-sm text-slate-500">
              Last updated:{" "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Last 30 days</span>
            </button>
            <button
              onClick={exportReport}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg text-sm font-medium flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-200`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <div className="text-white">{stat.icon}</div>
              </div>
              <span
                className={`text-sm font-medium px-2 py-1 rounded ${
                  stat.isPositive
                    ? "text-green-400 bg-green-900/30"
                    : "text-red-400 bg-red-900/30"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
            <p className="text-slate-400">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Main Charts */}
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
                  Month
                </button>
                <button className="px-3 py-1 text-xs bg-slate-700/50 rounded">
                  Week
                </button>
                <button className="px-3 py-1 text-xs bg-slate-700/50 rounded">
                  Day
                </button>
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
                        ? `$${value.toLocaleString()}`
                        : value.toLocaleString(),
                      chart.dataKey.charAt(0).toUpperCase() +
                        chart.dataKey.slice(1),
                    ]}
                  />
                  <Legend />
                  <Bar
                    dataKey={chart.dataKey}
                    fill={chart.color}
                    radius={[8, 8, 0, 0]}
                    name={
                      chart.dataKey === "revenue"
                        ? "Revenue ($)"
                        : chart.dataKey
                    }
                  />
                </BarChart>
              ) : (
                <LineChart data={chart.data}>
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
                      `$${value.toLocaleString()}`,
                      "Revenue",
                    ]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={chart.dataKey}
                    stroke={chart.color}
                    strokeWidth={3}
                    dot={{ stroke: chart.color, strokeWidth: 2, r: 4 }}
                    name="Revenue ($)"
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
            <h2 className="text-xl font-semibold">Top Products</h2>
            <a
              href="/admin/products"
              className="text-green-400 hover:text-green-300 text-sm font-medium"
            >
              View All →
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
                    Sales
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
                      key={product.id || index}
                      className="border-b border-slate-700/30 hover:bg-slate-700/20"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg mr-3 overflow-hidden bg-slate-700">
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
                          <div>
                            <div className="font-medium truncate max-w-[200px]">
                              {product.name}
                            </div>
                            <div className="text-sm text-slate-400">
                              Price: ${product.price?.toFixed(2) || "0.00"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold">
                          {product.sales.toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div
                          className={`font-semibold ${
                            product.stock < 10
                              ? "text-red-400"
                              : product.stock < 50
                                ? "text-yellow-400"
                                : "text-green-400"
                          }`}
                        >
                          {product.stock.toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-green-400">
                          {product.revenue}
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
                    className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === "order"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                            : "bg-gradient-to-r from-green-500 to-emerald-500"
                        }`}
                      >
                        <span className="text-white font-bold">
                          {activity.user.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{activity.user}</h4>
                          <span className="text-xs text-slate-400">
                            {activity.time}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 mt-1">
                          {activity.action}
                        </p>
                        {activity.orderTotal && (
                          <p className="text-xs text-green-400 mt-1">
                            {activity.orderTotal}
                          </p>
                        )}
                        {activity.details && (
                          <p className="text-xs text-slate-500 mt-1">
                            {activity.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-slate-500">
                  No recent activities
                </div>
              )}
            </div>
          </div>

          {/* Order Status Pie Chart */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Order Status</h2>
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
                        `${name}: ${(percent * 100).toFixed(0)}%`
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
                      formatter={(value) => [value, "Orders"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {orderStatusData.map((status, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: status.color }}
                      ></div>
                      <span className="text-sm text-slate-300">
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
                No order data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
