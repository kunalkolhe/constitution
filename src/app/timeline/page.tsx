'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const EVENTS = [
  { 
    id: 1,
    year: '1928', 
    category: 'Pre-Independence', 
    title: 'The Nehru Report', 
    desc: 'The first major Indian effort to draft a constitutional framework for India, prepared by a committee led by Motilal Nehru. It demanded dominion status and fundamental rights for citizens.', 
    image: '/images/01-Historical-Backgr..._imresizer_1765630728668.jpg' 
  },
  { 
    id: 2,
    year: '1935', 
    category: 'Pre-Independence', 
    title: 'Government of India Act', 
    desc: 'Passed by the British Parliament, this act provided the basic structural framework for what would later become the Constitution of India, introducing provincial autonomy.', 
    image: '/images/indian-national-emblem-ashokas-lion-600nw-2534959015_1765795907622.webp' 
  },
  { 
    id: 3,
    year: '1946', 
    category: 'Drafting Era', 
    title: 'Cabinet Mission & Assembly', 
    desc: 'The Cabinet Mission Plan was formulated, leading to the creation of the Constituent Assembly — the elected body tasked with drafting India\'s Constitution.', 
    image: '/images/constituent-assembly_1765642131943.jpg' // User's existing image
  },
  { 
    id: 4,
    year: '1946', 
    category: 'Drafting Era', 
    title: 'Objective Resolution', 
    desc: 'On December 13, Jawaharlal Nehru moved the historic "Objective Resolution", laying down the underlying principles and philosophy that would guide the drafting process.', 
    image: '/images/Jawaharlal_Nehru_signing_Indian_Constitution_1765642131946.jpg' 
  },
  { 
    id: 5,
    year: '1947', 
    category: 'Drafting Era', 
    title: 'Drafting Committee Formed', 
    desc: 'Following Independence on August 15, the Assembly appointed a Drafting Committee on August 29, with Dr. B.R. Ambedkar as its Chairman.', 
    image: '/images/Dr._Bhimrao_Ambedkar_imresizer_1765796371841.jpg' 
  },
  { 
    id: 6,
    year: '1948', 
    category: 'Drafting Era', 
    title: 'First Draft Published', 
    desc: 'The first draft of the Constitution was published in February. The people of India were given 8 months to discuss the draft and propose amendments.', 
    image: '/images/1322351-cvc_1765642131941.webp' 
  },
  { 
    id: 7,
    year: '1949', 
    category: 'Drafting Era', 
    title: 'Constitution Adopted', 
    desc: 'After 2 years, 11 months, and 18 days of rigorous debate, the Constituent Assembly officially adopted the Constitution on November 26 (now celebrated as Constitution Day).', 
    image: '/images/The_Constitution_of_..._imresizer_1765630728674.jpg' 
  },
  { 
    id: 8,
    year: '1950', 
    category: 'Post-1950', 
    title: 'Republic of India', 
    desc: 'On January 26, the Constitution came into legal force. India officially transformed from a dominion into a fully sovereign, democratic republic.', 
    image: '/images/republic_day_imresizer_1765630728674.jpg' 
  },
  { 
    id: 9,
    year: '1951', 
    category: 'Post-1950', 
    title: 'The First Amendment', 
    desc: 'The very first amendment was passed to overcome judicial decisions regarding fundamental rights, notably adding the Ninth Schedule to protect land reform laws.', 
    image: '/images/assembly_16894906024..._imresizer_1765638363072.jpg' 
  },
  { 
    id: 10,
    year: '1973', 
    category: 'Post-1950', 
    title: 'Kesavananda Bharati Case', 
    desc: 'A landmark Supreme Court judgment ruled that Parliament cannot alter the "Basic Structure" of the Constitution, safeguarding its core democratic principles forever.', 
    image: '/images/330px-thumbnail_1765642131939.jpg' 
  },
  { 
    id: 11,
    year: '1976', 
    category: 'Post-1950', 
    title: 'The "Mini Constitution"', 
    desc: 'The 42nd Amendment, passed during the Emergency, brought massive changes, including adding "Socialist" and "Secular" to the Preamble, and introducing Fundamental Duties.', 
    image: '/images/CONSTITUTIONOFINDIA_imresizer_1765630728670.jpg' 
  },
  { 
    id: 12,
    year: '1978', 
    category: 'Post-1950', 
    title: '44th Amendment', 
    desc: 'Passed to reverse many distortions introduced during the Emergency. Crucially, it removed the "Right to Property" from the list of Fundamental Rights.', 
    image: '/images/unnamed_1765642131947.jpg' 
  },
  { 
    id: 13,
    year: '1992', 
    category: 'Post-1950', 
    title: 'Panchayati Raj (73rd & 74th)', 
    desc: 'These twin amendments formalized local self-governance in rural and urban areas, adding the 11th and 12th schedules and drastically decentralizing power.', 
    image: '/images/istockphoto-12970420..._imresizer_1765630728673.jpg' 
  },
  { 
    id: 14,
    year: '2002', 
    category: 'Recent', 
    title: 'Right to Education', 
    desc: 'The 86th Amendment made elementary education a Fundamental Right for children aged 6 to 14 years under the newly created Article 21A.', 
    image: '/images/images_1765642131945.jpg' 
  },
  { 
    id: 15,
    year: '2017', 
    category: 'Recent', 
    title: 'GST Implementation', 
    desc: 'The 101st Amendment revolutionized India\'s indirect tax structure by introducing the Goods and Services Tax, unifying the nation into a single market.', 
    image: '/images/deccanherald_import_..._imresizer_1765630728671.jpg' 
  },
  { 
    id: 16,
    year: '2023', 
    category: 'Recent', 
    title: 'Nari Shakti Vandan Adhiniyam', 
    desc: 'The 106th Amendment reserved one-third of all seats in the Lok Sabha and State Legislative Assemblies for women, a massive leap for political equality.', 
    image: '/images/Untitled-design-2024-11-25T174542.626-2024-11-41f5c01ab135453_1765642131948.avif' 
  }
];

