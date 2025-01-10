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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#ffffff",
        foreground: "#1A1F2C",
        primary: {
          DEFAULT: "#0EA5E9",
          foreground: "#1A1F2C",
        },
        secondary: {
          DEFAULT: "#ffffff",
          foreground: "#1A1F2C",
        },
        success: {
          DEFAULT: "#10B981",
          foreground: "#1A1F2C",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "#1A1F2C",
        },
        muted: {
          DEFAULT: "#F8F9FA",
          foreground: "#1A1F2C",
        },
        accent: {
          DEFAULT: "#F1F5F9",
          foreground: "#1A1F2C",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1A1F2C",
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
      },
      animation: {
        "progress-advance": "progress-advance 1s ease-out forwards",
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom right, #E5F2FF, #F1F5F9)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;