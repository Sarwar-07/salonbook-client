'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { apiRequest } from '@/lib/api';
import {
  Scissors,
  Droplets,
  Crown,
  Flower2,
  Palette,
  Clock,
  ArrowRight,
  Star,
  CheckCircle2,
  Sparkles,
  Leaf,
  Users,
  Heart,
  RefreshCw,
} from 'lucide-react';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80';

const CATEGORIES = [
  {
    name: 'Hair',
    title: 'Hair Architecture',
    subtitle: 'Precision cuts, balayage & restorative scalp rituals',
    icon: Scissors,
    href: '/services?category=Hair',
    count: '06 Treatments',
  },
  {
    name: 'Skin',
    title: 'Cellular Skin Therapy',
    subtitle: 'Hydra-facials, peptide peels & clinical botanical glow',
    icon: Droplets,
    href: '/services?category=Skin',
    count: '04 Treatments',
  },
  {
    name: 'Makeup',
    title: 'Haute Makeup & Bridal',
    subtitle: 'Couture bridal glam, evening artistry & master trials',
    icon: Crown,
    href: '/services?category=Makeup',
    count: '03 Treatments',
  },
  {
    name: 'Spa',
    title: 'Holistic Body Spa',
    subtitle: 'Hot basalt stone massage, detox scrubs & aromatherapy',
    icon: Flower2,
    href: '/services?category=Spa',
    count: '05 Treatments',
  },
  {
    name: 'Nails',
    title: 'Nail Artistry Atelier',
    subtitle: 'Sculpted gel extensions, Russian manicure & botanical pedis',
    icon: Palette,
    href: '/services?category=Nails',
    count: '04 Treatments',
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
    <div className="space-y-24 sm:space-y-32 lg:space-y-40 pb-24 sm:pb-32 overflow-hidden">
      {/* ======================================================== */}
      {/* 1. HERO BANNER SECTION (Editorial Split / Asymmetric) */}
      {/* ======================================================== */}
      <section className="relative pt-6 sm:pt-12 lg:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Monogram Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEDCC8]/60 border border-[#C48E60]/30 text-[#824D25] text-xs font-semibold uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5 text-[#A2683A]" />
                <span>Haute Salon &amp; Wellness Sanctuary</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#181512] tracking-tight leading-[1.08]">
                Where Timeless Artistry{' '}
                <span className="italic font-normal text-[#824D25] block sm:inline">
                  Meets Modern Serenity
                </span>
              </h1>

              {/* Editorial Description */}
              <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Step into an architectural sanctuary curated for effortless beauty and deep renewal.
                Experience master styling, clean botanical formulations, and conflict-free real-time reservations.
              </p>

              {/* Primary & Secondary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#A2683A] to-[#824D25] hover:opacity-95 text-[#FAF7F2] font-semibold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
                >
                  <span>Explore Salon Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-full bg-white/80 hover:bg-white text-stone-800 font-semibold text-xs uppercase tracking-widest border border-stone-300/80 shadow-2xs hover:border-[#A2683A]/50 transition-all duration-200"
                >
                  <span>Our Philosophy</span>
                </Link>
              </div>

              {/* Micro Trust Stats */}
              <div className="pt-8 border-t border-stone-200/80 grid grid-cols-3 gap-6 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#824D25]">18+</p>
                  <p className="text-[11px] uppercase tracking-wider text-stone-500 font-medium mt-0.5">
                    Signature Rituals
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#824D25]">4.9★</p>
                  <p className="text-[11px] uppercase tracking-wider text-stone-500 font-medium mt-0.5">
                    Sanctuary Rating
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#824D25]">100%</p>
                  <p className="text-[11px] uppercase tracking-wider text-stone-500 font-medium mt-0.5">
                    Clean Botanicals
                  </p>
                </div>
              </div>
            </div>

            {/* Right Showcase Image & Floating Trust Card (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative Offset Backdrop Frame */}
                <div className="absolute -inset-3.5 rounded-[2.5rem] bg-gradient-to-br from-[#EEDCC8] to-[#C48E60]/20 transform rotate-1 hidden sm:block" />

                {/* Main Hero Sanctuary Photo */}
                <div className="relative h-[440px] sm:h-[520px] rounded-[2rem] overflow-hidden shadow-2xl border border-stone-200/80 bg-stone-200">
                  <Image
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85"
                    alt="SalonBook Sanctuary Atelier"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Floating Frosted Glass Trust Card */}
                <div className="absolute -bottom-6 -left-4 sm:-left-8 z-20 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-white/60 max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A2683A] to-[#824D25] text-[#FAF7F2] flex items-center justify-center shrink-0 shadow-xs">
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-sm sm:text-base text-[#181512] leading-tight">
                        4.9★ Sanctuary Rating
                      </p>
                      <p className="text-[11px] text-[#824D25] font-semibold uppercase tracking-wider mt-0.5">
                        18+ Signature Rituals
                      </p>
                    </div>
                  </div>
                </div>

                {/* Small Top-Right Floating Artisan Badge */}
                <div className="absolute -top-4 -right-4 z-20 bg-[#181512]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-stone-700 hidden sm:flex items-center gap-1.5 text-xs text-[#FAF7F2]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C48E60]" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">Madison Ave Flagship</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. DYNAMIC SECTION 1 — SALON SERVICE CATEGORIES */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#824D25]">
            Curated Disciplines
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#181512] tracking-tight">
            Artisanal Treatment Catalog
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Discover bespoke treatments crafted by master stylists, clinical estheticians, and holistic therapists.
          </p>
        </div>

        {/* Minimalist Architectural Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-7 shadow-2xs hover:shadow-xl hover:border-[#A2683A]/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-stone-200 flex items-center justify-center text-[#824D25] group-hover:bg-[#824D25] group-hover:text-[#FAF7F2] transition-colors duration-300">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#181512] group-hover:text-[#824D25] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1.5 leading-relaxed line-clamp-2">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-[11px] uppercase tracking-wider font-semibold text-[#824D25]">
                  <span>Explore Menu</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. DYNAMIC SECTION 2 — FEATURED SALON SERVICES */}
      {/* ======================================================== */}
      <section id="featured-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-stone-200/80">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#824D25]">
              Handcrafted Offerings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#181512] tracking-tight">
              Featured Signature Treatments
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-lg leading-relaxed">
              Explore our most requested salon and spa rituals. Real-time availability checks ensure seamless reservation.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#824D25] hover:text-[#181512] group shrink-0"
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
            <p className="text-xs sm:text-sm text-stone-500">
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

        {/* Editorial 4:3 Cards Grid */}
        {!loading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
            {services.map((service) => {
              const formattedPrice = Number(service.price || 0).toFixed(2);
              const duration = service.duration || 60;
              const imageUrl = service.image || FALLBACK_IMAGE;

              return (
                <article
                  key={service._id}
                  className="group bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#A2683A]/40 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Editorial 4:3 Aspect Image */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                    <Image
                      src={imageUrl}
                      alt={service.serviceName || 'Salon treatment'}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Frosted Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white/90 backdrop-blur-md text-[#824D25] text-[10px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full shadow-xs border border-white/50">
                        {service.category || 'Ritual'}
                      </span>
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-4 right-4 z-10 bg-[#181512]/90 backdrop-blur-md px-3.5 py-1 rounded-full text-white text-xs font-serif font-bold shadow-sm">
                      ${formattedPrice}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5">
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif text-2xl font-bold text-[#181512] group-hover:text-[#824D25] transition-colors leading-snug line-clamp-1">
                          {service.serviceName}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2 font-normal">
                        {service.description ||
                          'Indulge in a signature personalized salon experience with our certified therapists and master stylists.'}
                      </p>
                    </div>

                    {/* Duration & Details Button Footer */}
                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#A2683A]" />
                        <span>{duration} mins session</span>
                      </div>

                      <Link
                        href={`/services/${service._id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-bold text-[#824D25] bg-[#FAF7F2] hover:bg-[#824D25] hover:text-[#FAF7F2] transition-all duration-200"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 4. ADDITIONAL SECTION — THE ATELIER PHILOSOPHY */}
      {/* ======================================================== */}
      <section className="bg-white border-y border-stone-200/80 py-20 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Photo & Overlapping Quote Card (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/5 w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-stone-200">
                <Image
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85"
                  alt="Spa and salon philosophy sanctuary"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Overlapping Quote Card */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 z-20 bg-[#FAF7F2] p-5 sm:p-6 rounded-3xl shadow-xl border border-stone-300/80 max-w-xs space-y-2">
                <p className="font-serif italic text-sm sm:text-base text-[#181512] leading-relaxed">
                  &ldquo;True beauty is born when mindful craftsmanship harmonizes with serene stillness.&rdquo;
                </p>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#824D25]">
                  — SalonBook Creative Direction
                </p>
              </div>
            </div>

            {/* Right Pillars Showcase (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#824D25]">
                  The Atelier Philosophy
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#181512] tracking-tight leading-tight">
                  Crafting a Sanctuary for Holistic Renewal
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl">
                  We believe salon care transcends aesthetics. Every appointment is treated as an unhurried ritual of personal regeneration.
                </p>
              </div>

              {/* 3 Refined Pillars */}
              <div className="space-y-6 pt-2">
                {/* Pillar 1: Botanical Formulations */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 hover:border-[#A2683A]/40 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-white border border-stone-200 text-[#824D25] flex items-center justify-center shrink-0 shadow-2xs">
                    <Leaf className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-[#181512]">
                      Botanical Formulations
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      Every serum, essential oil, and treatment wash is cruelty-free, infused with cold-pressed botanical bio-actives and clinical dermatological care.
                    </p>
                  </div>
                </div>

                {/* Pillar 2: Master Artisans */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 hover:border-[#A2683A]/40 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-white border border-stone-200 text-[#824D25] flex items-center justify-center shrink-0 shadow-2xs">
                    <Users className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-[#181512]">
                      Master Artisans
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      Our creative directors, senior colorists, and licensed therapists hold elite editorial apprenticeships in Paris, New York, and Tokyo.
                    </p>
                  </div>
                </div>

                {/* Pillar 3: Tailored Serenity */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 hover:border-[#A2683A]/40 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-white border border-stone-200 text-[#824D25] flex items-center justify-center shrink-0 shadow-2xs">
                    <Heart className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-[#181512]">
                      Tailored Serenity
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      Private acoustically balanced treatment suites, organic tisanes, and conflict-free schedules designed to restore both body and peace of mind.
                    </p>
                  </div>
                </div>
              </div>

              {/* Read Full Philosophy CTA */}
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#824D25] hover:text-[#181512] group"
                >
                  <span>Explore Our Heritage &amp; Artisans</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. CALL TO ACTION RESERVATION BANNER */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#181512] to-stone-900 text-[#FAF7F2] p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl border border-stone-800">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#A2683A]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6 text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C48E60]">
              Instant Online Reservations
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Begin Your Bespoke Salon Journey
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-lg">
              Reserve your preferred treatment date and artisan slot. Transparent pricing, instantaneous slot locking, and seamless Stripe checkout.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#A2683A] to-[#824D25] hover:opacity-95 text-[#FAF7F2] text-xs uppercase tracking-widest font-bold shadow-md transition-all active:scale-95"
              >
                <span>Reserve Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-full bg-stone-800/80 hover:bg-stone-800 text-stone-200 text-xs uppercase tracking-widest font-semibold border border-stone-700 transition-colors"
              >
                <span>Speak with Concierge</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
