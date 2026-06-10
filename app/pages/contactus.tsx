import { Spotlight } from "@/components/ui/spotlight";
import { ContactForm } from "@/components/contact-form";

export const metadata = {
  title: "Contact — Myzino",
  description: "Open to backend and full-stack opportunities, freelance projects, and interesting collaborations.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden">
      <Spotlight />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-16 py-24 md:py-32">
        {/* Header */}
        <p className="text-xs tracking-[0.15em] uppercase text-neutral-600 mb-4">
          Get in touch
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
          Let&apos;s work<br />together.
        </h1>
        <p className="text-sm text-neutral-500 leading-relaxed mb-10 max-w-sm">
          Open to backend and full-stack opportunities, freelance projects, and
          interesting collaborations. Drop me a message and I&apos;ll get back to you.
        </p>

        {/* Contact form — constrained to left column */}
        <div className="max-w-lg">
          <ContactForm />

          {/* Divider + social links */}
          <div className="mt-10 pt-8 border-t border-white/[0.07] flex flex-wrap gap-6">
          <a
            href="https://github.com/Jeopri"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-300 transition-colors"
          >
            {/* GitHub icon */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/jeffrey-sedoro/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-300 transition-colors"
          >
            {/* LinkedIn icon */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>

          <a
            href="jeffreysedoro5@gmail.com"
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-300 transition-colors"
          >
            {/* Email icon */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-.09.009-.178.027-.262L11.979 12.8 23.972 5.195c.018.084.028.172.028.262z" />
            </svg>
            Email
          </a>
          </div>
        </div>
      </div>
    </main>
  );
}