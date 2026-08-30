import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { TECH_BADGES, TechBadge } from "../data/techBadges";

// Redesign_Brief.md §7 — badges now match the Tech Stack/Portfolio cards'
// solid content-layer treatment (bg-surface-solid, border-subtle,
// text-text-primary) instead of the earlier translucent per-component
// override, at the user's request once that card look shipped and read
// better here too. Blur and the reduced-transparency/no-backdrop-filter
// fallback variants are dropped along with it — against a fully opaque
// background there's nothing left for a blur to show through, so keeping
// either would be a no-op.
// §5 "Corner treatment" — rounded-badge (--radius-sm), not rounded-glass:
// that token is sized for large panels, and at badge scale it reads as an
// almost-pill shape rather than a rounded rectangle.
// --marquee-badge-shadow stays: a shorter offset/blur proportionate to a
// compact control, distinct from the panel-scale --glass-shadow cards use.
const BADGE =
  "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-badge border border-subtle " +
  "bg-surface-solid px-4 py-2 text-text-primary shadow-marquee-badge";

function Badge({ name, icon: Icon }: TechBadge) {
  return (
    <div className={BADGE}>
      {/* 16px, not the icon set's default 20px (h-5 w-5) — at this badge's
          compact scale a 20px icon reads as competing with the text for
          height rather than sitting proportionate to it. */}
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="font-canada text-sm font-medium">{name}</span>
    </div>
  );
}

// One full pass takes this long, in seconds — fixed regardless of
// viewport width or how many copies get rendered below, since the loop's
// travel distance is always exactly one badge-list's own pixel width.
// Not a token: a single-purpose animation timing value, not a reusable
// design constant like the glass tokens.
const LOOP_SECONDS = 30;

// Redesign_Brief.md §6 "Page-load: a brief fade/rise on primary content" —
// this component just hadn't had that rule applied yet. Well under a
// second so it's long gone before any single badge would clear the edge
// mask during normal scroll (~2.5-3s at this track's speed), so it can't
// be mistaken for the mask's own (untouched) crossfade.
const MOUNT_FADE_SECONDS = 0.45;

const BADGE_COUNT = TECH_BADGES.length;

