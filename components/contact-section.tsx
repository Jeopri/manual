"use client";
import dynamic from "next/dynamic";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/content/site";

function MapLoading() {
  return (
    <div className="flex h-[280px] items-center justify-center rounded-lg border border-border">
      <p className="font-mono text-xs text-muted-foreground">loading map…</p>
    </div>
  );
}

const LocationMap = dynamic(() => import("@/components/location-map").then((m) => m.LocationMap), {
  ssr: false,
  loading: MapLoading,
});

export default function ContactSection() {
  return (
    <div className="space-y-12">
      <ContactForm />

      <section aria-label="Location" className="space-y-3">
        <LocationMap />
        <p className="font-mono text-xs text-muted-foreground">
          based in {site.location}, Philippines · open to remote work
        </p>
      </section>
    </div>
  );
}
