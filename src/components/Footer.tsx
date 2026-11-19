import React, { useState } from 'react';
import {
  Instagram,
  Mail,
  MessageSquare,
  ArrowUp,
  Sparkles,
  CheckCircle2,
  X,
  Globe,
  Phone,
  Youtube,
  Facebook,
  Share2,
  Bookmark,
  Lock
} from 'lucide-react';
import { EXPERT_INFO } from '../data/content';

const POLICY_CONTENT: Record<string, string> = {
  'Privacy Policy':
    'All personal details, birth information, contact details, and questions shared during your consultation or booking are kept strictly confidential and are never sold or shared with third parties.',
  'Terms & Conditions':
    'By booking a reading, healing session, or purchasing digital products from Unlock Future, you agree to use all guidance responsibly for personal insight and self-reflection.',
  'Refund & Cancellation Policy':
    'Consultation bookings may be rescheduled with advance notice. Due to the personalized nature of live readings, remedies, and instant digital downloads, completed sessions and downloaded digital products are non-refundable.',
  'Booking Policy':
    'Sessions are scheduled in advance based on availability. Please provide accurate contact details and your focused questions prior to your slot so your reading can begin smoothly.',
  'Payment Policy':
    'Full payment is required in advance to confirm consultation slots, personalized remedies, or digital product orders. Multiple currencies (INR, USD, EUR, GBP) are supported.',
  'Digital Product Policy':
    'All digital ebooks, affirmation journals, and workbooks are delivered as downloadable PDF files for personal use only and come with lifetime access to your purchased files.',
  'Disclaimer':
    'All tarot readings and spiritual guidance are provided for personal insight, self-reflection and entertainment purposes. Readings are not guaranteed predictions of future events and should not replace professional medical, legal, financial or mental health advice. All personal information shared during consultations is treated with care and confidentiality.'
};

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activePolicy, setActivePolicy] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail.trim()) return;
    setSubscribed(true);
    setSubscribeEmail('');
  };

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Me', href: '#about' },
    { label: 'Our Services', href: '#services' },
    { label: 'Pricing & Packages', href: '#packages' },
    { label: 'How It Works', href: '#services' },
    { label: 'Client Reviews', href: '#about' },
    { label: 'Frequently Asked Questions', href: '#faq' },
    { label: 'Contact Us', href: '#contact' }
  ];

  const ourServices = [
    { label: 'Tarot Card Reading', href: '#services' },
    { label: 'Full Life Reading', href: '#packages' },
    { label: 'Love & Relationship Reading', href: '#packages' },
    { label: 'Career & Financial Reading', href: '#packages' },
    { label: 'Digital Products', href: '#services' },
    { label: 'Audio Call Consultation', href: '#packages' },
    { label: 'Spiritual Remedies', href: '#services' },
    { label: 'Healing & Manifestation', href: '#services' }
  ];

  const socialChannels = [
    {
      name: 'Instagram',
      href: EXPERT_INFO.contact.instagramLink,
      icon: <Instagram className="w-3.5 h-3.5" />
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      icon: <Youtube className="w-3.5 h-3.5" />
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: <Facebook className="w-3.5 h-3.5" />
    },
    {
      name: 'Reddit',
      href: 'https://reddit.com',
      icon: <Share2 className="w-3.5 h-3.5" />
    },
    {
      name: 'Pinterest',
      href: 'https://pinterest.com',
      icon: <Bookmark className="w-3.5 h-3.5" />
    },
    {
      name: 'WhatsApp',
      href: EXPERT_INFO.contact.whatsappLink,
      icon: <MessageSquare className="w-3.5 h-3.5" />
    }
  ];

  const importantLinks = Object.keys(POLICY_CONTENT);

  return (
    <footer className="bg-[#050408] border-t border-purple-900/30 pt-16 pb-10 text-slate-400 text-xs relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[240px] bg-purple-950/25 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Top Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-purple-950/80">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-900 via-purple-600 to-indigo-500 p-[1px] flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-[#0d0a18] rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2026-11-17_at_20.39.43_e48fd55c.jpeg"
                    alt="Unlock Future Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-lg font-bold tracking-widest text-white">
                  UNLOCK FUTURE
                </span>
                <span className="text-[10px] tracking-[0.22em] text-purple-400 font-semibold uppercase -mt-0.5">
                  Spiritual Guidance
                </span>
              </div>
            </div>

            <p className="font-cormorant italic text-base text-purple-200/90 font-light">
              &ldquo;Guidance for Your Journey. Clarity for Your Next Step.&rdquo;
            </p>

            <p className="text-slate-300 text-xs leading-relaxed">
              Welcome to Unlock Future, your destination for Tarot Readings, Spiritual Guidance, Healing and Manifestation.
            </p>

            <p className="text-slate-400 text-xs leading-relaxed">
              Explore your love life, relationships, career, finances and personal growth through personalized spiritual guidance.
            </p>

            {/* FOLLOW US */}
            <div className="pt-2">
              <h4 className="font-syne text-[11px] font-bold tracking-widest text-white uppercase mb-3">
                FOLLOW US
              </h4>
              <div className="flex flex-wrap gap-2">
                {socialChannels.map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#130f24] border border-purple-800/40 text-slate-300 hover:text-purple-200 hover:border-purple-500/60 transition-colors text-[11px]"
                  >
                    {channel.icon}
                    <span>{channel.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-2">
            <h4 className="font-syne text-xs font-bold tracking-widest text-white uppercase mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-purple-300 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* OUR SERVICES */}
          <div className="lg:col-span-3">
            <h4 className="font-syne text-xs font-bold tracking-widest text-white uppercase mb-4">
              OUR SERVICES
            </h4>
            <ul className="space-y-2.5">
              {ourServices.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-purple-300 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT US */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-syne text-xs font-bold tracking-widest text-white uppercase">
              CONTACT US
            </h4>
            <p className="text-purple-300 font-medium text-xs">
              For Bookings &amp; Personal Consultations
            </p>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400">Email: </span>
                  <a
                    href="mailto:unlockfuture111@gmail.com"
                    className="text-purple-200 font-semibold hover:underline break-all"
                  >
                    unlockfuture111@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400">WhatsApp: </span>
                  <a
                    href={EXPERT_INFO.contact.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    9056516232
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400">Availability: </span>
                  <span className="text-slate-200">Worldwide Online Consultations</span>
                </div>
              </li>
            </ul>
            <p className="text-slate-400 text-[11px] leading-relaxed pt-1">
              For bookings, questions and personalized reading inquiries, feel free to contact us.
            </p>
          </div>
        </div>

        {/* Newsletter + Important Information Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-purple-950/80 items-start">
          {/* STAY CONNECTED WITH THE UNIVERSE */}
          <div className="lg:col-span-7 bg-[#0d0a19] border border-purple-800/35 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h4 className="font-syne text-xs sm:text-sm font-bold tracking-widest text-white uppercase">
                STAY CONNECTED WITH THE UNIVERSE ✨
              </h4>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Subscribe to receive spiritual messages, tarot guidance, manifestation tips, special offers and the latest updates.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-950/40 border border-emerald-500/30 rounded-xl px-4 py-3">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you for subscribing! You&apos;re connected for spiritual updates and special offers.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-1">
                <input
                  type="email"
                  required
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder="Enter your email address."
                  className="flex-1 bg-[#140f29] border border-purple-800/40 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white font-bold text-xs tracking-widest hover:from-purple-600 hover:to-indigo-500 transition-all cursor-pointer uppercase"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>

          {/* IMPORTANT INFORMATION */}
          <div className="lg:col-span-5">
            <h4 className="font-syne text-xs font-bold tracking-widest text-white uppercase mb-3">
              IMPORTANT INFORMATION
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {importantLinks.map((policy) => (
                <li key={policy}>
                  <button
                    type="button"
                    onClick={() => setActivePolicy(policy)}
                    className="text-left text-slate-300 hover:text-purple-300 transition-colors cursor-pointer"
                  >
                    {policy}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DISCLAIMER */}
        <div className="bg-[#0b0815] border border-purple-900/30 rounded-2xl p-5 space-y-2">
          <h4 className="font-syne text-[11px] font-bold tracking-widest text-purple-300 uppercase">
            DISCLAIMER
          </h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            All tarot readings and spiritual guidance are provided for personal insight, self-reflection and entertainment purposes. Readings are not guaranteed predictions of future events and should not replace professional medical, legal, financial or mental health advice. All personal information shared during consultations is treated with care and confidentiality.
          </p>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="text-center sm:text-left space-y-0.5">
            <p className="text-slate-200 font-semibold">
              © {new Date().getFullYear()} Unlock Future. All Rights Reserved.
            </p>
            <p className="text-purple-300/80 italic font-cormorant text-sm">
              Guidance for Your Journey. Clarity for Your Next Step.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-purple-300 transition-colors cursor-pointer font-semibold tracking-wider"
            >
              <Lock className="w-3 h-3" />
              <span>ADMIN PORTAL</span>
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-200 transition-colors cursor-pointer font-semibold tracking-wider"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Policy Detail Modal */}
      {activePolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0f0b1e] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setActivePolicy(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#1c1633] border border-purple-800/40 text-slate-300 hover:text-white"
              aria-label="Close policy dialog"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-syne text-lg font-bold text-white mb-3 pr-8">
              {activePolicy}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              {POLICY_CONTENT[activePolicy]}
            </p>
            <button
              type="button"
              onClick={() => setActivePolicy(null)}
              className="px-6 py-2.5 rounded-full bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold tracking-wider cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
