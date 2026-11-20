'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ServiceCard from '@/components/ServiceCard';
import { apiRequest } from '@/lib/api';
import {
  Sparkles,
  Scissors,
  Droplets,
  Crown,
  Flower2,
  Palette,
  Award,
  Leaf,
  CalendarCheck,
  CreditCard,
  Star,
  Quote,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

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
      setError(err.message || 'Unable to load services at this time.');
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
          setError(err.message || 'Unable to load services at this time.');
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

  const categories = [
    {
      name: 'Hair Styling',
      shortName: 'Hair',
      href: '/services?category=Hair+Styling',
      icon: Scissors,
      description: 'Precision cuts, color & scalp rituals',
    },
    {
      name: 'Facial & Skin',
      shortName: 'Skin',
      href: '/services?category=Facial+%26+Skin',
      icon: Droplets,
      description: 'Hydra-facials, peels & clinical glow',
    },
    {
      name: 'Bridal Makeup',
      shortName: 'Makeup',
      href: '/services?category=Bridal+Makeup',
      icon: Crown,
      description: 'Haute couture bridal & occasion glam',
    },
    {
      name: 'Spa & Massage',
      shortName: 'Spa',
      href: '/services?category=Spa+%26+Massage',
      icon: Flower2,
      description: 'Hot stone, body scrubs & holistic massage',
    },
    {
      name: 'Nail Artistry',
      shortName: 'Nails',
      href: '/services?category=Nail+Artistry',
      icon: Palette,
      description: 'Sculpted gel, luxury mani & pedicures',
    },
  ];

  const features = [
    {
      icon: Award,
      title: 'Master Artisans',
      description:
        'Certified stylists, colorists, and licensed skin therapists with decades of combined editorial pedigree.',
    },
    {
      icon: Leaf,
      title: 'Botanical & Clinical Formulas',
      description:
        'Cruelty-free, organic botanicals paired with dermatologically proven, ultra-clean salon care.',
    },
    {
      icon: CalendarCheck,
      title: 'Real-Time Conflict-Free Booking',
      description:
        'Smart schedule locking ensures your preferred appointment is instantly reserved with zero waiting time.',
    },
    {
      icon: CreditCard,
      title: 'Secure Stripe Checkout',
      description:
        'Cashless, transparent transactions with instantaneous confirmations and digital tax receipts.',
    },
  ];

  const testimonials = [
    {
      quote:
        'The balayage and botanical head spa transformed my hair completely. The serene ambiance and attentive team make every visit an essential ritual of wellness.',
      author: 'Eleanor Vance',
      tag: 'Balayage & Hair Spa',
      rating: 5,
    },
    {
      quote:
        'Booking was effortless and my appointment started right on time with zero waiting. The deep-tissue hot stone therapy is by far the finest recovery experience in the city.',
      author: 'Marcus Holloway',
      tag: 'Deep Tissue & Stone Therapy',
      rating: 5,
    },
    {
      quote:
        'From our initial bridal trial to the wedding morning, SalonBook delivered perfection. My skin was glowing and the team was calm, professional, and thoroughly brilliant.',
      author: 'Sophia Sterling',
      tag: 'Bridal Glow Couture',
      rating: 5,
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 lg:space-y-36 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-800/10 text-amber-900 border border-amber-800/20 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>Bespoke Salon & Wellness Sanctuary</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.12]">
                Elevate Your Ritual of{' '}
                <span className="italic font-normal text-amber-900">
                  Beauty & Self-Care
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Step into an oasis of understated luxury. We unite master artistry,
                clean botanical formulations, and effortless scheduling to leave you
                radiant, restored, and confident.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#featured-services"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-full bg-white hover:bg-stone-100 text-stone-800 font-medium text-sm border border-stone-300 shadow-2xs hover:border-amber-800/40 transition-colors"
                >
                  Explore Treatments
                </a>
              </div>

              {/* Trust Metrics */}
              <div className="pt-8 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-900">
                    12+
                  </p>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">
                    Signature Treatments
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-900">
                    4.9★
                  </p>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">
                    Client Rating
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-900 flex items-center justify-center lg:justify-start gap-1">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 inline" />
                  </p>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">
                    Instant Slot Locking
                  </p>
                </div>
              </div>
            </div>

            {/* Right Showcase Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative background border */}
                <div className="absolute -inset-3 rounded-3xl bg-amber-800/10 -rotate-2 transform hidden sm:block" />
                <div className="relative h-[420px] sm:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-stone-200">
                  <Image
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80"
                    alt="Luxury Salon Interior"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 sm:bottom-6 sm:-left-6 bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 max-w-xs">
                  <div className="w-11 h-11 rounded-full bg-amber-800 text-white flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900">
                      Bespoke Master Stylists
                    </p>
                    <p className="text-[11px] text-stone-500">
                      10+ years of editorial excellence
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CURATED CATEGORIES STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <p className="text-xs uppercase tracking-widest font-semibold text-amber-800">
            Curated Collections
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
            Explore by Specialization
          </h2>
          <p className="text-sm text-stone-600">
            Select a tailored discipline to browse personalized treatments and pricing.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex flex-col items-center text-center p-5 sm:p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-lg hover:border-amber-800/40 transition-all duration-300 active:scale-98"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#FAF8F5] group-hover:bg-amber-800 text-amber-800 group-hover:text-white flex items-center justify-center transition-colors duration-300 border border-stone-200/60 mb-3.5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {cat.shortName}
                </h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED TREATMENTS */}
      <section id="featured-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest font-semibold text-amber-800">
              Hand-Selected Portfolio
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Signature Treatments
            </h2>
            <p className="text-sm text-stone-600 max-w-xl">
              Immerse yourself in our most requested therapies, designed to restore vitality and inspire confidence.
            </p>
          </div>

          <Link
            href="/services"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-300 hover:border-amber-800 text-sm font-semibold text-stone-800 hover:text-amber-800 transition-colors shrink-0"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs animate-pulse flex flex-col h-[400px]"
              >
                <div className="h-56 bg-stone-200" />
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="h-5 bg-stone-200 rounded-sm w-3/4" />
                    <div className="h-4 bg-stone-200 rounded-sm w-full" />
                    <div className="h-4 bg-stone-200 rounded-sm w-2/3" />
                  </div>
                  <div className="h-10 bg-stone-200 rounded-xl w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error / Offline State */}
        {!loading && error && (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Unable to Load Treatments
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              {error}
            </p>
            <button
              type="button"
              onClick={fetchFeaturedServices}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && services.length === 0 && (
          <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center max-w-md mx-auto space-y-3">
            <Sparkles className="w-8 h-8 text-amber-800 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Treatments Coming Soon
            </h3>
            <p className="text-sm text-stone-500">
              Our curated seasonal salon menu is being refreshed.
            </p>
            <Link
              href="/services"
              className="inline-block mt-2 px-5 py-2 rounded-full bg-amber-800 text-white text-sm font-medium"
            >
              Browse Full Catalog
            </Link>
          </div>
        )}

        {/* Loaded Services Grid */}
        {!loading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}

        {/* Mobile View All CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/services"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white text-sm font-semibold"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. WHY CHOOSE SALONBOOK */}
      <section className="bg-stone-100/70 border-y border-stone-200/80 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <p className="text-xs uppercase tracking-widest font-semibold text-amber-800">
              The SalonBook Standard
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Uncompromising Luxury & Precision
            </h2>
            <p className="text-sm text-stone-600">
              Every appointment is designed around your comfort, schedule, and beauty aspirations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-800/10 text-amber-800 border border-amber-800/20 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-2">
          <p className="text-xs uppercase tracking-widest font-semibold text-amber-800">
            Whispers of Delight
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Cherished by Our Discerning Guests
          </h2>
          <p className="text-sm text-stone-600">
            Read what our clients say about their bespoke styling and rejuvenating spa therapies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.author}
              className="bg-white border border-stone-200/80 rounded-2xl p-7 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-600">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-amber-800/20" />

                <p className="text-stone-700 text-sm leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <p className="font-serif font-bold text-stone-900 text-sm">
                    {item.author}
                  </p>
                  <p className="text-xs text-amber-800 font-medium mt-0.5">
                    {item.tag}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM RESERVATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-[#FAF8F5] rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 relative shadow-2xl border border-stone-800">
          <div className="relative z-10 max-w-2xl space-y-6 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Priority Access</span>
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Ready for Your Signature Transformation?
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Reserve your bespoke session with master artisans or create an account for
              instant booking, tailored recommendations, and appointment tracking.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-sm transition-all duration-200 shadow-md active:scale-95"
              >
                <span>Reserve Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-sm border border-stone-700 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-amber-800/10 blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-12 w-64 h-64 rounded-full bg-amber-600/5 blur-2xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
