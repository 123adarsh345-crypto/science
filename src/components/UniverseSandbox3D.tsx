import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Play,
  Pause,
  RotateCcw,
  Trash2,
  Sparkles,
  Zap,
  CircleDot,
  Radio,
  ArrowRight,
  Flame,
  Volume2,
  VolumeX,
  Compass,
  Layers,
  ChevronDown,
  ChevronUp,
  Settings,
  Save,
  Download,
  Upload,
  Dices,
  Globe,
  Sliders,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';
import { CustomUniverseConfig } from '../types';

export type SandboxEntityType =
  | 'moon'
  | 'earth'
  | 'jupiter'
  | 'sun'
  | 'blackhole'
  | 'whitehole'
  | 'pulsar'
  | 'magnetar'
  | 'comet';

interface SandboxBody {
  id: number;
  type: SandboxEntityType;
  name: string;
  mesh: THREE.Group | THREE.Mesh;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  mass: number;
  radius: number;
  isFixed?: boolean;
  color: string;
  trailLine?: THREE.Line;
  trailPoints: THREE.Vector3[];
  extraData?: any;
}

// Procedural sound effects using Web Audio API
class CosmicAudioSynth {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playPlace(type: string) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    const now = this.ctx.currentTime;
    if (type === 'whitehole') {
      // Shimmering high-pitch frequency
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'blackhole') {
      // Deep sub-bass resonance
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.5);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else {
      // Pleasant tonal chime
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  }

  playSwallow() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  playCosmicEvent() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.6);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);
  }
}

const audioSynth = new CosmicAudioSynth();

