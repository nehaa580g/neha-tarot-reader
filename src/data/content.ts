import { ServiceItem, ConsultationPackage, Testimonial, FAQItem } from '../types';

export const EXPERT_INFO = {
  name: "Neha",
  title: "Spiritual Guidance, Tarot Reader & Healer",
  subtitle: "Counsellor • Tarot Reader • Healer",
  yearsExperience: "3+",
  readingsCompleted: "1000+",
  happyClients: "300+",
  coreServicesCount: "4+",
  tagline: "Guidance for your journey. Clarity for your next step.",
  quote: "Guidance doesn't decide your path — it helps you understand it.",
  bioParagraph1: "With over 3+ years of intuitive practice, Tarot guidance, and spiritual healing, Neha provides structured, compassionate, and empowering consultations. Her approach bridges ancient symbolic wisdom with contemporary self-awareness.",
  bioParagraph2: "Whether you are navigating career transitions, romantic crossroads, or personal alignment, every session is a supportive space to decode the energies at play in your life.",
  approachPoints: [
    {
      title: "Personalized Sessions",
      desc: "No templated answers. Every reading is tailored uniquely to your chart, palm matrix, or specific inquiry."
    },
    {
      title: "Confidential Consultations",
      desc: "Your stories, questions, and personal data remain strictly private and protected."
    },
    {
      title: "Clear & Compassionate Guidance",
      desc: "Direct, realistic insights free from fear-mongering or supernatural claims."
    },
    {
      title: "Client-Focused Experience",
      desc: "Interactive dialogue designed to grant you clarity, actionable focus, and peace of mind."
    }
  ],
  contact: {
    whatsapp: "+91 90565 16232",
    whatsappLink: "https://wa.me/919056516232?text=Hello%20Neha,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20spiritual%20consultation.",
    instagram: "@unlock_future____",
    instagramLink: "https://instagram.com/unlock_future____",
    email: "unlockfuture111@gmail.com",
    location: "Global Online Consultations & Private In-Person Appointments"
  }
};

