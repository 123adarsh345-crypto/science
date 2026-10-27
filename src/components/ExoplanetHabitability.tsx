import React, { useState } from 'react';
import { Compass, Sparkles, Orbit, Sun, Shield, Droplets } from 'lucide-react';

export const ExoplanetHabitability: React.FC = () => {
  const [starType, setStarType] = useState<'M' | 'G' | 'F' | 'A'>('G');
  const [distanceAU, setDistanceAU] = useState<number>(1.0);
  const [planetRadiusEarth, setPlanetRadiusEarth] = useState<number>(1.0);
  const [greenhouseMode, setGreenhouseMode] = useState<'thin' | 'earth' | 'runaway'>('earth');
  const [albedo, setAlbedo] = useState<number>(0.3); // Earth is ~0.3

  // Star parameters
  const starParams = {
    M: { name: 'Red Dwarf (M-Type, e.g. Proxima Centauri)', luminosity: 0.01, color: '#EF4444', hzInner: 0.08, hzOuter: 0.2 },
    G: { name: 'Yellow Sun-like (G-Type, e.g. Sol)', luminosity: 1.0, color: '#FBBF24', hzInner: 0.95, hzOuter: 1.37 },
    F: { name: 'Yellow-White (F-Type, e.g. Procyon)', luminosity: 3.5, color: '#FEF08A', hzInner: 1.8, hzOuter: 2.6 },
    A: { name: 'Hot Blue-White (A-Type, e.g. Vega)', luminosity: 25.0, color: '#93C5FD', hzInner: 4.8, hzOuter: 7.0 },
  }[starType];

  // Greenhouse temperature boost in Kelvin
  const greenhouseBoost = {
    thin: 5,       // Mars-like thin CO2
    earth: 33,     // Earth's natural greenhouse (water vapor + CO2)
    runaway: 450,  // Venus-like supercritical greenhouse
  }[greenhouseMode];

  // Effective stellar flux relative to Earth: S = L / d^2
  const stellarFlux = starParams.luminosity / (distanceAU * distanceAU);

  // Equilibrium temperature in Kelvin: Teq = 278.5 * ( (L * (1-A)) / d^2 )^0.25
  const tEqKelvin = 278.5 * Math.pow((starParams.luminosity * (1 - albedo)) / (distanceAU * distanceAU), 0.25);
  const tSurfaceKelvin = tEqKelvin + greenhouseBoost;
  const tSurfaceCelsius = Math.round(tSurfaceKelvin - 273.15);

  // Determine habitability zone
  let status = 'Habitable Zone (Liquid Oceans Feasible)';
  let statusColor = 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
  let isHabitable = false;

  if (distanceAU < starParams.hzInner) {
    status = 'Too Hot (Runaway Greenhouse / Oceans Boil)';
    statusColor = 'text-rose-400 bg-rose-950/60 border-rose-500/40';
  } else if (distanceAU > starParams.hzOuter) {
    status = 'Too Cold (Global Glaciation / Solid Ice World)';
    statusColor = 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40';
  } else {
    isHabitable = true;
  }

  // Earth Similarity Index (ESI) simplified estimation
  const radiusDiff = 1 - Math.abs((planetRadiusEarth - 1) / (planetRadiusEarth + 1));
  const tempDiff = 1 - Math.abs((tSurfaceCelsius - 15) / (tSurfaceCelsius + 273.15));
  const esi = Math.max(0, Math.min(1, Math.sqrt(Math.max(0, radiusDiff * tempDiff)))).toFixed(2);

  return (
    <div className="w-full bg-gray-950 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-gray-900 via-emerald-950/20 to-gray-900 border-b border-gray-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/50">
            Astrobiology & Goldilocks Planetary Lab
          </span>
          <h2 className="text-xl md:text-2xl font-bold font-display text-white mt-1">
            Exoplanet Habitable Zone Calculator
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Tune star luminosity, orbital distance, and atmospheric blanket to simulate surface water and Earth Similarity
          </p>
        </div>

        {/* ESI Score Badge */}
        <div className="bg-gray-900/90 border border-emerald-500/30 px-4 py-2 rounded-2xl flex items-center gap-3">
          <div>
            <span className="text-[10px] uppercase font-mono text-gray-400 block">Earth Similarity Index</span>
            <span className="text-xl font-mono font-bold text-emerald-300">{esi} / 1.00</span>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Tuning Knobs (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Star Type Selector */}
          <div>
            <label className="text-xs font-mono uppercase text-gray-400 block mb-2">
              1. Host Star Spectral Class:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['M', 'G', 'F', 'A'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => {
                    setStarType(type);
                    if (type === 'M') setDistanceAU(0.15);
                    if (type === 'G') setDistanceAU(1.0);
                    if (type === 'F') setDistanceAU(2.1);
                    if (type === 'A') setDistanceAU(5.8);
                  }}
                  className={`p-2.5 rounded-xl border text-center font-medium text-xs transition-all ${
                    starType === type
                      ? 'bg-gray-800 border-cyan-400 text-white shadow-md'
                      : 'bg-gray-900/80 border-gray-800 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <span className="block font-bold text-sm">{type}-Class</span>
                  <span className="text-[10px] text-gray-400 block truncate">
                    {type === 'M' ? 'Red Dwarf' : type === 'G' ? 'Sun-like' : type === 'F' ? 'Yellow-White' : 'Hot Blue'}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-1.5 italic font-mono">
              Selected: {starParams.name} (L = {starParams.luminosity} L☉)
            </p>
          </div>

          {/* Orbital Distance Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-gray-400">2. Semi-Major Axis (Orbital Distance):</span>
              <span className="text-cyan-300 font-bold">{distanceAU.toFixed(2)} AU</span>
            </div>
            <input
              type="range"
              min={starType === 'M' ? '0.04' : '0.2'}
              max={starType === 'A' ? '12.0' : starType === 'F' ? '5.0' : '3.0'}
              step="0.02"
              value={distanceAU}
              onChange={(e) => setDistanceAU(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-gray-400">
              <span>Inner Boiled Edge: {starParams.hzInner} AU</span>
              <span>Outer Frozen Edge: {starParams.hzOuter} AU</span>
            </div>
          </div>

          {/* Planet Size */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-gray-400">3. Planet Radius (in Earth Radii R⊕):</span>
              <span className="text-amber-300 font-bold">{planetRadiusEarth.toFixed(1)} R⊕</span>
            </div>
            <input
              type="range"
              min="0.4"
              max="2.5"
              step="0.1"
              value={planetRadiusEarth}
              onChange={(e) => setPlanetRadiusEarth(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* Atmosphere & Greenhouse Selection */}
          <div>
            <label className="text-xs font-mono uppercase text-gray-400 block mb-2">
              4. Planetary Atmosphere & Greenhouse Warming:
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'thin', label: 'Thin (Mars-like)', sub: '+5 K' },
                { id: 'earth', label: 'Balanced (Earth-like)', sub: '+33 K' },
                { id: 'runaway', label: 'Dense (Venus-like)', sub: '+450 K' },
              ].map(atm => (
                <button
                  key={atm.id}
                  onClick={() => setGreenhouseMode(atm.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    greenhouseMode === atm.id
                      ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200'
                      : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <span className="font-semibold block">{atm.label}</span>
                  <span className="text-[10px] text-gray-400 block">{atm.sub}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Habitable Zone Diagram & Telemetry Card (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          {/* Visual Orbit Strip */}
          <div className="relative w-full h-36 bg-gray-900 rounded-2xl border border-gray-800 flex items-center px-4 overflow-hidden">
            {/* Host Star */}
            <div
              className="w-14 h-14 rounded-full shadow-lg shrink-0 flex items-center justify-center font-bold text-xs text-black mr-4 z-10"
              style={{ backgroundColor: starParams.color }}
            >
              Star
            </div>

            {/* Habitable Zone Green Band */}
            <div className="relative flex-1 h-12 bg-gray-950/80 rounded-xl overflow-hidden flex items-center border border-gray-800">
              {/* Hot zone */}
              <div className="h-full bg-rose-950/40 border-r border-rose-800/40" style={{ width: '25%' }} />
              {/* Green Goldilocks Zone */}
              <div className="h-full bg-emerald-950/60 border-r border-emerald-500/50 flex items-center justify-center text-[10px] text-emerald-300 font-mono" style={{ width: '45%' }}>
                ★ Goldilocks Zone
              </div>
              {/* Frozen zone */}
              <div className="h-full bg-cyan-950/40 flex-1" />

              {/* Planet Marker position */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-blue-500 border-2 border-white shadow-md transition-all duration-300"
                style={{
                  left: `${Math.min(92, Math.max(8, (distanceAU / (starParams.hzOuter * 1.5)) * 100))}%`,
                }}
                title="Current Exoplanet Orbit"
              />
            </div>
          </div>

          {/* Physical Metrics readout */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800">
              <span className="text-gray-400 block text-[10px]">Stellar Insolation (Flux)</span>
              <span className="font-mono text-cyan-300 font-bold text-base">
                {stellarFlux.toFixed(2)} × Earth
              </span>
            </div>

            <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800">
              <span className="text-gray-400 block text-[10px]">Calculated Surface Temp</span>
              <span className={`font-mono font-bold text-base ${tSurfaceCelsius > 50 ? 'text-rose-400' : tSurfaceCelsius < -20 ? 'text-cyan-400' : 'text-emerald-300'}`}>
                {tSurfaceCelsius}°C ({Math.round(tSurfaceKelvin)} K)
              </span>
            </div>
          </div>

          {/* Habitability Verdict Card */}
          <div className={`p-4 rounded-xl border ${statusColor} space-y-1`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              <Droplets className="w-4 h-4" />
              <span>{status}</span>
            </div>
            <p className="text-xs opacity-90 leading-relaxed">
              {isHabitable
                ? `Planetary surface temperature of ${tSurfaceCelsius}°C allows liquid water oceans to stably exist under 1 atm pressure. High candidate for prebiotic chemical synthesis!`
                : distanceAU < starParams.hzInner
                ? `Planetary insolation (${stellarFlux.toFixed(1)} S☉) triggers ocean evaporation, atmospheric photodissociation, and water loss to space.`
                : `Planetary insolation is too weak (${stellarFlux.toFixed(2)} S☉); oceans freeze solid into cryogenic ice sheets.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
