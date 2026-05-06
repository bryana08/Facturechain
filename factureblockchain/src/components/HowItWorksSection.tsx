import RevealOnScroll from "./RevealOnScroll";

const steps = [
  {
    number: 1,
    title: "Relevé ancré",
    description:
      "Votre consommation est enregistrée sur Polygon. Hash + timestamp certifié. Immuable.",
    color: "border-orange-400 bg-orange-500/10 text-orange-300",
  },
  {
    number: 2,
    title: "Anomalie détectée",
    description:
      "Le smart contract compare votre consommation réelle et la facture ENEO. Alerte automatique si écart > 5%.",
    color: "border-sky-400 bg-sky-500/10 text-sky-300",
  },
  {
    number: 3,
    title: "Réclamation soumise",
    description:
      "Un clic. Le formulaire est pré-rempli. La preuve blockchain est jointe automatiquement.",
    color: "border-emerald-400 bg-emerald-500/10 text-emerald-300",
  },
  {
    number: 4,
    title: "Résolution suivie",
    description:
      "Timeline publique. Délai affiché. Escalade automatique vers l'ARSEL si nécessaire.",
    color: "border-orange-400 bg-orange-500/10 text-orange-300",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="space-y-10 py-24">
      <div className="mx-auto max-w-7xl text-center">
        <RevealOnScroll>
          <span className="inline-flex rounded-full bg-orange-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-orange-300">
            Comment ça marche
          </span>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
            4 étapes, 0 expertise technique requise
          </h2>
        </RevealOnScroll>
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
        {steps.map((step) => (
          <RevealOnScroll
            key={step.number}
            className="rounded-[28px] border border-white/10 bg-slate-950/80 p-8 text-center"
          >
            <div
              className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 ${step.color} text-xl font-black`}
            >
              {step.number}
            </div>
            <h3 className="text-lg font-bold text-white">{step.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {step.description}
            </p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
