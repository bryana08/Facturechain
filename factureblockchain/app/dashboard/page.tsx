"use client";

import Link from "next/link";
import { useMemo } from "react";

const months = ["Mar", "Avr", "Mai", "Jun", "Jul", "Aoû"];
const reelData = [295, 310, 288, 320, 305, 312];
const factureData = [298, 312, 291, 325, 308, 389];

export default function DashboardPage() {
  const chartBars = useMemo(
    () =>
      months.map((month, idx) => ({
        month,
        reel: reelData[idx],
        fact: factureData[idx],
        anomaly: idx === 5,
      })),
    [],
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-10">
        <main className="w-full">
          {/* Header Card */}
          <div className="mb-6 md:mb-10 rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-5 md:p-8 shadow-lg md:shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm text-slate-400">
                    👋 Bonjour,
                  </p>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-1 truncate">
                    Jean-Paul Mbarga
                  </h1>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="relative inline-flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-lg sm:rounded-xl md:rounded-2xl bg-white/5 text-base sm:text-lg md:text-xl text-white transition hover:bg-white/10">
                    🔔
                    <span className="absolute right-1 top-1 sm:right-1.5 sm:top-1.5 md:right-2 md:top-2 h-2 w-2 rounded-full bg-orange-400 ring-2 ring-slate-950" />
                  </button>
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 text-xs sm:text-sm font-black text-slate-950 flex-shrink-0">
                    JM
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="mt-4 sm:mt-6 md:mt-8 grid gap-2 sm:gap-3 grid-cols-2 md:grid-cols-4">
              {[
                {
                  label: "Anomalies",
                  value: "1 / 6",
                  color: "text-orange-300",
                },
                { label: "Montant", value: "9,350 F", color: "text-red-300" },
                {
                  label: "Consommation",
                  value: "308 kWh",
                  color: "text-teal-300",
                },
                {
                  label: "Blockchain",
                  value: "Confirmé",
                  color: "text-sky-300",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg md:rounded-[28px] border border-white/10 bg-slate-950/80 p-2 sm:p-3 md:p-5"
                >
                  <div className="text-[9px] sm:text-xs uppercase tracking-[0.2em] md:tracking-[0.28em] text-slate-400 truncate">
                    {item.label}
                  </div>
                  <div
                    className={`mt-1 md:mt-3 text-sm md:text-2xl font-black ${item.color}`}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overview Section */}
          <div className="grid gap-4 md:gap-6 lg:grid-cols-[1.6fr_0.9fr]">
            <div className="space-y-4 md:space-y-6">
              <div className="rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-5 md:p-8 shadow-lg md:shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <div className="mb-4 md:mb-6">
                  <h2 className="text-lg md:text-xl font-black text-white">
                    Vue d'ensemble
                  </h2>
                  <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-400">
                    Accédez aux détails par domaine.
                  </p>
                </div>
                <div className="grid gap-2 md:gap-3 sm:grid-cols-3">
                  {[
                    {
                      title: "Consommation",
                      description: "Analyse des écarts.",
                      href: "/dashboard/consommation",
                    },
                    {
                      title: "Factures",
                      description: "Historique et anomalies.",
                      href: "/dashboard/factures",
                    },
                    {
                      title: "Blockchain",
                      description: "Preuves immuables.",
                      href: "/dashboard/blockchain",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="rounded-lg md:rounded-[32px] border border-white/10 bg-slate-950/80 p-3 md:p-6 transition hover:border-orange-400/20 hover:bg-slate-900/90"
                    >
                      <div className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.28em] text-orange-300 truncate">
                        {card.title}
                      </div>
                      <p className="mt-1 md:mt-4 text-xs md:text-sm leading-5 md:leading-7 text-slate-300 line-clamp-2 md:line-clamp-none">
                        {card.description}
                      </p>
                      <Link
                        href={card.href}
                        className="mt-2 md:mt-6 inline-flex items-center gap-1 md:gap-2 text-xs md:text-sm font-semibold text-orange-300 hover:text-orange-200"
                      >
                        Voir →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Right Column */}
            <aside className="space-y-4 md:space-y-6">
              <div className="rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-5 md:p-8 shadow-lg md:shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-base md:text-lg font-bold text-white">
                  Action rapide
                </h3>
                <p className="mt-2 md:mt-4 text-xs md:text-sm leading-5 md:leading-7 text-slate-300">
                  Anomalie détectée. Préparez une réclamation.
                </p>
                <div className="mt-3 md:mt-8 grid gap-2 md:gap-3">
                  <Link
                    href="/scanner"
                    className="rounded-full md:rounded-3xl bg-orange-500 px-3 md:px-5 py-2 md:py-4 text-xs md:text-sm font-bold text-slate-950 text-center transition hover:bg-orange-400"
                  >
                    📷 Scanner compteur
                  </Link>
                  <Link
                    href="/audit"
                    className="rounded-full md:rounded-3xl border border-orange-400/30 bg-orange-500/10 px-3 md:px-5 py-2 md:py-4 text-xs md:text-sm font-semibold text-orange-300 text-center transition hover:bg-orange-500/20"
                  >
                    🔍 Lancer l’audit
                  </Link>
                  <Link
                    href="/dashboard/consommation"
                    className="rounded-full md:rounded-3xl border border-white/10 bg-white/5 px-3 md:px-5 py-2 md:py-4 text-xs md:text-sm font-semibold text-white text-center transition hover:border-white/20 hover:bg-white/10"
                  >
                    Consommation
                  </Link>
                  <Link
                    href="/dashboard/factures"
                    className="rounded-full md:rounded-3xl border border-white/10 bg-white/5 px-3 md:px-5 py-2 md:py-4 text-xs md:text-sm font-semibold text-white text-center transition hover:border-white/20 hover:bg-white/10"
                  >
                    Historique
                  </Link>
                </div>
              </div>

              <div className="rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-5 md:p-8 shadow-lg md:shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-base md:text-lg font-bold text-white">
                  Statut
                </h3>
                <div className="mt-3 md:mt-6 space-y-2 md:space-y-3 text-xs md:text-sm text-slate-300">
                  <div className="rounded-lg md:rounded-3xl border border-white/10 bg-slate-950/80 p-2.5 md:p-4">
                    <div className="text-[9px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.28em] text-slate-400">
                      Dossier
                    </div>
                    <div className="mt-0.5 md:mt-2 text-sm md:text-lg font-semibold text-slate-100">
                      En instruction
                    </div>
                  </div>
                  <div className="rounded-lg md:rounded-3xl border border-white/10 bg-slate-950/80 p-2.5 md:p-4">
                    <div className="text-[9px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.28em] text-slate-400">
                      Dernière
                    </div>
                    <div className="mt-0.5 md:mt-2 text-sm md:text-lg font-semibold text-orange-300">
                      Anomalie
                    </div>
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
