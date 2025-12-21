import Notification from "../models/Notification.model.js";

export const getMyNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20, type, read } = req.query;
    const skip = (page - 1) * limit;

    const filter = { user: req.user._id, deleted: false };

    if (type && type !== "all") {
      filter.type = type;
    }

    if (read === "true") {
      filter.read = true;
    } else if (read === "false") {
      filter.read = false;
    }

    const [notifications, total] = await Promise.all([
      Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Notification.countDocuments(filter),
    ]);

    // Mark notifications as delivered for push notifications
    if (notifications.some((n) => !n.delivered)) {
      await Notification.updateMany(
        {
          _id: {
            $in: notifications.filter((n) => !n.delivered).map((n) => n._id),
          },
        },
        { delivered: true }
      );
    }

    res.json({
      success: true,
      data: notifications,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
      stats: {
        unread: await Notification.countDocuments({ ...filter, read: false }),
      },
    });
  } catch (err) {
    console.error("Get notifications error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { deleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      message: "Notification deleted",
      data: { _id: id },
    });
  } catch (err) {
    console.error("Delete notification error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const deleteMultipleNotifications = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Notification IDs are required",
      });
    }

    const result = await Notification.updateMany(
      {
        _id: { $in: ids },
        user: req.user._id,
      },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} notification(s) deleted`,
      data: { deletedCount: result.modifiedCount },
    });
  } catch (err) {
    console.error("Delete multiple notifications error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      user: req.user._id,
      read: false,
      delivered: false,
    });

    res.json({
      success: true,
      data: { count },
    });
  } catch (err) {
    console.error("Get unread count error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { read: true, readAt: new Date() },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      message: "Notification marked as read",
      data: notification,
    });
  } catch (err) {
    console.error("Mark notification read error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const markAllRead = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { user: req.user._id, read: false },
      { read: true, readAt: new Date() }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} notification(s) marked as read`,
      data: { modifiedCount: result.modifiedCount },
    });
  } catch (err) {
    console.error("Mark all read error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const getNotificationStats = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const stats = await Notification.aggregate([
      {
        $match: {
          user: req.user._id,
          deleted: false,
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
          unread: {
            $sum: { $cond: [{ $eq: ["$read", false] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          type: "$_id",
          count: 1,
          unread: 1,
          _id: 0,
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Daily notification count for last 7 days
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const dailyStats = await Notification.aggregate([
      {
        $match: {
          user: req.user._id,
          deleted: false,
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
        byType: stats,
        daily: dailyStats,
        total: stats.reduce((sum, stat) => sum + stat.count, 0),
        totalUnread: stats.reduce((sum, stat) => sum + stat.unread, 0),
      },
    });
  } catch (err) {
    console.error("Get notification stats error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
