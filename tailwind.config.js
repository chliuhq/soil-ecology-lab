/** @type {import('tailwindcss').Config} */
module.exports = {
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
      },
      fontFamily: {
        serif: ['"Source Serif 4"', '"Noto Serif SC"', "Georgia", "serif"],
        sans: ['"Inter"', '"Noto Sans SC"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
