import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { allRoutes } from '@/lib/routes';
import { ogKey } from '@/lib/seo';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return allRoutes().map((r) => ({ image: `${ogKey(r.path)}.png` }));
}

const font = (w: number) => readFile(join(process.cwd(), `node_modules/@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-${w}-normal.woff`));

export async function GET(_: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  const route = allRoutes().find((r) => `${ogKey(r.path)}.png` === image)!;
  const parts = route.headline.split(/\*([^*]+)\*/g);
  const [w600, w800] = await Promise.all([font(600), font(800)]);
  const size = route.headline.length > 60 ? 64 : route.headline.length > 40 ? 76 : 88;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#0b1718', color: '#f6f5f0', fontFamily: 'Schibsted', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -220, right: -160, width: 720, height: 720, borderRadius: 720, background: 'radial-gradient(circle, rgba(33,160,154,0.45), rgba(33,160,154,0) 65%)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: -300, left: -200, width: 700, height: 700, borderRadius: 700, background: 'radial-gradient(circle, rgba(181,83,62,0.28), rgba(181,83,62,0) 65%)', display: 'flex' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="16" fill="#f6f5f0" />
            <path d="M18 20.5c0-5 4.2-8.5 10.7-8.5 5.1 0 9.1 1.7 12.1 4.7l-5.2 5.6c-1.8-1.8-4.1-2.8-6.8-2.8-2.3 0-3.6.8-3.6 2.1 0 1.5 1.7 2.1 6.3 3.4 7.3 2 11.3 5.1 11.3 11.7 0 8.5-6.8 13.3-15.5 13.3-6.7 0-12.1-2.4-15.7-6.4l5.6-5.6c2.7 2.9 6.1 4.5 10.2 4.5 4 0 6.1-1.6 6.1-4.2 0-2.1-1.7-3.1-6.7-4.5C20.8 32 18 28.5 18 20.5Z" fill="#0b1718" />
            <circle cx="48" cy="47" r="4" fill="#21a09a" />
          </svg>
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 800 }}>
            Shiel<span style={{ color: '#21a09a' }}>.</span>
          </div>
          <div style={{ display: 'flex', marginLeft: 'auto', fontSize: 24, fontWeight: 600, color: '#a9bbb8', border: '2px solid rgba(246,245,240,0.18)', borderRadius: 999, padding: '8px 22px' }}>{route.section}</div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: size, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2.5, maxWidth: 1020 }}>
          {parts.map((p, i) => (
            <span key={i} style={{ color: i % 2 ? '#6fd6cb' : '#f6f5f0', whiteSpace: 'pre-wrap' }}>
              {p}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 26, fontWeight: 600, color: '#a9bbb8' }}>
          <span>shiel.ltd · Ireland · United Kingdom · Gibraltar</span>
          <span style={{ display: 'flex', background: '#d4a24c', color: '#0b1718', borderRadius: 999, padding: '12px 28px' }}>Named accountant · Fixed fees</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Schibsted', data: w600, weight: 600, style: 'normal' },
        { name: 'Schibsted', data: w800, weight: 800, style: 'normal' },
      ],
    },
  );
}
