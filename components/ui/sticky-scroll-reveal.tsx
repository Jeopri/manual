"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform, useSpring } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);

  const { scrollYProgress: containerProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: viewportProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(containerProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const opacityTransform = useTransform(
    viewportProgress,
    [0, 0.08, 0.92, 1],
    [0, 1, 1, 0],
  );
  const contentOpacity = useSpring(opacityTransform, { stiffness: 300, damping: 30 });

  const backgroundColors = [
    "#0f172a",
    "#000000",
    "#171717",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      style={{ opacity: contentOpacity }}
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex h-[30rem] justify-center space-x-10 overflow-y-auto rounded-md p-10 hide-scrollbar"
      ref={ref}
    >
      <div className="div relative flex items-start pl-8 pr-8 md:pl-16 md:pr-12 -ml-14 md:-ml-25">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-lg mt-10 max-w-lg text-slate-300 text-left"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>

      {/* ── Sticky card — made taller and wider ── */}
      <motion.div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-4 hidden h-[26rem] w-[22rem] overflow-hidden rounded-xl bg-white lg:block flex-shrink-0",
          contentClassName,
        )}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="h-full w-full"
          whileHover={{ scale: 1.02, rotate: 0.4 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
        >
          {content[activeCard].content ?? null}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};