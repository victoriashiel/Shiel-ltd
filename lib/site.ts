export const siteConfig = {
  name: "Shiel Accountants",
  shortName: "Shiel",
  legalName: "Shiel Ltd",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shiel.ltd",
  whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || "+1 (332) 355-6072",
  whatsappHref: process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/13323556072",
  description:
    "Accountants serving companies in Ireland, the UK and Gibraltar, with selective international support for other jurisdictions on a case-by-case basis.",
};

export const navigation = [
  { href: "/tax-compliance", label: "Tax & compliance" },
  { href: "/bookkeeping-payroll", label: "Bookkeeping & payroll" },
  { href: "/advisory-growth", label: "Advisory & growth" },
  { href: "/international-accounting", label: "International" },
  { href: "/packages", label: "Packages" },
];
