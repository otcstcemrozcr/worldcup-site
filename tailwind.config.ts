import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: {
          950: "#04060A",
          900: "#080C15",
          800: "#0D1220",
          700: "#111B2E",
          600: "#1A2640",
        },
        gold: {
          300: "#FFE082",
          400: "#FFD54F",
          500: "#C9A84C",
          600: "#A07830",
        },
        neon: "#00E87A",
        "neon-dim": "#00A855",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #080C15 0%, #111B2E 50%, #0a1628 100%)",
        "gold-gradient": "linear-gradient(135deg, #FFD54F 0%, #C9A84C 100%)",
        "neon-gradient": "linear-gradient(135deg, #00E87A 0%, #00A855 100%)",
        "card-gradient": "linear-gradient(180deg, transparent 0%, rgba(4,6,10,0.95) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "ticker": "ticker 30s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "gold-glow": "0 0 20px rgba(201,168,76,0.3)",
        "neon-glow": "0 0 20px rgba(0,232,122,0.25)",
        "card": "0 4px 24px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
