# Portfolio Redesign Brief

## 1. Vision & direction

This is a full redesign, not a reskin — layout, spacing, and structure change along with the visual language, not just colors and corners on top of what exists today.

The direction is inspired by Apple's Liquid Glass design language (iOS 26): translucent, blurred floating panels that sit above a visible background canvas, with large rounded corners and depth built from shadow rather than color. The palette is strictly monochromatic — black, white, and gray only, no accent color anywhere in the system. The site supports both light and dark mode via the existing `useDarkMode` hook.

Four things anchor every decision below:
- Black, white, and gray only
- Glassy, translucent floating components
- Generous rounded corners, everywhere, not just on hero elements
- A visible break from the current layout, not an incremental update

## 2. Design principles

- **Tokens over adjectives.** Every glass, spacing, and radius value in this brief is a number. If a component needs a value that isn't defined here, add it to this doc before building it — don't leave it to be improvised per-component.
- **Not everything floats.** Glass is for a specific set of components (section 7). Applying it everywhere flattens the hierarchy it's meant to create.
- **Elevation comes from value and shadow, not color.** With no hue to lean on, a panel has to visibly separate from its canvas through contrast and shadow alone, in both modes.
- **Restraint.** One glass tier is the default. Don't introduce blur/opacity variants until the baseline is validated on real components (see section 10).
- **Text always stays solid.** Body copy, headings, and button labels never inherit blur or transparency, even inside a glass panel.

## 3. Color system

Two modes, one token set, values swapped under a dark-mode selector. Adjust the selector below (`[data-theme="dark"]`) to match whatever attribute or class the existing `useDarkMode` hook actually toggles.

```css
:root {
  --color-canvas: #FAFAFA;
  --color-surface-solid: #FFFFFF;   /* plain, non-glass surfaces if ever needed */
  --color-text-primary: #141414;
  --color-text-secondary: #5C5C5C;
  --color-text-muted: #8A8A8A;
  --color-border: rgba(0, 0, 0, 0.1);

  --color-button-bg: #141414;
  --color-button-bg-hover: #2B2B2B;
  --color-button-text: #FFFFFF;
}

[data-theme="dark"] {
  --color-canvas: #0A0A0A;
  --color-surface-solid: #141414;
  --color-text-primary: #F5F5F5;
  --color-text-secondary: #A3A3A3;
  --color-text-muted: #707070;
  --color-border: rgba(255, 255, 255, 0.1);

  --color-button-bg: #F5F5F5;
  --color-button-bg-hover: #D6D6D6;
  --color-button-text: #141414;
}
```

**Buttons invert with mode**, as confirmed: solid black on white text in light mode, solid white on black text in dark mode. Buttons are the one element allowed to be fully solid black/white rather than glass — they need to read as the strongest, most opaque element in the system, since they're the primary action surface.

## 4. Typography

Two faces. The system stack handles body, UI, and all dense content — it
resolves to San Francisco on Apple platforms, which is authentic to the
direction. A single display face carries h1 and h2 only, to give the
monochrome system the character it can't get from color.

```css
--font-display: "Bricolage Grotesque", -apple-system, BlinkMacSystemFont, sans-serif;
--font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
--font-mono: ui-monospace, "SF Mono", "Cascadia Code", Menlo, monospace;
```

**`--font-display` is restricted to h1 and h2.** Not body, not buttons,
not nav, not badges, not fact tiles, not card titles. If a component
seems to need it, that's a signal the heading hierarchy is wrong, not
that the restriction should be relaxed.

Self-hosted via `@fontsource-variable/bricolage-grotesque`, subset
`latin` + `latin-ext`. The latin-ext subset is required, not optional —
without it, í/ã/õ/ç fall back to a different face mid-word in both
Portuguese and the developer's own name.

| Role | Size (desktop) | Size (mobile) | Weight | Face | Tracking | Line height |
|---|---|---|---|---|---|---|
| Display / hero | 72–88px | 40–48px | 600 | display | -0.03em | 1.02 |
| Section heading | 40–48px | 30–34px | 600 | display | -0.02em | 1.1 |
| Subheading | 18–20px | 17–18px | 500 | sans | normal | 1.4 |
| Lead paragraph | 26px | 26px | 400 | sans | -0.02em | 1.3 |
| Body | 16px | 16px | 400 | sans | normal | 1.7 |
| Caption / metadata | 13px | 13px | 400 | sans | normal | 1.5 |

Body copy is capped at a 65-character measure. Negative tracking applies
above 40px, and to the lead paragraph; elsewhere below 40px it hurts
legibility rather than helping. The lead is the opening sentence of a body
block, pulled out and enlarged so it can carry a section that has no
visible heading (About); the rest of the block drops to ~15.5px secondary
so the lead clearly leads.

