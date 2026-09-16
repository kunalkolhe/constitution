'use client';

import { useEffect, useRef } from 'react';

// A small trailing-ring cursor — dot tracks the pointer exactly, the ring
// eases toward it a frame behind, and both grow when hovering anything
// clickable. Purely a visual overlay (pointer-events: none everywhere), so
// it can never change what a click actually lands on — existing click
// targets (the states map, quiz buttons, etc.) are completely unaffected.
//
// Disabled entirely for touch/coarse pointers (nothing to show) and for
// prefers-reduced-motion (a trailing cursor is exactly the kind of motion
// that spec is meant to opt out of), in which case the browser's normal
// cursor is left alone.
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reducedMotion) return;

    document.documentElement.classList.add('has-custom-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId: number;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"], input, select, textarea')) {
        ring.classList.add('is-hovering');
      } else {
        ring.classList.remove('is-hovering');
      }
    };

    // The ring eases toward the pointer a frame behind the dot, giving the
    // trailing-lag feel — recalculated every frame rather than via a CSS
    // transition, since the dot's target position changes continuously.
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}