export const SERVICES: ServiceItem[] = [
  {
    id: "tarot",
    number: "01",
    title: "Tarot Card Reading",
    category: "Intuitive Guidance",
    shortDesc: "Personalized Tarot sessions designed around your questions, emotional dynamics, and current life crossroads.",
    fullDesc: "Through archetypal card spreads, Tarot acts as a mirror to your subconscious mind and energetic state. It highlights hidden blockages, upcoming opportunities, and potential outcomes based on your present trajectory.",
    iconName: "Sparkles",
    durationMinutes: 45,
    highlights: [
      "Targeted 3-card or 10-card Celtic Cross spreads",
      "Clarity on relationships, career, and personal choices",
      "Actionable energetic advice for decision-making",
      "Recorded voice note or PDF summary included"
    ]
  },
  {
    id: "astrology",
    number: "02",
    title: "Complete Life Guidance",
    category: "Overall Reading",
    shortDesc: "Explore different areas of your life through a detailed and personalized tarot reading. Discover insights about your love life, relationships, career, finances, family, personal growth, and upcoming opportunities. This reading is designed to help you understand your current situation, recognize possible challenges, and explore the opportunities that may lie ahead.",
    fullDesc: "",
    iconName: "Compass",
    durationMinutes: 60,
    highlights: [],
    deliverables: [
      {
        icon: "💗",
        title: "Love & Relationships",
        desc: "Understand your romantic life, relationship patterns, future partner, and emotional connections."
      },
      {
        icon: "💼",
        title: "Career & Finances",
        desc: "Explore career opportunities, job changes, financial growth, and professional direction."
      },
      {
        icon: "🏡",
        title: "Family & Personal Life",
        desc: "Gain insights into family matters, personal happiness, and important life situations."
      },
      {
        icon: "🔮",
        title: "Future Predictions",
        desc: "Explore upcoming possibilities, important life changes, challenges, and opportunities."
      },
      {
        icon: "🌸",
        title: "Personal Growth & Spiritual Guidance",
        desc: "Understand your personal journey, emotional growth, and areas that need your attention."
      },
      {
        icon: "✨",
        title: "Personalized Detailed Reading",
        desc: "Receive an in-depth tarot reading with guidance based on your questions and current situation."
      }
    ]
  },
  {
    id: "palmistry",
    number: "03",
    title: "Digital Products & Spiritual Resources",
    category: "Learn, Grow & Transform Your Life",
    shortDesc: "Learn, Grow & Transform Your Life. Explore our collection of digital products created to support your journey of self-love, manifestation, emotional healing, positive thinking, and spiritual growth. Discover helpful guides, workbooks, journals, and affirmation resources that you can access anytime and use at your own pace.",
    fullDesc: "Explore our collection of digital products created to support your journey of self-love, manifestation, emotional healing, positive thinking, and spiritual growth. Discover helpful guides, workbooks, journals, and affirmation resources that you can access anytime and use at your own pace.",
    iconName: "Flower2",
    durationMinutes: 30,
    highlights: [],
    deliverablesHeading: "What You Will Find",
    deliverables: [
      {
        icon: "💗",
        title: "Love Manifestation E-books",
        desc: "Explore manifestation techniques, positive thoughts, and daily practices for your love life."
      },
      {
        icon: "🌸",
        title: "Affirmation Journals",
        desc: "Build a positive mindset with daily affirmations and self-love exercises."
      },
      {
        icon: "🔮",
        title: "Angel Guidance & Spiritual Messages",
        desc: "Receive daily inspiration, spiritual guidance, and positive messages."
      },
      {
        icon: "🦋",
        title: "Love Healing Workbooks",
        desc: "Work through emotional pain, build self-worth, and focus on personal growth."
      },
      {
        icon: "✨",
        title: "Manifestation Guides",
        desc: "Learn daily practices to focus on your goals and create positive habits."
      },
      {
        icon: "📖",
        title: "Self-Love & Personal Growth",
        desc: "Discover exercises and activities to improve your confidence and mindset."
      }
    ],
    benefits: [
      "Instant Digital Access",
      "Easy-to-Follow Content",
      "Downloadable PDF Products",
      "Learn at Your Own Pace",
      "Use Anytime, Anywhere"
    ]
  },
  {
    id: "numerology",
    number: "04",
    title: "Remedies & Healing Manifestation With Me",
    category: "Heal, Manifest & Create a Positive New Beginning",
    shortDesc: "Heal, Manifest & Create a Positive New Beginning. Start your journey towards self-love, emotional healing, inner peace, and positive transformation. Through personalized spiritual guidance, manifestation practices, affirmations, and healing exercises, I will help you focus on your intentions and build a more positive mindset.",
    fullDesc: "Start your journey towards self-love, emotional healing, inner peace, and positive transformation. Through personalized spiritual guidance, manifestation practices, affirmations, and healing exercises, I will help you focus on your intentions and build a more positive mindset.",
    iconName: "Heart",
    durationMinutes: 45,
    highlights: [],
    deliverablesHeading: "What You Will Receive",
    deliverables: [
      {
        icon: "💗",
        title: "Love & Emotional Healing",
        desc: "Focus on emotional healing, self-love, releasing past attachments, and building healthy relationship patterns."
      },
      {
        icon: "🦋",
        title: "Self-Love & Inner Healing",
        desc: "Work on self-worth, confidence, inner peace, and positive self-talk."
      },
      {
        icon: "🌸",
        title: "Love Manifestation",
        desc: "Explore manifestation practices, love affirmations, and exercises to become clear about the relationship you desire."
      },
      {
        icon: "🔮",
        title: "Personalized Affirmations",
        desc: "Receive affirmations based on your personal goals, intentions, and current situation."
      },
      {
        icon: "✨",
        title: "Spiritual Remedies",
        desc: "Explore simple spiritual practices, meditation, journaling, and positive daily rituals."
      },
      {
        icon: "🌙",
        title: "Manifestation Guidance",
        desc: "Get guidance on setting intentions, visualization, gratitude, and building consistent habits."
      }
    ],
    closingNote: {
      title: "YOUR HEALING JOURNEY STARTS HERE",
      desc: "Take time for yourself, focus on your growth, and create space for positive changes."
    }
  }
];

