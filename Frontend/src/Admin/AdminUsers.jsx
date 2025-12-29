// import React, { useEffect, useState } from "react";
// import Select from "react-select";
// import { fetchWithAuth } from "../utils/auth";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// const AdminUsers = () => {
//   const admin = JSON.parse(localStorage.getItem("user"));
//   const [users, setUsers] = useState([]);

//   const [search, setSearch] = useState("");
//   const [role, setRole] = useState("");
//   const [status, setStatus] = useState("");
//   const [sort, setSort] = useState("newest");

//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);

//   // React-Select Options
//   const roleOptions = [
//     { value: "", label: "All Roles" },
//     { value: "user", label: "User" },
//     { value: "admin", label: "Admin" },
//   ];

//   const statusOptions = [
//     { value: "", label: "All Status" },
//     { value: "active", label: "Active" },
//     { value: "blocked", label: "Blocked" },
//   ];

//   const sortOptions = [
//     { value: "newest", label: "Newest" },
//     { value: "oldest", label: "Oldest" },
//     { value: "name", label: "Name A-Z" },
//   ];

//   useEffect(() => {
//     if (!admin?.accessToken) return;
//     loadUsers();
//   }, [search, role, status, sort, page]);

//   const loadUsers = async () => {
//     try {
//       const res = await fetchWithAuth(
//         `${BACKEND_URL}/api/admin/users?search=${search}&role=${role}&status=${status}&sort=${sort}&page=${page}&limit=10`
//       );
//       const data = await res.json();
//       setUsers(data.users || []);
//       setPages(data.pages || 1);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const toggleBlock = async (id, isBlocked) => {
//     try {
//       await fetchWithAuth(
//         `${BACKEND_URL}/api/admin/users/${id}/${isBlocked ? "unblock" : "block"}`,
//         {
//           method: "PUT",
//         }
//       );
//       loadUsers();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const toggleRole = async (id, role) => {
//     try {
//       await fetchWithAuth(
//         `${BACKEND_URL}/api/admin/users/${id}/${role === "admin" ? "remove-admin" : "make-admin"}`,
//         {
//           method: "PUT",
//         }
//       );
//       loadUsers();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteUser = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await fetchWithAuth(`${BACKEND_URL}/api/admin/users/${id}`, {
//         method: "DELETE",
//       });
//       loadUsers();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // Custom styles for React-Select (Dark Mode)
//   const selectStyles = {
//     control: (base) => ({
//       ...base,
//       backgroundColor: "#1e293b",
//       borderColor: "#334155",
//       padding: "2px",
//       color: "white",
//     }),
//     menu: (base) => ({
//       ...base,
//       backgroundColor: "#1e293b",
//       color: "white",
//     }),
//     singleValue: (base) => ({
//       ...base,
//       color: "white",
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isSelected
//         ? "#22c55e"
//         : state.isFocused
//           ? "#334155"
//           : "#1e293b",
//       color: "white",
//     }),
//   };

//   return (
//     <div className="min-h-screen  text-white">
//       <h1 className="text-4xl font-bold mb-10 text-center text-green-400">
//         Manage Users
//       </h1>

//       {/* Filters Section */}
//       <div className="bg-slate-800  rounded-xl mb-10 grid lg:grid-cols-3 md:grid-cols-2 gap-2 shadow-lg">
//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search users..."
//           className="px-4 py-2 rounded bg-slate-700 w-full focus:border-green-400 border"
//           value={search}
//           onChange={(e) => {
//             setPage(1);
//             setSearch(e.target.value);
//           }}
//         />

//         {/* Role */}
//         <Select
//           options={roleOptions}
//           onChange={(opt) => {
//             setPage(1);
//             setRole(opt.value);
//           }}
//           styles={selectStyles}
//           placeholder="Role"
//         />

//         {/* Status */}
//         <Select
//           options={statusOptions}
//           onChange={(opt) => {
//             setPage(1);
//             setStatus(opt.value);
//           }}
//           styles={selectStyles}
//           placeholder="Status"
//         />

//         {/* Sort */}
//         <Select
//           options={sortOptions}
//           onChange={(opt) => setSort(opt.value)}
//           styles={selectStyles}
//           defaultValue={sortOptions[0]}
//           placeholder="Sort"
//         />
//       </div>

