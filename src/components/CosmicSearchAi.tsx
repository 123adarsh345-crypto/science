import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Volume2, VolumeX, ArrowRight, BookOpen, Compass, Orbit, RefreshCw } from 'lucide-react';

interface Props {
  initialQuery?: string;
  onNavigateToArticle?: (id: string) => void;
  onNavigateToTool?: (toolId: string) => void;
}

export const CosmicSearchAi: React.FC<Props> = ({
  initialQuery = '',
  onNavigateToArticle,
  onNavigateToTool,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [aiMode, setAiMode] = useState<'comprehensive' | 'eli5' | 'quantum_rigor' | 'hypothetical'>('comprehensive');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [aiSource, setAiSource] = useState<string>('gemini-ai');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const sampleSuggestions = [
    'How does James Webb see back to the Big Bang?',
    'What happens inside a spinning Kerr black hole?',
    'Is there liquid water and life on Jupiter\'s moon Europa?',
    'Explain Quantum Entanglement simply with analogies',
    'What if the Sun were replaced by a black hole of identical mass?',
    'How do rockets achieve escape velocity using the Tsiolkovsky equation?'
  ];

  const handleSearch = async (targetQuery?: string) => {
    const q = targetQuery || query;
    if (!q.trim()) return;

    setIsLoading(true);
    setAiResult(null);

    // Stop previous speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    try {
      const res = await fetch('/api/gemini/explore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, mode: aiMode }),
      });

      const data = await res.json();
      setAiResult(data.content);
      setAiSource(data.source || 'gemini-ai');
    } catch (err) {
      console.error('Search error:', err);
      setAiResult(`🌌 Cosmic Search Overview\nUnable to reach server stream at this moment. You can still explore all interactive planetariums, gravity sandboxes, and encyclopedia articles offline!`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const toggleSpeak = () => {
    if (!window.speechSynthesis || !aiResult) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const cleanText = aiResult.replace(/[#*`_]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-6">
      {/* Google / Zepedia Style Cosmic Brand Header */}
      <div className="text-center space-y-2 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/40 text-cyan-300 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>UBT AI • Universal E-books Technology • 100% Free Cosmic Research Engine</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight bg-gradient-to-r from-blue-400 via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
          Explore The Universe
        </h1>
        <p className="text-sm text-gray-400 max-w-lg mx-auto">
          The encyclopedic depth of Wikipedia meets Google AI. Ask any space question or simulate physical phenomena.
        </p>
      </div>

      {/* Main Search Input Box */}
      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="relative flex items-center"
        >
          <Search className="absolute left-5 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search celestial bodies, quantum mysteries, space missions..."
            className="w-full pl-13 pr-32 py-4 bg-gray-900/90 hover:bg-gray-900 focus:bg-gray-900 border border-gray-700/80 focus:border-cyan-400 rounded-2xl text-white placeholder-gray-500 shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-base font-normal transition-all"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-3 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-900/40 transition-all cursor-pointer"
          >
            {isLoading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>Ask AI</span>
          </button>
        </form>

        {/* AI Exploration Mode Selector */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-xs">
          <span className="text-gray-500 font-mono text-[11px] mr-1">AI Mode:</span>
          {[
            { id: 'comprehensive', label: '🌌 Comprehensive Overview' },
            { id: 'eli5', label: '👶 Explain Like I\'m 5' },
            { id: 'quantum_rigor', label: '🔬 Astrophysical Rigor' },
            { id: 'hypothetical', label: '🌀 "What If?" Speculation' },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setAiMode(m.id as any)}
              className={`px-3 py-1 rounded-full border transition-all ${
                aiMode === m.id
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-200 shadow-sm'
                  : 'bg-gray-900/70 border-gray-800 text-gray-400 hover:text-gray-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
          {sampleSuggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(s);
                handleSearch(s);
              }}
              className="text-xs px-3 py-1 rounded-xl bg-gray-900/70 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-cyan-300 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* AI Intelligence Result Panel */}
      {(isLoading || aiResult) && (
        <div className="w-full bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">UBT AI Deep Dive</h3>
                <span className="text-[11px] font-mono text-cyan-400">
                  {aiSource === 'gemini-ai' ? 'Powered by Google Gemini 3.8 Flash' : 'UBT Knowledge Engine'}
                </span>
              </div>
            </div>

            {aiResult && (
              <button
                onClick={toggleSpeak}
                className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                title={isSpeaking ? 'Stop Audio' : 'Listen with Audio Voice'}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
              <p className="text-xs font-mono text-gray-400">
                Synthesizing cosmic data, astrophysics records, and space mission telemetry...
              </p>
            </div>
          ) : (
            <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap font-sans space-y-2">
              {aiResult}
            </div>
          )}

          {/* Quick Simulation Jumps */}
          {aiResult && (
            <div className="pt-4 border-t border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-gray-400 font-mono">Explore related interactive labs:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateToTool?.('solarsystem')}
                  className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-cyan-300 font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Orbit className="w-3.5 h-3.5" />
                  <span>Orbit Simulator</span>
                </button>
                <button
                  onClick={() => onNavigateToTool?.('gravity')}
                  className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-purple-300 font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Gravity Sandbox</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
