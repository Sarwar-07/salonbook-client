'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  Scissors,
  MapPin,
  Calendar,
  Flame,
  ShieldCheck,
  Clock,
  DollarSign,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { GTA_PROTAGONISTS } from '@/data/gtaProtagonists';

function ProtagonistHeroImage({ model }) {
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth === 0) {
      setImgError(true);
    }
  }, []);

  if (imgError) {
    return (
      <div
        className="relative w-full h-full flex flex-col justify-between p-6 select-none overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #543D8A 0%, #B86B9A 52%, #F6AE84 100%)',
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-widest text-white/95 bg-[#180F33]/70 px-3 py-1 rounded-md">
            {model.game}
          </span>
          <span
            className="font-serif font-black text-3xl uppercase"
            style={{
              WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.95)',
              color: 'transparent',
            }}
          >
            {model.gameRoman}
          </span>
        </div>
        <div className="text-center space-y-2">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-white">
            OFFICIAL STYLE MODEL
          </p>
          <h2 className="font-serif text-4xl font-black text-white uppercase">{model.name}</h2>
        </div>
        <div className="bg-[#180F33]/80 p-3 rounded-xl text-center">
          <span className="text-xs font-bold uppercase text-white">
            {model.location} • {model.eraGroup}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={model.image}
        alt={model.name}
        onError={() => setImgError(true)}
        className="w-full h-full object-cover object-top"
        style={{ objectPosition: '50% 12%' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 55%, rgba(24, 15, 51, 0.95) 100%)',
        }}
      />
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white bg-[#180F33]/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/30">
          {model.game}
        </span>
      </div>
      <div
        className="absolute top-3 right-4 z-10 font-serif font-black text-3xl sm:text-4xl tracking-tighter uppercase"
        style={{
          WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.95)',
          color: 'transparent',
        }}
      >
        {model.gameRoman}
      </div>
    </div>
  );
}

