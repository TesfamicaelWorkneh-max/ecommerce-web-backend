import ReturnRequest from "../models/ReturnRequest.js";
import Order from "../models/Order.model.js";
import Product from "../models/Products.model.js";
import User from "../models/User.model.js";
import { sendNotification } from "../utils/sendNotification.js";
import {
  validateCloudinaryUrl,
  deleteFromCloudinary,
  isCloudinaryUrl,
} from "../utils/cloudinary.js";

// Helper function to check eligibility
const checkReturnEligibility = async (order, productId, userId) => {
  const productInOrder = order.items.find(
    (item) => item.product?._id?.toString() === productId
  );

  if (!productInOrder) {
    return { eligible: false, message: "Product not found in order" };
  }

  // Check if order is delivered
  if (order.status !== "delivered") {
    return {
      eligible: false,
      message: "Only delivered orders can be returned",
    };
  }

  // Check 30-day window
  const daysDiff = Math.floor(
    (Date.now() - new Date(order.createdAt)) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff > 30) {
    return {
      eligible: false,
      message: "Return window expired (30 days from delivery)",
      daysDiff,
    };
  }

  // Check for existing pending return
  const existingRequest = await ReturnRequest.findOne({
    order: order._id,
    product: productId,
    user: userId,
    status: { $in: ["pending", "under_review", "approved"] },
  });

  if (existingRequest) {
    return {
      eligible: false,
      message: "Already have a pending return for this product",
    };
  }

  // Check if product is final sale
  const product = await Product.findById(productId);
  if (product?.isFinalSale) {
    return {
      eligible: false,
      message: "Final sale items cannot be returned",
    };
  }

  return {
    eligible: true,
    productInOrder,
    daysRemaining: 30 - daysDiff,
    refundAmount: productInOrder.price * productInOrder.quantity,
  };
};

