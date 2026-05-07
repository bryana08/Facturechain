"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

type SignalStatus = "nouveau" | "en_cours" | "validé" | "rejeté";
type Zone = "tous" | "centre" | "bastos" | "melen" | "essos" | "briqueterie";

interface Signalement {
  id: string;
  titre: string;
  zone: Exclude<Zone, "tous">;
  quartier: string;
  statut: SignalStatus;
  date: string;
  montant: string;
  ecart: string;
  signalements: number;
  hash?: string;
}

const signalements: Signalement[] = [
  { id: "SG-001", titre: "Surfacturation systématique Bastos", zone: "bastos",      quartier: "Bastos",      statut: "validé",    date: "12 Août 2026",  montant: "47 350",  ecart: "+24.7%", signalements: 34, hash: "0x4a7f...e9d5c" },
  { id: "SG-002", titre: "Anomalie compteur Melen secteur 3",  zone: "melen",       quartier: "Melen",       statut: "en_cours",  date: "08 Août 2026",  montant: "22 100",  ecart: "+18.2%", signalements: 17, hash: "0x9b2c...f3a1d" },
  { id: "SG-003", titre: "Coupures non facturées Centre-Ville",zone: "centre",      quartier: "Centre-Ville",statut: "nouveau",   date: "14 Août 2026",  montant: "15 800",  ecart: "+12.5%", signalements:  8, hash: undefined },
  { id: "SG-004", titre: "Double facturation Essos",           zone: "essos",       quartier: "Essos",       statut: "en_cours",  date: "05 Août 2026",  montant: "31 400",  ecart: "+21.1%", signalements: 22, hash: "0x7e1a...c8b2f" },
  { id: "SG-005", titre: "Index illisible Briqueterie",        zone: "briqueterie", quartier: "Briqueterie", statut: "nouveau",   date: "15 Août 2026",  montant: "9 500",   ecart: "+8.3%",  signalements:  5, hash: undefined },
  { id: "SG-006", titre: "Facturation estimée Bastos Nord",    zone: "bastos",      quartier: "Bastos Nord", statut: "validé",    date: "01 Août 2026",  montant: "38 200",  ecart: "+19.6%", signalements: 28, hash: "0x3d9f...a4e7c" },
  { id: "SG-007", titre: "Écart compteur Centre Administratif",zone: "centre",      quartier: "Centre Admin",statut: "rejeté",    date: "20 Juil 2026",  montant: "5 200",   ecart: "+3.1%",  signalements:  3, hash: "0x1c8b...d5f2a" },
  { id: "SG-008", titre: "Surtension non remboursée Melen",    zone: "melen",       quartier: "Melen Sud",   statut: "nouveau",   date: "16 Août 2026",  montant: "12 750",  ecart: "+10.8%", signalements:  6, hash: undefined },
];

const zoneLabels: Record<Exclude<Zone, "tous">, string> = {
  centre: "Centre-Ville", bastos: "Bastos", melen: "Melen",
  essos: "Essos", briqueterie: "Briqueterie",
};

const statusConfig: Record<SignalStatus, { label: string; color: string; bg: string; dot: string }> = {
  nouveau:   { label: "Nouveau",    color: "text-sky-300",     bg: "bg-sky-400/10",     dot: "bg-sky-400" },
  en_cours:  { label: "En cours",   color: "text-orange-300",  bg: "bg-orange-400/10",  dot: "bg-orange-400" },
  validé:    { label: "Validé",     color: "text-emerald-300", bg: "bg-emerald-400/10", dot: "bg-emerald-400" },
  rejeté:    { label: "Rejeté",     color: "text-slate-400",   bg: "bg-slate-700/30",   dot: "bg-slate-500" },
};

// Fake map coordinates (relative % inside the map box)
const zoneCoords: Record<Exclude<Zone, "tous">, { x: number; y: number }> = {
  centre:      { x: 48, y: 45 },
  bastos:      { x: 62, y: 30 },
  melen:       { x: 35, y: 55 },
  essos:       { x: 55, y: 65 },
  briqueterie: { x: 25, y: 38 },
};

