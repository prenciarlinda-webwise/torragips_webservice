// Content model for spec-driven landing pages (home, patinim, lyerje, cmime).
// Text fields support inline links written as [anchor](/path/) or [anchor](tel:+355...).

export type PageCta = {
  call: string;
  whatsapp: string;
  whatsappMessage: string;
};

export type ContentItem = {
  title: string; // rendered as H3
  text: string;
  image?: string;
  alt?: string;
};

export type ContentSection = {
  title: string; // rendered as H2
  paragraphs?: string[];
  items?: ContentItem[];
  table?: { head: string[]; rows: string[][] };
  after?: string[]; // paragraphs after the table
  steps?: { title: string; text: string }[];
};

export type FaqItem = { question: string; answer: string };

export type SpecPageContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  answer: string; // direct answer right below the H1
  cta: PageCta;
  sections: ContentSection[];
  faq: { title: string; items: FaqItem[] };
};
