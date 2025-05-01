"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";

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

  // Track scroll progress within the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"], // From top of hero to bottom of hero
  });

  // Map scroll progress to header properties
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
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 mx-auto flex items-center justify-center rounded-full shadow-lg bg-gradient-to-b from-white to-gray-100"
      >
        {/* Navigation Links */}
        <motion.nav
          style={{
            gap: navSpacing,
          }}
          className="flex items-center justify-center transition-all duration-300"
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
                style={{
                  fontSize: navFontSize, // Line 76
                }}
                className="text-gray-600 hover:text-gray-500 transition-colors duration-300 font-medium px-3 py-1"
              >
                {link.name}
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-500 ease-out group-hover:w-full"></span>
            </motion.div>
          ))}
        </motion.nav>

        {/* Book a Call Button in Header */}
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
            className="relative outline-none cursor-pointer border-0 rounded-[100px] bg-purple-600 transition-all duration-300 shadow-[inset_0_0.3rem_0.5rem_rgba(255,255,255,0.3),inset_0_-0.1rem_0.3rem_rgba(0,0,0,0.7),inset_0_-0.4rem_0.9rem_rgba(255,255,255,0.5),0_1rem_1rem_rgba(0,0,0,0.3),0_0.5rem_0.5rem_-0.3rem_rgba(0,0,0,0.8)] ml-4"
          >
            <motion.div
              className="relative overflow-hidden rounded-[100px]"
              style={{
                paddingLeft: buttonPaddingX,
                paddingRight: buttonPaddingX,
                paddingTop: buttonPaddingY,
                paddingBottom: buttonPaddingY,
              }}
            >
              {/* Pseudo-elements for 3D effect */}
              <div
                className="absolute -left-[15%] -right-[15%] bottom-1/4 -top-full rounded-[50%] bg-[rgba(255,255,255,0.12)] transition-all duration-300"
                style={{
                  transform: scrollYProgress.get() > 0.5 ? "translateY(-5%)" : "translateY(0)",
                }}
              />
              <div
                className="absolute left-[6%] right-[6%] top-[12%] bottom-[40%] rounded-t-[22px] shadow-[inset_0_10px_8px_-10px_rgba(255,255,255,0.8)] bg-gradient-to-b from-[rgba(255,255,255,0.3)] to-transparent transition-all duration-300"
                style={{
                  opacity: scrollYProgress.get() > 0.5 ? 0.4 : 1,
                  transform: scrollYProgress.get() > 0.5 ? "translateY(5%)" : "translateY(0)",
                }}
              />
              {/* Button Text and Arrow */}
              <motion.p
                style={{
                  fontSize: buttonFontSize,
                }}
                className="flex items-center gap-2 m-0 text-white font-medium transition-all duration-300"
              >
                <span className="relative z-10">Book a Call</span>
                <span className="relative z-10">→</span>
              </motion.p>
            </motion.div>
          </motion.a>
        </AnimatePresence>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden"></div>
      </motion.header>
    </>
  );
}