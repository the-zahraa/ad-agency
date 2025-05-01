"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";
import styles from "../styles/Header.module.css";

// Custom hook to extract raw string value from MotionValue<string>
function useMotionValueString(motionValue: MotionValue<string>): string {
  const [value, setValue] = useState<string>(motionValue.get());

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      setValue(latest);
    });
    return () => unsubscribe();
  }, [motionValue]);

  return value;
}

export default function Header() {
  const heroRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll progress within the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Map scroll progress to header properties, adjusted for mobile
  const headerWidth = useTransform(scrollYProgress, [0, 1], ["50%", "48%"]);
  const headerMaxWidth = useTransform(scrollYProgress, [0, 1], [600, 550]);
  const headerPaddingY = useTransform(scrollYProgress, [0, 1], [12, 8]);
  const headerPaddingX = useTransform(scrollYProgress, [0, 1], [12, 8]);
  const navSpacing = useTransform(scrollYProgress, [0, 1], [12, 8]);
  const navFontSizeMotion = useTransform(scrollYProgress, [0, 1], ["16px", "14px"]);
  const buttonScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const buttonPaddingX = useTransform(scrollYProgress, [0, 1], [16, 12]);
  const buttonPaddingY = useTransform(scrollYProgress, [0, 1], [6, 4]);
  const buttonFontSizeMotion = useTransform(scrollYProgress, [0, 1], ["14px", "12px"]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const buttonTranslateY = useTransform(scrollYProgress, [0, 1], [0, -2]);

  // Extract raw string values
  const navFontSize = useMotionValueString(navFontSizeMotion);
  const buttonFontSize = useMotionValueString(buttonFontSizeMotion);

  // Navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Why M44", href: "/why-m44" },
    { name: "Services", href: "/services" },
    { name: "Support", href: "/support" },
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Invisible target for scroll tracking */}
      <div ref={heroRef} className="absolute top-0 h-screen" />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: headerWidth,
          maxWidth: headerMaxWidth,
          paddingTop: headerPaddingY,
          paddingBottom: headerPaddingY,
          paddingLeft: headerPaddingX,
          paddingRight: headerPaddingX,
        }}
        className={`${styles.header} fixed top-4 left-1/2 transform -translate-x-1/2 z-50 mx-auto`}
      >
        {/* Hamburger Menu for Mobile */}
        <button
          className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links for Desktop */}
        <motion.nav
          style={{
            gap: navSpacing,
          }}
          className={`${styles.nav} hidden sm:flex items-center justify-center transition-all duration-300`}
        >
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={styles.navLink}
            >
              <Link
                href={link.href}
                style={{ fontSize: navFontSize }}
                className="text-gray-600 hover:text-gray-500 transition-colors duration-300"
              >
                {link.name}
              </Link>
              <span className={styles.navLinkUnderline}></span>
            </motion.div>
          ))}
        </motion.nav>

        {/* Book a Call Button */}
        <AnimatePresence>
          <motion.a
            href="/book-a-call"
            style={{
              scale: buttonScale,
              opacity: buttonOpacity,
              translateY: buttonTranslateY,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={styles.bookButton}
          >
            <motion.div
              className={styles.bookButtonInner}
              style={{
                paddingLeft: buttonPaddingX,
                paddingRight: buttonPaddingX,
                paddingTop: buttonPaddingY,
                paddingBottom: buttonPaddingY,
              }}
            >
              <motion.p
                style={{ fontSize: buttonFontSize }}
                className={styles.bookButtonText}
              >
                <span>Book a Call</span>
                <span>→</span>
              </motion.p>
            </motion.div>
          </motion.a>
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ""}`}
            initial={{ transform: "translateX(100%)" }}
            animate={{ transform: "translateX(0)" }}
            exit={{ transform: "translateX(100%)" }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={styles.mobileMenuLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}