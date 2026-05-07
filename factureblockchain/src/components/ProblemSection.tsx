import RevealOnScroll from "./RevealOnScroll";

const issues = [
  {
    title: "Aucune transparence",
    description:
      "L'abonné reçoit un montant à payer. Aucun historique vérifiable, aucune donnée sur sa consommation réelle.",
  },
  {
    title: "Aucun recours rapide",
    description:
      "Un litige peut durer 6 à 18 mois. Pendant ce temps, l'abonné continue de payer les montants contestés.",
  },
  {
    title: "SOCADEL contrôle tout",
    description:
      "Les données de consommation appartiennent à l'opérateur. Le client n'a aucune preuve indépendante.",
  },
];

export default function ProblemSection() {
  return (
    <section id="probleme" className="space-y-10 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <RevealOnScroll>
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-orange-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-orange-300">
                Le problème
              </span>
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Les abonnés camerounais paient sans pouvoir vérifier
              </h2>
              <p className="max-w-xl text-base leading-8 text-slate-300">
                À Yaoundé et Douala, les délestages atteignent 8 à 12 heures par
                jour. Dans ce contexte, les factures SOCADEL arrivent — souvent
                surestimées — sans aucun moyen de les contester efficacement.
              </p>
              <div className="grid gap-5">
                {issues.map((issue) => (
                  <div
                    key={issue.title}
                    className="rounded-3xl border border-orange-400/10 bg-slate-950/80 p-7 transition hover:-translate-y-1 hover:border-orange-300/20"
                  >
                    <h3 className="text-sm font-bold text-white">
                      {issue.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {issue.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="rounded-[32px] border border-orange-400/15 bg-orange-500/10 p-10">
              <h3 className="text-xl font-black text-orange-300">
                ⚠ Problème Central
              </h3>
              <p className="mt-4 text-sm leading-8 text-white">
                Les abonnés camerounais de SOCADEL reçoivent des factures qu'ils ne
                peuvent ni vérifier ni contester efficacement. Il n'existe
                aucune transparence sur la consommation réelle, aucun historique
                vérifiable, et aucun mécanisme de réclamation rapide.
              </p>
              <div className="mt-8 space-y-4 rounded-3xl border-t border-orange-400/20 pt-6 text-sm leading-7 text-slate-200">
                <div className="italic">
                  "J'ai reçu une facture de 87 000 FCFA alors que j'étais absent
                  depuis 2 mois."
                </div>
                <div className="text-slate-400 text-xs">
                  — Fonctionnaire, Yaoundé Bastos
                </div>
                <div className="italic">
                  "Mon litige dure depuis 14 mois. Je continue à payer ou on me
                  coupe."
                </div>
                <div className="text-slate-400 text-xs">
                  — Commerçant, Douala Akwa
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
