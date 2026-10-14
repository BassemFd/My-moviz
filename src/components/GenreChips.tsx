import { Link } from "react-router";
import { useTmdb, type Genre, type MediaType } from "../lib/tmdb";

export default function GenreChips({ type, activeId }: { type: MediaType; activeId?: number }) {
  const { data } = useTmdb<{ genres: Genre[] }>(`genre/${type}/list`);
  if (!data) return <div className="h-9" />;
  return (
    <div className="flex flex-wrap gap-2">
      {data.genres.map((g) => (
        <Link
          key={g.id}
          to={`/genre/${type}/${g.id}?name=${encodeURIComponent(g.name)}`}
          aria-current={g.id === activeId ? "page" : undefined}
          className={
            g.id === activeId
              ? "rounded-full bg-accent px-3.5 py-1.5 text-sm font-semibold text-bg"
              : "rounded-full border border-line px-3.5 py-1.5 text-sm text-muted transition hover:border-accent hover:text-ink"
          }
        >
          {g.name}
        </Link>
      ))}
    </div>
  );
}
