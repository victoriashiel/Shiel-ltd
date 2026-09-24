import { ContactForm } from "@/components/contact-form";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { isRegionSlug, regions, type RegionSlug } from "@/lib/regions";
import { siteConfig } from "@/lib/site";

export type ContactSearchParams = Promise<{
  enquiry?: string | string[];
  package?: string | string[];
  region?: string | string[];
}>;

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export async function ContactPageContent({
  searchParams,
  region,
}: {
  searchParams: ContactSearchParams;
  region?: RegionSlug;
}) {
  const params = await searchParams;
  const enquiry = first(params.enquiry);
  const packageName = first(params.package);
  const regionParam = first(params.region);
  const resolvedRegion =
    region ?? (regionParam && isRegionSlug(regionParam) ? regionParam : undefined);
  const initialCountry = resolvedRegion ? regions[resolvedRegion].name : "";

  const initialEnquiryType =
    enquiry === "Packages & pricing" || packageName
      ? "Packages & pricing"
      : enquiry === "International accounting"
        ? "International accounting"
        : "";

  const initialMessage = packageName
    ? `I'm interested in the ${packageName} package. Please confirm whether it is the right fit for my business.`
    : "";

  return (
    <section className="contact-layout section-pad">
      <div className="contact-intro">
        <p className="eyebrow">Contact us</p>
        <h1>
          {resolvedRegion
            ? `Tell us what you need help with in ${regions[resolvedRegion].name}.`
            : "Tell us what you need help with."}
        </h1>
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
          initialCountry={initialCountry}
        />
      </div>
    </section>
  );
}
