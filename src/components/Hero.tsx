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
      className={`relative bg-[#f0f0ef] pt-12 pb-0 overflow-visible ${styles.heroSection}`}
      style={{ minHeight: "100dvh", height: "auto", boxSizing: "border-box", display: "flex", flexDirection: "column" }}
    >
      <div className={styles.background} />
      <div className={`absolute top-8 left-[3%] hidden md:flex items-center ${styles.logoLink}`}>
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
      <div className={`absolute top-8 right-[3%] hidden md:block ${styles.callButton}`}>
        <CallButton />
      </div>
      <div className="relative lg:left-[3%] lg:mx-0 lg:px-0 flex-grow">
        <motion.div
          className="text-left max-w-4xl pt-20 md:pt-28"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={`text-center lg:text-left ${styles.mobileContentWrapper}`}>
            <div className={styles.textContainer}>
              <h1 className={`font-extrabold text-black ${styles.heroTitle}`}>
                <span> DO YOU WANT TO SCALE</span>
                <br className={styles.mobileBreak} />
                <span> YOUR BUSINESS WITH</span>
                <br className={styles.mobileBreak} />
                <span> PAID ADS?</span>
                <br className={styles.desktopBreak} />
              </h1>
              <p className={`text-gray-800 max-w-2xl ${styles.subtitle}`}>
                <span>Partner with the paid media team trusted by leading</span><br />
                <span>billion-dollar brands to drive 3 to 6x ROAS, fast.</span>
              </p>
            </div>
            <div className="flex justify-center lg:justify-start mt-4 md:mt-6 mb-8">
              <HeroButton className="hero-button" id="hero-button" />
            </div>
            <div className={`lg:hidden ${styles.mobileImageContainer}`}>
              <Image
                src="/l44w.png"
                alt="Hero Image Mobile"
                width={300}
                height={300}
                style={{ width: "300px", height: "300px", objectFit: "contain" }}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 right-0" style={{ zIndex: 1, overflow: "visible" }}>
        <div className={`hidden lg:block ${styles.imageContainer}`}>
          <Image
            src="/l44w.png"
            alt="Hero Image"
            width={564}
            height={564}
            style={{ width: "564px", height: "564px", objectFit: "contain" }}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}