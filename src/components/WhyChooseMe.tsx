import React from 'react';
import { Sparkles, UserCheck, Lock, Award, Video } from 'lucide-react';
import { WHY_CHOOSE_ME } from '../data/content';

export const WhyChooseMe: React.FC = () => {
  const getIcon = (title: string) => {
    switch (title) {
      case 'PERSONALIZED':
        return <UserCheck className="w-6 h-6 text-purple-300" />;
      case 'PRIVATE & CONFIDENTIAL':
        return <Lock className="w-6 h-6 text-purple-300" />;
      case 'PROFESSIONAL':
        return <Award className="w-6 h-6 text-purple-300" />;
      case 'FLEXIBLE':
        return <Video className="w-6 h-6 text-purple-300" />;
      default:
        return <Sparkles className="w-6 h-6 text-purple-300" />;
    }
  };

  return (
    <section className="py-20 lg:py-28 relative bg-[#0a0812] overflow-hidden">
      
      {/* Background Accent Orbs */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-800/40 text-purple-300 text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>EXCELLENCE & INTEGRITY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-tight">
            WHY CLIENTS CHOOSE ME
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Grounded spiritual consultation rooted in compassion, privacy, and actionable insight.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_ME.map((item) => (
            <div
              key={item.title}
              className="glass-card glass-card-hover rounded-3xl p-7 border border-purple-800/30 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-700/40 flex items-center justify-center mb-6 shadow-lg">
                  {getIcon(item.title)}
                </div>

                <h3 className="font-syne text-base font-bold text-white mb-3 tracking-wider">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-purple-900/30 text-[10px] text-purple-400 font-bold uppercase tracking-widest">
                GUARANTEED QUALITY
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
