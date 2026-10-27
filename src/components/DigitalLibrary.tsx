import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Star,
  Trash2,
  Edit3,
  Download,
  Upload,
  Eye,
  Sparkles,
  Clock,
  User,
  Tag,
  CheckCircle2,
  Bookmark,
  Share2,
  Sliders,
  Volume2,
  VolumeX,
  ArrowLeft,
  RefreshCw,
  FileText,
  Layers,
  Heading,
  Bold,
  Italic,
  List,
  Quote,
  Code,
  Table,
  Zap,
  Library as LibraryIcon,
  Sun,
  Moon,
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { LibraryEBook } from '../types';

interface Props {
  onAskAi?: (topic: string) => void;
  onNavigateToTool?: (toolId: string) => void;
}

// Initial starter collection for new users
const SEED_EBOOKS: LibraryEBook[] = [
  {
    id: 'seed-dyson-sphere',
    title: 'The Dyson Sphere Engineering Blueprint',
    subtitle: 'Megastructure Physics, Swarm Architectures & Stellar Harvesting',
    author: 'Freeman Dyson & UBT Astrotechnology Division',
    category: 'Astrophysics',
    coverGradient: 'from-amber-600 via-yellow-700 to-stone-900',
    summary: 'A definitive technical analysis on enclosing a G-type star with automated solar harvesting swarms to capture 3.84 × 10²⁶ Watts of radiant energy.',
    markdownContent: `# The Dyson Sphere Engineering Blueprint
*Megastructure Physics, Swarm Architectures & Stellar Harvesting*
**Author:** Freeman Dyson & UBT Astrotechnology Division

---

## 1. Executive Summary & Energy Scales
In 1960, theoretical physicist Freeman Dyson demonstrated that an expanding technological civilization will inevitably face energy scarcity on planetary surfaces. A star like our Sun radiates:

$$L_\\odot = 3.828 \\times 10^{26} \\text{ Watts}$$

Earth intercepts merely **one two-billionth** of this radiant flux ($~1.74 \\times 10^{17} \\text{ W}$). To ascend to a **Kardashev Type II Civilization**, a species must harvest the star's entire electromagnetic output.

---

## 2. Dyson Shell vs. Dyson Swarm Architecture

Popular science fiction frequently portrays Dyson structures as solid, rigid spheres enclosing the star. However, classical physics renders solid shells impossible:
1. **Gravitational Instability:** Newton's Shell Theorem dictates that inside a uniform hollow sphere, gravitational attraction to the shell is zero in all directions. The star will drift and inevitably collide with the inner wall.
2. **Material Tensile Stress:** No known chemical bond or carbon nanotube possesses the tensile strength required to withstand radial gravitational shear forces of this magnitude.

### The Viable Alternative: The Dyson Swarm
Instead of a monolithic rigid shell, the realistic engineering path is a **Dyson Swarm**: billions of independent, ultra-light solar collector satellites operating in high-inclination non-colliding orbital rings (heliocentric constellations).

\`\`\`
[Sun (Luminosity Source)]
       |
       +--> Ring Alpha (Radius: 0.5 AU, 10,000 km mirrors)
       +--> Ring Beta  (Radius: 0.7 AU, Inclination 45°)
       +--> Ring Gamma (Radius: 1.0 AU, Microwave Power Transmitters)
\`\`\`

---

## 3. Disassembling Mercury for Raw Materials
Where do we acquire the quadrillions of metric tons of metals and silicon needed to build millions of square kilometers of collector mirrors?
- **Target Body:** Planet Mercury.
- **Why Mercury?** It is closest to the Sun, possesses minimal atmospheric resistance, has a shallow gravitational well, and is compositionally dense (70% metallic iron and 30% silicates).
- **Process:** Automated mass-drivers powered by the Sun accelerate refined aluminum and graphene reflective sails directly into heliocentric orbit.

---

## 4. Infrared Waste Heat & Technosignatures
Thermodynamics enforces that energy collected cannot be erased ($dE = 0$). The collectors must reradiate waste heat into deep space.
- A Dyson Swarm absorbs visible solar light (5,500 K) and reradiates it as mid-infrared thermal radiation (200 K – 300 K).
- **How to Find Them:** Space observatories such as the James Webb Space Telescope and WISE scan the galaxy for stars that appear dim in optical light yet blaze with unnatural excess in the infrared spectrum.

---

> "One should expect that, within a few thousand years of its entering the stage of industrial development, any intelligent species should be found occupying an artificial biosphere which completely surrounds its parent star."
> — *Freeman J. Dyson, Science (1960)*
`,
    readingTimeMin: 6,
    wordCount: 420,
    createdAt: '2026-03-15',
    updatedAt: '2026-03-15',
    isFavorite: true,
    isUserCreated: false,
    tags: ['Megastructures', 'Kardashev Scale', 'Astrophysics', 'Solar Energy']
  },
  {
    id: 'seed-europa-ocean',
    title: 'Europa Subsurface Ocean Expedition',
    subtitle: 'Cryogenic Ice Sheets, Hydrothermal Vents, and the Search for Life',
    author: 'Dr. Kevin Hand & UBT Astrobiology Group',
    category: 'Exoplanets',
    coverGradient: 'from-cyan-700 via-blue-900 to-slate-950',
    summary: 'Detailed mission architecture and biogeochemical analysis of navigating Europa’s 100-kilometer deep saltwater ocean beneath 20 kilometers of convective ice.',
    markdownContent: `# Europa Subsurface Ocean Expedition
*Cryogenic Ice Sheets, Hydrothermal Vents, and the Search for Life*
**Author:** Dr. Kevin Hand & UBT Astrobiology Group

---

## 1. Introduction: The Ocean World Next Door
Jupiter's Galilean moon **Europa** is one of the most compelling astrobiological targets in the solar system. Beneath a shell of water ice estimated at 15 to 25 kilometers thick lies a global ocean:
- **Depth:** 60 to 150 kilometers (more than 10 times deeper than the Mariana Trench).
- **Water Volume:** Over **$3 \\times 10^{18} \\text{ m}^3$**—exceeding the combined volume of all oceans on Earth!

---

## 2. Why Europa Isn't Frozen Solid
At 5.2 Astronomical Units from the Sun, surface temperatures hover at $-160^\\circ\\text{C}$ at the equator and $-220^\\circ\\text{C}$ at the poles. Why doesn't the ocean freeze solid to the rocky silicate core?

The answer is **Gravitational Tidal Flexing**:
1. Europa orbits Jupiter in orbital resonance with **Io** and **Ganymede** (for every 4 orbits of Io, Europa completes 2, and Ganymede completes 1).
2. This creates an eccentric (non-circular) orbit.
3. Jupiter's crushing gravitational tidal gradient squeezes Europa's rocky mantle and core twice every orbit, converting orbital energy directly into friction and geothermal heat ($~10^{12} \\text{ Watts}$).

---

## 3. Hydrothermal Serpentinization on the Seafloor
Where seawater touches Europa’s hot silicate mantle, geochemical reactions occur called **serpentinization**:

$$\\text{Olivine} + \\text{Water} \\longrightarrow \\text{Serpentine} + \\text{Magnetite} + \\text{H}_2$$

This reaction produces molecular hydrogen ($H_2$), a potent energetic food source for chemotrophic microorganisms. On Earth, similar environments (such as the *Lost City Hydrothermal Field* in the Atlantic Ocean) thrive entirely without sunlight, supporting ecosystems of methanogens, tube worms, and crustaceans.

---

## 4. Cryobot Penetration Technology
To reach this abyssal sea, future probes will deploy **Cryobots**—heated thermal penetrators powered by small radioisotope or fission power cores:
- The probe melts its way down through 20 km of ice over several months.
- Behind it, the ice refreezes, sealing the borehole.
- Once breaching the ocean ceiling, an autonomous micro-submarine (AUV) unlatches to explore the hydrothermal vents.
`,
    readingTimeMin: 5,
    wordCount: 360,
    createdAt: '2026-03-20',
    updatedAt: '2026-03-20',
    isFavorite: false,
    isUserCreated: false,
    tags: ['Astrobiology', 'Jupiter', 'Ocean Worlds', 'Subsurface Life']
  },
  {
    id: 'seed-black-hole-ergosphere',
    title: 'The Ergosphere & The Penrose Energy Process',
    subtitle: 'Extracting Rotational Energy from Spinning Kerr Black Holes',
    author: 'Sir Roger Penrose & UBT Gravitational Labs',
    category: 'Quantum',
    coverGradient: 'from-purple-800 via-indigo-950 to-black',
    summary: 'How rotating Kerr black holes drag spacetime into an inescapable vortex, allowing technological civilizations to mine up to 29% of the black hole rest mass.',
    markdownContent: `# The Ergosphere & The Penrose Energy Process
*Extracting Rotational Energy from Spinning Kerr Black Holes*
**Author:** Sir Roger Penrose & UBT Gravitational Labs

---

## 1. Static vs. Spinning Spacetime
Karl Schwarzschild's 1916 solution describes a static, non-rotating black hole. But in the real universe, all collapsing stars possess angular momentum ($J$). In 1963, New Zealand mathematician Roy Kerr solved the Einstein field equations for a spinning mass: **The Kerr Metric**.

### Frame Dragging (The Lense-Thirring Effect)
A rotating black hole doesn't just pull matter downward—it forces spacetime itself to swirl around it like water going down an infinite drain. At close proximity, spacetime moves faster than the speed of light relative to an observer at infinity.

---

## 2. Anatomy of the Ergosphere
Surrounding the event horizon is an oblate ellipsoidal region called the **Ergosphere**:
- **Outer Boundary:** The Static Limit ($r = M + \\sqrt{M^2 - a^2 \\cos^2\\theta}$).
- **Inside the Static Limit:** No physical body can remain stationary relative to distant stars. Even firing rocket thrusters at maximum thrust, you are forced to rotate in the direction of the black hole's spin.
- **Key Difference:** Unlike the Event Horizon, the Ergosphere is outside the event horizon—trajectories can enter the ergosphere and successfully escape back into deep space!

---

## 3. The Penrose Process: Cosmic Energy Mining
In 1969, Roger Penrose realized this region can be exploited as the most efficient power generator in the universe:

1. A spacecraft fires a piece of mass ($m_0$) into the ergosphere against the direction of spacetime rotation.
2. Inside the ergosphere, trajectories with **negative energy** relative to infinity exist.
3. The projectile splits into two pieces: $m_1$ and $m_2$.
4. Piece $m_1$ falls with negative energy across the event horizon, subtracting rotational mass from the black hole.
5. Piece $m_2$ is flung backward out of the ergosphere with **more kinetic energy than the original object brought in!**

$$\\Delta E = E_{\\text{exit}} - E_{\\text{enter}} > 0$$

Theoretical efficiency reaches **29% of the mass-energy equivalent** ($0.29 mc^2$), vastly superior to hydrogen thermonuclear fusion (~0.7%).
`,
    readingTimeMin: 5,
    wordCount: 380,
    createdAt: '2026-03-24',
    updatedAt: '2026-03-24',
    isFavorite: true,
    isUserCreated: false,
    tags: ['General Relativity', 'Kerr Metric', 'Singularities', 'Penrose Process']
  },
  {
    id: 'seed-warp-drive-physics',
    title: 'The Alcubierre Warp Metric & Negative Energy',
    subtitle: 'Faster-Than-Light Spacetime Manipulation without Violating Relativity',
    author: 'Miguel Alcubierre & UBT Theoretical Propulsion',
    category: 'Cosmology',
    coverGradient: 'from-emerald-700 via-teal-900 to-slate-950',
    summary: 'The mathematical formulation of superluminal travel by contracting space in front of a vessel while expanding space behind it inside a flat gravitational bubble.',
    markdownContent: `# The Alcubierre Warp Metric & Negative Energy
*Faster-Than-Light Spacetime Manipulation without Violating Relativity*
**Author:** Miguel Alcubierre & UBT Theoretical Propulsion

---

## 1. The Superluminal Loophole
Special relativity strictly dictates that no material object can accelerate through local space faster than light:

$$v < c = 299,792,458 \\text{ m/s}$$

However, in 1994, Mexican physicist **Miguel Alcubierre** discovered a loophole in General Relativity: while matter cannot travel through space faster than light, **spacetime itself has no speed limit!**

---

## 2. The Warp Bubble Mechanism
The Alcubierre metric constructs a localized spacetime distortion:
- **Bow (Front):** Spacetime is dramatically compressed.
- **Stern (Rear):** Spacetime is rapidly expanded.
- **Center (Passenger Bubble):** Spacetime remains completely flat and Euclidean.

\`\`\`
  Expansion Behind (-->)    Flat Bubble (Spaceship)    Contraction Ahead (<--)
[==== Spacetime EXPANDS ====] [  Ship At Rest  ] [==== Spacetime SHRINKS ====]
\`\`\`

Inside the flat bubble, astronauts experience zero acceleration, zero g-forces, and zero relativistic time dilation—clocks aboard tick at the exact same rate as clocks on Earth. The bubble moves at an apparent velocity $v_s > c$, surfing spacetime waves like a surfboard.

---

## 3. The Energy Requirement: The Exotic Matter Problem
To achieve this geometry, the Einstein field equations require the stress-energy tensor to violate the **Weak Energy Condition (WEC)**:
- The energy density of the warp ring must be **negative** (sub-vacuum Casimir energy).
- Early calculations estimated requiring the mass-energy of the entire planet Jupiter in negative energy.
- Recent optimization by NASA Eagleworks and White-Davis research reduced this by oscillating the bubble frequency, bringing required exotic mass down to several hundred kilograms.
`,
    readingTimeMin: 5,
    wordCount: 320,
    createdAt: '2026-03-28',
    updatedAt: '2026-03-28',
    isFavorite: false,
    isUserCreated: false,
    tags: ['Warp Drive', 'General Relativity', 'Exotic Matter', 'Interstellar']
  }
];

