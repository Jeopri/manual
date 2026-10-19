import { projects, projectCategories } from "@/content/projects";
import { experience } from "@/content/experience";
import { certifications } from "@/content/certifications";
import { recommendations } from "@/content/recommendations";
import { stats } from "@/content/stats";
import { videos } from "@/content/videos";
import type { Stat } from "@/content/types";

export function getProjects() {
  return projects;
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit = 6) {
  const featured = projects.filter((p) => p.featured);
  return (featured.length ? featured : projects).slice(0, limit);
}

/** The projects on either side of `slug`, wrapping around. */
export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1 || projects.length < 2) return { prev: undefined, next: undefined };
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}

export function getUsedCategories() {
  const used = new Set(projects.map((p) => p.category));
  return (Object.keys(projectCategories) as (keyof typeof projectCategories)[])
    .filter((c) => used.has(c))
    .map((c) => ({ id: c, label: projectCategories[c] }));
}

export function getExperience() {
  return experience;
}

export function getCertifications() {
  return certifications;
}

export function getRecommendations() {
  return recommendations;
}

/** Example entries only show while developing, so placeholders never reach the live site. */
export function getVideos() {
  return process.env.NODE_ENV === "production" ? videos.filter((v) => !v.example) : videos;
}

export function getStats(): Stat[] {
  return [{ value: String(projects.length), label: "projects & designs", href: "/projects" }, ...stats];
}

type NavItem = { href: string; label: string };

/** Sidebar groups. Certifications/Recommendations only appear once they have content. */
export function getNavGroups(): NavItem[][] {
  const credentials = [
    certifications.length > 0 && { href: "/certifications", label: "Certifications" },
    recommendations.length > 0 && { href: "/recommendations", label: "Recommendations" },
  ].filter((item): item is NavItem => Boolean(item));

  return [
    [
      { href: "/projects", label: "Projects" },
      { href: "/experience", label: "Experience" },
      { href: "/stack", label: "Stack" },
    ],
    credentials,
    [{ href: "/contact", label: "Contact" }],
  ].filter((group) => group.length > 0);
}
