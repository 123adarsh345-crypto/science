import { CelestialBody, EncyclopediaArticle, ScaleObject, TriviaQuestion, ElementData } from '../types';

export const CELESTIAL_BODIES: CelestialBody[] = [
  {
    id: 'sun',
    name: 'The Sun (Sol)',
    type: 'star',
    distanceFromSunAU: 0,
    radiusKm: 696340,
    diameterKm: 1392700,
    massKg: '1.989 × 10³⁰ kg (99.86% of solar system)',
    orbitalPeriodDays: 0,
    rotationPeriodHours: 600, // ~25-35 days differential
    gravityMps2: 274,
    surfaceTempC: { min: 5500, max: 15000000, avg: 5505 },
    moonsCount: 0,
    color: '#FBBF24',
    glowColor: 'rgba(251, 191, 36, 0.6)',
    overview: 'The yellow dwarf star at the center of our solar system, fusing 600 million tons of hydrogen into helium every second via the proton-proton chain.',
    atmosphere: ['73% Hydrogen', '25% Helium', 'Oxygen', 'Carbon', 'Neon', 'Iron'],
    composition: ['Core (15M K fusion zone)', 'Radiative Zone', 'Convective Zone', 'Photosphere', 'Corona'],
    keyMissions: ['Parker Solar Probe', 'Solar Orbiter', 'SOHO', 'SDO'],
    funFacts: [
      'Light takes about 8 minutes and 20 seconds to travel from the Sun to Earth.',
      'A photon created in the core takes over 100,000 years to reach the surface due to random walk collisions.',
      'Over 1.3 million Earths could fit inside the Sun.'
    ]
  },
  {
    id: 'mercury',
    name: 'Mercury',
    type: 'planet',
    distanceFromSunAU: 0.39,
    radiusKm: 2439.7,
    diameterKm: 4879,
    massKg: '3.301 × 10²³ kg',
    orbitalPeriodDays: 88,
    rotationPeriodHours: 1407.6, // 58.6 Earth days
    gravityMps2: 3.7,
    surfaceTempC: { min: -180, max: 430, avg: 167 },
    moonsCount: 0,
    color: '#9CA3AF',
    glowColor: 'rgba(156, 163, 175, 0.4)',
    overview: 'The smallest planet in the solar system and closest to the Sun. It experiences the most extreme temperature swings, from scorching days to frozen nights.',
    atmosphere: ['Trace Oxygen', 'Sodium', 'Hydrogen', 'Helium', 'Potassium'],
    composition: ['Giant metallic iron core (85% of radius)', 'Silicate mantle', 'Silicate crust'],
    keyMissions: ['Mariner 10', 'MESSENGER', 'BepiColombo'],
    funFacts: [
      'Mercury has a 3:2 spin-orbit resonance: it rotates three times for every two orbits around the Sun.',
      'Despite proximity to the Sun, water ice exists in permanently shadowed polar craters.',
      'A day on Mercury (sunrise to sunrise) takes 176 Earth days!'
    ]
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'planet',
    distanceFromSunAU: 0.72,
    radiusKm: 6051.8,
    diameterKm: 12104,
    massKg: '4.867 × 10²⁴ kg',
    orbitalPeriodDays: 224.7,
    rotationPeriodHours: -5832, // Retrograde 243 days
    gravityMps2: 8.87,
    surfaceTempC: { min: 462, max: 475, avg: 464 },
    moonsCount: 0,
    color: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    overview: 'Earth’s "evil twin", suffering from a runaway greenhouse effect that makes it the hottest planet in our solar system, with lead-melting surface temperatures.',
    atmosphere: ['96.5% Carbon Dioxide', '3.5% Nitrogen', 'Sulfuric Acid clouds'],
    composition: ['Iron-nickel core', 'Rocky silicate mantle', 'Basaltic crust'],
    keyMissions: ['Venera 7 & 13', 'Magellan', 'Akatsuki', 'DAVINCI+ (Upcoming)', 'VERITAS (Upcoming)'],
    funFacts: [
      'Atmospheric pressure on the surface is 92 times Earth’s—equivalent to being 900 meters underwater.',
      'Venus spins backwards (retrograde rotation); the Sun rises in the west and sets in the east.',
      'Its day is longer than its year!'
    ]
  },
  {
    id: 'earth',
    name: 'Earth',
    type: 'planet',
    distanceFromSunAU: 1.0,
    radiusKm: 6371,
    diameterKm: 12742,
    massKg: '5.972 × 10²⁴ kg',
    orbitalPeriodDays: 365.25,
    rotationPeriodHours: 23.93,
    gravityMps2: 9.807,
    surfaceTempC: { min: -89.2, max: 56.7, avg: 15 },
    moonsCount: 1,
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    overview: 'Our home world: the only celestial body known to harbor life, with liquid surface water oceans, plate tectonics, and a protective magnetosphere.',
    atmosphere: ['78.1% Nitrogen', '20.9% Oxygen', '0.9% Argon', '0.04% Carbon Dioxide'],
    composition: ['Solid inner iron core', 'Liquid outer core (dynamo)', 'Viscous mantle', 'Brittle crust'],
    keyMissions: ['Thousands of Earth Observation Satellites (Landsat, Sentinel, GOES)'],
    funFacts: [
      'Earth’s magnetic field shields us from deadly solar wind and cosmic radiation.',
      'Over 71% of the surface is covered in liquid water.',
      'Earth is the densest major planet in the Solar System (5.51 g/cm³).'
    ]
  },
  {
    id: 'moon',
    name: 'The Moon (Luna)',
    type: 'moon',
    distanceFromSunAU: 1.0025,
    radiusKm: 1737.4,
    diameterKm: 3474.8,
    massKg: '7.342 × 10²² kg',
    orbitalPeriodDays: 27.3,
    rotationPeriodHours: 655.7,
    gravityMps2: 1.62,
    surfaceTempC: { min: -130, max: 120, avg: -20 },
    moonsCount: 0,
    color: '#CBD5E1',
    glowColor: 'rgba(203, 213, 225, 0.3)',
    overview: 'Earth’s only natural satellite, formed ~4.5 billion years ago when a Mars-sized protoplanet (Theia) collided with early Earth.',
    atmosphere: ['Ultra-thin exosphere', 'Helium', 'Neon', 'Hydrogen'],
    composition: ['Small metallic core', 'Mantle', 'Anorthosite regolith crust'],
    keyMissions: ['Apollo 11-17', 'Chang\'e series', 'Chandrayaan-3', 'Artemis program'],
    funFacts: [
      'The Moon is tidally locked to Earth, so the same side always faces us.',
      'The Moon causes ocean tides, stabilizing Earth’s axial tilt and climate.',
      'Footprints left by Apollo astronauts will remain for millions of years due to lack of wind.'
    ]
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'planet',
    distanceFromSunAU: 1.52,
    radiusKm: 3389.5,
    diameterKm: 6779,
    massKg: '6.417 × 10²³ kg',
    orbitalPeriodDays: 687,
    rotationPeriodHours: 24.62,
    gravityMps2: 3.72,
    surfaceTempC: { min: -125, max: 20, avg: -63 },
    moonsCount: 2,
    color: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    overview: 'The Red Planet, home to the largest volcano (Olympus Mons) and deepest canyon (Valles Marineris) in the solar system, targeted for human exploration.',
    atmosphere: ['95.3% Carbon Dioxide', '2.6% Nitrogen', '1.9% Argon', '0.16% Oxygen'],
    composition: ['Dense iron-sulfur core', 'Silicate mantle', 'Iron-oxide rich crust'],
    keyMissions: ['Viking 1 & 2', 'Curiosity', 'Perseverance & Ingenuity', 'Hope', 'Tianwen-1'],
    funFacts: [
      'Olympus Mons is 22 km high—nearly three times the height of Mount Everest!',
      'Sunsets on Mars appear blue due to Rayleigh scattering in the dusty thin atmosphere.',
      'Mars has two tiny captured asteroid moons: Phobos and Deimos.'
    ]
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'planet',
    distanceFromSunAU: 5.2,
    radiusKm: 69911,
    diameterKm: 139820,
    massKg: '1.898 × 10²⁷ kg (2.5× all other planets combined)',
    orbitalPeriodDays: 4333,
    rotationPeriodHours: 9.93,
    gravityMps2: 24.79,
    surfaceTempC: { min: -145, max: -110, avg: -110 },
    moonsCount: 95,
    color: '#D97706',
    glowColor: 'rgba(217, 119, 6, 0.4)',
    overview: 'The king of planets, a gas giant featuring the Great Red Spot storm, an immense magnetosphere, and 95 known moons including ocean world Europa.',
    atmosphere: ['89.8% Hydrogen', '10.2% Helium', 'Methane', 'Ammonia'],
    composition: ['Dense core of rock and metallic hydrogen', 'Liquid metallic hydrogen ocean', 'Gaseous molecular envelope'],
    keyMissions: ['Pioneer 10 & 11', 'Voyager 1 & 2', 'Galileo', 'Juno', 'JUICE', 'Europa Clipper'],
    funFacts: [
      'Jupiter rotates faster than any other planet—a day lasts under 10 hours.',
      'The Great Red Spot is an anticyclonic storm larger than Earth that has raged for over 300 years.',
      'Its moon Ganymede is larger than Mercury and is the only moon with its own magnetic field.'
    ]
  },
  {
    id: 'saturn',
    name: 'Saturn',
    type: 'planet',
    distanceFromSunAU: 9.58,
    radiusKm: 58232,
    diameterKm: 116460,
    massKg: '5.683 × 10²⁶ kg',
    orbitalPeriodDays: 10759,
    rotationPeriodHours: 10.7,
    gravityMps2: 10.44,
    surfaceTempC: { min: -178, max: -130, avg: -140 },
    moonsCount: 146,
    color: '#FCD34D',
    glowColor: 'rgba(252, 211, 77, 0.4)',
    overview: 'Famed for its spectacular system of icy rings spanning 282,000 km yet only 10 meters thick on average. Holds the record for most known moons (146).',
    atmosphere: ['96.3% Hydrogen', '3.25% Helium', 'Methane', 'Ammonia'],
    composition: ['Rocky/ice core', 'Liquid metallic hydrogen', 'Molecular hydrogen outer layer'],
    keyMissions: ['Pioneer 11', 'Voyager 1 & 2', 'Cassini-Huygens', 'Dragonfly (Upcoming)'],
    funFacts: [
      'Saturn is the only planet less dense than water (density 0.687 g/cm³)—it would float in a giant bathtub!',
      'The rings are made of billions of chunks of 99% pure water ice, from pebbles to mountain sizes.',
      'Titan has liquid methane/ethane lakes, rivers, and rain with a thick nitrogen atmosphere.'
    ]
  },
  {
    id: 'uranus',
    name: 'Uranus',
    type: 'planet',
    distanceFromSunAU: 19.2,
    radiusKm: 25362,
    diameterKm: 50724,
    massKg: '8.681 × 10²⁵ kg',
    orbitalPeriodDays: 30687,
    rotationPeriodHours: -17.24,
    gravityMps2: 8.69,
    surfaceTempC: { min: -224, max: -195, avg: -216 },
    moonsCount: 28,
    color: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    overview: 'An ice giant that orbits tilted sideways at 98 degrees, resulting in extreme 21-year-long seasons. It has the coldest planetary atmosphere.',
    atmosphere: ['82.5% Hydrogen', '15.2% Helium', '2.3% Methane (gives cyan hue)'],
    composition: ['Rocky core', 'Icy mantle (water, ammonia, methane)', 'Hydrogen-helium envelope'],
    keyMissions: ['Voyager 2 (1986 flyby)'],
    funFacts: [
      'Uranus was the first planet discovered using a telescope (William Herschel in 1781).',
      'Its 98-degree axial tilt means it literally rolls on its orbital side like a bowling ball.',
      'It has 13 faint rings and 28 moons named after characters from Shakespeare and Alexander Pope.'
    ]
  },
  {
    id: 'neptune',
    name: 'Neptune',
    type: 'planet',
    distanceFromSunAU: 30.05,
    radiusKm: 24622,
    diameterKm: 49244,
    massKg: '1.024 × 10²⁶ kg',
    orbitalPeriodDays: 60190,
    rotationPeriodHours: 16.11,
    gravityMps2: 11.15,
    surfaceTempC: { min: -218, max: -200, avg: -214 },
    moonsCount: 16,
    color: '#2563EB',
    glowColor: 'rgba(37, 99, 235, 0.4)',
    overview: 'The most distant major planet, an ice giant with supersonic winds reaching 2,100 km/h—the fastest in the solar system—and the retrograde moon Triton.',
    atmosphere: ['80% Hydrogen', '19% Helium', '1.5% Methane'],
    composition: ['Silicate-iron core', 'Superheated water-ammonia-methane mantle', 'Gaseous atmosphere'],
    keyMissions: ['Voyager 2 (1989 flyby)'],
    funFacts: [
      'Neptune was discovered through mathematical predictions before being seen in a telescope.',
      'Its largest moon, Triton, orbits backward and spews nitrogen geysers from cryogenic ice.',
      'One year on Neptune takes nearly 165 Earth years.'
    ]
  },
  {
    id: 'pluto',
    name: 'Pluto',
    type: 'dwarf',
    distanceFromSunAU: 39.48,
    radiusKm: 1188.3,
    diameterKm: 2376.6,
    massKg: '1.309 × 10²² kg',
    orbitalPeriodDays: 90560,
    rotationPeriodHours: -153.3,
    gravityMps2: 0.62,
    surfaceTempC: { min: -240, max: -218, avg: -229 },
    moonsCount: 5,
    color: '#E2E8F0',
    glowColor: 'rgba(226, 232, 240, 0.3)',
    overview: 'The beloved dwarf planet in the Kuiper Belt with a vast heart-shaped nitrogen glacier (Sputnik Planitia) and 5 moons including double-planet companion Charon.',
    atmosphere: ['Nitrogen', 'Methane', 'Carbon Monoxide (expands at perihelion)'],
    composition: ['70% Rock core', '30% Water ice mantle', 'Nitrogen & methane ice crust'],
    keyMissions: ['New Horizons (2015 flyby)'],
    funFacts: [
      'Pluto and its largest moon, Charon, are mutually tidally locked and orbit a barycenter outside Pluto itself.',
      'Pluto’s orbit is so eccentric that it was closer to the Sun than Neptune from 1979 to 1999.',
      'Sputnik Planitia is an active convective glacier of solid nitrogen ice.'
    ]
  },
  {
    id: 'jwst',
    name: 'James Webb Space Telescope',
    type: 'spacecraft',
    distanceFromSunAU: 1.01,
    radiusKm: 0.01,
    diameterKm: 0.021,
    massKg: '6,161 kg',
    orbitalPeriodDays: 365.25,
    rotationPeriodHours: 0,
    gravityMps2: 0,
    surfaceTempC: { min: -233, max: 85, avg: -223 },
    moonsCount: 0,
    color: '#EAB308',
    glowColor: 'rgba(234, 179, 8, 0.6)',
    overview: 'Humanity’s most powerful space telescope, operating at L2 in deep infrared to gaze back to the first stars and galaxies formed after the Big Bang.',
    atmosphere: ['Deep Space Vacuum'],
    composition: ['18 Gold-coated Beryllium Mirror Segments', '5-Layer Kapton Sunshield', 'MIRI, NIRCam, NIRSpec'],
    keyMissions: ['Flagship Astrophysics Mission (NASA/ESA/CSA)'],
    funFacts: [
      'The sunshield has a tennis-court size and maintains a 300°C difference between hot and cold sides.',
      'The primary mirror is coated in a vaporized gold layer only 100 nanometers thick (about 48 grams total).',
      'It has already detected the earliest galaxies formed just 300 million years after the Big Bang.'
    ]
  },
  {
    id: 'blackhole-sgr-a',
    name: 'Sagittarius A*',
    type: 'blackhole',
    distanceFromSunAU: 1700000000,
    radiusKm: 12000000,
    diameterKm: 24000000,
    massKg: '8.26 × 10³⁶ kg (4.15 million Solar Masses)',
    orbitalPeriodDays: 0,
    rotationPeriodHours: 0.2,
    gravityMps2: 99999999,
    surfaceTempC: { min: -273, max: 100000000, avg: 10000000 },
    moonsCount: 0,
    color: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.8)',
    overview: 'The supermassive black hole anchor at the center of the Milky Way, imaged by the Event Horizon Telescope, warping spacetime into an ultimate gravitational abyss.',
    atmosphere: ['Relativistic Accretion Plasma', 'Magnetic Jet Sheaths'],
    composition: ['Event Horizon', 'Ergosphere', 'Gravitational Singularity'],
    keyMissions: ['Event Horizon Telescope (EHT)', 'Chandra X-ray', 'VLTI Gravity'],
    funFacts: [
      'Its event horizon has a radius of roughly 12 million kilometers—about 17 times the radius of the Sun.',
      'Stars like S2 orbit it at up to 8% the speed of light (25 million km/h).',
      'Time dilation near the horizon causes 1 second for an infalling observer to appear as eternity to an outside observer.'
    ]
  }
];