export default function ProtagonistDossierPage() {
  const params = useParams();
  const rawSlug = params?.slug;

  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  const currentIndex = GTA_PROTAGONISTS.findIndex((p) => p.slug === rawSlug);
  const model = currentIndex !== -1 ? GTA_PROTAGONISTS[currentIndex] : null;

  const prevModel =
    currentIndex !== -1
      ? GTA_PROTAGONISTS[(currentIndex - 1 + GTA_PROTAGONISTS.length) % GTA_PROTAGONISTS.length]
      : null;
  const nextModel =
    currentIndex !== -1
      ? GTA_PROTAGONISTS[(currentIndex + 1) % GTA_PROTAGONISTS.length]
      : null;

  // Fetch live bookable services matching category
  useEffect(() => {
    if (!model?.category) return;

    let isMounted = true;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const fetchUrl = `${apiUrl}/api/services?category=${encodeURIComponent(model.category)}`;

    const loadServices = async () => {
      try {
        const res = await fetch(fetchUrl);
        if (!res.ok) throw new Error('Failed to load services');
        const data = await res.json();
        if (isMounted) {
          const list = Array.isArray(data)
            ? data
            : Array.isArray(data?.services)
            ? data.services
            : [];
          setServices(list.slice(0, 3));
        }
      } catch {
        if (isMounted) {
          setServices([]);
        }
      } finally {
        if (isMounted) {
          setServicesLoading(false);
        }
      }
    };

    loadServices();

    return () => {
      isMounted = false;
    };
  }, [model?.category]);

  if (!model) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#271A4C] via-[#3B2466] to-[#1D1138] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#1A1136]/90 border border-white/20 rounded-3xl p-8 text-center space-y-4 shadow-2xl backdrop-blur-md">
          <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <Scissors className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold uppercase">Protagonist Dossier Not Found</h1>
          <p className="text-sm text-[#F3E8FF] font-light">
            The requested character profile does not exist in the SalonBook style archive.
          </p>
          <div className="pt-2">
            <Link
              href="/gta-eras"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#1B103B] font-bold text-xs uppercase tracking-wider hover:bg-[#FDE68A] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to GTA Eras</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const categoryHref = `/services?category=${encodeURIComponent(model.category)}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#271A4C] via-[#3B2466] to-[#1D1138] text-white">
      {/* Breadcrumb strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#DDD6FE]"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#F7B286]" />
          <Link href="/gta-eras" className="hover:text-white transition-colors">
            GTA Eras
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#F7B286]" />
          <span className="text-[#FCD34D] truncate">{model.name}</span>
        </nav>
      </div>

      {/* Section 1 — Character Dossier Hero */}
      <section className="py-10 sm:py-16 border-b border-white/10 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C96E9B]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Framed Portrait */}
            <div className="lg:col-span-5 max-w-md mx-auto w-full">
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-[#180F33] border-2 border-[#F7B286]/50 shadow-[0_16px_48px_rgba(15,8,35,0.85)]">
                <ProtagonistHeroImage key={model.slug} model={model} />
              </div>
            </div>

            {/* Right Column: Character Specs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#F7B286]/15 border border-[#F7B286]/35 text-[#F7B286]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {model.gameTitle} ({model.releaseYear})
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#DDD6FE]">
                    <MapPin className="w-3.5 h-3.5 text-[#FCD34D]" />
                    <span>{model.setting}</span>
                  </span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
                  {model.name}
                </h1>

                <div className="inline-block pt-1">
                  <span className="text-sm sm:text-base font-bold uppercase tracking-wide text-[#FCD34D] bg-[#FCD34D]/10 border border-[#FCD34D]/30 px-3.5 py-1 rounded-lg">
                    Signature Look: {model.signatureTreatment || model.signatureLook}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-[#F3E8FF] leading-relaxed font-light text-sm sm:text-base">
                <p>{model.characterBio}</p>
              </div>

              {/* Stylist Quote Box */}
              <div className="border-l-4 border-[#F7B286] pl-4 py-2 bg-white/5 rounded-r-xl">
                <p className="text-xs font-bold uppercase tracking-widest text-[#F7B286] mb-1">
                  Stylist Consultation Note
                </p>
                <p className="text-sm italic text-[#DDD6FE] leading-relaxed">
                  &ldquo;{model.barberNote}&rdquo;
                </p>
              </div>

              {/* Primary CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={categoryHref}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#1B103B] font-extrabold text-xs uppercase tracking-widest shadow-[0_4px_20px_rgba(255,255,255,0.25)] hover:bg-[#FDE68A] hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Browse {model.category} Treatments</span>
                  <ArrowRight className="w-4 h-4 text-[#1B103B]" />
                </Link>
                <Link
                  href="/gta-eras"
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all"
                >
                  <span>All Eras Archive</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — The Era Deep-Dive */}
      <section className="py-16 sm:py-24 border-b border-white/10 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1136]/90 backdrop-blur-md border border-white/20 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#F7B286]">
              <Flame className="w-4 h-4 text-[#F7B286]" />
              <span>Historical Context &amp; Aesthetics</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              The Era: {model.eraHeadline}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#F3E8FF] leading-relaxed font-light">
              {model.eraStory.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — 3-Step Salon & Barber Recreation Protocol */}
      <section className="py-16 sm:py-24 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#F7B286]">
              <Scissors className="w-4 h-4 text-[#F7B286]" />
              <span>SalonBook Protocol</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              3-Step Salon Recreation Protocol
            </h2>
            <p className="text-sm text-[#F3E8FF] font-light">
              How our master stylists and barbers adapt {model.name}&apos;s iconic aesthetic into a modern, wearable luxury service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {model.styleProtocol.map((item) => (
              <div
                key={item.step}
                className="bg-[#1A1136]/90 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl hover:border-[#F7B286]/60 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3 relative z-10">
                  <span className="font-serif font-black text-5xl sm:text-6xl text-[#F7B286]/25 tracking-tighter block leading-none">
                    {item.step}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F3E8FF] leading-relaxed font-light">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-1 text-[11px] text-[#DDD6FE] uppercase font-bold tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F7B286]" />
                  <span>SalonBook Master Standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Live Bookable Services for This Look */}
      <section className="py-16 sm:py-24 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#F7B286]">
                <Sparkles className="w-4 h-4 text-[#F7B286]" />
                <span>Live Appointments</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                Bookable {model.category} Treatments
              </h2>
              <p className="text-sm text-[#F3E8FF] font-light max-w-xl">
                Ready to experience this aesthetic? Book verified luxury appointments matching {model.name}&apos;s signature regimen.
              </p>
            </div>

            <Link
              href={categoryHref}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#FCD34D] hover:text-white transition-colors"
            >
              <span>View All {model.category} Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Service Cards Grid */}
          {servicesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-[#1A1136]/60 border border-white/10 rounded-2xl h-80 animate-pulse p-6 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-full h-36 bg-white/10 rounded-xl" />
                    <div className="w-3/4 h-5 bg-white/10 rounded-md" />
                    <div className="w-1/2 h-4 bg-white/10 rounded-md" />
                  </div>
                  <div className="w-full h-10 bg-white/10 rounded-full" />
                </div>
              ))}
            </div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc) => {
                const serviceImg =
                  svc.image ||
                  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80';

                return (
                  <div
                    key={svc._id}
                    className="group bg-[#1A1136]/90 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-xl hover:border-[#F7B286]/60 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={serviceImg}
                          alt={svc.serviceName}
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80';
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-[#180F33]/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-[#FCD34D] border border-white/20">
                          {svc.category}
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#FCD34D] transition-colors leading-tight">
                          {svc.serviceName}
                        </h3>

                        <div className="flex items-center gap-4 text-xs font-semibold text-[#DDD6FE]">
                          <span className="flex items-center gap-1 text-[#FCD34D]">
                            <DollarSign className="w-3.5 h-3.5" />
                            <span>${svc.price}</span>
                          </span>
                          {svc.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#F7B286]" />
                              <span>{svc.duration}</span>
                            </span>
                          )}
                        </div>

                        {svc.description && (
                          <p className="text-xs text-[#F3E8FF] line-clamp-2 leading-relaxed font-light">
                            {svc.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <Link
                        href={`/services/${svc._id}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-white text-[#1B103B] font-extrabold text-xs uppercase tracking-widest hover:bg-[#FDE68A] transition-all shadow-md active:scale-95"
                      >
                        <span>View &amp; Book Treatment</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-[#1A1136]/70 border border-white/15 rounded-2xl p-8 text-center space-y-3">
              <p className="text-sm text-[#F3E8FF] font-light">
                No active treatments currently listed in the {model.category} category.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FCD34D] hover:underline"
              >
                <span>Browse Full Treatment Menu →</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Section 5 — Character Switcher Strip */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {prevModel && (
              <Link
                href={`/gta-eras/${prevModel.slug}`}
                className="group bg-[#1A1136]/80 hover:bg-[#1A1136] border border-white/20 hover:border-[#F7B286]/60 rounded-2xl p-5 transition-all flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:-translate-x-1 transition-transform">
                  <ArrowLeft className="w-5 h-5 text-[#F7B286]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-widest text-[#DDD6FE] block">
                    Previous Dossier
                  </span>
                  <span className="font-serif text-lg font-bold text-white group-hover:text-[#FCD34D] transition-colors truncate block">
                    {prevModel.name} ({prevModel.game})
                  </span>
                </div>
              </Link>
            )}

            {nextModel && (
              <Link
                href={`/gta-eras/${nextModel.slug}`}
                className="group bg-[#1A1136]/80 hover:bg-[#1A1136] border border-white/20 hover:border-[#F7B286]/60 rounded-2xl p-5 transition-all flex items-center justify-between gap-4 text-right"
              >
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#DDD6FE] block">
                    Next Dossier
                  </span>
                  <span className="font-serif text-lg font-bold text-white group-hover:text-[#FCD34D] transition-colors truncate block">
                    {nextModel.name} ({nextModel.game})
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-5 h-5 text-[#F7B286]" />
                </div>
              </Link>
            )}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/gta-eras"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-widest text-white transition-all"
            >
              <span>View All 9 GTA Protagonists &amp; Eras</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
