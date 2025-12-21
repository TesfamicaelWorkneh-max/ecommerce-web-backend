import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUndo,
  FaSearch,
  FaFilter,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaShippingFast,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaSync,
  FaSortAmountDown,
  FaSortAmountUp,
  FaCalendarAlt,
  FaBox,
} from "react-icons/fa";
import { fetchWithAuth } from "../utils/auth";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const ReturnRequestsAdminPage = () => {
  const [returnRequests, setReturnRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [stats, setStats] = useState({
    pending: 0,
    under_review: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });

  // Status colors mapping
  const statusColors = {
    pending: "bg-amber-500",
    under_review: "bg-blue-500",
    approved: "bg-green-500",
    rejected: "bg-rose-500",
    refund_processing: "bg-purple-500",
    completed: "bg-emerald-500",
    cancelled: "bg-slate-500",
  };

  // Status icons mapping
  const statusIcons = {
    pending: <FaClock className="text-amber-500" />,
    under_review: <FaExclamationTriangle className="text-blue-500" />,
    approved: <FaCheckCircle className="text-green-500" />,
    rejected: <FaTimesCircle className="text-rose-500" />,
    refund_processing: <FaMoneyBillWave className="text-purple-500" />,
    completed: <FaShippingFast className="text-emerald-500" />,
    cancelled: <FaTimesCircle className="text-slate-500" />,
  };

  // Fetch return requests
  const fetchReturnRequests = async () => {
    try {
      setLoading(true);

      // Build query parameters
      const params = new URLSearchParams();
      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      if (searchTerm) {
        params.append("search", searchTerm);
      }
      params.append("sort", sortBy);
      params.append("limit", "50");
      const url = `${BACKEND_URL}/api/return-requests/admin/all?${params.toString()}`;
      console.log("📤 Fetching return requests from:", url);

      const res = await fetchWithAuth(url);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${res.statusText} - ${errorText}`);
      }

      const data = await res.json();
      console.log("✅ Return requests response:", data);

      if (data.success) {
        setReturnRequests(data.data || []);
        console.log(`✅ Loaded ${data.data?.length || 0} return requests`);
      } else {
        toast.error(data.message || "Failed to load return requests");
        setReturnRequests([]);
      }
    } catch (error) {
      console.error("❌ Error fetching return requests:", error);
      toast.error("Failed to load return requests: " + error.message);
      setReturnRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/return-requests/admin/stats`
      );

      if (res.ok) {
        const data = await res.json();
        console.log("📊 Stats response:", data);
        if (data.success) {
          const newStats = {
            pending: 0,
            under_review: 0,
            approved: 0,
            rejected: 0,
            total: data.data?.totalRequests || 0,
          };

          // Extract counts from statusStats
          if (data.data?.statusStats) {
            data.data.statusStats.forEach((stat) => {
              if (stat.status === "pending") newStats.pending = stat.count;
              if (stat.status === "under_review")
                newStats.under_review = stat.count;
              if (stat.status === "approved") newStats.approved = stat.count;
              if (stat.status === "rejected") newStats.rejected = stat.count;
            });
          }

          setStats(newStats);
        }
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchReturnRequests();
    fetchStats();
  }, [statusFilter, sortBy]);

  // Handle status update
  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/return-requests/admin/status/${requestId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          toast.success(`Status updated to ${newStatus}`);
          fetchReturnRequests();
          fetchStats();
          setViewModalOpen(false);
        } else {
          toast.error(data.message || "Failed to update status");
        }
      } else {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status: " + error.message);
    }
  };

  // View request details
  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setViewModalOpen(true);
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  // Get status badge
  const getStatusBadge = (status) => (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 w-fit ${statusColors[status] || "bg-slate-500"} text-white`}
    >
      {statusIcons[status] || <FaClock />}
      {status?.replace("_", " ").toUpperCase() || "UNKNOWN"}
    </span>
  );

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
              Return Requests Management
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Manage and process customer return requests
            </p>
          </div>

          <button
            onClick={() => {
              fetchReturnRequests();
              fetchStats();
              toast.success("Refreshed return requests");
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaSync className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            {
              label: "Total Requests",
              value: stats.total,
              icon: <FaUndo />,
              color: "from-slate-600 to-slate-700",
            },
            {
              label: "Pending",
              value: stats.pending,
              icon: <FaClock />,
              color: "from-amber-500 to-amber-600",
            },
            {
              label: "Under Review",
              value: stats.under_review,
              icon: <FaExclamationTriangle />,
              color: "from-blue-500 to-blue-600",
            },
            {
              label: "Approved",
              value: stats.approved,
              icon: <FaCheckCircle />,
              color: "from-green-500 to-green-600",
            },
            {
              label: "Rejected",
              value: stats.rejected,
              icon: <FaTimesCircle />,
              color: "from-rose-500 to-rose-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/60 backdrop-blur-sm rounded-2xl p-5 border border-white/30 dark:border-slate-700/50 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}
                >
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/60 backdrop-blur-sm rounded-2xl p-5 border border-white/30 dark:border-slate-700/50 shadow-lg mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by order #, product, or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && fetchReturnRequests()}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/60 dark:bg-slate-800/60 border border-slate-300/50 dark:border-slate-700/50 rounded-xl focus:border-slate-400 focus:ring-3 focus:ring-slate-400/20 outline-none transition-all duration-300 placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <div className="relative">
                <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-12 pr-10 py-3.5 bg-white/60 dark:bg-slate-800/60 border border-slate-300/50 dark:border-slate-700/50 rounded-xl focus:border-slate-400 focus:ring-3 focus:ring-slate-400/20 outline-none transition-all duration-300 appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="refund_processing">Refund Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Sort */}
              <div className="relative">
                {sortBy === "newest" ? (
                  <FaSortAmountDown />
                ) : (
                  <FaSortAmountUp />
                )}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-12 pr-10 py-3.5 bg-white/60 dark:bg-slate-800/60 border border-slate-300/50 dark:border-slate-700/50 rounded-xl focus:border-slate-400 focus:ring-3 focus:ring-slate-400/20 outline-none transition-all duration-300 appearance-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Return Requests Table */}
      <div className="bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-slate-700/50 shadow-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block w-12 h-12 border-4 border-slate-300/30 border-t-slate-600 dark:border-t-slate-400 rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Loading return requests...
            </p>
          </div>
        ) : returnRequests.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 mb-4">
              <FaUndo className="text-3xl text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
              No return requests found
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              {searchTerm || statusFilter !== "all"
                ? "Try changing your search or filter criteria"
                : "All return requests have been processed"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-300/30 dark:border-slate-700/30">
                  <th className="text-left p-6 text-slate-700 dark:text-slate-300 font-semibold">
                    Request ID
                  </th>
                  <th className="text-left p-6 text-slate-700 dark:text-slate-300 font-semibold">
                    Order #
                  </th>
                  <th className="text-left p-6 text-slate-700 dark:text-slate-300 font-semibold">
                    Product
                  </th>
                  <th className="text-left p-6 text-slate-700 dark:text-slate-300 font-semibold">
                    Customer
                  </th>
                  <th className="text-left p-6 text-slate-700 dark:text-slate-300 font-semibold">
                    Date
                  </th>
                  <th className="text-left p-6 text-slate-700 dark:text-slate-300 font-semibold">
                    Status
                  </th>
                  <th className="text-left p-6 text-slate-700 dark:text-slate-300 font-semibold">
                    Refund Amount
                  </th>
                  <th className="text-left p-6 text-slate-700 dark:text-slate-300 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {returnRequests.map((request, index) => (
                  <motion.tr
                    key={request._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-300/20 dark:border-slate-700/20 hover:bg-white/30 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="p-6">
                      <div className="font-mono text-sm text-slate-600 dark:text-slate-400">
                        {request._id?.slice(-8).toUpperCase() || "N/A"}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="font-medium text-slate-800 dark:text-white">
                        {request.order?.orderNumber || "N/A"}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                          <FaBox className="text-slate-500" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-800 dark:text-white truncate max-w-[150px]">
                            {request.product?.name || "Unknown Product"}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {formatCurrency(request.product?.price)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div>
                        <div className="font-medium text-slate-800 dark:text-white">
                          {request.user?.name || "Unknown Customer"}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {request.user?.email || "No email"}
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <FaCalendarAlt />
                        <span className="text-sm">
                          {formatDate(request.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">{getStatusBadge(request.status)}</td>
                    <td className="p-6">
                      <div className="font-bold text-lg text-green-600 dark:text-green-400">
                        {formatCurrency(request.refundAmount)}
                      </div>
                    </td>
                    <td className="p-6">
                      <button
                        onClick={() => handleViewRequest(request)}
                        className="px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-lg flex items-center gap-2 transition-all duration-300"
                      >
                        <FaEye />
                        View
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-white/95 to-amber-50/50 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 p-6 pb-4 border-b border-white/20 dark:border-slate-700/50 bg-gradient-to-r from-white/90 via-white/80 to-amber-50/40 dark:from-slate-900/90 dark:via-slate-800/80 dark:to-slate-900/40 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-rose-500/10 border border-amber-500/20">
                    <FaUndo className="text-amber-600 dark:text-amber-400 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                      Return Request Details
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      ID:{" "}
                      {selectedRequest._id?.slice(-8).toUpperCase() || "N/A"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setViewModalOpen(false)}
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    Order Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Order Number
                      </p>
                      <p className="font-medium text-slate-800 dark:text-white">
                        {selectedRequest.order?.orderNumber || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Order Date
                      </p>
                      <p className="font-medium text-slate-800 dark:text-white">
                        {formatDate(selectedRequest.order?.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    Customer Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Customer Name
                      </p>
                      <p className="font-medium text-slate-800 dark:text-white">
                        {selectedRequest.user?.name || "Unknown"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Customer Email
                      </p>
                      <p className="font-medium text-slate-800 dark:text-white">
                        {selectedRequest.user?.email || "No email"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="bg-gradient-to-r from-slate-100/50 to-slate-200/30 dark:from-slate-800/30 dark:to-slate-900/30 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                  Product Details
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                    <FaBox className="text-2xl text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-slate-800 dark:text-white">
                      {selectedRequest.product?.name || "Unknown Product"}
                    </h4>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-slate-600 dark:text-slate-400">
                        Price:{" "}
                        <span className="font-semibold">
                          {formatCurrency(selectedRequest.product?.price)}
                        </span>
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        Refund Amount:{" "}
                        <span className="font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(selectedRequest.refundAmount)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reason and Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Return Reason
                </h3>
                <div className="bg-gradient-to-r from-amber-50 to-amber-100/30 dark:from-amber-900/20 dark:to-amber-800/10 rounded-xl p-5">
                  <div className="mb-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                      Reason
                    </p>
                    <p className="font-medium text-slate-800 dark:text-white capitalize">
                      {selectedRequest.reason?.replace(/_/g, " ") ||
                        "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                      Description
                    </p>
                    <p className="text-slate-700 dark:text-slate-300">
                      {selectedRequest.description || "No description provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Images */}
              {(selectedRequest.transactionProof ||
                selectedRequest.additionalImages?.length > 0) && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    Proof Images
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedRequest.transactionProof && (
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                          Transaction Proof
                        </p>
                        <div className="relative h-48 rounded-xl overflow-hidden border-2 border-amber-500/20">
                          <img
                            src={selectedRequest.transactionProof}
                            alt="Transaction proof"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop";
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {selectedRequest.additionalImages?.map((img, index) => (
                      <div key={index}>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                          Additional Image {index + 1}
                        </p>
                        <div className="relative h-48 rounded-xl overflow-hidden border-2 border-slate-300/30 dark:border-slate-700/30">
                          <img
                            src={img}
                            alt={`Additional ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop";
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Update */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Update Status
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "under_review",
                    "approved",
                    "rejected",
                    "refund_processing",
                    "completed",
                  ].map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        handleStatusUpdate(selectedRequest._id, status)
                      }
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                        status === "approved"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          : status === "rejected"
                            ? "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                            : "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
                      } text-white`}
                    >
                      {statusIcons[status]}
                      {status.replace("_", " ").toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ReturnRequestsAdminPage;
