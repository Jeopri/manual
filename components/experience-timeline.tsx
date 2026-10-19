import Image from "next/image";
import Link from "next/link";
import { experienceGroups } from "@/content/experience";
import { getProject } from "@/lib/content";
import type { Experience, ExperienceType } from "@/content/types";

/** Full history with every highlight, grouped by type. */
export default function ExperienceTimeline({ items }: { items: Experience[] }) {
  const groups = (Object.keys(experienceGroups) as ExperienceType[])
    .map((type) => ({ type, label: experienceGroups[type], items: items.filter((e) => e.type === type) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="space-y-16">
      {groups.map((group) => (
        <section key={group.type} aria-labelledby={`group-${group.type}`}>
          <h2
            id={`group-${group.type}`}
            className="mb-8 border-b border-border pb-3 font-mono text-xs lowercase text-muted-foreground"
          >
            {group.label}
          </h2>

          <ol className="space-y-12">
            {group.items.map((exp) => (
              <li key={`${exp.company}-${exp.role}`}>
                <div className="flex items-start gap-4">
                  {exp.logo && (
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border">
                      <Image src={exp.logo} alt="" fill sizes="40px" className="object-cover grayscale" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-medium text-foreground">{exp.role}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {exp.date}
                      {exp.location && ` · ${exp.location}`}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-3">
                  {exp.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span aria-hidden="true" className="select-none text-foreground/40">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {(exp.stack?.length || exp.projectSlugs?.length) && (
                  <div className="mt-5 flex flex-wrap items-center gap-1.5">
                    {exp.stack?.map((tech) => (
                      <span key={tech} className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                    {exp.projectSlugs?.map((slug) => {
                      const project = getProject(slug);
                      if (!project) return null;
                      return (
                        <Link key={slug} href={`/projects/${slug}`} className="ml-2 font-mono text-[11px] text-foreground underline-offset-4 hover:underline">
                          {(exp.projectSlugs?.length ?? 0) > 1 ? project.title : "view project"} →
                        </Link>
                      );
                    })}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
