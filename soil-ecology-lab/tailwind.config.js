/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /* ── 土壤层理大地色系 ── */
        primary: "#3a6244",        // 腐殖质林绿
        "primary-dark": "#26452e",
        accent: "#c98a3d",          // 赭石黄（氧化铁）
        "accent-soft": "#e3c9a0",
        rust: "#b3552e",            // 铁锈红点缀
        "text-main": "#302c24",     // 暖墨色
        "text-light": "#6d6455",
        "bg-light": "#f2ede1",      // 深一度纸色（分区背景）
        paper: "#f7f4ec",           // 野外记录纸
        "paper-card": "#fffdf7",
        // 兼容旧 token
        "primary-blue": "#1e3a5f",
        "accent-green": "#2d6a4f",
        earth: "#d4a373",
        "dark-bg": "#141812",       // 夜间壤土
        "dark-surface": "#1e241b",
      },
      fontFamily: {
        serif: ['var(--font-display)', '"Noto Serif SC"', "Georgia", "serif"],
        sans: ['var(--font-body)', '"Noto Sans SC"', "system-ui", "sans-serif"],
      },
      /* 把整个 gray 色阶覆盖为暖石色 —— 全站边框/文字一次性变暖 */
      gray: {
        50: "#faf9f5",
        100: "#f1eee5",
        200: "#e3ded1",
        300: "#ccc4b2",
        400: "#a2987f",
        500: "#857b66",
        600: "#6a6152",
        700: "#514a3e",
        800: "#38332a",
        900: "#26231c",
      },
      boxShadow: {
        card: "0 1px 2px rgba(48,44,36,0.05), 0 8px 24px -12px rgba(48,44,36,0.15)",
        "card-hover": "0 2px 4px rgba(48,44,36,0.06), 0 16px 32px -12px rgba(48,44,36,0.22)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