export default function TechMarquee() {
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // How many copies of the badge list to render side by side, and the
  // pixel width of exactly one of them (the loop's travel distance).
  // Both start at a safe default and get corrected by measuring the
  // actual rendered DOM below.
  const [copies, setCopies] = useState(2);
  const [periodPx, setPeriodPx] = useState<number | null>(null);

  // A single duplicated copy (the previous approach, "-50%" of a 2x
  // track) is only enough content to loop seamlessly if 2 copies'
  // combined width happens to exceed 2x the viewport's width. On any
  // screen wider than roughly half of one copy's width — i.e. virtually
  // every desktop — it doesn't, so the track runs out of badges before
  // the loop wraps and a blank gap opens on the right for the rest of
  // the cycle (reported directly, reproduced and measured before this
  // fix). Fix: render as many copies as it actually takes to cover 2x
  // the current viewport, measured from the real DOM, and travel exactly
  // one copy's own width — a fixed pixel distance, not "-50%" of however
  // many copies happen to be rendered — so the wrap stays seamless
  // regardless of that count. (A percentage also wasn't quite exact to
  // begin with: gap-separated flex children make "-50%" of a 2x track
  // land half a gap short of the true repeat distance — this fixes that
  // too, incidentally.)
  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    function measure() {
      // Non-null assertions, not re-checks: TS can't carry the outer
      // null-check's narrowing into this nested function, but `measure`
      // itself only ever runs (directly below, or via the observer set up
      // right after) while this effect instance — and so this same
      // already-checked wrapper/track — is still current.
      // children[BADGE_COUNT] is the first badge of the *second* copy —
      // offsetLeft is a pure layout value (unaffected by the scroll
      // transform), so this is exactly one copy's rendered width,
      // including its own trailing gap into the next copy.
      const secondCopyStart = track!.children[BADGE_COUNT] as
        | HTMLElement
        | undefined;
      if (!secondCopyStart) return;
      const period = secondCopyStart.offsetLeft;
      if (period <= 0) return;

      setPeriodPx(period);
      const wrapperWidth = wrapper!.getBoundingClientRect().width;
      // +1 copy of headroom beyond the bare minimum, both for the
      // roughly-one-gap this math trims off and as a safety margin.
      setCopies(Math.max(2, Math.ceil((2 * wrapperWidth) / period) + 1));
    }

    measure();

    // Re-measure on resize (window resize, DevTools docking, etc.) — the
    // copy count that was enough at one width may not be at another.
    const observer = new ResizeObserver(measure);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    // No section-level background, padding, or heading — unlike every
    // other section here, this strip isn't a panel sitting on the canvas,
    // it *is* canvas (agreed directly with the user). No `id` — it's a
    // decorative continuation of the Tech Stack section above, not its own
    // nav target; the "Skills" anchor points at `#skills` on <TechStack>
    // so the jump lands on that section's heading, not here below it. Still
    // a bare `<section>` (vs. a `<div>`) to keep the global
    // `section { scroll-mt-[15vh] }` rule for any future in-page link.
    <section className="w-full">
      {/* Full-bleed strip. This section already runs edge to edge — App has
          no horizontal padding and the <section> is w-full — so a plain
          w-full wrapper spans the viewport on its own. It deliberately does
          NOT use ProjectsCarousel's w-screen + calc(50%-50vw) margin trick:
          that's for escaping a padded parent (Portfolio's px-canvas-margin),
          which this section doesn't have, and 100vw counts the vertical
          scrollbar gutter, so the wrapper would overhang the body by half a
          scrollbar width and add a horizontal scrollbar.
          The mask fades both edges so badges dissolve in/out instead of
          hard-clipping at the viewport boundary; that ongoing crossfade is
          untouched by the mount fade below — separate concern, separate
          element (this wrapper), separate transition. py-5 (not the
          removed section's py-16) is a technical buffer, not layout
          padding: it gives shadow-glass's blur radius room inside this
          overflow-hidden box before it'd otherwise get clipped, same
          reasoning as ProjectsCarousel's own py-5.

          initial={false} under reduced motion skips the mount animation
          entirely — renders straight at the `animate` value, no transition
          — rather than just zeroing the duration, per Redesign_Brief.md §8
          and the same pattern every other motion rule in this project
          already uses. */}
      <motion.div
        ref={wrapperRef}
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: MOUNT_FADE_SECONDS }}
        className={
          "w-full overflow-hidden py-5 " +
          "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] " +
          "[-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        }
      >
        {prefersReducedMotion ? (
          // Reduced motion: a single, static, non-scrolling row — no
          // duplicated list (there's nothing for a duplicate to seam), no
          // animation at all, per Redesign_Brief.md §8.
          <div className="flex flex-wrap items-center justify-center gap-panel-gap px-canvas-margin-desktop">
            {TECH_BADGES.map((badge) => (
              <Badge key={badge.name} {...badge} />
            ))}
          </div>
        ) : (
          <motion.div
            ref={trackRef}
            className="flex w-max items-center gap-panel-gap"
            animate={{ x: periodPx === null ? 0 : [0, -periodPx] }}
            transition={
              periodPx === null
                ? { duration: 0 }
                : { duration: LOOP_SECONDS, repeat: Infinity, ease: "linear" }
            }
          >
            {/* `copies` badge lists back-to-back — always enough that the
                rendered content covers at least 2x the viewport width, so
                the track never runs out of badges mid-scroll. Translating
                by exactly one copy's own width (periodPx) lines the next
                copy up pixel-for-pixel with where the previous one
                started — no visible jump on wrap, regardless of how many
                extra copies are along for the ride. */}
            {Array.from({ length: copies }, () => TECH_BADGES)
              .flat()
              .map((badge, index) => (
                <Badge key={`${badge.name}-${index}`} {...badge} />
              ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
