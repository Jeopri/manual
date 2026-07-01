"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const SESSION_KEY = "visitor-session-id";

function getOrCreateSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export default function LiveVisitors() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const sessionId = getOrCreateSessionId();

    const beat = async () => {
      try {
        const res = await fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        setCount(data.count);
      } catch {
        /* silently ignore */
      }
    };

    beat();
    const interval = setInterval(beat, 15_000);
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
          <span className="font-semibold text-foreground">{count}</span> watching
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
