"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../styles/Services.module.css";

// Animation variants for Framer Motion
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      name: "SEO",
      icon: (
        <svg className={styles.tabIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      ),
      title: "SEO That Actually Ranks",
      description: "We get you on page one of Google — no ads, no gimmicks. We find your buyers, create content that sells, and do it all for you.",
      whyTitle: "Why It Works",
      whyDescription: "We guarantee page one in 12 months — or you get your money back. No excuses. No fine print. Just results.",
      image: "/s1.png",
      width: 355, // Scaled down from 1775 to fit container
      height: 296, // Scaled down from 1478 to maintain 1775:1478 ratio
    },
    {
      name: "Creative",
      icon: (
        <svg className={styles.tabIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
        </svg>
      ),
      title: "Creative That Sells",
      description: "We don’t just make you look good — we make people buy. From idea to execution, we turn attention into revenue.",
      whyTitle: "Why It Works",
      whyDescription: "We build creative that’s designed to drive action — not just admiration. Pretty is optional. Profitable is mandatory.",
      image: "/s2.png",
      width: 355,
      height: 296,
    },
    {
      name: "Paid Media",
      icon: (
        <svg className={styles.tabIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm2.07-4.36l-.07.36H11v-.36c0-.67.28-1.31.76-1.76.47-.45 1.04-.74 1.31-.96.26-.22.5-.43.5-.76 0-.33-.27-.60-.60-.60-.33 0-.60.27-.60.60v.4h-2v-.4c0-.99.81-1.80 1.80-1.80.99 0 1.80.81 1.80 1.80 0 .67-.28 1.31-.76 1.76-.47.45-1.04.74-1.31.96-.26.22-.50.43-.50.76z" />
        </svg>
      ),
      title: "Paid Media That Prints Money",
      description: "We don’t just run ads — we grow brands. Facebook, TikTok, YouTube — we find your buyers and turn clicks into customers.",
      whyTitle: "Why It Works",
      whyDescription: "We focus on one thing: making you more money. If we’re not sure we can win, we don’t take the job.",
      image: "/s3.png",
      width: 355,
      height: 296,
    },
    {
      name: "Tracking & Reporting",
      icon: (
        <svg className={styles.tabIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h2v8zm-4 0H8V7h2v10zm8 0h-2V11h2v6z" />
        </svg>
      ),
      title: "Tracking That Tells the Truth",
      description: "We track what matters — not just what looks good. From online clicks to offline sales, we show you exactly which channels drive real revenue.",
      whyTitle: "Why It Works",
      whyDescription: "You get 24/7 access to a live dashboard — real numbers, real ROI, in real time. Stay in control. Stay ahead.",
      image: "/s4.png",
      width: 355,
      height: 296,
    },
    {
      name: "Influencer Management",
      icon: (
        <svg className={styles.tabIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
      title: "Influence That Moves Markets",
      description: "We don’t chase fame — we find real influence. We connect your brand with voices that drive buyers.",
      whyTitle: "Why It Works",
      whyDescription: "We custom-build every influencer strategy from scratch — no recycled lists, no wasted budget.",
      image: "/s5.jpg",
      width: 400, // Scaled down from 2000
      height: 333, // Scaled down from 1665 to maintain 2000:1665 ratio
    },
  ];

  return (
    <section className="py-16 bg-white text-black">
      <div className={styles.servicesContainer}>
        {/* Headline */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#9000ff]"
        >
          Services
        </motion.h2>

        {/* Tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className={styles.tabs}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`${styles.tab} ${activeTab === index ? styles.active : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {service.icon}
              <span className={styles.tabText}>{service.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab} // Key ensures animation on tab change
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          className={styles.content}
        >
          <div className={styles.textContent}>
            <h3 className={`${styles.serviceTitle} text-[#9000ff]`}>{services[activeTab].title}</h3>
            <p className={styles.serviceDescription}>{services[activeTab].description}</p>
            <h4 className={`${styles.whyTitle} text-[#9000ff]`}>{services[activeTab].whyTitle}</h4>
            <p className={styles.whyDescription}>{services[activeTab].whyDescription}</p>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={services[activeTab].image}
              alt={`${services[activeTab].name} illustration`}
              width={services[activeTab].width}
              height={services[activeTab].height}
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}