'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Home } from 'lucide-react';

// Deliberately self-contained: no Navbar, Footer, or LanguageContext import.
// This screen has to stay usable even if the thing that crashed was one of
// those shared pieces — pulling them in here risks the same error looping.
export default function GlobalErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to the console (and, if you wire one up later, an error-reporting
    // service) so a crash isn't completely silent for whoever's debugging it.
    console.error(error);
  }, [error]);

  return (
    <main className="bg-[#FFF8F0] min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-[0.15em] uppercase text-[#1A1A2E]">
          Bhartiya<span className="text-[#FF6B00]">Samvidhan</span>
        </span>

        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#1A1A2E] mt-8 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-[#1A1A2E]/60 mb-10">
          An unexpected error interrupted this page. It&apos;s been logged — try again, or head back to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6B00] hover:bg-[#FF8C3A] text-white rounded-full font-bold transition-colors shadow-lg shadow-[#FF6B00]/20"
          >
            <RotateCcw size={20} />
            Try Again
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-[#1A1A2E] rounded-full font-bold transition-colors shadow-sm"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
