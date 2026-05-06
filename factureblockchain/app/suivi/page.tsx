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
      <div className="mx-auto flex min-h-screen max-w-[1400px] px-6 py-10 xl:px-10">
        <aside className="sticky top-10 hidden h-fit w-72 shrink-0 rounded-[32px] border border-white/10 bg-slate-900/95 p-6 text-slate-300 shadow-[0_24px_80px_rgba(0,0,0,0.35)] xl:block">
          <div className="mb-8 space-y-3">
            <div className="text-2xl font-black text-white">
              Facture<span className="text-orange-400">Chain</span>
            </div>
            <div className="text-xs uppercase tracking-[0.35em] text-slate-500">
              Phase 2 — Demi-finale
            </div>
          </div>
          <div className="space-y-2">
            <Link
              href="/dashboard"
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition text-slate-300 hover:bg-white/5 hover:text-white"
            >
              <span>📊</span>
              Dashboard
            </Link>
            <Link
              href="/reclamation"
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition text-slate-300 hover:bg-white/5 hover:text-white"
            >
              <span>📋</span>
              Réclamations
            </Link>
            <Link
              href="/suivi"
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition bg-orange-500/10 text-orange-300"
            >
              <span>🔍</span>
              Suivi
            </Link>
            <button className="flex w-full cursor-default items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-300">
              <span>🔗</span>
              Blockchain
            </button>
          </div>
          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-400">
            <div className="mb-3 font-semibold text-slate-100">Projet</div>
            <div className="mb-2">⛓ Polygon Network</div>
            <div>🏛 ARSEL API</div>
          </div>
          <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-xs text-slate-400">
            <div className="mb-3">MIABE Hackathon 2026</div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />{" "}
              Polygon — connecté
            </div>
            <div className="mt-2">ODD 7 · ODD 11 · ODD 16</div>
          </div>
        </aside>

        <main className="w-full xl:ml-8">
          <div className="mb-10 rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-400">🔍 Suivi de Résolution</p>
                <h1 className="text-3xl font-black text-white">
                  Réclamation #FC-2026-0847
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  Surfacturation Août 2026 · 9 350 FCFA
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                ← Retour au Dashboard
              </Link>
            </div>
          </div>

          <div className="mb-8 grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
            <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
              <div className="mb-8 rounded-[32px] border border-white/10 bg-slate-950/80 p-6">
                <div className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-400">
                  Récapitulatif
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {summaryStats.map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between gap-4 rounded-3xl border border-white/10 bg-slate-900/80 p-4"
                    >
                      <span className="text-sm text-slate-400">
                        {item.label}
                      </span>
                      <span className={`text-sm font-semibold ${item.color}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-white">Timeline</h2>
                    <p className="mt-2 text-sm text-slate-400">Étape 3 / 5</p>
                  </div>
                  <span className="rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
                    En instruction
                  </span>
                </div>
                <div className="space-y-6">
                  {timeline.map((item, idx) => (
                    <div
                      key={idx}
                      className={`relative rounded-[28px] border p-5 ${item.status === "done" ? "border-emerald-400/15 bg-slate-900/90" : item.status === "active" ? "border-orange-400/20 bg-slate-950/80" : "border-white/10 bg-slate-950/70"}`}
                    >
                      <div
                        className={`absolute -left-10 top-6 flex h-10 w-10 items-center justify-center rounded-full border-2 ${item.status === "done" ? "border-emerald-400 bg-emerald-400/10 text-emerald-300" : item.status === "active" ? "border-orange-400 bg-orange-400/10 text-orange-300" : "border-white/10 bg-slate-900 text-slate-400"}`}
                      >
                        {item.status === "done"
                          ? "✓"
                          : item.status === "active"
                            ? "3"
                            : "○"}
                      </div>
                      <div className="pl-10">
                        <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
                          <span className="font-semibold text-white">
                            {item.title}
                          </span>
                          <span>{item.date}</span>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-300">
                          {item.desc}
                        </p>
                        <div className="mt-4 rounded-2xl bg-slate-900/90 p-4 text-sm font-mono text-sky-300">
                          {item.hash}
                        </div>
                        <span
                          className={`mt-4 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] ${item.badge === "badge-done" ? "bg-emerald-400/10 text-emerald-300" : item.badge === "badge-active" ? "bg-orange-400/10 text-orange-300" : "bg-white/10 text-slate-300"}`}
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
                <div className="mt-8 rounded-3xl border border-sky-400/20 bg-slate-950/80 p-4 text-sm text-sky-300">
                  <div className="font-semibold">En progression</div>
                  <div className="mt-3 rounded-full bg-white/10 p-1">
                    <div
                      className="h-3 rounded-full bg-orange-500"
                      style={{ width: "60%" }}
                    />
                  </div>
                  <div className="mt-3 text-xs text-slate-400">
                    60% achevé · Escalade possible si délai dépassé
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-lg font-bold text-white">
                  Détails de la réclamation
                </h3>
                <div className="mt-6 space-y-4 text-sm text-slate-300">
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
                      className="flex justify-between gap-3 border-b border-white/10 pb-2 last:border-none"
                    >
                      <span className="text-slate-400">{label}</span>
                      <span className={`font-semibold ${color}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-lg font-bold text-white">
                  Preuve Blockchain
                </h3>
                <div className="mt-6 rounded-3xl border border-sky-400/20 bg-slate-950/80 p-4 font-mono text-sm text-sky-300">
                  0x4a7f2c8e1b3d9f6a5c2e8d2c4b7a1f3e9d5c
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                    <span>Smart contract</span>
                    <span className="text-sky-300">FactureChain.sol</span>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                    <span>Bloc</span>
                    <span className="text-slate-100">#47291902</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-lg font-bold text-white">
                  Delai de résolution
                </h3>
                <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-300">
                  <div className="flex justify-between gap-3 text-slate-400">
                    <span>Interface ENEO</span>
                    <span className="text-emerald-300">✓ Connectée</span>
                  </div>
                  <div className="mt-4 rounded-full bg-white/10 p-1">
                    <div
                      className="h-3 rounded-full bg-orange-500"
                      style={{ width: "33%" }}
                    />
                  </div>
                  <div className="mt-3 text-xs text-slate-400">
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
