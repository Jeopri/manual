import Image from "next/image";
import SocialLinks from "@/components/social-links";
import { site } from "@/content/site";

export default function Intro() {
  return (
    <section aria-label="Introduction" className="grid gap-8 sm:grid-cols-[180px_1fr] sm:items-start">
      <div className="halftone aspect-square w-40 rounded-md border border-border sm:w-full">
        <Image
          src={site.portrait}
          alt={site.name}
          fill
          priority
          sizes="180px"
          className="object-cover object-top"
        />
      </div>

      <div>
        <h1 className="font-pixel text-4xl text-foreground md:text-5xl">{site.name}</h1>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          {site.roles.join(" · ").toLowerCase()} — {site.location}
        </p>
        <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
          {site.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <SocialLinks className="mt-5" />
      </div>
    </section>
  );
}
