export type TabType = 'search' | 'chat' | 'library' | 'encyclopedia' | 'solarsystem' | 'tools' | 'games' | 'today';

export interface LibraryEBook {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  category: 'Cosmology' | 'Astrophysics' | 'Quantum' | 'Exoplanets' | 'Spaceflight' | 'Sci-Fi' | 'General Science';
  coverGradient: string;
  summary: string;
  markdownContent: string;
  readingTimeMin: number;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  isUserCreated: boolean;
  tags: string[];
}

export interface MissionHistorical {
  name: string;
  year: string;
  agency: string;
  type: 'Flyby' | 'Orbiter' | 'Lander' | 'Rover' | 'Telescope' | 'Sample Return';
  highlight: string;
}

export interface CelestialBody {
  id: string;
  name: string;
  type: 'star' | 'planet' | 'dwarf' | 'moon' | 'spacecraft' | 'blackhole' | 'galaxy';
  distanceFromSunAU: number; // in AU
  radiusKm: number;
  orbitalPeriodDays: number;
  rotationPeriodHours: number;
  gravityMps2: number;
  surfaceTempC: { min: number; max: number; avg: number };
  moonsCount: number;
  color: string;
  glowColor: string;
  overview: string;
  atmosphere: string[];
  composition: string[];
  keyMissions: string[];
  historicalMissions?: MissionHistorical[];
  funFacts: string[];
  diameterKm: number;
  massKg: string;
  tiltDegrees?: number;
  moonsList?: { name: string; radiusKm: number; distanceKm: number; color: string }[];
}

export interface EncyclopediaArticle {
  id: string;
  title: string;
  subtitle: string;
  category: 'astrophysics' | 'solar_system' | 'quantum_physics' | 'spaceflight' | 'cosmology' | 'earth_life' | 'theoretical' | 'scifi' | 'astrobiology';
  readingTimeMin: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  heroImageDesc: string;
  author?: string;
  isUserCreated?: boolean;
  publishedDate?: string;
  coverGradient?: string;
  stats: { label: string; value: string }[];
  sections: {
    heading: string;
    content: string;
  }[];
  timeline?: { year: string; event: string }[];
  trivia: string[];
  relatedArticleIds: string[];
  interactiveToolRef?: 'solarsystem' | 'gravity' | 'scale' | 'fusion' | 'exoplanet' | 'rocket' | 'sandbox3d';
}

export interface CustomUniverseConfig {
  id: string;
  name: string;
  description: string;
  author: string;
  createdAt: string;
  seed?: string;
  constants: {
    gravityMultiplier: number;
    darkEnergyExpansion: number;
    speedOfLightFactor: number;
    collisionMode: 'merge' | 'bounce' | 'annihilate';
    nebulaGlow: boolean;
  };
  initialBodies: {
    type: string;
    name: string;
    pos: [number, number, number];
    vel: [number, number, number];
    mass: number;
    radius: number;
    color: string;
  }[];
}

export interface ScaleObject {
  id: string;
  name: string;
  exponent: number; // 10^exponent meters
  sizeFormatted: string;
  category: 'quantum' | 'atomic' | 'microscopic' | 'human' | 'planetary' | 'stellar' | 'galactic' | 'cosmic';
  description: string;
  fact: string;
  icon: string;
}

export interface TriviaQuestion {
  id: string;
  category: 'Astronomy' | 'Physics' | 'Biology' | 'Space Missions' | 'Solar System';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedArticleId?: string;
  relatedToolId?: string;
}

export interface ElementData {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: 'nonmetal' | 'noble_gas' | 'alkali' | 'alkaline_earth' | 'metalloid' | 'halogen' | 'transition_metal' | 'post_transition';
  cosmicOrigin: 'Big Bang Nucleosynthesis' | 'Low-mass Stars (Cosmic Wind)' | 'Massive Exploding Stars (Supernovae)' | 'Neutron Star Mergers (Kilonovae)' | 'Cosmic Ray Fission' | 'Man-made Laboratory';
  cosmicOriginColor: string;
  astrophysicalRole: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedTopics?: string[];
  referencedArticles?: { id: string; title: string }[];
  referencedTools?: { id: string; name: string }[];
}
