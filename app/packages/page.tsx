import type { Metadata } from "next";
import { PackagesClient } from "./packages-client";
import { segments } from "./packages-data";
import { safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accounting Packages & Pricing",
  description:
    "Monthly accounting packages and one-off setup offers for Irish limited companies, contractors, sole traders and e-commerce businesses, with bookkeeping, payroll, tax and compliance support.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Accounting Packages & Pricing | Shiel Accountants",
    description:
      "Clear monthly accounting packages and one-off startup offers with published limits, a named accountant and no long-term lock-in.",
    url: "/packages",
  },
};

const monthlyOffers = segments.flatMap((segment) =>
  segment.plans.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    category: segment.label,
    price: plan.price,
    priceCurrency: "EUR",
    url: `${siteConfig.url}/packages`,
    offeredBy: { "@id": `${siteConfig.url}/#organization` },
    description: plan.strap,
  })),
);

const setupOffers = segments.flatMap((segment) => {
  const offers = [];

  if (segment.setupOffer) {
    const price = Number(segment.setupOffer.priceLabel.match(/€([0-9]+)/)?.[1] ?? 0);
    offers.push({
      "@type": "Offer",
      name: segment.setupOffer.name,
      category: `${segment.label} setup`,
      price,
      priceCurrency: "EUR",
      url: `${siteConfig.url}/packages`,
      offeredBy: { "@id": `${siteConfig.url}/#organization` },
      description: segment.setupOffer.strap,
    });
  }

  if (segment.advisoryOffer) {
    const price = Number(segment.advisoryOffer.priceLabel.match(/€([0-9]+)/)?.[1] ?? 0);
    offers.push({
      "@type": "Offer",
      name: segment.advisoryOffer.name,
      category: `${segment.label} advisory`,
      price,
      priceCurrency: "EUR",
      url: `${siteConfig.url}/packages`,
      offeredBy: { "@id": `${siteConfig.url}/#organization` },
      description: segment.advisoryOffer.strap,
    });
  }

  return offers;
});

const packageOffers = [...monthlyOffers, ...setupOffers];

const packagesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/packages#webpage`,
      url: `${siteConfig.url}/packages`,
      name: "Accounting Packages & Pricing | Shiel Accountants",
      description:
        "Monthly accounting packages and one-off setup offers for limited companies, contractors, sole traders and e-commerce businesses.",
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: "en-GB",
    },
    {
      "@type": "ItemList",
      "@id": `${siteConfig.url}/packages#packages`,
      name: "Shiel Accountants accounting packages",
      numberOfItems: packageOffers.length,
      itemListElement: packageOffers.map((offer, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: offer,
      })),
    },
  ],
};

export default function PackagesPage() {
  return (
    <>
      <PackagesClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(packagesSchema) }}
      />
    </>
  );
}
