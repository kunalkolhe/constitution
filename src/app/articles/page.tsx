'use client';

import React, { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion } from 'framer-motion';
import { Search, BookOpen, Layers } from 'lucide-react';

const CONSTITUTION_PARTS = [
  { part: 'Part I', title: 'The Union and its Territory', articles: '1 to 4', desc: 'Defines India as a union of states and explains how new states can be formed.' },
  { part: 'Part II', title: 'Citizenship', articles: '5 to 11', desc: 'Explains who is considered a citizen of India and the rules of acquiring citizenship.' },
  { part: 'Part III', title: 'Fundamental Rights', articles: '12 to 35', desc: 'The basic human rights guaranteed to everyone (Equality, Freedom, Religion, etc.).' },
  { part: 'Part IV', title: 'Directive Principles', articles: '36 to 51', desc: 'Guidelines for the government to create laws that build a fair and just society.' },
  { part: 'Part IVA', title: 'Fundamental Duties', articles: '51A', desc: 'The 11 moral responsibilities of every Indian citizen.' },
  { part: 'Part V', title: 'The Union Government', articles: '52 to 151', desc: 'How the central government works (President, Prime Minister, Parliament, Supreme Court).' },
  { part: 'Part VI', title: 'The State Governments', articles: '152 to 237', desc: 'How state governments work (Governor, Chief Minister, State Legislature, High Courts).' },
  { part: 'Part VIII', title: 'The Union Territories', articles: '239 to 242', desc: 'How Union Territories (like Delhi, Chandigarh) are administered.' },
  { part: 'Part IX', title: 'The Panchayats', articles: '243 to 243O', desc: 'Rules for local village governance and rural local bodies.' },
  { part: 'Part IXA', title: 'The Municipalities', articles: '243P to 243ZG', desc: 'Rules for urban local governance (City Councils/Municipal Corporations).' },
  { part: 'Part IXB', title: 'Co-operative Societies', articles: '243ZH to 243ZT', desc: 'Rules for forming and running co-operative societies.' },
  { part: 'Part X', title: 'Scheduled and Tribal Areas', articles: '244 to 244A', desc: 'Special administration rules for designated tribal and scheduled areas.' },
  { part: 'Part XI', title: 'Union-State Relations', articles: '245 to 263', desc: 'How power and laws are divided and shared between the Central and State governments.' },
  { part: 'Part XII', title: 'Finance, Property, Contracts', articles: '264 to 300A', desc: 'Rules about taxes, government borrowing, and the Right to Property (300A).' },
  { part: 'Part XIII', title: 'Trade and Commerce', articles: '301 to 307', desc: 'Ensures free trade and commerce throughout the territory of India.' },
  { part: 'Part XIV', title: 'Services Under Union & States', articles: '308 to 323', desc: 'Rules for government jobs, civil services (IAS, IPS), and the UPSC.' },
  { part: 'Part XIVA', title: 'Tribunals', articles: '323A to 323B', desc: 'Special fast-track courts for specific disputes (like tax or administrative issues).' },
  { part: 'Part XV', title: 'Elections', articles: '324 to 329A', desc: 'The Election Commission and rules for conducting free and fair elections.' },
  { part: 'Part XVI', title: 'Special Provisions', articles: '330 to 342', desc: 'Reservations and special protections for SCs, STs, and Anglo-Indians.' },
  { part: 'Part XVII', title: 'Official Language', articles: '343 to 351', desc: 'Rules regarding the official languages of the Union and the States.' },
  { part: 'Part XVIII', title: 'Emergency Provisions', articles: '352 to 360', desc: 'Special powers granted to the President during war, rebellion, or financial crisis.' },
  { part: 'Part XIX', title: 'Miscellaneous', articles: '361 to 367', desc: 'Legal immunity for the President/Governors and definition of terms.' },
  { part: 'Part XX', title: 'Amendment of the Constitution', articles: '368', desc: 'The procedure for the Parliament to change or add to the Constitution.' },
  { part: 'Part XXI', title: 'Temporary & Special Provisions', articles: '369 to 392', desc: 'Transitional rules and special statuses for certain states (e.g., Article 371).' },
  { part: 'Part XXII', title: 'Short Title & Commencement', articles: '393 to 395', desc: 'The official name of the Constitution and the dates it came into effect.' },
];

