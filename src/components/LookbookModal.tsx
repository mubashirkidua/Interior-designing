import React, { useEffect } from 'react';
import { X, Download, Printer, Share2, Check, Phone, Mail, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { Logo } from './Logo';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const whatsappShareUrl =
    'https://wa.me/923428156086?text=Hello%20CEO%20Muhammad%20Mubashir%20Ali,%20I%20reviewed%20The%20Ocean%20Interiors%20Studio%20Lookbook%20and%20would%20like%20to%20discuss%20a%20project.';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/70 backdrop-blur-xs transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-lg border border-[#DDD9D4] shadow-2xl overflow-y-auto z-10 flex flex-col focus:outline-none">
        {/* Sticky Header with Action Controls */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-[#DDD9D4]">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B77958] font-mono">
              Official Lookbook &amp; Profile (2025/2026)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#171717] bg-[#F7F5F2] hover:bg-[#EEEAE5] border border-[#DDD9D4] rounded-full transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#B77958]" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#6B6864] hover:text-[#171717] hover:bg-[#F7F5F2] rounded-full transition-colors cursor-pointer"
              aria-label="Close lookbook modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Lookbook Body */}
        <div className="p-6 sm:p-10 space-y-10 print:p-0">
          {/* Brand Top Lockup */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#DDD9D4]">
            <div>
              <Logo size="lg" />
              <p className="mt-3 text-xs text-[#6B6864] max-w-md leading-relaxed">
                Bespoke luxury interior architecture, turnkey presidential residential craftsmanship, and ocean-inspired serene spatial design.
              </p>
            </div>

            <div className="bg-[#F7F5F2] p-4 rounded-lg border border-[#DDD9D4] text-xs space-y-1.5 sm:text-right shrink-0">
              <span className="font-bold text-[#171717] block font-mono text-[11px] uppercase tracking-wider text-[#B77958]">
                Studio Credentials
              </span>
              <p className="text-[#171717] font-semibold">The Ocean Interiors</p>
              <p className="text-[#6B6864] font-mono">Karachi · Lahore · Islamabad</p>
              <p className="text-[#6B6864] font-mono text-[11px]">5-Year Warranty Guaranteed</p>
            </div>
          </div>

          {/* CEO & Leadership Overview */}
          <div className="p-6 bg-[#FAF9F6] rounded-lg border border-[#C99168]/30 flex flex-col sm:flex-row items-center gap-6">
            <img
              src="/assets/aistudio/ceo.jpg_c45767d3.jpg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/public/assets/aistudio/ceo.jpg_c45767d3.jpg';
              }}
              alt="Muhammad Mubashir Ali"
              className="w-20 h-20 rounded-full object-cover object-top border-2 border-[#C99168] shadow-sm shrink-0"
            />
            <div className="space-y-1 text-center sm:text-left flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B77958] font-mono block">
                Executive Leadership
              </span>
              <h3 className="text-xl font-bold font-['Playfair_Display',serif] text-[#171717]">
                Muhammad Mubashir Ali
              </h3>
              <p className="text-xs text-[#B77958] font-semibold font-mono">
                Founder &amp; Chief Executive Officer
              </p>
              <p className="text-xs text-[#6B6864] leading-relaxed pt-1">
                Directing every project from spatial concept to white-glove turnkey handover. Dedicated to bringing uncompromising natural materials, bespoke woodwork, and architectural serenity to Pakistan’s finest residences.
              </p>

              <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-[#171717]">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#B77958]" /> 0323-2930657
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" /> 0342-8156086
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#B77958]" /> alimuhammd98573@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Studio Specializations */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#171717] font-mono mb-4">
              Core Capabilities &amp; Disciplines
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-white rounded border border-[#DDD9D4] space-y-2">
                <h5 className="font-bold text-[#171717] font-['Playfair_Display',serif] text-sm">
                  Turnkey Residential Execution
                </h5>
                <p className="text-[#6B6864] leading-relaxed">
                  Complete single-source responsibility. Civil demolition, electrical wiring, HVAC ducting, drywalling, and luxury painting under continuous supervision.
                </p>
              </div>

              <div className="p-4 bg-white rounded border border-[#DDD9D4] space-y-2">
                <h5 className="font-bold text-[#171717] font-['Playfair_Display',serif] text-sm">
                  Bespoke Architectural Joinery
                </h5>
                <p className="text-[#6B6864] leading-relaxed">
                  In-house master carpenters crafting fluted walnut wall cladding, hidden doors, walk-in vanity suites, and tailored minimalist storage.
                </p>
              </div>

              <div className="p-4 bg-white rounded border border-[#DDD9D4] space-y-2">
                <h5 className="font-bold text-[#171717] font-['Playfair_Display',serif] text-sm">
                  Natural Stone &amp; Lighting
                </h5>
                <p className="text-[#6B6864] leading-relaxed">
                  Hand-selected Italian Calacatta, Statuario, and Travertine slabs paired with concealed warm architectural cove lighting and smart scene automation.
                </p>
              </div>
            </div>
          </div>

          {/* Key Portfolios Summary */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#171717] font-mono mb-4">
              Featured Signature Projects
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { name: 'The Highline Penthouse', loc: 'DHA Phase 8, Karachi', scope: '4,200 sq ft · Complete Turnkey' },
                { name: 'The Coastal Villa', loc: 'Creek Marina, Karachi', scope: '6,500 sq ft · Fluted Joinery & Stone' },
                { name: 'Kyoto Pavilion Suite', loc: 'Bahria Town, Karachi', scope: '2,800 sq ft · Minimalist Serenity' },
                { name: 'The Solace Retreat', loc: 'Sector F-7, Islamabad', scope: '5,000 sq ft · Modern Monolithic' },
              ].map((p, i) => (
                <div key={i} className="p-3 bg-[#F7F5F2] rounded border border-[#DDD9D4] flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[#171717] block">{p.name}</span>
                    <span className="text-[11px] text-[#6B6864]">{p.loc}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#B77958] font-semibold">{p.scope}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Quality Note & WhatsApp Connect */}
          <div className="pt-6 border-t border-[#DDD9D4] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#6B6864]">
              <ShieldCheck className="w-4 h-4 text-[#B77958]" />
              <span>Official Studio Publication · The Ocean Interiors · All Rights Reserved</span>
            </div>

            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-full transition-colors cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Connect on WhatsApp with CEO</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
