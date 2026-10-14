import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";
import { useTmdb, type Movie, type Page } from "../lib/tmdb";

const ROWS = [
  { title: "Trending this week", path: "trending/movie/week" },
  { title: "Popular", path: "movie/popular" },
  { title: "Top rated", path: "movie/top_rated" },
  { title: "Now playing", path: "movie/now_playing" },
  { title: "Coming soon", path: "movie/upcoming" },
];

export default function Home() {
  // Same request as the first row — the Worker's edge cache serves it twice for free.
  const trending = useTmdb<Page<Movie>>("trending/movie/week");
  const hero = trending.data?.results.find((m) => m.backdrop_path) ?? null;

  return (
    <div className="flex flex-col gap-10">
      <Hero movie={hero} />
      {ROWS.map((r) => (
        <MovieRow key={r.path} {...r} />
      ))}
    </div>
  );
}
