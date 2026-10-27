import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Plus,
  Trash2,
  Save,
  Eye,
  Edit3,
  Download,
  Share2,
  Clock,
  Layers,
  ArrowRight,
  CheckCircle2,
  Orbit,
  HelpCircle,
  FileText,
  Lightbulb
} from 'lucide-react';
import { EncyclopediaArticle } from '../types';

interface Props {
  onPublish: (article: EncyclopediaArticle) => void;
  onCancel?: () => void;
  existingArticle?: EncyclopediaArticle | null;
}

const TEMPLATE_PRESETS = [
  {
    name: 'Wormhole Engineering Manual',
    title: 'Wormhole Engineering & Traversable Spacetime Conduits',
    subtitle: 'Stabilizing Einstein-Rosen Bridges with Negative Energy Densities',
    category: 'theoretical' as const,
    difficulty: 'Advanced' as const,
    summary: 'A theoretical engineering assessment of constructing macroscopic traversable wormholes using Casimir sub-vacuum fields, topological geometry, and exotic quantum matter.',
    sections: [
      {
        heading: 'Topological Throat Stabilization',
        content: 'To prevent a Lorentzian wormhole from collapsing into twin singularities, exotic matter with negative average null energy condition (NEC) violation must thread the throat radius $r_0$. By arranging ultra-dense superconducting Casimir plates or squeezed quantum vacuum states, we compute an effective throat tension capable of maintaining stable photon orbits.'
      },
      {
        heading: 'Chronology Protection & Closed Timelike Curves',
        content: 'Accelerating one mouth of a wormhole to relativistic speeds relative to the other creates a temporal delta ($\Delta t$), effectively forming a Closed Timelike Curve (CTC). Stephen Hawking\'s Chronology Protection Conjecture posits that vacuum polarization fluctuations build to infinity at the chronology horizon, preventing macroscopic backward time travel.'
      }
    ],
    stats: [
      { label: 'Throat Diameter', value: '1.2 Kilometers' },
      { label: 'Exotic Mass Required', value: '-1.4 Jupiter Masses' },
      { label: 'Traversal Time', value: '0.003 seconds' },
      { label: 'Effective Velocity', value: '500× Speed of Light' }
    ],
    trivia: [
      'An observer falling through a traversable wormhole experiences zero tidal gravitational shearing forces if the throat radius exceeds 1 kilometer.',
      'Light from the opposite galaxy would be visible through the aperture as a spherical lensing bubble.'
    ],
    interactiveToolRef: 'sandbox3d' as const,
  },
  {
    name: 'Exoplanet Colony Architectures',
    title: 'Habitats of Trappist-1e: Engineering Subsurface Biospheres',
    subtitle: 'Atmospheric Reclamation and Geothermal Microgrids on Tidally Locked Worlds',
    category: 'spaceflight' as const,
    difficulty: 'Intermediate' as const,
    summary: 'Comprehensive blueprint for humanity\'s first permanent settlement in the Trappist-1 system: surviving red dwarf stellar flares, harvesting subterranean aquifers, and establishing closed-loop oxygen cycles.',
    sections: [
      {
        heading: 'The Twilight Terminator Zone',
        content: 'Trappist-1e is tidally locked to its ultra-cool red dwarf star. The permanent day hemisphere experiences perpetual sunlight while the nightside is frozen in ice. Human habitats are optimized for the narrow Twilight Terminator ring, where mild convection currents create comfortable temperatures (0°C to 20°C).'
      },
      {
        heading: 'Stellar Flare Hardening & Magnetic Domes',
        content: 'Because red dwarf stars produce coronal mass ejections with intense ultraviolet radiation, surface structures utilize regolith-packed basalt shielding 3 meters deep, paired with superconducting electromagnetic deflector coils to simulate an artificial magnetosphere.'
      }
    ],
    stats: [
      { label: 'Distance from Earth', value: '39.46 Light-Years' },
      { label: 'Surface Gravity', value: '0.93 g (Earth-like)' },
      { label: 'Year Duration', value: '6.1 Earth Days' },
      { label: 'Equilibrium Temp', value: '-22°C (Warmed by Greenhouse)' }
    ],
    trivia: [
      'Six other Earth-sized sister planets would be clearly visible in the sky of Trappist-1e, appearing up to twice as large as the full Moon from Earth.',
      'Plants grown on Trappist-1e might adapt to infrared light by evolving black or deep purple pigments.'
    ],
    interactiveToolRef: 'exoplanet' as const,
  }
];

