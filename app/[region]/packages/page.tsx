import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackagesClient } from "@/app/packages/packages-client";
import { segments } from "@/app/packages/packages-data";
import { RegionalPackagesPage } from "@/components/regional-packages-page";
import { regionalPackages } from "@/lib/regional-packages";
import { getRegionAlternates, isRegionSlug, regions, type RegionSlug } from "@/lib/regions";
import { safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(regionalPackages).map((region) => ({ region }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  if (!isRegionSlug(region)) return {};

  const config = regions[region];

  return {
    title: `${config.name} Accounting Packages & Pricing`,
    description: `Accounting packages, local scope and pricing for businesses in ${config.name}.`,
    alternates: {
      canonical: `${config.path}/packages`,
      languages: Object.fromEntries(
        Object.entries(getRegionAlternates()).map(([locale, path]) => [
          locale,
          locale === "x-default" ? "/packages" : `${path}/packages`,
        ]),
      ),
    },
    openGraph: {
      title: `${config.name} Accounting Packages & Pricing | Shiel Accountants`,
      description: `Accounting packages, local scope and pricing for businesses in ${config.name}.`,
      url: `${config.path}/packages`,
      locale: config.locale.replace("-", "_"),
    },
  };
}

export default async function RegionalPackagesRoute({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  if (!isRegionSlug(region)) notFound();

  const slug = region as RegionSlug;
  const config = regions[slug];

  const offers = region === "ireland"
    ? segments.flatMap((segment) =>
        segment.plans.map((plan) => ({
          "@type": "Offer",
          name: plan.name,
          category: segment.label,
          price: plan.price,
          priceCurrency: "EUR",
          url: `${siteConfig.url}/ireland/packages`,
          description: plan.strap,
        })),
      )
    : regionalPackages[slug].packages.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        category: `${config.name} accounting`,
        price: plan.price,
        priceCurrency: regionalPackages[slug].currency,
        url: `${siteConfig.url}${config.path}/packages`,
        description: plan.strap,
      }));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}${config.path}/packages#webpage`,
        url: `${siteConfig.url}${config.path}/packages`,
        name: `${config.name} Accounting Packages & Pricing | Shiel Accountants`,
        inLanguage: config.locale,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.url}${config.path}/packages#packages`,
        name: `${config.name} accounting packages`,
        numberOfItems: offers.length,
        itemListElement: offers.map((offer, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: offer,
        })),
      },
    ],
  };

  return (
    <>
      {region === "ireland"
        ? <PackagesClient region="ireland" />
        : <RegionalPackagesPage slug={slug} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />
    </>
  );
}
