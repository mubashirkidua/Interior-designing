import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Check, 
  Sparkles, 
  Plus, 
  Minus, 
  Copy, 
  CheckCheck, 
  Home, 
  Sliders, 
  RotateCcw,
  Layers,
  ChevronDown,
  ChevronUp,
  Ruler
} from 'lucide-react';
import { InteractiveCalculatorModal } from './InteractiveCalculatorModal';

interface CostEstimatorProps {
  onConsult: (serviceOrProject?: string) => void;
}

type SpaceType = 'living' | 'master_bed' | 'kitchen' | 'penthouse' | 'villa' | 'corporate' | 'custom';
type FinishTier = 'executive' | 'signature' | 'royal';

interface SpaceConfig {
  id: SpaceType;
  label: string;
  defaultSqFt: number;
  minSqFt: number;
  maxSqFt: number;
  subtext: string;
}

const SPACES: SpaceConfig[] = [
  { id: 'living', label: 'Grand Living & Dining Lounge', defaultSqFt: 850, minSqFt: 250, maxSqFt: 3000, subtext: 'Living, drawing & dining space' },
  { id: 'master_bed', label: 'Master Bedroom Suite + Wardrobe', defaultSqFt: 600, minSqFt: 200, maxSqFt: 2000, subtext: 'Bedroom, walk-in closet & vanity' },
  { id: 'kitchen', label: 'Luxury Open-Concept Kitchen', defaultSqFt: 350, minSqFt: 120, maxSqFt: 1000, subtext: 'Cabinets, island & appliances' },
  { id: 'penthouse', label: 'Complete Luxury Penthouse', defaultSqFt: 3200, minSqFt: 1500, maxSqFt: 8000, subtext: 'Entire multi-room penthouse' },
  { id: 'villa', label: 'Complete Luxury Villa / Bungalow', defaultSqFt: 5500, minSqFt: 2000, maxSqFt: 15000, subtext: 'Full architectural turnkey villa' },
  { id: 'corporate', label: 'Executive Corporate Office', defaultSqFt: 1800, minSqFt: 400, maxSqFt: 10000, subtext: 'Boardrooms, suites & reception' },
  { id: 'custom', label: 'Custom Covered Area', defaultSqFt: 2250, minSqFt: 100, maxSqFt: 25000, subtext: 'Enter your exact plot / covered area' },
];

const PRESETS = [
  { label: '500 Sq Ft', sqFt: 500 },
  { label: '5 Marla (1,125 sq ft)', sqFt: 1125 },
  { label: '10 Marla (2,250 sq ft)', sqFt: 2250 },
  { label: '1 Kanal (4,500 sq ft)', sqFt: 4500 },
  { label: '2 Kanal (9,000 sq ft)', sqFt: 9000 },
];

const TIERS: { id: FinishTier; name: string; ratePerSqFt: number; description: string; highlights: string[] }[] = [
  {
    id: 'executive',
    name: 'Executive Turnkey',
    ratePerSqFt: 3400,
    description: 'Clean minimalist architectural lines with high-pressure natural veneers, quartz surfaces, and warm ambient profile lighting.',
    highlights: ['Natural oak/ash wood veneers', 'Engineered quartz countertops', 'Concealed LED architectural fixtures', 'Durable high-grade fittings'],
  },
  {
    id: 'signature',
    name: 'Signature Ocean (Most Popular)',
    ratePerSqFt: 5200,
    description: 'Our hallmark luxury aesthetic. Custom fluted solid timber, imported porcelain slabs, Philips Hue cove scenes, and bespoke tailored seating.',
    highlights: ['Solid walnut & fluted paneling', 'Imported large-format porcelain slabs', 'Smart ambient lighting controls', 'Custom hand-finished furniture'],
  },
  {
    id: 'royal',
    name: 'Royal Bespoke Heritage',
    ratePerSqFt: 7800,
    description: 'Uncompromising presidential craftsmanship. Bookmatched Italian Calacatta marble, acoustic artisan joinery, Lutron automation, and European designer pieces.',
    highlights: ['Italian Calacatta / Statuario marble', 'Acoustic architectural wood panelling', 'Lutron intelligent automation', 'White-glove styling & 5-year warranty'],
  },
];

