import TitleCard from "./TitleCard";
import type { Title } from "../lib/tmdb";

// Shared by search and genre pages: grid + skeletons + "load more".
export default function TitleGrid({
  items,
  loading,
  hasMore,
  onMore,
  showType = false,
}: {
  items: Title[];
  loading: boolean;
  hasMore: boolean;
  onMore: () => void;
  showType?: boolean;
}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {items.map((t) => (
          <TitleCard key={`${t.type}-${t.id}`} item={t} showType={showType} />
        ))}
        {loading &&
          Array.from({ length: items.length ? 6 : 12 }, (_, i) => (
            <div key={`s${i}`} className="aspect-[2/3] animate-pulse rounded-lg bg-surface" />
          ))}
      </div>
      {hasMore && !loading && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={onMore}
            className="rounded-full border border-line px-6 py-2.5 text-sm font-semibold transition hover:border-accent"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
