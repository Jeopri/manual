"use client";
import React from "react";
import { motion } from "motion/react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type FloatingIcon = {
  src: string;
  alt: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: number;
  rotate?: number;
  opacity?: number;
};

/* ─── Floating icons renderer ────────────────────────────────────────────── */
function FloatingIcons({ icons }: { icons: FloatingIcon[] }) {
  return (
    <>
      {icons.map((icon, i) => (
        <motion.img
          key={i}
          src={icon.src}
          alt={icon.alt}
          width={icon.size}
          height={icon.size}
          className="absolute pointer-events-none select-none"
          style={{
            top: icon.top,
            left: icon.left,
            right: icon.right,
            bottom: icon.bottom,
            opacity: icon.opacity ?? 0.20,
            rotate: `${icon.rotate ?? 0}deg`,
            filter: "drop-shadow(0 0 10px rgba(255,255,255,0.08))",
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 3 + i * 0.55,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </>
  );
}

/* ─── Icon URLs ──────────────────────────────────────────────────────────── */
const DI  = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const DI2 = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const ICONS = {
  nextjs:      `${DI}/nextjs/nextjs-original.svg`,
  react:       `${DI}/react/react-original.svg`,
  typescript:  `${DI}/typescript/typescript-original.svg`,
  tailwind:    `${DI2}/tailwindcss/tailwindcss-original.svg`,
  javascript:  `${DI}/javascript/javascript-original.svg`,
  html:        `${DI}/html5/html5-original.svg`,
  css:         `${DI}/css3/css3-original.svg`,
  redux:       `${DI}/redux/redux-original.svg`,
  vite:        `${DI2}/vitejs/vitejs-original.svg`,
  laravel:     `${DI2}/laravel/laravel-original.svg`,
  nodejs:      `${DI}/nodejs/nodejs-original.svg`,
  mongodb:     `${DI}/mongodb/mongodb-original.svg`,
  postgresql:  `${DI}/postgresql/postgresql-original.svg`,
  mysql:       `${DI}/mysql/mysql-original.svg`,
  docker:      `${DI}/docker/docker-original.svg`,
  php:         `${DI}/php/php-original.svg`,
  git:         `${DI}/git/git-original.svg`,
  python:      `${DI}/python/python-original.svg`,
  googlecloud: `${DI}/googlecloud/googlecloud-original.svg`,
  aws:         `${DI2}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  figma:       `${DI}/figma/figma-original.svg`,
  angular:     `${DI2}/angularjs/angularjs-original.svg`,
  // Special
  openclaw:    "/images/claw.png",
  n8n:         "https://n8n.io/favicon.ico",
  claude:      "https://anthropic.com/favicon.ico",
};

/*
  Icon placement strategy — keep center ~40% of card clear for text.
  Corners: top-left, top-right, bottom-left, bottom-right
  Edges: top-center, bottom-center, left-mid, right-mid
  All icons stay within 0–22% from any edge so they don't reach the center.
*/

const frontendIcons: FloatingIcon[] = [
  // corners
  { src: ICONS.nextjs,     alt: "Next.js",    size: 52, top: "4%",    left: "4%",    opacity: 0.28, rotate: -12 },
  { src: ICONS.react,      alt: "React",      size: 48, top: "4%",    right: "4%",   opacity: 0.26, rotate: 14  },
  { src: ICONS.typescript, alt: "TypeScript", size: 44, bottom: "4%", left: "4%",    opacity: 0.24, rotate: 8   },
  { src: ICONS.tailwind,   alt: "Tailwind",   size: 46, bottom: "4%", right: "4%",   opacity: 0.24, rotate: -8  },
  // top edge
  { src: ICONS.javascript, alt: "JS",         size: 36, top: "4%",    left: "38%",   opacity: 0.20, rotate: 10  },
  // bottom edge
  { src: ICONS.html,       alt: "HTML5",      size: 38, bottom: "4%", left: "38%",   opacity: 0.20, rotate: -6  },
  // left mid
  { src: ICONS.css,        alt: "CSS3",       size: 36, top: "42%",   left: "3%",    opacity: 0.18, rotate: 18  },
  // right mid
  { src: ICONS.vite,       alt: "Vite",       size: 34, top: "42%",   right: "3%",   opacity: 0.18, rotate: -14 },
  // inner corners (slightly inside)
  { src: ICONS.redux,      alt: "Redux",      size: 32, top: "22%",   left: "14%",   opacity: 0.15, rotate: 5   },
  { src: ICONS.nextjs,     alt: "Next.js",    size: 30, bottom: "22%",right: "14%",  opacity: 0.13, rotate: -5  },
];

const backendIcons: FloatingIcon[] = [
  { src: ICONS.laravel,    alt: "Laravel",    size: 52, top: "4%",    left: "4%",    opacity: 0.28, rotate: -10 },
  { src: ICONS.nodejs,     alt: "Node.js",    size: 48, top: "4%",    right: "4%",   opacity: 0.26, rotate: 12  },
  { src: ICONS.mongodb,    alt: "MongoDB",    size: 44, bottom: "4%", left: "4%",    opacity: 0.24, rotate: -8  },
  { src: ICONS.postgresql, alt: "PostgreSQL", size: 46, bottom: "4%", right: "4%",   opacity: 0.24, rotate: 8   },
  { src: ICONS.docker,     alt: "Docker",     size: 36, top: "4%",    left: "38%",   opacity: 0.20, rotate: 6   },
  { src: ICONS.mysql,      alt: "MySQL",      size: 38, bottom: "4%", left: "38%",   opacity: 0.20, rotate: -10 },
  { src: ICONS.php,        alt: "PHP",        size: 36, top: "42%",   left: "3%",    opacity: 0.18, rotate: -16 },
  { src: ICONS.git,        alt: "Git",        size: 34, top: "42%",   right: "3%",   opacity: 0.18, rotate: 14  },
  { src: ICONS.nodejs,     alt: "Node.js",    size: 30, top: "22%",   left: "14%",   opacity: 0.14, rotate: 5   },
  { src: ICONS.laravel,    alt: "Laravel",    size: 28, bottom: "22%",right: "14%",  opacity: 0.12, rotate: -5  },
];

const aiIcons: FloatingIcon[] = [
  { src: ICONS.python,      alt: "Python",      size: 52, top: "4%",    left: "4%",    opacity: 0.28, rotate: -8  },
  { src: ICONS.googlecloud, alt: "GCP",         size: 48, top: "4%",    right: "4%",   opacity: 0.26, rotate: 14  },
  { src: ICONS.openclaw,    alt: "OpenClaw",    size: 46, bottom: "4%", left: "4%",    opacity: 0.35, rotate: -6  },
  { src: ICONS.aws,         alt: "AWS",         size: 52, bottom: "4%", right: "4%",   opacity: 0.22, rotate: 8   },
  { src: ICONS.n8n,         alt: "N8N",         size: 38, top: "4%",    left: "38%",   opacity: 0.28, rotate: 10  },
  { src: ICONS.claude,      alt: "Claude Code", size: 36, bottom: "4%", left: "38%",   opacity: 0.28, rotate: -10 },
  { src: ICONS.docker,      alt: "Docker",      size: 34, top: "42%",   left: "3%",    opacity: 0.18, rotate: 16  },
  { src: ICONS.python,      alt: "Python",      size: 32, top: "42%",   right: "3%",   opacity: 0.16, rotate: -12 },
  { src: ICONS.nodejs,      alt: "Node.js",     size: 30, top: "22%",   left: "14%",   opacity: 0.14, rotate: 5   },
  { src: ICONS.googlecloud, alt: "GCP",         size: 28, bottom: "22%",right: "14%",  opacity: 0.12, rotate: -5  },
];

const designIcons: FloatingIcon[] = [
  { src: ICONS.figma,      alt: "Figma",       size: 52, top: "4%",    left: "4%",    opacity: 0.28, rotate: -10 },
  { src: ICONS.tailwind,   alt: "Tailwind",    size: 48, top: "4%",    right: "4%",   opacity: 0.26, rotate: 14  },
  { src: ICONS.html,       alt: "HTML5",       size: 44, bottom: "4%", left: "4%",    opacity: 0.24, rotate: 8   },
  { src: ICONS.css,        alt: "CSS3",        size: 46, bottom: "4%", right: "4%",   opacity: 0.24, rotate: -8  },
  { src: ICONS.react,      alt: "React",       size: 36, top: "4%",    left: "38%",   opacity: 0.20, rotate: 6   },
  { src: ICONS.javascript, alt: "JavaScript",  size: 38, bottom: "4%", left: "38%",   opacity: 0.20, rotate: -10 },
  { src: ICONS.nextjs,     alt: "Next.js",     size: 36, top: "42%",   left: "3%",    opacity: 0.18, rotate: -14 },
  { src: ICONS.angular,    alt: "Angular",     size: 34, top: "42%",   right: "3%",   opacity: 0.18, rotate: 12  },
  { src: ICONS.figma,      alt: "Figma",       size: 30, top: "22%",   left: "14%",   opacity: 0.14, rotate: 5   },
  { src: ICONS.typescript, alt: "TypeScript",  size: 28, bottom: "22%",right: "14%",  opacity: 0.12, rotate: -5  },
];

/* ─── Shared card ─────────────────────────────────────────────────────────── */
function TechCard({
  title,
  description,
  icons,
  accent,
}: {
  title: string;
  description: string;
  icons: FloatingIcon[];
  accent: string;
}) {
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl ${accent}`}>
      {/* Icons pinned to edges — overflow-hidden clips them */}
      <FloatingIcons icons={icons} />

      {/* Dark scrim so text always reads clearly */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Center text — safe zone, no icons reach here */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-16">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-white/70 text-xs leading-relaxed max-w-[180px]">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ─── Content ─────────────────────────────────────────────────────────────── */
const content = [
  {
    title: "Frontend Development",
    description:
      "Building modern, type-safe web interfaces with Next.js, React, and TypeScript. From pixel-perfect UI components to seamless API integrations, I craft fast and accessible frontends that connect cleanly with any backend.",
    content: (
      <TechCard
        title="Frontend Development"
        description="Next.js · React · TypeScript · Tailwind · Vite · Redux"
        icons={frontendIcons}
        accent="bg-gradient-to-br from-[#0f2027] via-[#1a3a4a] to-[#0d1f2d]"
      />
    ),
  },
  {
    title: "Backend Development",
    description:
      "Designing and building robust server-side systems with Laravel, Node.js, and MongoDB. I handle everything from database schema design and API architecture to authentication flows, ETL pipelines, and multi-branch data infrastructure.",
    content: (
      <TechCard
        title="Backend Development"
        description="Laravel · Node.js · MongoDB · PostgreSQL · MySQL · Docker · PHP"
        icons={backendIcons}
        accent="bg-gradient-to-br from-[#1a0a2e] via-[#2d1b4e] to-[#0f0a1e]"
      />
    ),
  },
  {
    title: "AI & Automations",
    description:
      "Automating repetitive workflows with RPA, N8N, and Claude Code. Building AI assistants integrated with Anthropic and Gemini models, and setting up ETL pipelines that help businesses eliminate manual operations entirely.",
    content: (
      <TechCard
        title="AI & Automations"
        description="N8N · Claude Code · OpenClaw · Python · GCP · AWS · RPA"
        icons={aiIcons}
        accent="bg-gradient-to-br from-[#0a1f0a] via-[#1a3a1a] to-[#0d2010]"
      />
    ),
  },
  {
    title: "Web Design",
    description:
      "Translating ideas into clean, intuitive interfaces using Figma, Tailwind CSS, and component-driven design systems. I apply UX best practices to reduce friction and deliver experiences that feel natural to real users.",
    content: (
      <TechCard
        title="Web Design"
        description="Figma · Tailwind CSS · HTML5 · CSS3 · React · Aceternity UI"
        icons={designIcons}
        accent="bg-gradient-to-br from-[#1f0a0a] via-[#3a1a1a] to-[#200d0d]"
      />
    ),
  },
];

/* ─── Export ──────────────────────────────────────────────────────────────── */
export default function Tools() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}