import React, { useState, useRef, useCallback } from 'react';
import { ArrowRight, MoveHorizontal, CheckCircle2, Sparkles, Building2, SlidersHorizontal } from 'lucide-react';

interface TransformationSliderProps {
  onConsult: (serviceOrProject?: string) => void;
}

export const TransformationSlider: React.FC<TransformationSliderProps> = ({ onConsult }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchStart = () => setIsDragging(true);
  const handleMouseDown = () => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  return (
    <section id="transformation" className="py-20 lg:py-28 border-t border-[#DDD9D4] relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#B77958] block mb-2 font-mono">
            Spatial Transformation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#171717] font-['Playfair_Display',serif]">
            From Raw Concrete to Pure Luxury
          </h2>
          {/* Bespoke Luxury Editorial Frame - Black Background with Warm Brown Typography */}
          <div className="mt-4 relative p-4.5 sm:p-5 rounded-2xl bg-[#141414] border border-[#C99168]/40 shadow-xl shadow-black/30 overflow-hidden max-w-2xl transition-all duration-300 hover:shadow-2xl hover:border-[#C99168]/60 group">
            {/* Architectural Drafting Corner Accents in Warm Bronze Brown */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C99168]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C99168]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C99168]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C99168]" />

            {/* Subtle luxury ambient glow */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#C99168]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Frame Top Header */}
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#C99168]/20">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C99168] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C99168] font-mono">
                  Craftsmanship Showcase
                </span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/15 text-[#E6B38A] font-bold border border-[#C99168]/30">
                Interactive
              </span>
            </div>

            {/* The Text in Warm Brown tones on Black */}
            <p className="text-sm sm:text-[14.5px] text-[#D8B494] leading-relaxed relative z-10 font-normal">
              Witness the craftsmanship of <strong className="text-[#F5D5B8] font-bold font-['Playfair_Display',serif] text-base tracking-tight">The Ocean Interiors</strong>. Drag the slider to compare an unfinished structural site before renovation against our finished turnkey architectural residence.
            </p>

            {/* Bottom Leadership Signature & Attribution */}
            <div className="mt-3 pt-2.5 border-t border-[#C99168]/20 flex items-center justify-between text-[11px] relative z-10">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
                <span className="font-semibold text-[#F5D5B8]">Turnkey Transformation</span>
                <span className="text-[#A88060]">· Site to Handover</span>
              </div>
              <span className="font-mono text-[10px] text-[#C99168] font-semibold tracking-wider uppercase">
                Drag Slider Below
              </span>
            </div>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-[#F7F5F2] p-1 rounded-full border border-[#DDD9D4] text-xs">
          <button
            type="button"
            onClick={() => setSliderPosition(0)}
            className={`px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
              sliderPosition === 0 ? 'bg-[#171717] text-white shadow-xs' : 'text-[#6B6864] hover:text-[#171717]'
            }`}
          >
            Finished Luxury
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(50)}
            className={`px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
              sliderPosition === 50 ? 'bg-[#171717] text-white shadow-xs' : 'text-[#6B6864] hover:text-[#171717]'
            }`}
          >
            Split (50/50)
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(100)}
            className={`px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
              sliderPosition === 100 ? 'bg-[#171717] text-white shadow-xs' : 'text-[#6B6864] hover:text-[#171717]'
            }`}
          >
            Raw Unfinished
          </button>
        </div>
      </div>

      {/* Interactive Slider Frame */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
        className="relative w-full aspect-[16/9] sm:aspect-[16/9] max-h-[640px] rounded-lg overflow-hidden border border-[#DDD9D4] shadow-xl select-none cursor-ew-resize bg-[#171717]"
      >
        {/* AFTER Image (Full background container) */}
        <img
          src="/src/assets/images/transform_luxury_after_1792604056627.jpg"
          alt="Completed luxury residence by The Ocean Interiors"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* AFTER Badge Overlay */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 pointer-events-none">
          <div className="bg-[#171717]/85 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
            <span>Turnkey Delivery · The Ocean Interiors</span>
          </div>
        </div>

        {/* BEFORE Image (Clipped container) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src="/src/assets/images/transform_raw_before_1792604056109.jpg"
            alt="Raw unfinished site before renovation"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
            draggable={false}
          />

          {/* BEFORE Badge Overlay */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md text-[#E5E0D8] text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>Before Renovation · Raw Site</span>
            </div>
          </div>
        </div>

        {/* Divider Bar & Draggable Handle */}
        <div
          className="absolute top-0 bottom-0 z-30 w-[3px] bg-gradient-to-b from-[#C99168] via-white to-[#C99168] shadow-[0_0_16px_rgba(201,145,104,0.8)] cursor-ew-resize flex items-center justify-center pointer-events-auto"
          style={{ left: `calc(${sliderPosition}% - 1.5px)` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Circular Architectural Dial Handle */}
          <div className="w-11 h-11 sm:w-13 sm:h-13 -ml-[21px] sm:-ml-[25px] rounded-full bg-[#141414] text-[#F5D5B8] border-2 border-[#C99168] shadow-[0_4px_24px_rgba(0,0,0,0.8)] ring-4 ring-black/40 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group/handle cursor-grab active:cursor-grabbing">
            <MoveHorizontal className="w-5 h-5 text-[#C99168] group-hover/handle:text-white transition-colors" />
          </div>
        </div>

        {/* Floating Hint Helper Pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-[#141414]/90 border border-[#C99168]/40 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] text-[#F5D5B8] font-mono shadow-md flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C99168] animate-pulse" />
          <span>Drag horizontally to compare Before vs Turnkey Luxury</span>
        </div>
      </div>

      {/* Transformation Specs Breakdown Grid - Bespoke Luxury Black & Brown Frames */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Raw Construction Challenges */}
        <div className="relative p-6 sm:p-7 rounded-2xl bg-[#141414] border border-[#C99168]/40 shadow-xl shadow-black/30 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-[#C99168]/60 group">
          {/* Architectural Drafting Corner Accents in Warm Bronze Brown */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C99168]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C99168]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C99168]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C99168]" />

          {/* Subtle luxury ambient glow */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#C99168]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-3 relative z-10">
            {/* Frame Top Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#C99168]/20">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 font-mono">
                  Stage 01 · Pre-Renovation
                </span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/20">
                Raw State
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#F5D5B8] tracking-tight font-['Playfair_Display',serif]">
              Initial Site Condition
            </h3>

            <p className="text-xs sm:text-sm text-[#D8B494] leading-relaxed font-normal">
              Bare concrete screed, uninsulated partition walls, messy open electrical conduit wiring, uneven ceiling heights, and lacking thermal and acoustic harmony.
            </p>

            <ul className="text-xs space-y-2 text-[#D8B494]/90 pt-3 border-t border-[#C99168]/20">
              <li className="flex items-center gap-2">
                <span className="text-[#C99168] font-bold text-sm">·</span>
                <span>Exposed masonry &amp; unlevel concrete floors</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C99168] font-bold text-sm">·</span>
                <span>No architectural lighting layout or mood control</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C99168] font-bold text-sm">·</span>
                <span>Disjointed spatial proportion and wasted square footage</span>
              </li>
            </ul>
          </div>

          {/* Bottom Seal */}
          <div className="mt-4 pt-3 border-t border-[#C99168]/20 flex items-center justify-between text-[11px] relative z-10">
            <span className="text-[#A88060] font-mono text-[10px]">Structural Audit Required</span>
            <span className="font-mono text-[10px] text-[#C99168] uppercase tracking-wider font-semibold">Pre-Execution</span>
          </div>
        </div>

        {/* Right: The Ocean Interiors Delivery */}
        <div className="relative p-6 sm:p-7 rounded-2xl bg-[#141414] border border-[#C99168]/50 shadow-xl shadow-black/30 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-[#C99168]/70 group">
          {/* Architectural Drafting Corner Accents in Warm Bronze Brown */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C99168]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C99168]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C99168]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C99168]" />

          {/* Subtle luxury ambient glow */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#C99168]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-3 relative z-10">
            {/* Frame Top Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#C99168]/20">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C99168] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C99168] font-mono">
                  Stage 02 · Turnkey Handover
                </span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/20 text-[#E6B38A] font-bold border border-[#C99168]/40">
                Completed
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#F5D5B8] tracking-tight font-['Playfair_Display',serif]">
              The Ocean Interiors Completed Masterpiece
            </h3>

            <p className="text-xs sm:text-sm text-[#D8B494] leading-relaxed font-normal">
              Precision turnkey execution led by CEO <strong className="text-[#E6B38A] font-semibold underline decoration-[#C99168]/50 underline-offset-2">Muhammad Mubashir Ali</strong>. Fluted walnut wall panelling, concealed climate distribution, polished imported marble, and bespoke furniture with ocean velvet accents.
            </p>

            <ul className="text-xs space-y-2 text-[#F5D5B8] pt-3 border-t border-[#C99168]/20 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C99168] shrink-0" />
                <span>Bespoke fluted walnut joinery &amp; recessed acoustic panelling</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C99168] shrink-0" />
                <span>Architectural recessed warm cove lighting with scene control</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C99168] shrink-0" />
                <span>Calacatta marble fireplace mantle &amp; Italian porcelain slabs</span>
              </li>
            </ul>
          </div>

          {/* Bottom Seal */}
          <div className="mt-4 pt-3 border-t border-[#C99168]/20 flex items-center justify-between text-[11px] relative z-10">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
              <span className="font-semibold text-[#F5D5B8]">Muhammad Mubashir Ali</span>
              <span className="text-[#A88060]">· CEO Supervision</span>
            </div>
            <span className="font-mono text-[10px] text-[#C99168] font-semibold tracking-wider uppercase">
              Turnkey Verified
            </span>
          </div>
        </div>
      </div>

      {/* Direct Call to Action */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between p-6 bg-[#171717] text-white rounded-lg gap-4">
        <div>
          <h4 className="text-base font-semibold font-['Playfair_Display',serif]">
            Have a space you want transformed?
          </h4>
          <p className="text-xs text-[#DDD9D4] mt-0.5">
            Book an on-site evaluation with CEO Muhammad Mubashir Ali for complete turnkey execution.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onConsult('Transformation Site Walkthrough')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C99168] hover:bg-[#B77958] text-[#171717] font-bold text-xs rounded-full transition-colors cursor-pointer shrink-0 shadow-sm"
        >
          <span>Schedule Site Walkthrough</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
