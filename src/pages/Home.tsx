import MovieCard from "../components/MovieCard";
import { useTmdb, type Movie, type Page } from "../lib/tmdb";

export default function Home() {
  const { data, error, loading } = useTmdb<Page<Movie>>("movie/popular");
  if (error) return <p className="text-muted">Couldn't load movies. {error.message}</p>;
  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">Popular</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {loading && !data
          ? Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="aspect-[2/3] animate-pulse rounded-lg bg-surface" />
            ))
          : data?.results.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
    </section>
  );
}
