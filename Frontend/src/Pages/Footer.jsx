import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaShieldAlt,
  FaTruck,
  FaCreditCard,
  FaHeadset,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Best Sellers", path: "/best-sellers" },
  ];

  const customerService = [
    { name: "Contact Us", path: "/contact" },
    { name: "FAQs", path: "/faqs" },
    { name: "Shipping Info", path: "/shipping" },
    { name: "Return Policy", path: "/policy" },
    { name: "Track Order", path: "/my-orders" },
  ];

  const company = [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
    { name: "Press", path: "/press" },
    { name: "Affiliate Program", path: "/affiliate" },
  ];

  const policies = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Accessibility", path: "/accessibility" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, name: "Facebook", url: "#" },
    { icon: <FaTwitter />, name: "Twitter", url: "#" },
    { icon: <FaInstagram />, name: "Instagram", url: "#" },
    { icon: <FaPinterestP />, name: "Pinterest", url: "#" },
    { icon: <FaYoutube />, name: "YouTube", url: "#" },
  ];

  const trustBadges = [
    {
      icon: <FaShieldAlt />,
      text: "Secure Payment",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaTruck />,
      text: "Fast Delivery",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FaCreditCard />,
      text: "Easy Returns",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FaHeadset />,
      text: "24/7 Support",
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-700/50">
          {/* Logo & Description */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 flex items-center justify-center">
                <IoSparkles className="text-2xl" />
              </div>
              <div>
                <div className="text-2xl font-bold">AdesCart</div>
                <div className="text-sm text-slate-400">
                  Premium Shopping Experience
                </div>
              </div>
            </motion.div>
            <p className="text-slate-400 leading-relaxed">
              Your trusted destination for premium products, exceptional
              quality, and outstanding customer service since 2020.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-slate-700 to-slate-800 flex items-center justify-center hover:from-amber-500 hover:to-rose-500 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-500" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-500" />
              Customer Service
            </h3>
            <ul className="space-y-3">
              {customerService.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-500" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-slate-700 to-slate-800 flex items-center justify-center mt-1">
                  <FaPhone className="text-amber-500" />
                </div>
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-slate-400">+(2519)64623413</div>
                </div>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-slate-700 to-slate-800 flex items-center justify-center mt-1">
                  <FaEnvelope className="text-amber-500" />
                </div>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-slate-400">
                    worknehtesfamicael707@gmail.com
                  </div>
                </div>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-slate-700 to-slate-800 flex items-center justify-center mt-1">
                  <FaMapMarkerAlt className="text-amber-500" />
                </div>
                <div>
                  <div className="font-medium">Address</div>
                  <div className="text-slate-400">
                    Platnium Plaza
                    <br />
                    Front of AU delegation
                  </div>
                </div>
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/30 backdrop-blur-sm"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${badge.color} flex items-center justify-center`}
                >
                  {badge.icon}
                </div>
                <div className="font-medium">{badge.text}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-700/50">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-slate-400 text-sm">
              © 2024 Ades. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {company.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-slate-400 hover:text-white text-sm transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {policies.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-slate-400 hover:text-white text-sm transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center text-slate-500 text-sm">
            <div className="flex items-center justify-center gap-2">
              <span>Made with</span>
              <FaHeart className="text-rose-500 animate-pulse" />
              <span>
                by the{" "}
                <sapn className="text-red-800 font-bold text-2xl">Ades </sapn>
                team
              </span>
            </div>
            <div className="mt-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-slate-800 to-slate-900 text-xs">
                Premium E-commerce Platform
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 flex items-center justify-center shadow-2xl shadow-amber-500/30 z-50"
        aria-label="Chat with us"
      >
        <FaHeadset className="text-xl" />
      </motion.button>
    </footer>
  );
};

export default Footer;
