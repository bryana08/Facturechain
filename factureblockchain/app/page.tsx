import CtaSection from "../src/components/CtaSection";
import BlockchainSection from "../src/components/BlockchainSection";
import Hero from "../src/components/Hero";
import HowItWorksSection from "../src/components/HowItWorksSection";
import ImpactSection from "../src/components/ImpactSection";
import ProblemSection from "../src/components/ProblemSection";
import SolutionSection from "../src/components/SolutionSection";
import StatsBand from "../src/components/StatsBand";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-20">
      <Hero />
      <StatsBand />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <BlockchainSection />
      <ImpactSection />
      <CtaSection />
    </div>
  );
}
