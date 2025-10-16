/** @format */

import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#e5e7eb",
            a: {
              color: "#3b82f6",
              "&:hover": {
                color: "#60a5fa",
              },
            },
            strong: {
              color: "#e5e7eb",
            },
            h1: {
              color: "#e5e7eb",
            },
            h2: {
              color: "#e5e7eb",
            },
            h3: {
              color: "#e5e7eb",
            },
            h4: {
              color: "#e5e7eb",
            },
            blockquote: {
              color: "#e5e7eb",
              borderLeftColor: "#4b5563",
            },
            code: {
              color: "#e5e7eb",
            },
            pre: {
              color: "#e5e7eb",
              backgroundColor: "#1f2937",
            },
            thead: {
              color: "#e5e7eb",
              borderBottomColor: "#4b5563",
            },
            tbody: {
              tr: {
                borderBottomColor: "#4b5563",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
