import { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import { TECH_STACK, TechCategory } from "../data/techStack";

// Redesign_Brief.md §7 — same content-layer rule as project cards: solid
// surface, not glass. Shared --glass-radius corner, border, and the
// system's one resting elevation shadow, escalating to --shadow-hover on
// hover per §6.
//
// The whole card is ONE <button> (not a div+onClick, not an <a> — it opens
// an in-page modal, not a navigation), so the border, fill, padding, fixed
// height, and the §6 hover-lift all live on the button element itself.
// text-left because a <button> centres its text by default.
//
// h-60/md:h-[268px] is a fixed height, not a min-height — every category
// card renders at the same height as its siblings *within its own
// breakpoint* regardless of title length or how many technologies it
// lists. Two values, not one, because mobile and desktop render genuinely
// different content below the title (chips vs. plain text — see TAG and
// the JSX below), so each gets a height measured against what it actually
// shows instead of a single number stretched to cover both. Both were
// measured with a padded "Learn More" button at the base of the card;
// that's now plain inline text (shorter), so the buffers noted below only
// grew — the values still hold with margin to spare.
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
// md:h-[244px] — desktop's plain wrapped text, measured across 768–1920px.
// Tightened from 268px at the user's request, to cut the blank gap between
// the content and the bottom-pinned "Learn More" label. Tallest real
// content is Frameworks & Libs: a one-line title — the label was shortened
// from "Frameworks & Libraries", so it no longer wraps to two lines
// anywhere, including the narrow edge of the lg 4-column layout
// (~1024–1060px) that used to force the old 255.75px worst case — plus a
// 3-line wrapped tech list, ~228px total. 244px keeps a ~16px buffer.
//
// max-w-xs + mx-auto (mobile only) — grid-cols-1 stretches each card to the
// section's full content width; capping and centering the card itself keeps
// it closer to its content's own scale, matching how the md/lg
// multi-column grid already looks (reset back to full-width there,
// unchanged, since narrower grid columns don't need this).
//
// Focus ring: verified nothing from the button up to <section> sets
// overflow:hidden, so an outline wouldn't be clipped — but the ring here
// is Tailwind's box-shadow-based `ring` anyway (clip-immune regardless),
// composing cleanly with shadow-glass / shadow-hover via the
// --tw-shadow / --tw-ring-shadow split. ring-offset-2 +
// ring-offset-surface-solid seats it against the card's own fill so it
// reads in both modes.
const CARD =
  "group mx-auto flex h-60 w-full max-w-xs flex-col rounded-glass border border-subtle bg-surface-solid p-6 text-left " +
  "shadow-glass md:mx-0 md:h-[244px] md:max-w-none " +
  "transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-hover " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-surface-solid motion-reduce:transition-none";

// Same tag style Portfolio.tsx's project cards already use for their own
// tech-stack lists, reused verbatim rather than inventing a second one.
// Used by both the card's mobile chip row and the modal's full list.
const TAG =
  "shrink-0 rounded-full border border-subtle bg-subtle px-2.5 py-0.5 text-xs text-text-secondary";

// "Learn More →" is no longer a control — it's a plain label sitting inside
// the card button, so it carries no background, border, or focus treatment
// of its own. mt-auto pins it to the card's bottom edge; the arrow is
// decorative (aria-hidden), and the button's own text content is its
// accessible name.
const LEARN_MORE =
  "mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-text-primary";

// Placeholder for this category's detail modal. Redesign_Brief.md §7 lists
// modals as glass with the full §8 treatment — solid fallback under
// prefers-reduced-transparency, a focus trap, body-scroll lock — and that
// ships as its own component next, per the brief's one-component-at-a-time
// process. This interim overlay is already solid (bg-surface-solid), so
// the reduced-transparency requirement is met as-is; it also handles
// Escape, backdrop-click, and focus in/restore. Still owed by the real
// component: the focus trap and the scroll lock. The bg-black/50 scrim is
// interim too — the real modal adds a proper backdrop token to §7.
interface CategoryModalProps {
  category: TechCategory;
  onClose: () => void;
}

function CategoryModal({ category, onClose }: CategoryModalProps) {
  const { t } = useTranslation();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const Icon = category.icon;

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-canvas-margin-mobile"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-sm rounded-glass border border-subtle bg-surface-solid p-6 shadow-glass"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <Icon
            className="h-8 w-8 shrink-0 text-text-primary"
            aria-hidden="true"
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t("techStackModalClose")}
            className="rounded-badge p-1 text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-solid"
          >
            <FiX className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <h2
          id={titleId}
          className="mt-4 text-lg font-semibold text-text-primary"
        >
          {category.name}
        </h2>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {category.technologies.map((tech) => (
            <li key={tech} className={TAG}>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TechCard({ category }: { category: TechCategory }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { name, icon: Icon, technologies } = category;

  // Threshold, not a per-category hardcode. None of the four categories
  // currently exceeds 5, so no card shows a "+N more" chip right now —
  // that's a consequence of the real data, not a sign the logic is unused;
  // it'll kick in for any category that grows past 5 later.
  const shown = technologies.slice(0, 5);
  const remaining = technologies.length - 5;

  // Return focus to the card that opened the modal once it closes.
  const handleClose = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        className={CARD}
      >
        <Icon
          className="h-8 w-8 shrink-0 text-text-primary"
          aria-hidden="true"
        />

        {/* Visual heading only — a real <h3> is flow content and isn't
            valid inside a <button>; the section's <h2> still carries the
            document outline. */}
        <span className="mt-4 block text-lg font-semibold text-text-primary">
          {name}
        </span>

        {/* Mobile (<768px): tag chips. Plain <span>s, not <ul>/<li> — list
            markup isn't valid <button> content either. The card's max-w-xs
            cap leaves enough width per row for 2–3 short chips to sit side
            by side before wrapping — the case chips actually solve. */}
        <span className="mt-3 flex flex-wrap items-start gap-1.5 md:hidden">
          {shown.map((tech) => (
            <span key={tech} className={TAG}>
              {tech}
            </span>
          ))}
          {remaining > 0 && (
            <span className={TAG}>
              {t("techStackMoreCount", { count: remaining })}
            </span>
          )}
        </span>

        {/* Desktop (≥768px): plain wrapped text instead. The 2/4-column
            grid's cards are narrow enough (~230px at lg) that most chips
            don't fit two to a row anyway, so the pill decoration stops
            buying anything there; flowing text wraps the same words more
            plainly. */}
        <span className="mt-2 hidden text-sm leading-snug text-text-secondary md:block">
          {shown.join(", ")}
          {remaining > 0 && `, ${t("techStackMoreCount", { count: remaining })}`}
        </span>

        <span className={LEARN_MORE}>
          {t("techStackLearnMore")}
          <span aria-hidden="true">→</span>
        </span>
      </button>

      {open && <CategoryModal category={category} onClose={handleClose} />}
    </>
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
      className="flex w-full flex-col items-center px-canvas-margin-mobile py-16 md:px-canvas-margin-desktop"
    >
      <h2 className="mb-10 border-b-2 border-text-primary text-3xl font-semibold text-text-primary">
        {t("techStackHeading")}
      </h2>

      <div className="grid w-full max-w-[1000px] grid-cols-1 gap-panel-gap md:grid-cols-2 lg:grid-cols-4">
        {TECH_STACK.map((category) => (
          <TechCard key={category.name} category={category} />
        ))}
      </div>
    </section>
  );
}
