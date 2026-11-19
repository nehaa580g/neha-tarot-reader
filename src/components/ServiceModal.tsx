import React from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBook: (serviceId: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onBook }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0f0b1e] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/80 overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/30 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#1c1633] border border-purple-800/40 text-slate-300 hover:text-white hover:bg-purple-900/50 transition-colors"
          aria-label="Close detail modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="font-syne text-xs font-bold tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/40">
            SERVICE {service.number}
          </span>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
            {service.category}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-syne text-white mb-6">
          {service.title}
        </h3>

        {/* Description */}
        {service.fullDesc && (
          <div className="space-y-4 mb-6">
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {service.fullDesc}
            </p>
          </div>
        )}

        {/* Highlights */}
        <div className="bg-[#150f2b] rounded-2xl p-5 border border-purple-800/30 mb-8">
          <h4 className="text-xs font-bold tracking-widest text-purple-300 uppercase mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>{service.deliverablesHeading || 'Key Session Deliverables'}</span>
          </h4>
          {service.deliverables && service.deliverables.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-[#1a1335]/70 rounded-xl p-3 border border-purple-800/25">
                  <span className="text-sm leading-none shrink-0 mt-0.5" aria-hidden="true">{item.icon}</span>
                  <div>
                    <span className="font-semibold text-white block mb-1">{item.title}</span>
                    <span className="text-slate-300 leading-relaxed">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {service.benefits && service.benefits.length > 0 && (
            <div className="mt-5 pt-4 border-t border-purple-800/30">
              <h5 className="text-[11px] font-bold tracking-widest text-purple-300 uppercase mb-3">
                BENEFITS
              </h5>
              <div className="flex flex-wrap gap-2">
                {service.benefits.map((benefit, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1335] border border-purple-700/30 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{benefit}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {service.closingNote && (
            <div className="mt-5 pt-4 border-t border-purple-800/30 text-center sm:text-left">
              <h5 className="text-xs font-bold tracking-widest text-purple-200 uppercase mb-1">
                {service.closingNote.title}
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                {service.closingNote.desc}
              </p>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-purple-900/40">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#181232] border border-purple-800/40 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Close Details
          </button>
          
          <button
            onClick={() => {
              onClose();
              onBook(service.id);
            }}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-950 hover:scale-105 transition-all"
          >
            <span>BOOK THIS READING</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
