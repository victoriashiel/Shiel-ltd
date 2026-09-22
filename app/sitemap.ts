import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/about", "/insights", "/contact", "/privacy", "/cookies", "/terms"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
    })),
    ...services.map((service) => ({
      url: `${siteConfig.url}/services/${service.slug}`,
    })),
  ];
}
