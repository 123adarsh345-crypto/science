import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// Fallback high-density answers for key science queries when offline or key not provided
const fallbackKnowledgeBase: Record<string, string> = {
  'black hole': `A black hole is a region of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it. The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole.

Key features:
1. Event Horizon: The threshold boundary beyond which no information or light can return.
2. Singularity: The zero-volume, infinite-density gravitational core predicted by classical relativity.
3. Hawking Radiation: Theoretical radiation emitted due to quantum effects near the event horizon.
4. Famous Examples: Sagittarius A* (the supermassive black hole at the center of the Milky Way) and M87* (first directly imaged by the Event Horizon Telescope in 2019).`,

  'quantum entanglement': `Quantum entanglement is a phenomenon where pairs or groups of particles interact in ways such that the quantum state of each particle cannot be described independently of the state of the others, even when the particles are separated by billions of light-years.

Albert Einstein famously dubbed this phenomenon "spooky action at a distance". In 1964, John Stewart Bell formulated Bell's Theorem, demonstrating that quantum mechanics violates local realism. The 2022 Nobel Prize in Physics was awarded to Alain Aspect, John Clauser, and Anton Zeilinger for experiments proving quantum entanglement.`,

  'james webb': `The James Webb Space Telescope (JWST) is the premier space observatory operated by NASA, ESA, and CSA. Launched on December 25, 2021, JWST orbits the Sun at the Second Lagrange Point (L2), approximately 1.5 million kilometers (930,000 miles) from Earth.

Key Capabilities:
- High-resolution infrared instruments (NIRCam, NIRSpec, MIRI, FGS/NIRISS).
- Beryllium 6.5-meter gold-coated primary mirror with 18 hexagonal segments.
- Capable of looking back over 13.5 billion years to observe the very first galaxies formed after the Big Bang and characterize exoplanet atmospheric compositions.`,

  'mars': `Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. Known as the Red Planet due to iron oxide (rust) on its surface, Mars features Olympus Mons (the tallest planetary volcano at ~22 km) and Valles Marineris (one of the largest canyons in the solar system).

Exploration:
- Actively explored by rovers like Perseverance (with the Ingenuity helicopter) and Curiosity.
- Past evidence shows liquid water rivers, ancient lakebeds (Jezero Crater), and subsurface polar water ice caps.`
};

