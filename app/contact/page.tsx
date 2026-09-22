import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Shiel to discuss accountancy, tax, VAT, payroll, bookkeeping, management accounts or international accounting support.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="contact-layout section-pad">
      <div className="contact-intro"><p className="eyebrow">Contact</p><h1>Tell us what you need to get sorted.</h1><p>Give us enough context to understand the work. We can then come back to you about scope, timing and the sensible next step.</p><div className="contact-direct"><span>Prefer email?</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div></div>
      <ContactForm />
    </section>
  );
}
