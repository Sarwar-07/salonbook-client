import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: 'Home Atelier', href: '/' },
    { name: 'Services & Rituals', href: '/services' },
    { name: 'Our Artisans & Story', href: '/about' },
    { name: 'Concierge Inquiry', href: '/contact' },
    { name: 'Create Account', href: '/register' },
    { name: 'Client Sign In', href: '/login' },
  ];

  return (
    <footer className="bg-[#181512] text-stone-300 border-t border-stone-800/80">
      {/* Top Editorial Invitation Banner */}
      <div className="border-b border-stone-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-stone-900/40 border border-stone-800/80 rounded-3xl p-6 sm:p-8">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C48E60]">
                Private Reservations
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
                Experience Bespoke Beauty &amp; Serenity
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
                Reserve your signature treatment with our master stylists and holistic estheticians. Instant real-time confirmation.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#A2683A] to-[#824D25] hover:opacity-95 text-[#FAF7F2] font-semibold text-xs uppercase tracking-widest transition-all duration-200 shadow-md active:scale-95 shrink-0"
            >
              <span>Explore Treatments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main 4-Column Architectural Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Heritage Story (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center group">
              <Logo variant="light" showTagline />
            </Link>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              SalonBook redefines the luxury salon and spa experience. Combining visionary hair architecture with botanical restorative therapies, our artisans curate a personal sanctuary of rejuvenation and effortless elegance.
            </p>

            {/* Social Media Links with Inline SVGs */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-[#C48E60] hover:border-[#C48E60]/50 transition-all cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-[#C48E60] hover:border-[#C48E60]/50 transition-all cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-[#C48E60] hover:border-[#C48E60]/50 transition-all cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Important Navigation Links (2.5 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C48E60]">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-stone-400 hover:text-[#FAF7F2] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Salon Contact Info & Concierge (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C48E60]">
              Private Concierge
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-stone-400">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C48E60] shrink-0" />
                <p className="text-stone-300 font-medium">+1 (800) 555-SALON</p>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C48E60] shrink-0" />
                <p className="text-stone-300">concierge@salonbook.com</p>
              </div>

              <div className="pt-2 border-t border-stone-800/60">
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  For private atelier bookings, VIP bridal parties, or press appointments, our senior concierge desk is at your service.
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Salon Address & Opening Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C48E60]">
              Atelier &amp; Hours
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C48E60] shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-stone-300">
                  452 Madison Avenue, 8th Floor<br />
                  New York, NY 10022
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C48E60] shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <p className="text-stone-300 font-medium">Mon – Sat: 9:00 AM – 8:00 PM</p>
                  <p className="text-stone-500">Sunday: 10:00 AM – 6:00 PM</p>
                </div>
              </div>

              <p className="text-[11px] text-[#C48E60] italic">
                Complimentary private valet parking on Madison Ave.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Bar */}
      <div className="border-t border-stone-800/80 bg-stone-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {currentYear} SalonBook Haute Salon &amp; Spa. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-stone-300 transition-colors">
              Privacy Protocol
            </Link>
            <Link href="/about" className="hover:text-stone-300 transition-colors">
              Terms of Reservation
            </Link>
            <Link href="/contact" className="hover:text-stone-300 transition-colors">
              Sanctuary Concierge
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
