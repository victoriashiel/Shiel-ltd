import type { Metadata } from "next";
import { PackagesClient } from "./packages-client";

export const metadata: Metadata = {
  title: "Packages & pricing",
  description:
    "Transparent monthly accounting packages for Irish limited companies, contractors, sole traders and e-commerce businesses, with bookkeeping, tax, payroll and compliance support.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Packages & pricing | Shiel Accountants",
    description:
      "Clear monthly accounting packages with a named accountant, transparent limits and no long-term lock-in.",
    url: "/packages",
  },
};

export default function PackagesPage() {
  return <PackagesClient />;
}
