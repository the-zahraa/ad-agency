"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as gtag from "../lib/gtag"; // Import gtag
import styles from "../styles/CallButton.module.css";

interface CallButtonProps {
  inHeader?: boolean;
}

export default function CallButton({ inHeader = false }: CallButtonProps) {
  const handleClick = () => {
    // Track GA4 event
    gtag.event({
      action: "click",
      category: "CTA",
      label: inHeader ? "Header CTA" : "Hero Right CTA",
    });
  };

  return (
    <Link href="#book-call" onClick={handleClick}>
      <motion.button
        className={`${styles.button} ${inHeader ? styles.inHeader : styles.inHero} font-poppins`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05, transition: { duration: 0.15, ease: "easeInOut" } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.15, ease: "easeInOut" } }}
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.icon}
        >
          <path d="M6.62 10.79a15.77 15.77 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.22 11.88 11.88 0 003.74.6 1 1 0 011 1v3.5a1 1 0 01-1 1A19.93 19.93 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.88 11.88 0 00.6 3.74 1 1 0 01-.22 1.11l-2.2 2.2z" />
        </svg>
        Book a Call
      </motion.button>
    </Link>
  );
}