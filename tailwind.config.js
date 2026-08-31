/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "'Inter'", "sans-serif"],
      },
      colors: {
        navy: {
          950: "#0B1120",
          900: "#0F1729",
          800: "#161F36",
          700: "#1E2A47",
          600: "#2A3A5C",
        },
        brand: {
          50: "#F2F0FF",
          100: "#E6E1FF",
          200: "#C9BFFF",
          300: "#A996FF",
          400: "#8C6EFA",
          500: "#7A5AF8",
          600: "#6C47E8",
          700: "#5936C7",
        },
        surface: "#F6F7FB",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06)",
        panel: "0 4px 24px rgba(16, 24, 40, 0.06)",
        popover: "0 12px 32px rgba(16, 24, 40, 0.14)",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0, transform: "translateY(4px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        popIn: { from: { opacity: 0, transform: "scale(0.97)" }, to: { opacity: 1, transform: "scale(1)" } },
      },
      animation: {
        fadeIn: "fadeIn 0.25s ease-out",
        popIn: "popIn 0.18s ease-out",
      },
    },
  },
  plugins: [],
};
