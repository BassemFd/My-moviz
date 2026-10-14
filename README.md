# mymoviz

**Live: https://moviz.bassemfayed.com**

Browse, search and (soon) track movies and series. Started in 2021 as a bootcamp project (CRA + Express + MongoDB), rebuilt from scratch in 2026 on React, TypeScript and a Cloudflare Worker. The 2021 version is still in this repo's history.

## What it does today

- **Movies and Series homes**: a hero from this week's trending, then scrollable rows (trending, popular, top rated, now playing / airing today, upcoming / on the air), with loading skeletons.
- **Search** across movies and series: debounced, kept in the URL (`/search?q=dark&type=tv`) so a search can be shared or reloaded, with a type filter and "load more".
- **Genre browsing** for both, via TMDB's discover endpoint.
- **Credits page** with TMDB attribution, as their terms require.

## Roadmap

1. Detail pages: movie (cast, trailer) and series (seasons, then episodes)
2. My list: follow series, save movies, tick off watched episodes (saved in the browser)
3. Upcoming: this week's new episodes for the series you follow
4. Learning track: ads with Google test inventory behind a consent banner, then accounts and a premium tier in Stripe test mode (no real money; see below)

## How it works

```text
browser ──/api/tmdb/*──▶ Cloudflare Worker ──api_key──▶ api.themoviedb.org
   ▲                         │  allowlisted read endpoints only
   └──── static SPA ◀────────┘  successful responses cached at the edge (1 h)
```

- **The TMDB key never reaches the browser.** The Worker (`worker/index.ts`) adds it server-side and only forwards a fixed set of read endpoints (`movie`, `tv`, `trending`, `genre`, `search`, `discover`), so it can't be used as an open proxy. A unit test covers that allowlist.
- **Only successes are cached.** A cached 401 or 5xx would otherwise be served to everyone for an hour.
- **One shape for movies and series.** TMDB names fields differently (`title` / `name`, `release_date` / `first_air_date`); `src/lib/tmdb.ts` normalizes both into one `Title` type, so cards, rows, search and genre pages are shared.

## Stack

Vite · React 19 · TypeScript · React Router · Tailwind CSS v4 · Cloudflare Workers (static assets + Worker) · Vitest

## Running it

You need a free [TMDB API key](https://www.themoviedb.org/settings/api) (the v3 "API key").

```bash
npm install
cp .dev.vars.example .dev.vars   # then paste your key into .dev.vars
npm run dev                      # Vite + the Worker locally
npm test                         # Worker allowlist tests
npm run build                    # type-check + production build
```

Deploy (Cloudflare account needed):

```bash
npx wrangler secret put TMDB_API_KEY   # once
npm run deploy
```

## Data and licensing

Movie and series data and images come from [The Movie Database (TMDB)](https://www.themoviedb.org). This product uses the TMDB API but is not endorsed or certified by TMDB.

TMDB's free API is for **non-commercial use only**: real ads or paid memberships would need a commercial agreement with TMDB. That's why the monetization items on the roadmap run in test mode only and earn nothing.

---

made with ❤️‍🔥 by [BF](https://bassemfayed.com) · [Portfolio](https://bassemfayed.com) · [GitHub](https://github.com/BassemFd) · [LinkedIn](https://www.linkedin.com/in/bassem-fd) · [Email](mailto:bassem.fayed@gmail.com)
