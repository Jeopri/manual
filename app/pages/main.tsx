"use client";
import React from "react";
import Image from "next/image";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import jep from "@/public/images/k-removebg-preview.png";

const words = `Results-driven IT graduate specializing in web development, data analytics, automation, and AI integrations, experienced building scalable systems, dashboards, and efficient workflows across multi-branch business environments with confidence.`;

const roles = ["Web Developer", "Full Stack Engineer", "Web Designer", "AI Automation"];

const socialLinks = [
  { label: "Facebook", url: "https://www.facebook.com/JeffreySedoro/", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/jeffrey-sedoro/", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
  { label: "Instagram", url: "https://www.instagram.com/mistarjepri/?hl=en", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
  { label: "Dribbble", url: "#", path: "M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm6.93-8H15c.13 1.6.64 3.1 1.43 4.4A8.05 8.05 0 0 0 18.93 14zM10 18.9V15H6.07a8.07 8.07 0 0 0 3.93 3.9zM10 13H5.07A8.07 8.07 0 0 0 6.5 17.9 10.07 10.07 0 0 1 10 13zm0-7.9A8.07 8.07 0 0 0 6.07 9H10V5.1zM12 4.07V9h4.93A8.05 8.05 0 0 0 12 4.07zM12 11v2h6.93A8.05 8.05 0 0 0 18.5 9H12v2z" },
];

export default function Home() {
  const [loading, setLoading] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  function handleCTA(e: React.MouseEvent) {
    e.preventDefault();
    document.getElementById("main-section")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleSecondaryCTA(e: React.MouseEvent) {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "/Jeffrey_Sedoro_CV.pdf";
    link.download = "Jeffrey_Sedoro_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background">
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(240,237,232,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,232,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* ── PHOTO ── */}
        <div className="absolute inset-0 z-[2] flex justify-center">
          <div className="relative h-full w-full md:w-[62%]">
            <Image
              src={jep}
              alt="Jeffrey Sedoro"
              fill
              loading="eager"
              className="object-cover object-top"
              style={{ filter: "brightness(0.7) contrast(1.1)" }}
            />
            <div className="absolute inset-y-0 left-0 z-[3] w-[20%] md:w-[35%] bg-gradient-to-r from-background to-transparent" />
            <div className="absolute inset-y-0 right-0 z-[3] w-[20%] md:w-[35%] bg-gradient-to-l from-background to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 z-[3] h-[45%] md:h-[35%] bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        </div>

        {/* ── MOBILE LAYOUT ── */}
        <div className="relative z-10 flex min-h-screen flex-col md:hidden">
          {/* Mobile Nav */}
          <nav className="flex items-center justify-between px-5 pt-4">
            <span
              className="text-sm font-black uppercase tracking-[0.2em] text-foreground"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Jeffrey
            </span>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-foreground/60">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </nav>

          {menuOpen && (
            <div className="flex flex-col items-center gap-4 pt-4 pb-6">
              {["Contact", "Portfolio", "Article"].map((item) => (
                <a key={item} href="#" className="text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
                  {item}
                </a>
              ))}
              <div className="flex gap-5 pt-2">
                {socialLinks.map(({ label, url, path }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-foreground/25 transition-colors hover:text-primary">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Content */}
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 pb-24">
            <h1
              className="select-none text-center leading-none uppercase text-primary"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(48px, 14vw, 72px)",
                fontWeight: 900,
                letterSpacing: "-0.01em",
              }}
            >
              Jeffrey<br />Sedoro
            </h1>

            <LayoutTextFlip words={roles} duration={5000} />

            <p className="max-w-[300px] text-center text-xs leading-relaxed text-muted-foreground">
              <i>{words.slice(0, 120)}…</i>
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {[["React", "Next.js"], ["Node.js", "TypeScript"], ["Python", "Tailwind"]].map(([a, b]) => (
                <span
                  key={a}
                  className="inline-flex items-center rounded border border-border px-2 py-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80"
                >
                  {a} · {b}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <button
                onClick={handleSecondaryCTA}
                className="inline-flex items-center gap-1.5 rounded-full border border-foreground/20 px-4 py-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                Resume
              </button>
              <button
                onClick={handleCTA}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 active:scale-[0.97]"
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-[.2em] text-foreground/20">Scroll</span>
            <div className="h-4 w-px bg-foreground/15" />
          </div>
        </div>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="relative z-10 hidden min-h-screen md:block">
          <nav className="absolute left-0 right-0 top-0 z-10 flex items-center px-8 py-5">
            <div className="flex flex-1 gap-8">
            </div>
            <span className="text-sm font-black uppercase tracking-[0.2em] text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Jeffrey
            </span>
            <div className="flex flex-1 items-center justify-end gap-5">
              {socialLinks.map(({ label, url, path }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-foreground/25 transition-colors hover:text-primary"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </nav>

          <span
            className="absolute left-[-4px] top-16 z-[5] select-none leading-none uppercase text-primary"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(58px, 11.5vw, 104px)",
              fontWeight: 900,
              letterSpacing: "-0.01em",
            }}
          >
            Jeffrey
          </span>
          <span
            className="absolute right-[-4px] bottom-28 z-[5] select-none leading-none uppercase text-right text-primary"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(58px, 11.5vw, 104px)",
              fontWeight: 900,
              letterSpacing: "-0.01em",
            }}
          >
            Sedoro
          </span>

          <div className="absolute left-7 z-10 top-1/2 -translate-y-1/2">
            <LayoutTextFlip words={roles} duration={5000} />
          </div>

          <div className="absolute right-20 z-10 top-1/2 -translate-y-1/2 max-w-[240px] text-right">
            <span className="float-right ml-1.5 mt-1 h-2 w-2 rounded-full bg-primary" />
            <TextGenerateEffect words={words} className="italic" />
          </div>


          <div className="absolute left-7 z-10 flex flex-col gap-1.5" style={{ bottom: "80px" }}>
            {[["React", "Next.js"], ["Node.js", "TypeScript"], ["Python", "Tailwind"]].map(([a, b]) => (
              <span
                key={a}
                className="inline-flex items-center rounded border border-border px-2.5 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground/80"
              >
                {a} · {b}
              </span>
            ))}
          </div>

          <div className="absolute right-20 z-10 flex items-center gap-3" style={{ bottom: "32px" }}>
            <button
              onClick={handleSecondaryCTA}
              className="inline-flex items-center gap-1.5 rounded-full border border-foreground/20 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              Resume
            </button>
            <button
              onClick={handleCTA}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 active:scale-[0.97]"
            >
              Get Started
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </button>
          </div>

          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-[.2em] text-foreground/20">Scroll</span>
            <div className="h-4 w-px bg-foreground/15" />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-50 h-[3px] w-full">
        <div className="h-full w-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 to-purple-500" />
      </div>
    </>
  );
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-2">
        <h1
          className="text-3xl font-black uppercase tracking-widest text-foreground md:text-5xl"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Jeffrey Sedoro
        </h1>
        <p className="text-sm text-muted-foreground">
          Loading<span className="animate-pulse">...</span>
        </p>
      </div>
      <div className="absolute bottom-12 h-[2px] w-48 overflow-hidden rounded-full bg-foreground/10">
        <div className="h-full w-full animate-loading-bar rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 to-purple-500" />
      </div>
    </div>
  );
}
