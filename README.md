# Jeffrey Sedoro — Portfolio

Personal portfolio built with [Next.js](https://nextjs.org) (App Router), [Motion](https://motion.dev), and [Tailwind CSS v4](https://tailwindcss.com). Monochrome sidebar layout with a halftone portrait, numbered home sections, a live GitHub contribution heatmap, project case-study pages, a Leaflet map, and a contact form.

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4 + `tw-animate-css`
- **Animation** — Motion (React)
- **UI Primitives** — shadcn/ui
- **Map** — Leaflet
- **Email** — Nodemailer (Gmail SMTP)

## Design

- **Monochrome** — no accent color; emphasis comes from brightness and underlines. Tokens live in `app/globals.css`.
- **Type** — Geist (body), Geist Mono (labels), Geist Pixel (headings). Geist Pixel is bundled in `app/fonts/` under the SIL Open Font License (`GeistPixel-OFL.txt`).
- **Theme** — dark by default; the sidebar switch offers system / light / dark and remembers the choice.
- **GitHub heatmap** — read from your public contribution calendar on the server and refreshed daily; if GitHub is unreachable the section hides itself.

## Editing content

All site content lives in `content/` — you shouldn't need to touch components to update the site.

| File | What it controls |
|---|---|
| `content/site.ts` | Name, roles, home intro paragraphs, portrait, email, location, resume path, social links, `githubUser` for the contribution heatmap |
| `content/projects.ts` | Project cards and the `/projects/[slug]` case-study pages (`featured: true` puts one on the home page; `isPrivate: true` shows "private codebase — walkthrough on request" instead of repo links; no `thumbnail` → generated placeholder) |
| `content/experience.ts` | Home experience list and the `/experience` timeline (`projectSlugs` links a role to its project pages) |
| `content/stats.ts` | Numbers in the home stats strip (the project count is added automatically) |
| `content/tools.ts` | Tech stack tabs (including Video Editing) |
| `content/videos.ts` | "Video editing" section on home — YouTube IDs or video files; entries marked `example: true` only show in `npm run dev`; `sample: true` shows live with a "sample footage" badge |
| `content/certifications.ts` | Certifications section, page, and nav link — hidden while empty |
| `content/recommendations.ts` | Recommendations section, page, and nav link — hidden while empty |

Types for every field are in `content/types.ts`. Optional fields left empty are simply not shown. Look for `TODO(jeffrey)` comments for gaps worth filling.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
npm run build
```
