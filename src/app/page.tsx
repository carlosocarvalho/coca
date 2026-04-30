const buildSha = process.env.NEXT_PUBLIC_BUILD_SHA ?? 'dev';

export default function Home() {
  return (
    <main>
      <h1>COCA — hello world</h1>
      <p>
        We help struggling projects grow and develop new trends. This page exists
        so the next engineer can verify the spine works end-to-end.
      </p>
      <dl>
        <dt>Build</dt>
        <dd>
          <code>{buildSha}</code>
        </dd>
        <dt>Repo</dt>
        <dd>
          <a href="https://github.com/carlosocarvalho/coca">
            github.com/carlosocarvalho/coca
          </a>
        </dd>
      </dl>
    </main>
  );
}
