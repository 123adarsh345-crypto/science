import React, { useRef, useEffect, useState } from 'react';
import { CELESTIAL_BODIES } from '../data/spaceData';
import { CelestialBody } from '../types';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Info, Compass, Sparkles, Orbit } from 'lucide-react';

interface Props {
  onSelectBody?: (body: CelestialBody) => void;
  onAskAi?: (topic: string) => void;
}

export const SolarSystemSimulator: React.FC<Props> = ({ onSelectBody, onAskAi }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeSpeed, setTimeSpeed] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [selectedBody, setSelectedBody] = useState<CelestialBody>(CELESTIAL_BODIES[3]); // Earth
  const [showOrbits, setShowOrbits] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [focusedBodyId, setFocusedBodyId] = useState<string | null>(null);

  // Time accumulator
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Planets to render in the solar view (up to Pluto)
    const renderBodies = CELESTIAL_BODIES.filter(
      b => b.id !== 'blackhole-sgr-a' && b.id !== 'moon'
    );

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isPlaying) {
        timeRef.current += 0.005 * timeSpeed;
      }
      const t = timeRef.current;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw faint background stars
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Radial dark space glow from Sun
      const sunGradient = ctx.createRadialGradient(
        centerX, centerY, 5,
        centerX, centerY, 400 * zoom
      );
      sunGradient.addColorStop(0, 'rgba(245, 158, 11, 0.15)');
      sunGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.04)');
      sunGradient.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = sunGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate planetary positions
      const positions: { body: CelestialBody; x: number; y: number; r: number }[] = [];

      renderBodies.forEach((body) => {
        if (body.type === 'star') {
          positions.push({ body, x: centerX, y: centerY, r: 24 * Math.max(0.6, zoom) });
          return;
        }

        // Scaled orbital radius for visual clarity on canvas
        let visualRadius = 0;
        if (body.distanceFromSunAU <= 1.6) {
          // Inner planets (Mercury, Venus, Earth, Mars, JWST)
          visualRadius = (50 + body.distanceFromSunAU * 110) * zoom;
        } else {
          // Outer gas giants scaled logarithmically for screen visibility
          visualRadius = (220 + Math.log2(body.distanceFromSunAU) * 75) * zoom;
        }

        // Orbital period speed (Kepler: T^2 proportional to a^3)
        const periodFactor = body.orbitalPeriodDays > 0 ? 365 / body.orbitalPeriodDays : 1;
        const angle = t * periodFactor * 0.8 + (body.distanceFromSunAU * 1.5);

        const x = centerX + Math.cos(angle) * visualRadius;
        const y = centerY + Math.sin(angle) * visualRadius;

        // Visual radius of body
        let displayR = Math.max(3, Math.min(18, Math.log10(body.radiusKm) * 3)) * (0.8 + zoom * 0.2);
        if (body.type === 'spacecraft') displayR = 4;

        positions.push({ body, x, y, r: displayR });

        // Draw orbit line
        if (showOrbits) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, visualRadius, 0, Math.PI * 2);
          ctx.strokeStyle = body.id === selectedBody?.id ? 'rgba(56, 189, 248, 0.5)' : 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = body.id === selectedBody?.id ? 1.5 : 0.8;
          ctx.setLineDash(body.type === 'spacecraft' || body.type === 'dwarf' ? [3, 4] : []);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      // Render bodies
      positions.forEach(({ body, x, y, r }) => {
        // Selection highlight ring
        if (selectedBody?.id === body.id) {
          ctx.beginPath();
          ctx.arc(x, y, r + 6, 0, Math.PI * 2);
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Target reticle marks
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
          ctx.beginPath();
          ctx.moveTo(x - r - 9, y);
          ctx.lineTo(x - r - 4, y);
          ctx.moveTo(x + r + 4, y);
          ctx.lineTo(x + r + 9, y);
          ctx.moveTo(x, y - r - 9);
          ctx.lineTo(x, y - r - 4);
          ctx.moveTo(x, y + r + 4);
          ctx.lineTo(x, y + r + 9);
          ctx.stroke();
        }

        // Body glow
        const glow = ctx.createRadialGradient(x, y, r * 0.2, x, y, r * 2.5);
        glow.addColorStop(0, body.glowColor || 'rgba(255,255,255,0.4)');
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Body sphere
        const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.3, body.color);
        grad.addColorStop(1, '#050505');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        // Saturn Rings
        if (body.id === 'saturn') {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(-0.4);
          ctx.scale(1, 0.35);
          ctx.beginPath();
          ctx.arc(0, 0, r * 2.4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(252, 211, 77, 0.7)';
          ctx.lineWidth = r * 0.8;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 0, r * 2.7, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
          ctx.lineWidth = r * 0.3;
          ctx.stroke();
          ctx.restore();
        }

        // Body label
        if (showLabels) {
          ctx.fillStyle = selectedBody?.id === body.id ? '#38bdf8' : '#9ca3af';
          ctx.font = selectedBody?.id === body.id ? '600 11px Inter, sans-serif' : '10px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(body.name.split(' (')[0], x, y + r + 13);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Canvas click to select planet
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const t = timeRef.current;

      let closest: CelestialBody | null = null;
      let minDistance = 25;

      renderBodies.forEach((body) => {
        let visualRadius = 0;
        if (body.type === 'star') {
          visualRadius = 0;
        } else if (body.distanceFromSunAU <= 1.6) {
          visualRadius = (50 + body.distanceFromSunAU * 110) * zoom;
        } else {
          visualRadius = (220 + Math.log2(body.distanceFromSunAU) * 75) * zoom;
        }

        const periodFactor = body.orbitalPeriodDays > 0 ? 365 / body.orbitalPeriodDays : 1;
        const angle = t * periodFactor * 0.8 + (body.distanceFromSunAU * 1.5);
        const bx = body.type === 'star' ? centerX : centerX + Math.cos(angle) * visualRadius;
        const by = body.type === 'star' ? centerY : centerY + Math.sin(angle) * visualRadius;

        const dist = Math.hypot(clickX - bx, clickY - by);
        if (dist < minDistance) {
          minDistance = dist;
          closest = body;
        }
      });

      if (closest) {
        setSelectedBody(closest);
        onSelectBody?.(closest);
      }
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, timeSpeed, zoom, showOrbits, showLabels, selectedBody]);

  return (
    <div className="relative w-full h-[680px] bg-gray-950 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl flex flex-col md:flex-row">
      {/* Simulation Viewport */}
      <div className="relative flex-1 h-full min-h-[400px]">
        <canvas ref={canvasRef} className="w-full h-full cursor-crosshair block" />

        {/* Top Floating Controls */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="bg-gray-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-700/60 text-xs flex items-center gap-2 pointer-events-auto">
            <Orbit className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-gray-200">Keplerian Planetarium</span>
            <span className="text-gray-400">| Live Orbit Engine</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto bg-gray-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-700/60">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 text-gray-200 hover:text-white transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
            </button>
            <div className="h-4 w-[1px] bg-gray-700 mx-1" />
            <button
              onClick={() => setTimeSpeed(s => (s === 1 ? 5 : s === 5 ? 20 : 1))}
              className="text-xs font-mono text-cyan-300 hover:text-cyan-200 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40"
              title="Time Multiplier"
            >
              {timeSpeed}x Speed
            </button>
            <div className="h-4 w-[1px] bg-gray-700 mx-1" />
            <button
              onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
              className="p-1 text-gray-300 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-gray-300 min-w-8 text-center">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(z => Math.min(2.5, z + 0.25))}
              className="p-1 text-gray-300 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="h-4 w-[1px] bg-gray-700 mx-1" />
            <button
              onClick={() => {
                setShowOrbits(!showOrbits);
              }}
              className={`text-xs px-2 py-0.5 rounded border transition-colors ${
                showOrbits ? 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300' : 'bg-gray-800/60 border-gray-700 text-gray-400'
              }`}
            >
              Orbits
            </button>
          </div>
        </div>

        {/* Quick Body Selector Strip */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pointer-events-auto">
          {CELESTIAL_BODIES.filter(b => b.id !== 'blackhole-sgr-a').map((body) => {
            const isSelected = selectedBody.id === body.id;
            return (
              <button
                key={body.id}
                onClick={() => {
                  setSelectedBody(body);
                  onSelectBody?.(body);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-950'
                    : 'bg-gray-900/80 border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: body.color }} />
                {body.name.split(' (')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Synchronized Scientific Inspector Drawer */}
      <div className="w-full md:w-84 bg-gray-900/95 backdrop-blur-xl border-t md:border-t-0 md:border-l border-gray-800 flex flex-col h-[320px] md:h-full overflow-y-auto p-5 text-gray-200">
        <div className="flex items-start justify-between gap-3 border-b border-gray-800 pb-3">
          <div>
            <div className="text-[10px] font-mono tracking-wider uppercase text-cyan-400 font-semibold">
              {selectedBody.type.toUpperCase()} TELEMETRY
            </div>
            <h3 className="text-xl font-bold font-display text-white mt-0.5">{selectedBody.name}</h3>
          </div>
          <div
            className="w-8 h-8 rounded-full border border-white/20 shadow-lg shrink-0 flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: selectedBody.color }}
          >
            ●
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mt-3 border-b border-gray-800 pb-3">
          {selectedBody.overview}
        </p>

        {/* Live Physical Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
          <div className="bg-gray-950/60 p-2.5 rounded-xl border border-gray-800/80">
            <span className="text-gray-400 block text-[10px]">Distance from Sun</span>
            <span className="font-mono text-cyan-300 font-semibold">
              {selectedBody.distanceFromSunAU === 0 ? 'Center' : `${selectedBody.distanceFromSunAU} AU`}
            </span>
          </div>

          <div className="bg-gray-950/60 p-2.5 rounded-xl border border-gray-800/80">
            <span className="text-gray-400 block text-[10px]">Surface Gravity</span>
            <span className="font-mono text-amber-300 font-semibold">{selectedBody.gravityMps2} m/s²</span>
          </div>

          <div className="bg-gray-950/60 p-2.5 rounded-xl border border-gray-800/80">
            <span className="text-gray-400 block text-[10px]">Orbital Period</span>
            <span className="font-mono text-emerald-300 font-semibold">
              {selectedBody.orbitalPeriodDays === 0 ? 'N/A' : `${selectedBody.orbitalPeriodDays} Days`}
            </span>
          </div>

          <div className="bg-gray-950/60 p-2.5 rounded-xl border border-gray-800/80">
            <span className="text-gray-400 block text-[10px]">Avg Surface Temp</span>
            <span className="font-mono text-rose-300 font-semibold">{selectedBody.surfaceTempC.avg}°C</span>
          </div>

          <div className="bg-gray-950/60 p-2.5 rounded-xl border border-gray-800/80 col-span-2">
            <span className="text-gray-400 block text-[10px]">Diameter / Scale</span>
            <span className="font-mono text-gray-200 font-semibold">{selectedBody.diameterKm.toLocaleString()} km</span>
          </div>
        </div>

        {/* Atmosphere & Composition Pills */}
        <div className="mt-3">
          <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">Atmosphere</span>
          <div className="flex flex-wrap gap-1">
            {selectedBody.atmosphere.map((gas, i) => (
              <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                {gas}
              </span>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-4 bg-cyan-950/30 border border-cyan-800/40 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Astrophysical Fact</span>
          </div>
          <p className="text-xs text-cyan-100/90 leading-normal">
            {selectedBody.funFacts[0]}
          </p>
        </div>

        {/* AI Deep Dive trigger */}
        {onAskAi && (
          <button
            onClick={() => onAskAi(selectedBody.name)}
            className="mt-4 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask UBT AI About {selectedBody.name.split(' (')[0]}</span>
          </button>
        )}
      </div>
    </div>
  );
};
