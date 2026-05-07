"use client";

import Link from "next/link";
import { useState } from "react";

type ArselDecision = "pending" | "injonction" | "rejet";

interface DossierRecours {
  id: string;
  abonne: string;
  contrat: string;
  zone: string;
  dateEscalade: string;
  montantConteste: string;
  ecartEvalue: string;
  statut: ArselDecision;
  preuvesAbonneliesHash: string[];
}

const mockDossiers: DossierRecours[] = [
  { id: "#FC-2026-0847", abonne: "Jean-Paul Mbarga", contrat: "CMR-YDE-2847391", zone: "Yaoundé Centre", dateEscalade: "05 Sept 2026", montantConteste: "47 350", ecartEvalue: "+24.7%", statut: "pending", preuvesAbonneliesHash: ["0x4a7f...e9d5c", "QmX9bK...NvMr"] },
  { id: "#FC-2026-0902", abonne: "Marie Toure", contrat: "CMR-DLA-1092837", zone: "Douala Akwa", dateEscalade: "02 Sept 2026", montantConteste: "125 000", ecartEvalue: "+45.2%", statut: "injonction", preuvesAbonneliesHash: ["0x992d...f4a1x"] },
  { id: "#FC-2026-0775", abonne: "Entreprise SOCACOR", contrat: "CMR-YDE-8833912", zone: "Yaoundé Sud", dateEscalade: "15 Août 2026", montantConteste: "450 000", ecartEvalue: "+12.1%", statut: "rejet", preuvesAbonneliesHash: [] },
  { id: "#FC-2026-0915", abonne: "Albert Ndi", contrat: "CMR-YDE-4455821", zone: "Bastos Yaoundé", dateEscalade: "07 Sept 2026", montantConteste: "32 100", ecartEvalue: "+18.5%", statut: "pending", preuvesAbonneliesHash: ["0x88cc...1234b"] },
];

