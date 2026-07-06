'use client';

import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion } from 'framer-motion';
import { FileSignature, Settings2, ShieldAlert, FileText, ArrowRight } from 'lucide-react';

const MAJOR_AMENDMENTS = [
  {
    num: '1st',
    year: 1951,
    title: 'First Amendment',
    desc: 'Added the 9th Schedule to protect land reform laws from judicial review.'
  },
  {
    num: '42nd',
    year: 1976,
    title: 'Mini Constitution',
    desc: 'Added "Socialist", "Secular", and "Integrity" to Preamble. Added Fundamental Duties.'
  },
  {
    num: '44th',
    year: 1978,
    title: 'Restoring Balance',
    desc: 'Reversed many 42nd Amendment changes. Removed Right to Property from Fundamental Rights.'
  },
  {
    num: '73rd',
    year: 1992,
    title: 'Panchayati Raj',
    desc: 'Granted constitutional status to Panchayati Raj institutions (rural local government).'
  },
  {
    num: '86th',
    year: 2002,
    title: 'Right to Education',
    desc: 'Made free and compulsory education for children 6-14 a Fundamental Right (Article 21A).'
  },
  {
    num: '101st',
    year: 2016,
    title: 'GST',
    desc: 'Introduced the Goods and Services Tax (GST) system across India.'
  }
];

export default function AmendmentsPage() {
  return (
    <main className="bg-[#05050A] min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#00875A] font-bold tracking-widest uppercase text-sm mb-4 block">Part XX • Article 368</span>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-white leading-none mb-6">
            Constitutional Amendments
          </h1>
          <p className="font-[family-name:var(--font-sans)] text-white/60 text-lg max-w-3xl mx-auto">
            The Constitution is a living document. It can be amended to adapt to changing times, but its "Basic Structure" cannot be altered.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-lg shadow-black/20 border border-white/10 mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white mb-8 text-center">
            How is it amended?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-[#00875A]/20 rounded-full flex items-center justify-center text-[#00875A] border border-[#00875A]/30">
                <FileText size={32} />
              </div>
              <h3 className="font-bold text-lg text-white/90">Simple Majority</h3>
              <p className="text-sm text-white/60">For minor changes like naming a state. Requires majority of members present & voting.</p>
            </div>
            
            <div className="hidden md:flex items-center justify-center text-white/20">
              <ArrowRight size={32} />
            </div>

            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-[#FF8B00]/20 rounded-full flex items-center justify-center text-[#FF8B00] border border-[#FF8B00]/30">
                <Settings2 size={32} />
              </div>
              <h3 className="font-bold text-lg text-white/90">Special Majority</h3>
              <p className="text-sm text-white/60">For major changes like Fundamental Rights. Requires 2/3rd majority of members present & voting + majority of total membership.</p>
            </div>

            <div className="hidden md:flex items-center justify-center text-white/20">
              <ArrowRight size={32} />
            </div>

            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-[#DE350B]/20 rounded-full flex items-center justify-center text-[#DE350B] border border-[#DE350B]/30">
                <ShieldAlert size={32} />
              </div>
              <h3 className="font-bold text-lg text-white/90">Special + States</h3>
              <p className="text-sm text-white/60">For federal structure changes (like GST). Requires Special Majority PLUS ratification by half the states.</p>
            </div>
          </div>
        </div>

        {/* Major Amendments Timeline */}
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white mb-8 text-center">
          Landmark Amendments
        </h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {MAJOR_AMENDMENTS.map((amd, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg shadow-black/20 border border-white/10 hover:border-white/30 transition-colors"
            >
              <div className="flex-shrink-0 w-24 h-24 bg-[#00875A]/20 rounded-full flex flex-col items-center justify-center text-[#00875A] border border-[#00875A]/30">
                <span className="font-bold text-xl">{amd.num}</span>
                <span className="text-xs font-semibold">{amd.year}</span>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white/90 mb-2">{amd.title}</h3>
                <p className="text-white/60 leading-relaxed">{amd.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
