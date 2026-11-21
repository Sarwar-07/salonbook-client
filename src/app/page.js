'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ServiceCard from '@/components/ServiceCard';
import HeroSlideshow from '@/components/HeroSlideshow';
import ViceCityBackdrop from '@/components/ViceCityBackdrop';
import GtaProtagonistSection from '@/components/GtaProtagonistSection';
import { apiRequest } from '@/lib/api';
import {
  Scissors,
  Droplets,
  Crown,
  Flower2,
  Palette,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Star,
  CheckCircle2,
} from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Hair',
    title: 'Hair Architecture',
    subtitle: 'Precision cuts, balayage & restorative scalp rituals',
    icon: Scissors,
    href: '/services?category=Hair',
    count: '06 Rituals',
  },
  {
    name: 'Skin',
    title: 'Cellular Skin Therapy',
    subtitle: 'Hydra-facials, peptide peels & clinical botanical glow',
    icon: Droplets,
    href: '/services?category=Skin',
    count: '04 Rituals',
  },
  {
    name: 'Makeup',
    title: 'Haute Makeup & Bridal',
    subtitle: 'Couture bridal glam, evening artistry & master trials',
    icon: Crown,
    href: '/services?category=Makeup',
    count: '03 Rituals',
  },
  {
    name: 'Spa',
    title: 'Holistic Body Spa',
    subtitle: 'Hot basalt stone massage, detox scrubs & aromatherapy',
    icon: Flower2,
    href: '/services?category=Spa',
    count: '05 Rituals',
  },
  {
    name: 'Nails',
    title: 'Nail Artistry Atelier',
    subtitle: 'Sculpted gel extensions, Russian manicure & botanical pedis',
    icon: Palette,
    href: '/services?category=Nails',
    count: '04 Rituals',
  },
];

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest('/api/services?limit=6');
      if (Array.isArray(data)) {
        setServices(data);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error('Failed to fetch featured services:', err);
      setError(err.message || 'Unable to load treatments at this time.');
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const loadServices = async () => {
      try {
        const data = await apiRequest('/api/services?limit=6');
        if (!isCancelled) {
          if (Array.isArray(data)) {
            setServices(data);
          } else {
            setServices([]);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to fetch featured services:', err);
          setError(err.message || 'Unable to load treatments at this time.');
          setServices([]);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadServices();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="overflow-hidden bg-[#FAF7F2]">
      {/* ======================================================== */}
      {/* 1. DRAMATIC OBSIDIAN HERO SECTION (`bg-[#121110]` text-white) */}
      {/* ======================================================== */}
      <section className="relative bg-[#121110] text-white pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-36 overflow-hidden border-b border-stone-800/80">
        {/* GTA 6 Vice City Sunset Illustration Backdrop (Pure SVG, zero external images) */}
        <ViceCityBackdrop className="hidden gta6:block opacity-95" />

        {/* Subtle Ambient Radial Champagne Glow */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#C89B6E]/12 rounded-full blur-[130px] pointer-events-none -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-[#824D25]/15 rounded-full blur-[110px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Bold Typography & Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              {/* Monogram Champagne Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1A18] border border-[#C89B6E]/30 text-[#C89B6E] text-xs font-semibold uppercase tracking-[0.22em] shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#C89B6E]" />
                <span>Haute Salon &amp; Wellness Sanctuary</span>
              </div>

              {/* High-Contrast Serif Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.06]">
                Where Timeless Artistry{' '}
                <span className="italic font-normal text-[#C89B6E] block sm:inline">
                  Meets Modern Serenity
                </span>
              </h1>

              {/* Editorial Subtitle */}
              <p className="text-base sm:text-lg text-stone-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Step into an architectural sanctuary curated for effortless beauty and deep renewal.
                Experience master styling, pure botanical formulations, and conflict-free real-time reservations.
              </p>

              {/* Crisp White/Gold CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#C89B6E] to-[#A2683A] hover:opacity-95 text-[#121110] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#C89B6E]/20 hover:shadow-xl transition-all duration-300 active:scale-95 whitespace-nowrap"
                >
                  <span>Explore Salon Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex gta6:hidden items-center justify-center px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-widest border border-white/20 hover:border-white/40 transition-all duration-200"
                >
                  <span>View Treatments</span>
                </Link>

                <Link
                  href="/gta-eras"
                  className="hidden gta6:inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#FDE08D] via-[#F7B286] to-[#F472B6] !text-[#1B103B] shadow-lg hover:brightness-105 transition whitespace-nowrap"
                >
                  <span>Explore GTA Eras</span>
                  <ArrowRight className="w-4 h-4 !text-[#1B103B]" />
                </Link>
              </div>

              {/* 3-Stat Glassmorphic Strip */}
              <div className="pt-8 border-t border-stone-800/80 grid grid-cols-3 gap-6 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#C89B6E]">4.9★</p>
                  <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium mt-0.5">
                    Client Rating
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-white">18+</p>
                  <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium mt-0.5">
                    Signature Rituals
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#C89B6E]">100%</p>
                  <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium mt-0.5">
                    Master Stylists
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Luxury Salon Showcase Slideshow (5 cols) */}
            <div className="lg:col-span-5 relative">
              <HeroSlideshow />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. MODERN BENTO CATEGORY STRIP */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#824D25]">
            Curated Disciplines
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#121110] tracking-tight">
            Artisanal Treatment Catalog
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            Discover bespoke treatments crafted by master stylists, clinical estheticians, and holistic therapists.
          </p>
        </div>

        {/* Clean Pure-White Interactive Bento Category Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-lg hover:border-[#C89B6E]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Subtle #C89B6E icon badge */}
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 flex items-center justify-center text-[#824D25] group-hover:bg-[#121110] group-hover:text-[#C89B6E] group-hover:border-[#121110] transition-colors duration-300">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl font-bold text-[#121110] group-hover:text-[#824D25] transition-colors">
                        {cat.name}
                      </h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 group-hover:text-[#824D25] transition-colors">
                        {cat.count}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-2 leading-relaxed line-clamp-2 font-light">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-stone-100 flex items-center justify-between text-[11px] uppercase tracking-wider font-semibold text-[#824D25]">
                  <span>Explore Menu</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. FEATURED SIGNATURE TREATMENTS (`bg-[#F6F4F0]`) */}
      {/* ======================================================== */}
      <section id="featured-services" className="bg-[#F6F4F0] py-20 sm:py-28 lg:py-32 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-stone-300/60">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#824D25]">
                Handcrafted Offerings
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#121110] tracking-tight">
                Featured Signature Treatments
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-lg leading-relaxed font-light">
                Explore our most requested salon and spa rituals. Real-time availability checks ensure seamless reservation.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#824D25] hover:text-[#121110] group shrink-0"
            >
              <span>View All Treatments</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Loading Skeletons */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs animate-pulse space-y-4"
                >
                  <div className="aspect-4/3 w-full bg-stone-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 w-3/4 bg-stone-200 rounded-lg" />
                    <div className="h-4 w-full bg-stone-100 rounded" />
                    <div className="h-10 w-full bg-stone-200 rounded-xl pt-2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error Fallback */}
          {!loading && error && (
            <div className="bg-white border border-rose-200 rounded-3xl p-10 text-center max-w-md mx-auto space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Unable to Load Treatments
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">{error}</p>
              <button
                type="button"
                onClick={fetchFeaturedServices}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider"
              >
                <span>Retry Connection</span>
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && services.length === 0 && (
            <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
              <Sparkles className="w-8 h-8 text-[#A2683A] mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-[#181512]">
                Menu In Curation
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 font-light">
                Our master artisans are currently curating new signature rituals. Browse our complete menu or connect with our concierge.
              </p>
              <Link
                href="/services"
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#A2683A] to-[#824D25] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold"
              >
                Browse Full Catalog
              </Link>
            </div>
          )}

          {/* Pure-White Rounded-3xl Cards with Tabular Price, Duration & Dark Button */}
          {!loading && !error && services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ======================================================== */}
      {/* GTA SERIES PROTAGONISTS — SALON & BARBER STYLE MODELS */}
      {/* (Only visible when Vice 6 mode is active: hidden gta6:block) */}
      {/* ======================================================== */}
      <GtaProtagonistSection />

      {/* ======================================================== */}
      {/* 4. MODERN EDITORIAL SPLIT SECTION (`bg-white`) */}
      {/* ======================================================== */}
      <section className="bg-white py-20 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Photo & Floating Dark Glass Quote Card (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/5 w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-stone-200 bg-stone-100">
                <Image
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85"
                  alt="Spa and salon philosophy sanctuary"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Dark Glass Floating Quote Card */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 z-20 bg-[#121110]/95 backdrop-blur-md p-5 sm:p-6 rounded-3xl shadow-2xl border border-stone-800 max-w-xs space-y-2 text-white">
                <p className="font-serif italic text-sm sm:text-base text-stone-200 leading-relaxed">
                  &ldquo;True beauty is born when mindful craftsmanship harmonizes with serene stillness.&rdquo;
                </p>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C89B6E]">
                  — SalonBook Creative Direction
                </p>
              </div>
            </div>

            {/* Right Numbered Luxury Pillars (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#824D25]">
                  The Atelier Philosophy
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#121110] tracking-tight leading-tight">
                  Crafting a Sanctuary for Holistic Renewal
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl font-light">
                  We believe salon care transcends aesthetics. Every appointment is treated as an unhurried ritual of personal regeneration.
                </p>
              </div>

              {/* 3 Numbered Luxury Pillars */}
              <div className="space-y-4 pt-2">
                {/* Pillar 01 */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 hover:border-[#C89B6E]/50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#121110] text-[#C89B6E] flex items-center justify-center font-serif text-base font-bold shrink-0 shadow-xs">
                    01
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-[#121110]">
                      Botanical Formulations
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                      Every serum, essential oil, and treatment wash is cruelty-free, infused with cold-pressed botanical bio-actives and clinical dermatological care.
                    </p>
                  </div>
                </div>

                {/* Pillar 02 */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 hover:border-[#C89B6E]/50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#121110] text-[#C89B6E] flex items-center justify-center font-serif text-base font-bold shrink-0 shadow-xs">
                    02
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-[#121110]">
                      Master Artisans
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                      Our creative directors, senior colorists, and licensed therapists hold elite editorial apprenticeships in Paris, New York, and Tokyo.
                    </p>
                  </div>
                </div>

                {/* Pillar 03 */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 hover:border-[#C89B6E]/50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#121110] text-[#C89B6E] flex items-center justify-center font-serif text-base font-bold shrink-0 shadow-xs">
                    03
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-[#121110]">
                      Tailored Serenity
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                      Private acoustically balanced treatment suites, organic tisanes, and conflict-free schedules designed to restore both body and peace of mind.
                    </p>
                  </div>
                </div>
              </div>

              {/* Read Full Philosophy CTA */}
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#824D25] hover:text-[#121110] group"
                >
                  <span>Explore Our Heritage &amp; Artisans</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Note: Redundant bottom dark CTA removed as Footer already houses the private reservation invitation banner */}
    </div>
  );
}
