'use client'

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void; // note the ?
  }
}

export const GA_TRACKING_ID = 'G-2GBKK2RGWC';

const ready = () =>
  typeof window !== 'undefined' && typeof window.gtag === 'function';

export const pageview = (url: string) => {
  if (!ready()) return; // <-- guard
  window.gtag!('config', GA_TRACKING_ID, { page_path: url });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (!ready()) return; // <-- guard
  window.gtag!('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
