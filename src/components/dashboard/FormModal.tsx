'use client';

import { useEffect } from 'react';

interface FormModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  loading?: boolean;
  wide?: boolean;
}

export default function FormModal({ title, open, onClose, onSubmit, children, loading, wide }: FormModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#1a365d]/30 backdrop-blur-[2px]" onClick={onClose} />
      <div className={`relative bg-white rounded-xl shadow-xl w-full mx-2 sm:mx-4 max-h-[85vh] overflow-y-auto ${wide ? 'max-w-4xl' : 'max-w-lg'}`}>
        <div className="sticky top-0 z-10 bg-[#1a365d] px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white text-xl leading-none transition-colors">&times;</button>
        </div>
        <div className="h-0.5 bg-[#d97706]" />
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {children}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Anulo
            </button>
            <button type="submit" disabled={loading} className="px-5 py-2 text-sm text-white bg-[#1a365d] rounded-lg hover:bg-[#102a43] transition-colors disabled:opacity-50 font-medium">
              {loading ? 'Duke ruajtur...' : 'Ruaj'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
