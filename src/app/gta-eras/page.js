'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Flame,
  Scissors,
  Calendar,
  MapPin,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { GTA_ERAS, GTA_PROTAGONISTS } from '@/data/gtaProtagonists';

const ERA_FILTERS = ['All Eras', 'GTA VI', 'GTA V', 'Classics'];

function ProtagonistCard({ model }) {
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth === 0) {
      setImgError(true);
    }
  }, []);

  return (
    <div className="group relative bg-[#1A1136]/90 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-[0_12px_36px_rgba(15,8,35,0.7)] hover:border-[#F7B286]/60 transition-all duration-300 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Aspect-[4/5] Portrait Frame */}
        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#180F33] border border-white/20 shadow-lg group-hover:border-[#F7B286]/60 transition-all">
          {!imgError ? (
            <div className="relative w-full h-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={model.image}
                alt={model.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition: '50% 12%' }}
              />

              {/* Bottom gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 55%, rgba(24, 15, 51, 0.92) 100%)',
                }}
              />

              {/* Top Era / Game Pill */}
              <div className="absolute top-3 left-3 select-none pointer-events-none z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/95 bg-[#180F33]/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/25 shadow-sm">
                  {model.game}
                </span>
              </div>

              {/* Crisp Hollow White Outline Roman Numeral Badge */}
              <div
                className="absolute top-2.5 right-3 select-none pointer-events-none z-10 font-serif font-black text-2xl sm:text-3xl tracking-tighter uppercase"
                style={{
                  WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.92)',
                  color: 'transparent',
                }}
              >
                {model.gameRoman}
              </div>
            </div>
          ) : (
            /* Pastel Leonida Dusk Poster Fallback */
            <div
              className="relative w-full h-full flex flex-col justify-between p-5 select-none overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, #543D8A 0%, #B86B9A 52%, #F6AE84 100%)',
              }}
            >
              {/* Translucent Hollow Roman Numeral Watermark */}
              <div
                aria-hidden="true"
                className="absolute -right-1 top-1/2 -translate-y-1/2 font-black text-8xl sm:text-9xl tracking-tighter select-none pointer-events-none font-serif italic"
                style={{
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.35)',
                  color: 'transparent',
                }}
              >
                {model.gameRoman}
              </div>

              {/* Top Badges */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/95 bg-[#180F33]/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/30">
                  {model.game}
                </span>
                <span
                  className="font-serif font-black text-2xl tracking-tighter uppercase"
                  style={{
                    WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.92)',
                    color: 'transparent',
                  }}
                >
                  {model.gameRoman}
                </span>
              </div>

              {/* Center Poster Title */}
              <div className="relative z-10 my-auto text-center space-y-1.5 py-4">
                <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/90 drop-shadow">
                  OFFICIAL STYLE MODEL
                </p>
                <h4 className="font-serif text-3xl sm:text-4xl font-black text-white tracking-tight uppercase drop-shadow-[0_4px_12px_rgba(20,10,45,0.65)]">
                  {model.name}
                </h4>
                <div className="w-12 h-0.5 mx-auto bg-white/70 rounded-full" />
              </div>

              {/* Bottom Card Strip */}
              <div className="relative z-10 bg-[#180F33]/75 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  {model.location} • {model.eraGroup}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Protagonist Details */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#F7B286] bg-[#F7B286]/15 px-2.5 py-0.5 rounded-md border border-[#F7B286]/30">
              {model.eraBadge}
            </span>
            <span className="text-[11px] font-bold text-[#F3E8FF] uppercase tracking-wider flex items-center gap-1">
              <Scissors className="w-3 h-3 text-[#F7B286]" />
              <span>{model.category}</span>
            </span>
          </div>

          <Link href={`/gta-eras/${model.slug}`} className="block">
            <h3 className="font-serif text-2xl font-bold text-white hover:text-[#FCD34D] transition-colors leading-tight">
              {model.name}
            </h3>
          </Link>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#FCD34D]">
              Look: {model.signatureTreatment || model.signatureLook}
            </p>
          </div>

          <p className="text-xs text-[#F3E8FF] leading-relaxed font-light line-clamp-3">
            {model.barberNote}
          </p>
        </div>
      </div>

      {/* Card Bottom: Character & Era CTA */}
      <div className="pt-5 mt-5 border-t border-white/15 flex items-center justify-between">
        <Link
          href={`/gta-eras/${model.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-white hover:text-[#FCD34D] transition-all group-hover:translate-x-1"
        >
          <span>Explore Character &amp; Era</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#F7B286] group-hover:text-[#FCD34D]" />
        </Link>
      </div>
    </div>
  );
}

export default function GtaErasPage() {
  const [selectedEra, setSelectedEra] = useState('All Eras');

  const filteredProtagonists =
    selectedEra === 'All Eras'
      ? GTA_PROTAGONISTS
      : GTA_PROTAGONISTS.filter((p) => p.eraGroup === selectedEra);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#271A4C] via-[#3B2466] to-[#1D1138] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-white/10">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C96E9B]/25 via-[#4B367C]/15 to-transparent pointer-events-none" />

        {/* Giant Hollow Roman Numeral Watermark */}
        <div
          aria-hidden="true"
          className="absolute -right-8 top-1/2 -translate-y-1/2 font-black text-[12rem] sm:text-[18rem] lg:text-[24rem] tracking-tighter select-none pointer-events-none font-serif italic z-0 leading-none opacity-40"
          style={{
            WebkitTextStroke: '2px rgba(255, 255, 255, 0.12)',
            color: 'transparent',
          }}
        >
          VI
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#DDD6FE]">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#F7B286]" />
            <span className="text-[#FCD34D]">GTA Eras</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#201345]/80 border border-white/25 text-[#F7B286] text-xs font-black uppercase tracking-[0.25em] shadow-md backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#F7B286]" />
              <span>Official Gaming Style Archive</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase drop-shadow-[0_4px_24px_rgba(24,15,51,0.9)]">
              Iconic GTA Eras &amp; Style Archive
            </h1>

            <p className="text-base sm:text-lg text-[#F3E8FF] leading-relaxed font-light">
              From the industrial gloom of 2001 Liberty City to the neon-drenched tropical excess of 2025 Vice City — explore how barbershops, luxury salons, and grooming rituals shaped the world’s most celebrated gaming leads.
            </p>

            {/* Quick stats strip */}
            <div className="flex flex-wrap items-center gap-4 pt-3 text-xs uppercase tracking-widest text-[#DDD6FE]">
              <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15">
                9 Iconic Protagonists
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15">
                6 Defining Eras
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15">
                25+ Years of Pop Culture
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Era Timeline Section */}
      <section className="py-16 sm:py-24 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#F7B286]">
              <Flame className="w-4 h-4 text-[#F7B286]" />
              <span>The Chronology</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Franchise Eras &amp; Grooming Legacies
            </h2>
            <p className="text-sm text-[#F3E8FF] font-light">
              Each chapter of the series brought a distinct cultural atmosphere, architecture, and barbershop identity.
            </p>
          </div>

          {/* 6 Era Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GTA_ERAS.map((era) => (
              <div
                key={era.id}
                className="bg-[#1A1136]/90 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:border-[#F7B286]/60 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-[#F7B286]/15 border border-[#F7B286]/30 text-[#F7B286]">
                      {era.aestheticTag}
                    </span>
                    <span className="text-xs font-bold text-[#DDD6FE] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#F7B286]" />
                      {era.years}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                    {era.title}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-[#FCD34D]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{era.city}</span>
                  </div>

                  <p className="text-xs text-[#F3E8FF] leading-relaxed font-light">
                    {era.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <p className="text-[11px] text-[#DDD6FE] italic leading-relaxed">
                    <span className="font-semibold not-italic text-[#F7B286]">Grooming Legacy: </span>
                    {era.groomingLegacy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protagonist Lookbook Section */}
      <section className="py-16 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#201345]/80 border border-white/25 text-[#F7B286] text-xs font-black uppercase tracking-[0.25em] shadow-md backdrop-blur-md">
              <Scissors className="w-3.5 h-3.5 text-[#F7B286]" />
              <span>Full Character Dossiers</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase drop-shadow-[0_4px_20px_rgba(24,15,51,0.8)]">
              Protagonist Lookbook &amp; Services
            </h2>

            <p className="text-sm sm:text-base text-[#F3E8FF] leading-relaxed font-light">
              Select any lead character to explore their comprehensive styling protocol, historical era background, and book corresponding luxury treatments directly at SalonBook.
            </p>

            {/* Interactive Era Filter Pills */}
            <div className="pt-2 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              {ERA_FILTERS.map((era) => {
                const active = selectedEra === era;
                return (
                  <button
                    key={era}
                    type="button"
                    onClick={() => setSelectedEra(era)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      active
                        ? 'bg-white text-[#241645] font-black shadow-lg scale-105'
                        : 'bg-[#201345]/70 text-[#F3E8FF] hover:text-white border border-white/20 hover:border-white/40'
                    }`}
                  >
                    {era}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Protagonists Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProtagonists.map((model) => (
              <ProtagonistCard key={model.slug} model={model} />
            ))}
          </div>

          {/* Bottom Navigation CTA */}
          <div className="pt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs uppercase tracking-widest font-bold transition-all"
            >
              <span>← Back to SalonBook Home</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
