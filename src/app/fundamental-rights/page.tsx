'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import AudioPlayer from '@/components/shared/AudioPlayer';
import { Scale, Users, Shield, HeartHandshake, BookOpen, GraduationCap } from 'lucide-react';

const AUDIO_TEXT = "Fundamental Rights are your unbreakable shield as an Indian citizen. There are six main fundamental rights guaranteed by the Constitution. First, the Right to Equality: Everyone is equal before the law, and there is no discrimination on grounds of religion, race, caste, sex or place of birth. Second, the Right to Freedom: Guaranteeing freedom of speech, expression, assembly, association, movement, residence, and profession. Third, the Right against Exploitation: Prohibiting human trafficking, forced labor, and child labor. Fourth, the Right to Freedom of Religion: The freedom to profess, practice, and propagate any religion freely. Fifth, Cultural & Educational Rights: Protecting the rights of minorities to conserve their culture and establish educational institutions. And finally, the Right to Constitutional Remedies: Known as the Heart and Soul of the Constitution, which allows you to approach the Supreme Court directly if any of your rights are violated.";

const RIGHTS = [
  {
    id: 1,
    name: 'Right to Equality',
    articles: 'Articles 14–18',
    color: '#0052CC',
    icon: <Scale size={48} />,
    desc: 'Everyone is equal before the law, and there is no discrimination on grounds of religion, race, caste, sex or place of birth.',
    example: 'You cannot be denied entry to a public park or restaurant based on your religion or caste.'
  },
  {
    id: 2,
    name: 'Right to Freedom',
    articles: 'Articles 19–22',
    color: '#FF6B00',
    icon: <Users size={48} />,
    desc: 'Freedom of speech, expression, assembly, association, movement, residence, and profession.',
    example: 'You have the right to peaceful protest and to start any lawful business of your choice.'
  },
  {
    id: 3,
    name: 'Right against Exploitation',
    articles: 'Articles 23–24',
    color: '#DE350B',
    icon: <Shield size={48} />,
    desc: 'Prohibits human trafficking, forced labor, and employment of children under 14 in hazardous jobs.',
    example: 'A factory owner cannot employ a 12-year-old child, and nobody can force you to work without pay.'
  },
  {
    id: 4,
    name: 'Right to Freedom of Religion',
    articles: 'Articles 25–28',
    color: '#138808',
    icon: <HeartHandshake size={48} />,
    desc: 'Freedom to profess, practice, and propagate any religion of your choice freely.',
    example: 'You can wear religious attire and celebrate your festivals without government interference.'
  },
  {
    id: 5,
    name: 'Cultural & Educational Rights',
    articles: 'Articles 29–30',
    color: '#5243AA',
    icon: <BookOpen size={48} />,
    desc: 'Protects the rights of minorities to conserve their language, script, and culture, and establish educational institutions.',
    example: 'A linguistic minority community can open their own school to teach in their mother tongue.'
  },
  {
    id: 6,
    name: 'Right to Constitutional Remedies',
    articles: 'Article 32',
    color: '#FFD700',
    icon: <GraduationCap size={48} />,
    desc: 'The "Heart and Soul" of the Constitution. Allows you to approach the Supreme Court if your rights are violated.',
    example: 'If you are illegally detained by the police, you can go to court to demand your release.'
  }
];

const SC_CASES = [
  { year: 1973, case: "Kesavananda Bharati", desc: "Basic Structure Doctrine established." },
  { year: 1978, case: "Maneka Gandhi", desc: "Expanded the scope of Right to Life (Article 21)." },
  { year: 2017, case: "Puttaswamy", desc: "Right to Privacy declared a fundamental right." },
  { year: 2018, case: "Navtej Singh Johar", desc: "Decriminalized homosexuality." }
];

