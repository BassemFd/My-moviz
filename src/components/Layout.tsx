import { Link, Outlet, ScrollRestoration } from "react-router";

export default function Layout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6">
          <Link to="/" className="text-xl font-black tracking-tight">
            my<span className="text-accent">moviz</span>
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-7xl px-4 py-10 text-xs text-muted sm:px-6">
        Data from TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.
      </footer>
      <ScrollRestoration />
    </div>
  );
}
