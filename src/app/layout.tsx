import type { Metadata } from 'next';
import Script from 'next/script';
import { copy } from './copy';
import './globals.css';

const goatcounterCode = process.env.NEXT_PUBLIC_GOATCOUNTER ?? '';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const siteOrigin = 'https://carlosocarvalho.github.io';
const siteUrl = `${siteOrigin}${basePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: copy.meta.title,
  description: copy.meta.description,
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: 'any' },
      { url: `${basePath}/icon.png`, type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: `${basePath}/apple-touch-icon.png`, sizes: '180x180' }],
  },
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    type: 'website',
    locale: 'pt_BR',
    url: `${siteUrl}/`,
    siteName: 'COCA Corp',
    images: [
      {
        url: `${basePath}/og-image.png`,
        width: 1200,
        height: 630,
        alt: copy.meta.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: copy.meta.title,
    description: copy.meta.description,
    images: [`${basePath}/og-image.png`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        {goatcounterCode && (
          <Script
            src="//gc.zgo.at/count.js"
            data-goatcounter={`https://${goatcounterCode}.goatcounter.com/count`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
