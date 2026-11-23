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

  const navigationLinks = [
    { name: 'Home Atelier', href: '/' },
    { name: 'Services & Rituals', href: '/services' },
    { name: 'Our Artisans & Story', href: '/about' },
    { name: 'Concierge Inquiry', href: '/contact' },
    { name: 'Create Account', href: '/register' },
    { name: 'Client Sign In', href: '/login' },
  ];

  return (
    <footer className="relative bg-[#121110] text-stone-300 border-t border-stone-800/80 overflow-hidden gta6:bg-[linear-gradient(180deg,#2B1A4E_0%,#6E3572_45%,#B85675_82%,#1D1138_100%)] gta6:border-t gta6:border-[#F8B385]/35">
      {/* GTA 6 Vice City Sunset & Palm Silhouette Upper Backdrop (Only visible in GTA mode) */}
      <div
        aria-hidden="true"
        className="hidden gta6:block absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
      >
        {/* Giant Hollow White VI Outline Watermark */}
        <div
          className="absolute right-6 top-8 font-serif font-black text-9xl tracking-tighter pointer-events-none select-none"
          style={{
            WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.22)',
            color: 'transparent',
          }}
        >
          VI
        </div>

        {/* Ocean Drive Skyline & Palm Tree Silhouette Band */}
        <svg
          viewBox="0 0 1440 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-48 object-cover opacity-35"
          preserveAspectRatio="none"
        >
          {/* Skyline Silhouettes */}
          <g fill="#180B2B">
            <rect x="180" y="160" width="45" height="100" />
            <rect x="235" y="140" width="35" height="120" />
            <polygon points="245,120 260,120 252,140" />
            <rect x="280" y="170" width="60" height="90" />
            <rect x="360" y="150" width="40" height="110" />
            <rect x="410" y="130" width="55" height="130" />
            <polygon points="432,105 442,105 437,130" />
            <rect x="475" y="165" width="50" height="95" />
            <rect x="850" y="155" width="50" height="105" />
            <rect x="910" y="135" width="40" height="125" />
            <rect x="960" y="160" width="55" height="100" />
            <rect x="1025" y="145" width="45" height="115" />
            <rect x="1080" y="125" width="60" height="135" />
            <polygon points="1105,95 1115,95 1110,125" />
            <rect x="1150" y="165" width="50" height="95" />
          </g>

          {/* Palm Fronds on Edges */}
          <g fill="#120722">
            {/* Left Palm */}
            <path d="M40 260 Q60 170 120 90 Q110 90 55 180 Q35 230 30 260 Z" />
            <path d="M120 90 Q170 50 220 80 Q165 90 120 90 Z" />
            <path d="M120 90 Q180 90 220 130 Q165 120 120 90 Z" />
            <path d="M120 90 Q150 140 170 180 Q140 150 120 90 Z" />
            <path d="M120 90 Q70 50 30 70 Q70 85 120 90 Z" />
            <path d="M120 90 Q60 110 20 150 Q70 130 120 90 Z" />

            {/* Right Palm */}
            <path d="M1410 260 Q1390 170 1330 90 Q1340 90 1395 180 Q1415 230 1420 260 Z" />
            <path d="M1330 90 Q1280 50 1230 80 Q1285 90 1330 90 Z" />
            <path d="M1330 90 Q1270 90 1230 130 Q1285 120 1330 90 Z" />
            <path d="M1330 90 Q1300 140 1280 180 Q1310 150 1330 90 Z" />
            <path d="M1330 90 Q1380 50 1420 70 Q1380 85 1330 90 Z" />
            <path d="M1330 90 Q1390 110 1430 150 Q1380 130 1330 90 Z" />
          </g>
        </svg>
      </div>

      {/* Top Editorial Invitation Banner */}
      <div className="border-b border-stone-800/60 gta6:border-white/15 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#181614] gta6:bg-[linear-gradient(135deg,#2E1957_0%,#6D2E73_55%,#B85D8E_100%)] border border-stone-800/80 gta6:border-[#F7B286]/30 rounded-3xl p-6 sm:p-8 shadow-xl gta6:shadow-[0_12px_32px_rgba(15,8,36,0.55),0_0_24px_rgba(236,72,153,0.14)] relative overflow-hidden">
            {/* Subtle palm watermark accent in GTA mode */}
            <svg aria-hidden="true" viewBox="0 0 160 160" className="hidden gta6:block absolute -right-6 -bottom-6 w-36 h-36 text-white/5 fill-current pointer-events-none">
              <path d="M10 160 Q20 100 60 60 Q50 60 20 105 Q10 135 10 160 Z" />
              <path d="M60 60 Q110 30 140 50 Q100 60 60 60 Z" />
              <path d="M60 60 Q120 60 140 90 Q105 85 60 60 Z" />
              <path d="M60 60 Q95 100 110 130 Q90 105 60 60 Z" />
            </svg>
            <div className="space-y-1.5 text-center md:text-left relative z-10">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C89B6E] gta6:text-[#FCD34D]">
                Private Reservations
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Experience Bespoke Beauty &amp; Serenity
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 gta6:text-[#F3E8FF] max-w-xl font-light">
                Reserve your signature treatment with our master stylists and holistic estheticians. Instant real-time confirmation.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#C89B6E] to-[#A2683A] hover:opacity-95 text-[#121110] font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-md active:scale-95 shrink-0 relative z-10"
            >
              <span>Explore Treatments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main 4-Column Architectural Grid Wrapped in Subtle Dark-Plum Glass */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 relative z-10">
        <div className="gta6:bg-[rgba(18,10,38,0.72)] gta6:backdrop-blur-md gta6:border gta6:border-white/15 gta6:rounded-3xl gta6:p-8 sm:gta6:p-10 gta6:shadow-[0_16px_40px_rgba(10,5,25,0.6)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Column 1: Brand & Heritage Story (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <Link href="/" className="inline-flex items-center group">
                <Logo variant="light" showTagline />
              </Link>
              <p className="text-xs sm:text-sm text-stone-400 gta6:text-[#F3E8FF] leading-relaxed max-w-sm font-light">
                SalonBook redefines the luxury salon and spa experience. Combining visionary hair architecture with botanical restorative therapies, our artisans curate a personal sanctuary of rejuvenation and effortless elegance.
              </p>

              {/* Social Media Links with Inline SVGs */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-stone-900 gta6:bg-[#201345] border border-stone-800 gta6:border-white/20 flex items-center justify-center text-stone-400 gta6:text-[#F3E8FF] hover:text-[#C89B6E] gta6:hover:text-[#FCD34D] hover:border-[#C89B6E]/50 gta6:hover:border-[#FCD34D]/50 transition-all cursor-pointer"
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
                  className="w-9 h-9 rounded-full bg-stone-900 gta6:bg-[#201345] border border-stone-800 gta6:border-white/20 flex items-center justify-center text-stone-400 gta6:text-[#F3E8FF] hover:text-[#C89B6E] gta6:hover:text-[#FCD34D] hover:border-[#C89B6E]/50 gta6:hover:border-[#FCD34D]/50 transition-all cursor-pointer"
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
                  className="w-9 h-9 rounded-full bg-stone-900 gta6:bg-[#201345] border border-stone-800 gta6:border-white/20 flex items-center justify-center text-stone-400 gta6:text-[#F3E8FF] hover:text-[#C89B6E] gta6:hover:text-[#FCD34D] hover:border-[#C89B6E]/50 gta6:hover:border-[#FCD34D]/50 transition-all cursor-pointer"
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
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89B6E] gta6:text-[#FCD34D]">
                Navigation
              </h4>
              <ul className="space-y-2.5">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-stone-400 gta6:text-[#F3E8FF] hover:text-white gta6:hover:text-[#FCD34D] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Salon Contact Info & Concierge (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89B6E] gta6:text-[#FCD34D]">
                Private Concierge
              </h4>
              <div className="space-y-3 text-xs sm:text-sm text-stone-400">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#C89B6E] gta6:text-[#FCD34D] shrink-0" />
                  <p className="text-stone-300 gta6:text-white font-medium">+1 (800) 555-SALON</p>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#C89B6E] gta6:text-[#FCD34D] shrink-0" />
                  <p className="text-stone-300 gta6:text-white">concierge@salonbook.com</p>
                </div>

                <div className="pt-2 border-t border-stone-800/60 gta6:border-white/15">
                  <p className="text-[11px] text-stone-500 gta6:text-[#DDD6FE] leading-relaxed font-light">
                    For private atelier bookings, VIP bridal parties, or press appointments, our senior concierge desk is at your service.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 4: Salon Address & Opening Hours (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89B6E] gta6:text-[#FCD34D]">
                Atelier &amp; Hours
              </h4>
              <div className="space-y-3.5 text-xs sm:text-sm text-stone-400 font-light">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C89B6E] gta6:text-[#FCD34D] shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed text-stone-300 gta6:text-white">
                    452 Madison Avenue, 8th Floor<br />
                    New York, NY 10022
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#C89B6E] gta6:text-[#FCD34D] shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <p className="text-stone-300 gta6:text-white font-medium">Mon – Sat: 9:00 AM – 8:00 PM</p>
                    <p className="text-stone-500 gta6:text-[#DDD6FE]">Sunday: 10:00 AM – 6:00 PM</p>
                  </div>
                </div>

                <p className="text-[11px] text-[#C89B6E] gta6:text-[#FCD34D] italic">
                  Complimentary private valet parking on Madison Ave.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Bar */}
      <div className="border-t border-stone-800/80 gta6:border-white/15 bg-stone-950/80 gta6:bg-[#120A24]/90 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 gta6:text-[#DDD6FE]">
          <p>© {currentYear} SalonBook Haute Salon &amp; Spa. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-stone-300 gta6:text-[#DDD6FE] gta6:hover:text-[#FCD34D] transition-colors">
              Privacy Protocol
            </Link>
            <Link href="/about" className="hover:text-stone-300 gta6:text-[#DDD6FE] gta6:hover:text-[#FCD34D] transition-colors">
              Terms of Reservation
            </Link>
            <Link href="/contact" className="hover:text-stone-300 gta6:text-[#DDD6FE] gta6:hover:text-[#FCD34D] transition-colors">
              Sanctuary Concierge
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
