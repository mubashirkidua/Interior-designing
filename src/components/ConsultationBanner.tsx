import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ConsultationBannerProps {
  onOpenConsultation: () => void;
}

export const ConsultationBanner: React.FC<ConsultationBannerProps> = ({ onOpenConsultation }) => {
  return (
    <section className="w-full py-12 lg:py-16">
      <div className="relative w-full aspect-16/9 sm:aspect-21/9 min-h-[360px] sm:min-h-[420px] lg:min-h-[500px] rounded-sm overflow-hidden border border-[#DDD9D4] shadow-sm flex items-center justify-center text-center p-6 sm:p-10">
        {/* Background Architectural Photograph */}
        <img
          src="/assets/images/consultation_lounge_chairs_1792528338761.jpg"
          alt="Two sculptural terracotta and caramel lounge chairs beside a travertine table in a sunlit living space"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Soft Contrast Scrim ensuring WCAG AA readability for overlaid text */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[0.5px] pointer-events-none" />

        {/* Centered Content Matching Visual Reference */}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12] drop-shadow-sm font-['Playfair_Display',serif] text-balance">
            Let's shape a space that feels calm and lived-in
          </h2>

          {/* Bespoke Luxury Editorial Frame - Black Background with Warm Brown Typography */}
          <div className="mt-5 relative p-4.5 sm:p-5 rounded-2xl bg-[#141414]/95 border border-[#C99168]/50 shadow-2xl shadow-black/60 overflow-hidden text-center max-w-lg transition-all duration-300 hover:border-[#C99168]/70 group">
            {/* Architectural Drafting Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C99168]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C99168]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C99168]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C99168]" />

            {/* Subtle luxury ambient glow */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#C99168]/20 rounded-full blur-2xl pointer-events-none" />

            {/* Frame Top Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#C99168]/20">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C99168] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C99168] font-mono">
                  Personal Consultation
                </span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/15 text-[#E6B38A] font-bold border border-[#C99168]/30">
                Turnkey Discovery
              </span>
            </div>

            <p className="text-sm sm:text-[14.5px] text-[#D8B494] leading-relaxed relative z-10 font-normal">
              Tell us about your space, your ideas, and how you want to live.
              We'll help you shape the next step with intention.
            </p>

            <div className="mt-3 pt-2.5 border-t border-[#C99168]/20 flex items-center justify-between text-[11px] relative z-10">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
                <span className="font-semibold text-[#F5D5B8]">The Ocean Interiors</span>
                <span className="text-[#A88060]">· Bespoke Architecture</span>
              </div>
              <span className="font-mono text-[10px] text-[#C99168] font-semibold tracking-wider uppercase">
                Free Discovery Call
              </span>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="group inline-flex items-center gap-2 px-7 py-3 text-xs sm:text-sm font-semibold text-[#171717] bg-white rounded-full hover:bg-[#F7F5F2] hover:scale-102 transition-all duration-200 shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
