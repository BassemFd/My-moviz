import { Link } from "react-router";
import { poster, type Movie } from "../lib/tmdb";

export default function MovieCard({ movie }: { movie: Movie }) {
  const src = poster(movie.poster_path);
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block shrink-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="aspect-[2/3] overflow-hidden rounded-lg bg-surface">
        {src ? (
          <img
            src={src}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-3 text-center text-sm text-muted">
            {movie.title}
          </div>
        )}
      </div>
      <p className="mt-2 truncate text-sm font-medium">{movie.title}</p>
      <p className="text-xs text-muted">
        {movie.release_date?.slice(0, 4) || "—"} · ★ {movie.vote_average.toFixed(1)}
      </p>
    </Link>
  );
}
