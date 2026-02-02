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
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeCategory === category.id
                  ? 'bg-accent text-white'
                  : 'bg-neutral-100 text-text hover:bg-neutral-200'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="text-white font-semibold">{item.title}</h3>
              <p className="text-white/80 text-sm">
                {t(`categories.${item.category}`)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        size="xl"
      >
        {selectedItem && (
          <div className="p-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-primary">{selectedItem.title}</h3>
              <p className="text-text-light">
                {t(`categories.${selectedItem.category}`)}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
