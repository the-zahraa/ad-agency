"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Header.module.css";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [withinHero, setWithinHero] = useState(true);
  const [pastHero, setPastHero] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  // Handle window resize to determine screen size
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      console.log("Window width:", window.innerWidth, "IsDesktop:", desktop);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use Intersection Observer to detect when hero section is in view
  useEffect(() => {
    const heroElement = document.getElementById("home");
    if (heroElement) {
      heroRef.current = heroElement;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setWithinHero(entry.isIntersecting);
        setPastHero(!entry.isIntersecting);
        console.log("WithinHero:", entry.isIntersecting, "PastHero:", !entry.isIntersecting);
      },
      {
        root: null, // Viewport
        threshold: 0, // Trigger when hero section is fully out of view
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Use Framer Motion's useScroll and useSpring for smooth header shrink
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"], // From start of hero to when hero top leaves viewport
  });

  // Smooth spring animation for padding and scale with more gradual settings
  const paddingY = useSpring(16, { stiffness: 50, damping: 40 }); // py-4 (16px) to py-2 (8px)
  const scale = useSpring(1, { stiffness: 50, damping: 40 }); // scale-100 (1) to scale-[0.94] (0.94)

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      if (isDesktop && withinHero) {
        // Apply an ease-out function for progressive shrinking
        const easedProgress = 1 - Math.pow(1 - progress, 2); // Ease-out curve

        // Map eased progress to padding (16px to 8px)
        const newPadding = 16 - (16 - 8) * easedProgress; // 16px to 8px
        paddingY.set(newPadding);

        // Map eased progress to scale (1 to 0.94)
        const newScale = 1 - (1 - 0.94) * easedProgress; // 1 to 0.94
        scale.set(newScale);

        console.log(
          "ScrollProgress:", progress,
          "EasedProgress:", easedProgress,
          "PaddingY:", newPadding,
          "Scale:", newScale
        );
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, paddingY, scale, isDesktop, withinHero]);

  // Stop animation updates when past hero section and set smaller size
  useEffect(() => {
    if (!withinHero && isDesktop) {
      paddingY.set(8); // Lock at py-2 (8px)
      scale.set(0.94); // Lock at scale-[0.94]
    } else if (!isDesktop) {
      paddingY.set(16); // No shrink on mobile
      scale.set(1);
    }
  }, [withinHero, isDesktop, paddingY, scale]);

  // Toggle body overflow for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  // Navigation links
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Why m44", href: "#why-m44" },
    { name: "Services", href: "#services" },
    { name: "Support", href: "#support" },
  ];

  // Toggle mobile menu
  const toggleMobileMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
          scale: scale,
        }}
        className={`${styles.header} fixed top-4 left-1/2 -translate-x-1/2 z-50 mx-auto flex items-center justify-between rounded-full px-2 w-[60%] max-w-md md:w-[40%] md:max-w-5xl transition-all duration-300 ease-out`} // Reduced padding to px-2, adjusted widths
      >
        {/* Mobile: Always visible logo and hamburger */}
        <div className="md:hidden flex items-center">
          <Link href="#home" className="flex items-center">
            <Image
              src="/logo.png"
              alt="M44 Logo"
              width={36}
              height={36}
              sizes="36px"
              className="object-contain"
              priority
            />
            <span className="ml-2 text-xl font-semibold text-purple-600">m44.io</span>
          </Link>
        </div>

        {/* Desktop: Navbar with logo, links, and button */}
        <motion.nav
          className="hidden md:flex items-center w-full"
        >
          {/* Logo (appears near "Home" with spacing) */}
          <AnimatePresence>
            {pastHero && isDesktop && (
              <motion.div
                key="desktop-logo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center mr-0" // Spacing between logo and "Home"
              >
                <Link href="#home" className="flex items-center">
                  <Image
                    src="/logo.png"
                    alt="M44 Logo"
                    width={36}
                    height={36}
                    sizes="36px"
                    className="object-contain"
                    priority
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Centered Navigation Links */}
          <div className="flex items-center justify-center flex-grow gap-3">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeOut" } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <Link
                  href={link.href}
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-300 font-medium px-2 py-1 text-lg"
                >
                  {link.name}
                </Link>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-500 ease-out group-hover:w-full"></span>
              </motion.div>
            ))}
          </div>

          {/* Book a Call Button (appears near "Support" with spacing) */}
          <AnimatePresence>
            {pastHero && isDesktop && (
              <motion.div
                key="desktop-button"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
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
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`${styles.bookButton} rounded-full px-3 py-2 text-white font-medium text-lg ml-2`} // Spacing between "Support" and button
              >
                <Link href="#book-call">
                  <motion.p className="flex items-center gap-2 m-0">
                    <span>Book a Call</span>
                    <span>→</span>
                  </motion.p>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Hamburger Menu for Mobile (Right Side, static) */}
        <button
          className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ""} md:hidden mr-1`} // Reduced spacing to mr-1
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={`${styles.mobileMenu} fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-50 p-8 top-0 md:hidden`}
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
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={styles.mobileMenuLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <Link
              href="#book-call"
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