import type { Metadata } from "next";
import PageHeader from "@/components/section-header";
import ProjectsGrid from "@/components/projects-grid";
import { getProjects, getUsedCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Web apps, AI & RPA automations, and interface designs by Jeffrey Sedoro.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title="Projects" description="Products, systems, and designs I've built — open any project for the details." />
      <ProjectsGrid projects={getProjects()} categories={getUsedCategories()} />
    </>
  );
}
