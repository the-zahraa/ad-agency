// app/thank-you/page.tsx
"use client";

import { useEffect } from "react";
import * as gtag from "../../lib/gtag"; // path: from app/thank-you/page.tsx up to src/lib
import { getConsentClient } from "../../components/CookieConsent"; // path: to src/components

// Extend window so TypeScript knows about fbq + dataLayer
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export default function ThankYouPage() {
  useEffect(() => {
    const consent = getConsentClient();

    // ✅ Analytics: GA4 + GTM event
    if (consent.analytics && typeof window !== "undefined") {
      // Google Analytics conversion
      gtag.event({
        action: "book_call_success",
        category: "Conversion",
        label: "Booked Strategy Call (Thank You Page)",
        value: 1,
      });

      // Push event to GTM dataLayer for tags
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "book_call_success",
        conversion_type: "strategy_call",
      });
    }

    // ✅ Marketing: Meta Pixel Lead conversion
    if (
      consent.marketing &&
      typeof window !== "undefined" &&
      typeof window.fbq === "function"
    ) {
      window.fbq("track", "Lead");
    }
  }, []);

  return (
    <section className="min-h-screen bg-white text-black flex flex-col items-center justify-start px-4 pt-28 md:pt-32 pb-32">
      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-center text-[#9000ff] mb-4">
        You&apos;re booked.
      </h1>

      <p className="text-xl md:text-2xl text-center text-gray-700 mb-12">
        Thanks for scheduling your call.
      </p>

      {/* Card */}
      <div
        className="w-full max-w-4xl bg-[#0E0E11] rounded-3xl p-10 shadow-2xl border border-[#9000ff33]"
        style={{ boxShadow: "0 0 60px rgba(144, 0, 255, 0.35)" }}
      >
        {/* Header with responsive text + tick right next to it */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 inline-flex items-center gap-2 whitespace-nowrap">
          {/* Shorter text on mobile so it fits with the icon */}
          <span className="inline md:hidden">Session confirmed.</span>
          {/* Full sentence on tablet/desktop */}
          <span className="hidden md:inline">
            Your strategy session is confirmed.
          </span>

          {/* Tick icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            className="w-6 h-6 md:w-7 md:h-7 text-green-400"
          >
            <circle cx="12" cy="12" r="10" strokeOpacity="0.5" />
            <path
              d="M8 12l3 3 5-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
          On this call, we&apos;ll review your current acquisition setup, your
          performance metrics, and your growth goals. You&apos;ll leave the call
          with clarity on your growth path and the next steps ahead.
        </p>

        {/* Info Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#1A1A1E] p-5 rounded-xl text-gray-300">
            <p className="font-semibold mb-1">01 · Bring your numbers</p>
            <p className="text-sm">
              Even rough estimates of CAC, AOV, ROAS, or monthly revenue help.
            </p>
          </div>

          <div className="bg-[#1A1AE] p-5 rounded-xl text-gray-300">
            <p className="font-semibold mb-1">02 · Your product</p>
            <p className="text-sm">
              What you&apos;re selling, who it&apos;s for, and your current
              traffic/sales sources.
            </p>
          </div>

          <div className="bg-[#1A1A1E] p-5 rounded-xl text-gray-300">
            <p className="font-semibold mb-1">03 · Access (optional)</p>
            <p className="text-sm">
              If possible, have ad accounts or analytics access ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
