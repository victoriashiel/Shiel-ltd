import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RegionPage, regionMetadata } from "@/components/region-page";
import { regionContent } from "@/lib/region-content";
import { isRegionSlug, type RegionSlug } from "@/lib/regions";

export function generateStaticParams() {
  return Object.keys(regionContent).map((region) => ({ region }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  return regionMetadata(region);
}

export default async function Page({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  if (!isRegionSlug(region) || !regionContent[region]) notFound();

  return <RegionPage slug={region as RegionSlug} />;
}
