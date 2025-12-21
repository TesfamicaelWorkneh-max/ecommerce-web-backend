import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaChevronDown,
  FaUser,
  FaBell,
  FaSearch,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../Components/ThemeToggle";
import { authContext } from "../Context/authContext";
import { cartContext } from "../Context/cartContext";
import { initSocket } from "../utils/socket";
import { fetchWithAuth } from "../utils/auth";
import logo from "/src/assets/Logo.png";

const API = "http://localhost:3000";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartPulse, setCartPulse] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(authContext);
  const { cart } = useContext(cartContext);

  // Fetch categories dynamically from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetchWithAuth(`${API}/api/categories`);
        const data = await res.json();
        setCategories(data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart pulse animation
  useEffect(() => {
    if (cart?.items?.length > 0) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [cart?.items]);

  // Fetch initial unread count
  useEffect(() => {
    if (!user) return;
    fetchUnreadCount();
  }, [user]);

  // Notifications socket - EXACT SAME LOGIC AS YOUR NOTIFICATIONS PAGE
  useEffect(() => {
    if (!user) return;

    const s = initSocket(user._id);

    const onNotif = (notif) => {
      playSound();
      setUnreadCount((prev) => prev + 1);
    };

    s.on("notification", onNotif);

    // Poll for new notifications every 10 seconds
    const poll = setInterval(fetchUnreadCount, 10000);

    return () => {
      s.off("notification", onNotif);
      clearInterval(poll);
    };
  }, [user]);

  const fetchUnreadCount = async () => {
    if (!user) return;
    try {
      const res = await fetchWithAuth(`${API}/api/notifications`);
      if (!res.ok) return;
      const data = await res.json();
      // Count unread notifications
      const unread = data.filter((n) => !n.read).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error(err);
    }
  };

  const playSound = () => {
    try {
      const audio = new Audio(
        "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
      );
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (e) {
      console.error(e);
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "About-us", path: "/about" },
    { name: "Contact-us", path: "/contact" },
    { name: "Return-policy", path: "/policy" },
  ];

  const toggleDropdown = (key) =>
    setOpenDropdown(openDropdown === key ? null : key);

  const handleCategoryClick = (path) => {
    navigate(path);
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const cartItemCount =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <>
      {/* Navigation Container */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="fixed top-0 w-full z-50 transition-all duration-300"
      >
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-[#E1A95F]/20 via-[#d4a259]/20 to-[#c5954d]/20 py-2 px-4 text-center">
          <p className="text-xs text-white/90 font-medium">
            🚚{" "}
            <span className="text-[#E1A95F] font-semibold">Free Shipping</span>{" "}
            on orders over $100 •
            <span className="text-green-300 font-semibold ml-2">
              🎁 30% OFF
            </span>{" "}
            for new customers
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-28 md:w-32 h-auto drop-shadow-lg"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1">
              {links.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 font-medium ${
                      location.pathname === link.path
                        ? "text-[#E1A95F] bg-[#E1A95F]/10"
                        : "text-slate-200 hover:text-[#E1A95F] hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-4 right-4 h-0.5 bottom-1.5 bg-[#E1A95F] rounded-full"
                      />
                    )}
                  </Link>
                </motion.li>
              ))}

              {/* Dynamic Shop Dropdown */}
              <motion.li className="relative">
                <button
                  onClick={() => toggleDropdown("shop")}
                  className={`flex items-center gap-2 px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 font-medium ${
                    openDropdown === "shop"
                      ? "text-[#E1A95F] bg-[#E1A95F]/10"
                      : "text-slate-200 hover:text-[#E1A95F] hover:bg-white/5"
                  }`}
                >
                  Shop
                  <motion.span
                    animate={{ rotate: openDropdown === "shop" ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-sm" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openDropdown === "shop" && (
                    <motion.div
                      className="absolute left-0 top-full mt-2 min-w-[220px] bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700 p-3"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="space-y-2">
                        {categories.map((cat, i) => (
                          <motion.button
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.05 }}
                            onClick={() =>
                              handleCategoryClick(
                                `/category/${cat.name.toLowerCase()}`
                              )
                            }
                            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-300 hover:text-[#E1A95F] hover:bg-slate-800/50 transition-all duration-300 flex items-center gap-3 group"
                          >
                            <div className="w-2 h-2 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F] transition-all duration-300"></div>
                            <span className="font-medium">{cat.name}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>

              <li className="ml-2">
                <ThemeToggle />
              </li>
            </ul>

            {/* Right Icons */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Search */}
              <div ref={searchRef} className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
                >
                  <FaSearch className="text-slate-300 group-hover:text-[#E1A95F] text-lg transition-colors duration-300" />
                </motion.button>

                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700 p-4"
                    >
                      <form onSubmit={handleSearch} className="space-y-3">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search products, brands, categories..."
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="w-full py-2.5 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300"
                        >
                          Search Products
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notifications - USING YOUR EXACT LOGIC */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative cursor-pointer group"
                onClick={() => navigate("/notifications")}
              >
                <div className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">
                  <FaBell className="text-slate-300 group-hover:text-[#E1A95F] text-lg transition-colors duration-300" />
                </div>
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg min-w-[22px] text-center"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </motion.span>
                )}
              </motion.div>

              {/* Cart */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative cursor-pointer group"
                onClick={() => navigate("/cart")}
              >
                <div
                  className={`p-2.5 rounded-xl border transition-all duration-300 ${
                    cartPulse
                      ? "bg-[#E1A95F]/20 border-[#E1A95F]/30"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <FaShoppingCart className="text-[#E1A95F] text-lg group-hover:scale-110 transition-transform duration-300" />
                </div>
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute -top-1.5 -right-1.5 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg ${
                      cartItemCount > 9
                        ? "bg-gradient-to-r from-red-500 to-pink-500"
                        : "bg-gradient-to-r from-green-500 to-emerald-500"
                    }`}
                  >
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </motion.span>
                )}
              </motion.div>

              {/* User */}
              {user && (
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <FaUser className="text-[#E1A95F] text-lg group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        className="absolute right-0 top-full mt-2 w-56 bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700 p-4"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="space-y-3">
                          <div className="pb-3 border-b border-slate-700">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center text-white font-bold text-lg">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-bold text-white">
                                  Hi, {user.name}
                                </div>
                                <div className="text-xs text-slate-400">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </div>

                          <Link
                            to="/my-orders"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-[#E1A95F] hover:bg-slate-800/50 transition-all duration-300 group"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <div className="w-1.5 h-1.5 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F]"></div>
                            <span>My Orders</span>
                          </Link>

                          {user.role === "admin" && (
                            <Link
                              to="/admin"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-green-400 hover:text-green-300 hover:bg-slate-800/50 transition-all duration-300 group"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full group-hover:bg-green-500"></div>
                              <span>Admin Panel</span>
                            </Link>
                          )}

                          <button
                            onClick={() => {
                              logout();
                              setUserMenuOpen(false);
                            }}
                            className="w-full mt-2 py-2.5 bg-gradient-to-r from-red-600/10 to-pink-600/10 hover:from-red-600/20 hover:to-pink-600/20 text-red-400 hover:text-red-300 rounded-xl font-medium transition-all duration-300 border border-red-500/20 flex items-center justify-center gap-2"
                          >
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
              >
                {menuOpen ? (
                  <FaTimes className="text-[#E1A95F] text-xl" />
                ) : (
                  <FaBars className="text-slate-300 text-xl" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm z-50 lg:hidden"
            >
              <div className="h-full bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl overflow-y-auto">
                {/* Mobile Header */}
                <div className="p-6 border-b border-slate-700">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <img src={logo} alt="Logo" className="w-10 h-10" />
                      <h2 className="text-2xl font-bold text-white">Menu</h2>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setMenuOpen(false)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <FaTimes className="text-[#E1A95F] text-xl" />
                    </motion.button>
                  </div>

                  {/* User Info Mobile */}
                  {user && (
                    <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-gradient-to-r from-[#E1A95F]/10 to-[#d4a259]/10 border border-[#E1A95F]/20">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center text-white font-bold text-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-white">{user.name}</div>
                        <div className="text-sm text-slate-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Links */}
                <div className="p-6 space-y-2">
                  {links.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                        location.pathname === link.path
                          ? "bg-gradient-to-r from-[#E1A95F]/20 to-[#d4a259]/20 text-[#E1A95F]"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          location.pathname === link.path
                            ? "bg-[#E1A95F]"
                            : "bg-slate-600"
                        }`}
                      ></div>
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  ))}

                  {/* Shop Section Mobile */}
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleDropdown("shop-mobile")}
                      className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                        <span className="font-medium">Shop</span>
                      </div>
                      <FaChevronDown
                        className={`transition ${
                          openDropdown === "shop-mobile" ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openDropdown === "shop-mobile" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 pl-4 border-l border-slate-700 space-y-2"
                        >
                          {categories.map((cat, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                navigate(`/category/${cat.name.toLowerCase()}`);
                                setMenuOpen(false);
                              }}
                              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-slate-400 hover:text-[#E1A95F] hover:bg-slate-800/50 transition-all duration-300 text-left"
                            >
                              <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                              <span>{cat.name}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Theme Toggle Mobile */}
                  <div className="mt-6 pt-6 border-t border-slate-700">
                    <div className="flex items-center justify-between px-4">
                      <span className="text-slate-300 font-medium">Theme</span>
                      <ThemeToggle />
                    </div>
                  </div>
                </div>

                {/* Mobile Footer */}
                <div className="p-6 border-t border-slate-700 mt-auto">
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        navigate("/notifications");
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <FaBell className="text-[#E1A95F]" />
                        <span>Notifications</span>
                      </div>
                      {unreadCount > 0 && (
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-xs font-bold px-2 py-1 rounded-full text-white">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      )}
                    </button>

                    {user && user.role === "admin" && (
                      <button
                        onClick={() => {
                          navigate("/admin");
                          setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 text-green-400 hover:text-green-300 transition-all duration-300"
                      >
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>Admin Panel</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E1A95F] via-[#d4a259] to-[#E1A95F] z-50"
        style={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
};

export default Navigation;

// import React, { useState, useContext, useEffect, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   FaBars,
//   FaTimes,
//   FaShoppingCart,
//   FaChevronDown,
//   FaUser,
//   FaBell,
//   FaSearch,
//   FaSpinner,
//   FaTimesCircle,
//   FaBox,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import ThemeToggle from "../Components/ThemeToggle";
// import { authContext } from "../Context/authContext";
// import { cartContext } from "../Context/cartContext";
// import { initSocket } from "../utils/socket";
// import { fetchWithAuth } from "../utils/auth";
// import logo from "/src/assets/Logo.png";

// const API = "http://localhost:3000";

// const Navigation = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [scrolled, setScrolled] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [recentSearches, setRecentSearches] = useState([]);
//   const [popularSearches, setPopularSearches] = useState([]);
//   const [searchHistoryOpen, setSearchHistoryOpen] = useState(false);
//   const searchRef = useRef(null);
//   const searchInputRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout } = useContext(authContext);
//   const { cart } = useContext(cartContext);

//   // Fetch categories dynamically from backend
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetchWithAuth(`${API}/api/categories`);
//         const data = await res.json();
//         setCategories(data || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch popular searches
//   useEffect(() => {
//     const fetchPopularSearches = async () => {
//       try {
//         const res = await fetchWithAuth(`${API}/api/products/popular-searches`);
//         if (res.ok) {
//           const data = await res.json();
//           setPopularSearches(data || []);
//         }
//       } catch (err) {
//         console.error("Failed to fetch popular searches:", err);
//       }
//     };
//     fetchPopularSearches();
//   }, []);

//   // Load recent searches from localStorage
//   useEffect(() => {
//     const savedSearches = localStorage.getItem("recentSearches");
//     if (savedSearches) {
//       setRecentSearches(JSON.parse(savedSearches));
//     }
//   }, []);

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Cart pulse animation
//   useEffect(() => {
//     if (cart?.items?.length > 0) {
//       const timer = setTimeout(() => {}, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [cart?.items]);

//   // Fetch initial unread count
//   useEffect(() => {
//     if (!user) return;
//     fetchUnreadCount();
//   }, [user]);

//   // Notifications socket
//   useEffect(() => {
//     if (!user) return;

//     const s = initSocket(user._id);

//     const onNotif = (notif) => {
//       playSound();
//       setUnreadCount((prev) => prev + 1);
//     };

//     s.on("notification", onNotif);

//     const poll = setInterval(fetchUnreadCount, 10000);

//     return () => {
//       s.off("notification", onNotif);
//       clearInterval(poll);
//     };
//   }, [user]);

//   const fetchUnreadCount = async () => {
//     if (!user) return;
//     try {
//       const res = await fetchWithAuth(`${API}/api/notifications`);
//       if (!res.ok) return;
//       const data = await res.json();
//       const unread = data.filter((n) => !n.read).length;
//       setUnreadCount(unread);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const playSound = () => {
//     try {
//       const audio = new Audio(
//         "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
//       );
//       audio.volume = 0.3;
//       audio.play().catch(() => {});
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   // Search products function
//   const searchProducts = async (query) => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       return;
//     }

//     setIsSearching(true);
//     try {
//       const res = await fetchWithAuth(
//         `${API}/api/products/search?q=${encodeURIComponent(query)}`
//       );
//       if (res.ok) {
//         const data = await res.json();
//         setSearchResults(data);

//         // Add to recent searches if not already present
//         if (data.length > 0) {
//           addToRecentSearches(query);
//         }
//       } else {
//         setSearchResults([]);
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//       setSearchResults([]);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   // Debounced search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchQuery.trim()) {
//         searchProducts(searchQuery);
//       } else {
//         setSearchResults([]);
//       }
//     }, 300); // 300ms debounce

//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   // Add to recent searches
//   const addToRecentSearches = (query) => {
//     const updatedSearches = [
//       query,
//       ...recentSearches.filter((s) => s !== query),
//     ].slice(0, 5); // Keep only 5 most recent

//     setRecentSearches(updatedSearches);
//     localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
//   };

//   // Clear recent searches
//   const clearRecentSearches = () => {
//     setRecentSearches([]);
//     localStorage.removeItem("recentSearches");
//   };

//   // Handle search submission
//   const handleSearch = (e, query = null) => {
//     e?.preventDefault();
//     const searchTerm = query || searchQuery.trim();

//     if (searchTerm) {
//       addToRecentSearches(searchTerm);
//       navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
//       setSearchOpen(false);
//       setSearchQuery("");
//       setSearchResults([]);
//     }
//   };

//   // Handle quick category search
//   const handleCategorySearch = (categoryName) => {
//     navigate(`/search?category=${encodeURIComponent(categoryName)}`);
//     setSearchOpen(false);
//   };

//   // Close search when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setSearchOpen(false);
//         setSearchHistoryOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Focus search input when search opens
//   useEffect(() => {
//     if (searchOpen && searchInputRef.current) {
//       setTimeout(() => {
//         searchInputRef.current.focus();
//       }, 100);
//     }
//   }, [searchOpen]);

//   const links = [
//     { name: "Home", path: "/" },
//     { name: "About-us", path: "/about" },
//     { name: "Contact-us", path: "/contact" },
//     { name: "Return-policy", path: "/policy" },
//   ];

//   const toggleDropdown = (key) =>
//     setOpenDropdown(openDropdown === key ? null : key);

//   const handleCategoryClick = (path) => {
//     navigate(path);
//     setMenuOpen(false);
//     setOpenDropdown(null);
//   };

//   const cartItemCount =
//     cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

//   return (
//     <>
//       {/* Navigation Container */}
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5, type: "spring" }}
//         className="fixed top-0 w-full z-50 transition-all duration-300"
//       >
//         {/* Top Announcement Bar */}
//         <div className="bg-gradient-to-r from-[#E1A95F]/20 via-[#d4a259]/20 to-[#c5954d]/20 py-2 px-4 text-center">
//           <p className="text-xs text-white/90 font-medium">
//             🚚{" "}
//             <span className="text-[#E1A95F] font-semibold">Free Shipping</span>{" "}
//             on orders over $100 •
//             <span className="text-green-300 font-semibold ml-2">
//               🎁 30% OFF
//             </span>{" "}
//             for new customers
//           </p>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center"
//             >
//               <Link to="/" className="flex items-center">
//                 <img
//                   src={logo}
//                   alt="Logo"
//                   className="w-28 md:w-32 h-auto drop-shadow-lg"
//                 />
//               </Link>
//             </motion.div>

//             {/* Desktop Navigation */}
//             <ul className="hidden lg:flex items-center gap-1">
//               {links.map((link, index) => (
//                 <motion.li
//                   key={index}
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="relative"
//                 >
//                   <Link
//                     to={link.path}
//                     className={`relative px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 font-medium ${
//                       location.pathname === link.path
//                         ? "text-[#E1A95F] bg-[#E1A95F]/10"
//                         : "text-slate-200 hover:text-[#E1A95F] hover:bg-white/5"
//                     }`}
//                   >
//                     {link.name}
//                     {location.pathname === link.path && (
//                       <motion.div
//                         layoutId="underline"
//                         className="absolute left-4 right-4 h-0.5 bottom-1.5 bg-[#E1A95F] rounded-full"
//                       />
//                     )}
//                   </Link>
//                 </motion.li>
//               ))}

//               {/* Dynamic Shop Dropdown */}
//               <motion.li className="relative">
//                 <button
//                   onClick={() => toggleDropdown("shop")}
//                   className={`flex items-center gap-2 px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 font-medium ${
//                     openDropdown === "shop"
//                       ? "text-[#E1A95F] bg-[#E1A95F]/10"
//                       : "text-slate-200 hover:text-[#E1A95F] hover:bg-white/5"
//                   }`}
//                 >
//                   Shop
//                   <motion.span
//                     animate={{ rotate: openDropdown === "shop" ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <FaChevronDown className="text-sm" />
//                   </motion.span>
//                 </button>
//                 <AnimatePresence>
//                   {openDropdown === "shop" && (
//                     <motion.div
//                       className="absolute left-0 top-full mt-2 min-w-[220px] bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700 p-3"
//                       initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <div className="space-y-2">
//                         {categories.map((cat, i) => (
//                           <motion.button
//                             key={i}
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.2, delay: i * 0.05 }}
//                             onClick={() =>
//                               handleCategoryClick(
//                                 `/category/${cat.name.toLowerCase()}`
//                               )
//                             }
//                             className="w-full text-left px-3 py-2.5 rounded-lg text-slate-300 hover:text-[#E1A95F] hover:bg-slate-800/50 transition-all duration-300 flex items-center gap-3 group"
//                           >
//                             <div className="w-2 h-2 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F] transition-all duration-300"></div>
//                             <span className="font-medium">{cat.name}</span>
//                           </motion.button>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.li>

//               <li className="ml-2">
//                 <ThemeToggle />
//               </li>
//             </ul>

//             {/* Right Icons */}
//             <div className="flex items-center gap-3 md:gap-4">
//               {/* Enhanced Search */}
//               <div ref={searchRef} className="relative">
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => {
//                     setSearchOpen(!searchOpen);
//                     setSearchHistoryOpen(true);
//                   }}
//                   className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
//                 >
//                   <FaSearch className="text-slate-300 group-hover:text-[#E1A95F] text-lg transition-colors duration-300" />
//                 </motion.button>

//                 <AnimatePresence>
//                   {searchOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.9, y: 10 }}
//                       animate={{ opacity: 1, scale: 1, y: 0 }}
//                       exit={{ opacity: 0, scale: 0.9, y: 10 }}
//                       className="absolute right-0 top-full mt-2 w-96 bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700 overflow-hidden z-50"
//                     >
//                       {/* Search Input */}
//                       <div className="p-4 border-b border-slate-700">
//                         <form onSubmit={handleSearch} className="relative">
//                           <div className="relative">
//                             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
//                             <input
//                               ref={searchInputRef}
//                               type="text"
//                               value={searchQuery}
//                               onChange={(e) => setSearchQuery(e.target.value)}
//                               onFocus={() => setSearchHistoryOpen(true)}
//                               placeholder="Search products, brands, categories..."
//                               className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
//                             />
//                             {searchQuery && (
//                               <button
//                                 type="button"
//                                 onClick={() => {
//                                   setSearchQuery("");
//                                   setSearchResults([]);
//                                 }}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
//                               >
//                                 <FaTimesCircle />
//                               </button>
//                             )}
//                           </div>
//                           {isSearching && (
//                             <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                               <FaSpinner className="animate-spin text-[#E1A95F]" />
//                             </div>
//                           )}
//                         </form>
//                       </div>

//                       {/* Search Content */}
//                       <div className="max-h-96 overflow-y-auto">
//                         {/* Recent Searches */}
//                         {searchHistoryOpen &&
//                           recentSearches.length > 0 &&
//                           !searchQuery && (
//                             <div className="p-4 border-b border-slate-700">
//                               <div className="flex items-center justify-between mb-3">
//                                 <h3 className="text-sm font-semibold text-slate-400">
//                                   Recent Searches
//                                 </h3>
//                                 <button
//                                   onClick={clearRecentSearches}
//                                   className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
//                                 >
//                                   Clear All
//                                 </button>
//                               </div>
//                               <div className="space-y-2">
//                                 {recentSearches.map((search, index) => (
//                                   <button
//                                     key={index}
//                                     onClick={() => {
//                                       setSearchQuery(search);
//                                       handleSearch(null, search);
//                                     }}
//                                     className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-300 group"
//                                   >
//                                     <div className="flex items-center gap-3">
//                                       <FaSearch className="text-slate-500 text-sm group-hover:text-[#E1A95F]" />
//                                       <span className="text-slate-300 group-hover:text-white">
//                                         {search}
//                                       </span>
//                                     </div>
//                                     <FaTimesCircle
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         const updated = recentSearches.filter(
//                                           (_, i) => i !== index
//                                         );
//                                         setRecentSearches(updated);
//                                         localStorage.setItem(
//                                           "recentSearches",
//                                           JSON.stringify(updated)
//                                         );
//                                       }}
//                                       className="text-slate-600 hover:text-slate-400 text-sm opacity-0 group-hover:opacity-100 transition-all"
//                                     />
//                                   </button>
//                                 ))}
//                               </div>
//                             </div>
//                           )}

//                         {/* Popular Searches */}
//                         {searchHistoryOpen &&
//                           popularSearches.length > 0 &&
//                           !searchQuery && (
//                             <div className="p-4 border-b border-slate-700">
//                               <h3 className="text-sm font-semibold text-slate-400 mb-3">
//                                 Popular Searches
//                               </h3>
//                               <div className="flex flex-wrap gap-2">
//                                 {popularSearches.map((search, index) => (
//                                   <button
//                                     key={index}
//                                     onClick={() => {
//                                       setSearchQuery(search);
//                                       handleSearch(null, search);
//                                     }}
//                                     className="px-3 py-1.5 bg-slate-800/50 hover:bg-[#E1A95F]/20 text-slate-300 hover:text-[#E1A95F] rounded-lg text-sm transition-all duration-300 border border-slate-700 hover:border-[#E1A95F]/30"
//                                   >
//                                     {search}
//                                   </button>
//                                 ))}
//                               </div>
//                             </div>
//                           )}

//                         {/* Quick Categories */}
//                         {searchHistoryOpen &&
//                           categories.length > 0 &&
//                           !searchQuery && (
//                             <div className="p-4">
//                               <h3 className="text-sm font-semibold text-slate-400 mb-3">
//                                 Browse Categories
//                               </h3>
//                               <div className="grid grid-cols-2 gap-2">
//                                 {categories
//                                   .slice(0, 6)
//                                   .map((category, index) => (
//                                     <button
//                                       key={index}
//                                       onClick={() =>
//                                         handleCategorySearch(category.name)
//                                       }
//                                       className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/70 transition-all duration-300 group"
//                                     >
//                                       <FaBox className="text-slate-500 text-sm group-hover:text-[#E1A95F]" />
//                                       <span className="text-slate-300 text-sm truncate">
//                                         {category.name}
//                                       </span>
//                                     </button>
//                                   ))}
//                               </div>
//                             </div>
//                           )}

//                         {/* Search Results */}
//                         {searchQuery && (
//                           <div className="p-4">
//                             <div className="flex items-center justify-between mb-3">
//                               <h3 className="text-sm font-semibold text-slate-400">
//                                 {searchResults.length > 0
//                                   ? `Found ${searchResults.length} results`
//                                   : "No results found"}
//                               </h3>
//                               {searchResults.length > 0 && (
//                                 <button
//                                   onClick={(e) => handleSearch(e)}
//                                   className="text-xs text-[#E1A95F] hover:text-[#d4a259] font-medium"
//                                 >
//                                   See all results →
//                                 </button>
//                               )}
//                             </div>

//                             {searchResults.length > 0 ? (
//                               <div className="space-y-3">
//                                 {searchResults.slice(0, 5).map((product) => (
//                                   <Link
//                                     key={product._id}
//                                     to={`/product/${product._id}`}
//                                     onClick={() => {
//                                       setSearchOpen(false);
//                                       setSearchQuery("");
//                                     }}
//                                     className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-300 group"
//                                   >
//                                     <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center overflow-hidden">
//                                       {product.images?.[0] ? (
//                                         <img
//                                           src={product.images[0]}
//                                           alt={product.name}
//                                           className="w-full h-full object-cover"
//                                         />
//                                       ) : (
//                                         <FaBox className="text-slate-500" />
//                                       )}
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                       <h4 className="text-sm font-medium text-white truncate group-hover:text-[#E1A95F]">
//                                         {product.name}
//                                       </h4>
//                                       <p className="text-xs text-slate-400 truncate">
//                                         {product.category?.name ||
//                                           "Uncategorized"}
//                                       </p>
//                                       <p className="text-sm font-semibold text-[#E1A95F] mt-1">
//                                         ${product.price}
//                                       </p>
//                                     </div>
//                                   </Link>
//                                 ))}
//                               </div>
//                             ) : !isSearching ? (
//                               <div className="text-center py-6">
//                                 <div className="w-12 h-12 mx-auto rounded-full bg-slate-800/50 flex items-center justify-center mb-3">
//                                   <FaSearch className="text-slate-500" />
//                                 </div>
//                                 <p className="text-slate-400 text-sm">
//                                   No products found for "{searchQuery}"
//                                 </p>
//                                 <p className="text-slate-500 text-xs mt-2">
//                                   Try different keywords or check spelling
//                                 </p>
//                               </div>
//                             ) : null}
//                           </div>
//                         )}
//                       </div>

//                       {/* Search Footer */}
//                       {searchQuery && (
//                         <div className="p-4 border-t border-slate-700 bg-slate-900/50">
//                           <button
//                             onClick={(e) => handleSearch(e)}
//                             className="w-full py-2.5 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300 flex items-center justify-center gap-2"
//                           >
//                             <FaSearch />
//                             Search for "{searchQuery}"
//                           </button>
//                         </div>
//                       )}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Notifications */}
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="relative cursor-pointer group"
//                 onClick={() => navigate("/notifications")}
//               >
//                 <div className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">
//                   <FaBell className="text-slate-300 group-hover:text-[#E1A95F] text-lg transition-colors duration-300" />
//                 </div>
//                 {unreadCount > 0 && (
//                   <motion.span
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg min-w-[22px] text-center"
//                   >
//                     {unreadCount > 9 ? "9+" : unreadCount}
//                   </motion.span>
//                 )}
//               </motion.div>

//               {/* Cart */}
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="relative cursor-pointer group"
//                 onClick={() => navigate("/cart")}
//               >
//                 <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
//                   <FaShoppingCart className="text-[#E1A95F] text-lg group-hover:scale-110 transition-transform duration-300" />
//                 </div>
//                 {cartItemCount > 0 && (
//                   <motion.span
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     className={`absolute -top-1.5 -right-1.5 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg ${
//                       cartItemCount > 9
//                         ? "bg-gradient-to-r from-red-500 to-pink-500"
//                         : "bg-gradient-to-r from-green-500 to-emerald-500"
//                     }`}
//                   >
//                     {cartItemCount > 9 ? "9+" : cartItemCount}
//                   </motion.span>
//                 )}
//               </motion.div>

//               {/* User */}
//               {user && (
//                 <div className="relative">
//                   <motion.div
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="cursor-pointer p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
//                     onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   >
//                     <FaUser className="text-[#E1A95F] text-lg group-hover:scale-110 transition-transform duration-300" />
//                   </motion.div>
//                   <AnimatePresence>
//                     {userMenuOpen && (
//                       <motion.div
//                         className="absolute right-0 top-full mt-2 w-56 bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700 p-4"
//                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <div className="space-y-3">
//                           <div className="pb-3 border-b border-slate-700">
//                             <div className="flex items-center gap-3">
//                               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center text-white font-bold text-lg">
//                                 {user.name.charAt(0).toUpperCase()}
//                               </div>
//                               <div>
//                                 <div className="font-bold text-white">
//                                   Hi, {user.name}
//                                 </div>
//                                 <div className="text-xs text-slate-400">
//                                   {user.email}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           <Link
//                             to="/my-orders"
//                             className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-[#E1A95F] hover:bg-slate-800/50 transition-all duration-300 group"
//                             onClick={() => setUserMenuOpen(false)}
//                           >
//                             <div className="w-1.5 h-1.5 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F]"></div>
//                             <span>My Orders</span>
//                           </Link>

//                           {user.role === "admin" && (
//                             <Link
//                               to="/admin"
//                               className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-green-400 hover:text-green-300 hover:bg-slate-800/50 transition-all duration-300 group"
//                               onClick={() => setUserMenuOpen(false)}
//                             >
//                               <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full group-hover:bg-green-500"></div>
//                               <span>Admin Panel</span>
//                             </Link>
//                           )}

//                           <button
//                             onClick={() => {
//                               logout();
//                               setUserMenuOpen(false);
//                             }}
//                             className="w-full mt-2 py-2.5 bg-gradient-to-r from-red-600/10 to-pink-600/10 hover:from-red-600/20 hover:to-pink-600/20 text-red-400 hover:text-red-300 rounded-xl font-medium transition-all duration-300 border border-red-500/20 flex items-center justify-center gap-2"
//                           >
//                             <span>Sign Out</span>
//                           </button>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               )}

//               {/* Mobile Menu Button */}
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
//               >
//                 {menuOpen ? (
//                   <FaTimes className="text-[#E1A95F] text-xl" />
//                 ) : (
//                   <FaBars className="text-slate-300 text-xl" />
//                 )}
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {menuOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setMenuOpen(false)}
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
//             />

//             {/* Mobile Menu Panel */}
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25 }}
//               className="fixed top-0 right-0 h-full w-full max-w-sm z-50 lg:hidden"
//             >
//               <div className="h-full bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl overflow-y-auto">
//                 {/* Mobile Header */}
//                 <div className="p-6 border-b border-slate-700">
//                   <div className="flex items-center justify-between mb-6">
//                     <div className="flex items-center gap-3">
//                       <img src={logo} alt="Logo" className="w-10 h-10" />
//                       <h2 className="text-2xl font-bold text-white">Menu</h2>
//                     </div>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => setMenuOpen(false)}
//                       className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
//                     >
//                       <FaTimes className="text-[#E1A95F] text-xl" />
//                     </motion.button>
//                   </div>

//                   {/* User Info Mobile */}
//                   {user && (
//                     <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-gradient-to-r from-[#E1A95F]/10 to-[#d4a259]/10 border border-[#E1A95F]/20">
//                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center text-white font-bold text-lg">
//                         {user.name.charAt(0).toUpperCase()}
//                       </div>
//                       <div>
//                         <div className="font-bold text-white">{user.name}</div>
//                         <div className="text-sm text-slate-400">
//                           {user.email}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Mobile Links */}
//                 <div className="p-6 space-y-2">
//                   {links.map((link, index) => (
//                     <Link
//                       key={index}
//                       to={link.path}
//                       onClick={() => setMenuOpen(false)}
//                       className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
//                         location.pathname === link.path
//                           ? "bg-gradient-to-r from-[#E1A95F]/20 to-[#d4a259]/20 text-[#E1A95F]"
//                           : "text-slate-300 hover:text-white hover:bg-slate-800"
//                       }`}
//                     >
//                       <div
//                         className={`w-1.5 h-1.5 rounded-full ${
//                           location.pathname === link.path
//                             ? "bg-[#E1A95F]"
//                             : "bg-slate-600"
//                         }`}
//                       ></div>
//                       <span className="font-medium">{link.name}</span>
//                     </Link>
//                   ))}

//                   {/* Shop Section Mobile */}
//                   <div className="space-y-2">
//                     <button
//                       onClick={() => toggleDropdown("shop-mobile")}
//                       className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
//                         <span className="font-medium">Shop</span>
//                       </div>
//                       <FaChevronDown
//                         className={`transition ${
//                           openDropdown === "shop-mobile" ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>

//                     <AnimatePresence>
//                       {openDropdown === "shop-mobile" && (
//                         <motion.div
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           className="ml-4 pl-4 border-l border-slate-700 space-y-2"
//                         >
//                           {categories.map((cat, i) => (
//                             <button
//                               key={i}
//                               onClick={() => {
//                                 navigate(`/category/${cat.name.toLowerCase()}`);
//                                 setMenuOpen(false);
//                               }}
//                               className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-slate-400 hover:text-[#E1A95F] hover:bg-slate-800/50 transition-all duration-300 text-left"
//                             >
//                               <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
//                               <span>{cat.name}</span>
//                             </button>
//                           ))}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   {/* Theme Toggle Mobile */}
//                   <div className="mt-6 pt-6 border-t border-slate-700">
//                     <div className="flex items-center justify-between px-4">
//                       <span className="text-slate-300 font-medium">Theme</span>
//                       <ThemeToggle />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Mobile Footer */}
//                 <div className="p-6 border-t border-slate-700 mt-auto">
//                   <div className="space-y-3">
//                     <button
//                       onClick={() => {
//                         navigate("/notifications");
//                         setMenuOpen(false);
//                       }}
//                       className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all duration-300"
//                     >
//                       <div className="flex items-center gap-3">
//                         <FaBell className="text-[#E1A95F]" />
//                         <span>Notifications</span>
//                       </div>
//                       {unreadCount > 0 && (
//                         <span className="bg-gradient-to-r from-red-500 to-pink-500 text-xs font-bold px-2 py-1 rounded-full text-white">
//                           {unreadCount > 9 ? "9+" : unreadCount}
//                         </span>
//                       )}
//                     </button>

//                     {user && user.role === "admin" && (
//                       <button
//                         onClick={() => {
//                           navigate("/admin");
//                           setMenuOpen(false);
//                         }}
//                         className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 text-green-400 hover:text-green-300 transition-all duration-300"
//                       >
//                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
//                         <span>Admin Panel</span>
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Scroll Progress Bar */}
//       <motion.div
//         className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E1A95F] via-[#d4a259] to-[#E1A95F] z-50"
//         style={{ scaleX: scrolled ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//       />
//     </>
//   );
// };

// export default Navigation;

// import React, { useState, useContext, useEffect, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   FaBars,
//   FaTimes,
//   FaShoppingCart,
//   FaChevronDown,
//   FaUser,
//   FaBell,
//   FaSearch,
//   FaSpinner,
//   FaTimesCircle,
//   FaBox,
//   FaTag,
//   FaFire,
//   FaHistory,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import ThemeToggle from "../Components/ThemeToggle";
// import { authContext } from "../Context/authContext";
// import { cartContext } from "../Context/cartContext";
// import { initSocket } from "../utils/socket";
// import { fetchWithAuth } from "../utils/auth";
// import logo from "/src/assets/Logo.png";

// const API = "http://localhost:3000";

// const Navigation = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [allCategories, setAllCategories] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [scrolled, setScrolled] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [recentSearches, setRecentSearches] = useState([]);
//   const [popularSearches, setPopularSearches] = useState([]);
//   const [searchHistoryOpen, setSearchHistoryOpen] = useState(true);
//   const [showAllCategories, setShowAllCategories] = useState(false);
//   const searchRef = useRef(null);
//   const searchInputRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout } = useContext(authContext);
//   const { cart } = useContext(cartContext);

//   // Fetch categories for dropdown
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetchWithAuth(`${API}/api/categories`);
//         const data = await res.json();
//         setCategories(data || []);
//       } catch (err) {
//         console.error("Categories fetch error:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch all categories for search
//   useEffect(() => {
//     const fetchAllCategories = async () => {
//       try {
//         const res = await fetchWithAuth(
//           `${API}/api/products/categories-for-search`
//         );
//         if (res.ok) {
//           const data = await res.json();
//           setAllCategories(data);
//         }
//       } catch (err) {
//         console.error("All categories fetch error:", err);
//       }
//     };
//     fetchAllCategories();
//   }, []);

//   // Fetch popular searches
//   useEffect(() => {
//     const fetchPopularSearches = async () => {
//       try {
//         const res = await fetchWithAuth(`${API}/api/products/popular-searches`);
//         if (res.ok) {
//           const data = await res.json();
//           setPopularSearches(data || []);
//         }
//       } catch (err) {
//         console.error("Popular searches error:", err);
//       }
//     };
//     fetchPopularSearches();
//   }, []);

//   // Load recent searches
//   useEffect(() => {
//     const savedSearches = localStorage.getItem("Adescart_recent_searches");
//     if (savedSearches) {
//       try {
//         setRecentSearches(JSON.parse(savedSearches));
//       } catch (e) {
//         console.error("Error parsing recent searches:", e);
//       }
//     }
//   }, []);

//   // Save recent searches
//   const saveRecentSearches = (searches) => {
//     setRecentSearches(searches);
//     localStorage.setItem("Adescart_recent_searches", JSON.stringify(searches));
//   };

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Cart pulse animation
//   useEffect(() => {
//     if (cart?.items?.length > 0) {
//       const timer = setTimeout(() => {}, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [cart?.items]);

//   // Fetch initial unread count
//   useEffect(() => {
//     if (!user) return;
//     fetchUnreadCount();
//   }, [user]);

//   // Notifications socket
//   useEffect(() => {
//     if (!user) return;

//     const s = initSocket(user._id);

//     const onNotif = (notif) => {
//       playSound();
//       setUnreadCount((prev) => prev + 1);
//     };

//     s.on("notification", onNotif);

//     const poll = setInterval(fetchUnreadCount, 10000);

//     return () => {
//       s.off("notification", onNotif);
//       clearInterval(poll);
//     };
//   }, [user]);

//   const fetchUnreadCount = async () => {
//     if (!user) return;
//     try {
//       const res = await fetchWithAuth(`${API}/api/notifications`);
//       if (!res.ok) return;
//       const data = await res.json();
//       const unread = data.filter((n) => !n.read).length;
//       setUnreadCount(unread);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const playSound = () => {
//     try {
//       const audio = new Audio(
//         "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
//       );
//       audio.volume = 0.3;
//       audio.play().catch(() => {});
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   // Close search when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setSearchOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Focus search input when search opens
//   useEffect(() => {
//     if (searchOpen && searchInputRef.current) {
//       setTimeout(() => {
//         searchInputRef.current.focus();
//         setSearchHistoryOpen(true);
//       }, 100);
//     }
//   }, [searchOpen]);

//   // 🔍 SEARCH FUNCTION - UPDATED FOR YOUR DATABASE
//   const searchProducts = async (query) => {
//     if (!query || query.trim() === "") {
//       setSearchResults([]);
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);
//     try {
//       console.log("Searching for:", query);

//       // Use quick search endpoint for faster results
//       const res = await fetchWithAuth(
//         `${API}/api/products/quick-search?q=${encodeURIComponent(query)}`
//       );

//       if (res.ok) {
//         const data = await res.json();
//         console.log("Search results:", data);
//         setSearchResults(data);

//         // Add to recent searches
//         if (data.length > 0 && !recentSearches.includes(query)) {
//           const updated = [query, ...recentSearches].slice(0, 8);
//           saveRecentSearches(updated);
//         }
//       } else {
//         console.error("Search failed with status:", res.status);
//         setSearchResults([]);
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//       setSearchResults([]);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   // Debounced search
//   useEffect(() => {
//     if (!searchOpen) return;

//     const timer = setTimeout(() => {
//       if (searchQuery.trim()) {
//         searchProducts(searchQuery);
//       } else {
//         setSearchResults([]);
//         setSearchHistoryOpen(true);
//       }
//     }, 350);

//     return () => clearTimeout(timer);
//   }, [searchQuery, searchOpen]);

//   // Add to recent searches
//   const addToRecentSearches = (query) => {
//     const updated = [
//       query,
//       ...recentSearches.filter((s) => s.toLowerCase() !== query.toLowerCase()),
//     ].slice(0, 8);
//     saveRecentSearches(updated);
//   };

//   // Clear recent searches
//   const clearRecentSearches = () => {
//     saveRecentSearches([]);
//   };

//   // Handle search submission
//   const handleSearch = (e, query = null, category = null) => {
//     e?.preventDefault();
//     const searchTerm = query || searchQuery.trim();

//     if (searchTerm) {
//       addToRecentSearches(searchTerm);

//       if (category) {
//         navigate(`/search?category=${encodeURIComponent(category)}`);
//       } else {
//         navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
//       }

//       setSearchOpen(false);
//       setSearchQuery("");
//       setSearchResults([]);
//     }
//   };

//   // Handle category click from search
//   const handleCategorySearch = (categoryName) => {
//     addToRecentSearches(categoryName);
//     navigate(`/search?category=${encodeURIComponent(categoryName)}`);
//     setSearchOpen(false);
//   };

//   // Format price
//   const formatPrice = (price) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//     }).format(price);
//   };

//   const links = [
//     { name: "Home", path: "/" },
//     { name: "About-us", path: "/about" },
//     { name: "Contact-us", path: "/contact" },
//     { name: "Return-policy", path: "/policy" },
//   ];

//   const toggleDropdown = (key) =>
//     setOpenDropdown(openDropdown === key ? null : key);

//   const handleCategoryClick = (path) => {
//     navigate(path);
//     setMenuOpen(false);
//     setOpenDropdown(null);
//   };

//   const cartItemCount =
//     cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

//   return (
//     <>
//       {/* Navigation Container */}
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5, type: "spring" }}
//         className="fixed top-0 w-full z-50 transition-all duration-300"
//       >
//         {/* Top Announcement Bar */}
//         <div className="bg-gradient-to-r from-[#E1A95F]/20 via-[#d4a259]/20 to-[#c5954d]/20 py-2 px-4 text-center">
//           <p className="text-xs text-white/90 font-medium">
//             🚚{" "}
//             <span className="text-[#E1A95F] font-semibold">Free Shipping</span>{" "}
//             on orders over $100 •
//             <span className="text-green-300 font-semibold ml-2">
//               🎁 30% OFF
//             </span>{" "}
//             for new customers
//           </p>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center"
//             >
//               <Link to="/" className="flex items-center">
//                 <img
//                   src={logo}
//                   alt="Logo"
//                   className="w-28 md:w-32 h-auto drop-shadow-lg"
//                 />
//               </Link>
//             </motion.div>

//             {/* Desktop Navigation */}
//             <ul className="hidden lg:flex items-center gap-1">
//               {links.map((link, index) => (
//                 <motion.li
//                   key={index}
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="relative"
//                 >
//                   <Link
//                     to={link.path}
//                     className={`relative px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 font-medium ${
//                       location.pathname === link.path
//                         ? "text-[#E1A95F] bg-[#E1A95F]/10"
//                         : "text-slate-200 hover:text-[#E1A95F] hover:bg-white/5"
//                     }`}
//                   >
//                     {link.name}
//                     {location.pathname === link.path && (
//                       <motion.div
//                         layoutId="underline"
//                         className="absolute left-4 right-4 h-0.5 bottom-1.5 bg-[#E1A95F] rounded-full"
//                       />
//                     )}
//                   </Link>
//                 </motion.li>
//               ))}

//               {/* Dynamic Shop Dropdown */}
//               <motion.li className="relative">
//                 <button
//                   onClick={() => toggleDropdown("shop")}
//                   className={`flex items-center gap-2 px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 font-medium ${
//                     openDropdown === "shop"
//                       ? "text-[#E1A95F] bg-[#E1A95F]/10"
//                       : "text-slate-200 hover:text-[#E1A95F] hover:bg-white/5"
//                   }`}
//                 >
//                   Shop
//                   <motion.span
//                     animate={{ rotate: openDropdown === "shop" ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <FaChevronDown className="text-sm" />
//                   </motion.span>
//                 </button>
//                 <AnimatePresence>
//                   {openDropdown === "shop" && (
//                     <motion.div
//                       className="absolute left-0 top-full mt-2 min-w-[220px] bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700 p-3"
//                       initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <div className="space-y-2">
//                         {categories.map((cat, i) => (
//                           <motion.button
//                             key={i}
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.2, delay: i * 0.05 }}
//                             onClick={() =>
//                               handleCategoryClick(
//                                 `/category/${cat.name.toLowerCase()}`
//                               )
//                             }
//                             className="w-full text-left px-3 py-2.5 rounded-lg text-slate-300 hover:text-[#E1A95F] hover:bg-slate-800/50 transition-all duration-300 flex items-center gap-3 group"
//                           >
//                             <div className="w-2 h-2 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F] transition-all duration-300"></div>
//                             <span className="font-medium">{cat.name}</span>
//                           </motion.button>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.li>

//               <li className="ml-2">
//                 <ThemeToggle />
//               </li>
//             </ul>

//             {/* Right Icons */}
//             <div className="flex items-center gap-3 md:gap-4">
//               {/* Enhanced Search */}
//               <div ref={searchRef} className="">
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => {
//                     setSearchOpen(!searchOpen);
//                     setSearchHistoryOpen(true);
//                   }}
//                   className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
//                 >
//                   <FaSearch className="text-slate-300 group-hover:text-[#E1A95F] text-lg transition-colors duration-300" />
//                 </motion.button>

//                 <AnimatePresence>
//                   {searchOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.9, y: 10 }}
//                       animate={{ opacity: 1, scale: 1, y: 0 }}
//                       exit={{ opacity: 0, scale: 0.9, y: 10 }}
//                       className="absolute max-sm:right-0 right-10 top-full mt-2 max-sm:w-full w-[50%] backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700 overflow-hidden z-50"
//                     >
//                       {/* Search Input */}
//                       <div className="p-4 border-b border-slate-700 ">
//                         <form
//                           onSubmit={(e) => handleSearch(e)}
//                           className="relative"
//                         >
//                           <div className="relative">
//                             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
//                             <input
//                               ref={searchInputRef}
//                               type="text"
//                               value={searchQuery}
//                               onChange={(e) => {
//                                 setSearchQuery(e.target.value);
//                                 setSearchHistoryOpen(e.target.value === "");
//                               }}
//                               placeholder="Search products, brands, categories..."
//                               className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
//                             />
//                             {searchQuery && (
//                               <button
//                                 type="button"
//                                 onClick={() => {
//                                   setSearchQuery("");
//                                   setSearchResults([]);
//                                   setSearchHistoryOpen(true);
//                                 }}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
//                               >
//                                 <FaTimesCircle />
//                               </button>
//                             )}
//                           </div>
//                           {isSearching && (
//                             <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                               <FaSpinner className="animate-spin text-[#E1A95F]" />
//                             </div>
//                           )}
//                         </form>
//                       </div>

//                       {/* Search Content */}
//                       <div className="max-h-96 overflow-y-auto">
//                         {/* Recent Searches */}
//                         {searchHistoryOpen &&
//                           recentSearches.length > 0 &&
//                           !searchQuery && (
//                             <div className="p-4 border-b border-slate-700">
//                               <div className="flex items-center justify-between mb-3">
//                                 <div className="flex items-center gap-2">
//                                   <FaHistory className="text-slate-500 text-sm" />
//                                   <h3 className="text-sm font-semibold text-slate-400">
//                                     Recent Searches
//                                   </h3>
//                                 </div>
//                                 <button
//                                   onClick={clearRecentSearches}
//                                   className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
//                                 >
//                                   Clear All
//                                 </button>
//                               </div>
//                               <div className="space-y-2">
//                                 {recentSearches.map((search, index) => (
//                                   <button
//                                     key={index}
//                                     onClick={() => {
//                                       setSearchQuery(search);
//                                       handleSearch(null, search);
//                                     }}
//                                     className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-300 group"
//                                   >
//                                     <div className="flex items-center gap-3">
//                                       <FaSearch className="text-slate-500 text-sm group-hover:text-[#E1A95F]" />
//                                       <span className="text-slate-300 group-hover:text-white">
//                                         {search}
//                                       </span>
//                                     </div>
//                                     <FaTimesCircle
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         const updated = recentSearches.filter(
//                                           (_, i) => i !== index
//                                         );
//                                         saveRecentSearches(updated);
//                                       }}
//                                       className="text-slate-600 hover:text-slate-400 text-sm opacity-0 group-hover:opacity-100 transition-all"
//                                     />
//                                   </button>
//                                 ))}
//                               </div>
//                             </div>
//                           )}

//                         {/* Popular Searches */}
//                         {searchHistoryOpen &&
//                           popularSearches.length > 0 &&
//                           !searchQuery && (
//                             <div className="p-4 border-b border-slate-700">
//                               <div className="flex items-center gap-2 mb-3">
//                                 <FaFire className="text-amber-500 text-sm" />
//                                 <h3 className="text-sm font-semibold text-slate-400">
//                                   Popular Searches
//                                 </h3>
//                               </div>
//                               <div className="flex flex-wrap gap-2">
//                                 {popularSearches
//                                   .slice(0, 6)
//                                   .map((search, index) => (
//                                     <button
//                                       key={index}
//                                       onClick={() => {
//                                         setSearchQuery(search);
//                                         handleSearch(null, search);
//                                       }}
//                                       className="px-3 py-1.5 bg-slate-800/50 hover:bg-[#E1A95F]/20 text-slate-300 hover:text-[#E1A95F] rounded-lg text-sm transition-all duration-300 border border-slate-700 hover:border-[#E1A95F]/30"
//                                     >
//                                       {search}
//                                     </button>
//                                   ))}
//                               </div>
//                             </div>
//                           )}

//                         {/* Categories */}
//                         {searchHistoryOpen &&
//                           allCategories.length > 0 &&
//                           !searchQuery && (
//                             <div className="p-4">
//                               <div className="flex items-center gap-2 mb-3">
//                                 <FaTag className="text-[#E1A95F] text-sm" />
//                                 <h3 className="text-sm font-semibold text-slate-400">
//                                   Browse Categories
//                                 </h3>
//                               </div>
//                               <div className="grid grid-cols-2 gap-2">
//                                 {allCategories
//                                   .slice(0, showAllCategories ? 20 : 6)
//                                   .map((category, index) => (
//                                     <button
//                                       key={index}
//                                       onClick={() =>
//                                         handleCategorySearch(category.name)
//                                       }
//                                       className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/70 transition-all duration-300 group"
//                                     >
//                                       <FaBox className="text-slate-500 text-sm group-hover:text-[#E1A95F]" />
//                                       <span className="text-slate-300 text-sm truncate">
//                                         {category.name}
//                                       </span>
//                                     </button>
//                                   ))}
//                               </div>
//                               {allCategories.length > 6 && (
//                                 <button
//                                   onClick={() =>
//                                     setShowAllCategories(!showAllCategories)
//                                   }
//                                   className="w-full mt-3 text-center text-xs text-slate-500 hover:text-[#E1A95F] transition-colors"
//                                 >
//                                   {showAllCategories
//                                     ? "Show Less"
//                                     : `Show All ${allCategories.length} Categories`}
//                                 </button>
//                               )}
//                             </div>
//                           )}

//                         {/* Search Results */}
//                         {searchQuery && (
//                           <div className="p-4">
//                             <div className="flex items-center justify-between mb-3">
//                               <h3 className="text-sm font-semibold text-slate-400">
//                                 {searchResults.length > 0
//                                   ? `Found ${searchResults.length} results`
//                                   : isSearching
//                                     ? "Searching..."
//                                     : "No results found"}
//                               </h3>
//                               {searchResults.length > 0 && (
//                                 <button
//                                   onClick={(e) => handleSearch(e)}
//                                   className="text-xs text-[#E1A95F] hover:text-[#d4a259] font-medium"
//                                 >
//                                   See all →
//                                 </button>
//                               )}
//                             </div>

//                             {searchResults.length > 0 ? (
//                               <div className="space-y-3">
//                                 {searchResults.slice(0, 5).map((product) => (
//                                   <Link
//                                     key={product._id}
//                                     to={`/product/${product._id}`}
//                                     onClick={() => {
//                                       setSearchOpen(false);
//                                       setSearchQuery("");
//                                     }}
//                                     className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-300 group"
//                                   >
//                                     <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
//                                       {product.image ? (
//                                         <img
//                                           src={
//                                             product.image.startsWith("http")
//                                               ? product.image
//                                               : `${API}${product.image}`
//                                           }
//                                           alt={product.name}
//                                           className="w-full h-full object-contain"
//                                           onError={(e) => {
//                                             e.target.onerror = null;
//                                             e.target.src =
//                                               "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop";
//                                           }}
//                                         />
//                                       ) : (
//                                         <FaBox className="text-slate-500" />
//                                       )}
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                       <div className="flex items-start justify-between gap-2">
//                                         <h4 className="text-sm font-medium text-white truncate group-hover:text-[#E1A95F]">
//                                           {product.name}
//                                         </h4>
//                                         <span className="text-sm font-semibold text-[#E1A95F] flex-shrink-0">
//                                           {formatPrice(product.price)}
//                                         </span>
//                                       </div>
//                                       <p className="text-xs text-slate-400 truncate">
//                                         {product.category || "Uncategorized"}
//                                       </p>
//                                       <div className="flex items-center gap-2 mt-1">
//                                         {product.isSold ||
//                                         product.stock === 0 ? (
//                                           <span className="text-xs text-red-500">
//                                             Sold Out
//                                           </span>
//                                         ) : (
//                                           <span className="text-xs text-green-500">
//                                             {product.stock || 0} in stock
//                                           </span>
//                                         )}
//                                       </div>
//                                     </div>
//                                   </Link>
//                                 ))}
//                               </div>
//                             ) : !isSearching ? (
//                               <div className="text-center py-6 bg-white ">
//                                 <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
//                                   <FaSearch className="text-slate-500" />
//                                 </div>
//                                 <p className="text-slate-400 text-sm">
//                                   No products found for "{searchQuery}"
//                                 </p>
//                                 <p className="text-slate-500 text-xs mt-2">
//                                   Try different keywords
//                                 </p>
//                               </div>
//                             ) : null}
//                           </div>
//                         )}
//                       </div>

//                       {/* Search Footer */}
//                       {searchQuery && (
//                         <div className="p-4 border-t border-slate-700 bg-slate-900/50">
//                           <button
//                             onClick={(e) => handleSearch(e)}
//                             className="w-full py-2.5 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300 flex items-center justify-center gap-2"
//                           >
//                             <FaSearch />
//                             Search for "{searchQuery}"
//                           </button>
//                         </div>
//                       )}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Notifications */}
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="relative cursor-pointer group"
//                 onClick={() => navigate("/notifications")}
//               >
//                 <div className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">
//                   <FaBell className="text-slate-300 group-hover:text-[#E1A95F] text-lg transition-colors duration-300" />
//                 </div>
//                 {unreadCount > 0 && (
//                   <motion.span
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg min-w-[22px] text-center"
//                   >
//                     {unreadCount > 9 ? "9+" : unreadCount}
//                   </motion.span>
//                 )}
//               </motion.div>

//               {/* Cart */}
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="relative cursor-pointer group"
//                 onClick={() => navigate("/cart")}
//               >
//                 <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
//                   <FaShoppingCart className="text-[#E1A95F] text-lg group-hover:scale-110 transition-transform duration-300" />
//                 </div>
//                 {cartItemCount > 0 && (
//                   <motion.span
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     className={`absolute -top-1.5 -right-1.5 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg ${
//                       cartItemCount > 9
//                         ? "bg-gradient-to-r from-red-500 to-pink-500"
//                         : "bg-gradient-to-r from-green-500 to-emerald-500"
//                     }`}
//                   >
//                     {cartItemCount > 9 ? "9+" : cartItemCount}
//                   </motion.span>
//                 )}
//               </motion.div>

//               {/* User */}
//               {user && (
//                 <div className="relative">
//                   <motion.div
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="cursor-pointer p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
//                     onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   >
//                     <FaUser className="text-[#E1A95F] text-lg group-hover:scale-110 transition-transform duration-300" />
//                   </motion.div>
//                   <AnimatePresence>
//                     {userMenuOpen && (
//                       <motion.div
//                         className="absolute right-0 top-full mt-2 w-80 bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700 p-4"
//                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <div className="space-y-3">
//                           <div className="pb-3 border-b border-slate-700">
//                             <div className="flex items-center gap-3">
//                               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center text-white font-bold text-lg">
//                                 {user.name.charAt(0).toUpperCase()}
//                               </div>
//                               <div>
//                                 <div className="font-bold text-white">
//                                   Hi, {user.name}
//                                 </div>
//                                 <div className="text-xs text-slate-400">
//                                   {user.email}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           <Link
//                             to="/my-orders"
//                             className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-[#E1A95F] hover:bg-slate-800/50 transition-all duration-300 group"
//                             onClick={() => setUserMenuOpen(false)}
//                           >
//                             <div className="w-1.5 h-1.5 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F]"></div>
//                             <span>My Orders</span>
//                           </Link>

//                           {/* {user.role === "admin" && (
//                             <Link
//                               to="/admin"
//                               className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-green-400 hover:text-green-300 hover:bg-slate-800/50 transition-all duration-300 group"
//                               onClick={() => setUserMenuOpen(false)}
//                             >
//                               <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full group-hover:bg-green-500"></div>
//                               <span>Admin Panel</span>
//                             </Link>
//                           )} */}

//                           <button
//                             onClick={() => {
//                               logout();
//                               setUserMenuOpen(false);
//                             }}
//                             className="w-full mt-2 py-2.5 bg-gradient-to-r from-red-600/10 to-pink-600/10 hover:from-red-600/20 hover:to-pink-600/20 text-red-400 hover:text-red-300 rounded-xl font-medium transition-all duration-300 border border-red-500/20 flex items-center justify-center gap-2"
//                           >
//                             <span>Sign Out</span>
//                           </button>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               )}

//               {/* Mobile Menu Button */}
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
//               >
//                 {menuOpen ? (
//                   <FaTimes className="text-[#E1A95F] text-xl" />
//                 ) : (
//                   <FaBars className="text-slate-300 text-xl" />
//                 )}
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {menuOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setMenuOpen(false)}
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
//             />

//             {/* Mobile Menu Panel */}
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25 }}
//               className="fixed top-0 right-0 h-full w-full max-w-sm z-50 lg:hidden"
//             >
//               <div className="h-full bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl overflow-y-auto">
//                 {/* Mobile Header */}
//                 <div className="p-6 border-b border-slate-700">
//                   <div className="flex items-center justify-between mb-6">
//                     <div className="flex items-center gap-3">
//                       <img src={logo} alt="Logo" className="w-10 h-10" />
//                       <h2 className="text-2xl font-bold text-white">Menu</h2>
//                     </div>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => setMenuOpen(false)}
//                       className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
//                     >
//                       <FaTimes className="text-[#E1A95F] text-xl" />
//                     </motion.button>
//                   </div>

//                   {/* User Info Mobile */}
//                   {user && (
//                     <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-gradient-to-r from-[#E1A95F]/10 to-[#d4a259]/10 border border-[#E1A95F]/20">
//                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center text-white font-bold text-lg">
//                         {user.name.charAt(0).toUpperCase()}
//                       </div>
//                       <div>
//                         <div className="font-bold text-white">{user.name}</div>
//                         <div className="text-sm text-slate-400">
//                           {user.email}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Mobile Links */}
//                 <div className="p-6 space-y-2">
//                   {links.map((link, index) => (
//                     <Link
//                       key={index}
//                       to={link.path}
//                       onClick={() => setMenuOpen(false)}
//                       className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
//                         location.pathname === link.path
//                           ? "bg-gradient-to-r from-[#E1A95F]/20 to-[#d4a259]/20 text-[#E1A95F]"
//                           : "text-slate-300 hover:text-white hover:bg-slate-800"
//                       }`}
//                     >
//                       <div
//                         className={`w-1.5 h-1.5 rounded-full ${
//                           location.pathname === link.path
//                             ? "bg-[#E1A95F]"
//                             : "bg-slate-600"
//                         }`}
//                       ></div>
//                       <span className="font-medium">{link.name}</span>
//                     </Link>
//                   ))}

//                   {/* Shop Section Mobile */}
//                   <div className="space-y-2">
//                     <button
//                       onClick={() => toggleDropdown("shop-mobile")}
//                       className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
//                         <span className="font-medium">Shop</span>
//                       </div>
//                       <FaChevronDown
//                         className={`transition ${
//                           openDropdown === "shop-mobile" ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>

//                     <AnimatePresence>
//                       {openDropdown === "shop-mobile" && (
//                         <motion.div
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           className="ml-4 pl-4 border-l border-slate-700 space-y-2"
//                         >
//                           {categories.map((cat, i) => (
//                             <button
//                               key={i}
//                               onClick={() => {
//                                 navigate(`/category/${cat.name.toLowerCase()}`);
//                                 setMenuOpen(false);
//                               }}
//                               className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-slate-400 hover:text-[#E1A95F] hover:bg-slate-800/50 transition-all duration-300 text-left"
//                             >
//                               <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
//                               <span>{cat.name}</span>
//                             </button>
//                           ))}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   {/* Theme Toggle Mobile */}
//                   <div className="mt-6 pt-6 border-t border-slate-700">
//                     <div className="flex items-center justify-between px-4">
//                       <span className="text-slate-300 font-medium">Theme</span>
//                       <ThemeToggle />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Mobile Footer */}
//                 <div className="p-6 border-t border-slate-700 mt-auto">
//                   <div className="space-y-3">
//                     <button
//                       onClick={() => {
//                         navigate("/notifications");
//                         setMenuOpen(false);
//                       }}
//                       className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all duration-300"
//                     >
//                       <div className="flex items-center gap-3">
//                         <FaBell className="text-[#E1A95F]" />
//                         <span>Notifications</span>
//                       </div>
//                       {unreadCount > 0 && (
//                         <span className="bg-gradient-to-r from-red-500 to-pink-500 text-xs font-bold px-2 py-1 rounded-full text-white">
//                           {unreadCount > 9 ? "9+" : unreadCount}
//                         </span>
//                       )}
//                     </button>

//                     {user && user.role === "admin" && (
//                       <button
//                         onClick={() => {
//                           navigate("/admin");
//                           setMenuOpen(false);
//                         }}
//                         className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 text-green-400 hover:text-green-300 transition-all duration-300"
//                       >
//                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
//                         <span>Admin Panel</span>
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Scroll Progress Bar */}
//       <motion.div
//         className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E1A95F] via-[#d4a259] to-[#E1A95F] z-50"
//         style={{ scaleX: scrolled ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//       />
//     </>
//   );
// };

// export default Navigation;
// import React, { useState, useContext, useEffect, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   FaBars,
//   FaTimes,
//   FaShoppingCart,
//   FaChevronDown,
//   FaUser,
//   FaBell,
//   FaSearch,
//   FaSpinner,
//   FaTimesCircle,
//   FaBox,
//   FaTag,
//   FaFire,
//   FaHistory,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import ThemeToggle from "../Components/ThemeToggle";
// import { authContext } from "../Context/authContext";
// import { cartContext } from "../Context/cartContext";
// import { initSocket } from "../utils/socket";
// import { fetchWithAuth } from "../utils/auth";
// import logo from "/src/assets/Logo.png";

// const API = "http://localhost:3000";

// const Navigation = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [allCategories, setAllCategories] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [scrolled, setScrolled] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [recentSearches, setRecentSearches] = useState([]);
//   const [popularSearches, setPopularSearches] = useState([]);
//   const [searchHistoryOpen, setSearchHistoryOpen] = useState(true);
//   const [showAllCategories, setShowAllCategories] = useState(false);
//   const searchRef = useRef(null);
//   const searchInputRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout } = useContext(authContext);
//   const { cart } = useContext(cartContext);

//   // Fetch categories for dropdown
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetchWithAuth(`${API}/api/categories`);
//         const data = await res.json();
//         setCategories(data || []);
//       } catch (err) {
//         console.error("Categories fetch error:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch all categories for search
//   useEffect(() => {
//     const fetchAllCategories = async () => {
//       try {
//         const res = await fetchWithAuth(
//           `${API}/api/products/categories-for-search`
//         );
//         if (res.ok) {
//           const data = await res.json();
//           setAllCategories(data);
//         }
//       } catch (err) {
//         console.error("All categories fetch error:", err);
//       }
//     };
//     fetchAllCategories();
//   }, []);

//   // Fetch popular searches
//   useEffect(() => {
//     const fetchPopularSearches = async () => {
//       try {
//         const res = await fetchWithAuth(`${API}/api/products/popular-searches`);
//         if (res.ok) {
//           const data = await res.json();
//           setPopularSearches(data || []);
//         }
//       } catch (err) {
//         console.error("Popular searches error:", err);
//       }
//     };
//     fetchPopularSearches();
//   }, []);

//   // Load recent searches
//   useEffect(() => {
//     const savedSearches = localStorage.getItem("Adescart_recent_searches");
//     if (savedSearches) {
//       try {
//         setRecentSearches(JSON.parse(savedSearches));
//       } catch (e) {
//         console.error("Error parsing recent searches:", e);
//       }
//     }
//   }, []);

//   // Save recent searches
//   const saveRecentSearches = (searches) => {
//     setRecentSearches(searches);
//     localStorage.setItem("Adescart_recent_searches", JSON.stringify(searches));
//   };

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Cart pulse animation
//   useEffect(() => {
//     if (cart?.items?.length > 0) {
//       const timer = setTimeout(() => {}, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [cart?.items]);

//   // Fetch initial unread count - FIXED
//   useEffect(() => {
//     if (!user) return;
//     fetchUnreadCount();
//   }, [user]);

//   // Notifications socket
//   useEffect(() => {
//     if (!user) return;

//     const s = initSocket(user._id);

//     const onNotif = (notif) => {
//       playSound();
//       setUnreadCount((prev) => prev + 1);
//     };

//     s.on("notification", onNotif);

//     const poll = setInterval(fetchUnreadCount, 10000);

//     return () => {
//       s.off("notification", onNotif);
//       clearInterval(poll);
//     };
//   }, [user]);

//   // FIXED: fetchUnreadCount function
//   const fetchUnreadCount = async () => {
//     if (!user) return;
//     try {
//       const res = await fetchWithAuth(`${API}/api/notifications/unread-count`);
//       if (!res.ok) return;
//       const response = await res.json();

//       // The response now has a success property and data structure
//       if (response.success) {
//         // The count is in response.data.count
//         setUnreadCount(response.data?.count || 0);
//       } else {
//         console.error("API error:", response.message);
//         setUnreadCount(0);
//       }
//     } catch (err) {
//       console.error("Failed to fetch unread count:", err);
//       setUnreadCount(0);
//     }
//   };

//   const playSound = () => {
//     try {
//       const audio = new Audio(
//         "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
//       );
//       audio.volume = 0.3;
//       audio.play().catch(() => {});
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   // Close search when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setSearchOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Focus search input when search opens
//   useEffect(() => {
//     if (searchOpen && searchInputRef.current) {
//       setTimeout(() => {
//         searchInputRef.current.focus();
//         setSearchHistoryOpen(true);
//       }, 100);
//     }
//   }, [searchOpen]);

//   // 🔍 SEARCH FUNCTION - UPDATED FOR YOUR DATABASE
//   const searchProducts = async (query) => {
//     if (!query || query.trim() === "") {
//       setSearchResults([]);
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);
//     try {
//       console.log("Searching for:", query);

//       // Use quick search endpoint for faster results
//       const res = await fetchWithAuth(
//         `${API}/api/products/quick-search?q=${encodeURIComponent(query)}`
//       );

//       if (res.ok) {
//         const data = await res.json();
//         console.log("Search results:", data);
//         setSearchResults(data);

//         // Add to recent searches
//         if (data.length > 0 && !recentSearches.includes(query)) {
//           const updated = [query, ...recentSearches].slice(0, 8);
//           saveRecentSearches(updated);
//         }
//       } else {
//         console.error("Search failed with status:", res.status);
//         setSearchResults([]);
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//       setSearchResults([]);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   // Debounced search
//   useEffect(() => {
//     if (!searchOpen) return;

//     const timer = setTimeout(() => {
//       if (searchQuery.trim()) {
//         searchProducts(searchQuery);
//       } else {
//         setSearchResults([]);
//         setSearchHistoryOpen(true);
//       }
//     }, 350);

//     return () => clearTimeout(timer);
//   }, [searchQuery, searchOpen]);

//   // Add to recent searches
//   const addToRecentSearches = (query) => {
//     const updated = [
//       query,
//       ...recentSearches.filter((s) => s.toLowerCase() !== query.toLowerCase()),
//     ].slice(0, 8);
//     saveRecentSearches(updated);
//   };

//   // Clear recent searches
//   const clearRecentSearches = () => {
//     saveRecentSearches([]);
//   };

//   // Handle search submission
//   const handleSearch = (e, query = null, category = null) => {
//     e?.preventDefault();
//     const searchTerm = query || searchQuery.trim();

//     if (searchTerm) {
//       addToRecentSearches(searchTerm);

//       if (category) {
//         navigate(`/search?category=${encodeURIComponent(category)}`);
//       } else {
//         navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
//       }

//       setSearchOpen(false);
//       setSearchQuery("");
//       setSearchResults([]);
//     }
//   };

//   // Handle category click from search
//   const handleCategorySearch = (categoryName) => {
//     addToRecentSearches(categoryName);
//     navigate(`/search?category=${encodeURIComponent(categoryName)}`);
//     setSearchOpen(false);
//   };

//   // Format price
//   const formatPrice = (price) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//     }).format(price);
//   };

//   const links = [
//     { name: "Home", path: "/" },
//     { name: "About-us", path: "/about" },
//     { name: "Contact-us", path: "/contact" },
//     { name: "Return-policy", path: "/policy" },
//   ];

//   const toggleDropdown = (key) =>
//     setOpenDropdown(openDropdown === key ? null : key);

//   const handleCategoryClick = (path) => {
//     navigate(path);
//     setMenuOpen(false);
//     setOpenDropdown(null);
//   };

//   const cartItemCount =
//     cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

//   return (
//     <>
//       {/* Navigation Container */}
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5, type: "spring" }}
//         className="fixed top-0 w-full z-50 transition-all duration-300"
//       >
//         {/* Top Announcement Bar */}
//         <div className="bg-gradient-to-r from-[#E1A95F]/20 via-[#d4a259]/20 to-[#c5954d]/20 py-2 px-4 text-center">
//           <p className="text-xs text-white/90 font-medium">
//             🚚{" "}
//             <span className="text-[#E1A95F] font-semibold">Free Shipping</span>{" "}
//             on orders over $100 •
//             <span className="text-green-300 font-semibold ml-2">
//               🎁 30% OFF
//             </span>{" "}
//             for new customers
//           </p>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center"
//             >
//               <Link to="/" className="flex items-center">
//                 <img
//                   src={logo}
//                   alt="Logo"
//                   className="w-28 md:w-32 h-auto drop-shadow-lg"
//                 />
//               </Link>
//             </motion.div>

//             {/* Desktop Navigation */}
//             <ul className="hidden lg:flex items-center gap-1">
//               {links.map((link, index) => (
//                 <motion.li
//                   key={index}
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="relative"
//                 >
//                   <Link
//                     to={link.path}
//                     className={`relative px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 font-medium ${
//                       location.pathname === link.path
//                         ? "text-[#E1A95F] bg-[#E1A95F]/10"
//                         : "text-slate-200 hover:text-[#E1A95F] hover:bg-white/5"
//                     }`}
//                   >
//                     {link.name}
//                     {location.pathname === link.path && (
//                       <motion.div
//                         layoutId="underline"
//                         className="absolute left-4 right-4 h-0.5 bottom-1.5 bg-[#E1A95F] rounded-full"
//                       />
//                     )}
//                   </Link>
//                 </motion.li>
//               ))}

//               {/* Dynamic Shop Dropdown */}
//               <motion.li className="relative">
//                 <button
//                   onClick={() => toggleDropdown("shop")}
//                   className={`flex items-center gap-2 px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 font-medium ${
//                     openDropdown === "shop"
//                       ? "text-[#E1A95F] bg-[#E1A95F]/10"
//                       : "text-slate-200 hover:text-[#E1A95F] hover:bg-white/5"
//                   }`}
//                 >
//                   Shop
//                   <motion.span
//                     animate={{ rotate: openDropdown === "shop" ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <FaChevronDown className="text-sm" />
//                   </motion.span>
//                 </button>
//                 <AnimatePresence>
//                   {openDropdown === "shop" && (
//                     <motion.div
//                       className="absolute left-0 top-full mt-2 min-w-[220px] bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700 p-3"
//                       initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <div className="space-y-2">
//                         {categories.map((cat, i) => (
//                           <motion.button
//                             key={i}
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.2, delay: i * 0.05 }}
//                             onClick={() =>
//                               handleCategoryClick(
//                                 `/category/${cat.name.toLowerCase()}`
//                               )
//                             }
//                             className="w-full text-left px-3 py-2.5 rounded-lg text-slate-300 hover:text-[#E1A95F] hover:bg-slate-800/50 transition-all duration-300 flex items-center gap-3 group"
//                           >
//                             <div className="w-2 h-2 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F] transition-all duration-300"></div>
//                             <span className="font-medium">{cat.name}</span>
//                           </motion.button>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.li>

//               <li className="ml-2">
//                 <ThemeToggle />
//               </li>
//             </ul>

//             {/* Right Icons */}
//             <div className="flex items-center gap-3 md:gap-4">
//               {/* Enhanced Search */}
//               <div ref={searchRef} className="">
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => {
//                     setSearchOpen(!searchOpen);
//                     setSearchHistoryOpen(true);
//                   }}
//                   className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
//                 >
//                   <FaSearch className="text-slate-300 group-hover:text-[#E1A95F] text-lg transition-colors duration-300" />
//                 </motion.button>

//                 <AnimatePresence>
//                   {searchOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.9, y: 10 }}
//                       animate={{ opacity: 1, scale: 1, y: 0 }}
//                       exit={{ opacity: 0, scale: 0.9, y: 10 }}
//                       className="absolute max-sm:right-0 right-10 top-full mt-2 max-sm:w-full w-[50%] backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700 overflow-hidden z-50"
//                     >
//                       {/* Search Input */}
//                       <div className="p-4 border-b border-slate-700 ">
//                         <form
//                           onSubmit={(e) => handleSearch(e)}
//                           className="relative"
//                         >
//                           <div className="relative">
//                             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
//                             <input
//                               ref={searchInputRef}
//                               type="text"
//                               value={searchQuery}
//                               onChange={(e) => {
//                                 setSearchQuery(e.target.value);
//                                 setSearchHistoryOpen(e.target.value === "");
//                               }}
//                               placeholder="Search products, brands, categories..."
//                               className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
//                             />
//                             {searchQuery && (
//                               <button
//                                 type="button"
//                                 onClick={() => {
//                                   setSearchQuery("");
//                                   setSearchResults([]);
//                                   setSearchHistoryOpen(true);
//                                 }}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
//                               >
//                                 <FaTimesCircle />
//                               </button>
//                             )}
//                           </div>
//                           {isSearching && (
//                             <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                               <FaSpinner className="animate-spin text-[#E1A95F]" />
//                             </div>
//                           )}
//                         </form>
//                       </div>

//                       {/* Search Content */}
//                       <div className="max-h-96 overflow-y-auto">
//                         {/* Recent Searches */}
//                         {searchHistoryOpen &&
//                           recentSearches.length > 0 &&
//                           !searchQuery && (
//                             <div className="p-4 border-b border-slate-700">
//                               <div className="flex items-center justify-between mb-3">
//                                 <div className="flex items-center gap-2">
//                                   <FaHistory className="text-slate-500 text-sm" />
//                                   <h3 className="text-sm font-semibold text-slate-400">
//                                     Recent Searches
//                                   </h3>
//                                 </div>
//                                 <button
//                                   onClick={clearRecentSearches}
//                                   className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
//                                 >
//                                   Clear All
//                                 </button>
//                               </div>
//                               <div className="space-y-2">
//                                 {recentSearches.map((search, index) => (
//                                   <button
//                                     key={index}
//                                     onClick={() => {
//                                       setSearchQuery(search);
//                                       handleSearch(null, search);
//                                     }}
//                                     className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-300 group"
//                                   >
//                                     <div className="flex items-center gap-3">
//                                       <FaSearch className="text-slate-500 text-sm group-hover:text-[#E1A95F]" />
//                                       <span className="text-slate-300 group-hover:text-white">
//                                         {search}
//                                       </span>
//                                     </div>
//                                     <FaTimesCircle
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         const updated = recentSearches.filter(
//                                           (_, i) => i !== index
//                                         );
//                                         saveRecentSearches(updated);
//                                       }}
//                                       className="text-slate-600 hover:text-slate-400 text-sm opacity-0 group-hover:opacity-100 transition-all"
//                                     />
//                                   </button>
//                                 ))}
//                               </div>
//                             </div>
//                           )}

//                         {/* Popular Searches */}
//                         {searchHistoryOpen &&
//                           popularSearches.length > 0 &&
//                           !searchQuery && (
//                             <div className="p-4 border-b border-slate-700">
//                               <div className="flex items-center gap-2 mb-3">
//                                 <FaFire className="text-amber-500 text-sm" />
//                                 <h3 className="text-sm font-semibold text-slate-400">
//                                   Popular Searches
//                                 </h3>
//                               </div>
//                               <div className="flex flex-wrap gap-2">
//                                 {popularSearches
//                                   .slice(0, 6)
//                                   .map((search, index) => (
//                                     <button
//                                       key={index}
//                                       onClick={() => {
//                                         setSearchQuery(search);
//                                         handleSearch(null, search);
//                                       }}
//                                       className="px-3 py-1.5 bg-slate-800/50 hover:bg-[#E1A95F]/20 text-slate-300 hover:text-[#E1A95F] rounded-lg text-sm transition-all duration-300 border border-slate-700 hover:border-[#E1A95F]/30"
//                                     >
//                                       {search}
//                                     </button>
//                                   ))}
//                               </div>
//                             </div>
//                           )}

//                         {/* Categories */}
//                         {searchHistoryOpen &&
//                           allCategories.length > 0 &&
//                           !searchQuery && (
//                             <div className="p-4">
//                               <div className="flex items-center gap-2 mb-3">
//                                 <FaTag className="text-[#E1A95F] text-sm" />
//                                 <h3 className="text-sm font-semibold text-slate-400">
//                                   Browse Categories
//                                 </h3>
//                               </div>
//                               <div className="grid grid-cols-2 gap-2">
//                                 {allCategories
//                                   .slice(0, showAllCategories ? 20 : 6)
//                                   .map((category, index) => (
//                                     <button
//                                       key={index}
//                                       onClick={() =>
//                                         handleCategorySearch(category.name)
//                                       }
//                                       className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/70 transition-all duration-300 group"
//                                     >
//                                       <FaBox className="text-slate-500 text-sm group-hover:text-[#E1A95F]" />
//                                       <span className="text-slate-300 text-sm truncate">
//                                         {category.name}
//                                       </span>
//                                     </button>
//                                   ))}
//                               </div>
//                               {allCategories.length > 6 && (
//                                 <button
//                                   onClick={() =>
//                                     setShowAllCategories(!showAllCategories)
//                                   }
//                                   className="w-full mt-3 text-center text-xs text-slate-500 hover:text-[#E1A95F] transition-colors"
//                                 >
//                                   {showAllCategories
//                                     ? "Show Less"
//                                     : `Show All ${allCategories.length} Categories`}
//                                 </button>
//                               )}
//                             </div>
//                           )}

//                         {/* Search Results */}
//                         {searchQuery && (
//                           <div className="p-4">
//                             <div className="flex items-center justify-between mb-3">
//                               <h3 className="text-sm font-semibold text-slate-400">
//                                 {searchResults.length > 0
//                                   ? `Found ${searchResults.length} results`
//                                   : isSearching
//                                     ? "Searching..."
//                                     : "No results found"}
//                               </h3>
//                               {searchResults.length > 0 && (
//                                 <button
//                                   onClick={(e) => handleSearch(e)}
//                                   className="text-xs text-[#E1A95F] hover:text-[#d4a259] font-medium"
//                                 >
//                                   See all →
//                                 </button>
//                               )}
//                             </div>

//                             {searchResults.length > 0 ? (
//                               <div className="space-y-3">
//                                 {searchResults.slice(0, 5).map((product) => (
//                                   <Link
//                                     key={product._id}
//                                     to={`/product/${product._id}`}
//                                     onClick={() => {
//                                       setSearchOpen(false);
//                                       setSearchQuery("");
//                                     }}
//                                     className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-300 group"
//                                   >
//                                     <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
//                                       {product.image ? (
//                                         <img
//                                           src={
//                                             product.image.startsWith("http")
//                                               ? product.image
//                                               : `${API}${product.image}`
//                                           }
//                                           alt={product.name}
//                                           className="w-full h-full object-contain"
//                                           onError={(e) => {
//                                             e.target.onerror = null;
//                                             e.target.src =
//                                               "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop";
//                                           }}
//                                         />
//                                       ) : (
//                                         <FaBox className="text-slate-500" />
//                                       )}
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                       <div className="flex items-start justify-between gap-2">
//                                         <h4 className="text-sm font-medium text-white truncate group-hover:text-[#E1A95F]">
//                                           {product.name}
//                                         </h4>
//                                         <span className="text-sm font-semibold text-[#E1A95F] flex-shrink-0">
//                                           {formatPrice(product.price)}
//                                         </span>
//                                       </div>
//                                       <p className="text-xs text-slate-400 truncate">
//                                         {product.category || "Uncategorized"}
//                                       </p>
//                                       <div className="flex items-center gap-2 mt-1">
//                                         {product.isSold ||
//                                         product.stock === 0 ? (
//                                           <span className="text-xs text-red-500">
//                                             Sold Out
//                                           </span>
//                                         ) : (
//                                           <span className="text-xs text-green-500">
//                                             {product.stock || 0} in stock
//                                           </span>
//                                         )}
//                                       </div>
//                                     </div>
//                                   </Link>
//                                 ))}
//                               </div>
//                             ) : !isSearching ? (
//                               <div className="text-center py-6 bg-white ">
//                                 <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
//                                   <FaSearch className="text-slate-500" />
//                                 </div>
//                                 <p className="text-slate-400 text-sm">
//                                   No products found for "{searchQuery}"
//                                 </p>
//                                 <p className="text-slate-500 text-xs mt-2">
//                                   Try different keywords
//                                 </p>
//                               </div>
//                             ) : null}
//                           </div>
//                         )}
//                       </div>

//                       {/* Search Footer */}
//                       {searchQuery && (
//                         <div className="p-4 border-t border-slate-700 bg-slate-900/50">
//                           <button
//                             onClick={(e) => handleSearch(e)}
//                             className="w-full py-2.5 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300 flex items-center justify-center gap-2"
//                           >
//                             <FaSearch />
//                             Search for "{searchQuery}"
//                           </button>
//                         </div>
//                       )}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Notifications */}
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="relative cursor-pointer group"
//                 onClick={() => navigate("/notifications")}
//               >
//                 <div className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">
//                   <FaBell className="text-slate-300 group-hover:text-[#E1A95F] text-lg transition-colors duration-300" />
//                 </div>
//                 {unreadCount > 0 && (
//                   <motion.span
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg min-w-[22px] text-center"
//                   >
//                     {unreadCount > 9 ? "9+" : unreadCount}
//                   </motion.span>
//                 )}
//               </motion.div>

//               {/* Cart */}
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="relative cursor-pointer group"
//                 onClick={() => navigate("/cart")}
//               >
//                 <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
//                   <FaShoppingCart className="text-[#E1A95F] text-lg group-hover:scale-110 transition-transform duration-300" />
//                 </div>
//                 {cartItemCount > 0 && (
//                   <motion.span
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     className={`absolute -top-1.5 -right-1.5 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg ${
//                       cartItemCount > 9
//                         ? "bg-gradient-to-r from-red-500 to-pink-500"
//                         : "bg-gradient-to-r from-green-500 to-emerald-500"
//                     }`}
//                   >
//                     {cartItemCount > 9 ? "9+" : cartItemCount}
//                   </motion.span>
//                 )}
//               </motion.div>

//               {/* User */}
//               {user && (
//                 <div className="relative">
//                   <motion.div
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="cursor-pointer p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
//                     onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   >
//                     <FaUser className="text-[#E1A95F] text-lg group-hover:scale-110 transition-transform duration-300" />
//                   </motion.div>
//                   <AnimatePresence>
//                     {userMenuOpen && (
//                       <motion.div
//                         className="absolute right-0 top-full mt-2 w-80 bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700 p-4"
//                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <div className="space-y-3">
//                           <div className="pb-3 border-b border-slate-700">
//                             <div className="flex items-center gap-3">
//                               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center text-white font-bold text-lg">
//                                 {user.name.charAt(0).toUpperCase()}
//                               </div>
//                               <div>
//                                 <div className="font-bold text-white">
//                                   Hi, {user.name}
//                                 </div>
//                                 <div className="text-xs text-slate-400">
//                                   {user.email}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           <Link
//                             to="/my-orders"
//                             className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-[#E1A95F] hover:bg-slate-800/50 transition-all duration-300 group"
//                             onClick={() => setUserMenuOpen(false)}
//                           >
//                             <div className="w-1.5 h-1.5 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F]"></div>
//                             <span>My Orders</span>
//                           </Link>

//                           {/* {user.role === "admin" && (
//                             <Link
//                               to="/admin"
//                               className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-green-400 hover:text-green-300 hover:bg-slate-800/50 transition-all duration-300 group"
//                               onClick={() => setUserMenuOpen(false)}
//                             >
//                               <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full group-hover:bg-green-500"></div>
//                               <span>Admin Panel</span>
//                             </Link>
//                           )} */}

//                           <button
//                             onClick={() => {
//                               logout();
//                               setUserMenuOpen(false);
//                             }}
//                             className="w-full mt-2 py-2.5 bg-gradient-to-r from-red-600/10 to-pink-600/10 hover:from-red-600/20 hover:to-pink-600/20 text-red-400 hover:text-red-300 rounded-xl font-medium transition-all duration-300 border border-red-500/20 flex items-center justify-center gap-2"
//                           >
//                             <span>Sign Out</span>
//                           </button>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               )}

//               {/* Mobile Menu Button */}
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
//               >
//                 {menuOpen ? (
//                   <FaTimes className="text-[#E1A95F] text-xl" />
//                 ) : (
//                   <FaBars className="text-slate-300 text-xl" />
//                 )}
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {menuOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setMenuOpen(false)}
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
//             />

//             {/* Mobile Menu Panel */}
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25 }}
//               className="fixed top-0 right-0 h-full w-full max-w-sm z-50 lg:hidden"
//             >
//               <div className="h-full bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl overflow-y-auto">
//                 {/* Mobile Header */}
//                 <div className="p-6 border-b border-slate-700">
//                   <div className="flex items-center justify-between mb-6">
//                     <div className="flex items-center gap-3">
//                       <img src={logo} alt="Logo" className="w-10 h-10" />
//                       <h2 className="text-2xl font-bold text-white">Menu</h2>
//                     </div>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => setMenuOpen(false)}
//                       className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
//                     >
//                       <FaTimes className="text-[#E1A95F] text-xl" />
//                     </motion.button>
//                   </div>

//                   {/* User Info Mobile */}
//                   {user && (
//                     <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-gradient-to-r from-[#E1A95F]/10 to-[#d4a259]/10 border border-[#E1A95F]/20">
//                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center text-white font-bold text-lg">
//                         {user.name.charAt(0).toUpperCase()}
//                       </div>
//                       <div>
//                         <div className="font-bold text-white">{user.name}</div>
//                         <div className="text-sm text-slate-400">
//                           {user.email}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Mobile Links */}
//                 <div className="p-6 space-y-2">
//                   {links.map((link, index) => (
//                     <Link
//                       key={index}
//                       to={link.path}
//                       onClick={() => setMenuOpen(false)}
//                       className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
//                         location.pathname === link.path
//                           ? "bg-gradient-to-r from-[#E1A95F]/20 to-[#d4a259]/20 text-[#E1A95F]"
//                           : "text-slate-300 hover:text-white hover:bg-slate-800"
//                       }`}
//                     >
//                       <div
//                         className={`w-1.5 h-1.5 rounded-full ${
//                           location.pathname === link.path
//                             ? "bg-[#E1A95F]"
//                             : "bg-slate-600"
//                         }`}
//                       ></div>
//                       <span className="font-medium">{link.name}</span>
//                     </Link>
//                   ))}

//                   {/* Shop Section Mobile */}
//                   <div className="space-y-2">
//                     <button
//                       onClick={() => toggleDropdown("shop-mobile")}
//                       className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
//                         <span className="font-medium">Shop</span>
//                       </div>
//                       <FaChevronDown
//                         className={`transition ${
//                           openDropdown === "shop-mobile" ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>

//                     <AnimatePresence>
//                       {openDropdown === "shop-mobile" && (
//                         <motion.div
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           className="ml-4 pl-4 border-l border-slate-700 space-y-2"
//                         >
//                           {categories.map((cat, i) => (
//                             <button
//                               key={i}
//                               onClick={() => {
//                                 navigate(`/category/${cat.name.toLowerCase()}`);
//                                 setMenuOpen(false);
//                               }}
//                               className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-slate-400 hover:text-[#E1A95F] hover:bg-slate-800/50 transition-all duration-300 text-left"
//                             >
//                               <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
//                               <span>{cat.name}</span>
//                             </button>
//                           ))}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   {/* Theme Toggle Mobile */}
//                   <div className="mt-6 pt-6 border-t border-slate-700">
//                     <div className="flex items-center justify-between px-4">
//                       <span className="text-slate-300 font-medium">Theme</span>
//                       <ThemeToggle />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Mobile Footer */}
//                 <div className="p-6 border-t border-slate-700 mt-auto">
//                   <div className="space-y-3">
//                     <button
//                       onClick={() => {
//                         navigate("/notifications");
//                         setMenuOpen(false);
//                       }}
//                       className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all duration-300"
//                     >
//                       <div className="flex items-center gap-3">
//                         <FaBell className="text-[#E1A95F]" />
//                         <span>Notifications</span>
//                       </div>
//                       {unreadCount > 0 && (
//                         <span className="bg-gradient-to-r from-red-500 to-pink-500 text-xs font-bold px-2 py-1 rounded-full text-white">
//                           {unreadCount > 9 ? "9+" : unreadCount}
//                         </span>
//                       )}
//                     </button>

//                     {user && user.role === "admin" && (
//                       <button
//                         onClick={() => {
//                           navigate("/admin");
//                           setMenuOpen(false);
//                         }}
//                         className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 text-green-400 hover:text-green-300 transition-all duration-300"
//                       >
//                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
//                         <span>Admin Panel</span>
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Scroll Progress Bar */}
//       <motion.div
//         className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E1A95F] via-[#d4a259] to-[#E1A95F] z-50"
//         style={{ scaleX: scrolled ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//       />
//     </>
//   );
// };

// export default Navigation;
