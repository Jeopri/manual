"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const DI  = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const DI2 = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

type ToolItem = {
  icon: string;
  name: string;
};

type ToolSection = {
  title: string;
  description: string;
  tools: ToolItem[];
};

const sections: ToolSection[] = [
  {
    title: "Frontend Development",
    description: "Building modern, type-safe web interfaces with component-driven architecture.",
    tools: [
      { icon: `${DI}/nextjs/nextjs-original.svg`, name: "Next.js" },
      { icon: `${DI}/react/react-original.svg`, name: "React" },
      { icon: `${DI}/typescript/typescript-original.svg`, name: "TypeScript" },
      { icon: `${DI2}/tailwindcss/tailwindcss-original.svg`, name: "Tailwind CSS" },
      { icon: `${DI}/javascript/javascript-original.svg`, name: "JavaScript" },
      { icon: `${DI}/html5/html5-original.svg`, name: "HTML5" },
      { icon: `${DI}/css3/css3-original.svg`, name: "CSS3" },
      { icon: `${DI}/redux/redux-original.svg`, name: "Redux" },
      { icon: `${DI2}/vitejs/vitejs-original.svg`, name: "Vite" },
      { icon: `${DI2}/angularjs/angularjs-original.svg`, name: "Angular" },
    ],
  },
  {
    title: "Backend Development",
    description: "Designing robust server-side systems, APIs, and backend logic.",
    tools: [
      { icon: `${DI2}/laravel/laravel-original.svg`, name: "Laravel" },
      { icon: `${DI}/nodejs/nodejs-original.svg`, name: "Node.js" },
      { icon: `${DI}/php/php-original.svg`, name: "PHP" },
      { icon: `${DI2}/nestjs/nestjs-original.svg`, name: "NestJS" },
      { icon: `${DI}/django/django-plain.svg`, name: "Django" },
      { icon: `${DI}/dot-net/dot-net-original.svg`, name: "ASP.NET" },
      { icon: `${DI}/git/git-original.svg`, name: "Git" },
    ],
  },
  {
    title: "Databases",
    description: "Managing and optimizing structured and document-based data storage.",
    tools: [
      { icon: `${DI}/mongodb/mongodb-original.svg`, name: "MongoDB" },
      { icon: `${DI}/postgresql/postgresql-original.svg`, name: "PostgreSQL" },
      { icon: `${DI}/mysql/mysql-original.svg`, name: "MySQL" },
    ],
  },
  {
    title: "Automations",
    description: "Automating workflows with RPA, AI assistants, and integration platforms.",
    tools: [
      { icon: `${DI}/python/python-original.svg`, name: "Python" },
      { icon: "https://n8n.io/favicon.ico", name: "N8N" },
      { icon: "https://anthropic.com/favicon.ico", name: "Claude" },
      { icon: "https://anthropic.com/favicon.ico", name: "Claude Code" },
      { icon: "/images/claw.png", name: "OpenClaw" },
      { icon: "https://www.uipath.com/favicon.ico", name: "UiPath" },
    ],
  },
  {
    title: "Cloud & Containerization",
    description: "Deploying, scaling, and containerizing applications in the cloud.",
    tools: [
      { icon: `${DI}/googlecloud/googlecloud-original.svg`, name: "Google Cloud" },
      { icon: `${DI2}/amazonwebservices/amazonwebservices-original-wordmark.svg`, name: "AWS" },
      { icon: `${DI}/docker/docker-original.svg`, name: "Docker" },
    ],
  },
];

const sectionColors = [
  "from-blue-950/20 via-blue-900/10 to-transparent",
  "from-blue-950/20 via-blue-900/10 to-transparent",
  "from-blue-950/20 via-blue-900/10 to-transparent",
  "from-blue-950/20 via-blue-900/10 to-transparent",
  "from-blue-950/20 via-blue-900/10 to-transparent",
];

function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-all duration-200 hover:border-primary/30 hover:bg-primary/[0.03]">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-muted/30">
        <img
          src={tool.icon}
          alt={tool.name}
          className="h-5 w-5 object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
      <span className="text-sm text-muted-foreground">{tool.name}</span>
    </div>
  );
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function Tools() {
  const [[index, direction], setIndex] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const next = index + newDirection;
    if (next >= 0 && next < sections.length) {
      setIndex([next, newDirection]);
    }
  };

  const goTo = (i: number) => {
    setIndex([i, i > index ? 1 : -1]);
  };

  const section = sections[index];

  return (
    <section id="tools" className="w-full px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <p className="mb-3 text-xs font-mono tracking-widest text-muted-foreground">
            // tools-and-skills
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Tech Stack
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground leading-relaxed">
            Technologies and tools I work with across the full stack.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <div className={`absolute inset-0 bg-gradient-to-br ${sectionColors[index]}`} />

          <div className="relative z-10">
            <div className="relative h-[460px] overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 px-6 py-10 md:px-12 md:py-16"
                >
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                      {section.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {section.tools.map((tool) => (
                      <ToolCard key={tool.name} tool={tool} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-2">
            {sections.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => paginate(-1)}
              disabled={index === 0}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/[0.04] hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => paginate(1)}
              disabled={index === sections.length - 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/[0.04] hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
