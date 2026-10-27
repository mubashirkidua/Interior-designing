import React from 'react';
import { ArrowRight, Compass, Box, Hammer, KeyRound, Check, Sparkles } from 'lucide-react';

interface ExecutionProcessProps {
  onConsult: (serviceOrProject?: string) => void;
}

const STEPS = [
  {
    step: '01',
    title: 'Site Laser Scan & Architectural Discovery',
    icon: Compass,
    duration: 'Week 1 – 2',
    description:
      'We visit your property for comprehensive digital measurements, assessing structural walls, natural lighting orientation, and conducting a deep-dive lifestyle interview with CEO Muhammad Mubashir Ali.',
    deliverables: [
      'Comprehensive 3D laser site survey',
      'Spatial layout options & flow diagrams',
      'Structural feasibility & MEP assessment',
    ],
  },
  {
    step: '02',
    title: '3D Spatial Modeling & Material Curation',
    icon: Box,
    duration: 'Week 2 – 4',
    description:
      'Our team crafts photorealistic 3D visual renders of every angle. You touch physical samples of fluted Italian walnut, Calacatta marble, and ocean velvet fabrics before a single nail is hammered.',
    deliverables: [
      'Photorealistic 4K 3D room renders',
      'Physical tactile materials moodboard',
      'Itemized transparent bill of quantities (BOQ)',
    ],
  },
  {
    step: '03',
    title: 'Precision Turnkey Execution & Craftsmanship',
    icon: Hammer,
    duration: 'Week 4 – 10',
    description:
      'Civil demolition, bespoke joinery fabrication in our dedicated workshop, recessed architectural lighting installation, and marble polishing managed under direct daily supervision.',
    deliverables: [
      'Dedicated on-site site supervisor',
      'Daily WhatsApp video & photo logs',
      'Strict dust-control & milestone inspections',
    ],
  },
  {
    step: '04',
    title: 'White-Glove Styling, Handover & 5-Yr Warranty',
    icon: KeyRound,
    duration: 'Week 10 – 12',
    description:
      'Custom furniture placement, art hanging, atmospheric scene programming, and industrial deep cleaning. You walk into a pristine sanctuary ready for living from day one.',
    deliverables: [
      'Turnkey keys handover with zero snags',
      'Comprehensive 5-Year Woodwork Warranty',
      'Post-handover care & maintenance guide',
    ],
  },
];

export const ExecutionProcess: React.FC<ExecutionProcessProps> = ({ onConsult }) => {
  return (
    <section id="process" className="py-20 lg:py-28 border-t border-[#DDD9D4] relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#B77958] block mb-2 font-mono">
            Methodology &amp; Discipline
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#171717] font-['Playfair_Display',serif]">
            Our 4-Step Turnkey Journey
          </h2>
          {/* Bespoke Luxury Editorial Frame - Black Background with Warm Brown Typography */}
          <div className="mt-4 relative p-4.5 sm:p-5 rounded-2xl bg-[#141414] border border-[#C99168]/40 shadow-xl shadow-black/30 overflow-hidden max-w-2xl transition-all duration-300 hover:shadow-2xl hover:border-[#C99168]/60 group">
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
                  Execution Discipline
                </span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/15 text-[#E6B38A] font-bold border border-[#C99168]/30">
                Turnkey Workflow
              </span>
            </div>

            <p className="text-sm sm:text-[14.5px] text-[#D8B494] leading-relaxed relative z-10 font-normal">
              From initial sketch to the moment you unlock your front door, here is how <strong className="text-[#F5D5B8] font-bold font-['Playfair_Display',serif]">The Ocean Interiors</strong> guarantees predictable timelines, flawless finish, and zero stress.
            </p>

            <div className="mt-3 pt-2.5 border-t border-[#C99168]/20 flex items-center justify-between text-[11px] relative z-10">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
                <span className="font-semibold text-[#F5D5B8]">CEO Direct Supervision</span>
                <span className="text-[#A88060]">· 4 Milestone Gates</span>
              </div>
              <span className="font-mono text-[10px] text-[#C99168] font-semibold tracking-wider uppercase">
                Guaranteed Delivery
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onConsult('Process Consultation')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] hover:bg-[#252321] text-white font-medium text-xs rounded-full transition-colors cursor-pointer shrink-0 self-start md:self-auto shadow-xs"
        >
          <span>Start Step 1 Today</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C99168]" />
        </button>
      </div>

      {/* 4-Step Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              className="p-6 bg-white rounded-lg border border-[#DDD9D4] hover:border-[#B77958] transition-all duration-300 shadow-xs flex flex-col justify-between group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold font-mono text-[#B77958] group-hover:scale-110 transition-transform">
                    {s.step}
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#F7F5F2] text-[#6B6864] border border-[#DDD9D4]">
                    {s.duration}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#F7F5F2] border border-[#DDD9D4] flex items-center justify-center text-[#171717] mb-4 group-hover:bg-[#171717] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5 text-[#B77958] group-hover:text-[#C99168]" />
                </div>

                <h3 className="text-base font-bold text-[#171717] font-['Playfair_Display',serif] mb-2 leading-snug">
                  {s.title}
                </h3>

                <p className="text-xs text-[#6B6864] leading-relaxed mb-4">
                  {s.description}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="pt-4 border-t border-[#EEEAE5] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#171717] font-mono block">
                  Key Deliverables:
                </span>
                <ul className="space-y-1.5 text-[11px] text-[#6B6864]">
                  {s.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#B77958] shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
