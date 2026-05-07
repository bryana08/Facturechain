"use client";

import Link from "next/link";

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

export default function DashboardFacturesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-10">
        <main className="w-full">
          <div className="mb-10 rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  📄 Historique des factures
                </p>
                <h1 className="text-3xl font-black text-white">
                  Factures détaillées
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  Affichage complet des relevés, montants facturés et statuts de
                  vérification.
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

          <div className="rounded-[36px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/80">
              <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-300">
                <thead className="bg-slate-950/90 text-slate-500">
                  <tr>
                    {[
                      "Période",
                      "kWh Réel",
                      "kWh Facturé",
                      "Écart",
                      "Montant FCFA",
                      "Statut",
                      "Hash Blockchain",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-5 py-4 uppercase tracking-[0.18em]"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => {
                    const ecart = (
                      ((row.fact - row.reel) / row.reel) *
                      100
                    ).toFixed(1);
                    const ecartPos = parseFloat(ecart) > 5;
                    return (
                      <tr
                        key={row.mois}
                        className="border-t border-white/10 transition hover:bg-white/5"
                      >
                        <td className="px-5 py-4">{row.mois}</td>
                        <td className="px-5 py-4">{row.reel} kWh</td>
                        <td className="px-5 py-4">{row.fact} kWh</td>
                        <td
                          className={`px-5 py-4 text-sm ${ecartPos ? "text-red-400" : "text-emerald-400"}`}
                        >
                          {ecartPos ? "+" : ""}
                          {ecart}%
                        </td>
                        <td className="px-5 py-4">{row.montant} FCFA</td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${
                              row.statut === "ok"
                                ? "bg-emerald-400/10 text-emerald-300"
                                : row.statut === "anomaly"
                                  ? "bg-orange-400/10 text-orange-300"
                                  : "bg-red-500/10 text-red-300"
                            }`}
                          >
                            {row.statut === "ok"
                              ? "✓ Payée"
                              : row.statut === "anomaly"
                                ? "⚠ Anomalie"
                                : "✗ En litige"}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sky-300">{row.hash}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