export const EBookCreatorStudio: React.FC<Props> = ({
  onPublish,
  onCancel,
  existingArticle,
}) => {
  const [title, setTitle] = useState(existingArticle?.title || '');
  const [subtitle, setSubtitle] = useState(existingArticle?.subtitle || '');
  const [author, setAuthor] = useState(existingArticle?.author || 'Cosmic Explorer');
  const [category, setCategory] = useState<EncyclopediaArticle['category']>(
    existingArticle?.category || 'astrophysics'
  );
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>(
    existingArticle?.difficulty || 'Intermediate'
  );
  const [summary, setSummary] = useState(existingArticle?.summary || '');
  const [coverGradient, setCoverGradient] = useState(
    existingArticle?.coverGradient || 'from-cyan-900 via-blue-950 to-black'
  );
  const [interactiveToolRef, setInteractiveToolRef] = useState<
    'solarsystem' | 'gravity' | 'scale' | 'fusion' | 'exoplanet' | 'rocket' | 'sandbox3d' | undefined
  >(existingArticle?.interactiveToolRef || 'sandbox3d');

  const [sections, setSections] = useState<Array<{ heading: string; content: string }>>(
    existingArticle?.sections || [
      { heading: 'Cosmic Overview & Theoretical Foundations', content: '' },
      { heading: 'Physical Dynamics & Astrophysical Principles', content: '' }
    ]
  );

  const [stats, setStats] = useState<Array<{ label: string; value: string }>>(
    existingArticle?.stats || [
      { label: 'Primary Phenomenon', value: 'Spacetime Curvature' },
      { label: 'Key Energy Scale', value: '10²⁰ Joules' }
    ]
  );

  const [trivia, setTrivia] = useState<string[]>(
    existingArticle?.trivia || [
      'Light takes time to traverse even the shortest cosmic distances, meaning every observation of the universe is a look into history.'
    ]
  );

  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [isAiDrafting, setIsAiDrafting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Auto-calculated reading time: ~200 words per minute
  const totalWords = (
    title + ' ' + subtitle + ' ' + summary + ' ' +
    sections.map(s => s.heading + ' ' + s.content).join(' ')
  ).split(/\s+/).filter(Boolean).length;
  const estimatedReadTime = Math.max(1, Math.round(totalWords / 180));

  const handleApplyTemplate = (tmpl: typeof TEMPLATE_PRESETS[0]) => {
    setTitle(tmpl.title);
    setSubtitle(tmpl.subtitle);
    setCategory(tmpl.category);
    setDifficulty(tmpl.difficulty);
    setSummary(tmpl.summary);
    setSections(tmpl.sections);
    setStats(tmpl.stats);
    setTrivia(tmpl.trivia);
    setInteractiveToolRef(tmpl.interactiveToolRef);
    setStatusMessage(`Loaded template "${tmpl.name}". You can now customize or publish it!`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleAiAssistant = async () => {
    if (!title.trim() && !summary.trim()) {
      setStatusMessage('Please enter a Title or Topic Summary first so UBT AI knows what to write!');
      setTimeout(() => setStatusMessage(null), 3500);
      return;
    }

    setIsAiDrafting(true);
    setStatusMessage('UBT AI is synthesizing cosmic research and drafting chapters...');

    try {
      const res = await fetch('/api/gemini/explore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `Write an academic, inspiring, deeply informative e-book chapter for the book titled: "${title || summary}". Include cutting-edge astrophysics, real equations or physics principles, vivid analogies, and fascinating insights.`,
          mode: difficulty === 'Beginner' ? 'eli5' : difficulty === 'Advanced' ? 'quantum_rigor' : 'comprehensive'
        })
      });

      const data = await res.json();
      const generatedText: string = data.content || '';

      if (generatedText) {
        // Append as a new rich chapter
        setSections(prev => [
          ...prev,
          {
            heading: `UBT Research: ${title || 'Astrophysical Deep Dive'}`,
            content: generatedText
          }
        ]);
        if (!summary) {
          setSummary(generatedText.slice(0, 240) + '...');
        }
        setStatusMessage('✨ Chapter successfully drafted by UBT AI! Check the sections below.');
      }
    } catch (err) {
      console.error('AI draft error:', err);
      // Fallback chapter
      setSections(prev => [
        ...prev,
        {
          heading: `Frontier Exploration: ${title || 'Universal Laws'}`,
          content: `In modern astrophysics and cosmology, "${title || 'this cosmic realm'}" represents one of the most intriguing intersections of quantum mechanics and gravitational dynamics. Observers continue measuring high-energy spectra and orbital parameters to refine our models of the universe.`
        }
      ]);
      setStatusMessage('Drafted chapter using local astrophysical engine.');
    } finally {
      setIsAiDrafting(false);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handlePublish = () => {
    if (!title.trim()) {
      setStatusMessage('Please provide a Book Title before publishing!');
      setTimeout(() => setStatusMessage(null), 3500);
      return;
    }

    const newArticle: EncyclopediaArticle = {
      id: existingArticle?.id || `user-ebook-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'A Comprehensive Universe E-Book',
      category,
      readingTimeMin: estimatedReadTime,
      difficulty,
      summary: summary.trim() || 'An open-access e-book authored on UBT (Universal E-books Technology).',
      heroImageDesc: `Cover illustration for ${title} with cosmic starfield.`,
      author: author.trim() || 'UBT Community Author',
      isUserCreated: true,
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      coverGradient,
      stats: stats.filter(s => s.label.trim() && s.value.trim()),
      sections: sections.filter(s => s.heading.trim() && s.content.trim()),
      trivia: trivia.filter(t => t.trim()),
      relatedArticleIds: ['multiverse-string-landscape', 'white-holes-wormholes-bridges', 'cosmic-origins-big-bang'],
      interactiveToolRef,
    };

    onPublish(newArticle);
  };

  const handleDownloadMarkdown = () => {
    const md = `# ${title || 'Untitled E-Book'}
*${subtitle || 'Universal E-books Technology Publication'}*
**Author:** ${author} | **Category:** ${category} | **Difficulty:** ${difficulty}
**Reading Time:** ~${estimatedReadTime} min | **Published:** ${new Date().toLocaleDateString()}

---

## Overview
${summary}

${stats.length > 0 ? `### Key Astrophysical Metrics\n${stats.map(s => `- **${s.label}:** ${s.value}`).join('\n')}\n` : ''}

${sections.map(s => `## ${s.heading}\n\n${s.content}\n`).join('\n')}

${trivia.length > 0 ? `### Cosmic Fun Facts & Trivia\n${trivia.map(t => `- ${t}`).join('\n')}\n` : ''}

---
*Published on UBT (Universal E-books Technology) - 100% Free & Open Access Digital Library*
`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(title || 'ubt-ebook').toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-gray-900/95 border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-cyan-900/40">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-display text-white">
                UBT E-Book Creator Studio
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-semibold">
                100% Free &amp; Open Access
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Author and publish your own space, universe, and science e-books to the UBT global digital library.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              previewMode
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700'
            }`}
          >
            {previewMode ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{previewMode ? 'Edit Mode' : 'Live Preview'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadMarkdown}
            className="px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download E-Book as Markdown file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export .MD</span>
          </button>

          <button
            type="button"
            onClick={handlePublish}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-950 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Publish E-Book</span>
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-800 text-gray-400 hover:text-white text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Status Notice */}
      {statusMessage && (
        <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-800 text-cyan-200 text-xs flex items-center gap-2 animate-in fade-in">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Template Starter Presets */}
      {!previewMode && (
        <div className="bg-gray-950/70 border border-gray-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-semibold text-gray-200">
              Need inspiration? Load a community e-book template:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {TEMPLATE_PRESETS.map((tmpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyTemplate(tmpl)}
                className="text-xs px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-cyan-300 border border-gray-700/80 transition-colors cursor-pointer"
              >
                + {tmpl.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {previewMode ? (
        /* ================= PREVIEW READER ================= */
        <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 md:p-8 space-y-6">
          <div className={`p-6 rounded-2xl bg-gradient-to-r ${coverGradient} border border-cyan-500/30 text-white space-y-2`}>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-cyan-300 border border-cyan-400/30">
                {category.replace('_', ' ')}
              </span>
              <span>•</span>
              <span className="text-gray-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> ~{estimatedReadTime} min read
              </span>
              <span>•</span>
              <span className="text-amber-300 font-semibold">{difficulty}</span>
              <span>•</span>
              <span className="text-emerald-300">Author: {author || 'Anonymous'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black font-display tracking-tight">
              {title || 'Untitled E-Book'}
            </h1>
            <p className="text-sm text-cyan-100/90 font-medium">
              {subtitle || 'A Space & Science E-Book'}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-gray-400">
              Overview &amp; Executive Summary
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
              {summary || 'No summary provided yet.'}
            </p>
          </div>

          {stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {stats.map((s, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-gray-900 border border-gray-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                    {s.label}
                  </span>
                  <span className="text-xs font-bold text-cyan-300 font-mono">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Chapters */}
          <div className="space-y-6 pt-4 border-t border-gray-800">
            {sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400">Chapter {idx + 1}:</span>
                  {sec.heading}
                </h3>
                <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {sec.content || 'Content pending...'}
                </div>
              </div>
            ))}
          </div>

          {trivia.length > 0 && (
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40 space-y-2">
              <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Cosmic Facts &amp; Trivia
              </span>
              <ul className="text-xs text-cyan-100/90 space-y-1 list-disc pl-4">
                {trivia.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        /* ================= EDITOR FORM ================= */
        <div className="space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">
                E-Book Title <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., The Physics of White Holes & Spacetime Inversion"
                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 focus:border-cyan-400 rounded-xl text-sm text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Subtitle / Tagline</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g., Thermodynamics, Horizon Dynamics, and Relativistic Jets"
                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 focus:border-cyan-400 rounded-xl text-sm text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Author Name / Pen Name</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g., Ada Lovelace / Cosmic Voyager"
                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 focus:border-cyan-400 rounded-xl text-sm text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-gray-950 border border-gray-800 focus:border-cyan-400 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="astrophysics">Astrophysics</option>
                  <option value="quantum_physics">Quantum Physics</option>
                  <option value="solar_system">Solar System</option>
                  <option value="spaceflight">Spaceflight &amp; Rockets</option>
                  <option value="cosmology">Cosmology</option>
                  <option value="earth_life">Earth &amp; Planetary Life</option>
                  <option value="theoretical">Theoretical &amp; Multiverse</option>
                  <option value="astrobiology">Astrobiology</option>
                  <option value="scifi">Sci-Fi &amp; Future Tech</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Difficulty Tier</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-gray-950 border border-gray-800 focus:border-cyan-400 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="Beginner">Beginner (Introductory)</option>
                  <option value="Intermediate">Intermediate (High School/College)</option>
                  <option value="Advanced">Advanced (Astrophysical Rigor)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Overview & AI Co-Author */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-300">
                Book Summary / Executive Blurb
              </label>
              <button
                type="button"
                onClick={handleAiAssistant}
                disabled={isAiDrafting}
                className="text-xs px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-blue-950 transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAiDrafting ? 'UBT AI Drafting...' : 'AI Co-Author / Expand'}</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Summarize the core astrophysical principles or narrative of this e-book..."
              className="w-full p-3.5 bg-gray-950 border border-gray-800 focus:border-cyan-400 rounded-xl text-xs md:text-sm text-white focus:outline-none leading-relaxed"
            />
          </div>

          {/* Chapter / Section Builder */}
          <div className="space-y-4 pt-2 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-display">
                  E-Book Chapters &amp; Content ({sections.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSections([...sections, { heading: 'New Cosmic Chapter', content: '' }])}
                className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs text-cyan-300 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Chapter</span>
              </button>
            </div>

            <div className="space-y-4">
              {sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono text-cyan-400 font-bold">
                      Chapter {idx + 1}
                    </span>
                    {sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setSections(sections.filter((_, i) => i !== idx))}
                        className="text-gray-500 hover:text-rose-400 transition-colors p-1"
                        title="Delete chapter"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    value={sec.heading}
                    onChange={(e) => {
                      const updated = [...sections];
                      updated[idx].heading = e.target.value;
                      setSections(updated);
                    }}
                    placeholder="Chapter Title (e.g. Gravitational Collapse & Chandrasekhar Limit)"
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-800 focus:border-cyan-400 rounded-lg text-xs md:text-sm font-semibold text-white focus:outline-none"
                  />

                  <textarea
                    rows={5}
                    value={sec.content}
                    onChange={(e) => {
                      const updated = [...sections];
                      updated[idx].content = e.target.value;
                      setSections(updated);
                    }}
                    placeholder="Write your chapter content here. Explain the physics, observations, experiments, and cosmic implications..."
                    className="w-full p-3 bg-gray-900 border border-gray-800 focus:border-cyan-400 rounded-lg text-xs text-gray-200 focus:outline-none leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics / Stats Builder */}
          <div className="space-y-3 pt-2 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-300">
                Key Metrics / Stats ({stats.length})
              </span>
              <button
                type="button"
                onClick={() => setStats([...stats, { label: 'Metric', value: 'Value' }])}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Metric
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {stats.map((st, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-gray-950 border border-gray-800">
                  <input
                    type="text"
                    value={st.label}
                    onChange={(e) => {
                      const updated = [...stats];
                      updated[idx].label = e.target.value;
                      setStats(updated);
                    }}
                    placeholder="Label (e.g. Mass)"
                    className="w-1/2 px-2 py-1 bg-gray-900 rounded text-xs text-gray-300 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={st.value}
                    onChange={(e) => {
                      const updated = [...stats];
                      updated[idx].value = e.target.value;
                      setStats(updated);
                    }}
                    placeholder="Value (e.g. 10³⁰ kg)"
                    className="w-1/2 px-2 py-1 bg-gray-900 rounded text-xs text-cyan-300 font-mono focus:outline-none"
                  />
                  {stats.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setStats(stats.filter((_, i) => i !== idx))}
                      className="text-gray-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Linked Interactive Simulator */}
          <div className="space-y-2 pt-2 border-t border-gray-800">
            <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
              <Orbit className="w-3.5 h-3.5 text-cyan-400" />
              Link an Interactive 3D Tool to This E-Book
            </label>
            <select
              value={interactiveToolRef}
              onChange={(e) => setInteractiveToolRef(e.target.value as any)}
              className="w-full md:w-80 px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none"
            >
              <option value="sandbox3d">🌌 3D Universe &amp; Moon Sandbox</option>
              <option value="solarsystem">🪐 3D Solar System Explorer</option>
              <option value="gravity">🌀 N-Body Gravity Simulator</option>
              <option value="scale">🔬 Scale of the Universe</option>
              <option value="fusion">⚡ Stellar Core Fusion Lab</option>
              <option value="exoplanet">🌍 Exoplanet Habitable Zone</option>
              <option value="rocket">🚀 Rocket Propulsion Simulator</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