The gap between heading and body sizes is load-bearing. The previous
28–32px section heading against 16px body was too small a jump and read
as flat — that contrast is what carries hierarchy in a system with no
accent color.

## 5. Spatial & material system

### Three-layer model

- **Background canvas** — the base surface (`--color-canvas`). Never blurred or transparent itself.
- **Glass panels** — floating containers: nav, modals, cards that need to read as lifted. Translucent, blurred, bordered.
- **Solid content** — text, icons, buttons. Always fully opaque, even sitting inside a glass panel.

### Glass tokens

```css
:root {
  --glass-blur: 10px;
  --glass-radius: 16px;
  --glass-bg: rgba(0, 0, 0, 0.04);
  --glass-border: rgba(0, 0, 0, 0.12);
  --glass-shadow: 0 8px 28px rgba(0, 0, 0, 0.15);
}

[data-theme="dark"] {
  --glass-bg: rgba(255, 255, 255, 0.04);
  --glass-border: rgba(255, 255, 255, 0.15);
  --glass-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
}

.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--glass-radius);
  box-shadow: var(--glass-shadow);
}
```

*Optional, later phase:* a component that needs to read as more elevated than the baseline (a modal above a nav bar, say) can scale blur and shadow together — e.g. `--glass-blur-modal: 16px` with a stronger shadow. Don't add this tier until the baseline is validated on real components.

*Per-component overrides:* `--glass-bg`/`--glass-border`/`--glass-shadow` are tuned for the nav's barely-there panel-scale tint — a component that needs to read as more opaque glass, or that sits at compact-control scale rather than panel scale, gets its own tokens instead of raising the shared ones, which would change the nav too. A compact control doesn't have to take the glass treatment at all, though: the tech-badge marquee's badges were originally a translucent, blurred variant along these lines, but were later changed to reuse the plain solid `--color-surface-solid`/`--color-border` pair the cards use (section 7), once that card look shipped and read better for the badges too — no blur, no separate bg/border tokens. Only the shadow kept its own tuning, since that's about scale, not material:

```css
:root {
  --marquee-badge-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
}

[data-theme="dark"] {
  --marquee-badge-shadow: 0 4px 16px rgba(0, 0, 0, 0.48);
}
```

Shorter offset and blur radius than `--glass-shadow` (4px/14–16px vs 8px/28px) — proportionate to a small control rather than a panel — at higher opacity, because at this scale and mostly sitting over plain canvas, the shadow is what actually reads as "floating."

Used by the tech-badge marquee between About and Portfolio.

### Hover elevation

Section 6 specifies a hover state for lifted panels — `translateY(-2px)` plus "a marginally stronger shadow" — without a number for that shadow. One token covers it, shared by any panel that lifts on hover, glass or solid:

```css
:root {
  --shadow-hover: 0 12px 36px rgba(0, 0, 0, 0.2);
}

[data-theme="dark"] {
  --shadow-hover: 0 12px 36px rgba(0, 0, 0, 0.45);
}
```

Resting elevation still uses `--glass-shadow` regardless of whether the panel itself is glass or solid — it's the one elevation value the system defines. `--shadow-hover` is only the escalated state on top of it.

### Canvas & layout tokens

```css
--canvas-margin-mobile: 16px;   /* panel-to-viewport-edge gap */
--canvas-margin-desktop: 24px;
--canvas-margin: <the active one>;  /* responsive alias: resolves to -mobile below 768px, -desktop at/above. One value for calc() consumers (e.g. the hero's min-height) that would otherwise carry a breakpoint variant per call site. */
--panel-gap: 12px;              /* space between adjacent floating panels */
--nav-height: 62px;            /* rendered height of the fixed top-nav panel: ~36px control row + 12px×2 padding + 1px×2 border. The hero sizes its first screen against this. Not theme-dependent. */
```

Panels never sit flush against the viewport edge or against each other — the visible gap is what reads as floating rather than docked. On small screens, reduce `--canvas-margin`, not `--glass-radius`; a smaller radius reads as a regular card and breaks the effect.

The **hero** fills `calc(85svh - var(--nav-height) - var(--canvas-margin))` and pads its top by `var(--nav-height) + var(--canvas-margin)` so its vertically-centred content clears the fixed nav on short viewports.

### Corner treatment

`--glass-radius: 16px` via standard `border-radius` is the safe default everywhere. Where feasible, prefer an SVG `clip-path` squircle (continuous superellipse curve) over plain `border-radius` at this value — it reads closer to Apple's actual curve. Treat this as a nice-to-have with a `border-radius` fallback, not a blocker, since `corner-shape` browser support is still inconsistent. Rounded corners apply everywhere in this redesign, not just hero-level containers — badges, tags, and small controls should also carry a radius appropriate to their size rather than defaulting to square.

