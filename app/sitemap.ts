import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url },
    ...services.map((service) => ({
      url: `${siteConfig.url}/${service.slug}`,
    })),
    { url: `${siteConfig.url}/privacy` },
    { url: `${siteConfig.url}/cookies` },
    { url: `${siteConfig.url}/terms` },
  ];
}
