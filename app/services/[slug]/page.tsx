import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serviceBySlug, services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title: `${service.title} | Shiel`, description: service.summary, url: `/services/${slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        provider: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url },
        areaServed: ["Europe", "Worldwide"],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
          { "@type": "ListItem", position: 3, name: service.title, item: `${siteConfig.url}/services/${service.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="page-hero section-pad service-hero">
        <Link href="/services" className="back-link">← All services</Link>
        <p className="eyebrow">{service.eyebrow}</p>
        <h1>{service.title}</h1>
        <p>{service.summary}</p>
      </section>
      <section className="section-pad service-detail-grid">
        <div className="service-detail-copy reveal"><p className="eyebrow">The work</p><h2>Keep the important parts connected.</h2><p>{service.description}</p></div>
        <div className="included-panel reveal">
          <p className="panel-label">Typical scope</p>
          <ul>{service.included.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
        </div>
      </section>
      <section className="section-pad outcome-section">
        <p className="eyebrow">What this should give you</p>
        <div className="outcome-grid">{service.outcomes.map((item, index) => <article className="outcome-card reveal" key={item}><span>0{index + 1}</span><h3>{item}</h3></article>)}</div>
      </section>
      <section className="cta-panel section-pad reveal"><p className="eyebrow">Discuss {service.title.toLowerCase()}</p><h2>Bring us the current picture.</h2><p>We can look at what is already in place, what is due and what would make the process cleaner from here.</p><Link className="button button-dark" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></section>
    </>
  );
}
