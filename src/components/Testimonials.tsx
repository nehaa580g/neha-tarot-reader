import React, { useState } from 'react';
import { Star, Sparkles, MessageSquare, Plus, X, Send } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';
import { Testimonial } from '../types';

export const Testimonials: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state for user submitted review
  const [newReview, setNewReview] = useState({
    name: '',
    location: '',
    serviceUsed: 'Tarot Card Reading',
    rating: 5,
    review: ''
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.review) return;

    const item: Testimonial = {
      id: `review-${Date.now()}`,
      name: newReview.name,
      location: newReview.location || 'Client',
      serviceUsed: newReview.serviceUsed,
      rating: newReview.rating,
      date: 'Just now',
      review: newReview.review
    };

    setReviewsList([item, ...reviewsList]);
    setIsModalOpen(false);
    setNewReview({
      name: '',
      location: '',
      serviceUsed: 'Tarot Card Reading',
      rating: 5,
      review: ''
    });
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 relative bg-[#08070c] overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-800/40 text-purple-300 text-xs font-bold tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>CLIENT STORIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-tight">
              WHAT CLIENTS SAY
            </h2>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#181232] border border-purple-700/40 text-purple-200 text-xs font-bold hover:bg-purple-600 hover:text-white transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>SUBMIT YOUR REVIEW</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsList.map((t) => (
            <div
              key={t.id}
              className="glass-card rounded-3xl p-7 border border-purple-800/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-purple-300/80 font-semibold px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-800/30">
                    {t.serviceUsed}
                  </span>
                </div>

                <p className="text-slate-200 text-sm leading-relaxed mb-6 italic">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-purple-900/30 flex items-center justify-between text-xs">
                <div>
                  <span className="font-syne font-bold text-white block">
                    {t.name}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {t.location}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {t.date}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Review Submit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0f0b1e] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#1c1633] text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-syne text-xl font-bold text-white mb-2">Share Your Consultation Experience</h3>
            <p className="text-xs text-slate-300 mb-6">
              Your feedback helps future clients find clarity and peace of mind.
            </p>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Your Name / Initials</label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="e.g. Maya S."
                  className="w-full bg-[#150e2a] border border-purple-800/40 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                    placeholder="e.g. New Delhi"
                    className="w-full bg-[#150e2a] border border-purple-800/40 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Service Received</label>
                  <select
                    value={newReview.serviceUsed}
                    onChange={(e) => setNewReview({ ...newReview, serviceUsed: e.target.value })}
                    className="w-full bg-[#150e2a] border border-purple-800/40 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500"
                  >
                    <option value="Tarot Card Reading">Tarot Reading</option>
                    <option value="Astrology & Birth Chart">Astrology Chart</option>
                    <option value="Palm Reading">Palmistry</option>
                    <option value="Numerology Consultation">Numerology</option>
                    <option value="Full Spiritual Guidance">Full Package</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className={`p-1.5 rounded-lg border text-xs font-bold ${
                        newReview.rating >= star
                          ? 'bg-purple-900 border-purple-500 text-amber-300'
                          : 'bg-[#150e2a] border-purple-900 text-slate-500'
                      }`}
                    >
                      ★ {star}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Your Review</label>
                <textarea
                  required
                  rows={3}
                  value={newReview.review}
                  onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                  placeholder="Describe your session experience..."
                  className="w-full bg-[#150e2a] border border-purple-800/40 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT REVIEW</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
