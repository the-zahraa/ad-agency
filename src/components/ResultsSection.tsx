"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles/ResultsSection.module.css";

// Animation variants for Framer Motion
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Interface for result items
interface Result {
  title: string;
  description: string;
  imagePath: string;
}

// Data for the slides with image paths
const resultsData: Result[] = [
  {
    title: "Achieving Milestones in a Bear Market",
    description:
      "This example highlights how using expert industry knowledge and flexible strategies can help overcome tough market challenges and meet big goals.",
    imagePath: "/1.jpg",
  },
  {
    title: "Scaling a Mom & Baby Brand to 7-Figure Sales",
    description:
      "A family-owned business that we help incubate from pre-production to 7 figures in sales. We work closely with the sales team to give kids in Thailand more vitamin!",
    imagePath: "/2.jpg",
  },
  {
    title: "Table No.9's Recipe for Success",
    description:
      "We optimized Table No. 9's marketing for a top-tier, easy-sell product. Effective scaling and focus on repeat buys led to sell-outs, pausing ads due to high demand.",
    imagePath: "/3.jpg",
  },
  {
    title: "The Yogibo Success Story",
    description:
      "For Yogibo, the best-selling bean bag in Japan, we showcased product quality through creative content and focused on profitability from the first purchase.",
    imagePath: "/4.jpg",
  },
  {
    title: "Ajaib's Success Story",
    description:
      "This example shows how good product-market fit, along with smart user acquisition and media spend, can propel a startup to unicorn status through adaptive partnerships.",
    imagePath: "/5.jpg",
  },
  {
    title: "InnovestX's Strategic User Growth",
    description:
      "In 2023, InnovestX from Siam Commercial Bank sought our advice for high customer acquisition costs. Despite its credibility easing some tasks in this trust-focused industry, the on-going project proved successful within the first 90 days of working together.",
    imagePath: "/6.jpg",
  },
  {
    title: "020 Strategy for Bangkok's Leading Dental Clinic",
    description:
      "The primary objectives set forth by Smile Season were twofold: significant revenue growth and better allocation of time for the founders. The goal was to enhance business efficiency while accelerating financial success.",
    imagePath: "/7.jpg",
  },
  {
    title: "Launching a New Music App in Thailand",
    description:
      "This case study highlights the successful integration of targeted marketing strategies and data analytics in launching a new digital product in a highly competitive market, leading to substantial user engagement and rapid growth.",
    imagePath: "/8.jpg",
  },
  {
    title: "Fast-Track Insights: Product Testing for a Global Consulting Firm",
    description:
      "This project proved our ability to adapt swiftly and deliver meaningful results, even with tight deadlines and tough conditions. We gave our partner crucial insights for informed product development decisions.",
    imagePath: "/9.jpg",
  },
  {
    title: "Crafting Premium Appeal in Phuket's Crowded Market",
    description:
      "Strategic creativity and premium branding can position a new entrant effectively in a competitive market, leading to tangible results and ongoing partnerships.",
    imagePath: "/10.jpg",
  },
  {
    title: "Digital Strategy for a B2B Construction Startup",
    description:
      "This case study demonstrates how a well-executed digital strategy can transform a traditionally offline business, leading to unprecedented revenue growth and operational efficiency.",
    imagePath: "/11.jpg",
  },
  {
    title: "Boost Your Sales: Join Our Success Story",
    description:
      "Join us and achieve similar success! Most brands we work with see results within the first ~60 days of starting the campaign!",
    imagePath: "/12.jpg",
  },
];

export function ResultsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => {
      const newIndex = prev - 1;
      if (newIndex < 0) {
        return resultsData.length - 1; // Loop to the last slide
      }
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentSlide((prev) => {
      const newIndex = prev + 1;
      if (newIndex >= resultsData.length) {
        return 0; // Loop to the first slide
      }
      return newIndex;
    });
  };

  const handleSlideClick = (index: number) => {
    if (index === (currentSlide - 1 + resultsData.length) % resultsData.length) {
      handlePrev();
    } else if (index === (currentSlide + 1) % resultsData.length) {
      handleNext();
    }
  };

  return (
    <section className="py-16 text-black bg-[#f7f7f7] rounded-lg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          The Results Behind the Work
        </motion.h2>

        {/* Subheading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <p className="text-lg md:text-xl text-gray-600">
            Partnered with Convert Cake, a battle-tested team trusted by global brands to execute performance campaigns across paid media, creatives, and funnels.
          </p>
          <p className="text-lg md:text-xl text-gray-600 mt-2">
            They\'ve scaled brands in e-commerce, SaaS, and retail and the results speak for themselves
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          {/* Image Row (Slider) */}
          <div className="flex overflow-hidden justify-center">
            {resultsData.map((result: Result, index: number) => {
              const isCenter = index === currentSlide;
              const isAdjacent =
                index === (currentSlide - 1 + resultsData.length) % resultsData.length ||
                index === (currentSlide + 1) % resultsData.length;

              if (
                !isCenter &&
                !isAdjacent &&
                index !== (currentSlide - 2 + resultsData.length) % resultsData.length &&
                index !== (currentSlide + 2) % resultsData.length
              ) {
                return null; // Only render the center slide and its immediate neighbors
              }

              return (
                <div
                  key={index}
                  className={`flex-none transition-all duration-500 ease-in-out ${
                    isCenter
                      ? "w-2/3 md:w-1/2 z-10"
                      : isAdjacent
                      ? "w-1/4 md:w-1/6 z-0 cursor-pointer"
                      : "w-0 opacity-0"
                  }`}
                  style={{
                    transform: `translateX(${
                      (index - currentSlide) * (window.innerWidth >= 768 ? 50 : 70)
                    }%)`,
                  }}
                  onClick={() => handleSlideClick(index)}
                >
                  <div className="px-1">
                    <div className="bg-gray-200 rounded-lg overflow-hidden aspect-[1536/777]">
                      <img
                        src={result.imagePath}
                        alt={result.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows (Below the Slider) */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={handlePrev}
              className={`${styles.arrow} ${styles.active}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className={`${styles.arrow} ${styles.active}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content for the Current Slide */}
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-xl mx-auto mt-8 p-4 bg-gray-100 rounded-lg"
        >
          <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
            {resultsData[currentSlide].title}
          </h3>
          <p className="text-gray-600 text-base md:text-lg">
            {resultsData[currentSlide].description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}