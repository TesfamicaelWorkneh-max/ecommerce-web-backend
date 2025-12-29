// // import User from "../models/User.model.js";

// // export const getAllUsers = async (req, res) => {
// //   try {
// //     const { search, role, status, sort, page = 1, limit = 10 } = req.query;

// //     const query = {};

// //     // Search by name or email
// //     if (search) {
// //       query.$or = [
// //         { name: { $regex: search, $options: "i" } },
// //         { email: { $regex: search, $options: "i" } },
// //       ];
// //     }

// //     // Filter by role
// //     if (role) {
// //       query.role = role;
// //     }

// //     // Filter by blocked / active
// //     if (status === "blocked") query.isBlocked = true;
// //     if (status === "active") query.isBlocked = false;

// //     // Sorting
// //     let sortOption = { createdAt: -1 }; // newest
// //     if (sort === "oldest") sortOption = { createdAt: 1 };
// //     if (sort === "name") sortOption = { name: 1 };

// //     const skip = (page - 1) * limit;

// //     // Execute query
// //     const users = await User.find(query)
// //       .sort(sortOption)
// //       .skip(skip)
// //       .limit(Number(limit));

// //     const total = await User.countDocuments(query);

// //     res.json({
// //       users,
// //       total,
// //       page: Number(page),
// //       pages: Math.ceil(total / limit),
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ================================
// // // BLOCK USER
// // // ================================
// // export const blockUser = async (req, res) => {
// //   try {
// //     await User.findByIdAndUpdate(req.params.id, { isBlocked: true });
// //     res.json({ message: "User blocked" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ================================
// // // UNBLOCK USER
// // // ================================
// // export const unblockUser = async (req, res) => {
// //   try {
// //     await User.findByIdAndUpdate(req.params.id, { isBlocked: false });
// //     res.json({ message: "User unblocked" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ================================
// // // MAKE ADMIN
// // // ================================
// // export const makeAdmin = async (req, res) => {
// //   try {
// //     await User.findByIdAndUpdate(req.params.id, { role: "admin" });
// //     res.json({ message: "User is now admin" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ================================
// // // REMOVE ADMIN
// // // ================================
// // export const removeAdmin = async (req, res) => {
// //   try {
// //     await User.findByIdAndUpdate(req.params.id, { role: "user" });
// //     res.json({ message: "Admin removed" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // // ================================
// // // DELETE USER
// // // ================================
// // export const deleteUser = async (req, res) => {
// //   try {
// //     await User.findByIdAndDelete(req.params.id);
// //     res.json({ message: "User deleted" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };
// import User from "../models/User.model.js";
// import mongoose from "mongoose";

// // Get user statistics
// export const getUserStats = async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const stats = await User.aggregate([
//       {
//         $facet: {
//           total: [{ $count: "count" }],
//           active: [{ $match: { isBlocked: false } }, { $count: "count" }],
//           blocked: [{ $match: { isBlocked: true } }, { $count: "count" }],
//           admins: [{ $match: { role: "admin" } }, { $count: "count" }],
//           newToday: [
//             { $match: { createdAt: { $gte: today } } },
//             { $count: "count" },
//           ],
//         },
//       },
//     ]);

//     res.json({
//       total: stats[0].total[0]?.count || 0,
//       active: stats[0].active[0]?.count || 0,
//       blocked: stats[0].blocked[0]?.count || 0,
//       admins: stats[0].admins[0]?.count || 0,
//       newToday: stats[0].newToday[0]?.count || 0,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getAllUsers = async (req, res) => {
//   try {
//     const { search, role, status, sort, page = 1, limit = 10 } = req.query;

//     const query = {};

//     // Search by name or email
//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { email: { $regex: search, $options: "i" } },
//         { _id: search }, // Also search by ID
//       ];
//     }

//     // Filter by role
//     if (role) {
//       query.role = role;
//     }

