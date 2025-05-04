"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../styles/CallButton.module.css";

export default function CallButton() {
  return (
    <Link href="#book-call">
      <motion.button
        className={`${styles.button} font-poppins`}
        style={{ "--clr": "#7808d0" } as React.CSSProperties}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={styles.button__iconWrapper}>
          <svg
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.button__iconSvg}
            width="10"
          >
            <path
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
              fill="currentColor"
            ></path>
          </svg>

          <svg
            viewBox="0 0 14 15"
            fill="none"
            width="10"
            xmlns="http://www.w3.org/2000/svg"
            className={`${styles.button__iconSvg} ${styles.button__iconSvgCopy}`}
          >
            <path
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
        Book a Call
      </motion.button>
    </Link>
  );
}