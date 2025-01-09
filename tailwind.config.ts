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
          DEFAULT: "#33C3F0",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#2A2F3C",
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "#10B981",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#374151",
          foreground: "#D1D5DB",
        },
        accent: {
          DEFAULT: "#2A2F3C",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#1A1F2C",
          foreground: "#ffffff",
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
        'gradient-dark': 'linear-gradient(to bottom right, #1A1F2C, #2A2F3C)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;