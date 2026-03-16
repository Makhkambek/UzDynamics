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
        background: "#0a0a0a",
        card: "#0d0d0d",
        accent: "#00ff88",
        danger: "#ff3366",
        warning: "#ffaa00",
      },
      fontFamily: {
        display: ["var(--font-vt323)", "monospace"],
        mono: ["var(--font-share-tech)", "'Courier New'", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
