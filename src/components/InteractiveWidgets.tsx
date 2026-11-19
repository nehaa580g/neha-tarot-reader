import React, { useState } from 'react';
import { Sparkles, RefreshCw, Calendar, ArrowRight, Binary, Eye } from 'lucide-react';
import { TAROT_DECK_SAMPLE } from '../data/content';

interface InteractiveWidgetsProps {
  onBookClick: (serviceId?: string) => void;
}

export const InteractiveWidgets: React.FC<InteractiveWidgetsProps> = ({ onBookClick }) => {
  const [activeTab, setActiveTab] = useState<'tarot' | 'numerology'>('tarot');

  // Tarot state
  const [drawnCards, setDrawnCards] = useState<typeof TAROT_DECK_SAMPLE | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Numerology state
  const [birthDate, setBirthDate] = useState('');
  const [lifePathResult, setLifePathResult] = useState<{
    number: number;
    title: string;
    desc: string;
    archetype: string;
  } | null>(null);

  const handleDrawTarot = () => {
    setIsDrawing(true);
    setTimeout(() => {
      // Shuffle and pick 3 cards
      const shuffled = [...TAROT_DECK_SAMPLE].sort(() => 0.5 - Math.random());
      setDrawnCards(shuffled.slice(0, 3));
      setIsDrawing(false);
    }, 600);
  };

  const calculateLifePath = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;

    // Sum all digits until single digit or 11/22
    const digits = birthDate.replace(/\D/g, '').split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);

    while (sum > 9 && sum !== 11 && sum !== 22) {
      sum = sum
        .toString()
        .split('')
        .map(Number)
        .reduce((a, b) => a + b, 0);
    }

    const lifePathMap: Record<number, { title: string; archetype: string; desc: string }> = {
      1: {
        title: "The Pioneer & Leader",
        archetype: "Self-reliant, ambitious, and original.",
        desc: "Life Path 1 individuals are natural trailblazers designed to forge new pathways through individual action and courage."
      },
      2: {
        title: "The Peacemaker & Intuitive",
        archetype: "Harmonious, diplomatic, and deeply empathetic.",
        desc: "Life Path 2 focuses on balance, partnership, and subtle emotional intelligence in all personal endeavors."
      },
      3: {
        title: "The Creative Communicator",
        archetype: "Expressive, charismatic, and visionary.",
        desc: "Life Path 3 shines through artistic expression, uplifting speech, and joyful connection with others."
      },
      4: {
        title: "The Master Builder",
        archetype: "Disciplined, dependable, and pragmatic.",
        desc: "Life Path 4 builds sturdy foundations for long-term stability, order, and enduring legacy."
      },
      5: {
        title: "The Free Spirit & Explorer",
        archetype: "Adaptable, adventurous, and dynamic.",
        desc: "Life Path 5 thrives on constructive freedom, versatility, and learning through diverse life experiences."
      },
      6: {
        title: "The Nurturer & Guardian",
        archetype: "Compassionate, responsible, and protective.",
        desc: "Life Path 6 centers around home, community harmony, healing, and guidance for loved ones."
      },
      7: {
        title: "The Seeker & Philosopher",
        archetype: "Analytical, spiritual, and introspective.",
        desc: "Life Path 7 seeks truth beneath surface realities through study, intuition, and deep contemplation."
      },
      8: {
        title: "The Powerhouse & Strategist",
        archetype: "Authoritative, abundant, and goal-oriented.",
        desc: "Life Path 8 balances material mastery with ethical stewardship and executive vision."
      },
      9: {
        title: "The Universal Humanitarian",
        archetype: "Wise, idealistic, and selfless.",
        desc: "Life Path 9 is driven by universal compassion, completion of long cycles, and global impact."
      },
      11: {
        title: "Master Number: The Illuminator",
        archetype: "High intuition, inspirational, and visionary.",
        desc: "Master 11 holds electric spiritual awareness, bridging spiritual inspiration into practical awareness."
      },
      22: {
        title: "Master Number: The Master Architect",
        archetype: "Transformative, grounded visionary, turning dreams into reality.",
        desc: "Master 22 turns grand cosmic visions into tangible, large-scale reality for humanity."
      }
    };

    const res = lifePathMap[sum] || lifePathMap[7];
    setLifePathResult({
      number: sum,
      title: res.title,
      archetype: res.archetype,
      desc: res.desc
    });
  };

  return (
    <section className="py-16 lg:py-24 bg-[#0a0812] relative overflow-hidden border-y border-purple-900/30">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/40 text-purple-300 text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>INTERACTIVE PREVIEW TOOLS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-syne text-white tracking-tight">
            GUIDANCE
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2">
            Try a instant 3-card Tarot pull or calculate your Numerology Life Path number right now.
          </p>

          {/* Toggle buttons */}
          <div className="inline-flex p-1 bg-[#130f24] rounded-full border border-purple-800/40 mt-6">
            <button
              onClick={() => setActiveTab('tarot')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'tarot'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>3-Card Tarot Reading</span>
            </button>
            <button
              onClick={() => setActiveTab('numerology')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'numerology'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Binary className="w-4 h-4" />
              <span>Life Path Calculator</span>
            </button>
          </div>
        </div>

        {/* Tab 1: 3-Card Tarot Reader */}
        {activeTab === 'tarot' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-purple-800/30">
            <div className="text-center max-w-lg mx-auto mb-8">
              <h3 className="font-syne text-xl font-bold text-white mb-2">3-Card Guidance Spread</h3>
              <p className="text-slate-300 text-xs">
                Focus on your main life query and click below to reveal cards for your Past, Present, and Outcome.
              </p>
              <button
                onClick={handleDrawTarot}
                disabled={isDrawing}
                className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-700 to-indigo-600 text-white text-xs font-bold tracking-wider hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-950"
              >
                <RefreshCw className={`w-4 h-4 ${isDrawing ? 'animate-spin' : ''}`} />
                <span>{drawnCards ? 'DRAW AGAIN' : 'REVEAL MY CARDS'}</span>
              </button>
            </div>

            {drawnCards ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
                {['01. PAST INFLUENCE', '02. PRESENT ENERGY', '03. OUTCOME POTENTIAL'].map((positionLabel, idx) => {
                  const card = drawnCards[idx];
                  return (
                    <div key={idx} className="glass-card rounded-2xl p-5 border border-purple-500/30 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">
                          {positionLabel}
                        </span>
                        <h4 className="font-cinzel text-lg font-bold text-white mt-1 mb-1">
                          {card.name}
                        </h4>
                        <span className="text-[11px] font-medium text-amber-300/90 block mb-3">
                          {card.keyword}
                        </span>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {card.meaning}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-purple-900/30 text-[10px] text-purple-300/70 font-semibold">
                        ELEMENT: {card.element.toUpperCase()}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="h-48 rounded-2xl border-2 border-dashed border-purple-800/40 flex flex-col items-center justify-center text-center p-4">
                    <Sparkles className="w-6 h-6 text-purple-400/50 mb-2" />
                    <span className="text-xs text-slate-400 font-semibold">Card {num} Hidden</span>
                  </div>
                ))}
              </div>
            )}

            {drawnCards && (
              <div className="mt-8 text-center pt-6 border-t border-purple-900/40">
                <p className="text-xs text-slate-300 mb-3">
                  Need a full personalized consultation with deeper chart transits?
                </p>
                <button
                  onClick={() => onBookClick('tarot')}
                  className="px-6 py-2 rounded-full bg-purple-900/60 border border-purple-600/50 text-purple-200 text-xs font-bold hover:bg-purple-700 hover:text-white transition-all inline-flex items-center gap-2"
                >
                  <span>Book Full 1-on-1 Reading</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Numerology Life Path Calculator */}
        {activeTab === 'numerology' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-purple-800/30 max-w-2xl mx-auto">
            <form onSubmit={calculateLifePath} className="space-y-4">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Enter Your Date of Birth
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="flex-1 bg-[#130d29] border border-purple-800/40 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wider transition-colors cursor-pointer"
                >
                  CALCULATE
                </button>
              </div>
            </form>

            {lifePathResult && (
              <div className="mt-8 pt-6 border-t border-purple-900/40 animate-in fade-in duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-800 to-indigo-600 flex items-center justify-center font-syne text-2xl font-black text-white shadow-xl">
                    {lifePathResult.number}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-400 tracking-widest uppercase">
                      YOUR LIFE PATH NUMBER
                    </span>
                    <h3 className="font-syne text-xl font-bold text-white">
                      {lifePathResult.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs font-semibold text-purple-200 mb-2">
                  Archetype: {lifePathResult.archetype}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {lifePathResult.desc}
                </p>

                <div className="bg-[#140e2b] rounded-xl p-4 border border-purple-800/30 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Want your full expression & personal year forecast?</span>
                  <button
                    onClick={() => onBookClick('numerology')}
                    className="px-4 py-1.5 rounded-full bg-purple-700 text-white text-xs font-bold hover:bg-purple-600 transition-colors"
                  >
                    Get Full Report
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
