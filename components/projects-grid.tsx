"use client";
import { useState } from "react";
import ProjectCard from "@/components/project-card";
import type { Project, ProjectCategory } from "@/content/types";
import { cn } from "@/lib/utils";

type Filter = ProjectCategory | "all";

export default function ProjectsGrid({
  projects,
  categories,
}: {
  projects: Project[];
  categories: { id: ProjectCategory; label: string }[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const options: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: projects.length },
    ...categories.map((c) => ({ ...c, count: projects.filter((p) => p.category === c.id).length })),
  ];

  return (
    <>
      <div role="group" aria-label="Filter projects" className="mb-6 flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => setFilter(o.id)}
            aria-pressed={filter === o.id}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-[11px] transition-colors",
              filter === o.id
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {o.label} <span className="opacity-60">{o.count}</span>
          </button>
        ))}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {shown.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </>
  );
}
