import RevealOnScroll from "./RevealOnScroll";

const features = [
  {
    icon: "🔒",
    title: "Immuabilité",
    description:
      "Aucune donnée modifiable après ancrage. Ni ENEO, ni personne.",
  },
  {
    icon: "⏱",
    title: "Horodatage certifié",
    description: "Chaque relevé a un timestamp incontestable sur Polygon.",
  },
  {
    icon: "👁",
    title: "Transparence publique",
    description: "Auditable par l'ARSEL, les associations, les tribunaux.",
  },
  {
    icon: "⚡",
    title: "Coût minimal",
    description: "Moins de 0,01 USD par transaction sur Polygon.",
  },
];

const blocks = [
  {
    title: "Bloc #47291845",
    time: "31 Juil 2026 · 14:22 UTC",
    hash: "0x4a7f2c8e1b3d9f6a5c2e8d2c4b7a1f3e9d5c",
    data: "✓ 312 kWh · CMR-YDE-2847391 · Validé",
  },
  {
    title: "Bloc #47291902",
    time: "12 Août 2026 · 09:14 UTC",
    hash: "0xb9c3f1a2e8d4517b6c0e9f3a2d1b8e7c4f5a2b1",
    data: "⚠ Réclamation #FC-2026-0847 · Ancrée",
    highlight: true,
  },
  {
    title: "Prochain bloc...",
    time: "En attente",
    hash: "Décision ENEO · Escalade ARSEL si délai dépassé",
    data: "",
    muted: true,
  },
];

export default function BlockchainSection() {
  return (
    <section
      id="blockchain"
      className="space-y-10 rounded-[36px] border border-white/10 bg-slate-950/90 px-6 py-20 shadow-[0_40px_120px_rgba(0,0,0,0.35)]"
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_0.9fr] lg:items-start">
        <RevealOnScroll>
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-orange-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-orange-300">
              Technologie
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Pourquoi la blockchain ?
            </h2>
            <p className="max-w-xl text-base leading-8 text-slate-300">
              Un historique de consommation enregistré sur blockchain est
              immuable. ENEO ne peut pas modifier les données après
              enregistrement. Une anomalie entre l'historique blockchain et la
              facture est une preuve légale de surfacturation.
            </p>
            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-4 rounded-[26px] border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-xl text-orange-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="rounded-[32px] border border-sky-400/15 bg-slate-900/90 p-8">
          <div className="mb-8 text-xs uppercase tracking-[0.3em] text-slate-500">
            Registre Polygon — Live
          </div>
          <div className="space-y-6">
            {blocks.map((block, idx) => (
              <div
                key={idx}
                className={`rounded-3xl border p-5 ${block.highlight ? "border-sky-300/30 bg-slate-950/90" : "border-white/10 bg-slate-950/70"} ${block.muted ? "opacity-70" : ""}`}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-slate-400">
                  <span>{block.title}</span>
                  <span>{block.time}</span>
                </div>
                <div className="mt-4 break-words text-sm text-sky-300">
                  {block.hash}
                </div>
                {block.data ? (
                  <div
                    className={`mt-4 text-sm ${block.highlight ? "text-orange-300" : "text-emerald-300"}`}
                  >
                    {block.data}
                  </div>
                ) : null}
                {idx < blocks.length - 1 ? (
                  <div className="my-4 text-center text-sm text-orange-400">
                    ↓ lié au bloc précédent
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="rounded-3xl bg-emerald-500/10 p-4 text-sm leading-7 text-emerald-300">
            ✓ Réseau : Polygon Mainnet · Smart Contract : FactureChain.sol ·
            Coût : {"<"} 0.01 USD/tx
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
