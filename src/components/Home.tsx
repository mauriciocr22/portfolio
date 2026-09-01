import { useTranslation } from "react-i18next";

// The résumé is served from `public/` under its final download name, not
// imported through Vite. A Vite-imported asset gets a hashed URL
// (`curriculum-a1b2c3d4.pdf`), and the browser falls back to that basename
// whenever it ignores the `download` attribute's suggested filename — which
// it does for cross-origin responses, stale CDN copies, or a host that sends
// its own Content-Disposition. A real file in `public/` keeps the clean
// name in the URL itself, so the save name is correct regardless.
const RESUME_URL = "/mauricio-rodrigues-resume.pdf";

// Redesign_Brief.md §7 — the hero is content, not glass: no panel, no blur,
// no border. Type comes from the §4 scale (the display face is on the h1
// only); the buttons are the §3 solid tokens, which already invert with
// mode.
//
// Colour note (§8): the pill sits on a solid chip so its quieter
// --color-text-secondary still clears AA; the h1 and the sentence sit
// directly on the gradient canvas, whose dark end drops
// --color-text-secondary below AA, so both use --color-text-primary and
// lean on size/weight for hierarchy instead of hue.
const BTN_BASE =
  "inline-flex h-12 items-center justify-center rounded-badge px-6 text-sm font-medium " +
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transition-none";

const BTN_SOLID = `${BTN_BASE} bg-button-bg text-button-text hover:bg-button-bg-hover`;

const BTN_OUTLINE =
  `${BTN_BASE} border border-text-secondary text-text-primary ` +
  "hover:border-text-primary hover:bg-subtle";

export default function Home() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      // §4 hero spec: fills 85svh less the fixed nav and one --canvas-margin;
      // pt-nav-offset then clears the nav so the vertically-centred content
      // never sits under it on short viewports.
      className="flex min-h-hero flex-col items-center justify-center px-canvas-margin pt-nav-offset text-center"
    >
      {/* §6 page-load: one brief fade/rise on the whole content block, not a
          per-element sequence. motion-reduce drops it to the end state. */}
      <div className="flex w-full max-w-[1000px] animate-fade-rise flex-col items-center gap-6 motion-reduce:animate-none">
        <span className="rounded-badge border border-subtle bg-surface-solid px-3 py-1 text-caption text-text-secondary">
          {t("heroStatusPill")}
        </span>

        <h1 className="font-display text-display-sm text-text-primary md:text-display">
          Maurício Rodrigues
        </h1>

        <p className="max-w-measure text-body text-text-primary">
          {t("heroTagline")}
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <a href="#contact" className={BTN_SOLID}>
            {t("heroContactCta")}
          </a>
          <a
            href={RESUME_URL}
            download="mauricio-rodrigues-resume.pdf"
            className={BTN_OUTLINE}
          >
            {t("heroResumeCta")}
          </a>
        </div>
      </div>
    </section>
  );
}
