"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
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
  const headerRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track scroll progress within the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Map scroll progress to header properties (only for desktop)
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
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]); // Adjusted to appear earlier
  const buttonTranslateY = useTransform(scrollYProgress, [0, 1], [0, -2]);

  // Extract raw string values
  const navFontSize = useMotionValueString(navFontSizeMotion);
  const buttonFontSize = useMotionValueString(buttonFontSizeMotion);

  // Determine if the screen is desktop (≥641px)
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 641;
      setIsDesktop(desktop);
      console.log("isDesktop set to:", desktop, "Width:", window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Log buttonOpacity for debugging
  useEffect(() => {
    const unsubscribe = buttonOpacity.on("change", (value) => {
      console.log("buttonOpacity:", value, "isDesktop:", isDesktop);
    });
    return () => unsubscribe();
  }, [buttonOpacity, isDesktop]);

  // Debug DOM availability
  useEffect(() => {
    const sections = ["home", "why-m44", "services", "support", "book-call"];
    const checkSections = () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        console.log(`Section ${id} found:`, element);
      });
    };

    checkSections();
    // Retry after hydration
    const timeout = setTimeout(checkSections, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Scroll to section based on URL hash
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const scrollToSection = () => {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          const headerHeight = headerRef.current?.offsetHeight || 0;
          const offsetPosition = targetElement.offsetTop - (headerHeight + 10);
          console.log(`Scrolling to ${hash} at position:`, offsetPosition);
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        } else {
          console.error(`Element with ID "${hash}" not found.`);
        }
      };

      // Scroll immediately and retry after hydration
      scrollToSection();
      setTimeout(scrollToSection, 1000); // Retry after 1 second
      setTimeout(scrollToSection, 2000); // Retry after 2 seconds
    }
  }, [pathname, searchParams]);

  // Navigation links
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Why M44", href: "#why-m44" },
    { name: "Services", href: "#services" },
    { name: "Support", href: "#support" },
  ];

  // Toggle mobile menu
  const toggleMobileMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (isDesktop === null) {
    return null;
  }

  return (
    <>
      <div ref={heroRef} className="absolute top-0 h-[150vh]" />

      <motion.header
        ref={headerRef}
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
        className={`${styles.header} fixed top-4 left-1/2 transform -translate-x-1/2 z-50 mx-auto flex items-center rounded-full shadow-lg bg-gradient-to-b from-white to-gray-100`}
      >
        {/* Logo for Desktop (Only the Logo, No m44.io Text) */}
        <AnimatePresence>
          {isDesktop && buttonOpacity.get() > 0 && (
            <motion.div
              className={`${styles.logoContainer} desktop hidden sm:flex`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="#home" scroll={false}>
                <Image
                  src="/logo.png"
                  alt="M44 Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logo and m44.io for Mobile */}
        <div className={`${styles.logoContainer} flex sm:hidden`}>
          <Link href="#home" scroll={false}>
            <Image
              src="/logo.png"
              alt="M44 Logo"
              width={28}
              height={28}
              className="object-contain"
            />
          </Link>
          <span className={styles.logoText}>m44.io</span>
        </div>

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
              whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeOut" } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <Link
                href={link.href}
                scroll={false}
                style={{ fontSize: navFontSize }}
                className="text-gray-600 hover:text-gray-500 transition-colors duration-300 font-medium px-3 py-1"
              >
                {link.name}
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-500 ease-out group-hover:w-full"></span>
            </motion.div>
          ))}
        </motion.nav>

        {/* Book a Call Button for Desktop */}
        <AnimatePresence>
          <motion.div
            style={{
              scale: buttonScale,
              opacity: buttonOpacity,
              translateY: buttonTranslateY,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{
              scale: 1.05,
              boxShadow:
                "inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.4), inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.7), inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.7), 0 1rem 1rem rgba(0, 0, 0, 0.3), 0 0.5rem 0.5rem -0.3rem rgba(0, 0, 0, 0.8)",
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            whileTap={{
              scale: 0.95,
              transform: "translateY(2px)",
              boxShadow:
                "inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.5), inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.8), inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.4), 0 1rem 1rem rgba(0, 0, 0, 0.3), 0 0.5rem 0.5rem -0.3rem rgba(0, 0, 0, 0.8)",
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.3 }}
            className={`${styles.bookButton} hidden sm:block ml-4 outline-none cursor-pointer border-0 rounded-[100px] transition-all duration-300`}
          >
            <Link href="#book-call" scroll={false}>
              <motion.div
                className="relative overflow-hidden rounded-[100px]"
                style={{
                  paddingLeft: buttonPaddingX,
                  paddingRight: buttonPaddingX,
                  paddingTop: buttonPaddingY,
                  paddingBottom: buttonPaddingY,
                }}
              >
                <div
                  className={styles.bookButtonPseudo1}
                  style={{
                    transform: scrollYProgress.get() > 0.5 ? "translateY(-5%)" : "translateY(0)",
                  }}
                />
                <div
                  className={styles.bookButtonPseudo2}
                  style={{
                    opacity: scrollYProgress.get() > 0.5 ? 0.4 : 1,
                    transform: scrollYProgress.get() > 0.5 ? "translateY(5%)" : "translateY(0)",
                  }}
                />
                <motion.p
                  style={{ fontSize: buttonFontSize }}
                  className="flex items-center gap-2 m-0 text-white font-medium transition-all duration-300"
                >
                  <span className="relative z-10">Book a Call</span>
                  <span className="relative z-10">→</span>
                </motion.p>
              </motion.div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ""}`}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <button
              className={styles.closeButton}
              onClick={toggleMobileMenu}
              aria-label="Close mobile menu"
            />
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                scroll={false}
                className={styles.mobileMenuLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {/* Simple Purple Button */}
            <Link
              href="#book-call"
              scroll={false}
              className={`${styles.mobileBookButton} mt-8`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book a Call
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}