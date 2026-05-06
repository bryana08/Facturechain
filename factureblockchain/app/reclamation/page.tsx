"use client";

import Link from "next/link";
import { useState } from "react";

const sections = [
  {
    title: "Infos contrat",
    description: "Facture Août 2026 · ENEO · Contrat CMR-YDE-2847391",
  },
  {
    title: "Preuve blockchain",
    description: "Hash de consommation enregistré sur Polygon",
  },
  {
    title: "Détails",
    description: "Informations supplémentaires et contexte de la réclamation",
  },
];

export default function ReclamationPage() {
  const [submitted, setSubmitted] = useState(false);

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
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition bg-orange-500/10 text-orange-300"
            >
              <span>📋</span>
              Réclamations
            </Link>
            <Link
              href="/suivi"
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition text-slate-300 hover:bg-white/5 hover:text-white"
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
                <p className="text-sm text-slate-400">📋 Réclamation</p>
                <h1 className="text-3xl font-black text-white">
                  Nouvelle Réclamation
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  Facture Août 2026 · ENEO · Contrat CMR-YDE-2847391
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

          <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <div className="mb-6 rounded-[32px] border border-white/10 bg-slate-950/80 p-6">
                  <div className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">
                    Progression
                  </div>
                  <div className="mb-3 flex h-3 gap-2 rounded-full bg-white/10">
                    <span className="w-1/3 rounded-full bg-orange-500" />
                    <span className="w-1/3 rounded-full bg-orange-500" />
                    <span className="w-1/3 rounded-full bg-orange-500/50" />
                  </div>
                  <div className="flex gap-3 text-[11px] uppercase tracking-[0.28em] text-slate-400">
                    <span className="text-emerald-300">① Identification</span>
                    <span className="text-emerald-300">
                      ② Preuve blockchain
                    </span>
                    <span className="text-orange-300">③ Soumission</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {sections.map((section) => (
                    <div
                      key={section.title}
                      className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6"
                    >
                      <div className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-400">
                        {section.title}
                      </div>
                      <p className="text-sm leading-7 text-slate-300">
                        {section.description}
                      </p>
                    </div>
                  ))}

                  <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
                    <div className="grid gap-6">
                      {[
                        {
                          label: "Numéro de contrat ENEO",
                          value: "CMR-YDE-2847391",
                        },
                        { label: "Période contestée", value: "Août 2026" },
                        {
                          label: "Preuve Blockchain — Hash de consommation",
                          value: "0x4a7f2c8e1b3d9f6a5c2e8d2c4b7a1f3e9d5c",
                          code: true,
                        },
                        {
                          label: "Consommation réelle (kWh blockchain)",
                          value: "312 kWh",
                        },
                        {
                          label: "Consommation facturée (kWh ENEO)",
                          value: "389 kWh · Écart : +77 kWh (+24.7%)",
                        },
                      ].map((field) => (
                        <div key={field.label}>
                          <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-slate-400">
                            {field.label}
                          </label>
                          {field.code ? (
                            <div className="rounded-3xl border border-sky-400/20 bg-slate-950/80 p-4 font-mono text-sm text-sky-300">
                              {field.value}
                            </div>
                          ) : (
                            <input
                              className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-sky-400"
                              readOnly
                              value={field.value}
                            />
                          )}
                        </div>
                      ))}

                      <div>
                        <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-slate-400">
                          Description complémentaire (optionnel)
                        </label>
                        <textarea
                          className="min-h-[130px] w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-sky-400"
                          placeholder="Ajoutez un commentaire..."
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSubmitted(true)}
                    className="w-full rounded-3xl bg-orange-500 px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-orange-400"
                  >
                    Soumettre la réclamation →
                  </button>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-lg font-bold text-white">
                  Infos blockchain
                </h3>
                <div className="mt-6 space-y-4 text-sm text-slate-300">
                  {[
                    ["Contrat", "FactureChain.sol", "text-sky-300"],
                    ["Réseau", "Polygon Mainnet", "text-teal-300"],
                    ["Statut", "Enregistré", "text-emerald-300"],
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
                  Délai de résolution
                </h3>
                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  <div className="flex justify-between text-slate-400">
                    <span>Progression</span>
                    <span className="text-orange-300">33%</span>
                  </div>
                  <div className="rounded-full bg-white/10 p-1">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-orange-400"
                      style={{ width: "33%" }}
                    />
                  </div>
                  <div className="text-xs text-slate-500">
                    12 jours passés · 24 jours restants
                  </div>
                </div>
                <div className="mt-6 rounded-3xl border border-sky-400/20 bg-slate-950/80 p-4 text-sm text-sky-300">
                  <div className="font-semibold">Escalade automatique</div>
                  <p className="mt-2 text-slate-400">
                    Si ENEO dépasse le délai légal, le smart contract escalade
                    automatiquement vers l'ARSEL.
                  </p>
                </div>
              </div>
              <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-lg font-bold text-white">
                  Blockchain proof
                </h3>
                <div className="mt-6 rounded-3xl border border-sky-400/20 bg-slate-950/80 p-4 font-mono text-sm text-sky-300">
                  0x4a7f2c8e1b3d9f6a5c2e8d2c4b7a1f3e9d5c
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                    <span>Smart contract</span>
                    <span className="text-teal-300">FactureChain.sol</span>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                    <span>Bloc</span>
                    <span className="text-teal-300">#47291845</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Statut</span>
                    <span className="text-emerald-300">Confirmé</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {submitted ? (
            <div className="mt-8 rounded-[36px] border border-teal-400/20 bg-emerald-950/90 p-10 text-center text-slate-200 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
              <div className="mb-6 text-6xl">✅</div>
              <h2 className="text-2xl font-black text-white">
                Réclamation soumise !
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                Votre réclamation est ancrée sur la blockchain Polygon. Elle est
                publique, immuable et recevable devant l'ARSEL.
              </p>
              <div className="mx-auto mt-6 max-w-xl rounded-3xl border border-sky-400/20 bg-slate-950/80 p-5 font-mono text-sm text-sky-300">
                TX HASH :<br />
                0xb9c3f1a2e8d4517b6c0e9f3a2d1b8e7c4f5a2b1d3e6c9f0a7b2d4e1c8f3a0b5d2
                <br />
                <span className="text-emerald-300 block mt-3">
                  ✓ Confirmé sur Polygon · Bloc #47291902 · 12 Août 2026, 09:14
                  UTC
                </span>
              </div>
              <div className="mt-6 text-sm text-slate-400">
                Numéro de suivi :{" "}
                <span className="font-semibold text-teal-300">
                  #FC-2026-0847
                </span>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
