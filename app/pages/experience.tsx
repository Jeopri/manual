"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

type Experience = {
  role: string;
  company: string;
  date: string;
  description: string[];
  group: "work" | "freelance" | "project";
};

const items: Experience[] = [
  // ── Work Experience ──
  {
    role: "Data Analyst / Web Developer",
    company: "Ubest Development Inc.",
    date: "October 2025 – May 2026",
    description: [
      "Built a centralized Data Department System across 64 store branches in Cebu, Negros, Leyte, Bohol, and Ilo-ilo, with a pipeline that extracted, transformed, and visualized CRM transaction data and daily sales in a centralized dashboard using React/Next.js, Node.js, PostgreSQL, and Firebase.",
      "Responded to and managed internal stakeholder requests and requirements to align data efforts with business needs.",
      "Applied ABC and XYZ analysis to classify slow-moving and fast-moving SKUs, enabling smarter inventory decisions.",
      "Analyzed current processes and systems to identify inefficiencies and areas for improvement.",
      "Prepared standard and specialized reports under the direction and guidance of team supervisors and managers.",
      "Provided analysis and insights to support team and department decision-making.",
      "Collaborated with members of the team and/or with other functions/departments to execute special studies and projects.",
      "Improved SKU sales accuracy to 80% through fully automated calculations, eliminating manual data entry in Excel.",
      "Implemented Robotic Process Automation (RPA) using Yingdao Shadowbot and UiPath for repetitive tasks including web scraping and Windows software interaction, achieving 90% faster task completion.",
      "Developed an AI assistant within Lark Base for automated data organization, cleaning, and dynamic table creation using Anthropic Model and Open Claw.",
    ],
    group: "work",
  },
  {
    role: "Frontend Developer (Intern)",
    company: "Logicbase Interactive",
    date: "January 2025 – May 2025",
    description: [
      "Developed Moneycache, a Point-of-Sale (POS) web application, serving as the primary frontend developer using Next.js and React.",
      "Built business logic on the backend using Laravel following the MVC architectural pattern, ensuring clean separation of concerns and maintainable code structure.",
      "Designed and implemented a MySQL database schema for storing transaction records, product data, and user information.",
      "Implemented secure user authentication using Laravel Passport, enabling token-based API authorization across the application.",
      "Designed responsive UI components and integrated RESTful APIs from the Laravel backend to communicate seamlessly with the React/Next.js frontend.",
    ],
    group: "work",
  },
  // ── Freelancing / Commission ──
  {
    role: "Freelance Web Developer",
    company: "Savage Fitness Gym",
    date: "Present",
    description: [
      "Designing and developing a responsive landing page for Savage Fitness Gym to showcase services, class schedules, and membership information.",
      "Building a clean, performance-optimized frontend to establish the gym's online presence and attract new clients.",
    ],
    group: "freelance",
  },
  // ── Projects ──
  {
    role: "Backend Developer",
    company: "BukSU LabSecure – Bukidnon State University",
    date: "August 2023 – March 2024",
    description: [
      "Developed a laboratory access management system using Laravel as a full-stack framework.",
      "Integrated an embedded RFID system for smart lab access control, unauthorized entry monitoring, attendance tracking, and scheduling for students and faculty.",
    ],
    group: "project",
  },
  {
    role: "Full Stack Developer",
    company: "MCity Veterinary – Malaybalay City Veterinary Office",
    date: "August 2023 – December 2023",
    description: [
      "Built a veterinary information system using React, Node.js, and MongoDB Atlas to streamline city veterinary operations.",
      "Conducted client consultations to gather and implement system requirements.",
      "Applied UX best practices to design an intuitive interface, reducing confusion during demonstrations and day-to-day use.",
    ],
    group: "project",
  },
];

const groupMeta: Record<string, { label: string; tag: string }> = {
  work: { label: "Work Experience", tag: "// work-experience" },
  freelance: { label: "Freelancing / Commission", tag: "// freelancing-commission" },
  project: { label: "Projects", tag: "// academic-and-personal-projects" },
};

