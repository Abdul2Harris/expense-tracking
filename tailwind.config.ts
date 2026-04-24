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
        bg:               "var(--bg)",
        surface:          "var(--surface)",
        surface2:         "var(--surface2)",
        border:           "var(--border)",
        "border-strong":  "var(--border-strong)",
        sidebar:          "var(--sidebar)",
        "sidebar-hover":  "var(--sidebar-hover)",
        "sidebar-active": "var(--sidebar-active)",
        text1:            "var(--text-1)",
        text2:            "var(--text-2)",
        text3:            "var(--text-3)",
        accent:           "var(--accent)",
        "accent-light":   "var(--accent-light)",
        "accent-dim":     "var(--accent-dim)",
        green:            "var(--green)",
        "green-light":    "var(--green-light)",
        red:              "var(--red)",
        "red-light":      "var(--red-light)",
        amber:            "var(--amber)",
        "amber-light":    "var(--amber-light)",
      },
      fontFamily: {
        sans: "var(--sans)",
        mono: "var(--mono)",
      },
      borderRadius: {
        sm:  "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        lg:  "var(--radius-lg)",
        pill: "9999px",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        lg: "var(--shadow-lg)",
      },
    },
  },
  plugins: [],
};

export default config;
