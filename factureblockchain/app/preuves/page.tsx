"use client";

import Link from "next/link";
import { useState, useRef } from "react";

type PreuveStatut = "en_attente" | "validée" | "rejetée";

interface Preuve {
  id: string;
  nom: string;
  type: "photo" | "document";
  date: string;
  taille: string;
  statut: PreuveStatut;
  cid: string;
  dossier: string;
  description: string;
  thumbnail?: string;
}

function generateCID(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let cid = "Qm";
  for (let i = 0; i < 44; i++) cid += chars[Math.floor(Math.random() * chars.length)];
  return cid;
}

const initial: Preuve[] = [
  { id: "PV-001", nom: "Photo_compteur_Aout_2026.jpg", type: "photo",    date: "12 Août 2026",  taille: "2.4 Mo", statut: "validée",    cid: "QmX9bKpL3mRvT7nEwC2aJhY8fD5sQu1ZiOyBgP4WkNvMr", dossier: "#FC-2026-0847", description: "Photo du compteur au 14 823 kWh le 12/08/2026 à 09h14" },
  { id: "PV-002", nom: "Facture_SOCADEL_Aout_2026.pdf",  type: "document", date: "14 Août 2026",  taille: "0.8 Mo", statut: "validée",    cid: "QmT3bRmK9nSxD1wEzC5yJpY6fH8sVu4ZiLyBgP2WkMvNr", dossier: "#FC-2026-0847", description: "Facture originale SOCADEL — 389 kWh facturés" },
  { id: "PV-003", nom: "Screen_Polygonscan_hash.png", type: "photo",    date: "12 Août 2026",  taille: "1.1 Mo", statut: "validée",    cid: "QmW7xKpR4mSvT9nEbC6aUhY2fD1sQw8ZiOyBgP5WkNrMv", dossier: "#FC-2026-0847", description: "Capture d'écran Polygonscan — bloc #47291845 confirmé" },
  { id: "PV-004", nom: "Photo_compteur_Sept_2026.jpg",type: "photo",    date: "02 Sept 2026", taille: "2.1 Mo", statut: "en_attente", cid: "QmP2aLmK7nRxD3wEzC9yJbY4fH6sVu1ZiLyBgQ8WkMvNr", dossier: "#FC-2026-0847", description: "Photo de suivi — indice 15204 kWh" },
];

const statutConfig: Record<PreuveStatut, { label: string; color: string; bg: string; dot: string }> = {
  en_attente: { label: "En attente",  color: "text-orange-300",  bg: "bg-orange-400/10",  dot: "bg-orange-400" },
  validée:    { label: "Validée ⛓",  color: "text-emerald-300", bg: "bg-emerald-400/10", dot: "bg-emerald-400" },
  rejetée:    { label: "Rejetée",     color: "text-red-300",     bg: "bg-red-400/10",     dot: "bg-red-400" },
};

