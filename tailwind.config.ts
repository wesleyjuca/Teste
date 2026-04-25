import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./features/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e6eff6",
          100: "#c8dced",
          500: "#013960",
          600: "#012e52",
          700: "#01213d"
        },
        accent: {
          100: "#fde8ea",
          500: "#e31b23",
          600: "#c7171e"
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          elevated: "hsl(var(--surface-elevated))",
          muted: "hsl(var(--surface-muted))"
        },
        text: {
          DEFAULT: "hsl(var(--text-primary))",
          muted: "hsl(var(--text-muted))",
          inverse: "hsl(var(--text-inverse))"
        },
        border: {
          subtle: "hsl(var(--border-subtle))",
          strong: "hsl(var(--border-strong))"
        },
        focus: "hsl(var(--focus-ring))",
        success: {
          bg: "hsl(var(--success-bg))",
          fg: "hsl(var(--success-fg))"
        },
        danger: {
          bg: "hsl(var(--danger-bg))",
          fg: "hsl(var(--danger-fg))"
        }
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        pill: "999px"
      },
      boxShadow: {
        card: "var(--shadow-card)",
        panel: "var(--shadow-panel)",
        focus: "0 0 0 3px hsl(var(--focus-ring) / 0.35)"
      },
      spacing: {
        section: "var(--space-section)",
        gutter: "var(--space-gutter)",
        card: "var(--space-card)"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"]
      },
      fontSize: {
        display: ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.1", fontWeight: "700" }],
        h1: ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["clamp(1.375rem, 2.4vw, 1.875rem)", { lineHeight: "1.25", fontWeight: "650" }]
      }
    }
  },
  plugins: []
};

export default config;
