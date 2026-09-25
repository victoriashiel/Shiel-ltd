import type { Metadata } from "next";
import { PackagesClient } from "./packages-client";
import { safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accounting Packages & Pricing",
  description:
    "Monthly accounting packages and one-off setup offers for companies, contractors, sole traders and e-commerce businesses in Ireland, the UK and Gibraltar, with bookkeeping, payroll, tax and compliance support.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Accounting Packages & Pricing | Shiel Accountants",
    description:
      "Clear monthly accounting packages and one-off startup offers with published limits, a named accountant and no long-term lock-in.",
    url: "/packages",
  },
};

const packagesSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteConfig.url}/packages#webpage`,
  url: `${siteConfig.url}/packages`,
  name: "Accounting Packages & Pricing | Shiel Accountants",
  description:
    "Choose Ireland, the United Kingdom or Gibraltar, then select your trade type to see the relevant accounting packages.",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  about: { "@id": `${siteConfig.url}/#organization` },
  inLanguage: "en-GB",
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
