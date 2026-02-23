// Header.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";
import CallButton from "../components/CallButton";
import * as gtag from "../lib/gtag";
import styles from "../styles/Header.module.css";
import WhatsAppButton from "../components/WhatsAppButton";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // -------- Responsiveness knobs --------
  // Switch to phone (hamburger) menu earlier to avoid mid-width collisions
  const DESKTOP_BP = 900;

  // IMPORTANT: avoid hydration mismatch — don't read window in the initializer
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  // Compact/expand and visibility state
  const [pastHeroButton, setPastHeroButton] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [beyondThreshold, setBeyondThreshold] = useState(false);
  const heroButtonRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);

  // Tunables
  const HEADER_HIDE_SHOW_OFFSET = 100;
  const MIN_SCROLL_DELTA = 16;
  const AFFORD_APPEAR_Y = 180;
  const AFFORD_DISAPPEAR_Y = 120;

  // ---- Responsive values (width / guards / spacing / logo size) ----
  const [fixedWidth, setFixedWidth] = useState<string>("min(56vw, 750px)");
  const [leftGuard, setLeftGuard] = useState<number>(64);
  const [rightGuard, setRightGuard] = useState<number>(104); // extra room for CTA
  const [shiftLeft, setShiftLeft] = useState<number>(56);     // nudge when CTA+logo are visible
  const [navGap, setNavGap] = useState<number>(20);           // px between items
  const [linkFontPx, setLinkFontPx] = useState<number>(16);
  const [linkPadX, setLinkPadX] = useState<number>(10);       // horizontal padding per link (px)
  const [logoSizePx, setLogoSizePx] = useState<number>(40);   // << will shrink on smaller desktops

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsDesktop(w >= DESKTOP_BP);

      // Desktop width profiles
      if (w >= 1600) {
        setFixedWidth("min(52vw, 780px)");
        setLeftGuard(72);
        setRightGuard(112);
        setShiftLeft(80);
        setNavGap(22);
        setLinkFontPx(16);
        setLinkPadX(10);
        setLogoSizePx(40);
      } else if (w >= 1440) {
        setFixedWidth("min(54vw, 760px)");
        setLeftGuard(68);
        setRightGuard(108);
        setShiftLeft(72);
        setNavGap(20);
        setLinkFontPx(16);
        setLinkPadX(10);
        setLogoSizePx(38);
      } else if (w >= 1280) {
        setFixedWidth("min(56vw, 750px)");
        setLeftGuard(64);
        setRightGuard(104);
        setShiftLeft(64);
        setNavGap(19);
        setLinkFontPx(15.5);
        setLinkPadX(9);
        setLogoSizePx(36);
      } else if (w >= 1100) {
        setFixedWidth("min(58vw, 730px)");
        setLeftGuard(56);
        setRightGuard(100);
        setShiftLeft(60);
        setNavGap(18);
        setLinkFontPx(15);
        setLinkPadX(8);
        setLogoSizePx(34);
      } else if (w >= DESKTOP_BP) {
        // smallest desktop band: tighten more + bigger right protection
        setFixedWidth("min(58vw, 700px)");
        setLeftGuard(52);
        setRightGuard(110);
        setShiftLeft(48);
        setNavGap(16);
        setLinkFontPx(14.5);
        setLinkPadX(7);
        setLogoSizePx(30);
      } else {
        // MOBILE: make header much wider so logo + "m44.io" + burger aren't cramped
        setFixedWidth("min(94vw, 740px)");
      }
    };

    // run once on mount (after hydration) then on resize
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset volatile state on route change
  useEffect(() => {
    setPastHeroButton(false);
    setBeyondThreshold(false);
    setIsHeaderVisible(true);
    setIsMobileMenuOpen(false);
    document.body.style.cssText = "";
    document.documentElement.style.scrollBehavior = "";
  }, [pathname]);

  // Observe #hero-button (home only)
  useEffect(() => {
    if (!isHome) return;

    const setupObserver = () => {
      const heroButtonElement = document.getElementById("hero-button");
      if (heroButtonElement) heroButtonRef.current = heroButtonElement as HTMLElement;

      const observer = new IntersectionObserver(
        ([entry]) => setPastHeroButton(!entry.isIntersecting),
        { root: null, threshold: 0 }
      );

      if (heroButtonRef.current) observer.observe(heroButtonRef.current);

      return () => {
        if (heroButtonRef.current) observer.unobserve(heroButtonRef.current);
      };
    };

    const timeout = setTimeout(setupObserver, 500);
    return () => clearTimeout(timeout);
  }, [isHome]);

  const { scrollY } = useScroll();
  const paddingY = useSpring(12, { stiffness: 50, damping: 40 });

  // Header show/hide + easing (all pages)
  useEffect(() => {
    const unsub = scrollY.on("change", (y) => {
      if (isMobileMenuOpen) {
        setIsHeaderVisible(true);
        return;
      }
      const dy = y - lastScrollY.current;
      const dir = dy > 0 ? "down" : "up";
      const mag = Math.abs(dy);
      lastScrollY.current = y;

      const showLogoAndCallNow =
        (isDesktop ?? false) && (!isHome || pastHeroButton || beyondThreshold);

      if (!showLogoAndCallNow) {
        const t = Math.min(y / 500, 1);
        paddingY.set(12 - (12 - 6) * t);
      } else {
        paddingY.set(6);
      }

      if (mag > MIN_SCROLL_DELTA) {
        if (y < HEADER_HIDE_SHOW_OFFSET || dir === "up") setIsHeaderVisible(true);
        else if (dir === "down" && y > HEADER_HIDE_SHOW_OFFSET) setIsHeaderVisible(false);
      }

      if (isHome) {
        setBeyondThreshold((prev) =>
          y > AFFORD_APPEAR_Y ? true : y < AFFORD_DISAPPEAR_Y ? false : prev
        );
      }
    });
    return () => unsub();
  }, [scrollY, paddingY, isMobileMenuOpen, isHome, isDesktop, pastHeroButton, beyondThreshold]);

  // Apply hero state (home only)
  useEffect(() => {
    if (!isHome) return;
    if (pastHeroButton) paddingY.set(6);
    else paddingY.set(12);
  }, [pastHeroButton, paddingY, isHome]);

  // Lock body when mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const y = window.scrollY;
      document.body.style.cssText = `
        overflow: hidden;
        position: fixed;
        top: -${y}px;
        width: 100%;
      `;
      document.documentElement.style.scrollBehavior = "auto";
    } else {
      const y = document.body.style.top;
      document.body.style.cssText = "";
      document.documentElement.style.scrollBehavior = "";
      window.scrollTo(0, parseInt(y || "0") * -1);
    }
    return () => {
      document.body.style.cssText = "";
      document.documentElement.style.scrollBehavior = "";
    };
  }, [isMobileMenuOpen]);

  // Links
  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "Why m44", href: "/#why-m44" },
    { name: "Services", href: "/#services" },
    { name: "FAQ", href: "/#support" },
  ];

  const toggleMobileMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMobileMenuOpen((s) => !s);
  };

  const handleWhatsAppClick = () =>
    gtag.event({ action: "click", category: "Social", label: "WhatsApp Icon" });

  // Use desktop value only after it's known; default to mobile-friendly false
  const showLogoAndCall =
    (isDesktop ?? false) && (!isHome || pastHeroButton || beyondThreshold);

  // Guarantee no collision with the logo: when visible, ensure left padding
  // is at least (logo size + cushion)
  const computedLeftGuard = showLogoAndCall
    ? Math.max(leftGuard, logoSizePx + 28)
    : leftGuard;

  return (
    <>
      <motion.header
        animate={{ y: isHeaderVisible ? 0 : -120 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
          width: fixedWidth,
          maxWidth: fixedWidth,
          minWidth: fixedWidth,
          boxSizing: "border-box",
        }}
        className={`${styles.header} ${styles.defaultHeader}
          fixed top-6 left-1/2 -translate-x-1/2 z-50 mx-auto
          rounded-full px-5 transition-colors duration-300 ease-out overflow-hidden`}
      >
        {/* MOBILE: left logo */}
        <div className="md:hidden flex items-center">
          <Link href="/#home" className="flex items-center">
            <Image src="/logo.png" alt="M44 Logo" width={40} height={40} sizes="40px" className="object-contain" priority />
            <span className="ml-2 text-xl font-semibold text-purple-600">m44.io</span>
          </Link>
        </div>

        {/* DESKTOP */}
        <nav className="hidden md:flex w-full items-center justify-between relative">
          {/* LEFT: desktop logo — collapses to width 0 when hidden; shrinks responsively */}
          <div
            className="flex items-center overflow-hidden"
            style={{ width: showLogoAndCall ? "auto" : 0 }}
          >
            <motion.div
              initial={false}
              animate={{ opacity: showLogoAndCall ? 1 : 0, y: showLogoAndCall ? 0 : -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ pointerEvents: showLogoAndCall ? "auto" : "none" }}
              className="flex items-center"
            >
              <Link href="/#home" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="M44 Logo"
                  width={logoSizePx}
                  height={logoSizePx}
                  sizes={`${logoSizePx}px`}
                  className="object-contain"
                  priority
                />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: Book a Call — collapses to width 0 when hidden */}
          <div
            className="flex items-center overflow-hidden"
            style={{ width: showLogoAndCall ? "auto" : 0 }}
          >
            <motion.div
              initial={false}
              animate={{ opacity: showLogoAndCall ? 1 : 0, y: showLogoAndCall ? 0 : -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ pointerEvents: showLogoAndCall ? "auto" : "none" }}
              className={styles.headerCallButton}
            >
              <CallButton inHeader={pastHeroButton} />
            </motion.div>
          </div>

          {/* ABSOLUTE CENTER: links + WhatsApp (centered initially; left-nudged when CTA+logo appear) */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ paddingLeft: computedLeftGuard, paddingRight: rightGuard }}
          >
            <motion.div
              className="flex items-center pointer-events-auto"
              style={{ columnGap: navGap }}
              animate={{ x: showLogoAndCall ? -shiftLeft : 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  transition={{ duration: 0.18, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.18, ease: "easeOut" } }}
                  whileTap={{ scale: 0.96, transition: { duration: 0.12 } }}
                  className="relative group"
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-300 font-medium whitespace-nowrap"
                    style={{ fontSize: linkFontPx, paddingLeft: linkPadX, paddingRight: linkPadX, paddingTop: 4, paddingBottom: 4 }}
                  >
                    {link.name}
                  </Link>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-500 ease-out group-hover:w-full"></span>
                </motion.div>
              ))}
              <Link
                href="https://wa.me/6584444498"
                className={`${styles.whatsappButton} flex justify-center items-center`}
                aria-label="WhatsApp"
                onClick={handleWhatsAppClick}
                title="WhatsApp"
                style={{ marginLeft: Math.max(8, Math.round(navGap / 2)) }}
              >
                <BsWhatsapp className={styles.whatsappIcon} />
              </Link>
            </motion.div>
          </div>
        </nav>

        {/* MOBILE: hamburger */}
        <button
          className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ""} md:hidden ml-auto mr-2`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </motion.header>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <motion.div
          className={`${styles.mobileMenu} fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-100 p-8 top-0 md:hidden`}
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className={styles.overlay} onClick={() => setIsMobileMenuOpen(false)} style={{ zIndex: 99 }} />
          <button className={styles.closeButton} onClick={toggleMobileMenu} aria-label="Close mobile menu" />

          {[
            { name: "Home", href: "/#home" },
            { name: "Why m44", href: "/#why-m44" },
            { name: "Services", href: "/#services" },
            { name: "FAQ", href: "/#support" },
          ].map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href={link.href} className={styles.mobileMenuLink} onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Link
              href="https://wa.me/6584444498"
              onClick={() => {
                handleWhatsAppClick();
                setIsMobileMenuOpen(false);
              }}
            >
              <button className={styles.customWhatsappButton}>
                <div className={styles.sign}>
                  <svg className={styles.socialSvg} viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729 .729 0 0 0-.529 .247c-.182 .198-.691 .677-.691 1.654 0 .977 .71 1.916 .81 2.049 .098 .133 1.394 2.132 3.383 2.992 .47 .205 .84 .326 1.129 .418 .475 .152 .904 .129 1.246 .08 .38-.058 1.171-.48 1.338-.943 .164-.464 .164-.86 .114-.943-.49-.084-.182-.133-.38-.232z" />
                  </svg>
                </div>
                <div className={styles.text}>WhatsApp</div>
              </button>
            </Link>
          </motion.div>

          <Link
            href="/#book-call"
            className={`${styles.mobileBookButton} mt-8`}
            onClick={() => {
              gtag.event({ action: "click", category: "CTA", label: "Mobile Menu Book Call" });
              setIsMobileMenuOpen(false);
            }}
          >
            Book a Call
          </Link>
        </motion.div>
      )}

      <WhatsAppButton isMobileMenuOpen={isMobileMenuOpen} />
    </>
  );
}
