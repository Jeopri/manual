"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Project = {
  title: string;
  description: string;
  thumbnail: string;
  link: string;
};

type Section = {
  label: string;
  projects: Project[];
};

const sections: Section[] = [
  {
    label: "Web Development",
    projects: [
      {
        title: "Malaybalay City Veterinary",
        description: "Content management system for a local veterinary office, streamlining patient records, appointments, and clinic operations.",
        thumbnail: "/images/landing.jpg",
        link: "",
      },
      {
        title: "BookNest",
        description: "Digital library platform for managing book collections, reading lists, and community borrowing.",
        thumbnail: "/images/book.png",
        link: "",
      },
      {
        title: "BuksuLabsecure",
        description: "Laboratory security and asset management system for Bukidnon State University.",
        thumbnail: "/images/bading.png",
        link: "",
      },
      {
        title: "Moneycache-POS",
        description: "Point-of-sale system with inventory tracking and sales analytics for multi-branch retail operations.",
        thumbnail: "/images/wow.png",
        link: "",
      },
    ],
  },
  {
    label: "AI & RPA Automation",
    projects: [
      {
        title: "AI Chatbot Flow",
        description: "Conversational AI chatbot with visual flow builder for automated customer support and inquiry handling.",
        thumbnail: "/images/chat.png",
        link: "",
      },
      {
        title: "Utilizing RPA tools for Automation",
        description: "Automated repetitive business workflows using Robotic Process Automation tools to eliminate manual operations.",
        thumbnail: "/images/tre.png",
        link: "",
      },
      {
        title: "N8n - Email Digest Workflow",
        description: "Automated email digest generation and distribution workflow built on n8n for team productivity.",
        thumbnail: "/images/ha.png",
        link: "",
      },
      {
        title: "SmartBridge",
        description: "Integration platform connecting disparate business systems and data sources for unified operations.",
        thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/smartbridge.png",
        link: "",
      },
    ],
  },
  {
    label: "Web Design",
    projects: [
      {
        title: "Creme Digital",
        description: "Modern digital brand interface design with clean aesthetics and user-centered layout.",
        thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/cremedigital.png",
        link: "",
      },
      {
        title: "LogicBase Interactive Mock up Design",
        description: "Interactive Figma prototype for LogicBase's application interface with intuitive navigation and modern UI patterns.",
        thumbnail: "/images/image.png",
        link: "https://www.figma.com/design/hwDdkJrkap5JTsYseEYcOO/Sedoro_LBI?node-id=0-1&p=f&t=lY8vQk0bPdgoMvV5-0",
      },
      {
        title: "Moneycache Mock Design",
        description: "UI/UX mockup design for Moneycache payment platform with streamlined checkout flows.",
        thumbnail: "/images/webdesign1.png",
        link: "https://www.figma.com/design/x75LZo7SwMBG9VjRAx8DDW/MC-Mock-up-D?node-id=0-1&p=f&t=39U83oSjlYIluiuv-0",
      },
    ],
  },
];

/* ─── Modal ───────────────────────────────────────────────────────────────── */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            key="modal"
            className="relative z-10 w-full max-w-4xl rounded-2xl overflow-hidden bg-card shadow-2xl border border-border"
            initial={{ scale: 0.93, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full max-h-[70vh] object-cover object-top"
            />

            <div className="flex items-center justify-between px-6 py-4 bg-card/95">
              <h2 className="text-foreground font-semibold text-base md:text-lg">
                {project.title}
              </h2>
              <div className="flex items-center gap-2">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  >
                    Visit site ↗
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="text-sm px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Close ✕
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Project Card ─────────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.02] hover:shadow-[0_8px_30px_rgba(59,130,246,0.06)] active:scale-[0.98] cursor-pointer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex flex-col gap-1.5 p-5">
        <h3 className="text-sm font-semibold text-card-foreground/90 group-hover:text-card-foreground transition-colors">
          {project.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Section ──────────────────────────────────────────────────────────────── */
function ProjectSection({
  section,
  onSelect,
}: {
  section: Section;
  onSelect: (project: Project) => void;
}) {
  return (
    <section className="mb-20">
      <div className="mb-8">
        <p className="mb-2 text-xs font-mono tracking-widest text-muted-foreground">
          // {section.label.toLowerCase().replace(/\s+/g, "-")}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {section.label}
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {section.projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            onClick={() => onSelect(project)}
          />
        ))}
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */
export default function MainSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="main-section" className="w-full px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <p className="mb-3 text-xs font-mono tracking-widest text-muted-foreground">
            // selected-work
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Projects, Web Design &amp; Automations
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground leading-relaxed">
            A selection of projects spanning web development, AI automation, and interface design.
          </p>
        </div>

        {sections.map((section) => (
          <ProjectSection
            key={section.label}
            section={section}
            onSelect={(project) => setSelected(project)}
          />
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}