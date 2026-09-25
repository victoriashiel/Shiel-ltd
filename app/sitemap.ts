import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url },
    ...services.map((service) => ({
      url: `${siteConfig.url}/${service.slug}`,
    })),
    { url: `${siteConfig.url}/accounts` },
    { url: `${siteConfig.url}/tax` },
    { url: `${siteConfig.url}/bookkeeping` },
    { url: `${siteConfig.url}/payroll` },
    { url: `${siteConfig.url}/advisory` },
    { url: `${siteConfig.url}/company-formation` },
    { url: `${siteConfig.url}/who-we-help/limited-companies` },
    { url: `${siteConfig.url}/who-we-help/sole-traders` },
    { url: `${siteConfig.url}/who-we-help/contractors-freelancers` },
    { url: `${siteConfig.url}/who-we-help/ecommerce-sellers` },
    { url: `${siteConfig.url}/packages` },
    ...["ireland", "united-kingdom", "gibraltar"].flatMap((country) => [
      { url: `${siteConfig.url}/packages/${country}` },
      ...["limited-company", "sole-trader", "contractor", "ecommerce"].map((trade) => ({
        url: `${siteConfig.url}/packages/${country}/${trade}`,
      })),
    ]),
    { url: `${siteConfig.url}/contact` },
    { url: `${siteConfig.url}/privacy` },
    { url: `${siteConfig.url}/cookies` },
    { url: `${siteConfig.url}/terms` },
  ];
}
