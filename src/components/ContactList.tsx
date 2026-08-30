import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiChevronRight, FiCopy } from "react-icons/fi";

const EMAIL = "mauriciocr223@gmail.com";

// Redesign_Brief.md §5/§7 — one glass panel, taking the nav (the site's
// glass reference) as the model: a translucent, canvas-tinted surface, the
// §5 blur, a hairline glass border and the one resting elevation shadow.
// The tint is `bg-nav-scrim` — the nav's own lightening layer, which is
// mode-aware, so it stays a *light* film in light mode and a dark one in
// dark. `bg-glass-bg` is deliberately NOT used: it's a fixed rgba(0,0,0,.04)
// darkening film that reads as a flat grey chip on its own in light mode.
// §8 fallbacks mirror the nav: a solid surface when the OS asks for reduced
// transparency, and when backdrop-filter isn't supported.
const PANEL =
  "mx-auto w-full max-w-[460px] overflow-hidden rounded-glass border border-glass-border " +
  "bg-nav-scrim shadow-glass backdrop-blur-glass " +
  "no-backdrop-filter:bg-surface-solid/90 no-backdrop-filter:bg-none no-backdrop-filter:backdrop-blur-none " +
  "reduced-transparency:bg-surface-solid reduced-transparency:bg-none reduced-transparency:backdrop-blur-none";

// Shared frame for the four social rows. The focus ring is inset because the
// panel clips its overflow — an outward ring would be cut at the rounded
// corners. `border-t` gives the divider; it's set on every row after the
// first, so there's a hairline between rows and none above the first or
// below the last.
const SOCIAL_ROW =
  "flex items-center justify-between gap-4 border-t border-subtle px-4 py-[13px] text-[13.5px] " +
  "text-text-secondary transition-colors hover:bg-subtle " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-primary";

interface Social {
  name: string;
  value: string;
  href: string;
}

export default function ContactList() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const revertRef = useRef<number>();

  const handleCopy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard
      .writeText(EMAIL)
      .then(() => {
        setCopied(true);
        window.clearTimeout(revertRef.current);
        revertRef.current = window.setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Clipboard write blocked (permissions / insecure context). The
        // mailto link beside this button is the fallback path.
      });
  };

  const socials: Social[] = [
    {
      name: "GitHub",
      value: "@mauriciocr22",
      href: "https://github.com/mauriciocr22",
    },
    {
      name: "LinkedIn",
      value: "in/mauriciocr22",
      href: "https://www.linkedin.com/in/mauriciocr22/",
    },
    {
      name: "WhatsApp",
      value: t("contactWhatsappCta"),
      href: "https://wa.me/13974069042",
    },
  ];

  return (
    <>
      <div className={PANEL}>
        {/* Email — the primary row: taller, larger and heavier than the rest,
            and not a plain link. Stacks (label above value) below `sm` so the
            address never crowds its label on a ~390px screen. */}
        <div className="flex flex-col gap-1 px-4 py-[17px] text-[15px] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="text-text-secondary">Email</span>
          <span className="flex items-center gap-2">
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-badge font-semibold text-text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-primary"
            >
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={t("contactCopyEmail")}
              className="inline-flex shrink-0 items-center gap-1 rounded-badge px-1.5 py-1 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-primary"
            >
              {copied ? (
                <>
                  <FiCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("contactCopied")}
                </>
              ) : (
                <FiCopy className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          </span>
        </div>

        {/* Social channels — the whole row is the link, opening in a new tab,
            with a dim chevron trailing. */}
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={SOCIAL_ROW}
          >
            <span>{social.name}</span>
            <span className="flex items-center gap-2 font-medium text-text-primary">
              {social.value}
              <FiChevronRight
                className="h-4 w-4 shrink-0 opacity-40"
                aria-hidden="true"
              />
            </span>
          </a>
        ))}
      </div>

      {/* Announce the copy result. The button's aria-label stays constant so
          the control's purpose never shifts under assistive tech. */}
      <p className="sr-only" role="status" aria-live="polite">
        {copied ? t("contactCopied") : ""}
      </p>
    </>
  );
}
