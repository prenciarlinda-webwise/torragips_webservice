'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e3a5f', marginBottom: '1rem' }}>
              Diçka shkoi keq
            </h1>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>
              Na vjen keq, por ndodhi një gabim kritik.
            </p>
            <button
              onClick={() => reset()}
              style={{
                backgroundColor: '#e67e22',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Provo Përsëri
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
