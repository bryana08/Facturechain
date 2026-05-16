'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Dans le composant, ajoute :
const router = useRouter()
useEffect(() => {
  const user = localStorage.getItem('user')
  if (!user) router.push('/login')
}, [])
"use client";

import Link from "next/link";
import { useMemo } from "react";

const months = ["Mar", "Avr", "Mai", "Jun", "Jul", "Aoû"];
const reelData = [295, 310, 288, 320, 305, 312];
const factureData = [298, 312, 291, 325, 308, 389];
const MAX_KWH = 500;

const tableData = [
  {
    mois: "Août 2026",
    reel: 312,
    fact: 389,
    montant: "47 350",
    statut: "anomaly",
    hash: "0x4a7f...e9d5c",
  },
  {
    mois: "Juillet 2026",
    reel: 305,
    fact: 308,
    montant: "37 260",
    statut: "ok",
    hash: "0x9b2c...f3a1d",
  },
  {
    mois: "Juin 2026",
    reel: 320,
    fact: 325,
    montant: "39 450",
    statut: "ok",
    hash: "0x7e1a...c8b2f",
  },
  {
    mois: "Mai 2026",
    reel: 288,
    fact: 291,
    montant: "35 280",
    statut: "ok",
    hash: "0x3d9f...a4e7c",
  },
  {
    mois: "Avril 2026",
    reel: 310,
    fact: 312,
    montant: "37 890",
    statut: "ok",
    hash: "0x1c8b...d5f2a",
  },
  {
    mois: "Mars 2026",
    reel: 295,
    fact: 298,
    montant: "36 150",
    statut: "ok",
    hash: "0x6f4e...b9c3d",
  },
];

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
            <div className="flex w-full items-center gap-3 rounded-2xl bg-orange-500/10 px-4 py-3 text-sm font-semibold text-orange-300">
              <span>📊</span>
              Dashboard
            </div>
            <Link
              href="/dashboard/consommation"
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition text-slate-300 hover:bg-white/5 hover:text-white"
            >
              <span>📈</span>
              Consommation
            </Link>
            <Link
              href="/dashboard/factures"
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition text-slate-300 hover:bg-white/5 hover:text-white"
            >
              <span>📄</span>
              Factures
            </Link>
            <Link
              href="/dashboard/blockchain"
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition text-slate-300 hover:bg-white/5 hover:text-white"
            >
              <span>⛓</span>
              Blockchain
            </Link>
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
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-400">👋 Bonjour,</p>
                <h1 className="text-3xl font-black text-white">
                  Jean-Paul Mbarga
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-xl text-white transition hover:bg-white/10">
                  🔔
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-400 ring-2 ring-slate-950" />
                </button>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 text-sm font-black text-slate-950">
                  JM
                </div>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  label: "Anomalies détectées",
                  value: "1 / 6",
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
                  label: "Statut blockchain",
                  value: "Confirmé",
                  color: "text-sky-300",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[28px] border border-white/10 bg-slate-950/80 p-5"
                >
                  <div className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    {item.label}
                  </div>
                  <div className={`mt-3 text-2xl font-black ${item.color}`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-black text-white">
                      Vue d'ensemble
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                      Résumé du dossier et navigation vers les détails.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      title: "Consommation",
                      description: "Analyse des écarts réels vs facturés.",
                      href: "/dashboard/consommation",
                    },
                    {
                      title: "Factures",
                      description:
                        "Historique des factures et anomalies blockchain.",
                      href: "/dashboard/factures",
                    },
                    {
                      title: "Blockchain",
                      description: "Preuves immuables et statut d'ancrage.",
                      href: "/dashboard/blockchain",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 transition hover:border-orange-400/20 hover:bg-slate-900/90"
                    >
                      <div className="text-sm uppercase tracking-[0.28em] text-orange-300">
                        {card.title}
                      </div>
                      <p className="mt-4 text-sm leading-7 text-slate-300">
                        {card.description}
                      </p>
                      <Link
                        href={card.href}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-300"
                      >
                        Voir plus →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-lg font-bold text-white">Action rapide</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  La consommation d'août 2026 révèle une surcharge
                  significative. Ouvrez le détail pour préparer une réclamation
                  certifiée.
                </p>
                <div className="mt-8 grid gap-3">
                  <Link
                    href="/dashboard/consommation"
                    className="rounded-3xl bg-orange-500 px-5 py-4 text-sm font-bold text-slate-950 text-center transition hover:bg-orange-400"
                  >
                    Voir la consommation
                  </Link>
                  <Link
                    href="/dashboard/factures"
                    className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white text-center transition hover:border-white/20 hover:bg-white/10"
                  >
                    Voir l'historique des factures
                  </Link>
                </div>
              </div>

              <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-lg font-bold text-white">
                  Statut du dossier
                </h3>
                <div className="mt-6 space-y-4 text-sm text-slate-300">
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                    <div className="text-xs uppercase tracking-[0.28em] text-slate-400">
                      Dossier
                    </div>
                    <div className="mt-2 text-lg font-semibold text-slate-100">
                      En instruction
                    </div>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                    <div className="text-xs uppercase tracking-[0.28em] text-slate-400">
                      Dernière action
                    </div>
                    <div className="mt-2 text-lg font-semibold text-orange-300">
                      Anomalie confirmée
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