const groupColors: Record<string, string> = {
  work: "from-blue-500/20 to-blue-600/10",
  freelance: "from-emerald-500/20 to-emerald-600/10",
  project: "from-amber-500/20 to-amber-600/10",
};

const initials: Record<string, string> = {
  "Ubest Development Inc.": "U",
  "Logicbase Interactive": "L",
  "Savage Fitness Gym": "S",
  "BukSU LabSecure – Bukidnon State University": "B",
  "MCity Veterinary – Malaybalay City Veterinary Office": "M",
};

type CompanyImage = {
  src: string;
  width: number;
  height: number;
};

const companyImages: Record<string, CompanyImage> = {
  "Ubest Development Inc.": {
    src: "/images/ubest.jpg",
    width: 24,
    height: 24,
  },
  "Logicbase Interactive": {
    src: "/images/logic.jpg",
    width: 24,
    height: 24,
  },
  "Savage Fitness Gym": {
    src: "/images/savage.jpg",
    width: 24,
    height: 24,
  },
  "BukSU LabSecure – Bukidnon State University": {
    src: "/images/buksu.jpg",
    width: 24,
    height: 24,
  },
  "MCity Veterinary – Malaybalay City Veterinary Office": {
    src: "/images/mcity.png",
    width: 24,
    height: 24,
  },
};

export default function Experience() {
  const [selected, setSelected] = useState<number>(0);
  const groups = ["work", "freelance", "project"] as const;

  return (
    <section id="experience" className="w-full px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="mb-3 text-xs font-mono tracking-widest text-muted-foreground">
            // experience-and-projects
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Experience &amp; Projects
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground leading-relaxed">
            Professional roles, freelance work, and projects I&apos;ve delivered.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
          {/* Left column: grouped selectable cards */}
          <div className="space-y-8">
            {groups.map((group) => {
              const groupItems = items.filter((e) => e.group === group);
              if (!groupItems.length) return null;
              return (
                <div key={group}>
                  <p className="mb-3 text-xs font-mono tracking-widest text-muted-foreground">
                    {groupMeta[group].tag}
                  </p>
                  <div className="space-y-2">
                    {groupItems.map((exp) => {
                      const idx = items.indexOf(exp);
                      return (
                        <motion.button
                          key={idx}
                          onClick={() => setSelected(idx)}
                          className={`w-full text-left rounded-xl border p-4 transition-all duration-200 flex items-center gap-3 ${
                            idx === selected
                              ? "border-primary/50 bg-primary/[0.04] shadow-[0_0_24px_rgba(190,255,0,0.06)]"
                              : "border-border bg-card hover:border-border/80 hover:bg-muted/20"
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.06 }}
                        >
                          {/* Image on the left side of the card */}
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold bg-gradient-to-br ${
                              groupColors[group]
                            } ${
                              idx === selected
                                ? "text-primary ring-1 ring-primary/30"
                                : "text-muted-foreground"
                            }`}
                          >
                            {companyImages[exp.company] ? (
                              <Image
                                src={companyImages[exp.company].src}
                                alt={exp.company}
                                width={companyImages[exp.company].width}
                                height={companyImages[exp.company].height}
                                className="object-contain"
                              />
                            ) : (
                              initials[exp.company] || exp.company[0]
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3
                              className={`text-sm font-semibold transition-colors truncate ${
                                idx === selected
                                  ? "text-foreground"
                                  : "text-foreground/80"
                              }`}
                            >
                              {exp.role}
                            </h3>
                            <p className="text-xs text-primary font-medium truncate">
                              {exp.company}
                            </p>
                            <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                              {exp.date}
                            </p>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right column: description of selected item */}
          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="rounded-xl border border-border bg-card p-6 md:p-8"
              >
                <h3 className="text-lg font-semibold text-foreground md:text-xl">
                  {items[selected].role}
                </h3>
                <p className="mt-1 text-sm text-primary font-medium">
                  {items[selected].company} &middot; {items[selected].date}
                </p>
                <ul className="mt-6 space-y-3">
                  {items[selected].description.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground leading-relaxed flex gap-3"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
