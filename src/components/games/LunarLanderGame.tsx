import React, { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Flame, ArrowUp, ArrowLeft, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';

export const LunarLanderGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'landed' | 'crashed'>('idle');
  const [fuel, setFuel] = useState<number>(1000);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [telemetry, setTelemetry] = useState({
    altitude: 500,
    vy: 0,
    vx: 0,
    angle: 0,
  });

  // Physics state stored in refs for 60fps loop
  const landerRef = useRef({
    x: 400,
    y: 60,
    vx: 1.2,
    vy: 0.5,
    angle: 0, // radians
    fuel: 1000,
    mainThrust: false,
    leftThrust: false,
    rightThrust: false,
  });

  // Terrain generation
  const terrainRef = useRef<{ x: number; y: number }[]>([]);
  const landingPadsRef = useRef<{ x1: number; x2: number; y: number; multiplier: number }[]>([]);

  const initGame = () => {
    const canvas = canvasRef.current;
    const w = canvas?.width || 800;
    const h = canvas?.height || 500;

    // Generate rugged lunar terrain with 2 flat landing pads
    const points: { x: number; y: number }[] = [];
    const pad1X = w * 0.25;
    const pad2X = w * 0.7;
    const padWidth = 80;

    const pad1 = { x1: pad1X, x2: pad1X + padWidth, y: h - 60, multiplier: 2 };
    const pad2 = { x2: pad2X + 60, x1: pad2X, y: h - 90, multiplier: 3 };
    landingPadsRef.current = [pad1, pad2];

    for (let x = 0; x <= w; x += 30) {
      if (x >= pad1.x1 && x <= pad1.x2) {
        points.push({ x, y: pad1.y });
      } else if (x >= pad2.x1 && x <= pad2.x2) {
        points.push({ x, y: pad2.y });
      } else {
        const roughness = Math.sin(x * 0.02) * 40 + Math.cos(x * 0.05) * 20;
        points.push({ x, y: h - 50 + roughness });
      }
    }
    terrainRef.current = points;

    landerRef.current = {
      x: w * 0.2,
      y: 60,
      vx: 1.0,
      vy: 0.2,
      angle: 0,
      fuel: 1000,
      mainThrust: false,
      leftThrust: false,
      rightThrust: false,
    };

    setFuel(1000);
    setGameState('playing');
  };

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

    const checkLanding = (x: number, y: number, vx: number, vy: number, angle: number) => {
      // Find landing pad
      for (const pad of landingPadsRef.current) {
        if (x >= pad.x1 && x <= pad.x2 && Math.abs(y - pad.y) < 6) {
          // Check speed parameters
          const isSoftTouchdown = vy < 2.5 && Math.abs(vx) < 1.2 && Math.abs(angle) < 0.15;
          if (isSoftTouchdown) {
            const earned = Math.round((pad.multiplier * 500) + (landerRef.current.fuel * 0.8));
            setScore(earned);
            setHighScore(h => Math.max(h, earned));
            setGameState('landed');
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 } });
            return true;
          } else {
            setGameState('crashed');
            return true;
          }
        }
      }

      // Check crash into general terrain
      const h = canvas.height;
      if (y >= h - 40) {
        setGameState('crashed');
        return true;
      }
      return false;
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stars background
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Earth visible in lunar sky
      ctx.beginPath();
      ctx.arc(canvas.width - 100, 80, 24, 0, Math.PI * 2);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(canvas.width - 106, 75, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      // Draw Terrain
      if (terrainRef.current.length > 0) {
        ctx.beginPath();
        ctx.moveTo(terrainRef.current[0].x, terrainRef.current[0].y);
        for (let i = 1; i < terrainRef.current.length; i++) {
          ctx.lineTo(terrainRef.current[i].x, terrainRef.current[i].y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = '#334155';
        ctx.fill();
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Highlight landing pads
        for (const pad of landingPadsRef.current) {
          ctx.fillStyle = '#10b981';
          ctx.fillRect(pad.x1, pad.y - 2, pad.x2 - pad.x1, 6);
          ctx.fillStyle = '#a7f3d0';
          ctx.font = '10px JetBrains Mono';
          ctx.textAlign = 'center';
          ctx.fillText(`PAD ${pad.multiplier}X`, (pad.x1 + pad.x2) / 2, pad.y - 8);
        }
      }

      // Physics update if playing
      const lander = landerRef.current;
      if (gameState === 'playing') {
        const lunarGravity = 0.04; // g = 1.62 scaled for canvas
        const thrustPower = 0.11;
        const rcsPower = 0.04;

        // Apply RCS Rotation
        if (lander.leftThrust && lander.fuel > 0) {
          lander.angle -= rcsPower;
          lander.fuel -= 1;
        }
        if (lander.rightThrust && lander.fuel > 0) {
          lander.angle += rcsPower;
          lander.fuel += 1;
        }

        // Apply Main Thruster in orientation vector
        if (lander.mainThrust && lander.fuel > 0) {
          lander.vx += Math.sin(lander.angle) * thrustPower;
          lander.vy -= Math.cos(lander.angle) * thrustPower;
          lander.fuel -= 2;
        }

        // Apply lunar gravity
        lander.vy += lunarGravity;

        // Position update
        lander.x += lander.vx;
        lander.y += lander.vy;

        // Boundaries
        if (lander.x < 10) { lander.x = 10; lander.vx = 0; }
        if (lander.x > canvas.width - 10) { lander.x = canvas.width - 10; lander.vx = 0; }

        setFuel(Math.max(0, Math.round(lander.fuel)));
        setTelemetry({
          altitude: Math.max(0, Math.round(canvas.height - 60 - lander.y)),
          vy: Math.round(lander.vy * 10) / 10,
          vx: Math.round(lander.vx * 10) / 10,
          angle: Math.round((lander.angle * 180) / Math.PI),
        });

        checkLanding(lander.x, lander.y, lander.vx, lander.vy, lander.angle);
      }

      // Draw Apollo Lunar Module
      ctx.save();
      ctx.translate(lander.x, lander.y);
      ctx.rotate(lander.angle);

      // Main module body
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(-10, -10, 20, 14);

      // Gold ascent foil
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(-8, 4, 16, 6);

      // Legs
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-8, 10);
      ctx.lineTo(-14, 18);
      ctx.moveTo(8, 10);
      ctx.lineTo(14, 18);
      ctx.stroke();

      // Footpads
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(-16, 18, 5, 2);
      ctx.fillRect(11, 18, 5, 2);

      // Exhaust flame when thruster fired
      if (lander.mainThrust && lander.fuel > 0) {
        ctx.beginPath();
        ctx.moveTo(-5, 10);
        ctx.lineTo(0, 24 + Math.random() * 8);
        ctx.lineTo(5, 10);
        ctx.closePath();
        ctx.fillStyle = '#f97316';
        ctx.fill();
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.moveTo(-3, 10);
        ctx.lineTo(0, 18 + Math.random() * 4);
        ctx.lineTo(3, 10);
        ctx.fill();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    // Key event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        landerRef.current.mainThrust = true;
      }
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        e.preventDefault();
        landerRef.current.leftThrust = true;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        e.preventDefault();
        landerRef.current.rightThrust = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        landerRef.current.mainThrust = false;
      }
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        landerRef.current.leftThrust = false;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        landerRef.current.rightThrust = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState]);

  return (
    <div className="w-full bg-gray-950 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
      {/* Top Game Bar */}
      <div className="p-4 bg-gray-900 border-b border-gray-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold font-display text-white">Apollo 11 Lunar Lander</h3>
            <p className="text-xs text-gray-400">
              Target touchdown: <span className="font-mono text-emerald-400">v_y &lt; 2.5 m/s, pitch &lt; 7°</span>
            </p>
          </div>
        </div>

        {/* Telemetry HUD */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="bg-gray-950 px-3 py-1.5 rounded-lg border border-gray-800">
            <span className="text-gray-400 block text-[10px]">Altitude</span>
            <span className="text-cyan-300 font-bold">{telemetry.altitude} m</span>
          </div>

          <div className="bg-gray-950 px-3 py-1.5 rounded-lg border border-gray-800">
            <span className="text-gray-400 block text-[10px]">Vert Velocity</span>
            <span className={`font-bold ${Math.abs(telemetry.vy) > 2.5 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {telemetry.vy} m/s
            </span>
          </div>

          <div className="bg-gray-950 px-3 py-1.5 rounded-lg border border-gray-800">
            <span className="text-gray-400 block text-[10px]">Fuel</span>
            <span className="text-amber-300 font-bold">{fuel} kg</span>
          </div>
        </div>
      </div>

      {/* Game Canvas Viewport */}
      <div className="relative w-full h-[460px] bg-gray-950 select-none">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Start / Overlay Modal */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4 shadow-xl">
              <Flame className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold font-display text-white">Eagle Has Not Yet Landed</h4>
            <p className="text-sm text-gray-300 max-w-md mt-2">
              Guide the Apollo Lunar Module safely onto the green touchdown pads. Fire your thrusters to counter lunar gravity.
            </p>
            <button
              onClick={initGame}
              className="mt-5 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-blue-900/40 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4" />
              <span>Initiate Powered Descent</span>
            </button>
          </div>
        )}

        {/* Landed Victory Screen */}
        {gameState === 'landed' && (
          <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <ShieldCheck className="w-16 h-16 text-emerald-400 mb-2 animate-bounce" />
            <h4 className="text-3xl font-bold font-display text-white">"Houston, Tranquility Base Here."</h4>
            <p className="text-base text-emerald-200 mt-1">The Eagle has landed safely!</p>
            <div className="mt-4 bg-gray-900/80 px-5 py-2.5 rounded-xl border border-emerald-500/40 font-mono text-sm text-emerald-300">
              Score: {score} pts | Remaining Fuel: {fuel} kg
            </div>
            <button
              onClick={initGame}
              className="mt-5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Launch Next Mission</span>
            </button>
          </div>
        )}

        {/* Crashed Screen */}
        {gameState === 'crashed' && (
          <div className="absolute inset-0 bg-rose-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <AlertTriangle className="w-16 h-16 text-rose-400 mb-2" />
            <h4 className="text-2xl font-bold font-display text-white">Catastrophic Lunar Impact</h4>
            <p className="text-sm text-rose-200 mt-1">Touchdown velocity exceeded landing gear structural limits.</p>
            <button
              onClick={initGame}
              className="mt-5 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Lunar Landing</span>
            </button>
          </div>
        )}
      </div>

      {/* On-Screen Touch / Button Controls */}
      <div className="p-4 bg-gray-900/90 border-t border-gray-800 flex items-center justify-between gap-4">
        <span className="text-xs text-gray-400 font-mono hidden sm:inline">
          Keyboard: <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">Space</kbd> Thrust | <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">←</kbd> <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">→</kbd> Rotate
        </span>

        {/* Touch Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
          <button
            onMouseDown={() => { landerRef.current.leftThrust = true; }}
            onMouseUp={() => { landerRef.current.leftThrust = false; }}
            onTouchStart={() => { landerRef.current.leftThrust = true; }}
            onTouchEnd={() => { landerRef.current.leftThrust = false; }}
            className="px-4 py-3 bg-gray-800 active:bg-cyan-700 rounded-xl text-gray-200 text-xs font-semibold flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Tilt Left
          </button>

          <button
            onMouseDown={() => { landerRef.current.mainThrust = true; }}
            onMouseUp={() => { landerRef.current.mainThrust = false; }}
            onTouchStart={() => { landerRef.current.mainThrust = true; }}
            onTouchEnd={() => { landerRef.current.mainThrust = false; }}
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 active:from-orange-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-orange-950"
          >
            <ArrowUp className="w-4 h-4" /> MAIN THRUST
          </button>

          <button
            onMouseDown={() => { landerRef.current.rightThrust = true; }}
            onMouseUp={() => { landerRef.current.rightThrust = false; }}
            onTouchStart={() => { landerRef.current.rightThrust = true; }}
            onTouchEnd={() => { landerRef.current.rightThrust = false; }}
            className="px-4 py-3 bg-gray-800 active:bg-cyan-700 rounded-xl text-gray-200 text-xs font-semibold flex items-center gap-1"
          >
            Tilt Right <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
