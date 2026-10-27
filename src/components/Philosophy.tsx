import React, { useState } from 'react';
import { ArrowRight, Compass, Layers, Home, Sparkles } from 'lucide-react';

interface PhilosophyProps {
  onOpenConsultation: () => void;
}

export const Philosophy: React.FC<PhilosophyProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<'materials' | 'process' | 'sustainability'>('materials');

  const principles = [
    {
      number: '01',
      title: 'Considered Design',
      icon: Compass,
      description:
        'Every layout, proportion, and detail is chosen to support a more natural way of living. We eliminate visual noise so the room breathes with calm and effortless purpose.',
      detail: 'Tailored circulation, ergonomic furniture scale, and sightlines oriented toward natural light.'
    },
    {
      number: '02',
      title: 'Natural Materials',
      icon: Layers,
      description:
        'We work with warm timber, tactile fabrics, stone, and organic finishes to create depth and character that patinas gracefully over decades.',
      detail: 'European white oak, honed travertine, untreated slub linen, hand-thrown ceramics, and warm bronze.'
    },
    {
      number: '03',
      title: 'Personal Spaces',
      icon: Home,
      description:
        'Every project reflects the client’s lifestyle, priorities, and individual sense of home rather than an impersonal design showroom template.',
      detail: 'Co-created design briefs, bespoke millwork tailored to your rituals, and heirloom art integration.'
    }
  ];

  return (
    <section id="studio" className="w-full py-16 lg:py-24 border-t border-[#DDD9D4] scroll-mt-20">
      <div id="philosophy" className="scroll-mt-20" />
      {/* Editorial Header */}
      <div className="max-w-3xl mb-14 lg:mb-18">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B77958] block mb-3">
          The Studio &amp; Philosophy
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-[#171717] leading-[1.14] text-balance">
          A thoughtful approach to better living
        </h2>
        {/* Bespoke Luxury Editorial Frame - Black Background with Warm Brown Typography */}
        <div className="mt-5 relative p-5 sm:p-6 rounded-2xl bg-[#141414] border border-[#C99168]/40 shadow-xl shadow-black/30 overflow-hidden text-left transition-all duration-300 hover:shadow-2xl hover:border-[#C99168]/60 group">
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
                Foundational Studio Manifesto
              </span>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/15 text-[#E6B38A] font-bold border border-[#C99168]/30">
              Timeless Design
            </span>
          </div>

          <p className="text-sm sm:text-[14.5px] text-[#D8B494] leading-relaxed relative z-10 font-normal">
            <strong className="text-[#F5D5B8] font-bold font-['Playfair_Display',serif]">The Ocean Interiors</strong>, founded and led by CEO <strong className="text-[#E6B38A] font-semibold underline decoration-[#C99168]/50 underline-offset-2">Muhammad Mubashir Ali</strong>, is a luxury architectural interior design practice dedicated to calm, considered spaces. We believe exceptional interiors are not about following fleeting trends—they are about understanding how people live, creating spaces that work beautifully, and selecting organic materials that grow more meaningful with time.
          </p>

          <div className="mt-3 pt-2.5 border-t border-[#C99168]/20 flex items-center justify-between text-[11px] relative z-10">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
              <span className="font-semibold text-[#F5D5B8]">Organic Harmony</span>
              <span className="text-[#A88060]">· Enduring Materials</span>
            </div>
            <span className="font-mono text-[10px] text-[#C99168] font-semibold tracking-wider uppercase">
              Heirloom Quality
            </span>
          </div>
        </div>
      </div>

      {/* Three Design Principles in Clean Columns with Subtle Dividers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {principles.map((principle, index) => {
          return (
            <div
              key={principle.number}
              className={`flex flex-col justify-between pt-6 border-t border-[#DDD9D4] ${
                index !== 0 ? 'md:border-l md:border-t-0 md:border-[#DDD9D4] md:pl-8 lg:pl-12' : ''
              }`}
            >
              <div>
                <span className="text-sm font-mono text-[#B77958] font-medium tracking-wider">
                  {principle.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#171717] tracking-tight mt-2 font-['Playfair_Display',serif]">
                  {principle.title}
                </h3>
                <p className="text-sm text-[#6B6864] leading-relaxed mt-3">
                  {principle.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EEEAE5]">
                <p className="text-xs text-[#6B6864] italic">
                  <span className="font-medium not-italic text-[#171717]">Focus: </span>
                  {principle.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Studio Process & Materiality Deep Dive */}
      <div className="mt-16 lg:mt-20 bg-[#F7F5F2] rounded-sm p-8 sm:p-10 lg:p-12 border border-[#DDD9D4]/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B77958]">
              The Studio Standard
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight mt-2 font-['Playfair_Display',serif]">
              Craftsmanship rooted in restraint
            </h3>
            <p className="text-sm text-[#6B6864] leading-relaxed mt-3">
              We collaborate exclusively with master millworkers, bespoke stonemasons,
              and textile weavers who share our devotion to tactile integrity and enduring quality.
            </p>

            {/* Interactive Segmented Selector */}
            <div className="flex items-center gap-2 mt-6 p-1 bg-white rounded-md border border-[#DDD9D4] w-fit">
              <button
                type="button"
                onClick={() => setActiveTab('materials')}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors cursor-pointer ${
                  activeTab === 'materials'
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'text-[#6B6864] hover:text-[#171717]'
                }`}
              >
                Materiality
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('process')}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors cursor-pointer ${
                  activeTab === 'process'
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'text-[#6B6864] hover:text-[#171717]'
                }`}
              >
                Design Process
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sustainability')}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors cursor-pointer ${
                  activeTab === 'sustainability'
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'text-[#6B6864] hover:text-[#171717]'
                }`}
              >
                Longevity
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-sm border border-[#DDD9D4]">
            {activeTab === 'materials' && (
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#B77958] shrink-0 font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#171717]">FSC-Certified Timbers</h4>
                    <p className="text-xs sm:text-sm text-[#6B6864] mt-0.5">
                      European and American white oak, walnut, and ash sourced from responsibly managed forests, finished in low-VOC organic oils that honor the wood grain.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pt-3 border-t border-[#EEEAE5]">
                  <div className="w-8 h-8 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#B77958] shrink-0 font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#171717]">Honed Minerals &amp; Stones</h4>
                    <p className="text-xs sm:text-sm text-[#6B6864] mt-0.5">
                      Travertine, French limestone, and soft quartzite surfaces finished with tactile honed textures rather than cold, high-gloss synthetic polishes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pt-3 border-t border-[#EEEAE5]">
                  <div className="w-8 h-8 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#B77958] shrink-0 font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#171717]">Organic Fibers &amp; Woven Goods</h4>
                    <p className="text-xs sm:text-sm text-[#6B6864] mt-0.5">
                      Pure Belgian linen, unbleached wools, and organic cotton weaves providing breathable luxury and allergy-safe residential comfort.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'process' && (
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#B77958] shrink-0 font-bold text-xs">
                    A
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#171717]">1. Spatial Observation &amp; Discovery</h4>
                    <p className="text-xs sm:text-sm text-[#6B6864] mt-0.5">
                      We study how daylight moves through your home and document how your family gathers, unwinds, cooks, and works.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pt-3 border-t border-[#EEEAE5]">
                  <div className="w-8 h-8 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#B77958] shrink-0 font-bold text-xs">
                    B
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#171717]">2. Concept &amp; Material Synthesis</h4>
                    <p className="text-xs sm:text-sm text-[#6B6864] mt-0.5">
                      Development of custom moodboards, material sample trays, and scaled furniture plans that calibrate warmth and volume.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pt-3 border-t border-[#EEEAE5]">
                  <div className="w-8 h-8 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#B77958] shrink-0 font-bold text-xs">
                    C
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#171717]">3. Turnkey Execution &amp; Art Styling</h4>
                    <p className="text-xs sm:text-sm text-[#6B6864] mt-0.5">
                      Rigorous trade management followed by our white-glove styling reveal: freshly steamed linens, art hung, lighting tuned, and home prepared for living.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sustainability' && (
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#B77958] shrink-0 font-bold text-xs">
                    ★
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#171717]">Built to Last Generations</h4>
                    <p className="text-xs sm:text-sm text-[#6B6864] mt-0.5">
                      We reject fast-furniture and disposable decor. Every piece specified is heirloom grade, repairable, and crafted from honest solid materials.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pt-3 border-t border-[#EEEAE5]">
                  <div className="w-8 h-8 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#B77958] shrink-0 font-bold text-xs">
                    ★
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#171717]">Non-Toxic Indoor Air Quality</h4>
                    <p className="text-xs sm:text-sm text-[#6B6864] mt-0.5">
                      Zero-VOC wall paints, natural mineral plasters, and organic fiber fillings ensure your home promotes deep wellbeing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pt-3 border-t border-[#EEEAE5]">
                  <div className="w-8 h-8 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#B77958] shrink-0 font-bold text-xs">
                    ★
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#171717]">Support for Local Artisans</h4>
                    <p className="text-xs sm:text-sm text-[#6B6864] mt-0.5">
                      We champion regional ceramicists, woodturners, and weavers, keeping heritage craft traditions vibrant in contemporary living.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-[#EEEAE5] flex items-center justify-between">
              <span className="text-xs text-[#6B6864]">Have questions about materials or sourcing?</span>
              <button
                type="button"
                onClick={onOpenConsultation}
                className="text-xs font-semibold text-[#171717] hover:text-[#B77958] inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Ask our team</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
