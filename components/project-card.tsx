import ProjectThumb from "@/components/project-thumb";
import Link from "next/link";
import { projectCategories } from "@/content/projects";
import type { Project } from "@/content/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border transition-colors duration-300 hover:border-foreground/30"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <ProjectThumb
          project={project}
          sizes="(min-width: 640px) 336px, 100vw"
          className="grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {projectCategories[project.category]}
          {project.year && ` · ${project.year}`}
          {project.isPrivate && " · private"}
        </p>
        <h3 className="text-sm font-semibold text-card-foreground">
          {project.title}
          <span className="ml-1 inline-block opacity-0 transition-opacity group-hover:opacity-100">→</span>
        </h3>
        <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">{project.summary}</p>
        {project.stack && project.stack.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.stack.slice(0, 4).map((tech) => (
              <li key={tech} className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}
