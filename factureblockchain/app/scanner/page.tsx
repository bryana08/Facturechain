"use client";

import Link from "next/link";
import { useState, useRef } from "react";

type Step = "capture" | "location" | "index" | "confirm" | "done";

function generateHash(): string {
  const chars = "0123456789abcdef";
  let hash = "0x";
  for (let i = 0; i < 40; i++) {
    hash += chars[Math.floor(Math.random() * 16)];
  }
  return hash;
}

const steps: { id: Step; label: string; icon: string }[] = [
  { id: "capture", label: "Capture", icon: "📷" },
  { id: "location", label: "Localisation", icon: "📍" },
  { id: "index", label: "Index", icon: "🔢" },
  { id: "confirm", label: "Confirmation", icon: "✅" },
];

export default function ScannerPage() {
  const [step, setStep] = useState<Step>("capture");
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: string; lng: string } | null>(null);
  const [locLoading, setLocLoading] = useState(false);
  const [index, setIndex] = useState("");
  const [hash, setHash] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stepIndex = steps.findIndex((s) => s.id === step);

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  }

  function simulateLocation() {
    setLocLoading(true);
    setTimeout(() => {
      setLocation({
        lat: (3.848 + Math.random() * 0.01).toFixed(6),
        lng: (11.502 + Math.random() * 0.01).toFixed(6),
      });
      setLocLoading(false);
    }, 1800);
  }

  function handleConfirm() {
    const h = generateHash();
    const b = `#${47000000 + Math.floor(Math.random() * 100000)}`;
    setHash(h);
    setBlockNumber(b);
    setStep("done");
  }

  const canNextCapture = !!photo;
  const canNextLocation = !!location;
  const canNextIndex = index.trim().length >= 3;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-4xl px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-10">

        {/* Header */}
        <div className="mb-6 md:mb-10 rounded-xl sm:rounded-2xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 sm:p-6 md:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs md:text-sm text-slate-400">📷 Scanner IA</p>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-1">
                Capture de compteur
              </h1>
              <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-400">
                Photographiez votre compteur, validez votre index et ancrez la preuve sur la blockchain.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex self-start sm:self-auto rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 flex-shrink-0"
            >
              ← Retour
            </Link>
          </div>

          {/* Progress Steps */}
          {step !== "done" && (
            <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1">
              {steps.map((s, i) => {
                const isActive = s.id === step;
                const isDone = i < stepIndex;
                return (
                  <div key={s.id} className="flex items-center gap-2 flex-shrink-0">
                    <div
                      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        isActive
                          ? "bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/50"
                          : isDone
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-white/5 text-slate-500"
                      }`}
                    >
                      <span>{s.icon}</span>
                      <span>{s.label}</span>
                      {isDone && <span>✓</span>}
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`h-0.5 w-6 rounded-full ${i < stepIndex ? "bg-emerald-400/50" : "bg-white/10"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Done state */}
        {step === "done" && (
          <div className="rounded-xl sm:rounded-2xl md:rounded-[36px] border border-emerald-400/20 bg-emerald-950/60 p-6 md:p-12 text-center shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
            <div className="text-5xl md:text-7xl mb-4">⛓️</div>
            <h2 className="text-xl md:text-3xl font-black text-white">Preuve ancrée sur Polygon !</h2>
            <p className="mt-3 text-sm md:text-base text-slate-300 max-w-lg mx-auto">
              L'index de votre compteur a été horodaté et ancré de manière immuable. Cette preuve est recevable devant l'ARSEL.
            </p>

            <div className="mt-6 md:mt-8 mx-auto max-w-xl rounded-xl md:rounded-3xl border border-sky-400/20 bg-slate-950/80 p-4 md:p-6 text-left space-y-3">
              <div className="flex justify-between gap-2 border-b border-white/10 pb-2">
                <span className="text-xs text-slate-400 uppercase tracking-widest">Hash</span>
                <span className="text-xs font-mono text-sky-300 break-all text-right">{hash}</span>
              </div>
              <div className="flex justify-between gap-2 border-b border-white/10 pb-2">
                <span className="text-xs text-slate-400 uppercase tracking-widest">Bloc</span>
                <span className="text-sm font-semibold text-teal-300">{blockNumber}</span>
              </div>
              <div className="flex justify-between gap-2 border-b border-white/10 pb-2">
                <span className="text-xs text-slate-400 uppercase tracking-widest">Index capturé</span>
                <span className="text-sm font-semibold text-white">{index} kWh</span>
              </div>
              <div className="flex justify-between gap-2 border-b border-white/10 pb-2">
                <span className="text-xs text-slate-400 uppercase tracking-widest">Localisation</span>
                <span className="text-xs font-mono text-slate-300">{location?.lat}, {location?.lng}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-xs text-slate-400 uppercase tracking-widest">Réseau</span>
                <span className="text-sm font-semibold text-emerald-300">Polygon Mainnet ✓</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/audit"
                className="rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-400"
              >
                Lancer l'audit →
              </Link>
              <Link
                href="/reclamation"
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Créer une réclamation
              </Link>
            </div>
          </div>
        )}

        {/* Step: Capture */}
        {step === "capture" && (
          <div className="space-y-4">
            <div className="rounded-xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 md:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
              <h2 className="text-lg md:text-xl font-black text-white mb-2">Photographiez votre compteur</h2>
              <p className="text-sm text-slate-400 mb-6">
                Prenez une photo nette de votre compteur électronique. Le cadre doit inclure l'affichage de l'index et le numéro de série.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhoto}
                className="hidden"
              />

              {photo ? (
                <div className="relative rounded-2xl overflow-hidden border border-emerald-400/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo} alt="Capture compteur" className="w-full max-h-72 object-cover" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-bold text-white">✓ Capturé</span>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-3 right-3 rounded-full bg-slate-900/90 px-3 py-1.5 text-xs font-semibold text-white border border-white/20 hover:bg-slate-800"
                  >
                    Reprendre
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-2xl border-2 border-dashed border-orange-500/40 bg-orange-500/5 p-10 md:p-16 text-center transition hover:border-orange-500/70 hover:bg-orange-500/10"
                >
                  <div className="text-4xl md:text-5xl mb-4">📷</div>
                  <p className="text-sm md:text-base font-semibold text-orange-300">Cliquez pour capturer ou importer</p>
                  <p className="mt-2 text-xs text-slate-400">JPG, PNG, HEIC · Max 20 Mo</p>
                </button>
              )}
            </div>

            {photo && (
              <div className="rounded-xl md:rounded-2xl border border-white/10 bg-slate-900/95 p-4 md:p-6">
                <div className="flex items-center gap-3 text-sm text-slate-300 mb-4">
                  <span className="text-emerald-400">✓</span>
                  <span>Analyse IA en cours…</span>
                  <div className="ml-auto flex gap-1">
                    {["Netteté", "Lisibilité", "Intégrité"].map((l) => (
                      <span key={l} className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-400">{l} ✓</span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setStep("location")}
                  className="w-full rounded-full bg-orange-500 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-400"
                >
                  Étape suivante — Localisation →
                </button>
              </div>
            )}

            {!canNextCapture && (
              <p className="text-center text-xs text-slate-500">Une photo est requise pour continuer.</p>
            )}
          </div>
        )}

        {/* Step: Location */}
        {step === "location" && (
          <div className="space-y-4">
            <div className="rounded-xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 md:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
              <h2 className="text-lg md:text-xl font-black text-white mb-2">Vérification de localisation</h2>
              <p className="text-sm text-slate-400 mb-6">
                La localisation GPS garantit l'intégrité de la capture : votre compteur doit être à votre adresse de contrat.
              </p>

              {location ? (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-950/40 p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/20 text-xl">📍</div>
                      <div>
                        <div className="text-sm font-semibold text-emerald-300">Localisation vérifiée</div>
                        <div className="text-xs text-slate-400 mt-0.5">Correspond à votre adresse de contrat</div>
                      </div>
                      <span className="ml-auto text-emerald-400 text-lg">✓</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[["Latitude", location.lat], ["Longitude", location.lng], ["Précision", "±5m"], ["Quartier", "Yaoundé Centre"]].map(([k, v]) => (
                        <div key={k} className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
                          <div className="text-[10px] uppercase tracking-widest text-slate-500">{k}</div>
                          <div className="mt-1 text-sm font-semibold text-slate-100 font-mono">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setStep("index")}
                    className="w-full rounded-full bg-orange-500 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-400"
                  >
                    Étape suivante — Index →
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 text-center">
                    <div className="text-4xl mb-3">{locLoading ? "⏳" : "📍"}</div>
                    <p className="text-sm text-slate-300">
                      {locLoading ? "Acquisition du signal GPS…" : "Cliquez pour détecter votre position"}
                    </p>
                    {locLoading && (
                      <div className="mt-3 mx-auto w-48 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-2/3 rounded-full bg-orange-400 animate-pulse" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={simulateLocation}
                    disabled={locLoading}
                    className="w-full rounded-full bg-orange-500 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-400 disabled:opacity-50"
                  >
                    {locLoading ? "Localisation en cours…" : "Détecter ma position GPS"}
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setStep("capture")}
              className="w-full text-xs text-slate-500 hover:text-slate-400 transition"
            >
              ← Retour à la capture
            </button>
          </div>
        )}

        {/* Step: Index */}
        {step === "index" && (
          <div className="space-y-4">
            <div className="rounded-xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 md:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
              <h2 className="text-lg md:text-xl font-black text-white mb-2">Saisie de l'index</h2>
              <p className="text-sm text-slate-400 mb-6">
                Entrez l'index affiché sur votre compteur. Cette valeur sera comparée à la facture SOCADEL pour détecter les anomalies.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">
                    Index du compteur (kWh)
                  </label>
                  <input
                    type="number"
                    value={index}
                    onChange={(e) => setIndex(e.target.value)}
                    placeholder="ex: 14823"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-4 text-xl font-bold text-white outline-none focus:border-orange-400/50 transition placeholder:text-slate-600 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-slate-400">
                  <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Dernier index connu</div>
                    <div className="text-sm font-semibold text-slate-100">14 511 kWh</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Juillet 2026</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Consommation estimée</div>
                    <div className="text-sm font-semibold text-teal-300">
                      {index && parseInt(index) > 14511
                        ? `${parseInt(index) - 14511} kWh`
                        : "— kWh"}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Ce mois-ci</div>
                  </div>
                </div>

                {index && parseInt(index) > 14511 && (
                  <div className={`rounded-xl border p-3 text-sm ${
                    parseInt(index) - 14511 > 350
                      ? "border-orange-400/30 bg-orange-950/40 text-orange-300"
                      : "border-emerald-400/20 bg-emerald-950/30 text-emerald-300"
                  }`}>
                    {parseInt(index) - 14511 > 350
                      ? "⚠️ Consommation élevée détectée — Recommandé d'auditer la facture."
                      : "✓ Consommation dans la norme habituelle."}
                  </div>
                )}
              </div>
            </div>

            {canNextIndex ? (
              <button
                onClick={() => setStep("confirm")}
                className="w-full rounded-full bg-orange-500 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-400"
              >
                Confirmer et ancrer →
              </button>
            ) : (
              <p className="text-center text-xs text-slate-500">Entrez un index valide pour continuer.</p>
            )}
            <button
              onClick={() => setStep("location")}
              className="w-full text-xs text-slate-500 hover:text-slate-400 transition"
            >
              ← Retour à la localisation
            </button>
          </div>
        )}

        {/* Step: Confirm */}
        {step === "confirm" && (
          <div className="space-y-4">
            <div className="rounded-xl md:rounded-[36px] border border-white/10 bg-slate-900/95 p-4 md:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
              <h2 className="text-lg md:text-xl font-black text-white mb-2">Confirmation et ancrage</h2>
              <p className="text-sm text-slate-400 mb-6">
                Vérifiez les données ci-dessous avant l'ancrage immuable sur la blockchain Polygon.
              </p>

              <div className="space-y-3">
                {[
                  ["📷 Capture", "Photo validée — Netteté ✓ Lisibilité ✓", "text-slate-100"],
                  ["📍 Localisation", `${location?.lat}, ${location?.lng} (±5m)`, "text-slate-100"],
                  ["🔢 Index", `${index} kWh`, "text-slate-100"],
                  ["⚡ Consommation", `${parseInt(index) - 14511} kWh vs mois précédent`, parseInt(index) - 14511 > 350 ? "text-orange-300" : "text-emerald-300"],
                  ["⛓ Réseau", "Polygon Mainnet", "text-sky-300"],
                  ["🔐 Contrat", "FactureChain.sol", "text-sky-300"],
                ].map(([label, value, color]) => (
                  <div key={label as string} className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-slate-950/60 p-3 md:p-4 text-sm">
                    <span className="text-slate-400 flex-shrink-0">{label}</span>
                    <span className={`font-semibold ${color} text-right`}>{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-orange-400/20 bg-orange-950/30 p-4 text-xs text-orange-300">
                ⚠️ Cette opération est <strong>irréversible</strong>. Les données seront inscrites de manière permanente sur la blockchain.
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400 py-4 text-sm font-bold text-slate-950 transition hover:from-orange-400 hover:to-orange-300 shadow-lg shadow-orange-500/25"
            >
              ⛓ Ancrer la preuve sur Polygon →
            </button>
            <button
              onClick={() => setStep("index")}
              className="w-full text-xs text-slate-500 hover:text-slate-400 transition"
            >
              ← Modifier les données
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
