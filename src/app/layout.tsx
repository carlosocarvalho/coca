import type { Metadata } from 'next';
import Script from 'next/script';
import { copy } from './copy';
import './globals.css';

const goatcounterCode = process.env.NEXT_PUBLIC_GOATCOUNTER ?? '';

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    type: 'website',
    locale: 'pt_BR',
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
