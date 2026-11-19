import React, { useState } from 'react';
import { Sparkles, Check, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { CONSULTATION_PACKAGES } from '../data/content';
import { Currency } from '../types';

interface PackagesProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onBookClick: (serviceId?: string, packageId?: string, packageTier?: string) => void;
}

export const Packages: React.FC<PackagesProps> = ({ currency, setCurrency, onBookClick }) => {
  // Custom price placeholder editable state so client can preview custom rates if needed
  const [customPricing, setCustomPricing] = useState<Record<string, string>>({});
  const [selectedTierByPkg, setSelectedTierByPkg] = useState<Record<string, { id?: string; label: string; amountInr: number }>>({});

  const formatInrAmount = (amountInr: number) => {
    switch (currency) {
      case 'INR':
        return `₹${amountInr.toLocaleString('en-IN')}`;
      case 'USD':
        return `$${Math.max(1, Math.round(amountInr / 83)).toLocaleString('en-US')}`;
      case 'EUR':
        return `€${Math.max(1, Math.round(amountInr / 90)).toLocaleString('en-US')}`;
      case 'GBP':
        return `£${Math.max(1, Math.round(amountInr / 105)).toLocaleString('en-US')}`;
      default:
        return `₹${amountInr.toLocaleString('en-IN')}`;
    }
  };

  const formatPrice = (pkg: typeof CONSULTATION_PACKAGES[0]) => {
    if (customPricing[pkg.id]) {
      return customPricing[pkg.id];
    }
    if (pkg.pricingTiers && pkg.pricingTiers.length > 0) {
      const activeTier = selectedTierByPkg[pkg.id] || pkg.pricingTiers[0];
      return formatInrAmount(activeTier.amountInr);
    }
    switch (currency) {
      case 'INR':
        return pkg.priceInr;
      case 'USD':
        return pkg.priceUsd;
      case 'EUR':
        return pkg.priceUsd.replace('$', '€');
      case 'GBP':
        return pkg.priceUsd.replace('$', '£');
      default:
        return pkg.priceInr;
    }
  };

  return (
    <section id="packages" className="py-20 lg:py-28 relative bg-[#08070c] overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-800/40 text-purple-300 text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>FEATURED CONSULTATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-tight">
            CONSULTATION PACKAGES
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Choose a structured reading session designed to give you profound depth, clarity, and peace of mind.
          </p>

          {/* Currency Toggle */}
          <div className="inline-flex items-center gap-2 mt-6 p-1 bg-[#130f24] rounded-full border border-purple-800/40 text-xs">
            <span className="text-slate-400 px-3 font-medium">Currency:</span>
            {(['INR', 'USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-3 py-1 rounded-full font-bold transition-all ${
                  currency === c
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CONSULTATION_PACKAGES.map((pkg) => {
            const activeTier =
              pkg.pricingTiers && pkg.pricingTiers.length > 0
                ? selectedTierByPkg[pkg.id] || pkg.pricingTiers[0]
                : null;
            const activeTierKey = activeTier?.id || activeTier?.label;

            return (
              <div
                key={pkg.id}
                className={`glass-card rounded-3xl p-7 flex flex-col justify-between relative transition-all duration-300 ${
                  pkg.popular
                    ? 'border-2 border-purple-500/80 shadow-2xl shadow-purple-950/80 ring-1 ring-purple-500/50 scale-[1.02] bg-gradient-to-b from-[#1c1538] to-[#0f0b1e]'
                    : 'border border-purple-800/30 hover:border-purple-600/50'
                }`}
              >
                {/* Popular Tag */}
                {pkg.popular && (
                  <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg shadow-purple-950 border border-purple-300/30">
                      MOST RECOMMENDED
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between text-xs text-purple-300 font-medium mb-3">
                    <span className="flex items-center gap-1.5 bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-800/40">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      <span>{pkg.duration}</span>
                    </span>
                  </div>

                  <h3 className="font-syne text-xl font-bold text-white mb-2">
                    {pkg.title}
                  </h3>

                  {pkg.subtitle && (
                    <p className="text-xs font-semibold text-purple-300 mb-1.5">
                      {pkg.subtitle}
                    </p>
                  )}

                  <p className={`text-slate-300 text-xs leading-relaxed ${pkg.pricingTiers ? 'mb-4' : 'mb-6 min-h-[3rem]'}`}>
                    {pkg.tagline}
                  </p>

                  {/* Price Display */}
                  <div className="mb-5 pt-4 border-t border-purple-900/40">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="font-syne text-3xl font-extrabold text-white">
                        {formatPrice(pkg)}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {activeTier ? `/ ${activeTier.label}` : '/ session'}
                      </span>
                    </div>
                  </div>

                  {/* Tiered Pricing Options (if present) */}
                  {pkg.pricingTiers && pkg.pricingTiers.length > 0 ? (
                    <div className="space-y-4 mb-6">
                      {pkg.pricingGroupTitle && (
                        <h4 className="font-syne text-xs font-bold text-purple-200 tracking-wider uppercase">
                          {pkg.pricingGroupTitle}
                        </h4>
                      )}
                      <div className="space-y-1.5">
                        {pkg.pricingTiers.map((tier) => {
                          const tierKey = tier.id || tier.label;
                          const isSelected = activeTierKey === tierKey;
                          return (
                            <button
                              key={tierKey}
                              type="button"
                              onClick={() =>
                                setSelectedTierByPkg((prev) => ({
                                  ...prev,
                                  [pkg.id]: tier
                                }))
                              }
                              className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs border transition-all cursor-pointer text-left ${
                                isSelected
                                  ? 'bg-purple-700/35 border-purple-400/70 text-white shadow-sm'
                                  : 'bg-[#140f29]/80 border-purple-800/30 text-slate-300 hover:border-purple-600/50 hover:text-white'
                              }`}
                            >
                              <span className="font-medium">{tier.label}</span>
                              <span className="font-syne font-bold text-purple-200 shrink-0">
                                {formatInrAmount(tier.amountInr)}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {pkg.secondaryPricingGroups?.map((group) => (
                        <div key={group.title} className="pt-3 border-t border-purple-900/40 space-y-2">
                          <div>
                            <h4 className="font-syne text-xs font-bold text-white tracking-wider uppercase">
                              {group.title}
                            </h4>
                            {group.subtitle && (
                              <p className="text-[11px] text-purple-300/90 mt-0.5 leading-snug font-medium">
                                {group.subtitle}
                              </p>
                            )}
                            {group.description && (
                              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                                {group.description}
                              </p>
                            )}
                            {group.badge && (
                              <span className="inline-block mt-1.5 text-[10px] font-bold tracking-wider uppercase text-purple-300 bg-purple-950/80 border border-purple-800/40 px-2 py-0.5 rounded-full">
                                {group.badge}
                              </span>
                            )}
                          </div>
                          <div className="space-y-1.5">
                            {group.tiers.map((tier) => {
                              const isSelected = activeTierKey === tier.id;
                              return (
                                <button
                                  key={tier.id}
                                  type="button"
                                  onClick={() =>
                                    setSelectedTierByPkg((prev) => ({
                                      ...prev,
                                      [pkg.id]: {
                                        id: tier.id,
                                        label: group.badge ? `${group.badge} • ${tier.label}` : `${group.title} • ${tier.label}`,
                                        amountInr: tier.amountInr
                                      }
                                    }))
                                  }
                                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs border transition-all cursor-pointer text-left ${
                                    isSelected
                                      ? 'bg-purple-700/35 border-purple-400/70 text-white shadow-sm'
                                      : 'bg-[#140f29]/80 border-purple-800/30 text-slate-300 hover:border-purple-600/50 hover:text-white'
                                  }`}
                                >
                                  <span className="font-medium">{tier.label}</span>
                                  <span className="font-syne font-bold text-purple-200 shrink-0">
                                    {formatInrAmount(tier.amountInr)}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      {pkg.benefits && pkg.benefits.length > 0 && (
                        <div className="pt-3 border-t border-purple-900/40 space-y-2.5">
                          <h4 className="font-syne text-xs font-bold text-purple-200 tracking-wider uppercase">
                            {pkg.benefitsTitle || 'BENEFITS'}
                          </h4>
                          <ul className="space-y-2">
                            {pkg.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                                <div className="w-4 h-4 rounded-full bg-purple-900/80 flex items-center justify-center shrink-0 mt-0.5">
                                  <Check className="w-2.5 h-2.5 text-purple-200" />
                                </div>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {pkg.closingNote && (
                        <p className="text-[11px] text-slate-300 leading-relaxed pt-2 border-t border-purple-900/40">
                          {pkg.closingNote}
                        </p>
                      )}
                    </div>
                  ) : (
                    /* Features List */
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <div className="w-4 h-4 rounded-full bg-purple-900/80 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-purple-200" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Book Button */}
                <button
                  onClick={() => onBookClick(undefined, pkg.id, activeTier?.label || '')}
                  className={`w-full py-3.5 rounded-full text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-900/50 hover:scale-[1.02]'
                      : 'bg-[#181232] border border-purple-700/40 text-purple-200 hover:bg-purple-600 hover:text-white'
                  }`}
                >
                  <span>BOOK NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            );
          })}
        </div>

        {/* Pricing Note */}
        <p className="text-center text-xs text-slate-400 mt-8">
          * Prices are customizable per client requirements. Need a custom package or group event session?{' '}
          <a href="#contact" className="text-purple-300 underline font-semibold">Contact Neha directly</a>.
        </p>

      </div>
    </section>
  );
};
