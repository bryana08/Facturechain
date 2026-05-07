"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

type LogLevel = "info" | "warning" | "critical";
type ActionType = "ACCESS" | "UPLOAD_PROOF" | "VERIFY_BLOCKCHAIN" | "ESCALADE_ARSEL" | "DECISION_ARSEL" | "DATA_EXPORT";

interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userRole: "abonne" | "regulateur" | "systeme" | "operateur";
  action: ActionType;
  resource: string;
  level: LogLevel;
  details: string;
  hashTx?: string;
  ip: string;
}

const mockLogs: AuditLog[] = [
  { id: "LOG-92847", timestamp: "07-05-2026 06:45:12", userId: "USR-001 (J. Mbarga)", userRole: "abonne", action: "ACCESS", resource: "/dossier/FC-2026-0847", level: "info", details: "Consultation du dossier", ip: "197.149.20.14" },
  { id: "LOG-92846", timestamp: "07-05-2026 06:38:05", userId: "REG-012 (O. Ndongo)", userRole: "regulateur", action: "DECISION_ARSEL", resource: "FC-2026-0847", level: "critical", details: "Émission injonction remboursement SOCADEL", hashTx: "0xab12...88fa", ip: "102.164.55.22" },
  { id: "LOG-92845", timestamp: "07-05-2026 06:12:33", userId: "SYS-AUTO", userRole: "systeme", action: "ESCALADE_ARSEL", resource: "FC-2026-0847", level: "warning", details: "Délai 30j SOCADEL expiré. Escalade automatique ARSEL.", hashTx: "0xdd45...11ab", ip: "Server-Internal" },
  { id: "LOG-92844", timestamp: "06-05-2026 14:22:10", userId: "USR-001 (J. Mbarga)", userRole: "abonne", action: "DATA_EXPORT", resource: "Archive_Preuves.zip", level: "info", details: "Export des preuves cryptographiques liées au dossier FC-2026-0847", ip: "197.149.20.14" },
  { id: "LOG-92843", timestamp: "05-05-2026 09:15:00", userId: "REG-012 (O. Ndongo)", userRole: "regulateur", action: "VERIFY_BLOCKCHAIN", resource: "Hash:0x4a7f...e9d5c", level: "info", details: "Vérification de l'empreinte compteur sur Polygon", ip: "102.164.55.22" },
  { id: "LOG-92842", timestamp: "04-05-2026 11:05:44", userId: "OP-449 (SOCADEL)", userRole: "operateur", action: "ACCESS", resource: "/dossier/FC-2026-0847", level: "info", details: "Consultation dossier par l'opérateur (lecture seule)", ip: "41.202.202.1" },
  { id: "LOG-92841", timestamp: "12-04-2026 08:30:00", userId: "USR-001 (J. Mbarga)", userRole: "abonne", action: "UPLOAD_PROOF", resource: "CID:QmX9bKpL...vMr", level: "info", details: "Épinglage IPFS d'une nouvelle preuve photo", hashTx: "0x11ee...00ff", ip: "197.149.20.88" },
];

const levelColors: Record<LogLevel, { text: string; bg: string }> = {
  info:     { text: "text-sky-300", bg: "bg-sky-400/10" },
  warning:  { text: "text-amber-300", bg: "bg-amber-400/10" },
  critical: { text: "text-red-300", bg: "bg-red-400/10" },
};

const roleColors: Record<AuditLog["userRole"], { text: string; bg: string }> = {
  abonne:     { text: "text-slate-300", bg: "bg-slate-700/30" },
  regulateur: { text: "text-purple-300", bg: "bg-purple-400/10" },
  systeme:    { text: "text-emerald-300", bg: "bg-emerald-400/10" },
  operateur:  { text: "text-orange-300", bg: "bg-orange-400/10" },
};

