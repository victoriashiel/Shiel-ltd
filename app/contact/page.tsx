import type { Metadata } from "next";
import {
  ContactPageContent,
  type ContactSearchParams,
} from "@/components/contact-page-content";
import { regions } from "@/lib/regions";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Shiel Accountants about tax and compliance, bookkeeping and payroll, advisory and growth, international accounting, or monthly accounting packages.",
  alternates: {
    canonical: "/contact",
    languages: {
      "en-IE": `${regions.ie.path}/contact`,
      "en-GB": `${regions.uk.path}/contact`,
      "en-AE": `${regions.ae.path}/contact`,
      "en-GI": `${regions.gi.path}/contact`,
      "en-ES": `${regions.es.path}/contact`,
      "x-default": "/contact",
    },
  },
  openGraph: {
    title: "Contact | Shiel Accountants",
    description:
      "Get in touch with Shiel Accountants through the enquiry form or WhatsApp.",
    url: "/contact",
  },
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: ContactSearchParams;
}) {
  return <ContactPageContent searchParams={searchParams} />;
}
