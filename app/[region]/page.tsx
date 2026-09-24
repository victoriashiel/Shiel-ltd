import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RegionalHomePage } from "@/components/regional-home-page";
import { regionContent } from "@/lib/region-content";
import { getRegionAlternates, isRegionSlug, regions } from "@/lib/regions";

export function generateStaticParams() {
  return Object.keys(regionContent).map((region) => ({ region }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  if (!isRegionSlug(region)) return {};

  const market = regions[region];
  const content = regionContent[region];

  return {
    title: `${market.name} Accounting`,
    description: content.intro,
    alternates: {
      canonical: market.path,
      languages: getRegionAlternates(),
    },
    openGraph: {
      title: `${market.name} Accounting | Shiel Accountants`,
      description: content.intro,
      url: market.path,
      locale: market.locale.replace("-", "_"),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  if (!isRegionSlug(region)) notFound();

  return <RegionalHomePage region={region} />;
}