const IMPORTANT_ARTICLES = [
  { art: "1", title: "Name and Territory", desc: "Declares 'India, that is Bharat, shall be a Union of States'." },
  { art: "14", title: "Equality Before Law", desc: "Everyone is equal in the eyes of the law, regardless of status." },
  { art: "15", title: "No Discrimination", desc: "Prohibits discrimination based on religion, race, caste, sex, or birthplace." },
  { art: "17", title: "Abolition of Untouchability", desc: "Makes the practice of untouchability illegal and punishable." },
  { art: "19", title: "Freedom of Speech", desc: "Guarantees 6 freedoms: speech, assembly, association, movement, residence, and profession." },
  { art: "21", title: "Right to Life & Liberty", desc: "No one can take away your life or personal liberty without following the law." },
  { art: "21A", title: "Right to Education", desc: "Free and compulsory education for all children aged 6 to 14." },
  { art: "25", title: "Freedom of Religion", desc: "Right to freely practice, profess, and propagate any religion." },
  { art: "32", title: "Constitutional Remedies", desc: "The 'Heart and Soul' of the Constitution. Allows you to approach the Supreme Court to protect your rights." },
  { art: "44", title: "Uniform Civil Code", desc: "A directive for the state to secure a uniform civil code for all citizens across India." },
  { art: "51A", title: "Fundamental Duties", desc: "The 11 moral obligations of Indian citizens (e.g., respecting the flag, protecting the environment)." },
  { art: "52", title: "The President", desc: "States that there shall be a President of India." },
  { art: "72", title: "Pardon Power", desc: "The President's power to grant pardons or reduce sentences of convicted persons." },
  { art: "74", title: "Council of Ministers", desc: "The Prime Minister and Cabinet will advise the President." },
  { art: "112", title: "The Budget", desc: "The Annual Financial Statement presented in Parliament." },
  { art: "124", title: "Supreme Court", desc: "Establishment and constitution of the Supreme Court of India." },
  { art: "153", title: "State Governors", desc: "States that there shall be a Governor for each state." },
  { art: "214", title: "High Courts", desc: "Provides that every state must have a High Court." },
  { art: "226", title: "High Court Writs", desc: "Power of High Courts to issue orders (writs) to protect fundamental rights." },
  { art: "243", title: "Panchayats", desc: "Establishes local self-government in rural areas." },
  { art: "280", title: "Finance Commission", desc: "Creates a commission to distribute tax revenues between the Union and States." },
  { art: "300A", title: "Right to Property", desc: "Nobody can seize your property illegally. (No longer a fundamental right, but a legal right)." },
  { art: "324", title: "Election Commission", desc: "Creates an independent body to conduct free and fair elections." },
  { art: "352", title: "National Emergency", desc: "Allows the President to declare an emergency during war or armed rebellion." },
  { art: "356", title: "President's Rule", desc: "Allows the Union government to take control of a state if its government fails." },
  { art: "360", title: "Financial Emergency", desc: "Can be declared if India's financial stability is threatened." },
  { art: "368", title: "Amending Power", desc: "The power of Parliament to change or add new things to the Constitution." },
];

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredArticles = IMPORTANT_ARTICLES.filter(a => 
    a.art.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-[#05050A] min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block p-4 rounded-2xl bg-white/5 border border-white/10 mb-6"
          >
            <BookOpen className="text-[#FF6B00]" size={48} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4rem)] font-bold text-white leading-none mb-4"
          >
            All 448 Articles
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-[family-name:var(--font-sans)] text-white/60 text-lg max-w-3xl mx-auto"
          >
            The Constitution is massive! To make it easy to understand, we've grouped the articles into their 25 Parts and provided a quick reference for the most important individual articles.
          </motion.p>
        </div>

        {/* Top Articles Search Section */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white mb-2">
                Top Important Articles
              </h2>
              <p className="text-white/60">Search for specific key articles in plain English.</p>
            </div>
            
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-white/40" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search by article number or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B00] transition-colors shadow-inner shadow-black/50"
              />
            </div>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map((art, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-colors shadow-lg shadow-black/20"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-[#138808]/20 text-[#138808] border border-[#138808]/30 font-bold rounded-lg text-sm">
                      Article {art.art}
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-white/90 truncate">
                      {art.title}
                    </h3>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {art.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-white/60">No articles found matching "{searchTerm}".</p>
            </div>
          )}
        </div>

        {/* 25 Parts Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white mb-2">
              The 25 Parts of the Constitution
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              The 448 articles are logically grouped into these 25 Parts. Here is what each Part covers in simple language.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONSTITUTION_PARTS.map((part, idx) => (
              <div key={idx} className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-[#0A0F5C]/40 border border-[#0A0F5C] flex items-center justify-center text-[#FF6B00]">
                    <Layers size={20} />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white group-hover:text-[#FF6B00] transition-colors">
                      {part.title}
                    </h3>
                    <span className="text-xs font-bold text-white/40 uppercase tracking-wider">
                      {part.part}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 font-mono mb-2">Articles {part.articles}</p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {part.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}
