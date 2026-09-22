import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Shiel Accountants about tax and compliance, bookkeeping and payroll, advisory and growth, or international accounting.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Shiel Accountants",
    description:
      "Get in touch with Shiel Accountants by email, WhatsApp or through the enquiry form.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="contact-layout section-pad">
        <div className="contact-intro">
          <p className="eyebrow">Contact us</p>
          <h1>Tell us what you need help with.</h1>
          <p>
            Start with the situation, where you are based and any deadline already in view.
            We only ask for the information needed to understand and route the initial enquiry.
          </p>

          <div className="contact-methods">
            <a className="contact-method" href={`mailto:${siteConfig.email}`}>
              <span>Email</span>
              <strong>{siteConfig.email}</strong>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className="contact-method"
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              <span>WhatsApp</span>
              <strong>{siteConfig.whatsappDisplay}</strong>
              <WhatsAppIcon size={20} />
            </a>
          </div>

          <div className="contact-note">
            <p className="contact-note-title">Before you send anything sensitive</p>
            <p>
              Please do not send bank details, passwords, tax identification numbers or
              confidential financial documents through the initial enquiry form. We can
              arrange an appropriate way to exchange documents once the scope is clear.
            </p>
          </div>
        </div>

        <div>
          <p className="form-kicker">Enquiry form</p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
