'use client';

import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

interface QuoteModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue | undefined>(undefined);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return <QuoteModalContext.Provider value={value}>{children}</QuoteModalContext.Provider>;
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error('useQuoteModal must be used within a QuoteModalProvider');
  }
  return ctx;
}
