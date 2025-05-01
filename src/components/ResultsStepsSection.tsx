"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../styles/StepCard.module.css";

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

export function ResultsStepsSection() {
  const steps = [
    {
      number: "I.",
      title: "Consultation",
      description: "Book a call with us. We'll learn about your business, goals, and challenges so we know exactly where you are and where you want to go.",
    },
    {
      number: "II.",
      title: "Onboarding",
      description: "We set up access, gather assets, and get everything ready on our end—fast, clean, and frictionless.",
    },
    {
      number: "III.",
      title: "Strategy & Launch",
      description: "We craft your growth plan, build your campaign, and get you live—ads, creatives, tracking, and all.",
    },
    {
      number: "IV.",
      title: "Review & Optimize",
      description: "Once live, we monitor daily and optimize aggressively. You'll get regular updates, transparent data, and strategy adjustments to keep scaling.",
    },
  ];

  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-5xl md:text-6xl font-bold text-center mb-12"
        >
          See Results In{" "}
          <span
            style={{
              color: "#9000ff",
              textShadow: "0 0 5px #9000ff, 0 0 10px #b266ff",
            }}
          >
            4
          </span>{" "}
          Simple Steps
        </motion.h2>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto mb-16"> {/* Increased margin-bottom */}
          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className={styles.outer}
            >
              <div className={styles.a}></div>
              <div className={styles.b}></div>
              <div className={styles.c}></div>
              <div className={styles.label}>
                <div className={styles.titleWrapper}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                </div>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <p className="text-2xl font-bold mb-4">Speed starts with you.</p> {/* Larger, bolder text */}
          <p className="text-xl mb-6">The first step is in your control.</p> {/* Increased spacing */}
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#8e26e2] to-[#f4b1fd] text-white font-semibold text-lg rounded-full hover:scale-105 transition-transform"
          >
            Book the call
          </Link>
        </motion.div>
      </div>
    </section>
  );
}