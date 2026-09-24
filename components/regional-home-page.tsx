import Link from "next/link";
import { CaseStudyCarousel } from "@/components/case-study-carousel";
import { FinanceCanvas } from "@/components/finance-canvas";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { regionContent } from "@/lib/region-content";
import { regionalServices, regionalServiceSlugs } from "@/lib/regional-services";
import { regions, type RegionSlug } from "@/lib/regions";
import { siteConfig } from "@/lib/site";

const homeCopy: Record<RegionSlug, {
  heroTitle: string;
  heroIntro: string;
  proof: [string, string][];
  serviceHeading: string;
  aboutHeading: string;
  aboutCopy: string;
}> = {
  ie: {
    heroTitle: "Accounting for businesses, contractors and founders in Ireland.",
    heroIntro:
      "Irish tax, bookkeeping, payroll and company compliance, with international coordination when the business or owner also reaches beyond Ireland.",
    proof: [["10+", "years of experience"], ["Ireland", "local compliance"], ["Cross-border", "international coordination"], ["Practical", "problem-solving support"]],
    serviceHeading: "Irish accounting, connected from the monthly books to the final filing.",
    aboutHeading: "We look past the filing deadline to the underlying numbers.",
    aboutCopy: "Revenue and CRO compliance matter, but so do the bookkeeping, payroll, cash flow and cross-border facts underneath them.",
  },
  uk: {
    heroTitle: "Accounting for UK companies, contractors and internationally mobile owners.",
    heroIntro:
      "UK statutory accounts, Corporation Tax, bookkeeping and payroll, with cross-border coordination when directors, owners or clients are elsewhere.",
    proof: [["10+", "years of experience"], ["UK", "local compliance"], ["Cross-border", "international coordination"], ["Practical", "problem-solving support"]],
    serviceHeading: "UK accounting that keeps Companies House, HMRC and the underlying books aligned.",
    aboutHeading: "Statutory accounts are only useful when the records behind them are reliable.",
    aboutCopy: "We keep the company books, payroll, VAT and tax work connected so the year end is not treated as a separate exercise.",
  },
  ae: {
    heroTitle: "Accounting for UAE businesses and internationally mobile founders.",
    heroIntro:
      "Bookkeeping, Corporate Tax, VAT and management reporting for UAE companies, free-zone businesses and founders operating across borders.",
    proof: [["UAE", "local accounting"], ["FTA", "tax compliance"], ["Multi-currency", "international records"], ["Practical", "founder support"]],
    serviceHeading: "UAE bookkeeping, tax and reporting built to work together.",
    aboutHeading: "The books should support the tax return and the business decisions.",
    aboutCopy: "We keep Corporate Tax, VAT, monthly records and management reporting connected rather than treating each deadline as a separate project.",
  },
  gi: {
    heroTitle: "Accounting for Gibraltar companies, owners and cross-border businesses.",
    heroIntro:
      "Gibraltar bookkeeping, company accounts, CT1 and payroll support, with coordination for businesses and owners connected to Spain, the UK or elsewhere.",
    proof: [["Gibraltar", "local compliance"], ["CT1", "company tax support"], ["Cross-border", "Spain + UK coordination"], ["Practical", "owner support"]],
    serviceHeading: "Gibraltar accounting that stays connected to the wider business.",
    aboutHeading: "Local compliance and cross-border reality often sit side by side.",
    aboutCopy: "We keep the Gibraltar books and filings organised while making sure the information needed elsewhere is not reconstructed later.",
  },
  es: {
    heroTitle: "Accounting for autónomos, Spanish companies and international owners.",
    heroIntro:
      "Spanish bookkeeping, IVA, company tax and management reporting, with English-language support for owners whose work or companies cross borders.",
    proof: [["Spain", "local accounting"], ["AEAT", "recurring filings"], ["Cross-border", "international coordination"], ["Practical", "English-language support"]],
    serviceHeading: "Spanish accounting built around the filings and records the business actually needs.",
    aboutHeading: "Quarterly filings work better when the bookkeeping is already current.",
    aboutCopy: "We connect the monthly records, IVA, company tax, payroll coordination and management reporting so each part of the finance process supports the next.",
  },
};