//     // Filter by blocked / active
//     if (status === "blocked") query.isBlocked = true;
//     if (status === "active") query.isBlocked = false;
//     if (status === "inactive") {
//       const thirtyDaysAgo = new Date();
//       thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
//       query.lastLogin = { $lt: thirtyDaysAgo };
//     }

//     // Sorting
//     let sortOption = { createdAt: -1 }; // newest
//     if (sort === "oldest") sortOption = { createdAt: 1 };
//     if (sort === "name_asc") sortOption = { name: 1 };
//     if (sort === "name_desc") sortOption = { name: -1 };
//     if (sort === "most_active") sortOption = { loginCount: -1 };
//     if (sort === "recent_login") sortOption = { lastLogin: -1 };

//     const skip = (page - 1) * limit;

//     // Execute query with projection
//     const users = await User.find(query)
//       .select("-password -refreshToken") // Exclude sensitive data
//       .sort(sortOption)
//       .skip(skip)
//       .limit(Number(limit));

//     const total = await User.countDocuments(query);

//     res.json({
//       users,
//       total,
//       page: Number(page),
//       pages: Math.ceil(total / limit),
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ================================
// // BLOCK USER with admin validation
// // ================================
// export const blockUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { adminId, adminName, reason } = req.body;

//     // Prevent self-blocking
//     if (id === adminId) {
//       return res.status(400).json({ message: "Cannot block yourself" });
//     }

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Prevent blocking other admins unless super admin
//     if (user.role === "admin") {
//       const adminUser = await User.findById(adminId);
//       if (adminUser.role !== "superadmin") {
//         return res
//           .status(403)
//           .json({ message: "Only super admin can block other admins" });
//       }
//     }

//     user.isBlocked = true;
//     user.blockedBy = adminId;
//     user.blockedAt = new Date();
//     user.blockReason = reason || "Blocked by administrator";

//     // Invalidate all sessions
//     user.refreshToken = null;
//     user.lastLogout = new Date();

//     await user.save();

//     // Log the action
//     await createAuditLog({
//       action: "BLOCK_USER",
//       adminId,
//       adminName,
//       targetUserId: id,
//       targetUserName: user.name,
//       details: { reason },
//     });

//     res.json({
//       message: "User blocked successfully",
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isBlocked: user.isBlocked,
//         blockedAt: user.blockedAt,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ================================
// // UNBLOCK USER
// // ================================
// export const unblockUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { adminId, adminName } = req.body;

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.isBlocked = false;
//     user.blockedBy = null;
//     user.blockedAt = null;
//     user.blockReason = null;
//     await user.save();

//     // Log the action
//     await createAuditLog({
//       action: "UNBLOCK_USER",
//       adminId,
//       adminName,
//       targetUserId: id,
//       targetUserName: user.name,
//     });

//     res.json({
//       message: "User unblocked successfully",
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isBlocked: user.isBlocked,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ================================
// // MAKE ADMIN with validation
// // ================================
// export const makeAdmin = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { adminId, adminName } = req.body;

//     // Prevent self-modification
//     if (id === adminId) {
//       return res.status(400).json({ message: "Cannot modify your own role" });
//     }

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const adminUser = await User.findById(adminId);
//     if (adminUser.role !== "superadmin" && user.role === "admin") {
//       return res
//         .status(403)
//         .json({ message: "Only super admin can modify admin roles" });
//     }

//     user.role = "admin";
//     user.roleAssignedBy = adminId;
//     user.roleAssignedAt = new Date();
//     await user.save();

//     // Log the action
//     await createAuditLog({
//       action: "MAKE_ADMIN",
//       adminId,
//       adminName,
//       targetUserId: id,
//       targetUserName: user.name,
//     });

//     res.json({
//       message: "User is now admin",
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ================================
// // REMOVE ADMIN with validation
// // ================================
// export const removeAdmin = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { adminId, adminName } = req.body;

