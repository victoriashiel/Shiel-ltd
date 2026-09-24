import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  RegionalServicePage,
  regionalServiceMetadata,
} from "@/components/regional-service-page";
import {
  isRegionalServiceSlug,
  regionalServiceSlugs,
} from "@/lib/regional-services";
import { isRegionSlug, regionSlugs } from "@/lib/regions";

export function generateStaticParams() {
  return regionSlugs.flatMap((region) =>
    regionalServiceSlugs.map((service) => ({ region, service })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; service: string }>;
}): Promise<Metadata> {
  const { region, service } = await params;
  if (!isRegionSlug(region) || !isRegionalServiceSlug(service)) return {};
  return regionalServiceMetadata(region, service);
}

export default async function Page({
  params,
}: {
  params: Promise<{ region: string; service: string }>;
}) {
  const { region, service } = await params;
  if (!isRegionSlug(region) || !isRegionalServiceSlug(service)) notFound();

  return <RegionalServicePage region={region} service={service} />;
}
