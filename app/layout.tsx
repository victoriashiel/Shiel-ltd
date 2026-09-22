import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";
import { safeJsonLd } from "@/lib/seo";
import "./globals.css";
import "./polish.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Shiel | Modern accountancy for business across borders",
    template: "%s | Shiel",
  },
  description: siteConfig.description,
  category: "accounting",
  alternates: { canonical: "/" },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Shiel | Modern accountancy for business across borders",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiel | Modern accountancy for business across borders",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f5f0",
  colorScheme: "light",
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.legalName,
      alternateName: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      description: siteConfig.description,
      areaServed: ["Europe", "Worldwide"],
      knowsAbout: [
        "Company accounts",
        "Tax compliance",
        "VAT",
        "Payroll",
        "Bookkeeping",
        "Management accounts",
        "Cross-border accounting",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: "en-GB",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(organisationSchema) }}
        />
      </body>
    </html>
  );
}
