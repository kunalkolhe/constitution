'use client';

import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion } from 'framer-motion';
import { ExternalLink, PlayCircle, Book, Landmark } from 'lucide-react';

const RESOURCES = [
  {
    category: "Official Government Links",
    icon: <Landmark className="text-[#0A0F5C]" size={28} />,
    color: "#0A0F5C",
    links: [
      {
        title: "Legislative Department - Constitution of India",
        desc: "The official unamended and amended versions of the Constitution directly from the Government of India.",
        url: "https://legislative.gov.in/constitution-of-india/"
      },
      {
        title: "Supreme Court of India",
        desc: "Official website of the apex judicial body of India.",
        url: "https://main.sci.gov.in/"
      },
      {
        title: "Parliament of India (Lok Sabha & Rajya Sabha)",
        desc: "Track parliamentary debates, passed bills, and member details.",
        url: "https://sansad.in/"
      }
    ]
  },
  {
    category: "Educational Videos & Documentaries",
    icon: <PlayCircle className="text-[#FF0000]" size={28} />,
    color: "#FF0000",
    links: [
      {
        title: "Samvidhaan - The Making of the Constitution of India",
        desc: "A 10-part television series directed by Shyam Benegal detailing the framing of the Constitution.",
        url: "https://www.youtube.com/watch?v=0U9KDQnIsNk&list=PL6b_n1W_Y_Y7_1CqMv6yC9sM1y_0m0r_t" 
      },
      {
        title: "Rajya Sabha TV Documentaries",
        desc: "Insightful documentaries on fundamental rights, duties, and historic parliamentary moments.",
        url: "https://www.youtube.com/c/sansadtv"
      }
    ]
  },
  {
    category: "Reference Materials",
    icon: <Book className="text-[#00875A]" size={28} />,
    color: "#00875A",
    links: [
      {
        title: "Constitution of India - Wikipedia",
        desc: "A comprehensive community-driven overview of the Constitution's history, structure, and amendments.",
        url: "https://en.wikipedia.org/wiki/Constitution_of_India"
      },
      {
        title: "Constituent Assembly Debates (CAD)",
        desc: "Read the exact transcripts of the debates that took place between 1946 and 1950.",
        url: "https://www.constitutionofindia.net/constituent_assembly_debates"
      }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' } }
};

export default function ResourcesPage() {
  return (
    <main className="bg-[#05050A] min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4rem)] font-bold text-white leading-none mb-4"
          >
            Resources & Links
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-sans)] text-white/60 text-lg max-w-2xl mx-auto"
          >
            Dive deeper into the Indian Constitution with these official documents, documentaries, and community resources.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-12"
        >
          {RESOURCES.map((section, idx) => (
            <div key={idx}>
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  {section.icon}
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white/90">
                  {section.category}
                </h2>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.links.map((link, linkIdx) => (
                  <motion.a
                    key={linkIdx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg shadow-black/20 border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col group relative overflow-hidden"
                  >
                    <div 
                      className="absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: section.color, boxShadow: `0 0 10px ${section.color}` }}
                    />
                    
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white/90 group-hover:text-white transition-colors pr-6">
                        {link.title}
                      </h3>
                      <ExternalLink className="text-white/40 group-hover:text-white transition-colors flex-shrink-0" size={20} />
                    </div>
                    
                    <p className="font-[family-name:var(--font-sans)] text-white/60 text-sm leading-relaxed mb-4 flex-grow">
                      {link.desc}
                    </p>
                    
                    <div className="text-sm font-semibold flex items-center gap-2 mt-auto text-white/40 group-hover:text-white/80 transition-colors">
                      Visit site
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
