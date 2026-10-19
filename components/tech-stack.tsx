"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ToolGroup } from "@/content/types";
import { cn } from "@/lib/utils";

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
};

const arrowButton =
  "flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-foreground/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30";

export default function TechStack({ groups }: { groups: ToolGroup[] }) {
  const [[index, direction], setIndex] = useState([0, 0]);

  const paginate = (step: number) => {
    const next = index + step;
    if (next >= 0 && next < groups.length) setIndex([next, step]);
  };

  const group = groups[index];

  return (
    <div>
      {/* Tabs double as the slide index and make every group reachable in one click */}
      <div role="tablist" aria-label="Tech stack categories" className="mb-4 flex flex-wrap gap-1.5">
        {groups.map((g, i) => (
          <button
            key={g.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex([i, i > index ? 1 : -1])}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-[11px] transition-colors",
              i === index
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {g.title}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg border border-border">
        <div className="relative min-h-[360px] overflow-hidden sm:min-h-[300px]">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={index}
              role="tabpanel"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="p-5 md:p-6"
            >
              <h3 className="font-pixel text-xl text-foreground">{group.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{group.description}</p>

              <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {group.tools.map((tool) => (
                  <li
                    key={tool.name}
                    className="flex items-center gap-2.5 rounded-md border border-border px-3 py-2 transition-colors hover:border-foreground/30"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- small third-party SVG/ICO icons */}
                    <img src={tool.icon} alt="" className="h-4 w-4 object-contain grayscale" referrerPolicy="no-referrer" loading="lazy" />
                    <span className="truncate text-xs text-muted-foreground">{tool.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-3 flex justify-end gap-1.5">
        <button type="button" aria-label="Previous category" onClick={() => paginate(-1)} disabled={index === 0} className={arrowButton}>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button type="button" aria-label="Next category" onClick={() => paginate(1)} disabled={index === groups.length - 1} className={arrowButton}>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
