import type { ContributionCalendar } from "@/lib/github";

const CELL = 8;
// Dot radius per activity level — bigger dot, more activity (halftone style).
const RADIUS = [0.9, 1.7, 2.4, 3.0, 3.6];

export default function GithubHeatmap({ calendar, user }: { calendar: ContributionCalendar; user: string }) {
  const width = calendar.weeks * CELL;
  const height = 7 * CELL;

  return (
    <div>
      <a
        href={`https://github.com/${user}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-lg border border-border p-4 transition-colors hover:border-foreground/30"
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full text-foreground"
          role="img"
          aria-label={`GitHub contribution graph: ${calendar.total} contributions in the last year`}
        >
          {calendar.days.map((d) => (
            <circle
              key={d.date}
              cx={d.col * CELL + CELL / 2}
              cy={d.row * CELL + CELL / 2}
              r={RADIUS[Math.min(4, Math.max(0, d.level))]}
              fill="currentColor"
              opacity={d.level === 0 ? 0.18 : 0.95}
            >
              <title>{`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}</title>
            </circle>
          ))}
        </svg>
      </a>
      <p className="mt-3 font-mono text-xs text-muted-foreground">
        {calendar.total.toLocaleString("en-US")} contributions in the last year
      </p>
    </div>
  );
}
