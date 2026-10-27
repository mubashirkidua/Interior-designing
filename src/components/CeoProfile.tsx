import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, ArrowUpRight, Check, Award, Copy, Sparkles, ShieldCheck } from 'lucide-react';

interface CeoProfileProps {
  onOpenConsultation: () => void;
}

export const CeoProfile: React.FC<CeoProfileProps> = ({ onOpenConsultation }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const ceoData = {
    name: 'Muhammad Mubashir Ali',
    title: 'Founder & Chief Executive Officer',
    subtitle: 'Principal Architectural & Interior Designer',
    company: 'The Ocean Interiors',
    email: 'alimuhammd98573@gmail.com',
    mobile: '0323-2930657',
    mobileTel: '03232930657',
    whatsapp: '0342-8156086',
    whatsappLink:
      'https://wa.me/923428156086?text=Hello%20Muhammad%20Mubashir%20Ali,%20I%20am%20contacting%20you%20regarding%20The%20Ocean%20Interiors%20design%20services',
    image: '/assets/aistudio/ceo.jpg_c45767d3.jpg',
    imageFallback: '/public/assets/aistudio/ceo.jpg_c45767d3.jpg',
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2200);
  };

  return (
    <section id="leadership" className="w-full py-16 lg:py-24 border-t border-[#DDD9D4] scroll-mt-20">
      {/* Editorial Header */}
      <div className="max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B77958]/10 border border-[#B77958]/20 rounded-full text-xs font-semibold text-[#B77958] uppercase tracking-[0.18em] mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Executive Leadership</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-[#171717] leading-[1.12] font-['Playfair_Display',serif]">
          Meet our Founder &amp; CEO
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
                Principal Leadership Commitment
              </span>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/15 text-[#E6B38A] font-bold border border-[#C99168]/30">
              Personal Guarantee
            </span>
          </div>

          <p className="text-sm sm:text-[14.5px] text-[#D8B494] leading-relaxed relative z-10 font-normal">
            At <strong className="text-[#F5D5B8] font-bold font-['Playfair_Display',serif]">The Ocean Interiors</strong>, every luxury residence and bespoke sanctuary is personally envisioned and directed by our CEO <strong className="text-[#E6B38A] font-semibold underline decoration-[#C99168]/50 underline-offset-2">Muhammad Mubashir Ali</strong>, ensuring peerless craftsmanship and seamless client collaboration.
          </p>

          <div className="mt-3 pt-2.5 border-t border-[#C99168]/20 flex items-center justify-between text-[11px] relative z-10">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
              <span className="font-semibold text-[#F5D5B8]">Muhammad Mubashir Ali</span>
              <span className="text-[#A88060]">· Founder &amp; CEO</span>
            </div>
            <span className="font-mono text-[10px] text-[#C99168] font-semibold tracking-wider uppercase">
              Principal Architect
            </span>
          </div>
        </div>
      </div>

      {/* CEO Executive Showcase Card */}
      <div className="relative bg-gradient-to-br from-[#FDFCFA] via-[#F7F5F2] to-[#EEEAE5] rounded-lg border border-[#DDD9D4] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C99168]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#1B2230]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Executive Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-4/5 rounded-md overflow-hidden border-2 border-[#DDD9D4] shadow-lg bg-[#E5DDD3] group">
              <img
                src={ceoData.image}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== window.location.origin + ceoData.imageFallback) {
                    target.src = ceoData.imageFallback;
                  }
                }}
                alt={`${ceoData.name} - CEO & Founder of The Ocean Interiors`}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70" />

              {/* Bottom Verified Badge on Portrait */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-sm border border-white/60 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#171717] font-['Playfair_Display',serif]">
                    {ceoData.name}
                  </p>
                  <p className="text-[10px] text-[#B77958] uppercase tracking-wider font-semibold">
                    {ceoData.title}
                  </p>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#171717] text-[#C99168] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Availability Indicator */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#6B6864] bg-white/80 border border-[#DDD9D4] px-3.5 py-1.5 rounded-full shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
              </span>
              <span>Available for direct VIP design consultations</span>
            </div>
          </div>

          {/* Right Column: Narrative, Philosophy & Direct Verified Contacts */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#DDD9D4] rounded-full text-xs font-semibold text-[#171717] mb-3 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B77958]" />
                <span>The Ocean Interiors Studio Leadership</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#171717] font-['Playfair_Display',serif] tracking-tight">
                {ceoData.name}
              </h3>
              <p className="text-sm font-semibold text-[#B77958] mt-1">
                {ceoData.title} · {ceoData.subtitle}
              </p>
            </div>

            {/* CEO Vision & Philosophy Quote */}
            <blockquote className="border-l-3 border-[#B77958] pl-4 italic text-sm sm:text-base text-[#171717] leading-relaxed bg-white/50 py-2.5 rounded-r-sm">
              "At The Ocean Interiors, our philosophy is anchored in serenity and timeless poise. Much like the calm expanse of the ocean, a truly well-designed interior brings quiet harmony, bespoke materiality, and enduring elegance to everyday life."
            </blockquote>

            <p className="text-xs sm:text-sm text-[#6B6864] leading-relaxed">
              Under Muhammad Mubashir Ali's stewardship, our studio curates turn-key residential architecture, bespoke custom furnishings, and 3D spatial environments. Clients enjoy direct, transparent communication with executive leadership from initial blueprint to final styling handover.
            </p>

            {/* Direct Contact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {/* WhatsApp Direct Card */}
              <a
                href={ceoData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 bg-white border border-[#DDD9D4] hover:border-[#25D366] rounded-md transition-all duration-200 shadow-2xs hover:shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B6864] uppercase tracking-wider font-semibold block">
                      WhatsApp Direct
                    </span>
                    <span className="text-xs font-bold text-[#171717] group-hover:text-[#25D366] transition-colors font-mono">
                      {ceoData.whatsapp}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#6B6864] group-hover:text-[#25D366] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Direct Mobile Phone Card */}
              <a
                href={`tel:${ceoData.mobileTel}`}
                className="group flex items-center justify-between p-3.5 bg-white border border-[#DDD9D4] hover:border-[#171717] rounded-md transition-all duration-200 shadow-2xs hover:shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#171717]/10 text-[#171717] flex items-center justify-center shrink-0">
                    <Phone className="w-4.5 h-4.5 text-[#171717]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B6864] uppercase tracking-wider font-semibold block">
                      Direct Mobile
                    </span>
                    <span className="text-xs font-bold text-[#171717] font-mono">
                      {ceoData.mobile}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#6B6864] group-hover:text-[#171717] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Email Address Card with Copy Action */}
              <div className="sm:col-span-2 flex items-center justify-between p-3.5 bg-white border border-[#DDD9D4] rounded-md shadow-2xs">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-[#B77958]/10 text-[#B77958] flex items-center justify-center shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-[#6B6864] uppercase tracking-wider font-semibold block">
                      Executive Email ID
                    </span>
                    <a
                      href={`mailto:${ceoData.email}`}
                      className="text-xs sm:text-sm font-bold text-[#171717] hover:text-[#B77958] transition-colors truncate block font-mono"
                    >
                      {ceoData.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(ceoData.email, 'email')}
                  className="px-3 py-1.5 text-xs font-medium text-[#171717] bg-[#F7F5F2] hover:bg-[#EEEAE5] rounded-full border border-[#DDD9D4] transition-all cursor-pointer shrink-0 ml-2 inline-flex items-center gap-1.5"
                  title="Copy email address"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-600 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#6B6864]" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Consultation Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={ceoData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-full transition-all shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp ({ceoData.whatsapp})</span>
              </a>

              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#171717] hover:bg-[#252321] rounded-full transition-all shadow-sm cursor-pointer"
              >
                <span>Book Direct CEO Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-[#C99168]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
