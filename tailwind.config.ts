import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./features/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#012E52",
        secondary: "#E31B23",
        accent: "#0C4A78",
        surface: "#F5F7FA"
      }
    }
  },
  plugins: []
};

export default config;
