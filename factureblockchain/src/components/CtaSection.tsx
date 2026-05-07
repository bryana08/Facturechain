import Link from "next/link";
import RevealOnScroll from "./RevealOnScroll";

export default function CtaSection() {
  return (
    <section className="rounded-[36px] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-20 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
      <div className="mx-auto max-w-7xl text-center">
        <RevealOnScroll>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Prêt à vérifier
            <br />
            votre <span className="text-orange-400">facture SOCADEL</span> ?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">
            Accédez à la démo live de FactureChain — Phase 2 Demi-finale.
          </p>
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
            >
              🚀 Accéder au Dashboard
            </Link>
            <Link
              href="/reclamation"
              className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
            >
              📋 Tester une réclamation
            </Link>
            <Link
              href="/suivi"
              className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
            >
              🔍 Voir le suivi
            </Link>
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="mt-12 rounded-[28px] border border-white/10 bg-slate-900/80 px-8 py-8 text-center text-sm leading-7 text-slate-300">
            <strong className="text-white">
              « Un abonné qui peut prouver, un opérateur qui doit rendre des
              comptes. »
            </strong>
            <div className="mt-3 text-slate-400">
              La Blockchain, levier du développement durable africain
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
