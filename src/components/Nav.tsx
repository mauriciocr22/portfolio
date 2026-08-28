import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMenu, FiSun, FiX } from "react-icons/fi";
import { FaCloudMoon, FaChevronDown } from "react-icons/fa";
import Logo from "./Logo";
import brFlag from "../assets/brasil-flag.svg";
import engFlag from "../assets/eng-flag.svg";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

interface NavProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const NAV_LINKS = [
  { href: "#home", key: "navHome" },
  { href: "#about", key: "navAbout" },
  { href: "#skills", key: "navSkills" },
  { href: "#portfolio", key: "navProjects" },
  { href: "#contact", key: "navContact" },
] as const;

// Redesign_Brief.md §5 — the glass material: translucent tint + blur, bordered,
// with a solid fallback for reduced-transparency and no-backdrop-filter tiers
// (§8, §9 tier 3). Tokens only, no inline blur/opacity/radius values.
//
// bg-nav-scrim (globals.css --nav-scrim) is an additive contrast-safety
// layer, nav-only, per §5 "scrim, not a global opacity increase". A
// background-image (solid-color gradient) so it stacks on bg-glass-bg's
// background-color rather than replacing it; sits over the blurred
// backdrop / under the content. --glass-bg untouched. Tints toward the
// mode's canvas (light in light mode, dark in dark). Dropped (bg-none) in
// the two fallback tiers, which are already opaque. Works together with
// the nav-halo below — see the combined measured table there.
const GLASS_PANEL =
  "rounded-glass border border-glass-border bg-glass-bg bg-nav-scrim shadow-glass backdrop-blur-glass " +
  "no-backdrop-filter:bg-surface-solid/90 no-backdrop-filter:bg-none no-backdrop-filter:backdrop-blur-none " +
  "reduced-transparency:bg-surface-solid reduced-transparency:bg-none reduced-transparency:backdrop-blur-none";

// nav-halo / nav-halo-graphic (globals.css --nav-halo-core/-spread): a
// mode-aware stacked text-shadow on the text and the matching stacked
// drop-shadow on any child icon/flag — a tight dense core at the glyph
// edge plus a soft spread — giving each glyph a local contrast floor
// regardless of what scrolls behind the nav.
//
// BEST-EFFORT, still not a full WCAG-AA guarantee. Measured from rendered
// pixels immediately adjacent to the strokes, over the About photo
// (near-black hair/hoodie to near-white sky, both in the nav's path),
// primary / secondary contrast (secondary row measured with the old
// --color-text-secondary; resting nav links now use the darker
// --color-nav-text, so those shift up over light regions / down over dark):
//                        halo alone        scrim 0.2 + halo
//   light · over sky      9.3 / 3.6         10.2 / 4.0
//   light · over dark     2.4 / 1.8          3.7 / 1.9
//   dark  · over sky      2.4 / 1.4          3.4 / 1.9
//   dark  · over dark    10.4 / 5.0         11.3 / 5.6
// Scrim + stacked halo is the strongest combination tried and lifts
// PRIMARY text over the hard regions from ~2 to ~3.4-3.7 — the closest
// yet — but the two cross-luminance cells and the mid-tone SECONDARY
// colour still sit below 4.5. Closing that fully needs occluding the
// backdrop near the text (heavier scrim / outline plate), which the "no
// more panel opacity" and "invisible over calm hero" constraints rule
// out. Over the calm hero the halo delta is ~0 (12.1 -> 12.5), invisible.
//
// Every nav control (incl. the portaled language popover and the mobile
// menu) routes through INTERACTIVE, so this reaches all of them; the
// Logo's masked span carries nav-halo-graphic directly.
const INTERACTIVE =
  "rounded-glass text-nav-text transition-colors hover:bg-glass-border hover:text-text-primary " +
  "nav-halo [&_svg]:nav-halo-graphic [&_img]:nav-halo-graphic " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-primary";

export default function Nav({ darkMode, toggleDarkMode }: NavProps) {
  const { i18n, t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { name: t("english"), code: "en", flag: engFlag },
    { name: t("portuguese"), code: "ptBr", flag: brFlag },
  ];

  const currentLang =
    languages.find((lang) => lang.code === i18n.language) ?? languages[0];

  // Close the mobile panel on viewport growth so it can't be left open
  // underneath the desktop layout.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed inset-x-canvas-margin-mobile top-canvas-margin-mobile z-50 md:inset-x-canvas-margin-desktop md:top-canvas-margin-desktop">
      <div
        className={`mx-auto flex w-full max-w-[1000px] items-center justify-between gap-4 px-4 py-3 md:px-6 ${GLASS_PANEL}`}
      >
        <a href="#home" aria-label="Home" className={`shrink-0 ${INTERACTIVE}`}>
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`block px-3 py-2 text-sm font-medium ${INTERACTIVE}`}
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            className={`hidden h-9 w-9 items-center justify-center md:inline-flex ${INTERACTIVE}`}
          >
            {darkMode ? <FiSun size={18} /> : <FaCloudMoon size={18} />}
          </button>

          <Popover open={isLangOpen} onOpenChange={setIsLangOpen}>
            <PopoverTrigger
              aria-label="Change language"
              className={`hidden items-center gap-1.5 px-2 py-1.5 md:inline-flex ${INTERACTIVE}`}
            >
              <img src={currentLang.flag} alt="" className="h-4 w-4" />
              <FaChevronDown size={11} />
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className={`w-40 border-subtle p-1 text-text-primary ${GLASS_PANEL}`}
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => {
                    i18n.changeLanguage(language.code);
                    setIsLangOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm ${INTERACTIVE}`}
                >
                  <img src={language.flag} alt="" className="h-4 w-4" />
                  {language.name}
                </button>
              ))}
            </PopoverContent>
          </Popover>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className={`inline-flex h-9 w-9 items-center justify-center md:hidden ${INTERACTIVE}`}
          >
            {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      <div
        aria-hidden={!isMenuOpen}
        className={`mx-auto mt-panel-gap w-full max-w-[1000px] origin-top overflow-hidden transition-all duration-150 ease-out motion-reduce:transition-none md:hidden ${
          isMenuOpen
            ? "pointer-events-auto max-h-96 opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className={`flex flex-col gap-1 p-3 ${GLASS_PANEL}`}>
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2.5 text-base font-medium text-text-primary ${INTERACTIVE}`}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-1 flex items-center justify-between border-t border-subtle pt-2">
            <button
              type="button"
              onClick={() =>
                i18n.changeLanguage(currentLang.code === "en" ? "ptBr" : "en")
              }
              className={`flex items-center gap-2 px-3 py-2 text-sm ${INTERACTIVE}`}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              <img src={currentLang.flag} alt="" className="h-4 w-4" />
              {currentLang.name}
            </button>

            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              className={`inline-flex h-9 w-9 items-center justify-center ${INTERACTIVE}`}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              {darkMode ? <FiSun size={18} /> : <FaCloudMoon size={18} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
