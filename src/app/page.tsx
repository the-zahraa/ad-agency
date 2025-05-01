
import { WhyM44 } from "@/components/WhyM44";
import { PartneredSection } from "@/components/PartneredSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ResultsStepsSection } from "@/components/ResultsStepsSection";
import { ResultsSection } from "@/components/ResultsSection";
import { ClientFitSection } from "@/components/ClientFitSection";
import { FAQSection } from "@/components/FAQSection";
import { BookCallSection } from "@/components/BookCallSection";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <WhyM44 />
      <PartneredSection />
      <ServicesSection />
      <ResultsStepsSection />
      <ResultsSection />
      <ClientFitSection />
      <FAQSection />
      <BookCallSection />
    </div>
  );
}