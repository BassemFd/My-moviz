import { Link } from "react-router";
import { poster, TYPE_LABEL, type Title } from "../lib/tmdb";

export default function TitleCard({ item, showType = false }: { item: Title; showType?: boolean }) {
  const src = poster(item.poster_path);
  return (
    <Link
      to={`/${item.type}/${item.id}`}
      className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-surface">
        {src ? (
          <img
            src={src}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-3 text-center text-sm text-muted">{item.title}</div>
        )}
        {showType && (
          <span className="absolute left-2 top-2 rounded bg-bg/80 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
            {TYPE_LABEL[item.type]}
          </span>
        )}
      </div>
      <p className="mt-2 truncate text-sm font-medium">{item.title}</p>
      <p className="text-xs text-muted">
        {item.date.slice(0, 4) || "—"} · ★ {item.vote_average.toFixed(1)}
      </p>
    </Link>
  );
}