//       {/* USERS GRID */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {users.map((u) => (
//           <div
//             key={u._id}
//             className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700 hover:border-green-400 transition-all hover:shadow-green-500/20"
//           >
//             <h2 className="text-xl font-semibold">{u.name}</h2>
//             <p className="text-gray-400 break-all">{u.email}</p>

//             {/* Role Badge */}
//             <p className="mt-3">
//               <span
//                 className={`px-3 py-1 rounded-full text-sm ${
//                   u.role === "admin" ? "bg-blue-600" : "bg-gray-600"
//                 }`}
//               >
//                 {u.role}
//               </span>
//             </p>

//             {/* Status Badge */}
//             <p className="mt-3">
//               <span
//                 className={`px-3 py-1 rounded-full text-sm ${
//                   u.isBlocked ? "bg-red-600" : "bg-green-600"
//                 }`}
//               >
//                 {u.isBlocked ? "Blocked" : "Active"}
//               </span>
//             </p>

//             {/* ACTION BUTTONS */}
//             <div className="mt-5 flex flex-col gap-2">
//               <button
//                 onClick={() => toggleBlock(u._id, u.isBlocked)}
//                 className={`w-full py-2 rounded font-semibold ${
//                   u.isBlocked ? "bg-green-600" : "bg-red-600"
//                 }`}
//               >
//                 {u.isBlocked ? "Unblock User" : "Block User"}
//               </button>

//               <button
//                 onClick={() => toggleRole(u._id, u.role)}
//                 className="w-full py-2 rounded font-semibold bg-blue-600"
//               >
//                 {u.role === "admin" ? "Remove Admin" : "Make Admin"}
//               </button>

//               <button
//                 onClick={() => deleteUser(u._id)}
//                 className="w-full py-2 rounded font-semibold bg-yellow-600"
//               >
//                 Delete User
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-10 items-center gap-4">
//         <button
//           disabled={page <= 1}
//           onClick={() => setPage((p) => p - 1)}
//           className="px-4 py-2 bg-slate-700 rounded disabled:bg-slate-600"
//         >
//           Prev
//         </button>

//         <span className="text-lg">
//           Page <span className="text-green-400">{page}</span> /{" "}
//           <span className="text-green-400">{pages}</span>
//         </span>

