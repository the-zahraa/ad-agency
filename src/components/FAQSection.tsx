"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import styles from "../styles/FAQSection.module.css";

// FAQ data
const faqs = [
  {
    question: "Do you offer branding or creative services?",
    answer:
      "Yes, while we specialize in paid media, we also provide high-converting creatives including static ads, video ads, UGC, and landing page design tweaks.",
  },
  {
    question: "Do you work with service-based businesses or only ecom?",
    answer:
      "Both. We work with e-commerce, SaaS, and high-ticket service brands that need more sales, booked calls, or client acquisition through paid ads.",
  },
  {
    question: "What platforms do you run ads on?",
    answer:
      "We run campaigns on Tik Tok, YouTube, X (Twitter), Google, Instagram, Facebook, Lazada, and Shopee. We match the platforms to what makes sense for your offer and audience.",
  },
  {
    question: "What if I've never run ads before?",
    answer:
      "No problem. We'll help you build from scratch: strategy, tracking, creative, audience. You'll get a full-funnel system set up and launched fast.",
  },
  {
    question: "Do you only work with big brands?",
    answer:
      "Nope. As long as you have a solid offer, clear goals, and are ready to scale, we're in. Most of our clients are doing $50k-$500k/month.",
  },
  {
    question: "Can I bring my own creatives or copy?",
    answer:
      "Absolutely. If you have assets that convert, we'll use them. If not, we'll guide you or create new ones that perform.",
  },
  {
    question: "Do I get to see what's happening in real-time?",
    answer:
      "Yes. We give you access to live dashboards, weekly updates, and clear reporting so you're never in the dark.",
  },
  {
    question: "What does the onboarding process look like?",
    answer:
      "It’s fast. We’ll walk you through everything in 30 minutes or less. We’ll collect logins, assets, access, and goals, then we get to work immediately.",
  },
];

// Animation variants for Framer Motion
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Updated answerVariants for smoother and faster transitions
const answerVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    height: "auto",
    marginTop: "0.5rem",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      when: "beforeChildren", // Ensures height and opacity animate together
    },
  },
};

// Variants for the arrow fade transition
const arrowVariants = {
  hidden: { opacity: 0, y: 5, transition: { duration: 0.2, ease: "easeInOut" } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
};

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 text-black">
      <div className={styles.sectionContainer}>
        {/* Headline */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#9000ff]"
        >
          Still Have Questions?
        </motion.h2>

        {/* FAQ Container */}
        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              {/* Question Row */}
              <div
                className={`${styles.faqQuestion} ${
                  openIndex === index ? styles.active : ""
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <h3>{faq.question}</h3>
                <div className={styles.arrowContainer}>
                  <AnimatePresence mode="wait">
                    {openIndex === index ? (
                      <motion.div
                        key="up"
                        variants={arrowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <ChevronUpIcon className={styles.arrow} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="down"
                        variants={arrowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <ChevronDownIcon className={styles.arrow} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={styles.faqAnswer}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}