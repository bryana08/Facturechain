"use client";

import Link from "next/link";
import { useState } from "react";

const sections = [
  {
    title: "Infos contrat",
    description: "Facture Août 2026 · SOCADEL · Contrat CMR-YDE-2847391",
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
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-10">
        <main className="w-full">
          {/* Header Card */}
          <div className="mb-6 md:mb-10 rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-5 md:p-8 shadow-lg md:shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-slate-400">
                  📋 Réclamation
                </p>
                <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-white mt-1">
                  Nouvelle Réclamation
                </h1>
                <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-400 truncate">
                  Facture Août 2026 · SOCADEL · Contrat CMR-YDE-2847391
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
          <div className="grid gap-4 md:gap-6 lg:grid-cols-[1.6fr_0.9fr]">
            <div className="space-y-4 md:space-y-6">
              <div className="rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-5 md:p-8 shadow-lg md:shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                {/* Progression Card */}
                <div className="mb-4 md:mb-6 rounded-lg md:rounded-[32px] border border-white/10 bg-slate-950/80 p-3 md:p-6">
                  <div className="mb-2 md:mb-4 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400">
                    Progression
                  </div>
                  <div className="mb-2 md:mb-3 flex h-2 md:h-3 gap-1.5 md:gap-2 rounded-full bg-white/10">
                    <span className="w-1/3 rounded-full bg-orange-500" />
                    <span className="w-1/3 rounded-full bg-orange-500" />
                    <span className="w-1/3 rounded-full bg-orange-500/50" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.28em] text-slate-400">
                    <span className="text-emerald-300">① Identification</span>
                    <span className="text-emerald-300">
                      ② Preuve blockchain
                    </span>
                    <span className="text-orange-300">③ Soumission</span>
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-3 md:space-y-6">
                  {sections.map((section) => (
                    <div
                      key={section.title}
                      className="rounded-lg md:rounded-[28px] border border-white/10 bg-slate-950/80 p-3 md:p-6"
                    >
                      <div className="mb-2 md:mb-3 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400">
                        {section.title}
                      </div>
                      <p className="text-xs md:text-sm leading-5 md:leading-7 text-slate-300">
                        {section.description}
                      </p>
                    </div>
                  ))}

                  {/* Form Fields */}
                  <div className="rounded-lg md:rounded-[28px] border border-white/10 bg-slate-950/80 p-3 md:p-6">
                    <div className="grid gap-3 md:gap-6">
                      {[
                        {
                          label: "Numéro de contrat SOCADEL",
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
                          label: "Consommation facturée (kWh SOCADEL)",
                          value: "389 kWh · Écart : +77 kWh (+24.7%)",
                        },
                      ].map((field) => (
                        <div key={field.label}>
                          <label className="mb-1.5 md:mb-2 block text-[9px] sm:text-xs md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400">
                            {field.label}
                          </label>
                          {field.code ? (
                            <div className="rounded-lg md:rounded-3xl border border-sky-400/20 bg-slate-950/80 p-2.5 md:p-4 font-mono text-[10px] sm:text-xs md:text-sm text-sky-300 truncate">
                              {field.value}
                            </div>
                          ) : (
                            <input
                              className="w-full rounded-lg md:rounded-3xl border border-white/10 bg-slate-950/80 px-2.5 md:px-4 py-2 md:py-3 text-xs md:text-sm text-white outline-none focus:border-sky-400"
                              readOnly
                              value={field.value}
                            />
                          )}
                        </div>
                      ))}

                      <div>
                        <label className="mb-1.5 md:mb-2 block text-[9px] sm:text-xs md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400">
                          Description complémentaire (optionnel)
                        </label>
                        <textarea
                          className="min-h-[100px] md:min-h-[130px] w-full rounded-lg md:rounded-3xl border border-white/10 bg-slate-950/80 px-2.5 md:px-4 py-2 md:py-3 text-xs md:text-sm text-white outline-none focus:border-sky-400"
                          placeholder="Ajoutez un commentaire..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={() => setSubmitted(true)}
                    className="w-full rounded-lg md:rounded-3xl bg-orange-500 px-3 md:px-6 py-2.5 md:py-4 text-xs md:text-sm font-bold text-slate-950 transition hover:bg-orange-400"
                  >
                    Soumettre la réclamation →
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-4 md:space-y-6">
              <div className="rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-5 md:p-8 shadow-lg md:shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-sm md:text-lg font-bold text-white">
                  Infos blockchain
                </h3>
                <div className="mt-3 md:mt-6 space-y-2 md:space-y-4 text-xs md:text-sm text-slate-300">
                  {[
                    ["Contrat", "FactureChain.sol", "text-sky-300"],
                    ["Réseau", "Polygon Mainnet", "text-teal-300"],
                    ["Statut", "Enregistré", "text-emerald-300"],
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
                  Délai de résolution
                </h3>
                <div className="mt-3 md:mt-6 space-y-2 md:space-y-3 text-xs md:text-sm text-slate-300">
                  <div className="flex justify-between text-slate-400">
                    <span>Progression</span>
                    <span className="text-orange-300">33%</span>
                  </div>
                  <div className="rounded-full bg-white/10 p-0.5 md:p-1">
                    <div
                      className="h-2 md:h-3 rounded-full bg-gradient-to-r from-emerald-400 to-orange-400"
                      style={{ width: "33%" }}
                    />
                  </div>
                  <div className="text-[9px] md:text-xs text-slate-500">
                    12 jours passés · 24 jours restants
                  </div>
                </div>
                <div className="mt-3 md:mt-6 rounded-lg md:rounded-3xl border border-sky-400/20 bg-slate-950/80 p-2.5 md:p-4 text-xs md:text-sm text-sky-300">
                  <div className="font-semibold">Escalade automatique</div>
                  <p className="mt-1 md:mt-2 text-slate-400">
                    Si SOCADEL dépasse le délai légal, le smart contract escalade
                    automatiquement.
                  </p>
                </div>
              </div>

              <div className="rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-5 md:p-8 shadow-lg md:shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-sm md:text-lg font-bold text-white">
                  Blockchain proof
                </h3>
                <div className="mt-3 md:mt-6 rounded-lg md:rounded-3xl border border-sky-400/20 bg-slate-950/80 p-2.5 md:p-4 font-mono text-[10px] sm:text-xs md:text-sm text-sky-300 truncate">
                  0x4a7f2c8e1b3d9f6a5c2e8d2c4b7a1f3e9d5c
                </div>
                <div className="mt-3 md:mt-4 space-y-1.5 md:space-y-3 text-xs md:text-sm text-slate-300">
                  <div className="flex justify-between gap-2 border-b border-white/10 pb-1 md:pb-2">
                    <span>Smart contract</span>
                    <span className="text-teal-300 truncate">
                      FactureChain.sol
                    </span>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-white/10 pb-1 md:pb-2">
                    <span>Bloc</span>
                    <span className="text-teal-300">#47291845</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span>Statut</span>
                    <span className="text-emerald-300">Confirmé</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          {submitted ? (
            <div className="mt-6 md:mt-8 rounded-xl sm:rounded-2xl md:rounded-[36px] border border-teal-400/20 bg-emerald-950/90 p-5 sm:p-8 md:p-10 text-center text-slate-200 shadow-lg md:shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
              <div className="mb-4 md:mb-6 text-4xl md:text-6xl">✅</div>
              <h2 className="text-lg sm:text-2xl md:text-2xl font-black text-white">
                Réclamation soumise !
              </h2>
              <p className="mx-auto mt-2 md:mt-4 max-w-2xl text-xs sm:text-sm leading-5 md:leading-7 text-slate-300">
                Votre réclamation est ancrée sur la blockchain Polygon. Elle est
                publique, immuable et recevable devant l'ARSEL.
              </p>
              <div className="mx-auto mt-4 md:mt-6 max-w-xl rounded-lg md:rounded-3xl border border-sky-400/20 bg-slate-950/80 p-3 md:p-5 font-mono text-[11px] sm:text-xs md:text-sm text-sky-300 break-all">
                TX HASH :<br />
                0xb9c3f1a2e8d4517b6c0e9f3a2d1b8e7c4f5a2b1d3e6c9f0a7b2d4e1c8f3a0b5d2
                <br />
                <span className="text-emerald-300 block mt-2 md:mt-3">
                  ✓ Confirmé sur Polygon · Bloc #47291902 · 12 Août 2026, 09:14
                  UTC
                </span>
              </div>
              <div className="mt-4 md:mt-6 text-xs md:text-sm text-slate-400">
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
