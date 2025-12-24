// import React, { useState } from "react";
// import { FaBars, FaBell, FaUser } from "react-icons/fa";

// const AdminTopbar = ({ setMobileOpen }) => {
//   const [open, setOpen] = useState(false);
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <div className="md:hidden z-10 flex items-center justify-between px-12 py-3 text-white fixed top-0 w-full">
//       {/* menu button */}
//       <button onClick={() => setMobileOpen(true)}>
//         <FaBars size={22} />
//       </button>

//       {/* right icons */}
//       <div className="flex items-center gap-5">
//         <FaBell size={20} className="text-green-400" />

//         {/* user dropdown */}
//         <div className="relative">
//           <FaUser
//             size={22}
//             className="cursor-pointer"
//             onClick={() => setOpen(!open)}
//           />

//           {open && (
//             <div className="absolute top-[100%] right-0 mt-3 bg-slate-800 border border-slate-700 rounded shadow-xl px-5 py-3">
//               <p className="mb-2">{user?.name}</p>

//               <button
//                 className="text-red-400"
//                 onClick={() => {
//                   localStorage.removeItem("user");
//                   window.location.reload();
//                 }}
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminTopbar;
import React, { useState, useEffect } from "react";
import { FaBars, FaBell, FaUser, FaSun, FaMoon } from "react-icons/fa";
import { Search, Settings, HelpCircle } from "lucide-react";

const AdminTop = ({
  setMobileOpen,
  pageTitle,
  collapsed,
  setCollapsed,
  isMobile,
}) => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications] = useState([
    { id: 1, text: "New order received", time: "5 min ago", unread: true },
    { id: 2, text: "Product low in stock", time: "1 hour ago", unread: true },
    { id: 3, text: "New user registered", time: "2 hours ago", unread: false },
  ]);

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Administrator",
    email: "admin@example.com",
    avatar: "",
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You can implement theme switching logic here
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50">
      <div className="px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
              aria-label="Open menu"
            >
              <FaBars size={20} />
            </button>

            {/* Desktop Collapse Button */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <FaBars size={18} />
            </button>

            {/* Search Bar */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
              aria-label="Toggle theme"
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            {/* Help */}
            <button
              className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
              aria-label="Help"
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* Settings */}
            <button
              className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() =>
                  setOpen(open === "notifications" ? null : "notifications")
                }
                className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all relative"
                aria-label="Notifications"
              >
                <FaBell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {open === "notifications" && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-slate-700">
                    <h3 className="font-semibold text-white">Notifications</h3>
                    <p className="text-sm text-slate-400">
                      {unreadCount} unread notifications
                    </p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-slate-700/50 hover:bg-slate-700/30 ${
                          notification.unread ? "bg-slate-700/20" : ""
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="flex-1">
                            <p className="text-white">{notification.text}</p>
                            <p className="text-sm text-slate-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-slate-700">
                    <button className="w-full text-center text-green-400 hover:text-green-300 text-sm font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setOpen(open === "user" ? null : "user")}
                className="flex items-center space-x-3 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-all"
                aria-label="User menu"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-slate-600"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {user.role || "Administrator"}
                  </div>
                </div>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    open === "user" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* User Dropdown */}
              {open === "user" && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-slate-700">
                    <div className="flex items-center space-x-3">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full border-2 border-slate-600"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                          <span className="text-white font-bold">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-white">
                          {user.name}
                        </h4>
                        <p className="text-sm text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <a
                      href="/profile"
                      className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>My Profile</span>
                    </a>
                    <a
                      href="/settings"
                      className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </a>
                    <a
                      href="/help"
                      className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                    >
                      <HelpCircle className="w-5 h-5" />
                      <span>Help & Support</span>
                    </a>
                  </div>
                  <div className="p-2 border-t border-slate-700">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-900/20 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Overlay for dropdowns */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(null)} />
      )}
    </div>
  );
};

export default AdminTop;
