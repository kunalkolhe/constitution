import React from 'react';
import Image from 'next/image';

interface LeaderCardProps {
  name: string;
  role: string;
  fact: string;
  imageUrl: string;
  initials?: string;
}

export default function LeaderCard({ name, role, fact, imageUrl, initials }: LeaderCardProps) {
  return (
    <div className="w-[200px] flex-shrink-0 flex flex-col items-center text-center">
      <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-[#FF6B00] mx-auto mb-3 relative bg-[#05050A] flex items-center justify-center">
        {imageUrl ? (
          <Image unoptimized 
            src={imageUrl} 
            alt={name} 
            fill 
            className="object-cover object-top" 
          />
        ) : (
          <span className="text-[#FF6B00] font-[family-name:var(--font-baloo-2)] text-3xl font-bold">
            {initials}
          </span>
        )}
      </div>
      <h3 className="font-[family-name:var(--font-baloo-2)] text-base font-bold text-white/90 leading-tight">
        {name}
      </h3>
      <p className="font-[family-name:var(--font-inter)] text-[0.8rem] text-white/60 mt-1 leading-snug">
        {role}
      </p>
      <p className="font-[family-name:var(--font-inter)] text-[0.8rem] text-[#FF6B00] font-medium mt-1">
        {fact}
      </p>
    </div>
  );
}
