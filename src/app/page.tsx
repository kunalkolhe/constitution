'use client';

import React, { useRef } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import dynamic from 'next/dynamic';

const HeroAnimation = dynamic(() => import('@/components/home/HeroAnimation'), { ssr: false });

import HeroOverlay from '@/components/home/HeroOverlay';
import FeatureCards from '@/components/home/FeatureCards';
import StatsStrip from '@/components/home/StatsStrip';
import LanguageStrip from '@/components/home/LanguageStrip';
import WhyConstitution from '@/components/home/WhyConstitution';

import { useScroll } from 'framer-motion';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end']
  });

  return (
    <main className="bg-[#05050A]">
      <Navbar />
      
      {/* Cinematic Scroll Hero Section */}
      <div ref={heroRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <HeroAnimation scrollYProgress={scrollYProgress} />
          <HeroOverlay scrollYProgress={scrollYProgress} />
        </div>
      </div>

      <StatsStrip />
      <WhyConstitution />
      <FeatureCards />
      <LanguageStrip />
      
      <Footer />
    </main>
  );
}
