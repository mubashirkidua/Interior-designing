import React from 'react';
import { Star, ShieldCheck, MapPin, Quote, Sparkles } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  projectScope: string;
  quote: string;
  year: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Tariq Mansoor',
    role: 'Managing Partner, Global Advisory',
    location: 'DHA Phase 8, Karachi',
    projectScope: '4,200 Sq. Ft. Seafront Penthouse Turnkey',
    quote:
      'The Ocean Interiors completely revitalized our seafront residence. What impressed us most was CEO Muhammad Mubashir Ali’s personal supervision on-site. Every fluted walnut panel and the Italian Calacatta fireplace were fitted with micron-level precision. Truly world-class standards.',
    year: '2025',
    rating: 5,
  },
  {
    id: '2',
    name: 'Dr. Farah & Salman Hashmi',
    role: 'Cardiothoracic Surgeon & Consultant',
    location: 'Bahria Town Karachi, Precinct 1',
    projectScope: '500 Sq. Yd 5-Bedroom Luxury Villa',
    quote:
      'We had heard nightmare stories about interior contractor delays, but The Ocean Interiors delivered our complete turnkey villa 10 days ahead of schedule! The 3D render they demonstrated at the start matched the real physical home 100%.',
    year: '2025',
    rating: 5,
  },
  {
    id: '3',
    name: 'Kamran Jillani',
    role: 'CEO, Marine Logistics',
    location: 'Clifton Block 4, Karachi',
    projectScope: 'Modern Duplex & Executive Workspace',
    quote:
      'From concealed architectural doors to ambient smart lighting scenes, Mubashir’s eye for contemporary ocean-inspired elegance is unmatched. Their in-house woodwork craftsmen produce finishes that surpass imported European retail showrooms.',
    year: '2024',
    rating: 5,
  },
  {
    id: '4',
    name: 'Asadullah Sheikh',
    role: 'Industrialist',
    location: 'Sector F-7/2, Islamabad',
    projectScope: 'Contemporary Architectural Residence',
    quote:
      'Even with our project situated in Islamabad, The Ocean Interiors handled logistics, on-site joinery, and marble installation with flawless professionalism. Transparent billing with zero unexpected markups.',
    year: '2024',
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-20 lg:py-28 border-t border-[#DDD9D4] relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#B77958] block mb-2 font-mono">
            Social Proof &amp; Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#171717] font-['Playfair_Display',serif]">
            Words From Our Patrons
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
                  Patron Confidence
                </span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/15 text-[#E6B38A] font-bold border border-[#C99168]/30">
                100% Verified
              </span>
            </div>

            <p className="text-sm sm:text-[14.5px] text-[#D8B494] leading-relaxed relative z-10 font-normal">
              Real feedback from discerning homeowners, estate developers, and corporate leaders who entrusted their residences to <strong className="text-[#F5D5B8] font-bold font-['Playfair_Display',serif]">The Ocean Interiors</strong>.
            </p>

            <div className="mt-3 pt-2.5 border-t border-[#C99168]/20 flex items-center justify-between text-[11px] relative z-10">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
                <span className="font-semibold text-[#F5D5B8]">High-Trust Endorsements</span>
                <span className="text-[#A88060]">· Karachi, Lahore &amp; Islamabad</span>
              </div>
              <span className="font-mono text-[10px] text-[#C99168] font-semibold tracking-wider uppercase">
                5.0 Stars
              </span>
            </div>
          </div>
        </div>

        {/* Aggregate Credibility Badge */}
        <div className="flex items-center gap-3 bg-[#F7F5F2] px-4 py-2.5 rounded-lg border border-[#DDD9D4] shrink-0 self-start md:self-auto">
          <div className="flex text-[#B77958]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#B77958]" />
            ))}
          </div>
          <div className="text-xs border-l border-[#DDD9D4] pl-3">
            <span className="font-bold text-[#171717] block font-mono">5.0 / 5.0 Rating</span>
            <span className="text-[#6B6864] text-[10px]">100% Client Satisfaction</span>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="p-6 sm:p-8 bg-white rounded-lg border border-[#DDD9D4] hover:border-[#171717] transition-all duration-300 shadow-xs flex flex-col justify-between relative group"
          >
            <div>
              {/* Star Rating and Location Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-[#B77958]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#B77958]" />
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#6B6864] font-medium font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#B77958]" />
                  <span>{t.location}</span>
                </div>
              </div>

              {/* Quote Content */}
              <p className="text-xs sm:text-sm text-[#171717] leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-4 border-t border-[#EEEAE5] flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#171717] font-['Playfair_Display',serif]">
                  {t.name}
                </h4>
                <p className="text-[11px] text-[#6B6864]">{t.role}</p>
                <p className="text-[10px] text-[#B77958] font-mono mt-0.5 font-medium">
                  Scope: {t.projectScope}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-[#6B6864] block">Completed</span>
                <span className="text-xs font-bold text-[#171717] font-mono">{t.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CEO Personal Quality Pledge */}
      <div className="mt-8 p-6 bg-[#F7F5F2] rounded-lg border border-[#DDD9D4] flex flex-col sm:flex-row items-center gap-5">
        <img
          src="/assets/aistudio/ceo.jpg_c45767d3.jpg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/public/assets/aistudio/ceo.jpg_c45767d3.jpg';
          }}
          alt="Muhammad Mubashir Ali"
          className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#C99168] shadow-sm shrink-0"
        />
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#B77958]" />
            <h4 className="text-sm font-bold text-[#171717] uppercase tracking-wider font-mono">
              The Ocean Interiors CEO Assurance
            </h4>
          </div>
          <p className="text-xs text-[#6B6864] max-w-3xl leading-relaxed">
            &ldquo;Every single project under The Ocean Interiors is personally inspected by me. We don&apos;t sub-contract without direct supervision, and we never sign off on handovers until every millimeter meets our presidential standards.&rdquo;
          </p>
          <span className="text-xs font-bold text-[#171717] block font-['Playfair_Display',serif]">
            — Muhammad Mubashir Ali, Founder &amp; CEO
          </span>
        </div>
      </div>
    </section>
  );
};
