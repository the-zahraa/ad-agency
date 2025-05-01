"use client";

import { createContext, useContext, useEffect, useRef, ReactNode } from "react";

type ScrollContextType = {
  scrollToSection: (sectionId: string) => void;
  scrollToElement: (element: HTMLElement, extraOffset?: number) => void;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function useScrollContext() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }
  return context;
}

export default function ScrollProvider({ children }: { children: ReactNode }) {
  const headerRef = useRef<HTMLElement>(null);

  // Handle scrolling to a section by ID
  const scrollToSection = (sectionId: string) => {
    console.log("[ScrollProvider] scrollToSection called with ID:", sectionId);
    const targetElement = document.getElementById(sectionId);
    console.log("[ScrollProvider] Target element:", targetElement);
    if (targetElement) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const offset = headerHeight + 10;
      targetElement.scrollIntoView({ behavior: "smooth" });
      const position = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    } else {
      console.log("[ScrollProvider] Section not found, retrying...");
      setTimeout(() => {
        const retryElement = document.getElementById(sectionId);
        console.log("[ScrollProvider] Retry target element:", retryElement);
        if (retryElement) {
          const headerHeight = headerRef.current?.offsetHeight || 0;
          const offset = headerHeight + 10;
          retryElement.scrollIntoView({ behavior: "smooth" });
          const position = retryElement.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({
            top: position,
            behavior: "smooth",
          });
        } else {
          console.error("[ScrollProvider] Element with ID not found after retry:", sectionId);
        }
      }, 1000);
    }
  };

  // Handle scrolling to a specific element
  const scrollToElement = (element: HTMLElement, extraOffset: number = 0) => {
    console.log("[ScrollProvider] scrollToElement called with element:", element);
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const offset = headerHeight + extraOffset;
      element.scrollIntoView({ behavior: "smooth" });
      const position = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }
  };

  // Handle hash changes on page load or navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.replace("#", "");
        scrollToSection(sectionId);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Find the header element after mount
  useEffect(() => {
    const header = document.querySelector("header") as HTMLElement;
    if (header && headerRef.current !== header) {
      headerRef.current = header;
    }
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollToSection, scrollToElement }}>
      {children}
    </ScrollContext.Provider>
  );
}