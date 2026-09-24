import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Shiel Accountants about tax and compliance, bookkeeping and payroll, advisory and growth, international accounting, or monthly accounting packages.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Shiel Accountants",
    description:
      "Get in touch with Shiel Accountants through the enquiry form or WhatsApp.",
    url: "/contact",
  },
};

type ContactSearchParams = Promise<{
  enquiry?: string | string[];
  package?: string | string[];
}>;

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: ContactSearchParams;
}) {
  const params = await searchParams;
  const enquiry = first(params.enquiry);
  const packageName = first(params.package);

  const initialEnquiryType =
    enquiry === "Packages & pricing" || packageName ? "Packages & pricing" : "";

  const initialMessage = packageName
    ? `I'm interested in the ${packageName} package. Please confirm whether it is the right fit for my business.`
    : "";

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
          <ContactForm
            initialEnquiryType={initialEnquiryType}
            initialMessage={initialMessage}
          />
        </div>
      </section>
    </>
  );
}
