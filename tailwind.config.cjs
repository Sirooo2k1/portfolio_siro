/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lora", "serif"],
        heading: ["Lora", "serif"],
        japanese: ["Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Meiryo", "Yu Gothic", "MS PGothic", "sans-serif"],
        lora: ["Lora", "serif"],
      },
      colors: {
        primary: "#FAFCC6",
        secondary: "#6B7280",
        tertiary: "#F3F4F6",
        "black-100": "#374151",
        "black-200": "#1F2937",
        "white-100": "#FAFCC6",
        "cream-100": "#F9F7F3",
        "cream-200": "#F3F0EB",
        "cream-300": "#EDE7E0",
        "warm-100": "#F4F1EC",
        "warm-200": "#EBE7E0",
        "warm-300": "#E2DCD4",
        "text-dark": "#374151",
        "text-medium": "#6B7280",
        "text-light": "#9CA3AF",
        "accent-100": "#D97706",
        "accent-200": "#EA580C",
        "accent-300": "#DC2626",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      spacing: {
        '17': '4.25rem',  // 68px
        '19': '4.75rem',  // 76px
        '21': '5.25rem',  // 84px
        '23': '5.75rem',  // 92px
        '25': '6.25rem',  // 100px
        '27': '6.75rem',  // 108px
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
