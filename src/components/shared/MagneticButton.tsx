'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, HTMLMotionProps } from 'framer-motion';

// The button nudges toward the cursor as it approaches, then springs back
// to rest on mouse-leave — a small, tactile "the UI notices you" touch
// rather than a static hit target. Movement is capped low (±10px) so it
// stays a hover flourish, not something that makes the button hard to hit.
export default function MagneticButton({ children, className, ...motionProps }: HTMLMotionProps<'div'>) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.3);
    y.set(relY * 0.3);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
