"use client";

import Link from "next/link";
import { useMemo } from "react";

const months = ["Mar", "Avr", "Mai", "Jun", "Jul", "Aoû"];
const reelData = [295, 310, 288, 320, 305, 312];
const factureData = [298, 312, 291, 325, 308, 389];
const MAX_KWH = 500;

export default function DashboardConsommationPage() {
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
          <div className="mb-10 rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-400">📊 Tableau de bord</p>
                <h1 className="text-3xl font-black text-white">
                  Analyse de consommation détaillée
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  Comparaison entre consommation réelle enregistrée et
                  consommation facturée.
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                ← Retour au résumé
              </Link>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-black text-white">
                      Consommation réelle vs facturée
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                      Données des 6 derniers mois et anomalie détectée.
                    </p>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
                  <div className="absolute left-6 top-6 flex h-[calc(100%-3rem)] flex-col justify-between text-xs text-slate-500">
                    <span>500</span>
                    <span>375</span>
                    <span>250</span>
                    <span>125</span>
                    <span>0</span>
                  </div>
                  <div className="ml-16">
                    <div className="grid h-52 grid-cols-6 items-end gap-2">
                      {chartBars.map((bar, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center gap-2"
                        >
                          <div className="grid h-full w-full gap-2">
                            <div
                              className="rounded-t-2xl bg-teal-400"
                              style={{
                                height: `${(bar.reel / MAX_KWH) * 210}px`,
                              }}
                            />
                            <div
                              className={`rounded-t-2xl ${bar.anomaly ? "bg-red-500 animate-pulse" : "bg-orange-400"}`}
                              style={{
                                height: `${(bar.fact / MAX_KWH) * 210}px`,
                              }}
                            />
                          </div>
                          <span
                            className={`text-[10px] ${bar.anomaly ? "text-orange-300" : "text-slate-400"}`}
                          >
                            {bar.month}
                            {bar.anomaly ? " ⚠" : ""}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h2 className="text-xl font-black text-white">Insight</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Le détail de la consommation confirme un écart de +24.7% sur
                  Août 2026. Ce contraste entre la mesure réelle blockchain et
                  la facture SOCADEL sert de base à une éventuelle réclamation.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      label: "Anomalies détectées",
                      value: "1 sur 6",
                      color: "text-orange-300",
                    },
                    {
                      label: "Montant contestable",
                      value: "9 350 FCFA",
                      color: "text-red-300",
                    },
                    {
                      label: "Consommation moyenne",
                      value: "308 kWh",
                      color: "text-teal-300",
                    },
                    {
                      label: "Tendance",
                      value: "Renforcement du contrôle",
                      color: "text-slate-200",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[24px] bg-slate-950/80 p-5"
                    >
                      <div className="text-sm text-slate-400">{item.label}</div>
                      <div className={`mt-3 text-2xl font-black ${item.color}`}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-lg font-bold text-white">Actions</h3>
                <div className="mt-6 space-y-4 text-sm text-slate-300">
                  <div className="rounded-3xl bg-slate-950/80 p-4">
                    <div className="font-semibold text-white">
                      Réclamation recommandée
                    </div>
                    <div className="mt-2 text-slate-400">
                      L'anomalie Août 2026 est éligible à contestation.
                    </div>
                  </div>
                  <Link
                    href="/reclamation"
                    className="inline-flex w-full items-center justify-center rounded-3xl bg-orange-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-400"
                  >
                    Déposer une réclamation
                  </Link>
                </div>
              </div>

              <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-lg font-bold text-white">Références</h3>
                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Contrat</span>
                    <span className="font-semibold text-slate-100">
                      CMR-YDE-2847391
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Réseau</span>
                    <span className="font-semibold text-teal-300">
                      Polygon Mainnet
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hash critique</span>
                    <span className="font-semibold text-sky-300">
                      0x4a7f...e9d5c
                    </span>
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
