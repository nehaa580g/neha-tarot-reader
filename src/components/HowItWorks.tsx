import React from 'react';
import { Sparkles, Calendar, Video, BookOpen, CheckCircle2 } from 'lucide-react';
import { HOW_IT_WORKS } from '../data/content';

export const HowItWorks: React.FC = () => {
  const getIcon = (step: string) => {
    switch (step) {
      case '01':
        return <BookOpen className="w-5 h-5 text-purple-300" />;
      case '02':
        return <Calendar className="w-5 h-5 text-purple-300" />;
      case '03':
        return <Video className="w-5 h-5 text-purple-300" />;
      case '04':
        return <CheckCircle2 className="w-5 h-5 text-purple-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-300" />;
    }
  };

  return (
    <section id="how-it-works" className="py-20 lg:py-28 relative bg-[#08070c] overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-800/40 text-purple-300 text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>SIMPLE PROCESS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-tight">
            HOW IT WORKS
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            A seamless, stress-free consultation experience from booking to receiving your insights.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Vertical Connecting Line */}
          <div className="hidden md:block absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-purple-800/60 via-purple-500/40 to-indigo-800/60" />

          <div className="space-y-8 md:space-y-12">
            {HOW_IT_WORKS.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.step}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Card Content */}
                  <div className="w-full md:w-1/2">
                    <div className="glass-card rounded-2xl p-6 sm:p-8 border border-purple-800/30 hover:border-purple-500/40 transition-all shadow-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-syne text-xs font-extrabold tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/40">
                          STEP {item.step}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-purple-900/40 border border-purple-700/30 flex items-center justify-center">
                          {getIcon(item.step)}
                        </div>
                      </div>

                      <h3 className="font-syne text-xl font-bold text-white mb-2">
                        {item.title}
                      </h3>

                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Numbered Center Circle */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#160f2e] border-2 border-purple-500/60 flex items-center justify-center font-syne text-lg font-black text-purple-200 shadow-xl shadow-purple-950 purple-glow-sm">
                      {item.step}
                    </div>
                  </div>

                  {/* Empty placeholder for alignment */}
                  <div className="hidden md:block w-1/2" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