export default function JuridiqueArselPage() {
  const [search, setSearch] = useState("");
  const [selectedDossier, setSelectedDossier] = useState<DossierRecours | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionDone, setActionDone] = useState(false);

  const filteredDossiers = mockDossiers.filter(d => d.id.toLowerCase().includes(search.toLowerCase()) || d.abonne.toLowerCase().includes(search.toLowerCase()));

  const handleDecision = (decision: "injonction" | "rejet") => {
    setActionLoading(true);
    setTimeout(() => {
      setActionLoading(false);
      setActionDone(true);
      if (selectedDossier) {
          selectedDossier.statut = decision;
      }
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-10">

        {/* Header */}
        <div className="mb-6 md:mb-10 rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-6 md:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs md:text-sm text-amber-400">⚖️ Portail Régulateur</p>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-1">
                Espace ARSEL (Juridique)
              </h1>
              <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-400">
                Traitement des recours escaladés après le délai légal imposé à l'opérateur (SOCADEL).
              </p>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 flex-shrink-0"
            >
              ← Retour au Dashboard Abonnés
            </Link>
          </div>

          <div className="mt-6 md:mt-8 grid grid-cols-3 gap-2 md:gap-4">
             {[
              { label: "Dossiers Escaladés", value: "1 245", color: "text-white" },
              { label: "Injonctions Émises", value: "852", color: "text-emerald-400" },
              { label: "Valeur Régulée", value: "32.4M FCFA", color: "text-amber-400" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-slate-950/50 p-3 md:p-5">
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-slate-500">{stat.label}</div>
                <div className={`mt-1 md:mt-2 text-lg md:text-3xl font-black ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
            {/* List */}
            <div className="rounded-xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 md:p-6 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <div className="mb-4 md:mb-6">
                    <h2 className="text-base md:text-lg font-bold text-white mb-3">Recours en attente d'arbitrage</h2>
                    <input
                        type="text"
                        placeholder="Rechercher un n° de dossier ou abonné..."
                        className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-amber-400/50 transition placeholder:text-slate-600"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {filteredDossiers.map(dossier => (
                        <div
                            key={dossier.id}
                            onClick={() => { setSelectedDossier(dossier); setActionDone(false); }}
                            className={`cursor-pointer rounded-2xl border p-4 transition ${selectedDossier?.id === dossier.id ? "border-amber-400/40 bg-amber-950/20" : "border-white/10 bg-slate-950/50 hover:bg-white/5"}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="font-mono text-xs text-amber-300">{dossier.id}</div>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${dossier.statut === "pending" ? "bg-orange-400/10 text-orange-400" : dossier.statut === "injonction" ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"}`}>
                                    {dossier.statut}
                                </span>
                            </div>
                            <div className="font-semibold text-white text-sm">{dossier.abonne}</div>
                            <div className="flex justify-between items-end mt-2 text-xs text-slate-400">
                                <div>Depuis le {dossier.dateEscalade}</div>
                                <div className="font-bold text-red-400">{dossier.montantConteste} FCFA</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail View */}
            <div className="rounded-xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 md:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)] flex flex-col">
                {selectedDossier ? (
                    <>
                        <div className="mb-6 border-b border-white/10 pb-6">
                            <div className="flex justify-between items-center mb-1">
                                <h2 className="text-xl md:text-2xl font-black text-white">{selectedDossier.abonne}</h2>
                                <span className="font-mono text-sm text-slate-400">{selectedDossier.id}</span>
                            </div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest">{selectedDossier.zone} • {selectedDossier.contrat}</div>
                        </div>

                        <div className="flex-1 space-y-6">
                           <div>
                                <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-3">Synthèse du litige (SOCADEL)</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-xl bg-slate-950/60 p-3">
                                        <div className="text-[10px] text-slate-400">Montant réclamé</div>
                                        <div className="font-black text-red-400 text-lg">{selectedDossier.montantConteste} F</div>
                                    </div>
                                    <div className="rounded-xl bg-slate-950/60 p-3">
                                        <div className="text-[10px] text-slate-400">Écart Algorithmique</div>
                                        <div className="font-black text-orange-400 text-lg">{selectedDossier.ecartEvalue}</div>
                                    </div>
                                </div>
                           </div>

                           <div>
                               <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-3">Preuves Blockchain & IPFS Fournies</h3>
                               {selectedDossier.preuvesAbonneliesHash.length > 0 ? (
                                   <div className="space-y-2">
                                       {selectedDossier.preuvesAbonneliesHash.map(hash => (
                                           <div key={hash} className="rounded-lg border border-sky-400/20 bg-sky-950/10 p-2 text-xs font-mono text-sky-300 flex items-center justify-between">
                                               <span>{hash}</span>
                                               <span className="text-emerald-400">✓ Validé</span>
                                           </div>
                                       ))}
                                   </div>
                               ) : (
                                   <div className="rounded-xl bg-slate-950/60 p-4 text-center text-sm text-slate-500 italic">
                                       Aucune preuve cryptographique liée
                                   </div>
                               )}
                           </div>
                           
                           {/* Legal action area */}
                           <div className="mt-8 pt-6 border-t border-white/10">
                               {selectedDossier.statut === "pending" && !actionDone && (
                                   <div className="space-y-4">
                                       <h3 className="text-sm font-bold text-white">Action Réglementaire Requise</h3>
                                       <p className="text-xs text-slate-400">L'opérateur n'a pas répondu dans le délai imparti. L'ARSEL doit trancher sur la base des preuves fournies ci-dessus.</p>
                                       
                                       <div className="grid grid-cols-2 gap-3 mt-4">
                                            <button 
                                                onClick={() => handleDecision("injonction")}
                                                disabled={actionLoading}
                                                className="rounded-xl bg-emerald-500 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50">
                                                {actionLoading ? "Signature..." : "Injonction de Remboursement"}
                                            </button>
                                            <button 
                                                onClick={() => handleDecision("rejet")}
                                                disabled={actionLoading}
                                                className="rounded-xl border border-red-500/50 bg-red-500/10 py-3 text-sm font-bold text-red-500 transition hover:bg-red-500/20 disabled:opacity-50">
                                                Rejeter la demande
                                            </button>
                                       </div>
                                       <div className="text-[10px] text-center text-slate-500 mt-2">Dépôt scellé sur blockchain après arbitrage.</div>
                                   </div>
                               )}

                               {(selectedDossier.statut !== "pending" || actionDone) && (
                                    <div className={`rounded-xl p-5 border ${selectedDossier.statut === "injonction" ? "border-emerald-500/30 bg-emerald-950/20" : "border-red-500/30 bg-red-950/20"}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl">{selectedDossier.statut === "injonction" ? "⚖️" : "🛑"}</div>
                                            <div>
                                                <div className={`font-bold ${selectedDossier.statut === "injonction" ? "text-emerald-400" : "text-red-400"}`}>
                                                    {selectedDossier.statut === "injonction" ? "Injonction émise à SOCADEL" : "Recours rejeté"}
                                                </div>
                                                <div className="text-xs text-slate-400 mt-1">L'action a été enregistrée sur le registre public.</div>
                                            </div>
                                        </div>
                                    </div>
                               )}
                           </div>
                        </div>
                    </>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                        <div className="text-4xl mb-4 opacity-50">⚖️</div>
                        <h3 className="text-lg font-bold text-slate-300">Aucun dossier sélectionné</h3>
                        <p className="mt-2 text-sm text-slate-500">Sélectionnez un recours dans la liste pour procéder à l'arbitrage.</p>
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}
