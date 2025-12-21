// src/Components/LoadingSpinner.jsx
import React from "react";

const LoadingSpinner = ({ size = 8, color = "yellow-400" }) => {
  return (
    <div
      className={`w-${size} h-${size} border-4 border-t-${color} border-gray-200 rounded-full animate-spin mx-auto`}
    />
  );
};

export default LoadingSpinner;