const DETAILED_RIGHTS = [
  {
    category: "Right to Equality (Articles 14–18)",
    articles: [
      { article: "Article 14", title: "Equality before law", desc: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India." },
      { article: "Article 15", title: "Prohibition of discrimination", desc: "The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex or place of birth." },
      { article: "Article 16", title: "Equality of opportunity in public employment", desc: "There shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State." },
      { article: "Article 17", title: "Abolition of Untouchability", desc: "\"Untouchability\" is abolished and its practice in any form is forbidden." },
      { article: "Article 18", title: "Abolition of titles", desc: "No title, not being a military or academic distinction, shall be conferred by the State." }
    ]
  },
  {
    category: "Right to Freedom (Articles 19–22)",
    articles: [
      { article: "Article 19", title: "Protection of six rights", desc: "All citizens shall have the right to freedom of speech and expression, to assemble peaceably, to form associations, to move freely, to reside and settle in any part of India, and to practice any profession." },
      { article: "Article 20", title: "Protection in respect of conviction for offences", desc: "Protection against ex post facto laws, double jeopardy, and self-incrimination." },
      { article: "Article 21", title: "Protection of life and personal liberty", desc: "No person shall be deprived of his life or personal liberty except according to procedure established by law." },
      { article: "Article 21A", title: "Right to education", desc: "The State shall provide free and compulsory education to all children of the age of six to fourteen years." },
      { article: "Article 22", title: "Protection against arrest and detention", desc: "Provides rights to the arrested person including the right to be informed of grounds of arrest, right to consult a legal practitioner, and right to be produced before a magistrate within 24 hours." }
    ]
  },
  {
    category: "Right against Exploitation (Articles 23–24)",
    articles: [
      { article: "Article 23", title: "Prohibition of traffic in human beings and forced labour", desc: "Traffic in human beings and begar and other similar forms of forced labour are prohibited." },
      { article: "Article 24", title: "Prohibition of employment of children in factories", desc: "No child below the age of fourteen years shall be employed to work in any factory or mine or engaged in any other hazardous employment." }
    ]
  },
  {
    category: "Right to Freedom of Religion (Articles 25–28)",
    articles: [
      { article: "Article 25", title: "Freedom of conscience and free profession, practice and propagation of religion", desc: "All persons are equally entitled to freedom of conscience and the right freely to profess, practice and propagate religion." },
      { article: "Article 26", title: "Freedom to manage religious affairs", desc: "Every religious denomination or any section thereof shall have the right to establish and maintain institutions for religious and charitable purposes and to manage its own affairs." },
      { article: "Article 27", title: "Freedom as to payment of taxes for promotion of any particular religion", desc: "No person shall be compelled to pay any taxes, the proceeds of which are specifically appropriated in payment of expenses for the promotion or maintenance of any particular religion." },
      { article: "Article 28", title: "Freedom as to attendance at religious instruction", desc: "No religious instruction shall be provided in any educational institution wholly maintained out of State funds." }
    ]
  },
  {
    category: "Cultural and Educational Rights (Articles 29–30)",
    articles: [
      { article: "Article 29", title: "Protection of interests of minorities", desc: "Any section of the citizens residing in the territory of India or any part thereof having a distinct language, script or culture of its own shall have the right to conserve the same." },
      { article: "Article 30", title: "Right of minorities to establish and administer educational institutions", desc: "All minorities, whether based on religion or language, shall have the right to establish and administer educational institutions of their choice." }
    ]
  },
  {
    category: "Right to Constitutional Remedies (Article 32)",
    articles: [
      { article: "Article 32", title: "Remedies for enforcement of rights", desc: "The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed (writs like habeas corpus, mandamus, prohibition, quo warranto and certiorari)." }
    ]
  }
];

const OTHER_CONSTITUTIONAL_RIGHTS = [
  { article: "Article 300A", title: "Right to Property", desc: "No person shall be deprived of his property save by authority of law. (Originally a fundamental right, moved to a constitutional right by 44th Amendment in 1978)." },
  { article: "Article 326", title: "Right to Vote", desc: "Elections to the House of the People and to the Legislative Assemblies of States to be on the basis of adult suffrage (18 years of age)." },
  { article: "Article 301", title: "Freedom of Trade and Commerce", desc: "Trade, commerce and intercourse throughout the territory of India shall be free." }
];

export default function FundamentalRightsPage() {
  const [flipped, setFlipped] = useState<number | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <main className="bg-[#05050A] min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4rem)] font-bold text-white leading-none mb-4">
            Fundamental Rights
          </h1>
          <p className="font-[family-name:var(--font-sans)] text-white/60 text-lg mb-8">
            Your unbreakable shield as an Indian citizen
          </p>
          <AudioPlayer text={AUDIO_TEXT} />
        </div>

        {/* CSS 3D Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[1200px]">
          {RIGHTS.map((right) => (
            <div 
              key={right.id}
              className="relative w-full h-[350px] cursor-pointer group"
              style={{ perspective: '1200px' }}
              onClick={() => setFlipped(flipped === right.id ? null : right.id)}
            >
              <motion.div
                className="w-full h-full relative preserve-3d"
                initial={false}
                animate={{ rotateY: flipped === right.id ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* FRONT */}
                <div 
                  className="absolute inset-0 backface-hidden bg-white/5 backdrop-blur-md rounded-2xl shadow-lg shadow-black/20 border border-white/10 p-8 flex flex-col items-center justify-center text-center group-hover:border-white/30 transition-colors"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5" style={{ color: right.color }}>
                    {right.icon}
                  </div>
                  <span className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: right.color }}>
                    {right.articles}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white/90 mb-4 group-hover:text-white transition-colors">
                    {right.name}
                  </h3>
                  <div className="mt-auto px-4 py-2 bg-white/5 rounded-full text-xs font-semibold text-white/50 uppercase tracking-wide">
                    Tap to explore
                  </div>
                </div>

                {/* BACK */}
                <div 
                  className="absolute inset-0 backface-hidden rounded-2xl shadow-xl p-8 flex flex-col justify-center border border-white/10"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    transform: 'rotateY(180deg)',
                    backgroundColor: right.color,
                    color: right.id === 6 ? '#1A1A2E' : 'white'
                  }}
                >
                  <h4 className="font-[family-name:var(--font-display)] text-xl font-bold mb-4">Meaning</h4>
                  <p className="text-sm leading-relaxed mb-6 opacity-90">
                    {right.desc}
                  </p>
                  
                  <div className={`mt-auto p-4 rounded-xl border ${right.id === 6 ? 'bg-white/30 border-black/10' : 'bg-black/10 border-white/10'}`}>
                    <span className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Real Life Example</span>
                    <p className="text-sm italic">"{right.example}"</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Detailed Articles Section */}
        <div className="mt-32">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-4">
              Detailed Fundamental Rights
            </h2>
            <p className="font-[family-name:var(--font-sans)] text-white/60 max-w-2xl mx-auto">
              A comprehensive breakdown of all the specific articles that make up your fundamental rights under the Constitution.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {DETAILED_RIGHTS.map((section, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg shadow-black/20 border border-white/10 overflow-hidden">
                <button 
                  onClick={() => setExpandedCategory(expandedCategory === section.category ? null : section.category)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white/90">
                    {section.category}
                  </h3>
                  <div className={`text-white/60 transform transition-transform ${expandedCategory === section.category ? 'rotate-180' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
                
                {expandedCategory === section.category && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/10 bg-black/20">
                    <div className="grid gap-6 mt-4">
                      {section.articles.map((art, aIdx) => (
                        <div key={aIdx} className="flex flex-col md:flex-row gap-4 md:gap-6">
                          <div className="md:w-32 shrink-0">
                            <span className="inline-block px-3 py-1 bg-white/10 text-white/90 text-sm font-semibold rounded-lg border border-white/5">
                              {art.article}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-bold text-white/90 text-lg mb-2">{art.title}</h4>
                            <p className="text-white/60 leading-relaxed text-sm">{art.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Other Constitutional Rights */}
        <div className="mt-32">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-4">
              Other Constitutional Rights
            </h2>
            <p className="font-[family-name:var(--font-sans)] text-white/60 max-w-2xl mx-auto">
              Besides Fundamental Rights, the Constitution guarantees other important legal and constitutional rights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OTHER_CONSTITUTIONAL_RIGHTS.map((right, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-lg shadow-black/20 hover:border-white/30 transition-colors">
                <span className="inline-block px-3 py-1 bg-[#138808]/20 text-[#138808] border border-[#138808]/30 text-sm font-semibold rounded-lg mb-4">
                  {right.article}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white/90 mb-3">
                  {right.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {right.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline of Landmark Cases */}
        <div className="mt-32">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white mb-8 text-center">
            Landmark Supreme Court Cases
          </h2>
          
          <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar px-4 snap-x">
            {SC_CASES.map((sc, i) => (
              <div key={i} className="min-w-[280px] bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg shadow-black/20 border border-white/10 snap-start hover:border-white/30 transition-colors">
                <div className="text-[#FF6B00] font-bold text-2xl mb-2">{sc.year}</div>
                <h4 className="font-bold text-white/90 text-lg mb-2">{sc.case}</h4>
                <p className="text-sm text-white/60">{sc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
