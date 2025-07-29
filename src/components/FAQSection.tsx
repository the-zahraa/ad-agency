"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/FAQSection.module.css";

const faqs = [
  {
    question: "Do you offer branding or creative services?",
    answer:
      "Yes, while we specialize in paid media, we also provide high-converting creatives including static ads, video ads, UGC, and landing page design tweaks.",
  },
  {
    question: "Do you work with service-based businesses or ecom?",
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

const FAQSection: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<string | null>(null);

  const handleToggle = (question: string) => {
    setActiveFAQ((prev) => (prev === question ? null : question));
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.sectionContainer}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={styles.sectionTitle}
        >
          Still Have Questions?
        </motion.h2>
        <div className={styles.faqContainer}>
          <div className={styles.faqContent}>
            {faqs.map((faq) => (
              <div key={faq.question} className={styles.faqItem}>
                <div
                  className={styles.faqHeader}
                  onClick={() => handleToggle(faq.question)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleToggle(faq.question);
                    }
                  }}
                >
                  <span className={styles.faqQuestion}>{faq.question}</span>
                  <div className={styles.arrowContainer}>
                    <motion.svg
                      className={styles.arrow}
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: activeFAQ === faq.question ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <path
                        d="M2 4 L6 8 L10 4"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="currentColor"
                      />
                    </motion.svg>
                  </div>
                </div>
                <AnimatePresence>
                  {activeFAQ === faq.question && (
                    <motion.div
                      className={styles.faqAnswer}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className={styles.faqAnswerText}>{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { FAQSection }; // Named export to match page.tsx