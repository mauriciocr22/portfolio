import logoIcon from "../assets/logo.png";

export default function Logo() {
  return (
    <div className="flex items-center">
      {/* logo.png is a white glyph on a transparent alpha channel, so it's used
          as a mask: fill color follows the same tokens as the nav's text/icons
          — text-secondary (gray) in light mode, plain white in dark mode, the
          same white the source asset ships as. mask-image is set inline since
          the asset URL is a Vite-hashed value computed at build time, not
          something expressible as a static Tailwind class. Sized by aspect-[]
          from the PNG's real 2000×1025 dimensions rather than a guessed height.
          The wrapper used to be w-12 around a w-16 icon — 33% wider than its
          own box — which the flat mask fill made obvious; sized down and
          brought in line with its container here. */}
      <span
        aria-hidden="true"
        className="block w-10 aspect-[2000/1025] bg-text-secondary dark:bg-white nav-halo-graphic"
        style={{
          maskImage: `url(${logoIcon})`,
          WebkitMaskImage: `url(${logoIcon})`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskPosition: "left center",
          WebkitMaskPosition: "left center",
        }}
      />
    </div>
  );
}
