'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Scissors, ShieldCheck, Flame } from 'lucide-react';
import { GTA_PROTAGONISTS } from '@/data/gtaProtagonists';

const ERA_FILTERS = ['All Eras', 'GTA VI', 'GTA V', 'Classics'];

function ProtagonistPoster({ model }) {
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // If the image already completed before mount or failed without triggering onError
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth === 0) {
      setImgError(true);
    }
  }, []);

  return (
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

          {/* Subtle bottom twilight-plum gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent 55%, rgba(24, 15, 51, 0.92) 100%)',
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
            background: 'linear-gradient(180deg, #543D8A 0%, #B86B9A 52%, #F6AE84 100%)',
          }}
        >
          {/* Subtle Palm Silhouette */}
          <svg
            aria-hidden="true"
            viewBox="0 0 160 160"
            className="absolute -bottom-2 -left-2 w-32 h-32 text-[#180F33]/35 fill-current pointer-events-none"
          >
            <path d="M10 160 Q20 100 60 60 Q50 60 20 105 Q10 135 10 160 Z" />
            <path d="M60 60 Q110 30 140 50 Q100 60 60 60 Z" />
            <path d="M60 60 Q120 60 140 90 Q105 85 60 60 Z" />
            <path d="M60 60 Q95 100 110 130 Q90 105 60 60 Z" />
            <path d="M60 60 Q30 45 10 55 Q40 60 60 60 Z" />
            <path d="M60 60 Q30 75 15 100 Q45 85 60 60 Z" />
          </svg>

          {/* Giant Translucent Hollow Roman Numeral Watermark */}
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
  );
}

export default function GtaProtagonistSection() {
  const [selectedEra, setSelectedEra] = useState('All Eras');

  const filteredProtagonists =
    selectedEra === 'All Eras'
      ? GTA_PROTAGONISTS
      : GTA_PROTAGONISTS.filter((p) => p.eraGroup === selectedEra);

  return (
    <section className="hidden gta6:block py-20 sm:py-28 bg-[#180F33] border-t border-white/15 relative overflow-hidden">
      {/* Background Leonida Dusk Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C96E9B]/20 via-[#4B367C]/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        {/* Leonida Style Lookbook Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#201345]/80 border border-white/25 text-[#F7B286] text-xs font-black uppercase tracking-[0.25em] shadow-md backdrop-blur-md">
            <Flame className="w-3.5 h-3.5 text-[#F7B286]" />
            <span>Leonida Style Roster • Protagonist Lookbook</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase drop-shadow-[0_4px_20px_rgba(24,15,51,0.8)]">
            Iconic GTA Barber &amp; Salon Models
          </h2>

          <p className="text-sm sm:text-base text-[#F3E8FF] leading-relaxed font-light">
            From Starfish Island to Leonida Keys—explore signature hairstyles, sharp fades, and executive recovery rituals modeled by the franchise&apos;s most legendary leads.
          </p>

          <div className="pt-1">
            <Link
              href="/gta-eras"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#1B103B] font-extrabold text-xs uppercase tracking-wider hover:bg-[#FDE68A] hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              <span>Explore All GTA Eras &amp; Chronology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Era Filter Bar */}
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

        {/* 9-Card Roster Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProtagonists.map((p) => {
            const eraHref = `/gta-eras/${p.slug}`;
            const categoryHref = `/services?category=${encodeURIComponent(p.category)}`;

            return (
              <div
                key={p.id}
                className="group relative bg-[#1A1136]/90 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-[0_12px_36px_rgba(15,8,35,0.7)] hover:border-[#F7B286]/60 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Card Top: Poster Artwork */}
                <div className="space-y-4">
                  <Link href={eraHref} className="block cursor-pointer">
                    <ProtagonistPoster model={p} />
                  </Link>

                  <div className="space-y-2 pt-1">
                    {/* Era & Game Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#F7B286] bg-[#F7B286]/15 px-2.5 py-0.5 rounded-md border border-[#F7B286]/30">
                        {p.eraBadge}
                      </span>
                      <span className="text-[11px] font-bold text-[#F3E8FF] uppercase tracking-wider flex items-center gap-1">
                        <Scissors className="w-3 h-3 text-[#F7B286]" />
                        <span>{p.category}</span>
                      </span>
                    </div>

                    {/* Protagonist Name */}
                    <Link href={eraHref} className="block">
                      <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#FCD34D] transition-colors leading-tight">
                        {p.name}
                      </h3>
                    </Link>

                    {/* Signature Look */}
                    <div className="pt-0.5">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#FCD34D]">
                        Look: {p.signatureTreatment || p.signatureLook}
                      </p>
                    </div>

                    {/* Barber Note */}
                    <p className="text-xs text-[#F3E8FF] leading-relaxed font-light pt-0.5 line-clamp-3">
                      {p.barberNote}
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Character & Era CTA + Book Category Link */}
                <div className="pt-5 mt-5 border-t border-white/15 flex items-center justify-between gap-2">
                  <Link
                    href={eraHref}
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-white hover:text-[#FCD34D] transition-all group-hover:translate-x-1"
                  >
                    <span>Character &amp; Era</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F7B286] group-hover:text-[#FCD34D]" />
                  </Link>

                  <Link
                    href={categoryHref}
                    className="text-xs font-bold uppercase tracking-wider text-[#F7B286] hover:text-white transition-colors"
                  >
                    Book {p.category}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
