import type { MetadataRoute } from 'next';
import { INDEXABLE, site } from '@/lib/site';

export const dynamic = 'force-static';

// The preview stays out of search engines; production welcomes search and AI crawlers.
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'Claude-SearchBot', 'Claude-User', 'Applebot'], allow: '/' },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
