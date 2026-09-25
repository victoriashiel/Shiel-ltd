import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackagesClient, type PackageCountry } from "../packages-client";

const countryNames: Record<PackageCountry, string> = {
  ireland: "Ireland",
  "united-kingdom": "United Kingdom",
  gibraltar: "Gibraltar",
};

function isCountry(value: string): value is PackageCountry {
  return value === "ireland" || value === "united-kingdom" || value === "gibraltar";
}

export async function generateStaticParams() {
  return Object.keys(countryNames).map((country) => ({ country }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  if (!isCountry(country)) return {};
  const name = countryNames[country];
  return {
    title: `Accounting Packages ${name}`,
    description: `Accounting packages and pricing for businesses in ${name}. Choose your trade type to see the relevant package options.`,
    alternates: { canonical: `/packages/${country}` },
  };
}

export default async function CountryPackagesPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  if (!isCountry(country)) notFound();
  return <PackagesClient initialCountry={country} />;
}
