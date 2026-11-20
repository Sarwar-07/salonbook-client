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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-800/10 text-amber-900 border border-amber-800/20 text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-800" />
          <span>Concierge Services</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Connect With Our Concierge
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Whether planning a bridal bespoke suite, corporate retreat, or requesting a tailored treatment consultation, our team is at your service.
        </p>
      </div>

      {/* Two-Column Concierge Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Studio & Contact Info (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#FAF8F5] border border-stone-200/90 rounded-3xl p-7 sm:p-9 space-y-7 shadow-xs">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                Flagship Studio & Sanctuary
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Located in the heart of the Madison Avenue beauty district.
              </p>
            </div>

            <div className="space-y-5 text-sm">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-amber-800/10 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                    Studio Location
                  </p>
                  <p className="text-stone-700 mt-0.5 leading-relaxed">
                    452 Madison Avenue, Suite 800
                    <br />
                    New York, NY 10022
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-amber-800/10 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                    Concierge Desk
                  </p>
                  <p className="text-stone-700 mt-0.5">+1 (800) 555-SALON</p>
                  <p className="text-stone-400 text-xs mt-0.5">Direct SMS assistance available</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-amber-800/10 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                    Email Correspondence
                  </p>
                  <p className="text-stone-700 mt-0.5">concierge@salonbook.com</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-stone-200">
                <div className="w-9 h-9 rounded-full bg-amber-800/10 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-stone-900 uppercase tracking-wider">
                    Studio Operating Hours
                  </p>
                  <p className="text-stone-700">
                    <strong className="font-semibold text-stone-900">Mon – Sat:</strong> 9:00 AM – 8:00 PM
                  </p>
                  <p className="text-stone-700">
                    <strong className="font-semibold text-stone-900">Sunday:</strong> 10:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Valet Parking Amenity */}
            <div className="p-4 bg-white rounded-2xl border border-stone-200/80 flex items-center gap-3">
              <Car className="w-5 h-5 text-amber-800 shrink-0" />
              <p className="text-xs text-stone-600 leading-relaxed">
                Complimentary curbside valet parking is available for all reserved appointments.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Inquiry Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-1 border-b border-stone-100 pb-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Send an Inquiry
            </h2>
            <p className="text-xs text-stone-500">
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
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-amber-800">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Genevieve Dupont"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm text-stone-900 placeholder:text-stone-400 bg-stone-50/50"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-amber-800">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="genevieve@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm text-stone-900 placeholder:text-stone-400 bg-stone-50/50"
              />
            </div>

            {/* Topic Select */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Inquiry Topic <span className="text-amber-800">*</span>
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm text-stone-800 bg-white cursor-pointer"
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
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Message & Desired Dates <span className="text-amber-800">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your goals, preferred appointment date, or specific bridal requests..."
                className="w-full p-3.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm text-stone-900 placeholder:text-stone-400 bg-stone-50/50 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-amber-800 hover:bg-amber-900 shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
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
  );
}
