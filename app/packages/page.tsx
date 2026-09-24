import type { Metadata } from "next";
import { PackagesClient } from "./packages-client";
import { segments } from "./packages-data";
import { safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accounting Packages & Pricing",
  description:
    "Monthly accounting packages for Irish limited companies, contractors, sole traders and e-commerce businesses, with bookkeeping, payroll, tax and compliance support.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Accounting Packages & Pricing | Shiel Accountants",
    description:
      "Clear monthly accounting packages with published limits, a named accountant and no long-term lock-in.",
    url: "/packages",
  },
};

const packageOffers = segments.flatMap((segment) =>
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

const packagesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/packages#webpage`,
      url: `${siteConfig.url}/packages`,
      name: "Accounting Packages & Pricing | Shiel Accountants",
      description:
        "Monthly accounting packages for limited companies, contractors, sole traders and e-commerce businesses.",
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: "en-GB",
    },
    {
      "@type": "ItemList",
      "@id": `${siteConfig.url}/packages#packages`,
      name: "Shiel Accountants monthly accounting packages",
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
