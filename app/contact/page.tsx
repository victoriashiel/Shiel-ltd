import type { Metadata } from "next";
import {
  ContactPageContent,
  type ContactSearchParams,
} from "@/components/contact-page-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Shiel Accountants about tax and compliance, bookkeeping and payroll, advisory and growth, international accounting, or monthly accounting packages.",
  alternates: { canonical: "/contact" },
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
