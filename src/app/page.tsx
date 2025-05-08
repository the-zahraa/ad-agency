"use client";

import { useEffect } from "react";
import { WhyM44 } from "@/components/WhyM44";
import { PartneredSection } from "@/components/PartneredSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ResultsStepsSection } from "@/components/ResultsStepsSection";
import { ResultsSection } from "@/components/ResultsSection";
import { ClientFitSection } from "@/components/ClientFitSection";
import { FAQSection } from "@/components/FAQSection";
import { BookCallSection } from "@/components/BookCallSection";
import Hero from "@/components/Hero";
import * as gtag from "../lib/gtag"; // Import gtag

function DebugSection({ id }: { id: string }) {
  if (typeof window !== "undefined") {
    console.log(`Section ${id} rendered`);
  }
  return null;
}

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight * 0.5) {
        gtag.event({
          action: "scroll",
          category: "Engagement",
          label: "Homepage 50% Scroll",
        });
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div id="home" className="relative w-full">
        <DebugSection id="home" />
        <Hero />
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full">
          <div id="partnered">
            <DebugSection id="partnered" />
            <PartneredSection />
          </div>
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