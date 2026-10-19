// Shapes for everything in content/. Edit the data files, not these types,
// unless you're adding a new field.

export type SocialLink = {
  label: string;
  url: string;
  /** SVG path data, drawn in a 24x24 viewBox */
  icon: string;
};

export type ProjectCategory = "web" | "automation" | "design";

export type Project = {
  /** URL segment: /projects/<slug>. Lowercase, hyphenated, unique. */
  slug: string;
  title: string;
  category: ProjectCategory;
  /** One or two sentences, shown on cards. */
  summary: string;
  /** Path under /public, e.g. "/images/book.png". Omit to show a generated placeholder. */
  thumbnail?: string;
  /** Brand logo shown centered on a dark tile when there's no screenshot. Use a light/transparent logo. */
  logo?: string;
  /** Code isn't public (e.g. employer-owned): shows a "private codebase" note instead of repo links. */
  isPrivate?: boolean;
  /** Show on the home page. */
  featured?: boolean;
  year?: string;
  role?: string;
  /** Who it was for, e.g. "Logicbase Interactive" */
  client?: string;
  stack?: string[];
  /** Longer description for the detail page. */
  overview?: string;
  /** What you personally did. */
  contributions?: string[];
  /** Measurable results — lead with numbers where you have them. */
  outcomes?: string[];
  /** Extra screenshots for the detail page. */
  gallery?: string[];
  links?: {
    live?: string;
    repo?: string;
    figma?: string;
    video?: string;
  };
};

export type ExperienceType = "work" | "freelance" | "project";

export type Experience = {
  role: string;
  company: string;
  /** Path under /public */
  logo?: string;
  date: string;
  location?: string;
  type: ExperienceType;
  /** Put the bullets with numbers first — they're what recruiters scan for. */
  highlights: string[];
  stack?: string[];
  /** Links the entry to one or more /projects/<slug> pages. */
  projectSlugs?: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  /** Path under /public, e.g. "/images/certs/google.png" */
  logo?: string;
  /** e.g. "2025" or "Mar 2025" */
  date?: string;
  /** Public link where anyone can confirm the credential. */
  verifyUrl: string;
  category?: string;
};

export type Recommendation = {
  quote: string;
  name: string;
  /** Their title and company, e.g. "Engineering Manager, Logicbase" */
  title: string;
  /** e.g. "May 2025" */
  date?: string;
  /** Link to the original, e.g. your LinkedIn recommendations page. */
  sourceUrl?: string;
};

export type Stat = {
  value: string;
  label: string;
  href?: string;
};

export type Video = {
  title: string;
  description?: string;
  /** Editing tools used, e.g. ["DaVinci Resolve"] */
  tools?: string[];
  year?: string;
  /** YouTube video ID — the part after "v=" in a YouTube link. Preferred for long videos. */
  youtubeId?: string;
  /** Or a direct video file: a path under /public (keep it small) or a full URL. */
  src?: string;
  /** Still image shown before a direct video file plays. */
  poster?: string;
  /** Placeholder entry: shown only in `npm run dev`, never on the live site. */
  example?: boolean;
  /** Someone else's footage shown as a stand-in: live, but badged "sample footage". */
  sample?: boolean;
};

export type ToolItem = {
  name: string;
  icon: string;
};

export type ToolGroup = {
  title: string;
  description: string;
  tools: ToolItem[];
};
