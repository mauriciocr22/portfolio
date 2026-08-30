import { type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

// This project's own repository — from `git remote -v` (origin), minus the
// trailing .git so it resolves as a web URL.
const REPO_URL = "https://github.com/mauriciocr22/portfolio";

// Muted by default, one step up to secondary on hover. Focus ring matches
// the site's buttons — offset against the page canvas the footer sits on.
const LINK =
  "rounded-sm text-text-muted transition-colors hover:text-text-secondary " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transition-none";

export default function Footer() {
  const { t } = useTranslation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const year = new Date().getFullYear();

  // Smooth by default; an instant jump when the OS asks for reduced motion.
  // `behavior: "instant"` is explicit so it beats the global
  // `scroll-behavior: smooth !important` (globals.css) that a plain `#home`
  // anchor would otherwise always honour.
  const handleBackToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
    window.history.replaceState(null, "", "#home");
  };

  return (
    <footer className="w-full">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-3 border-t border-subtle px-canvas-margin-mobile py-8 text-center text-[12.5px] text-text-muted md:flex-row md:justify-between md:px-canvas-margin-desktop">
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
          <Logo />
          <span>© {year} Maurício Rodrigues</span>
        </div>

        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            {t("footerBuiltWith")}
          </a>
          <a href="#home" onClick={handleBackToTop} className={LINK}>
            {t("footerBackToTop")}
          </a>
        </div>
      </div>
    </footer>
  );
}
