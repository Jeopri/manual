"use client";
import { useEffect, useState } from "react";

const sections = [
  { id: "main-section", label: "Selected Work" },
  { id: "experience", label: "Experience" },
  { id: "tools", label: "Tech Stack" },
  { id: "contact", label: "Contact" },
];

export default function ScrollSpy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      let current = 0;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop - windowHeight / 3 <= scrollTop) {
          current = i;
          break;
        }
      }
      setActiveIndex(current);

      const firstEl = document.getElementById(sections[0].id);
      const lastEl = document.getElementById(sections[sections.length - 1].id);
      if (firstEl && lastEl) {
        const start = firstEl.offsetTop;
        const end = lastEl.offsetTop + lastEl.offsetHeight;
        const total = end - start - windowHeight;
        const currentPos = Math.max(0, Math.min(1, (scrollTop - start) / total));
        setProgress(currentPos);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 md:block">
      <div className="flex flex-col items-center gap-5">
        {/* Vertical progress line */}
        <div className="relative h-48 w-px bg-border">
          <div
            className="absolute top-0 w-px bg-primary transition-all duration-300"
            style={{ height: `${progress * 100}%` }}
          />
        </div>

        {/* Section dots */}
        <div className="flex flex-col items-center gap-5">
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() =>
                document
                  .getElementById(section.id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative flex items-center gap-3"
            >
              <span
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-primary shadow-[0_0_8px_rgba(190,255,0,0.5)]"
                    : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
                }`}
              />
              <span
                className={`absolute left-4 text-xs whitespace-nowrap transition-all duration-300 ${
                  i === activeIndex
                    ? "text-foreground font-medium opacity-100"
                    : "text-muted-foreground opacity-0 group-hover:opacity-60"
                }`}
              >
                {section.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
