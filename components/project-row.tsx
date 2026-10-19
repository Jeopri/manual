import ProjectThumb from "@/components/project-thumb";
import Link from "next/link";
import { projectCategories } from "@/content/projects";
import type { Project } from "@/content/types";

/** Compact one-line project entry for the home page. */
export default function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group -mx-3 flex items-center gap-4 rounded-md px-3 py-3 transition-colors hover:bg-muted"
    >
      <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded border border-border bg-card">
        <ProjectThumb project={project} sizes="64px" className="grayscale transition duration-300 group-hover:grayscale-0" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-medium text-foreground">{project.title}</h3>
        <p className="truncate text-xs text-muted-foreground">{project.summary}</p>
      </div>
      <span className="hidden shrink-0 font-mono text-[11px] text-muted-foreground sm:block">
        {projectCategories[project.category].split(" ")[0].toLowerCase()}
        {project.year && ` · ${project.year}`}
      </span>
    </Link>
  );
}
