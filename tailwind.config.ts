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
        background: "#F1F0FB",
        foreground: "#1A1F2C",
        primary: {
          DEFAULT: "#0EA5E9",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#F3F3F3",
          foreground: "#403E43",
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
          DEFAULT: "#E5DEFF",
          foreground: "#403E43",
        },
        accent: {
          DEFAULT: "#D3E4FD",
          foreground: "#403E43",
        },
        card: {
          DEFAULT: "#F3F3F3",
          foreground: "#403E43",
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
        'gradient-dark': 'linear-gradient(to bottom right, #F1F0FB, #E5DEFF)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;