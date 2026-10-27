import React, { useState, useEffect } from 'react';
import { ENCYCLOPEDIA_ARTICLES } from '../data/spaceData';
import { EncyclopediaArticle } from '../types';
import {
  BookOpen,
  Search,
  Clock,
  Award,
  Sparkles,
  Orbit,
  ArrowRight,
  Share2,
  Compass,
  Layers,
  Plus,
  PenTool,
  Trash2,
  Download,
  CheckCircle2,
  User,
  Calendar,
  Sparkle
} from 'lucide-react';
import { EBookCreatorStudio } from './EBookCreatorStudio';

interface Props {
  initialArticleId?: string;
  onAskAi?: (topic: string) => void;
  onNavigateToTool?: (toolId: string) => void;
}

export const EncyclopediaViewer: React.FC<Props> = ({
  initialArticleId,
  onAskAi,
  onNavigateToTool,
}) => {
  // Load community e-books from localStorage
  const [communityArticles, setCommunityArticles] = useState<EncyclopediaArticle[]>(() => {
    try {
      const stored = localStorage.getItem('ubt_community_ebooks');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load community ebooks from storage', e);
    }
    return [];
  });

  const allArticles = [...communityArticles, ...ENCYCLOPEDIA_ARTICLES];

  const [selectedArticle, setSelectedArticle] = useState<EncyclopediaArticle>(() => {
    if (initialArticleId) {
      const match = allArticles.find(a => a.id === initialArticleId);
      if (match) return match;
    }
    return allArticles[0];
  });

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCreatorOpen, setIsCreatorOpen] = useState<boolean>(false);
  const [editingArticle, setEditingArticle] = useState<EncyclopediaArticle | null>(null);

  // Sync when initialArticleId changes
  useEffect(() => {
    if (initialArticleId) {
      const match = allArticles.find(a => a.id === initialArticleId);
      if (match) setSelectedArticle(match);
    }
  }, [initialArticleId]);

  const saveCommunityArticles = (articles: EncyclopediaArticle[]) => {
    setCommunityArticles(articles);
    try {
      localStorage.setItem('ubt_community_ebooks', JSON.stringify(articles));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  };

  const handlePublishNewEBook = (article: EncyclopediaArticle) => {
    // Check if replacing existing
    const exists = communityArticles.findIndex(a => a.id === article.id);
    let updated: EncyclopediaArticle[];
    if (exists >= 0) {
      updated = [...communityArticles];
      updated[exists] = article;
    } else {
      updated = [article, ...communityArticles];
    }
    saveCommunityArticles(updated);
    setSelectedArticle(article);
    setIsCreatorOpen(false);
    setEditingArticle(null);
  };

  const handleDeleteEBook = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this e-book from your library?')) return;
    const updated = communityArticles.filter(a => a.id !== id);
    saveCommunityArticles(updated);
    if (selectedArticle.id === id) {
      setSelectedArticle(allArticles.find(a => a.id !== id) || ENCYCLOPEDIA_ARTICLES[0]);
    }
  };

  const handleDownloadMarkdown = (article: EncyclopediaArticle) => {
    const md = `# ${article.title}
*${article.subtitle}*
**Author:** ${article.author || 'UBT Scholar'} | **Category:** ${article.category} | **Difficulty:** ${article.difficulty}
**Reading Time:** ~${article.readingTimeMin} min

---

## Overview
${article.summary}

${article.stats && article.stats.length > 0 ? `### Key Astrophysical Metrics\n${article.stats.map(s => `- **${s.label}:** ${s.value}`).join('\n')}\n` : ''}

${article.sections.map(s => `## ${s.heading}\n\n${s.content}\n`).join('\n')}

${article.trivia && article.trivia.length > 0 ? `### Cosmic Fun Facts\n${article.trivia.map(t => `- ${t}`).join('\n')}\n` : ''}

---
*Published on UBT (Universal E-books Technology) - 100% Free & Open Access Digital Library*
`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${article.id}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredArticles = allArticles.filter(art => {
    let matchesCat = true;
    if (filterCategory === 'community') {
      matchesCat = !!art.isUserCreated;
    } else if (filterCategory !== 'all') {
      matchesCat = art.category === filterCategory;
    }

    const matchesQuery =
      searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.author && art.author.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesQuery;
  });

  return (
    <div className="w-full space-y-6">
      {/* Top Banner with E-Book Creator Callout */}
      <div className="p-6 md:p-7 rounded-3xl bg-gradient-to-r from-blue-950/70 via-indigo-950/60 to-purple-950/70 border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/60 flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              UBT Universal E-Books Library
            </span>
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60">
              100% Free &amp; Open Access
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-display text-white">
            Space, Universe &amp; Astrophysics E-Book Archives
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Read comprehensive peer-reviewed deep-dives on the cosmos, or write and publish your own space and universe e-books freely with UBT AI co-author assistance.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingArticle(null);
            setIsCreatorOpen(!isCreatorOpen);
          }}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-xl shadow-cyan-950/60 transition-all shrink-0 cursor-pointer"
        >
          {isCreatorOpen ? (
            <>
              <BookOpen className="w-4 h-4" />
              <span>Back to Library Bookshelf</span>
            </>
          ) : (
            <>
              <PenTool className="w-4 h-4" />
              <span>+ Create &amp; Publish E-Book</span>
            </>
          )}
        </button>
      </div>

      {/* When Creator Studio is Open */}
      {isCreatorOpen ? (
        <EBookCreatorStudio
          onPublish={handlePublishNewEBook}
          onCancel={() => {
            setIsCreatorOpen(false);
            setEditingArticle(null);
          }}
          existingArticle={editingArticle}
        />
      ) : (
        /* ================= LIBRARY WORKSPACE ================= */
        <div className="w-full bg-gray-950 rounded-3xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[750px]">
          {/* Left Sidebar: Article Index & Category Filter */}
          <div className="w-full md:w-88 bg-gray-900/90 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col shrink-0">
            <div className="p-4 border-b border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold font-display uppercase tracking-wider text-white">
                    UBT Bookshelf ({allArticles.length})
                  </h3>
                </div>
                {communityArticles.length > 0 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                    {communityArticles.length} Community
                  </span>
                )}
              </div>

              {/* Search bar inside wiki index */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search titles, authors, concepts..."
                  className="w-full pl-8 pr-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Category Chips */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                {[
                  { id: 'all', label: 'All E-Books' },
                  { id: 'community', label: '🌟 Community Written' },
                  { id: 'theoretical', label: 'Multiverse & String' },
                  { id: 'astrophysics', label: 'Astrophysics' },
                  { id: 'astrobiology', label: 'Astrobiology' },
                  { id: 'quantum_physics', label: 'Quantum' },
                  { id: 'solar_system', label: 'Solar System' },
                  { id: 'spaceflight', label: 'Spaceflight' },
                  { id: 'cosmology', label: 'Cosmology' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setFilterCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                      filterCategory === cat.id
                        ? 'bg-blue-600 text-white font-semibold shadow-sm'
                        : 'bg-gray-800/80 text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Article List */}
            <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5 divide-y divide-gray-800/40">
              {filteredArticles.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <p className="text-xs text-gray-400">No e-books found matching your search.</p>
                  <button
                    onClick={() => {
                      setFilterCategory('all');
                      setSearchQuery('');
                    }}
                    className="text-xs text-cyan-400 hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                filteredArticles.map(art => {
                  const isSelected = selectedArticle.id === art.id;
                  return (
                    <button
                      key={art.id}
                      onClick={() => setSelectedArticle(art)}
                      className={`w-full p-3 rounded-2xl text-left transition-all flex flex-col gap-1.5 cursor-pointer relative group ${
                        isSelected
                          ? 'bg-cyan-950/80 border border-cyan-500/50 shadow-md'
                          : 'hover:bg-gray-850/60 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <div className="flex items-center gap-1.5">
                          {art.isUserCreated && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50 font-bold">
                              COMMUNITY
                            </span>
                          )}
                          <span className="uppercase text-cyan-400">
                            {art.category.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {art.readingTimeMin}m
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white leading-snug">{art.title}</h4>
                      {art.author && (
                        <span className="text-[10px] text-gray-400 font-mono">
                          By {art.author}
                        </span>
                      )}
                      <p className="text-[11px] text-gray-400 line-clamp-2 leading-normal">
                        {art.summary}
                      </p>

                      {/* User-created Quick Controls */}
                      {art.isUserCreated && (
                        <div className="pt-1 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingArticle(art);
                              setIsCreatorOpen(true);
                            }}
                            className="text-[10px] font-mono text-cyan-300 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteEBook(art.id, e)}
                            className="text-[10px] font-mono text-rose-400 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Content: Wikipedia / E-Book Reader Workspace */}
          <div className="flex-1 bg-gray-950 p-6 md:p-10 overflow-y-auto space-y-8">
            {/* Article Cover & Header */}
            <div className="border-b border-gray-800 pb-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono uppercase bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold">
                    {selectedArticle.category.replace('_', ' ')}
                  </span>
                  {selectedArticle.isUserCreated && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono uppercase bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Community Author Publication
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {selectedArticle.readingTimeMin} min read
                  </span>
                  <span>•</span>
                  <span className="text-amber-400 font-semibold">{selectedArticle.difficulty}</span>
                  <button
                    onClick={() => handleDownloadMarkdown(selectedArticle)}
                    className="ml-2 p-1.5 rounded-lg bg-gray-900 hover:bg-gray-850 text-gray-300 hover:text-white border border-gray-800 transition-colors"
                    title="Export E-Book as Markdown"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h1 className="text-2xl md:text-4xl font-extrabold font-display text-white leading-tight">
                  {selectedArticle.title}
                </h1>
                <p className="text-sm md:text-base text-gray-300 font-normal leading-relaxed mt-2">
                  {selectedArticle.subtitle}
                </p>
                {selectedArticle.author && (
                  <div className="flex items-center gap-3 mt-3 text-xs font-mono text-cyan-300">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      Author: {selectedArticle.author}
                    </span>
                    {selectedArticle.publishedDate && (
                      <span className="text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {selectedArticle.publishedDate}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Infobox / Key Facts Card */}
            {selectedArticle.stats && selectedArticle.stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-900/80 p-4 rounded-2xl border border-gray-800">
                {selectedArticle.stats.map((st, i) => (
                  <div key={i} className="p-2.5 bg-gray-950/60 rounded-xl border border-gray-800/80">
                    <span className="text-[10px] uppercase font-mono text-gray-400 block">{st.label}</span>
                    <span className="text-xs font-semibold text-cyan-300 font-mono block mt-0.5">
                      {st.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Article Summary Box */}
            <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 text-sm text-indigo-100 leading-relaxed space-y-1">
              <strong className="text-indigo-300 block text-xs font-mono uppercase tracking-wider">
                Executive Overview:
              </strong>
              <p>{selectedArticle.summary}</p>
            </div>

            {/* Interactive Tool Banner if article links to one */}
            {selectedArticle.interactiveToolRef && onNavigateToTool && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/40 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500 text-black">
                    <Orbit className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Interactive Universe Simulator Linked</h4>
                    <p className="text-xs text-cyan-200">
                      Launch the physical laboratory or sandbox connected to this e-book.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateToTool(selectedArticle.interactiveToolRef!)}
                  className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-cyan-950"
                >
                  <span>Launch Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Detailed Chapters / Sections */}
            <div className="space-y-6">
              {selectedArticle.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2.5">
                  <h3 className="text-xl font-bold font-display text-white border-b border-gray-800/80 pb-1.5 flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400">§ {idx + 1}</span>
                    {sec.heading}
                  </h3>
                  <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
                    {sec.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Historical Timeline if present */}
            {selectedArticle.timeline && selectedArticle.timeline.length > 0 && (
              <div className="space-y-3 bg-gray-900/60 p-5 rounded-2xl border border-gray-800">
                <h4 className="text-sm font-bold font-display uppercase tracking-wider text-amber-400">
                  Chronological Milestones
                </h4>
                <div className="space-y-2.5">
                  {selectedArticle.timeline.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs">
                      <span className="font-mono text-cyan-300 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40 shrink-0">
                        {item.year}
                      </span>
                      <span className="text-gray-300 leading-normal">{item.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trivia / Fun Facts */}
            {selectedArticle.trivia && selectedArticle.trivia.length > 0 && (
              <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-800/30 space-y-2">
                <h4 className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Cosmic Facts &amp; Insights
                </h4>
                <ul className="text-xs text-cyan-100/90 space-y-1.5 list-disc pl-5">
                  {selectedArticle.trivia.map((t, idx) => (
                    <li key={idx} className="leading-relaxed">{t}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Deep Dive AI Prompt Trigger */}
            {onAskAi && (
              <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">Have a question about this topic?</h4>
                  <p className="text-xs text-gray-400">
                    Ask UBT AI for an immediate conceptual breakdown, derivation, or historical perspective.
                  </p>
                </div>
                <button
                  onClick={() => onAskAi(selectedArticle.title)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs flex items-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-blue-950"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ask UBT AI About This</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
