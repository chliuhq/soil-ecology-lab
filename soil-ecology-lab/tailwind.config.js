/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2c5f2d",
        "primary-dark": "#1a3c1b",
        accent: "#97bc62",
        "text-main": "#333333",
        "text-light": "#666666",
        "bg-light": "#f8f9fa",
        // New design system colors
        "primary-blue": "#1e3a5f",
        "accent-green": "#2d6a4f",
        earth: "#d4a373",
        "dark-bg": "#0f172a",
        "dark-surface": "#1e293b",
      },
      fontFamily: {
        serif: ['"Source Serif 4"', '"Noto Serif SC"', "Georgia", "serif"],
        sans: ['"Inter"', '"Noto Sans SC"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
