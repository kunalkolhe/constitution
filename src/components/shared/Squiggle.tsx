'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface SquiggleProps {
  color?: string;
  className?: string;
}

// A hand-drawn-style underline that draws itself in once scrolled into
// view, instead of just appearing — an intentionally imperfect wavy stroke
// rather than a straight rule, for a less generic, more "designed" accent
// under a headline word. Purely decorative (aria-hidden), sits absolutely
// beneath whatever text it's paired with — the parent needs `relative`.
export default function Squiggle({ color = '#FF6B00', className = '' }: SquiggleProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 16"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`absolute left-0 -bottom-2 w-full h-3 pointer-events-none ${className}`}
    >
      <path
        d="M2 9.5C22 3, 42 3, 62 9.5S102 16, 122 9.5S162 3, 182 9.5S198 12, 198 9.5"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        className={isInView ? 'squiggle-draw' : ''}
        style={!isInView ? { strokeDasharray: 300, strokeDashoffset: 300 } : undefined}
      />
    </svg>
  );
}