export const CONSULTATION_PACKAGES: ConsultationPackage[] = [
  {
    id: "quick-tarot",
    title: "CARD-BASED TAROT READINGS",
    subtitle: "Choose Your Tarot Card Spread",
    tagline: "Explore detailed tarot guidance through different card spreads.",
    duration: "Flexible Spreads",
    priceInr: "₹300",
    priceUsd: "$4",
    features: [],
    pricingTiers: [
      { id: "spread-3", label: "3-Card Reading", amountInr: 300 },
      { id: "spread-6", label: "6-Card Reading", amountInr: 800 },
      { id: "spread-10", label: "10-Card Reading", amountInr: 1700 },
      { id: "spread-22", label: "22-Card Reading", amountInr: 3500 },
      { id: "spread-44", label: "44-Card Reading", amountInr: 7500 }
    ],
    secondaryPricingGroups: [
      {
        title: "QUESTION-BASED TAROT READINGS",
        subtitle: "Get Personalized Answers to Your Questions",
        description: "Choose the number of questions you want answered through tarot guidance.",
        badge: "3-Card Reading",
        tiers: [
          { id: "q3-5", label: "5 Questions", amountInr: 2000 },
          { id: "q3-10", label: "10 Questions", amountInr: 4000 }
        ]
      },
      {
        title: "5-CARD TAROT READING",
        subtitle: "Detailed Answers for Your Personal Questions",
        tiers: [
          { id: "q5-5", label: "5 Questions", amountInr: 4000 },
          { id: "q5-10", label: "10 Questions", amountInr: 8000 }
        ]
      },
      {
        title: "AUDIO CALL",
        tiers: [
          { id: "audio-30m", label: "30 Minutes", amountInr: 3000 },
          { id: "audio-1h", label: "1 Hour", amountInr: 6000 },
          { id: "audio-2h", label: "2 Hours", amountInr: 10000 }
        ]
      }
    ]
  },
  {
    id: "deep-dive",
    title: "FULL LIFE & SPECIAL READINGS",
    subtitle: "Explore Every Important Area of Your Life",
    tagline: "Choose a personalized, in-depth tarot reading to explore different aspects of your life, relationships, career, finances, and future possibilities.",
    duration: "PREMIUM TAROT SERVICES",
    priceInr: "₹2,000",
    priceUsd: "$24",
    popular: true,
    features: [],
    pricingGroupTitle: "OUR PREMIUM READINGS",
    pricingTiers: [
      { id: "prem-monthly", label: "Monthly Prediction", amountInr: 2000 },
      { id: "prem-yearly", label: "Yearly Prediction", amountInr: 10000 },
      { id: "prem-love", label: "💗 FULL LOVE READING", amountInr: 5000 },
      { id: "prem-career", label: "💼 FULL CAREER READING", amountInr: 3000 },
      { id: "prem-finance", label: "💰 FULL FINANCIAL READING", amountInr: 5000 },
      { id: "prem-marriage", label: "💍 FULL MARRIAGE READING", amountInr: 7000 },
      { id: "prem-match", label: "❤️ MATCH MAKING READING", amountInr: 6000 },
      { id: "prem-life", label: "🔮 COMPLETE LIFE READING", amountInr: 30000 }
    ],
    closingNote: "Explore your love life, career, finances, marriage, family, personal growth, and important life opportunities through a comprehensive tarot reading."
  },
  {
    id: "love-relationship",
    title: "DIGITAL PRODUCTS & SPIRITUAL COLLECTION",
    subtitle: "Transform Your Mindset, Energy & Life",
    tagline: "Explore our exclusive collection of digital guides, manifestation ebooks, affirmation journals, and healing workbooks.",
    duration: "Instant Digital Access",
    priceInr: "₹499",
    priceUsd: "$6",
    features: [],
    pricingGroupTitle: "OUR DIGITAL COLLECTION",
    pricingTiers: [
      { id: "dig-monthly-journal", label: "💗 Monthly Affirmation Journal", amountInr: 499 },
      { id: "dig-angel-ebook", label: "🌸 Angel Guidance Ebook", amountInr: 999 },
      { id: "dig-gratitude-journal", label: "Gratitude Journal", amountInr: 999 },
      { id: "dig-positive-journal", label: "Positive Mindset Journal", amountInr: 999 },
      { id: "dig-love-ebook", label: "✨ Love Manifestation Ebook", amountInr: 1999 },
      { id: "dig-love-workbook", label: "🦋 Love Healing Workbook", amountInr: 1999 },
      { id: "dig-self-love", label: "🔮 Self-Love Workbook", amountInr: 1999 },
      { id: "dig-future-partner", label: "🌙 Future Partner Manifestation Guide", amountInr: 2999 }
    ],
    secondaryPricingGroups: [
      {
        title: "SPECIAL BUNDLES",
        tiers: [
          { id: "bun-love", label: "Love Manifestation Bundle", amountInr: 2222 },
          { id: "bun-self-love", label: "Self-Love & Healing Bundle", amountInr: 3333 },
          { id: "bun-complete", label: "Complete Spiritual Growth Bundle", amountInr: 5555 }
        ]
      }
    ],
    benefitsTitle: "BENEFITS",
    benefits: [
      "Instant Digital Download",
      "Easy-to-Read PDF Guides",
      "Available Anytime",
      "Use at Your Own Pace",
      "Lifetime Access to Purchased Files"
    ]
  },
  {
    id: "full-guidance",
    title: "SPIRITUAL REMEDIES & HEALING",
    subtitle: "Personalized Spiritual Remedies",
    tagline: "Explore personalized spiritual guidance and practices designed around your intentions and personal goals.",
    duration: "Remedies & Healing",
    priceInr: "₹800",
    priceUsd: "$10",
    features: [],
    pricingGroupTitle: "OUR REMEDY SERVICES",
    pricingTiers: [
      { id: "rem-career", label: "💼 Career related Remedies", amountInr: 800 },
      { id: "rem-finance", label: "💰 Financial stability Remedies", amountInr: 1700 },
      { id: "rem-love", label: "❤️ Love relationship Remedies", amountInr: 2500 },
      { id: "rem-marriage", label: "💍 Marriage Blockage Remedies", amountInr: 3500 },
      { id: "rem-protection", label: "🛡️ Spiritual Protection Remedies", amountInr: 4444 }
    ],
    secondaryPricingGroups: [
      {
        title: "HEALING MANIFESTATION WITH ME",
        subtitle: "Begin Your Personal Healing & Manifestation Journey",
        tiers: [
          { id: "heal-3d", label: "3-Day Journey", amountInr: 5000 },
          { id: "heal-11d", label: "11-Day Journey", amountInr: 11000 },
          { id: "heal-21d", label: "21-Day Journey", amountInr: 21000 }
        ]
      }
    ],
    benefitsTitle: "WHAT YOU WILL RECEIVE",
    benefits: [
      "Personalized Guidance",
      "Daily Affirmations",
      "Manifestation Practices",
      "Spiritual Exercises",
      "Personalized Support (as specified in your package)"
    ]
  }
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose Your Reading",
    desc: "Select the consultation service or package that aligns with your current questions and goals."
  },
  {
    step: "02",
    title: "Book Your Session",
    desc: "Fill out the consultation request with your birth details and preferred date/time slot."
  },
  {
    step: "03",
    title: "Connect",
    desc: "Join your private 1-on-1 session online via Zoom or phone, or receive a written video dossier."
  },
  {
    step: "04",
    title: "Receive Your Guidance",
    desc: "Walk away with clear insights, actionable perspectives, and full session recordings."
  }
];

