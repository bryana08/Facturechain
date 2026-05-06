import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-black tracking-tight text-white"
        >
          <span>Facture</span>
          <span className="text-orange-400">Chain</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-300 md:flex">
          <Link href="/dashboard" className="transition hover:text-white">
            Dashboard
          </Link>
          <Link href="/reclamation" className="transition hover:text-white">
            Réclamation
          </Link>
          <Link href="/suivi" className="transition hover:text-white">
            Suivi
          </Link>
          <Link href="/profile" className="transition hover:text-white">
            Profil
          </Link>
          <Link href="/#impact" className="transition hover:text-white">
            Impact
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-orange-400 md:inline-flex"
          >
            Accéder à l'app
          </Link>
          <Link
            href="/profile"
            className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10 md:inline-flex"
          >
            Profil
          </Link>
          <Link
            href="/reclamation"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10"
          >
            Réclamation
          </Link>
        </div>
      </div>
    </header>
  );
}
