import { copy } from './copy';
import SubmitForm from './submit-form';

const buildSha = process.env.NEXT_PUBLIC_BUILD_SHA ?? 'dev';

export default function Home() {
  return (
    <>
      <main>
        <section className="hero">
          <p className="eyebrow">{copy.hero.eyebrow}</p>
          <h1>{copy.hero.title}</h1>
          <p className="lede">{copy.hero.subtitle}</p>
          <a className="cta" href="#contato">
            {copy.hero.primaryCta}
          </a>
        </section>

        <section className="block">
          <h2>{copy.deliverables.title}</h2>
          <ul className="deliverables">
            {copy.deliverables.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="block price">
          <h2>{copy.price.title}</h2>
          <p className="price-amount">
            <strong>{copy.price.amount}</strong>{' '}
            <span className="price-cadence">{copy.price.cadence}</span>
          </p>
          <ul className="price-notes">
            {copy.price.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>

        <section className="block" id="contato">
          <h2>{copy.form.title}</h2>
          <p className="lede">{copy.form.helper}</p>
          <SubmitForm />
        </section>
      </main>

      <footer>
        <span>
          <a href={copy.footer.repoUrl}>{copy.footer.repoLabel}</a>
        </span>
        <span>
          <a href={`mailto:${copy.footer.contactEmail}`}>
            {copy.footer.contactLabel}: {copy.footer.contactEmail}
          </a>
        </span>
        <span className="build">
          build <code>{buildSha}</code>
        </span>
      </footer>
    </>
  );
}