export const WHY_CHOOSE_ME = [
  {
    title: "PERSONALIZED",
    desc: "Every single session is uniquely tailored to your individual energy, birth chart, and personal background."
  },
  {
    title: "PRIVATE & CONFIDENTIAL",
    desc: "A safe, non-judgmental space where your personal story and details are kept in strict confidence."
  },
  {
    title: "PROFESSIONAL",
    desc: "Structured, punctual, and client-centric approach that respects your time and practical realities."
  },
  {
    title: "FLEXIBLE",
    desc: "Seamless online audio/video consultations across global time zones with instant calendar booking."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Aarav M.",
    location: "Mumbai, India",
    serviceUsed: "Full Spiritual Guidance",
    rating: 5,
    date: "2 weeks ago",
    review: "Neha's birth chart reading provided astonishing clarity during my career pivot. Her insights were realistic, compassionate, and deeply grounding. Highly recommended!"
  },
  {
    id: "t2",
    name: "Elena R.",
    location: "London, UK",
    serviceUsed: "Tarot Card Reading",
    rating: 5,
    date: "1 month ago",
    review: "I was at a massive relationship crossroad. The 30-minute Tarot session gave me the exact emotional clarity I needed without any vague statements. Truly transformative."
  },
  {
    id: "t3",
    name: "Siddharth K.",
    location: "Bengaluru, India",
    serviceUsed: "Numerology & Astrology",
    rating: 5,
    date: "3 weeks ago",
    review: "The Life Path numerology breakdown matched my life experiences almost verbatim. Neha explains complex astrological terms in simple, practical language."
  },
  {
    id: "t4",
    name: "Sophia T.",
    location: "Dubai, UAE",
    serviceUsed: "Deep Dive Session",
    rating: 5,
    date: "2 months ago",
    review: "Incredible attention to detail! The recording and written dossier were super helpful to review weeks later. Neha is a genuine master of her craft."
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What happens during a Tarot reading?",
    category: "Tarot",
    answer: "During a session, we start by clarifying your main questions or focus areas. Neha shuffles and lays out specific tarot spreads. We interpret the symbolism together to understand present dynamics, underlying challenges, and future potentials."
  },
  {
    id: "faq-2",
    question: "How does an Astrology consultation work?",
    category: "Astrology",
    answer: "Before your session, Neha calculates your exact astrological natal chart using your birth date, birth time, and birth city. During the call, we explore your planetary placements, current transit cycles, and upcoming cosmic influences."
  },
  {
    id: "faq-3",
    question: "How should I prepare for my session?",
    category: "Preparation",
    answer: "Have your exact birth details ready (date, time, location). Jot down 2-3 core questions or themes you wish to explore. Approach the session with an open, reflective mindset."
  },
  {
    id: "faq-4",
    question: "Can I ask specific questions during a reading?",
    category: "General",
    answer: "Absolutely. Specific questions about career decisions, relationship dynamics, timing, or personal growth lead to the most clear and actionable guidance."
  },
  {
    id: "faq-5",
    question: "Are online consultations available?",
    category: "Booking",
    answer: "Yes, all readings are conducted globally via Google Meet, Zoom, or WhatsApp video call. You will receive a direct link and calendar invite upon booking."
  },
  {
    id: "faq-6",
    question: "How do I book a session?",
    category: "Booking",
    answer: "Simply select your preferred service or package on this website, choose a date and time slot in the booking form, and submit your request. Our team will confirm your slot within 12 hours."
  }
];

