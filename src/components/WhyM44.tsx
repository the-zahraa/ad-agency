"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../styles/Card.module.css";
import { useEffect, useRef, useState } from "react";

// Animation variants for Framer Motion
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.2 },
  }),
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export function WhyM44() {
  const cards = [
    {
      title: "Tired of Wasting Time and Money?",
      items: [
        "Most agencies move slow and miss deadlines.",
        "Freelancers disappear the moment things get hard.",
        "Internal teams don’t know how to scale profitably.",
        "You don’t need more ads — you need more money.",
      ],
    },
    {
      title: "Why Businesses Choose m44?",
      items: [
        "We measure success by dollars in your bank, not likes on your post.",
        "Speed is our default. Strategy is baked in.",
        "We write ads that convert, not just attract.",
        "We’re not an ad agency. We’re a growth partner",
      ],
    },
    {
      title: "Wherever You Are, We Scale You Fast",
      items: [
        "Just getting started? We’ll help you hit profit quickly.",
        "Already spending? We’ll squeeze more from every dollar.",
        "No guesswork. No fluff. Just proven, scalable growth.",
        "We don’t sell marketing. We sell results.",
      ],
    },
  ];

  // State to store card widths (height is now fixed in CSS)
  const [cardWidths, setCardWidths] = useState<number[]>(
    cards.map(() => 480) // Increased initial width to 480px
  );

  // State to store whether the layout should be single-column
  const [isSingleColumn, setIsSingleColumn] = useState(false);

  // Refs for each card to observe resizing, with proper TypeScript typing
  const cardRefs = useRef<React.MutableRefObject<HTMLDivElement | null>[]>(cards.map(() => ({ current: null })));

  // Ref for the parent container
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ResizeObserver for cards (only for width)
    const cardObserver = new ResizeObserver((entries) => {
      const newWidths = [...cardWidths];
      entries.forEach((entry, index) => {
        const card = entry.target as HTMLDivElement;
        const title = card.querySelector(`.${styles.repoName}`) as HTMLSpanElement;
        const titleWidth = title.scrollWidth + 48;

        newWidths[index] = Math.max(titleWidth, 380); // Increased min width to 380px
      });
      setCardWidths(newWidths);
    });

    // ResizeObserver for the parent container
    const containerObserver = new ResizeObserver((entries) => {
      const container = entries[0].target as HTMLDivElement;
      const containerWidth = container.getBoundingClientRect().width;
      const totalCardWidth = cardWidths.reduce((sum, width) => sum + width, 0);
      const gapCount = cards.length - 1;
      const totalGapWidth = gapCount * 32;
      const requiredWidth = totalCardWidth + totalGapWidth;

      setIsSingleColumn(requiredWidth > containerWidth);
    });

    // Observe each card
    cardRefs.current.forEach((ref) => {
      if (ref.current) cardObserver.observe(ref.current);
    });

    // Observe the parent container
    if (containerRef.current) containerObserver.observe(containerRef.current);

    // Cleanup on unmount
    return () => {
      cardObserver.disconnect();
      containerObserver.disconnect();
    };
  }, [cardWidths]);

  const scrollToBookCall = () => {
    const bookCallSection = document.getElementById("book-call");
    if (bookCallSection) {
      bookCallSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={`${styles.sectionBackground} py-12 sm:py-16 text-white`}>
      {/* SVG Filters for Glowing Animation */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="unopaq" y="-100%" height="300%" x="-100%" width="300%">
          <feColorMatrix
            values="1 0 0 0 0 
                    0 1 0 0 0 
                    0 0 1 0 0 
                    0 0 0 5 0"
          />
        </filter>
        <filter id="unopaq2" y="-100%" height="300%" x="-100%" width="300%">
          <feColorMatrix
            values="1 0 0 0 0 
                    0 1 0 0 0 
                    0 0 1 0 0 
                    0 0 0 10 0"
          />
        </filter>
        <filter id="unopaq3" y="-100%" height="300%" x="-100%" width="300%">
          <feColorMatrix
            values="1 0 0 1 0 
                    0 1 0 1 0 
                    0 0 1 1 0 
                    0 0 0 2 0"
          />
        </filter>
      </svg>

      <div className={`${styles.sectionContainer} px-4 sm:px-6 lg:px-8`}>
        {/* Headline */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="font-bold mb-4 text-[#9000ff]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.125rem)" }}
        >
          why m44?
        </motion.h2>

        {/* Subheading */}
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="font-semibold mb-2"
          style={{ fontSize: "clamp(1.5rem, 3vw, 1.875rem)" }}
        >
          Not Another Agency. A Performance-Obsessed Partner.
        </motion.h3>

        {/* Description */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-8 sm:mb-12 max-w-3xl mx-auto"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
        >
          Most agencies care about impressions. We care about outcomes.
        </motion.p>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className={`flex justify-center items-center gap-4 sm:gap-6 lg:gap-8 ${
            isSingleColumn ? "flex-col" : "flex-row flex-wrap"
          }`}
          ref={containerRef}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              className={`${styles.cardContainer}`}
              style={{
                width: `min(${cardWidths[index]}px, 100%)`,
              }}
              ref={(el: HTMLDivElement | null) => {
                cardRefs.current[index] = { current: el };
              }}
            >
              <div className={styles.spin + " " + styles.spinBlur}></div>
              <div className={styles.spin + " " + styles.spinIntense}></div>
              <div className={styles.cardBorder}>
                <div className={styles.spin + " " + styles.spinInside}></div>
              </div>
              <div className={styles.card}>
                <div className={styles.header}>
                  <div className="flex flex-col items-center">
                    {index === 0 && (
                      <div className={`${styles.iconContainer} mb-2`}>
                        <Image
                          src="/Asset3.png"
                          alt="Stopwatch Icon"
                          layout="fill"
                          objectFit="contain"
                          sizes="(max-width: 640px) 40px, 48px"
                        />
                      </div>
                    )}
                    {index === 1 && (
                      <div className={`${styles.iconContainer} mb-2`}>
                        <Image
                          src="/Asset5.png"
                          alt="Business Icon"
                          layout="fill"
                          objectFit="contain"
                          sizes="(max-width: 640px) 40px, 48px"
                        />
                      </div>
                    )}
                    {index === 2 && (
                      <div className={`${styles.iconContainer} mb-2`}>
                        <Image
                          src="/Asset4.png"
                          alt="Scale Icon"
                          layout="fill"
                          objectFit="contain"
                          sizes="(max-width: 640px) 40px, 48px"
                        />
                      </div>
                    )}
                    <div className={styles.repo}>
                      <span
                        className={styles.repoName}
                        style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
                      >
                        {card.title}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.list}>
                    {card.items.map((item, idx) => (
                      <div key={idx} className={styles.listItem}>
                        <span className={styles.bullet}>•</span>
                        <span style={{ fontSize: "clamp(0.75rem, 2vw, 0.9rem)" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={scrollToBookCall}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="inline-block mt-8 sm:mt-12 mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 bg-[#9000ff] text-white font-semibold rounded-full hover:scale-105 transition-transform"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.125rem)" }}
        >
          Let’s Talk Results.
        </motion.button>
      </div>
    </section>
  );
}