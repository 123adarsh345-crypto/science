import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  VolumeX,
  BookOpen,
  Orbit,
  ArrowRight,
  Compass,
  Layers,
  RotateCcw,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

interface Props {
  onNavigateToArticle?: (articleId: string) => void;
  onNavigateToTool?: (toolId: string) => void;
}

export const SpaceAiChatbot: React.FC<Props> = ({
  onNavigateToArticle,
  onNavigateToTool,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello, cosmic explorer! 🌌 I am **UBT AI (Universal E-books Technology)**, your interactive guide to the frontiers of space, physics, and science.

I can explain complex astrophysics, quantum phenomena, and space exploration with intuitive, crystal-clear analogies. 

Try asking me anything, or tap one of the suggested topics below!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedTopics: [
        'Why is the night sky dark if there are trillions of stars?',
        'How does gravity warp spacetime around a black hole?',
        'Could extremophiles or microbial life survive on Europa?',
        'How do rockets achieve orbit using the Tsiolkovsky equation?'
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const parseReplyAndTopics = (rawText: string) => {
    const parts = rawText.split('---SUGGESTED_TOPICS---');
    const mainText = parts[0].trim();
    let suggestedTopics: string[] = [];

    if (parts.length > 1) {
      suggestedTopics = parts[1]
        .split('\n')
        .map(t => t.replace(/^[-\*\d\.\s\[\]]+/, '').replace(/[\[\]]/g, '').trim())
        .filter(t => t.length > 3)
        .slice(0, 3);
    }

    return { mainText, suggestedTopics };
  };

  const handleSend = async (messageToSend?: string) => {
    const text = (messageToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
        }),
      });

      const data = await res.json();
      const { mainText, suggestedTopics } = parseReplyAndTopics(data.reply || '');

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: mainText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedTopics: suggestedTopics.length > 0 ? suggestedTopics : undefined,
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `I apologize, our deep-space comms relay encountered a momentary delay. You can continue exploring our interactive [Tool: solarsystem | 3D Solar System Explorer] or [Article: black-holes-spacetime | Black Holes & Spacetime Article]!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedTopics: [
          'How does gravity bend light?',
          'What happens at the event horizon of a black hole?'
        ],
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoice = (msgId: string, text: string) => {
    if (!window.speechSynthesis) return;

    if (isSpeaking === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
    } else {
      window.speechSynthesis.cancel();
      const clean = text.replace(/\[(Article|Tool|Game):.*?\]/g, '').replace(/[*#`_]/g, '');
      const utter = new SpeechSynthesisUtterance(clean);
      utter.rate = 1.0;
      utter.pitch = 1.0;
      utter.onend = () => setIsSpeaking(null);
      utter.onerror = () => setIsSpeaking(null);
      window.speechSynthesis.speak(utter);
      setIsSpeaking(msgId);
    }
  };

  // Render text and detect interactive resource tags:
  // [Article: article-id | Title]
  // [Tool: tool-id | Title]
  // [Game: game-id | Title]
  const renderMessageContent = (text: string) => {
    const tagRegex = /\[(Article|Tool|Game):\s*([a-zA-Z0-9_\-]+)\s*\|\s*([^\]]+)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = tagRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const type = match[1];
      const id = match[2];
      const title = match[3];

      parts.push(
        <button
          key={match.index}
          onClick={() => {
            if (type === 'Article') onNavigateToArticle?.(id);
            else onNavigateToTool?.(id);
          }}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 mx-1 my-0.5 rounded-lg text-xs font-semibold bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-200 transition-all shadow-sm cursor-pointer"
        >
          {type === 'Article' ? (
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          ) : (
            <Orbit className="w-3.5 h-3.5 text-amber-400" />
          )}
          <span>{title}</span>
          <ArrowRight className="w-3 h-3 text-cyan-400" />
        </button>
      );

      lastIndex = tagRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[740px] bg-gray-950 rounded-3xl border border-gray-800 shadow-2xl flex flex-col overflow-hidden">
      {/* Chatbot Header */}
      <div className="p-4 bg-gray-900/90 backdrop-blur-xl border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-display text-white">UBT AI Chatbot</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                Online
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Universal E-books Technology • Space &amp; Science AI Intelligence
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'welcome-reset',
                sender: 'assistant',
                text: 'Chat history cleared. What cosmic question would you like to explore next?',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ])
          }
          className="p-2 rounded-xl bg-gray-800/80 hover:bg-gray-750 text-gray-400 hover:text-white transition-colors"
          title="Clear Conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-5 scrollbar-none">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
                  isUser
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-cyan-950 border border-cyan-800/60 text-cyan-400 shadow-md'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble Container */}
              <div className={`max-w-[85%] space-y-2.5 ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-950'
                      : 'bg-gray-900 border border-gray-800 text-gray-200 rounded-tl-none shadow-lg'
                  }`}
                >
                  {renderMessageContent(msg.text)}

                  {!isUser && (
                    <div className="mt-2 pt-2 border-t border-gray-800/60 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                      <span>{msg.timestamp}</span>
                      <button
                        onClick={() => toggleVoice(msg.id, msg.text)}
                        className="hover:text-cyan-300 transition-colors p-1"
                        title={isSpeaking === msg.id ? 'Stop audio' : 'Listen with voice'}
                      >
                        {isSpeaking === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Suggested Topics Chips */}
                {msg.suggestedTopics && msg.suggestedTopics.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 flex items-center gap-1">
                      <Lightbulb className="w-3 h-3 text-amber-400" />
                      Suggested Related Topics for Further Learning:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedTopics.map((topic, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(topic)}
                          className="text-xs px-3 py-1.5 rounded-xl bg-gray-900/90 border border-gray-800 hover:border-cyan-500/50 hover:bg-gray-850 text-cyan-300 transition-colors text-left"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 text-xs font-mono text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
              <span>UBT AI is formulating explanation...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-gray-900/90 border-t border-gray-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask any space or science question (e.g., 'Why does time slow down near a black hole?')..."
            className="w-full pl-4 pr-14 py-3.5 bg-gray-950 border border-gray-700/80 focus:border-cyan-400 rounded-2xl text-white placeholder-gray-500 focus:outline-none text-xs md:text-sm font-normal"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 text-white font-semibold flex items-center justify-center cursor-pointer transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
