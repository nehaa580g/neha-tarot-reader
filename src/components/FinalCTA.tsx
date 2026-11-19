import React from 'react';
import { Sparkles, Calendar, MessageCircle, ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onBookClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onBookClick }) => {
  return (
    <section className="py-20 lg:py-28 relative bg-[#08070c] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Box */}
        <div className="relative rounded-[2.5rem] p-8 sm:p-14 lg:p-20 overflow-hidden bg-gradient-to-r from-purple-950 via-[#1e133e] to-indigo-950 border border-purple-500/30 shadow-2xl shadow-purple-950 text-center">
          
          {/* Celestial Stars & Radial Lights Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.3),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 border border-purple-400/30 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-purple-300 animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-purple-200">
                BEGIN YOUR TRANSFORMATION
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-syne text-white tracking-tight leading-tight">
              READY TO EXPLORE <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-amber-200 to-indigo-200">
                YOUR PATH?
              </span>
            </h2>

            <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
              Book a personalized session and begin your journey with clarity and guidance.
            </p>

            {/* Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-white font-bold text-xs tracking-widest shadow-xl shadow-purple-950 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK A CONSULTATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#110b26]/80 border border-purple-400/30 text-white font-bold text-xs tracking-widest hover:bg-purple-900/50 transition-all text-center"
              >
                <MessageCircle className="w-4 h-4 text-purple-300" />
                <span>CONTACT ME</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
