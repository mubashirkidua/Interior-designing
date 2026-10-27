import React, { useState } from 'react';
import { Layers, Sparkles, Check, Info, ZoomIn, MessageSquare, ArrowUpRight } from 'lucide-react';

interface MaterialSwatch {
  id: string;
  name: string;
  category: 'Stone' | 'Timber' | 'Metal' | 'Textile' | 'Glass';
  origin: string;
  finish: string;
  description: string;
  applications: string[];
  specs: {
    durability: string;
    textureFeel: string;
    maintenance: string;
    acousticValue: string;
  };
  gradientStyle: string;
  texturePattern: string;
  accentColor: string;
}

const MATERIAL_SWATCHES: MaterialSwatch[] = [
  {
    id: 'calacatta-gold',
    name: 'Italian Calacatta Gold Marble',
    category: 'Stone',
    origin: 'Carrara, Italy',
    finish: 'Honed Silk Velvet (Non-reflective matte)',
    description:
      'Warm milky-white base traversed by organic ribbons of honey-gold and smoky taupe. Honed to a velvety matte finish that feels organic to touch without harsh reflections.',
    applications: ['Book-matched TV Media Consoles', 'Waterfall Kitchen Islands', 'Primary Ensuite Vanity Tops', 'Fireplace Surrounds'],
    specs: {
      durability: 'Class 4 Architectural Stone',
      textureFeel: 'Cool, silky smooth, micro-honed',
      maintenance: 'Penetrating fluoropolymer seal applied',
      acousticValue: 'Sound reflective, mass dampening',
    },
    gradientStyle: 'from-[#FDFBF7] via-[#F4EFE6] to-[#E8DEC8]',
    texturePattern: 'radial-gradient(ellipse at 30% 40%, rgba(183,121,88,0.18) 0%, transparent 60%), linear-gradient(135deg, rgba(160,130,95,0.12) 20%, transparent 80%)',
    accentColor: '#B77958',
  },
  {
    id: 'smoked-walnut',
    name: 'American Smoked Walnut',
    category: 'Timber',
    origin: 'Appalachian Region, USA',
    finish: 'Wire-Brushed Organic Matte Oil (0% Sheen)',
    description:
      'Deep espresso heartwood with warm cocoa striations and cathedral grain patterns. Thermally smoked to ensure color permanence and treated with natural plant oils that deepen over decades.',
    applications: ['Custom Slatted Architectural Partitions', 'Walk-in Wardrobe Suites', 'Concealed Kitchen Cabinetry', 'Ceiling Baffle Systems'],
    specs: {
      durability: 'Janka Hardness: 1,010 lbf',
      textureFeel: 'Tactile open-grain timber with gentle ridges',
      maintenance: 'Zero-VOC micro-wax replenishable',
      acousticValue: 'NRC 0.65 with acoustic backing',
    },
    gradientStyle: 'from-[#2F2119] via-[#3E2B20] to-[#1E1510]',
    texturePattern: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 8px)',
    accentColor: '#C99168',
  },
  {
    id: 'champagne-brass',
    name: 'Brushed Champagne Brass',
    category: 'Metal',
    origin: 'Bespoke Studio Fabrication',
    finish: 'Directional Hand-Brushed Satin with Nano-Seal',
    description:
      'A muted, understated champagne gold that steers clear of brassy yellow tones. Hand-brushed with hairline precision and protected by an invisible aerospace anti-tarnish lacquer.',
    applications: ['Shadowline Reveal Profiles', 'Architectural Door Hardware', 'Floating Shelf Framing', 'Integrated LED Cove Trims'],
    specs: {
      durability: 'Solid C36000 Naval Brass Alloy',
      textureFeel: 'Crisp hairline directional brushed finish',
      maintenance: 'Anti-fingerprint nano-polymer barrier',
      acousticValue: 'Structural resonance damped',
    },
    gradientStyle: 'from-[#D8C7A5] via-[#EADBBE] to-[#BBA57E]',
    texturePattern: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
    accentColor: '#A0804D',
  },
  {
    id: 'roman-travertine',
    name: 'Hand-Fluted Roman Travertine',
    category: 'Stone',
    origin: 'Tivoli, Italy',
    finish: 'Sawn Face with Micro-Slurry Resin Infill',
    description:
      'Earthy, warm beige travertine featuring rhythmic vertical fluting machined and hand-finished by master stonemasons. Casts delicate shadows in ambient lighting.',
    applications: ['Entrance Foyer Accent Walls', 'Powder Room Feature Backsplashes', 'Floating Fireplace Hearths', 'Custom Monolithic Dining Tables'],
    specs: {
      durability: 'Compressive strength 75 MPa',
      textureFeel: 'Three-dimensional fluted scalloped relief',
      maintenance: 'Breathable penetrating water repellent',
      acousticValue: 'Sound scattering ribbed geometry',
    },
    gradientStyle: 'from-[#EBE4D5] via-[#DDD4C1] to-[#C9BD9F]',
    texturePattern: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 6px, rgba(255,255,255,0.15) 6px, rgba(255,255,255,0.15) 16px)',
    accentColor: '#9D8967',
  },
  {
    id: 'belgian-boucle',
    name: 'Belgian Bouclé & Heavy Slub Linen',
    category: 'Textile',
    origin: 'Flanders, Belgium',
    finish: 'Raw Organic Looped Weave (680 gsm)',
    description:
      'Ultra-tactile looped wool blend interlaced with unbleached slub flax. Naturally flame-resistant, stain-treated, and designed to wrap low-profile curved seating in cocoon-like comfort.',
    applications: ['Bespoke Curved Sectional Sofas', 'Upholstered Master Bed Headboards', 'Sculptural Occasional Armchairs', 'Acoustic Wall Panels'],
    specs: {
      durability: 'Martindale: 60,000 Rubs (Commercial Grade)',
      textureFeel: 'Warm, cloud-like looped dimension',
      maintenance: 'Eco-shield liquid repellent coating',
      acousticValue: 'NRC 0.80 High sound absorption',
    },
    gradientStyle: 'from-[#FAF6EE] via-[#F2EBDC] to-[#E5DAC6]',
    texturePattern: 'radial-gradient(circle at 50% 50%, rgba(130,110,80,0.08) 1px, transparent 1px)',
    accentColor: '#B77958',
  },
  {
    id: 'bronze-fluted-glass',
    name: 'Smoked Bronze Fluted Glass',
    category: 'Glass',
    origin: 'Saint-Gobain Spec Sheet',
    finish: 'Narrow Reeded Ribbon with Warm Bronze Tint',
    description:
      'Architectural low-iron glass cast with fine 10mm flutes and an integrated bronze smoke layer. It diffuses natural daylight while preserving privacy in open-concept floor plans.',
    applications: ['Ensuite Bathroom Sliding Partitions', 'Illuminated Bar Cabinetry Doors', 'Pantry & Butler Kitchen Screens', 'Staircase Balustrade Insets'],
    specs: {
      durability: '10mm Toughened Safety Tempered Glass',
      textureFeel: 'Crisp parallel convex fluting',
      maintenance: 'Easy-clean anti-limescale glass coating',
      acousticValue: 'Rw 34dB acoustic partition seal',
    },
    gradientStyle: 'from-[#4A3C31] via-[#5C4D40] to-[#362A20]',
    texturePattern: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 4px, rgba(0,0,0,0.2) 4px, rgba(0,0,0,0.2) 10px)',
    accentColor: '#7A6451',
  },
];

