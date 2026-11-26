'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: 'gypsum' | 'plastering' | 'painting';
  title: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  showFilters?: boolean;
}

export default function GalleryGrid({ items, showFilters = true }: GalleryGridProps) {
  const t = useTranslations('gallery');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: t('categories.all') },
    { id: 'gypsum', label: t('categories.gypsum') },
    { id: 'plastering', label: t('categories.plastering') },
    { id: 'painting', label: t('categories.painting') },
  ];

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Filters */}
      {showFilters && (
        <div className="mb-10 flex flex-wrap gap-x-8 gap-y-2 border-b border-line">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                '-mb-px border-b-2 pb-4 text-[0.9375rem] font-semibold transition-colors',
                activeCategory === category.id
                  ? 'border-ink-900 text-ink-900'
                  : 'border-transparent text-ink-400 hover:text-ink-900'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <button
            type="button"
            key={item.id}
            className="group block text-left"
            onClick={() => setSelectedItem(item)}
          >
            <div className="frame aspect-[3/4]">
              <Image src={item.src} alt={item.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink-900">{item.title}</h3>
            <p className="mt-0.5 text-sm text-ink-500">
              {t(`categories.${item.category}`)}
            </p>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        size="xl"
      >
        {selectedItem && (
          <div className="p-4 pt-0">
            <div className="frame aspect-[3/4]">
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-ink-900">{selectedItem.title}</h3>
              <p className="text-sm text-ink-500">
                {t(`categories.${selectedItem.category}`)}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
