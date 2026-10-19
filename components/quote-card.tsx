import type { Recommendation } from "@/content/types";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function QuoteCard({ rec, clamp = false }: { rec: Recommendation; clamp?: boolean }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-border p-5">
      <span aria-hidden="true" className="font-pixel text-4xl leading-none text-foreground">
        “
      </span>
      <blockquote className={`mt-2 flex-1 text-sm leading-relaxed text-muted-foreground ${clamp ? "line-clamp-6" : ""}`}>
        {rec.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-foreground">
          {initials(rec.name)}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium text-foreground">
            {rec.sourceUrl ? (
              <a href={rec.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                {rec.name}
              </a>
            ) : (
              rec.name
            )}
          </span>
          <span className="block text-xs text-muted-foreground">
            {rec.title}
            {rec.date && ` · ${rec.date}`}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
