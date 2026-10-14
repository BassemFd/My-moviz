// TMDB proxy: the browser calls /api/tmdb/<path>, the Worker adds the key and
// forwards to TMDB. The key never reaches the client, and responses are cached
// at the edge so the free TMDB quota isn't burned by repeat visits.

interface Env {
  TMDB_API_KEY: string;
}

// Only the read endpoints the app uses — anything else would turn this into an
// open proxy spending our key.
const ALLOWED = /^(movie|tv|trending|genre|search|discover)\/[\w/-]+$/;

export function tmdbPath(pathname: string): string | null {
  const path = pathname.replace(/^\/api\/tmdb\//, "");
  return path !== pathname && ALLOWED.test(path) ? path : null;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = tmdbPath(url.pathname);
    if (request.method !== "GET" || !path) {
      return new Response("Not found", { status: 404 });
    }

    const upstream = new URL(`https://api.themoviedb.org/3/${path}`);
    url.searchParams.forEach((v, k) => {
      if (k !== "api_key") upstream.searchParams.set(k, v);
    });
    upstream.searchParams.set("api_key", env.TMDB_API_KEY);

    // Only successes are cached — a cached 401/5xx would be served to everyone for an hour.
    const res = await fetch(upstream, {
      cf: { cacheEverything: true, cacheTtlByStatus: { "200-299": 3600, "400-599": 0 } },
    });
    return new Response(res.body, {
      status: res.status,
      headers: {
        "content-type": "application/json",
        "cache-control": res.ok ? "public, max-age=300" : "no-store",
      },
    });
  },
} satisfies ExportedHandler<Env>;
