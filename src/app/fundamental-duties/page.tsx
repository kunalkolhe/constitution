'use client';

import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion } from 'framer-motion';
import { Flag, Shield, BookOpen, Users, Leaf, Lightbulb, Zap, Star, HeartHandshake, Building2, GraduationCap } from 'lucide-react';

const DUTIES = [
  { icon: <BookOpen />, text: "Abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem." },
  { icon: <HeartHandshake />, text: "Cherish and follow the noble ideals which inspired our national struggle for freedom." },
  { icon: <Shield />, text: "Uphold and protect the sovereignty, unity and integrity of India." },
  { icon: <Flag />, text: "Defend the country and render national service when called upon to do so." },
  { icon: <Users />, text: "Promote harmony and the spirit of common brotherhood amongst all people of India." },
  { icon: <Star />, text: "Value and preserve the rich heritage of our composite culture." },
  { icon: <Leaf />, text: "Protect and improve the natural environment including forests, lakes, rivers and wild life." },
  { icon: <Lightbulb />, text: "Develop the scientific temper, humanism and the spirit of inquiry and reform." },
  { icon: <Building2 />, text: "Safeguard public property and abjure violence." },
  { icon: <Zap />, text: "Strive towards excellence in all spheres of individual and collective activity." },
  { icon: <GraduationCap />, text: "Provide opportunities for education to his child or ward between the age of six and fourteen years." }
];

export default function FundamentalDutiesPage() {
  return (
    <main className="bg-[#05050A] min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#DE350B] font-bold tracking-widest uppercase text-sm mb-4 block">Part IVA • Article 51A</span>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-white leading-none mb-6">
            Fundamental Duties
          </h1>
          <p className="font-[family-name:var(--font-sans)] text-white/60 text-lg max-w-3xl mx-auto">
            Added by the 42nd Amendment in 1976 (and one more in 2002), these are the moral obligations of all citizens to help promote a spirit of patriotism and to uphold the unity of India. They serve as a reminder that rights come with responsibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUTIES.map((duty, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg shadow-black/20 border border-white/10 flex flex-col items-center text-center gap-4 hover:shadow-xl hover:border-white/30 transition-all"
            >
              <div className="p-4 bg-[#DE350B]/20 text-[#DE350B] rounded-full border border-[#DE350B]/30">
                {duty.icon}
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/5 flex items-center justify-center font-bold text-white/50 text-sm mb-2">
                {String.fromCharCode(97 + i)}
              </div>
              <p className="text-white/80 font-medium">
                {duty.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
