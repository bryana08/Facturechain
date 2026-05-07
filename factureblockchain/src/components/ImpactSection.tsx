import RevealOnScroll from "./RevealOnScroll";

const impactCards = [
  {
    title: "🎯 Impact direct — Abonnés",
    items: [
      "Réduction des surfacturations via vérification en temps réel",
      "Délai de résolution réduit à moins de 30 jours (vs 18 mois)",
      "Économies directes pour les ménages et les PME",
      "Autonomisation face au monopole SOCADEL",
    ],
  },
  {
    title: "🌍 Impact systémique",
    items: [
      "Pression collective sur SOCADEL via données agrégées publiques",
      "L'ARSEL dispose de preuves concrètes pour agir par zone",
      "Réduction progressive du taux de 30% de pertes refacturées",
      "Modèle reproductible dans toute l'Afrique subsaharienne",
    ],
  },
];

const odds = [
  {
    label: "ODD 7",
    description: "Énergie propre & accessible",
    color: "bg-orange-500/10 text-orange-300 border border-orange-400/20",
  },
  {
    label: "ODD 11",
    description: "Villes & communautés durables",
    color: "bg-sky-500/10 text-sky-300 border border-sky-400/20",
  },
  {
    label: "ODD 16",
    description: "Institutions efficaces & responsables",
    color: "bg-emerald-500/10 text-emerald-300 border border-emerald-400/20",
  },
];

export default function ImpactSection() {
  return (
    <section
      id="impact"
      className="space-y-10 rounded-[36px] border border-white/10 bg-slate-950/90 px-6 py-20 shadow-[0_40px_120px_rgba(0,0,0,0.35)]"
    >
      <div className="mx-auto max-w-7xl text-center">
        <span className="inline-flex rounded-full bg-orange-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-orange-300">
          Impact attendu
        </span>
        <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
          Un abonné qui peut prouver.
          <br />
          Un opérateur qui doit rendre des comptes.
        </h2>
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
        {impactCards.map((card) => (
          <RevealOnScroll
            key={card.title}
            className="rounded-[28px] border border-white/10 bg-slate-900/80 p-8"
          >
            <h3 className="text-lg font-bold text-white">{card.title}</h3>
            <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
              {card.items.map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="text-orange-300">→</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        ))}
      </div>
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
        {odds.map((odd) => (
          <RevealOnScroll
            key={odd.label}
            className={`rounded-3xl p-8 text-center ${odd.color}`}
          >
            <div className="text-3xl font-black">{odd.label}</div>
            <p className="mt-3 text-sm leading-7">{odd.description}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
