import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ContactPageContent,
  type ContactSearchParams,
} from "@/components/contact-page-content";
import { isRegionSlug, regions } from "@/lib/regions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  if (!isRegionSlug(region)) return {};

  const market = regions[region];

  return {
    title: `Contact Shiel ${market.name}`,
    description: `Contact Shiel Accountants about accounting, tax, payroll, advisory and package support in ${market.name}.`,
    alternates: {
      canonical: `${market.path}/contact`,
      languages: {
        "en-IE": `${regions.ie.path}/contact`,
        "en-GB": `${regions.uk.path}/contact`,
        "en-AE": `${regions.ae.path}/contact`,
        "en-GI": `${regions.gi.path}/contact`,
        "en-ES": `${regions.es.path}/contact`,
        "x-default": "/contact",
      },
    },
  };
}

export default async function RegionalContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ region: string }>;
  searchParams: ContactSearchParams;
}) {
  const { region } = await params;
  if (!isRegionSlug(region)) notFound();

  return <ContactPageContent searchParams={searchParams} region={region} />;
}
