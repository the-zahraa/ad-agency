"use client";

import { motion } from "framer-motion";
import HeroButton from "./HeroButton";
import CallButton from "./CallButton";
import AnimatedLogoText from "./AnimatedLogoText";
import styles from "../styles/Hero.module.css";
import Image from "next/legacy/image";
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
      <div className="absolute top-8 right-[3%] hidden md:block">
        <CallButton />
      </div>
      <motion.div
        className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className={`font-extrabold mb-6 text-black ${styles.heroTitle}`}>
          DO YOU WANT TO SCALE YOUR BUSINESS WITH PAID ADS?
        </h1>
        <div className={styles.subtitleContainer}>
          <p className={`text-lg sm:text-xl lg:text-2xl text-gray-800 max-w-3xl mx-auto ${styles.subtitle}`}>
          Partner with the paid media team trusted by leading billion-dollar brands to achieve business goals, fast.
          </p>
        </div>
        <div className="flex justify-center">
          <HeroButton className="hero-button" id="hero-button" />
        </div>
      </motion.div>
      <Link href="#partnered" className="absolute bottom-8 flex justify-center">
        <div className={styles.scrolldown}>
          <div className={styles.chevrons}>
            <div className={styles.chevrondown}></div>
            <div className={styles.chevrondown}></div>
          </div>
        </div>
      </Link>
    </section>
  );
}