import type { Metadata } from 'next';
import Link from 'next/link';
import { copy } from '../copy';

export const metadata: Metadata = {
  title: 'Recebido — COCA',
  description: copy.form.success,
  robots: { index: false, follow: false },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Obrigado() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Recebido</p>
        <h1>{copy.thankYou.title}</h1>
        <p className="lede">{copy.thankYou.body}</p>
        <Link className="cta" href={`${basePath}/`}>
          {copy.thankYou.backCta}
        </Link>
      </section>
    </main>
  );
}
