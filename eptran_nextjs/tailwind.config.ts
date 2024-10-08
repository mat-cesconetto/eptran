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
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkBlue: {
          100: "#ccd7de",
          200: "#9aafbd",
          300: "#67889b",
          400: "#003966",
          500: "#023859",
          600: "#022d47",
          700: "#012235",
          800: "#011624",
          900: "#000b12"
        },
      },
    },
  },
  plugins: [],
};
export default config;