//     // Prevent self-modification
//     if (id === adminId) {
//       return res.status(400).json({ message: "Cannot modify your own role" });
//     }

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if this is the last admin
//     const adminCount = await User.countDocuments({ role: "admin" });
//     if (adminCount <= 1 && user.role === "admin") {
//       return res.status(400).json({ message: "Cannot remove the last admin" });
//     }

//     const adminUser = await User.findById(adminId);
//     if (adminUser.role !== "superadmin") {
//       return res
//         .status(403)
//         .json({ message: "Only super admin can remove admin roles" });
//     }

//     user.role = "user";
//     user.roleRemovedBy = adminId;
//     user.roleRemovedAt = new Date();
//     await user.save();

//     // Log the action
//     await createAuditLog({
//       action: "REMOVE_ADMIN",
//       adminId,
//       adminName,
//       targetUserId: id,
//       targetUserName: user.name,
//     });

//     res.json({
//       message: "Admin role removed",
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ================================
// // DELETE USER with validation
// // ================================
// export const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { adminId, adminName } = req.body;

//     // Prevent self-deletion
//     if (id === adminId) {
//       return res.status(400).json({ message: "Cannot delete yourself" });
//     }

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Prevent deleting other admins unless super admin
//     if (user.role === "admin") {
//       const adminUser = await User.findById(adminId);
//       if (adminUser.role !== "superadmin") {
//         return res
//           .status(403)
//           .json({ message: "Only super admin can delete other admins" });
//       }
//     }

//     // Log the action before deletion
//     await createAuditLog({
//       action: "DELETE_USER",
//       adminId,
//       adminName,
//       targetUserId: id,
//       targetUserName: user.name,
//       targetUserEmail: user.email,
//     });

//     await User.findByIdAndDelete(id);

//     res.json({
//       message: "User deleted successfully",
//       deletedUser: {
//         _id: id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ================================
// // FORCE LOGOUT
// // ================================
// export const forceLogout = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { adminId, adminName } = req.body;

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Invalidate refresh token
//     user.refreshToken = null;
//     user.lastLogout = new Date();
//     await user.save();

//     // Log the action
//     await createAuditLog({
//       action: "FORCE_LOGOUT",
//       adminId,
//       adminName,
//       targetUserId: id,
//       targetUserName: user.name,
//     });

//     res.json({ message: "User logged out from all devices" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ================================
// // BULK OPERATIONS
// // ================================
// export const bulkBlockUsers = async (req, res) => {
//   try {
//     const { ids, adminId, adminName, reason } = req.body;

//     // Remove adminId from the list to prevent self-blocking
//     const filteredIds = ids.filter((id) => id !== adminId);

//     const result = await User.updateMany(
//       { _id: { $in: filteredIds } },
//       {
//         $set: {
//           isBlocked: true,
//           blockedBy: adminId,
//           blockedAt: new Date(),
//           blockReason: reason || "Bulk blocked by administrator",
//           refreshToken: null,
//           lastLogout: new Date(),
//         },
//       }
//     );

//     // Log the bulk action
//     await createAuditLog({
//       action: "BULK_BLOCK_USERS",
//       adminId,
//       adminName,
//       targetUserId: "multiple",
//       details: { count: result.modifiedCount, userIds: filteredIds },
//     });

//     res.json({
//       message: `${result.modifiedCount} users blocked successfully`,
//       count: result.modifiedCount,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const bulkUnblockUsers = async (req, res) => {
//   try {
//     const { ids, adminId, adminName } = req.body;

//     const result = await User.updateMany(
//       { _id: { $in: ids } },
//       {
//         $set: {
//           isBlocked: false,
//           blockedBy: null,
//           blockedAt: null,
//           blockReason: null,
//         },
//       }
//     );

//     // Log the bulk action
//     await createAuditLog({
//       action: "BULK_UNBLOCK_USERS",
//       adminId,
//       adminName,
//       targetUserId: "multiple",
//       details: { count: result.modifiedCount, userIds: ids },
//     });

