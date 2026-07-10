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
        // Identidade visual — Albergue São Vicente de Paula
        svp: {
          cream:   "#F6EFE3", // fundo quente principal
          linen:   "#EDE4D3", // fundo levemente mais escuro (cards, seções)
          sienna:  "#803320", // terracota — cor primária
          rose:    "#A8492D", // terracota mais claro (hover)
          forest:  "#2D5A27", // verde floresta — cor secundária
          sage:    "#4A7E43", // verde mais claro (hover)
          amber:   "#B8892A", // dourado âmbar — destaque
          gold:    "#E8C06A", // dourado claro — acento sobre fundos escuros
          dark:    "#18120B", // quase-preto quente
          brown:   "#4A3728", // marrom médio
          muted:   "#8A7464", // texto secundário
          border:  "#D9CEBD", // bordas suaves
        },
      },
      fontFamily: {
        display: ["var(--font-lora)", "Georgia", "serif"],
        body:    ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up":   "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":   "fade-in 0.6s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
