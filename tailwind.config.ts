import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette — coral/salmon, sampled from the "USED" wordmark in the logo.
        brand: {
          50: "#fff4f0",
          100: "#ffe2d7",
          200: "#ffcab9",
          300: "#ffae94",
          400: "#f59679",
          500: "#ef7a58",
          600: "#d65a3d",
          700: "#a8472f",
          800: "#7d3524",
          900: "#502318",
        },
        // Accent palette — sage mint, sampled from the slot-machine icon + "SLOT SHOP" text.
        accent: {
          50: "#f0f7f4",
          100: "#deece4",
          200: "#c2ded1",
          300: "#a5cfbf",
          400: "#8bbfaa",
          500: "#73ae93",
          600: "#5a9278",
          700: "#46715d",
          800: "#365544",
          900: "#243a30",
        },
        // Cream — the logo's background, used sparingly as a warm neutral.
        cream: {
          50: "#faf6f0",
          100: "#f5efe3",
          200: "#ebe1cd",
        },
        // Ink — dark-mode foundation. Warmed very slightly with green undertone
        // so coral + mint read as cohesive against it.
        ink: {
          950: "#08090c",
          900: "#0d1014",
          800: "#151922",
          700: "#1f2431",
          600: "#2c3243",
          500: "#424858",
          400: "#6b7289",
          300: "#9ea4ba",
          200: "#cbd0de",
          100: "#e7e9f1",
          50: "#f5f6fa",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow:
          "0 0 0 1px rgba(239,122,88,.35), 0 10px 40px -10px rgba(239,122,88,.35)",
        mint:
          "0 0 0 1px rgba(139,191,170,.35), 0 10px 40px -10px rgba(115,174,147,.3)",
      },
      backgroundImage: {
        // Bright coral + mint glow behind the hero. High opacity so the mint is
        // unmistakable against the near-black backdrop.
        "radial-gold":
          "radial-gradient(ellipse at top right, rgba(239,122,88,.55), transparent 50%), radial-gradient(ellipse at bottom left, rgba(139,191,170,.55), transparent 50%)",
        "radial-brand":
          "radial-gradient(ellipse at top right, rgba(239,122,88,.55), transparent 50%), radial-gradient(ellipse at bottom left, rgba(139,191,170,.55), transparent 50%)",
        // Subtle mint wash for section backgrounds that need to lean sage.
        "mint-wash":
          "linear-gradient(180deg, rgba(139,191,170,.10), rgba(139,191,170,.04) 40%, transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
