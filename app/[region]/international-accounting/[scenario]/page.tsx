import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InternationalScenarioPage } from "@/components/international-scenarios";
import {
  internationalScenarioList,
  isInternationalScenarioSlug,
} from "@/lib/international-scenarios";
import { isRegionSlug, regions, regionSlugs } from "@/lib/regions";

export function generateStaticParams() {
  return regionSlugs.flatMap((region) =>
    internationalScenarioList.map((scenario) => ({
      region,
      scenario: scenario.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; scenario: string }>;
}): Promise<Metadata> {
  const { region, scenario } = await params;
  if (!isRegionSlug(region) || !isInternationalScenarioSlug(scenario)) return {};

  const market = regions[region];
  const item = internationalScenarioList.find((entry) => entry.slug === scenario);
  if (!item) return {};

  return {
    title: `${item.eyebrow} | ${market.name}`,
    description: item.summary,
    alternates: {
      canonical: `${market.path}/international-accounting/${item.slug}`,
      languages: {
        "en-IE": `${regions.ie.path}/international-accounting/${item.slug}`,
        "en-GB": `${regions.uk.path}/international-accounting/${item.slug}`,
        "en-AE": `${regions.ae.path}/international-accounting/${item.slug}`,
        "en-GI": `${regions.gi.path}/international-accounting/${item.slug}`,
        "en-ES": `${regions.es.path}/international-accounting/${item.slug}`,
        "x-default": `/international-accounting/${item.slug}`,
      },
    },
    openGraph: {
      title: `${item.eyebrow} | Shiel ${market.name}`,
      description: item.summary,
      url: `${market.path}/international-accounting/${item.slug}`,
      locale: market.locale.replace("-", "_"),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ region: string; scenario: string }>;
}) {
  const { region, scenario } = await params;
  if (!isRegionSlug(region) || !isInternationalScenarioSlug(scenario)) notFound();

  const market = regions[region];

  return (
    <InternationalScenarioPage
      slug={scenario}
      regionPath={market.path}
      regionName={market.name}
    />
  );
}
