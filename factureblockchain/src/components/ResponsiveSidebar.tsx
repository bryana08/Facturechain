"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard",     label: "Dashboard",      icon: "📊" },
  { href: "/scanner",      label: "Scanner IA",     icon: "📷" },
  { href: "/audit",        label: "Audit",          icon: "🔍" },
  { href: "/observatoire", label: "Observatoire",   icon: "🗺" },
  { href: "/preuves",      label: "Preuves IPFS",   icon: "📎" },
  { href: "/reclamation",  label: "Réclamations",   icon: "📋" },
  { href: "/suivi",        label: "Suivi",          icon: "📡" },
  { href: "/juridique",    label: "Portail ARSEL",  icon: "⚖️" },
  { href: "/conformite",   label: "Audit Trail",    icon: "🛡️" },
  { href: "/profile",      label: "Profil",         icon: "⚙️" },
  { href: "/",             label: "Accueil",        icon: "🏠" },
];

export default function ResponsiveSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden xl:fixed xl:left-0 xl:top-0 xl:z-40 xl:flex xl:h-screen xl:w-72 xl:flex-col xl:border-r xl:border-white/10 xl:bg-slate-950/95 xl:px-4 xl:py-6 xl:shadow-lg xl:shadow-black/30 xl:backdrop-blur-xl">
      <div className="mb-8 px-2">
        <div className="text-2xl font-black text-white">
          Facture<span className="text-orange-400">Chain</span>
        </div>
        <div className="mt-2 text-xs uppercase tracking-[0.35em] text-slate-500">
          Phase 2 — Demi-finale
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (pathname.startsWith(item.href) && item.href !== "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-orange-500/10 text-orange-300"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto space-y-4">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-400">
          <div className="mb-3 font-semibold text-slate-100">Projet</div>
          <div className="mb-2 text-xs">⛓ Polygon Network</div>
          <div className="text-xs">🏛 ARSEL API</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-xs text-slate-400">
          <div className="mb-3">MIABE Hackathon 2026</div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />{" "}
            Polygon — connecté
          </div>
          <div className="mt-2">ODD 7 · ODD 11 · ODD 16</div>
        </div>
      </div>
    </aside>
  );
}
