"use client";

import Link from "next/link";
import { useMemo } from "react";

const timeline = [
  {
    status: "done",
    title: "Réclamation déposée",
    date: "12 Août 2026",
    desc: "Réclamation enregistrée avec le hash blockchain associé.",
    hash: "0x4a7f...e9d5c",
    badge: "badge-done",
  },
  {
    status: "done",
    title: "Preuve blockchain vérifiée",
    date: "12 Août 2026",
    desc: "La consommation réelle a été validée sur Polygon.",
    hash: "0x7e1a...c8b2f",
    badge: "badge-done",
  },
  {
    status: "active",
    title: "Instruction en cours",
    date: "13 Août 2026",
    desc: "L'opérateur ENEO analyse la réclamation et prépare une réponse.",
    hash: "En attente",
    badge: "badge-active",
  },
  {
    status: "pending",
    title: "Escalade ARSEL",
    date: "—",
    desc: "Si le délai légal est dépassé, le dossier est escaladé automatiquement.",
    hash: "—",
    badge: "badge-pending",
  },
  {
    status: "pending",
    title: "Résolution finale",
    date: "—",
    desc: "Statut final publié après décision ARSEL.",
    hash: "—",
    badge: "badge-pending",
  },
];

export default function SuiviPage() {
  const summaryStats = useMemo(
    () => [
      { label: "Numéro", value: "#FC-2026-0847", color: "text-sky-300" },
      { label: "Abonné", value: "J.-P. Mbarga", color: "text-white" },
      { label: "Contrat", value: "CMR-YDE-2847391", color: "text-white" },
      { label: "Période", value: "Août 2026", color: "text-white" },
      { label: "Écart", value: "+77 kWh (+24.7%)", color: "text-orange-300" },
      { label: "Montant", value: "9 350 FCFA", color: "text-red-300" },
      { label: "Réseau", value: "Polygon Mainnet", color: "text-sky-300" },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-10">
        <main className="w-full">
          {/* Header Card */}
          <div className="mb-6 md:mb-10 rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-5 md:p-8 shadow-lg md:shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-slate-400">
                  🔍 Suivi de Résolution
                </p>
                <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-white mt-1">
                  Réclamation #FC-2026-0847
                </h1>
                <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-400 truncate">
                  Surfacturation Août 2026 · 9 350 FCFA
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 flex-shrink-0"
              >
                ← Retour
              </Link>
            </div>
          </div>

          {/* Content Grid */}
          <div className="mb-6 md:mb-8 grid gap-4 md:gap-6 lg:grid-cols-[1.6fr_0.9fr]">
            <div className="rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-5 md:p-8 shadow-lg md:shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
              {/* Summary Stats */}
              <div className="mb-6 md:mb-8 rounded-lg md:rounded-[32px] border border-white/10 bg-slate-950/80 p-3 md:p-6">
                <div className="mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400">
                  Récapitulatif
                </div>
                <div className="grid gap-2 md:gap-3 sm:grid-cols-2">
                  {summaryStats.map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between gap-2 md:gap-4 rounded-lg md:rounded-3xl border border-white/10 bg-slate-900/80 p-2.5 md:p-4"
                    >
                      <span className="text-[12px] md:text-sm text-slate-400">
                        {item.label}
                      </span>
                      <span
                        className={`text-[12px] md:text-sm font-semibold ${item.color} truncate`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="rounded-lg md:rounded-[32px] border border-white/10 bg-slate-950/80 p-3 md:p-6">
                <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h2 className="text-base md:text-xl font-black text-white">
                      Timeline
                    </h2>
                    <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-400">
                      Étape 3 / 5
                    </p>
                  </div>
                  <span className="rounded-full bg-orange-500/10 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-semibold text-orange-300 w-fit">
                    En instruction
                  </span>
                </div>
                <div className="space-y-3 md:space-y-6">
                  {timeline.map((item, idx) => (
                    <div
                      key={idx}
                      className={`relative rounded-lg md:rounded-[28px] border p-3 md:p-5 ${item.status === "done" ? "border-emerald-400/15 bg-slate-900/90" : item.status === "active" ? "border-orange-400/20 bg-slate-950/80" : "border-white/10 bg-slate-950/70"}`}
                    >
                      <div
                        className={`absolute hidden sm:flex -left-4 md:-left-5 top-4 md:top-6 h-8 md:h-10 w-8 md:w-10 items-center justify-center rounded-full border-2 ${item.status === "done" ? "border-emerald-400 bg-emerald-400/10 text-emerald-300" : item.status === "active" ? "border-orange-400 bg-orange-400/10 text-orange-300" : "border-white/10 bg-slate-900 text-slate-400"}`}
                      >
                        {item.status === "done"
                          ? "✓"
                          : item.status === "active"
                            ? "3"
                            : "○"}
                      </div>
                      <div className="sm:pl-6 md:pl-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 text-xs md:text-sm text-slate-400">
                          <span className="font-semibold text-white">
                            {item.title}
                          </span>
                          <span className="text-slate-500">{item.date}</span>
                        </div>
                        <p className="mt-1.5 md:mt-3 text-xs md:text-sm leading-5 md:leading-7 text-slate-300">
                          {item.desc}
                        </p>
                        <div className="mt-2 md:mt-4 rounded-lg md:rounded-2xl bg-slate-900/90 p-2 md:p-4 text-xs md:text-sm font-mono text-sky-300 truncate">
                          {item.hash}
                        </div>
                        <span
                          className={`mt-2 md:mt-4 inline-flex rounded-full px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] md:tracking-[0.3em] ${item.badge === "badge-done" ? "bg-emerald-400/10 text-emerald-300" : item.badge === "badge-active" ? "bg-orange-400/10 text-orange-300" : "bg-white/10 text-slate-300"}`}
                        >
                          {item.badge === "badge-done"
                            ? "Terminé"
                            : item.badge === "badge-active"
                              ? "Actif"
                              : "En attente"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 md:mt-8 rounded-lg md:rounded-3xl border border-sky-400/20 bg-slate-950/80 p-2.5 md:p-4 text-xs md:text-sm text-sky-300">
                  <div className="font-semibold">En progression</div>
                  <div className="mt-2 md:mt-3 rounded-full bg-white/10 p-0.5 md:p-1">
                    <div
                      className="h-2 md:h-3 rounded-full bg-orange-500"
                      style={{ width: "60%" }}
                    />
                  </div>
                  <div className="mt-2 md:mt-3 text-[9px] md:text-xs text-slate-400">
                    60% achevé · Escalade possible si délai dépassé
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-4 md:space-y-6">
              <div className="rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-5 md:p-8 shadow-lg md:shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-sm md:text-lg font-bold text-white">
                  Détails de la réclamation
                </h3>
                <div className="mt-3 md:mt-6 space-y-2 md:space-y-4 text-xs md:text-sm text-slate-300">
                  {[
                    ["Numéro", "#FC-2026-0847", "text-sky-300"],
                    ["Abonné", "J.-P. Mbarga", "text-white"],
                    ["Contrat", "CMR-YDE-2847391", "text-white"],
                    ["Période", "Août 2026", "text-white"],
                    ["Écart", "+77 kWh (+24.7%)", "text-orange-300"],
                    ["Montant", "9 350 FCFA", "text-red-300"],
                    ["Réseau", "Polygon Mainnet", "text-sky-300"],
                  ].map(([label, value, color]) => (
                    <div
                      key={label}
                      className="flex justify-between gap-2 border-b border-white/10 pb-1.5 md:pb-2 last:border-none"
                    >
                      <span className="text-slate-400">{label}</span>
                      <span className={`font-semibold ${color} truncate`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-5 md:p-8 shadow-lg md:shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-sm md:text-lg font-bold text-white">
                  Preuve Blockchain
                </h3>
                <div className="mt-3 md:mt-6 rounded-lg md:rounded-3xl border border-sky-400/20 bg-slate-950/80 p-2 md:p-4 font-mono text-[10px] sm:text-xs md:text-sm text-sky-300 truncate">
                  0x4a7f2c8e1b3d9f6a5c2e8d2c4b7a1f3e9d5c
                </div>
                <div className="mt-3 md:mt-4 space-y-1.5 md:space-y-3 text-xs md:text-sm text-slate-300">
                  <div className="flex justify-between gap-2 border-b border-white/10 pb-1 md:pb-2">
                    <span>Smart contract</span>
                    <span className="text-sky-300 truncate">
                      FactureChain.sol
                    </span>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-white/10 pb-1 md:pb-2">
                    <span>Bloc</span>
                    <span className="text-slate-100">#47291902</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-5 md:p-8 shadow-lg md:shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-sm md:text-lg font-bold text-white">
                  Délai de résolution
                </h3>
                <div className="mt-3 md:mt-6 rounded-lg md:rounded-3xl border border-white/10 bg-slate-950/80 p-2.5 md:p-4 text-xs md:text-sm text-slate-300">
                  <div className="flex justify-between gap-2 text-slate-400">
                    <span>Interface ENEO</span>
                    <span className="text-emerald-300 flex-shrink-0">
                      ✓ Connectée
                    </span>
                  </div>
                  <div className="mt-2 md:mt-4 rounded-full bg-white/10 p-0.5 md:p-1">
                    <div
                      className="h-2 md:h-3 rounded-full bg-orange-500"
                      style={{ width: "33%" }}
                    />
                  </div>
                  <div className="mt-2 md:mt-3 text-[9px] md:text-xs text-slate-400">
                    Délai en cours · 24 jours restants
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
