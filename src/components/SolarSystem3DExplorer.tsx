import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CELESTIAL_BODIES } from '../data/spaceData';
import { CelestialBody, MissionHistorical } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Orbit,
  Compass,
  Rocket,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Layers,
  Eye,
} from 'lucide-react';

interface Props {
  onSelectBody?: (body: CelestialBody) => void;
  onAskAi?: (topic: string) => void;
  onNavigateToArticle?: (articleId: string) => void;
}

// Procedural texture generator using HTML5 Canvas for ultra-crisp planet surfaces
function createPlanetTexture(type: string, baseHex: string, detailHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 512, 256);

  if (type === 'sun') {
    // Solar granules & flares
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const r = 4 + Math.random() * 12;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.5 ? '#FEF08A' : '#F97316';
      ctx.globalAlpha = 0.35;
      ctx.fill();
    }
  } else if (type === 'earth') {
    // Blue ocean with green/brown continents and white cloud wisps
    ctx.fillStyle = '#1D4ED8';
    ctx.fillRect(0, 0, 512, 256);

    ctx.fillStyle = '#15803D';
    ctx.globalAlpha = 0.85;
    // Continents approximations
    ctx.beginPath();
    ctx.ellipse(140, 90, 45, 35, 0.2, 0, Math.PI * 2); // N America
    ctx.ellipse(180, 160, 30, 45, 0.1, 0, Math.PI * 2); // S America
    ctx.ellipse(320, 80, 55, 35, -0.1, 0, Math.PI * 2); // Eurasia
    ctx.ellipse(330, 140, 35, 40, 0, 0, Math.PI * 2); // Africa
    ctx.ellipse(430, 180, 25, 20, 0, 0, Math.PI * 2); // Australia
    ctx.fill();

    // White swirling clouds
    ctx.fillStyle = '#FFFFFF';
    ctx.globalAlpha = 0.4;
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.ellipse(Math.random() * 512, Math.random() * 256, 40 + Math.random() * 30, 6 + Math.random() * 8, Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'jupiter') {
    // Distinct cloud bands & Great Red Spot
    ctx.globalAlpha = 0.8;
    for (let y = 0; y < 256; y += 12) {
      ctx.fillStyle = y % 24 === 0 ? '#B45309' : y % 36 === 0 ? '#FDE68A' : '#D97706';
      ctx.fillRect(0, y, 512, 10 + Math.sin(y * 0.1) * 3);
    }
    // Great Red Spot
    ctx.fillStyle = '#DC2626';
    ctx.globalAlpha = 0.95;
    ctx.beginPath();
    ctx.ellipse(360, 165, 32, 18, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'mars') {
    // Reddish surface with polar ice caps and craters
    ctx.fillStyle = '#C2410C';
    ctx.fillRect(0, 0, 512, 256);

    ctx.fillStyle = '#9A3412';
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 150; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 256, 5 + Math.random() * 15, 0, Math.PI * 2);
      ctx.fill();
    }
    // Polar white ice caps
    ctx.fillStyle = '#FFFFFF';
    ctx.globalAlpha = 0.9;
    ctx.fillRect(0, 0, 512, 15);
    ctx.fillRect(0, 242, 512, 14);
  } else if (type === 'saturn') {
    // Golden subtle banded gas giant
    for (let y = 0; y < 256; y += 8) {
      ctx.fillStyle = y % 16 === 0 ? '#FDE047' : '#CA8A04';
      ctx.globalAlpha = 0.5;
      ctx.fillRect(0, y, 512, 7);
    }
  } else {
    // Generic rocky / icy bands
    ctx.fillStyle = detailHex;
    ctx.globalAlpha = 0.4;
    for (let i = 0; i < 80; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 256, 3 + Math.random() * 10, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural Saturn Ring Texture
function createRingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.15, 'rgba(234, 179, 8, 0.3)');
  grad.addColorStop(0.35, 'rgba(250, 204, 21, 0.8)');
  grad.addColorStop(0.55, 'rgba(217, 119, 6, 0.9)');
  grad.addColorStop(0.7, 'rgba(0,0,0,0.1)'); // Cassini division
  grad.addColorStop(0.75, 'rgba(245, 158, 11, 0.7)');
  grad.addColorStop(0.95, 'rgba(253, 224, 71, 0.4)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export const SolarSystem3DExplorer: React.FC<Props> = ({
  onSelectBody,
  onAskAi,
  onNavigateToArticle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedBody, setSelectedBody] = useState<CelestialBody>(
    CELESTIAL_BODIES.find(b => b.id === 'earth') || CELESTIAL_BODIES[3]
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [timeSpeed, setTimeSpeed] = useState<number>(1);
  const [showOrbits, setShowOrbits] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [activeTabSub, setActiveTabSub] = useState<'telemetry' | 'missions' | 'facts'>('telemetry');

  // Three.js instances refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const planetMeshesRef = useRef<Map<string, { mesh: THREE.Mesh; orbitRadius: number; speed: number; angle: number; body: CelestialBody }>>(new Map());
  const moonMeshesRef = useRef<{ mesh: THREE.Mesh; parentId: string; radius: number; speed: number; angle: number }[]>([]);
  const targetCamPosRef = useRef<THREE.Vector3 | null>(null);
  const targetLookAtRef = useRef<THREE.Vector3 | null>(null);

  // Focus on a planet in 3D
  const focusOnBody = (body: CelestialBody) => {
    setSelectedBody(body);
    onSelectBody?.(body);

    const planetData = planetMeshesRef.current.get(body.id);
    if (!planetData || !cameraRef.current || !controlsRef.current) return;

    const pos = planetData.mesh.position;
    const bodyRadius = (planetData.mesh.geometry as THREE.SphereGeometry).parameters.radius;

    // Set smooth camera target
    targetLookAtRef.current = pos.clone();
    targetCamPosRef.current = new THREE.Vector3(
      pos.x + bodyRadius * 4 + 4,
      pos.y + bodyRadius * 2 + 3,
      pos.z + bodyRadius * 4 + 4
    );
  };

  const resetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    targetLookAtRef.current = new THREE.Vector3(0, 0, 0);
    targetCamPosRef.current = new THREE.Vector3(0, 90, 160);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Initialize Three.js Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);
    scene.fog = new THREE.FogExp2(0x020617, 0.0015);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      2500
    );
    camera.position.set(0, 95, 175);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 600;
    controls.minDistance = 5;
    controlsRef.current = controls;

    // Ambient & Sunlight
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xfffaed, 2.5, 1200, 0.4);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Starfield Background Sphere
    const starGeo = new THREE.BufferGeometry();
    const starCount = 3500;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = 600 + Math.random() * 400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = radius * Math.cos(phi);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.2,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Planets Configuration for 3D scale
    const bodiesToRender = CELESTIAL_BODIES.filter(
      b => b.id !== 'blackhole-sgr-a' && b.id !== 'moon' && b.id !== 'jwst'
    );

    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    bodiesToRender.forEach((body) => {
      // 3D Orbital distance scaled logarithmically for optimal screen readability
      let orbitR = 0;
      let meshRadius = 1;

      if (body.type === 'star') {
        orbitR = 0;
        meshRadius = 9;
      } else if (body.distanceFromSunAU <= 1.6) {
        orbitR = 18 + body.distanceFromSunAU * 26; // Inner planets (Mercury, Venus, Earth, Mars)
        meshRadius = Math.max(1.1, Math.log10(body.radiusKm) * 0.9);
      } else {
        orbitR = 56 + Math.log2(body.distanceFromSunAU) * 22; // Outer planets (Jupiter, Saturn, Uranus, Neptune, Pluto)
        meshRadius = Math.max(2.2, Math.min(5.5, Math.log10(body.radiusKm) * 1.2));
      }

      // Procedural surface texture
      let textureType = 'rock';
      if (body.id === 'sun') textureType = 'sun';
      if (body.id === 'earth') textureType = 'earth';
      if (body.id === 'mars') textureType = 'mars';
      if (body.id === 'jupiter') textureType = 'jupiter';
      if (body.id === 'saturn') textureType = 'saturn';

      const planetTexture = createPlanetTexture(textureType, body.color, '#2D3748');

      let material: THREE.Material;
      if (body.type === 'star') {
        material = new THREE.MeshBasicMaterial({
          map: planetTexture,
          color: 0xfff0aa,
        });
      } else {
        material = new THREE.MeshStandardMaterial({
          map: planetTexture,
          roughness: 0.65,
          metalness: 0.1,
        });
      }

      const sphereGeo = new THREE.SphereGeometry(meshRadius, 32, 32);
      const mesh = new THREE.Mesh(sphereGeo, material);
      mesh.name = body.id;
      mesh.userData = { bodyId: body.id };

      // Sun glow halo
      if (body.type === 'star') {
        const glowGeo = new THREE.SphereGeometry(meshRadius * 1.35, 32, 32);
        const glowMat = new THREE.MeshBasicMaterial({
          color: 0xf59e0b,
          transparent: true,
          opacity: 0.3,
          side: THREE.BackSide,
        });
        const glowMesh = new THREE.Mesh(glowGeo, glowMat);
        mesh.add(glowMesh);
      }

      // Saturn Rings
      if (body.id === 'saturn') {
        const ringGeo = new THREE.RingGeometry(meshRadius * 1.4, meshRadius * 2.6, 64);
        const ringTex = createRingTexture();
        const ringMat = new THREE.MeshBasicMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2 + 0.35;
        mesh.add(ringMesh);
      }

      // Earth's Moon
      if (body.id === 'earth') {
        const moonGeo = new THREE.SphereGeometry(0.35, 16, 16);
        const moonMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.8 });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        scene.add(moonMesh);
        moonMeshesRef.current.push({
          mesh: moonMesh,
          parentId: 'earth',
          radius: 3.2,
          speed: 4.0,
          angle: 0,
        });
      }

      // Jupiter's Galilean Moons (Europa, Io, Ganymede)
      if (body.id === 'jupiter') {
        const moons = [
          { name: 'Io', r: 0.28, color: 0xfde047, dist: 6.8, sp: 3.5 },
          { name: 'Europa', r: 0.25, color: 0x93c5fd, dist: 8.5, sp: 2.2 },
          { name: 'Ganymede', r: 0.38, color: 0xd1d5db, dist: 10.5, sp: 1.4 },
        ];
        moons.forEach(m => {
          const mGeo = new THREE.SphereGeometry(m.r, 14, 14);
          const mMat = new THREE.MeshStandardMaterial({ color: m.color, roughness: 0.7 });
          const mMesh = new THREE.Mesh(mGeo, mMat);
          scene.add(mMesh);
          moonMeshesRef.current.push({
            mesh: mMesh,
            parentId: 'jupiter',
            radius: m.dist,
            speed: m.sp,
            angle: Math.random() * Math.PI * 2,
          });
        });
      }

      // Position along orbit
      const initialAngle = body.distanceFromSunAU * 1.2;
      mesh.position.set(Math.cos(initialAngle) * orbitR, 0, Math.sin(initialAngle) * orbitR);
      scene.add(mesh);

      // Orbital line
      if (orbitR > 0) {
        const orbitCurve = new THREE.EllipseCurve(0, 0, orbitR, orbitR, 0, 2 * Math.PI, false, 0);
        const points = orbitCurve.getPoints(120);
        const orbitLineGeo = new THREE.BufferGeometry().setFromPoints(
          points.map(p => new THREE.Vector3(p.x, 0, p.y))
        );
        const orbitLineMat = new THREE.LineBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.15,
        });
        const orbitLine = new THREE.Line(orbitLineGeo, orbitLineMat);
        orbitGroup.add(orbitLine);
      }

      // Period velocity
      const periodFactor = body.orbitalPeriodDays > 0 ? 365 / body.orbitalPeriodDays : 0;
      planetMeshesRef.current.set(body.id, {
        mesh,
        orbitRadius: orbitR,
        speed: periodFactor * 0.005,
        angle: initialAngle,
        body,
      });
    });

    // Raycaster for clicking bodies
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const targetMeshes: THREE.Mesh[] = [];
      planetMeshesRef.current.forEach(p => targetMeshes.push(p.mesh));

      const intersects = raycaster.intersectObjects(targetMeshes, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const matched = bodiesToRender.find(b => b.id === hit.name);
        if (matched) {
          focusOnBody(matched);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Animation Loop
    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Smooth camera interpolation toward target
      if (targetCamPosRef.current && targetLookAtRef.current) {
        camera.position.lerp(targetCamPosRef.current, 0.05);
        controls.target.lerp(targetLookAtRef.current, 0.05);

        if (camera.position.distanceTo(targetCamPosRef.current) < 0.5) {
          targetCamPosRef.current = null;
          targetLookAtRef.current = null;
        }
      }

      controls.update();

      // Planetary orbital motion & axial rotation
      planetMeshesRef.current.forEach(({ mesh, orbitRadius, speed }, id) => {
        // Axial rotation
        mesh.rotation.y += delta * 0.8;

        if (isPlaying && orbitRadius > 0) {
          const entry = planetMeshesRef.current.get(id);
          if (entry) {
            entry.angle += entry.speed * timeSpeed * (delta * 60);
            mesh.position.x = Math.cos(entry.angle) * orbitRadius;
            mesh.position.z = Math.sin(entry.angle) * orbitRadius;
          }
        }
      });

      // Moons orbital motion around their parent planets
      moonMeshesRef.current.forEach(moon => {
        const parent = planetMeshesRef.current.get(moon.parentId);
        if (parent) {
          if (isPlaying) {
            moon.angle += moon.speed * 0.02 * timeSpeed * (delta * 60);
          }
          moon.mesh.position.x = parent.mesh.position.x + Math.cos(moon.angle) * moon.radius;
          moon.mesh.position.y = parent.mesh.position.y + Math.sin(moon.angle * 0.5) * 0.4;
          moon.mesh.position.z = parent.mesh.position.z + Math.sin(moon.angle) * moon.radius;
          moon.mesh.rotation.y += delta * 1.2;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Sync orbit line visibility
  useEffect(() => {
    if (!sceneRef.current) return;
    const orbitGroup = sceneRef.current.children.find(c => c.type === 'Group');
    if (orbitGroup) {
      orbitGroup.visible = showOrbits;
    }
  }, [showOrbits]);

  // Enhanced historical missions database for each celestial body
  const historicalMissionsMap: Record<string, MissionHistorical[]> = {
    earth: [
      { name: 'Sputnik 1', year: '1957', agency: 'Soviet Union', type: 'Orbiter', highlight: 'First artificial satellite launched into Earth orbit.' },
      { name: 'Apollo 11', year: '1969', agency: 'NASA', type: 'Lander', highlight: 'First human Moon landing at Sea of Tranquility.' },
      { name: 'Hubble Space Telescope', year: '1990', agency: 'NASA/ESA', type: 'Telescope', highlight: 'Revolutionized modern observational cosmology.' },
      { name: 'International Space Station', year: '1998-Present', agency: 'NASA/ESA/JAXA/CSA', type: 'Orbiter', highlight: 'Over 25 years of continuous human habitation in low Earth orbit.' },
    ],
    mars: [
      { name: 'Viking 1 & 2', year: '1976', agency: 'NASA', type: 'Lander', highlight: 'First successful long-term soft landings and biological soil tests on Mars.' },
      { name: 'Mars Pathfinder & Sojourner', year: '1997', agency: 'NASA', type: 'Rover', highlight: 'First successful micro-rover exploration on another planet.' },
      { name: 'Curiosity Rover', year: '2012-Present', agency: 'NASA', type: 'Rover', highlight: 'Discovered ancient liquid fresh water lake in Gale Crater.' },
      { name: 'Perseverance & Ingenuity', year: '2021-Present', agency: 'NASA', type: 'Rover', highlight: 'Collecting sample tubes in Jezero Crater; first powered flight on another world.' },
    ],
    jupiter: [
      { name: 'Pioneer 10 & 11', year: '1973-1974', agency: 'NASA', type: 'Flyby', highlight: 'First spacecraft to traverse asteroid belt and image Jupiter\'s atmosphere.' },
      { name: 'Voyager 1 & 2', year: '1979', agency: 'NASA', type: 'Flyby', highlight: 'Discovered active volcanism on Io and thin Jovian ring system.' },
      { name: 'Galileo Orbiter & Probe', year: '1995-2003', agency: 'NASA', type: 'Orbiter', highlight: 'First orbital insertion; discovered Europa\'s subsurface liquid ocean.' },
      { name: 'Juno', year: '2016-Present', agency: 'NASA', type: 'Orbiter', highlight: 'Probing internal dynamo and deep atmospheric cyclones in polar orbits.' },
    ],
    saturn: [
      { name: 'Voyager 1 & 2', year: '1980-1981', agency: 'NASA', type: 'Flyby', highlight: 'High-res mapping of ring structure, spokes, and Titan\'s dense nitrogen atmosphere.' },
      { name: 'Cassini-Huygens', year: '2004-2017', agency: 'NASA/ESA/ASI', type: 'Orbiter', highlight: '13-year exploration; Huygens probe touched down on methane lakes of Titan; discovered Enceladus water geysers.' },
      { name: 'Dragonfly (Upcoming)', year: '2028', agency: 'NASA', type: 'Lander', highlight: 'Nuclear-powered rotorcraft drone planned to fly across Titan\'s prebiotic dunes.' },
    ],
    mercury: [
      { name: 'Mariner 10', year: '1974-1975', agency: 'NASA', type: 'Flyby', highlight: 'Used gravitational assist from Venus to image 45% of Mercury\'s cratered surface.' },
      { name: 'MESSENGER', year: '2011-2015', agency: 'NASA', type: 'Orbiter', highlight: 'Confirmed vast water ice deposits in permanently shadowed polar craters.' },
      { name: 'BepiColombo (Active)', year: '2018-Present', agency: 'ESA/JAXA', type: 'Orbiter', highlight: 'Dual orbiters scheduled to achieve final science orbit around Mercury in 2026.' },
    ],
    venus: [
      { name: 'Venera 7', year: '1970', agency: 'Soviet Union', type: 'Lander', highlight: 'First human-made spacecraft to soft-land on another planet and return data.' },
      { name: 'Magellan', year: '1990-1994', agency: 'NASA', type: 'Orbiter', highlight: 'Synthetic aperture radar mapped 98% of Venus\' surface through dense clouds.' },
      { name: 'Akatsuki', year: '2015-Present', agency: 'JAXA', type: 'Orbiter', highlight: 'Discovered equatorial jet streams and gravity waves in sulfuric acid clouds.' },
    ],
  };

  const currentMissions = historicalMissionsMap[selectedBody.id] || [];

  return (
    <div className="relative w-full h-[760px] bg-gray-950 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl flex flex-col">
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={containerRef} className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Floating Telemetry Overlay Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="pointer-events-auto flex items-center gap-2.5 bg-gray-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-gray-700/70 shadow-xl">
          <Orbit className="w-5 h-5 text-cyan-400" />
          <div>
            <div className="text-[10px] font-mono tracking-wider uppercase text-cyan-400 font-bold">
              Interactive 3D Solar System
            </div>
            <div className="text-xs font-semibold text-white flex items-center gap-1.5">
              <span>Target: {selectedBody.name}</span>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedBody.color }} />
            </div>
          </div>
        </div>

        {/* Camera Reset & Help */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={resetCamera}
            className="px-3 py-1.5 rounded-xl bg-gray-900/80 backdrop-blur-md border border-gray-700 hover:border-gray-500 text-xs font-mono text-gray-200 hover:text-white transition-all shadow-lg cursor-pointer"
            title="Reset to Full Solar View"
          >
            Reset Orbit View
          </button>
        </div>
      </div>

      {/* Floating Side Inspector Card when focused */}
      <div className="absolute top-20 right-4 w-88 max-w-[calc(100vw-32px)] bg-gray-900/95 backdrop-blur-xl border border-gray-700/80 rounded-2xl shadow-2xl z-20 overflow-hidden flex flex-col max-h-[580px]">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-start justify-between bg-gray-950/60">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
              {selectedBody.type.toUpperCase()} OBSERVATORY
            </span>
            <h3 className="text-xl font-bold font-display text-white mt-0.5">{selectedBody.name}</h3>
          </div>
          <div
            className="w-7 h-7 rounded-full border border-white/30 shadow-md shrink-0 flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: selectedBody.color }}
          >
            ●
          </div>
        </div>

        {/* Tab Selector Inside Inspector */}
        <div className="flex border-b border-gray-800 bg-gray-950/30 text-xs font-medium">
          <button
            onClick={() => setActiveTabSub('telemetry')}
            className={`flex-1 py-2 text-center transition-colors border-b-2 ${
              activeTabSub === 'telemetry'
                ? 'border-cyan-400 text-cyan-300 font-semibold bg-gray-900/50'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Telemetry
          </button>
          <button
            onClick={() => setActiveTabSub('missions')}
            className={`flex-1 py-2 text-center transition-colors border-b-2 ${
              activeTabSub === 'missions'
                ? 'border-cyan-400 text-cyan-300 font-semibold bg-gray-900/50'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Missions ({currentMissions.length || selectedBody.keyMissions.length})
          </button>
          <button
            onClick={() => setActiveTabSub('facts')}
            className={`flex-1 py-2 text-center transition-colors border-b-2 ${
              activeTabSub === 'facts'
                ? 'border-cyan-400 text-cyan-300 font-semibold bg-gray-900/50'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Science Facts
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs text-gray-300 scrollbar-none">
          {activeTabSub === 'telemetry' && (
            <>
              <p className="leading-relaxed text-gray-300 border-b border-gray-800 pb-3">
                {selectedBody.overview}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-gray-950/60 border border-gray-800">
                  <span className="text-gray-500 block text-[10px]">Distance from Sun</span>
                  <span className="font-mono text-cyan-300 font-bold">
                    {selectedBody.distanceFromSunAU === 0 ? 'Solar Center' : `${selectedBody.distanceFromSunAU} AU`}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-950/60 border border-gray-800">
                  <span className="text-gray-500 block text-[10px]">Surface Gravity</span>
                  <span className="font-mono text-amber-300 font-bold">{selectedBody.gravityMps2} m/s²</span>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-950/60 border border-gray-800">
                  <span className="text-gray-500 block text-[10px]">Orbital Period</span>
                  <span className="font-mono text-emerald-300 font-bold">
                    {selectedBody.orbitalPeriodDays === 0 ? 'N/A' : `${selectedBody.orbitalPeriodDays} Days`}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-950/60 border border-gray-800">
                  <span className="text-gray-500 block text-[10px]">Diameter</span>
                  <span className="font-mono text-rose-300 font-bold">
                    {selectedBody.diameterKm.toLocaleString()} km
                  </span>
                </div>
              </div>

              {/* Atmosphere */}
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase text-gray-500 block mb-1">Atmospheric Composition:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedBody.atmosphere.map((gas, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-gray-800 text-[11px] text-gray-300 border border-gray-700">
                      {gas}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTabSub === 'missions' && (
            <div className="space-y-2.5">
              {currentMissions.length > 0 ? (
                currentMissions.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-gray-950/80 border border-gray-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{m.name}</span>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-1.5 py-0.5 rounded">
                        {m.year}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-gray-400">
                      Agency: {m.agency} • Type: {m.type}
                    </div>
                    <p className="text-[11px] text-gray-300 leading-snug">{m.highlight}</p>
                  </div>
                ))
              ) : (
                <div className="space-y-1.5">
                  <span className="text-gray-400 block mb-2">Historical Mission Exploration:</span>
                  {selectedBody.keyMissions.map((km, i) => (
                    <div key={i} className="p-2 rounded-lg bg-gray-950 border border-gray-800 text-xs text-gray-200 flex items-center gap-2">
                      <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{km}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTabSub === 'facts' && (
            <div className="space-y-2.5">
              {selectedBody.funFacts.map((fact, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-cyan-400 text-[11px] font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Fact #{idx + 1}</span>
                  </div>
                  <p className="text-xs text-cyan-100/90 leading-relaxed">{fact}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-gray-950 border-t border-gray-800 flex gap-2">
          {onAskAi && (
            <button
              onClick={() => onAskAi(selectedBody.name)}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/40 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI About {selectedBody.name.split(' (')[0]}</span>
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Unified Bottom Control Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-20 pointer-events-none">
        <div className="pointer-events-auto bg-gray-900/95 backdrop-blur-xl border border-gray-700/80 rounded-2xl shadow-2xl p-3 flex flex-col gap-2 transition-all">
          {/* Toggle Dock Button */}
          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
            <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Orbit Controls: Left-drag to rotate • Scroll to zoom • Click body to fly-in</span>
            </div>

            <div className="flex items-center gap-2">
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
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              {/* Play / Speed Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors"
                  title={isPlaying ? 'Pause Orbits' : 'Resume Orbits'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
                </button>
                <button
                  onClick={() => setTimeSpeed(s => (s === 1 ? 5 : s === 5 ? 20 : 1))}
                  className="text-xs font-mono text-cyan-300 px-2 py-1 rounded bg-cyan-950/70 border border-cyan-800/50"
                  title="Orbital Time Multiplier"
                >
                  {timeSpeed}x Speed
                </button>
                <button
                  onClick={() => setShowOrbits(!showOrbits)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                    showOrbits
                      ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300'
                      : 'bg-gray-800 border-gray-700 text-gray-400'
                  }`}
                >
                  Orbits: {showOrbits ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Quick Planet Selector Carousel */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-lg scrollbar-none">
                {CELESTIAL_BODIES.filter(b => b.id !== 'blackhole-sgr-a').map(body => {
                  const isCur = selectedBody.id === body.id;
                  return (
                    <button
                      key={body.id}
                      onClick={() => focusOnBody(body)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap border transition-all flex items-center gap-1.5 ${
                        isCur
                          ? 'bg-cyan-950 border-cyan-400 text-cyan-200 shadow-md'
                          : 'bg-gray-800/80 border-gray-700 text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: body.color }} />
                      <span>{body.name.split(' (')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
