# COCA

We help struggling projects grow and develop new trends.

This repo is the technical foundation: TypeScript + Next.js, deployed to a public URL with green CI on every PR. The architecture and stack rationale live in the COCA-3 issue's `plan` document — read that before adding anything substantial.

- **Live site:** https://carlosocarvalho.github.io/coca/
- **Repo:** https://github.com/carlosocarvalho/coca

## Local setup (target: <15 min from zero)

You need **Node 20+** and **pnpm 9+**. If you only have `npm`, install pnpm first: `npm i -g pnpm@9`.

```bash
git clone https://github.com/carlosocarvalho/coca.git
cd coca
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start the Next dev server on port 3000 with hot reload. |
| `pnpm build` | Production build. Static-exports to `./out`. |
| `pnpm start` | Serve the production build (after `pnpm build`). |
| `pnpm lint` | ESLint via `eslint-config-next`. |
| `pnpm typecheck` | `tsc --noEmit` in strict mode. |

## How deploy works

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the static export and publishes it to GitHub Pages. The workflow uses GitHub's official OIDC-backed Pages deployment — no long-lived deploy tokens. Every PR runs `.github/workflows/ci.yml` (lint + typecheck + build) and must be green before merge.

The site is served from a sub-path (`/coca/`), so the Next config sets `basePath` from the `BASE_PATH` env. Local dev leaves it empty.

## Secrets

There are no app secrets today. When we add any, they go into:

- **GitHub Actions secrets** → `Settings → Secrets and variables → Actions` (for CI/deploy-only secrets).
- **Repository environments** → for the production environment (gated deploys).

Never commit secrets to the repo. `.env` and `.env*.local` are gitignored.

## What's intentionally missing

The technical foundation deliberately ships small. These are tracked as COCA follow-ups, not lost:

- Postgres (Neon or Supabase free tier)
- Auth
- Observability (Sentry / OTel)
- Custom domain
- Migration from `carlosocarvalho/coca` to a dedicated GitHub org
- Migration from GitHub Pages to Vercel once we need server-side rendering

## License

MIT — see [LICENSE](./LICENSE).
