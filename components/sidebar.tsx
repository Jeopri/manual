"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "@/app/theme-toggle";
import LiveVisitors from "@/components/live-visitors";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string };

/**
 * Fixed left column on large screens; a slide-in drawer under a slim top bar
 * on small ones. It's one element either way, so the live-visitor heartbeat
 * only ever runs once.
 */
export default function Sidebar({ groups }: { groups: NavItem[][] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/90 px-5 backdrop-blur lg:hidden">
        <Link href="/" onClick={close} className="font-pixel text-base text-foreground">
          {site.name}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="sidebar"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && <div className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden" onClick={close} aria-hidden="true" />}

      <aside
        id="sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-background px-7 py-8 transition-transform duration-300 lg:w-56 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Link href="/" onClick={close} className="font-pixel text-lg text-foreground">
          {site.name}
        </Link>

        <nav aria-label="Main" className="mt-10 flex-1 space-y-6 overflow-y-auto">
          {groups.map((group, i) => (
            <ul key={i} className={cn("space-y-1", i > 0 && "border-t border-border pt-6")}>
              {group.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 py-1 font-mono text-[13px] transition-colors",
                      isActive(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn("h-px w-3 bg-foreground transition-opacity", isActive(item.href) ? "opacity-100" : "opacity-0")}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>

        <div className="space-y-5 border-t border-border pt-6">
          <LiveVisitors />
          <div className="flex items-center gap-3">
            <ThemeSwitch />
            <a
              href={site.resume}
              download
              className="font-mono text-[11px] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              resume.pdf ↓
            </a>
          </div>
          <div>
            <p className="text-xs leading-relaxed text-muted-foreground">For work, collabs &amp; everything else, reach me at</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 block break-all font-mono text-[11px] text-foreground underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
