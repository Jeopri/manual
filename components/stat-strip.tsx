import Link from "next/link";
import type { Stat } from "@/content/types";

export default function StatStrip({ stats }: { stats: Stat[] }) {
  if (stats.length === 0) return null;

  return (
    <section aria-label="Highlights">
      {/* gap-px over a border-colored background draws the dividing lines */}
      <ul className="grid grid-cols-2 gap-px overflow-hidden border-y border-border bg-border sm:grid-cols-4">
        {stats.map((stat) => {
          const body = (
            <>
              <span className="font-pixel text-2xl text-foreground">
                {stat.value}
                {stat.href && <span className="ml-1 align-top font-sans text-[10px] text-muted-foreground">↗</span>}
              </span>
              <span className="mt-1 font-mono text-[10px] uppercase leading-snug tracking-wider text-muted-foreground">
                {stat.label}
              </span>
            </>
          );
          const cell = "flex h-full flex-col bg-background px-3 py-5";
          return (
            <li key={stat.label}>
              {stat.href ? (
                <Link href={stat.href} className={`${cell} transition-colors hover:bg-muted`}>
                  {body}
                </Link>
              ) : (
                <div className={cell}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
