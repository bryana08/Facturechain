import RevealOnScroll from "./RevealOnScroll";

const stats = [
  {
    value: "40%",
    label: "des abonnés ENEO contestent une facture/an",
    color: "text-orange-400",
  },
  {
    value: "800K",
    label: "compteurs défaillants ou non relevés",
    color: "text-sky-400",
  },
  {
    value: "18 mois",
    label: "délai moyen de résolution d'un litige",
    color: "text-red-400",
  },
  {
    value: "600 Mds",
    label: "FCFA/an de coût économique (GICAM 2022)",
    color: "text-emerald-400",
  },
];

export default function StatsBand() {
  return (
    <section className="overflow-hidden rounded-[36px] border border-white/10 bg-slate-900/90 px-6 py-12 shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <RevealOnScroll
              key={item.value}
              className="rounded-3xl bg-slate-950/80 p-8 text-center"
            >
              <div className={`text-4xl font-black ${item.color}`}>
                {item.value}
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {item.label}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