export const ENCYCLOPEDIA_ARTICLES: EncyclopediaArticle[] = [
  {
    id: 'black-holes-spacetime',
    title: 'Black Holes & The Warp of Spacetime',
    subtitle: 'From Event Horizons to Hawking Radiation and Singularities',
    category: 'astrophysics',
    readingTimeMin: 8,
    difficulty: 'Intermediate',
    summary: 'A complete scientific breakdown of black holes: how collapsed stellar cores rupture spacetime, how the Schwarzschild radius is calculated, and what happens at the boundary of no return.',
    heroImageDesc: 'Simulated gravitational lensing around a spinning Kerr black hole with a glowing accretion disk.',
    stats: [
      { label: 'Milky Way Core BH', value: 'Sagittarius A* (4.15M M☉)' },
      { label: 'Escape Velocity', value: '> 299,792 km/s (Speed of Light)' },
      { label: 'Predicted by', value: 'Einstein (1915), Schwarzschild (1916)' },
      { label: 'First Imaged', value: 'M87* in 2019 by Event Horizon Telescope' }
    ],
    sections: [
      {
        heading: 'What Is a Black Hole?',
        content: 'A black hole is an astronomical object with a gravitational pull so immense that nothing, not even electromagnetic radiation such as light, can escape from within its event horizon. This phenomenon is a direct prediction of Albert Einstein\'s theory of General Relativity, formulated in 1915. When a massive star exhausts its thermonuclear fuel, outward radiation pressure drops, causing the core to collapse catastrophically under its own gravity.'
      },
      {
        heading: 'Anatomy: The Event Horizon and Singularity',
        content: 'Every non-rotating black hole is defined by its Schwarzschild radius ($R_s = \\frac{2GM}{c^2}$). The spherical boundary marking this radius is the Event Horizon: once matter or light crosses it, all forward paths through spacetime point directly toward the center. At the center lies the gravitational singularity, where classical relativity predicts density and spacetime curvature become infinite, requiring a theory of quantum gravity to resolve.'
      },
      {
        heading: 'Hawking Radiation & Black Hole Thermodynamics',
        content: 'In 1974, physicist Stephen Hawking demonstrated that quantum field fluctuations near the event horizon cause black holes to emit thermal radiation, now called Hawking Radiation. Virtual particle-antiparticle pairs constantly pop into existence; when one particle falls past the horizon and the other escapes, the black hole loses an equivalent amount of mass-energy ($E=mc^2$). Over incomprehensibly long timescales ($10^{67}$ to $10^{100}$ years), black holes will eventually evaporate into pure radiation.'
      }
    ],
    timeline: [
      { year: '1783', event: 'John Michell proposes "dark stars" with escape velocities exceeding light.' },
      { year: '1916', event: 'Karl Schwarzschild solves Einstein\'s field equations, discovering the Schwarzschild metric.' },
      { year: '1971', event: 'Cygnus X-1 identified as the first strong observational candidate for a stellar-mass black hole.' },
      { year: '2015', event: 'LIGO detects gravitational waves (GW150914) from two merging black holes 1.3 billion light-years away.' },
      { year: '2019', event: 'Event Horizon Telescope publishes the first direct visual image of black hole shadow in galaxy M87.' }
    ],
    trivia: [
      'If Earth were crushed into a black hole, its event horizon would be the size of a marble (about 18 millimeters across).',
      'Time runs significantly slower near a black hole due to gravitational time dilation—an effect called spaghettification stretches infalling matter into noodle-like strings.'
    ],
    relatedArticleIds: ['quantum-entanglement', 'general-relativity', 'supernovae-neutron-stars'],
    interactiveToolRef: 'gravity'
  },
  {
    id: 'quantum-entanglement',
    title: 'Quantum Entanglement & The Non-Local Universe',
    subtitle: 'Spooky Action at a Distance, Bell\'s Theorem, and Quantum Teleportation',
    category: 'quantum_physics',
    readingTimeMin: 7,
    difficulty: 'Advanced',
    summary: 'Explore the quantum mechanical phenomenon where entangled particles share instantaneous correlation regardless of distance, challenging classical concepts of locality and realism.',
    heroImageDesc: 'Two entangled photons diverging across cosmological space with linked wavefunctions.',
    stats: [
      { label: 'Speed of Correlation', value: 'Instantaneous (No signal travels)' },
      { label: 'EPR Paradox Year', value: '1935' },
      { label: 'Nobel Prize in Physics', value: '2022 (Aspect, Clauser, Zeilinger)' },
      { label: 'Key Application', value: 'Quantum Cryptography (QKD) & Quantum Computing' }
    ],
    sections: [
      {
        heading: 'The Spooky Riddle of Einstein, Podolsky, and Rosen',
        content: 'In 1935, Albert Einstein, Boris Podolsky, and Nathan Rosen published the EPR paradox, arguing that quantum mechanics was incomplete because it seemed to predict "spooky action at a distance" (spukhafte Fernwirkung). According to standard quantum formalism, measuring the state of one entangled particle instantly determines the state of its partner, even if they are light-years apart.'
      },
      {
        heading: 'Bell’s Theorem and Experimental Proof',
        content: 'In 1964, Northern Irish physicist John Stewart Bell showed mathematically that if local hidden variables governed reality (meaning particles had predetermined properties all along), certain statistical inequalities must hold. Groundbreaking experiments by Alain Aspect (1982) and later loophole-free tests definitively violated Bell\'s inequalities, proving that nature is fundamentally non-local or non-realist.'
      },
      {
        heading: 'Why This Doesn\'t Violate Faster-Than-Light Communication',
        content: 'Crucially, quantum entanglement cannot be used to transmit classical information faster than light (the No-Communication Theorem). Because the outcome of an individual measurement is completely random, an observer at one end only sees pure noise unless they compare their results with the other end via a conventional, sub-light communication channel.'
      }
    ],
    timeline: [
      { year: '1935', event: 'EPR Paradox paper published in Physical Review.' },
      { year: '1964', event: 'John Bell derives Bell\'s Inequalities, turning philosophy into testable physics.' },
      { year: '1993', event: 'Bennett et al. publish theoretical framework for Quantum Teleportation.' },
      { year: '2017', event: 'Micius satellite establishes space-to-ground quantum entanglement over 1,200 km.' },
      { year: '2022', event: 'Nobel Prize in Physics awarded for experimental verification of quantum entanglement.' }
    ],
    trivia: [
      'Entanglement is the core engine behind quantum computers, enabling qubits to explore exponential state spaces ($2^N$).',
      'Chinese satellite Micius demonstrated satellite-based quantum key distribution, ensuring unbreakable quantum encryption.'
    ],
    relatedArticleIds: ['black-holes-spacetime', 'cosmic-origins-big-bang'],
    interactiveToolRef: 'scale'
  },
  {
    id: 'solar-system-formation',
    title: 'Birth & Architecture of the Solar System',
    subtitle: 'From the Solar Nebula to Planetary Migration and the Kuiper Belt',
    category: 'solar_system',
    readingTimeMin: 6,
    difficulty: 'Beginner',
    summary: 'A journey through 4.6 billion years of planetary evolution: how an interstellar gas cloud collapsed into the Sun, terrestrial rocky worlds, and majestic gas giants.',
    heroImageDesc: 'Protoplanetary disk around a young proto-sun with protoplanets clearing gaps in dust rings.',
    stats: [
      { label: 'Age of Solar System', value: '4.568 Billion Years' },
      { label: 'Total Mass', value: '~1.0014 Solar Masses' },
      { label: 'Known Planets', value: '8 Major Planets, 5 Dwarf Planets' },
      { label: 'Known Moons', value: '290+ Orbiting Planets' }
    ],
    sections: [
      {
        heading: 'The Solar Nebula Hypothesis',
        content: 'Approximately 4.6 billion years ago, a shockwave from a nearby supernova likely triggered the gravitational collapse of a giant molecular cloud of hydrogen and helium. As the cloud shrank, conservation of angular momentum caused it to spin faster and flatten into a protoplanetary disk. The central bulge grew hotter and denser until thermonuclear fusion ignited in the nascent Sun.'
      },
      {
        heading: 'The Frost Line & Planetary Differentiation',
        content: 'The solar system is sharply divided by the "frost line" (or ice line), located about 2.7 AU from the Sun between Mars and Jupiter. Inside the frost line, solar heat prevented water, ammonia, and methane from condensing into ice; only metals and silicates could solidify, forming the small, dense rocky planets (Mercury, Venus, Earth, Mars). Beyond the frost line, abundant volatile ices allowed planetary embryos to grow huge and capture massive gaseous envelopes, yielding Jupiter, Saturn, Uranus, and Neptune.'
      },
      {
        heading: 'The Nice Model & Late Heavy Bombardment',
        content: 'Modern astrophysics shows planets did not form where they are today. The Nice model demonstrates that gravitational interactions with the primordial planetesimal disk caused Jupiter to migrate slightly inward while Saturn, Uranus, and Neptune migrated outward, destabilizing the asteroid and Kuiper belts and triggering an intense period of cratering ~3.9 billion years ago.'
      }
    ],
    timeline: [
      { year: '4.57 Ga', event: 'Collapse of parent molecular cloud and ignition of proto-Sun.' },
      { year: '4.54 Ga', event: 'Accretion of Earth and Mars-sized impact forming the Moon.' },
      { year: '3.9 Ga', event: 'Late Heavy Bombardment craters inner solar system.' },
      { year: '1610 CE', event: 'Galileo discovers moons of Jupiter, disproving geocentrism.' }
    ],
    trivia: [
      'Over 99.86% of all mass in the entire solar system is concentrated inside the Sun.',
      'The Oort Cloud, a spherical shell of icy comets surrounding the solar system, extends nearly 100,000 AU (almost halfway to the nearest star).'
    ],
    relatedArticleIds: ['exoplanets-life-search', 'supernovae-neutron-stars'],
    interactiveToolRef: 'solarsystem'
  },
  {
    id: 'james-webb-telescope',
    title: 'James Webb Space Telescope: Unveiling the Cosmic Dawn',
    subtitle: 'The Engineering Marvel at Lagrange Point 2',
    category: 'spaceflight',
    readingTimeMin: 6,
    difficulty: 'Intermediate',
    summary: 'How NASA, ESA, and CSA engineered a 6.5-meter folding beryllium space observatory to operate at -233°C, capturing the earliest light emitted in the universe.',
    heroImageDesc: 'JWST with gold hexagonal mirror segments and multi-layer silver-pink sunshield floating at L2.',
    stats: [
      { label: 'Primary Mirror Diameter', value: '6.5 meters (21.3 ft)' },
      { label: 'Operating Location', value: 'Sun-Earth L2 (1.5M km from Earth)' },
      { label: 'Cold-side Temperature', value: '7 Kelvin (-266°C) for MIRI' },
      { label: 'Launch Date', value: 'December 25, 2021 (Ariane 5)' }
    ],
    sections: [
      {
        heading: 'Why Infrared Astronomy Is Essential',
        content: 'Because the universe has been expanding for 13.8 billion years, light emitted by the very first stars and galaxies has undergone cosmological redshift: ultraviolet and visible photons have stretched into the near- and mid-infrared spectrum. To see these primordial objects and peer through dense interstellar dust clouds where new stars and planetary systems are born, JWST was built specifically for infrared sensitivity.'
      },
      {
        heading: 'The Engineering Triumph of L2 and the Sunshield',
        content: 'To prevent heat from Earth, the Sun, and the Moon from blinding its ultra-sensitive detectors, JWST was placed in halo orbit around the Second Lagrange Point (L2). It is shaded by a 5-layer tennis-court-sized sunshield made of Kapton coated with aluminum and doped silicon. This maintains a temperature gradient of more than 300°C across a gap of just a few inches!'
      },
      {
        heading: 'Groundbreaking Discoveries',
        content: 'Since beginning science operations in July 2022, JWST has identified galaxies such as JADES-GS-z14-0 dating to just 290 million years after the Big Bang, discovered carbon dioxide and sulfur dioxide in exoplanet atmospheres (WASP-39b), and imaged the deep pillars of star formation in unprecedented crystalline detail.'
      }
    ],
    timeline: [
      { year: '1996', event: 'Next Generation Space Telescope study initiated.' },
      { year: '2021', event: 'Flawless launch aboard Ariane 5 rocket on Christmas Day.' },
      { year: 'Jan 2022', event: 'Arrival and orbital insertion at Sun-Earth L2.' },
      { year: 'July 2022', event: 'President Biden reveals JWST\'s First Deep Field (SMACS 0723).' }
    ],
    trivia: [
      'The primary mirror consists of 18 hexagonal segments made of beryllium, a light metal that holds its shape at cryogenic temperatures, coated with 48 grams of pure vaporized gold.',
      'JWST had 344 single-point failures during its automated unfurling sequence—every single mechanism worked with 100% precision.'
    ],
    relatedArticleIds: ['black-holes-spacetime', 'cosmic-origins-big-bang', 'exoplanets-life-search'],
    interactiveToolRef: 'scale'
  },
  {
    id: 'cosmic-origins-big-bang',
    title: 'The Big Bang & The Cosmic Microwave Background',
    subtitle: 'From Planck Epoch and Inflation to Cosmic Web and Dark Energy',
    category: 'cosmology',
    readingTimeMin: 9,
    difficulty: 'Advanced',
    summary: 'The standard model of cosmology (ΛCDM): how our universe expanded from an infinitesimally hot, dense point 13.787 billion years ago into galaxies, clusters, and accelerated cosmic expansion.',
    heroImageDesc: 'Cosmic timeline showing quantum fluctuations, cosmic inflation, CMB afterglow, dark ages, first stars, and accelerated expansion.',
    stats: [
      { label: 'Age of the Universe', value: '13.787 ± 0.020 Billion Years' },
      { label: 'CMB Temperature', value: '2.7255 Kelvin' },
      { label: 'Cosmic Composition', value: '68.3% Dark Energy, 26.8% Dark Matter, 4.9% Ordinary Matter' },
      { label: 'Expansion Rate (H₀)', value: '~67.4 to 73 km/s/Mpc (Hubble Tension)' }
    ],
    sections: [
      {
        heading: 'The Cosmic Singularity and Inflation',
        content: 'The Big Bang was not an explosion in space, but rather the rapid expansion of space itself. At $10^{-36}$ seconds after $t=0$, the universe underwent exponential Cosmic Inflation, expanding by a factor of at least $10^{26}$ within a fraction of a second. This smooths out spatial curvature and explains why opposite sides of the observable universe are at nearly identical temperatures (the horizon problem).'
      },
      {
        heading: 'Recombination and the Oldest Light',
        content: 'For the first 380,000 years, the universe was a blinding, opaque plasma of ionized protons and free electrons. As space expanded and cooled to ~3,000 Kelvin, electrons bound with protons to form neutral hydrogen atoms—an event called Recombination. Suddenly, photons could travel freely across the universe. Today, that relic light has stretched with the expansion of the cosmos into microwaves: the Cosmic Microwave Background (CMB).'
      },
      {
        heading: 'The Dark Universe: Dark Matter & Dark Energy',
        content: 'Everything humans have ever observed—stars, planets, nebulae, gas clouds, and our own bodies—accounts for barely 4.9% of the universe’s total mass-energy density. Approximately 26.8% is Cold Dark Matter, an invisible non-baryonic substance that provides the gravitational scaffolding for galaxies. The remaining 68.3% is Dark Energy, a mysterious cosmological pressure causing the expansion rate of the universe to accelerate.'
      }
    ],
    timeline: [
      { year: '1927', event: 'Georges Lemaître proposes the expanding universe hypothesis.' },
      { year: '1929', event: 'Edwin Hubble discovers galactic redshift correlates with distance.' },
      { year: '1965', event: 'Penzias and Wilson accidentally detect the CMB with Bell Labs horn antenna.' },
      { year: '1998', event: 'Supernova observations reveal universe\'s expansion is accelerating.' },
      { year: '2015', event: 'ESA Planck spacecraft releases definitive precision map of the CMB.' }
    ],
    trivia: [
      'A small fraction of static "snow" on old analog television sets was caused by real photons from the Big Bang hitting the antenna.',
      'The Observable Universe has a current comoving diameter of approximately 93 billion light-years.'
    ],
    relatedArticleIds: ['quantum-entanglement', 'black-holes-spacetime'],
    interactiveToolRef: 'scale'
  },
  {
    id: 'stellar-nucleosynthesis-fusion',
    title: 'Stellar Nucleosynthesis & The Cosmic Forge',
    subtitle: 'How Stars Cooked the Periodic Table from Hydrogen to Uranium',
    category: 'astrophysics',
    readingTimeMin: 7,
    difficulty: 'Intermediate',
    summary: 'The astrophysics of nuclear fusion: proton-proton chains, the CNO cycle, the triple-alpha process, iron peak instability, and explosive neutron capture in supernovae.',
    heroImageDesc: 'Layered cross-section of a dying supergiant star showing onion-skin fusion shells down to the iron core.',
    stats: [
      { label: 'Sun\'s Fusion Rate', value: '600 Million Tons H/sec' },
      { label: 'Iron Peak', value: 'Fe-56 has highest nuclear binding energy/nucleon' },
      { label: 'Origin of Gold & Platinum', value: 'Neutron Star Mergers (r-process)' },
      { label: 'Carl Sagan Quote', value: '"We are made of starstuff."' }
    ],
    sections: [
      {
        heading: 'Hydrogen to Helium: Powering the Main Sequence',
        content: 'In low-mass stars like our Sun, hydrogen nuclei (protons) overcome mutual electrostatic repulsion at core temperatures of 15 million Kelvin through quantum tunneling. Via the proton-proton chain reaction, four protons fuse into one helium-4 nucleus, converting 0.7% of their rest mass directly into radiant energy ($E=mc^2$).'
      },
      {
        heading: 'The Onion-Skin Evolution of Supergiants',
        content: 'When massive stars (greater than 8 solar masses) exhaust core hydrogen, gravitational contraction heats the core to 100 million Kelvin, igniting helium fusion (the triple-alpha process) into carbon and oxygen. Higher temperatures sequentially ignite carbon, neon, oxygen, and silicon burning shells, creating a layered "onion-skin" structure.'
      },
      {
        heading: 'The Iron Catastrophe and Supernovae',
        content: 'Once the core forms Iron-56, fusion becomes an endothermic reaction: fusing iron absorbs energy rather than releasing it, because iron-56 possesses the maximum nuclear binding energy per nucleon. In less than a second, radiation pressure collapses, the core implodes into a neutron star or black hole, and the rebounding shockwave triggers a Type II supernova, blasting heavy elements across the galaxy.'
      }
    ],
    timeline: [
      { year: '1920', event: 'Arthur Eddington proposes nuclear fusion powers the Sun.' },
      { year: '1957', event: 'Burbidge, Burbidge, Fowler, and Hoyle publish landmark B²FH paper on stellar nucleosynthesis.' },
      { year: '1987', event: 'Supernova 1987A observed in Large Magellanic Cloud, confirming neutrino burst theories.' },
      { year: '2017', event: 'GW170817 kilonova detection directly confirms neutron star mergers synthesize gold and platinum.' }
    ],
    trivia: [
      'The gold in your wedding ring or jewelry was forged in the violent collision of two dead neutron stars billions of years ago.',
      'Every atom of oxygen you breathe was produced in the core of a massive star that exploded before the solar system formed.'
    ],
    relatedArticleIds: ['solar-system-formation', 'black-holes-spacetime'],
    interactiveToolRef: 'fusion'
  },
  {
    id: 'multiverse-string-landscape',
    title: 'The Multiverse & String Theory: Parallel Realities & Higher Dimensions',
    subtitle: 'Brane Worlds, Quantum Many-Worlds, and the 10⁵⁰⁰ Cosmic Landscape',
    category: 'theoretical',
    readingTimeMin: 10,
    difficulty: 'Advanced',
    summary: 'A definitive expedition into modern multiverse physics: from eternal cosmic inflation and quantum Many-Worlds to Calabi-Yau dimensional compactification and the cosmic landscape.',
    heroImageDesc: 'Higher-dimensional Calabi-Yau manifold floating amidst shimmering bubble universes.',
    author: 'Dr. Leonard Susskind & UBT Theoretical Consortium',
    coverGradient: 'from-purple-900 via-indigo-950 to-black',
    stats: [
      { label: 'String Landscape Vacua', value: '~10⁵⁰⁰ Possible Universes' },
      { label: 'Spatial Dimensions', value: '10 (Superstrings) or 11 (M-Theory)' },
      { label: 'Key Hypotheses', value: 'Bubble/Inflationary, Quantum Many-Worlds, Brane Worlds' },
      { label: 'Cosmological Constant', value: 'Λ ≈ 10⁻¹²² in Planck units (Fine-Tuning)' }
    ],
    sections: [
      {
        heading: 'Level I & Level II: Bubble Universes and Eternal Inflation',
        content: 'In standard cosmological inflation theory developed by Alan Guth and Andrei Linde, inflation does not stop everywhere at once. Quantum fluctuations cause certain regions of spacetime to cease inflating and form "pocket" or "bubble" universes—of which our observable universe is just one—while the surrounding space continues expanding exponentially forever. Each bubble universe can possess radically different broken symmetries, fundamental particle masses, and cosmological constants.'
      },
      {
        heading: 'The Quantum Multiverse: Hugh Everett\'s Many-Worlds',
        content: 'Formulated in 1957 by physicist Hugh Everett III, the Many-Worlds Interpretation (MWI) posits that wavefunctions never collapse during quantum measurement. Instead, every time a quantum superposition decoheres, the universe effectively branches into mutually unobservable parallel timelines. In this framework, every physically allowable outcome of a quantum experiment occurs in its own branch of reality.'
      },
      {
        heading: 'String Theory, Brane Worlds, and the 10⁵⁰⁰ Landscape',
        content: 'In Superstring and M-Theory, the universe requires 10 or 11 dimensions. The extra 6 or 7 spatial dimensions are tightly compactified on complex geometric structures called Calabi-Yau manifolds. Because there are an estimated 10⁵⁰⁰ distinct ways to curl up these extra dimensions, each configuration yields a unique vacuum state with different physical laws, forces, and constants, known as the String Theory Landscape.'
      }
    ],
    timeline: [
      { year: '1957', event: 'Hugh Everett III submits PhD thesis introducing the Many-Worlds formulation.' },
      { year: '1983', event: 'Andrei Linde and Alexander Vilenkin propose chaotic eternal inflation theory.' },
      { year: '1995', event: 'Edward Witten announces M-Theory, uniting five separate string theories in 11D.' },
      { year: '2003', event: 'Susskind, Bousso, and Polchinski formalize the String Theory Landscape concept.' }
    ],
    trivia: [
      'If eternal inflation is correct, there are infinitely many Hubble volumes, meaning an identical copy of you exists approximately 10^(10^115) meters away.',
      'In Ekpyrotic / Brane-world models, the Big Bang is not a unique singularity, but the cyclic collision of two 3-dimensional branes through higher-dimensional bulk space.'
    ],
    relatedArticleIds: ['quantum-entanglement', 'cosmic-origins-big-bang', 'white-holes-wormholes-bridges'],
    interactiveToolRef: 'sandbox3d'
  },
  {
    id: 'white-holes-wormholes-bridges',
    title: 'White Holes, Wormholes & Einstein-Rosen Bridges',
    subtitle: 'Time-Reversed Singularities, Negative Energy & Geometric Shortcuts',
    category: 'astrophysics',
    readingTimeMin: 8,
    difficulty: 'Advanced',
    summary: 'The geometry of maximally extended Schwarzschild spacetime: why General Relativity mathematically demands white holes, how Einstein-Rosen bridges work, and the physics of traversable wormholes.',
    heroImageDesc: 'Two swirling spacetime funnels connected by a luminous throat warping background starlight.',
    author: 'UBT Relativistic Physics Laboratory',
    coverGradient: 'from-cyan-900 via-blue-950 to-black',
    stats: [
      { label: 'White Hole Gravity', value: 'Repulsive at event horizon (Time-Reversed)' },
      { label: 'Bridge Equation', value: 'Einstein-Rosen Metric (1935)' },
      { label: 'Throat Stability Requirement', value: 'Negative Energy Density (Exotic Matter)' },
      { label: 'Quantum Link', value: 'ER = EPR Conjecture (Maldacena & Susskind)' }
    ],
    sections: [
      {
        heading: 'The Time-Reversal of Black Holes: What Is a White Hole?',
        content: 'In general relativity, the Einstein field equations are completely time-symmetric ($t \\to -t$). Just as a black hole possesses an event horizon that matter can only enter and never leave, the full mathematical solution of the Schwarzschild geometry reveals a mirror region called a White Hole: a singularity that continuously expels energy, photons, and matter outward, but which nothing from the exterior universe can ever enter.'
      },
      {
        heading: 'Einstein-Rosen Bridges and the Wormhole Throat',
        content: 'In 1935, Albert Einstein and Nathan Rosen realized that black hole and white hole solutions can be geometrically joined across a shared coordinate throat, forming what is now called an Einstein-Rosen Bridge (wormhole). However, in classical vacuum relativity, the throat pinches shut so quickly that not even a beam of light can traverse from one side to the other before being crushed in the singularity.'
      },
      {
        heading: 'Traversable Wormholes and the Casimir Effect',
        content: 'In 1988, Kip Thorne and Michael Morris proved that a wormhole can be held permanently open if its throat is threaded with "exotic matter" exhibiting negative energy density ($T_{\\mu\\nu} u^\\mu u^\\nu < 0$). In quantum field theory, negative energy is physically verified via the Casimir Effect, where quantum vacuum fluctuations between two uncharged conducting plates create an attractive sub-vacuum pressure.'
      }
    ],
    timeline: [
      { year: '1916', event: 'Ludwig Flamm discovers wormhole geometry inside Schwarzschild solution.' },
      { year: '1935', event: 'Einstein and Rosen formulate the mathematical bridge to eliminate point singularities.' },
      { year: '1964', event: 'Igor Novikov proposes white holes as potential cosmological energy sources.' },
      { year: '1988', event: 'Morris, Thorne, and Yurtsever publish the physics of traversable wormholes.' },
      { year: '2013', event: 'Juan Maldacena and Leonard Susskind propose ER = EPR (wormholes are quantum entanglement).' }
    ],
    trivia: [
      'Some loop quantum gravity theorists suggest that when a black hole evaporates to the Planck scale, quantum bounce physics converts it into an explosive white hole.',
      'The ER = EPR conjecture asserts that whenever two quantum particles are entangled, they are connected through a microscopic Planckian wormhole.'
    ],
    relatedArticleIds: ['black-holes-spacetime', 'quantum-entanglement', 'multiverse-string-landscape'],
    interactiveToolRef: 'gravity'
  },
  {
    id: 'fermi-paradox-great-filter',
    title: 'The Fermi Paradox & The Great Filter: The Great Cosmic Silence',
    subtitle: 'Where Is Everybody? Kardashev Scales, Dyson Spheres & Extinction Thresholds',
    category: 'cosmology',
    readingTimeMin: 9,
    difficulty: 'Intermediate',
    summary: 'Why has humanity detected no extraterrestrial civilizations across 100 billion galaxies? An exhaustive audit of the Fermi Paradox, the Drake Equation, and the chilling Great Filter hypothesis.',
    heroImageDesc: 'A colossal stellar Dyson swarm collecting light from a yellow star against the deep galactic dark.',
    author: 'Prof. Robin Hanson & UBT Astrobiology Division',
    coverGradient: 'from-amber-950 via-gray-900 to-black',
    stats: [
      { label: 'Milky Way Stars', value: '100 - 400 Billion' },
      { label: 'Habitable Zone Earth-like Worlds', value: '~40 Billion in our galaxy alone' },
      { label: 'Enrico Fermi\'s Query', value: '"Where is everybody?" (Los Alamos, 1950)' },
      { label: 'Kardashev Scale', value: 'Type I (Planetary), Type II (Stellar), Type III (Galactic)' }
    ],
    sections: [
      {
        heading: 'The Astounding Numbers of the Drake Equation',
        content: 'Our galaxy is roughly 13.6 billion years old, while Earth is only 4.5 billion years old. Even at modest sub-light speeds (0.01c), self-replicating von Neumann probes could explore and colonize the entire Milky Way in less than 50 million years—a mere blink in cosmic time. Given that tens of billions of Earth-sized planets orbit in habitable zones, our galaxy should already be teeming with visible stellar engineering. Yet our sky remains eerily quiet.'
      },
      {
        heading: 'The Great Filter: Is Our Past or Future the Death Sentence?',
        content: 'Formulated by economist Robin Hanson in 1996, the Great Filter hypothesis argues that somewhere along the path from prebiotic chemistry to an interstellar civilization lies an evolutionary barrier almost impossible to cross. If the Filter is behind us (e.g., abiogenesis or the eukaryotic transition is astronomically rare), humanity is among the extraordinarily lucky firstborn species of the cosmos. If the Filter is in our future (e.g., nuclear war, runaway artificial intelligence, or engineered bioweapons), doom awaits all technological species.'
      },
      {
        heading: 'Technosignatures and the Search for Dyson Spheres',
        content: 'Astronomers utilize infrared telescopes like WISE and JWST to search for waste-heat signatures from Kardashev Type II civilizations constructing Dyson Spheres—megastructures that enclose a star to harvest its full luminosity ($~3.8 \\times 10^{26}$ Watts). Projects like SETI and the Breakthrough Listen initiative continue scanning millions of radio frequencies and laser wavelengths for non-natural signals.'
      }
    ],
    timeline: [
      { year: '1950', event: 'Enrico Fermi poses his paradox during a walk at Los Alamos National Laboratory.' },
      { year: '1961', event: 'Frank Drake writes the Drake Equation at the Green Bank Observatory.' },
      { year: '1964', event: 'Nikolai Kardashev proposes his energy consumption civilization scale.' },
      { year: '1996', event: 'Robin Hanson formalizes the Great Filter hypothesis.' },
      { year: '2015', event: 'Yuri Milner and Stephen Hawking launch $100M Breakthrough Listen project.' }
    ],
    trivia: [
      'Humanity currently registers as a Type 0.73 civilization on the Kardashev scale, deriving most energy from dead fossil biomass rather than direct planetary/stellar capture.',
      'The "Dark Forest" hypothesis suggests advanced civilizations deliberately maintain radio silence to prevent preemptive destruction by rival species.'
    ],
    relatedArticleIds: ['ocean-worlds-astrobiology', 'exoplanets-life-search', 'multiverse-string-landscape'],
    interactiveToolRef: 'exoplanet'
  },
  {
    id: 'ocean-worlds-astrobiology',
    title: 'Ocean Worlds of the Solar System & The Search for Alien Life',
    subtitle: 'Europa, Enceladus, Titan & Hydrothermal Vent Chemosynthesis',
    category: 'astrobiology',
    readingTimeMin: 8,
    difficulty: 'Intermediate',
    summary: 'Deep beneath the cryogenic ice sheets of Jupiter and Saturn’s moons lie warm global liquid saltwater oceans with more water than all of Earth combined, fueled by tidal heating and geothermal vents.',
    heroImageDesc: 'Geysers of vaporized water and organic compounds erupting from tiger stripe fractures on Enceladus.',
    author: 'NASA Europa Clipper Science Team & UBT Planetary Archive',
    coverGradient: 'from-teal-950 via-blue-950 to-black',
    stats: [
      { label: 'Europa Ocean Volume', value: '2× to 3× all Earth\'s oceans combined' },
      { label: 'Enceladus Plumes', value: '400 km/h ice geysers with salts, methane & silica' },
      { label: 'Titan Surface Liquids', value: 'Liquid Methane/Ethane Lakes (Kraken Mare)' },
      { label: 'Primary Energy Source', value: 'Tidal Flexing & Hydrothermal Serpentinization' }
    ],
    sections: [
      {
        heading: 'Tidal Heating: Melting Oceans in the Cryogenic Deep',
        content: 'At distances of 5 to 10 AU from the Sun, surface temperatures hover near -180°C. Yet Europa and Enceladus maintain vast liquid water oceans due to gravitational tidal resonance. As Europa orbits giant Jupiter in orbital resonance with Io and Ganymede, Jupiter\'s immense gravity constantly squeezes and stretches the moon\'s rocky core, generating continuous frictional geothermal heat.'
      },
      {
        heading: 'Enceladus: A Habitable Cocktail Confirmed by Cassini',
        content: 'In 2005, NASA\'s Cassini spacecraft discovered towering cryogenic geysers erupting from the "tiger stripe" fractures at Enceladus\'s south pole. Direct fly-through mass spectrometry detected water vapor, molecular hydrogen ($H_2$), simple and complex organic macromolecules, methane, and silica nanoparticles—definitive proof of alkaline hydrothermal vents operating on a warm ocean floor, strikingly analogous to Earth\'s Lost City hydrothermal field where life likely began.'
      },
      {
        heading: 'Titan: Prebiotic Chemistry and Methane Seas',
        content: 'Saturn\'s giant moon Titan possesses a dense nitrogen atmosphere (1.5 bar) and a complete hydrological cycle based not on water, but on liquid hydrocarbons (methane and ethane). With vast polar seas like Kraken Mare and clouds raining liquid gas, Titan represents an active planetary laboratory for prebiotic organic chemistry and potential alternative non-water biochemistry.'
      }
    ],
    timeline: [
      { year: '1610', event: 'Galileo Galilei discovers Europa as one of the four Galilean satellites.' },
      { year: '1995', event: 'Galileo spacecraft detects induced magnetic fields proving Europa\'s subsurface liquid ocean.' },
      { year: '2005', event: 'Cassini discovers and flies through the south polar geysers of Enceladus.' },
      { year: '2024', event: 'NASA launches Europa Clipper on a 6-year voyage to survey habitability.' },
      { year: '2028', event: 'NASA scheduled launch of Dragonfly rotorcraft lander to Titan.' }
    ],
    trivia: [
      'Europa\'s ice shell is estimated to be 15 to 25 kilometers thick, shielding its ocean from deadly Jovian radiation belts.',
      'On Titan, gravity is low enough and the atmosphere thick enough that a human equipped with artificial wings strapped to their arms could easily fly.'
    ],
    relatedArticleIds: ['solar-system-formation', 'fermi-paradox-great-filter'],
    interactiveToolRef: 'solarsystem'
  },
  {
    id: 'neutron-stars-magnetars-pulsars',
    title: 'Neutron Stars, Magnetars & Degenerate Matter',
    subtitle: 'Nuclear Pasta, Billion-Tesla Magnetic Fields, and Starquakes',
    category: 'astrophysics',
    readingTimeMin: 7,
    difficulty: 'Intermediate',
    summary: 'The physics of the most extreme non-singular matter in the cosmos: where protons and electrons are crushed into pure neutron degenerate matter, generating magnetic fields strong enough to dissolve atoms.',
    heroImageDesc: 'Rapidly rotating pulsar with glowing magnetic funnel and blue synchrotron radiation beams.',
    author: 'UBT High-Energy Astrophysics Division',
    coverGradient: 'from-blue-900 via-indigo-950 to-black',
    stats: [
      { label: 'Density', value: '10¹⁴ g/cm³ (1 teaspoon = 1 billion tons)' },
      { label: 'Radius', value: '~10 - 12 km (City-sized sphere)' },
      { label: 'Magnetar Field Strength', value: '10¹¹ Tesla (10¹⁵ Gauss)' },
      { label: 'Fastest Pulsar Spin', value: 'PSR J1748-2446ad (716 rotations/sec)' }
    ],
    sections: [
      {
        heading: 'Neutron Degeneracy Pressure & The TOV Limit',
        content: 'When a massive star collapses, gravitational pressure overcomes electron degeneracy pressure, forcing electrons into atomic nuclei ($p + e^- \\to n + \\nu_e$). The entire core collapses until quantum mechanics halts the collapse via neutron degeneracy pressure (the Pauli exclusion principle). The resulting sphere packs 1.4 to 2.1 solar masses into a city-sized radius of just 12 kilometers. If the core exceeds the Tolman-Oppenheimer-Volkoff (TOV) limit (~2.2 solar masses), it collapses into a black hole.'
      },
      {
        heading: 'Nuclear Pasta in the Crust',
        content: 'Deep within the crust of a neutron star, at densities of $10^{13} \\text{ g/cm}^3$, the competition between short-range strong nuclear attraction and Coulomb electrostatic repulsion forces atomic nuclei into bizarre geometric phases termed "nuclear pasta": gnocchi (spheres), spaghetti (rods), lasagna (flat sheets), and antineutrino bubbles. Calculations show nuclear pasta is the strongest material known in the universe, with a breaking strain 10 billion times that of steel.'
      },
      {
        heading: 'Magnetars and Galactic Starquakes',
        content: 'A magnetar is a neutron star with magnetic fields up to $10^{15}$ Gauss—a quadrillion times stronger than Earth\'s field. At this intensity, the magnetic field energy exceeds electron rest mass, distorting electron orbitals into needle-thin cylinders and causing quantum electrodynamic vacuum birefringence. When magnetic stress fractures the crust, a "starquake" releases colossal gamma-ray flares that can ionize Earth\'s upper atmosphere from 50,000 light-years away (SGR 1806-20).'
      }
    ],
    timeline: [
      { year: '1934', event: 'Walter Baade and Fritz Zwicky predict neutron stars shortly after neutron discovery.' },
      { year: '1967', event: 'Jocelyn Bell Burnell discovers the first radio pulsar (CP 1919).' },
      { year: '1992', event: 'Robert Duncan and Christopher Thompson formalize magnetar theory.' },
      { year: '2004', event: 'Giant magnetar flare SGR 1806-20 detected from across the Milky Way.' }
    ],
    trivia: [
      'If you came within 1,000 kilometers of a magnetar, its magnetic field gradient would instantly rip the electrons from your body\'s atoms, dissolving all molecular bonds.',
      'Surface gravity on a neutron star is 200 billion times Earth\'s: dropping an object from 1 meter height causes it to impact at 7.2 million km/h.'
    ],
    relatedArticleIds: ['black-holes-spacetime', 'stellar-nucleosynthesis-fusion'],
    interactiveToolRef: 'gravity'
  },
  {
    id: 'fate-of-universe-cosmic-destiny',
    title: 'The Ultimate Cosmic Destiny: Heat Death, Big Rip, or Vacuum Decay',
    subtitle: 'Thermodynamics on the Googol Scale: From Stellar Extinction to Iron Stars',
    category: 'cosmology',
    readingTimeMin: 9,
    difficulty: 'Advanced',
    summary: 'How will the universe end? A chronological autopsy of the cosmos from the Stelliferous Era through black hole evaporation, proton decay, and the ultimate thermodynamic heat death.',
    heroImageDesc: 'An isolated dying black hole evaporating in an infinite void of cold Hawking radiation.',
    author: 'Prof. Fred Adams & UBT Deep Time Consortium',
    coverGradient: 'from-rose-950 via-purple-950 to-black',
    stats: [
      { label: 'Current Era', value: 'Stelliferous Era (~10¹⁰ to 10¹⁴ years)' },
      { label: 'Last Star Burns Out', value: '100 Trillion Years (Red Dwarf exhaustion)' },
      { label: 'Black Hole Era', value: '10⁴⁰ to 10¹⁰⁰ Years' },
      { label: 'Dark Energy Driver', value: 'Accelerated expansion toward absolute zero' }
    ],
    sections: [
      {
        heading: 'The Stelliferous to Degenerate Era (10¹⁴ to 10³⁹ Years)',
        content: 'In 100 trillion years, interstellar gas will be exhausted and the last red dwarf stars will burn through their hydrogen. The cosmos enters the Degenerate Era, populated only by cooling white dwarfs, neutron stars, brown dwarfs, and black holes. If grand unified theories are correct, protons will decay with a half-life of $\\sim 10^{34}$ to $10^{36}$ years, slowly causing all ordinary atomic matter to dissolve into positrons and photons.'
      },
      {
        heading: 'The Black Hole Era & Hawking Evaporation (10⁴⁰ to 10¹⁰⁰ Years)',
        content: 'After all matter dissolves, black holes reign supreme as the only macroscopic objects in existence. However, even black holes are mortal: through quantum Hawking radiation, they emit faint thermal radiation. A stellar-mass black hole evaporates in $10^{67}$ years; supermassive black holes with billions of solar masses endure for a googol ($10^{100}$) years before vanishing in blinding final gamma-ray bursts.'
      },
      {
        heading: 'The Dark Era and False Vacuum Decay',
        content: 'Beyond $10^{100}$ years, the universe enters the Dark Era: a cold, unimaginably diffuse sea of photons, neutrinos, and occasional electrons and positrons separated by light-years. Thermodynamic entropy reaches its absolute maximum—the Heat Death (Big Freeze). Alternatively, if the Higgs field is in a "metastable" false vacuum, a quantum tunneling event could spawn a true vacuum bubble expanding at light speed, instantly rewriting the laws of physics and erasing all matter.'
      }
    ],
    timeline: [
      { year: '5 Billion Years', event: 'Milky Way and Andromeda galaxies merge into "Milkomeda".' },
      { year: '100 Trillion Years', event: 'Last stars exhaust hydrogen; end of Stelliferous Era.' },
      { year: '10³⁶ Years', event: 'Hypothesized proton decay destroys all atomic nuclei.' },
      { year: '10¹⁰⁰ Years', event: 'Last supermassive black holes evaporate via Hawking radiation.' }
    ],
    trivia: [
      'On a timeline where the entire history of the universe is scaled to a single year, we are currently living in the first fraction of a second after midnight on January 1st.',
      'In a "Big Rip" scenario caused by phantom dark energy ($w < -1$), galaxies, stars, planets, atoms, and spacetime itself are torn apart in 22 billion years.'
    ],
    relatedArticleIds: ['cosmic-origins-big-bang', 'black-holes-spacetime'],
    interactiveToolRef: 'scale'
  },
  {
    id: 'interstellar-propulsion-relativity',
    title: 'Interstellar Travel & Propulsion: Crossing the Light-Year Abyss',
    subtitle: 'Solar Sails, Antimatter Rockets, Fusion Ramjets, and Relativistic Time Dilation',
    category: 'spaceflight',
    readingTimeMin: 8,
    difficulty: 'Intermediate',
    summary: 'The hard physics of reaching the stars: why chemical rockets fail, how photon pressure propels lightsails to 20% light speed, and how time dilation affects relativistic crews.',
    heroImageDesc: 'An interstellar light-sail vessel propelled by a gigantic collimated terrestrial laser array.',
    author: 'UBT Advanced Propulsion Laboratories',
    coverGradient: 'from-blue-900 via-slate-900 to-black',
    stats: [
      { label: 'Distance to Proxima Centauri', value: '4.246 Light-Years (40 Trillion km)' },
      { label: 'Voyager 1 Speed', value: '17 km/s (Takes 75,000 years to reach nearest star)' },
      { label: 'Breakthrough Starshot Target', value: '0.2c (Reaches Alpha Centauri in 20 years)' },
      { label: 'Relativistic Gamma Factor (γ)', value: 'γ = 1/√(1 - v²/c²)' }
    ],
    sections: [
      {
        heading: 'The Tyranny of the Tsiolkovsky Rocket Equation',
        content: 'Konstantin Tsiolkovsky\'s rocket equation ($\\Delta v = v_e \\ln \\frac{m_0}{m_f}$) dictates that payload mass fractions diminish exponentially with higher velocity requirements. Chemical fuels produce exhaust velocities ($v_e$) of only 4.5 km/s. To accelerate a spacecraft to just 10% the speed of light ($30,000 \\text{ km/s}$) using chemical rockets would require more propellant mass than exists in the observable universe.'
      },
      {
        heading: 'Laser-Driven Lightsails: Breakthrough Starshot',
        content: 'By detaching the fuel and power source from the spacecraft, laser lightsails overcome the rocket equation entirely. A ground-based phased-laser array firing 100 gigawatts of coherent photons at a reflective graphene/silicon-nitride sail weighing only grams can accelerate micro-probes at 50,000 g-forces, reaching 20% the speed of light ($0.2c$) in mere minutes and arriving at the Proxima Centauri system in just over 20 years.'
      },
      {
        heading: 'Relativistic Time Dilation & The Twin Paradox',
        content: 'Special relativity reveals that as spacecraft velocity approaches $c$, time aboard the vessel slows down relative to observers back on Earth by the Lorentz factor $\\gamma = 1/\\sqrt{1 - v^2/c^2}$. At $0.999c$, $\\gamma \\approx 22.4$: one year experienced by the astronaut corresponds to more than 22 years elapsed on Earth, allowing human crews to traverse interstellar voids within a single human lifetime.'
      }
    ],
    timeline: [
      { year: '1903', event: 'Konstantin Tsiolkovsky publishes the classical rocket equation.' },
      { year: '1960', event: 'Robert Bussard designs the Interstellar Fusion Ramjet.' },
      { year: '1977', event: 'Voyager 1 and 2 launched, currently in interstellar space.' },
      { year: '2016', event: 'Breakthrough Starshot initiative announced for 0.2c laser sail probe.' }
    ],
    trivia: [
      'A 1-gram lightsail chip traveling at 20% light speed possesses kinetic energy equivalent to exploding 100 kilograms of TNT if it impacts a speck of cosmic dust.',
      'Matter-antimatter annihilation converts 100% of rest mass into pure gamma photons ($E=mc^2$), making it the ultimate theoretical rocket fuel.'
    ],
    relatedArticleIds: ['james-webb-telescope', 'solar-system-formation'],
    interactiveToolRef: 'rocket'
  }
];

