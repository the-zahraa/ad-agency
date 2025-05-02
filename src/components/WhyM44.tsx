"use client";

import { motion } from "framer-motion";
import styles from "../styles/Card.module.css";

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
        "Slow agencies that never deliver.",
        "Freelancers who disappear when things get tough.",
        "In-house teams that don’t know how to scale.",
        "You don’t need more “ads.” You need results. Fast.",
      ],
    },
    {
      title: "why m44?",
      items: [
        "We’re obsessed with outcomes, not vanity metrics.",
        "Fast execution, clear strategy, no fluff.",
        "Ads that don’t just get clicks—they convert.",
        "We don’t run ads. We make you money.",
      ],
    },
    {
      title: "Wherever You Are, We Scale You Fast",
      items: [
        "Just starting with ads? We’ll get you results fast.",
        "Already spending big? We’ll make your budget work harder.",
        "No guesswork. Just real, fast growth.",
        "We don’t sell marketing. We sell growth.",
      ],
    },
  ];

  // Function to scroll to Book Call section
  const scrollToBookCall = () => {
    const bookCallSection = document.getElementById("book-call");
    if (bookCallSection) {
      bookCallSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={`${styles.sectionBackground} py-16 text-white`}>
      {/* SVG Filters for Glowing Animation */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="unopaq" y="-100%" height="300%" x="-100%" width="300%">
          <feColorMatrix
            values="1 0 0 0 0 
                    0 1 0 0 0 
                    0 0 1 0 0 
                    0 0 0 5 0"
          ></feColorMatrix>
        </filter>
        <filter id="unopaq2" y="-100%" height="300%" x="-100%" width="300%">
          <feColorMatrix
            values="1 0 0 0 0 
                    0 1 0 0 0 
                    0 0 1 0 0 
                    0 0 0 10 0"
          ></feColorMatrix>
        </filter>
        <filter id="unopaq3" y="-100%" height="300%" x="-100%" width="300%">
          <feColorMatrix
            values="1 0 0 1 0 
                    0 1 0 1 0 
                    0 0 1 1 0 
                    0 0 0 2 0"
          ></feColorMatrix>
        </filter>
      </svg>

      <div className={styles.sectionContainer}>
        {/* Headline */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: "#9000ff" }}
        >
          why m44?
        </motion.h2>

        {/* Subheading */}
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-2xl md:text-3xl font-semibold mb-2"
        >
          Not Another Agency. A Performance-Obsessed Partner.
        </motion.h3>

        {/* Description */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-lg md:text-xl mb-12"
        >
          Most agencies care about impressions. We care about outcomes.
        </motion.p>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col md:flex-row justify-center items-center gap-8"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              className={styles.cardContainer}
            >
              <div className={styles.spin + " " + styles.spinBlur}></div>
              <div className={styles.spin + " " + styles.spinIntense}></div>
              <div className={styles.cardBorder}>
                <div className={styles.spin + " " + styles.spinInside}></div>
              </div>
              <div className={styles.card}>
                <div className={styles.header}>
                  <div className={styles.repo}>
                    <span className={styles.repoName}>{card.title}</span>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.list}>
                    {card.items.map((item, idx) => (
                      <div key={idx} className={styles.listItem}>
                        <span className={styles.check}>
                          <svg
                            className={styles.checkSvg}
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              clipRule="evenodd"
                              d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                        <span>{item}</span>
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
          className="inline-block mt-12 mb-8 px-6 py-3 bg-[#9000ff] text-white font-semibold rounded-full hover:scale-105 transition-transform"
        >
          Let’s Talk Results.
        </motion.button>
      </div>
    </section>
  );
}