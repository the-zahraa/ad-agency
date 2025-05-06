"use client";

import { motion } from "framer-motion";
import styles from "../styles/ClientFitSection.module.css";

// Animation variants for Framer Motion
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Data for the cards
const clientFitData = [
  {
    title: "You've Got Product-Market Fit",
    description:
      "You've got something people want and they're buying. Whether you're early-stage or scaling fast, we help turn demand into momentum.",
    romanNumeral: "I",
  },
  {
    title: "You Know Your Numbers (Or Want To)",
    description:
      "You track (or want to track) your CAC, AOV, LTV, and margins. We use your numbers to make smarter ad decisions and drive real growth.",
    romanNumeral: "II",
  },
  {
    title: "You're Open To Testing What Works",
    description:
      "You're done guessing. You're open to running smart experiments, trying new angles, and scaling what actually performs.",
    romanNumeral: "III",
  },
  {
    title: "You Move Fast",
    description:
      "You make decisions, give feedback, and stay focused. That energy is how we hit goals quickly and why our best clients scale the fastest.",
    romanNumeral: "IV",
  },
];

export function ClientFitSection() {
  return (
    <section className="bg-white py-16 text-black">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Headline and Subheading */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          style={{ color: "#9000ff" }}
        >
          <span className={styles.headlinePart1}>We Work Best With Brands</span>{" "}
          <span className={styles.headlinePart2}>Who Are Ready To Grow.</span>
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-lg md:text-xl text-center text-gray-600 mb-12"
        >
          If this sounds like you, we’ll probably do great things together:
        </motion.p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientFitData.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className={styles.outer}
            >
              <div className={styles.dot}></div>
              <div className={styles.card}>
                <div className={styles.ray}></div>
                <div className={styles.content}>
                  <div className={styles.text}>{item.romanNumeral}</div>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.description}>{item.description}</div>
                </div>
                <div className={styles.line + " " + styles.topl}></div>
                <div className={styles.line + " " + styles.leftl}></div>
                <div className={styles.line + " " + styles.bottoml}></div>
                <div className={styles.line + " " + styles.rightl}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}