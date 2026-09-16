import Link from 'next/link';
import { Compass, Home } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function NotFound() {
  return (
    <main className="bg-[#FFF8F0] min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-24 px-4 flex flex-col items-center justify-center text-center max-w-2xl mx-auto w-full">
        <span className="font-[family-name:var(--font-display)] text-[clamp(5rem,15vw,9rem)] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#DE350B] mb-2">
          404
        </span>
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">
          This Article Doesn&apos;t Exist
        </h1>
        <p className="text-[#1A1A2E]/60 text-lg mb-10 max-w-md">
          The page you&apos;re looking for has been repealed, moved, or never existed in the first place. Let&apos;s get you back to solid constitutional ground.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6B00] hover:bg-[#FF8C3A] text-white rounded-full font-bold transition-colors shadow-lg shadow-[#FF6B00]/20"
          >
            <Home size={20} />
            Back to Home
          </Link>
          <Link
            href="/explore"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-[#1A1A2E] rounded-full font-bold transition-colors shadow-sm"
          >
            <Compass size={20} />
            Explore the Constitution
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
