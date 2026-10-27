import React, { useState } from 'react';
import { ArrowUpRight, Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { STUDIO_SERVICES, StudioService } from '../data/servicesData';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>('full-service');

  const toggleExpand = (id: string) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="w-full py-16 lg:py-24 border-t border-[#DDD9D4] scroll-mt-20">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B77958] block mb-3">
            Studio Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-[#171717] leading-[1.14]">
            Services tailored to your home
          </h2>

          {/* Bespoke Luxury Editorial Frame - Black Background with Warm Brown Typography */}
          <div className="mt-4 relative p-4.5 sm:p-5 rounded-2xl bg-[#141414] border border-[#C99168]/40 shadow-xl shadow-black/30 overflow-hidden text-left transition-all duration-300 hover:shadow-2xl hover:border-[#C99168]/60 group">
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
                  Turnkey Scope of Works
                </span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/15 text-[#E6B38A] font-bold border border-[#C99168]/30">
                End-to-End
              </span>
            </div>

            <p className="text-sm sm:text-[14.5px] text-[#D8B494] leading-relaxed relative z-10 font-normal">
              From whole-home transformations to focused spatial styling, our practice
              is structured around clarity, craftsmanship, and transparent communication.
            </p>

            <div className="mt-3 pt-2.5 border-t border-[#C99168]/20 flex items-center justify-between text-[11px] relative z-10">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
                <span className="font-semibold text-[#F5D5B8]">Architectural Disciplines</span>
                <span className="text-[#A88060]">· Bespoke Delivery</span>
              </div>
              <span className="font-mono text-[10px] text-[#C99168] font-semibold tracking-wider uppercase">
                Turnkey Execution
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelectService('General Inquiries')}
          className="group inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-[#171717] bg-[#F7F5F2] hover:bg-[#EEEAE5] border border-[#DDD9D4] rounded-full transition-all cursor-pointer self-start md:self-auto shrink-0"
        >
          <span>Request Service Guide</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* Services List in Refined Editorial Rows */}
      <div className="divide-y divide-[#DDD9D4] border-y border-[#DDD9D4]">
        {STUDIO_SERVICES.map((service) => {
          const isExpanded = expandedServiceId === service.id;

          return (
            <div
              key={service.id}
              className={`transition-colors duration-200 ${
                isExpanded ? 'bg-[#F7F5F2]/40' : 'hover:bg-[#F7F5F2]/20'
              }`}
            >
              {/* Row Summary Bar */}
              <div
                onClick={() => toggleExpand(service.id)}
                className="py-6 sm:py-8 px-2 sm:px-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group"
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(service.id);
                  }
                }}
              >
                <div className="flex items-start md:items-center gap-5 sm:gap-8">
                  <span className="text-sm font-mono text-[#B77958] font-semibold mt-1 md:mt-0 shrink-0">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#171717] tracking-tight group-hover:text-[#B77958] transition-colors font-['Playfair_Display',serif]">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B6864] mt-1 max-w-xl">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                  <span className="text-xs font-medium text-[#6B6864] hidden lg:inline">
                    {service.estimatedTimeline}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-[#DDD9D4] flex items-center justify-center text-[#171717] group-hover:border-[#171717] transition-colors">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Detail Tray */}
              {isExpanded && (
                <div className="px-4 sm:px-8 pb-8 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[#EEEAE5]/80">
                  <div className="lg:col-span-7 space-y-4">
                    <p className="text-sm text-[#171717] leading-relaxed">
                      {service.fullDesc}
                    </p>

                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6B6864] mb-2.5">
                        Key Deliverables
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-[#171717]">
                            <Check className="w-3.5 h-3.5 text-[#B77958] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-white p-5 rounded-sm border border-[#DDD9D4] flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="text-xs">
                        <span className="font-semibold text-[#171717]">Ideal For: </span>
                        <span className="text-[#6B6864]">{service.idealFor}</span>
                      </div>
                      <div className="text-xs">
                        <span className="font-semibold text-[#171717]">Typical Timeline: </span>
                        <span className="text-[#6B6864]">{service.estimatedTimeline}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectService(service.title)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-white bg-[#171717] rounded-full hover:bg-[#252321] transition-colors cursor-pointer"
                    >
                      <span>Discuss {service.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
