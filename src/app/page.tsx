// src/app/page.tsx
"use client";

import { WhyM44 } from '@/components/WhyM44';
import { PartneredSection } from '@/components/PartneredSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ResultsStepsSection } from '@/components/ResultsStepsSection';
import { ResultsSection } from '@/components/ResultsSection';
import { ClientFitSection } from '@/components/ClientFitSection';
import { FAQSection } from '@/components/FAQSection';
import { BookCallSection } from '@/components/BookCallSection';
import Hero from '@/components/Hero';
import { useEffect, useState } from 'react';

function DebugSection({ id }: { id: string }) {
  if (typeof window !== "undefined") {
    console.log(`Section ${id} rendered`);
  }
  return null;
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero and Partnered Section */}
      <div id="home" className="relative w-full">
        <DebugSection id="home" />
        <Hero isMobile={isMobile} />
        {!isMobile && (
          <div id="partnered">
            <DebugSection id="partnered" />
            <PartneredSection />
          </div>
        )}
      </div>

      {/* Other Sections */}
      <div className="flex flex-col w-full">
        <div className="w-full">
          <div id="why-m44">
            <DebugSection id="why-m44" />
            <WhyM44 />
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