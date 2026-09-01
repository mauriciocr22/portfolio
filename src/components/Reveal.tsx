import type { ReactNode } from "react";
import { motion } from "motion/react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

interface Props {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before this element starts animating in. */
  delay?: number;
  /**
   * Animate on mount instead of waiting to scroll into view. Used where a
   * scroll trigger would leave a visible gap — the About portrait on mobile
   * sits in the strip already on screen under the hero at load.
   */
  immediate?: boolean;
}

// Redesign_Brief.md §6 — the single, consistent reveal shared by every
// content section: a brief opacity + rise, once, as it enters the viewport.
// The values match the hero's page-load `fade-rise` keyframe
// (tailwind.config.js) so load and scroll reveals read as one treatment.
// §8: under prefers-reduced-motion the content just appears — plain <div>,
// no transition, not a slower one.
const OFFSET_Y = 12;
const DURATION = 0.5;

export default function Reveal({
  children,
  className,
  delay = 0,
  immediate = false,
}: Props) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const from = { opacity: 0, y: OFFSET_Y };
  const to = { opacity: 1, y: 0 };
  const transition = { duration: DURATION, ease: "easeOut" as const, delay };

  if (immediate) {
    return (
      <motion.div
        className={className}
        initial={from}
        animate={to}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={from}
      whileInView={to}
      viewport={{ once: true, amount: 0.2 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
