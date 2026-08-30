import { useTranslation } from "react-i18next";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import selfieImg from "../assets/foto-720.jpg";
import selfieImg2x from "../assets/foto-1440.jpg";

// Redesign_Brief.md §7 — About is content, not glass. The portrait is a
// plain full-colour image. The one glass surface in the section is the
// status pill (§5 tokens, mode-aware like the nav); everything else is flat.

// §5 solid content surface — the social icon pill.
const SURFACE = "rounded-badge border border-subtle bg-surface-solid";

const SOCIAL_LINK =
  "flex h-10 w-10 items-center justify-center rounded text-text-secondary transition-colors " +
  "hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset " +
  "focus-visible:ring-text-primary motion-reduce:transition-none";

export default function About() {
  const { t } = useTranslation();

  const socials = [
    { href: "https://github.com/mauriciocr22", label: t("aboutGithubLabel"), Icon: FaGithub },
    { href: "https://www.linkedin.com/in/mauriciocr22/", label: t("aboutLinkedinLabel"), Icon: FaLinkedin },
    { href: "https://wa.me/13974069042", label: t("aboutWhatsappLabel"), Icon: IoLogoWhatsapp },
    { href: "https://www.instagram.com/crmaumau/", label: t("aboutInstagramLabel"), Icon: FaInstagram },
  ];

  return (
    <section id="about" className="w-full px-canvas-margin py-16">
      {/* Grid row is align-items: start — each column keeps its own height,
          so the portrait no longer stretches to match the content column
          (which used to lock in ~190px of dead space beneath it). */}
      <div className="mx-auto grid max-w-[1000px] gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:items-start md:gap-12">
        {/* Left — just the portrait now; the social row moved into the
            content column. Centred below md with the rest of the section,
            left-aligned again from md up. */}
        <div className="flex flex-col items-center md:items-start">
          {/* Below md: capped at 280px and centred (mx-auto). From md up:
              unchanged — fills the 320px grid track (md:mx-0 md:max-w-none).
              Scale only: aspect ratio, crop and object-position untouched.
              --glass-radius squircle, overflow clipped. */}
          <div className="mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-glass md:mx-0 md:max-w-none">
            {/* Always full colour — no grayscale, no hover treatment.
                Sharpness: the source is 2688² and renders at ≤320 CSS px
                wide, so it is NOT upscaled — the srcset only spares the
                browser an ~8× runtime downscale, which reads sharper on
                HiDPI than the fast resampler it would use otherwise. */}
            <img
              src={selfieImg}
              srcSet={`${selfieImg} 1x, ${selfieImg2x} 2x`}
              alt={t("aboutPortraitAlt")}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Right — lead → body → byline → status pill → social links.
            Centre-aligned below md (matching the hero and every section
            heading); left-aligned from md up, exactly as before. */}
        <div className="text-center md:text-left">
          <h2 className="sr-only">{t("navAbout")}</h2>

          {/* Lead line — the opening sentence, pulled out and enlarged
              (§4). Largest text in the section; carries it in place of a
              visible heading. 22px below md, 26px from md up (md:text-lead
              fully restores the desktop rule); text-balance evens the rag,
              reset to default wrapping at md so desktop is untouched. */}
          <p className="mx-auto max-w-measure text-balance text-lead-sm text-text-primary md:mx-0 md:text-lead md:text-wrap">
            {t("aboutLead")}
          </p>

          {/* Body — the remaining sentences, dropped to 15.5px / secondary
              so the lead clearly leads. Secondary on the bare gradient can
              dip to ~4.25:1 at the dark end on narrow phones (§8) — kept per
              spec. Same max-w-measure as the lead so the left edge lines up. */}
          <p className="mx-auto mt-[18px] max-w-measure text-[15.5px] leading-[1.7] text-text-secondary md:mx-0">
            {t("aboutBody")}
          </p>

          {/* Byline — the three demoted facts. Below md it's a centred
              vertical stack (one fact per line, no separators — they'd
              orphan on wrap); from md up it's exactly the previous inline
              row (md:mt-2 / md:flex-row / md:flex-wrap / md:items-center /
              md:gap-x-3.5 / md:gap-y-2 — md:items-center already covered the
              desktop row, so switching the base to items-center is
              mobile-only). Each specific value is primary/medium; connective
              words and the "/" separators stay quiet. Separators are
              decorative (aria-hidden); the list stays semantic — three
              items, each part a locale key. */}
          <ul className="mt-4 flex flex-col items-center gap-y-1 text-[13.5px] text-text-secondary md:mt-2 md:flex-row md:flex-wrap md:items-center md:gap-x-3.5 md:gap-y-2">
            <li className="font-medium text-text-primary">
              {t("aboutBylineLocation")}
            </li>
            <li aria-hidden="true" className="hidden text-text-muted md:inline">
              /
            </li>
            <li>
              {t("aboutBylineSchoolPrefix")}{" "}
              <span className="font-medium text-text-primary">
                {t("aboutBylineSchool")}
              </span>
            </li>
            <li aria-hidden="true" className="hidden text-text-muted md:inline">
              /
            </li>
            <li className="font-medium text-text-primary">
              <span aria-hidden="true">{t("aboutBylineLanguages")}</span>
              {/* "PT · EN" spelled out for assistive tech (this is the
                  string flagged for the EN typo fix). */}
              <span className="sr-only">{t("aboutSpeaksValue")}</span>
            </li>
          </ul>

          {/* Status pill — the one promoted fact and the only emphasised
              element in the block. Glass from the §5 tokens (--glass-bg
              tint + --glass-border + --glass-blur), so it flips with mode
              like the nav. inline-flex on its own line so it hugs the label
              and stays left-aligned with the byline. The dot's ring is an
              ::after; its slow pulse is gated for reduced motion. */}
          <div className="mt-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-3 py-1.5 text-[12.5px] font-medium text-text-primary backdrop-blur-glass">
              <span
                aria-hidden="true"
                className="relative h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-text-primary after:absolute after:-inset-1 after:rounded-full after:border after:border-glass-border after:content-[''] motion-reduce:animate-none"
              />
              {t("aboutStatusPill")}
            </span>
          </div>

          {/* Social links — last in the stack. w-fit so the pill hugs its
              four icons (not w-full, no justify-between); the links, hover
              states and focus rings are unchanged from before the move.
              mx-auto centres the hugged pill below md; md:mx-0 / md:mt-[26px]
              hold the desktop position exactly; mt-6 tightens it below md. */}
          <ul className={`mx-auto mt-6 flex w-fit items-center gap-1 p-1 md:mx-0 md:mt-[26px] ${SURFACE}`}>
            {socials.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={SOCIAL_LINK}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
