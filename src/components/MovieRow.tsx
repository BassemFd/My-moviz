import { useRef } from "react";
import MovieCard from "./MovieCard";
import { useTmdb, type Movie, type Page } from "../lib/tmdb";

const CARD = "w-36 shrink-0 snap-start sm:w-44";

export default function MovieRow({ title, path }: { title: string; path: string }) {
  const { data, error, loading } = useTmdb<Page<Movie>>(path);
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) =>
    scroller.current?.scrollBy({ left: dir * scroller.current.clientWidth * 0.8, behavior: "smooth" });

  if (error) return null; // one failed row shouldn't take the page down

  return (
    <section aria-label={title} className="group/row">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-lg font-bold sm:text-xl">{title}</h2>
        <div className="hidden gap-2 sm:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              aria-label={dir === 1 ? `Scroll ${title} right` : `Scroll ${title} left`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition hover:border-accent hover:text-ink"
            >
              {dir === 1 ? "›" : "‹"}
            </button>
          ))}
        </div>
      </div>
      <div
        ref={scroller}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6"
      >
        {loading && !data
          ? Array.from({ length: 8 }, (_, i) => (
              <div key={i} className={CARD}>
                <div className="aspect-[2/3] animate-pulse rounded-lg bg-surface" />
                <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-surface" />
              </div>
            ))
          : data?.results.map((m) => (
              <div key={m.id} className={CARD}>
                <MovieCard movie={m} />
              </div>
            ))}
      </div>
    </section>
  );
}
