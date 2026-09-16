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
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Deliberately deferred to an effect: speechSynthesis is a browser-only
    // API, so this flag must start false on the server and flip to true only
    // after mount to avoid a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const s = window.speechSynthesis;
      setSynth(s);

      // Chrome loads voices asynchronously — getVoices() can return [] on the
      // very first call, so also listen for the voiceschanged event.
      const updateVoices = () => setVoices(s.getVoices());
      updateVoices();
      s.addEventListener('voiceschanged', updateVoices);

      return () => {
        s.removeEventListener('voiceschanged', updateVoices);
        s.cancel();
      };
    }
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
            : 'bg-white text-[#1A1A2E] shadow-md shadow-black/5 hover:bg-[#FFF0E0] border border-gray-200 hover:border-[#FF6B00]/40'
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
