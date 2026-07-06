import React from 'react';
import Image from 'next/image';
import LeaderCard from '@/components/history/LeaderCard';
import TimelineEvent from '@/components/history/TimelineEvent';
import EraGallery from '@/components/history/EraGallery';

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-[#05050A] pb-24">
      {/* PAGE HEADER (LAYOUT A) */}
      <section className="relative w-full h-[400px] overflow-hidden">
        <Image unoptimized 
          src="/images/assembly_16894906024..._imresizer_1765638363072.jpg"
          alt="Parliament of India building" 
          fill 
          style={{ objectFit: 'cover', objectPosition: 'center top' }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F5C]/60 to-[#0A0F5C]/85" />
        <div className="absolute bottom-12 left-0 right-0 px-6 text-center">
          <span className="inline-block px-3 py-1 bg-white/10 border border-[#FF6B00]/30 rounded-full text-white text-[0.7rem] font-bold tracking-[0.1em] mb-4 uppercase">
            Constitutional History
          </span>
          <h1 className="font-[family-name:var(--font-baloo-2)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white leading-tight mb-2">
            The Making of Our Constitution
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-base text-white/70 max-w-2xl mx-auto">
            2 years, 11 months, 18 days. 11 sessions. 166 days of debate.
          </p>
        </div>
      </section>

      {/* LEADER CARDS */}
      <section className="max-w-5xl mx-auto mt-16 mb-16 px-6">
        <h2 className="text-center font-[family-name:var(--font-baloo-2)] text-2xl font-bold text-white mb-8">
          The Architects of the Constitution
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-6 justify-start lg:justify-center px-4 snap-x hide-scrollbar">
          <LeaderCard 
            name="Dr. B.R. Ambedkar"
            role="Chairman, Drafting Committee"
            fact="Father of the Constitution"
            imageUrl="/images/Dr._Bhimrao_Ambedkar_imresizer_1765796371841.jpg"
          />
          <LeaderCard 
            name="Dr. Rajendra Prasad"
            role="President, Constituent Assembly"
            fact="First President of India"
            imageUrl="/images/330px-thumbnail_1765642131939.jpg"
          />
          <LeaderCard 
            name="Jawaharlal Nehru"
            role="Moved Objectives Resolution"
            fact="First Prime Minister"
            imageUrl="/images/1322351-cvc_1765642131941.webp"
          />
          <LeaderCard 
            name="Sardar Vallabhbhai Patel"
            role="Committee on Fundamental Rights"
            fact="Iron Man of India"
            imageUrl="/images/images_1765642131945.jpg"
          />
          <LeaderCard 
            name="B.N. Rau"
            role="Constitutional Adviser"
            fact="Drafted the initial framework"
            imageUrl=""
            initials="BNR"
          />
        </div>
      </section>

      {/* ORIGINAL PREAMBLE FEATURE */}
      <section className="bg-white/5 border-y border-white/10 backdrop-blur-md py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LAYOUT B Pattern Style */}
          <div className="rounded-xl overflow-hidden h-[400px] relative border-2 border-[#FFD700]/30">
            <Image unoptimized 
              src="/images/The_Constitution_of_..._imresizer_1765630728674.jpg"
              alt="Original handwritten and illustrated Preamble of the Constitution of India"
              fill 
              style={{ objectFit: 'contain', objectPosition: 'center' }}
              className="bg-amber-50/5" 
            />
            <p className="absolute bottom-4 left-0 right-0 text-center font-[family-name:var(--font-inter)] text-xs text-white/40 italic px-4 drop-shadow-md">
              Original Preamble — calligraphy by Prem Behari Narain Raizada.
            </p>
          </div>
          
          <div>
            <span className="inline-block px-3 py-1 bg-[#FF6B00]/20 text-[#FF6B00] rounded-full text-xs font-bold tracking-wider mb-4">
              THE ORIGINAL DOCUMENT
            </span>
            <h2 className="font-[family-name:var(--font-baloo-2)] text-3xl font-extrabold text-white mb-6">
              A Work of Art and Law
            </h2>
            <div className="space-y-4 font-[family-name:var(--font-inter)] text-base text-white/70 leading-[1.8]">
              <p>
                The Constitution of India is not just a legal document — it is a work of art. 
                Handwritten on parchment by calligrapher Prem Behari Narain Raizada, 
                and illustrated by Nandalal Bose and his team from Shantiniketan.
              </p>
              <p>
                The original manuscript consists of 234 pages, weighs 13 kg, 
                and was signed by 284 members of the Constituent Assembly on January 24, 1950.
              </p>
              <p>
                Today it is preserved in a special helium-filled case in the Parliament Library of India.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-8 mt-8">
              <div>
                <div className="font-[family-name:var(--font-baloo-2)] text-2xl font-extrabold text-[#FFD700]">234</div>
                <div className="font-[family-name:var(--font-inter)] text-xs text-white/50">Pages</div>
              </div>
              <div>
                <div className="font-[family-name:var(--font-baloo-2)] text-2xl font-extrabold text-[#FFD700]">13 kg</div>
                <div className="font-[family-name:var(--font-inter)] text-xs text-white/50">Weight</div>
              </div>
              <div>
                <div className="font-[family-name:var(--font-baloo-2)] text-2xl font-extrabold text-[#FFD700]">284</div>
                <div className="font-[family-name:var(--font-inter)] text-xs text-white/50">Signatories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="max-w-4xl mx-auto py-24 px-6 relative">
        <h2 className="text-center font-[family-name:var(--font-baloo-2)] text-3xl font-bold text-white mb-12">
          The Journey — 1946 to 1950
        </h2>
        
        {/* Center Line for Desktop */}
        <div className="hidden md:block absolute left-1/2 top-[150px] bottom-0 w-[2px] bg-[#FF6B00]/20 transform -translate-x-1/2"></div>
        {/* Center Line for Mobile */}
        <div className="md:hidden absolute left-[30px] top-[150px] bottom-0 w-[2px] bg-[#FF6B00]/20"></div>

        <TimelineEvent 
          isLeft={true}
          date="Dec 9, 1946"
          title="Constituent Assembly — First Meeting"
          description="207 members gathered in the Central Hall of Parliament. Dr. Sachchidananda Sinha became temporary chairman. Muslims League members boycotted."
          significance="The journey of 2 years 11 months 18 days had begun."
          imageUrl="/images/constituent-assembly_1765642131943.jpg"
        />

        <TimelineEvent 
          isLeft={false}
          date="Dec 11, 1946"
          title="Dr. Rajendra Prasad Elected President"
          description="Dr. Rajendra Prasad was unanimously elected as the permanent President of the Constituent Assembly."
          significance="Stable leadership established for the drafting process."
          imageUrl="/images/330px-thumbnail_1765642131939.jpg"
        />

        <TimelineEvent 
          isLeft={true}
          date="Dec 13, 1946"
          title="Nehru Moves the Objectives Resolution"
          description="Jawaharlal Nehru moved the Objectives Resolution — the philosophical and moral compass that would guide the entire Constitution."
          significance="This resolution later became the Preamble of the Constitution."
          imageUrl="/images/Jawaharlal_Nehru_signing_Indian_Constitution_1765642131946.jpg"
        />

        <TimelineEvent 
          isLeft={false}
          date="Aug 29, 1947"
          title="Drafting Committee Formed under Dr. Ambedkar"
          description="A 7-member Drafting Committee was formed with Dr. B.R. Ambedkar as Chairman. They would consider 7,635 amendments over 114 days."
          significance="The actual writing of the Constitution now began."
          imageUrl="/images/Dr._Bhimrao_Ambedkar_imresizer_1765796371841.jpg"
        />

        <TimelineEvent 
          isLeft={true}
          date="Nov 4, 1948"
          title="Draft Constitution Presented"
          description="Dr. Ambedkar presented the Draft Constitution with 315 articles and 8 schedules to the Constituent Assembly for its first reading."
          significance="Ambedkar's landmark speech: 'I am quite sure that the Constitution...'"
          imageUrl="/images/The_Constitution_of_..._imresizer_1765630728674.jpg"
        />

        <TimelineEvent 
          isLeft={false}
          date="Nov 26, 1949"
          title="Constitution Adopted — Constitution Day"
          description="After 166 days of debate and 2,473 amendments considered, the Constitution was adopted. 284 members signed the document."
          significance="November 26 is now celebrated as Constitution Day (Samvidhan Diwas)."
          imageUrl="/images/The_Constitution_of_..._imresizer_1765630728674.jpg"
        />

        <TimelineEvent 
          isLeft={true}
          date="Jan 24, 1950"
          title="Final Session — Dr. Prasad Elected President"
          description="The last session of the Constituent Assembly. Dr. Rajendra Prasad was elected as the first President of independent India."
          significance="Two days later, India would become a republic."
          imageUrl="/images/330px-thumbnail_1765642131939.jpg"
        />

        <TimelineEvent 
          isLeft={false}
          date="Jan 26, 1950"
          title="Republic Day — Constitution Comes Into Effect"
          description="India became a sovereign, democratic republic. The first Republic Day parade was held at Rajpath. The Constitution replaced the Government of India Act 1935."
          significance="Every January 26, India celebrates this as Republic Day."
          imageUrl="/images/republic_day_imresizer_1765630728674.jpg"
        />
      </section>
      <EraGallery />
    </main>
  );
}
