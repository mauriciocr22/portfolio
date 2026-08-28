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
        "nav-text": "var(--color-nav-text)",
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
      // Nav-only contrast-safety scrim (src/globals.css --nav-scrim). A
      // solid-color gradient so it lands on background-image and stacks on
      // top of bg-glass-bg's background-color rather than replacing it —
      // additive, per the brief's "scrim, not a global opacity increase".
      backgroundImage: {
        "nav-scrim": "linear-gradient(var(--nav-scrim), var(--nav-scrim))",
      },
      borderRadius: {
        glass: "var(--glass-radius)",
        // Named "badge", not "sm" — Tailwind's own `sm` scale key already
        // means something else (2px) and is still in use by not-yet-
        // redesigned sections (Home, About); overriding it would silently
        // reskin those too.
        badge: "var(--radius-sm)",
      },
      boxShadow: {
        glass: "var(--glass-shadow)",
        hover: "var(--shadow-hover)",
        "marquee-badge": "var(--marquee-badge-shadow)",
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
    function ({ addVariant, addUtilities }) {
      addVariant(
        "reduced-transparency",
        "@media (prefers-reduced-transparency: reduce)"
      );
      addVariant(
        "no-backdrop-filter",
        "@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))"
      );
      // Nav-only legibility halo (src/globals.css --nav-halo). Mode-aware:
      // .nav-halo is a text-shadow for nav text, .nav-halo-graphic the
      // matching drop-shadow for nav icons/flags/logo. Gives glyphs a
      // local contrast floor over busy scrolled content in the direction
      // the single-tint --nav-scrim can't reach; tiny enough to disappear
      // over calm backgrounds.
      addUtilities({
        ".nav-halo": {
          textShadow: "var(--nav-halo-core), var(--nav-halo-spread)",
        },
        ".nav-halo-graphic": {
          filter:
            "drop-shadow(var(--nav-halo-core)) drop-shadow(var(--nav-halo-spread))",
        },
      });
    },
  ],
  darkMode: "class",
};
