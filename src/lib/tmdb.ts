import { useEffect, useState } from "react";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids?: number[];
}

export interface Page<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

const IMAGE = "https://image.tmdb.org/t/p";
export const poster = (path: string | null, size: "w185" | "w342" | "w500" = "w342") =>
  path ? `${IMAGE}/${size}${path}` : null;
export const backdrop = (path: string | null, size: "w780" | "w1280" | "original" = "w1280") =>
  path ? `${IMAGE}/${size}${path}` : null;

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