export const DigitalLibrary: React.FC<Props> = ({ onAskAi, onNavigateToTool }) => {
  // Local state store
  const [ebooks, setEbooks] = useState<LibraryEBook[]>(() => {
    try {
      const stored = localStorage.getItem('ubt_saved_library_collection');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load library collection', e);
    }
    return SEED_EBOOKS;
  });

  // Active view: 'browse' | 'read' | 'editor'
  const [viewMode, setViewMode] = useState<'browse' | 'read' | 'editor'>('browse');
  const [activeEBookId, setActiveEBookId] = useState<string>(ebooks[0]?.id || 'seed-dyson-sphere');

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [onlyUserCreated, setOnlyUserCreated] = useState<boolean>(false);

  // Editor states
  const [editorId, setEditorId] = useState<string | null>(null);
  const [editorTitle, setEditorTitle] = useState<string>('');
  const [editorSubtitle, setEditorSubtitle] = useState<string>('');
  const [editorAuthor, setEditorAuthor] = useState<string>('');
  const [editorCategory, setEditorCategory] = useState<LibraryEBook['category']>('Astrophysics');
  const [editorCoverGradient, setEditorCoverGradient] = useState<string>('from-cyan-700 via-blue-900 to-slate-950');
  const [editorSummary, setEditorSummary] = useState<string>('');
  const [editorMarkdown, setEditorMarkdown] = useState<string>('');
  const [editorTags, setEditorTags] = useState<string>('Cosmology, Space');
  const [editorTab, setEditorTab] = useState<'split' | 'write' | 'preview'>('split');
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const [editorNotice, setEditorNotice] = useState<string | null>(null);

  // Reader states
  const [readerFontSize, setReaderFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [readerTheme, setReaderTheme] = useState<'deep_space' | 'dark_cosmos' | 'sepia' | 'paper'>('deep_space');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Save to localStorage whenever ebooks state changes
  useEffect(() => {
    try {
      localStorage.setItem('ubt_saved_library_collection', JSON.stringify(ebooks));
    } catch (e) {
      console.warn('Failed to save library collection to localStorage', e);
    }
  }, [ebooks]);

  // Currently selected ebook for reading
  const activeEBook = useMemo(() => {
    return ebooks.find(b => b.id === activeEBookId) || ebooks[0];
  }, [ebooks, activeEBookId]);

  // Filtered books
  const filteredEBooks = useMemo(() => {
    return ebooks.filter(book => {
      const matchCat = selectedCategory === 'All' || book.category === selectedCategory;
      const matchFav = !onlyFavorites || book.isFavorite;
      const matchUser = !onlyUserCreated || book.isUserCreated;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.subtitle.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.summary.toLowerCase().includes(q) ||
        book.tags.some(t => t.toLowerCase().includes(q));

      return matchCat && matchFav && matchUser && matchQuery;
    });
  }, [ebooks, selectedCategory, onlyFavorites, onlyUserCreated, searchQuery]);

  // Toggle favorite
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEbooks(prev =>
      prev.map(b => (b.id === id ? { ...b, isFavorite: !b.isFavorite } : b))
    );
  };

  // Delete an e-book
  const handleDeleteBook = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Delete this space e-book from your library?')) return;
    setEbooks(prev => prev.filter(b => b.id !== id));
    if (activeEBookId === id) {
      const remaining = ebooks.filter(b => b.id !== id);
      if (remaining.length > 0) setActiveEBookId(remaining[0].id);
    }
  };

  // Open Editor for new e-book
  const handleStartCreate = () => {
    setEditorId(null);
    setEditorTitle('');
    setEditorSubtitle('');
    setEditorAuthor('Cosmic Explorer');
    setEditorCategory('Astrophysics');
    setEditorCoverGradient('from-cyan-700 via-blue-900 to-slate-950');
    setEditorSummary('');
    setEditorTags('Space, Universe');
    setEditorMarkdown(`# Title of Your Space E-Book
*Subtitle or Theoretical Premise*
**Author:** Cosmic Explorer

---

## 1. Introduction & Physical Mechanics
Write your astronomical observations, physics principles, or theoretical exploration here.

- Fact 1: Light travels at 299,792 km/s in vacuum.
- Fact 2: Gravity warps spacetime according to Einstein's Field Equations.

## 2. Cosmic Observations
Describe key celestial bodies, telescope data, or missions involved.
`);
    setViewMode('editor');
  };

  // Open Editor to edit existing e-book
  const handleEditBook = (book: LibraryEBook, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditorId(book.id);
    setEditorTitle(book.title);
    setEditorSubtitle(book.subtitle);
    setEditorAuthor(book.author);
    setEditorCategory(book.category);
    setEditorCoverGradient(book.coverGradient);
    setEditorSummary(book.summary);
    setEditorMarkdown(book.markdownContent);
    setEditorTags(book.tags.join(', '));
    setViewMode('editor');
  };

  // Insert markdown tag helper at cursor
  const insertMarkdown = (prefix: string, suffix: string = '', defaultText: string = '') => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = el.value;
    const selected = text.substring(start, end) || defaultText;

    const replacement = `${prefix}${selected}${suffix}`;
    const newText = text.substring(0, start) + replacement + text.substring(end);
    setEditorMarkdown(newText);

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  // Save from editor into state store
  const handleSaveEditor = () => {
    if (!editorTitle.trim()) {
      setEditorNotice('Please enter an E-Book Title before saving!');
      setTimeout(() => setEditorNotice(null), 3000);
      return;
    }

    const words = editorMarkdown.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.round(words / 180));
    const cleanTags = editorTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (editorId) {
      // Update existing
      setEbooks(prev =>
        prev.map(b =>
          b.id === editorId
            ? {
                ...b,
                title: editorTitle.trim(),
                subtitle: editorSubtitle.trim() || 'A Space & Universe E-Book',
                author: editorAuthor.trim() || 'UBT Author',
                category: editorCategory,
                coverGradient: editorCoverGradient,
                summary: editorSummary.trim() || editorMarkdown.slice(0, 160) + '...',
                markdownContent: editorMarkdown,
                readingTimeMin: readingTime,
                wordCount: words,
                updatedAt: new Date().toISOString().split('T')[0],
                tags: cleanTags.length > 0 ? cleanTags : ['Cosmology'],
              }
            : b
        )
      );
      setActiveEBookId(editorId);
    } else {
      // Create new
      const newBook: LibraryEBook = {
        id: `ebook-${Date.now()}`,
        title: editorTitle.trim(),
        subtitle: editorSubtitle.trim() || 'A Space & Universe E-Book',
        author: editorAuthor.trim() || 'UBT Scholar',
        category: editorCategory,
        coverGradient: editorCoverGradient,
        summary: editorSummary.trim() || editorMarkdown.slice(0, 160) + '...',
        markdownContent: editorMarkdown,
        readingTimeMin: readingTime,
        wordCount: words,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        isFavorite: false,
        isUserCreated: true,
        tags: cleanTags.length > 0 ? cleanTags : ['Space', 'Universe'],
      };
      setEbooks(prev => [newBook, ...prev]);
      setActiveEBookId(newBook.id);
    }

    setEditorNotice('✨ E-Book successfully saved to your UBT Digital Library!');
    setTimeout(() => {
      setEditorNotice(null);
      setViewMode('read');
    }, 1200);
  };

  // AI Assistant in Editor
  const handleAiAssist = async () => {
    if (!editorTitle.trim() && !editorSummary.trim()) {
      setEditorNotice('Enter a title or summary so UBT AI knows what to write!');
      setTimeout(() => setEditorNotice(null), 3000);
      return;
    }

    setIsAiGenerating(true);
    setEditorNotice('UBT AI is drafting chapter content with astrophysics records...');

    try {
      const res = await fetch('/api/gemini/explore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `Draft an extensive, beautifully written space e-book chapter in Markdown format for the book titled: "${editorTitle || editorSummary}". Include headings (# and ##), bullet points, physical equations or principles, vivid scientific analogies, and key milestones.`,
          mode: 'comprehensive',
        }),
      });

      const data = await res.json();
      if (data.content) {
        setEditorMarkdown(prev => prev + '\n\n' + data.content);
        if (!editorSummary) {
          setEditorSummary(data.content.slice(0, 180) + '...');
        }
        setEditorNotice('✨ Chapter successfully drafted by UBT AI!');
      }
    } catch (e) {
      console.warn('AI assistance fallback', e);
      setEditorMarkdown(
        prev =>
          prev +
          `\n\n## Cosmic Laws & Principles\nThe physics governing "${editorTitle || 'this system'}" is rooted in general relativity, thermodynamics, and quantum mechanical fluctuations. Observations show consistent spectral signatures across multiple wavelength bands.`
      );
      setEditorNotice('Appended chapter using local astrophysical engine.');
    } finally {
      setIsAiGenerating(false);
      setTimeout(() => setEditorNotice(null), 3000);
    }
  };

  // Download e-book as markdown
  const handleDownloadMarkdown = (book: LibraryEBook, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const blob = new Blob([book.markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${book.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export full library as JSON
  const handleExportFullLibrary = () => {
    const blob = new Blob([JSON.stringify(ebooks, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ubt-digital-library-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Text to speech narration toggle
  const handleToggleSpeak = () => {
    if (!window.speechSynthesis || !activeEBook) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = activeEBook.markdownContent
      .replace(/[#*`_>$\-\[\]]/g, '')
      .replace(/https?:\/\/\S+/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Render markdown content to formatted HTML elements
  const renderSimpleMarkdown = (md: string) => {
    const lines = md.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];

    lines.forEach((line, index) => {
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${index}`}
              className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-cyan-300 font-mono text-xs overflow-x-auto my-3"
            >
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      if (line.startsWith('# ')) {
        elements.push(
          <h1
            key={index}
            className="text-2xl md:text-3xl font-extrabold font-display text-white mt-6 mb-3 border-b border-gray-800 pb-2"
          >
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2
            key={index}
            className="text-xl md:text-2xl font-bold font-display text-cyan-200 mt-5 mb-2.5 flex items-center gap-2"
          >
            <span className="w-1.5 h-5 rounded-full bg-cyan-400 inline-block" />
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-base md:text-lg font-bold text-gray-100 mt-4 mb-2">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote
            key={index}
            className="p-3.5 my-3 rounded-xl bg-cyan-950/30 border-l-4 border-cyan-400 text-cyan-100/90 italic text-sm"
          >
            {line.replace('> ', '')}
          </blockquote>
        );
      } else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        elements.push(
          <li key={index} className="ml-5 list-disc text-sm text-gray-300 my-1 leading-relaxed">
            {line.trim().replace(/^[-*]\s+/, '')}
          </li>
        );
      } else if (line.trim() === '---') {
        elements.push(<hr key={index} className="my-5 border-gray-800" />);
      } else if (line.trim()) {
        elements.push(
          <p key={index} className="text-sm text-gray-300 leading-relaxed my-2">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner & Stats Overview */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-950/70 via-indigo-950/70 to-purple-950/70 border border-cyan-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/60 flex items-center gap-1.5">
              <LibraryIcon className="w-3.5 h-3.5" />
              UBT Digital Library &amp; Studio
            </span>
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800/60">
              100% Free &amp; Open Access
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display text-white">
            Space &amp; Universe Digital E-Book Library
          </h2>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            Browse our curated space library, read comprehensive astrophysical e-books, or author, edit, and save your own publications using the built-in Markdown editor and local store.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {viewMode !== 'browse' && (
            <button
              onClick={() => {
                if (window.speechSynthesis) window.speechSynthesis.cancel();
                setIsSpeaking(false);
                setViewMode('browse');
              }}
              className="px-4 py-2.5 rounded-2xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-xs font-semibold text-gray-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Browse All Books</span>
            </button>
          )}

          <button
            onClick={handleStartCreate}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-950 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New E-Book</span>
          </button>
        </div>
      </div>

      {/* ================= VIEW 1: BROWSE LIBRARY ================= */}
      {viewMode === 'browse' && (
        <div className="space-y-6">
          {/* Controls Bar: Search, Category Filters, Stats */}
          <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search titles, authors, concepts, tags..."
                className="w-full pl-9 pr-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none text-xs">
              {['All', 'Astrophysics', 'Cosmology', 'Quantum', 'Exoplanets', 'Spaceflight'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'bg-gray-800/80 text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Filter Toggles & Actions */}
            <div className="flex items-center gap-2 shrink-0 text-xs">
              <button
                onClick={() => setOnlyFavorites(!onlyFavorites)}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  onlyFavorites
                    ? 'bg-amber-950/80 border-amber-500/50 text-amber-300 font-bold'
                    : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Favorites</span>
              </button>

              <button
                onClick={() => setOnlyUserCreated(!onlyUserCreated)}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  onlyUserCreated
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 font-bold'
                    : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>My Created</span>
              </button>

              <button
                onClick={handleExportFullLibrary}
                className="p-2 rounded-xl bg-gray-950 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white transition-colors"
                title="Backup full library collection as JSON"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* E-Books Grid Display */}
          {filteredEBooks.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-gray-900/40 rounded-3xl border border-gray-800">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto" />
              <h3 className="text-base font-bold text-gray-300">No space e-books found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                No e-books match your search filter. Create your own space e-book using the markdown editor above!
              </p>
              <button
                onClick={handleStartCreate}
                className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                Create an E-Book
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEBooks.map(book => (
                <div
                  key={book.id}
                  onClick={() => {
                    setActiveEBookId(book.id);
                    setViewMode('read');
                  }}
                  className="rounded-3xl bg-gray-900/90 border border-gray-800 hover:border-cyan-500/50 shadow-xl hover:shadow-cyan-950/20 transition-all cursor-pointer flex flex-col justify-between overflow-hidden group relative"
                >
                  {/* Decorative Book Cover Banner */}
                  <div className={`h-36 p-5 bg-gradient-to-br ${book.coverGradient} relative flex flex-col justify-between text-white overflow-hidden`}>
                    <div className="flex items-center justify-between z-10">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-black/40 backdrop-blur-md text-white border border-white/20 font-bold">
                        {book.category}
                      </span>
                      <button
                        onClick={(e) => handleToggleFavorite(book.id, e)}
                        className="p-1.5 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 transition-colors text-amber-300"
                        title={book.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Star className={`w-3.5 h-3.5 ${book.isFavorite ? 'fill-amber-400' : ''}`} />
                      </button>
                    </div>

                    <div className="z-10">
                      <span className="text-[10px] font-mono text-cyan-200 block">
                        ~{book.readingTimeMin} min read • {book.wordCount} words
                      </span>
                      <h3 className="text-base font-extrabold font-display leading-snug line-clamp-2">
                        {book.title}
                      </h3>
                    </div>

                    {/* Background subtle star pattern overlay */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/50 pointer-events-none" />
                  </div>

                  {/* Book Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 font-mono flex items-center gap-1.5">
                        <User className="w-3 h-3 text-cyan-400" />
                        <span>By {book.author}</span>
                      </p>
                      <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                        {book.summary}
                      </p>
                    </div>

                    {/* Tags */}
                    {book.tags && book.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {book.tags.slice(0, 3).map((t, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-gray-950 border border-gray-800 text-gray-400"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bottom Action Buttons */}
                    <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                      <span className="text-xs text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Read Book</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>

                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleEditBook(book, e)}
                          className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                          title="Edit Markdown"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDownloadMarkdown(book, e)}
                          className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                          title="Export Markdown"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteBook(book.id, e)}
                          className="p-1.5 rounded-lg bg-gray-800 hover:bg-rose-950 text-gray-400 hover:text-rose-400 transition-colors"
                          title="Delete E-Book"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= VIEW 2: MARKDOWN READER ================= */}
      {viewMode === 'read' && activeEBook && (
        <div className="w-full bg-gray-950 rounded-3xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col space-y-6">
          {/* Reader Top Bar */}
          <div className="p-4 md:p-6 bg-gray-900/90 border-b border-gray-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (window.speechSynthesis) window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                  setViewMode('browse');
                }}
                className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
                title="Return to library shelf"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                  {activeEBook.category} • ~{activeEBook.readingTimeMin} min read
                </span>
                <h2 className="text-base md:text-lg font-bold font-display text-white line-clamp-1">
                  {activeEBook.title}
                </h2>
              </div>
            </div>

            {/* Reading Controls: Font Size, Theme, Speech, Edit */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleSpeak}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isSpeaking
                    ? 'bg-rose-950/80 border-rose-500/60 text-rose-300'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white'
                }`}
                title={isSpeaking ? 'Stop narration' : 'Read aloud with speech synthesis'}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{isSpeaking ? 'Stop Voice' : 'Listen'}</span>
              </button>

              <div className="flex items-center bg-gray-950 border border-gray-800 rounded-xl p-1 text-xs">
                {(['sm', 'base', 'lg'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => setReaderFontSize(size)}
                    className={`px-2 py-0.5 rounded-lg capitalize transition-colors ${
                      readerFontSize === size
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {size === 'sm' ? 'A-' : size === 'base' ? 'A' : 'A+'}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleEditBook(activeEBook)}
                className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-cyan-300 border border-gray-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Markdown</span>
              </button>

              <button
                onClick={() => handleDownloadMarkdown(activeEBook)}
                className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 transition-colors"
                title="Download as Markdown"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Reader Content Sheet */}
          <div className="max-w-4xl mx-auto w-full px-6 md:px-12 pb-16 space-y-6">
            <div className={`p-6 rounded-3xl bg-gradient-to-r ${activeEBook.coverGradient} border border-cyan-500/30 text-white space-y-2`}>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-cyan-300 border border-cyan-400/30 font-bold">
                  {activeEBook.category}
                </span>
                <span>•</span>
                <span className="text-gray-200">Author: {activeEBook.author}</span>
                <span>•</span>
                <span className="text-gray-300">{activeEBook.createdAt}</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold font-display tracking-tight">
                {activeEBook.title}
              </h1>
              <p className="text-sm md:text-base text-cyan-100/90 font-normal">
                {activeEBook.subtitle}
              </p>
            </div>

            {/* Formatted Markdown Body */}
            <div
              className={`prose prose-invert max-w-none ${
                readerFontSize === 'sm'
                  ? 'text-xs'
                  : readerFontSize === 'lg'
                  ? 'text-base'
                  : readerFontSize === 'xl'
                  ? 'text-lg'
                  : 'text-sm'
              }`}
            >
              {renderSimpleMarkdown(activeEBook.markdownContent)}
            </div>

            {/* AI Q&A Trigger footer */}
            {onAskAi && (
              <div className="pt-8 mt-12 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gray-900 border border-gray-800">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">
                    Have a question about this e-book?
                  </h4>
                  <p className="text-xs text-gray-400">
                    Ask UBT AI for simple explanations, math derivations, or cosmological context.
                  </p>
                </div>
                <button
                  onClick={() => onAskAi(activeEBook.title)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask UBT AI</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= VIEW 3: SIMPLE MARKDOWN EDITOR ================= */}
      {viewMode === 'editor' && (
        <div className="w-full bg-gray-900/95 border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-5 animate-in fade-in duration-300">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-800 pb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('browse')}
                className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                title="Back to library"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-cyan-400" />
                  <span>{editorId ? 'Edit Space E-Book' : 'Author New Space E-Book'}</span>
                </h2>
                <p className="text-xs text-gray-400">
                  Write in Markdown with live preview and local state storage.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* View Layout Selector */}
              <div className="hidden sm:flex items-center bg-gray-950 p-1 rounded-xl border border-gray-800 text-xs">
                <button
                  onClick={() => setEditorTab('split')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    editorTab === 'split' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Split View
                </button>
                <button
                  onClick={() => setEditorTab('write')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    editorTab === 'write' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Write Only
                </button>
                <button
                  onClick={() => setEditorTab('preview')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    editorTab === 'preview' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Preview Only
                </button>
              </div>

              {/* AI Co-Writer */}
              <button
                onClick={handleAiAssist}
                disabled={isAiGenerating}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAiGenerating ? 'Drafting...' : 'AI Co-Author'}</span>
              </button>

              {/* Save E-Book to Local Store */}
              <button
                onClick={handleSaveEditor}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-950 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Save to Library</span>
              </button>
            </div>
          </div>

          {/* Editor Notice Message */}
          {editorNotice && (
            <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-800 text-cyan-200 text-xs flex items-center gap-2 animate-in fade-in">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{editorNotice}</span>
            </div>
          )}

          {/* Metadata Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-gray-950/60 p-4 rounded-2xl border border-gray-800">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-300">Title</label>
              <input
                type="text"
                value={editorTitle}
                onChange={(e) => setEditorTitle(e.target.value)}
                placeholder="e.g. Living on a Magnetar"
                className="w-full px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-300">Subtitle</label>
              <input
                type="text"
                value={editorSubtitle}
                onChange={(e) => setEditorSubtitle(e.target.value)}
                placeholder="e.g. Extreme Magnetic Geometries"
                className="w-full px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-300">Author</label>
              <input
                type="text"
                value={editorAuthor}
                onChange={(e) => setEditorAuthor(e.target.value)}
                placeholder="Author Name"
                className="w-full px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-300">Category</label>
              <select
                value={editorCategory}
                onChange={(e) => setEditorCategory(e.target.value as any)}
                className="w-full px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-xs text-white focus:outline-none"
              >
                <option value="Astrophysics">Astrophysics</option>
                <option value="Cosmology">Cosmology</option>
                <option value="Quantum">Quantum</option>
                <option value="Exoplanets">Exoplanets</option>
                <option value="Spaceflight">Spaceflight</option>
                <option value="Sci-Fi">Sci-Fi &amp; Futures</option>
              </select>
            </div>
          </div>

          {/* Simple Markdown Quick Toolbar */}
          <div className="flex flex-wrap items-center gap-1.5 p-2 bg-gray-950 rounded-xl border border-gray-800 text-xs">
            <button
              onClick={() => insertMarkdown('# ', '', 'Heading 1')}
              className="px-2 py-1 rounded bg-gray-900 hover:bg-gray-800 text-gray-300 font-bold"
              title="Heading 1"
            >
              H1
            </button>
            <button
              onClick={() => insertMarkdown('## ', '', 'Heading 2')}
              className="px-2 py-1 rounded bg-gray-900 hover:bg-gray-800 text-gray-300 font-bold"
              title="Heading 2"
            >
              H2
            </button>
            <button
              onClick={() => insertMarkdown('**', '**', 'bold text')}
              className="p-1.5 rounded bg-gray-900 hover:bg-gray-800 text-gray-300"
              title="Bold"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => insertMarkdown('*', '*', 'italic text')}
              className="p-1.5 rounded bg-gray-900 hover:bg-gray-800 text-gray-300"
              title="Italic"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => insertMarkdown('> ', '', 'Cosmic insight quote')}
              className="p-1.5 rounded bg-gray-900 hover:bg-gray-800 text-gray-300"
              title="Blockquote"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => insertMarkdown('- ', '', 'Orbital point')}
              className="p-1.5 rounded bg-gray-900 hover:bg-gray-800 text-gray-300"
              title="Bullet list"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => insertMarkdown('```\n', '\n```', 'E = m * c^2')}
              className="p-1.5 rounded bg-gray-900 hover:bg-gray-800 text-gray-300"
              title="Code / Equation block"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => insertMarkdown('\n---\n')}
              className="px-2 py-1 rounded bg-gray-900 hover:bg-gray-800 text-gray-300 font-mono"
              title="Divider rule"
            >
              ---
            </button>

            <span className="text-gray-600 mx-1">|</span>

            {/* Quick Template Inserter */}
            <span className="text-[10px] font-mono text-gray-400">Templates:</span>
            <button
              onClick={() =>
                setEditorMarkdown(
                  prev =>
                    prev +
                    `\n\n## Planetary Classification & Orbital Dynamics\n- **Semi-Major Axis:** 1.4 AU\n- **Surface Gravity:** 0.88 g\n- **Atmospheric Composition:** 78% Nitrogen, 20% Oxygen, 2% Methane\n`
                )
              }
              className="text-[11px] px-2 py-0.5 rounded bg-gray-900 hover:bg-gray-850 text-cyan-400"
            >
              + Planetary Spec
            </button>
            <button
              onClick={() =>
                setEditorMarkdown(
                  prev =>
                    prev +
                    `\n\n## Relativistic Propulsion Mechanics\n- **Exhaust Velocity:** 0.15 c\n- **Mass Ratio:** 4.2\n- **Delta-V Required:** 45,000 km/s\n`
                )
              }
              className="text-[11px] px-2 py-0.5 rounded bg-gray-900 hover:bg-gray-850 text-purple-400"
            >
              + Propulsion Spec
            </button>
          </div>

          {/* Main Editor Split Pane */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[460px]">
            {/* Left: Raw Markdown Textarea */}
            {(editorTab === 'split' || editorTab === 'write') && (
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 px-1">
                  <span>Markdown Source</span>
                  <span>{editorMarkdown.split(/\s+/).filter(Boolean).length} words</span>
                </div>
                <textarea
                  ref={textareaRef}
                  value={editorMarkdown}
                  onChange={(e) => setEditorMarkdown(e.target.value)}
                  placeholder="Write your e-book in Markdown format here..."
                  className="flex-1 w-full p-4 bg-gray-950 border border-gray-800 rounded-2xl text-xs md:text-sm text-gray-100 font-mono leading-relaxed focus:outline-none focus:border-cyan-400 resize-none min-h-[420px]"
                />
              </div>
            )}

            {/* Right: Live Formatted Markdown Preview */}
            {(editorTab === 'split' || editorTab === 'preview') && (
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 px-1">
                  <span>Live Rendered Preview</span>
                  <span>~{Math.max(1, Math.round(editorMarkdown.split(/\s+/).filter(Boolean).length / 180))} min read</span>
                </div>
                <div className="flex-1 w-full p-5 bg-gray-950 border border-gray-800 rounded-2xl text-xs md:text-sm text-gray-200 overflow-y-auto max-h-[500px]">
                  {editorMarkdown.trim() ? (
                    renderSimpleMarkdown(editorMarkdown)
                  ) : (
                    <p className="text-gray-500 italic text-xs">
                      Live markdown preview will render here as you type...
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
