import { Link, Outlet, ScrollRestoration } from "react-router";

const LINKS = [
  { label: "Portfolio", href: "https://career-log.bassem-fayed.workers.dev" },
  { label: "GitHub", href: "https://github.com/BassemFd" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bassem-fd" },
  { label: "Source", href: "https://github.com/BassemFd/My-moviz" },
  { label: "Email", href: "mailto:bassem.fayed@gmail.com" },
];

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
      <footer className="mt-16 border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            made with <span aria-label="love">❤️‍🔥</span> by{" "}
            <a href={LINKS[0].href} target="_blank" rel="noreferrer" className="font-bold text-accent hover:underline">
              BF
            </a>
          </p>
          <nav aria-label="Author links" className="flex flex-wrap gap-x-5 gap-y-2 text-muted">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.href.startsWith("http") && { target: "_blank", rel: "noreferrer" })}
                className="transition hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="mx-auto max-w-7xl px-4 pb-8 text-xs text-muted sm:px-6">
          Movie data and images from{" "}
          <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="underline hover:text-ink">
            TMDB
          </a>
          . This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </footer>
      <ScrollRestoration />
    </div>
  );
}
