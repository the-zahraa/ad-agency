"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../styles/LogosBar.module.css";

// Animation variants for Framer Motion
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const logosBarVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, delay: 0.4 } },
};

export function PartneredSection() {
  // Split logos into two rows (14 logos each)
  const firstRowLogos = Array(14).fill(null); // First 14 logos
  const secondRowLogos = Array(14).fill(null); // Next 14 logos

  return (
    <section className="pt-16 pb-8 bg-white text-white"> {/* Reduced bottom padding */}
      <div className="container mx-auto px-4 text-center">
        {/* Headline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-4 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-[#9000ff]">
            Partnered with
          </h2>
          <Image
            src="/convertCake.png"
            alt="Convert Cake Logo"
            width={300}
            height={80}
            style={{ filter: "grayscale(100%)" }}
          />
        </motion.div>

        {/* Subheading */}
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-2xl md:text-3xl font-semibold mb-8 text-black"
        >
          Bringing performance-driven marketing that prioritizes revenue growth over mere engagement.
        </motion.h3>

        {/* Logos Bar Title */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-lg md:text-xl mb-6 text-[#9000ff]"
        >
          Companies we have grown with performance marketing
        </motion.p>

        {/* Logos Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={logosBarVariants}
          className={styles.logosContainer}
        >
          <div className={styles.logosWrapper}>
            {/* First row: Left to Right */}
            <div className={`${styles.logosRow} ${styles.leftToRight}`}>
              {[...firstRowLogos, ...firstRowLogos].map((_, index) => (
                <div key={`first-${index}`} className={styles.logoPlaceholder}>
                  <Image
                    src={`/${(index % 14) + 1}.png`}
                    alt={`Logo ${(index % 14) + 1}`}
                    width={120}
                    height={60}
                    className={styles.logoImage}
                  />
                </div>
              ))}
            </div>
            {/* Second row: Right to Left */}
            <div className={`${styles.logosRow} ${styles.rightToLeft}`}>
              {[...secondRowLogos, ...secondRowLogos].map((_, index) => (
                <div key={`second-${index}`} className={styles.logoPlaceholder}>
                  <Image
                    src={`/${(index % 14) + 15}.png`}
                    alt={`Logo ${(index % 14) + 15}`}
                    width={120}
                    height={60}
                    className={styles.logoImage}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}