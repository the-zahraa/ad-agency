"use client";

import { motion } from "framer-motion";
import HeroButton from "./HeroButton";
import styles from "../styles/Hero.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-black relative">
      {/* Radial Gradient Background Pattern */}
      <div className={styles.background} />

      {/* Logo and m44.io Text in Left Corner (Bigger Screens Only) */}
      <div className="absolute top-6 left-[3%] hidden md:block">
        <Link href="#home" className="flex items-center">
          <Image
            src="/logo.png"
            alt="M44 Logo"
            width={48} // Increased from 36 to 48
            height={48} // Increased from 36 to 48
            sizes="48px"
            className="object-contain"
            priority
          />
          <span className="ml-2 text-2xl font-semibold text-purple-600">m44.io</span> {/* Increased from text-xl to text-2xl */}
        </Link>
      </div>

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
    </section>
  );
}