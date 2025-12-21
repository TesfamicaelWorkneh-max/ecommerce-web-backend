/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode with .dark class on root element
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // all JS/TS/HTML files in src
    "./public/index.html", // your public HTML file
    "./*.html", // any other HTML files in root
  ],
  theme: {
    extend: {
      keyframes: {
        pulseHeight: {
          "0%, 100%": { height: "50px" },
          "50%": { height: "200px" },
        },
      },
      animation: {
        "pulse-height": "pulseHeight 4s infinite ease-in-out",
      },
    },
  },
  plugins: [
    // Add plugins here if needed
  ],
};
