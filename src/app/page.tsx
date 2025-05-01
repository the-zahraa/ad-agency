import { WhyM44 } from '@/components/WhyM44';
import { PartneredSection } from '@/components/PartneredSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ResultsStepsSection } from '@/components/ResultsStepsSection';
import { ResultsSection } from '@/components/ResultsSection';
import { ClientFitSection } from '@/components/ClientFitSection';
import { FAQSection } from '@/components/FAQSection';
import { BookCallSection } from '@/components/BookCallSection';
import Hero from '@/components/Hero';

// Add a simple client component to log rendering
function DebugSection({ id }: { id: string }) {
  if (typeof window !== "undefined") {
    console.log(`Section ${id} rendered`);
  }
  return null;
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div id="home" className="relative w-full">
        <DebugSection id="home" />
        <Hero />
      </div>

      {/* Other Sections */}
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div id="why-m44">
            <DebugSection id="why-m44" />
            <WhyM44 />
          </div>
          <div id="partnered">
            <DebugSection id="partnered" />
            <PartneredSection />
          </div>
          <div id="services">
            <DebugSection id="services" />
            <ServicesSection />
          </div>
          <div id="results-steps">
            <DebugSection id="results-steps" />
            <ResultsStepsSection />
          </div>
          <div id="results">
            <DebugSection id="results" />
            <ResultsSection />
          </div>
          <div id="client-fit">
            <DebugSection id="client-fit" />
            <ClientFitSection />
          </div>
          <div id="support">
            <DebugSection id="support" />
            <FAQSection />
          </div>
          <div id="book-call">
            <DebugSection id="book-call" />
            <BookCallSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Home - Ad Agency',
  description: 'Welcome to our ad agency. Discover our services and book a call today.',
};