import Link from "next/link";
import type { Experience } from "@/content/types";

/** "2025   Data Analyst / Web Developer   Ubest Development Inc." rows for the home page. */
export default function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <ol>
      {items.map((exp) => {
        // Date strings look like "Oct 2025 – May 2026"; show the start year like a résumé margin note.
        const year = exp.date.match(/\d{4}/)?.[0] ?? "";
        return (
          <li key={`${exp.company}-${exp.role}`}>
            <Link
              href="/experience"
              className="-mx-3 grid grid-cols-[3.5rem_1fr] gap-x-4 rounded-md px-3 py-2.5 transition-colors hover:bg-muted"
            >
              <span className="font-mono text-xs text-muted-foreground">{year}</span>
              <span className="min-w-0">
                <span className="block truncate text-sm text-foreground">{exp.role}</span>
                <span className="block truncate text-xs text-muted-foreground">{exp.company}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
