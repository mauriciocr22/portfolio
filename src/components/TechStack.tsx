import { useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import { TECH_STACK, TechCategory } from "../data/techStack";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

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
// Used only by the card's mobile chip row — the modal lists technologies
// as rows, not badges.
const TAG =
  "shrink-0 rounded-full border border-subtle bg-subtle px-2.5 py-0.5 text-xs text-text-secondary";

// "Learn More →" is no longer a control — it's a plain label sitting inside
// the card button, so it carries no background, border, or focus treatment
// of its own. mt-auto pins it to the card's bottom edge; the arrow is
// decorative (aria-hidden), and the button's own text content is its
// accessible name.
const LEARN_MORE =
  "mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-text-primary";

// This category's detail modal. Redesign_Brief.md §7 lists modals as glass;
// kept SOLID (bg-surface-solid) deliberately — a solid panel guarantees §8
// AA for its text over any backdrop and is itself the §8
// prefers-reduced-transparency fallback, so there's no separate
// reduced-transparency code path to owe. Converting to glass is a separate
// visual call, not part of this content-layout build.
//
// Structure: a fixed-max-height flex column. Header (title + close) and the
// intro line + divider are shrink-0 and never scroll; only the <ul> of
// technologies scrolls (overflow-y-auto, min-h-0 so flex lets it shrink
// below content size), so the panel can't grow unbounded as the list gets
// longer. The <ul> is tabIndex=0 + aria-labelled so keyboard users can
// focus and arrow-scroll it.
//
// Accessibility: role="dialog" + aria-modal + aria-labelledby; focus moves
// to the close button on open and is trapped within the dialog on Tab /
// Shift+Tab; Escape and backdrop click close; focus returns to the opener
// card via TechCard's handleClose. Body scroll is locked while open so
// scrolling the list can't chain to the page. The scale/opacity entrance
// (motion, §6 ~150ms ease-out) is skipped entirely — initial={false} —
// when prefers-reduced-motion is set (§8: end state immediately, not a
// slower transition). The bg-black/50 dimming scrim is unchanged.
interface CategoryModalProps {
  category: TechCategory;
  onClose: () => void;
}

function CategoryModal({ category, onClose }: CategoryModalProps) {
  const { t } = useTranslation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Move focus in on open; keep Tab within the dialog; Escape closes.
  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!dialogRef.current.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Lock page scroll while open so scrolling the list can't chain to the
  // page behind it. `overflow: hidden` on <html> removes the scrollbar; if
  // that scrollbar took up layout width (classic, not overlay), removing it
  // widens the page and shifts everything — including the fixed nav, which
  // is positioned against the viewport and so out of reach of any <body>
  // padding. Only then, reserve that width back: `scrollbar-gutter: stable`
  // where supported, else a plain padding-right. When the measured width is
  // 0 (overlay scrollbars) there's nothing to compensate — and crucially
  // `scrollbar-gutter: stable` must NOT be set in that case, since it would
  // reserve a gutter that wasn't there and cause the shift itself.
  useEffect(() => {
    const html = document.documentElement;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const supportsGutter =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("scrollbar-gutter", "stable");

    const previous = {
      overflow: html.style.overflow,
      scrollbarGutter: html.style.scrollbarGutter,
      paddingRight: html.style.paddingRight,
    };

    html.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      if (supportsGutter) {
        html.style.scrollbarGutter = "stable";
      } else {
        html.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    return () => {
      html.style.overflow = previous.overflow;
      html.style.scrollbarGutter = previous.scrollbarGutter;
      html.style.paddingRight = previous.paddingRight;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-canvas-margin-mobile"
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="flex max-h-[min(24rem,85vh)] w-[min(520px,90vw)] flex-col overflow-hidden rounded-glass border border-subtle bg-surface-solid shadow-glass"
      >
        {/* Header — fixed, never scrolls */}
        <div className="flex shrink-0 items-start justify-between gap-4 p-6 pb-4">
          <h2 id={titleId} className="text-lg font-semibold text-text-primary">
            {category.name}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t("techStackModalClose")}
            className="-m-1 shrink-0 rounded-badge p-1 text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-solid"
          >
            <FiX className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Category intro — fixed */}
        <p className="shrink-0 px-6 text-sm leading-snug text-text-secondary">
          {t(`techStack.categories.${category.slug}.intro`)}
        </p>

        {/* Technology list — the only part that scrolls */}
        <ul
          tabIndex={0}
          aria-label={category.name}
          className="tech-list-scrollbar mt-4 min-h-0 flex-1 overflow-y-auto border-t border-subtle px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-primary"
        >
          {category.technologies.map((tech, index) => {
            const TechIcon = tech.icon;
            return (
              <li
                key={tech.name}
                className={index > 0 ? "border-t border-subtle" : ""}
              >
                <div className="flex gap-3 py-3">
                  {/* Fixed h-5 box (= the name line's line-height) centring a
                      smaller glyph — keeps every icon optically the same size
                      and aligned to the name row, regardless of how each
                      icon set fills its own viewBox. */}
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                    <TechIcon
                      className="h-4 w-4 text-text-secondary"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary">
                      {tech.name}
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-text-secondary">
                      {t(`techStack.technologies.${tech.slug}.description`)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}

function TechCard({ category }: { category: TechCategory }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { name, icon: Icon, technologies } = category;

  // Threshold, not a per-category hardcode. Frameworks & Libs has 7
  // technologies, so its card shows the first 5 followed by a "+2 more"
  // chip; the other three categories are at or under 5 and show no chip.
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
            <span key={tech.name} className={TAG}>
              {tech.name}
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
          {shown.map((tech) => tech.name).join(", ")}
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