export const SCALE_OF_UNIVERSE_DATA: ScaleObject[] = [
  {
    id: 'planck-length',
    name: 'Planck Length',
    exponent: -35,
    sizeFormatted: '1.6 × 10⁻³⁵ m',
    category: 'quantum',
    description: 'The fundamental quantum limit of physical length in spacetime. Distances smaller than this have no physical meaning in current physics.',
    fact: 'If an atom were the size of the observable universe, the Planck length would be the size of an average tree.',
    icon: 'Atom'
  },
  {
    id: 'string-theory',
    name: 'Theoretical Cosmic String',
    exponent: -33,
    sizeFormatted: '10⁻³³ m',
    category: 'quantum',
    description: 'Hypothetical 1D vibrating energy filament in superstring theory that determines particle mass and charge via vibration frequency.',
    fact: 'Different vibrational modes of a string correspond to different fundamental particles like electrons or quarks.',
    icon: 'Radio'
  },
  {
    id: 'top-quark',
    name: 'Top Quark / Up Quark',
    exponent: -18,
    sizeFormatted: '10⁻¹⁸ m',
    category: 'quantum',
    description: 'Elementary particles with fractional electric charge that combine via the strong force (gluons) to create protons and neutrons.',
    fact: 'Quarks cannot exist in isolation due to quantum chromodynamic color confinement.',
    icon: 'Sparkles'
  },
  {
    id: 'proton',
    name: 'Proton Nucleus',
    exponent: -15,
    sizeFormatted: '1.7 × 10⁻¹⁵ m (1.7 fm)',
    category: 'atomic',
    description: 'Composite subatomic hadron consisting of two up quarks and one down quark held together by the strong nuclear interaction.',
    fact: 'Over 99% of a proton\'s mass comes not from its quarks, but from the binding energy of the gluon field.',
    icon: 'CircleDot'
  },
  {
    id: 'hydrogen-atom',
    name: 'Hydrogen Atom',
    exponent: -10,
    sizeFormatted: '1 × 10⁻¹⁰ m (1 Ångström)',
    category: 'atomic',
    description: 'The simplest and most abundant chemical element in the universe, consisting of a single proton orbited by an electron cloud.',
    fact: 'Atoms are 99.9999999999999% empty space. If the nucleus were a marble in a stadium, the electron cloud would be at the outer seats.',
    icon: 'Disc'
  },
  {
    id: 'dna-helix',
    name: 'DNA Double Helix Width',
    exponent: -9,
    sizeFormatted: '2 × 10⁻⁹ m (2 nm)',
    category: 'microscopic',
    description: 'The molecular blueprint of all terrestrial life, encoding genetic instructions in complementary nucleotide base pairs (A-T, C-G).',
    fact: 'Uncoiling all the DNA in a single human body would stretch from Earth to Pluto and back over twice.',
    icon: 'Dna'
  },
  {
    id: 'coronavirus',
    name: 'SARS-CoV-2 / Virus',
    exponent: -7,
    sizeFormatted: '1 × 10⁻⁷ m (100 nm)',
    category: 'microscopic',
    description: 'Microscopic infectious biological package containing an RNA or DNA payload wrapped in a protective lipid and protein shell.',
    fact: 'About 500 average viruses could fit across the width of a single human red blood cell.',
    icon: 'Biohazard'
  },
  {
    id: 'red-blood-cell',
    name: 'Human Red Blood Cell',
    exponent: -5,
    sizeFormatted: '8 × 10⁻⁶ m (8 µm)',
    category: 'microscopic',
    description: 'Biconcave disc engineered to transport oxygen from lungs to body tissues using iron-rich hemoglobin molecules.',
    fact: 'Your body produces about 2 million new red blood cells every single second.',
    icon: 'Activity'
  },
  {
    id: 'human',
    name: 'Human Being',
    exponent: 0,
    sizeFormatted: '1.7 m (10⁰ m)',
    category: 'human',
    description: 'An intelligent conscious bipedal hominid capable of contemplating its own existence, building telescopes, and asking about the cosmos.',
    fact: 'Humans sit almost exactly midway on the logarithmic scale between the Planck length and the observable universe!',
    icon: 'User'
  },
  {
    id: 'mount-everest',
    name: 'Mount Everest (Chomolungma)',
    exponent: 4,
    sizeFormatted: '8,848 m (8.8 km)',
    category: 'planetary',
    description: 'Earth’s highest altitude landform above sea level, pushed upward by the ongoing continental collision of India and Eurasia.',
    fact: 'Everest grows approximately 4 millimeters taller every year due to tectonic compression.',
    icon: 'Mountain'
  },
  {
    id: 'earth-diameter',
    name: 'Planet Earth',
    exponent: 7,
    sizeFormatted: '1.27 × 10⁷ m (12,742 km)',
    category: 'planetary',
    description: 'Our vibrant planetary home, wrapped in a protective nitrogen-oxygen blanket and shielded by liquid metal dynamo geodynamo.',
    fact: 'Earth is traveling around the Sun at an average speed of 107,000 km/h (67,000 mph).',
    icon: 'Globe'
  },
  {
    id: 'sun-diameter',
    name: 'The Sun (Sol)',
    exponent: 9,
    sizeFormatted: '1.39 × 10⁹ m (1.39M km)',
    category: 'stellar',
    description: 'The master yellow dwarf star fusing hydrogen to illuminate our biosphere and anchor the orbits of every planet.',
    fact: 'The Sun accounts for 99.86% of the entire mass of the solar system.',
    icon: 'Sun'
  },
  {
    id: 'solar-system-orbit',
    name: 'Neptune’s Orbit',
    exponent: 13,
    sizeFormatted: '9 × 10¹² m (60 AU)',
    category: 'stellar',
    description: 'The boundary of the major planetary realm before entering the Kuiper Belt and scattered disk icy planetesimals.',
    fact: 'Voyager 1 took 12 years traveling at 60,000 km/h just to cross beyond Neptune’s orbital distance.',
    icon: 'Orbit'
  },
  {
    id: 'oort-cloud',
    name: 'The Oort Cloud',
    exponent: 16,
    sizeFormatted: '1.5 × 10¹⁶ m (~100,000 AU)',
    category: 'galactic',
    description: 'Immense spherical halo of trillions of icy cometary bodies marking the gravitational edge of the Sun’s domain.',
    fact: 'A spacecraft traveling at the speed of Voyager 1 will take over 30,000 years to emerge from the Oort Cloud.',
    icon: 'Cloud'
  },
  {
    id: 'milky-way',
    name: 'Milky Way Galaxy',
    exponent: 21,
    sizeFormatted: '10²¹ m (100,000 Light-Years)',
    category: 'galactic',
    description: 'Barred spiral galaxy harboring between 100 to 400 billion stars, with our solar system in the Orion-Cygnus arm.',
    fact: 'It takes our solar system approximately 230 million years to complete one "cosmic year" orbit around the galactic center.',
    icon: 'Compass'
  },
  {
    id: 'laniakea-supercluster',
    name: 'Laniakea Supercluster',
    exponent: 24,
    sizeFormatted: '5 × 10²⁴ m (520 Million Light-Years)',
    category: 'cosmic',
    description: 'The titanic gravitational watershed encompassing 100,000 galaxies flowing toward the mysterious Great Attractor.',
    fact: 'Laniakea means "immense heaven" in Hawaiian.',
    icon: 'Layers'
  },
  {
    id: 'observable-universe',
    name: 'Observable Universe',
    exponent: 26,
    sizeFormatted: '8.8 × 10²⁶ m (93 Billion Light-Years)',
    category: 'cosmic',
    description: 'The sphere of the cosmos from which light has had time to reach Earth since the Big Bang began 13.8 billion years ago.',
    fact: 'It contains an estimated 2 trillion galaxies and over 10²⁴ (a septillion) stars.',
    icon: 'Eye'
  }
];

