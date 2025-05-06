"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "../styles/ResultsSection.module.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const contentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

interface Result {
  title: string;
  description: string;
  imagePath: string;
}

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
  const [transformPercentage, setTransformPercentage] = useState(70);
  const [sliderHeight, setSliderHeight] = useState(214);

  useEffect(() => {
    const updateSliderSettings = () => {
      if (window.innerWidth >= 1024) {
        setTransformPercentage(70);
        setSliderHeight(380);
      } else if (window.innerWidth >= 768) {
        setTransformPercentage(60);
        setSliderHeight(340);
      } else {
        setTransformPercentage(120);
        setSliderHeight(240);
      }
    };

    updateSliderSettings();
    window.addEventListener("resize", updateSliderSettings);
    return () => window.removeEventListener("resize", updateSliderSettings);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => {
      const newIndex = prev - 1;
      if (newIndex < 0) {
        return resultsData.length - 1;
      }
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentSlide((prev) => {
      const newIndex = prev + 1;
      if (newIndex >= resultsData.length) {
        return 0;
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
    <section className="py-16 text-black bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-3xl md:text-5xl font-bold text-center mb-4 text-[#9000ff]"
        >
          The Results Behind the Work
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <p className="text-lg md:text-xl text-gray-600">
            Partnered with Convert Cake to make conversions a piece of cake, delivering proven results across e-commerce, SaaS, and retail.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="flex overflow-hidden justify-center"
            style={{ height: `${sliderHeight}px` }}
          >
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
                return null;
              }

              return (
                <div
                  key={index}
                  className={`flex-none transition-all duration-500 ease-in-out will-change-transform ${
                    isCenter
                      ? "w-[90%] md:w-[60%] lg:w-[50%] z-10"
                      : isAdjacent
                      ? "w-[20%] md:w-[20%] lg:w-[15%] z-0 cursor-pointer"
                      : "w-0 opacity-0"
                  }`}
                  style={{
                    transform: `translateX(${(index - currentSlide) * transformPercentage}%)`,
                  }}
                  onClick={() => handleSlideClick(index)}
                >
                  <div className="px-2 sm:px-1">
                    <div className={`${styles.imageContainer} bg-white overflow-hidden aspect-[1536/777]`}>
                      <Image
                        src={result.imagePath}
                        alt={result.title}
                        width={768}
                        height={389}
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 60vw, 50vw"
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-1 md:mt-2 lg:mt-1 space-x-2 lg:space-x-2 mb-2">
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

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`${styles.slideContent} max-w-xl mx-auto min-h-[200px]`}
            >
              <h3 className="text-xl md:text-2xl font-bold text-[#9000ff] mb-4">
                {resultsData[currentSlide].title}
              </h3>
              <p className="text-gray-600 text-base md:text-lg">
                {resultsData[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}