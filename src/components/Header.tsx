"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";
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
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const setupObserver = () => {
      const heroButtonElement = document.getElementById("hero-button");
      if (heroButtonElement) {
        heroButtonRef.current = heroButtonElement as HTMLElement;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
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
    { name: "FAQ", href: "#support" },
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
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
        }}
        className={`${styles.header} ${pastHeroButton ? styles.defaultHeader : styles.heroHeader} fixed top-6 left-1/2 -translate-x-1/2 z-50 mx-auto flex items-center justify-between rounded-full px-4 transition-all duration-300 ease-out`}
      >
        <div className="md:hidden flex items-center">
          <Link href="#home" className="flex items-center">
            <Image
              src="/logo.png"
              alt="M44 Logo"
              width={40}
              height={40}
              sizes="40px"
              className="object-contain"
              priority
            />
            <span className="ml-2 text-xl font-semibold text-purple-600">m44.io</span>
          </Link>
        </div>

        <motion.nav
          className="hidden md:flex items-center justify-between w-full"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <AnimatePresence>
            {pastHeroButton && isDesktop && (
              <motion.div
                key="desktop-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, position: "absolute" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center"
              >
                <Link href="#home">
                  <Image
                    src="/logo.png"
                    alt="M44 Logo"
                    width={40}
                    height={40}
                    sizes="32px"
                    className="object-contain"
                    priority
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="flex items-center justify-center gap-4 flex-grow"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ maxWidth: "500px" }}
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeOut" } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <Link
                  href={link.href}
                  className={`text-gray-600 hover:text-purple-600 transition-colors duration-300 font-medium px-2 py-1 ${
                    pastHeroButton ? "text-base" : "text-base"
                  }`}
                >
                  {link.name}
                </Link>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-500 ease-out group-hover:w-full"></span>
              </motion.div>
            ))}
            <motion.div
              transition={{ duration: 0.3, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeOut" } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <Link
                href="https://wa.me/66804444448"
                className={`${styles.whatsappButton} flex justify-center items-center`}
                aria-label="WhatsApp"
              >
                <BsWhatsapp className={styles.whatsappIcon} />
              </Link>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {pastHeroButton && isDesktop && (
              <motion.div
                key="desktop-callbutton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={styles.headerCallButton}
              >
                <CallButton inHeader={pastHeroButton} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        <button
          className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ""} md:hidden mr-2`}
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
                  className={`${styles.mobileMenuLink}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
            >
              <Link
                href="https://wa.me/66804444448"
                className={`${styles.mobileMenuLink} ${styles.whatsappButton} flex justify-center items-center`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="WhatsApp"
              >
                <BsWhatsapp className={styles.whatsappIcon} />
              </Link>
            </motion.div>
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