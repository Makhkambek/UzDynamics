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
        bg:     "#0a0a0a",
        card:   "#111111",
        hover:  "#1a1a1a",
        accent: "#00ff41",
        muted:  "#666666",
        dim:    "#404040",
        danger: "#ff3333",
        amber:  "#ffb000",
        border: "#222222",
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "-apple-system", "sans-serif"],
        mono:    ["var(--font-jetbrains)", "'Fira Code'", "monospace"],
        display: ["var(--font-space)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
