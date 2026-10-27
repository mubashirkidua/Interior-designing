import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Mail, Calendar, X, ChevronUp, Sparkles, ExternalLink, Calculator, ShieldCheck } from 'lucide-react';

interface FloatingContactWidgetProps {
  onOpenConsultation: () => void;
  onOpenAdmin?: () => void;
}

export const FloatingContactWidget: React.FC<FloatingContactWidgetProps> = ({ onOpenConsultation, onOpenAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ceoWhatsappUrl =
    'https://wa.me/923428156086?text=Hello%20Muhammad%20Mubashir%20Ali,%20I%20am%20contacting%20you%20from%20The%20Ocean%20Interiors%20portfolio.%20I%20would%20like%20to%20discuss%20a%20luxury%20turnkey%20interior%20project.';

  return (
    <aside aria-label="Quick CEO Contact & Support" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className="pointer-events-auto w-10 h-10 rounded-full bg-white/95 text-[#171717] hover:bg-[#171717] hover:text-white border border-[#DDD9D4] shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}

      {/* Popover Quick-Connect Menu */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="CEO Quick Connect"
          className="pointer-events-auto w-[310px] sm:w-[340px] bg-white rounded-2xl border border-[#DDD9D4] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header with CEO Identity */}
          <div className="bg-gradient-to-r from-[#171717] to-[#252321] text-white p-4 relative">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close CEO connect menu"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#B77958] bg-[#EEEAE5] shrink-0">
                <img
                  src="/assets/aistudio/ceo.jpg_c45767d3.jpg"
                  alt="Muhammad Mubashir Ali - CEO The Ocean Interiors"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80';
                  }}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#171717]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold tracking-tight text-white font-['Playfair_Display',serif]">
                    Muhammad Mubashir Ali
                  </h4>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-[#B77958] font-medium">Founder &amp; CEO · Principal Architect</p>
                <p className="text-[10px] text-white/60">The Ocean Interiors (Pakistan)</p>
              </div>
            </div>
          </div>

          {/* Quick Contact Actions List */}
          <div className="p-3.5 space-y-2 bg-[#FAF9F6]">
            {/* 1. Direct WhatsApp */}
            <a
              href={ceoWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-200 rounded-xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-emerald-950 flex items-center gap-1">
                    <span>Chat on WhatsApp</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-emerald-200 text-emerald-800 rounded-full font-semibold">
                      Fastest
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-mono">0342-8156086</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* 2. Direct Phone Call */}
            <a
              href="tel:+923232930657"
              className="flex items-center justify-between p-3 bg-white hover:bg-[#F2ECE5] border border-[#DDD9D4] rounded-xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#171717] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#171717]">Call CEO Directly</div>
                  <div className="text-[11px] text-[#6B6864] font-mono">0323-2930657</div>
                </div>
              </div>
              <span className="text-[11px] text-[#B77958] font-semibold">Dial</span>
            </a>

            {/* 3. Send Official Inquiry Email */}
            <a
              href="mailto:alimuhammd98573@gmail.com?subject=The%20Ocean%20Interiors%20Design%20Inquiry"
              className="flex items-center justify-between p-3 bg-white hover:bg-[#F2ECE5] border border-[#DDD9D4] rounded-xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#B77958] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#171717]">Email Studio</div>
                  <div className="text-[11px] text-[#6B6864] truncate max-w-[170px]">
                    alimuhammd98573@gmail.com
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-[#6B6864]">Send</span>
            </a>

            {/* 4. Turnkey Budget Calculator Jump */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                const el = document.getElementById('estimator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-2.5 px-4 bg-white hover:bg-[#F2ECE5] border border-[#DDD9D4] text-[#171717] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <Calculator className="w-3.5 h-3.5 text-[#B77958]" />
              <span>Turnkey Budget &amp; Scope Calculator</span>
            </button>

            {/* 5. Book Turnkey Design Consultation */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenConsultation();
              }}
              className="w-full mt-1 py-2.5 px-4 bg-[#171717] hover:bg-[#252321] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow"
            >
              <Calendar className="w-3.5 h-3.5 text-[#B77958]" />
              <span>Book Turnkey Design Consultation</span>
            </button>

            {/* 6. Studio Team & CEO Portal */}
            {onOpenAdmin && (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenAdmin();
                }}
                className="w-full mt-1 py-2 px-3 bg-[#141414] hover:bg-[#202020] text-[#F5D5B8] text-[11px] font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-[#C99168]/30"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C99168]" />
                <span>Team &amp; CEO Admin Portal</span>
              </button>
            )}
          </div>

          {/* Bottom Footer Note */}
          <div className="px-4 py-2 bg-[#EEEAE5]/60 text-center border-t border-[#DDD9D4]/60">
            <p className="text-[10px] text-[#6B6864]">
              Serving Karachi, Lahore, Islamabad &amp; Overseas Pakistanis
            </p>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Direct CEO WhatsApp and phone access"
        className="pointer-events-auto group flex items-center gap-2.5 pl-2 pr-4 py-2 bg-[#171717] hover:bg-[#252321] text-white rounded-full shadow-xl border border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#B77958] bg-[#333] shrink-0">
          <img
            src="/assets/aistudio/ceo.jpg_c45767d3.jpg"
            alt="CEO avatar"
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80';
            }}
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#171717]" />
        </div>

        <div className="text-left hidden sm:block">
          <div className="text-[11px] font-bold tracking-tight text-white flex items-center gap-1.5">
            <span>Direct CEO Access</span>
            <span className="text-[9px] px-1 bg-emerald-500/20 text-emerald-300 rounded font-normal">Online</span>
          </div>
          <div className="text-[10px] text-[#DDD9D4]">WhatsApp &amp; Call Available</div>
        </div>

        {/* WhatsApp Icon with Emerald Pulse */}
        <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:rotate-12 transition-transform">
          <MessageCircle className="w-4 h-4 fill-white" />
        </div>
      </button>
    </aside>
  );
};
