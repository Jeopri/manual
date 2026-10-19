import type { ToolGroup } from "./types";

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";

export const toolGroups: ToolGroup[] = [
  {
    title: "Frontend Development",
    description: "Building modern, type-safe web interfaces with component-driven architecture.",
    tools: [
      { icon: `${DI}/nextjs/nextjs-original.svg`, name: "Next.js" },
      { icon: `${DI}/react/react-original.svg`, name: "React" },
      { icon: `${DI}/typescript/typescript-original.svg`, name: "TypeScript" },
      { icon: `${DI}/tailwindcss/tailwindcss-original.svg`, name: "Tailwind CSS" },
      { icon: `${DI}/javascript/javascript-original.svg`, name: "JavaScript" },
      { icon: `${DI}/html5/html5-original.svg`, name: "HTML5" },
      { icon: `${DI}/css3/css3-original.svg`, name: "CSS3" },
      { icon: `${DI}/redux/redux-original.svg`, name: "Redux" },
      { icon: `${DI}/vitejs/vitejs-original.svg`, name: "Vite" },
      { icon: `${DI}/angularjs/angularjs-original.svg`, name: "Angular" },
    ],
  },
  {
    title: "Backend Development",
    description: "Designing robust server-side systems, APIs, and backend logic.",
    tools: [
      { icon: `${DI}/laravel/laravel-original.svg`, name: "Laravel" },
      { icon: `${DI}/nodejs/nodejs-original.svg`, name: "Node.js" },
      { icon: `${DI}/php/php-original.svg`, name: "PHP" },
      { icon: `${DI}/nestjs/nestjs-original.svg`, name: "NestJS" },
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
      { icon: "https://n8n.io/favicon.ico", name: "n8n" },
      { icon: "https://anthropic.com/favicon.ico", name: "Claude" },
      { icon: "https://anthropic.com/favicon.ico", name: "Claude Code" },
      { icon: "/images/claw.png", name: "OpenClaw" },
      { icon: "https://www.uipath.com/favicon.ico", name: "UiPath" },
    ],
  },
  {
    title: "Video Editing",
    description: "Editing, color, and motion for promos, reels, and walkthroughs.",
    tools: [
      { icon: "https://sf16-web-tos-buz.capcutstatic.com/obj/capcut-web-buz-sg/common/images/lv_web-2.ico", name: "CapCut" },
      { icon: "https://www.blackmagicdesign.com/favicon.ico", name: "DaVinci Resolve" },
      { icon: `${DI}/premierepro/premierepro-original.svg`, name: "Adobe Premiere Pro" },
    ],
  },
  {
    title: "Cloud & Containerization",
    description: "Deploying, scaling, and containerizing applications in the cloud.",
    tools: [
      { icon: `${DI}/googlecloud/googlecloud-original.svg`, name: "Google Cloud" },
      { icon: `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg`, name: "AWS" },
      { icon: `${DI}/docker/docker-original.svg`, name: "Docker" },
    ],
  },
];
