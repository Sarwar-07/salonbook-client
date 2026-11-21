'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Scissors, ShieldCheck, Flame, Compass } from 'lucide-react';
import { GTA_PROTAGONISTS } from '@/data/gtaProtagonists';

const ERA_FILTERS = ['All Eras', 'GTA VI', 'GTA V', 'Classics'];

function ProtagonistPortrait({ id, accentColor }) {
  // SVG gradients and character art for each protagonist
  return (
    <div className="relative aspect-[12/13] w-full rounded-2xl overflow-hidden bg-[#160B33] border border-[#FF2E93]/30 shadow-inner group-hover:border-[#00F0FF]/60 transition-colors">
      <svg
        viewBox="0 0 240 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover select-none"
      >
        <defs>
          {/* Pop-art Sunset Sky Gradient */}
          <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#25104E" />
            <stop offset="45%" stopColor="#942C75" />
            <stop offset="75%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#FFE066" />
          </linearGradient>

          {/* Sun Halo */}
          <radialGradient id={`sun-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF48F" />
            <stop offset="50%" stopColor="#FF2E93" />
            <stop offset="100%" stopColor="#FF2E93" stopOpacity="0" />
          </radialGradient>

          {/* Halftone / scanline pattern */}
          <pattern id={`scan-${id}`} width="240" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="240" y2="0" stroke="#000000" strokeWidth="1" opacity="0.18" />
          </pattern>
        </defs>

        {/* 1. Backdrop */}
        <rect width="240" height="260" fill={`url(#grad-${id})`} />
        <circle cx="120" cy="130" r="85" fill={`url(#sun-${id})`} opacity="0.65" />
        <rect width="240" height="260" fill={`url(#scan-${id})`} />

        {/* Mini Vice City Palm Silhouette in background */}
        <path
          d="M210 260 Q205 180 185 140 Q188 140 215 155 Q195 165 210 260 Z"
          fill="#130826"
          opacity="0.4"
        />
        <path
          d="M185 140 Q150 120 120 135 Q160 145 185 140 Z"
          fill="#130826"
          opacity="0.4"
        />
        <path
          d="M185 140 Q220 115 235 130 Q205 140 185 140 Z"
          fill="#130826"
          opacity="0.4"
        />

        {/* 2. Character Silhouette & Facial Details */}
        {id === 'lucia' && (
          <g id="char-lucia">
            {/* Dark Wavy Hair Back */}
            <path
              d="M75 110 Q60 170 85 240 Q155 240 165 170 Q170 120 160 95 Q120 50 80 90 Z"
              fill="#18111B"
            />
            {/* Shoulders & White Top */}
            <path
              d="M50 260 L65 215 Q120 200 175 215 L190 260 Z"
              fill="#FFF1E6"
            />
            {/* Neck */}
            <rect x="105" y="145" width="30" height="40" fill="#C98863" rx="4" />
            {/* Face Oval */}
            <ellipse cx="120" cy="120" rx="35" ry="42" fill="#E2A17B" />
            {/* Wavy Brunette Fringe & Highlights */}
            <path
              d="M75 105 Q120 60 165 100 Q155 135 150 160 Q135 100 120 95 Q105 100 85 140 Q80 120 75 105 Z"
              fill="#261A22"
            />
            <path
              d="M80 90 Q120 65 150 85"
              stroke="#FF7A00"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.75"
            />
            {/* Gold Hoop Earring */}
            <circle cx="82" cy="130" r="11" stroke="#FFD700" strokeWidth="2.5" fill="none" />
            {/* Sunglasses / Cat-eye Shades */}
            <polygon points="90,110 115,112 112,126 92,124" fill="#FF2E93" opacity="0.9" />
            <polygon points="125,112 150,110 148,124 128,126" fill="#FF2E93" opacity="0.9" />
            <line x1="115" y1="112" x2="125" y2="112" stroke="#FFD700" strokeWidth="2" />
            {/* Coral Lip */}
            <path d="M110 142 Q120 147 130 142" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {id === 'jason' && (
          <g id="char-jason">
            {/* Neck & Shoulders (Gray Tank) */}
            <path d="M45 260 L60 210 Q120 195 180 210 L195 260 Z" fill="#374151" />
            <rect x="104" y="145" width="32" height="42" fill="#D2956F" rx="4" />
            {/* Face */}
            <path d="M85 105 Q120 85 155 105 L152 145 Q120 170 88 145 Z" fill="#E6AB84" />
            {/* Coastal Stubble Beard */}
            <path
              d="M89 135 Q120 172 151 135 Q145 158 120 164 Q95 158 89 135 Z"
              fill="#3E2D22"
              opacity="0.8"
            />
            {/* Backward Trucker Hat Visor turned to back */}
            <ellipse cx="120" cy="88" rx="46" ry="24" fill="#0F172A" />
            <path d="M74 88 Q120 50 166 88 L166 98 Q120 75 74 98 Z" fill="#1E293B" />
            <rect x="100" y="62" width="40" height="15" rx="3" fill="#00F0FF" opacity="0.8" />
            {/* Textured Coastal Sideburns */}
            <path d="M82 100 Q80 125 86 130" stroke="#3E2D22" strokeWidth="4" strokeLinecap="round" />
            <path d="M158 100 Q160 125 154 130" stroke="#3E2D22" strokeWidth="4" strokeLinecap="round" />
            {/* Eyes & Brow */}
            <line x1="94" y1="110" x2="112" y2="110" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <line x1="128" y1="110" x2="146" y2="110" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {id === 'tommy' && (
          <g id="char-tommy">
            {/* Iconic Teal Tropical Hawaiian Collar */}
            <path d="M40 260 L55 205 Q120 190 185 205 L200 260 Z" fill="#00C4D6" />
            {/* Palm Leaf Accents on Shirt */}
            <path d="M65 220 Q80 230 75 250" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <path d="M175 220 Q160 230 165 250" stroke="#164E63" strokeWidth="3" strokeLinecap="round" />
            {/* Gold Chain */}
            <path d="M102 188 Q120 205 138 188" stroke="#FBBF24" strokeWidth="3.5" fill="none" />
            {/* Neck */}
            <rect x="103" y="142" width="34" height="42" fill="#C98863" rx="4" />
            {/* Face */}
            <path d="M85 105 Q120 90 155 105 L152 145 Q120 168 88 145 Z" fill="#E2A17B" />
            {/* 1980s Slicked-back Voluminous Black Pomade Hair */}
            <path
              d="M72 105 Q68 60 120 48 Q172 60 168 105 Q158 72 120 68 Q82 72 72 105 Z"
              fill="#111827"
            />
            {/* Cyan Glaze Highlights */}
            <path d="M90 68 Q120 58 150 68" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            {/* Aviator Sunglasses */}
            <rect x="88" y="105" width="28" height="20" rx="4" fill="#0A0A0A" stroke="#FBBF24" strokeWidth="1.5" />
            <rect x="124" y="105" width="28" height="20" rx="4" fill="#0A0A0A" stroke="#FBBF24" strokeWidth="1.5" />
            <line x1="116" y1="112" x2="124" y2="112" stroke="#FBBF24" strokeWidth="2" />
          </g>
        )}

        {id === 'cj' && (
          <g id="char-cj">
            {/* White Ribbed Tank Top & Silver Chain */}
            <path d="M45 260 L60 215 Q120 200 180 215 L195 260 Z" fill="#F8FAFC" />
            <path d="M100 185 Q120 202 140 185" stroke="#94A3B8" strokeWidth="3" fill="none" />
            {/* Neck */}
            <rect x="103" y="142" width="34" height="44" fill="#6B3C1B" rx="4" />
            {/* Face */}
            <path d="M86 100 Q120 85 154 100 L150 145 Q120 170 90 145 Z" fill="#7C4622" />
            {/* Crisp Grove St Geometric Box Taper Fade */}
            <rect x="84" y="62" width="72" height="40" rx="6" fill="#130D08" />
            {/* Precision Laser Line-up Brow */}
            <line x1="84" y1="98" x2="156" y2="98" stroke="#FF7A00" strokeWidth="2" opacity="0.75" />
            {/* Tapered Temple Shave */}
            <path d="M84 98 L84 125 L92 105 Z" fill="#2E1B0F" />
            <path d="M156 98 L156 125 L148 105 Z" fill="#2E1B0F" />
            {/* Eyes */}
            <ellipse cx="102" cy="116" rx="6" ry="3.5" fill="#17120E" />
            <ellipse cx="138" cy="116" rx="6" ry="3.5" fill="#17120E" />
            <path d="M106 145 Q120 152 134 145" stroke="#3D200E" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {id === 'michael' && (
          <g id="char-michael">
            {/* Designer Charcoal Suit & Blue Tie */}
            <path d="M40 260 L55 210 Q120 195 185 210 L200 260 Z" fill="#0F172A" />
            {/* White Collar & Indigo Silk Tie */}
            <polygon points="120,205 105,260 135,260" fill="#2563EB" />
            <polygon points="105,200 120,225 135,200 120,205" fill="#FFFFFF" />
            {/* Neck */}
            <rect x="104" y="142" width="32" height="40" fill="#D79E78" rx="4" />
            {/* Face */}
            <ellipse cx="120" cy="120" rx="34" ry="40" fill="#E8B08B" />
            {/* Executive Scissor Side-parted Hair with Silver Temples */}
            <path
              d="M80 100 Q90 60 130 62 Q162 65 160 100 Q145 74 125 76 Q95 78 80 100 Z"
              fill="#261A16"
            />
            {/* Silver Temple Highlights */}
            <path d="M82 95 Q90 75 105 78" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
            <path d="M158 95 Q150 75 135 78" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
            {/* Clean Shaven Jaw & Sunglasses */}
            <rect x="90" y="108" width="26" height="18" rx="3" fill="#020617" stroke="#94A3B8" strokeWidth="1" />
            <rect x="124" y="108" width="26" height="18" rx="3" fill="#020617" stroke="#94A3B8" strokeWidth="1" />
            <line x1="116" y1="114" x2="124" y2="114" stroke="#94A3B8" strokeWidth="1.5" />
          </g>
        )}

        {id === 'franklin' && (
          <g id="char-franklin">
            {/* Green / Dark Bomber Jacket */}
            <path d="M40 260 L55 210 Q120 195 185 210 L200 260 Z" fill="#14532D" />
            <rect x="104" y="142" width="32" height="42" fill="#5F361A" rx="4" />
            {/* Face */}
            <path d="M86 100 Q120 85 154 100 L150 144 Q120 168 90 144 Z" fill="#6F3F1F" />
            {/* High Skin Fade & Precise Line-up */}
            <path
              d="M84 98 Q84 62 120 62 Q156 62 156 98 Q140 82 120 82 Q100 82 84 98 Z"
              fill="#120E0B"
            />
            {/* Sculpted Beard / Goatee */}
            <path
              d="M98 135 Q120 165 142 135 Q135 156 120 158 Q105 156 98 135 Z"
              fill="#120E0B"
            />
            {/* Eyes */}
            <line x1="95" y1="112" x2="112" y2="112" stroke="#120E0B" strokeWidth="3" strokeLinecap="round" />
            <line x1="128" y1="112" x2="145" y2="112" stroke="#120E0B" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {id === 'trevor' && (
          <g id="char-trevor">
            {/* Stained White V-Neck Tee */}
            <path d="M42 260 L58 212 Q120 198 182 212 L198 260 Z" fill="#E2E8F0" />
            <polygon points="120,240 106,202 134,202" fill="#C98863" />
            {/* Neck with Cut Marks */}
            <rect x="103" y="142" width="34" height="40" fill="#C98863" rx="4" />
            <line x1="110" y1="155" x2="125" y2="158" stroke="#DC2626" strokeWidth="1.5" />
            {/* Face */}
            <ellipse cx="120" cy="118" rx="34" ry="42" fill="#DCA382" />
            {/* Receding Wild Hairline */}
            <path
              d="M74 120 Q70 85 86 80 Q96 95 106 102 Q120 78 134 102 Q144 95 154 80 Q170 85 166 120 Q158 98 144 94 Q120 106 96 94 Q82 98 74 120 Z"
              fill="#423024"
            />
            {/* Unruly Strands on Crown */}
            <path d="M110 75 Q115 60 122 72 Q128 58 132 75" stroke="#423024" strokeWidth="2.5" fill="none" />
            {/* Horseshoe Drooping Mustache */}
            <path
              d="M102 138 Q120 142 138 138 L142 154 Q120 146 98 154 Z"
              fill="#3A281C"
            />
            {/* Wild Gazing Eyes */}
            <circle cx="104" cy="114" r="5" fill="#FFFFFF" />
            <circle cx="104" cy="114" r="2.5" fill="#450A0A" />
            <circle cx="136" cy="114" r="5" fill="#FFFFFF" />
            <circle cx="136" cy="114" r="2.5" fill="#450A0A" />
          </g>
        )}

        {id === 'niko' && (
          <g id="char-niko">
            {/* Brown Tracksuit Jacket with White Stripe */}
            <path d="M40 260 L55 210 Q120 195 185 210 L200 260 Z" fill="#78350F" />
            <path d="M50 220 L65 260" stroke="#FFFFFF" strokeWidth="4" />
            <path d="M190 220 L175 260" stroke="#FFFFFF" strokeWidth="4" />
            {/* Neck */}
            <rect x="103" y="142" width="34" height="42" fill="#BA7D56" rx="4" />
            {/* Face */}
            <path d="M85 102 Q120 88 155 102 L152 144 Q120 166 88 144 Z" fill="#C98863" />
            {/* Precision Buzz Cut Contour (#2 Guard) */}
            <path
              d="M80 102 Q82 66 120 66 Q158 66 160 102 Q145 84 120 84 Q95 84 80 102 Z"
              fill="#1C1410"
            />
            {/* Heavy 5 O'Clock Shadow */}
            <path
              d="M88 130 Q120 166 152 130 Q145 155 120 160 Q95 155 88 130 Z"
              fill="#261A16"
              opacity="0.65"
            />
            {/* Intense Brow & Eyes */}
            <line x1="90" y1="106" x2="114" y2="110" stroke="#1C1410" strokeWidth="4" strokeLinecap="round" />
            <line x1="126" y1="110" x2="150" y2="106" stroke="#1C1410" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="102" cy="116" rx="4" ry="2.5" fill="#1C1410" />
            <ellipse cx="138" cy="116" rx="4" ry="2.5" fill="#1C1410" />
          </g>
        )}

        {id === 'claude' && (
          <g id="char-claude">
            {/* Green / Dark Leather Bomber Jacket */}
            <path d="M42 260 L58 210 Q120 195 182 210 L198 260 Z" fill="#1E293B" />
            <polygon points="120,205 108,260 132,260" fill="#15803D" />
            {/* Neck */}
            <rect x="104" y="142" width="32" height="40" fill="#C98863" rx="4" />
            {/* Face */}
            <ellipse cx="120" cy="120" rx="33" ry="40" fill="#DCA382" />
            {/* Matte Dark Messy Scissor Crop */}
            <path
              d="M82 104 Q76 68 120 64 Q164 68 158 104 Q146 80 130 84 Q116 75 98 86 Q88 95 82 104 Z"
              fill="#181412"
            />
            {/* Sharp sideburns and enigmatic eyes */}
            <line x1="94" y1="110" x2="112" y2="108" stroke="#181412" strokeWidth="3" strokeLinecap="round" />
            <line x1="128" y1="108" x2="146" y2="110" stroke="#181412" strokeWidth="3" strokeLinecap="round" />
            <path d="M110 144 Q120 146 130 144" stroke="#181412" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* Ambient Neon Hairline Border */}
        <rect
          x="1"
          y="1"
          width="238"
          height="258"
          rx="15"
          stroke={accentColor}
          strokeWidth="2"
          opacity="0.65"
          fill="none"
        />
      </svg>
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
                {/* Card Top: Portrait Artwork */}
                <div className="space-y-4">
                  <ProtagonistPortrait id={p.id} accentColor={p.accentColor} />

                  <div className="space-y-1.5 pt-1">
                    {/* Era & Game Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-0.5 rounded-md border border-[#00F0FF]/30">
                        {p.eraBadge}
                      </span>
                      <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1">
                        <Scissors className="w-3 h-3 text-[#FF2E93]" />
                        <span>{p.category}</span>
                      </span>
                    </div>

                    {/* Protagonist Name */}
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#00F0FF] transition-colors leading-tight">
                      {p.name}
                    </h3>

                    {/* Signature Look */}
                    <div className="pt-1">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#FF7A00]">
                        Look: {p.signatureLook}
                      </p>
                    </div>

                    {/* Barber Note */}
                    <p className="text-xs text-purple-200/80 leading-relaxed font-light pt-1">
                      {p.barberNote}
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Neon CTA Link */}
                <div className="pt-5 mt-5 border-t border-[#FF2E93]/20 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-purple-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>SalonBook Stylist Spec</span>
                  </div>

                  <Link
                    href={bookingHref}
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-white hover:text-[#00F0FF] transition-colors group-hover:translate-x-1 transition-transform"
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