interface MaterialSwatchesExplorerProps {
  onConsult: (materialName?: string) => void;
}

export const MaterialSwatchesExplorer: React.FC<MaterialSwatchesExplorerProps> = ({ onConsult }) => {
  const [selectedId, setSelectedId] = useState<string>(MATERIAL_SWATCHES[0].id);
  const [isZoomed, setIsZoomed] = useState(false);

  const selectedMaterial = MATERIAL_SWATCHES.find((m) => m.id === selectedId) || MATERIAL_SWATCHES[0];

  const handleWhatsAppMaterialInquiry = (mat: MaterialSwatch) => {
    const text = `Hello Muhammad Mubashir Ali, I am exploring The Ocean Interiors material library and interested in using "${mat.name}" (${mat.finish}) for my home project.`;
    window.open(`https://wa.me/923428156086?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="materials" className="w-full py-16 lg:py-24 border-t border-[#DDD9D4] scroll-mt-20">
      {/* Editorial Header */}
      <div className="max-w-3xl mb-10 lg:mb-14">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B77958]">
            Tactile Materiality
          </span>
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#B77958]/10 text-[#B77958] rounded-full">
            Studio Sourcing Library
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-[#171717] leading-[1.12] font-['Playfair_Display',serif]">
          Bespoke materials &amp; tactile finishes
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
                Material Authenticity
              </span>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/15 text-[#E6B38A] font-bold border border-[#C99168]/30">
              Sourced Worldwide
            </span>
          </div>

          <p className="text-sm sm:text-[14.5px] text-[#D8B494] leading-relaxed relative z-10 font-normal">
            Every space curated by <strong className="text-[#F5D5B8] font-bold font-['Playfair_Display',serif]">The Ocean Interiors</strong> begins with honest, enduring substances. Explore our hand-selected architectural palette of Italian marbles, smoked hardwoods, bespoke champagne metals, and organic textiles.
          </p>

          <div className="mt-3 pt-2.5 border-t border-[#C99168]/20 flex items-center justify-between text-[11px] relative z-10">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
              <span className="font-semibold text-[#F5D5B8]">Tactile Sourcing</span>
              <span className="text-[#A88060]">· Sample Library</span>
            </div>
            <span className="font-mono text-[10px] text-[#C99168] font-semibold tracking-wider uppercase">
              Physical Swatches
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Swatch Explorer Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: 6 Interactive Swatch Cards Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3.5">
          {MATERIAL_SWATCHES.map((mat) => {
            const isSelected = mat.id === selectedId;
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => {
                  setSelectedId(mat.id);
                  setIsZoomed(false);
                }}
                className={`relative text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden group ${
                  isSelected
                    ? 'border-[#171717] bg-white ring-2 ring-[#B77958]/40 shadow-md scale-[1.02]'
                    : 'border-[#DDD9D4] bg-[#F7F5F2] hover:bg-white hover:border-[#B77958]/50 shadow-2xs'
                }`}
              >
                {/* Visual Tactile Swatch Circle */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${mat.gradientStyle} border border-black/10 shadow-inner relative overflow-hidden transition-transform group-hover:scale-105`}
                    style={{
                      backgroundImage: `${mat.texturePattern}, linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                    }}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#EEEAE5] text-[#6B6864] font-semibold">
                    {mat.category}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#171717] leading-snug font-['Playfair_Display',serif]">
                    {mat.name}
                  </h4>
                  <p className="text-[11px] text-[#6B6864] mt-0.5 truncate">{mat.origin}</p>
                </div>

                {isSelected && (
                  <div className="mt-2.5 pt-2 border-t border-[#EEEAE5] flex items-center justify-between text-[10px] text-[#B77958] font-semibold">
                    <span>Active Selection</span>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side: Deep Dive Specification Stage */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DDD9D4] p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
          {/* Top Swatch Overview Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EEEAE5]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#B77958]">
                  {selectedMaterial.category} Specification
                </span>
                <span className="text-[#DDD9D4]">·</span>
                <span className="text-xs text-[#6B6864]">{selectedMaterial.origin}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#171717] font-['Playfair_Display',serif]">
                {selectedMaterial.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#B77958] font-medium mt-1">
                Finish: {selectedMaterial.finish}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsZoomed(!isZoomed)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#171717] bg-[#F7F5F2] hover:bg-[#EEEAE5] border border-[#DDD9D4] rounded-full transition-colors cursor-pointer self-start sm:self-auto"
            >
              <ZoomIn className="w-3.5 h-3.5 text-[#B77958]" />
              <span>{isZoomed ? 'Reset View' : 'Macro Texture View'}</span>
            </button>
          </div>

          {/* Large Tactile Macro Texture Preview Canvas */}
          <div
            className={`w-full rounded-xl my-6 border border-black/10 relative overflow-hidden transition-all duration-300 shadow-inner ${
              isZoomed ? 'h-64 sm:h-72 scale-[1.01]' : 'h-40 sm:h-48'
            }`}
            style={{
              background: `linear-gradient(135deg, ${selectedMaterial.accentColor}22 0%, #FAF9F6 100%)`,
            }}
          >
            {/* Texture Simulation Layer */}
            <div
              className={`w-full h-full bg-gradient-to-br ${selectedMaterial.gradientStyle} transition-all duration-500`}
              style={{
                backgroundImage: `${selectedMaterial.texturePattern}`,
                backgroundSize: isZoomed ? '40px 40px' : '20px 20px',
              }}
            />

            {/* Spec Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4 text-white">
              <div className="flex items-center justify-between w-full">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#E8DEC8]">
                    Natural Grain &amp; Surface Relief
                  </span>
                  <p className="text-xs font-semibold">{selectedMaterial.finish}</p>
                </div>
                <span className="text-[11px] font-mono bg-black/40 px-2 py-0.5 rounded-sm backdrop-blur-sm">
                  {isZoomed ? 'Macro 2.5x Zoom' : 'Standard 1x'}
                </span>
              </div>
            </div>
          </div>

          {/* Material Narrative & Applications */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#6B6864] font-semibold mb-2">
                Curator’s Note &amp; Tactile Feel
              </h4>
              <p className="text-sm sm:text-base text-[#171717] leading-relaxed">
                {selectedMaterial.description}
              </p>
            </div>

            {/* Architectural Applications Pills */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#6B6864] font-semibold mb-2.5">
                Ideal Architectural Applications
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedMaterial.applications.map((app, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#F7F5F2] text-[#171717] rounded-full border border-[#DDD9D4]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B77958]" />
                    <span>{app}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#EEEAE5] text-xs">
              <div className="p-2.5 bg-[#FAF9F6] rounded-lg">
                <span className="text-[10px] text-[#6B6864] uppercase block">Durability</span>
                <span className="font-semibold text-[#171717] mt-0.5 block">{selectedMaterial.specs.durability}</span>
              </div>
              <div className="p-2.5 bg-[#FAF9F6] rounded-lg">
                <span className="text-[10px] text-[#6B6864] uppercase block">Surface Feel</span>
                <span className="font-semibold text-[#171717] mt-0.5 block">{selectedMaterial.specs.textureFeel}</span>
              </div>
              <div className="p-2.5 bg-[#FAF9F6] rounded-lg">
                <span className="text-[10px] text-[#6B6864] uppercase block">Maintenance</span>
                <span className="font-semibold text-[#171717] mt-0.5 block">{selectedMaterial.specs.maintenance}</span>
              </div>
              <div className="p-2.5 bg-[#FAF9F6] rounded-lg">
                <span className="text-[10px] text-[#6B6864] uppercase block">Acoustics</span>
                <span className="font-semibold text-[#171717] mt-0.5 block">{selectedMaterial.specs.acousticValue}</span>
              </div>
            </div>

            {/* Interactive Actions */}
            <div className="pt-4 border-t border-[#EEEAE5] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleWhatsAppMaterialInquiry(selectedMaterial)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-full transition-all cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Inquire About Sourcing this Material</span>
              </button>

              <button
                type="button"
                onClick={() => onConsult(`Material: ${selectedMaterial.name}`)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#171717] hover:bg-[#252321] text-white text-xs font-semibold rounded-full transition-all cursor-pointer shadow-xs"
              >
                <span>Request Sample Tray</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
