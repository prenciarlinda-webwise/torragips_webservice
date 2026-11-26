'use client';

const AGENCY_URL = 'https://www.bytriad.com/seo/seo-lokal';

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export default function AgencyCreditLink() {
  const handleClick = () => {
    const w = window as DataLayerWindow;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: 'agency_credit_click',
      link_url: AGENCY_URL,
      link_text: 'Klikoom',
      page_path: window.location.pathname,
    });
  };

  return (
    <a
      href={AGENCY_URL}
      target="_blank"
      rel="noopener"
      onClick={handleClick}
      className="text-neutral-400 hover:text-white transition-colors"
    >
      Klikoom
    </a>
  );
}
