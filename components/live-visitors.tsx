"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function LiveVisitors() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const update = async () => {
      try {
        const res = await fetch("/api/visitors", { method: "POST" });
        const data = await res.json();
        setCount(data.count);
      } catch {
        /* silently ignore */
      }
    };

    update();
    const interval = setInterval(update, 15_000);
    return () => clearInterval(interval);
  }, []);

  if (count === null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full border border-border bg-card/70 px-4 py-2 shadow-lg backdrop-blur-md"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
        </span>
        <span className="text-xs font-mono text-muted-foreground">
          <span className="font-semibold text-foreground">{count}</span>{" "}
          {count === 1 ? "visit" : "visits"}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
