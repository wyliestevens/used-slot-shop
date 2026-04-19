import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-wide py-32 text-center">
      <div className="font-display text-7xl font-bold text-brand-400 mb-4">404</div>
      <h1 className="font-display text-3xl font-bold text-white mb-3">Page not found</h1>
      <p className="text-ink-300 max-w-md mx-auto">
        The page you were looking for doesn't exist — but we've got plenty of slot
        machines that do.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/shop" className="btn-primary">Browse machines</Link>
        <Link href="/" className="btn-ghost">Go home</Link>
      </div>
    </div>
  );
}
