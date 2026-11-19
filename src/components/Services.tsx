import React, { useState } from 'react';
import { Sparkles, Compass, Hand, Binary, Flower2, Heart, ArrowUpRight, ChevronRight } from 'lucide-react';
import { SERVICES } from '../data/content';
import { ServiceItem } from '../types';
import { ServiceModal } from './ServiceModal';

interface ServicesProps {
  onBook: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onBook }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-purple-300" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-purple-300" />;
      case 'Hand':
        return <Hand className="w-6 h-6 text-purple-300" />;
      case 'Flower2':
        return <Flower2 className="w-6 h-6 text-purple-300" />;
      case 'Heart':
        return <Heart className="w-6 h-6 text-purple-300" />;
      case 'Binary':
        return <Binary className="w-6 h-6 text-purple-300" />;
      default:
        return <Sparkles className="w-6 h-6 text-purple-300" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 relative bg-[#08070c] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-900/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-950/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-[11px] font-bold tracking-widest uppercase mb-3">
              CORE OFFERINGS
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-tight">
              WHAT I OFFER
            </h2>
          </div>
          <p className="text-slate-300 text-sm sm:text-base max-w-md font-normal leading-relaxed">
            Personalized spiritual guidance designed to help you understand your path, energy and possibilities.
          </p>
        </div>

        {/* Services Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group glass-card glass-card-hover rounded-3xl p-7 flex flex-col justify-between border border-purple-800/30 relative overflow-hidden cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              {/* Card top row */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-700/40 flex items-center justify-center shadow-lg group-hover:bg-purple-800/50 transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="font-syne text-2xl font-black text-purple-500/40 group-hover:text-purple-400 transition-colors">
                    {service.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-syne text-white mb-3 group-hover:text-purple-200 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed mb-6">
                  {service.shortDesc}
                </p>
              </div>

              {/* Card footer button */}
              <div className="pt-4 border-t border-purple-900/30 flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider text-purple-300 uppercase group-hover:text-purple-200">
                  LEARN MORE
                </span>
                <div className="w-8 h-8 rounded-full bg-purple-950/60 border border-purple-800/40 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all text-purple-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </div>
              </div>

              {/* Hover glow line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBook={onBook}
      />
    </section>
  );
};