//     res.json({
//       message: `${result.modifiedCount} users unblocked successfully`,
//       count: result.modifiedCount,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Similar bulk functions for make-admin, remove-admin, delete

// // ================================
// // AUDIT LOG HELPER
// // ================================
// const createAuditLog = async (logData) => {
//   try {
//     // Assuming you have an AuditLog model
//     // const AuditLog = require('../models/AuditLog.model');
//     // await AuditLog.create(logData);

//     // For now, just log to console
//     console.log("AUDIT LOG:", {
//       timestamp: new Date().toISOString(),
//       ...logData,
//     });
//   } catch (err) {
//     console.error("Failed to create audit log:", err);
//   }
// };
import User from "../models/User.model.js";
import mongoose from "mongoose";

// Get user statistics
export const getUserStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = await User.aggregate([
      {
        $facet: {
          total: [{ $count: "count" }],
          active: [{ $match: { isBlocked: false } }, { $count: "count" }],
          blocked: [{ $match: { isBlocked: true } }, { $count: "count" }],
          admins: [{ $match: { role: "admin" } }, { $count: "count" }],
          newToday: [
            { $match: { createdAt: { $gte: today } } },
            { $count: "count" },
          ],
        },
      },
    ]);

    res.json({
      total: stats[0].total[0]?.count || 0,
      active: stats[0].active[0]?.count || 0,
      blocked: stats[0].blocked[0]?.count || 0,
      admins: stats[0].admins[0]?.count || 0,
      newToday: stats[0].newToday[0]?.count || 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { search, role, status, sort, page = 1, limit = 10 } = req.query;

    const query = {};

    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { _id: search }, // Also search by ID
      ];
    }

    // Filter by role
    if (role) {
      query.role = role;
    }

    // Filter by blocked / active
    if (status === "blocked") query.isBlocked = true;
    if (status === "active") query.isBlocked = false;
    if (status === "inactive") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      query.lastLogin = { $lt: thirtyDaysAgo };
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // newest
    if (sort === "oldest") sortOption = { createdAt: 1 };
    if (sort === "name_asc") sortOption = { name: 1 };
    if (sort === "name_desc") sortOption = { name: -1 };
    if (sort === "most_active") sortOption = { loginCount: -1 };
    if (sort === "recent_login") sortOption = { lastLogin: -1 };

    const skip = (page - 1) * limit;

    // Execute query with projection
    const users = await User.find(query)
      .select("-password -refreshToken") // Exclude sensitive data
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await User.countDocuments(query);

    res.json({
      users,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// BLOCK USER with admin validation
// ================================
export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId, adminName, reason } = req.body;

    // Prevent self-blocking
    if (id === adminId) {
      return res.status(400).json({ message: "Cannot block yourself" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent blocking other admins unless super admin
    if (user.role === "admin") {
      const adminUser = await User.findById(adminId);
      if (adminUser.role !== "superadmin") {
        return res
          .status(403)
          .json({ message: "Only super admin can block other admins" });
      }
    }

    user.isBlocked = true;
    user.blockedBy = adminId;
    user.blockedAt = new Date();
    user.blockReason = reason || "Blocked by administrator";

    // Invalidate all sessions
    user.refreshToken = null;
    user.lastLogout = new Date();

    await user.save();

    // Log the action
    await createAuditLog({
      action: "BLOCK_USER",
      adminId,
      adminName,
      targetUserId: id,
      targetUserName: user.name,
      details: { reason },
    });

    res.json({
      message: "User blocked successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isBlocked: user.isBlocked,
        blockedAt: user.blockedAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// UNBLOCK USER
// ================================
export const unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId, adminName } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = false;
    user.blockedBy = null;
    user.blockedAt = null;
    user.blockReason = null;
    await user.save();

    // Log the action
    await createAuditLog({
      action: "UNBLOCK_USER",
      adminId,
      adminName,
      targetUserId: id,
      targetUserName: user.name,
    });

    res.json({
      message: "User unblocked successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isBlocked: user.isBlocked,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// MAKE ADMIN with validation
// ================================
export const makeAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId, adminName } = req.body;

    // Prevent self-modification
    if (id === adminId) {
      return res.status(400).json({ message: "Cannot modify your own role" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const adminUser = await User.findById(adminId);
    if (adminUser.role !== "superadmin" && user.role === "admin") {
      return res
        .status(403)
        .json({ message: "Only super admin can modify admin roles" });
    }

    user.role = "admin";
    user.roleAssignedBy = adminId;
    user.roleAssignedAt = new Date();
    await user.save();

    // Log the action
    await createAuditLog({
      action: "MAKE_ADMIN",
      adminId,
      adminName,
      targetUserId: id,
      targetUserName: user.name,
    });

    res.json({
      message: "User is now admin",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// REMOVE ADMIN with validation
// ================================
export const removeAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId, adminName } = req.body;

    // Prevent self-modification
    if (id === adminId) {
      return res.status(400).json({ message: "Cannot modify your own role" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if this is the last admin
    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount <= 1 && user.role === "admin") {
      return res.status(400).json({ message: "Cannot remove the last admin" });
    }

    const adminUser = await User.findById(adminId);
    if (adminUser.role !== "superadmin") {
      return res
        .status(403)
        .json({ message: "Only super admin can remove admin roles" });
    }

    user.role = "user";
    user.roleRemovedBy = adminId;
    user.roleRemovedAt = new Date();
    await user.save();

    // Log the action
    await createAuditLog({
      action: "REMOVE_ADMIN",
      adminId,
      adminName,
      targetUserId: id,
      targetUserName: user.name,
    });

    res.json({
      message: "Admin role removed",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// DELETE USER with validation
// ================================
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId, adminName } = req.body;

    // Prevent self-deletion
    if (id === adminId) {
      return res.status(400).json({ message: "Cannot delete yourself" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent deleting other admins unless super admin
    if (user.role === "admin") {
      const adminUser = await User.findById(adminId);
      if (adminUser.role !== "superadmin") {
        return res
          .status(403)
          .json({ message: "Only super admin can delete other admins" });
      }
    }

    // Log the action before deletion
    await createAuditLog({
      action: "DELETE_USER",
      adminId,
      adminName,
      targetUserId: id,
      targetUserName: user.name,
      targetUserEmail: user.email,
    });

    await User.findByIdAndDelete(id);

    res.json({
      message: "User deleted successfully",
      deletedUser: {
        _id: id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// FORCE LOGOUT
// ================================
export const forceLogout = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId, adminName } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Invalidate refresh token
    user.refreshToken = null;
    user.lastLogout = new Date();
    await user.save();

    // Log the action
    await createAuditLog({
      action: "FORCE_LOGOUT",
      adminId,
      adminName,
      targetUserId: id,
      targetUserName: user.name,
    });

    res.json({ message: "User logged out from all devices" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// BULK OPERATIONS
// ================================
export const bulkBlockUsers = async (req, res) => {
  try {
    const { ids, adminId, adminName, reason } = req.body;

    // Remove adminId from the list to prevent self-blocking
    const filteredIds = ids.filter((id) => id !== adminId);

    const result = await User.updateMany(
      { _id: { $in: filteredIds } },
      {
        $set: {
          isBlocked: true,
          blockedBy: adminId,
          blockedAt: new Date(),
          blockReason: reason || "Bulk blocked by administrator",
          refreshToken: null,
          lastLogout: new Date(),
        },
      }
    );

    // Log the bulk action
    await createAuditLog({
      action: "BULK_BLOCK_USERS",
      adminId,
      adminName,
      targetUserId: "multiple",
      details: { count: result.modifiedCount, userIds: filteredIds },
    });

    res.json({
      message: `${result.modifiedCount} users blocked successfully`,
      count: result.modifiedCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const bulkUnblockUsers = async (req, res) => {
  try {
    const { ids, adminId, adminName } = req.body;

    const result = await User.updateMany(
      { _id: { $in: ids } },
      {
        $set: {
          isBlocked: false,
          blockedBy: null,
          blockedAt: null,
          blockReason: null,
        },
      }
    );

    // Log the bulk action
    await createAuditLog({
      action: "BULK_UNBLOCK_USERS",
      adminId,
      adminName,
      targetUserId: "multiple",
      details: { count: result.modifiedCount, userIds: ids },
    });

    res.json({
      message: `${result.modifiedCount} users unblocked successfully`,
      count: result.modifiedCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Bulk make admin
export const bulkMakeAdmin = async (req, res) => {
  try {
    const { ids, adminId, adminName } = req.body;

    // Remove adminId from the list to prevent self-modification
    const filteredIds = ids.filter((id) => id !== adminId);

    const result = await User.updateMany(
      { _id: { $in: filteredIds } },
      {
        $set: {
          role: "admin",
          roleAssignedBy: adminId,
          roleAssignedAt: new Date(),
        },
      }
    );

    // Log the bulk action
    await createAuditLog({
      action: "BULK_MAKE_ADMIN",
      adminId,
      adminName,
      targetUserId: "multiple",
      details: { count: result.modifiedCount, userIds: filteredIds },
    });

    res.json({
      message: `${result.modifiedCount} users promoted to admin`,
      count: result.modifiedCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Bulk remove admin
export const bulkRemoveAdmin = async (req, res) => {
  try {
    const { ids, adminId, adminName } = req.body;

    // Remove adminId from the list to prevent self-modification
    const filteredIds = ids.filter((id) => id !== adminId);

    // Check if we're removing all admins
    const adminCount = await User.countDocuments({ role: "admin" });
    const removingCount = filteredIds.length;
    if (adminCount - removingCount <= 0) {
      return res.status(400).json({ message: "Cannot remove all admin users" });
    }

    const result = await User.updateMany(
      { _id: { $in: filteredIds } },
      {
        $set: {
          role: "user",
          roleRemovedBy: adminId,
          roleRemovedAt: new Date(),
        },
      }
    );

    // Log the bulk action
    await createAuditLog({
      action: "BULK_REMOVE_ADMIN",
      adminId,
      adminName,
      targetUserId: "multiple",
      details: { count: result.modifiedCount, userIds: filteredIds },
    });

    res.json({
      message: `${result.modifiedCount} users demoted from admin`,
      count: result.modifiedCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Bulk delete users
export const bulkDeleteUsers = async (req, res) => {
  try {
    const { ids, adminId, adminName } = req.body;

    // Remove adminId from the list to prevent self-deletion
    const filteredIds = ids.filter((id) => id !== adminId);

    // Get users before deletion for logging
    const usersToDelete = await User.find({ _id: { $in: filteredIds } });

    const result = await User.deleteMany({ _id: { $in: filteredIds } });

    // Log the bulk action
    await createAuditLog({
      action: "BULK_DELETE_USERS",
      adminId,
      adminName,
      targetUserId: "multiple",
      details: {
        count: result.deletedCount,
        userIds: filteredIds,
        userNames: usersToDelete.map((u) => u.name),
      },
    });

    res.json({
      message: `${result.deletedCount} users deleted successfully`,
      count: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// AUDIT LOG HELPER
// ================================
const createAuditLog = async (logData) => {
  try {
    // Assuming you have an AuditLog model
    // const AuditLog = require('../models/AuditLog.model');
    // await AuditLog.create(logData);

    // For now, just log to console
    console.log("AUDIT LOG:", {
      timestamp: new Date().toISOString(),
      ...logData,
    });
  } catch (err) {
    console.error("Failed to create audit log:", err);
  }
};