export const UniverseSandbox3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedTool, setSelectedTool] = useState<SandboxEntityType>('whitehole');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showTrails, setShowTrails] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeBodyCount, setActiveBodyCount] = useState<number>(0);
  const [selectedBodyInfo, setSelectedBodyInfo] = useState<string | null>(
    'White Hole: Theoretical spacetime singularity that forcefully expels light, energy, and matter outward!'
  );
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);

  // Universe Creator & Physics Constants
  const [isUniverseCreatorOpen, setIsUniverseCreatorOpen] = useState<boolean>(false);
  const [universeName, setUniverseName] = useState<string>('My Custom Cosmos');
  const [gravityMultiplier, setGravityMultiplier] = useState<number>(1.0);
  const [darkEnergyExpansion, setDarkEnergyExpansion] = useState<number>(0.0);
  const [collisionMode, setCollisionMode] = useState<'merge' | 'bounce' | 'annihilate'>('merge');
  const [cosmicTheme, setCosmicTheme] = useState<'void' | 'andromeda' | 'orion' | 'cygnus'>('void');
  const [creatorNotice, setCreatorNotice] = useState<string | null>(null);

  // Saved universes in localStorage
  const [savedUniverses, setSavedUniverses] = useState<CustomUniverseConfig[]>(() => {
    try {
      const stored = localStorage.getItem('ubt_custom_universes');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  });

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  // Simulation physics storage in ref for lossless 60fps loop
  const bodiesRef = useRef<SandboxBody[]>([]);
  const trailGroupRef = useRef<THREE.Group | null>(null);
  const particleGroupRef = useRef<THREE.Group | null>(null);

  // Physics constants in ref for live simulation loop
  const physicsConstantsRef = useRef({
    gravityMultiplier: 1.0,
    darkEnergyExpansion: 0.0,
    collisionMode: 'merge' as 'merge' | 'bounce' | 'annihilate',
  });

  useEffect(() => {
    physicsConstantsRef.current = {
      gravityMultiplier,
      darkEnergyExpansion,
      collisionMode,
    };
  }, [gravityMultiplier, darkEnergyExpansion, collisionMode]);

  // Drag-and-launch state
  const isDraggingLaunchRef = useRef<boolean>(false);
  const dragStartPosRef = useRef<THREE.Vector3 | null>(null);
  const dragCurrentPosRef = useRef<THREE.Vector3 | null>(null);
  const launchArrowRef = useRef<THREE.ArrowHelper | null>(null);
  const ghostMeshRef = useRef<THREE.Mesh | null>(null);
  const placementPlaneRef = useRef<THREE.Plane>(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));
  const spacetimeGridRef = useRef<THREE.GridHelper | null>(null);

  // Tool entity blueprints
  const ENTITY_CONFIGS: Record<SandboxEntityType, { name: string; mass: number; radius: number; color: string; desc: string }> = {
    whitehole: {
      name: 'White Hole (Singularity)',
      mass: -12000, // Negative effective gravitational mass = REPULSIVE force!
      radius: 3.5,
      color: '#FFFFFF',
      desc: 'The theoretical time-reversal of a black hole: matter and light cannot enter its event horizon, but continuously erupt outward at relativistic speeds!',
    },
    blackhole: {
      name: 'Black Hole (Singularity)',
      mass: 25000,
      radius: 3.2,
      color: '#8B5CF6',
      desc: 'Infinitely dense gravitational singularity with an event horizon. Any body crossing its Schwarzschild threshold is swallowed and adds to its mass.',
    },
    moon: {
      name: 'The Moon (Rocky)',
      mass: 80,
      radius: 1.6,
      color: '#CBD5E1',
      desc: 'Natural satellite. Low mass and high velocity allows stable orbits around larger planets.',
    },
    earth: {
      name: 'Terrestrial Planet (Earth)',
      mass: 600,
      radius: 2.8,
      color: '#3B82F6',
      desc: 'Medium-density rocky world with oceans, continents, and a gravitational field.',
    },
    jupiter: {
      name: 'Gas Giant (Jupiter)',
      mass: 4500,
      radius: 5.2,
      color: '#F59E0B',
      desc: 'Massive gas giant with deep gravitational pull, capable of capturing orbital asteroid belts.',
    },
    sun: {
      name: 'Yellow Star (Sol)',
      mass: 35000,
      radius: 7.5,
      color: '#FBBF24',
      desc: 'Luminous stellar furnace anchoring solar systems. Provides massive gravitational attraction.',
    },
    pulsar: {
      name: 'Spinning Pulsar (Neutron Star)',
      mass: 20000,
      radius: 2.2,
      color: '#06B6D4',
      desc: 'Ultra-dense collapsed stellar remnant spinning rapidly with dual magnetic radiation beams.',
    },
    magnetar: {
      name: 'Magnetar (Extreme Magnetic Field)',
      mass: 24000,
      radius: 2.4,
      color: '#EC4899',
      desc: 'Super-magnetized neutron star with a magnetic field strong enough to bend atomic orbitals.',
    },
    comet: {
      name: 'Icy Comet',
      mass: 15,
      radius: 1.0,
      color: '#E0F2FE',
      desc: 'Fast-moving icy body that develops a glowing dust/ion tail when accelerating.',
    },
  };

  // Helper to build 3D mesh for an entity
  const createEntity3DObject = (type: SandboxEntityType, radius: number): THREE.Group => {
    const group = new THREE.Group();

    if (type === 'whitehole') {
      // 1. Core brilliant white sphere
      const coreGeo = new THREE.SphereGeometry(radius * 0.8, 24, 24);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // 2. Cyan/white pulsing expulsion aura
      const auraGeo = new THREE.SphereGeometry(radius * 1.8, 24, 24);
      const auraMat = new THREE.MeshBasicMaterial({
        color: 0x67e8f9,
        transparent: true,
        opacity: 0.45,
        wireframe: true,
      });
      const aura = new THREE.Mesh(auraGeo, auraMat);
      aura.name = 'pulseAura';
      group.add(aura);

      // 3. Polar expulsion jets
      const jetGeo = new THREE.ConeGeometry(radius * 0.9, radius * 3.5, 16);
      const jetMat = new THREE.MeshBasicMaterial({
        color: 0xa5f3fc,
        transparent: true,
        opacity: 0.6,
      });
      const jetTop = new THREE.Mesh(jetGeo, jetMat);
      jetTop.position.y = radius * 2.2;
      group.add(jetTop);

      const jetBottom = new THREE.Mesh(jetGeo, jetMat);
      jetBottom.position.y = -radius * 2.2;
      jetBottom.rotation.x = Math.PI;
      group.add(jetBottom);
    } else if (type === 'blackhole') {
      // 1. Pitch black event horizon
      const coreGeo = new THREE.SphereGeometry(radius, 24, 24);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);

      // 2. Glowing photon sphere ring
      const ringGeo = new THREE.RingGeometry(radius * 1.3, radius * 2.5, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xf97316,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + 0.3;
      group.add(ring);
    } else if (type === 'pulsar' || type === 'magnetar') {
      // Dense cyan / pink core
      const coreGeo = new THREE.SphereGeometry(radius, 20, 20);
      const coreMat = new THREE.MeshBasicMaterial({
        color: type === 'magnetar' ? 0xec4899 : 0x38bdf8,
      });
      group.add(new THREE.Mesh(coreGeo, coreMat));

      // Magnetic beam cones
      const beamGeo = new THREE.CylinderGeometry(0.2, radius * 1.5, radius * 8, 12);
      const beamMat = new THREE.MeshBasicMaterial({
        color: type === 'magnetar' ? 0xf43f5e : 0x06b6d4,
        transparent: true,
        opacity: 0.55,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.name = 'pulsarBeam';
      group.add(beam);
    } else if (type === 'sun') {
      const sunGeo = new THREE.SphereGeometry(radius, 32, 32);
      const sunMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
      group.add(new THREE.Mesh(sunGeo, sunMat));

      const coronaGeo = new THREE.SphereGeometry(radius * 1.3, 24, 24);
      const coronaMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide,
      });
      group.add(new THREE.Mesh(coronaGeo, coronaMat));
    } else {
      // Planet / Moon / Comet
      const geo = new THREE.SphereGeometry(radius, 20, 20);
      const cfg = ENTITY_CONFIGS[type];
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(cfg.color),
        roughness: 0.7,
        metalness: 0.1,
      });
      group.add(new THREE.Mesh(geo, mat));
    }

    return group;
  };

  // Add a body into the sandbox
  const spawnBody = (
    type: SandboxEntityType,
    pos: THREE.Vector3,
    vel: THREE.Vector3,
    isFixed = false,
    customName?: string
  ) => {
    if (!sceneRef.current) return;
    const cfg = ENTITY_CONFIGS[type];
    const meshGroup = createEntity3DObject(type, cfg.radius);
    meshGroup.position.copy(pos);
    sceneRef.current.add(meshGroup);

    // Trail Line
    const trailPoints: THREE.Vector3[] = [];
    const trailGeo = new THREE.BufferGeometry();
    const trailMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(cfg.color),
      transparent: true,
      opacity: 0.4,
    });
    const trailLine = new THREE.Line(trailGeo, trailMat);
    if (trailGroupRef.current) {
      trailGroupRef.current.add(trailLine);
    }

    const newBody: SandboxBody = {
      id: Date.now() + Math.random(),
      type,
      name: customName || cfg.name,
      mesh: meshGroup,
      pos: pos.clone(),
      vel: vel.clone(),
      mass: cfg.mass,
      radius: cfg.radius,
      isFixed,
      color: cfg.color,
      trailLine,
      trailPoints,
    };

    bodiesRef.current.push(newBody);
    setActiveBodyCount(bodiesRef.current.length);
    audioSynth.playPlace(type);
  };

  // Spawn a planet with multiple orbiting moons in one click!
  const spawnMoonSystem = (centerPos = new THREE.Vector3(0, 0, 0)) => {
    spawnBody('jupiter', centerPos, new THREE.Vector3(0, 0, 0), false, 'Gas Giant Anchor');
    // Spawn 3 moons at Keplerian speeds
    const moonConfigs = [
      { dist: 14, speed: 3.4, name: 'Inner Moon Alpha' },
      { dist: 22, speed: 2.7, name: 'Habitable Ocean Moon' },
      { dist: 32, speed: 2.2, name: 'Outer Ice Moon' },
    ];

    moonConfigs.forEach((m, idx) => {
      const angle = (idx / moonConfigs.length) * Math.PI * 2;
      const mPos = new THREE.Vector3(
        centerPos.x + Math.cos(angle) * m.dist,
        centerPos.y + (idx % 2 === 0 ? 1 : -1) * 0.8,
        centerPos.z + Math.sin(angle) * m.dist
      );
      const mVel = new THREE.Vector3(
        -Math.sin(angle) * m.speed,
        0,
        Math.cos(angle) * m.speed
      );
      spawnBody('moon', mPos, mVel, false, m.name);
    });

    setSelectedBodyInfo('Spawned a Gas Giant with a 3-Moon Keplerian orbital resonance system!');
  };

  // Procedural Random Universe Generator
  const generateProceduralUniverse = (seedType: 'star_system' | 'binary' | 'white_fountain' | 'chaos') => {
    clearAllBodies();
    audioSynth.playCosmicEvent();

    if (seedType === 'star_system') {
      setUniverseName('Sol-Like Planetary Nursery');
      spawnBody('sun', new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), true);

      // Inner terrestrial planet
      spawnBody('earth', new THREE.Vector3(26, 0, 0), new THREE.Vector3(0, 0, 3.8));
      spawnBody('moon', new THREE.Vector3(29.5, 0, 0), new THREE.Vector3(0, 0, 5.2));

      // Outer gas giant with moons
      spawnBody('jupiter', new THREE.Vector3(56, 0, 0), new THREE.Vector3(0, 0, 2.5));
      spawnBody('moon', new THREE.Vector3(62, 0, 0), new THREE.Vector3(0, 0, 3.8));

      // Distant White Hole visitor
      spawnBody('whitehole', new THREE.Vector3(-90, 0, -50), new THREE.Vector3(1.1, 0, 0.6));
      setSelectedBodyInfo('Generated a Star System with Earth-Moon pair, Jupiter, and an incoming rogue White Hole!');
    } else if (seedType === 'binary') {
      setUniverseName('Twin Sun Binary Nexus');
      // Twin stars orbiting common barycenter
      spawnBody('sun', new THREE.Vector3(-22, 0, 0), new THREE.Vector3(0, 0, 1.8));
      spawnBody('sun', new THREE.Vector3(22, 0, 0), new THREE.Vector3(0, 0, -1.8));

      // Circumbinary planets and comets
      spawnBody('earth', new THREE.Vector3(0, 0, 60), new THREE.Vector3(2.5, 0, 0));
      spawnBody('comet', new THREE.Vector3(0, 0, -75), new THREE.Vector3(-2.2, 0, 0));
      setSelectedBodyInfo('Generated a Binary Star System: Two suns locked in gravitational orbit with circumbinary worlds!');
    } else if (seedType === 'white_fountain') {
      setUniverseName('White Hole Relativistic Core');
      // Powerful central white hole fountain
      spawnBody('whitehole', new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), true);
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const dist = 16 + Math.random() * 10;
        spawnBody(
          i % 2 === 0 ? 'moon' : 'comet',
          new THREE.Vector3(Math.cos(angle) * dist, (Math.random() - 0.5) * 6, Math.sin(angle) * dist),
          new THREE.Vector3(Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5)
        );
      }
      setSelectedBodyInfo('Generated White Hole Cosmic Fountain: Repulsive spacetime core actively pushing matter outward!');
    } else {
      setUniverseName('Deep Space Singularity Clash');
      spawnBody('blackhole', new THREE.Vector3(-45, 0, 0), new THREE.Vector3(0, 0, 0.4), true);
      spawnBody('whitehole', new THREE.Vector3(45, 0, 0), new THREE.Vector3(0, 0, -0.4), true);
      spawnBody('pulsar', new THREE.Vector3(0, 0, 35), new THREE.Vector3(1.2, 0, -0.5));

      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        spawnBody(
          'moon',
          new THREE.Vector3(Math.cos(angle) * 30, (Math.random() - 0.5) * 8, Math.sin(angle) * 30),
          new THREE.Vector3(-Math.sin(angle) * 1.8, 0, Math.cos(angle) * 1.8)
        );
      }
      setSelectedBodyInfo('Generated Singularity Clash: Black Hole gravitational basin versus White Hole expulsion fountain!');
    }

    setCreatorNotice(`Universe initialized as "${universeName}". Adjust physics constants or spawn more moons & celestial bodies freely!`);
    setTimeout(() => setCreatorNotice(null), 4000);
  };

  // Save current universe state to localStorage
  const handleSaveCurrentUniverse = () => {
    const bodiesData = bodiesRef.current.map(b => ({
      type: b.type,
      name: b.name,
      pos: [b.pos.x, b.pos.y, b.pos.z] as [number, number, number],
      vel: [b.vel.x, b.vel.y, b.vel.z] as [number, number, number],
      mass: b.mass,
      radius: b.radius,
      color: b.color,
    }));

    const newUniverse: CustomUniverseConfig = {
      id: `univ-${Date.now()}`,
      name: universeName.trim() || 'Custom Universe',
      description: `${bodiesData.length} celestial bodies • Gravity: ${gravityMultiplier}x • Exp: ${darkEnergyExpansion}`,
      author: 'Cosmic Creator',
      createdAt: new Date().toLocaleDateString(),
      constants: {
        gravityMultiplier,
        darkEnergyExpansion,
        speedOfLightFactor: 1.0,
        collisionMode,
        nebulaGlow: true,
      },
      initialBodies: bodiesData,
    };

    const updated = [newUniverse, ...savedUniverses];
    setSavedUniverses(updated);
    try {
      localStorage.setItem('ubt_custom_universes', JSON.stringify(updated));
    } catch {}

    setCreatorNotice(`🌌 Universe "${newUniverse.name}" saved to your personal cosmos library!`);
    setTimeout(() => setCreatorNotice(null), 3500);
  };

  // Load a saved universe
  const handleLoadCustomUniverse = (univ: CustomUniverseConfig) => {
    clearAllBodies();
    setUniverseName(univ.name);
    setGravityMultiplier(univ.constants.gravityMultiplier);
    setDarkEnergyExpansion(univ.constants.darkEnergyExpansion);
    setCollisionMode(univ.constants.collisionMode);

    univ.initialBodies.forEach(b => {
      spawnBody(
        b.type as SandboxEntityType,
        new THREE.Vector3(b.pos[0], b.pos[1], b.pos[2]),
        new THREE.Vector3(b.vel[0], b.vel[1], b.vel[2]),
        false,
        b.name
      );
    });

    setCreatorNotice(`Loaded universe "${univ.name}" with ${univ.initialBodies.length} celestial bodies.`);
    setTimeout(() => setCreatorNotice(null), 3500);
  };

  // Export universe as JSON file
  const handleExportUniverseJson = () => {
    const data = {
      universeName,
      constants: {
        gravityMultiplier,
        darkEnergyExpansion,
        collisionMode,
      },
      bodies: bodiesRef.current.map(b => ({
        type: b.type,
        name: b.name,
        pos: [b.pos.x, b.pos.y, b.pos.z],
        vel: [b.vel.x, b.vel.y, b.vel.z],
      })),
      timestamp: new Date().toISOString(),
      platform: 'UBT (Universal E-books Technology)',
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${universeName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-universe.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Pre-built physics presets
  const loadScenario = (presetName: string) => {
    clearAllBodies();

    if (presetName === 'white_vs_black') {
      setSelectedBodyInfo('Scenario: White Hole vs Black Hole Clash! One furiously repels matter while the other draws it in.');
      spawnBody('blackhole', new THREE.Vector3(-45, 0, 0), new THREE.Vector3(0, 0, 0.4), true);
      spawnBody('whitehole', new THREE.Vector3(45, 0, 0), new THREE.Vector3(0, 0, -0.4), true);

      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const dist = 30 + Math.random() * 20;
        spawnBody(
          'moon',
          new THREE.Vector3(Math.cos(angle) * dist, (Math.random() - 0.5) * 8, Math.sin(angle) * dist),
          new THREE.Vector3(-Math.sin(angle) * 1.8, 0, Math.cos(angle) * 1.8)
        );
      }
    } else if (presetName === 'earth_moon_orbit') {
      setSelectedBodyInfo('Scenario: Earth-Moon orbital balance. Observe the moon in stable orbit around Earth.');
      spawnBody('earth', new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), true);
      spawnBody('moon', new THREE.Vector3(26, 0, 0), new THREE.Vector3(0, 0, 4.2));
    } else if (presetName === 'white_hole_fountain') {
      setSelectedBodyInfo('Scenario: White Hole Cosmic Fountain! Particles and bodies are launched violently into space.');
      spawnBody('whitehole', new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), true);
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        spawnBody(
          'comet',
          new THREE.Vector3(Math.cos(angle) * 12, 0, Math.sin(angle) * 12),
          new THREE.Vector3(Math.cos(angle) * 2, (Math.random() - 0.5) * 2, Math.sin(angle) * 2)
        );
      }
    } else if (presetName === 'solar_chaos') {
      setSelectedBodyInfo('Scenario: Solar System Chaos. A central star orbited by Earth and Jupiter, with an inbound rogue White Hole.');
      spawnBody('sun', new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), true);
      spawnBody('earth', new THREE.Vector3(32, 0, 0), new THREE.Vector3(0, 0, 3.4));
      spawnBody('jupiter', new THREE.Vector3(65, 0, 0), new THREE.Vector3(0, 0, 2.3));
      spawnBody('whitehole', new THREE.Vector3(-85, 0, -40), new THREE.Vector3(1.2, 0, 0.8));
    }
  };

  const clearAllBodies = () => {
    if (!sceneRef.current) return;
    bodiesRef.current.forEach(b => {
      sceneRef.current?.remove(b.mesh);
      if (b.trailLine && trailGroupRef.current) {
        trailGroupRef.current.remove(b.trailLine);
      }
    });
    bodiesRef.current = [];
    setActiveBodyCount(0);
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);
    scene.fog = new THREE.FogExp2(0x020617, 0.001);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 110, 150);
    cameraRef.current = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 600;
    controls.minDistance = 15;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(50, 100, 50);
    scene.add(dirLight);

    // Dynamic Starfield background
    const starGeo = new THREE.BufferGeometry();
    const starCount = 3000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 1400;
      starPositions[i + 1] = (Math.random() - 0.5) * 1400;
      starPositions[i + 2] = (Math.random() - 0.5) * 1400;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 1.8,
      transparent: true,
      opacity: 0.8,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Spacetime Coordinate Grid
    const grid = new THREE.GridHelper(300, 30, 0x06b6d4, 0x1e293b);
    grid.position.y = -0.5;
    scene.add(grid);
    spacetimeGridRef.current = grid;

    // Groups for Trails and Particles
    const trailGroup = new THREE.Group();
    scene.add(trailGroup);
    trailGroupRef.current = trailGroup;

    const particleGroup = new THREE.Group();
    scene.add(particleGroup);
    particleGroupRef.current = particleGroup;

    // Ghost Preview Mesh for Placement
    const ghostGeo = new THREE.SphereGeometry(3, 16, 16);
    const ghostMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const ghost = new THREE.Mesh(ghostGeo, ghostMat);
    ghost.visible = false;
    scene.add(ghost);
    ghostMeshRef.current = ghost;

    // Launch Vector Arrow
    const arrow = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 0, 0),
      0,
      0x38bdf8,
      2,
      1
    );
    arrow.visible = false;
    scene.add(arrow);
    launchArrowRef.current = arrow;

    // Load initial scenario: White vs Black Hole!
    loadScenario('white_vs_black');

    // Raycaster for mouse interaction on y=0 plane
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getPlaneIntersection = (event: MouseEvent): THREE.Vector3 | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const target = new THREE.Vector3();
      const hit = raycaster.ray.intersectPlane(placementPlaneRef.current, target);
      return hit ? target : null;
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (e.button !== 0 || e.shiftKey) return;

      const hit = getPlaneIntersection(e);
      if (hit) {
        controls.enabled = false;
        isDraggingLaunchRef.current = true;
        dragStartPosRef.current = hit.clone();
        dragCurrentPosRef.current = hit.clone();

        if (ghostMeshRef.current) {
          ghostMeshRef.current.position.copy(hit);
          ghostMeshRef.current.visible = true;
        }
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      const hit = getPlaneIntersection(e);
      if (!hit) return;

      if (isDraggingLaunchRef.current && dragStartPosRef.current) {
        dragCurrentPosRef.current = hit.clone();

        const diff = new THREE.Vector3().subVectors(dragStartPosRef.current, hit);
        const len = diff.length();
        if (launchArrowRef.current && len > 0.5) {
          launchArrowRef.current.position.copy(dragStartPosRef.current);
          launchArrowRef.current.setDirection(diff.clone().normalize());
          launchArrowRef.current.setLength(len * 0.8, Math.min(len * 0.25, 4), Math.min(len * 0.15, 2));
          launchArrowRef.current.visible = true;
        }
      } else if (!isDraggingLaunchRef.current && ghostMeshRef.current) {
        ghostMeshRef.current.position.copy(hit);
        ghostMeshRef.current.visible = true;
      }
    };

    const handlePointerUp = (e: MouseEvent) => {
      if (isDraggingLaunchRef.current && dragStartPosRef.current && dragCurrentPosRef.current) {
        const velDiff = new THREE.Vector3()
          .subVectors(dragStartPosRef.current, dragCurrentPosRef.current)
          .multiplyScalar(0.12);

        spawnBody(selectedTool, dragStartPosRef.current, velDiff);
      }

      controls.enabled = true;
      isDraggingLaunchRef.current = false;
      dragStartPosRef.current = null;
      dragCurrentPosRef.current = null;
      if (launchArrowRef.current) launchArrowRef.current.visible = false;
      if (ghostMeshRef.current) ghostMeshRef.current.visible = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', handlePointerDown);
    domEl.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // 60FPS Physics Simulation & Render Loop
    let animId = 0;
    const clock = new THREE.Clock();
    const BASE_G = 120;

    const tick = () => {
      animId = requestAnimationFrame(tick);
      const delta = Math.min(clock.getDelta(), 0.05);

      controls.update();

      // Animate white hole aura pulses and pulsar rotating beams
      bodiesRef.current.forEach(b => {
        if (b.type === 'whitehole') {
          const aura = b.mesh.getObjectByName('pulseAura');
          if (aura) {
            aura.rotation.y += delta * 1.5;
            aura.rotation.z += delta * 0.8;
            const scale = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.15;
            aura.scale.set(scale, scale, scale);
          }
        } else if (b.type === 'pulsar' || b.type === 'magnetar') {
          const beam = b.mesh.getObjectByName('pulsarBeam');
          if (beam) {
            beam.rotation.z += delta * (b.type === 'magnetar' ? 18 : 12);
            beam.rotation.x += delta * 6;
          }
        }
      });

      // Physics loop if running
      if (isRunning && bodiesRef.current.length > 0) {
        const subSteps = 2;
        const dt = (delta * simSpeed) / subSteps;
        const { gravityMultiplier: gMult, darkEnergyExpansion: dExp, collisionMode: cMode } = physicsConstantsRef.current;
        const G = BASE_G * gMult;

        for (let step = 0; step < subSteps; step++) {
          const bodies = bodiesRef.current;

          // 1. Calculate Pairwise Gravitational & Repulsive Forces + Dark Energy
          for (let i = 0; i < bodies.length; i++) {
            const b1 = bodies[i];
            if (b1.isFixed) continue;

            const acc = new THREE.Vector3();

            // Dark Energy cosmological expansion force (pulls away from cosmic center)
            if (dExp !== 0) {
              const cosmicDiff = b1.pos.clone().multiplyScalar(dExp * 25);
              acc.add(cosmicDiff);
            }

            for (let j = 0; j < bodies.length; j++) {
              if (i === j) continue;
              const b2 = bodies[j];

              const diff = new THREE.Vector3().subVectors(b2.pos, b1.pos);
              const distSq = diff.lengthSq() + 16;
              const dist = Math.sqrt(distSq);

              // Gravitational law: F = G * m1 * m2 / r^2
              // If b2 is a WHITE HOLE, its mass is negative -> Repels other bodies outward!
              const forceMag = (G * b2.mass) / distSq;
              const forceVec = diff.normalize().multiplyScalar(forceMag);
              acc.add(forceVec);
            }

            b1.vel.add(acc.multiplyScalar(dt));
            b1.pos.add(b1.vel.clone().multiplyScalar(dt));
            b1.mesh.position.copy(b1.pos);
          }

          // 2. Collision & Annihilation Dynamics
          const destroyedIds = new Set<number>();

          for (let i = 0; i < bodies.length; i++) {
            if (destroyedIds.has(bodies[i].id)) continue;
            let current = bodies[i];

            for (let j = i + 1; j < bodies.length; j++) {
              if (destroyedIds.has(bodies[j].id)) continue;
              const other = bodies[j];
              const dist = current.pos.distanceTo(other.pos);

              if (dist < (current.radius + other.radius) * 0.8) {
                if (cMode === 'bounce') {
                  // Elastic rebound
                  const normal = new THREE.Vector3().subVectors(current.pos, other.pos).normalize();
                  current.vel.reflect(normal).multiplyScalar(0.9);
                  other.vel.reflect(normal.clone().negate()).multiplyScalar(0.9);
                  audioSynth.playPlace('moon');
                  break;
                } else if (cMode === 'annihilate') {
                  // Supernova annihilation flash
                  destroyedIds.add(current.id);
                  destroyedIds.add(other.id);
                  scene.remove(current.mesh);
                  scene.remove(other.mesh);
                  if (current.trailLine && trailGroupRef.current) trailGroupRef.current.remove(current.trailLine);
                  if (other.trailLine && trailGroupRef.current) trailGroupRef.current.remove(other.trailLine);
                  audioSynth.playSwallow();
                  break;
                } else {
                  // Default 'merge' / Devour
                  if (current.type === 'blackhole' || other.type === 'blackhole') {
                    const bh = current.type === 'blackhole' ? current : other;
                    const victim = current.type === 'blackhole' ? other : current;

                    bh.mass += Math.abs(victim.mass) * 0.5;
                    bh.radius = Math.min(12, bh.radius + 0.3);
                    bh.mesh.scale.setScalar(bh.radius / ENTITY_CONFIGS.blackhole.radius);

                    destroyedIds.add(victim.id);
                    scene.remove(victim.mesh);
                    if (victim.trailLine && trailGroupRef.current) {
                      trailGroupRef.current.remove(victim.trailLine);
                    }
                    audioSynth.playSwallow();
                    break;
                  } else {
                    const winner = Math.abs(current.mass) >= Math.abs(other.mass) ? current : other;
                    const loser = winner === current ? other : current;

                    winner.mass += loser.mass * 0.5;
                    winner.radius = Math.min(15, winner.radius * 1.08);
                    winner.mesh.scale.setScalar(winner.radius / ENTITY_CONFIGS[winner.type].radius);

                    destroyedIds.add(loser.id);
                    scene.remove(loser.mesh);
                    if (loser.trailLine && trailGroupRef.current) {
                      trailGroupRef.current.remove(loser.trailLine);
                    }
                    audioSynth.playSwallow();
                    break;
                  }
                }
              }
            }
          }

          if (destroyedIds.size > 0) {
            bodiesRef.current = bodies.filter(b => !destroyedIds.has(b.id));
            setActiveBodyCount(bodiesRef.current.length);
          }
        }

        // 3. Update Orbital Trails
        if (showTrails) {
          bodiesRef.current.forEach(b => {
            if (!b.trailLine) return;
            b.trailPoints.push(b.pos.clone());
            if (b.trailPoints.length > 80) b.trailPoints.shift();

            const posArr = new Float32Array(b.trailPoints.length * 3);
            for (let i = 0; i < b.trailPoints.length; i++) {
              posArr[i * 3] = b.trailPoints[i].x;
              posArr[i * 3 + 1] = b.trailPoints[i].y;
              posArr[i * 3 + 2] = b.trailPoints[i].z;
            }
            b.trailLine.geometry.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
            b.trailLine.geometry.attributes.position.needsUpdate = true;
          });
        }
      }

      renderer.render(scene, camera);
    };

    tick();

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('pointerdown', handlePointerDown);
      domEl.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      renderer.dispose();
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update background nebula color when cosmic theme changes
  useEffect(() => {
    if (!sceneRef.current) return;
    if (cosmicTheme === 'andromeda') {
      sceneRef.current.background = new THREE.Color(0x130026);
    } else if (cosmicTheme === 'orion') {
      sceneRef.current.background = new THREE.Color(0x1c1002);
    } else if (cosmicTheme === 'cygnus') {
      sceneRef.current.background = new THREE.Color(0x021726);
    } else {
      sceneRef.current.background = new THREE.Color(0x020617);
    }
  }, [cosmicTheme]);

  return (
    <div className="relative w-full h-[760px] bg-gray-950 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl flex flex-col select-none">
      {/* 3D WebGL Canvas Viewport */}
      <div ref={mountRef} className="w-full h-full relative cursor-crosshair" />

      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-10">
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Active Universe Name Badge */}
          <div className="bg-gray-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-gray-700/80 text-xs flex items-center gap-2.5 shadow-xl">
            <Globe className="w-4 h-4 text-cyan-400" />
            <div>
              <span className="font-bold text-white block">{universeName}</span>
              <span className="text-[10px] font-mono text-cyan-400">
                {activeBodyCount} Celestial Bodies • G={gravityMultiplier}x
              </span>
            </div>
          </div>

          {/* Universe Creator Studio Toggle Button */}
          <button
            onClick={() => setIsUniverseCreatorOpen(!isUniverseCreatorOpen)}
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-950 transition-all cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
            <span>{isUniverseCreatorOpen ? 'Close Studio' : '🌌 Universe Creator Studio'}</span>
          </button>
        </div>

        {/* Preset Scenarios Fast Selector */}
        <div className="flex items-center gap-1.5 bg-gray-900/90 backdrop-blur-md p-1 rounded-2xl border border-gray-700/80 text-xs pointer-events-auto shadow-xl">
          <span className="text-[10px] font-mono text-gray-400 px-2 uppercase">Presets:</span>
          {[
            { id: 'white_vs_black', label: 'White vs Black Hole' },
            { id: 'earth_moon_orbit', label: 'Earth & Moon' },
            { id: 'white_hole_fountain', label: 'White Hole Fountain' },
            { id: 'solar_chaos', label: 'Solar Chaos' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => loadScenario(p.id)}
              className="px-2.5 py-1 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer text-[11px]"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notice Banner */}
      {creatorNotice && (
        <div className="absolute top-18 left-1/2 -translate-x-1/2 bg-cyan-950/90 backdrop-blur-md border border-cyan-500/80 text-cyan-200 px-4 py-2 rounded-2xl text-xs font-mono z-30 shadow-2xl animate-in fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{creatorNotice}</span>
        </div>
      )}

      {/* Floating Info Card */}
      {selectedBodyInfo && (
        <div className="absolute top-20 left-4 max-w-md bg-gray-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-gray-700/80 shadow-2xl z-10 text-xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
            <span className="font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Universal Physics Insight
            </span>
            <button
              onClick={() => setSelectedBodyInfo(null)}
              className="text-gray-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-300 leading-relaxed">{selectedBodyInfo}</p>
        </div>
      )}

      {/* ================= UNIVERSE CREATOR STUDIO DRAWER ================= */}
      {isUniverseCreatorOpen && (
        <div className="absolute inset-y-0 right-0 w-full sm:w-96 bg-gray-950/95 backdrop-blur-2xl border-l border-gray-800 z-30 p-6 shadow-2xl flex flex-col space-y-5 overflow-y-auto animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold font-display text-white">
                Create &amp; Tune Universe
              </h3>
            </div>
            <button
              onClick={() => setIsUniverseCreatorOpen(false)}
              className="text-xs text-gray-400 hover:text-white p-1"
            >
              ✕
            </button>
          </div>

          {/* Universe Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Universe Name</label>
            <input
              type="text"
              value={universeName}
              onChange={(e) => setUniverseName(e.target.value)}
              placeholder="e.g. Andromeda Omega-4"
              className="w-full px-3 py-2 bg-gray-900 border border-gray-800 focus:border-cyan-400 rounded-xl text-xs text-white focus:outline-none"
            />
          </div>

          {/* Procedural Universe Seeds */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
              <Dices className="w-3.5 h-3.5" />
              Procedural Universe Generators
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => generateProceduralUniverse('star_system')}
                className="p-2.5 rounded-xl bg-gray-900 hover:bg-gray-850 border border-gray-800 text-left text-xs space-y-1 transition-colors"
              >
                <span className="font-bold text-amber-300 block">☀️ Solar System</span>
                <span className="text-[10px] text-gray-400 block">Star with orbiting Earth, Moon, Jupiter</span>
              </button>
              <button
                onClick={() => generateProceduralUniverse('binary')}
                className="p-2.5 rounded-xl bg-gray-900 hover:bg-gray-850 border border-gray-800 text-left text-xs space-y-1 transition-colors"
              >
                <span className="font-bold text-yellow-300 block">♊ Binary Sun</span>
                <span className="text-[10px] text-gray-400 block">Twin stars orbiting common center</span>
              </button>
              <button
                onClick={() => generateProceduralUniverse('white_fountain')}
                className="p-2.5 rounded-xl bg-gray-900 hover:bg-gray-850 border border-gray-800 text-left text-xs space-y-1 transition-colors"
              >
                <span className="font-bold text-cyan-300 block">⚪ White Fountain</span>
                <span className="text-[10px] text-gray-400 block">Repulsive singularity with comets</span>
              </button>
              <button
                onClick={() => generateProceduralUniverse('chaos')}
                className="p-2.5 rounded-xl bg-gray-900 hover:bg-gray-850 border border-gray-800 text-left text-xs space-y-1 transition-colors"
              >
                <span className="font-bold text-purple-300 block">🌀 Clash of Voids</span>
                <span className="text-[10px] text-gray-400 block">White &amp; Black hole gravitational war</span>
              </button>
            </div>
          </div>

          {/* Physics Laws & Universal Constants */}
          <div className="space-y-3 pt-2 border-t border-gray-800">
            <h4 className="text-xs font-bold font-mono uppercase text-gray-400 tracking-wider">
              Universal Physical Constants
            </h4>

            {/* Gravity Constant G */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300">Gravitational Constant (G)</span>
                <span className="font-mono text-cyan-300 font-bold">{gravityMultiplier.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="4.0"
                step="0.1"
                value={gravityMultiplier}
                onChange={(e) => setGravityMultiplier(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <span className="text-[10px] text-gray-500 block">
                Higher G increases orbital velocity and gravitational collapse.
              </span>
            </div>

            {/* Dark Energy / Expansion */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300">Dark Energy Expansion (Λ)</span>
                <span className="font-mono text-purple-300 font-bold">
                  {darkEnergyExpansion === 0 ? 'Static' : darkEnergyExpansion > 0 ? `+${(darkEnergyExpansion * 100).toFixed(0)}% Rip` : `${(darkEnergyExpansion * 100).toFixed(0)}% Crunch`}
                </span>
              </div>
              <input
                type="range"
                min="-0.02"
                max="0.04"
                step="0.005"
                value={darkEnergyExpansion}
                onChange={(e) => setDarkEnergyExpansion(parseFloat(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
              <span className="text-[10px] text-gray-500 block">
                Positive Λ pushes matter away (Big Rip); negative Λ causes a Big Crunch.
              </span>
            </div>

            {/* Collision Dynamics */}
            <div className="space-y-1.5">
              <span className="text-xs text-gray-300 block">Collision Dynamics</span>
              <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                {(['merge', 'bounce', 'annihilate'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setCollisionMode(mode)}
                    className={`py-1.5 rounded-lg capitalize border font-medium transition-colors ${
                      collisionMode === mode
                        ? 'bg-blue-600 border-blue-400 text-white'
                        : 'bg-gray-900 border-gray-800 text-gray-400'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Nebula Ambience */}
            <div className="space-y-1.5">
              <span className="text-xs text-gray-300 block">Cosmic Nebula Backdrop</span>
              <select
                value={cosmicTheme}
                onChange={(e) => setCosmicTheme(e.target.value as any)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="void">Deep Cosmic Void</option>
                <option value="andromeda">Andromeda Violet Nebula</option>
                <option value="orion">Orion Amber Gas Cloud</option>
                <option value="cygnus">Cygnus Electric Blue</option>
              </select>
            </div>
          </div>

          {/* Fast Spawners */}
          <div className="space-y-2 pt-2 border-t border-gray-800">
            <span className="text-xs font-semibold text-gray-300 block">
              Multi-Body Complex Spawners
            </span>
            <button
              onClick={() => spawnMoonSystem(new THREE.Vector3(0, 0, 0))}
              className="w-full py-2.5 px-3 rounded-xl bg-gray-900 hover:bg-gray-850 border border-cyan-800/60 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <CircleDot className="w-3.5 h-3.5" />
              <span>Spawn Gas Giant with 3 Moons</span>
            </button>
          </div>

          {/* Save / Export Universe Controls */}
          <div className="space-y-2 pt-3 border-t border-gray-800">
            <button
              onClick={handleSaveCurrentUniverse}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Universe to Library</span>
            </button>

            <button
              onClick={handleExportUniverseJson}
              className="w-full py-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Universe (.JSON)</span>
            </button>
          </div>

          {/* Saved Universes List */}
          {savedUniverses.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-gray-800">
              <span className="text-xs font-semibold text-gray-400 block font-mono">
                Your Saved Universes ({savedUniverses.length})
              </span>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {savedUniverses.map((u) => (
                  <div
                    key={u.id}
                    className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">{u.name}</span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {u.initialBodies.length} bodies • {u.createdAt}
                      </span>
                    </div>
                    <button
                      onClick={() => handleLoadCustomUniverse(u)}
                      className="px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 text-[11px] font-semibold hover:bg-cyan-900"
                    >
                      Load
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Collapsible Unified Bottom Entity Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-20 pointer-events-none">
        <div className="pointer-events-auto bg-gray-900/95 backdrop-blur-xl border border-gray-700/80 rounded-2xl shadow-2xl p-3 flex flex-col gap-2.5 transition-all">
          {/* Header Row of Dock */}
          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
            <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Click &amp; drag on grid to set launch velocity • Shift+Drag to rotate camera</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const nextMuted = !isMuted;
                  setIsMuted(nextMuted);
                  audioSynth.isMuted = nextMuted;
                }}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>

              <button
                onClick={() => setIsDockCollapsed(!isDockCollapsed)}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>{isDockCollapsed ? 'Expand Dock' : 'Collapse'}</span>
                {isDockCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {!isDockCollapsed && (
            <div className="space-y-2.5">
              {/* Entity Selector Palette */}
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5">
                {[
                  { id: 'whitehole', label: 'White Hole', icon: '⚪', glow: 'border-cyan-400 bg-cyan-950/80' },
                  { id: 'blackhole', label: 'Black Hole', icon: '🕳️', glow: 'border-purple-400 bg-purple-950/80' },
                  { id: 'moon', label: 'Moon', icon: '🌑', glow: 'border-gray-400 bg-gray-800' },
                  { id: 'earth', label: 'Earth', icon: '🌍', glow: 'border-blue-400 bg-blue-950/80' },
                  { id: 'jupiter', label: 'Jupiter', icon: '🪐', glow: 'border-amber-400 bg-amber-950/80' },
                  { id: 'sun', label: 'Sun', icon: '☀️', glow: 'border-yellow-400 bg-yellow-950/80' },
                  { id: 'pulsar', label: 'Pulsar', icon: '⚡', glow: 'border-teal-400 bg-teal-950/80' },
                  { id: 'magnetar', label: 'Magnetar', icon: '🧲', glow: 'border-pink-400 bg-pink-950/80' },
                  { id: 'comet', label: 'Comet', icon: '☄️', glow: 'border-sky-400 bg-sky-950/80' },
                ].map(item => {
                  const isSelected = selectedTool === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedTool(item.id as any);
                        setSelectedBodyInfo(ENTITY_CONFIGS[item.id as SandboxEntityType].desc);
                      }}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                        isSelected
                          ? `${item.glow} text-white font-bold shadow-lg scale-105`
                          : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-[10px] truncate max-w-full font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Simulation Controls Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-gray-800/80 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors cursor-pointer"
                    title={isRunning ? 'Pause' : 'Resume'}
                  >
                    {isRunning ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
                  </button>

                  <button
                    onClick={() => setSimSpeed(s => (s === 1 ? 3 : s === 3 ? 8 : 1))}
                    className="px-2 py-1 rounded bg-cyan-950/80 border border-cyan-800/60 font-mono text-cyan-300 text-xs cursor-pointer"
                  >
                    {simSpeed}x Speed
                  </button>

                  <button
                    onClick={() => setShowTrails(!showTrails)}
                    className={`px-2 py-1 rounded border text-xs cursor-pointer ${
                      showTrails ? 'bg-cyan-950 border-cyan-400 text-cyan-200' : 'bg-gray-800 border-gray-700 text-gray-400'
                    }`}
                  >
                    Trails: {showTrails ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => spawnMoonSystem()}
                    className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-cyan-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <CircleDot className="w-3.5 h-3.5" />
                    <span>+ Moon System</span>
                  </button>

                  <button
                    onClick={clearAllBodies}
                    className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-rose-950/60 hover:text-rose-300 border border-gray-700 hover:border-rose-700 text-gray-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
