import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { Project } from "../data/projects";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

interface Props {
  projects: Project[];
}

// Mobile-only (<768px) replacement for the stacked vertical layout, per
// Portfolio.tsx's desktop grid. A horizontal scroll-snap row with a
// coverflow scale/opacity effect driven by scroll position.
//
// Interpolation formula (agreed on directly, not a Redesign_Brief.md token —
// it governs only this component's scroll behavior):
//   t = clamp(|cardCenter - trackCenter| / (trackWidth / 2), 0, 1)
//   scale   = 1 - t * (1 - MIN_SCALE)    // 1   -> 0.78
//   opacity = 1 - t * (1 - MIN_OPACITY)  // 1   -> 0.5
//
// transform-origin is set per card alongside scale/opacity, not left at its
// default (center): the default scales a card around its own center, and
// for a mostly off-screen neighbor that center is itself off-screen, so
// shrinking pulls the card's only visible sliver further off-screen instead
// of holding it at the viewport edge. Anchoring the origin to whichever
// side sits nearer the viewport keeps that edge in place as the card scales
// down, so the peek stays visible instead of disappearing at rest.
const MIN_SCALE = 0.78;
const MIN_OPACITY = 0.5;

// flex: 0 0 82vw — leaves ~9vw of the neighboring card peeking in on each
// side when the active card is snapped to center. vw, not %: the track's
// own horizontal padding is also 9vw (see the track's className below), and
// % values for a flex item's basis and its container's padding resolve
// against two different boxes (basis against the container's content box,
// already net of padding; padding against the section's content box, not
// the track's own width) — mixing % here compounded into a card rendering
// at ~66% width and card 1 sitting ~28px off from the track's true center
// at rest. vw is a fixed length regardless of either box, so both this and
// the track's padding now resolve against the same true viewport width.
const CARD =
  "shrink-0 grow-0 basis-[82vw] snap-center overflow-hidden rounded-glass border border-subtle " +
  "bg-surface-solid shadow-glass";

const FOOTER_LINK =
  "flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-primary rounded-glass";

export default function ProjectsCarousel({ projects }: Props) {
  const { t } = useTranslation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Reduced motion: no dynamic effect at all. Clear any inline styles a
    // prior non-reduced-motion render may have left behind so every card
    // sits at uniform full scale/opacity, with plain scroll-snap intact.
    if (prefersReducedMotion) {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.style.transform = "";
        card.style.opacity = "";
        card.style.transformOrigin = "";
      });
      return;
    }

    let frame: number | null = null;

    const applyTransforms = () => {
      frame = null;
      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;
      const halfWidth = trackRect.width / 2;
      if (halfWidth === 0) return;

      // Pass 1 — read every card's position. No style writes in this loop.
      const centers = cardRefs.current.map((card) => {
        if (!card) return null;
        const rect = card.getBoundingClientRect();
        return rect.left + rect.width / 2;
      });

      // Pass 2 — write transform/opacity only, from the reads above.
      centers.forEach((cardCenter, index) => {
        const card = cardRefs.current[index];
        if (!card || cardCenter === null) return;

        const distance = Math.abs(cardCenter - trackCenter);
        const progress = Math.min(distance / halfWidth, 1);
        const scale = 1 - progress * (1 - MIN_SCALE);
        const opacity = 1 - progress * (1 - MIN_OPACITY);

        // Shrink toward whichever edge sits nearer the viewport center, so
        // that edge — the one still on screen — stays put instead of the
        // card shrinking toward its own (possibly off-screen) center.
        if (cardCenter > trackCenter) {
          card.style.transformOrigin = "left center";
        } else if (cardCenter < trackCenter) {
          card.style.transformOrigin = "right center";
        } else {
          card.style.transformOrigin = "center center";
        }

        card.style.transform = `scale(${scale})`;
        card.style.opacity = String(opacity);
      });
    };

    const requestUpdate = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(applyTransforms);
    };

    applyTransforms();
    track.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      track.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion, projects]);

  return (
    <div
      ref={trackRef}
      // w-screen + negative side margins break the track out of the
      // section's own px-canvas-margin-* padding to the true viewport edge,
      // without affecting the heading or anything else in the section.
      // items-start overrides flex's default align-items: stretch — without
      // it every card would be forced to the height of the tallest one in
      // the row, reintroducing reserved space no element here asks for.
      // px-[9vw] pairs with the card's basis-[82vw] (see CARD) — both vw so
      // they resolve against the same true viewport width instead of
      // compounding through two different content boxes.
      // py-5 (20px) gives shadow-glass's blur radius room to render without
      // getting clipped at the scroll container's own top/bottom edge.
      // scrollbar-width/-ms-overflow-style/::-webkit-scrollbar hide the
      // native scrollbar cross-browser — scroll-snap paging is the intended
      // affordance here, not a visible scrollbar.
      className={
        "flex w-screen items-start snap-x snap-mandatory gap-panel-gap overflow-x-auto px-[9vw] py-5 md:hidden " +
        "[-webkit-overflow-scrolling:touch] ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] " +
        "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      }
    >
      {projects.map((project, index) => (
        <article
          key={project.slug}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className={CARD}
        >
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={project.image}
              alt=""
              className="h-full w-full object-cover grayscale"
            />
          </div>

          <div className="flex flex-1 flex-col p-4">
            <h3 className="font-canada text-lg font-medium text-text-primary">
              {project.title}
            </h3>
            <p className="mt-1 line-clamp-6 min-h-[8.25em] font-canada text-sm leading-snug text-text-secondary">
              {t(`projects.${project.slug}.description`)}
            </p>

            {/* Capped at 2 rows (extra tags clip via overflow-hidden), but no
                min-height reservation — the box only takes the space 1 or 2
                actual rows need, and the footer below sits at a constant
                pt-4 either way. Card height varies slightly by tag count in
                this carousel; the desktop grid keeps its own alignment. */}
            <ul className="mt-3 flex max-h-[3.125rem] flex-wrap items-start gap-1.5 overflow-hidden">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="shrink-0 rounded-full border border-subtle bg-subtle px-2.5 py-0.5 text-xs text-text-secondary"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 pt-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_LINK}
              >
                <FaGithub size={16} />
                {t("projectsGithubCta")}
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={FOOTER_LINK}
                >
                  <FiExternalLink size={16} />
                  {t("projectsLiveCta")}
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
