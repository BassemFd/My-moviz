import { TMDB_LOGO_FULL, TMDB_NOTICE } from "../lib/tmdbLogo";

export default function About() {
  return (
    <article className="mx-auto flex max-w-2xl flex-col gap-8 py-6">
      <header>
        <h1 className="text-3xl font-black">
          About my<span className="text-accent">moviz</span>
        </h1>
        <p className="mt-3 text-muted">
          Browse movies and series, follow the shows you watch, and see which new episodes land each week. Started in
          2021 as a bootcamp project, rebuilt in 2026 on React, TypeScript and Cloudflare Workers.
        </p>
      </header>

      <section aria-labelledby="credits" className="rounded-2xl border border-line bg-surface p-6">
        <h2 id="credits" className="text-lg font-bold">
          Credits
        </h2>
        <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="mt-4 inline-block">
          <img src={TMDB_LOGO_FULL} alt="The Movie Database (TMDB)" className="h-7 w-auto" />
        </a>
        <p className="mt-4 text-sm">
          Movie and series data and images are provided by{" "}
          <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="text-accent underline">
            The Movie Database (TMDB)
          </a>
          .
        </p>
        <p className="mt-2 text-sm text-muted">{TMDB_NOTICE}</p>
      </section>

      <section aria-labelledby="privacy" className="text-sm text-muted">
        <h2 id="privacy" className="mb-2 text-lg font-bold text-ink">
          Privacy
        </h2>
        <p>No account, no tracking. Anything you save stays in this browser.</p>
      </section>
    </article>
  );
}
