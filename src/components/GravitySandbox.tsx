import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Trash2, Zap, CircleDot, Disc, Sparkles } from 'lucide-react';

interface Body {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  radius: number;
  color: string;
  isFixed?: boolean;
  isBlackHole?: boolean;
  trail: { x: number; y: number }[];
}

const G_CONST = 800; // Gravitational constant scaled for canvas physics

export const GravitySandbox: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [selectedTool, setSelectedTool] = useState<'planet' | 'star' | 'blackhole' | 'moon'>('planet');
  const [bodies, setBodies] = useState<Body[]>([]);
  const [showTrails, setShowTrails] = useState(true);
  const [trailLength, setTrailLength] = useState(60);
  const [preset, setPreset] = useState<string>('figure8');

  // Drag creation state
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const currentMouseRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize with Figure-8 3-Body problem or Earth-Moon
  const loadPreset = (presetName: string) => {
    const canvas = canvasRef.current;
    const w = canvas?.width || 800;
    const h = canvas?.height || 500;
    const cx = w / 2;
    const cy = h / 2;

    if (presetName === 'figure8') {
      // Classic Moore 1993 3-Body choreographic Figure-8 orbit
      const m = 300;
      const x1 = -180;
      const y1 = 0;
      const vx1 = 0.932;
      const vy1 = 0.864;

      setBodies([
        { id: 1, x: cx + x1, y: cy + y1, vx: vx1, vy: vy1, mass: m, radius: 10, color: '#38bdf8', trail: [] },
        { id: 2, x: cx - x1, y: cy - y1, vx: vx1, vy: vy1, mass: m, radius: 10, color: '#ec4899', trail: [] },
        { id: 3, x: cx, y: cy, vx: -2 * vx1, vy: -2 * vy1, mass: m, radius: 10, color: '#fbbf24', trail: [] },
      ]);
    } else if (presetName === 'earth_moon') {
      // Central Star + Planet + Moon
      setBodies([
        { id: 1, x: cx, y: cy, vx: 0, vy: 0, mass: 8000, radius: 22, color: '#fbbf24', isFixed: true, trail: [] },
        { id: 2, x: cx + 180, y: cy, vx: 0, vy: 6.6, mass: 80, radius: 8, color: '#3b82f6', trail: [] },
        { id: 3, x: cx + 205, y: cy, vx: 0, vy: 8.5, mass: 5, radius: 4, color: '#94a3b8', trail: [] },
      ]);
    } else if (presetName === 'binary_star') {
      // Binary Star System with orbiting planets
      setBodies([
        { id: 1, x: cx - 60, y: cy, vx: 0, vy: -3.5, mass: 2500, radius: 16, color: '#f59e0b', trail: [] },
        { id: 2, x: cx + 60, y: cy, vx: 0, vy: 3.5, mass: 2500, radius: 16, color: '#ef4444', trail: [] },
        { id: 3, x: cx + 240, y: cy, vx: 0, vy: 4.8, mass: 20, radius: 6, color: '#10b981', trail: [] },
        { id: 4, x: cx - 290, y: cy, vx: 0, vy: -4.3, mass: 30, radius: 7, color: '#06b6d4', trail: [] },
      ]);
    } else if (presetName === 'blackhole') {
      // Supermassive Black Hole Accretion
      setBodies([
        { id: 1, x: cx, y: cy, vx: 0, vy: 0, mass: 25000, radius: 18, color: '#8b5cf6', isFixed: true, isBlackHole: true, trail: [] },
        { id: 2, x: cx + 120, y: cy, vx: 0, vy: 14, mass: 10, radius: 4, color: '#f43f5e', trail: [] },
        { id: 3, x: cx - 180, y: cy, vx: 0, vy: -11.5, mass: 15, radius: 5, color: '#38bdf8', trail: [] },
        { id: 4, x: cx + 240, y: cy, vx: 0, vy: 9.8, mass: 20, radius: 6, color: '#fbbf24', trail: [] },
        { id: 5, x: cx - 300, y: cy, vx: 0, vy: -8.8, mass: 12, radius: 4.5, color: '#a855f7', trail: [] },
      ]);
    }
  };

  useEffect(() => {
    loadPreset('figure8');
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 500;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const stepSimulation = () => {
      if (!isRunning) return;

      setBodies(prevBodies => {
        const nextBodies = prevBodies.map(b => ({
          ...b,
          trail: showTrails ? [...b.trail, { x: b.x, y: b.y }].slice(-trailLength) : []
        }));

        const dt = 0.15; // time step
        const softening = 25; // gravitational softening to prevent infinite blowup

        // Calculate pairwise gravitational acceleration
        for (let i = 0; i < nextBodies.length; i++) {
          const b1 = nextBodies[i];
          if (b1.isFixed) continue;

          let ax = 0;
          let ay = 0;

          for (let j = 0; j < nextBodies.length; j++) {
            if (i === j) continue;
            const b2 = nextBodies[j];

            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const distSq = dx * dx + dy * dy + softening;
            const dist = Math.sqrt(distSq);

            // Newton's law: F = G * m1 * m2 / r^2 -> a = G * m2 / r^2
            const force = (G_CONST * b2.mass) / (distSq * dist);
            ax += force * dx;
            ay += force * dy;
          }

          b1.vx += ax * dt;
          b1.vy += ay * dt;
          b1.x += b1.vx * dt;
          b1.y += b1.vy * dt;
        }

        // Handle black hole event horizon swallowing or inelastic collisions
        const surviving: Body[] = [];
        const mergedIds = new Set<number>();

        for (let i = 0; i < nextBodies.length; i++) {
          if (mergedIds.has(nextBodies[i].id)) continue;
          let current = nextBodies[i];

          for (let j = i + 1; j < nextBodies.length; j++) {
            if (mergedIds.has(nextBodies[j].id)) continue;
            const other = nextBodies[j];
            const dx = other.x - current.x;
            const dy = other.y - current.y;
            const dist = Math.hypot(dx, dy);

            // Collision check
            if (dist < (current.radius + other.radius) * 0.75) {
              if (current.mass >= other.mass) {
                // Inelastic collision conservation of momentum
                const totalMass = current.mass + other.mass;
                if (!current.isFixed) {
                  current.vx = (current.vx * current.mass + other.vx * other.mass) / totalMass;
                  current.vy = (current.vy * current.mass + other.vy * other.mass) / totalMass;
                }
                current.mass = totalMass;
                current.radius = Math.min(35, current.radius + Math.max(1, other.radius * 0.2));
                mergedIds.add(other.id);
              } else {
                const totalMass = current.mass + other.mass;
                if (!other.isFixed) {
                  other.vx = (current.vx * current.mass + other.vx * other.mass) / totalMass;
                  other.vy = (current.vy * current.mass + other.vy * other.mass) / totalMass;
                }
                other.mass = totalMass;
                other.radius = Math.min(35, other.radius + Math.max(1, current.radius * 0.2));
                mergedIds.add(current.id);
                current = other;
              }
            }
          }

          if (!mergedIds.has(current.id)) {
            surviving.push(current);
          }
        }

        return surviving;
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space grid
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw orbital trails
      if (showTrails) {
        bodies.forEach(b => {
          if (b.trail.length < 2) return;
          ctx.beginPath();
          ctx.moveTo(b.trail[0].x, b.trail[0].y);
          for (let i = 1; i < b.trail.length; i++) {
            ctx.lineTo(b.trail[i].x, b.trail[i].y);
          }
          ctx.strokeStyle = b.color;
          ctx.globalAlpha = 0.35;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        });
      }

      // Draw bodies
      bodies.forEach(b => {
        // Black Hole photon sphere / accretion glow
        if (b.isBlackHole) {
          const accretion = ctx.createRadialGradient(b.x, b.y, b.radius, b.x, b.y, b.radius * 3.5);
          accretion.addColorStop(0, 'rgba(251, 146, 60, 0.9)');
          accretion.addColorStop(0.3, 'rgba(168, 85, 247, 0.5)');
          accretion.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = accretion;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius * 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Event Horizon (pitch black core)
          ctx.fillStyle = '#000000';
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fill();

          // Photon sphere ring
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          return;
        }

        // Atmosphere / gravity glow
        const glow = ctx.createRadialGradient(b.x, b.y, b.radius * 0.2, b.x, b.y, b.radius * 2.2);
        glow.addColorStop(0, b.color);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Shaded sphere
        const grad = ctx.createRadialGradient(
          b.x - b.radius * 0.3,
          b.y - b.radius * 0.3,
          b.radius * 0.1,
          b.x,
          b.y,
          b.radius
        );
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.4, b.color);
        grad.addColorStop(1, '#0f172a');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();

        // Velocity vector arrow (if moving)
        if (Math.hypot(b.vx, b.vy) > 0.2) {
          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(b.x + b.vx * 3, b.y + b.vy * 3);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Drag launch preview line
      if (dragStartRef.current && currentMouseRef.current) {
        const start = dragStartRef.current;
        const curr = currentMouseRef.current;

        // Slingshot velocity line
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(curr.x, curr.y);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Target preview icon
        ctx.fillStyle = selectedTool === 'blackhole' ? '#8b5cf6' : selectedTool === 'star' ? '#f59e0b' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(start.x, start.y, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      stepSimulation();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRunning, showTrails, trailLength, bodies, selectedTool]);

  // Mouse Handlers for spawning bodies
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    dragStartRef.current = { x, y };
    currentMouseRef.current = { x, y };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragStartRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    currentMouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseUp = () => {
    if (!dragStartRef.current || !currentMouseRef.current) return;
    const start = dragStartRef.current;
    const curr = currentMouseRef.current;

    // Launch velocity is proportional to drag displacement
    const vx = (start.x - curr.x) * 0.08;
    const vy = (start.y - curr.y) * 0.08;

    let mass = 100;
    let radius = 8;
    let color = '#38bdf8';
    let isBlackHole = false;
    let isFixed = false;

    if (selectedTool === 'star') {
      mass = 4000;
      radius = 18;
      color = '#fbbf24';
    } else if (selectedTool === 'blackhole') {
      mass = 15000;
      radius = 16;
      color = '#8b5cf6';
      isBlackHole = true;
    } else if (selectedTool === 'moon') {
      mass = 10;
      radius = 4;
      color = '#94a3b8';
    }

    const newBody: Body = {
      id: Date.now(),
      x: start.x,
      y: start.y,
      vx,
      vy,
      mass,
      radius,
      color,
      isBlackHole,
      isFixed,
      trail: [],
    };

    setBodies(prev => [...prev, newBody]);
    dragStartRef.current = null;
    currentMouseRef.current = null;
  };

  return (
    <div className="w-full bg-gray-950 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
      {/* Sandbox Control Header */}
      <div className="p-4 bg-gray-900/90 border-b border-gray-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold font-display text-white">N-Body Gravitational Sandbox</h3>
            <p className="text-xs text-gray-400">
              Drag on canvas to launch bodies • <span className="font-mono text-cyan-300">F = G(m₁m₂)/r²</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-medium text-gray-200 transition-colors"
          >
            {isRunning ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
            <span>{isRunning ? 'Pause' : 'Resume'}</span>
          </button>

          <button
            onClick={() => setBodies([])}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-rose-950/40 hover:text-rose-300 text-xs font-medium text-gray-300 transition-colors"
            title="Clear all bodies"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>

          <button
            onClick={() => setShowTrails(!showTrails)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              showTrails
                ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300'
                : 'bg-gray-800/60 border-gray-700 text-gray-400'
            }`}
          >
            Trails: {showTrails ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Preset Bar and Spawning Tool Palette */}
      <div className="px-4 py-2.5 bg-gray-900/60 border-b border-gray-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Spawn Tool Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 mr-1 font-mono uppercase text-[10px]">Launch Type:</span>
          <button
            onClick={() => setSelectedTool('planet')}
            className={`px-2.5 py-1 rounded-lg font-medium border transition-all ${
              selectedTool === 'planet'
                ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                : 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            ● Planet
          </button>
          <button
            onClick={() => setSelectedTool('star')}
            className={`px-2.5 py-1 rounded-lg font-medium border transition-all ${
              selectedTool === 'star'
                ? 'bg-amber-600 border-amber-400 text-white shadow-md'
                : 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            ★ Star (Heavy)
          </button>
          <button
            onClick={() => setSelectedTool('blackhole')}
            className={`px-2.5 py-1 rounded-lg font-medium border transition-all ${
              selectedTool === 'blackhole'
                ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                : 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            🌀 Black Hole
          </button>
          <button
            onClick={() => setSelectedTool('moon')}
            className={`px-2.5 py-1 rounded-lg font-medium border transition-all ${
              selectedTool === 'moon'
                ? 'bg-gray-600 border-gray-400 text-white shadow-md'
                : 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            • Moon (Tiny)
          </button>
        </div>

        {/* Physics Presets */}
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 mr-1 font-mono uppercase text-[10px]">Physics Presets:</span>
          {[
            { id: 'figure8', label: 'Figure-8 (3-Body)' },
            { id: 'earth_moon', label: 'Star + Planet + Moon' },
            { id: 'binary_star', label: 'Binary Star System' },
            { id: 'blackhole', label: 'Black Hole Accretion' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => {
                setPreset(p.id);
                loadPreset(p.id);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                preset === p.id
                  ? 'bg-purple-950/80 border-purple-400 text-purple-200'
                  : 'bg-gray-800/80 border-gray-700/80 text-gray-400 hover:text-gray-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Physics Canvas */}
      <div className="relative w-full h-[520px] bg-gray-950 cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="w-full h-full block"
        />

        {/* Floating instruction helper */}
        <div className="absolute bottom-4 left-4 pointer-events-none bg-gray-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-800 text-[11px] text-gray-300 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Active bodies: <strong className="text-cyan-300 font-mono">{bodies.length}</strong></span>
          <span className="text-gray-500">| Click and drag mouse across screen to set launch speed & trajectory</span>
        </div>
      </div>
    </div>
  );
};