export const COSMIC_ELEMENTS: ElementData[] = [
  {
    atomicNumber: 1,
    symbol: 'H',
    name: 'Hydrogen',
    atomicMass: 1.008,
    category: 'nonmetal',
    cosmicOrigin: 'Big Bang Nucleosynthesis',
    cosmicOriginColor: '#38BDF8',
    astrophysicalRole: 'Formed in the first 20 minutes of the Big Bang. Constitutes 74% of the baryonic universe; primary fuel for stellar fusion.'
  },
  {
    atomicNumber: 2,
    symbol: 'He',
    name: 'Helium',
    atomicMass: 4.0026,
    category: 'noble_gas',
    cosmicOrigin: 'Big Bang Nucleosynthesis',
    cosmicOriginColor: '#38BDF8',
    astrophysicalRole: '24% of primordial cosmos synthesized during Big Bang. Second most abundant element; created by p-p chains in stars.'
  },
  {
    atomicNumber: 6,
    symbol: 'C',
    name: 'Carbon',
    atomicMass: 12.011,
    category: 'nonmetal',
    cosmicOrigin: 'Low-mass Stars (Cosmic Wind)',
    cosmicOriginColor: '#F59E0B',
    astrophysicalRole: 'Produced via the triple-alpha process in red giants. The chemical backbone of all organic molecules and terrestrial biology.'
  },
  {
    atomicNumber: 7,
    symbol: 'N',
    name: 'Nitrogen',
    atomicMass: 14.007,
    category: 'nonmetal',
    cosmicOrigin: 'Low-mass Stars (Cosmic Wind)',
    cosmicOriginColor: '#F59E0B',
    astrophysicalRole: 'Formed in the CNO cycle of intermediate-mass stars. Constitutes 78% of Earth’s atmosphere and building block of amino acids.'
  },
  {
    atomicNumber: 8,
    symbol: 'O',
    name: 'Oxygen',
    atomicMass: 15.999,
    category: 'nonmetal',
    cosmicOrigin: 'Massive Exploding Stars (Supernovae)',
    cosmicOriginColor: '#EF4444',
    astrophysicalRole: 'Third most abundant element in universe. Cooked by helium-carbon fusion in massive stars and dispersed by core-collapse supernovae.'
  },
  {
    atomicNumber: 12,
    symbol: 'Mg',
    name: 'Magnesium',
    atomicMass: 24.305,
    category: 'alkaline_earth',
    cosmicOrigin: 'Massive Exploding Stars (Supernovae)',
    cosmicOriginColor: '#EF4444',
    astrophysicalRole: 'Key constituent of rocky planetary mantles, meteorites, and chlorophyll molecules powering terrestrial photosynthesis.'
  },
  {
    atomicNumber: 14,
    symbol: 'Si',
    name: 'Silicon',
    atomicMass: 28.085,
    category: 'metalloid',
    cosmicOrigin: 'Massive Exploding Stars (Supernovae)',
    cosmicOriginColor: '#EF4444',
    astrophysicalRole: 'Fundamental component of silicate rocks, planetary crusts, interstellar dust grains, and modern semiconductor technology.'
  },
  {
    atomicNumber: 26,
    symbol: 'Fe',
    name: 'Iron',
    atomicMass: 55.845,
    category: 'transition_metal',
    cosmicOrigin: 'Massive Exploding Stars (Supernovae)',
    cosmicOriginColor: '#EF4444',
    astrophysicalRole: 'Final exothermic element in stellar cores (the Iron Peak). Forms Earth’s metallic core, generating our life-protecting magnetosphere.'
  },
  {
    atomicNumber: 79,
    symbol: 'Au',
    name: 'Gold',
    atomicMass: 196.97,
    category: 'transition_metal',
    cosmicOrigin: 'Neutron Star Mergers (Kilonovae)',
    cosmicOriginColor: '#A855F7',
    astrophysicalRole: 'Synthesized via rapid neutron capture (r-process) during violent collisions of binary neutron stars and rare magnetorotational hypernovae.'
  },
  {
    atomicNumber: 92,
    symbol: 'U',
    name: 'Uranium',
    atomicMass: 238.03,
    category: 'transition_metal',
    cosmicOrigin: 'Neutron Star Mergers (Kilonovae)',
    cosmicOriginColor: '#A855F7',
    astrophysicalRole: 'Heaviest primordial element. Its radioactive decay in Earth’s mantle powers internal heat, driving plate tectonics and volcanoes.'
  }
];