export default function ObservatoirePage() {
  const [zoneFilter, setZoneFilter] = useState<Zone>("tous");
  const [statusFilter, setStatusFilter] = useState<SignalStatus | "tous">("tous");
  const [selected, setSelected] = useState<Signalement | null>(null);

  const filtered = useMemo(() =>
    signalements.filter(
      (s) =>
        (zoneFilter === "tous" || s.zone === zoneFilter) &&
        (statusFilter === "tous" || s.statut === statusFilter)
    ), [zoneFilter, statusFilter]);

  const stats = useMemo(() => ({
    total:    signalements.length,
    nouveau:  signalements.filter((s) => s.statut === "nouveau").length,
    enCours:  signalements.filter((s) => s.statut === "en_cours").length,
    validé:   signalements.filter((s) => s.statut === "validé").length,
    totalSignaleurs: signalements.reduce((a, s) => a + s.signalements, 0),
  }), []);

  // Group by zone for map pins
  const byZone = useMemo(() => {
    const map: Record<string, Signalement[]> = {};
    signalements.forEach((s) => {
      if (!map[s.zone]) map[s.zone] = [];
      map[s.zone].push(s);
    });
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-10">

        {/* Header */}
        <div className="mb-6 md:mb-8 rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-6 md:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs md:text-sm text-slate-400">🗺 Observatoire Communautaire</p>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-1">
                Carte des signalements
              </h1>
              <p className="mt-1 text-xs md:text-sm text-slate-400">
                Visualisez les anomalies de facturation par quartier à Yaoundé. Données vérifiées par blockchain.
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link href="/preuves"
                className="inline-flex rounded-lg sm:rounded-2xl border border-orange-400/30 bg-orange-500/10 px-3 py-2 text-xs sm:text-sm font-semibold text-orange-300 transition hover:bg-orange-500/20">
                📎 Mes preuves
              </Link>
              <Link href="/dashboard"
                className="inline-flex rounded-lg sm:rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/10">
                ← Retour
              </Link>
            </div>
          </div>

          {/* Stats KPI */}
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {[
              { label: "Total signalements", value: stats.total,          color: "text-white" },
              { label: "Nouveaux",            value: stats.nouveau,        color: "text-sky-300" },
              { label: "En cours",            value: stats.enCours,        color: "text-orange-300" },
              { label: "Validés blockchain",  value: stats.validé,         color: "text-emerald-300" },
            ].map((k) => (
              <div key={k.label} className="rounded-lg md:rounded-[24px] border border-white/10 bg-slate-950/80 p-2.5 md:p-4">
                <div className="text-[9px] sm:text-xs uppercase tracking-widest text-slate-400">{k.label}</div>
                <div className={`mt-1 text-xl md:text-3xl font-black ${k.color}`}>{k.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:gap-6 lg:grid-cols-[1.6fr_1fr]">

          {/* Map + Filters */}
          <div className="space-y-4">

            {/* Filters */}
            <div className="rounded-xl md:rounded-[28px] border border-white/10 bg-slate-900/95 p-3 md:p-5">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs text-slate-400 self-center mr-1">Zone :</span>
                {(["tous", "centre", "bastos", "melen", "essos", "briqueterie"] as Zone[]).map((z) => (
                  <button key={z} onClick={() => setZoneFilter(z)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                      zoneFilter === z ? "bg-orange-500 text-slate-950" : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                    }`}>
                    {z === "tous" ? "Tous" : zoneLabels[z]}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-slate-400 self-center mr-1">Statut :</span>
                {(["tous", "nouveau", "en_cours", "validé", "rejeté"] as (SignalStatus | "tous")[]).map((s) => {
                  const cfg = s === "tous" ? null : statusConfig[s];
                  return (
                    <button key={s} onClick={() => setStatusFilter(s)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition flex items-center gap-1.5 ${
                        statusFilter === s ? "bg-orange-500 text-slate-950" : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                      }`}>
                      {cfg && <span className={`inline-flex h-1.5 w-1.5 rounded-full ${cfg.dot}`} />}
                      {s === "tous" ? "Tous" : cfg?.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Map */}
            <div className="rounded-xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-3 md:p-5 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm md:text-base font-bold text-white">Yaoundé — Vue par quartier</h2>
                <span className="text-xs text-slate-400">{filtered.length} résultats</span>
              </div>

              {/* Stylized map */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10"
                   style={{ aspectRatio: "16/9" }}>
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                {/* Zone areas (decorative blobs) */}
                {Object.entries(zoneCoords).map(([zone, pos]) => {
                  const zoneSignals = byZone[zone] || [];
                  const hasAnomaly = zoneSignals.some((s) => s.statut === "nouveau" || s.statut === "en_cours");
                  const isFiltered = zoneFilter === "tous" || zoneFilter === zone;
                  return (
                    <div key={zone} className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
                      {/* Pulse ring */}
                      {hasAnomaly && isFiltered && (
                        <div className="absolute inset-0 rounded-full animate-ping opacity-30"
                          style={{ width: 40, height: 40, margin: -8, backgroundColor: "#f97316" }} />
                      )}
                      <button
                        onClick={() => {
                          setZoneFilter(zone as Zone);
                          setSelected(zoneSignals[0] || null);
                        }}
                        className={`relative flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full border-2 text-[10px] md:text-xs font-black transition ${
                          isFiltered
                            ? hasAnomaly
                              ? "border-orange-400 bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/40"
                              : "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                            : "border-white/20 bg-slate-800 text-slate-400 opacity-40"
                        }`}>
                        {zoneSignals.length}
                      </button>
                      <div className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] md:text-[10px] font-semibold ${isFiltered ? "text-slate-300" : "text-slate-600"}`}>
                        {zoneLabels[zone as Exclude<Zone, "tous">]}
                      </div>
                    </div>
                  );
                })}

                {/* Legend */}
                <div className="absolute bottom-3 left-3 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                    <span className="inline-flex h-2 w-2 rounded-full bg-orange-400" /> Anomalie active
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" /> Validé / résolu
                  </div>
                </div>

                <div className="absolute top-3 right-3 rounded-lg bg-slate-900/80 px-2 py-1 text-[9px] text-slate-400 backdrop-blur">
                  Yaoundé, Cameroun
                </div>
              </div>
            </div>
          </div>

          {/* Signal list + detail */}
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-sm md:text-base font-bold text-white px-1">
              Signalements ({filtered.length})
            </h2>

            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {filtered.map((s) => {
                const cfg = statusConfig[s.statut];
                const isSelected = selected?.id === s.id;
                return (
                  <button key={s.id} onClick={() => setSelected(isSelected ? null : s)}
                    className={`w-full rounded-xl md:rounded-2xl border p-3 md:p-4 text-left transition ${
                      isSelected ? "border-orange-400/40 bg-orange-950/30" : "border-white/10 bg-slate-900/90 hover:border-white/20 hover:bg-slate-900"
                    }`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex h-1.5 w-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                          <span className="text-[10px] font-mono text-slate-500">{s.id}</span>
                        </div>
                        <div className="text-xs md:text-sm font-semibold text-white truncate">{s.titre}</div>
                        <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-slate-400">
                          <span>📍 {s.quartier}</span>
                          <span>👥 {s.signalements} signaleurs</span>
                          <span>📅 {s.date}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${cfg.bg} ${cfg.color}`}>
                          {cfg.label}
                        </span>
                        <span className="text-xs font-bold text-red-300">{s.ecart}</span>
                      </div>
                    </div>

                    {/* Expanded detail */}
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="rounded-lg bg-slate-950/60 p-2">
                            <div className="text-[9px] uppercase tracking-widest text-slate-500">Montant contesté</div>
                            <div className="mt-0.5 font-bold text-red-300">{s.montant} FCFA</div>
                          </div>
                          <div className="rounded-lg bg-slate-950/60 p-2">
                            <div className="text-[9px] uppercase tracking-widest text-slate-500">Écart détecté</div>
                            <div className="mt-0.5 font-bold text-orange-300">{s.ecart}</div>
                          </div>
                        </div>
                        {s.hash && (
                          <div className="rounded-lg bg-slate-950/60 p-2 font-mono text-[10px] text-sky-300 truncate">
                            ⛓ {s.hash}
                          </div>
                        )}
                        <div className="flex gap-2 pt-1">
                          <Link href="/reclamation"
                            className="flex-1 rounded-full bg-orange-500 py-1.5 text-center text-[10px] font-bold text-slate-950 hover:bg-orange-400 transition">
                            Rejoindre →
                          </Link>
                          <Link href="/preuves"
                            className="flex-1 rounded-full border border-white/10 bg-white/5 py-1.5 text-center text-[10px] font-semibold text-slate-300 hover:bg-white/10 transition">
                            Ajouter preuve
                          </Link>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}

              {filtered.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 text-center text-sm text-slate-400">
                  Aucun signalement pour ces filtres.
                </div>
              )}
            </div>

            {/* Signaler un nouveau */}
            <div className="rounded-xl md:rounded-2xl border border-dashed border-orange-500/30 bg-orange-950/10 p-4 text-center">
              <p className="text-xs text-slate-400 mb-2">Vous avez une anomalie non signalée ?</p>
              <div className="flex gap-2 justify-center">
                <Link href="/scanner"
                  className="rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-orange-400 transition">
                  📷 Scanner et signaler
                </Link>
                <Link href="/reclamation"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 transition">
                  Déposer un dossier
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
