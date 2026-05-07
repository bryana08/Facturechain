import Link from "next/link";
import styles from "./Hero.module.css";
import RevealOnScroll from "./RevealOnScroll";

const buttonBase =
  "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export default function Hero() {
  return (
    <section
      className={`relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/90 px-6 py-16 shadow-[0_32px_100px_rgba(0,0,0,0.35)] ${styles.heroBackground}`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr] xl:gap-24">
        <div className="space-y-8">
          <RevealOnScroll>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-orange-300">
                🏆 MIABE Hackathon 2026
              </span>
              <span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-teal-300">
                ODD 7
              </span>
              <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-sky-300">
                ODD 11
              </span>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">
                ODD 16
              </span>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div>
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Votre facture ENEO,
                <span className="block text-orange-400">enfin vérifiable.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                FactureChain enregistre votre consommation réelle sur la
                blockchain Polygon. Chaque anomalie devient une preuve légale.
                Chaque réclamation, traçable et immuable.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className={`${buttonBase} bg-orange-500 text-slate-950 shadow-[0_12px_30px_rgba(232,70,10,0.35)] hover:bg-orange-400`}
              >
                🚀 Voir la démo live
              </Link>
              <a
                href="#solution"
                className={`${buttonBase} border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10`}
              >
                En savoir plus ↓
              </a>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll>
          <div
            className={`relative rounded-[28px] border border-white/10 bg-slate-900/95 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.45)] ${styles.floatPanel}`}
          >
            <div className="flex items-center justify-between text-sm text-slate-300">
              <div className="font-bold text-white">
                Facture<span className="text-orange-400">Chain</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                Polygon connecté
              </div>
            </div>
            <div className="mt-6 rounded-3xl bg-slate-950/80 p-5">
              <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 p-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-950">
                ⚠ Surfacturation détectée — Août 2026
              </div>
              <div className="mt-4 text-sm text-slate-300">
                Écart +77 kWh · Montant contestable : 9 350 FCFA
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                  Réel blockchain
                </div>
                <div className="mt-3 text-2xl font-black text-teal-300">
                  312 kWh
                </div>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                  Facturé ENEO
                </div>
                <div className="mt-3 text-2xl font-black text-orange-300">
                  389 kWh
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-4 text-[11px] text-slate-400">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-sm bg-teal-400"></span>
                Réel
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-sm bg-orange-400"></span>
                Facturé
              </div>
            </div>
            <div className="mt-4 grid grid-cols-[repeat(6,minmax(0,1fr))] gap-2 items-end">
              {[
                { h: 42, type: "reel" },
                { h: 44, type: "fact" },
                { h: 38, type: "reel" },
                { h: 40, type: "fact" },
                { h: 45, type: "reel" },
                { h: 46, type: "fact" },
                { h: 40, type: "reel" },
                { h: 43, type: "fact" },
                { h: 43, type: "reel" },
                { h: 44, type: "fact" },
                { h: 44, type: "reel" },
                { h: 58, type: "anom" },
              ].map((bar, idx) => (
                <div
                  key={idx}
                  className={`rounded-t-xl ${bar.type === "reel" ? "bg-teal-400" : bar.type === "fact" ? "bg-orange-400" : "bg-red-500 animate-pulse"}`}
                  style={{ height: `${bar.h}px` }}
                />
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
