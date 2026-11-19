import React from 'react';
import { Sparkles, ArrowRight, Star, Moon, Compass, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden bg-[#08070c]">
      {/* Background Celestial Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-900/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-violet-950/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Celestial Lines & Stars */}
      <div className="absolute inset-0 bg-[radial-gradient(#2d1f4d_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-800/40 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-purple-200">
                COUNSELLOR • TAROT READER • HEALER
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-syne text-white leading-[1.05]">
                DISCOVER THE <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-purple-400 to-indigo-300">
                  ANSWERS WITHIN.
                </span>
              </h1>
            </div>

            {/* Script / Serif Secondary Phrase */}
            <p className="font-cormorant italic text-2xl sm:text-3xl text-purple-200/90 font-light tracking-wide">
              "Your journey. Your energy. Your guidance."
            </p>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
              Find clarity, discover hidden truths, and understand the energy surrounding your life.{' '}
              Get personalized <strong className="text-purple-200 font-semibold">Tarot Readings</strong> and{' '}
              <strong className="text-purple-200 font-semibold">Spiritual Guidance</strong> for love, relationships, career, finances, and life decisions.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onBookClick}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white font-bold text-sm tracking-wider shadow-lg shadow-purple-950/80 hover:shadow-purple-700/30 purple-glow hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>BOOK A READING</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#140e26] border border-purple-800/40 text-slate-200 font-semibold text-sm hover:text-white hover:border-purple-600 hover:bg-[#1c1438] transition-all text-center"
              >
                <span>EXPLORE SERVICES</span>
              </a>
            </div>

            {/* Trust badge icons row */}
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 border-t border-purple-950/80 w-full max-w-lg">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>5.0 Rated Reader</span>
              </div>
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Global Online Slots</span>
              </div>
            </div>

          </div>

          {/* Right Column: Integrated Portrait & Celestial Aura */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] group">
              
              {/* Outer Glowing Zodiac Ring Frame */}
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-purple-800/40 via-indigo-600/30 to-purple-500/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

              {/* Main Image Frame with Arch Top styling */}
              <div className="relative w-full h-full rounded-t-[100px] rounded-b-3xl overflow-hidden border border-purple-500/30 bg-[#120d24] shadow-2xl shadow-purple-950/90">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-11-17_at_23.37.08_c9693d08.jpeg"
                  alt="Neha - Spiritual Guide & Healer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                />

                {/* Celestial Gradient Overlay at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08070c] via-transparent to-transparent opacity-80" />

                {/* Floating Zodiac Badge Card */}
                <div className="absolute bottom-6 inset-x-6 glass-panel rounded-2xl p-4 border border-purple-500/30 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-900/60 border border-purple-400/30 flex items-center justify-center">
                      <Compass className="w-5 h-5 text-purple-300 animate-spin-slow" />
                    </div>
                    <div>
                      <p className="font-cinzel text-xs font-bold text-white tracking-wider">NEHA</p>
                      <p className="text-[10px] text-purple-300/80">Spiritual Guide & Healer</p>
                    </div>
                  </div>
                  <div className="flex gap-1 text-amber-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Orbiting Moon Decor */}
              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-[#1b1236]/90 border border-purple-500/40 backdrop-blur-md flex items-center justify-center shadow-lg shadow-purple-950/80 animate-bounce-slow">
                <Moon className="w-8 h-8 text-purple-300" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