// API Endpoint for AI Deep Dive & Cosmic Search
app.post('/api/gemini/explore', async (req, res) => {
  const { query, mode, topic } = req.body;

  if (!query && !topic) {
    return res.status(400).json({ error: 'Query or topic is required' });
  }

  const promptQuery = query || topic;
  const explorationMode = mode || 'comprehensive'; // 'comprehensive' | 'eli5' | 'quantum_rigor' | 'hypothetical'

  let systemInstruction = `You are UBT AI (Universal E-books Technology), the world's most advanced, inspiring, and accessible space and science exploration intelligence (combining the depth of Wikipedia, the curiosity of Google, and the interactive wonder of ZEPEDIA).
Explain complex space, astrophysics, biology, cosmology, quantum physics, and engineering concepts with scientific accuracy, vivid analogies, key numerical milestones, historical missions, and open questions.
Break answers into clean sections:
- 🌌 Executive Overview
- 🔬 Fundamental Physics / Mechanics
- 🔭 Real-world Observations & Space Missions
- ⚡ Mind-Blowing Cosmic Fact
- ❓ Intriguing Unsolved Questions`;

  if (explorationMode === 'eli5') {
    systemInstruction += `\nExplain this strictly in intuitive, fun, easy-to-understand terms for a curious beginner or student, using everyday analogies without dumbing down the core scientific truth.`;
  } else if (explorationMode === 'quantum_rigor') {
    systemInstruction += `\nProvide deep physical rigor, citing mathematical principles, conservation laws, equations (e.g. general relativity, thermodynamics, quantum mechanics), and peer-reviewed experiments.`;
  } else if (explorationMode === 'hypothetical') {
    systemInstruction += `\nFocus on speculative yet scientifically grounded "What If?" scenarios (e.g., falling into a spinning Kerr black hole, traveling at 0.99c, dyson swarms, warp bubbles).`;
  }

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Explain and explore in detail: "${promptQuery}" in mode: ${explorationMode}`,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text || '';
      return res.json({
        content: text,
        source: 'gemini-ai',
        mode: explorationMode,
      });
    } catch (err: any) {
      console.warn('Gemini API call failed, using intelligent scientific fallback:', err?.message || err);
    }
  }

  // Fallback response generator if API key is not active or temporary rate limits occur
  const lowerQ = (promptQuery || '').toLowerCase();
  let matchedFallback: string | null = null;
  for (const [key, text] of Object.entries(fallbackKnowledgeBase)) {
    if (lowerQ.includes(key)) {
      matchedFallback = text;
      break;
    }
  }

  const fallbackContent = matchedFallback || `🌌 **Executive Overview**
"${promptQuery}" represents one of the captivating frontiers of modern astronomy, astrophysics, and natural science. Scientists study this phenomenon to decipher how fundamental forces, matter, and spacetime interact across the cosmos.

🔬 **Fundamental Physics & Mechanics**
From Kepler's laws of planetary motion to Einstein's General Relativity and the Standard Model of particle physics, understanding "${promptQuery}" requires analyzing thermodynamics, electromagnetic radiation, and gravitational dynamics.

🔭 **Observations & Historic Space Missions**
Space agencies including NASA, ESA, JAXA, and ISRO deploy orbital space telescopes (such as Hubble, James Webb, and Chandra X-ray Observatory) alongside ground-based arrays (ALMA, VLT) to measure spectra, gravitational waves, and high-energy particles.

⚡ **Mind-Blowing Cosmic Fact**
Every heavy element in your body—from the iron in your blood to the calcium in your bones—was forged in the nuclear furnaces of dying stars and cataclysmic supernovae billions of years ago.

❓ **Intriguing Unsolved Questions**
What role does dark energy and dark matter play in the macroscopic evolution of this system? As next-generation instruments like the Roman Space Telescope and Extremely Large Telescope (ELT) come online, new observational data will revolutionize our models.`;

  return res.json({
    content: fallbackContent,
    source: 'ubt-knowledge-engine',
    mode: explorationMode,
  });
});

// Dedicated AI Space & Science Chatbot Endpoint
app.post('/api/gemini/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const systemInstruction = `You are UBT AI (Universal E-books Technology), a world-class space and science intelligence designed to explain the cosmos to humans of all backgrounds.
Your goal is to answer complex questions about astrophysics, cosmology, quantum physics, space exploration, chemistry, and astrobiology using simple, crystal-clear, intuitive explanations (like Richard Feynman or Carl Sagan).
Key guidelines:
1. Explain complex mechanisms with vivid everyday analogies, followed by the authentic scientific terminology.
2. Link to relevant UBT site resources when appropriate by embedding tags:
   - [Article: black-holes-spacetime | Black Holes & Spacetime]
   - [Article: quantum-entanglement | Quantum Entanglement]
   - [Article: solar-system-formation | Solar System Architecture]
   - [Article: james-webb-telescope | James Webb Space Telescope]
   - [Article: cosmic-origins-big-bang | The Big Bang & CMB]
   - [Article: stellar-nucleosynthesis-fusion | Stellar Fusion & Periodic Table]
   - [Tool: solarsystem | 3D Solar System Explorer]
   - [Tool: gravity | 3D Universe & Moon Sandbox]
   - [Tool: scale | Scale of the Universe]
   - [Tool: fusion | Stellar Core Fusion Lab]
   - [Tool: exoplanet | Exoplanet Habitable Zone]
   - [Tool: rocket | Rocket Propulsion Simulator]
   - [Game: lander | Apollo 11 Lunar Lander]
   - [Game: trivia | Cosmic Trivia Arena]
3. At the very end of your response, always provide exactly 3 concise, intriguing related topics for further exploration, formatted exactly like:
---SUGGESTED_TOPICS---
[Topic 1]
[Topic 2]
[Topic 3]`;

  if (ai) {
    try {
      // Build conversation contents if history exists
      let contents: any = message;
      if (Array.isArray(history) && history.length > 0) {
        contents = [
          ...history.slice(-6).map((h: any) => ({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }],
          })),
          { role: 'user', parts: [{ text: message }] },
        ];
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const rawText = response.text || '';
      return res.json({
        reply: rawText,
        source: 'gemini-ai',
      });
    } catch (err: any) {
      console.warn('Gemini Chat API call error, falling back:', err?.message || err);
    }
  }

  // Intelligent fallback for chat
  const lowerMsg = message.toLowerCase();
  let fallbackReply = `That is a profound question in modern space and science! 

When we break down the physics behind "${message}", nature reveals surprising simplicity under the surface. In the cosmos, everything is governed by a cosmic dance between four fundamental forces: gravity, electromagnetism, the strong nuclear force, and the weak force.

For example, whether we are observing stars igniting hydrogen fusion or planets orbiting in gravitational wells, matter constantly seeks its lowest energy state while conserving energy and momentum ($E=mc^2$).

You can explore this directly right here on UBT (Universal E-books Technology):
- Check out the [Tool: solarsystem | 3D Solar System Explorer] to observe planetary motion firsthand.
- Dive into the [Article: black-holes-spacetime | Black Holes & Spacetime] to see how gravity warps the fabric of the universe.
- Test your cosmic knowledge in the [Game: trivia | Cosmic Trivia Arena].

---SUGGESTED_TOPICS---
How does gravity bend light?
Why do stars produce all the elements in our bodies?
What happens if you fall toward the event horizon?`;

  if (lowerMsg.includes('black hole') || lowerMsg.includes('event horizon')) {
    fallbackReply = `Think of a black hole like a waterfall of spacetime itself!

Imagine a river that flows faster and faster as it approaches a colossal waterfall. If a fish swims faster than the water, it can escape. But past the edge of the waterfall, the water flows faster than the fish's maximum swimming speed—no matter how hard it paddles, it gets swept over.

In space, the waterfall edge is called the **Event Horizon**. Inside it, spacetime flows inward faster than 299,792 km/s (the speed of light!). Since nothing in our universe can travel faster than light, nothing—not even a beam of light—can turn around and escape.

Check out our deep dive:
- [Article: black-holes-spacetime | Black Holes & Spacetime Article]
- Experiment with gravitational pull and place white holes in the [Tool: gravity | 3D Universe & Moon Sandbox]

---SUGGESTED_TOPICS---
What is Hawking radiation and how do black holes evaporate?
What is the difference between stellar and supermassive black holes?
What would happen if the Sun turned into a black hole right now?`;
  } else if (lowerMsg.includes('moon') || lowerMsg.includes('apollo') || lowerMsg.includes('orbit')) {
    fallbackReply = `Getting into space and landing on another world is all about horizontal speed, not just going up!

To stay in orbit, a spacecraft like the International Space Station or Apollo Lunar Module has to travel sideways so fast (around 28,000 km/h) that as gravity pulls it down toward Earth, the Earth's curved surface curves away beneath it at the exact same rate. The spacecraft is essentially in perpetual free-fall!

On the Moon, gravity is only 1/6th as strong as Earth ($1.62\\text{ m/s}^2$) and there is no air resistance. That's why Apollo astronauts could bounce high in bulky suits, but also why landers require precision rocket thrusters rather than parachutes.

Experience this firsthand:
- Try piloting the Apollo lander in [Game: lander | Apollo 11 Lunar Lander]
- Inspect the Moon's 3D orbit in [Tool: solarsystem | 3D Solar System Explorer]
- Calculate rocket fuel requirements in [Tool: rocket | Rocket Propulsion Simulator]
- Place custom moons into orbit around giant planets in [Tool: gravity | 3D Universe & Moon Sandbox]

---SUGGESTED_TOPICS---
How did the Moon form during the Theia collision?
Why is there water ice in permanently shadowed lunar craters?
How does the Tsiolkovsky rocket equation work?`;
  }

  return res.json({
    reply: fallbackReply,
    source: 'ubt-knowledge-engine',
  });
});


// Vite middleware or static serving
async function setupVite() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 UBT (Universal E-books Technology) Server running at http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch(console.error);