export default function PreuvesPage() {
  const [preuves, setPreuves] = useState<Preuve[]>(initial);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStep, setUploadStep] = useState("");
  const [selected, setSelected] = useState<Preuve | null>(null);
  const [description, setDescription] = useState("");
  const [dossierLie, setDossierLie] = useState("#FC-2026-0847");
  const [newPhoto, setNewPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setNewPhoto(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setNewPhoto(null);
    }
  }

  async function handleUpload() {
    if (!fileInputRef.current?.files?.[0] && !newPhoto) return;
    const file = fileInputRef.current?.files?.[0];
    const fname = file?.name ?? "document_upload.pdf";

    setUploading(true);
    setUploadProgress(0);

    const steps = [
      { label: "Validation qualité IA…",     pct: 20, ms: 700 },
      { label: "Calcul empreinte SHA-256…",   pct: 40, ms: 600 },
      { label: "Épinglage IPFS…",             pct: 65, ms: 800 },
      { label: "Génération CID…",             pct: 80, ms: 400 },
      { label: "Ancrage Polygon…",            pct: 95, ms: 700 },
      { label: "Indexation dans le dossier…", pct: 100, ms: 400 },
    ];

    for (const s of steps) {
      setUploadStep(s.label);
      await new Promise((r) => setTimeout(r, s.ms));
      setUploadProgress(s.pct);
    }

    const cid = generateCID();
    const now = new Date();
    const dateStr = now.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    const isPhoto = file?.type.startsWith("image/") || false;
    const newPreuve: Preuve = {
      id: `PV-00${preuves.length + 1}`,
      nom: fname,
      type: isPhoto ? "photo" : "document",
      date: dateStr,
      taille: `${(Math.random() * 3 + 0.5).toFixed(1)} Mo`,
      statut: "en_attente",
      cid,
      dossier: dossierLie,
      description: description || fname,
      thumbnail: newPhoto ?? undefined,
    };

    setPreuves((prev) => [newPreuve, ...prev]);
    setUploading(false);
    setUploadProgress(0);
    setUploadStep("");
    setDescription("");
    setNewPhoto(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-10">

        {/* Header */}
        <div className="mb-6 md:mb-8 rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-6 md:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs md:text-sm text-slate-400">📎 Preuves IPFS</p>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-1">
                Registre de preuves visuelles
              </h1>
              <p className="mt-1 text-xs md:text-sm text-slate-400">
                Importez et gérez vos pièces justificatives. Chaque preuve est épinglée sur IPFS et liée à votre dossier de réclamation.
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link href="/observatoire"
                className="inline-flex rounded-lg sm:rounded-2xl border border-sky-400/30 bg-sky-500/10 px-3 py-2 text-xs sm:text-sm font-semibold text-sky-300 transition hover:bg-sky-500/20">
                🗺 Observatoire
              </Link>
              <Link href="/dashboard"
                className="inline-flex rounded-lg sm:rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/10">
                ← Retour
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-2 md:gap-3">
            {[
              { label: "Preuves déposées", value: preuves.length,                                      color: "text-white" },
              { label: "Validées IPFS",    value: preuves.filter(p => p.statut === "validée").length,  color: "text-emerald-300" },
              { label: "En attente",        value: preuves.filter(p => p.statut === "en_attente").length, color: "text-orange-300" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg md:rounded-[24px] border border-white/10 bg-slate-950/80 p-2.5 md:p-4">
                <div className="text-[9px] sm:text-xs uppercase tracking-widest text-slate-400">{s.label}</div>
                <div className={`mt-1 text-xl md:text-2xl font-black ${s.color}`}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:gap-6 lg:grid-cols-[1fr_1.6fr]">

          {/* Upload panel */}
          <div className="space-y-4">
            <div className="rounded-xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 md:p-6 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
              <h2 className="text-sm md:text-base font-bold text-white mb-4">Ajouter une preuve</h2>

              <input ref={fileInputRef} type="file" accept="image/*,.pdf" onChange={handleFile} className="hidden" />

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition mb-4 ${
                  newPhoto ? "border-emerald-400/40 bg-emerald-950/20" : "border-orange-500/40 bg-orange-500/5 hover:border-orange-500/60"
                }`}>
                {newPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={newPhoto} alt="preview" className="mx-auto max-h-32 rounded-xl object-cover mb-2" />
                ) : (
                  <div className="text-3xl mb-2">📁</div>
                )}
                <p className="text-xs font-semibold text-orange-300">
                  {fileInputRef.current?.files?.[0]?.name ?? "Photo ou PDF · Cliquez pour importer"}
                </p>
                <p className="mt-1 text-[10px] text-slate-500">JPG, PNG, PDF · Max 20 Mo</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="ex: Photo compteur au 14 823 kWh"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-xs text-white outline-none focus:border-orange-400/50 transition placeholder:text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">Lier au dossier</label>
                  <select
                    value={dossierLie}
                    onChange={(e) => setDossierLie(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-xs text-white outline-none focus:border-orange-400/50 transition">
                    <option value="#FC-2026-0847">#FC-2026-0847 — Surfacturation Août 2026</option>
                    <option value="#FC-2026-0601">#FC-2026-0601 — Anomalie Juin 2026</option>
                    <option value="nouveau">Nouveau dossier</option>
                  </select>
                </div>
              </div>

              {/* Upload progress */}
              {uploading && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{uploadStep}</span>
                    <span className="text-orange-300 font-bold">{uploadProgress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-300 transition-all duration-500"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="mt-4 w-full rounded-full bg-orange-500 py-3 text-xs font-bold text-slate-950 transition hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed">
                {uploading ? "Épinglage IPFS en cours…" : "⬆ Uploader et épingler sur IPFS"}
              </button>
            </div>

            {/* IPFS info */}
            <div className="rounded-xl md:rounded-2xl border border-sky-400/20 bg-slate-900/80 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-300">IPFS Gateway — Connecté</span>
              </div>
              <div className="space-y-1.5 text-[10px] text-slate-400">
                <div className="flex justify-between"><span>Nœud</span><span className="text-sky-300">ipfs.io</span></div>
                <div className="flex justify-between"><span>Protocole</span><span className="text-sky-300">CIDv1</span></div>
                <div className="flex justify-between"><span>Ancrage blockchain</span><span className="text-emerald-300">Polygon ✓</span></div>
                <div className="flex justify-between"><span>Rétention</span><span className="text-slate-300">Permanente</span></div>
              </div>
            </div>
          </div>

          {/* Preuves list + timeline */}
          <div className="space-y-4">
            <h2 className="text-sm md:text-base font-bold text-white px-1">
              Mes pièces justificatives ({preuves.length})
            </h2>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {preuves.map((p) => {
                const cfg = statutConfig[p.statut];
                const isSelected = selected?.id === p.id;
                return (
                  <button key={p.id} onClick={() => setSelected(isSelected ? null : p)}
                    className={`w-full rounded-xl md:rounded-2xl border p-3 md:p-4 text-left transition ${
                      isSelected ? "border-orange-400/40 bg-orange-950/20" : "border-white/10 bg-slate-900/90 hover:border-white/20"
                    }`}>
                    <div className="flex items-start gap-3">
                      {/* Thumbnail or icon */}
                      <div className={`flex-shrink-0 h-10 w-10 rounded-xl overflow-hidden flex items-center justify-center text-xl ${p.type === "photo" ? "bg-slate-800" : "bg-blue-950/60"}`}>
                        {p.thumbnail ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.thumbnail} alt={p.nom} className="h-full w-full object-cover" />
                        ) : (
                          p.type === "photo" ? "📷" : "📄"
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-xs md:text-sm font-semibold text-white truncate">{p.nom}</div>
                        <div className="mt-0.5 text-[10px] text-slate-400 truncate">{p.description}</div>
                        <div className="mt-1.5 flex flex-wrap gap-2 text-[10px] text-slate-500">
                          <span>📅 {p.date}</span>
                          <span>💾 {p.taille}</span>
                          <span className="text-sky-400">🔗 {p.dossier}</span>
                        </div>
                      </div>

                      <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${cfg.bg} ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </div>

                    {/* Expanded */}
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">CID IPFS</div>
                        <div className="rounded-lg bg-slate-950/80 p-2.5 font-mono text-[10px] text-sky-300 break-all mb-3">
                          {p.cid}
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 rounded-full bg-sky-500/10 border border-sky-400/30 py-1.5 text-center text-[10px] font-semibold text-sky-300 hover:bg-sky-500/20 transition">
                            ⬇ Télécharger
                          </button>
                          <button className="flex-1 rounded-full border border-white/10 bg-white/5 py-1.5 text-center text-[10px] font-semibold text-slate-300 hover:bg-white/10 transition">
                            🔍 Vérifier IPFS
                          </button>
                          <Link href="/reclamation"
                            className="flex-1 rounded-full bg-orange-500/10 border border-orange-400/20 py-1.5 text-center text-[10px] font-semibold text-orange-300 hover:bg-orange-500/20 transition">
                            📋 Voir dossier
                          </Link>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Timeline */}
            <div className="rounded-xl md:rounded-[28px] border border-white/10 bg-slate-900/95 p-4 md:p-5">
              <h3 className="text-xs md:text-sm font-bold text-white mb-3">Historique — Dossier #FC-2026-0847</h3>
              <div className="space-y-3">
                {[
                  { date: "02 Sept 2026", label: "Photo de suivi — Sept 2026",        color: "bg-orange-400", statut: "En attente" },
                  { date: "14 Août 2026", label: "Facture SOCADEL importée et analysée", color: "bg-emerald-400", statut: "Validé" },
                  { date: "12 Août 2026", label: "Preuve blockchain — Polygonscan",   color: "bg-emerald-400", statut: "Validé" },
                  { date: "12 Août 2026", label: "Photo compteur — Index 14 823 kWh", color: "bg-emerald-400", statut: "Validé" },
                ].map((ev, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`h-2.5 w-2.5 rounded-full flex-shrink-0 mt-0.5 ${ev.color}`} />
                      {i < 3 && <div className="w-0.5 flex-1 bg-white/10 mt-1" />}
                    </div>
                    <div className="pb-3">
                      <div className="text-xs font-semibold text-white">{ev.label}</div>
                      <div className="mt-0.5 flex gap-2 text-[10px] text-slate-500">
                        <span>{ev.date}</span>
                        <span className={ev.statut === "Validé" ? "text-emerald-400" : "text-orange-400"}>{ev.statut}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
