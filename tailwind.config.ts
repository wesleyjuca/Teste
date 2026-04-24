import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./features/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B3C5D",
        accent: "#328CC1",
        surface: "#F5F7FA"
      }
    }
  },
  plugins: []
};

export default config;
