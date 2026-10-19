import type { Video } from "@/content/types";

export default function VideoCard({ video }: { video: Video }) {
  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-card">
        {video.youtubeId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.youtubeId)}?rel=0`}
            title={video.title}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : video.src ? (
          <video
            src={video.src}
            poster={video.poster}
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        {(video.example || video.sample) && (
          <span className="pointer-events-none absolute right-2 top-2 rounded bg-background/90 px-1.5 py-0.5 font-mono text-[10px] text-foreground">
            {video.example ? "example · dev only" : "sample footage"}
          </span>
        )}
      </div>
      <figcaption className="mt-3">
        <p className="text-sm font-medium text-foreground">
          {video.title}
          {video.year && <span className="ml-2 font-mono text-[11px] font-normal text-muted-foreground">{video.year}</span>}
        </p>
        {video.description && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{video.description}</p>}
        {video.tools && video.tools.length > 0 && (
          <ul className="mt-2 flex flex-wrap items-center gap-1.5">
            {/* On sample footage the tools describe Jeffrey's skills, not how this clip was made */}
            {video.sample && <li className="mr-1 font-mono text-[10px] text-muted-foreground">my editing tools:</li>}
            {video.tools.map((tool) => (
              <li key={tool} className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                {tool}
              </li>
            ))}
          </ul>
        )}
      </figcaption>
    </figure>
  );
}
