import React from 'react';
import { Sparkles, Compass, Quote, Heart } from 'lucide-react';
import { EXPERT_INFO } from '../data/content';

const ABOUT_SERVICES = [
  { icon: '✨', label: 'Tarot Card Readings' },
  { icon: '❤️', label: 'Love & Relationship Guidance' },
  { icon: '💼', label: 'Career & Finance Guidance' },
  { icon: '🔮', label: 'Complete Life Readings' },
  { icon: '🌙', label: 'Spiritual Remedies & Guidance' },
  { icon: '🦋', label: 'Healing & Manifestation Programs' },
  { icon: '📖', label: 'Personalized Digital Products' }
];

const ABOUT_APPROACH = [
  {
    title: 'Personalized Guidance',
    desc: 'Every reading is focused on your personal questions and circumstances.'
  },
  {
    title: 'Honest & Clear Insights',
    desc: 'I believe in providing straightforward guidance without creating unnecessary fear.'
  },
  {
    title: 'Privacy & Confidentiality',
    desc: 'Your personal information and reading details are always treated with care and respect.'
  },
  {
    title: 'Healing & Personal Growth',
    desc: 'My goal is to help you understand yourself, release emotional burdens, and develop a positive mindset.'
  }
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 relative bg-[#0a0812] overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-28">
            <div className="relative mx-auto max-w-md lg:max-w-none aspect-[3/4]">
              {/* Decorative Frame */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-purple-800/30 via-indigo-600/20 to-purple-400/20 blur-lg" />

              {/* Main Image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl bg-[#120e24]">
                <img
                  src="/assets/aistudio/web_3__06e92456.jpeg"
                  alt="Neha - Meet Your Guide"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0812] via-transparent to-transparent opacity-80" />
              </div>

              {/* Quote Card Overlay */}
              <div className="absolute -bottom-6 -right-2 sm:right-6 max-w-xs glass-panel rounded-2xl p-4 border border-purple-500/30 shadow-xl">
                <Quote className="w-6 h-6 text-purple-400/60 mb-1" />
                <p className="font-cormorant italic text-sm text-purple-200 leading-snug">
                  &ldquo;{EXPERT_INFO.quote}&rdquo;
                </p>
                <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase block mt-2">
                  — NEHA • FOUNDER, UNLOCK FUTURE
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Services, Approach & Mission */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-800/40 text-purple-300 text-xs font-bold tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>ABOUT THE READER</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-tight">
                MEET YOUR GUIDE
              </h2>

              <p className="font-cormorant italic text-xl sm:text-2xl text-purple-200 mt-2">
                Your Journey Towards Clarity Begins Here ✨
              </p>
            </div>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p className="text-white font-medium">
                Hello! I am <span className="text-purple-300 font-semibold">Neha</span>, a Tarot Reader and Spiritual Guidance Practitioner.
              </p>
              <p>
                Welcome to <strong className="text-purple-200 font-semibold">Unlock Future</strong>, a space where you can find clarity, guidance, healing, and a deeper understanding of your life.
              </p>
              <p>
                I believe that every person has their own journey, challenges, and opportunities. Sometimes, we need a little guidance to understand our emotions, relationships, career decisions, and life situations.
              </p>
              <p>
                Through Tarot Readings, intuitive guidance, spiritual remedies, healing practices, and manifestation techniques, I aim to help you understand your current situation and move forward with greater confidence.
              </p>
            </div>

            {/* MY SERVICES */}
            <div className="pt-5 border-t border-purple-900/40">
              <h3 className="font-syne text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>MY SERVICES</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ABOUT_SERVICES.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 bg-[#140e29] rounded-xl px-4 py-3 border border-purple-800/30 text-xs sm:text-sm text-slate-200 font-medium"
                  >
                    <span className="text-base leading-none" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* MY APPROACH */}
            <div className="pt-5 border-t border-purple-900/40">
              <h3 className="font-syne text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-purple-400" />
                <span>MY APPROACH</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ABOUT_APPROACH.map((pt) => (
                  <div key={pt.title} className="bg-[#140e29] rounded-xl p-4 border border-purple-800/30">
                    <h4 className="font-syne text-xs font-bold text-purple-200 uppercase tracking-wider mb-1.5">
                      {pt.title}
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* MY MISSION */}
            <div className="pt-5 border-t border-purple-900/40 space-y-3">
              <h3 className="font-syne text-lg font-bold text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-400" />
                <span>MY MISSION</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                My mission is to create a safe and supportive space where people can explore their questions, find clarity, work on personal growth, and reconnect with their inner strength.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Remember, your future is not limited to one reading. You always have the power to make choices and create positive changes in your life.
              </p>
            </div>

            {/* Closing Banner & Signature */}
            <div className="bg-gradient-to-r from-[#1a1235] via-[#150e2b] to-[#1a1235] border border-purple-500/30 rounded-2xl p-5 space-y-3">
              <p className="font-syne text-xs sm:text-sm font-extrabold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-amber-200 to-indigo-200">
                UNLOCK YOUR INNER WISDOM. TRUST YOUR JOURNEY. CREATE YOUR FUTURE. ✨
              </p>
              <div className="text-xs text-slate-300 space-y-0.5 pt-1 border-t border-purple-800/30">
                <p className="italic font-cormorant text-base text-purple-200">With Love,</p>
                <p className="font-syne font-bold text-white text-sm">Neha</p>
                <p className="text-purple-300/90 text-[11px] font-medium">Founder – Unlock Future</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
