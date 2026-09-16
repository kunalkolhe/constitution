'use client';

import { useEffect } from 'react';

// Catches errors that error.tsx can't: crashes in the root layout itself
// (font setup, providers, the Google Translate script). Because it replaces
// the root layout when it fires, it has to render its own <html>/<body> —
// and, for the same reason as error.tsx, stays completely self-contained
// with inline styles rather than relying on Tailwind/globals.css having
// loaded correctly.
export default function GlobalError({
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
    <html lang="en">
      <body style={{ margin: 0, background: '#FFF8F0', color: '#1A1A2E', fontFamily: 'system-ui, sans-serif' }}>
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem' }}>
          <div style={{ maxWidth: 420 }}>
            <p style={{ fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '1.1rem' }}>
              Bhartiya<span style={{ color: '#FF6B00' }}>Samvidhan</span>
            </p>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
              The App Failed to Load
            </h1>
            <p style={{ color: 'rgba(26,26,46,0.6)', marginBottom: '2rem' }}>
              Something broke before the page could even render. Please try again.
            </p>
            <button
              onClick={reset}
              style={{
                padding: '1rem 2rem',
                background: '#FF6B00',
                color: 'white',
                border: 'none',
                borderRadius: 999,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
