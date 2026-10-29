import type { Metadata, Viewport } from 'next';
import { Figtree, Instrument_Serif, Schibsted_Grotesk } from 'next/font/google';
import './globals.css';
import { Shell } from '@/components/shell/shell';
import { Footer } from '@/components/shell/footer';
import { JsonLd } from '@/components/ui/primitives';
import { INDEXABLE, site } from '@/lib/site';
import { organizationLd, websiteLd } from '@/lib/seo';

const display = Schibsted_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-schibsted', display: 'swap' });
const body = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: 'italic', variable: '--font-instrument', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Ireland, UK & Gibraltar`, template: `%s | ${site.shortName}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  appleWebApp: { capable: true, title: 'Shiel', statusBarStyle: 'black-translucent' },
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }], apple: '/icons/apple-touch-icon.png' },
  robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  other: { 'msapplication-TileColor': '#0b1718' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0b1718' },
    { media: '(prefers-color-scheme: dark)', color: '#040b0c' },
  ],
};

// Applies a saved theme before first paint so there is no flash.
const themeScript = `try{var t=localStorage.getItem('shiel-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IE" className={`${display.variable} ${body.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={organizationLd()} />
        <JsonLd data={websiteLd()} />
      </head>
      <body>
        <Shell>
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </Shell>
      </body>
    </html>
  );
}
