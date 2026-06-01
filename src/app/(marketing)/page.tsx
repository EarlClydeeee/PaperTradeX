import LandingNavbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import ScienceSection from '@/components/landing/ScienceSection';
import FingerprintEvolutionSection from '@/components/landing/FingerprintEvolutionSection';
import CtaSection from '@/components/landing/CtaSection';
import LandingFooter from '@/components/landing/Footer';
import SimulatorFab from '@/components/landing/SimulatorFab';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg">
      <LandingNavbar />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <ScienceSection />
      <FingerprintEvolutionSection />
      <CtaSection />
      <LandingFooter />
      <SimulatorFab />
    </div>
  );
}
