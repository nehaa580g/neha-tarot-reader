import React, { useState, useEffect } from 'react';
import { Sparkles, Send, Mail, Instagram, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { EXPERT_INFO, SERVICES, CONSULTATION_PACKAGES } from '../data/content';
import { BookingFormData, Currency } from '../types';
import { supabase } from '../lib/supabase';

interface BookingFormProps {
  initialServiceId?: string;
  initialPackageId?: string;
  initialPackageTier?: string;
  currency?: Currency;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialServiceId,
  initialPackageId,
  initialPackageTier,
  currency = 'INR'
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    serviceId: initialServiceId || 'tarot',
    packageId: initialPackageId || '',
    preferredDate: '',
    preferredTime: '10:00 AM',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    message: ''
  });
  const [packageTier, setPackageTier] = useState<string>(initialPackageTier || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: initialServiceId }));
    }
    if (initialPackageId) {
      setFormData((prev) => ({ ...prev, packageId: initialPackageId }));
    }
    if (initialPackageTier !== undefined) {
      setPackageTier(initialPackageTier);
    }
  }, [initialServiceId, initialPackageId, initialPackageTier]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const selectedService = SERVICES.find((s) => s.id === formData.serviceId);
    const selectedPackage = CONSULTATION_PACKAGES.find((p) => p.id === formData.packageId);

    try {
      const { error } = await supabase.from('appointment_bookings').insert([
        {
          full_name: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service_id: formData.serviceId,
          service_title: selectedService?.title || formData.serviceId,
          package_id: formData.packageId || null,
          package_tier: packageTier || selectedPackage?.title || null,
          currency,
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
          birth_date: formData.birthDate?.trim() || null,
          birth_time: formData.birthTime?.trim() || null,
          birth_location: formData.birthLocation?.trim() || null,
          message: formData.message.trim() || null,
          status: 'pending'
        }
      ]);

      if (error) {
        throw error;
      }

      setSubmitted(true);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'object' && err !== null && 'message' in err
            ? String((err as { message: unknown }).message)
            : 'Unable to save your booking right now. Please try again.';
      console.error('Supabase booking insert failed:', err);
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative bg-[#0a0812] overflow-hidden">
      
      {/* Background Lights */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-8">
            
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-800/40 text-purple-300 text-xs font-bold tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>REACH OUT DIRECTLY</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-tight">
                BOOK YOUR CONSULTATION
              </h2>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                Have questions before booking or want to reserve a custom reading? Send a message or reach out via WhatsApp.
              </p>
            </div>

            {/* Quick Contact Buttons */}
            <div className="space-y-4">
              
              {/* WhatsApp Button */}
              <a
                href={EXPERT_INFO.contact.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-5 rounded-2xl glass-card border border-emerald-500/30 hover:border-emerald-400 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase block">
                      INSTANT WHATSAPP CHAT
                    </span>
                    <span className="font-syne text-sm font-bold text-white">
                      {EXPERT_INFO.contact.whatsapp}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  MESSAGE →
                </span>
              </a>

              {/* Email Button */}
              <a
                href={`mailto:${EXPERT_INFO.contact.email}`}
                className="flex items-center justify-between p-5 rounded-2xl glass-card border border-purple-800/30 hover:border-purple-500/40 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-950/80 border border-purple-700/40 flex items-center justify-center text-purple-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-400 tracking-wider uppercase block">
                      DIRECT EMAIL INQUIRY
                    </span>
                    <span className="font-syne text-sm font-bold text-white">
                      {EXPERT_INFO.contact.email}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-purple-300 group-hover:translate-x-1 transition-transform">
                  EMAIL →
                </span>
              </a>

              {/* Instagram Link */}
              <a
                href={EXPERT_INFO.contact.instagramLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-5 rounded-2xl glass-card border border-purple-800/30 hover:border-purple-500/40 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-950/80 border border-purple-700/40 flex items-center justify-center text-purple-300">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-400 tracking-wider uppercase block">
                      INSTAGRAM PROFILE
                    </span>
                    <span className="font-syne text-sm font-bold text-white">
                      {EXPERT_INFO.contact.instagram}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-purple-300 group-hover:translate-x-1 transition-transform">
                  FOLLOW →
                </span>
              </a>

            </div>

            {/* Note box */}
            <div className="p-4 rounded-xl bg-[#140e29] border border-purple-900/40 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-purple-200 block">Response Guarantee</span>
              <p>All reading requests are reviewed and confirmed within 12 hours. Calendar slots are held upon confirmation.</p>
            </div>

          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-purple-800/30 shadow-2xl relative">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-xl">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <h3 className="font-syne text-2xl font-bold text-white">
                    BOOKING REQUEST RECEIVED!
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-purple-200">{formData.fullName}</strong>. Neha&apos;s team has logged your slot request for{' '}
                    <span className="text-purple-200 font-bold">{formData.preferredDate || 'your chosen date'} at {formData.preferredTime}</span>.
                  </p>

                  <div className="bg-[#150f2f] rounded-2xl p-4 border border-purple-800/40 text-left max-w-md mx-auto text-xs space-y-2">
                    <div className="flex justify-between text-slate-300">
                      <span>Service:</span>
                      <strong className="text-white uppercase">
                        {SERVICES.find((s) => s.id === formData.serviceId)?.title || formData.serviceId}
                      </strong>
                    </div>
                    {(formData.packageId || packageTier) && (
                      <div className="flex justify-between text-slate-300">
                        <span>Package / Option:</span>
                        <strong className="text-purple-200">
                          {packageTier ||
                            CONSULTATION_PACKAGES.find((p) => p.id === formData.packageId)?.title ||
                            formData.packageId}
                        </strong>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-300">
                      <span>Confirmation Sent To:</span>
                      <strong className="text-purple-200">{formData.email}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSubmitError(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        serviceId: initialServiceId || 'tarot',
                        packageId: initialPackageId || '',
                        preferredDate: '',
                        preferredTime: '10:00 AM',
                        birthDate: '',
                        birthTime: '',
                        birthLocation: '',
                        message: ''
                      });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-syne text-xl font-bold text-white mb-4">
                    Reservation Details
                  </h3>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Maya Sharma"
                        className="w-full bg-[#130d29] border border-purple-800/40 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. maya@example.com"
                        className="w-full bg-[#130d29] border border-purple-800/40 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* Phone & Service Select */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#130d29] border border-purple-800/40 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Select Service *
                      </label>
                      <select
                        value={formData.serviceId}
                        onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                        className="w-full bg-[#130d29] border border-purple-800/40 rounded-xl px-3 py-3 text-white text-xs focus:outline-none focus:border-purple-500"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.number} — {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full bg-[#130d29] border border-purple-800/40 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Preferred Time Slot
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full bg-[#130d29] border border-purple-800/40 rounded-xl px-3 py-3 text-white text-xs focus:outline-none focus:border-purple-500"
                      >
                        <option value="10:00 AM">10:00 AM (Morning)</option>
                        <option value="02:00 PM">02:00 PM (Afternoon)</option>
                        <option value="06:00 PM">06:00 PM (Evening)</option>
                        <option value="09:00 PM">09:00 PM (Late Evening)</option>
                      </select>
                    </div>
                  </div>

                  {/* Optional Birth Details (for Astrology / Numerology) */}
                  {(formData.serviceId === 'astrology' || formData.serviceId === 'numerology') && (
                    <div className="p-4 rounded-xl bg-[#140f2e] border border-purple-800/30 space-y-3">
                      <span className="text-xs font-bold text-purple-300 block">
                        Astrology / Birth Chart Details (Optional but Recommended)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Birth Date (DD/MM/YYYY)"
                          value={formData.birthDate}
                          onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                          className="bg-[#1a123a] border border-purple-800/40 rounded-lg px-3 py-2 text-white text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Birth Time (e.g. 04:15 PM)"
                          value={formData.birthTime}
                          onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                          className="bg-[#1a123a] border border-purple-800/40 rounded-lg px-3 py-2 text-white text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Birth City / Country"
                          value={formData.birthLocation}
                          onChange={(e) => setFormData({ ...formData, birthLocation: e.target.value })}
                          className="bg-[#1a123a] border border-purple-800/40 rounded-lg px-3 py-2 text-white text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* Optional Package Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Select Package (Optional)
                    </label>
                    <select
                      value={formData.packageId || ''}
                      onChange={(e) => {
                        setFormData({ ...formData, packageId: e.target.value });
                        setPackageTier('');
                      }}
                      className="w-full bg-[#130d29] border border-purple-800/40 rounded-xl px-3 py-3 text-white text-xs focus:outline-none focus:border-purple-500"
                    >
                      <option value="">General Consultation / Decide Together</option>
                      {CONSULTATION_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.title}
                        </option>
                      ))}
                    </select>
                    {packageTier && (
                      <p className="text-[11px] text-purple-300 mt-1.5">
                        Selected Option: <strong className="text-white">{packageTier}</strong>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Your Questions or Focus Areas
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention any specific topics (career, relationships, timing) you want to explore..."
                      className="w-full bg-[#130d29] border border-purple-800/40 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>

                  {submitError && (
                    <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs leading-relaxed">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white font-bold text-xs tracking-widest shadow-xl shadow-purple-950 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>SAVING BOOKING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SUBMIT BOOKING REQUEST</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-slate-400">
                    🔒 Strictly confidential. We respect your privacy and never share your details.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
