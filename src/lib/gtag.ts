declare global {
    interface Window {
      gtag: (command: string, ...args: unknown[]) => void; // Use unknown[] instead of any[]
    }
  }
  
  export const GA_TRACKING_ID = 'G-2GBKK2RGWC'; // Replace with your GA4 ID
  
  export const pageview = (url: string) => {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  };
  
  export const event = ({ action, category, label, value }: { action: string; category: string; label?: string; value?: number }) => {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  };