import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { serviceBySlug, type Service } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { safeJsonLd } from "@/lib/seo";

export function serviceMetadata(slug: string): Metadata {
  const service = serviceBySlug[slug];

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.summary,
      url: `/${service.slug}`,
    },
  };
}

export function FocusServicePage({
  slug,
  beforeCta,
  serviceOverride,
  contactHref = "/contact",
}: {
  slug: string;
  beforeCta?: ReactNode;
  serviceOverride?: Service;
  contactHref?: string;
}) {
  const service = serviceOverride ?? serviceBySlug[slug];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        serviceType: service.title,
        url: `${siteConfig.url}/${service.slug}`,
        description: service.summary,
        provider: {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
          legalName: siteConfig.legalName,
          url: siteConfig.url,
        },
        areaServed: ["Europe", "Worldwide"],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          {
            "@type": "ListItem",
            position: 2,
            name: service.title,
            item: `${siteConfig.url}/${service.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />

      <section className="page-hero section-pad service-hero">
        <Link href="/#services" className="back-link">← Services</Link>
        <p className="eyebrow">{service.eyebrow}</p>
        <h1>{service.title}</h1>
        <p>{service.summary}</p>
      </section>

      <section className="section-pad service-detail-grid">
        <div className="service-detail-copy reveal">
          <p className="eyebrow">What we handle</p>
          <h2>Useful accounting starts with the underlying work being right.</h2>
          <p>{service.description}</p>
        </div>
        <div className="included-panel reveal">
          <p className="panel-label">Typical scope</p>
          <ul>
            {service.included.map((item) => (
              <li key={item}><span>✓</span>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad outcome-section">
        <p className="eyebrow">What this should give you</p>
        <div className="outcome-grid">
          {service.outcomes.map((item, index) => (
            <article className="outcome-card reveal" key={item}>
              <span>0{index + 1}</span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      {beforeCta}

      <section className="cta-panel section-pad reveal">
        <p className="eyebrow">Ask about {service.title.toLowerCase()}</p>
        <h2>Send us the situation on WhatsApp.</h2>
        <p>A short message is enough to start. Tell us where you are based, what you need help with and any deadline already in view.</p>
        <a
          className="button button-whatsapp"
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp {siteConfig.whatsappDisplay} <span aria-hidden="true">↗</span>
        </a>
      </section>
    </>
  );
}
