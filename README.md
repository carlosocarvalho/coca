# COCA

We help struggling open-source projects grow and develop new trends.

This repo serves the public landing at **https://carlosocarvalho.github.io/coca/** plus the inbound problem-submission form. Stack is TypeScript + Next.js 15 (App Router) static-exported to GitHub Pages. The architecture and stack rationale live in the `plan` documents on issues [COCA-3](/COCA/issues/COCA-3#document-plan) and [COCA-16](/COCA/issues/COCA-16#document-plan).

- **Live site:** https://carlosocarvalho.github.io/coca/
- **Repo:** https://github.com/carlosocarvalho/coca

## Editing the landing copy (no code review needed)

All visible copy lives in **one file**: [`src/app/copy.ts`](./src/app/copy.ts). Headline, deliverables, price, form labels, footer — every string is in that single object. Edit the values, commit to `main`, GitHub Actions redeploys.

If you only want to change wording, you do not need to touch any other file.

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

## Form submissions

The submission form on the landing page has two paths:

1. **Default (no setup):** the form opens the visitor's e-mail client preaddressed to `contato@carlosocarvalho.com.br` with the answers already filled in. Zero cost, zero third party — but it depends on the visitor having a mail client.
2. **Upgraded (recommended):** set `NEXT_PUBLIC_WEB3FORMS_KEY` to a Web3Forms access key. The form POSTs JSON to `https://api.web3forms.com/submit`, Web3Forms emails each submission to the address registered with the key, then the visitor is redirected to `/obrigado/`. Web3Forms' free tier is 250 submissions/month with no account beyond claiming the key.

To upgrade:

1. Go to https://web3forms.com, claim an access key against `contato@carlosocarvalho.com.br`.
2. Add it as a **repository variable** (not secret) named `NEXT_PUBLIC_WEB3FORMS_KEY` under `Settings → Secrets and variables → Actions → Variables`. Plumb it into the deploy workflow's build step (or the manual deploy command, while CI is blocked on [COCA-5](/COCA/issues/COCA-5)).
3. Rebuild and redeploy.

The form has a honeypot field (visually hidden, off-screen) that real users never fill. Submissions with anything in that field are silently swallowed.

## Analytics

If `NEXT_PUBLIC_GOATCOUNTER` is set to a GoatCounter site code (e.g. `coca` for `coca.goatcounter.com`), the landing injects GoatCounter's `count.js` snippet. GoatCounter is privacy-friendly (no cookies, no fingerprinting), free for non-commercial sites, and the dashboard is at `https://<code>.goatcounter.com/`.

If the env is unset, the page ships with zero third-party requests.

## Secrets and config

All build-time config is wired through environment variables. None of them are required for a working build.

| Variable | When | Purpose |
|---|---|---|
| `BASE_PATH` | build | Sub-path for GitHub Pages (`/coca`). Set by deploy workflow; empty locally. |
| `NEXT_PUBLIC_BUILD_SHA` | build | Short SHA shown in the footer. Set by deploy workflow. |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | build | If set, the form POSTs to Web3Forms instead of falling back to `mailto:`. |
| `NEXT_PUBLIC_GOATCOUNTER` | build | GoatCounter site code (subdomain). When set, injects the analytics snippet. |

Repository-level secrets and variables go to `Settings → Secrets and variables → Actions`. Never commit secrets to the repo. `.env` and `.env*.local` are gitignored.

## What's intentionally missing

The technical foundation deliberately ships small. These are tracked as COCA follow-ups, not lost:

- Postgres (Neon or Supabase free tier) — [COCA-7](/COCA/issues/COCA-7)
- Auth, Observability — [COCA-8](/COCA/issues/COCA-8)
- Custom domain — [COCA-9](/COCA/issues/COCA-9)
- Branch protection on `main` — [COCA-10](/COCA/issues/COCA-10)
- Migration from `carlosocarvalho/coca` to a dedicated GitHub org — [COCA-6](/COCA/issues/COCA-6)
- Migration from GitHub Pages to Vercel once we need server-side rendering — [COCA-7](/COCA/issues/COCA-7)

## License

MIT — see [LICENSE](./LICENSE).
