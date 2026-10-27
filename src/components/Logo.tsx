import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
}) => {
  const isLight = variant === 'light';

  const sizeConfig = {
    sm: {
      emblem: 'w-9 h-9',
      title: 'text-base sm:text-lg',
      subtitle: 'text-[9px]',
    },
    md: {
      emblem: 'w-11 h-11 sm:w-12 sm:h-12',
      title: 'text-lg sm:text-xl lg:text-[22px]',
      subtitle: 'text-[10px]',
    },
    lg: {
      emblem: 'w-16 h-16',
      title: 'text-2xl sm:text-3xl',
      subtitle: 'text-xs',
    },
  }[size];

  return (
    <div className={`flex items-center gap-3 sm:gap-3.5 select-none ${className}`}>
      {/* 
        Bespoke Architectural Medallion / Emblem with 
        COMPANY NAME EMBEDDED DIRECTLY ON THE LOGO EMBLEM 
      */}
      <div
        className={`relative ${sizeConfig.emblem} shrink-0 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
          isLight
            ? 'shadow-md shadow-black/20 ring-1 ring-white/30'
            : 'shadow-md shadow-black/10 ring-1 ring-[#DDD9D4]'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Upper text arc path for 'THE OCEAN INTERIORS' */}
            <path
              id="oceanInteriorsArcTop"
              d="M 16,50 A 34,34 0 1,1 84,50"
              fill="none"
            />
            {/* Lower text arc path for 'EST. 2024' or 'DESIGN' */}
            <path
              id="oceanInteriorsArcBottom"
              d="M 84,50 A 34,34 0 0,1 16,50"
              fill="none"
            />
            <linearGradient id="oceanGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFB28A" />
              <stop offset="50%" stopColor="#C99168" />
              <stop offset="100%" stopColor="#965838" />
            </linearGradient>
            <linearGradient id="oceanDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1B2230" />
              <stop offset="100%" stopColor="#0F141D" />
            </linearGradient>
          </defs>

          {/* Medallion Background Ring */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill={isLight ? '#131A26' : '#141A24'}
            stroke="url(#oceanGoldGrad)"
            strokeWidth="2"
          />

          {/* Inner Decorative Beaded Ring */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={isLight ? 'rgba(255,255,255,0.2)' : 'rgba(201,145,104,0.35)'}
            strokeWidth="0.8"
            strokeDasharray="1.5 2"
          />

          {/* Circular Text: THE OCEAN INTERIORS carved directly onto logo */}
          <text
            fill="url(#oceanGoldGrad)"
            fontSize="7"
            fontWeight="700"
            letterSpacing="2.2"
            className="uppercase font-['Playfair_Display',serif]"
          >
            <textPath href="#oceanInteriorsArcTop" startOffset="50%" textAnchor="middle">
              THE OCEAN INTERIORS
            </textPath>
          </text>

          {/* Subtext on bottom of circular logo badge */}
          <text
            fill={isLight ? '#FFFFFF' : '#DDD9D4'}
            fontSize="5.2"
            fontWeight="600"
            letterSpacing="2"
            className="uppercase"
            opacity="0.85"
          >
            <textPath href="#oceanInteriorsArcBottom" startOffset="50%" textAnchor="middle">
              • ARCHITECTURE &amp; ART •
            </textPath>
          </text>

          {/* Inner Center Medallion Disc */}
          <circle
            cx="50"
            cy="50"
            r="23"
            fill={isLight ? '#1E2738' : '#1A212E'}
            stroke="url(#oceanGoldGrad)"
            strokeWidth="1.2"
          />

          {/* Center Graphic: Architectural Roman Arch Intersected with Fluid Ocean Waves */}
          {/* Architectural Arch Frame */}
          <path
            d="M 37,58 V 46 A 13,13 0 0,1 63,46 V 58"
            fill="none"
            stroke="url(#oceanGoldGrad)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Gentle Dynamic Ocean Swell 1 */}
          <path
            d="M 34,54 Q 42,47 50,54 T 66,54"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Dynamic Ocean Swell 2 */}
          <path
            d="M 37,59 Q 44,53 50,59 T 63,59"
            fill="none"
            stroke="url(#oceanGoldGrad)"
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* Zenith Architectural Keystone / Sunburst Star */}
          <circle
            cx="50"
            cy="39"
            r="2"
            fill="url(#oceanGoldGrad)"
          />
        </svg>
      </div>

      {/* Typography with Company Name on the Right */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-bold tracking-tight leading-none font-['Playfair_Display',serif] ${sizeConfig.title} ${
              isLight ? 'text-white' : 'text-[#171717]'
            }`}
          >
            The Ocean Interiors
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`uppercase tracking-[0.24em] font-medium mt-1 leading-none ${sizeConfig.subtitle} ${
              isLight ? 'text-white/70' : 'text-[#6B6864]'
            }`}
          >
            Bespoke Architecture &amp; Living
          </span>
        )}
      </div>
    </div>
  );
};
