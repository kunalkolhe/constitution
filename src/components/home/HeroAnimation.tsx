'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, MotionValue } from 'framer-motion';

interface HeroAnimationProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroAnimation({ scrollYProgress }: HeroAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [frames, setFrames] = useState<string[]>([]);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const frameRef = useRef(0);

  // 1. Fetch the frame list from API
  useEffect(() => {
    fetch('/api/frames')
      .then(res => res.json())
      .then(data => {
        if (data.frames && data.frames.length > 0) {
          setFrames(data.frames);
        } else {
          setIsLoading(false); // No frames found
        }
      })
      .catch(() => setIsLoading(false));
  }, []);

  // 2. Preload all images once frame list is known
  useEffect(() => {
    if (frames.length === 0) return;

    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = new Array(frames.length);

    frames.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedImages[i] = img;
        loadedCount++;
        if (loadedCount === frames.length) {
          setImages(loadedImages);
          setIsLoading(false);
          // Draw first frame immediately
          requestAnimationFrame(() => {
             if (canvasRef.current && loadedImages[0]) {
                 const ctx = canvasRef.current.getContext('2d');
                 if (ctx) drawImageProp(ctx, loadedImages[0]);
             }
          });
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frames.length) {
          setImages(loadedImages);
          setIsLoading(false);
        }
      };
    });
  }, [frames]);

  // 3. Draw function using Canvas covering object-cover style
  const drawImageProp = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  };

  // 4. Scrub animation tied to Scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0 || !canvasRef.current) return;
    
    // Map scroll progress (0 to 1) to frame index (0 to images.length - 1)
    const frameIndex = Math.min(
      images.length - 1,
      Math.floor(latest * images.length)
    );
    
    // Only redraw if the frame actually changed
    if (frameIndex !== frameRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const currentImage = images[frameIndex];
      
      if (ctx && currentImage && currentImage.complete && currentImage.naturalWidth > 0) {
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
        if (images[Math.max(0, frameRef.current)]) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) drawImageProp(ctx, images[Math.max(0, frameRef.current)]);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  if (frames.length === 0 && !isLoading) return null;

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