export default function ConformitePage() {
  const [filterLevel, setFilterLevel] = useState<LogLevel | "all">("all");
  const [filterRole, setFilterRole] = useState<AuditLog["userRole"] | "all">("all");
  const [search, setSearch] = useState("");
  const [exporting, setExporting] = useState(false);

  const filteredLogs = useMemo(() => {
    return mockLogs.filter((log) => {
      const matchLevel = filterLevel === "all" || log.level === filterLevel;
      const matchRole = filterRole === "all" || log.userRole === filterRole;
      const matchSearch = Object.values(log).some(val => 
        String(val).toLowerCase().includes(search.toLowerCase())
      );
      return matchLevel && matchRole && matchSearch;
    });
  }, [filterLevel, filterRole, search]);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      // Simulate download
      alert("Rapport d'audit sécurisé généré et prêt au téléchargement (Format JSON/PDF compressé).");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-10">

        {/* Header */}
        <div className="mb-6 md:mb-10 rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-6 md:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs md:text-sm text-cyan-400">🛡️ Audit & Conformité</p>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-1">
                Journaux d'Accès & Sécurité
              </h1>
              <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-400">
                Traçabilité complète des actions : consultation, modifications, arbitrage. Chaque événement critique est ancré sur la blockchain.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 flex-shrink-0"
            >
              ← Retour
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {[
              { label: "Total Événements", value: "92 847", color: "text-white" },
              { label: "Ancrages Blockchain", value: "14 205", color: "text-emerald-400" },
              { label: "Escalades Auto (30j)", value: "312", color: "text-amber-400" },
              { label: "Alertes Sécurité", value: "0", color: "text-slate-500" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-slate-950/50 p-3 md:p-5">
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-slate-500">{stat.label}</div>
                <div className={`mt-1 text-lg md:text-2xl font-black ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-4 flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
            <div className="flex flex-wrap gap-2">
                <select 
                    value={filterLevel} 
                    onChange={(e) => setFilterLevel(e.target.value as any)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-cyan-400/50"
                >
                    <option value="all">Tous les niveaux</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="critical">Critical</option>
                </select>

                <select 
                    value={filterRole} 
                    onChange={(e) => setFilterRole(e.target.value as any)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-cyan-400/50"
                >
                    <option value="all">Tous les rôles</option>
                    <option value="abonne">Abonné</option>
                    <option value="regulateur">Régulateur ARSEL</option>
                    <option value="systeme">Système (Smart Contract)</option>
                    <option value="operateur">Opérateur (SOCADEL)</option>
                </select>
                
                <input 
                    type="text" 
                    placeholder="Chercher ID, IP, Ressource..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-64 rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-cyan-400/50 placeholder:text-slate-600"
                />
            </div>
            
            <button 
                onClick={handleExport}
                disabled={exporting}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
            >
                {exporting ? "Génération cryptographique..." : "⬇ Exporter l'Audit Trail"}
            </button>
        </div>

        {/* Data Table */}
        <div className="rounded-xl md:rounded-[24px] border border-white/10 bg-slate-900/95 overflow-hidden shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left text-xs md:text-sm">
                    <thead className="bg-slate-950/80 text-slate-500 uppercase tracking-widest text-[9px] md:text-[10px]">
                        <tr>
                            <th className="p-4">Timestamp & ID</th>
                            <th className="p-4">Acteur / Rôle</th>
                            <th className="p-4">Action</th>
                            <th className="p-4">Ressource Cible</th>
                            <th className="p-4">Niveau</th>
                            <th className="p-4">Preuve Tx</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredLogs.map(log => {
                            const levelStyle = levelColors[log.level];
                            const roleStyle = roleColors[log.userRole];

                            return (
                                <tr key={log.id} className="hover:bg-white/5 transition">
                                    <td className="p-4 whitespace-nowrap">
                                        <div className="font-mono text-slate-300">{log.timestamp}</div>
                                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{log.id}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-semibold text-white">{log.userId}</div>
                                        <div className={`inline-flex rounded px-1.5 py-0.5 mt-1 text-[9px] font-bold uppercase ${roleStyle.bg} ${roleStyle.text}`}>
                                            {log.userRole}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-mono font-bold text-slate-200">{log.action}</div>
                                        <div className="text-[10px] text-slate-400 mt-1 max-w-xs">{log.details}</div>
                                        <div className="text-[9px] text-slate-600 mt-0.5">IP: {log.ip}</div>
                                    </td>
                                    <td className="p-4 font-mono text-[10px] text-slate-300 max-w-[150px] truncate">
                                        {log.resource}
                                    </td>
                                    <td className="p-4">
                                        <div className={`inline-flex rounded px-2 py-1 text-[10px] font-bold uppercase ${levelStyle.bg} ${levelStyle.text}`}>
                                            {log.level}
                                        </div>
                                    </td>
                                    <td className="p-4 font-mono text-[10px]">
                                        {log.hashTx ? (
                                            <span className="text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">⛓ {log.hashTx}</span>
                                        ) : (
                                            <span className="text-slate-600">—</span>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {filteredLogs.length === 0 && (
                    <div className="p-8 text-center text-slate-500 text-sm">
                        Aucun journal trouvé pour ces critères.
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}