const CATEGORIES = ['All', 'Pre-Independence', 'Drafting Era', 'Post-1950', 'Recent'];

function TimelineCard({ event, setActiveEvent }: { event: typeof EVENTS[0], setActiveEvent: (e: typeof EVENTS[0]) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveEvent(event);
    }
  }, [isInView, event, setActiveEvent]);

  return (
    <div ref={ref} className="min-h-[70vh] flex flex-col justify-center py-12 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-black/5 border border-gray-100 transition-all duration-700 ${isInView ? 'scale-100 opacity-100' : 'scale-95 opacity-50'}`}
      >
        <div className="md:hidden text-[#FF6B00] font-black text-4xl font-[family-name:var(--font-display)] mb-4">
          {event.year}
        </div>
        
        {event.image && (
          <div className="relative w-full aspect-[4/3] mb-8 rounded-2xl overflow-hidden bg-gray-100 group">
            <Image unoptimized 
              src={event.image} 
              alt={event.title} 
              fill 
              className={`object-cover transition-all duration-1000 ${isInView ? 'grayscale-0 scale-100' : 'grayscale-[80%] scale-105'}`}
              onError={(e) => {
                e.currentTarget.style.display = 'none'; // Fallback if image breaks
              }}
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )}
        
        <span className="inline-block mb-4 text-xs font-bold text-[#FF6B00] uppercase tracking-[0.2em] bg-[#FF6B00]/10 px-3 py-1.5 rounded-full">
          {event.category}
        </span>
        <h3 className="font-bold text-[#1A1A2E] text-2xl md:text-3xl mb-4 font-[family-name:var(--font-display)] leading-tight">
          {event.title}
        </h3>
        <p className="text-[#1A1A2E]/70 text-lg font-[family-name:var(--font-sans)] leading-relaxed">
          {event.desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function TimelinePage() {
  const [filter, setFilter] = useState('All');
  const [activeEvent, setActiveEvent] = useState(EVENTS[0]);

  const filteredEvents = EVENTS.filter(e => filter === 'All' || e.category === filter);

  // When filter changes, reset active event to first of that filter
  useEffect(() => {
    if (filteredEvents.length > 0) {
      setActiveEvent(filteredEvents[0]);
    }
  }, [filter]);

  return (
    <main className="bg-[#FFF8F0] min-h-screen relative selection:bg-[#FF6B00] selection:text-white">
      <Navbar />
      
      {/* Header Section */}
      <div className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,5rem)] font-bold text-[#1A1A2E] leading-none mb-6 tracking-tight">
          The Great <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#DE350B]">Journey</span>
        </h1>
        <p className="font-[family-name:var(--font-sans)] text-[rgba(26,26,46,0.6)] text-lg md:text-xl max-w-2xl mx-auto mb-12">
          From a colony demanding rights to a sovereign republic. Scroll down to witness the monumental moments that built the Indian Constitution.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                filter === cat 
                  ? 'bg-[#1A1A2E] text-white shadow-lg scale-105' 
                  : 'bg-white text-[#1A1A2E]/60 border border-gray-200 hover:border-[#1A1A2E] hover:text-[#1A1A2E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Sticky Timeline Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        <div className="flex flex-col md:flex-row relative">
          
          {/* LEFT: Sticky Active Year (Desktop Only) */}
          <div className="hidden md:block w-1/2 relative">
            <div className="sticky top-[30vh] h-[40vh] flex flex-col justify-center pr-16 border-r-2 border-gray-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEvent.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="pl-8"
                >
                  <div className="text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#1A1A2E] to-[#1A1A2E]/5 leading-none tracking-tighter mb-4 -ml-4">
                    {activeEvent.year}
                  </div>
                  <h2 className="text-3xl font-bold text-[#FF6B00] font-[family-name:var(--font-display)] leading-tight">
                    {activeEvent.title}
                  </h2>
                  <div className="w-12 h-2 bg-[#FF6B00] rounded-full mt-6" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Scrolling Cards */}
          <div className="w-full md:w-1/2 md:pl-16">
            {filteredEvents.length > 0 ? (
              <div className="flex flex-col">
                {filteredEvents.map((event) => (
                  <TimelineCard key={event.id} event={event} setActiveEvent={setActiveEvent} />
                ))}
              </div>
            ) : (
              <div className="min-h-[50vh] flex items-center justify-center text-[#1A1A2E]/50 font-medium">
                No events found for this era.
              </div>
            )}
          </div>
          
        </div>
      </div>

      <Footer />
    </main>
  );
}
