export type Locale = 'sq' | 'en';

export interface Service {
  id: string;
  slug: {
    sq: string;
    en: string;
  };
  icon: string;
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: 'gypsum' | 'plastering' | 'painting';
  title: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  content: string;
  rating: number;
  service?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface PricingItem {
  service: string;
  description: string;
  priceMin: number;
  priceMax: number;
  unit: string;
  features: string[];
}
