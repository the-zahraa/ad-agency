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
    <section
      id="home"
      className={`relative bg-[#f0f0ef] pt-12 pb-0 overflow-visible ${styles.heroSection} flex flex-col`}
      style={{ height: "auto", boxSizing: "border-box" }}
    >
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
          <div className={`absolute -top-7 left-7 hidden md:flex items-center ${styles.logoLink}`}>
            <Link href="#home" className="flex items-center">
              <Image
                src="/logo.png"
                alt="M44 Logo"
                width={64}
                height={64}
                sizes="64px"
                className="object-contain"
                priority
              />
              <AnimatedLogoText />
            </Link>
          </div>
          <div className={`absolute -top-7 right-7 hidden md:block ${styles.callButton}`}>
            <CallButton />
          </div>
          <div className="lg:grid lg:grid-cols-[2fr_1fr] lg:gap-4 h-full">
            <div className="lg:col-span-1 lg:pl-12 mx-auto">
              <motion.div
                className="text-left pt-20 md:pt-28 max-w-[90vw] mx-auto lg:max-w-none lg:mx-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="block lg:hidden">
                  <h1 className={`font-extrabold text-black ${styles.heroTitle}`}>
                    DO YOU WANT TO SCALE YOUR BUSINESS WITH PAID ADS?
                  </h1>
                </div>
                <div className="hidden lg:block">
                  <h1 className={`font-extrabold text-black ${styles.heroTitle}`}>
                    DO YOU WANT TO SCALE YOUR BUSINESS WITH PAID ADS?
                  </h1>
                </div>
                <p className={`text-gray-800 ${styles.subtitle}`}>
                  Partner with the team trusted by billion   <br className="lg:hidden" /> <br className="hidden lg:inline" /> dollar brands to drive results, fast.
                </p>
              </motion.div>
              <div className="flex justify-center lg:justify-start mt-4 md:mt-6 mb-8">
                <HeroButton className="hero-button" id="hero-button" />
              </div>
            </div>
            <div className="hidden lg:block self-end">
              <div className={styles.imageContainer}>
                <Image
                  src="/l44w.png"
                  alt="Hero Image"
                  width={564}
                  height={564}
                  layout="responsive"
                  priority
                />
              </div>
            </div>
          </div>
          <div className={`lg:hidden ${styles.mobileImageContainer}`}>
            <Image
              src="/l44w.png"
              alt="Hero Image Mobile"
              width={300}
              height={300}
              style={{ width: "100%", maxWidth: "300px", height: "auto", objectFit: "contain" }}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}