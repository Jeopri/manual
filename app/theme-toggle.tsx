"use client";
import { useTheme, type ThemePreference } from "./theme-provider";
import { cn } from "@/lib/utils";

const options: { value: ThemePreference; label: string; icon: React.ReactNode }[] = [
  {
    value: "system",
    label: "System theme",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="1.5" />
        <path d="M8 20h8M12 16v4" />
      </>
    ),
  },
  {
    value: "light",
    label: "Light theme",
    icon: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </>
    ),
  },
  {
    value: "dark",
    label: "Dark theme",
    icon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  },
];

/** Three-way switch: follow the OS, or force light / dark. */
export default function ThemeSwitch() {
  const { preference, setPreference } = useTheme();

  return (
    <div role="group" aria-label="Theme" className="inline-flex rounded-full border border-border p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-label={o.label}
          aria-pressed={preference === o.value}
          onClick={() => setPreference(o.value)}
          className={cn(
            "inline-flex h-6 w-6 items-center justify-center rounded-full transition-colors",
            preference === o.value ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            {o.icon}
          </svg>
        </button>
      ))}
    </div>
  );
}
