import { useTranslation } from "react-i18next";
import { TECH_STACK, TechCategory } from "../data/techStack";

// Redesign_Brief.md §7 — same content-layer rule as project cards: solid
// surface, not glass. Shared --glass-radius corner, border, and the
// system's one resting elevation shadow, escalating to --shadow-hover on
// hover per §6. h-[300px] is a fixed height, not a min-height — every
// category card renders at the same height regardless of title length or
// how many technologies it lists.
//
// The number itself is sized to Languages' own content: icon + title + its
// 5 one-per-line technologies + button renders at ~266px (measured, not
// guessed), and 300px adds just enough headroom that Frameworks &
// Libraries' longer title — which wraps to 2 lines at the narrow edge of
// the lg 4-column layout, e.g. exactly 1024px/iPad landscape — still fits
// with no clipping there either. Databases & ORM (3 items) and Tools &
// DevOps (4 items) just show more empty space below their shorter lists at
// this height, which is expected, not a bug.
const CARD =
  "flex h-[300px] flex-col rounded-glass border border-subtle bg-surface-solid p-6 shadow-glass " +
  "transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-hover " +
  "motion-reduce:transition-none";

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
  // Threshold, not a per-category hardcode — Databases & ORM (3) and Tools
  // & DevOps (4) fall under it and render their full list with no "+N
  // more" line at all; Frameworks & Libraries (5) fits exactly; Languages
  // (7) is the only category that still truncates.
  const shown = technologies.slice(0, 5);
  const remaining = technologies.length - 5;

  return (
    <div className={CARD}>
      <Icon className="h-8 w-8 shrink-0 text-text-primary" aria-hidden="true" />
      <h3 className="mt-4 text-lg font-semibold text-text-primary">{name}</h3>
      <ul className="mt-2 text-sm leading-snug text-text-secondary">
        {shown.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      {remaining > 0 && (
        <p className="text-sm leading-snug text-text-secondary">
          {t("techStackMoreCount", { count: remaining })}
        </p>
      )}

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
