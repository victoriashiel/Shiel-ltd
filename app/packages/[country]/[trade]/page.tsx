import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackagesClient, type PackageCountry } from "../../packages-client";
import type { Segment } from "../../packages-data";

const countryNames: Record<PackageCountry, string> = {
  ireland: "Ireland",
  "united-kingdom": "United Kingdom",
  gibraltar: "Gibraltar",
};

const tradeSegments: Record<string, { segment: Segment; label: string }> = {
  "limited-company": { segment: "company", label: "Limited Company" },
  "sole-trader": { segment: "sole-trader", label: "Sole Trader" },
  contractor: { segment: "contractor", label: "Contractor" },
  ecommerce: { segment: "ecommerce", label: "E-commerce" },
};

function isCountry(value: string): value is PackageCountry {
  return value === "ireland" || value === "united-kingdom" || value === "gibraltar";
}

export async function generateStaticParams() {
  return Object.keys(countryNames).flatMap((country) =>
    Object.keys(tradeSegments).map((trade) => ({ country, trade })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; trade: string }>;
}): Promise<Metadata> {
  const { country, trade } = await params;
  if (!isCountry(country) || !tradeSegments[trade]) return {};
  const countryName = countryNames[country];
  const tradeName = tradeSegments[trade].label;
  return {
    title: `${tradeName} Accounting Packages ${countryName}`,
    description: `Accounting packages and pricing for ${tradeName.toLowerCase()} clients in ${countryName}.`,
    alternates: { canonical: `/packages/${country}/${trade}` },
  };
}

export default async function TradePackagesPage({
  params,
}: {
  params: Promise<{ country: string; trade: string }>;
}) {
  const { country, trade } = await params;
  if (!isCountry(country) || !tradeSegments[trade]) notFound();

  return (
    <PackagesClient
      initialCountry={country}
      initialSegment={tradeSegments[trade].segment}
    />
  );
}
