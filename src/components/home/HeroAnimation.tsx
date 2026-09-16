'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, MotionValue } from 'framer-motion';

interface HeroAnimationProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroAnimation({ scrollYProgress }: HeroAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [frames, setFrames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noFrames, setNoFrames] = useState(false);

  // Loaded images live in a ref, not state: with ~76 frames, calling setState
  // on every single one as it arrives would mean ~76 re-renders. The canvas
  // is drawn imperatively instead, so nothing here needs to trigger React.
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);

  // Draw function using Canvas covering object-cover style.
  const drawImageProp = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  }, []);

  // Walk backward from the target frame to the nearest one that has finished
  // loading, so scrubbing still shows something sensible while later frames
  // are still arriving in the background.
  const nearestLoaded = useCallback((index: number): HTMLImageElement | null => {
    for (let i = index; i >= 0; i--) {
      const img = imagesRef.current[i];
      if (img && img.complete && img.naturalWidth > 0) return img;
    }
    return null;
  }, []);

  // 1. Fetch the frame list from API
  useEffect(() => {
    fetch('/api/frames')
      .then(res => res.json())
      .then(data => {
        if (data.frames && data.frames.length > 0) {
          setFrames(data.frames);
        } else {
          setIsLoading(false);
          setNoFrames(true);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setNoFrames(true);
      });
  }, []);

  // 2. Load images progressively. Rather than blocking on all ~76 frames
  // before showing anything, the loading screen clears as soon as the very
  // first frame is ready — the rest continue loading in the background and
  // nearestLoaded() covers any not-yet-arrived frame in the meantime.
  useEffect(() => {
    if (frames.length === 0) return;

    imagesRef.current = new Array(frames.length);
    let firstFrameShown = false;

    frames.forEach((src, i) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        imagesRef.current[i] = img;
        if (!firstFrameShown) {
          firstFrameShown = true;
          setIsLoading(false);
          requestAnimationFrame(() => {
            if (canvasRef.current) {
              const ctx = canvasRef.current.getContext('2d');
              if (ctx) drawImageProp(ctx, img);
            }
          });
        }
      };

      // A single broken frame shouldn't block the rest — nearestLoaded()
      // will fall back to whatever frame is available when scrubbed past.
      img.onerror = () => {};
    });
  }, [frames, drawImageProp]);

  // 4. Scrub animation tied to Scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (frames.length === 0 || !canvasRef.current) return;

    // Map scroll progress (0 to 1) to frame index (0 to frames.length - 1)
    const frameIndex = Math.min(
      frames.length - 1,
      Math.floor(latest * frames.length)
    );

    // Only redraw if the frame actually changed
    if (frameIndex !== frameRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const currentImage = nearestLoaded(frameIndex);

      if (ctx && currentImage) {
        // Fast path for drawing frame
        requestAnimationFrame(() => {
          drawImageProp(ctx, currentImage);
        });
      }
      frameRef.current = frameIndex;
    }
  });

  // 5. Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;

        // Redraw current frame on resize
        const currentImage = nearestLoaded(Math.max(0, frameRef.current));
        if (currentImage) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) drawImageProp(ctx, currentImage);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [frames, drawImageProp, nearestLoaded]);

  if (frames.length === 0 && noFrames) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-black">

      {/* Loading Placeholder */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-black z-20"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-[#FF6B00]/30 border-t-[#FF6B00] rounded-full animate-spin"></div>
              <p className="mt-4 text-[#FFF8F0]/60 font-[family-name:var(--font-sans)] text-sm tracking-widest uppercase">
                Loading Assets
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover"
      />

      {/* Fallback dark gradient for text readability if placed behind text */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
    </div>
  );
}