//         <button
//           disabled={page >= pages}
//           onClick={() => setPage((p) => p + 1)}
//           className="px-4 py-2 bg-slate-700 rounded disabled:bg-slate-600"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;
import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { fetchWithAuth } from "../utils/auth";
import {
  Users,
  User,
  Shield,
  ShieldOff,
  Lock,
  Unlock,
  Trash2,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  MoreVertical,
  Eye,
  Edit,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  BarChart3,
  TrendingUp,
  Clock,
  UserCheck,
  UserX,
  Mail as MailIcon,
  Smartphone,
  Globe,
  Hash,
  LogOut,
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminUsers = () => {
  const admin = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    blocked: 0,
    admins: 0,
    newToday: 0,
  });

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("admin-users-theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [bulkAction, setBulkAction] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(null);
  const [operationLogs, setOperationLogs] = useState([]);

  // React-Select Options
  const roleOptions = [
    { value: "", label: "All Roles" },
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
    { value: "moderator", label: "Moderator" },
  ];

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "blocked", label: "Blocked" },
    { value: "inactive", label: "Inactive" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "name_asc", label: "Name A-Z" },
    { value: "name_desc", label: "Name Z-A" },
    { value: "most_active", label: "Most Active" },
    { value: "recent_login", label: "Recent Login" },
  ];

  // Theme classes
  const themeClasses = {
    container:
      theme === "dark"
        ? "bg-gradient-to-br from-slate-900 to-slate-950"
        : "bg-gradient-to-br from-gray-50 to-gray-100",
    text: theme === "dark" ? "text-white" : "text-gray-900",
    textMuted: theme === "dark" ? "text-gray-400" : "text-gray-600",
    textSecondary: theme === "dark" ? "text-gray-300" : "text-gray-700",
    card: theme === "dark" ? "bg-slate-800/80" : "bg-white/90",
    cardHover: theme === "dark" ? "hover:bg-slate-800/90" : "hover:bg-white",
    border: theme === "dark" ? "border-slate-700/50" : "border-gray-200/70",
    input:
      theme === "dark"
        ? "bg-slate-800 border-slate-700 text-white"
        : "bg-white border-gray-300 text-gray-900",
    statCard:
      theme === "dark"
        ? "bg-slate-800/50 border-slate-700/50"
        : "bg-white/70 border-gray-200/70",
    buttonPrimary:
      theme === "dark"
        ? "bg-green-500 hover:bg-green-600 text-white"
        : "bg-green-600 hover:bg-green-700 text-white",
    buttonSecondary:
      theme === "dark"
        ? "bg-slate-700 hover:bg-slate-600 text-white"
        : "bg-gray-200 hover:bg-gray-300 text-gray-800",
    buttonDanger:
      theme === "dark"
        ? "bg-red-500 hover:bg-red-600 text-white"
        : "bg-red-600 hover:bg-red-700 text-white",
    buttonWarning:
      theme === "dark"
        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
        : "bg-yellow-600 hover:bg-yellow-700 text-white",
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("admin-users-theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  // Apply theme on mount
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  useEffect(() => {
    if (!admin?.accessToken) return;
    loadUsers();
    loadStats();
  }, [search, role, status, sort, page]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/admin/users?search=${search}&role=${role}&status=${status}&sort=${sort}&page=${page}&limit=8`
      );
      const data = await res.json();

      // Transform user data for better display
      const transformedUsers = (data.users || []).map((user) => ({
        ...user,
        lastLogin: user.lastLogin || new Date(user.createdAt).toISOString(),
        loginCount: user.loginCount || 0,
        isActive: !user.isBlocked,
      }));

      setUsers(transformedUsers);
      setPages(data.pages || 1);
      setSelectedUsers(new Set()); // Clear selections on new load
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/admin/users/stats`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  };

  const toggleBlock = async (id, isBlocked) => {
    try {
      const action = isBlocked ? "unblock" : "block";
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/admin/users/${id}/${action}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminId: admin._id,
            adminName: admin.name,
            reason: isBlocked
              ? "User unblocked by admin"
              : "User blocked for policy violation",
          }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        // Add to operation logs
        addOperationLog({
          action: isBlocked ? "unblocked" : "blocked",
          targetId: id,
          targetName: users.find((u) => u._id === id)?.name || "User",
          adminName: admin.name,
          timestamp: new Date().toISOString(),
        });

        // Show success message
        alert(`User ${isBlocked ? "unblocked" : "blocked"} successfully!`);

        // Refresh data
        loadUsers();
        loadStats();

        // Update local storage if blocking current user
        if (id === admin._id) {
          const updatedAdmin = { ...admin, isBlocked: !isBlocked };
          localStorage.setItem("user", JSON.stringify(updatedAdmin));
          if (!isBlocked) {
            // If admin blocked themselves, redirect to login
            setTimeout(() => {
              window.location.href = "/login";
            }, 2000);
          }
        }
      } else {
        alert(result.message || "Operation failed");
      }
    } catch (err) {
      console.error("Error toggling block:", err);
      alert("Error performing operation");
    }
  };

  const toggleRole = async (id, currentRole) => {
    try {
      const action = currentRole === "admin" ? "remove-admin" : "make-admin";
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/admin/users/${id}/${action}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminId: admin._id,
            adminName: admin.name,
          }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        addOperationLog({
          action:
            action === "make-admin"
              ? "promoted to admin"
              : "demoted from admin",
          targetId: id,
          targetName: users.find((u) => u._id === id)?.name || "User",
          adminName: admin.name,
          timestamp: new Date().toISOString(),
        });

        alert(`User role updated successfully!`);
        loadUsers();
        loadStats();
      } else {
        alert(result.message || "Operation failed");
      }
    } catch (err) {
      console.error("Error toggling role:", err);
      alert("Error performing operation");
    }
  };

  const deleteUser = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    )
      return;

    try {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminId: admin._id,
          adminName: admin.name,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        addOperationLog({
          action: "deleted",
          targetId: id,
          targetName: users.find((u) => u._id === id)?.name || "User",
          adminName: admin.name,
          timestamp: new Date().toISOString(),
        });

        alert("User deleted successfully!");
        loadUsers();
        loadStats();
      } else {
        alert(result.message || "Delete failed");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error deleting user");
    }
  };

  const forceLogout = async (id) => {
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/admin/users/${id}/force-logout`,
        {
          method: "POST",
        }
      );

      if (res.ok) {
        addOperationLog({
          action: "forced logout",
          targetId: id,
          targetName: users.find((u) => u._id === id)?.name || "User",
          adminName: admin.name,
          timestamp: new Date().toISOString(),
        });

        alert("User logged out from all devices!");
      }
    } catch (err) {
      console.error("Error forcing logout:", err);
    }
  };

  const addOperationLog = (log) => {
    setOperationLogs((prev) => [log, ...prev.slice(0, 9)]); // Keep last 10 logs
  };

  const toggleUserSelection = (id) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedUsers(newSelected);
  };

  const selectAllUsers = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map((u) => u._id)));
    }
  };

  const performBulkAction = async () => {
    if (!bulkAction || selectedUsers.size === 0) {
      alert("Please select an action and at least one user");
      return;
    }

    const ids = Array.from(selectedUsers);
    const confirmed = window.confirm(
      `Are you sure you want to ${bulkAction} ${ids.length} user(s)?`
    );

    if (!confirmed) return;

    try {
      let endpoint = "";
      let method = "PUT";

      switch (bulkAction) {
        case "block":
          endpoint = "bulk-block";
          break;
        case "unblock":
          endpoint = "bulk-unblock";
          break;
        case "make-admin":
          endpoint = "bulk-make-admin";
          break;
        case "remove-admin":
          endpoint = "bulk-remove-admin";
          break;
        case "delete":
          endpoint = "bulk-delete";
          method = "DELETE";
          break;
        default:
          return;
      }

      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/admin/users/${endpoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids,
            adminId: admin._id,
            adminName: admin.name,
          }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        addOperationLog({
          action: `bulk ${bulkAction}`,
          targetId: `multiple (${ids.length})`,
          targetName: `${ids.length} users`,
          adminName: admin.name,
          timestamp: new Date().toISOString(),
        });

        alert(`${ids.length} user(s) ${bulkAction} successfully!`);
        setBulkAction("");
        setSelectedUsers(new Set());
        loadUsers();
        loadStats();
      } else {
        alert(result.message || "Bulk operation failed");
      }
    } catch (err) {
      console.error("Bulk operation error:", err);
      alert("Error performing bulk operation");
    }
  };

  const exportUsers = () => {
    const csvContent = [
      [
        "User ID",
        "Name",
        "Email",
        "Role",
        "Status",
        "Created At",
        "Last Login",
        "Login Count",
      ],
      ...users.map((user) => [
        user._id,
        user.name,
        user.email,
        user.role,
        user.isBlocked ? "Blocked" : "Active",
        new Date(user.createdAt).toLocaleDateString(),
        new Date(user.lastLogin).toLocaleDateString(),
        user.loginCount || 0,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  // Custom styles for React-Select
  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
      borderColor: theme === "dark" ? "#334155" : "#d1d5db",
      padding: "2px",
      color: theme === "dark" ? "white" : "#111827",
      borderRadius: "8px",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
      color: theme === "dark" ? "white" : "#111827",
    }),
    singleValue: (base) => ({
      ...base,
      color: theme === "dark" ? "white" : "#111827",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#10b981"
        : state.isFocused
          ? theme === "dark"
            ? "#334155"
            : "#f3f4f6"
          : theme === "dark"
            ? "#1e293b"
            : "#ffffff",
      color: theme === "dark" ? "white" : "#111827",
    }),
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${themeClasses.container} ${themeClasses.text} p-3 sm:p-4 md:p-6 lg:p-8`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-500 mb-2">
                User Management
              </h1>
              <p className={themeClasses.textMuted}>
                Manage user accounts, permissions, and access controls
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${theme === "dark" ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-200 hover:bg-gray-300"}`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun size={20} className="text-yellow-300" />
                ) : (
                  <Moon size={20} className="text-gray-700" />
                )}
              </button>

              <button
                onClick={exportUsers}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
              >
                <Download size={18} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div
              className={`stat-card p-4 rounded-2xl border backdrop-blur-sm ${themeClasses.statCard}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Total Users</h3>
                <Users
                  className={
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  }
                  size={24}
                />
              </div>
              <p
                className={`text-2xl font-bold ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
              >
                {stats.total}
              </p>
              <p className={`text-sm ${themeClasses.textMuted}`}>
                Registered users
              </p>
            </div>

            <div
              className={`stat-card p-4 rounded-2xl border backdrop-blur-sm ${themeClasses.statCard}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Active</h3>
                <UserCheck
                  className={
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  }
                  size={24}
                />
              </div>
              <p
                className={`text-2xl font-bold ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
              >
                {stats.active}
              </p>
              <p className={`text-sm ${themeClasses.textMuted}`}>
                Currently active
              </p>
            </div>

            <div
              className={`stat-card p-4 rounded-2xl border backdrop-blur-sm ${themeClasses.statCard}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Blocked</h3>
                <UserX
                  className={theme === "dark" ? "text-red-400" : "text-red-600"}
                  size={24}
                />
              </div>
              <p
                className={`text-2xl font-bold ${theme === "dark" ? "text-red-400" : "text-red-600"}`}
              >
                {stats.blocked}
              </p>
              <p className={`text-sm ${themeClasses.textMuted}`}>
                Restricted access
              </p>
            </div>

            <div
              className={`stat-card p-4 rounded-2xl border backdrop-blur-sm ${themeClasses.statCard}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Admins</h3>
                <Shield
                  className={
                    theme === "dark" ? "text-purple-400" : "text-purple-600"
                  }
                  size={24}
                />
              </div>
              <p
                className={`text-2xl font-bold ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}
              >
                {stats.admins}
              </p>
              <p className={`text-sm ${themeClasses.textMuted}`}>
                Administrators
              </p>
            </div>

            <div
              className={`stat-card p-4 rounded-2xl border backdrop-blur-sm ${themeClasses.statCard}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">New Today</h3>
                <TrendingUp
                  className={
                    theme === "dark" ? "text-orange-400" : "text-orange-600"
                  }
                  size={24}
                />
              </div>
              <p
                className={`text-2xl font-bold ${theme === "dark" ? "text-orange-400" : "text-orange-600"}`}
              >
                {stats.newToday}
              </p>
              <p className={`text-sm ${themeClasses.textMuted}`}>
                Today's registrations
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search users by name, email, or ID..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${themeClasses.input}`}
            />
          </div>

          {/* Filters Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
              >
                <Filter size={18} />
                {showFilters ? "Hide Filters" : "Show Filters"}
                {showFilters ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              <div
                className={`text-sm font-medium px-3 py-1.5 rounded-full ${
                  theme === "dark"
                    ? "bg-slate-800 text-gray-300"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {users.length} user{users.length !== 1 ? "s" : ""} found
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={themeClasses.textMuted}>Sort:</span>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${themeClasses.input}`}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div
              className={`p-4 rounded-xl border mb-4 ${themeClasses.statCard}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <Select
                    options={roleOptions}
                    onChange={(opt) => {
                      setPage(1);
                      setRole(opt.value);
                    }}
                    styles={selectStyles}
                    placeholder="Filter by role"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status
                  </label>
                  <Select
                    options={statusOptions}
                    onChange={(opt) => {
                      setPage(1);
                      setStatus(opt.value);
                    }}
                    styles={selectStyles}
                    placeholder="Filter by status"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearch("");
                      setRole("");
                      setStatus("");
                      setSort("newest");
                      setPage(1);
                    }}
                    className={`w-full px-4 py-2 rounded-lg transition-all ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedUsers.size > 0 && (
          <div
            className={`mb-6 p-4 rounded-xl border ${themeClasses.statCard}`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-medium">
                  {selectedUsers.size} user{selectedUsers.size !== 1 ? "s" : ""}{" "}
                  selected
                </span>
                <button
                  onClick={selectAllUsers}
                  className={`text-sm px-3 py-1 rounded-lg ${themeClasses.buttonSecondary}`}
                >
                  {selectedUsers.size === users.length
                    ? "Deselect All"
                    : "Select All"}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <select
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value)}
                  className={`px-3 py-2 rounded-lg text-sm ${themeClasses.input}`}
                >
                  <option value="">Bulk Actions...</option>
                  <option value="block">Block Selected</option>
                  <option value="unblock">Unblock Selected</option>
                  <option value="make-admin">Make Admin</option>
                  <option value="remove-admin">Remove Admin</option>
                  <option value="delete">Delete Selected</option>
                </select>

                <button
                  onClick={performBulkAction}
                  disabled={!bulkAction}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    bulkAction
                      ? themeClasses.buttonDanger
                      : "opacity-50 cursor-not-allowed"
                  } hover:scale-[1.02]`}
                >
                  Apply
                </button>

                <button
                  onClick={() => setSelectedUsers(new Set())}
                  className={`px-4 py-2 rounded-lg transition-all ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Operation Logs */}
        {operationLogs.length > 0 && (
          <div
            className={`mb-6 p-4 rounded-xl border ${themeClasses.statCard}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock
                size={20}
                className={theme === "dark" ? "text-blue-400" : "text-blue-600"}
              />
              <h3 className="font-semibold">Recent Operations</h3>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {operationLogs.map((log, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between text-sm p-2 rounded-lg ${
                    theme === "dark" ? "bg-slate-800/50" : "bg-gray-100/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        log.action.includes("block")
                          ? "bg-red-500/20 text-red-300"
                          : log.action.includes("admin")
                            ? "bg-purple-500/20 text-purple-300"
                            : log.action.includes("delete")
                              ? "bg-red-500/20 text-red-300"
                              : "bg-blue-500/20 text-blue-300"
                      }`}
                    >
                      {log.action}
                    </span>
                    <span className={themeClasses.textMuted}>
                      {log.targetName}
                    </span>
                  </div>
                  <span className={themeClasses.textMuted}>
                    {new Date(log.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-transparent border-t-green-500 border-r-green-500 rounded-full animate-spin mx-auto mb-6"></div>
              <Users
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500"
                size={20}
              />
            </div>
            <p className={themeClasses.textMuted}>Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div
            className={`text-center py-16 rounded-2xl border ${themeClasses.statCard}`}
          >
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                theme === "dark" ? "bg-slate-800" : "bg-gray-200"
              }`}
            >
              <Users
                className={theme === "dark" ? "text-gray-500" : "text-gray-400"}
                size={40}
              />
            </div>
            <h3 className="text-xl font-semibold mb-3">No users found</h3>
            <p className={`mb-6 ${themeClasses.textMuted}`}>
              {search || role || status
                ? "Try changing your filters or search terms"
                : "No users registered yet"}
            </p>
          </div>
        ) : (
          // Users Grid - 2 columns on medium and large devices
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {users.map((user) => (
              <div
                key={user._id}
                className={`${themeClasses.card} rounded-2xl border shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 min-w-0 ${
                  selectedUsers.has(user._id) ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {/* User Selection Checkbox */}
                <button
                  onClick={() => toggleUserSelection(user._id)}
                  className={`absolute top-3 left-3 z-10 w-5 h-5 rounded border flex items-center justify-center ${
                    theme === "dark"
                      ? "border-slate-600 bg-slate-800/80 hover:bg-slate-700"
                      : "border-gray-400 bg-white/90 hover:bg-gray-100"
                  } transition-colors`}
                  title={selectedUsers.has(user._id) ? "Deselect" : "Select"}
                >
                  {selectedUsers.has(user._id) && (
                    <div
                      className={`w-3 h-3 rounded-sm ${theme === "dark" ? "bg-blue-500" : "bg-blue-600"}`}
                    />
                  )}
                </button>

                <div className="p-5">
                  {/* User Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          theme === "dark" ? "bg-slate-700" : "bg-gray-200"
                        }`}
                      >
                        {user.role === "admin" ? (
                          <Shield
                            className={
                              theme === "dark"
                                ? "text-purple-400"
                                : "text-purple-600"
                            }
                            size={24}
                          />
                        ) : (
                          <User
                            className={
                              theme === "dark"
                                ? "text-blue-400"
                                : "text-blue-600"
                            }
                            size={24}
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{user.name}</h3>
                        <p className={`text-sm ${themeClasses.textMuted}`}>
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setShowUserDetails(
                          showUserDetails === user._id ? null : user._id
                        )
                      }
                      className={`p-2 rounded-lg ${
                        theme === "dark"
                          ? "hover:bg-slate-700"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      <MoreVertical
                        size={20}
                        className={themeClasses.textMuted}
                      />
                    </button>
                  </div>

                  {/* User Info */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div
                      className={`rounded-lg p-3 ${
                        theme === "dark" ? "bg-slate-900/50" : "bg-gray-100/50"
                      }`}
                    >
                      <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                        <Hash size={10} />
                        Role
                      </div>
                      <div
                        className={`font-bold text-lg ${
                          user.role === "admin"
                            ? theme === "dark"
                              ? "text-purple-400"
                              : "text-purple-600"
                            : theme === "dark"
                              ? "text-blue-400"
                              : "text-blue-600"
                        }`}
                      >
                        {user.role}
                      </div>
                    </div>

                    <div
                      className={`rounded-lg p-3 ${
                        theme === "dark" ? "bg-slate-900/50" : "bg-gray-100/50"
                      }`}
                    >
                      <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                        <UserCheck size={10} />
                        Status
                      </div>
                      <div
                        className={`font-bold text-lg ${
                          user.isBlocked
                            ? theme === "dark"
                              ? "text-red-400"
                              : "text-red-600"
                            : theme === "dark"
                              ? "text-green-400"
                              : "text-green-600"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </div>
                    </div>
                  </div>

                  {/* Extended Details */}
                  {showUserDetails === user._id && (
                    <div
                      className={`mb-4 p-3 rounded-lg ${
                        theme === "dark" ? "bg-slate-900/50" : "bg-gray-100/50"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className={themeClasses.textMuted}>
                            Joined:
                          </span>
                          <span className={themeClasses.textSecondary}>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className={themeClasses.textMuted}>
                            Last Login:
                          </span>
                          <span className={themeClasses.textSecondary}>
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className={themeClasses.textMuted}>
                            Login Count:
                          </span>
                          <span className={themeClasses.textSecondary}>
                            {user.loginCount || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => toggleBlock(user._id, user.isBlocked)}
                      className={`py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                        user.isBlocked
                          ? theme === "dark"
                            ? "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                          : theme === "dark"
                            ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                      } hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      {user.isBlocked ? (
                        <Unlock size={16} />
                      ) : (
                        <Lock size={16} />
                      )}
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>

                    <button
                      onClick={() => toggleRole(user._id, user.role)}
                      className={`py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                        theme === "dark"
                          ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      } hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      {user.role === "admin" ? (
                        <ShieldOff size={16} />
                      ) : (
                        <Shield size={16} />
                      )}
                      {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                    </button>

                    <button
                      onClick={() => forceLogout(user._id)}
                      className={`py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                        theme === "dark"
                          ? "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      } hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <LogOut size={16} />
                      Force Logout
                    </button>

                    <button
                      onClick={() => deleteUser(user._id)}
                      className={`py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                        theme === "dark"
                          ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      } hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                page <= 1
                  ? "opacity-50 cursor-not-allowed"
                  : themeClasses.buttonSecondary
              } hover:scale-[1.02]`}
            >
              <ChevronLeft size={18} />
              Previous
            </button>

            {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
              let pageNum;
              if (pages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= pages - 2) {
                pageNum = pages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    page === pageNum
                      ? theme === "dark"
                        ? "bg-blue-600"
                        : "bg-blue-600 text-white"
                      : themeClasses.buttonSecondary
                  } hover:scale-[1.02]`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page >= pages}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                page >= pages
                  ? "opacity-50 cursor-not-allowed"
                  : themeClasses.buttonSecondary
              } hover:scale-[1.02]`}
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Summary */}
        {!loading && users.length > 0 && (
          <div
            className={`mt-8 p-4 rounded-xl border ${themeClasses.statCard}`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className={`text-sm ${themeClasses.textMuted}`}>
                  Showing {users.length} of {stats.total} users • Page {page} of{" "}
                  {pages}
                </p>
                <p className={`text-sm ${themeClasses.textMuted}`}>
                  {stats.active} active • {stats.blocked} blocked •{" "}
                  {stats.admins} administrators
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className={`px-4 py-2 rounded-lg transition-all ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
                >
                  Back to Top
                </button>

                <button
                  onClick={loadUsers}
                  className={`px-4 py-2 rounded-lg transition-all ${themeClasses.buttonPrimary} hover:scale-[1.02] flex items-center gap-2`}
                >
                  <RefreshCw size={18} />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
