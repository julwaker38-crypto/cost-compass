import { HeroSection } from '@/components/landing/HeroSection';
import { StatsSection } from '@/components/landing/StatsSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { CTASection } from '@/components/landing/CTASection';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingFooter } from '@/components/landing/LandingFooter';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <LandingHeader />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
};

export default Landing;
