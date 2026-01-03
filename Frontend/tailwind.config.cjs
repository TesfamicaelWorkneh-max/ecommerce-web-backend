/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode with .dark class on root element
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // all JS/TS/HTML files in src
    "./public/index.html", // your public HTML file
    "./*.html", // any other HTML files in root
  ],
  // theme: {
  //   extend: {
  //     colors: {
  //       cream: {
  //         50: "#FFFBF5",
  //         100: "#F9F5F0",
  //         200: "#F0E6D6",
  //         300: "#E8D8BC",
  //         400: "#D9C39C",
  //         500: "#C9AE7C",
  //         600: "#B9995C",
  //         700: "#9A7D43",
  //         800: "#7B612A",
  //         900: "#5C4511",
  //       },
  //     },
  //     backgroundImage: {
  //       "grid-amber-200/20":
  //         "linear-gradient(to right, rgba(253, 230, 138, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(253, 230, 138, 0.2) 1px, transparent 1px)",
  //       "grid-purple-900/20":
  //         "linear-gradient(to right, rgba(76, 29, 149, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(76, 29, 149, 0.2) 1px, transparent 1px)",
  //     },
  //     animation: {
  //       "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  //     },

  //   },
  // },
  // tailwind.config.js
  theme: {
    extend: {
      colors: {
        primaryBg: "#EEEEEE",
        lightBg: "#D8C9A7",
        accent: "#D7C097",
        // You might also want these for dark mode
        dark: "#111827",
      },
    },
  },
  plugins: [
    // Add plugins here if needed
  ],
};
