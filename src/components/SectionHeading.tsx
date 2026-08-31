import { cn } from "../utils/cn";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

// The one visible heading for a content section (Tech Stack, Projects).
//
// Redesign_Brief.md §4: the display face is allowed on h1/h2 only, and the
// size jump from heading to body is what carries hierarchy in a system with
// no accent colour. So the whole treatment here is that single contrast — a
// large Bricolage title over a small secondary-text subtitle, centred.
// Deliberately no border, no underline, no eyebrow, no numeral: the size
// difference between the two lines is the entire design.
//
// `text-section-sm` / `md:text-section` is the §4 "Section heading" role,
// paired mobile/desktop like the display and lead tokens. `text-balance`
// evens the rag on both lines; the `max-w-heading-measure` (~44ch) cap keeps
// the subtitle to two or three lines. `className` is for per-section spacing
// overrides only — twMerge lets a passed `mb-*` win — there are no visual
// variants.
export default function SectionHeading({ title, subtitle, className }: Props) {
  return (
    <div
      className={cn(
        "mx-auto mb-10 max-w-heading-measure text-center md:mb-12",
        className
      )}
    >
      <h2 className="text-balance font-display text-section-sm font-semibold text-text-primary md:text-section">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-balance text-sm leading-relaxed text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