// @desc    Create return request WITH CLOUDINARY
// @route   POST /api/return-requests
// @access  Private
export const createReturnRequest = async (req, res) => {
  try {
    const {
      orderId,
      productId,
      reason,
      description,
      transactionProof, // Cloudinary URL
      additionalImages = [],
    } = req.body;
    const userId = req.user._id;

    console.log("📝 Creating return request:", {
      orderId,
      productId,
      reason,
      transactionProof: transactionProof ? "Cloudinary URL" : "Missing",
    });

    // Validate required fields
    if (!orderId || !productId || !reason || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Validate transaction proof is Cloudinary URL
    if (!transactionProof || !validateCloudinaryUrl(transactionProof)) {
      return res.status(400).json({
        success: false,
        message: "Transaction proof must be uploaded to Cloudinary first",
      });
    }

    // Find order
    const order = await Order.findOne({ _id: orderId, user: userId }).populate(
      "items.product",
      "name price images isFinalSale"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check eligibility
    const eligibility = await checkReturnEligibility(order, productId, userId);
    if (!eligibility.eligible) {
      return res.status(400).json({
        success: false,
        message: eligibility.message,
      });
    }

    // Create return request
    const returnRequest = new ReturnRequest({
      order: orderId,
      user: userId,
      product: productId,
      reason,
      description,
      transactionProof, // Cloudinary URL
      additionalImages: additionalImages || [], // Cloudinary URLs
      refundAmount: eligibility.refundAmount,
      status: "pending",
    });

    await returnRequest.save();

    // Add to order's return requests
    await Order.findByIdAndUpdate(orderId, {
      $addToSet: { returnRequests: returnRequest._id },
    });

    console.log("✅ Return request created:", returnRequest._id);

    // Get all admins
    const admins = await User.find({ role: "admin" }).select("_id email name");

    // === ENHANCED NOTIFICATION: Notify all admins ===
    const adminNotificationPromises = admins.map((admin) =>
      sendNotification(
        admin._id,
        `New return request submitted for order #${order.orderNumber || order._id.toString().slice(-8)}`,
        "admin_alert",
        {
          orderId: order._id,
          orderNumber: order.orderNumber || order._id.toString().slice(-8),
          returnRequestId: returnRequest._id,
          productName: eligibility.productInOrder.product.name,
          userName: req.user.name,
          userEmail: req.user.email,
          reason: reason,
          refundAmount: eligibility.refundAmount,
          status: "pending",
        },
        {
          title: "📦 New Return Request",
          priority: "high",
          icon: "alert-triangle",
          actionUrl: `${process.env.FRONTEND_URL}/admin/returns/${returnRequest._id}`,
          actionLabel: "Review Request",
          sendEmail: true,
        }
      )
    );

    await Promise.all(adminNotificationPromises);

    // === ENHANCED NOTIFICATION: Notify user ===
    await sendNotification(
      userId,
      "Your return request has been submitted successfully and is under review",
      "return_request",
      {
        orderId: order._id,
        orderNumber: order.orderNumber || order._id.toString().slice(-8),
        returnRequestId: returnRequest._id,
        productName: eligibility.productInOrder.product.name,
        status: "pending",
        refundAmount: eligibility.refundAmount,
        expectedReviewTime: "24-48 hours",
      },
      {
        title: "📝 Return Request Submitted",
        priority: "medium",
        icon: "rotate-ccw",
        sendEmail: true,
        actionUrl: `${process.env.FRONTEND_URL}/returns/${returnRequest._id}`,
        actionLabel: "View Request",
      }
    );

    res.status(201).json({
      success: true,
      data: returnRequest,
      message: "Return request submitted successfully",
    });
  } catch (error) {
    console.error("❌ Create return request error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Get user's return requests
// @route   GET /api/return-requests/my-requests
// @access  Private
export const getMyReturnRequests = async (req, res) => {
  try {
    const requests = await ReturnRequest.find({ user: req.user._id })
      .populate("order", "orderNumber status total createdAt")
      .populate("product", "name images price")
      .sort("-createdAt");

    res.json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error("Get my return requests error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Get all return requests (Admin) - CHANGED TO /admin/all
// @route   GET /api/return-requests/admin/all
// @access  Private/Admin
export const getAllReturnRequests = async (req, res) => {
  try {
    console.log("📊 Getting all return requests with query:", req.query);

    const { status, page = 1, limit = 20, search, sort = "newest" } = req.query;
    const query = {};

    // Filter by status
    if (status && status !== "all") {
      query.status = status;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { "order.orderNumber": { $regex: search, $options: "i" } },
        { "product.name": { $regex: search, $options: "i" } },
        { "user.name": { $regex: search, $options: "i" } },
        { "user.email": { $regex: search, $options: "i" } },
      ];
    }

    // Sort functionality
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    // Execute query with pagination
    const [requests, total, pendingCount] = await Promise.all([
      ReturnRequest.find(query)
        .populate("order", "orderNumber total createdAt status")
        .populate("product", "name images price sku")
        .populate("user", "name email")
        .populate("admin", "name")
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(parseInt(limit)),
      ReturnRequest.countDocuments(query),
      ReturnRequest.countDocuments({
        status: { $in: ["pending", "under_review"] },
      }),
    ]);

    console.log(`✅ Found ${requests.length} return requests`);

    res.json({
      success: true,
      data: requests,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
      stats: {
        pending: pendingCount,
        total: total,
      },
    });
  } catch (error) {
    console.error("Get all return requests error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Get single return request - CHANGED TO /request/:id
// @route   GET /api/return-requests/request/:id
// @access  Private
export const getReturnRequest = async (req, res) => {
  try {
    console.log("🔍 Getting return request:", req.params.id);

    const request = await ReturnRequest.findById(req.params.id)
      .populate("order", "orderNumber total status shippingAddress createdAt")
      .populate("product", "name images price sku category")
      .populate("user", "name email phone")
      .populate("admin", "name email");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Return request not found",
      });
    }

    // Check authorization
    const isAdmin = req.user.role === "admin";
    const isOwner = request.user._id.toString() === req.user._id.toString();

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this request",
      });
    }

    res.json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error("Get return request error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Update return request status (Admin) - CHANGED TO /admin/status/:id
// @route   PUT /api/return-requests/admin/status/:id
// @access  Private/Admin
export const updateReturnStatus = async (req, res) => {
  try {
    console.log("🔄 Updating return request status:", req.params.id, req.body);

    const { status, adminNotes, refundMethod, trackingNumber } = req.body;

    const request = await ReturnRequest.findById(req.params.id)
      .populate("user", "name email")
      .populate("order", "orderNumber")
      .populate("product", "name");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Return request not found",
      });
    }

    // Store old status for notification
    const oldStatus = request.status;

    // Update request
    request.status = status;
    request.admin = req.user._id;

    if (adminNotes !== undefined) request.adminNotes = adminNotes;
    if (refundMethod) request.refundMethod = refundMethod;
    if (trackingNumber) request.trackingNumber = trackingNumber;

    if (status === "approved" || status === "refund_processing") {
      request.refundProcessedAt = Date.now();
    }

    await request.save();

    // === ENHANCED NOTIFICATIONS: Status update notifications ===

    // Status configuration for consistent messaging
    const statusConfig = {
      under_review: {
        title: "🔄 Return Under Review",
        message: "We're reviewing your return request. We'll update you soon.",
        priority: "medium",
        emailTemplate: "return_status_update",
        sendEmail: true,
      },
      approved: {
        title: "✅ Return Approved!",
        message: `Your return has been approved! ${trackingNumber ? `Tracking: ${trackingNumber}` : "Please ship the item back."}`,
        priority: "high",
        emailTemplate: "return_status_update",
        sendEmail: true,
      },
      rejected: {
        title: "❌ Return Declined",
        message: `Your return request has been declined. ${adminNotes ? `Reason: ${adminNotes}` : ""}`,
        priority: "high",
        emailTemplate: "return_status_update",
        sendEmail: true,
      },
      refund_processing: {
        title: "💰 Refund Processing",
        message: "Your refund is being processed. You'll receive it soon.",
        priority: "medium",
        emailTemplate: "return_status_update",
        sendEmail: true,
      },
      completed: {
        title: "🎉 Return Completed",
        message: "Return completed and refund issued successfully!",
        priority: "medium",
        emailTemplate: "return_status_update",
        sendEmail: true,
      },
    };

    // Notify user about status change
    const config = statusConfig[status];
    if (config && oldStatus !== status) {
      await sendNotification(
        request.user._id,
        config.message,
        "return_status",
        {
          orderId: request.order._id,
          orderNumber: request.order.orderNumber,
          returnRequestId: request._id,
          status: status,
          adminNotes: adminNotes || "",
          trackingNumber: trackingNumber || "",
          productName: request.product.name,
          refundAmount: request.refundAmount,
          refundMethod: refundMethod || "",
          updatedBy: req.user.name,
        },
        {
          title: config.title,
          priority: config.priority,
          sendEmail: config.sendEmail,
          icon:
            status === "approved"
              ? "check-circle"
              : status === "rejected"
                ? "x-circle"
                : status === "completed"
                  ? "party-popper"
                  : "refresh-ccw",
          actionUrl: `${process.env.FRONTEND_URL}/returns/${request._id}`,
          actionLabel: "View Details",
        }
      );
    }

    // Notify admin who updated (optional, for tracking)
    if (req.user.role === "admin" && oldStatus !== status) {
      await sendNotification(
        req.user._id,
        `You updated return request #${request._id.toString().slice(-6)} to ${status}`,
        "system",
        {
          returnRequestId: request._id,
          oldStatus: oldStatus,
          newStatus: status,
          productName: request.product.name,
          userName: request.user.name,
        },
        {
          title: "📝 Status Updated",
          priority: "low",
          icon: "edit",
          actionUrl: `${process.env.FRONTEND_URL}/admin/returns/${request._id}`,
        }
      );
    }

    res.json({
      success: true,
      data: request,
      message: `Return request status updated to ${status}`,
    });
  } catch (error) {
    console.error("Update return status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Cancel return request (User) - CHANGED TO /cancel/:id
// @route   PUT /api/return-requests/cancel/:id
// @access  Private
export const cancelReturnRequest = async (req, res) => {
  try {
    console.log("❌ Cancelling return request:", req.params.id);

    const request = await ReturnRequest.findById(req.params.id)
      .populate("order", "orderNumber")
      .populate("product", "name");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Return request not found",
      });
    }

    // Check authorization
    if (request.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this request",
      });
    }

    // Only allow cancellation of pending requests
    if (!["pending", "under_review"].includes(request.status)) {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel request in current status",
      });
    }

    const oldStatus = request.status;
    request.status = "cancelled";
    request.cancelledAt = Date.now();
    await request.save();

    // === ENHANCED NOTIFICATION: Notify user ===
    await sendNotification(
      req.user._id,
      `Your return request for ${request.product.name} has been cancelled`,
      "return_status",
      {
        orderId: request.order,
        orderNumber: request.order.orderNumber,
        returnRequestId: request._id,
        status: "cancelled",
        productName: request.product.name,
        cancelledAt: new Date().toISOString(),
      },
      {
        title: "🗑️ Return Cancelled",
        priority: "medium",
        icon: "trash-2",
        sendEmail: true,
        actionUrl: `${process.env.FRONTEND_URL}/returns/${request._id}`,
        actionLabel: "View Cancelled Request",
      }
    );

    // Notify admins about cancellation
    const admins = await User.find({ role: "admin" }).select("_id");
    const adminNotificationPromises = admins.map((admin) =>
      sendNotification(
        admin._id,
        `Return request #${request._id.toString().slice(-6)} was cancelled by user`,
        "admin_alert",
        {
          returnRequestId: request._id,
          orderNumber: request.order.orderNumber,
          productName: request.product.name,
          userName: req.user.name,
          oldStatus: oldStatus,
          cancelledAt: new Date().toISOString(),
        },
        {
          title: "⚠️ Return Cancelled",
          priority: "medium",
          icon: "alert-circle",
          actionUrl: `${process.env.FRONTEND_URL}/admin/returns/${request._id}`,
          actionLabel: "Review",
        }
      )
    );

    await Promise.all(adminNotificationPromises);

    res.json({
      success: true,
      data: request,
      message: "Return request cancelled successfully",
    });
  } catch (error) {
    console.error("Cancel return request error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Get return statistics (Admin)
// @route   GET /api/return-requests/admin/stats
// @access  Private/Admin
export const getReturnStats = async (req, res) => {
  try {
    console.log("📈 Getting return stats");

    const stats = await ReturnRequest.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalRefundAmount: { $sum: "$refundAmount" },
          avgRefundAmount: { $avg: "$refundAmount" },
        },
      },
      {
        $project: {
          status: "$_id",
          count: 1,
          totalRefundAmount: 1,
          avgRefundAmount: 1,
          _id: 0,
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Get today's requests
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRequests = await ReturnRequest.countDocuments({
      createdAt: { $gte: today },
    });

    // Get last 7 days data
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const last7DaysRequests = await ReturnRequest.aggregate([
      {
        $match: {
          createdAt: { $gte: last7Days },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: {
        statusStats: stats,
        todayRequests,
        last7Days: last7DaysRequests,
        totalRequests: stats.reduce((sum, stat) => sum + stat.count, 0),
      },
    });
  } catch (error) {
    console.error("Get return stats error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Delete return images from Cloudinary (cleanup)
// @route   DELETE /api/return-requests/delete-images
// @access  Private
export const deleteReturnImages = async (req, res) => {
  try {
    const { returnRequestId } = req.body;

    const returnRequest = await ReturnRequest.findById(returnRequestId);
    if (!returnRequest) {
      return res.status(404).json({
        success: false,
        message: "Return request not found",
      });
    }

    // Delete from Cloudinary - only Cloudinary URLs
    const urlsToDelete = [
      returnRequest.transactionProof,
      ...(returnRequest.additionalImages || []),
    ].filter((url) => url && isCloudinaryUrl(url));

    console.log("🗑️ Deleting Cloudinary images:", {
      count: urlsToDelete.length,
    });

    const deletePromises = urlsToDelete.map((url) => deleteFromCloudinary(url));
    const results = await Promise.all(deletePromises);

    const successfulDeletes = results.filter((result) => result).length;

    res.json({
      success: true,
      message: `${successfulDeletes} image(s) deleted from Cloudinary`,
      deleted: successfulDeletes,
      total: urlsToDelete.length,
    });
  } catch (error) {
    console.error("Delete return images error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete images from Cloudinary",
      error: error.message,
    });
  }
};

// @desc    Delete a single Cloudinary image
// @route   DELETE /api/return-requests/delete-image
// @access  Private
export const deleteSingleImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required",
      });
    }

    if (!isCloudinaryUrl(imageUrl)) {
      return res.status(400).json({
        success: false,
        message: "Only Cloudinary URLs can be deleted",
      });
    }

    const deleted = await deleteFromCloudinary(imageUrl);

    if (deleted) {
      res.json({
        success: true,
        message: "Image deleted from Cloudinary",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to delete image from Cloudinary",
      });
    }
  } catch (error) {
    console.error("Delete single image error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete image",
      error: error.message,
    });
  }
};
