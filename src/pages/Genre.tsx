import { useParams, useSearchParams } from "react-router";
import TitleGrid from "../components/TitleGrid";
import GenreChips from "../components/GenreChips";
import NotFound from "./NotFound";
import { usePagedTitles, type MediaType } from "../lib/tmdb";

export default function Genre() {
  const { type, id } = useParams();
  const [params] = useSearchParams();
  const valid = (type === "movie" || type === "tv") && /^\d+$/.test(id ?? "");
  const mediaType = (type === "tv" ? "tv" : "movie") as MediaType;
  const { items, loading, error, hasMore, loadMore } = usePagedTitles(
    valid ? `discover/${mediaType}` : null,
    { with_genres: id ?? "", sort_by: "popularity.desc", include_adult: "false" },
    mediaType,
  );
  if (!valid) return <NotFound />;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {mediaType === "tv" ? "Series" : "Movies"}
        </p>
        <h1 className="text-3xl font-black">{params.get("name") ?? "Genre"}</h1>
      </div>
      <GenreChips type={mediaType} activeId={Number(id)} />
      {error ? (
        <p className="text-muted">Couldn't load this genre. {error.message}</p>
      ) : (
        <TitleGrid items={items} loading={loading} hasMore={hasMore} onMore={loadMore} />
      )}
    </div>
  );
}
