import User from "../models/User.model.js";

// =====================================
// 1️⃣ MAIN ADMIN STATISTICS
// =====================================

// ================================
// GET ALL USERS (WITH FILTERS)
// ================================
export const getAllUsers = async (req, res) => {
  try {
    const { search, role, status, sort, page = 1, limit = 10 } = req.query;

    const query = {};

    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by role
    if (role) {
      query.role = role;
    }

    // Filter by blocked / active
    if (status === "blocked") query.isBlocked = true;
    if (status === "active") query.isBlocked = false;

    // Sorting
    let sortOption = { createdAt: -1 }; // newest
    if (sort === "oldest") sortOption = { createdAt: 1 };
    if (sort === "name") sortOption = { name: 1 };

    const skip = (page - 1) * limit;

    // Execute query
    const users = await User.find(query)
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
// BLOCK USER
// ================================
export const blockUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isBlocked: true });
    res.json({ message: "User blocked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// UNBLOCK USER
// ================================
export const unblockUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isBlocked: false });
    res.json({ message: "User unblocked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// MAKE ADMIN
// ================================
export const makeAdmin = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { role: "admin" });
    res.json({ message: "User is now admin" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// REMOVE ADMIN
// ================================
export const removeAdmin = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { role: "user" });
    res.json({ message: "Admin removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================================
// DELETE USER
// ================================
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
