import Hero from "../components/Hero";
import TitleRow from "../components/TitleRow";
import GenreChips from "../components/GenreChips";
import { toTitles, useTmdb, type MediaType, type Page } from "../lib/tmdb";

const ROWS: Record<MediaType, { title: string; path: string }[]> = {
  movie: [
    { title: "Trending this week", path: "trending/movie/week" },
    { title: "Popular", path: "movie/popular" },
    { title: "Top rated", path: "movie/top_rated" },
    { title: "Now playing", path: "movie/now_playing" },
    { title: "Coming soon", path: "movie/upcoming" },
  ],
  tv: [
    { title: "Trending this week", path: "trending/tv/week" },
    { title: "Airing today", path: "tv/airing_today" },
    { title: "On the air this week", path: "tv/on_the_air" },
    { title: "Popular", path: "tv/popular" },
    { title: "Top rated", path: "tv/top_rated" },
  ],
};

export default function Home({ type }: { type: MediaType }) {
  const rows = ROWS[type];
  // Same request as the first row — the Worker's edge cache serves it twice for free.
  const trending = useTmdb<Page<never>>(rows[0].path);
  const hero = trending.data ? (toTitles(trending.data, type).find((t) => t.backdrop_path) ?? null) : null;

  return (
    <div className="flex flex-col gap-10">
      <Hero item={hero} eyebrow={type === "tv" ? "Trending series this week" : "Trending movie this week"} />
      <section aria-label="Genres">
        <h2 className="mb-3 text-lg font-bold sm:text-xl">Browse by genre</h2>
        <GenreChips type={type} />
      </section>
      {rows.map((r) => (
        <TitleRow key={r.path} {...r} type={type} />
      ))}
    </div>
  );
}
