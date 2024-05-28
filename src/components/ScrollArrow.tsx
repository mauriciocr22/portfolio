import { useEffect, useState } from "react";

export default function ScrollArrow() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrolled = window.scrollY > 100;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return (
    <div
      className={`scrollWrapper ${!isScrolled ? "opacity-100" : "opacity-0"}`}
    >
      <span className="arrowSpan"></span>
      <span className="arrowSpan"></span>
      <span className="arrowSpan"></span>
    </div>
  );
}
