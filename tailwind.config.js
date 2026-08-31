/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        spartan: ["League Spartan", "sans-serif"],
        canada: ["Radio Canada Big", "sans-serif"],
        // Redesign_Brief.md §4 — the one display face, restricted to h1/h2.
        // Self-hosted @font-face lives in src/globals.css (latin + latin-ext
        // subsets only); the fallback chain matches the brief verbatim.
        display: [
          '"Bricolage Grotesque Variable"',
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      // Redesign_Brief.md §4 type scale. Each token carries its own
      // line-height, tracking and weight so one utility is the whole spec.
      // Negative tracking only above 40px (§4), so it's baked into display/
      // heading but not the smaller roles. `*-sm` keys are the mobile sizes
      // from the table — apply the base key at `md:`.
      fontSize: {
        "display-sm": [
          "44px",
          { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "600" },
        ],
        display: [
          "80px",
          { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "600" },
        ],
        "heading-sm": [
          "32px",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        heading: [
          "44px",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        // Section heading — the single visible <h2> of a content section
        // (Tech Stack, Projects), owned by <SectionHeading>. The §4 "Section
        // heading" role, sat at the top of its 40–48px / 30–34px range with
        // tracking pulled a touch tighter than the generic `heading` token so
        // the larger size still reads tight. Paired mobile/desktop like
        // display and lead: `section-sm` is the base, `md:text-section` on
        // top. Line-heights stay RELATIVE so they scale with the size; weight
        // is left to the component's `font-semibold`, matching how the h1
        // sets its own.
        "section-sm": ["30px", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        section: ["48px", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        "subheading-sm": ["18px", { lineHeight: "1.4", fontWeight: "500" }],
        subheading: ["19px", { lineHeight: "1.4", fontWeight: "500" }],
        // Lead paragraph — the opening sentence of a body block, promoted so
        // it carries the section when there's no visible heading (About).
        // -0.02em tracking is deliberate at this size (the §4 "40px+ only"
        // note is about display/heading tracking); weight stays 400. Both
        // sizes keep a RELATIVE line-height so it scales with the font size;
        // `lead-sm` is the mobile step, applied with `md:text-lead` on top.
        "lead-sm": ["22px", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
        lead: ["26px", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
        body: ["16px", { lineHeight: "1.7" }],
        caption: ["13px", { lineHeight: "1.5" }],
      },
      animation: {
        // Redesign_Brief.md §6 — page-load: one brief fade/rise on primary
        // content. Consumers pair it with `motion-reduce:animate-none` (§8)
        // so reduced-motion users land straight on the end state.
        "fade-rise": "fade-rise 500ms ease-out both",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
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
        // Responsive edge-gap alias (globals.css --canvas-margin) plus the
        // hero's nav clearance: nav height + one canvas margin, so centred
        // hero content never sits under the fixed nav.
        "canvas-margin": "var(--canvas-margin)",
        "nav-offset": "calc(var(--nav-height) + var(--canvas-margin))",
        "panel-gap": "var(--panel-gap)",
      },
      minHeight: {
        // Redesign_Brief.md §4 hero spec — 85svh less the fixed nav
        // (--nav-height) and one --canvas-margin.
        hero: "calc(85svh - var(--nav-height) - var(--canvas-margin))",
      },
      maxWidth: {
        // Redesign_Brief.md §4 — body copy capped at a 65-character measure.
        measure: "65ch",
        // Tighter cap for a <SectionHeading> block — a shorter measure than
        // body copy so the optional subtitle wraps to two or three lines and
        // reads as a caption under the title, not a paragraph.
        "heading-measure": "44ch",
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
