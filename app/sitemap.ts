import type { MetadataRoute } from 'next';
import { allRoutes } from '@/lib/routes';
import { absolute, site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes().map((r) => ({ url: absolute(r.path), lastModified: site.updated, changeFrequency: r.section === 'Legal' ? 'yearly' : 'monthly', priority: r.priority }));
}
