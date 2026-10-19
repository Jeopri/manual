import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectThumb from "@/components/project-thumb";
import { projectCategories } from "@/content/projects";
import { site } from "@/content/site";
import { getAdjacentProjects, getProject, getProjects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

// Every project page is built ahead of time; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      ...(project.thumbnail && { images: [project.thumbnail] }),
    },
  };
}

const linkLabels = {
  live: "Visit site",
  repo: "Source code",
  figma: "View in Figma",
  video: "Watch demo",
} as const;

function List({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section>
      <h2 className="mb-4 border-b border-border pb-3 font-mono text-xs lowercase text-muted-foreground">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
            <span aria-hidden="true" className="select-none text-foreground/40">
              —
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const links = Object.entries(project.links ?? {}).filter(([, url]) => Boolean(url)) as [
    keyof typeof linkLabels,
    string,
  ][];
  const meta = [
    { label: "role", value: project.role },
    { label: "client", value: project.client },
    { label: "year", value: project.year },
    { label: "category", value: projectCategories[project.category] },
    { label: "stack", value: project.stack?.join(", ") },
  ].filter((m): m is { label: string; value: string } => Boolean(m.value));

  return (
    <article>
      <Link
        href="/projects"
        className="font-mono text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        ← all projects
      </Link>

      <header className="mt-8">
        <h1 className="font-pixel text-3xl text-foreground md:text-4xl">{project.title}</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{project.summary}</p>

        {project.isPrivate && (
          <p className="mt-5 font-mono text-xs text-muted-foreground">
            private codebase —{" "}
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(`Walkthrough: ${project.title}`)}`}
              className="text-foreground underline underline-offset-4 hover:opacity-70"
            >
              walkthrough available on request
            </a>
          </p>
        )}

        {links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {links.map(([kind, url]) => (
              <a
                key={kind}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs lowercase text-foreground underline underline-offset-4 hover:opacity-70"
              >
                {linkLabels[kind]} ↗
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-lg border border-border bg-card">
        <ProjectThumb project={project} priority sizes="(min-width: 768px) 672px, 100vw" />
      </div>

      {meta.length > 0 && (
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {meta.map((m) => (
            <div key={m.label} className="grid grid-cols-[6rem_1fr] gap-4 py-2.5">
              <dt className="font-mono text-xs text-muted-foreground">{m.label}</dt>
              <dd className="text-sm text-foreground">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-12 space-y-12">
        {project.overview && <p className="text-sm leading-relaxed text-muted-foreground">{project.overview}</p>}
        <List title="outcomes" items={project.outcomes} />
        <List title="what I did" items={project.contributions} />
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <ul className="mt-12 space-y-4">
          {project.gallery.map((src) => (
            <li key={src} className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-card">
              <Image src={src} alt="" fill sizes="(min-width: 768px) 672px, 100vw" className="object-cover object-top" />
            </li>
          ))}
        </ul>
      )}

      {prev && next && (
        <nav aria-label="More projects" className="mt-16 grid grid-cols-2 gap-4 border-t border-border pt-6">
          <Link href={`/projects/${prev.slug}`} className="group">
            <p className="font-mono text-[11px] text-muted-foreground">← previous</p>
            <p className="mt-1 text-sm text-foreground underline-offset-4 group-hover:underline">{prev.title}</p>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group text-right">
            <p className="font-mono text-[11px] text-muted-foreground">next →</p>
            <p className="mt-1 text-sm text-foreground underline-offset-4 group-hover:underline">{next.title}</p>
          </Link>
        </nav>
      )}
    </article>
  );
}
