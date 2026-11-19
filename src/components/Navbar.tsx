import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Calendar, Phone } from 'lucide-react';
import { Currency } from '../types';
import { EXPERT_INFO } from '../data/content';

interface NavbarProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onBookClick: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currency, setCurrency, onBookClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'SERVICES', href: '#services' },
    { name: 'PACKAGES', href: '#packages' },
    { name: 'ABOUT', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08070c]/90 backdrop-blur-md border-b border-purple-900/30 py-3 shadow-xl shadow-purple-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-900 via-purple-600 to-indigo-500 p-[1px] flex items-center justify-center shadow-lg shadow-purple-900/40 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0d0a18] rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-11-17_at_20.39.43_e48fd55c.jpeg"
                  alt="Unlock Future Logo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-300">
                UNLOCK FUTURE
              </span>
              <span className="text-[9px] tracking-[0.25em] text-purple-400 font-medium uppercase -mt-1">
                SPIRITUAL GUIDANCE
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold tracking-wider text-slate-300 hover:text-purple-300 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-purple-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Currency selector */}
            <div className="flex items-center bg-[#130f24] border border-purple-900/40 rounded-full px-2 py-1 text-xs font-medium text-slate-300">
              <span className="text-purple-400 mr-1 text-[10px] uppercase font-bold">CURRENCY:</span>
              {(['INR', 'USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-1.5 py-0.5 rounded-full text-[10px] transition-all ${
                    currency === c
                      ? 'bg-purple-600 text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {c === 'INR' ? '₹' : c === 'USD' ? '$' : c === 'EUR' ? '€' : '£'}
                </button>
              ))}
            </div>

            {/* Book Button */}
            <button
              onClick={() => onBookClick()}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white text-xs font-bold tracking-wider hover:from-purple-600 hover:to-indigo-500 shadow-md shadow-purple-900/40 purple-glow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-200 animate-pulse" />
              <span>BOOK A READING</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onBookClick()}
              className="sm:hidden px-3 py-1.5 rounded-full bg-purple-700 text-white text-[11px] font-bold tracking-wider"
            >
              BOOK
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#15102a] border border-purple-800/40 text-purple-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#0d091a]/95 backdrop-blur-xl border-b border-purple-900/50 shadow-2xl p-6 transition-all animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider text-slate-200 hover:text-purple-300 py-1 border-b border-purple-950/40"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Select Currency:</span>
              <div className="flex bg-[#181232] border border-purple-800/40 rounded-full p-1">
                {(['INR', 'USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      currency === c ? 'bg-purple-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-purple-700 to-indigo-600 text-white text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-950/80"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK A READING NOW</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
