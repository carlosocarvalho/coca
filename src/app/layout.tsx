import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'COCA — hello world',
  description: 'COCA helps struggling projects grow and develop new trends.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
