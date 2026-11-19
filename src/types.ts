export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  highlights: string[];
  deliverablesHeading?: string;
  deliverables?: { icon: string; title: string; desc: string }[];
  benefits?: string[];
  closingNote?: { title: string; desc: string };
  durationMinutes: number;
}

export interface ConsultationPackage {
  id: string;
  title: string;
  subtitle?: string;
  tagline: string;
  duration: string;
  priceInr: string;
  priceUsd: string;
  features: string[];
  pricingGroupTitle?: string;
  pricingTiers?: { id?: string; label: string; amountInr: number }[];
  secondaryPricingGroups?: {
    title: string;
    subtitle?: string;
    description?: string;
    badge?: string;
    tiers: { id: string; label: string; amountInr: number }[];
  }[];
  closingNote?: string;
  benefitsTitle?: string;
  benefits?: string[];
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  serviceUsed: string;
  rating: number;
  date: string;
  review: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceId: string;
  packageId?: string;
  preferredDate: string;
  preferredTime: string;
  birthDate?: string;
  birthTime?: string;
  birthLocation?: string;
  message: string;
}

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';
