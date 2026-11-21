'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Scissors, ShieldCheck, Flame } from 'lucide-react';
import { GTA_PROTAGONISTS } from '@/data/gtaProtagonists';

const ERA_FILTERS = ['All Eras', 'GTA VI', 'GTA V', 'Classics'];

function ProtagonistPoster({ model }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#160B33] border border-[#FF2E93]/35 shadow-lg group-hover:border-[#00F0FF]/60 transition-all">
      {!imgError ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={model.image}
          alt={model.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        /* Sleek GTA VI Vice City Sunset Poster Fallback */
        <div className="relative w-full h-full flex flex-col justify-between p-5 sm:p-6 select-none overflow-hidden bg-gradient-to-b from-[#3B2667] via-[#B85D8E] to-[#F4977A]">
          {/* Subtle Halftone / Scanline pattern overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 2px, transparent 4px)',
            }}
          />

          {/* Giant Translucent White Roman Numeral Watermark */}
          <div
            aria-hidden="true"
            className="absolute -right-1 top-1/2 -translate-y-1/2 font-black text-8xl sm:text-9xl tracking-tighter text-white/15 select-none pointer-events-none font-serif italic"
          >
            {model.gameRoman}
          </div>

          {/* Subtle Palm Silhouette in Bottom Corner */}
          <svg
            aria-hidden="true"
            viewBox="0 0 160 160"
            className="absolute -bottom-2 -left-2 w-32 h-32 text-[#110B22]/45 fill-current pointer-events-none"
          >
            <path d="M10 160 Q20 100 60 60 Q50 60 20 105 Q10 135 10 160 Z" />
            <path d="M60 60 Q110 30 140 50 Q100 60 60 60 Z" />
            <path d="M60 60 Q120 60 140 90 Q105 85 60 60 Z" />
            <path d="M60 60 Q95 100 110 130 Q90 105 60 60 Z" />
            <path d="M60 60 Q30 45 10 55 Q40 60 60 60 Z" />
            <path d="M60 60 Q30 75 15 100 Q45 85 60 60 Z" />
          </svg>

          {/* Top Badges */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/95 bg-[#110B22]/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
              {model.game}
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-[#FFF7A1] drop-shadow-md">
              {model.location}
            </span>
          </div>

          {/* Center Poster Title */}
          <div className="relative z-10 my-auto text-center space-y-1.5 py-4">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/85 drop-shadow">
              SALON &amp; BARBER LOOKBOOK
            </p>
            <h4 className="font-serif text-3xl sm:text-4xl font-black text-white tracking-tight uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)]">
              {model.name}
            </h4>
            <div className="w-12 h-0.5 mx-auto bg-white/60 rounded-full" />
          </div>

          {/* Bottom Card Strip */}
          <div className="relative z-10 bg-[#110B22]/70 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFF7ED]">
              Official Style Model
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
    <section className="hidden gta6:block py-20 sm:py-28 bg-[#0D0722] border-t border-[#FF2E93]/30 relative overflow-hidden">
      {/* Background Neon Grid Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF2E93]/15 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        {/* Vice City HUD Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A0B36] border border-[#FF2E93]/60 text-[#FF2E93] text-xs font-black uppercase tracking-[0.25em] shadow-[0_0_15px_rgba(255,46,147,0.4)]">
            <Flame className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Vice City Style Roster • Protagonist Lookbook</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase drop-shadow-[0_0_18px_rgba(255,46,147,0.4)]">
            Iconic GTA Barber &amp; Salon Models
          </h2>

          <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed font-light">
            From Starfish Island to Leonida Keys—explore signature hairstyles, sharp fades, and executive recovery rituals modeled by the franchise&apos;s most legendary leads.
          </p>

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
                      ? 'bg-gradient-to-r from-[#FF2E93] to-[#FF7A00] text-white shadow-[0_0_15px_rgba(255,46,147,0.6)] scale-105'
                      : 'bg-[#1A0B36] text-purple-300 hover:text-white border border-[#FF2E93]/30 hover:border-[#00F0FF]/50'
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
            const bookingHref = `/services?category=${encodeURIComponent(
              p.category
            )}&search=${encodeURIComponent(p.searchQuery)}`;

            return (
              <div
                key={p.id}
                className="group relative bg-[#140A2E]/90 backdrop-blur-md border border-[#FF2E93]/35 rounded-3xl p-6 shadow-[0_8px_32px_rgba(13,7,34,0.8)] hover:shadow-[0_0_25px_rgba(255,46,147,0.35)] hover:border-[#00F0FF]/70 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Card Top: Poster Artwork */}
                <div className="space-y-4">
                  <ProtagonistPoster model={p} />

                  <div className="space-y-2 pt-1">
                    {/* Era & Game Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-0.5 rounded-md border border-[#00F0FF]/30">
                        {p.eraBadge}
                      </span>
                      <span className="text-[11px] font-bold text-[#E2E8F0] uppercase tracking-wider flex items-center gap-1">
                        <Scissors className="w-3 h-3 text-[#FF2E93]" />
                        <span>{p.category}</span>
                      </span>
                    </div>

                    {/* Protagonist Name */}
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#00F0FF] transition-colors leading-tight">
                      {p.name}
                    </h3>

                    {/* Signature Look */}
                    <div className="pt-0.5">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#FBBF24]">
                        Look: {p.signatureLook}
                      </p>
                    </div>

                    {/* Barber Note */}
                    <p className="text-xs text-[#E2E8F0] leading-relaxed font-light pt-0.5">
                      {p.barberNote}
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Neon CTA Link */}
                <div className="pt-5 mt-5 border-t border-[#FF2E93]/20 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-[#E2E8F0]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>SalonBook Stylist Spec</span>
                  </div>

                  <Link
                    href={bookingHref}
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-white hover:text-[#00F0FF] transition-all group-hover:translate-x-1"
                  >
                    <span>Book This Look</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF2E93] group-hover:text-[#00F0FF]" />
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
