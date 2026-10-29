import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: site.name,
    short_name: 'Shiel',
    description: site.description,
    start_url: '/?source=pwa',
    scope: '/',
    display: 'standalone',
    display_override: ['standalone', 'minimal-ui'],
    orientation: 'portrait',
    background_color: '#0b1718',
    theme_color: '#0b1718',
    categories: ['business', 'finance', 'productivity'],
    lang: 'en-IE',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    shortcuts: [
      { name: 'Find my package', url: '/packages#finder' },
      { name: 'Corporation tax calculator', url: '/tools/corporation-tax-calculator' },
      { name: 'Filing deadlines', url: '/tools/filing-deadlines' },
      { name: 'Talk to us', url: '/contact' },
    ],
  };
}
