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
    <section className="pt-[4.5rem]">
      <div className="container-custom flex min-h-[70vh] items-center py-16 md:py-24">
        <div className="w-full max-w-2xl border-t border-ink-900 pt-8">
          <h1 className="display mb-6">Diçka shkoi keq</h1>
          <p className="lead mb-9">
            Na vjen keq, por ndodhi një gabim. Ju lutemi provoni përsëri.
          </p>
          <button onClick={() => reset()} className="btn-ink btn-lg">
            Provo Përsëri
          </button>
        </div>
      </div>
    </section>
  );
}
