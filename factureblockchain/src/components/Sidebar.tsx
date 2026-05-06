"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/reclamation", label: "Réclamations", icon: "📋" },
  { href: "/suivi", label: "Suivi", icon: "🔍" },
  { href: "/profile", label: "Profil", icon: "⚙️" },
  { href: "/", label: "Accueil", icon: "🏠" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col border-r border-white/10 bg-slate-950/95 px-4 py-6 shadow-lg shadow-black/30 backdrop-blur-xl">
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
          const active = pathname === item.href;
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
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-400">
        <div className="mb-3 font-semibold text-slate-100">Projet</div>
        <div className="mb-2">⛓ Polygon Network</div>
        <div>🏛 ARSEL API</div>
      </div>

      <div className="mt-5 rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-xs text-slate-400">
        <div className="mb-3">MIABE Hackathon 2026</div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />{" "}
          Polygon — connecté
        </div>
        <div className="mt-2">ODD 7 · ODD 11 · ODD 16</div>
      </div>
    </aside>
  );
}
