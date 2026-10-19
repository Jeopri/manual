import Link from "next/link";

/** Home-page section label: "01 — projects ............ all projects →" */
export function SectionLabel({
  index,
  label,
  more,
}: {
  index: string;
  label: string;
  more?: { href: string; label: string };
}) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-border pb-3">
      <h2 className="font-mono text-xs text-muted-foreground">
        {index} — {label}
      </h2>
      {more && (
        <Link
          href={more.href}
          className="shrink-0 font-mono text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          {more.label} →
        </Link>
      )}
    </div>
  );
}

/** Standalone page heading: lowercase pixel title plus a one-line description. */
export default function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <header className="mb-12">
      <h1 className="font-pixel text-4xl lowercase text-foreground md:text-5xl">{title}</h1>
      {description && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>}
    </header>
  );
}
