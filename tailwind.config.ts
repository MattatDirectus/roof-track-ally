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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#33C3F0",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#FFDEE2",
          foreground: "#1A1F2C",
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
          DEFAULT: "#D3E4FD",
          foreground: "#403E43",
        },
        accent: {
          DEFAULT: "#D3E4FD",
          foreground: "#1A1F2C",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
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
        'gradient-brand': 'linear-gradient(102.3deg, rgba(51,195,240,1) 5.9%, rgba(211,228,253,1) 64%, rgba(255,222,226,1) 89%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;