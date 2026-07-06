'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BookOpen, Shield, Building2, Compass, BrainCircuit, Map } from 'lucide-react';
import Link from 'next/link';

const CARDS = [
  {
    id: 1,
    icon: <BookOpen className="text-[#FF6B00]" size={32} />,
    color: '#FF6B00',
    badge: 'Start Here',
    badgeColor: 'bg-[#FF6B00] text-white',
    title: 'The Soul of India',
    description: '48 words that define who we are as a nation. The foundation of everything.',
    link: '/preamble',
  },
  {
    id: 2,
    icon: <Shield className="text-[#138808]" size={32} />,
    color: '#138808',
    badge: 'Articles 12–35',
    badgeColor: 'bg-[#138808]/10 text-[#138808]',
    title: 'Your Unbreakable Shield',
    description: '6 rights every citizen is guaranteed from birth. No one can take them away.',
    link: '/fundamental-rights',
  },
  {
    id: 3,
    icon: <Building2 className="text-[#0A0F5C]" size={32} />,
    color: '#0A0F5C',
    badge: 'Civics',
    badgeColor: 'bg-[#0A0F5C]/10 text-[#0A0F5C]',
    title: 'Who Does What',
    description: 'Legislature, Executive, Judiciary — the three pillars holding India together.',
    link: '/government',
  },
  {
    id: 4,
    icon: <Compass className="text-[#FFD700]" size={32} />,
    color: '#FFD700',
    badge: 'Articles 36–51',
    badgeColor: 'bg-[#FFD700]/20 text-[#0A0F5C]',
    title: "India's Moral Compass",
    description: 'The guidelines shaping a just, equal and progressive society.',
    link: '/directive-principles',
  },
  {
    id: 5,
    icon: <BrainCircuit className="text-[#FF6B00]" size={32} />,
    color: '#FF6B00',
    badge: 'Earn XP',
    badgeColor: 'bg-[#FF6B00] text-white animate-pulse-glow',
    title: 'Test Your Knowledge',
    description: '30 seconds per question. Can you beat the clock and earn your rank?',
    link: '/quiz',
  },
  {
    id: 6,
    icon: <Map className="text-[#138808]" size={32} />,
    color: '#138808',
    badge: 'Directory',
    badgeColor: 'bg-[#138808] text-white',
    title: 'Explore Topics',
    description: 'A complete directory of all constitutional concepts, amendments, and bodies.',
    link: '/explore',
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function FeatureCards() {
  return (
    <section className="py-24 md:py-32 px-4 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,4rem)] font-bold text-white leading-[1.2] tracking-[-0.03em] mb-4">
            Everything the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8C3A]">Constitution</span><br/>Has to Offer
          </h2>
          <p className="font-[family-name:var(--font-sans)] text-[1.1rem] text-white/60">
            From Preamble to Parliament — explore it all
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CARDS.map((card) => (
            <Link key={card.id} href={card.link}>
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-7 h-full flex flex-col border border-white/10 shadow-lg shadow-black/20 hover:border-white/30 hover:shadow-[#FF6B00]/10 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Subtle top border glow on hover based on card color */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: card.color, boxShadow: `0 0 10px ${card.color}` }}
                />
                
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    {card.icon}
                  </div>
                  <span className={`px-3 py-1 text-[0.75rem] font-semibold tracking-wider rounded-full ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>
                
                <h3 className="font-[family-name:var(--font-display)] font-bold text-2xl text-white/90 mb-3 group-hover:text-white transition-colors">
                  {card.title}
                </h3>
                
                <p className="font-[family-name:var(--font-sans)] text-white/60 leading-relaxed mt-auto group-hover:text-white/80 transition-colors">
                  {card.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
