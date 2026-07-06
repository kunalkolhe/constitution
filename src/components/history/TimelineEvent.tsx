'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TimelineEventProps {
  date: string;
  title: string;
  description: string;
  significance: string;
  imageUrl: string;
  isLeft: boolean;
  delay?: number;
}

export default function TimelineEvent({ date, title, description, significance, imageUrl, isLeft, delay = 0 }: TimelineEventProps) {
  return (
    <div className="relative mb-12 z-10 w-full flex flex-col md:flex-row items-center md:items-start">
      
      {/* Center Dot for desktop */}
      <div className="hidden md:block absolute left-1/2 w-4 h-4 rounded-full bg-[#FF6B00] border-4 border-[#05050A] transform -translate-x-1/2 z-20 mt-8"></div>
      
      {/* Mobile Dot */}
      <div className="md:hidden absolute left-1.5 w-4 h-4 rounded-full bg-[#FF6B00] border-4 border-[#05050A] transform -translate-x-1/2 z-20 mt-8"></div>

      {/* Card Container */}
      <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12 md:ml-auto'} pl-8 md:pl-${isLeft ? '0' : '12'}`}>
        <motion.div 
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay }}
          className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/20 max-w-[380px] w-full"
          style={{ marginLeft: isLeft ? 'auto' : '0', marginRight: isLeft ? '0' : 'auto' }}
        >
          {/* LAYOUT B Image Pattern */}
          <div className="h-[180px] relative w-full overflow-hidden">
            <Image unoptimized 
              src={imageUrl} 
              alt={title} 
              fill 
              className="object-cover object-center" 
            />
            {/* Date Badge */}
            <div className="absolute top-3 left-3 bg-[#FF6B00] text-white font-[family-name:var(--font-inter)] text-xs font-bold px-3 py-1 rounded-full">
              {date}
            </div>
          </div>
          
          <div className="p-5">
            <h4 className="font-[family-name:var(--font-baloo-2)] text-lg font-bold text-white/90 mb-2 leading-tight">
              {title}
            </h4>
            <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-white/60 mb-3">
              {description}
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[0.8rem] text-[#FF6B00] font-medium leading-snug">
              {significance}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
