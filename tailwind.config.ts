import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#E5E7EB",
        input: "#E5E7EB",
        ring: "#36454F",
        background: "#ffffff",
        foreground: "#36454F",
        primary: {
          DEFAULT: "#36454F",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#ffffff",
          foreground: "#36454F",
        },
        success: {
          DEFAULT: "#4CAF50",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#F8F9FA",
          foreground: "#36454F",
        },
        accent: {
          DEFAULT: "#F1F5F9",
          foreground: "#36454F",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#36454F",
        }
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      keyframes: {
        "progress-advance": {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width)" },
        },
        "gradient-shift": {
          "0%": { "background-position": "0% 50%" },
          "100%": { "background-position": "100% 50%" },
        },
      },
      animation: {
        "progress-advance": "progress-advance 1s ease-out forwards",
        "gradient-shift": "gradient-shift 3s linear infinite",
      },
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(109.6deg, rgba(223,234,247,0.2) 11.2%, rgba(244,248,252,0.2) 91.1%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;