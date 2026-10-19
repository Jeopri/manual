import Image from "next/image";
import type { Certification } from "@/content/types";

export default function CertCard({ cert }: { cert: Certification }) {
  return (
    <a
      href={cert.verifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:border-foreground/30"
    >
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-background">
        {cert.logo ? (
          <Image src={cert.logo} alt={`${cert.issuer} logo`} fill sizes="48px" className="object-contain p-1.5" />
        ) : (
          <span className="text-sm font-bold text-muted-foreground">{cert.issuer[0]}</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-card-foreground">{cert.name}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {cert.issuer}
          {cert.date && ` · ${cert.date}`}
        </p>
      </div>
      <span className="shrink-0 font-mono text-[10px] text-muted-foreground group-hover:text-foreground">
        Verify <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}
