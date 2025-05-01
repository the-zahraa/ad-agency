import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { createContext, useContext, useEffect, useRef } from 'react';

export const metadata = {
  title: 'Ad Agency Website',
  description: 'A professional ad agency website built with Next.js',
};

// Create a Scroll Context
type ScrollContextType = {
  scrollToSection: (sectionId: string) => void;
  scrollToElement: (element: HTMLElement) => void;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function useScrollContext() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headerRef = useRef<HTMLElement>(null);

  // Handle scrolling to a section by ID
  const scrollToSection = (sectionId: string) => {
    console.log("[Layout] scrollToSection called with ID:", sectionId);
    const targetElement = document.getElementById(sectionId);
    console.log("[Layout] Target element:", targetElement);
    if (targetElement) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const offset = headerHeight + 10;
      targetElement.scrollIntoView({ behavior: 'smooth' });
      // Adjust for header offset
      const position = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: position,
        behavior: 'smooth',
      });
    } else {
      console.log("[Layout] Section not found, retrying...");
      setTimeout(() => {
        const retryElement = document.getElementById(sectionId);
        console.log("[Layout] Retry target element:", retryElement);
        if (retryElement) {
          const headerHeight = headerRef.current?.offsetHeight || 0;
          const offset = headerHeight + 10;
          retryElement.scrollIntoView({ behavior: 'smooth' });
          const position = retryElement.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({
            top: position,
            behavior: 'smooth',
          });
        } else {
          console.error("[Layout] Element with ID not found after retry:", sectionId);
        }
      }, 1000);
    }
  };

  // Handle scrolling to a specific element
  const scrollToElement = (element: HTMLElement) => {
    console.log("[Layout] scrollToElement called with element:", element);
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const offset = headerHeight + 10;
      element.scrollIntoView({ behavior: 'smooth' });
      const position = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: position,
        behavior: 'smooth',
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

  return (
    <html lang="en">
      <body className="antialiased">
        <ScrollContext.Provider value={{ scrollToSection, scrollToElement }}>
          <Header ref={headerRef} />
          <main>{children}</main>
          <Footer />
        </ScrollContext.Provider>
      </body>
    </html>
  );
}