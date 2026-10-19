import type { Metadata } from "next";
import PageHeader from "@/components/section-header";
import ExperienceTimeline from "@/components/experience-timeline";
import { getExperience } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
  description: "Work history and projects — data, web development, and AI/RPA automation.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader title="Experience" description="Where I've worked, what I built, and what it changed." />
      <ExperienceTimeline items={getExperience()} />
    </>
  );
}