export const TRIVIA_BANK: TriviaQuestion[] = [
  // ASTRONOMY
  {
    id: 'ast-1',
    category: 'Astronomy',
    difficulty: 'easy',
    question: 'Which planet in our solar system has the most confirmed natural moons?',
    options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    correctIndex: 1,
    explanation: 'Saturn holds the current record with 146 confirmed moons, surpassing Jupiter\'s 95 moons.',
    relatedArticleId: 'solar-system-formation',
    relatedToolId: 'solarsystem'
  },
  {
    id: 'ast-2',
    category: 'Astronomy',
    difficulty: 'medium',
    question: 'What is the theoretical boundary around a black hole beyond which no light or information can escape?',
    options: ['Ergosphere', 'Accretion Disk', 'Event Horizon', 'Roche Limit'],
    correctIndex: 2,
    explanation: 'The Event Horizon is the point of no return where the escape velocity equals and exceeds the speed of light.',
    relatedArticleId: 'black-holes-spacetime',
    relatedToolId: 'gravity'
  },
  {
    id: 'ast-3',
    category: 'Astronomy',
    difficulty: 'hard',
    question: 'What is the upper mass limit for a non-rotating white dwarf star before electron degeneracy pressure collapses into a neutron star?',
    options: ['Eddington limit', 'Chandrasekhar limit (~1.44 Solar Masses)', 'Tolman-Oppenheimer-Volkoff limit', 'Schwarzschild radius'],
    correctIndex: 1,
    explanation: 'Calculated by Subrahmanyan Chandrasekhar in 1930, electron degeneracy pressure fails if a white dwarf exceeds ~1.44 solar masses, triggering a Type Ia supernova or collapse.',
    relatedArticleId: 'stellar-nucleosynthesis-fusion',
    relatedToolId: 'gravity'
  },
  {
    id: 'ast-4',
    category: 'Astronomy',
    difficulty: 'easy',
    question: 'Which galaxy is the closest major spiral galaxy to our own Milky Way, on a collision course in ~4.5 billion years?',
    options: ['Triangulum Galaxy', 'Andromeda Galaxy (M31)', 'Sombrero Galaxy', 'Large Magellanic Cloud'],
    correctIndex: 1,
    explanation: 'The Andromeda Galaxy is about 2.5 million light-years away and is heading toward the Milky Way at 110 km/s.',
    relatedArticleId: 'cosmic-origins-big-bang',
    relatedToolId: 'scale'
  },
  {
    id: 'ast-5',
    category: 'Astronomy',
    difficulty: 'medium',
    question: 'What phenomenon causes the expansion rate of the observable universe to accelerate over cosmological time?',
    options: ['Dark Energy', 'Hawking Radiation', 'Cosmic Rays', 'Solar Wind'],
    correctIndex: 0,
    explanation: 'Dark Energy constitutes about 68.3% of the universe\'s total mass-energy density, acting as a repulsive cosmological pressure.',
    relatedArticleId: 'cosmic-origins-big-bang',
    relatedToolId: 'scale'
  },
  {
    id: 'ast-6',
    category: 'Astronomy',
    difficulty: 'hard',
    question: 'In Kepler\'s Third Law of planetary motion, the square of the orbital period ($T^2$) is directly proportional to what?',
    options: ['Cube of the semi-major axis ($a^3$)', 'Square of planetary mass ($M^2$)', 'Inverse of distance ($1/r$)', 'Eccentricity ($e$)'],
    correctIndex: 0,
    explanation: 'Kepler\'s Third Law states $T^2 \\propto a^3$, showing that planets farther from the Sun take disproportionately longer to complete an orbit.',
    relatedArticleId: 'solar-system-formation',
    relatedToolId: 'solarsystem'
  },

  // PHYSICS
  {
    id: 'phy-1',
    category: 'Physics',
    difficulty: 'easy',
    question: 'What is the speed of light in a vacuum, widely denoted by the constant "c"?',
    options: ['150,000 km/s', '299,792 km/s', '500,000 km/s', '1,000,000 km/s'],
    correctIndex: 1,
    explanation: 'The speed of light in vacuum is exactly 299,792,458 meters per second (~300,000 km/s), the cosmic speed limit of the universe.',
    relatedArticleId: 'general-relativity',
    relatedToolId: 'scale'
  },
  {
    id: 'phy-2',
    category: 'Physics',
    difficulty: 'medium',
    question: 'What principle formulated by Werner Heisenberg states that position and momentum cannot both be precisely measured simultaneously?',
    options: ['Pauli Exclusion Principle', 'Heisenberg Uncertainty Principle', 'Equivalence Principle', 'Mach\'s Principle'],
    correctIndex: 1,
    explanation: 'The Heisenberg Uncertainty Principle states $\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}$, meaning fundamental quantum indeterminacy is built into wave mechanics.',
    relatedArticleId: 'quantum-entanglement',
    relatedToolId: 'scale'
  },
  {
    id: 'phy-3',
    category: 'Physics',
    difficulty: 'hard',
    question: 'Which mathematical theorem showed that quantum mechanics violates local realism, proving no local hidden variable theory can reproduce all quantum predictions?',
    options: ['Noether\'s Theorem', 'Bell\'s Theorem', 'Carnot\'s Theorem', 'Gödel\'s Incompleteness Theorem'],
    correctIndex: 1,
    explanation: 'John Stewart Bell formulated Bell\'s Theorem in 1964; tests violating Bell\'s inequalities won the 2022 Nobel Prize in Physics.',
    relatedArticleId: 'quantum-entanglement',
    relatedToolId: 'scale'
  },
  {
    id: 'phy-4',
    category: 'Physics',
    difficulty: 'easy',
    question: 'What fundamental force is responsible for keeping the atomic nucleus bound together despite electrostatic proton repulsion?',
    options: ['Gravity', 'Strong Nuclear Force', 'Electromagnetism', 'Weak Nuclear Force'],
    correctIndex: 1,
    explanation: 'The strong nuclear force mediated by gluons overcomes electric repulsion between positive protons at subatomic distances (< 1 femtometer).',
    relatedArticleId: 'stellar-nucleosynthesis-fusion',
    relatedToolId: 'fusion'
  },
  {
    id: 'phy-5',
    category: 'Physics',
    difficulty: 'medium',
    question: 'According to Einstein\'s General Relativity, what is gravity fundamentally?',
    options: ['An invisible magnetic tether', 'The curvature of four-dimensional spacetime caused by mass and energy', 'A particle spray of gravitons through a flat grid', 'Atmospheric downward pressure'],
    correctIndex: 1,
    explanation: 'Mass-energy tells spacetime how to curve, and curved spacetime tells mass-energy how to move.',
    relatedArticleId: 'black-holes-spacetime',
    relatedToolId: 'gravity'
  },
  {
    id: 'phy-6',
    category: 'Physics',
    difficulty: 'hard',
    question: 'What is the term for the hypothetical radiation emitted by black holes due to quantum vacuum fluctuations near the event horizon?',
    options: ['Cherenkov Radiation', 'Hawking Radiation', 'Synchrotron Radiation', 'Bremsstrahlung'],
    correctIndex: 1,
    explanation: 'Formulated by Stephen Hawking in 1974, virtual particle-antiparticle separation near the horizon causes black holes to slowly lose mass and evaporate.',
    relatedArticleId: 'black-holes-spacetime',
    relatedToolId: 'gravity'
  },

  // BIOLOGY & ASTROBIOLOGY
  {
    id: 'bio-1',
    category: 'Biology',
    difficulty: 'easy',
    question: 'Which microscopic organism is famous for surviving the vacuum, freezing cold, and lethal ionizing radiation of outer space?',
    options: ['Amoeba', 'Tardigrade (Water Bear)', 'Paramecium', 'Planarian Flatworm'],
    correctIndex: 1,
    explanation: 'Tardigrades enter a cryptobiotic state (tun state) by suspending metabolism, surviving temperatures near absolute zero and intense cosmic radiation.',
    relatedArticleId: 'exoplanets-life-search',
    relatedToolId: 'exoplanet'
  },
  {
    id: 'bio-2',
    category: 'Biology',
    difficulty: 'medium',
    question: 'What is the circumstellar region around a star where liquid water can stably exist on a planet\'s surface called?',
    options: ['Kuiper Belt', 'Goldilocks Zone (Habitable Zone)', 'Oort Sphere', 'Roche Limit'],
    correctIndex: 1,
    explanation: 'The Habitable or Goldilocks Zone is the orbital band where stellar insolation neither boils away surface water nor freezes it permanently into ice.',
    relatedArticleId: 'exoplanets-life-search',
    relatedToolId: 'exoplanet'
  },
  {
    id: 'bio-3',
    category: 'Biology',
    difficulty: 'hard',
    question: 'What is the astrobiological hypothesis that microscopic life or prebiotic compounds can travel between planets via meteorites?',
    options: ['Abiogenesis', 'Panspermia', 'Endosymbiosis', 'Chemosynthesis'],
    correctIndex: 1,
    explanation: 'Panspermia proposes that extremophile spores or organic molecules hitchhike inside rocky meteoroids ejecta across interplanetary space.',
    relatedArticleId: 'exoplanets-life-search',
    relatedToolId: 'exoplanet'
  },
  {
    id: 'bio-4',
    category: 'Biology',
    difficulty: 'easy',
    question: 'Which celestial moon in our solar system has a global salty liquid water ocean beneath its icy shell that may harbor microbial life?',
    options: ['Europa (Moon of Jupiter)', 'Deimos (Moon of Mars)', 'Phobos (Moon of Mars)', 'Hyperion (Moon of Saturn)'],
    correctIndex: 0,
    explanation: 'Jupiter\'s moon Europa has a subsurface ocean with more liquid water than all Earth\'s oceans combined, warmed by tidal flexing from Jupiter.',
    relatedArticleId: 'solar-system-formation',
    relatedToolId: 'solarsystem'
  },
  {
    id: 'bio-5',
    category: 'Biology',
    difficulty: 'medium',
    question: 'In deep sea hydrothermal vents on Earth, what biological process powers ecosystems without any sunlight?',
    options: ['Photosynthesis', 'Chemosynthesis', 'Fermentation', 'Photolysis'],
    correctIndex: 1,
    explanation: 'Chemosynthetic bacteria oxidize sulfur compounds emitted by volcanic vents, providing a model for how life could thrive under Europa\'s ice.',
    relatedArticleId: 'exoplanets-life-search',
    relatedToolId: 'exoplanet'
  },
  {
    id: 'bio-6',
    category: 'Biology',
    difficulty: 'hard',
    question: 'Which atmospheric gas combination on an exoplanet is considered a prime "biosignature" indicating active biological metabolism out of chemical equilibrium?',
    options: ['Carbon Dioxide and Nitrogen', 'Oxygen (or Ozone) simultaneously with Methane', 'Argon and Helium', 'Pure Carbon Monoxide'],
    correctIndex: 1,
    explanation: 'Oxygen and methane react quickly to destroy each other. Finding both in an exoplanet atmosphere indicates continuous active biological replenishment.',
    relatedArticleId: 'exoplanets-life-search',
    relatedToolId: 'exoplanet'
  },

  // SPACE MISSIONS & EXPLORATION
  {
    id: 'spc-1',
    category: 'Space Missions',
    difficulty: 'easy',
    question: 'Which space telescope operates at the Sun-Earth Second Lagrange Point (L2) using a 6.5-meter gold-coated mirror?',
    options: ['Hubble Space Telescope', 'James Webb Space Telescope (JWST)', 'Spitzer Space Telescope', 'Chandra X-ray Observatory'],
    correctIndex: 1,
    explanation: 'JWST orbits at L2 (1.5 million km from Earth) to stay cryogenically cold for infrared deep-field astrophysics.',
    relatedArticleId: 'james-webb-telescope',
    relatedToolId: 'scale'
  },
  {
    id: 'spc-2',
    category: 'Space Missions',
    difficulty: 'medium',
    question: 'What is the farthest human-made object from Earth, currently traversing interstellar space beyond the heliopause?',
    options: ['New Horizons', 'Voyager 1', 'Pioneer 10', 'Parker Solar Probe'],
    correctIndex: 1,
    explanation: 'Launched in 1977, Voyager 1 crossed into interstellar space in 2012 and is over 24 billion kilometers (160+ AU) from Earth.',
    relatedArticleId: 'spaceflight-propulsion',
    relatedToolId: 'solarsystem'
  },
  {
    id: 'spc-3',
    category: 'Space Missions',
    difficulty: 'hard',
    question: 'What equation governs rocket velocity gain based on engine exhaust velocity and the natural log of mass ratio ($\Delta v = I_{sp} g_0 \ln(m_0/m_f)$)?',
    options: ['Bernoulli Equation', 'Tsiolkovsky Rocket Equation', 'Navier-Stokes Equation', 'Lorentz Transformation'],
    correctIndex: 1,
    explanation: 'Published by Konstantin Tsiolkovsky in 1903, this foundational equation dictates fuel mass fractions required to escape Earth\'s gravity.',
    relatedArticleId: 'spaceflight-propulsion',
    relatedToolId: 'rocket'
  },
  {
    id: 'spc-4',
    category: 'Space Missions',
    difficulty: 'easy',
    question: 'In 1969, who became the first human being to step foot on the lunar surface during Apollo 11?',
    options: ['Buzz Aldrin', 'Neil Armstrong', 'Michael Collins', 'Yuri Gagarin'],
    correctIndex: 1,
    explanation: 'Neil Armstrong stepped onto the lunar surface on July 20, 1969, declaring: "That\'s one small step for [a] man, one giant leap for mankind."',
    relatedArticleId: 'spaceflight-propulsion',
    relatedToolId: 'lander'
  },
  {
    id: 'spc-5',
    category: 'Space Missions',
    difficulty: 'medium',
    question: 'Which robotic mission flew past Pluto in July 2015, capturing the famous heart-shaped nitrogen glacier Sputnik Planitia?',
    options: ['Voyager 2', 'New Horizons', 'Cassini', 'Galileo'],
    correctIndex: 1,
    explanation: 'NASA\'s New Horizons spacecraft completed the first-ever close reconnaissance of Pluto and its moon Charon after a 9.5-year journey.',
    relatedArticleId: 'solar-system-formation',
    relatedToolId: 'solarsystem'
  },
  {
    id: 'spc-6',
    category: 'Space Missions',
    difficulty: 'hard',
    question: 'Which space probe holds the speed record for the fastest human-made object, diving into the Sun\'s outer corona at over 600,000 km/h?',
    options: ['Helios 2', 'Parker Solar Probe', 'Solar Orbiter', 'MESSENGER'],
    correctIndex: 1,
    explanation: 'NASA\'s Parker Solar Probe uses gravitational assists from Venus to dive closer to the Sun than any mission in history, sampling the solar corona directly.',
    relatedArticleId: 'stellar-nucleosynthesis-fusion',
    relatedToolId: 'solarsystem'
  }
];

