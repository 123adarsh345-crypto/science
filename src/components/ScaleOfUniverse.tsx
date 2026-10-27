import React, { useState } from 'react';
import { SCALE_OF_UNIVERSE_DATA } from '../data/spaceData';
import { ScaleObject } from '../types';
import { ZoomIn, ZoomOut, Compass, Sparkles, Eye, ArrowRight, ArrowLeft } from 'lucide-react';

export const ScaleOfUniverse: React.FC = () => {
  // Exponent slider value between -35 (Planck) and 26 (Observable Universe)
  const [currentExp, setCurrentExp] = useState<number>(0); // Starts at human scale (10^0 m)

  // Find the closest scale objects to the current exponent
  const sorted = [...SCALE_OF_UNIVERSE_DATA].sort(
    (a, b) => Math.abs(a.exponent - currentExp) - Math.abs(b.exponent - currentExp)
  );
  const activeObj = sorted[0];

  const quickJumpCategories = [
    { label: 'Quantum', exp: -35, color: 'text-violet-400' },
    { label: 'Atomic', exp: -10, color: 'text-cyan-400' },
    { label: 'Microscopic', exp: -6, color: 'text-emerald-400' },
    { label: 'Human', exp: 0, color: 'text-blue-400' },
    { label: 'Planetary', exp: 7, color: 'text-amber-400' },
    { label: 'Stellar', exp: 9, color: 'text-orange-400' },
    { label: 'Galactic', exp: 21, color: 'text-purple-400' },
    { label: 'Cosmic', exp: 26, color: 'text-rose-400' },
  ];

  return (
    <div className="w-full bg-gray-950 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-gray-900 via-indigo-950/40 to-gray-900 border-b border-gray-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/50">
              Interactive Cosmic Metric Zoom
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-display text-white mt-1">
            Scale of the Universe
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            From the Planck quantum foam (10⁻³⁵ m) to the edge of the Observable Cosmos (10²⁶ m)
          </p>
        </div>

        {/* Current Exponent Badge */}
        <div className="bg-gray-900/90 border border-cyan-500/30 px-4 py-2 rounded-2xl flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-gray-400 block">Metric Scale</span>
            <span className="text-lg font-mono font-bold text-cyan-300">
              10<sup className="text-xs">{currentExp >= 0 ? `+${currentExp}` : currentExp}</sup> meters
            </span>
          </div>
          <div className="h-8 w-[1px] bg-gray-800" />
          <div className="text-xs font-mono text-gray-300">
            {activeObj.sizeFormatted}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="p-6 flex flex-col lg:flex-row items-center gap-8 min-h-[440px]">
        {/* Left: Dynamic Scale Visualization Portal */}
        <div className="relative w-full lg:w-1/2 aspect-square max-w-[420px] rounded-3xl bg-radial from-indigo-950/40 via-gray-950 to-black border border-gray-800 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
          {/* Concentric scale rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[85%] h-[85%] rounded-full border border-dashed border-cyan-400 animate-[spin_60s_linear_infinite]" />
            <div className="w-[60%] h-[60%] rounded-full border border-indigo-400" />
            <div className="w-[35%] h-[35%] rounded-full border border-dashed border-purple-400 animate-[spin_40s_linear_infinite_reverse]" />
          </div>

          {/* Central Active Object Glow & Representation */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-600 p-1 shadow-2xl shadow-cyan-500/20 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-gray-950/90 flex flex-col items-center justify-center p-4">
                <Sparkles className="w-8 h-8 text-cyan-400 mb-2 animate-pulse" />
                <span className="text-base font-bold text-white font-display text-center leading-tight">
                  {activeObj.name}
                </span>
                <span className="text-[11px] font-mono text-cyan-300 mt-1">
                  {activeObj.sizeFormatted}
                </span>
              </div>
            </div>

            {/* Category tag */}
            <span className="mt-4 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-gray-900 border border-gray-700 text-gray-300">
              {activeObj.category} Domain
            </span>
          </div>

          {/* Ambient Particles */}
          <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[11px] font-mono text-gray-500">
            <span>&lt; 10⁻³⁵ m</span>
            <span>Current: 10^{currentExp} m</span>
            <span>&gt; 10²⁶ m</span>
          </div>
        </div>

        {/* Right: Detailed Scientific Insight & Comparison Card */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between h-full space-y-4">
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2 border-b border-gray-800 pb-2">
              <span className="uppercase text-cyan-400 font-semibold">{activeObj.category} Reality</span>
              <span>Order of Magnitude: 10^{activeObj.exponent} m</span>
            </div>

            <h3 className="text-2xl font-bold font-display text-white">{activeObj.name}</h3>
            <p className="text-sm text-gray-300 mt-2 leading-relaxed">
              {activeObj.description}
            </p>

            {/* Scientific Mind-Blowing Fact */}
            <div className="mt-4 p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
                <Eye className="w-4 h-4" />
                <span>Cosmic Perspective</span>
              </div>
              <p className="text-xs text-cyan-100/90 leading-relaxed">
                {activeObj.fact}
              </p>
            </div>
          </div>

          {/* Nearby Scale Markers in this domain */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-gray-400 block">Nearby Celestial & Physical Milestones:</span>
            <div className="grid grid-cols-2 gap-2">
              {SCALE_OF_UNIVERSE_DATA.filter(
                o => Math.abs(o.exponent - currentExp) <= 8 && o.id !== activeObj.id
              ).slice(0, 4).map(o => (
                <button
                  key={o.id}
                  onClick={() => setCurrentExp(o.exponent)}
                  className="p-2.5 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-gray-700 text-left transition-colors flex flex-col"
                >
                  <span className="text-xs font-medium text-gray-200 truncate">{o.name}</span>
                  <span className="text-[10px] font-mono text-cyan-400">{o.sizeFormatted}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrub Slider & Zoom Controls Footer */}
      <div className="p-5 bg-gray-900/90 border-t border-gray-800 flex flex-col gap-4">
        {/* Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1 text-violet-400">
              <ZoomOut className="w-3.5 h-3.5" /> Planck Quantum Foam (-35)
            </span>
            <span className="text-cyan-300 font-semibold">10^{currentExp} m</span>
            <span className="flex items-center gap-1 text-rose-400">
              Observable Universe (+26) <ZoomIn className="w-3.5 h-3.5" />
            </span>
          </div>

          <input
            type="range"
            min="-35"
            max="26"
            step="1"
            value={currentExp}
            onChange={(e) => setCurrentExp(parseInt(e.target.value, 10))}
            className="w-full h-2.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300"
          />
        </div>

        {/* Quick Domain Jump Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] uppercase font-mono text-gray-500 mr-2 whitespace-nowrap">Jump:</span>
          {quickJumpCategories.map(cat => (
            <button
              key={cat.label}
              onClick={() => setCurrentExp(cat.exp)}
              className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap border transition-all ${
                Math.abs(currentExp - cat.exp) <= 2
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-200'
                  : 'bg-gray-800/80 border-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              <span className={cat.color}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
