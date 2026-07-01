"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const SESSION_KEY = "visitor-session-id";

type VisitorEvent = {
  id: number;
  location: string;
};

type Toast = {
  id: number;
  location: string;
};

function getOrCreateSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function getDeviceInfo() {
  const ua = navigator.userAgent;
  let browser = "Unknown";
  if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari")) browser = "Safari";

  let os = "Unknown";
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iOS")) os = "iOS";

  return {
    browser,
    os,
    device: /Mobi|Android/i.test(ua) ? "Mobile" : "Desktop",
    screen: `${window.screen.width}x${window.screen.height}`,
  };
}

export default function LiveVisitors() {
  const [count, setCount] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<ReturnType<typeof getDeviceInfo> | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const lastEventId = useRef(0);

  useEffect(() => {
    setInfo(getDeviceInfo());
  }, []);

  useEffect(() => {
    const sessionId = getOrCreateSessionId();

    const beat = async () => {
      try {
        const res = await fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, lastEventId: lastEventId.current }),
        });
        const data = await res.json();
        setCount(data.count);

        const events = data.events as VisitorEvent[];
        if (events && events.length > 0) {
          const newToasts = events.map((e) => ({ id: e.id, location: e.location }));
          setToasts((prev) => [...prev, ...newToasts]);
          lastEventId.current = events[events.length - 1].id;
        }
      } catch {
        /* silently ignore */
      }
    };

    beat();
    const interval = setInterval(beat, 10_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 4000);
    return () => clearTimeout(timer);
  }, [toasts]);

  if (count === null) return null;

  return (
    <>
      {/* New-visitor toasts */}
      <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center gap-2.5 rounded-xl border border-border bg-card/80 px-4 py-2.5 shadow-lg backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <div className="text-xs">
                <p className="text-foreground font-medium">New visitor</p>
                <p className="text-muted-foreground">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Info popup */}
      <AnimatePresence>
        {open && info && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-20 right-6 z-40 w-64 rounded-xl border border-border bg-card p-4 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-semibold text-foreground">
                {count} active viewer{count !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Browser</span>
                <span className="text-foreground font-medium">{info.browser}</span>
              </div>
              <div className="flex justify-between">
                <span>OS</span>
                <span className="text-foreground font-medium">{info.os}</span>
              </div>
              <div className="flex justify-between">
                <span>Device</span>
                <span className="text-foreground font-medium">{info.device}</span>
              </div>
              <div className="flex justify-between">
                <span>Screen</span>
                <span className="text-foreground font-medium">{info.screen}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-[10px] text-muted-foreground/60 font-mono truncate">
                Session: {getOrCreateSessionId().slice(0, 12)}...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main badge */}
      <motion.button
        onClick={() => setOpen((p) => !p)}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full border border-border bg-card/70 px-4 py-2 shadow-lg backdrop-blur-md hover:bg-card/90 transition-colors cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
        </span>
        <span className="text-xs font-mono text-muted-foreground">
          <span className="font-semibold text-foreground">{count}</span> watching
        </span>
      </motion.button>
    </>
  );
}
