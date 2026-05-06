import RevealOnScroll from "./RevealOnScroll";

const solutions = [
  {
    icon: "📊",
    title: "Suivi transparent",
    description:
      "Chaque relevé de compteur est ancré sur Polygon avec un hash et un timestamp certifié. ENEO ne peut pas modifier ces données après enregistrement.",
    tag: "BLOCKCHAIN",
    tagClass: "bg-sky-400/10 text-sky-300",
  },
  {
    icon: "⚡",
    title: "Détection automatique",
    description:
      "Le smart contract compare consommation réelle (blockchain) et montant facturé (ENEO). Si l'écart dépasse 5%, l'anomalie est flagguée instantanément.",
    tag: "SMART CONTRACT",
    tagClass: "bg-orange-400/10 text-orange-300",
  },
  {
    icon: "📋",
    title: "Réclamation tracée",
    description:
      "Le formulaire est pré-rempli automatiquement avec la preuve blockchain. La réclamation soumise est ancrée sur Polygon — elle devient une pièce à conviction.",
    tag: "BLOCKCHAIN",
    tagClass: "bg-sky-400/10 text-sky-300",
  },
  {
    icon: "🔍",
    title: "Suivi de résolution",
    description:
      "Timeline traçable avec 5 étapes ancrées sur blockchain. Si ENEO dépasse le délai légal, le smart contract escalade automatiquement vers l'ARSEL.",
    tag: "ESCALADE AUTO",
    tagClass: "bg-orange-400/10 text-orange-300",
  },
];

export default function SolutionSection() {
  return (
    <section
      id="solution"
      className="space-y-10 rounded-[36px] border border-white/10 bg-slate-950/90 px-6 py-20 shadow-[0_40px_120px_rgba(0,0,0,0.35)]"
    >
      <div className="mx-auto max-w-7xl text-center">
        <RevealOnScroll>
          <span className="inline-flex rounded-full bg-orange-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-orange-300">
            La solution
          </span>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
            FactureChain arme les abonnés
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">
            Un historique immuable sur blockchain transforme chaque relevé en
            preuve légale. L'anomalie devient contestable, la réclamation
            traçable, la résolution obligatoire.
          </p>
        </RevealOnScroll>
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
        {solutions.map((solution) => (
          <RevealOnScroll
            key={solution.title}
            className="rounded-[28px] border border-white/10 bg-slate-900/80 p-8 transition hover:-translate-y-1 hover:border-white/20 hover:shadow-lg"
          >
            <div className="text-3xl">{solution.icon}</div>
            <h3 className="mt-6 text-xl font-bold text-white">
              {solution.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {solution.description}
            </p>
            <span
              className={`mt-6 inline-flex rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-[0.3em] ${solution.tagClass}`}
            >
              {solution.tag}
            </span>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
