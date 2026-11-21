import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services & Treatments', href: '/services' },
    { name: 'About SalonBook', href: '/about' },
    { name: 'Contact & Location', href: '/contact' },
    { name: 'Customer Sign Up', href: '/register' },
  ];

  const popularCategories = [
    { name: 'Hair Styling & Cuts', href: '/services?category=Hair+Styling' },
    { name: 'Facial & Skin Therapy', href: '/services?category=Facial+%26+Skin' },
    { name: 'Bridal & Occasion Makeup', href: '/services?category=Bridal+Makeup' },
    { name: 'Spa, Body & Massage', href: '/services?category=Spa+%26+Massage' },
    { name: 'Nail Artistry & Care', href: '/services?category=Nail+Artistry' },
  ];

  return (
    <footer className="bg-[#1C1917] text-stone-300 border-t border-stone-800">
      {/* Top Banner / Newsletter or Accent */}
      <div className="border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-8">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100">
                Experience Haute Beauty & Wellness
              </h3>
              <p className="text-sm text-stone-400">
                Reserve your bespoke salon session with master stylists and certified therapists.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-amber-500/20 active:scale-95 shrink-0"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Story Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center group">
              <Logo variant="light" showTagline />
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              SalonBook redefines the luxury salon and spa experience. From visionary hair design to restorative skin therapies, our master artisans curate an unparalleled sanctuary of rejuvenation and elegance.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:bg-stone-700 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  className="w-5 h-5"
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
                className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:bg-stone-700 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  className="w-5 h-5"
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
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:bg-stone-700 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-500 font-sans">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-stone-100 hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-500 font-sans">
              Popular Categories
            </h4>
            <ul className="space-y-2.5">
              {popularCategories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="text-sm text-stone-400 hover:text-stone-100 hover:underline transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours Column (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-500 font-sans">
              Salon & Spa Hours
            </h4>
            <div className="space-y-3 text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <p className="font-medium text-stone-300">Mon – Sat: 9:00 AM – 8:00 PM</p>
                  <p className="text-stone-500">Sunday: 10:00 AM – 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-stone-300">
                  452 Madison Avenue, Suite 800, New York, NY 10022
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <p className="text-xs text-stone-300">+1 (800) 555-SALON</p>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <p className="text-xs text-stone-300">concierge@salonbook.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Bar */}
      <div className="border-t border-stone-800/80 bg-stone-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {currentYear} SalonBook Haute Salon & Spa. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-stone-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-stone-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-stone-300 transition-colors">
              Customer Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
