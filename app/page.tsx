import Intro from "@/components/home/intro";
import StatStrip from "@/components/stat-strip";
import { SectionLabel } from "@/components/section-header";
import ProjectRow from "@/components/project-row";
import ExperienceList from "@/components/experience-list";
import TechStack from "@/components/tech-stack";
import CertCard from "@/components/cert-card";
import QuoteCard from "@/components/quote-card";
import GithubHeatmap from "@/components/github-heatmap";
import VideoCard from "@/components/video-card";
import { site } from "@/content/site";
import { toolGroups } from "@/content/tools";
import { getContributions } from "@/lib/github";
import {
  getCertifications,
  getExperience,
  getFeaturedProjects,
  getProjects,
  getRecommendations,
  getStats,
  getVideos,
} from "@/lib/content";

// The GitHub heatmap is fetched at build time and refreshed daily.
export const revalidate = 86400;

export default async function Home() {
  const featured = getFeaturedProjects(5);
  const projectCount = getProjects().length;
  const experience = getExperience();
  const certifications = getCertifications();
  const recommendations = getRecommendations();
  const videos = getVideos();
  const contributions = await getContributions(site.githubUser);

  // Sections only render when they have content, and are numbered in the order they appear.
  const sections = [
    { id: "projects", show: featured.length > 0 },
    { id: "experience", show: experience.length > 0 },
    { id: "stack", show: toolGroups.length > 0 },
    { id: "video", show: videos.length > 0 },
    { id: "certifications", show: certifications.length > 0 },
    { id: "recommendations", show: recommendations.length > 0 },
    { id: "github", show: contributions !== null },
  ].filter((s) => s.show);

  const indexOf = (id: string) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");
  const has = (id: string) => sections.some((s) => s.id === id);

  return (
    <div className="space-y-16">
      <Intro />
      <StatStrip stats={getStats()} />

      {has("projects") && (
        <section id="projects">
          <SectionLabel index={indexOf("projects")} label="projects" more={{ href: "/projects", label: `all ${projectCount}` }} />
          <ul>
            {featured.map((project) => (
              <li key={project.slug}>
                <ProjectRow project={project} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {has("experience") && (
        <section id="experience">
          <SectionLabel index={indexOf("experience")} label="experience" more={{ href: "/experience", label: "full history" }} />
          <ExperienceList items={experience} />
        </section>
      )}

      {has("stack") && (
        <section id="stack">
          <SectionLabel index={indexOf("stack")} label="stack" more={{ href: "/stack", label: "view all" }} />
          <TechStack groups={toolGroups} />
        </section>
      )}

      {has("video") && (
        <section id="video">
          <SectionLabel index={indexOf("video")} label="video editing" />
          <ul className="space-y-10">
            {videos.map((video) => (
              <li key={video.title}>
                <VideoCard video={video} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {has("certifications") && (
        <section id="certifications">
          <SectionLabel
            index={indexOf("certifications")}
            label="certifications"
            more={{ href: "/certifications", label: "all certifications" }}
          />
          <ul className="space-y-2">
            {certifications.slice(0, 3).map((cert) => (
              <li key={cert.verifyUrl}>
                <CertCard cert={cert} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {has("recommendations") && (
        <section id="recommendations">
          <SectionLabel
            index={indexOf("recommendations")}
            label="recommendations"
            more={{ href: "/recommendations", label: "all recommendations" }}
          />
          <ul className="space-y-3">
            {recommendations.slice(0, 3).map((rec) => (
              <li key={rec.name}>
                <QuoteCard rec={rec} clamp />
              </li>
            ))}
          </ul>
        </section>
      )}

      {has("github") && contributions && (
        <section id="github">
          <SectionLabel index={indexOf("github")} label="github" />
          <GithubHeatmap calendar={contributions} user={site.githubUser} />
        </section>
      )}
    </div>
  );
}
