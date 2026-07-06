'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ERA_IMAGES = [
  "/images/assembly_16894906024..._imresizer_1765638363072.jpg",
  "/images/1322351-cvc_1765642131941.webp",
  "/images/330px-thumbnail_1765642131939.jpg",
  "/images/constituent-assembly_1765642131943.jpg",
  "/images/CONSTITUTIONOFINDIA_imresizer_1765630728670.jpg",
  "/images/deccanherald_import_..._imresizer_1765630728671.jpg",
  "/images/Dr._Bhimrao_Ambedkar_imresizer_1765796371841.jpg",
  "/images/First_Republic_Day_0_1765642131944.webp",
  "/images/images_1765642131945.jpg",
  "/images/istockphoto-12970420..._imresizer_1765630728673.jpg",
  "/images/Jawaharlal_Nehru_signing_Indian_Constitution_1765642131946.jpg",
  "/images/republic_day_imresizer_1765630728674.jpg",
  "/images/The_Constitution_of_..._imresizer_1765630728674.jpg",
  "/images/unnamed_1765642131947.jpg"
];

// Duplicate the array to create an infinite scrolling effect
const MARQUEE_IMAGES = [...ERA_IMAGES, ...ERA_IMAGES];

export default function EraGallery() {
  return (
    <section className="py-24 bg-[#05050A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-bold text-white leading-[1.2] tracking-[-0.03em] mb-4">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FF8C3A]">Golden Era</span> of Republic
        </h2>
        <p className="font-[family-name:var(--font-sans)] text-[1.1rem] text-white/60 max-w-2xl mx-auto">
          Rare historical moments that shaped the destiny of our nation.
        </p>
      </div>

      <div className="relative w-full flex flex-col gap-6">
        
        {/* ROW 1: Scrolling Left */}
        <div className="flex w-[200%] gap-6 overflow-hidden">
          <motion.div
            className="flex gap-6 min-w-max"
            animate={{ x: [0, -1035] }} // Approximate width to scroll before repeating
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {MARQUEE_IMAGES.slice(0, 14).map((src, idx) => (
              <div 
                key={idx} 
                className="relative w-[280px] md:w-[350px] h-[200px] md:h-[250px] rounded-2xl overflow-hidden border-2 border-white/10 shrink-0 group"
              >
                <Image unoptimized
                  src={src}
                  alt={`Historical Era ${idx}`}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-100 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Scrolling Right */}
        <div className="flex w-[200%] gap-6 overflow-hidden -ml-[100%]">
          <motion.div
            className="flex gap-6 min-w-max"
            animate={{ x: [-1035, 0] }}
            transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
          >
            {MARQUEE_IMAGES.slice(14, 28).map((src, idx) => (
              <div 
                key={idx} 
                className="relative w-[280px] md:w-[350px] h-[200px] md:h-[250px] rounded-2xl overflow-hidden border-2 border-white/10 shrink-0 group"
              >
                <Image unoptimized
                  src={src}
                  alt={`Historical Era ${idx}`}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-100 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B00]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
