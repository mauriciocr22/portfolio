/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        spartan: ["League Spartan", "sans-serif"],
        canada: ["Radio Canada Big", "sans-serif"],
      },
      animation: {
        scroll: "animate 2s infinite",
      },
      keyframes: {
        animate: {
          "0%": {
            opacity: 0,
            transform: "rotate(45deg) translate(-20px,-20px)",
          },
          "50%": { opacity: 1 },
          "100%": {
            opacity: 0,
            transform: "rotate(45deg) translate(20px,20px)",
          },
        },
      },
      // Redesign_Brief.md §3/§5 — raw custom properties from src/globals.css
      // mapped to named utilities. Add here before ever using an arbitrary
      // value in a component.
      colors: {
        canvas: "var(--color-canvas)",
        "surface-solid": "var(--color-surface-solid)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        subtle: "var(--color-border)",
        "button-bg": "var(--color-button-bg)",
        "button-bg-hover": "var(--color-button-bg-hover)",
        "button-text": "var(--color-button-text)",
        "glass-bg": "var(--glass-bg)",
        "glass-border": "var(--glass-border)",
      },
      backdropBlur: {
        glass: "var(--glass-blur)",
      },
      borderRadius: {
        glass: "var(--glass-radius)",
      },
      boxShadow: {
        glass: "var(--glass-shadow)",
      },
      spacing: {
        "canvas-margin-mobile": "var(--canvas-margin-mobile)",
        "canvas-margin-desktop": "var(--canvas-margin-desktop)",
        "panel-gap": "var(--panel-gap)",
      },
    },
    screens: {
      iphone: "376px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [
    // Redesign_Brief.md §8 — accessibility fallbacks with no built-in Tailwind
    // variant: solid fallback when the OS asks for reduced transparency, and
    // when backdrop-filter isn't supported at all (§9 tier 3).
    function ({ addVariant }) {
      addVariant(
        "reduced-transparency",
        "@media (prefers-reduced-transparency: reduce)"
      );
      addVariant(
        "no-backdrop-filter",
        "@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))"
      );
    },
  ],
  darkMode: "class",
};
