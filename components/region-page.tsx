import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regionContent } from "@/lib/region-content";
import { formatRegionalPrice, regionalPackages } from "@/lib/regional-packages";
import { getRegionAlternates, isRegionSlug, regions, type RegionSlug } from "@/lib/regions";
import { safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import styles from "@/app/[region]/region.module.css";

export function regionMetadata(slug: string): Metadata {
  if (!isRegionSlug(slug)) return {};

  const region = regions[slug];
  const content = regionContent[slug];
  if (!content) return {};

  return {
    title: `${region.name} Accounting`,
    description: content.intro,
    alternates: {
      canonical: region.path,
      languages: getRegionAlternates(),
    },
    openGraph: {
      title: `${region.name} Accounting | ${siteConfig.name}`,
      description: content.intro,
      url: region.path,
      locale: region.locale.replace("-", "_"),
    },
  };
}

export function RegionPage({ slug }: { slug: RegionSlug }) {
  const region = regions[slug];
  const content = regionContent[slug];
  const packageSet = regionalPackages[slug];
  if (!content) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${region.name} accounting services`,
        serviceType: "Accounting services",
        url: `${siteConfig.url}${region.path}`,
        description: content.intro,
        areaServed: {
          "@type": "Country",
          name: region.name,
        },
        provider: {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
          legalName: siteConfig.legalName,
          url: siteConfig.url,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          {
            "@type": "ListItem",
            position: 2,
            name: region.name,
            item: `${siteConfig.url}${region.path}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />

      <section className={`section-pad ${styles.hero}`}>
        <p className="eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p className={styles.heroIntro}>{content.intro}</p>
        <div className={styles.heroActions}>
          <Link className="button button-dark" href={{ pathname: "/contact", query: { region: slug } }}>
            Talk to us <span aria-hidden="true">↗</span>
          </Link>
          <a className="button button-quiet" href="#regional-packages">
            View local packages <span aria-hidden="true">↓</span>
          </a>
        </div>
        <small>{content.reviewed}</small>
      </section>

      <section className={`section-pad ${styles.servicesSection}`}>
        <div className={styles.sectionHeading}>
          <p className="eyebrow">What we handle</p>
          <h2>Built around how you operate in {region.name}.</h2>
        </div>
        <div className={styles.serviceGrid}>
          {content.services.map((service) => (
            <article className={styles.serviceCard} key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.items.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={`section-pad ${styles.packagesSection}`} id="regional-packages">
        <div className={styles.sectionHeading}>
          <p className="eyebrow">{region.name} packages</p>
          <h2>Local scope. Local currency. Clear monthly pricing.</h2>
          <p className={styles.sectionIntro}>
            These packages are built around the recurring filing and bookkeeping workload in {region.name}, rather than converting another country&apos;s prices.
          </p>
        </div>
        <div className={styles.packageGrid}>
          {packageSet.packages.map((item) => (
            <article className={`${styles.packageCard} ${item.popular ? styles.packagePopular : ""}`} key={item.name}>
              {item.popular && <span className={styles.popularLabel}>Popular</span>}
              <h3>{item.name}</h3>
              <p>{item.strap}</p>
              <div className={styles.packagePrice}>
                <strong>{formatRegionalPrice(packageSet.currency, item.price)}</strong>
                <span>{item.billing === "one-off" ? "one-off" : "/ month"}</span>
              </div>
              <ul>
                {item.features.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}
              </ul>
              {item.limit && <small>{item.limit}</small>}
            </article>
          ))}
        </div>
        <div className={styles.packageFooter}>
          <p>{packageSet.note}</p>
          <Link className="button button-dark" href={{ pathname: "/contact", query: { region: slug, enquiry: "Packages & pricing" } }}>
            Ask about {region.name} packages <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className={`section-pad ${styles.complianceSection}`}>
        <div className={styles.sectionHeading}>
          <p className="eyebrow">Local compliance</p>
          <h2>The Irish filings behind the work.</h2>
        </div>
        <div className={styles.complianceList}>
          {content.compliance.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <div>
                <small>{item.label}</small>
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`section-pad ${styles.faqSection}`}>
        <div className={styles.sectionHeading}>
          <p className="eyebrow">{region.name} FAQs</p>
          <h2>Useful answers before you get in touch.</h2>
        </div>
        <div className={styles.faqList}>
          {content.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}<span aria-hidden="true">+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={`section-pad ${styles.cta}`}>
        <p className="eyebrow">{region.name}</p>
        <h2>Tell us what you need help with.</h2>
        <p>Share the business type, where you are based and any deadline already in view. We will route the enquiry to the right scope.</p>
        <Link className="button button-dark" href={{ pathname: "/contact", query: { region: slug } }}>
          Contact Shiel <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}
