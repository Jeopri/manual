import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/section-header";
import QuoteCard from "@/components/quote-card";
import { getRecommendations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Recommendations",
  description: "What managers, teammates, and mentors say about working with Jeffrey Sedoro.",
};

export default function RecommendationsPage() {
  const recommendations = getRecommendations();
  // Hidden until content/recommendations.ts has entries.
  if (recommendations.length === 0) notFound();

  return (
    <>
      <PageHeader title="Recommendations" description="What managers, teammates, and mentors say about working with me." />
        <ul className="space-y-3">
          {recommendations.map((rec) => (
            <li key={rec.name}>
              <QuoteCard rec={rec} />
            </li>
          ))}
        </ul>
      </>
  );
}
