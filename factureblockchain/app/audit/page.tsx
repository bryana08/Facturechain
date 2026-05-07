"use client";

import Link from "next/link";
import { useState, useRef } from "react";

type AuditStatus = "idle" | "analyzing" | "done";

interface AuditRow {
  mois: string;
  indexDebut: number;
  indexFin: number;
  reelKwh: number;
  factureKwh: number;
  ecartPct: number;
  montantFCFA: string;
  hash: string;
  anomaly: boolean;
}

const mockAuditData: AuditRow[] = [
  { mois: "Août 2026",    indexDebut: 14511, indexFin: 14823, reelKwh: 312, factureKwh: 389, ecartPct: 24.7,  montantFCFA: "47 350", hash: "0x4a7f...e9d5c", anomaly: true },
  { mois: "Juillet 2026", indexDebut: 14206, indexFin: 14511, reelKwh: 305, factureKwh: 308, ecartPct:  0.98, montantFCFA: "37 260", hash: "0x9b2c...f3a1d", anomaly: false },
  { mois: "Juin 2026",    indexDebut: 13886, indexFin: 14206, reelKwh: 320, factureKwh: 325, ecartPct:  1.56, montantFCFA: "39 450", hash: "0x7e1a...c8b2f", anomaly: false },
  { mois: "Mai 2026",     indexDebut: 13598, indexFin: 13886, reelKwh: 288, factureKwh: 291, ecartPct:  1.04, montantFCFA: "35 280", hash: "0x3d9f...a4e7c", anomaly: false },
  { mois: "Avril 2026",   indexDebut: 13288, indexFin: 13598, reelKwh: 310, factureKwh: 312, ecartPct:  0.65, montantFCFA: "37 890", hash: "0x1c8b...d5f2a", anomaly: false },
  { mois: "Mars 2026",    indexDebut: 12993, indexFin: 13288, reelKwh: 295, factureKwh: 298, ecartPct:  1.02, montantFCFA: "36 150", hash: "0x6f4e...b9c3d", anomaly: false },
];

const auditSteps = [
  { label: "Lecture du document",       duration: 900 },
  { label: "Extraction des données",    duration: 800 },
  { label: "Récupération blockchain",   duration: 700 },
  { label: "Calcul des écarts",         duration: 600 },
  { label: "Détection des anomalies",   duration: 500 },
  { label: "Génération du rapport",     duration: 400 },
];

