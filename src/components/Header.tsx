"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import CallButton from "../components/CallButton";
import styles from "../styles/Header.module.css";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [pastHeroButton, setPastHeroButton] = useState(false);
  const heroButtonRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    const setupObserver = () => {
      const heroButtonElement = document.getElementById("hero-button");
      console.log("HeroButton element found:", !!heroButtonElement);
      if (heroButtonElement) {
        heroButtonRef.current = heroButtonElement as HTMLElement;
      } else {
        console.error("HeroButton not found! Check selector or DOM.");
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          console.log("IntersectionObserver triggered:", {
            isIntersecting: entry.isIntersecting,
            pastHeroButton: !entry.isIntersecting,
          });
          setPastHeroButton(!entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0,
          rootMargin: "0px",
        }
      );

      if (heroButtonRef.current) {
        observer.observe(heroButtonRef.current);
      } else {
        console.error("heroButtonRef is null, observer not set up.");
      }

      return () => {
        if (heroButtonRef.current) {
          observer.unobserve(heroButtonRef.current);
        }
      };
    };

    const timeout = setTimeout(setupObserver, 500);

    return () => clearTimeout(timeout);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroButtonRef,
    offset: ["start start", "end start"],
  });

  const paddingY = useSpring(12, { stiffness: 50, damping: 40 });
  const scale = useSpring(1, { stiffness: 50, damping: 40 });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      if (isDesktop) {
        const easedProgress = 1 - Math.pow(1 - progress, 2);
        const newPadding = 12 - (12 - 6) * easedProgress;
        paddingY.set(newPadding);
        const newScale = 1 - (1 - 0.94) * easedProgress;
        scale.set(newScale);
        console.log("Scroll progress:", progress, "Padding:", newPadding, "Scale:", newScale);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, paddingY, scale, isDesktop]);

  useEffect(() => {
    if (pastHeroButton && isDesktop) {
      paddingY.set(6);
      scale.set(0.94);
    } else if (!isDesktop) {
      paddingY.set(12);
      scale.set(1);
    }
  }, [pastHeroButton, isDesktop, paddingY, scale]);

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

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Why m44", href: "#why-m44" },
    { name: "Services", href: "#services" },
    { name: "Support", href: "#support" },
  ];

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
        className={`${styles.header} fixed top-6 left-1/2 -translate-x-1/2 z-50 mx-auto flex items-center justify-between rounded-full px-3 w-[50%] max-w-3xl md:w-[50%] md:max-w-3xl lg:w-[40%] lg:max-w-2xl transition-all duration-300 ease-out`}
      >
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

        <motion.nav className="hidden md:flex items-center justify-between w-full">
          <AnimatePresence>
            {pastHeroButton && isDesktop && (
              <motion.div
                key="desktop-logo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center"
              >
                <Link href="#home">
                  <Image
                    src="/logo.png"
                    alt="M44 Logo"
                    width={24}
                    height={24}
                    sizes="24px"
                    className="object-contain"
                    priority
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2 flex-grow">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeOut" } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <Link
                  href={link.href}
                  className={`text-gray-600 hover:text-purple-600 transition-colors duration-300 font-medium px-1 py-1 ${
                    pastHeroButton ? "text-sm" : "text-lg"
                  }`}
                >
                  {link.name}
                </Link>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-500 ease-out group-hover:w-full"></span>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {pastHeroButton && isDesktop && (
              <motion.div
                key="desktop-callbutton"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <CallButton />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        <button
          className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ""} md:hidden mr-1`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </motion.header>

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