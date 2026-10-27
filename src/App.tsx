import React, { useState } from 'react';
import { TabType, CelestialBody } from './types';
import { CosmicSearchAi } from './components/CosmicSearchAi';
import { SpaceAiChatbot } from './components/SpaceAiChatbot';
import { EncyclopediaViewer } from './components/EncyclopediaViewer';
import { SolarSystem3DExplorer } from './components/SolarSystem3DExplorer';
import { SolarSystemSimulator } from './components/SolarSystemSimulator';
import { GravitySandbox } from './components/GravitySandbox';
import { ScaleOfUniverse } from './components/ScaleOfUniverse';
import { CosmicFusionLab } from './components/CosmicFusionLab';
import { ExoplanetHabitability } from './components/ExoplanetHabitability';
import { RocketTrajectorySimulator } from './components/RocketTrajectorySimulator';
import { UniverseSandbox3D } from './components/UniverseSandbox3D';
import { LunarLanderGame } from './components/games/LunarLanderGame';
import { CosmicTriviaArena } from './components/games/CosmicTriviaArena';
import { StellarAlchemyGame } from './components/games/StellarAlchemyGame';
import { TodayInSpace } from './components/TodayInSpace';
import { DigitalLibrary } from './components/DigitalLibrary';

import {
  Search,
  Bot,
  BookOpen,
  Orbit,
  FlaskConical,
  Gamepad2,
  Calendar,
  Sparkles,
  Compass,
  Layers,
  Atom,
  Flame,
  Rocket,
  ShieldCheck,
  ChevronRight,
  MessageSquare,
  Trophy,
  Library as LibraryIcon,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('search');
  const [activeLabTool, setActiveLabTool] = useState<'sandbox3d' | 'gravity' | 'scale' | 'fusion' | 'exoplanet' | 'rocket'>('sandbox3d');
  const [activeGame, setActiveGame] = useState<'trivia' | 'lander' | 'alchemy'>('trivia');
  const [aiSearchQuery, setAiSearchQuery] = useState<string>('');
  const [selectedWikiArticleId, setSelectedWikiArticleId] = useState<string>('black-holes-spacetime');
  const [planetariumMode, setPlanetariumMode] = useState<'3d' | '2d'>('3d');

  // Cross-navigation handlers
  const handleAskAi = (topic: string) => {
    setAiSearchQuery(topic);
    setActiveTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToTool = (toolId: string) => {
    if (toolId === 'solarsystem') {
      setActiveTab('solarsystem');
    } else if (toolId === 'sandbox3d') {
      setActiveTab('tools');
      setActiveLabTool('sandbox3d');
    } else if (toolId === 'lander' || toolId === 'trivia' || toolId === 'alchemy') {
      setActiveTab('games');
      setActiveGame(toolId as any);
    } else {
      setActiveTab('tools');
      setActiveLabTool(toolId as any);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToArticle = (articleId: string) => {
    setSelectedWikiArticleId(articleId);
    setActiveTab('encyclopedia');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Cosmic Navigation Header */}
      <header className="sticky top-0 z-50 bg-gray-950/85 backdrop-blur-xl border-b border-gray-800/80 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('search')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all">
              <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
                <Orbit className="w-5 h-5 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black font-display tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  UBT
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold">
                  Universal E-books Technology
                </span>
              </div>
              <p className="text-[9px] text-gray-400 font-mono tracking-wider">
                SPACE &amp; SCIENCE DIGITAL LIBRARY
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-gray-900/90 border border-gray-800/90 p-1 rounded-2xl text-xs font-medium">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'search'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            >
              <Bot className="w-4 h-4 text-cyan-300" />
              <span>AI Chatbot</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            >
              <LibraryIcon className="w-4 h-4 text-emerald-400" />
              <span>Digital Library</span>
            </button>

            <button
              onClick={() => setActiveTab('encyclopedia')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'encyclopedia'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Encyclopedia</span>
            </button>

            <button
              onClick={() => setActiveTab('solarsystem')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'solarsystem'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            >
              <Orbit className="w-4 h-4" />
              <span>3D Planetarium</span>
            </button>

            <button
              onClick={() => setActiveTab('tools')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'tools'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>Interactive Labs</span>
            </button>

            <button
              onClick={() => setActiveTab('games')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'games'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Trivia &amp; Games</span>
            </button>

            <button
              onClick={() => setActiveTab('today')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'today'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Today in Space</span>
            </button>
          </nav>

          {/* Right Status Badge */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Free &amp; Open Access</span>
            </div>
          </div>
        </div>

        {/* Mobile Tab Scroll Bar */}
        <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto pt-2.5 pb-1 scrollbar-none text-xs">
          {[
            { id: 'search', label: 'Search', icon: Search },
            { id: 'library', label: 'Library & E-Books', icon: LibraryIcon },
            { id: 'chat', label: 'AI Chat', icon: Bot },
            { id: 'encyclopedia', label: 'Encyclopedia', icon: BookOpen },
            { id: 'solarsystem', label: '3D Orbit', icon: Orbit },
            { id: 'tools', label: 'Labs', icon: FlaskConical },
            { id: 'games', label: 'Trivia & Games', icon: Trophy },
            { id: 'today', label: 'Today', icon: Calendar },
          ].map(tab => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                  isCurrent
                    ? 'bg-blue-600 text-white font-bold shadow-md'
                    : 'bg-gray-900 border border-gray-800 text-gray-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-8">
        {/* TAB 1: SEARCH */}
        {activeTab === 'search' && (
          <div className="space-y-12">
            <CosmicSearchAi
              initialQuery={aiSearchQuery}
              onNavigateToArticle={handleNavigateToArticle}
              onNavigateToTool={handleNavigateToTool}
            />

            {/* Featured Portals */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <h3 className="text-base font-bold font-display uppercase tracking-wider text-gray-200">
                  Featured Cosmic Portals
                </h3>
                <span className="text-xs text-cyan-400 font-mono">Real-time Science Suite</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <div
                  onClick={() => setActiveTab('library')}
                  className="p-5 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <LibraryIcon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white font-display">Digital Library</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Browse, create, and save space-themed e-books with a Markdown editor and persistent library collection.
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-1 text-xs text-emerald-400 font-medium">
                    <span>Open Library &amp; Studio</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('chat')}
                  className="p-5 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Bot className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white font-display">AI Science Chatbot</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Ask complex questions, get simple intuitive explanations, deep links to wiki articles, and follow-up topics.
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-1 text-xs text-cyan-400 font-medium">
                    <span>Chat With AI</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('solarsystem')}
                  className="p-5 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Orbit className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white font-display">3D Solar System</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Click planets and moons in 3D WebGL, fly into orbit, explore historical space missions and physical telemetry.
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-1 text-xs text-cyan-400 font-medium">
                    <span>Launch 3D Orbit</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div
                  onClick={() => {
                    setActiveTab('games');
                    setActiveGame('trivia');
                  }}
                  className="p-5 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-amber-500/50 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800/60 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white font-display">Science Trivia Arena</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Astronomy, Physics, Biology, and Space Missions across 3 difficulty tiers with score tracking and encouraging feedback.
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-1 text-xs text-amber-400 font-medium">
                    <span>Play Trivia Quiz</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div
                  onClick={() => {
                    setActiveTab('tools');
                    setActiveLabTool('sandbox3d');
                  }}
                  className="p-5 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-cyan-400/50 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white font-display">Create Your Own Universe (3D)</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Create and customize entire universes! Tune gravity, dark energy, place moons, white holes, black holes, and save your custom cosmos.
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-1 text-xs text-cyan-400 font-medium">
                    <span>Create &amp; Simulate Universe</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AI CHATBOT */}
        {activeTab === 'chat' && (
          <SpaceAiChatbot
            onNavigateToArticle={handleNavigateToArticle}
            onNavigateToTool={handleNavigateToTool}
          />
        )}

        {/* TAB: DIGITAL LIBRARY & MARKDOWN STUDIO */}
        {activeTab === 'library' && (
          <DigitalLibrary
            onAskAi={handleAskAi}
            onNavigateToTool={handleNavigateToTool}
          />
        )}

        {/* TAB 3: ENCYCLOPEDIA */}
        {activeTab === 'encyclopedia' && (
          <EncyclopediaViewer
            initialArticleId={selectedWikiArticleId}
            onAskAi={handleAskAi}
            onNavigateToTool={handleNavigateToTool}
          />
        )}

        {/* TAB 4: 3D SOLAR SYSTEM EXPLORER */}
        {activeTab === 'solarsystem' && (
          <div className="space-y-4">
            {/* 3D vs 2D Toggle Switch */}
            <div className="flex items-center justify-between bg-gray-900/80 px-4 py-2 rounded-2xl border border-gray-800 text-xs">
              <span className="text-gray-400 font-mono">
                View Mode: <strong className="text-cyan-300">{planetariumMode === '3d' ? 'Interactive 3D WebGL Explorer' : '2D Keplerian Map'}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveTab('tools');
                    setActiveLabTool('sandbox3d');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-purple-950 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Place Moons &amp; White Holes</span>
                </button>

                <div className="flex items-center gap-1 bg-gray-950 p-1 rounded-xl border border-gray-800">
                  <button
                    onClick={() => setPlanetariumMode('3d')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      planetariumMode === '3d'
                        ? 'bg-blue-600 text-white font-bold shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    3D Orbit Mode
                  </button>
                  <button
                    onClick={() => setPlanetariumMode('2d')}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      planetariumMode === '2d'
                        ? 'bg-blue-600 text-white font-bold shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    2D Map Mode
                  </button>
                </div>
              </div>
            </div>

            {planetariumMode === '3d' ? (
              <SolarSystem3DExplorer
                onAskAi={handleAskAi}
                onNavigateToArticle={handleNavigateToArticle}
              />
            ) : (
              <SolarSystemSimulator
                onAskAi={handleAskAi}
              />
            )}
          </div>
        )}

        {/* TAB 5: INTERACTIVE LABS SUITE */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'sandbox3d', label: '🌌 Universe Creator & 3D Sandbox (Moons & White Holes)', icon: Sparkles },
                { id: 'gravity', label: '2D Gravity Vector Sandbox', icon: Compass },
                { id: 'scale', label: 'Scale of the Universe', icon: Layers },
                { id: 'fusion', label: 'Cosmic Fusion Reactor', icon: Atom },
                { id: 'exoplanet', label: 'Habitable Goldilocks Zone', icon: Orbit },
                { id: 'rocket', label: 'Rocket Delta-V & Staging', icon: Rocket },
              ].map(lab => {
                const Icon = lab.icon;
                const isSelected = activeLabTool === lab.id;
                return (
                  <button
                    key={lab.id}
                    onClick={() => setActiveLabTool(lab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-950'
                        : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{lab.label}</span>
                  </button>
                );
              })}
            </div>

            {activeLabTool === 'sandbox3d' && <UniverseSandbox3D />}
            {activeLabTool === 'gravity' && <GravitySandbox />}
            {activeLabTool === 'scale' && <ScaleOfUniverse />}
            {activeLabTool === 'fusion' && <CosmicFusionLab />}
            {activeLabTool === 'exoplanet' && <ExoplanetHabitability />}
            {activeLabTool === 'rocket' && <RocketTrajectorySimulator />}
          </div>
        )}

        {/* TAB 6: TRIVIA & GAMES */}
        {activeTab === 'games' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'trivia', label: 'Cosmic Trivia Arena', icon: Trophy },
                { id: 'lander', label: 'Apollo 11 Lunar Lander', icon: Rocket },
                { id: 'alchemy', label: 'Stellar Alchemy Puzzle', icon: Flame },
              ].map(g => {
                const Icon = g.icon;
                const isSelected = activeGame === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setActiveGame(g.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-950'
                        : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{g.label}</span>
                  </button>
                );
              })}
            </div>

            {activeGame === 'trivia' && (
              <CosmicTriviaArena
                onNavigateToArticle={handleNavigateToArticle}
                onNavigateToTool={handleNavigateToTool}
              />
            )}
            {activeGame === 'lander' && <LunarLanderGame />}
            {activeGame === 'alchemy' && <StellarAlchemyGame />}
          </div>
        )}

        {/* TAB 7: TODAY IN SPACE */}
        {activeTab === 'today' && <TodayInSpace onAskAi={handleAskAi} />}
      </main>

      {/* Floating Instant AI Chat Launcher Button */}
      {activeTab !== 'chat' && (
        <button
          onClick={() => setActiveTab('chat')}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs flex items-center gap-2.5 shadow-2xl shadow-blue-900/60 border border-white/20 transition-all hover:scale-105 cursor-pointer"
        >
          <Bot className="w-5 h-5 text-cyan-200" />
          <span>Ask UBT AI</span>
        </button>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800/80 bg-gray-950 py-8 px-4 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Orbit className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-gray-300">UBT (Universal E-books Technology)</span>
            <span>• Universal Open-Access Space &amp; Science Knowledge Engine</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <span>Free Forever</span>
            <span>•</span>
            <span>No Paywalls</span>
            <span>•</span>
            <span>Powered by Gemini AI &amp; Three.js 3D Physics</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
