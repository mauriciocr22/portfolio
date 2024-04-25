import { useEffect, useRef, useState } from "react";

export default function ScrollArrow() {
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const element = ref.current;
      if (element) {
        const { top } = element.getBoundingClientRect();
        setIsVisible(top > window.innerHeight)
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  return (
    <div ref={ref} className={`scrollWrapper ${isVisible ? "opacity-100" : "opacity-0"}`} >
      <span className="arrowSpan"></span>
      <span className="arrowSpan"></span>
      <span className="arrowSpan"></span>
    </div>
  )
}