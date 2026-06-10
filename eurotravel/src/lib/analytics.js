// GA4 Measurement ID — replace G-XXXXXXXXXX with your real ID from Google Analytics
export const GA_ID = 'G-CX53KCB1N8';

export function trackEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

export function trackPageView(path) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', GA_ID, { page_path: path });
  }
}
