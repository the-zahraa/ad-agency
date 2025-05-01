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
    title: "I. You've Got Product-Market Fit",
    description:
      "You've got something people want and they're buying. Whether you're early-stage or scaling fast, we help turn demand into momentum.",
  },
  {
    title: "II. You Know Your Numbers (Or Want To)",
    description:
      "You track (or want to track) your CAC, AOV, LTV, and margins. We use your numbers to make smarter ad decisions and drive real growth.",
  },
  {
    title: "III. You're Open to Testing What Works",
    description:
      "You're done guessing. You're open to running smart experiments, trying new angles, and scaling what actually performs.",
  },
  {
    title: "IV. You Move Fast",
    description:
      "You make decisions, give feedback, and stay focused. That energy is how we hit goals quickly and why our best clients scale the fastest.",
  },
];

export function ClientFitSection() {
  return (
    <section className="bg-black py-16 text-white">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Headline and Subheading */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          We work best with brands who are ready to grow.
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-lg md:text-xl text-center text-gray-400 mb-12"
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
              className={styles.card}
            >
              <div className={styles.card__border}></div>
              <div className={styles.card_title__container}>
                <span className={styles.card_title}>{item.title}</span>
                <p className={styles.card_paragraph}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}