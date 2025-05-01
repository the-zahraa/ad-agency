"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";
import styles from "../styles/BookCallSection.module.css";

// Animation variants for Framer Motion
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function BookCallSection() {
  const [calLoaded, setCalLoaded] = useState(false);
  const [calKey, setCalKey] = useState(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to store interval

  // Function to initialize or reinitialize the Cal API
  const initializeCal = async () => {
    try {
      const calApi = await getCalApi();
      calApi("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      console.log("Cal.com API initialized successfully");
      setCalLoaded(true);
      // Clear interval once loaded
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } catch (error) {
      console.error("Failed to load Cal.com API:", error);
      setCalLoaded(false);
    }
  };

  // Initial load
  useEffect(() => {
    initializeCal();
  }, []);

  // Handle tab visibility changes and periodic checks
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("Tab is visible, attempting to reinitialize Cal.com API");
        setCalLoaded(false);
        setTimeout(() => {
          setCalKey(Date.now());
          initializeCal();
        }, 100);
      }
    };

    // Periodic check to ensure calendar loads
    const checkCalendarLoad = () => {
      const calendarElement = document.querySelector("[data-cal-view='month']");
      if (!calLoaded && !calendarElement) {
        console.log("Calendar not loaded, retrying initialization");
        setCalLoaded(false);
        setCalKey(Date.now());
        initializeCal();
      }
    };

    // Set up interval to check every 2 seconds if calendar hasn't loaded
    intervalRef.current = setInterval(checkCalendarLoad, 2000);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [calLoaded]); // Depend on calLoaded to restart interval if needed

  return (
    <section className={`${styles.sectionBackground} pt-16 pb-16 text-white`}>
      <div className={styles.sectionContainer}>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          This Call Will Either Make You Money or Cost You Nothing.
        </motion.h2>
        <div className="flex justify-center">
          <div className={styles.cardContainer}>
            {/* SVG Filters */}
            <svg style={{ position: "absolute", width: 0, height: 0 }}>
              <filter id="unopaq" y="-100%" height="300%" x="-100%" width="300%">
                <feColorMatrix
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 5 0"
                />
              </filter>
              <filter id="unopaq2" y="-100%" height="300%" x="-100%" width="300%">
                <feColorMatrix
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 10 0"
                />
              </filter>
              <filter id="unopaq3" y="-100%" height="300%" x="-100%" width="300%">
                <feColorMatrix
                  values="1 0 0 1 0 0 1 0 1 0 0 0 1 1 0 0 0 0 2 0"
                />
              </filter>
            </svg>
            <div className={`${styles.spin} ${styles.spinBlur}`}></div>
            <div className={`${styles.spin} ${styles.spinIntense}`}></div>
            <div className={styles.backdrop}></div>
            <div className={styles.cardBorder}>
              <div className={`${styles.spin} ${styles.spinInside}`}></div>
            </div>
            <div className={styles.card}>
              <div className={styles.content}>
                {calLoaded ? (
                  <Cal
                    key={calKey}
                    namespace="30min"
                    calLink="iveymeet/30min"
                    className={styles.calendarEmbed}
                    config={{ layout: "month_view" }}
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    Loading calendar...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}