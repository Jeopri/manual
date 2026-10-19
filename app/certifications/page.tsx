import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/section-header";
import CertCard from "@/components/cert-card";
import { getCertifications } from "@/lib/content";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Certifications, each verifiable at its source.",
};

export default function CertificationsPage() {
  const certifications = getCertifications();
  // Hidden until content/certifications.ts has entries.
  if (certifications.length === 0) notFound();

  const groups = new Map<string, typeof certifications>();
  for (const cert of certifications) {
    const key = cert.category ?? "Certifications";
    groups.set(key, [...(groups.get(key) ?? []), cert]);
  }

  return (
    <>
      <PageHeader title="Certifications" description="Credentials across my work — each one links to where you can verify it." />
        <div className="space-y-12">
          {[...groups].map(([category, certs]) => (
            <section key={category}>
              {groups.size > 1 && (
                <h2 className="mb-4 border-b border-border pb-3 font-mono text-xs lowercase text-muted-foreground">{category}</h2>
              )}
              <ul className="space-y-3">
                {certs.map((cert) => (
                  <li key={cert.verifyUrl}>
                    <CertCard cert={cert} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </>
  );
}
