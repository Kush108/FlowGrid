import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a1628",
        foreground: "#f1f5f9",
        brand: {
          bg: "#0a1628",
          surface: "#0f1f35",
          surface2: "#0b172c",
          border: "rgba(255,255,255,.08)",
          text: "#f1f5f9",
          muted: "rgba(255,255,255,.45)",
          green: "#22c55e",
          blue: "#0ea5e9",
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 3.6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "grid-drift": "grid-drift 28s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "grid-drift": {
          "0%": { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "56px 56px" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
