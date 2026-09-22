export const siteConfig = {
  name: "Shiel",
  legalName: "Shiel Ltd",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shiel.ltd",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@shiel.ltd",
  description:
    "European-based accountancy for businesses and individuals operating across borders. Clear accounting, tax, payroll and compliance support backed by 10+ years of experience.",
};

export const navigation = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];
