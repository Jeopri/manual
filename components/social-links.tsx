import { socials } from "@/content/site";
import { cn } from "@/lib/utils";

/** "github ↗  linkedin ↗ …" text links. */
export default function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-2", className)}>
      {socials.map(({ label, url }) => (
        <li key={label}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs lowercase text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {label} ↗
          </a>
        </li>
      ))}
    </ul>
  );
}
