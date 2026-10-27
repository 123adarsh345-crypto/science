import React, { useState } from 'react';
import { COSMIC_ELEMENTS } from '../data/spaceData';
import { ElementData } from '../types';
import { Flame, Sparkles, Zap, Atom, HelpCircle, Layers, ArrowRight } from 'lucide-react';

export const CosmicFusionLab: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<ElementData>(COSMIC_ELEMENTS[0]);
  const [fusionStage, setFusionStage] = useState<'pp_chain' | 'triple_alpha' | 'carbon_burn' | 'iron_peak'>('pp_chain');
  const [isFusing, setIsFusing] = useState(false);
  const [reactionLog, setReactionLog] = useState<string[]>([]);

  const handleSimulateFusion = () => {
    setIsFusing(true);
    let logEntry = '';

    if (fusionStage === 'pp_chain') {
      logEntry = '🔥 1H + 1H ➔ 2H (Deuterium) + e⁺ + ν_e (+0.42 MeV) ➔ 3He + 3He ➔ 4He + 2 1H (+12.86 MeV) [Solar Main Sequence]';
    } else if (fusionStage === 'triple_alpha') {
      logEntry = '💥 4He + 4He ➔ 8Be (unstable, τ ~ 10⁻¹⁶ s) + 4He ➔ 12C + γ (+7.27 MeV) [Red Giant Helium Flash]';
    } else if (fusionStage === 'carbon_burn') {
      logEntry = '⚡ 12C + 12C ➔ 20Ne + 4He (+4.62 MeV) / 24Mg + γ (+13.93 MeV) [Core Temp > 600 Million K]';
    } else if (fusionStage === 'iron_peak') {
      logEntry = '⚠️ 28Si + 28Si ➔ 56Ni ➔ 56Fe (Binding Energy/Nucleon Max: 8.8 MeV). Core becomes endothermic! Gravitational collapse imminent!';
    }

    setTimeout(() => {
      setReactionLog(prev => [logEntry, ...prev.slice(0, 5)]);
      setIsFusing(false);
    }, 600);
  };

  const originFilters = [
    { label: 'Big Bang Nucleosynthesis', color: 'bg-cyan-500' },
    { label: 'Low-mass Stars (Cosmic Wind)', color: 'bg-amber-500' },
    { label: 'Massive Exploding Stars (Supernovae)', color: 'bg-rose-500' },
    { label: 'Neutron Star Mergers (Kilonovae)', color: 'bg-purple-500' },
  ];

  return (
    <div className="w-full bg-gray-950 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-gray-900 via-amber-950/20 to-gray-900 border-b border-gray-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-wider uppercase text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/50">
            Stellar Nucleosynthesis & Cosmic Alchemy
          </span>
          <h2 className="text-xl md:text-2xl font-bold font-display text-white mt-1">
            Cosmic Periodic Table & Fusion Reactor
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            "The cosmos is within us. We are made of star-stuff." — Carl Sagan
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 text-[11px]">
          {originFilters.map(f => (
            <div key={f.label} className="flex items-center gap-1.5 bg-gray-900 px-2.5 py-1 rounded-lg border border-gray-800">
              <span className={`w-2 h-2 rounded-full ${f.color}`} />
              <span className="text-gray-300">{f.label.split(' (')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Element Grid (8 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-gray-400">
              Featured Cosmic Elements (Click to inspect):
            </span>
            <span className="text-xs text-gray-400 font-mono">
              Total Catalog: {COSMIC_ELEMENTS.length} Key Elements
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {COSMIC_ELEMENTS.map(elem => {
              const isSelected = selectedElement.atomicNumber === elem.atomicNumber;
              return (
                <button
                  key={elem.symbol}
                  onClick={() => setSelectedElement(elem)}
                  className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-24 ${
                    isSelected
                      ? 'bg-amber-950/60 border-amber-400 shadow-lg shadow-amber-950/50 text-white'
                      : 'bg-gray-900/70 border-gray-800 hover:border-gray-700 text-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-gray-400">{elem.atomicNumber}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: elem.cosmicOriginColor }}
                      title={elem.cosmicOrigin}
                    />
                  </div>
                  <div>
                    <span className="text-2xl font-bold font-mono block leading-none">{elem.symbol}</span>
                    <span className="text-[10px] text-gray-400 truncate block mt-0.5">{elem.name}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Element Detailed Card */}
          <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-xl text-white border border-white/20 shadow-md"
                  style={{ backgroundColor: selectedElement.cosmicOriginColor }}
                >
                  {selectedElement.symbol}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {selectedElement.name} (Z = {selectedElement.atomicNumber})
                  </h3>
                  <span className="text-xs font-mono text-gray-400">
                    Standard Atomic Weight: {selectedElement.atomicMass} u
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-gray-400 block">Cosmic Forging Site</span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-md text-white"
                  style={{ backgroundColor: selectedElement.cosmicOriginColor }}
                >
                  {selectedElement.cosmicOrigin}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              {selectedElement.astrophysicalRole}
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Stellar Core Fusion Simulator (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-gray-900/90 to-gray-950 p-5 rounded-2xl border border-gray-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4" />
              <span>Stellar Core Reactor</span>
            </div>
            <h4 className="text-base font-bold text-white font-display">
              Thermonuclear Fusion Chamber
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              Select the evolutionary phase of a star to initiate fusion reactions and release binding energy.
            </p>
          </div>

          {/* Fusion Stages Toggle */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { id: 'pp_chain', label: '1. Proton-Proton (Sun)' },
              { id: 'triple_alpha', label: '2. Triple-Alpha (Red Giant)' },
              { id: 'carbon_burn', label: '3. Carbon Fusion (Supergiant)' },
              { id: 'iron_peak', label: '4. Silicon to Iron Peak' },
            ].map(stage => (
              <button
                key={stage.id}
                onClick={() => setFusionStage(stage.id as any)}
                className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                  fusionStage === stage.id
                    ? 'bg-amber-950/80 border-amber-400 text-amber-200'
                    : 'bg-gray-800/80 border-gray-700 text-gray-400 hover:text-gray-200'
                }`}
              >
                {stage.label}
              </button>
            ))}
          </div>

          {/* Trigger Button */}
          <button
            onClick={handleSimulateFusion}
            disabled={isFusing}
            className={`w-full py-3 rounded-xl font-medium text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
              isFusing
                ? 'bg-amber-700 text-amber-100 cursor-wait'
                : 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white cursor-pointer shadow-orange-950/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isFusing ? 'Compressing Stellar Core...' : 'Ignite Thermonuclear Fusion'}</span>
          </button>

          {/* Reaction Telemetry Log */}
          <div className="bg-gray-950 p-3 rounded-xl border border-gray-800/80 min-h-[140px] flex flex-col justify-start">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
              Reaction Physics Log:
            </span>
            {reactionLog.length === 0 ? (
              <span className="text-xs text-gray-400 italic">
                Press "Ignite Thermonuclear Fusion" above to smash nuclei and observe nuclear binding energy release.
              </span>
            ) : (
              <div className="space-y-1.5 overflow-y-auto max-h-[120px] scrollbar-none">
                {reactionLog.map((log, idx) => (
                  <p key={idx} className="text-[11px] font-mono text-cyan-300 leading-snug">
                    {log}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
