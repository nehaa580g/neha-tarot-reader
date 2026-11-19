/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Currency } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { Services } from './components/Services';
import { InteractiveWidgets } from './components/InteractiveWidgets';
import { Packages } from './components/Packages';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>('tarot');
  const [bookingPackageId, setBookingPackageId] = useState<string | undefined>(undefined);
  const [bookingPackageTier, setBookingPackageTier] = useState<string | undefined>(undefined);
  const [adminOpen, setAdminOpen] = useState(false);

  const handleBookClick = (serviceId?: string, packageId?: string, packageTier?: string) => {
    if (serviceId) setBookingServiceId(serviceId);
    if (packageId) setBookingPackageId(packageId);
    if (packageTier !== undefined) setBookingPackageTier(packageTier);

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08070c] text-slate-100 font-sans selection:bg-purple-600/40 selection:text-purple-200">
      
      {/* Navigation */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        onBookClick={handleBookClick}
      />

      {/* Main Content Sections */}
      <main>
        <Hero onBookClick={() => handleBookClick()} />
        <TrustStrip />
        <InteractiveWidgets onBookClick={handleBookClick} />
        <Services onBook={handleBookClick} />
        <Packages
          currency={currency}
          setCurrency={setCurrency}
          onBookClick={handleBookClick}
        />
        <About />
        <FAQ />
        <BookingForm
          initialServiceId={bookingServiceId}
          initialPackageId={bookingPackageId}
          initialPackageTier={bookingPackageTier}
          currency={currency}
        />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      {/* Admin Panel Modal */}
      <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />

    </div>
  );
}
