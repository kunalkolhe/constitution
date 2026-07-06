'use client';

import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Shield, HeartHandshake, FileText, AlertTriangle, Building2, BrainCircuit, Flag, Gavel, Scale, FileSignature, Layers, Globe, Map } from 'lucide-react';

const TOPICS = [
  {
    title: 'Directive Principles',
    desc: 'Guidelines for the government to frame laws and policies.',
    icon: <HeartHandshake className="text-[#0A0F5C]" size={32} />,
    color: '#0A0F5C',
    link: '/directive-principles',
    part: 'Part IV'
  },
  {
    title: 'Fundamental Duties',
    desc: 'Moral obligations of all citizens to help promote patriotism.',
    icon: <Flag className="text-[#DE350B]" size={32} />,
    color: '#DE350B',
    link: '/fundamental-duties',
    part: 'Part IVA'
  },
  {
    title: 'Government Structure',
    desc: 'The three pillars: Legislature, Executive, and Judiciary.',
    icon: <Building2 className="text-[#5243AA]" size={32} />,
    color: '#5243AA',
    link: '/government',
    part: 'Part V & VI'
  },
  {
    title: 'Emergency Provisions',
    desc: 'Special powers during war, armed rebellion, or financial crisis.',
    icon: <AlertTriangle className="text-[#E3A300]" size={32} />,
    color: '#E3A300',
    link: '/emergency-provisions',
    part: 'Part XVIII'
  },
  {
    title: 'Amendments',
    desc: 'How the Constitution is modified and landmark changes.',
    icon: <FileSignature className="text-[#00875A]" size={32} />,
    color: '#00875A',
    link: '/amendments',
    part: 'Part XX'
  },
  {
    title: 'States & Union Territories',
    desc: 'Explore the constitutional details of all 28 States and 8 UTs.',
    icon: <Map className="text-[#00B8D9]" size={32} />,
    color: '#00B8D9',
    link: '/states',
    part: 'Geography'
  },
  {
    title: 'Glossary',
    desc: 'A-Z dictionary of constitutional and legal terms.',
    icon: <FileText className="text-[#FF8B00]" size={32} />,
    color: '#FF8B00',
    link: '/glossary',
    part: 'Reference'
  },
  {
    title: 'All 448 Articles',
    desc: 'The complete list of all 25 parts and important articles simplified.',
    icon: <Scale className="text-[#E83E8C]" size={32} />,
    color: '#E83E8C',
    link: '/articles',
    part: 'Complete Guide'
  },
  {
    title: 'Resources & Links',
    desc: 'Important external links to government portals, Wikipedia, and videos.',
    icon: <Globe className="text-[#9C27B0]" size={32} />,
    color: '#9C27B0',
    link: '/resources',
    part: 'External'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' } }
};

export default function ExplorePage() {
  return (
    <main className="bg-[#05050A] min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4rem)] font-bold text-white leading-none mb-4"
          >
            Explore the Constitution
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-sans)] text-white/60 text-lg max-w-2xl mx-auto"
          >
            Navigate through the various parts, provisions, and principles that make up the supreme law of India.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TOPICS.map((topic, i) => (
            <Link key={i} href={topic.link}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg shadow-black/20 border border-white/10 hover:border-white/30 transition-all duration-300 h-full flex flex-col group relative overflow-hidden"
              >
                <div 
                  className="absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: topic.color, boxShadow: `0 0 10px ${topic.color}` }}
                />
                
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    {topic.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white/70">
                    {topic.part}
                  </span>
                </div>
                
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white/90 mb-3 group-hover:text-white transition-colors">
                  {topic.title}
                </h3>
                
                <p className="font-[family-name:var(--font-sans)] text-white/60 mb-4 flex-grow group-hover:text-white/80 transition-colors">
                  {topic.desc}
                </p>
                
                <div className="text-sm font-semibold flex items-center gap-2 mt-auto" style={{ color: topic.color }}>
                  Read more 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
