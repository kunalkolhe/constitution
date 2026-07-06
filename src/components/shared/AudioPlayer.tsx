'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, Square } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  text: string;
}

export default function AudioPlayer({ text }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSynth(window.speechSynthesis);
    }
    
    // Cleanup on unmount
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!synth) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
    } else {
      // Cancel any ongoing speech just in case
      synth.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Try to find a good English voice, prefer Indian English if available
      const voices = synth.getVoices();
      const preferredVoice = voices.find(v => v.lang === 'en-IN') || voices.find(v => v.lang.startsWith('en-')) || voices[0];
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.rate = 0.9; // Slightly slower for clear reading
      utterance.pitch = 1;
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      synth.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative inline-flex mb-8">
      {isPlaying && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-[#FF6B00]/20 rounded-full blur-xl pointer-events-none"
        />
      )}
      <button
        onClick={togglePlay}
        className={`relative flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all ${
          isPlaying 
            ? 'bg-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/30' 
            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10 hover:border-white/30'
        }`}
      >
        {isPlaying ? (
          <>
            <Square size={20} className="fill-current" />
            <span>Stop Listening</span>
          </>
        ) : (
          <>
            <Volume2 size={20} />
            <span>Listen to this page</span>
          </>
        )}
      </button>
    </div>
  );
}