`--glass-radius` is sized for large panels — applied to a compact control it reads as an almost-pill shape rather than a rounded rectangle. Small controls (badges, tags, chips) use their own proportional token instead:

```css
:root {
  --radius-sm: 8px;
}
```

No dark-mode override — corner radius doesn't change with theme, only color does.

### Elevation without color

A glass panel's rendered background (its own tint plus whatever shows through) must stay perceptibly lighter or darker than the canvas behind it, in both modes, against the darkest/lightest content that could realistically sit behind it. If a panel risks blending into a busy background image, add a subtle solid scrim between canvas and glass rather than raising `--glass-bg` opacity globally.

## 6. Motion & interaction

Kept deliberately restrained — Apple's own device-motion light response doesn't translate to web, and reaching for a substitute (parallax, exaggerated hover) risks feeling gimmicky rather than premium. Default to:

- Subtle hover state on interactive glass panels: a small lift (`translateY(-2px)`) and a marginally stronger shadow, ~150ms ease-out.
- Page-load: a brief fade/rise on primary content, not a choreographed sequence.
- Scroll-triggered reveal on project cards is fine if it's a single, consistent treatment — not per-card variation.
- No ambient/looping animation. No motion effect runs unless it's responding to a direct user action (hover, scroll, click).
- All of the above respects `prefers-reduced-motion` (section 8) — reduced-motion users get the state change with no transition, not a slower version of it.

## 7. Component inventory — glass vs. solid

A first pass based on typical portfolio structure — correct this table against the actual current pages before building, since the specifics of what exists today weren't reviewed here.

| Component | Layer |
|---|---|
| Top nav | Glass |
| Modals / case-study detail overlay | Glass |
| Floating action buttons | Glass |
| Project / case-study cards | Solid (evaluate glass in POC phase) |
| Body text, headings | Solid |
| Buttons (all) | Solid — always fully opaque black/white, never glass |
| Footer / contact block | Solid |
| Dense content (lists, metadata) | Solid — never blurred, always fully legible |

Update this table as components get built and critiqued — it's the reference Claude Code should check before deciding whether a new component gets the glass treatment.

## 8. Accessibility requirements

- **Contrast** — all text meets WCAG AA against its actual rendered background, including text on glass, checked against worst-case content behind the panel, not just the token's nominal value.
- **`prefers-reduced-transparency: reduce`** — glass panels switch to a solid fallback (`var(--color-surface-solid)` at full opacity), not just a small opacity bump.
- **`prefers-reduced-motion: reduce`** — disable the hover lift/transition and scroll reveal timing described in section 6; apply the end state immediately.
- **Keyboard focus** — visible focus ring on every interactive element, including glass ones, with enough contrast to read against a translucent background (don't rely on the glass border alone as a focus indicator).

## 9. Browser support tiers

1. **Chromium** — full `backdrop-filter: blur()`. SVG refraction/displacement is a possible future enhancement, not part of the baseline.
2. **Safari / Firefox** — `backdrop-filter: blur()` + `rgba()` background, no distortion. Close enough to the baseline that it doesn't need a separate code path — just confirm `-webkit-backdrop-filter` is present.
3. **No `backdrop-filter` support** — drop blur, fall back to `var(--color-surface-solid)` at ~90% opacity. Border and shadow stay, so the panel still reads as elevated.

## 10. Build & iteration process

1. This brief is finalized before any Claude Code session starts.
2. Reference screenshots (Apple's own Liquid Glass UI) live in a `/reference` folder and are pointed to explicitly when prompting Claude Code — a visual anchor, not just a written description.
3. One component gets built first (nav or a modal) — not the whole app in one pass.
4. Screenshot it, compare directly against the reference images, write down specific deviations.
5. Fix by editing the numeric tokens in this brief, then have Claude Code reapply them — not by re-describing the fix in adjectives.
6. Validate on one more, structurally different component before trusting the tokens everywhere.
7. Scale to the rest of the app component by component, closing with one pass against the accessibility and browser-support checklists above, applied to every component, not just the test ones.

## 11. Tools & workflow

- **Claude Desktop** — planning and documentation; this brief lives and gets updated here.
- **Claude Code** — implementation, working from this brief and the `/reference` folder.
- `CLAUDE.md` — project-level conventions Claude Code reads automatically each session; should reference this brief and carry the definition-of-done checklist (contrast, fallback, reduced-motion/transparency) from section 8.