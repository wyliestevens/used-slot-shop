import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff8e1",
          100: "#ffecb3",
          200: "#ffe082",
          300: "#ffd54f",
          400: "#ffca28",
          500: "#ffb300",
          600: "#ff8f00",
          700: "#e65100",
          800: "#bf360c",
          900: "#8c1c0c",
        },
        ink: {
          950: "#06070a",
          900: "#0b0d14",
          800: "#11141d",
          700: "#1a1e2a",
          600: "#262b3a",
          500: "#3a3f52",
          400: "#646a80",
          300: "#9aa0b4",
          200: "#c9cddb",
          100: "#e6e8f0",
          50: "#f4f5f9",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,179,0,.35), 0 10px 40px -10px rgba(255,143,0,.35)",
      },
      backgroundImage: {
        "radial-gold":
          "radial-gradient(ellipse at top, rgba(255,179,0,.25), transparent 55%), radial-gradient(ellipse at bottom, rgba(191,54,12,.2), transparent 55%)",
      },
    },
  },
  plugins: [],
};

export default config;
