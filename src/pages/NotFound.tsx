import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="text-6xl" aria-hidden="true">🍿</p>
      <h1 className="text-2xl font-bold">Nothing playing here</h1>
      <p className="text-muted">This page doesn't exist — or isn't built yet.</p>
      <Link to="/" className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-bg">
        Back to home
      </Link>
    </div>
  );
}
