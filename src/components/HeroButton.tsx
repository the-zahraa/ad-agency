"use client";

import { motion } from "framer-motion";
import * as gtag from "../lib/gtag"; // Import gtag
import styles from "../styles/HeroButton.module.css";

interface HeroButtonProps {
  className?: string;
  id?: string;
}

export default function HeroButton({ className, id }: HeroButtonProps) {
  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // Track GA4 event
    gtag.event({
      action: "click",
      category: "CTA",
      label: "Hero Middle CTA",
    });
    const bookCallSection = document.getElementById("book-call");
    if (bookCallSection) {
      console.log("Found book-call, scrolling...");
      bookCallSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error("book-call not found!");
    }
  };

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <button
        onClick={handleClick}
        className={styles.button}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick(e);
          }
        }}
      >
        <div className={styles.bg}></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 342 208"
          height="208"
          width="342"
          className={styles.splash}
        >
          {/* SVG paths unchanged */}
          <path strokeLinecap="round" strokeWidth="3" d="M54.1054 99.7837C54.1054 99.7837 40.0984 90.7874 26.6893 97.6362C13.2802 104.485 1.5 97.6362 1.5 97.6362"></path>
          <path strokeLinecap="round" strokeWidth="3" d="M285.273 99.7841C285.273 99.7841 299.28 90.7879 312.689 97.6367C326.098 104.486 340.105 95.4893 340.105 95.4893"></path>
          <path strokeLinecap="round" strokeWidth="3" strokeOpacity="0.3" d="M281.133 64.9917C281.133 64.9917 287.96 49.8089 302.934 48.2295C317.908 46.6501 319.712 36.5272 319.712 36.5272"></path>
          <path strokeLinecap="round" strokeWidth="3" strokeOpacity="0.3" d="M281.133 138.984C281.133 138.984 287.96 154.167 302.934 155.746C317.908 157.326 319.712 167.449 319.712 167.449"></path>
          <path strokeLinecap="round" strokeWidth="3" d="M230.578 57.4476C230.578 57.4476 225.785 41.5051 236.061 30.4998C246.337 19.4945 244.686 12.9998 244.686 12.9998"></path>
          <path strokeLinecap="round" strokeWidth="3" d="M230.578 150.528C230.578 150.528 225.785 166.471 236.061 177.476C246.337 188.481 244.686 194.976 244.686 194.976"></path>
          <path strokeLinecap="round" strokeWidth="3" strokeOpacity="0.3" d="M170.392 57.0278C170.392 57.0278 173.89 42.1322 169.571 29.54C165.252 16.9478 168.751 2.05227 168.751 2.05227"></path>
          <path strokeLinecap="round" strokeWidth="3" strokeOpacity="0.3" d="M170.392 150.948C170.392 150.948 173.89 165.844 169.571 178.436C165.252 191.028 168.751 205.924 168.751 205.924"></path>
          <path strokeLinecap="round" strokeWidth="3" d="M112.609 57.4476C112.609 57.4476 117.401 41.5051 107.125 30.4998C96.8492 19.4945 98.5 12.9998 98.5 12.9998"></path>
          <path strokeLinecap="round" strokeWidth="3" d="M112.609 150.528C112.609 150.528 117.401 166.471 107.125 177.476C96.8492 188.481 98.5 194.976 98.5 194.976"></path>
          <path strokeLinecap="round" strokeWidth="3" strokeOpacity="0.3" d="M62.2941 64.9917C62.2941 64.9917 55.4671 49.8089 40.4932 48.2295C25.5194 46.6501 23.7159 36.5272 23.7159 36.5272"></path>
          <path strokeLinecap="round" strokeWidth="3" strokeOpacity="0.3" d="M62.2941 145.984C62.2941 145.984 55.4671 161.167 40.4932 162.746C25.5194 164.326 23.7159 174.449 23.719 174.449"></path>
        </svg>
        <div className={styles.wrap}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 221 42"
            height="42"
            width="221"
            className={styles.path}
          >
            <path
              strokeLinecap="round"
              strokeWidth="3"
              stroke="url(#gradient)"
              d="M182.674 2H203C211.837 2 219 9.16344 219 18V24C219 32.8366 211.837 40 203 40H18C9.16345 40 2 32.8366 2 24V18C2 9.16344 9.16344 2 18 2H47.8855"
            />
            <defs>
              <linearGradient id="gradient" x1="2" y1="40" x2="219" y2="2" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f4b1fd" />
                <stop offset="1" stopColor="#8e26e2" />
              </linearGradient>
            </defs>
          </svg>
          <div className={styles.outline}></div>
          <div className={styles.content}>
            <span className={`${styles.char} ${styles.charState1}`}>
              <span data-label="B" style={{ "--i": 1 } as React.CSSProperties}>B</span>
              <span data-label="o" style={{ "--i": 2 } as React.CSSProperties}>o</span>
              <span data-label="o" style={{ "--i": 3 } as React.CSSProperties}>o</span>
              <span data-label="k" style={{ "--i": 4 } as React.CSSProperties}>k</span>
              <span data-label=" " style={{ "--i": 5 } as React.CSSProperties}> </span>
              <span data-label="a" style={{ "--i": 6 } as React.CSSProperties}>a</span>
              <span data-label=" " style={{ "--i": 7 } as React.CSSProperties}> </span>
              <span data-label="C" style={{ "--i": 8 } as React.CSSProperties}>C</span>
              <span data-label="a" style={{ "--i": 9 } as React.CSSProperties}>a</span>
              <span data-label="l" style={{ "--i": 10 } as React.CSSProperties}>l</span>
              <span data-label="l" style={{ "--i": 11 } as React.CSSProperties}>l</span>
            </span>
            <div className={styles.icon}>
              <div></div>
            </div>
            <span className={`${styles.char} ${styles.charState2}`}>
              <span data-label="B" style={{ "--i": 1 } as React.CSSProperties}>B</span>
              <span data-label="o" style={{ "--i": 2 } as React.CSSProperties}>o</span>
              <span data-label="o" style={{ "--i": 3 } as React.CSSProperties}>o</span>
              <span data-label="k" style={{ "--i": 4 } as React.CSSProperties}>k</span>
              <span data-label=" " style={{ "--i": 5 } as React.CSSProperties}> </span>
              <span data-label="N" style={{ "--i": 6 } as React.CSSProperties}>N</span>
              <span data-label="o" style={{ "--i": 7 } as React.CSSProperties}>o</span>
              <span data-label="w" style={{ "--i": 8 } as React.CSSProperties}>w</span>
            </span>
          </div>
        </div>
      </button>
    </motion.div>
  );
}