interface AddonOption {
  id: string;
  name: string;
  ratePerSqFt?: number;
  fixedAmount?: number;
  description: string;
}

const ADDONS: AddonOption[] = [
  {
    id: 'automation',
    name: 'Smart Home Automation & Scene Control',
    ratePerSqFt: 350,
    description: 'Lutron / Tuya smart switches, curtain motors, and mobile app mood lighting.',
  },
  {
    id: 'marble',
    name: 'Imported Italian Marble / Porcelain Slab Upgrade',
    ratePerSqFt: 650,
    description: 'Bookmatched Italian Calacatta / Botticino flooring and wall feature slabs.',
  },
  {
    id: 'kitchen_app',
    name: 'German Concealed Kitchen Appliances Package',
    fixedAmount: 480000,
    description: 'Built-in induction hob, concealed hood, microwave & oven set (Bosch/Siemens/Franke grade).',
  },
];

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onConsult }) => {
  const [selectedSpace, setSelectedSpace] = useState<SpaceType>('living');
  const [selectedTier, setSelectedTier] = useState<FinishTier>('signature');
  const [sqFt, setSqFt] = useState<number>(850);
  const [sqFtRaw, setSqFtRaw] = useState<string>('850');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [showExactPKR, setShowExactPKR] = useState<boolean>(false);
  const [showBreakdown, setShowBreakdown] = useState<boolean>(true);
  const [isCalculatedFlash, setIsCalculatedFlash] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isRecalculatedSuccess, setIsRecalculatedSuccess] = useState<boolean>(false);
  const [isResetSuccess, setIsResetSuccess] = useState<boolean>(false);

  const currentSpaceConfig = useMemo(() => {
    return SPACES.find((s) => s.id === selectedSpace) || SPACES[0];
  }, [selectedSpace]);

  const currentTierConfig = useMemo(() => {
    return TIERS.find((t) => t.id === selectedTier) || TIERS[1];
  }, [selectedTier]);

  // When user switches space, update sqft to appropriate default
  const handleSpaceChange = (spaceId: SpaceType) => {
    setSelectedSpace(spaceId);
    const config = SPACES.find((s) => s.id === spaceId);
    if (config) {
      setSqFt(config.defaultSqFt);
      setSqFtRaw(String(config.defaultSqFt));
    }
    triggerFlash();
  };

  const handleSqFtChange = (value: number) => {
    const clamped = Math.max(100, Math.min(30000, value || 100));
    setSqFt(clamped);
    setSqFtRaw(String(clamped));
    triggerFlash();
  };

  const handleSqFtInputChange = (rawVal: string) => {
    setSqFtRaw(rawVal);
    const parsed = parseInt(rawVal, 10);
    if (!isNaN(parsed) && parsed >= 50 && parsed <= 35000) {
      setSqFt(parsed);
      triggerFlash();
    }
  };

  const handleSqFtBlur = () => {
    const parsed = parseInt(sqFtRaw, 10);
    if (isNaN(parsed) || parsed < 100) {
      setSqFt(100);
      setSqFtRaw('100');
    } else if (parsed > 30000) {
      setSqFt(30000);
      setSqFtRaw('30000');
    } else {
      setSqFt(parsed);
      setSqFtRaw(String(parsed));
    }
    triggerFlash();
  };

  const adjustSqFt = (delta: number) => {
    setSqFt((prev) => {
      const next = Math.max(100, Math.min(30000, prev + delta));
      setSqFtRaw(String(next));
      return next;
    });
    triggerFlash();
  };

  const handleApplyFromModal = (newSqFt: number) => {
    setSqFt(newSqFt);
    setSqFtRaw(String(newSqFt));
    triggerFlash();
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
    triggerFlash();
  };

  const triggerFlash = () => {
    setIsCalculatedFlash(true);
    setTimeout(() => setIsCalculatedFlash(false), 700);
  };

  const handleManualCalculate = () => {
    setIsCalculating(true);
    triggerFlash();
    
    // Smooth scroll so the user clearly sees the updated budget on any device
    const resultBox = document.getElementById('budget-output-card');
    if (resultBox) {
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    setTimeout(() => {
      setIsCalculating(false);
      setIsRecalculatedSuccess(true);
      setTimeout(() => setIsRecalculatedSuccess(false), 2500);
    }, 300);
  };

  const handleReset = () => {
    setSelectedSpace('living');
    setSelectedTier('signature');
    setSqFt(850);
    setSqFtRaw('850');
    setSelectedAddons([]);
    setIsResetSuccess(true);
    triggerFlash();
    setTimeout(() => setIsResetSuccess(false), 2000);
  };

  // Calculations
  const calculatedBudgetPKR = useMemo(() => {
    let base = sqFt * currentTierConfig.ratePerSqFt;

    // Add selected addons
    selectedAddons.forEach((addonId) => {
      const addon = ADDONS.find((a) => a.id === addonId);
      if (addon) {
        if (addon.ratePerSqFt) {
          base += sqFt * addon.ratePerSqFt;
        }
        if (addon.fixedAmount) {
          base += addon.fixedAmount;
        }
      }
    });

    const min = Math.round((base * 0.95) / 10000) * 10000;
    const max = Math.round((base * 1.08) / 10000) * 10000;
    const avg = Math.round(base / 10000) * 10000;

    return { min, max, avg, base };
  }, [sqFt, currentTierConfig, selectedAddons]);

  const estimatedWeeks = useMemo(() => {
    if (sqFt < 600) return '4 – 6 Weeks';
    if (sqFt < 1500) return '6 – 8 Weeks';
    if (sqFt < 3500) return '8 – 12 Weeks';
    if (sqFt < 7000) return '12 – 16 Weeks';
    return '16 – 22 Weeks';
  }, [sqFt]);

  // Format PKR to Lakhs / Crores
  const formatPKR = (amount: number): string => {
    if (amount >= 10000000) {
      const crores = (amount / 10000000).toFixed(2);
      return `PKR ${crores} Crore`;
    }
    const lakhs = (amount / 100000).toFixed(1);
    return `PKR ${lakhs} Lakh`;
  };

  // WhatsApp Message
  const whatsappMessageUrl = useMemo(() => {
    const addonsList = selectedAddons.length > 0 
      ? selectedAddons.map((id) => ADDONS.find((a) => a.id === id)?.name).filter(Boolean).join(', ')
      : 'Standard Turnkey Inclusions';

    const text = `Hello CEO Muhammad Mubashir Ali,\n\nI just calculated an estimated turnkey budget on The Ocean Interiors website:\n\n• Space Type: ${currentSpaceConfig.label}\n• Covered Area: ${sqFt.toLocaleString()} Sq. Ft.\n• Specification Tier: ${currentTierConfig.name} (~PKR ${currentTierConfig.ratePerSqFt.toLocaleString()}/sq ft)\n• Add-ons Selected: ${addonsList}\n• Preliminary Budget: ${formatPKR(calculatedBudgetPKR.min)} to ${formatPKR(calculatedBudgetPKR.max)} (approx PKR ${calculatedBudgetPKR.min.toLocaleString()} to ${calculatedBudgetPKR.max.toLocaleString()})\n• Estimated Timeline: ${estimatedWeeks}\n\nI would like to discuss my project requirements and arrange an on-site architectural consultation with you.`;
    return `https://wa.me/923428156086?text=${encodeURIComponent(text)}`;
  }, [currentSpaceConfig, sqFt, currentTierConfig, selectedAddons, calculatedBudgetPKR, estimatedWeeks]);

  const handleCopyQuote = () => {
    const addonsList = selectedAddons.length > 0 
      ? selectedAddons.map((id) => ADDONS.find((a) => a.id === id)?.name).filter(Boolean).join(', ')
      : 'Standard Turnkey Scope';

    const text = `THE OCEAN INTERIORS - TURNKEY ESTIMATE\nSpace: ${currentSpaceConfig.label}\nCovered Area: ${sqFt.toLocaleString()} Sq. Ft.\nTier: ${currentTierConfig.name} (PKR ${currentTierConfig.ratePerSqFt}/sq ft)\nAdd-ons: ${addonsList}\nEstimated Budget: ${formatPKR(calculatedBudgetPKR.min)} – ${formatPKR(calculatedBudgetPKR.max)} (PKR ${calculatedBudgetPKR.min.toLocaleString()} to ${calculatedBudgetPKR.max.toLocaleString()})\nTimeline: ${estimatedWeeks}\nCEO Muhammad Mubashir Ali: 0342-8156086 / 0323-2930657`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="estimator" className="py-20 lg:py-28 border-t border-[#DDD9D4] relative scroll-mt-20">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 px-4">
        <button
          type="button"
          onClick={() => setIsCalculatorModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B77958]/10 hover:bg-[#B77958]/20 border border-[#B77958]/30 text-xs font-bold uppercase tracking-wider text-[#B77958] mb-3 font-mono cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-2xs group"
          title="Click to Open Full Interactive Keypad, Dimension & Unit Calculator"
        >
          <Calculator className="w-4 h-4 text-[#B77958] group-hover:rotate-12 transition-transform" />
          <span>Interactive PKR Turnkey Calculator · Click to Open Full Tool</span>
        </button>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#171717] font-['Playfair_Display',serif]">
          Preliminary Budget &amp; Turnkey Scope Estimator
        </h2>
        {/* Bespoke Luxury Editorial Frame - Black Background with Warm Brown Typography */}
        <div className="mt-5 relative p-5 sm:p-6 rounded-2xl bg-[#141414] border border-[#C99168]/40 shadow-xl shadow-black/30 overflow-hidden text-left transition-all duration-300 hover:shadow-2xl hover:border-[#C99168]/60 group">
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
                Live Pricing &amp; Scope Guidance
              </span>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#C99168]/15 text-[#E6B38A] font-bold border border-[#C99168]/30">
              PKR Standards
            </span>
          </div>

          <p className="text-sm sm:text-[14.5px] text-[#D8B494] leading-relaxed relative z-10 font-normal">
            Select your property type, enter your exact square footage, and choose your finish tier. Your turnkey budget updates in real-time in Pakistani Rupees (PKR) and can be sent directly to CEO <strong className="text-[#E6B38A] font-semibold underline decoration-[#C99168]/50 underline-offset-2">Muhammad Mubashir Ali</strong> on WhatsApp.
          </p>

          <div className="mt-3 pt-2.5 border-t border-[#C99168]/20 flex items-center justify-between text-[11px] relative z-10">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C99168]" />
              <span className="font-semibold text-[#F5D5B8]">Architectural Transparency</span>
              <span className="text-[#A88060]">· Real-time Quotation</span>
            </div>
            <span className="font-mono text-[10px] text-[#C99168] font-semibold tracking-wider uppercase">
              100% Itemized
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-[#DDD9D4] shadow-sm space-y-8">
          
          {/* Step 1: Select Space Type */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171717] font-mono flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#171717] text-white inline-flex items-center justify-center text-[11px]">1</span>
                <span>Select Property or Space Type</span>
              </label>
              <span className="text-[11px] text-[#6B6864]">Click to pick</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SPACES.map((space) => {
                const isSelected = selectedSpace === space.id;
                return (
                  <button
                    key={space.id}
                    type="button"
                    onClick={() => handleSpaceChange(space.id)}
                    className={`p-3 text-left rounded-md border transition-all text-xs cursor-pointer flex flex-col justify-between h-22 relative overflow-hidden ${
                      isSelected
                        ? 'border-[#B77958] bg-[#171717] text-white shadow-md ring-2 ring-[#B77958]/40'
                        : 'border-[#DDD9D4] bg-[#F7F5F2] text-[#171717] hover:border-[#171717] hover:bg-white'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C99168] animate-pulse" />
                    )}
                    <span className="font-semibold block leading-snug line-clamp-2">
                      {space.label}
                    </span>
                    <div className="mt-1 flex items-center justify-between text-[10px]">
                      <span className={isSelected ? 'text-[#C99168]' : 'text-[#6B6864]'}>
                        ~{space.defaultSqFt.toLocaleString()} sq ft
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#C99168]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Covered Area Input & Slider (Direct Numeric Typing + Presets + Slider) */}
          <div className="bg-[#FAF9F6] p-4 sm:p-5 rounded-lg border border-[#DDD9D4]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <label htmlFor="sqft-input" className="text-xs font-bold uppercase tracking-wider text-[#171717] font-mono flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#171717] text-white inline-flex items-center justify-center text-[11px]">2</span>
                <span>Covered Area (Square Feet)</span>
              </label>

              {/* Number Input Box with +/- buttons */}
              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => adjustSqFt(-100)}
                  disabled={sqFt <= 100}
                  className="w-8 h-8 rounded border border-[#DDD9D4] bg-white hover:bg-[#EEEAE5] flex items-center justify-center text-[#171717] transition-colors cursor-pointer disabled:opacity-40"
                  title="Decrease 100 sq ft"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <div className="relative">
                  <input
                    id="sqft-input"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={sqFtRaw}
                    onChange={(e) => handleSqFtInputChange(e.target.value)}
                    onBlur={handleSqFtBlur}
                    className="w-28 text-center py-1 px-2 font-mono font-bold text-base bg-white border border-[#DDD9D4] rounded focus:outline-none focus:ring-2 focus:ring-[#B77958] text-[#171717]"
                  />
                  <span className="absolute -bottom-4 left-0 right-0 text-center text-[9px] text-[#6B6864] font-mono">
                    Type or Edit
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => adjustSqFt(100)}
                  disabled={sqFt >= 30000}
                  className="w-8 h-8 rounded border border-[#DDD9D4] bg-white hover:bg-[#EEEAE5] flex items-center justify-center text-[#171717] transition-colors cursor-pointer disabled:opacity-40"
                  title="Increase 100 sq ft"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-semibold text-[#6B6864] ml-1">Sq. Ft.</span>
              </div>
            </div>

            {/* Range Slider */}
            <div className="mt-4">
              <input
                id="sqft-slider"
                type="range"
                min={100}
                max={Math.max(12000, currentSpaceConfig.maxSqFt)}
                step={50}
                value={sqFt}
                onChange={(e) => handleSqFtChange(Number(e.target.value))}
                className="w-full h-2.5 bg-[#DDD9D4] rounded-lg appearance-none cursor-pointer accent-[#B77958]"
                aria-label="Adjust square footage slider"
              />
              <div className="flex justify-between text-[11px] text-[#6B6864] mt-1 font-mono">
                <span>100 sq ft</span>
                <span>2,500 sq ft</span>
                <span>5,000 sq ft</span>
                <span>10,000+ sq ft</span>
              </div>
            </div>

            {/* Quick Size Preset Chips (Marla / Kanal / Standard) */}
            <div className="mt-3.5 pt-3 border-t border-[#DDD9D4]/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6864] block mb-2 font-mono">
                Quick Size Shortcuts (Pakistan Standards):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleSqFtChange(preset.sqFt)}
                    className={`px-2.5 py-1 text-xs rounded-full border transition-all cursor-pointer font-mono ${
                      sqFt === preset.sqFt
                        ? 'bg-[#B77958] text-white border-[#B77958] font-bold shadow-xs'
                        : 'bg-white text-[#171717] border-[#DDD9D4] hover:border-[#171717]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Direct Helper Button to Open Dimensions & Land Unit Calculator */}
              <div className="mt-3 pt-2.5 border-t border-[#DDD9D4]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[11px] text-[#6B6864] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B77958]" />
                  Need exact plot dimensions or Marla calculation?
                </span>
                <button
                  type="button"
                  onClick={() => setIsCalculatorModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#F7F5F2] border border-[#B77958] text-[#B77958] hover:text-[#171717] rounded-full text-xs font-bold cursor-pointer transition-colors shadow-2xs self-start sm:self-auto"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Open Dimensions Calculator (Length × Width)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: Finish Quality Tier */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171717] font-mono flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#171717] text-white inline-flex items-center justify-center text-[11px]">3</span>
                <span>Specification &amp; Finish Quality Tier</span>
              </label>
              <span className="text-[11px] text-[#6B6864]">Includes Turnkey Execution</span>
            </div>

            <div className="space-y-3">
              {TIERS.map((tier) => {
                const isSelected = selectedTier === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => {
                      setSelectedTier(tier.id);
                      triggerFlash();
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedTier(tier.id);
                        triggerFlash();
                      }
                    }}
                    className={`p-4 rounded-md border transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'border-[#B77958] bg-[#F7F5F2] ring-2 ring-[#B77958]/30 shadow-xs'
                        : 'border-[#DDD9D4] bg-white hover:border-[#171717]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-[#B77958] bg-[#B77958]' : 'border-[#DDD9D4]'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <h4 className="font-bold text-sm text-[#171717]">{tier.name}</h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#B77958] bg-[#B77958]/10 px-2.5 py-0.5 rounded-full">
                        PKR {tier.ratePerSqFt.toLocaleString()} / sq ft
                      </span>
                    </div>

                    <p className="text-xs text-[#6B6864] mt-1.5 ml-6.5 leading-relaxed">
                      {tier.description}
                    </p>

                    <div className="mt-2.5 ml-6.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#171717]">
                      {tier.highlights.map((h, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-[#6B6864]">
                          <Check className="w-3 h-3 text-[#B77958]" /> {h}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 4: Optional Architectural Add-ons */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171717] font-mono flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#171717] text-white inline-flex items-center justify-center text-[11px]">4</span>
                <span>Optional Turnkey Add-ons &amp; Upgrades</span>
              </label>
              <span className="text-[11px] text-[#6B6864]">Optional</span>
            </div>

            <div className="space-y-2">
              {ADDONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <label
                    key={addon.id}
                    className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-all ${
                      isChecked
                        ? 'border-[#B77958] bg-[#F7F5F2]'
                        : 'border-[#DDD9D4] bg-white hover:border-[#171717]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleAddon(addon.id)}
                      className="mt-0.5 h-4 w-4 rounded border-[#DDD9D4] text-[#B77958] focus:ring-[#B77958] accent-[#B77958] cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#171717]">{addon.name}</span>
                        <span className="text-[11px] font-mono font-bold text-[#B77958]">
                          {addon.ratePerSqFt ? `+PKR ${addon.ratePerSqFt}/sq ft` : `+PKR ${(addon.fixedAmount || 0).toLocaleString()}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B6864] mt-0.5">{addon.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Action Trigger Buttons for User Confidence */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleManualCalculate}
              disabled={isCalculating}
              className={`w-full sm:w-auto flex-1 py-3 px-5 font-bold text-xs rounded-full transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer group active:scale-95 ${
                isRecalculatedSuccess
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                  : 'bg-[#171717] hover:bg-[#252321] text-white'
              }`}
            >
              {isCalculating ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#C99168] border-t-transparent rounded-full animate-spin" />
                  <span className="text-[#C99168]">Computing Turnkey Scope...</span>
                </>
              ) : isRecalculatedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span className="text-white">✓ Estimate Recalculated!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#C99168] group-hover:rotate-12 transition-transform" />
                  <span>⚡ Recalculate Estimate Now</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className={`w-full sm:w-auto py-3 px-4 border rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs ${
                isResetSuccess
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold'
                  : 'border-[#DDD9D4] hover:bg-[#F7F5F2] text-[#6B6864] hover:text-[#171717] font-medium'
              }`}
              title="Reset to default values"
            >
              {isResetSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>✓ Reset Done!</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Calculated Quote Card (5 cols) */}
        <div 
          id="budget-output-card"
          className={`lg:col-span-5 bg-[#171717] text-white p-6 sm:p-8 rounded-lg shadow-xl space-y-6 lg:sticky lg:top-24 transition-all duration-300 ${
            isCalculatedFlash ? 'ring-4 ring-[#C99168] scale-[1.01]' : ''
          }`}
        >
          {/* Card Header with Interactive Clickable Calculator Button */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C99168] font-mono block">
                  Estimated Turnkey Scope
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 text-[9px] font-mono rounded bg-emerald-500/20 text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Active
                </span>
              </div>
              <h3 className="text-xl font-bold font-['Playfair_Display',serif] text-white">
                Preliminary Budget
              </h3>
            </div>
            
            {/* Interactive Calculator Button - Addresses top calculator usage */}
            <button
              type="button"
              onClick={() => setIsCalculatorModalOpen(true)}
              className="group flex items-center gap-2 py-2 px-3.5 bg-gradient-to-r from-[#C99168] to-[#B77958] hover:from-[#d9a27b] hover:to-[#c68969] text-white font-bold text-xs rounded-full shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ring-2 ring-[#C99168]/50"
              title="Click here to open the Interactive Calculator & Unit Converter"
              aria-label="Open Interactive Calculator and Unit Converter"
            >
              <Calculator className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              <span className="font-semibold tracking-wide">Open Calculator</span>
            </button>
          </div>

          {/* Live Feedback Status Banner */}
          {isRecalculatedSuccess && (
            <div className="py-2 px-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between transition-all duration-300">
              <span className="flex items-center gap-2 font-bold">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Estimate Recalculated with Selected Options!</span>
              </span>
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-200">Live</span>
            </div>
          )}

          {/* Primary Budget Display */}
          <div className="bg-white/5 p-5 rounded-lg border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#DDD9D4] font-mono">
                Estimated Investment Range:
              </span>
              <button
                type="button"
                onClick={() => setShowExactPKR(!showExactPKR)}
                className="text-[10px] text-[#C99168] hover:underline font-mono cursor-pointer"
              >
                {showExactPKR ? 'Show in Lakhs/Crores' : 'Show Exact Numbers'}
              </button>
            </div>

            <div className="mt-1 flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[#C99168]">
                {showExactPKR
                  ? `PKR ${calculatedBudgetPKR.min.toLocaleString()} – ${calculatedBudgetPKR.max.toLocaleString()}`
                  : `${formatPKR(calculatedBudgetPKR.min)} – ${formatPKR(calculatedBudgetPKR.max)}`}
              </span>
              <span className="text-xs text-neutral-400 font-mono mt-1">
                {showExactPKR
                  ? `(${formatPKR(calculatedBudgetPKR.min)} to ${formatPKR(calculatedBudgetPKR.max)})`
                  : `(Approx. PKR ${calculatedBudgetPKR.min.toLocaleString()} to ${calculatedBudgetPKR.max.toLocaleString()})`}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#DDD9D4]">
              <span>Average Rate:</span>
              <span className="font-mono font-bold text-white">
                ~PKR {Math.round(calculatedBudgetPKR.avg / sqFt).toLocaleString()} / sq ft
              </span>
            </div>
          </div>

          {/* Selected Specifications Breakdown */}
          <div className="space-y-2.5 text-xs border-y border-white/10 py-4">
            <div className="flex justify-between items-center text-[#DDD9D4]">
              <span>Space / Property:</span>
              <span className="font-semibold text-white truncate max-w-[200px] text-right">
                {currentSpaceConfig.label}
              </span>
            </div>
            <div className="flex justify-between items-center text-[#DDD9D4]">
              <span>Covered Area:</span>
              <span className="font-mono font-semibold text-white">
                {sqFt.toLocaleString()} Sq. Ft.
              </span>
            </div>
            <div className="flex justify-between items-center text-[#DDD9D4]">
              <span>Execution Tier:</span>
              <span className="font-semibold text-white">
                {currentTierConfig.name}
              </span>
            </div>
            {selectedAddons.length > 0 && (
              <div className="flex justify-between items-center text-[#DDD9D4]">
                <span>Add-ons Included:</span>
                <span className="font-mono text-[#C99168] text-right text-[11px]">
                  {selectedAddons.length} Selected
                </span>
              </div>
            )}
            <div className="flex justify-between items-center text-[#DDD9D4]">
              <span>Estimated Delivery:</span>
              <span className="font-semibold text-[#C99168] flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" /> {estimatedWeeks}
              </span>
            </div>
          </div>

          {/* Turnkey Scope Breakdown Accordion */}
          <div className="border border-white/10 rounded-md p-3 bg-white/5">
            <button
              type="button"
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="w-full flex items-center justify-between text-xs font-semibold text-white cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#C99168]" />
                <span>Turnkey Cost Allocation Breakdown</span>
              </span>
              {showBreakdown ? <ChevronUp className="w-3.5 h-3.5 text-[#C99168]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#C99168]" />}
            </button>

            {showBreakdown && (
              <div className="mt-3 space-y-2 text-[11px] text-neutral-300 border-t border-white/10 pt-2.5">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Bespoke Woodwork &amp; Custom Joinery</span>
                    <span className="font-mono text-white">~35% (PKR {Math.round((calculatedBudgetPKR.avg * 0.35) / 1000).toLocaleString()}k)</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#C99168] w-[35%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Civil, Marble Flooring &amp; Surfaces</span>
                    <span className="font-mono text-white">~28% (PKR {Math.round((calculatedBudgetPKR.avg * 0.28) / 1000).toLocaleString()}k)</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#B77958] w-[28%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Smart Lighting, False Ceiling &amp; Electrical</span>
                    <span className="font-mono text-white">~18% (PKR {Math.round((calculatedBudgetPKR.avg * 0.18) / 1000).toLocaleString()}k)</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 w-[18%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Hardware, Sanitary &amp; Fixtures</span>
                    <span className="font-mono text-white">~12% (PKR {Math.round((calculatedBudgetPKR.avg * 0.12) / 1000).toLocaleString()}k)</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-stone-500 w-[12%]" />
                  </div>
                </div>

                <div className="pt-1 text-[10px] text-emerald-400 flex items-center justify-between">
                  <span>3D Architectural Renders &amp; CEO Supervision</span>
                  <span className="font-bold uppercase tracking-wider">Free / Included</span>
                </div>
              </div>
            )}
          </div>

          {/* Guarantee Note */}
          <div className="flex items-start gap-2 text-[11px] text-neutral-300">
            <ShieldCheck className="w-4 h-4 text-[#C99168] shrink-0 mt-0.5" />
            <span>Turnkey guarantee covers complete 3D visualization, material procurement, civil execution, artisan joinery, and on-site oversight by CEO Muhammad Mubashir Ali.</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            {/* 1. Direct WhatsApp to CEO */}
            <a
              href={whatsappMessageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs rounded-full transition-all shadow-md cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Send This Estimate to CEO on WhatsApp</span>
            </a>

            {/* 2. Book Consultation with prefill */}
            <button
              type="button"
              onClick={() => onConsult(`Turnkey Estimate: ${currentSpaceConfig.label} (${sqFt.toLocaleString()} sq ft, ${currentTierConfig.name}, Budget: ${formatPKR(calculatedBudgetPKR.min)} – ${formatPKR(calculatedBudgetPKR.max)})`)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-full transition-all cursor-pointer border border-white/20"
            >
              <span>Schedule Architectural Site Visit</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C99168]" />
            </button>

            {/* 3. Copy Quote to Clipboard */}
            <button
              type="button"
              onClick={handleCopyQuote}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Estimate Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Estimate Breakdown Summary</span>
                </>
              )}
            </button>
          </div>

          {/* Direct Contacts Footer */}
          <div className="text-[10px] text-center text-neutral-400 pt-1 border-t border-white/10">
            CEO Direct WhatsApp: <strong className="text-white font-mono">0342-8156086</strong> · Phone: <strong className="text-white font-mono">0323-2930657</strong>
          </div>
        </div>
      </div>

      {/* Interactive Architecture & Budget Calculator Modal */}
      <InteractiveCalculatorModal
        isOpen={isCalculatorModalOpen}
        onClose={() => setIsCalculatorModalOpen(false)}
        initialSqFt={sqFt}
        initialRate={currentTierConfig.ratePerSqFt}
        onApplySqFt={handleApplyFromModal}
        onConsult={onConsult}
      />
    </section>
  );
};
