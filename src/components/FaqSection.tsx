import React, { useState } from 'react';
import { ChevronDown, MessageSquare, Phone, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'Consultation & Site Walkthrough',
    question: 'How does the initial site visit and consultation work?',
    answer:
      'CEO Muhammad Mubashir Ali and our senior project architect visit your residence or commercial plot in person. We evaluate load-bearing walls, natural sunlight patterns, conduct laser measurements, and discuss your lifestyle and aesthetic expectations. Within 48 hours, you receive a preliminary spatial strategy and scope brief.',
  },
  {
    category: 'Turnaround & Deadlines',
    question: 'What is the typical completion timeline for a luxury residence?',
    answer:
      'A dedicated room or master suite takes 3 to 5 weeks; an entire penthouse or executive apartment spans 6 to 10 weeks; while a complete 500–1000 Sq. Yd villa typically requires 10 to 14 weeks. We commit to strict milestone deadlines backed by contractual timeline assurances.',
  },
  {
    category: 'Material Warranty',
    question: 'What warranties are provided on woodwork, marble, and finishes?',
    answer:
      'The Ocean Interiors provides an official 5-Year Craftsmanship & Joinery Warranty on all custom wood paneling, wardrobes, and doors. Hardware (Blum, Hafele) carries extended manufacturer warranties of 10+ years, and all Italian and imported marble is sealed with anti-stain hydro-repellent coatings.',
  },
  {
    category: 'Payments & Billing',
    question: 'How are payments and project milestones structured?',
    answer:
      'We never demand large upfront sums. Payments are split into transparent milestones: 15% Initial 3D design & mobilization, 35% civil demolition & structural joinery framework, 30% surfaces, marble & ceiling installation, 15% custom furnishings delivery, and the final 5% is only settled after you personally sign off on the 100% snag-free handover.',
  },
  {
    category: 'Nationwide Projects',
    question: 'Do you take on projects outside Karachi (Lahore, Islamabad)?',
    answer:
      'Yes. While our headquarters and joinery facility are based in Karachi, our executive team regularly executes high-end residences in Lahore (DHA, Gulberg), Islamabad (F-6, F-7, F-8, Bani Gala), and Bahria Town developments nationwide. We mobilize dedicated on-site teams for continuous supervision.',
  },
  {
    category: 'Design-Only vs Turnkey',
    question: 'Can we hire The Ocean Interiors for 3D Architectural Design only?',
    answer:
      'Yes. If you already have dedicated contractors and merely require world-class spatial planning, we offer our comprehensive 3D Spatial Master Package. This includes photorealistic 4K renders, physical material moodboards, exact working CAD drawings, and complete MEP/electrical diagrams.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const whatsappUrl =
    'https://wa.me/923428156086?text=Hello%20CEO%20Muhammad%20Mubashir%20Ali,%20I%20have%20a%20question%20regarding%20The%20Ocean%20Interiors%20services';

  return (
    <section id="faq" className="py-20 lg:py-28 border-t border-[#DDD9D4] relative">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#B77958] block mb-2 font-mono">
          Clarity &amp; Transparency
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#171717] font-['Playfair_Display',serif]">
          Frequently Asked Questions
        </h2>
        {/* Bespoke Luxury Editorial Frame - Black Background with Warm Brown Typography */}
        <div className="mt-5 relative p-4.5 sm:p-5 rounded-2xl bg-[#141414] border border-[#C99168]/40 shadow-xl shadow-black/30 overflow-hidden text-left transition-all duration-300 hover:shadow-2xl hover:border-[#C99168]/60 group">
          {/* Architectural Drafting Corner Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C99168]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C99168]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C99168]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C99168]" />

          {/* Subtle luxury ambient glow */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#C99168]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Frame Top Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#C99168]/20">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C99168] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C99168] font-mono">
                Knowledge &amp; Process Guidance
              </span>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/15 text-[#E6B38A] font-bold border border-[#C99168]/30">
              Contractual Transparency
            </span>
          </div>

          <p className="text-sm sm:text-[14.5px] text-[#D8B494] leading-relaxed relative z-10 font-normal">
            Clear answers about our site visits, pricing, materials, warranty, and execution timelines before you begin your journey with <strong className="text-[#F5D5B8] font-bold font-['Playfair_Display',serif]">The Ocean Interiors</strong>.
          </p>

          <div className="mt-3 pt-2.5 border-t border-[#C99168]/20 flex items-center justify-between text-[11px] relative z-10">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
              <span className="font-semibold text-[#F5D5B8]">CEO Direct Helpline</span>
              <span className="text-[#A88060]">· 0342-8156086</span>
            </div>
            <span className="font-mono text-[10px] text-[#C99168] font-semibold tracking-wider uppercase">
              100% Transparent
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-lg border transition-all duration-200 overflow-hidden ${
                isOpen ? 'bg-[#F7F5F2] border-[#B77958]/50 shadow-xs' : 'bg-white border-[#DDD9D4] hover:border-[#171717]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#B77958] block font-mono mb-1">
                    {faq.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#171717] font-['Playfair_Display',serif]">
                    {faq.question}
                  </h3>
                </div>

                <div
                  className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen
                      ? 'bg-[#171717] text-white border-[#171717] rotate-180'
                      : 'bg-white text-[#6B6864] border-[#DDD9D4]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#6B6864] leading-relaxed border-t border-[#DDD9D4]/60 animate-fade-in">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CEO Direct Contact Help Card */}
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-[#171717] text-white rounded-lg flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C99168] font-mono block">
            Still Have Questions?
          </span>
          <h4 className="text-base font-bold font-['Playfair_Display',serif] text-white">
            Speak directly with CEO Muhammad Mubashir Ali
          </h4>
          <p className="text-xs text-[#DDD9D4] mt-1">
            Get instant personal consultation on WhatsApp or phone call anytime.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp (0342-8156086)</span>
          </a>

          <a
            href="tel:03232930657"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-full transition-colors cursor-pointer border border-white/20 font-mono"
          >
            <Phone className="w-3.5 h-3.5 text-[#C99168]" />
            <span>0323-2930657</span>
          </a>
        </div>
      </div>
    </section>
  );
};
