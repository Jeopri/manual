import type { Metadata } from "next";
import PageHeader from "@/components/section-header";
import ContactSection from "@/components/contact-section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about full-stack roles, freelance projects, or collaborations.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact" description={`${site.availability} Drop me a message and I'll get back to you.`} />
      <ContactSection />
    </>
  );
}
