// Extend Window interface to include gtag
declare global {
    interface Window {
      gtag: (...args: any[]) => void;
    }
  }
  
  export const GA_TRACKING_ID = 'G-2GBKK2RGWC'; // Replace with your GA4 ID
  
  // Track page views
  export const pageview = (url: string) => {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  };
  
  // Track custom events
  export const event = ({ action, category, label, value }: { action: string; category: string; label?: string; value?: number }) => {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  };