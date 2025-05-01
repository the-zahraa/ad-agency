"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { CustomXIcon } from "./icons/CustomXIcon";
import styles from "../styles/Footer.module.css";

// Animation variants for Framer Motion
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const hoverEffect = {
  hover: { scale: 1.1, color: "#9000ff", transition: { duration: 0.3 } },
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
            <h2 className={styles.logo}>
              <Image
                src="/logo.png"
                alt="m44.io logo"
                width={40} // Increased from 32 to 40
                height={40} // Increased from 32 to 40
                className={styles.logoIcon}
              />
              m44.io
            </h2>
            <p className={styles.tagline}>
              Crafting innovative ad solutions for your brand.
            </p>
            <motion.a
              href="mailto:sales@m44.io"
              whileHover="hover"
              variants={hoverEffect}
              className={styles.connectLink}
            >
              Connect
            </motion.a>
          </div>

          {/* Services */}
          <div className={styles.servicesSection}>
            <h3 className={styles.servicesTitle}>Services</h3>
            <ul className={styles.servicesList}>
              {["Paid Media", "SEO", "Creative", "Tracking"].map((item) => (
                <motion.li
                  key={item}
                  whileHover="hover"
                  variants={hoverEffect}
                  className={styles.serviceItem}
                >
                  <a href="#">{item}</a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div className={styles.getInTouchSection}>
            <h3 className={styles.getInTouchTitle}>Get in Touch</h3>
            <p className={styles.getInTouchEmail}>sales@m44.io</p>
            <div className={styles.socialLinks}>
              <motion.a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover="hover"
                variants={hoverEffect}
                className={styles.socialLink}
              >
                <CustomXIcon size={24} />
              </motion.a>
              <motion.a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover="hover"
                variants={hoverEffect}
                className={styles.socialLink}
              >
                <FaWhatsapp size={24} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover="hover"
                variants={hoverEffect}
                className={styles.socialLink}
              >
                <FaInstagram size={24} />
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover="hover"
                variants={hoverEffect}
                className={styles.socialLink}
              >
                <FaFacebook size={24} />
              </motion.a>
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