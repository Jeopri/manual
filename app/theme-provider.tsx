"use client";
import React from "react";

export type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "theme";
const CHANGE_EVENT = "themechange";
// Matches the inline script in layout.tsx: no saved choice means dark.
const DEFAULT_PREFERENCE: ThemePreference = "dark";

const defaultContext = {
  preference: DEFAULT_PREFERENCE as ThemePreference,
  setPreference: (() => {}) as (preference: ThemePreference) => void,
};

const ThemeContext = React.createContext(defaultContext);

function readPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    /* storage blocked */
  }
  return DEFAULT_PREFERENCE;
}

function applyPreference(preference: ThemePreference) {
  const dark =
    preference === "dark" ||
    (preference === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const preference = React.useSyncExternalStore(subscribe, readPreference, () => DEFAULT_PREFERENCE);

  // While following the system, track OS-level light/dark switches.
  React.useEffect(() => {
    if (preference !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyPreference("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [preference]);

  const setPreference = React.useCallback((next: ThemePreference) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage blocked — still applies for this visit */
    }
    applyPreference(next);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return <ThemeContext.Provider value={{ preference, setPreference }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => React.useContext(ThemeContext);
