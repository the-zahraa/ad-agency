"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import styles from "../styles/FAQSection.module.css";

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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const answerVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      opacity: { duration: 0.12, ease: "easeInOut" },
      height: { duration: 0.12, ease: "easeInOut" },
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      opacity: { duration: 0.12, ease: "easeInOut" },
      height: { duration: 0.12, ease: "easeInOut" },
    },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8, transition: { duration: 0.12, ease: "easeInOut" } },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.12, ease: "easeInOut" } },
};

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 text-black">
      <div className={styles.sectionContainer}>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#9000ff]"
        >
          Still Have Questions?
        </motion.h2>

        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div
                className={`${styles.faqQuestion} ${
                  openIndex === index ? styles.active : ""
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <h3>{faq.question}</h3>
                <div className={styles.iconContainer}>
                  <AnimatePresence mode="wait">
                    {openIndex === index ? (
                      <motion.div
                        key="minus"
                        variants={iconVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <MinusIcon className={styles.icon} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="plus"
                        variants={iconVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <PlusIcon className={styles.icon} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={`${styles.faqAnswer} ${openIndex === index ? styles.open : ""}`}
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