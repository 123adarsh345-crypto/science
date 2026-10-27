import React, { useState } from 'react';
import { Rocket, Gauge, Sparkles, Orbit, CheckCircle2, AlertCircle, ArrowUp } from 'lucide-react';

export const RocketTrajectorySimulator: React.FC = () => {
  // Rocket Configuration
  const [payloadKg, setPayloadKg] = useState<number>(5000); // 5 tons
  const [stage1PropellantKg, setStage1PropellantKg] = useState<number>(400000); // 400 tons
  const [stage1DryMassKg, setStage1DryMassKg] = useState<number>(25000); // 25 tons
  const [stage1Isp, setStage1Isp] = useState<number>(311); // Sea level / vac avg (seconds)

  const [stage2PropellantKg, setStage2PropellantKg] = useState<number>(90000); // 90 tons
  const [stage2DryMassKg, setStage2DryMassKg] = useState<number>(4000); // 4 tons
  const [stage2Isp, setStage2Isp] = useState<number>(348); // Vacuum engine (seconds)

  const [isLaunching, setIsLaunching] = useState(false);
  const [flightPhase, setFlightPhase] = useState<'pad' | 'boost' | 'staging' | 'orbit' | 'failed'>('pad');

  const g0 = 9.80665; // m/s^2

  // Stage 1 Delta-V
  // Total initial mass m0_1 = payload + stage2_dry + stage2_prop + stage1_dry + stage1_prop
  const m0_1 = payloadKg + stage2DryMassKg + stage2PropellantKg + stage1DryMassKg + stage1PropellantKg;
  const mf_1 = payloadKg + stage2DryMassKg + stage2PropellantKg + stage1DryMassKg;
  const deltaV1 = Math.round(stage1Isp * g0 * Math.log(m0_1 / mf_1));

  // Stage 2 Delta-V
  // m0_2 = payload + stage2_dry + stage2_prop
  // mf_2 = payload + stage2_dry
  const m0_2 = payloadKg + stage2DryMassKg + stage2PropellantKg;
  const mf_2 = payloadKg + stage2DryMassKg;
  const deltaV2 = Math.round(stage2Isp * g0 * Math.log(m0_2 / mf_2));

  const totalDeltaV = deltaV1 + deltaV2;

  // Orbital milestones (including ~1,500 m/s gravity + aerodynamic losses)
  let missionResult = 'Suborbital Trajectory (Failed to reach orbit)';
  let missionBadge = 'text-rose-400 bg-rose-950/60 border-rose-500/40';
  let orbitType = 'Suborbital';

  if (totalDeltaV >= 13200) {
    missionResult = 'Trans-Mars Injection (TMI) Achieved! Direct trajectory to Mars.';
    missionBadge = 'text-purple-300 bg-purple-950/60 border-purple-500/40';
    orbitType = 'Mars Hohmann Transfer';
  } else if (totalDeltaV >= 12600) {
    missionResult = 'Trans-Lunar Injection (TLI) Achieved! Journey to the Moon.';
    missionBadge = 'text-emerald-300 bg-emerald-950/60 border-emerald-500/40';
    orbitType = 'Lunar Transfer';
  } else if (totalDeltaV >= 11800) {
    missionResult = 'Geostationary Transfer Orbit (GTO) Insertion Successful.';
    missionBadge = 'text-cyan-300 bg-cyan-950/60 border-cyan-500/40';
    orbitType = 'GTO Orbit';
  } else if (totalDeltaV >= 9300) {
    missionResult = 'Low Earth Orbit (LEO) Insertion Achieved (400 km Circular Orbit).';
    missionBadge = 'text-blue-300 bg-blue-950/60 border-blue-500/40';
    orbitType = 'Low Earth Orbit (LEO)';
  }

  const handleLaunchTest = () => {
    setIsLaunching(true);
    setFlightPhase('boost');

    setTimeout(() => {
      setFlightPhase('staging');
      setTimeout(() => {
        if (totalDeltaV >= 9300) {
          setFlightPhase('orbit');
        } else {
          setFlightPhase('failed');
        }
        setIsLaunching(false);
      }, 1200);
    }, 1200);
  };

  return (
    <div className="w-full bg-gray-950 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-gray-900 via-blue-950/20 to-gray-900 border-b border-gray-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50">
            Orbital Mechanics & Astronautics
          </span>
          <h2 className="text-xl md:text-2xl font-bold font-display text-white mt-1">
            Rocket Delta-V & Staging Calculator
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Tsiolkovsky Rocket Equation: <span className="font-mono text-cyan-300">Δv = I_sp · g₀ · ln(m₀ / m_f)</span>
          </p>
        </div>

        {/* Total Delta V Badge */}
        <div className="bg-gray-900/90 border border-cyan-500/30 px-4 py-2 rounded-2xl flex items-center gap-3">
          <div>
            <span className="text-[10px] uppercase font-mono text-gray-400 block">Total Delta-V (Δv)</span>
            <span className="text-xl font-mono font-bold text-cyan-300">{totalDeltaV.toLocaleString()} m/s</span>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Multi-Stage Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Preset Buttons */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400 font-mono uppercase text-[10px]">Load Rocket:</span>
            {[
              { name: 'Falcon 9 Class', payload: 15000, s1p: 418000, s1d: 25000, s1isp: 311, s2p: 107000, s2d: 4500, s2isp: 348 },
              { name: 'Saturn V (Apollo)', payload: 45000, s1p: 2160000, s1d: 130000, s1isp: 304, s2p: 440000, s2d: 40000, s2isp: 421 },
              { name: 'SmallSat Launcher', payload: 300, s1p: 15000, s1d: 1200, s1isp: 303, s2p: 3500, s2d: 350, s2isp: 343 },
            ].map(r => (
              <button
                key={r.name}
                onClick={() => {
                  setPayloadKg(r.payload);
                  setStage1PropellantKg(r.s1p);
                  setStage1DryMassKg(r.s1d);
                  setStage1Isp(r.s1isp);
                  setStage2PropellantKg(r.s2p);
                  setStage2DryMassKg(r.s2d);
                  setStage2Isp(r.s2isp);
                }}
                className="px-2.5 py-1 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white"
              >
                {r.name}
              </button>
            ))}
          </div>

          {/* Payload Slider */}
          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-gray-300 font-semibold">Payload Mass (Satellite / Crew Capsule):</span>
              <span className="text-amber-300 font-bold">{payloadKg.toLocaleString()} kg</span>
            </div>
            <input
              type="range"
              min="100"
              max="50000"
              step="100"
              value={payloadKg}
              onChange={(e) => setPayloadKg(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* Stage 1 Booster */}
          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 space-y-3">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-xs font-bold text-cyan-400 font-mono uppercase">
                Stage 1 Booster (Atmospheric Ascent)
              </span>
              <span className="text-xs font-mono text-cyan-300 font-bold">
                Δv₁ = {deltaV1.toLocaleString()} m/s
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-gray-400">
                  <span>Fuel Mass</span>
                  <span className="text-white">{(stage1PropellantKg / 1000).toFixed(0)} t</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="5000"
                  value={stage1PropellantKg}
                  onChange={(e) => setStage1PropellantKg(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-gray-400">
                  <span>Engine Isp (sec)</span>
                  <span className="text-white">{stage1Isp} s</span>
                </div>
                <input
                  type="range"
                  min="260"
                  max="360"
                  step="1"
                  value={stage1Isp}
                  onChange={(e) => setStage1Isp(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Stage 2 Upper Stage */}
          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 space-y-3">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-xs font-bold text-indigo-400 font-mono uppercase">
                Stage 2 Upper Stage (Vacuum Insertion)
              </span>
              <span className="text-xs font-mono text-indigo-300 font-bold">
                Δv₂ = {deltaV2.toLocaleString()} m/s
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-gray-400">
                  <span>Fuel Mass</span>
                  <span className="text-white">{(stage2PropellantKg / 1000).toFixed(0)} t</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="250000"
                  step="1000"
                  value={stage2PropellantKg}
                  onChange={(e) => setStage2PropellantKg(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-gray-400">
                  <span>Vacuum Isp (sec)</span>
                  <span className="text-white">{stage2Isp} s</span>
                </div>
                <input
                  type="range"
                  min="310"
                  max="460"
                  step="1"
                  value={stage2Isp}
                  onChange={(e) => setStage2Isp(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Mission Verdict & Flight Stage Visualization (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Flight Animation Stage Box */}
          <div className="relative w-full h-44 bg-gray-900 rounded-2xl border border-gray-800 flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Stars background */}
            <div className="absolute inset-0 bg-stars opacity-40 pointer-events-none" />

            {/* Earth horizon arc */}
            <div className="absolute -bottom-24 w-[160%] h-36 rounded-full bg-blue-600/30 border-t border-blue-400/40 blur-xs" />

            {/* Rocket Graphic */}
            <div className={`relative flex flex-col items-center transition-all duration-700 ${
              flightPhase === 'boost' ? '-translate-y-6 scale-110' : flightPhase === 'staging' ? '-translate-y-12' : flightPhase === 'orbit' ? '-translate-y-16 scale-90' : ''
            }`}>
              <Rocket className="w-10 h-10 text-cyan-300 transform -rotate-45" />
              {isLaunching && (
                <div className="w-2.5 h-6 bg-gradient-to-b from-yellow-300 via-orange-500 to-transparent rounded-full animate-pulse mt-1" />
              )}
            </div>

            <div className="absolute top-3 left-4 text-[10px] font-mono text-gray-400 uppercase">
              Flight Status: <strong className="text-cyan-300">{flightPhase.toUpperCase()}</strong>
            </div>
          </div>

          {/* Launch Test Button */}
          <button
            onClick={handleLaunchTest}
            disabled={isLaunching}
            className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
              isLaunching
                ? 'bg-orange-800 text-orange-200 cursor-wait'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white cursor-pointer shadow-blue-950/50'
            }`}
          >
            <ArrowUp className="w-4 h-4" />
            <span>{isLaunching ? 'Firing Rocket Engines...' : 'Simulate Orbital Launch'}</span>
          </button>

          {/* Mission Capability Verdict Card */}
          <div className={`p-4 rounded-xl border ${missionBadge} space-y-1.5`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              <Orbit className="w-4 h-4" />
              <span>{orbitType}</span>
            </div>
            <p className="text-xs opacity-90 leading-relaxed">
              {missionResult}
            </p>
            <div className="pt-1 text-[11px] font-mono text-gray-400">
              Orbital Requirement: LEO needs ~9,300 m/s Δv (7,800 m/s orbital speed + 1,500 m/s aerodynamic drag and gravity drag).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