export const TAROT_DECK_SAMPLE = [
  {
    name: "The Star",
    keyword: "Hope • Inspiration • Renewal",
    meaning: "A sign of hope, unexpected peace, and renewed faith in your long-term journey. Trust the timing of your evolution.",
    element: "Air"
  },
  {
    name: "The High Priestess",
    keyword: "Intuition • Mystery • Inner Wisdom",
    meaning: "Honor your inner voice. Answers are currently found through introspection, quiet observation, and dream insights.",
    element: "Water"
  },
  {
    name: "The Sun",
    keyword: "Joy • Success • Vitality",
    meaning: "Radiant clarity and enthusiasm. Obstacles dissolve as truth, vitality, and authentic alignment shine through.",
    element: "Fire"
  },
  {
    name: "The Wheel of Fortune",
    keyword: "Cycles • Karma • Turning Point",
    meaning: "A positive cosmic shift is underway. Embrace adaptability as new doors open and momentum builds.",
    element: "Fire/Earth"
  },
  {
    name: "Ace of Pentacles",
    keyword: "New Opportunity • Abundance • Stability",
    meaning: "A tangible seed of growth in career, finances, or personal health. Ground your ideas into practical action.",
    element: "Earth"
  },
  {
    name: "Two of Cups",
    keyword: "Partnership • Harmony • Mutual Respect",
    meaning: "A connection characterized by emotional reciprocity, trust, and shared understanding.",
    element: "Water"
  }
];
