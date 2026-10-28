import React, { useState } from 'react';
import { Box, Sparkles, Image as ImageIcon, Calculator } from 'lucide-react';
import { SpatialRoom3D } from './SpatialRoom3D';

interface HeroProps {
  onExploreProjects: () => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onOpenConsultation }) => {
  const [heroMode, setHeroMode] = useState<'photo' | '3d'>('photo');

  return (
    <section id="home" className="w-full pt-6 pb-16 lg:pt-10 lg:pb-24">
      {/* Top Introductory Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-10 lg:mb-14">
        {/* Left Headline */}
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#B77958] font-bold">
              The Ocean Interiors · Architecture &amp; Design
            </span>
            <span className="text-neutral-300">|</span>
            <span className="text-[10px] font-mono text-[#6B6864] uppercase tracking-wider">
              24°48&apos;N 67°02&apos;E · Turnkey Studio
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-bold tracking-tight text-[#171717] leading-[1.06] text-balance font-['Playfair_Display',serif]">
            Crafting calm, balanced interiors
          </h1>

          {/* Luxury Architectural Studio Editorial Tagline */}
          <div className="mt-5 pt-4 border-t border-[#DDD9D4]/80">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B77958]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] font-bold text-[#8A5B3D]">
                Pakistan&apos;s Premier Luxury Interior Studio
              </span>
            </div>
            <p className="text-base sm:text-lg font-bold text-[#171717] leading-snug tracking-tight font-['Playfair_Display',serif]">
              The Ocean Interiors — Pakistan&apos;s Foremost Luxury Interior &amp; Turnkey Design Studio
            </p>
            <p className="text-xs sm:text-sm text-[#6B6864] mt-1.5 leading-relaxed max-w-xl">
              Bespoke custom residential &amp; turnkey architectural design for Karachi, Lahore, Islamabad, and overseas patrons worldwide.
            </p>

            {/* Micro Architectural Trust Metric Bar */}
            <div className="mt-4 grid grid-cols-3 gap-3 pt-3 border-t border-[#DDD9D4]/50 max-w-lg">
              <div>
                <span className="block font-mono text-xs sm:text-sm font-bold text-[#171717]">120+</span>
                <span className="text-[10px] text-[#6B6864] uppercase tracking-wider block">Completed Sites</span>
              </div>
              <div>
                <span className="block font-mono text-xs sm:text-sm font-bold text-[#171717]">100%</span>
                <span className="text-[10px] text-[#6B6864] uppercase tracking-wider block">Turnkey Handover</span>
              </div>
              <div>
                <span className="block font-mono text-xs sm:text-sm font-bold text-[#B77958]">Direct CEO</span>
                <span className="text-[10px] text-[#6B6864] uppercase tracking-wider block">Site Supervision</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Supporting Copy in Bespoke Luxury Architectural Frame & Mode Toggle */}
        <div className="lg:col-span-5 lg:pt-1 flex flex-col justify-between gap-4">
          {/* Bespoke Luxury Editorial Frame - Black Background with Warm Brown Typography */}
          <div className="relative p-5 sm:p-6 rounded-2xl bg-[#141414] border border-[#C99168]/40 shadow-xl shadow-black/30 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-[#C99168]/60">
            {/* Architectural Drafting Corner Accents in Warm Bronze Brown */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C99168]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C99168]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C99168]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C99168]" />

            {/* Subtle luxury ambient glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#C99168]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Frame Top Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#C99168]/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C99168] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C99168] font-mono">
                  Studio Statement &amp; Vision
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/15 text-[#E6B38A] font-bold border border-[#C99168]/30">
                Official
              </span>
            </div>

            {/* The Text in Warm Brown tones on Black */}
            <p className="text-sm sm:text-[14.5px] text-[#D8B494] leading-relaxed relative z-10 font-normal">
              Welcome to <strong className="text-[#F5D5B8] font-bold font-['Playfair_Display',serif] text-base tracking-tight">The Ocean Interiors</strong>. Founded and led by CEO <strong className="text-[#E6B38A] font-semibold underline decoration-[#C99168]/60 underline-offset-2">Muhammad Mubashir Ali</strong>, our studio creates calm, sophisticated residential interiors inspired by the fluid harmony of nature, tactile organic materials, and refined architectural balance.
            </p>

            {/* Bottom Leadership Signature & Attribution in Brown */}
            <div className="mt-3.5 pt-3 border-t border-[#C99168]/20 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
                <span className="font-semibold text-[#F5D5B8]">Muhammad Mubashir Ali</span>
                <span className="text-[#A88060]">· CEO &amp; Principal</span>
              </div>
              <span className="font-mono text-[10px] text-[#C99168] font-semibold tracking-wider uppercase">
                Bespoke Design
              </span>
            </div>
          </div>

          {/* Interactive Hero 2D / 3D Mode Selector & Calculator Quick Link */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 p-1 bg-[#F7F5F2] border border-[#DDD9D4] rounded-full w-fit">
              <button
                type="button"
                onClick={() => setHeroMode('photo')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  heroMode === 'photo'
                    ? 'bg-white text-[#171717] shadow-xs'
                    : 'text-[#6B6864] hover:text-[#171717]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Editorial View</span>
              </button>
              <button
                type="button"
                onClick={() => setHeroMode('3d')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  heroMode === '3d'
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'text-[#6B6864] hover:text-[#171717]'
                }`}
              >
                <Box className="w-3.5 h-3.5 text-[#C99168]" />
                <span>Explore 3D Room</span>
              </button>
            </div>

            {/* Quick Estimator CTA from Hero */}
            <a
              href="#estimator"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector('#estimator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-full bg-[#B77958]/10 text-[#B77958] hover:bg-[#B77958] hover:text-white border border-[#B77958]/30 transition-all cursor-pointer shadow-2xs"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Turnkey Budget Estimator</span>
            </a>
          </div>
        </div>
      </div>

      {/* Signature Asymmetrical Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
        {/* Left Column: Compositions A and B */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-5 lg:gap-6">
          {/* Composition A: Design Philosophy Panel - Bespoke Luxury Black & Brown Frame */}
          <div className="relative p-7 sm:p-9 lg:p-10 rounded-2xl bg-[#141414] border border-[#C99168]/40 shadow-xl shadow-black/30 overflow-hidden flex flex-col justify-center transition-all duration-300 hover:shadow-2xl hover:border-[#C99168]/60 group">
            {/* Architectural Drafting Corner Accents in Warm Bronze Brown */}
            <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#C99168]" />
            <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#C99168]" />
            <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#C99168]" />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#C99168]" />

            {/* Subtle luxury ambient glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#C99168]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Frame Top Header */}
            <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[#C99168]/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C99168] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C99168] font-mono">
                  Design Philosophy
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/15 text-[#E6B38A] font-bold border border-[#C99168]/30">
                Core Principle
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5D5B8] tracking-tight font-['Playfair_Display',serif] relative z-10">
              Design with intention
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-[15px] text-[#D8B494] leading-relaxed mt-3 max-w-md relative z-10 font-normal">
              We refine each space with clarity and care, using thoughtful layouts,
              curated materials, and natural palettes. Every element is selected to
              complement daily rituals and quiet moments.
            </p>

            {/* Bottom Leadership Signature & Attribution */}
            <div className="mt-4 pt-3.5 border-t border-[#C99168]/20 flex items-center justify-between text-[11px] relative z-10">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
                <span className="font-semibold text-[#F5D5B8]">Curated Living</span>
                <span className="text-[#A88060]">· Bespoke Architecture</span>
              </div>
              <span className="font-mono text-[10px] text-[#C99168] font-semibold tracking-wider uppercase">
                The Ocean Interiors
              </span>
            </div>
          </div>

          {/* Composition B: Supporting Image & Adjacent Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {/* Left Image: Natural Materials Reading Corner */}
            <div className="relative aspect-4/3 sm:aspect-square overflow-hidden rounded-sm group bg-[#EEEAE5]">
              <img
                src="/assets/images/hero_architectural_detail_1792528336146.jpg"
                alt="Minimalist reading corner with white oak shelving, handmade ceramic vessels, and linen armchair in morning light"
                loading="eager"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-[#171717]/5 pointer-events-none" />
            </div>

            {/* Right Panel: Spaces That Feel Personal - Bespoke Luxury Black & Brown Frame */}
            <div className="relative p-6 sm:p-7 lg:p-8 rounded-2xl bg-[#141414] border border-[#C99168]/40 shadow-xl shadow-black/30 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-[#C99168]/60 group">
              {/* Architectural Drafting Corner Accents in Warm Bronze Brown */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C99168]" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C99168]" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C99168]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C99168]" />

              {/* Subtle luxury ambient glow */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#C99168]/15 rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* Frame Top Header */}
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#C99168]/20">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C99168] animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C99168] font-mono">
                      Tailored Living
                    </span>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/15 text-[#E6B38A] font-bold border border-[#C99168]/30">
                    Bespoke
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#F5D5B8] tracking-tight font-['Playfair_Display',serif] relative z-10">
                  Spaces that feel personal
                </h3>
                <p className="text-xs sm:text-sm text-[#D8B494] leading-relaxed mt-2.5 font-normal relative z-10">
                  Every project is guided by practical design thinking and a commitment
                  to delivering calm, grounded spaces tailored to the individuals who dwell there.
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-[#C99168]/20 relative z-10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onExploreProjects}
                  className="text-xs font-semibold text-[#E6B38A] hover:text-[#F5D5B8] transition-all inline-flex items-center gap-1.5 cursor-pointer group/btn"
                >
                  <span>Explore featured spaces</span>
                  <span aria-hidden="true" className="group-hover/btn:translate-x-1.5 transition-transform text-[#C99168]">&rarr;</span>
                </button>
                <Sparkles className="w-3.5 h-3.5 text-[#C99168]/70" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Composition C): Large Architectural Hero Photograph OR Interactive 3D Room */}
        <div className="lg:col-span-6 relative">
          {heroMode === '3d' ? (
            <div className="w-full h-full min-h-[460px] lg:min-h-[580px] rounded-sm overflow-hidden flex flex-col justify-center">
              <SpatialRoom3D
                heightClass="h-[460px] lg:h-[580px]"
                showCardWrapper={false}
                onConsult={onOpenConsultation}
              />
            </div>
          ) : (
            <div className="relative w-full h-full min-h-[440px] lg:min-h-[580px] overflow-hidden rounded-sm group bg-[#EEEAE5] border border-[#DDD9D4]/40 shadow-xs">
              <img
                src="/assets/images/hero_double_height_living_1792528335195.jpg"
                alt="Double-height architectural living room with natural oak open staircase, woven rattan pendant lights, neutral linen sofa, and lush garden view"
                loading="eager"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
              />
              {/* Subtle photographic vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Action badge allowing direct 3D switch from photograph */}
              <button
                type="button"
                onClick={() => setHeroMode('3d')}
                className="absolute top-4 right-4 bg-white/92 hover:bg-white text-[#171717] px-3 py-1.5 rounded-full text-xs font-medium border border-[#DDD9D4] shadow-sm backdrop-blur-md flex items-center gap-1.5 cursor-pointer transition-all hover:scale-102"
              >
                <Box className="w-3.5 h-3.5 text-[#B77958]" />
                <span>Switch to 3D View</span>
              </button>

              {/* Caption badge at bottom left */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-sm border border-white/60 text-left">
                <p className="text-[11px] font-semibold tracking-wide text-[#171717] uppercase">
                  Featured Residence · Architectural Living
                </p>
                <p className="text-xs text-[#6B6864] mt-0.5">
                  Double-height light well, custom oak stairs &amp; organic fiber pendants
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
