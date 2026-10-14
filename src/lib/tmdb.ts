import { useEffect, useState } from "react";

export type MediaType = "movie" | "tv";

// TMDB shapes movies and series differently (title vs name, release_date vs
// first_air_date). Everything in the UI works on this one normalized shape.
export interface Title {
  id: number;
  type: MediaType;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  date: string; // release (movie) or first air date (tv), YYYY-MM-DD or ""
}

interface RawTitle {
  id: number;
  media_type?: string;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
}

export interface Page<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export function toTitle(raw: RawTitle, fallback: MediaType): Title {
  const type: MediaType = raw.media_type === "tv" || raw.media_type === "movie" ? raw.media_type : fallback;
  return {
    id: raw.id,
    type,
    title: raw.title ?? raw.name ?? "Untitled",
    overview: raw.overview ?? "",
    poster_path: raw.poster_path ?? null,
    backdrop_path: raw.backdrop_path ?? null,
    vote_average: raw.vote_average ?? 0,
    date: raw.release_date ?? raw.first_air_date ?? "",
  };
}

// search/multi also returns people — keep only what we can show.
export function toTitles(page: Page<RawTitle>, fallback: MediaType): Title[] {
  return page.results
    .filter((r) => !r.media_type || r.media_type === "movie" || r.media_type === "tv")
    .map((r) => toTitle(r, fallback));
}

const IMAGE = "https://image.tmdb.org/t/p";
export const poster = (path: string | null, size: "w185" | "w342" | "w500" = "w342") =>
  path ? `${IMAGE}/${size}${path}` : null;
export const backdrop = (path: string | null, size: "w780" | "w1280" | "original" = "w1280") =>
  path ? `${IMAGE}/${size}${path}` : null;

export const TYPE_LABEL: Record<MediaType, string> = { movie: "Movie", tv: "Series" };

// All calls go through the Worker proxy (worker/index.ts), which holds the key.
export async function tmdb<T>(path: string, params: Record<string, string> = {}, signal?: AbortSignal): Promise<T> {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`/api/tmdb/${path}${qs ? `?${qs}` : ""}`, { signal });
  if (!res.ok) throw new Error(`TMDB ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

type State<T> = { data: T | null; error: Error | null; loading: boolean };

export function useTmdb<T>(path: string | null, params: Record<string, string> = {}): State<T> {
  const key = path ? `${path}?${new URLSearchParams(params)}` : null;
  const [state, setState] = useState<State<T>>({ data: null, error: null, loading: !!path });

  useEffect(() => {
    if (!path) return setState({ data: null, error: null, loading: false });
    const ctrl = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    tmdb<T>(path, params, ctrl.signal)
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((error: Error) => {
        if (error.name !== "AbortError") setState({ data: null, error, loading: false });
      });
    return () => ctrl.abort();
    // `key` captures path + params; params is a fresh object every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}

// Paginated list with "load more": resets whenever path/params change.
export function usePagedTitles(path: string | null, params: Record<string, string>, fallback: MediaType) {
  const key = path ? `${path}?${new URLSearchParams(params)}` : null;
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Title[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setPage(1);
    setItems([]);
    setTotalPages(0);
    setTotal(0);
  }, [key]);

  useEffect(() => {
    if (!path) return;
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    tmdb<Page<RawTitle>>(path, { ...params, page: String(page) }, ctrl.signal)
      .then((data) => {
        const next = toTitles(data, fallback);
        // Pages can overlap when TMDB's popularity order shifts between calls.
        setItems((prev) => (page === 1 ? next : [...prev, ...next.filter((n) => !prev.some((p) => p.id === n.id && p.type === n.type))]));
        setTotalPages(Math.min(data.total_pages, 500)); // TMDB caps paging at 500
        setTotal(data.total_results);
        setLoading(false);
      })
      .catch((e: Error) => {
        if (e.name !== "AbortError") {
          setError(e);
          setLoading(false);
        }
      });
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, page]);

  return { items, total, loading, error, hasMore: page < totalPages, loadMore: () => setPage((p) => p + 1) };
}
