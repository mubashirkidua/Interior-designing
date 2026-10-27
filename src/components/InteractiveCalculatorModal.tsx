import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  Check, 
  RotateCcw, 
  Delete, 
  Layers, 
  Ruler, 
  Building2, 
  Percent 
} from 'lucide-react';

interface InteractiveCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSqFt?: number;
  initialRate?: number;
  onApplySqFt?: (sqFt: number) => void;
  onConsult?: (details?: string) => void;
}

type TabType = 'keypad' | 'dimensions' | 'pakistan_units';

export const InteractiveCalculatorModal: React.FC<InteractiveCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialSqFt = 850,
  initialRate = 5200,
  onApplySqFt,
  onConsult
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('dimensions');

  // Tab 1: Keypad State
  const [display, setDisplay] = useState<string>('0');
  const [equation, setEquation] = useState<string>('');
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  // Tab 2: Dimensions (Length x Width x Floors)
  const [plotLength, setPlotLength] = useState<number>(50);
  const [plotWidth, setPlotWidth] = useState<number>(30);
  const [numFloors, setNumFloors] = useState<number>(2);
  const [coveragePercent, setCoveragePercent] = useState<number>(80);
  const [tierRate, setTierRate] = useState<number>(initialRate);

  // Tab 3: Pakistan Land Unit Converter
  const [landUnitType, setLandUnitType] = useState<'marla' | 'kanal' | 'sqyards'>('marla');
  const [landQuantity, setLandQuantity] = useState<number>(10);
  const [coveredPercentUnit, setCoveredPercentUnit] = useState<number>(85);
  const [unitFloors, setUnitFloors] = useState<number>(2);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
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
  if (typeof document === 'undefined') return null;

  // Keypad Calculator Operations
  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (equation === '') {
      setEquation(`${inputValue} ${nextOperator}`);
    } else if (!waitingForOperand) {
      try {
        const fullExpr = `${equation} ${inputValue}`.replace(/×/g, '*').replace(/÷/g, '/');
        // eslint-disable-next-line no-eval
        const result = Function(`'use strict'; return (${fullExpr})`)();
        setDisplay(String(Number(result.toFixed(4))));
        setEquation(`${result} ${nextOperator}`);
      } catch {
        setDisplay('Error');
        setEquation('');
      }
    } else {
      setEquation(`${equation.slice(0, -1)} ${nextOperator}`);
    }
    setWaitingForOperand(true);
  };

  const handleEquals = () => {
    if (!equation) return;
    try {
      const inputValue = parseFloat(display);
      const fullExpr = `${equation} ${inputValue}`.replace(/×/g, '*').replace(/÷/g, '/');
      const result = Function(`'use strict'; return (${fullExpr})`)();
      setDisplay(String(Number(result.toFixed(4))));
      setEquation('');
      setWaitingForOperand(true);
    } catch {
      setDisplay('Error');
      setEquation('');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setWaitingForOperand(false);
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handlePercentage = () => {
    const current = parseFloat(display);
    if (!isNaN(current)) {
      setDisplay(String(current / 100));
    }
  };

  // Dimensions Calculations
  const calculatedFloorArea = Math.round(plotLength * plotWidth * (coveragePercent / 100));
  const totalDimensionSqFt = calculatedFloorArea * numFloors;
  const dimensionEstimatedBudget = totalDimensionSqFt * tierRate;

  // Land Units Calculations
  const getSqFtFromLandUnit = () => {
    let rawPlotSqFt = 0;
    if (landUnitType === 'marla') {
      rawPlotSqFt = landQuantity * 225; // Standard 225 sq ft/marla
    } else if (landUnitType === 'kanal') {
      rawPlotSqFt = landQuantity * 4500; // Standard 4,500 sq ft/kanal (20 marlas)
    } else if (landUnitType === 'sqyards') {
      rawPlotSqFt = landQuantity * 9; // 1 sq yard = 9 sq ft
    }
    const coveredPerFloor = rawPlotSqFt * (coveredPercentUnit / 100);
    return Math.round(coveredPerFloor * unitFloors);
  };

  const unitTotalSqFt = getSqFtFromLandUnit();
  const unitEstimatedBudget = unitTotalSqFt * tierRate;

  const formatPKR = (amount: number): string => {
    if (amount >= 10000000) {
      return `PKR ${(amount / 10000000).toFixed(2)} Crore`;
    }
    return `PKR ${(amount / 100000).toFixed(1)} Lakh`;
  };

  const handleApplyCurrentSqFt = (sqFtToApply: number) => {
    if (onApplySqFt) {
      onApplySqFt(sqFtToApply);
    }
    onClose();
    // Smooth scroll to estimator
    const el = document.getElementById('estimator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#DDD9D4] overflow-hidden flex flex-col max-h-[92vh] my-auto relative z-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="calculator-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#171717] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#252321]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C99168] text-white flex items-center justify-center shadow-md">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C99168] font-mono">
                  The Ocean Interiors
                </span>
                <span className="text-[9px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-mono">
                  Online &amp; Active
                </span>
              </div>
              <h2 id="calculator-modal-title" className="text-lg font-bold font-['Playfair_Display',serif] text-white">
                Turnkey Architecture &amp; Budget Calculator
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close calculator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-[#DDD9D4] bg-[#FAF9F6] px-3 pt-2 gap-1.5 overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('dimensions')}
            className={`py-2.5 px-3.5 rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap border-b-2 ${
              activeTab === 'dimensions'
                ? 'border-[#B77958] bg-white text-[#171717] font-bold shadow-2xs'
                : 'border-transparent text-[#6B6864] hover:text-[#171717]'
            }`}
          >
            <Ruler className="w-3.5 h-3.5 text-[#B77958]" />
            <span>Plot Dimensions (Length × Width)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pakistan_units')}
            className={`py-2.5 px-3.5 rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap border-b-2 ${
              activeTab === 'pakistan_units'
                ? 'border-[#B77958] bg-white text-[#171717] font-bold shadow-2xs'
                : 'border-transparent text-[#6B6864] hover:text-[#171717]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#B77958]" />
            <span>Marla / Kanal / Gaz Converter</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('keypad')}
            className={`py-2.5 px-3.5 rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap border-b-2 ${
              activeTab === 'keypad'
                ? 'border-[#B77958] bg-white text-[#171717] font-bold shadow-2xs'
                : 'border-transparent text-[#6B6864] hover:text-[#171717]'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-[#B77958]" />
            <span>Digital Keypad Math</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* TAB 1: DIMENSIONS CALCULATOR */}
          {activeTab === 'dimensions' && (
            <div className="space-y-5">
              <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#DDD9D4] space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B6864] block mb-1 font-mono">
                      Plot Length (Feet)
                    </label>
                    <div className="flex items-center gap-1 bg-white border border-[#DDD9D4] rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-[#B77958]">
                      <input
                        type="number"
                        min={10}
                        max={500}
                        value={plotLength || ''}
                        onChange={(e) => setPlotLength(Math.max(1, Number(e.target.value)))}
                        className="w-full text-base font-bold font-mono text-[#171717] focus:outline-none"
                      />
                      <span className="text-xs text-[#6B6864] font-mono">ft</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B6864] block mb-1 font-mono">
                      Plot Width / Front (Feet)
                    </label>
                    <div className="flex items-center gap-1 bg-white border border-[#DDD9D4] rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-[#B77958]">
                      <input
                        type="number"
                        min={10}
                        max={500}
                        value={plotWidth || ''}
                        onChange={(e) => setPlotWidth(Math.max(1, Number(e.target.value)))}
                        className="w-full text-base font-bold font-mono text-[#171717] focus:outline-none"
                      />
                      <span className="text-xs text-[#6B6864] font-mono">ft</span>
                    </div>
                  </div>
                </div>

                {/* Popular Plot Shortcuts */}
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#6B6864] block mb-1.5 font-mono">
                    Common Pakistani Plot Sizes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: '5 Marla (25×45)', l: 45, w: 25 },
                      { name: '10 Marla (35×65)', l: 65, w: 35 },
                      { name: '1 Kanal (50×90)', l: 90, w: 50 },
                      { name: '2 Kanal (75×120)', l: 120, w: 75 },
                    ].map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => {
                          setPlotLength(p.l);
                          setPlotWidth(p.w);
                        }}
                        className={`px-2 py-0.8 text-[11px] rounded-full border cursor-pointer font-mono ${
                          plotLength === p.l && plotWidth === p.w
                            ? 'bg-[#B77958] text-white border-[#B77958]'
                            : 'bg-white text-[#171717] border-[#DDD9D4] hover:border-[#171717]'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Floors & Coverage % */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#DDD9D4]">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B6864] block mb-1 font-mono">
                      Storeys / Floors
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setNumFloors(f)}
                          className={`flex-1 py-1.5 rounded-lg border text-xs font-bold font-mono cursor-pointer transition-colors ${
                            numFloors === f
                              ? 'bg-[#171717] text-white border-[#171717]'
                              : 'bg-white text-[#171717] border-[#DDD9D4] hover:bg-[#EEEAE5]'
                          }`}
                        >
                          {f} {f === 1 ? 'Floor' : 'Fl'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B6864] block mb-1 font-mono">
                      Covered Ground Ratio: {coveragePercent}%
                    </label>
                    <input
                      type="range"
                      min={50}
                      max={100}
                      step={5}
                      value={coveragePercent}
                      onChange={(e) => setCoveragePercent(Number(e.target.value))}
                      className="w-full h-2 bg-[#DDD9D4] rounded-lg appearance-none cursor-pointer accent-[#B77958]"
                    />
                  </div>
                </div>
              </div>

              {/* Specification Tier Selection */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#171717] block mb-1.5 font-mono">
                  Select Design Quality Tier:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { label: 'Executive', rate: 3400 },
                    { label: 'Signature (Hallmark)', rate: 5200 },
                    { label: 'Royal Heritage', rate: 7800 },
                  ].map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => setTierRate(t.rate)}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                        tierRate === t.rate
                          ? 'border-[#B77958] bg-[#F7F5F2] ring-2 ring-[#B77958]/30 font-bold'
                          : 'border-[#DDD9D4] bg-white hover:border-[#171717]'
                      }`}
                    >
                      <span className="block text-[11px] text-[#171717] truncate">{t.label}</span>
                      <span className="block text-[10px] font-mono text-[#B77958]">
                        PKR {t.rate.toLocaleString()}/sq ft
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Result Card */}
              <div className="bg-[#171717] text-white p-4.5 rounded-xl space-y-3 shadow-md border border-[#C99168]/30">
                <div className="flex items-center justify-between text-xs text-[#DDD9D4]">
                  <span>Calculated Covered Area:</span>
                  <span className="font-mono text-base font-bold text-[#C99168]">
                    {totalDimensionSqFt.toLocaleString()} Sq. Ft.
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#DDD9D4]">
                  <span>Single Floor Footprint:</span>
                  <span className="font-mono text-white">
                    {calculatedFloorArea.toLocaleString()} Sq. Ft. ({plotLength}ft × {plotWidth}ft @ {coveragePercent}%)
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#DDD9D4] block font-mono">
                      Estimated Turnkey Budget
                    </span>
                    <span className="text-xl font-bold font-mono text-[#C99168]">
                      {formatPKR(dimensionEstimatedBudget)}
                    </span>
                    <span className="text-[10px] text-neutral-400 block font-mono">
                      Approx. PKR {dimensionEstimatedBudget.toLocaleString()}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleApplyCurrentSqFt(totalDimensionSqFt)}
                    className="py-2.5 px-4 bg-[#B77958] hover:bg-[#A36647] text-white font-bold text-xs rounded-full flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Apply to Estimator</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PAKISTAN LAND UNITS CONVERTER */}
          {activeTab === 'pakistan_units' && (
            <div className="space-y-5">
              <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#DDD9D4] space-y-4">
                <div className="flex gap-2">
                  {[
                    { id: 'marla', label: 'Marla (225 sq ft)' },
                    { id: 'kanal', label: 'Kanal (20 Marla / 4,500 sq ft)' },
                    { id: 'sqyards', label: 'Square Yards / Gaz (9 sq ft)' },
                  ].map((unit) => (
                    <button
                      key={unit.id}
                      type="button"
                      onClick={() => {
                        setLandUnitType(unit.id as any);
                        if (unit.id === 'marla') setLandQuantity(10);
                        if (unit.id === 'kanal') setLandQuantity(1);
                        if (unit.id === 'sqyards') setLandQuantity(500);
                      }}
                      className={`flex-1 p-2 rounded-lg border text-xs text-center cursor-pointer transition-all ${
                        landUnitType === unit.id
                          ? 'bg-[#171717] text-white border-[#171717] font-bold shadow-2xs'
                          : 'bg-white text-[#171717] border-[#DDD9D4] hover:bg-[#EEEAE5]'
                      }`}
                    >
                      {unit.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B6864] block mb-1 font-mono">
                      Enter Quantity ({landUnitType.toUpperCase()})
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={landQuantity || ''}
                      onChange={(e) => setLandQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-full text-lg font-bold font-mono text-[#171717] bg-white border border-[#DDD9D4] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#B77958] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B6864] block mb-1 font-mono">
                      Planned Storeys / Floors
                    </label>
                    <div className="flex items-center gap-1 pt-1">
                      {[1, 2, 3].map((fl) => (
                        <button
                          key={fl}
                          type="button"
                          onClick={() => setUnitFloors(fl)}
                          className={`flex-1 py-2 rounded-lg border text-xs font-bold font-mono cursor-pointer transition-colors ${
                            unitFloors === fl
                              ? 'bg-[#171717] text-white border-[#171717]'
                              : 'bg-white text-[#171717] border-[#DDD9D4] hover:bg-[#EEEAE5]'
                          }`}
                        >
                          {fl} {fl === 1 ? 'Ground' : `Fl (${fl})`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Unit Presets */}
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#6B6864] block mb-1.5 font-mono">
                    Direct Selection:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: '3 Marla', unit: 'marla', qty: 3 },
                      { label: '5 Marla', unit: 'marla', qty: 5 },
                      { label: '7 Marla', unit: 'marla', qty: 7 },
                      { label: '10 Marla', unit: 'marla', qty: 10 },
                      { label: '1 Kanal', unit: 'kanal', qty: 1 },
                      { label: '2 Kanal', unit: 'kanal', qty: 2 },
                      { label: '500 Gaz (Sq Yd)', unit: 'sqyards', qty: 500 },
                      { label: '1000 Gaz (Sq Yd)', unit: 'sqyards', qty: 1000 },
                    ].map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => {
                          setLandUnitType(p.unit as any);
                          setLandQuantity(p.qty);
                        }}
                        className={`px-2.5 py-1 text-xs rounded-full border cursor-pointer font-mono ${
                          landUnitType === p.unit && landQuantity === p.qty
                            ? 'bg-[#B77958] text-white border-[#B77958] font-bold'
                            : 'bg-white text-[#171717] border-[#DDD9D4] hover:border-[#171717]'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculated Result Card */}
              <div className="bg-[#171717] text-white p-4.5 rounded-xl space-y-3 shadow-md border border-[#C99168]/30">
                <div className="flex items-center justify-between text-xs text-[#DDD9D4]">
                  <span>Total Equivalent Covered Area:</span>
                  <span className="font-mono text-base font-bold text-[#C99168]">
                    {unitTotalSqFt.toLocaleString()} Sq. Ft.
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#DDD9D4]">
                  <span>Specification Rate Applied:</span>
                  <span className="font-mono text-white">
                    PKR {tierRate.toLocaleString()} / Sq. Ft.
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#DDD9D4] block font-mono">
                      Estimated Turnkey Budget
                    </span>
                    <span className="text-xl font-bold font-mono text-[#C99168]">
                      {formatPKR(unitEstimatedBudget)}
                    </span>
                    <span className="text-[10px] text-neutral-400 block font-mono">
                      Approx. PKR {unitEstimatedBudget.toLocaleString()}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleApplyCurrentSqFt(unitTotalSqFt)}
                    className="py-2.5 px-4 bg-[#B77958] hover:bg-[#A36647] text-white font-bold text-xs rounded-full flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Apply to Estimator</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DIGITAL KEYPAD CALCULATOR */}
          {activeTab === 'keypad' && (
            <div className="space-y-4 max-w-sm mx-auto">
              {/* Display Screen */}
              <div className="bg-[#171717] p-4 rounded-xl text-right text-white shadow-inner font-mono border border-neutral-700">
                <div className="text-xs text-[#C99168] h-5 overflow-hidden truncate">
                  {equation || 'Ready'}
                </div>
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white overflow-x-auto overflow-y-hidden py-1">
                  {display}
                </div>
              </div>

              {/* Keypad Grid */}
              <div className="grid grid-cols-4 gap-2 font-mono text-base font-semibold">
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-3 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors cursor-pointer"
                >
                  C
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="p-3 rounded-lg bg-[#EEEAE5] hover:bg-[#DDD9D4] text-[#171717] transition-colors cursor-pointer flex items-center justify-center"
                  aria-label="Delete last digit"
                >
                  <Delete className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handlePercentage}
                  className="p-3 rounded-lg bg-[#EEEAE5] hover:bg-[#DDD9D4] text-[#171717] transition-colors cursor-pointer"
                >
                  %
                </button>
                <button
                  type="button"
                  onClick={() => handleOperator('÷')}
                  className="p-3 rounded-lg bg-[#B77958] hover:bg-[#A36647] text-white transition-colors cursor-pointer text-lg"
                >
                  ÷
                </button>

                {/* 7 8 9 × */}
                <button
                  type="button"
                  onClick={() => handleDigit('7')}
                  className="p-3 rounded-lg bg-white border border-[#DDD9D4] hover:bg-[#FAF9F6] text-[#171717] transition-colors cursor-pointer"
                >
                  7
                </button>
                <button
                  type="button"
                  onClick={() => handleDigit('8')}
                  className="p-3 rounded-lg bg-white border border-[#DDD9D4] hover:bg-[#FAF9F6] text-[#171717] transition-colors cursor-pointer"
                >
                  8
                </button>
                <button
                  type="button"
                  onClick={() => handleDigit('9')}
                  className="p-3 rounded-lg bg-white border border-[#DDD9D4] hover:bg-[#FAF9F6] text-[#171717] transition-colors cursor-pointer"
                >
                  9
                </button>
                <button
                  type="button"
                  onClick={() => handleOperator('×')}
                  className="p-3 rounded-lg bg-[#B77958] hover:bg-[#A36647] text-white transition-colors cursor-pointer text-lg"
                >
                  ×
                </button>

                {/* 4 5 6 - */}
                <button
                  type="button"
                  onClick={() => handleDigit('4')}
                  className="p-3 rounded-lg bg-white border border-[#DDD9D4] hover:bg-[#FAF9F6] text-[#171717] transition-colors cursor-pointer"
                >
                  4
                </button>
                <button
                  type="button"
                  onClick={() => handleDigit('5')}
                  className="p-3 rounded-lg bg-white border border-[#DDD9D4] hover:bg-[#FAF9F6] text-[#171717] transition-colors cursor-pointer"
                >
                  5
                </button>
                <button
                  type="button"
                  onClick={() => handleDigit('6')}
                  className="p-3 rounded-lg bg-white border border-[#DDD9D4] hover:bg-[#FAF9F6] text-[#171717] transition-colors cursor-pointer"
                >
                  6
                </button>
                <button
                  type="button"
                  onClick={() => handleOperator('-')}
                  className="p-3 rounded-lg bg-[#B77958] hover:bg-[#A36647] text-white transition-colors cursor-pointer text-lg"
                >
                  -
                </button>

                {/* 1 2 3 + */}
                <button
                  type="button"
                  onClick={() => handleDigit('1')}
                  className="p-3 rounded-lg bg-white border border-[#DDD9D4] hover:bg-[#FAF9F6] text-[#171717] transition-colors cursor-pointer"
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={() => handleDigit('2')}
                  className="p-3 rounded-lg bg-white border border-[#DDD9D4] hover:bg-[#FAF9F6] text-[#171717] transition-colors cursor-pointer"
                >
                  2
                </button>
                <button
                  type="button"
                  onClick={() => handleDigit('3')}
                  className="p-3 rounded-lg bg-white border border-[#DDD9D4] hover:bg-[#FAF9F6] text-[#171717] transition-colors cursor-pointer"
                >
                  3
                </button>
                <button
                  type="button"
                  onClick={() => handleOperator('+')}
                  className="p-3 rounded-lg bg-[#B77958] hover:bg-[#A36647] text-white transition-colors cursor-pointer text-lg"
                >
                  +
                </button>

                {/* 0 . = */}
                <button
                  type="button"
                  onClick={() => handleDigit('0')}
                  className="col-span-2 p-3 rounded-lg bg-white border border-[#DDD9D4] hover:bg-[#FAF9F6] text-[#171717] transition-colors cursor-pointer"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={handleDecimal}
                  className="p-3 rounded-lg bg-white border border-[#DDD9D4] hover:bg-[#FAF9F6] text-[#171717] transition-colors cursor-pointer"
                >
                  .
                </button>
                <button
                  type="button"
                  onClick={handleEquals}
                  className="p-3 rounded-lg bg-[#171717] hover:bg-[#252321] text-white transition-colors cursor-pointer text-lg"
                >
                  =
                </button>
              </div>

              {/* Actions with calculated result */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const parsed = parseFloat(display);
                    if (!isNaN(parsed) && parsed > 0) {
                      handleApplyCurrentSqFt(Math.round(parsed));
                    }
                  }}
                  className="flex-1 py-2.5 px-3 bg-[#171717] hover:bg-[#252321] text-white font-bold text-xs rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5 text-[#C99168]" />
                  <span>Use {display} as Sq. Ft.</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-[#F7F5F2] border-t border-[#DDD9D4] flex items-center justify-between text-xs text-[#6B6864]">
          <span className="font-mono">
            Direct CEO Helpline: <strong className="text-[#171717]">0342-8156086</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-full border border-[#DDD9D4] hover:bg-white text-[#171717] font-semibold cursor-pointer transition-colors"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
