"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import HeroButton from "./HeroButton";
import styles from "../styles/Hero.module.css";
import Link from "next/link";
import Image from "next/image";
import Header from "./Header";

const Hero = () => {
  // Track scroll progress for the hero section
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  // Map scroll progress to button properties (same as in Header)
  const buttonScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const buttonPaddingX = useTransform(scrollYProgress, [0, 1], [16, 12]);
  const buttonPaddingY = useTransform(scrollYProgress, [0, 1], [6, 4]);
  const buttonFontSize = useTransform(scrollYProgress, [0, 1], [14, 12]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const buttonTranslateY = useTransform(scrollYProgress, [0, 1], [0, -2]);

  return (
    <section className="min-h-screen flex items-center justify-center text-black relative">
      {/* Radial Gradient Background Pattern */}
      <div className={styles.background} />

      {/* Logo and Text in Top-Left Corner */}
      <div className="absolute top-7 left-4 z-50 flex items-center space-x-2">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="M44 Logo"
            width={48}
            height={48}
            className="object-contain"
          />
          <span style={{ color: "#9000ff" }} className="text-xl font-semibold">
            m44.io
          </span>
        </Link>
      </div>

      {/* Book a Call Button in Top-Right Corner */}
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
          className="absolute top-7 right-4 z-[60] outline-none cursor-pointer border-0 rounded-[100px] bg-purple-600 transition-all duration-300 shadow-[inset_0_0.3rem_0.5rem_rgba(255,255,255,0.3),inset_0_-0.1rem_0.3rem_rgba(0,0,0,0.7),inset_0_-0.4rem_0.9rem_rgba(255,255,255,0.5),0_1rem_1rem_rgba(0,0,0,0.3),0_0.5rem_0.5rem_-0.3rem_rgba(0,0,0,0.8)]"
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

      {/* Content Layer */}
      <motion.div
        className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className={`font-bold mb-6 text-black ${styles.heroTitle}`}>
          <div className={styles.titleLine}>
            <span>Your Ads Should Print </span>
            <span className={styles.highlightedText}>Profit</span>
          </div>
          <div className={styles.titleLine}>
            <span>Not Burn </span>
            <span className={styles.highlightedText}>Budget</span>
          </div>
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-4 text-gray-600 max-w-3xl mx-auto">
          We build ad systems that print cash—not just clicks.
        </p>
        <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto">
          Every dollar in gets you more out. Or we don’t get paid.
        </p>
        <div className="flex justify-center">
          <HeroButton />
        </div>
      </motion.div>

      {/* Header Component */}
      <Header />
    </section>
  );
};

export default Hero;