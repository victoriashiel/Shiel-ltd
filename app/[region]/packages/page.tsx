import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackagesClient } from "@/app/packages/packages-client";
import { RegionalPackagesPage } from "@/components/regional-packages-page";
import { regionalPackages } from "@/lib/regional-packages";
import { getRegionAlternates, isRegionSlug, regions, type RegionSlug } from "@/lib/regions";

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

  if (region === "ireland") {
    return <PackagesClient region="ireland" />;
  }

  return <RegionalPackagesPage slug={region as RegionSlug} />;
}
