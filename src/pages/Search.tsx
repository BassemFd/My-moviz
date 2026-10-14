import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import TitleGrid from "../components/TitleGrid";
import GenreChips from "../components/GenreChips";
import { usePagedTitles, type MediaType } from "../lib/tmdb";

const FILTERS: { id: "all" | MediaType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "movie", label: "Movies" },
  { id: "tv", label: "Series" },
];

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const filter = (params.get("type") as "all" | MediaType | null) ?? "all";
  const [draft, setDraft] = useState(q);

  // Typing updates the URL (debounced, replace — no history entry per keystroke),
  // so a search is shareable and survives a reload or back button.
  useEffect(() => {
    const id = setTimeout(() => {
      if (draft.trim() === q) return;
      setParams((p) => {
        const next = new URLSearchParams(p);
        if (draft.trim()) next.set("q", draft.trim());
        else next.delete("q");
        return next;
      }, { replace: true });
    }, 300);
    return () => clearTimeout(id);
  }, [draft, q, setParams]);

  const path = q ? (filter === "all" ? "search/multi" : `search/${filter}`) : null;
  const { items, total, loading, error, hasMore, loadMore } = usePagedTitles(
    path,
    { query: q, include_adult: "false" },
    filter === "tv" ? "tv" : "movie",
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <label htmlFor="search" className="sr-only">
          Search movies and series
        </label>
        <input
          id="search"
          type="search"
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Search movies and series…"
          className="w-full rounded-xl border border-line bg-surface px-5 py-4 text-lg outline-none transition placeholder:text-muted focus:border-accent"
        />
      </div>

      <div className="flex gap-2" role="group" aria-label="Filter by type">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            aria-pressed={filter === f.id}
            onClick={() =>
              setParams((p) => {
                const next = new URLSearchParams(p);
                if (f.id === "all") next.delete("type");
                else next.set("type", f.id);
                return next;
              }, { replace: true })
            }
            className={
              filter === f.id
                ? "rounded-full bg-ink px-4 py-1.5 text-sm font-semibold text-bg"
                : "rounded-full border border-line px-4 py-1.5 text-sm text-muted transition hover:text-ink"
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {!q ? (
        <div className="flex flex-col gap-8">
          {(filter === "all" ? (["movie", "tv"] as const) : [filter]).map((t) => (
            <section key={t} aria-label={`${t === "tv" ? "Series" : "Movie"} genres`}>
              <h2 className="mb-3 text-lg font-bold">{t === "tv" ? "Series" : "Movie"} genres</h2>
              <GenreChips type={t} />
            </section>
          ))}
        </div>
      ) : error ? (
        <p className="text-muted">Search failed. {error.message}</p>
      ) : (
        <>
          <p className="text-sm text-muted" aria-live="polite">
            {loading && !items.length ? "Searching…" : `${total.toLocaleString()} results for “${q}”`}
          </p>
          {!loading && !items.length ? (
            <p className="py-16 text-center text-muted">Nothing matches “{q}”. Try another title.</p>
          ) : (
            <TitleGrid items={items} loading={loading} hasMore={hasMore} onMore={loadMore} showType={filter === "all"} />
          )}
        </>
      )}
    </div>
  );
}
