"use client";

import { motion } from "framer-motion";
import HeroButton from "./HeroButton";
import CallButton from "./CallButton";
import AnimatedLogoText from "./AnimatedLogoText";
import styles from "../styles/Hero.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center text-black relative">
      <div className={styles.background} />
      <div className="absolute top-8 left-[3%] hidden md:flex items-center">
        <Link href="#home" className="flex items-center">
          <Image
            src="/logo.png"
            alt="M44 Logo"
            width={48}
            height={48}
            sizes="48px"
            className="object-contain"
            priority
          />
          <AnimatedLogoText />
        </Link>
      </div>
      <div className="absolute top-6 right-[3%] hidden md:block">
        <CallButton />
      </div>
      <motion.div
        className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className={`font-bold mb-4 text-black ${styles.heroTitle}`}>
          <div className={styles.titleLine}>
            <span>Your Ads Should Print </span>
            <span className={styles.highlightedText}>Profit</span>
          </div>
          <div className={styles.titleLine}>
            <span>Not Burn </span>
            <span className={styles.highlightedText}>Budget</span>
          </div>
        </h1>
        <p className="text-base sm:text-lg lg:text-2xl mb-2 text-gray-600 max-w-3xl mx-auto">
          We build ad systems that print cash—not just clicks.
        </p>
        <p className="text-base sm:text-lg lg:text-2xl mb-4 text-gray-600 max-w-3xl mx-auto">
          Every dollar in gets you more out.
        </p>
        <div className="flex justify-center">
          <HeroButton className="hero-button" id="hero-button" />
        </div>
      </motion.div>
    </section>
  );
}