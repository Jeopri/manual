import type { Metadata } from "next";
import PageHeader from "@/components/section-header";
import { toolGroups } from "@/content/tools";

export const metadata: Metadata = {
  title: "Stack",
  description: "The tools, frameworks, and platforms Jeffrey Sedoro works with.",
};

export default function StackPage() {
  return (
    <>
      <PageHeader title="Stack" description="The tools, frameworks, and platforms I reach for — front end, back end, data, and automation." />
      <div className="space-y-12">
        {toolGroups.map((group) => (
          <section key={group.title}>
            <h2 className="mb-2 border-b border-border pb-3 font-mono text-xs lowercase text-muted-foreground">{group.title}</h2>
            <p className="mb-4 text-xs text-muted-foreground">{group.description}</p>
            <ul className="flex flex-wrap gap-1.5">
              {group.tools.map((tool) => (
                <li key={tool.name} className="rounded border border-border px-2 py-1 font-mono text-xs text-foreground">
                  {tool.name}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
