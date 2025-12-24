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

// export default Dashboard;
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
  const [loading, setLoading] = useState(true);
  const admin = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!admin?.accessToken) return;

    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [statsRes, ordersRes, usersRes, revenueRes] = await Promise.all([
          fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/stats`),
          fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/chart/orders`),
          fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/chart/users`),
          fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/chart/revenue`),
        ]);

        setStats(await statsRes.json());
        setOrdersChart(await ordersRes.json());
        setUsersChart(await usersRes.json());
        setRevenueChart(await revenueRes.json());
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [admin?.token]);

  const quickStats = [
    {
      title: "Total Revenue",
      value: "$24,580",
      change: "+12.5%",
      icon: <DollarSign className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-900/20",
    },
    {
      title: "Total Orders",
      value: "1,248",
      change: "+8.2%",
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-900/20",
    },
    {
      title: "Active Users",
      value: "5,428",
      change: "+15.3%",
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-900/20",
    },
    {
      title: "Conversion Rate",
      value: "4.7%",
      change: "+2.1%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-900/20",
    },
  ];

  const topProducts = [
    { name: "Premium Watch", sales: 234, revenue: "$12,450" },
    { name: "Wireless Earbuds", sales: 189, revenue: "$8,250" },
    { name: "Smartphone Case", sales: 156, revenue: "$3,120" },
    { name: "Laptop Bag", sales: 142, revenue: "$7,100" },
    { name: "Fitness Tracker", sales: 128, revenue: "$6,400" },
  ];

  const recentActivities = [
    { user: "John Doe", action: "Placed a new order", time: "2 min ago" },
    {
      user: "Jane Smith",
      action: "Registered new account",
      time: "15 min ago",
    },
    { user: "Alex Johnson", action: "Completed payment", time: "30 min ago" },
    {
      user: "Sarah Wilson",
      action: "Left a product review",
      time: "1 hour ago",
    },
    { user: "Mike Brown", action: "Requested return", time: "2 hours ago" },
  ];

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

  if (!stats) return null;

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
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Last 30 days</span>
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg text-sm font-medium flex items-center space-x-2">
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
              <span className="text-green-400 text-sm font-medium bg-green-900/30 px-2 py-1 rounded">
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
                  />
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
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      color: "white",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey={chart.dataKey}
                    stroke={chart.color}
                    strokeWidth={3}
                    dot={{ stroke: chart.color, strokeWidth: 2, r: 4 }}
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
            <h2 className="text-xl font-semibold">Top Selling Products</h2>
            <button className="text-green-400 hover:text-green-300 text-sm font-medium">
              View All →
            </button>
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
                    Revenue
                  </th>
                  <th className="py-3 px-4 text-left text-slate-400 font-medium">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-700/30 hover:bg-slate-700/20"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-slate-700 rounded-lg mr-3"></div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-slate-400">
                            SKU: PROD{1000 + index}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold">{product.sales}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-green-400">
                        {product.revenue}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-green-400">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-sm">
                          +{Math.floor(Math.random() * 20) + 5}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Activities</h2>
            <Activity className="w-5 h-5 text-green-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
