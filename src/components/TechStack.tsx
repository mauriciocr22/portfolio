import { useTranslation } from "react-i18next";
import { TECH_STACK, TechCategory } from "../data/techStack";

// Redesign_Brief.md §7 — same content-layer rule as project cards: solid
// surface, not glass. Shared --glass-radius corner, border, and the
// system's one resting elevation shadow, escalating to --shadow-hover on
// hover per §6. h-60/md:h-[268px] is a fixed height, not a min-height — every
// category card renders at the same height as its siblings *within its own
// breakpoint* regardless of title length or how many technologies it
// lists. Two values, not one, because mobile and desktop render genuinely
// different content below the title (chips vs. plain text — see TAG and
// the JSX below), so each gets a height measured against what it actually
// shows instead of a single number stretched to cover both.
//
// h-60 (240px) — mobile's tag chips, measured across every realistic
// device width, 320–767px (this is the only range that matters: chips are
// md:hidden, so nothing wider ever renders them). Flat 224px in every case
// — Languages/Frameworks (5 items) wrap to 2 chip rows, Databases/Tools
// (3–4 items) to 1, and neither the row count nor the height changes
// anywhere in that range, so there's no separate "worst case" to chase
// here the way the lg breakpoint produces one elsewhere. 240px covers it
// with a 16px buffer.
//
// md:h-[268px] — desktop's plain wrapped text, measured across 768–1920px.
// Worst case: Frameworks & Libraries at the narrow edge of the lg
// 4-column layout (~1024–1060px), where its title wraps to 2 lines —
// 255.75px, the tallest figure found. No clean Tailwind step sits close
// above that without either falling short (h-64, 256px — under by 0.25px)
// or overshooting the way h-72 (288px) did; 268px keeps a real but modest
// ~12px buffer instead.
//
// max-w-xs + mx-auto (mobile only) — grid-cols-1 stretches each card to the
// section's full content width; capping and centering the card itself keeps
// it closer to its content's own scale, matching how the md/lg
// multi-column grid already looks (reset back to full-width there,
// unchanged, since narrower grid columns don't need this).
const CARD =
  "mx-auto flex h-60 w-full max-w-xs flex-col rounded-glass border border-subtle bg-surface-solid p-6 " +
  "shadow-glass md:mx-0 md:h-[268px] md:max-w-none " +
  "transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-hover " +
  "motion-reduce:transition-none";

// Mobile-only tag styling (see the <ul> below) — same tag style
// Portfolio.tsx's project cards already use for their own tech-stack
// lists, reused verbatim rather than inventing a second one. Chips solve
// the ragged-line problem a plain list has (independent short/long lines
// like "C#" next to "Styled Components" leave a block of blank space
// somewhere, left- or center-aligned) by wrapping left-to-right like
// normal text instead of stacking — but only when there's enough width per
// row for that to actually happen; see the desktop comment below.
const TAG =
  "shrink-0 rounded-full border border-subtle bg-subtle px-2.5 py-0.5 text-xs text-text-secondary";

// Redesign_Brief.md §3 — buttons are always solid and invert with mode,
// never glass. --color-button-bg equals --color-text-primary in both
// modes, so an inset ring in the usual --color-text-primary tone would
// blend straight into the button's own fill; ring-offset-2 instead pushes
// a visible ring out onto the card's own surface, using the same
// text-primary/surface-solid contrast pair the rest of the site already
// relies on for legibility, so it reads in both modes without a new token.
const LEARN_MORE_BUTTON =
  "mt-auto inline-flex w-fit items-center rounded-badge bg-button-bg px-4 py-2 text-sm font-medium text-button-text " +
  "transition-colors hover:bg-button-bg-hover focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-surface-solid focus-visible:ring-text-primary";

function TechCard({ name, icon: Icon, technologies }: TechCategory) {
  const { t } = useTranslation();
  // Threshold, not a per-category hardcode. None of the four categories
  // currently exceeds 5, so no card shows a "+N more" chip right now —
  // that's a consequence of the real data, not a sign the logic is unused;
  // it'll kick in for any category that grows past 5 later.
  const shown = technologies.slice(0, 5);
  const remaining = technologies.length - 5;

  return (
    <div className={CARD}>
      <Icon className="h-8 w-8 shrink-0 text-text-primary" aria-hidden="true" />
      <h3 className="mt-4 text-lg font-semibold text-text-primary">{name}</h3>

      {/* Mobile (<768px): tag chips. The card's own max-w-xs cap leaves
          enough width per row for 2–3 short chips to sit side by side
          before wrapping — that's the case chips actually solve. */}
      <ul className="mt-3 flex flex-wrap items-start gap-1.5 md:hidden">
        {shown.map((tech) => (
          <li key={tech} className={TAG}>
            {tech}
          </li>
        ))}
        {remaining > 0 && (
          <li className={TAG}>{t("techStackMoreCount", { count: remaining })}</li>
        )}
      </ul>

      {/* Desktop (≥768px): plain wrapped text instead. The 2/4-column
          grid's cards are narrow enough (~230px at lg) that most chips
          don't fit two to a row anyway — "TailwindCSS", "Styled
          Components", "Spring Boot" would each end up alone regardless —
          so the pill decoration stops buying anything there; flowing text
          wraps the same words more plainly. */}
      <p className="mt-2 hidden text-sm leading-snug text-text-secondary md:block">
        {shown.join(", ")}
        {remaining > 0 && `, ${t("techStackMoreCount", { count: remaining })}`}
      </p>

      {/* Inert for now — Redesign_Brief.md-style build-and-review process:
          this component ships first, the Learn More modal is a separate
          later step. No onClick, no href — visible and styled only. */}
      <button type="button" className={LEARN_MORE_BUTTON}>
        {t("techStackLearnMore")}
      </button>
    </div>
  );
}

export default function TechStack() {
  const { t } = useTranslation();

  return (
    // Sits between Home and About — real content, kept near About's
    // personal-narrative section rather than beside TechMarquee's
    // decorative badge strip, so this card grid doesn't read as an echo of
    // that strip.
    <section
      id="tech-stack"
      className="flex w-full flex-col items-center bg-canvas px-canvas-margin-mobile py-16 md:px-canvas-margin-desktop"
    >
      <h2 className="mb-10 border-b-2 border-text-primary text-3xl font-semibold text-text-primary">
        {t("techStackHeading")}
      </h2>

      <div className="grid w-full max-w-[1000px] grid-cols-1 gap-panel-gap md:grid-cols-2 lg:grid-cols-4">
        {TECH_STACK.map((category) => (
          <TechCard key={category.name} {...category} />
        ))}
      </div>
    </section>
  );
}
