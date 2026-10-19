import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16">
      <p className="font-pixel text-7xl text-foreground">404</p>
      <h1 className="mt-6 text-lg text-foreground">This page doesn&apos;t exist.</h1>
      <p className="mt-1 text-sm text-muted-foreground">It may have moved, or the link is out of date.</p>
      <div className="mt-8 flex gap-6 font-mono text-xs">
        <Link href="/" className="text-foreground underline underline-offset-4">
          home →
        </Link>
        <Link href="/projects" className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          projects →
        </Link>
      </div>
    </div>
  );
}
