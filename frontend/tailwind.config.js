/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        glass: "rgba(15, 23, 42, 0.65)",
        neon: {
          blue: "#38bdf8",
          purple: "#a78bfa",
        },
      },
      boxShadow: {
        glow: "0 0 24px rgba(56, 189, 248, 0.35)",
        "glow-purple": "0 0 24px rgba(167, 139, 250, 0.35)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
