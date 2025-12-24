import React, { useState, useEffect } from "react";
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
  TrendingUp,
  Eye,
  MessageCircle,
  Heart,
  Users,
  BookOpen,
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminBlogAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogStats();
  }, []);

  const fetchBlogStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${BACKEND_URL}/api/blog/stats/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching blog stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-400 tracking-wide drop-shadow-lg">
        Blog Analytics
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-2">{stats.totalPosts}</div>
              <div className="text-slate-300">Total Posts</div>
            </div>
            <BookOpen className="w-12 h-12 text-green-500 opacity-50" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-2">{stats.totalViews}</div>
              <div className="text-slate-300">Total Views</div>
            </div>
            <Eye className="w-12 h-12 text-blue-500 opacity-50" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-2">
                {stats.totalComments}
              </div>
              <div className="text-slate-300">Total Comments</div>
            </div>
            <MessageCircle className="w-12 h-12 text-purple-500 opacity-50" />
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-2">
                {stats.performance?.engagementRate?.toFixed(2)}%
              </div>
              <div className="text-slate-300">Engagement Rate</div>
            </div>
            <TrendingUp className="w-12 h-12 text-orange-500 opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Category Distribution */}
        <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-green-300">
            Category Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {stats.categoryDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Performance */}
        <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-green-300">
            Monthly Performance
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="_id.month"
                  stroke="#9CA3AF"
                  tickFormatter={(value) => {
                    const months = [
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
                    return months[value - 1];
                  }}
                />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    color: "white",
                  }}
                  labelFormatter={(value) => {
                    const months = [
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
                    return `Month: ${months[value - 1]}`;
                  }}
                />
                <Legend />
                <Bar
                  dataKey="count"
                  fill="#10B981"
                  name="Posts"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="views"
                  fill="#3B82F6"
                  name="Views"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-6 text-green-300">
          Popular Posts
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Views</th>
                <th className="py-3 px-4 text-left">Likes</th>
                <th className="py-3 px-4 text-left">Comments</th>
                <th className="py-3 px-4 text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              {stats.popularPosts.map((post) => (
                <tr
                  key={post._id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30"
                >
                  <td className="py-3 px-4">
                    <div className="font-medium">{post.title}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-400" />
                      {post.views}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-400" />
                      {post.likes?.length || 0}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-purple-400" />
                      {post.comments?.length || 0}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm">
                      {post.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-green-300">
            Avg. Views per Post
          </h3>
          <div className="text-3xl font-bold text-center">
            {stats.performance?.avgViewsPerPost?.toFixed(1) || 0}
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-green-300">
            Avg. Comments per Post
          </h3>
          <div className="text-3xl font-bold text-center">
            {stats.performance?.avgCommentsPerPost?.toFixed(1) || 0}
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-green-300">
            Engagement Rate
          </h3>
          <div className="text-3xl font-bold text-center text-green-400">
            {stats.performance?.engagementRate?.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogAnalytics;
