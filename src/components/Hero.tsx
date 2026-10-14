import { Link } from "react-router";
import { backdrop, type Movie } from "../lib/tmdb";

export default function Hero({ movie }: { movie: Movie | null }) {
  if (!movie) {
    return <div className="aspect-[16/9] max-h-[70vh] w-full animate-pulse rounded-2xl bg-surface sm:aspect-[21/9]" />;
  }
  const src = backdrop(movie.backdrop_path);
  return (
    <section className="relative isolate overflow-hidden rounded-2xl bg-surface">
      {src && (
        <img src={src} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      )}
      {/* Readability scrim: dark at the bottom-left where the copy sits. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/60 to-transparent sm:bg-gradient-to-r sm:from-bg sm:via-bg/70" />
      <div className="flex aspect-[4/5] max-h-[70vh] flex-col justify-end gap-3 p-6 sm:aspect-[21/9] sm:max-w-xl sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Trending this week</p>
        <h1 className="text-3xl font-black leading-tight sm:text-5xl">{movie.title}</h1>
        <p className="text-sm text-muted">
          {movie.release_date?.slice(0, 4)} · ★ {movie.vote_average.toFixed(1)}
        </p>
        <p className="line-clamp-3 text-sm text-ink/85 sm:text-base">{movie.overview}</p>
        <div className="mt-2">
          <Link
            to={`/movie/${movie.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-bg transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            More info →
          </Link>
        </div>
      </div>
    </section>
  );
}
