"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

const SESSION_KEY = "visitor-session-id";

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

/** "● N people viewing now" line for the sidebar, plus new-visitor toasts. */
export default function LiveVisitors() {
  const [count, setCount] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<ReturnType<typeof getDeviceInfo> | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const lastEventId = useRef(0);

  // Device info is read from browser APIs, so collect it on first open.
  const togglePopup = () => {
    setInfo((current) => current ?? getDeviceInfo());
    setOpen((p) => !p);
  };

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

        const events = data.events as Toast[];
        if (events && events.length > 0) {
          setToasts((prev) => [...prev, ...events]);
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
    }, 5000);
    return () => clearTimeout(timer);
  }, [toasts]);

  if (count === null) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={togglePopup}
        aria-expanded={open}
        className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/50" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
        </span>
        <span>
          <span className="font-medium text-foreground">{count}</span> {count === 1 ? "person" : "people"} viewing now
        </span>
      </button>

      <AnimatePresence>
        {open && info && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-0 z-50 mb-2 w-52 rounded-lg border border-border bg-card p-3 shadow-xl"
          >
            <dl className="space-y-1 font-mono text-[11px] text-muted-foreground">
              {Object.entries({ Browser: info.browser, OS: info.os, Device: info.device, Screen: info.screen }).map(
                ([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <dt>{label}</dt>
                    <dd className="text-foreground">{value}</dd>
                  </div>
                ),
              )}
            </dl>
            <p className="mt-2 truncate border-t border-border pt-2 font-mono text-[10px] text-muted-foreground/70">
              Session: {getOrCreateSessionId().slice(0, 12)}...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New-visitor toasts. Portaled to <body>: the sidebar uses a transform for its
          mobile slide-in, which would otherwise pin "fixed" children inside it. */}
      {createPortal(
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="rounded-lg border border-border bg-card px-4 py-3 text-xs shadow-lg"
            >
              <p className="font-medium text-foreground">Someone joined from</p>
              <p className="text-muted-foreground">{t.location}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>,
        document.body,
      )}
    </div>
  );
}
