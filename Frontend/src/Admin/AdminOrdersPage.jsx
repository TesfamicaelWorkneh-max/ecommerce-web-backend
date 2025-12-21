import { useEffect, useState } from "react";
import Select from "react-select";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "on_hold", label: "On Hold" },
  { value: "refunded", label: "Refunded" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    sort: "newest",
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Build query string from filters
      const queryParams = new URLSearchParams();
      if (filters.status !== "all")
        queryParams.append("status", filters.status);
      if (filters.search) queryParams.append("search", filters.search);
      queryParams.append("sort", filters.sort);

      const url = `${BACKEND_URL}/api/orders/all?${queryParams.toString()}`;
      const res = await fetchWithAuth(url);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();

      if (response.success) {
        // The orders are now in response.data
        setOrders(response.data || []);
        setStats(response.stats || null);
      } else {
        console.error("API error:", response.message);
        setOrders([]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        alert(error.message || "Failed to update status");
        return;
      }

      const result = await res.json();
      if (result.success) {
        alert("Order status updated successfully!");
        fetchOrders(); // refresh
      } else {
        alert(result.message || "Failed to update status");
      }
    } catch (err) {
      console.log("Update error:", err);
      alert("Network error. Please try again.");
    }
  };

  // Handle status filter change
  const handleStatusFilter = (value) => {
    setFilters((prev) => ({ ...prev, status: value }));
  };

  // Handle search
  const handleSearch = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  // Handle sort
  const handleSort = (value) => {
    setFilters((prev) => ({ ...prev, sort: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen text-white flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-green-400">
            Admin Orders
          </h1>
          <p className="text-gray-400">Manage and track all customer orders</p>
        </div>

        {/* Stats & Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-green-400">
              {stats?.totalOrders || 0}
            </p>
          </div>

          <div className="bg-slate-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Today's Orders</h3>
            <p className="text-3xl font-bold text-blue-400">
              {stats?.todayOrders || 0}
            </p>
          </div>

          {/* Search */}
          <div className="md:col-span-2">
            <div className="bg-slate-800 p-4 rounded-lg">
              <input
                type="text"
                placeholder="Search by order number, customer name, or email..."
                value={filters.search}
                onChange={handleSearch}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Status Filter:
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sort By:</label>
            <select
              value={filters.sort}
              onChange={(e) => handleSort(e.target.value)}
              className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="total_high">Total: High to Low</option>
              <option value="total_low">Total: Low to High</option>
            </select>
          </div>
        </div>

        {/* Orders Grid */}
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-400 text-xl">No orders found</p>
            {filters.status !== "all" || filters.search ? (
              <button
                onClick={() =>
                  setFilters({ status: "all", search: "", sort: "newest" })
                }
                className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            ) : null}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className={`p-6 rounded-2xl shadow-lg border transition-all bg-slate-800
                  ${
                    order.status === "delivered"
                      ? "border-green-500"
                      : order.status === "cancelled"
                        ? "border-red-500"
                        : order.status === "processing"
                          ? "border-blue-500"
                          : "border-yellow-500"
                  }
                  hover:shadow-xl hover:scale-[1.02] transition-all duration-300`}
              >
                {/* Order Header */}
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-2 text-white">
                    Order #{order.orderNumber || order._id.slice(-8)}
                  </h2>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()} •
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        order.status === "delivered"
                          ? "bg-green-500/20 text-green-300"
                          : order.status === "processing"
                            ? "bg-blue-500/20 text-blue-300"
                            : order.status === "shipped"
                              ? "bg-purple-500/20 text-purple-300"
                              : order.status === "cancelled"
                                ? "bg-red-500/20 text-red-300"
                                : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
                  <p className="font-medium text-white mb-1">
                    {order.user?.name || "Customer"}
                  </p>
                  <p className="text-gray-400 text-sm">{order.user?.email}</p>
                  {order.user?.phone && (
                    <p className="text-gray-400 text-sm">{order.user.phone}</p>
                  )}
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h3 className="font-semibold mb-2 text-white">Items:</h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-slate-700/30 p-2 rounded"
                      >
                        <div>
                          <p className="font-medium text-sm">
                            {item.productName ||
                              item.product?.name ||
                              `Item ${i + 1}`}
                          </p>
                          <p className="text-xs text-gray-400">
                            Qty: {item.quantity} × ${item.price}
                          </p>
                        </div>
                        <p className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Total */}
                <div className="mb-4 pt-3 border-t border-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total:</span>
                    <span className="text-2xl font-bold text-green-400">
                      ${order.total?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                </div>

                {/* Status Control */}
                <div className="mt-4">
                  <label className="font-semibold mb-2 block text-white">
                    Update Status:
                  </label>
                  <Select
                    options={statusOptions}
                    value={statusOptions.find((s) => s.value === order.status)}
                    onChange={(opt) => updateStatus(order._id, opt.value)}
                    className="text-black rounded"
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: "#1e293b",
                        borderColor: "#334155",
                        padding: "2px",
                        color: "white",
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: "white",
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "#1e293b",
                        color: "white",
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                          ? "#22c55e"
                          : state.isFocused
                            ? "#334155"
                            : "#1e293b",
                        color: "white",
                      }),
                    }}
                  />
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() =>
                      (window.location.href = `/admin/orders/${order._id}`)
                    }
                    className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-sm"
                  >
                    View Details
                  </button>
                  {order.trackingNumber && (
                    <button
                      onClick={() =>
                        window.open(
                          `https://tracking.com/${order.trackingNumber}`,
                          "_blank"
                        )
                      }
                      className="flex-1 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors text-sm"
                    >
                      Track
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
