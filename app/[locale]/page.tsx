import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ServicesSection from '@/components/ServicesSection';
import HowWeWork from '@/components/HowWeWork';
import AboutPreview from '@/components/AboutPreview';
import GlobalCoverage from '@/components/GlobalCoverage';
import IndustriesSection from '@/components/IndustriesSection';
import CompletedWork from '@/components/CompletedWork';
import Testimonials from '@/components/Testimonials';
import TeamPreview from '@/components/TeamPreview';
import PartnersSection from '@/components/PartnersSection';
import ContactCTA from '@/components/ContactCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="below-hero">
        <StatsSection />
        <ServicesSection />
        <HowWeWork />
        <AboutPreview />
        <GlobalCoverage />
        <IndustriesSection />
        <CompletedWork />
        <Testimonials />
        <TeamPreview />
        <PartnersSection />
        <ContactCTA />
      </div>
    </>
  );
}
