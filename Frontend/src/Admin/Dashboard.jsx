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
} from "recharts";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [ordersChart, setOrdersChart] = useState([]);
  const [usersChart, setUsersChart] = useState([]);
  const [revenueChart, setRevenueChart] = useState([]);
  const admin = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!admin?.accessToken) return;

    const fetchStats = async () => {
      try {
        const res = await fetchWithAuth(
          `${BACKEND_URL}/api/adminanalytics/stats`
        );
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCharts = async () => {
      try {
        const [ordersRes, usersRes, revenueRes] = await Promise.all([
          fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/chart/orders`),
          fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/chart/users`),
          fetchWithAuth(`${BACKEND_URL}/api/adminanalytics/chart/revenue`),
        ]);

        setOrdersChart(await ordersRes.json());
        setUsersChart(await usersRes.json());
        setRevenueChart(await revenueRes.json());
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
    fetchCharts();
  }, [admin?.token]);

  if (!stats)
    return (
      <p className="text-white text-center mt-20 text-xl animate-pulse">
        Loading dashboard...
      </p>
    );

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
    <div className="min-h-screen  sm:p-12  text-white">
      <h1 className="text-4xl font-bold mb-12 text-center text-green-400 tracking-wide drop-shadow-lg">
        Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-2xl font-semibold mb-3">Users</h2>
          <p>
            Total: <span className="font-bold">{stats.users.total}</span>
          </p>
          <p>
            Verified:{" "}
            <span className="font-bold text-green-400">
              {stats.users.verified}
            </span>
          </p>
          <p>
            Blocked:{" "}
            <span className="font-bold text-red-500">
              {stats.users.blocked}
            </span>
          </p>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-2xl font-semibold mb-3">Products</h2>
          <p>
            Total: <span className="font-bold">{stats.products.total}</span>
          </p>
          <p>
            Sold:{" "}
            <span className="font-bold text-green-400">
              {stats.products.sold}
            </span>
          </p>
          <p>
            Unsold:{" "}
            <span className="font-bold text-yellow-400">
              {stats.products.unsold}
            </span>
          </p>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <h2 className="text-2xl font-semibold mb-3">Orders</h2>
          <p>
            Total: <span className="font-bold">{stats.orders.total}</span>
          </p>
          <p>
            Pending:{" "}
            <span className="font-bold text-yellow-400">
              {stats.orders.pending}
            </span>
          </p>
          <p>
            Processing:{" "}
            <span className="font-bold text-blue-400">
              {stats.orders.processing}
            </span>
          </p>
          <p>
            Delivered:{" "}
            <span className="font-bold text-green-400">
              {stats.orders.delivered}
            </span>
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {charts.map((chart, idx) => (
          <div
            key={idx}
            className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-green-500/30 transition-all"
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              {chart.title}
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              {chart.type === "bar" ? (
                <BarChart data={chart.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E293B",
                      border: "none",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey={chart.dataKey}
                    fill={chart.color}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              ) : (
                <LineChart data={chart.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E293B",
                      border: "none",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={chart.dataKey}
                    stroke={chart.color}
                    strokeWidth={3}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
