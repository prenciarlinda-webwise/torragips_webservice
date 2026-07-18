'use client';

import { ButtonHTMLAttributes } from 'react';
import { Button } from '@/components/ui';
import { useQuoteModal } from './QuoteModalContext';

interface QuoteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export default function QuoteButton({ variant, size, className, children, ...props }: QuoteButtonProps) {
  const { open } = useQuoteModal();

  return (
    <Button type="button" variant={variant} size={size} className={className} onClick={open} {...props}>
      {children}
    </Button>
  );
}
