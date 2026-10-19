import Image from "next/image";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

function initials(title: string) {
  return title
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/**
 * The project's screenshot; else its brand logo on a dark tile; else a monochrome
 * dot-grid tile with the project's initials. Fills its parent, which must be
 * positioned and sized.
 */
export default function ProjectThumb({
  project,
  sizes,
  priority,
  className,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (project.thumbnail) {
    return (
      <Image
        src={project.thumbnail}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover object-top", className)}
      />
    );
  }

  if (project.logo) {
    // Brand logos are usually light-on-transparent, so they always sit on a dark tile — even in light mode.
    return (
      <div className="absolute inset-0 bg-neutral-950">
        <Image
          src={project.logo}
          alt=""
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-contain p-[14%]", className)}
        />
      </div>
    );
  }

  // An SVG keeps the initials proportional at every size, from a 64px row icon to the detail hero.
  return (
    <svg aria-hidden="true" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full bg-card text-foreground">
      <defs>
        <pattern id={`dots-${project.slug}`} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.7" fill="currentColor" opacity="0.25" />
        </pattern>
      </defs>
      <rect width="160" height="100" fill={`url(#dots-${project.slug})`} />
      <text
        x="80"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        style={{ fontFamily: "var(--font-geist-pixel)", fontSize: 30 }}
      >
        {initials(project.title)}
      </text>
    </svg>
  );
}
