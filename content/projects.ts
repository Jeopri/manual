import type { Project, ProjectCategory } from "./types";

export const projectCategories: Record<ProjectCategory, string> = {
  web: "Web Development",
  automation: "AI & RPA Automation",
  design: "Web Design",
};

// Order here is the order on the site. Fields marked TODO are optional —
// the detail page simply skips anything left empty.
export const projects: Project[] = [
  {
    slug: "lumen-crm",
    title: "CRM Platform with AI Chatbot",
    category: "web",
    summary:
      "Company CRM I maintain and extend, with an AI chatbot backed by cloud LLMs and locally hosted models.",
    featured: true,
    isPrivate: true,
    logo: "/images/lumen-forge-wordmark.png",
    year: "2026",
    role: "Automation Specialist & Interactive Developer",
    client: "Lumen & Forge LLC",
    stack: ["React", "TypeScript", "Vite", "Supabase", "TanStack Query", "Tailwind CSS"],
    contributions: [
      "Maintain and extend the existing CRM, shipping new features based on business needs.",
      "Integrated an AI chatbot using ChatGPT, Claude, and Gemini.",
      "Deployed locally hosted LLMs (Nemotron and Qwen, 30B–80B parameters) and embedded them inside the CRM.",
      "Implemented high-level security across the CRM to protect against unauthorized access.",
      "Communicate directly with the CEO/Founder for output reviews, feedback, and scoping of new features.",
    ],
  },
  {
    slug: "lumen-lightboard",
    title: "Collaborative Lightboard",
    category: "web",
    summary:
      "A Miro/Figma-style collaborative whiteboard built into the company CRM.",
    featured: true,
    isPrivate: true,
    logo: "/images/lumen-forge-wordmark.png",
    year: "2026",
    role: "Automation Specialist & Interactive Developer",
    client: "Lumen & Forge LLC",
    stack: ["React", "TypeScript", "Vite", "Supabase", "Zustand", "Three.js"],
    contributions: [
      "Built a collaborative lightboard (whiteboard) inspired by tools like Miro and Figma.",
      "Integrated the lightboard into the company CRM.",
      "Implemented high-level security across the lightboard to protect against unauthorized access.",
    ],
  },
  {
    slug: "moneycache-pos",
    title: "Moneycache POS",
    category: "web",
    summary:
      "Point-of-sale system with inventory tracking and sales analytics for multi-branch retail operations.",
    thumbnail: "/images/wow.png",
    featured: true,
    year: "2025",
    role: "Primary Frontend Developer (Intern)",
    client: "Logicbase Interactive",
    stack: ["Next.js", "React", "Laravel API", "REST"],
    contributions: [
      "Served as the primary frontend developer, building the POS web app in Next.js and React.",
      "Designed responsive UI components and integrated RESTful APIs from the Laravel backend.",
      "Implemented client-side form validation and error handling across all input forms.",
      "Applied lazy loading, code splitting, and efficient state management to speed up page loads.",
      "Translated design-team mockups into pixel-perfect React components and ran cross-browser testing.",
    ],
    // TODO(jeffrey): add measurable outcomes and a live link if the app is public.
  },
  {
    slug: "mcity-veterinary",
    title: "Malaybalay City Veterinary",
    category: "web",
    summary:
      "Content management system for a local veterinary office, streamlining patient records, appointments, and clinic operations.",
    thumbnail: "/images/landing.jpg",
    featured: true,
    year: "2023",
    role: "Full Stack Developer",
    client: "Malaybalay City Veterinary Office",
    stack: ["React", "Node.js", "MongoDB Atlas"],
    contributions: [
      "Built the veterinary information system end to end with React, Node.js, and MongoDB Atlas.",
      "Ran client consultations to gather and implement system requirements.",
      "Applied UX best practices so staff could use the system day to day without confusion.",
    ],
  },
  {
    slug: "buksu-labsecure",
    title: "BukSU LabSecure",
    category: "web",
    summary:
      "Laboratory security and access management system for Bukidnon State University, with RFID-based entry.",
    thumbnail: "/images/bading.png",
    featured: true,
    year: "2023–2024",
    role: "Backend Developer",
    client: "Bukidnon State University",
    stack: ["Laravel", "RFID"],
    contributions: [
      "Developed the laboratory access management system using Laravel as a full-stack framework.",
      "Integrated an embedded RFID system for smart lab access, unauthorized-entry monitoring, attendance tracking, and scheduling.",
    ],
  },
  {
    slug: "booknest",
    title: "BookNest",
    category: "web",
    summary:
      "Digital library platform for managing book collections, reading lists, and community borrowing.",
    thumbnail: "/images/book.png",
    // TODO(jeffrey): add year, role, stack, and a live/repo link.
  },
  {
    slug: "rpa-automation",
    title: "RPA Workflow Automation",
    category: "automation",
    summary:
      "Automated repetitive business workflows with Robotic Process Automation, eliminating manual operations.",
    thumbnail: "/images/tre.png",
    featured: true,
    year: "2025–2026",
    role: "Data Analyst / Web Developer",
    client: "Ubest Development Inc.",
    stack: ["UiPath", "Yingdao Shadowbot"],
    outcomes: ["90% faster task completion on automated workflows."],
    contributions: [
      "Implemented RPA bots for repetitive tasks including web scraping and Windows desktop software interaction.",
    ],
  },
  {
    slug: "ai-chatbot-flow",
    title: "AI Chatbot Flow",
    category: "automation",
    summary:
      "Conversational AI chatbot with a visual flow builder for automated customer support and inquiry handling.",
    thumbnail: "/images/chat.png",
    featured: true,
    // TODO(jeffrey): add stack, outcomes, and a demo link.
  },
  {
    slug: "n8n-email-digest",
    title: "n8n Email Digest Workflow",
    category: "automation",
    summary:
      "Automated email digest generation and distribution workflow built on n8n for team productivity.",
    thumbnail: "/images/ha.png",
    stack: ["n8n"],
    // TODO(jeffrey): add what it saved (hours/week, team size).
  },
  {
    slug: "logicbase-mockup",
    title: "LogicBase Interactive Mockup",
    category: "design",
    summary:
      "Interactive Figma prototype for LogicBase's application interface with intuitive navigation and modern UI patterns.",
    thumbnail: "/images/image.png",
    stack: ["Figma"],
    links: {
      figma:
        "https://www.figma.com/design/hwDdkJrkap5JTsYseEYcOO/Sedoro_LBI?node-id=0-1&p=f&t=lY8vQk0bPdgoMvV5-0",
    },
  },
  {
    slug: "moneycache-mockup",
    title: "Moneycache Mock Design",
    category: "design",
    summary:
      "UI/UX mockup for the Moneycache payment platform with streamlined checkout flows.",
    thumbnail: "/images/webdesign1.png",
    stack: ["Figma"],
    links: {
      figma:
        "https://www.figma.com/design/x75LZo7SwMBG9VjRAx8DDW/MC-Mock-up-D?node-id=0-1&p=f&t=39U83oSjlYIluiuv-0",
    },
  },
];
