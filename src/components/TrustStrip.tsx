import React, { useEffect, useState, useRef } from 'react';
import { EXPERT_INFO } from '../data/content';

export const TrustStrip: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: "READINGS COMPLETED", value: 1000, suffix: "+", display: EXPERT_INFO.readingsCompleted },
    { label: "YEARS EXPERIENCE", value: 3, suffix: "+", display: EXPERT_INFO.yearsExperience },
    { label: "HAPPY CLIENTS", value: 300, suffix: "+", display: EXPERT_INFO.happyClients },
    { label: "CORE SERVICES", value: 4, suffix: "+", display: EXPERT_INFO.coreServicesCount },
  ];

  return (
    <section ref={ref} className="relative z-20 -mt-6 mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-purple-800/30 shadow-2xl shadow-purple-950/60 bg-gradient-to-r from-[#0f0b1f]/90 via-[#140e2b]/90 to-[#0f0b1f]/90 backdrop-blur-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-purple-900/40">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center justify-center p-3 ${
                idx !== 0 ? 'pt-6 md:pt-3' : ''
              }`}
            >
              <div className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight flex items-center justify-center gap-1 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-300">
                <span>{stat.display}</span>
              </div>
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-purple-300/80 uppercase mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
