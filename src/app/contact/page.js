'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  Car,
} from 'lucide-react';

const INQUIRY_TOPICS = [
  'Bridal & Wedding Consultation',
  'VIP Private Salon Event',
  'Custom Treatment Recommendation',
  'Appointment Rescheduling / Inquiry',
  'Product & Botanical Formulations',
  'Other Inquiries',
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(INQUIRY_TOPICS[0]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate concierge dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      toast.success('Thank you! Our salon concierge will reply within 2 hours.');
      setName('');
      setEmail('');
      setMessage('');
    }, 800);
  };

  return (
    <div className="space-y-10 sm:space-y-12 pb-20">
      {/* 1. TOP HERO HEADER BANNER / GTA LEONIDA SUNSET */}
      <section className="py-12 sm:py-16 gta6:bg-gradient-to-br gta6:from-[#1B103B] gta6:via-[#3D2166] gta6:to-[#7E4674] gta6:border-b gta6:border-[#F7B286]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#A2683A]/10 text-[#824D25] border border-[#A2683A]/20 gta6:bg-[#160D30]/80 gta6:border-[#F7B286]/40 gta6:text-[#FDE08D] text-[11px] font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#A2683A] gta6:text-[#FDE08D]" />
            <span>Concierge Services</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#181512] gta6:text-white tracking-tight">
            Connect With Our Concierge
          </h1>
          <p className="text-sm sm:text-base text-stone-600 gta6:text-[#F3E8FF] leading-relaxed font-light">
            Whether planning a bridal bespoke suite, corporate retreat, or requesting a tailored treatment consultation, our team is at your service.
          </p>
        </div>

        {/* GTA Mode Leonida Sunset Glow & Palm Ambience */}
        <div className="hidden gta6:block absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -right-10 -bottom-10 w-96 h-96 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FF7A00]/25 via-[#FF2E93]/20 to-transparent blur-3xl" />
          <div className="absolute left-1/4 top-0 w-72 h-72 rounded-full bg-[#3D2166]/40 blur-3xl" />
          <svg viewBox="0 0 160 160" className="absolute -bottom-4 right-8 w-36 h-36 text-white/5 fill-current">
            <path d="M10 160 Q20 100 60 60 Q50 60 20 105 Q10 135 10 160 Z" />
            <path d="M60 60 Q110 30 140 50 Q100 60 60 60 Z" />
            <path d="M60 60 Q120 60 140 90 Q105 85 60 60 Z" />
            <path d="M60 60 Q95 100 110 130 Q90 105 60 60 Z" />
            <path d="M60 60 Q30 45 10 55 Q40 60 60 60 Z" />
            <path d="M60 60 Q30 75 15 100 Q45 85 60 60 Z" />
          </svg>
        </div>
      </section>

      {/* Two-Column Concierge Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Studio & Contact Info (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white/80 backdrop-blur-md border border-stone-200/80 rounded-3xl p-7 sm:p-9 space-y-7 shadow-sm">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#181512]">
                Flagship Studio & Sanctuary
              </h2>
              <p className="text-xs text-stone-500 mt-1 font-light">
                Located in the heart of the Madison Avenue beauty district.
              </p>
            </div>

            <div className="space-y-5 text-sm">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#824D25]/10 text-[#A2683A] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#181512] text-[11px] uppercase tracking-wider">
                    Studio Location
                  </p>
                  <p className="text-stone-700 mt-0.5 leading-relaxed font-light">
                    452 Madison Avenue, Suite 800
                    <br />
                    New York, NY 10022
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#824D25]/10 text-[#A2683A] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#181512] text-[11px] uppercase tracking-wider">
                    Concierge Desk
                  </p>
                  <p className="text-stone-700 mt-0.5 font-light">+1 (800) 555-SALON</p>
                  <p className="text-stone-400 text-xs mt-0.5 font-light">Direct SMS assistance available</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#824D25]/10 text-[#A2683A] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#181512] text-[11px] uppercase tracking-wider">
                    Email Correspondence
                  </p>
                  <p className="text-stone-700 mt-0.5 font-light">concierge@salonbook.com</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-stone-200/80">
                <div className="w-9 h-9 rounded-full bg-[#824D25]/10 text-[#A2683A] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-semibold text-[#181512] uppercase tracking-wider">
                    Studio Operating Hours
                  </p>
                  <p className="text-stone-700 font-light">
                    <strong className="font-medium text-[#181512]">Mon – Sat:</strong> 9:00 AM – 8:00 PM
                  </p>
                  <p className="text-stone-700 font-light">
                    <strong className="font-medium text-[#181512]">Sunday:</strong> 10:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Valet Parking Amenity */}
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 flex items-center gap-3">
              <Car className="w-5 h-5 text-[#A2683A] shrink-0" />
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Complimentary curbside valet parking is available for all reserved appointments.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Inquiry Form (7 cols) */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md border border-stone-200/80 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-1 border-b border-stone-100 pb-4">
            <h2 className="font-serif text-2xl font-semibold text-[#181512]">
              Send an Inquiry
            </h2>
            <p className="text-xs text-stone-500 font-light">
              Our lead salon director will reply promptly with answers or custom itineraries.
            </p>
          </div>

          {isSent && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Thank you! Your message has been routed to our concierge team. We will contact you within 2 hours.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-widest mb-1.5">
                Full Name <span className="text-[#A2683A]">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Genevieve Dupont"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A2683A]/20 focus:border-[#A2683A] text-sm text-[#181512] placeholder:text-stone-400 transition-all"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-widest mb-1.5">
                Email Address <span className="text-[#A2683A]">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="genevieve@example.com"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A2683A]/20 focus:border-[#A2683A] text-sm text-[#181512] placeholder:text-stone-400 transition-all"
              />
            </div>

            {/* Topic Select */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-widest mb-1.5">
                Inquiry Topic <span className="text-[#A2683A]">*</span>
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-stone-200 bg-[#FAF7F2]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A2683A]/20 focus:border-[#A2683A] text-sm text-[#181512] cursor-pointer transition-all"
              >
                {INQUIRY_TOPICS.map((top) => (
                  <option key={top} value={top}>
                    {top}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-widest mb-1.5">
                Message & Desired Dates <span className="text-[#A2683A]">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your goals, preferred appointment date, or specific bridal requests..."
                className="w-full p-3.5 rounded-xl border border-stone-200 bg-[#FAF7F2]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A2683A]/20 focus:border-[#A2683A] text-sm text-[#181512] placeholder:text-stone-400 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-[#A2683A] to-[#824D25] hover:opacity-95 shadow-md shadow-[#824D25]/15 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Concierge Inquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}
