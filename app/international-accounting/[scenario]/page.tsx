import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InternationalScenarioPage } from "@/components/international-scenarios";
import {
  internationalScenarioList,
  isInternationalScenarioSlug,
} from "@/lib/international-scenarios";

export function generateStaticParams() {
  return internationalScenarioList.map((scenario) => ({ scenario: scenario.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ scenario: string }>;
}): Promise<Metadata> {
  const { scenario } = await params;
  if (!isInternationalScenarioSlug(scenario)) return {};

  const item = internationalScenarioList.find((entry) => entry.slug === scenario);
  if (!item) return {};

  return {
    title: item.eyebrow,
    description: item.summary,
    alternates: {
      canonical: `/international-accounting/${item.slug}`,
    },
    openGraph: {
      title: `${item.eyebrow} | Shiel Accountants`,
      description: item.summary,
      url: `/international-accounting/${item.slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ scenario: string }>;
}) {
  const { scenario } = await params;
  if (!isInternationalScenarioSlug(scenario)) notFound();

  return <InternationalScenarioPage slug={scenario} />;
}
