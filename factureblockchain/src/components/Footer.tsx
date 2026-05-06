export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/95 px-6 py-10 text-slate-400 backdrop-blur-xl sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xl font-black text-white">
            <span>Facture</span>
            <span className="text-orange-400">Chain</span>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
            Darollo Technologies Corporation · MIABE Hackathon 2026 · Phase 2
            Demi-finale
          </p>
        </div>
        <div className="grid gap-2 text-sm leading-6 sm:text-right">
          <span>ODD 7 · ODD 11 · ODD 16</span>
          <span>Polygon · Solidity v0.8 · IPFS</span>
          <span>www.miabehackathon.com</span>
        </div>
      </div>
    </footer>
  );
}
