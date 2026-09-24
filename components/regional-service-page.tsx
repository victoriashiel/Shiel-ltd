import type { Metadata } from "next";
import { FocusServicePage } from "@/components/focus-service-page";
import { regionalServices, type RegionalServiceSlug } from "@/lib/regional-services";
import { regions, type RegionSlug } from "@/lib/regions";
import { safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import styles from "@/app/[region]/[service]/regional-service.module.css";

export function regionalServiceMetadata(
  region: RegionSlug,
  service: RegionalServiceSlug,
): Metadata {
  const market = regions[region];
  const content = regionalServices[region][service];

  return {
    title: content.title,
    description: content.summary,
    alternates: {
      canonical: `${market.path}/${service}`,
      languages: {
        "en-IE": `${regions.ie.path}/${service}`,
        "en-GB": `${regions.uk.path}/${service}`,
        "en-AE": `${regions.ae.path}/${service}`,
        "en-GI": `${regions.gi.path}/${service}`,
        "en-ES": `${regions.es.path}/${service}`,
        "x-default": `/${service}`,
      },
    },
    openGraph: {
      title: `${content.title} | Shiel Accountants`,
      description: content.summary,
      url: `${market.path}/${service}`,
      locale: market.locale.replace("-", "_"),
    },
  };
}

export function RegionalServicePage({
  region,
  service,
}: {
  region: RegionSlug;
  service: RegionalServiceSlug;
}) {
  const market = regions[region];
  const local = regionalServices[region][service];

  const serviceOverride = {
    slug: service,
    title: local.title,
    eyebrow: local.eyebrow,
    summary: local.summary,
    description: local.description,
    outcomes: local.outcomes,
    included: local.included,
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: local.title,
        description: local.summary,
        url: `${siteConfig.url}${market.path}/${service}`,
        serviceType: local.title,
        areaServed: {
          "@type": "Country",
          name: market.name,
        },
        provider: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          {
            "@type": "ListItem",
            position: 2,
            name: market.name,
            item: `${siteConfig.url}${market.path}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: local.title,
            item: `${siteConfig.url}${market.path}/${service}`,
          },
        ],
      },
    ],
  };

  const localContext = (
    <section className={`section-pad ${styles.localContext}`}>
      <div>
        <p className="eyebrow">{market.name} context</p>
        <h2>Built around the local reporting environment.</h2>
        <p>
          The service structure stays familiar across Shiel, but the filings, terminology and working papers change with the jurisdiction.
        </p>
      </div>
      <div className={styles.contextGrid}>
        {local.localContext.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />
      <FocusServicePage
        slug={service}
        serviceOverride={serviceOverride}
        contactHref={`${market.path}/contact`}
        backHref={`${market.path}#services`}
        includeSchema={false}
        beforeCta={localContext}
      />
    </>
  );
}
