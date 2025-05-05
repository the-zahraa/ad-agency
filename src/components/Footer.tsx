"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { CustomXIcon } from "./icons/CustomXIcon";
import styles from "../styles/Footer.module.css";

// Animation variants for Framer Motion
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Updated hover effect for nav links (no scale to prevent shift)
const navHoverEffect = {
  hover: {
    color: "#9000ff",
    transition: { duration: 0.3 },
  },
};

// Hover effect for social icons (keeps scale for icons)
const socialHoverEffect = {
  hover: {
    scale: 1.1,
    boxShadow: "0 0 12px rgba(144, 0, 255, 0.5)",
    transition: { duration: 0.3 },
  },
};

export default function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className={styles.footer}
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Logo and Tagline */}
          <div className={styles.logoSection}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/logo.png"
                alt="m44.io logo"
                width={40}
                height={40}
                className={styles.logoIcon}
              />
              m44.io
            </Link>
            <p className={styles.tagline}>
              Quality with speed.
            </p>
          </div>

          {/* Navigation Links */}
          <div className={styles.navSection}>
            <h3 className={styles.navTitle}>Explore</h3>
            <ul className={styles.navList}>
              {[
                { name: "Home", href: "/#home" },
                { name: "Why m44", href: "/#why-m44" },
                { name: "Services", href: "/#services" },
                { name: "FAQ", href: "/#support" }, // Updated to Support
              ].map((item) => (
                <motion.li
                  key={item.name}
                  whileHover="hover"
                  variants={navHoverEffect}
                  className={styles.navItem}
                >
                  <Link href={item.href}>{item.name}</Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className={styles.socialSection}>
            <h3 className={styles.socialTitle}>Connect With Us</h3>
            <div className={styles.socialLinks}>
              {[
                {
                  href: "https://twitter.com/PaidAds_?t=SkGBnA6Hz99u681WQ_dlZQ&s=09",
                  icon: <CustomXIcon size={24} />,
                },
                {
                  href: "https://wa.me/+66804444448",
                  icon: <FaWhatsapp size={24} />,
                },
                {
                  href: "https://instagram.com",
                  icon: <FaInstagram size={24} />,
                },
                {
                  href: "https://facebook.com",
                  icon: <FaFacebook size={24} />,
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={socialHoverEffect}
                  className={styles.socialLink}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            ©2025 m44.io. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}