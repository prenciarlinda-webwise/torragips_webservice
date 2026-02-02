'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-primary mb-4">Diçka shkoi keq</h1>
        <p className="text-text-light mb-8">
          Na vjen keq, por ndodhi një gabim. Ju lutemi provoni përsëri.
        </p>
        <button
          onClick={() => reset()}
          className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Provo Përsëri
        </button>
      </div>
    </div>
  );
}