export function RegionalHomePage({ region }: { region: RegionSlug }) {
  const market = regions[region];
  const copy = homeCopy[region];
  const faq = regionContent[region].faqs;

  return (
    <>
      <section className="hero section-pad">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> {market.name} · Working internationally</p>
          <h1>{copy.heroTitle}</h1>
          <p className="hero-intro">{copy.heroIntro}</p>
          <div className="hero-actions">
            <div className="contact-cta-pair">
              <Link className="button button-dark" href={`${market.path}/contact`}>
                Contact us <span aria-hidden="true">↗</span>
              </Link>
              <a
                className="whatsapp-cta-icon"
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-label={`Contact Shiel Accountants on WhatsApp at ${siteConfig.whatsappDisplay}`}
                title="WhatsApp"
              >
                <WhatsAppIcon size={22} />
              </a>
            </div>
            <a className="button button-quiet" href="#services">Explore services <span aria-hidden="true">↓</span></a>
          </div>
          <p className="hero-note">Use the contact form and we’ll come back to you directly.</p>
        </div>
        <FinanceCanvas />
      </section>

      <section className="proof-strip" aria-label={`Shiel Accountants in ${market.name} at a glance`}>
        {copy.proof.map(([value, label]) => (
          <div key={label}><strong>{value}</strong><span>{label}</span></div>
        ))}
      </section>

      <section className="section-pad service-section" id="services">
        <div className="section-heading reveal">
          <p className="eyebrow">What we do in {market.name}</p>
          <h2>{copy.serviceHeading}</h2>
          <p>
            The service structure stays joined up: compliance, day-to-day finance, decision support and international coordination all use the same underlying records.
          </p>
        </div>
        <div className="service-grid">
          {regionalServiceSlugs.map((slug, index) => {
            const service = regionalServices[region][slug];
            return (
              <Link
                href={`${market.path}/${slug}`}
                className="service-card reveal"
                key={slug}
                style={{ "--delay": `${index * 55}ms` } as React.CSSProperties}
              >
                <span className="service-index">0{index + 1}</span>
                <div>
                  <p className="card-eyebrow">{service.eyebrow}</p>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                </div>
                <span className="card-arrow" aria-hidden="true">↗</span>
              </Link>
            );
          })}
        </div>
        <Link className="text-link" href={`${market.path}/packages`}>
          View {market.name} packages <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <CaseStudyCarousel />

      <section className="dark-panel section-pad" id="about">
        <div className="dark-copy reveal">
          <p className="eyebrow">What sets us apart</p>
          <h2>{copy.aboutHeading}</h2>
          <p>{copy.aboutCopy}</p>
        </div>
        <div className="dark-cards">
          <article className="persona-card reveal">
            <span>Local detail</span>
            <h3>The forms, deadlines and working papers change by jurisdiction. The accounting process should reflect that.</h3>
          </article>
          <article className="persona-card reveal">
            <span>International context</span>
            <h3>If another country also matters, we keep the information flow organised rather than treating it as somebody else’s problem.</h3>
          </article>
        </div>
      </section>

      <section className="section-pad faq-section">
        <div className="section-heading reveal">
          <p className="eyebrow">{market.name} questions</p>
          <h2>The things worth establishing before the work starts.</h2>
        </div>
        <div className="faq-list">
          {faq.map((item) => (
            <details className="faq-item reveal" key={item.question}>
              <summary>
                <span>{item.question}</span>
                <span className="faq-plus" aria-hidden="true">+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-panel section-pad reveal">
        <p className="eyebrow">{market.name}</p>
        <h2>Tell us what you need help with.</h2>
        <p>Choose the closest enquiry type, give us the essentials and we can take it from there.</p>
        <div className="contact-cta-pair">
          <Link className="button button-dark" href={`${market.path}/contact`}>
            Contact us <span aria-hidden="true">↗</span>
          </Link>
          <a
            className="whatsapp-cta-icon"
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`Contact Shiel Accountants on WhatsApp at ${siteConfig.whatsappDisplay}`}
            title="WhatsApp"
          >
            <WhatsAppIcon size={22} />
          </a>
        </div>
      </section>
    </>
  );
}
