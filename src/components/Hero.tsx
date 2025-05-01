"use client";

import { motion } from "framer-motion";
import HeroButton from "./HeroButton";
import styles from "../styles/Hero.module.css";
import Link from "next/link";
import Image from "next/image";
import Header from "./Header";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-black relative">
      {/* Radial Gradient Background Pattern */}
      <div className={styles.background} />

      {/* Logo and Text in Top-Left Corner (Hidden on Mobile) */}
      <div className="absolute top-7 left-4 z-50 flex items-center space-x-2 hidden sm:flex">
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