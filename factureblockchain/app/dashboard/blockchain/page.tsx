"use client";

import Link from "next/link";

export default function DashboardBlockchainPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-10">
        <main className="w-full">
          <div className="mb-10 rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-400">⛓ Registre Blockchain</p>
                <h1 className="text-3xl font-black text-white">
                  Preuves et traçabilité
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  Détails de l'ancrage blockchain, hashes et audits liés aux
                  factures.
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
                <h2 className="text-xl font-black text-white">
                  Registre de preuves
                </h2>
                <p className="mt-3 text-sm text-slate-400">
                  Chaque entrée de facture est associée à un hash immuable et
                  vérifiable.
                </p>
                <div className="mt-8 grid gap-4">
                  {[
                    {
                      label: "Hash action",
                      value: "0x4a7f2c8e1b3d9f6a5c2e8d2c4b7a1f3e9d5c",
                    },
                    { label: "Bloc", value: "#47291845" },
                    { label: "Réseau", value: "Polygon Mainnet" },
                    { label: "Contrat", value: "FactureChain.sol" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[24px] border border-white/10 bg-slate-950/80 p-5"
                    >
                      <div className="text-sm text-slate-400">{item.label}</div>
                      <div className="mt-2 text-base font-semibold text-slate-100">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h2 className="text-xl font-black text-white">
                  Pourquoi c'est utile
                </h2>
                <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
                  <p>
                    Les données blockchain consolident la preuve de consommation
                    réelle avec un horodatage immuable. Ce registre est le
                    premier élément utilisé pour contester une facture ENEO.
                  </p>
                  <p>
                    Les hashes peuvent être présentés à l'ARSEL ou à un
                    tribunal, et aucun acteur ne peut modifier l'historique
                    après l'ancrage.
                  </p>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-lg font-bold text-white">
                  Statut du registre
                </h3>
                <div className="mt-6 rounded-3xl bg-slate-950/80 p-5 text-sm text-sky-300">
                  <div className="mb-3 break-words">
                    0x4a7f2c8e1b3d9f6a5c2e8d2c4b7a1f3e9d5c
                  </div>
                  <div>Entrée enregistrée · immuable</div>
                </div>
                <div className="mt-6 space-y-4 text-sm text-slate-300">
                  {[
                    ["Réseau", "Polygon Mainnet", "text-teal-300"],
                    ["Validation", "✓ Confirmée", "text-emerald-300"],
                    ["Escalade", "En attente", "text-orange-300"],
                  ].map(([label, value, color]) => (
                    <div
                      key={label}
                      className="flex justify-between gap-4 border-b border-white/10 pb-2 text-slate-400 last:border-none"
                    >
                      <span>{label}</span>
                      <span className={`font-semibold ${color}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
