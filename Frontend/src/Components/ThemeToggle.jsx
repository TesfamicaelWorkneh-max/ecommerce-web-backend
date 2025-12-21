import React from "react";
import { useTheme } from "../Context/ThemeContext.jsx";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </motion.button>
  );
};

export default ThemeToggle;