export default function AuditPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<AuditStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [currentStepLabel, setCurrentStepLabel] = useState("");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setFileName(file.name);
  }

  async function runAudit() {
    if (!fileName) return;
    setStatus("analyzing");
    setProgress(0);
    setCompletedSteps([]);

    let elapsed = 0;
    const total = auditSteps.reduce((a, s) => a + s.duration, 0);

    for (let i = 0; i < auditSteps.length; i++) {
      const s = auditSteps[i];
      setCurrentStepLabel(s.label);
      await new Promise((r) => setTimeout(r, s.duration));
      elapsed += s.duration;
      setProgress(Math.round((elapsed / total) * 100));
      setCompletedSteps((prev) => [...prev, s.label]);
    }

    setStatus("done");
  }

  const anomalies = mockAuditData.filter((r) => r.anomaly);
  const totalEcart = mockAuditData.reduce((s, r) => s + (r.factureKwh - r.reelKwh), 0);
  const totalMontantContest = 9350;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-10">

        {/* Header */}
        <div className="mb-6 md:mb-10 rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-6 md:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs md:text-sm text-slate-400">🔍 Audit Algorithmique</p>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-1">
                Analyse de facture IA
              </h1>
              <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-400">
                Importez votre facture SOCADEL pour la comparer automatiquement aux données blockchain et détecter les anomalies.
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link
                href="/scanner"
                className="inline-flex rounded-lg sm:rounded-xl md:rounded-2xl border border-orange-400/30 bg-orange-500/10 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-semibold text-orange-300 transition hover:bg-orange-500/20 flex-shrink-0"
              >
                📷 Scanner
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 flex-shrink-0"
              >
                ← Retour
              </Link>
            </div>
          </div>

          {/* KPI bar — only when done */}
          {status === "done" && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {[
                { label: "Mois analysés",    value: "6",           color: "text-teal-300" },
                { label: "Anomalies",         value: `${anomalies.length} / 6`, color: "text-orange-300" },
                { label: "Écart total",       value: `+${totalEcart} kWh`,  color: "text-red-300" },
                { label: "Montant contestable", value: `${totalMontantContest.toLocaleString()} FCFA`, color: "text-red-300" },
              ].map((k) => (
                <div key={k.label} className="rounded-lg md:rounded-[28px] border border-white/10 bg-slate-950/80 p-2 sm:p-3 md:p-4">
                  <div className="text-[9px] sm:text-xs uppercase tracking-[0.2em] text-slate-400">{k.label}</div>
                  <div className={`mt-1 md:mt-2 text-sm md:text-xl font-black ${k.color}`}>{k.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upload + Analysis zone */}
        {status !== "done" && (
          <div className="grid gap-4 md:gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-4">

              {/* Drop zone */}
              <div className="rounded-xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 md:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h2 className="text-base md:text-lg font-bold text-white mb-4">Importer la facture</h2>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,image/*"
                  onChange={handleFile}
                  className="hidden"
                />
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 md:p-12 text-center transition ${
                    fileName
                      ? "border-emerald-400/50 bg-emerald-950/20"
                      : "border-orange-500/40 bg-orange-500/5 hover:border-orange-500/70 hover:bg-orange-500/10"
                  }`}
                >
                  <div className="text-4xl mb-3">{fileName ? "📄" : "📂"}</div>
                  {fileName ? (
                    <>
                      <p className="text-sm font-semibold text-emerald-300">{fileName}</p>
                      <p className="mt-1 text-xs text-slate-400">Cliquez pour changer de fichier</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-orange-300">Déposez votre facture ici</p>
                      <p className="mt-1 text-xs text-slate-400">PDF ou image · Max 20 Mo</p>
                    </>
                  )}
                </div>

                {/* Or demo mode */}
                {!fileName && (
                  <button
                    onClick={() => setFileName("Facture_SOCADEL_Aout_2026.pdf")}
                    className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950/50 py-2.5 text-xs font-semibold text-slate-400 transition hover:border-white/20 hover:text-slate-300"
                  >
                    Utiliser la facture de démonstration
                  </button>
                )}
              </div>

              {/* Analysis progress */}
              {status === "analyzing" && (
                <div className="rounded-xl md:rounded-[36px] border border-orange-400/20 bg-slate-900/95 p-4 md:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base md:text-lg font-bold text-white">Analyse en cours…</h2>
                    <span className="text-sm font-black text-orange-300">{progress}%</span>
                  </div>
                  <div className="h-2 md:h-3 w-full rounded-full bg-white/10 overflow-hidden mb-4">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-300 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="space-y-2">
                    {auditSteps.map((s) => {
                      const done = completedSteps.includes(s.label);
                      const active = s.label === currentStepLabel && !done;
                      return (
                        <div key={s.label} className={`flex items-center gap-3 text-xs transition ${done ? "text-emerald-400" : active ? "text-orange-300" : "text-slate-600"}`}>
                          <span className="w-4 text-center">{done ? "✓" : active ? "⟳" : "○"}</span>
                          <span>{s.label}</span>
                          {active && <span className="ml-auto animate-pulse text-[10px]">en cours…</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Launch button */}
              {status === "idle" && (
                <button
                  onClick={runAudit}
                  disabled={!fileName}
                  className="w-full rounded-full bg-orange-500 py-4 text-sm font-bold text-slate-950 transition hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
                >
                  🔍 Lancer l'audit algorithmique →
                </button>
              )}
            </div>

            {/* Sidebar info */}
            <aside className="space-y-4">
              <div className="rounded-xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 md:p-6 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-sm md:text-base font-bold text-white mb-4">Ce que l'audit fait</h3>
                <div className="space-y-3 text-xs md:text-sm text-slate-300">
                  {[
                    { icon: "📊", text: "Compare index réel vs facturé mois par mois" },
                    { icon: "⛓", text: "Récupère les hashes blockchain pour chaque période" },
                    { icon: "🔢", text: "Calcule l'écart en kWh et en pourcentage" },
                    { icon: "⚠️", text: "Signale les anomalies > 5% d'écart" },
                    { icon: "📄", text: "Génère un rapport complet exportable" },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex gap-3">
                      <span className="flex-shrink-0">{icon}</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 md:p-6 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
                <h3 className="text-sm md:text-base font-bold text-white mb-3">Seuil d'anomalie</h3>
                <div className="text-xs text-slate-400 space-y-2">
                  <div className="flex justify-between"><span>Normal</span><span className="text-emerald-400">≤ 2%</span></div>
                  <div className="flex justify-between"><span>À surveiller</span><span className="text-yellow-400">2 – 5%</span></div>
                  <div className="flex justify-between"><span>Anomalie</span><span className="text-red-400">&gt; 5%</span></div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Results */}
        {status === "done" && (
          <div className="space-y-4 md:space-y-6">

            {/* Anomaly alert */}
            {anomalies.length > 0 && (
              <div className="rounded-xl md:rounded-[36px] border border-orange-400/30 bg-orange-950/50 p-4 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-3xl">⚠️</div>
                  <div>
                    <div className="font-bold text-orange-300">{anomalies.length} anomalie(s) détectée(s)</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Écart total de <strong className="text-red-300">+{totalEcart} kWh</strong> — montant contestable : <strong className="text-red-300">{totalMontantContest.toLocaleString()} FCFA</strong>
                    </div>
                  </div>
                </div>
                <Link
                  href="/reclamation"
                  className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-orange-400 flex-shrink-0 text-center"
                >
                  Créer une réclamation →
                </Link>
              </div>
            )}

            {/* Detail table */}
            <div className="rounded-xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 md:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base md:text-xl font-black text-white">Rapport d'audit détaillé</h2>
                <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition">
                  ⬇ Exporter PDF
                </button>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/80">
                <table className="min-w-full border-separate border-spacing-0 text-left text-xs md:text-sm text-slate-300">
                  <thead className="bg-slate-950/90 text-slate-500">
                    <tr>
                      {["Période", "Réel kWh", "Facturé kWh", "Écart %", "Montant FCFA", "Statut", "Hash Blockchain"].map((h) => (
                        <th key={h} className="px-3 md:px-5 py-3 md:py-4 uppercase tracking-[0.15em] text-[9px] md:text-[10px] whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockAuditData.map((row) => (
                      <tr
                        key={row.mois}
                        className={`border-t border-white/10 transition ${row.anomaly ? "bg-orange-950/20 hover:bg-orange-950/30" : "hover:bg-white/5"}`}
                      >
                        <td className="px-3 md:px-5 py-3 md:py-4 font-semibold whitespace-nowrap">{row.mois}</td>
                        <td className="px-3 md:px-5 py-3 md:py-4 text-teal-300">{row.reelKwh}</td>
                        <td className="px-3 md:px-5 py-3 md:py-4">{row.factureKwh}</td>
                        <td className={`px-3 md:px-5 py-3 md:py-4 font-bold ${row.ecartPct > 5 ? "text-red-400" : row.ecartPct > 2 ? "text-yellow-400" : "text-emerald-400"}`}>
                          +{row.ecartPct}%
                        </td>
                        <td className="px-3 md:px-5 py-3 md:py-4 whitespace-nowrap">{row.montantFCFA}</td>
                        <td className="px-3 md:px-5 py-3 md:py-4">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${row.anomaly ? "bg-orange-400/10 text-orange-300" : "bg-emerald-400/10 text-emerald-300"}`}>
                            {row.anomaly ? "⚠ Anomalie" : "✓ Normal"}
                          </span>
                        </td>
                        <td className="px-3 md:px-5 py-3 md:py-4 font-mono text-sky-300 text-[10px] md:text-xs">{row.hash}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommendations */}
            <div className="rounded-xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 md:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
              <h2 className="text-base md:text-xl font-black text-white mb-4">Recommandations IA</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { icon: "📋", title: "Déposer une réclamation", desc: "L'anomalie d'Août 2026 (+24.7%) est clairement éligible à contestation devant l'ARSEL.", href: "/reclamation", cta: "Déposer →", urgent: true },
                  { icon: "📷", title: "Scanner le compteur ce mois-ci", desc: "Créez une preuve blockchain de votre index actuel pour anticiper la prochaine facture.", href: "/scanner", cta: "Scanner →", urgent: false },
                  { icon: "🔍", title: "Suivre la réclamation", desc: "Consultez l'avancée de votre dossier #FC-2026-0847 en temps réel.", href: "/suivi", cta: "Suivre →", urgent: false },
                  { icon: "⛓", title: "Vérifier la blockchain", desc: "Consultez les hashes directement sur Polygonscan pour une vérification externe.", href: "/dashboard/blockchain", cta: "Vérifier →", urgent: false },
                ].map((rec) => (
                  <div key={rec.title} className={`rounded-2xl border p-4 md:p-5 ${rec.urgent ? "border-orange-400/30 bg-orange-950/30" : "border-white/10 bg-slate-950/50"}`}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{rec.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white">{rec.title}</div>
                        <p className="mt-1 text-xs text-slate-400 leading-5">{rec.desc}</p>
                        <Link href={rec.href} className={`mt-3 inline-flex text-xs font-semibold ${rec.urgent ? "text-orange-300 hover:text-orange-200" : "text-sky-300 hover:text-sky-200"} transition`}>
                          {rec.cta}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset */}
            <div className="text-center">
              <button
                onClick={() => { setStatus("idle"); setFileName(null); setProgress(0); setCompletedSteps([]); }}
                className="text-xs text-slate-500 hover:text-slate-400 transition"
              >
                ↺ Analyser une autre facture
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
