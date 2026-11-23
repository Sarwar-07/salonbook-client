'use client';

import React, { useState } from 'react';

const SALON_IMG_PRIMARY =
  'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1800&q=80';
const SALON_IMG_FALLBACK =
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=80';

export default function SalonAtelierBackdrop({ className = '' }) {
  const [imgSrc, setImgSrc] = useState(SALON_IMG_PRIMARY);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(SALON_IMG_FALLBACK);
    }
  };

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none block gta6:hidden select-none z-0 ${className}`}
    >
      {/* 1. EDITORIAL SALON ARCHITECTURE TEXTURE LAYER */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt=""
        onError={handleImageError}
        className="w-full h-full object-cover object-center opacity-25 scale-105 transition-transform duration-1000 ease-out"
      />

      {/* 2. DIRECTIONAL ESPRESSO & CHAMPAGNE VIGNETTE SCRIM */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, rgba(24, 21, 18, 0.94) 0%, rgba(24, 21, 18, 0.80) 52%, rgba(24, 21, 18, 0.62) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 55%, rgba(24, 21, 18, 0.75) 82%, #181512 100%)',
        }}
      />

      {/* 3. WARM CANDLELIGHT & BRASS RADIAL GLOWS */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 75% 45%, rgba(200, 155, 110, 0.18) 0%, transparent 55%), radial-gradient(circle at 18% 25%, rgba(168, 90, 50, 0.14) 0%, transparent 50%)',
        }}
      />

      {/* 4. FINE-LINE BOUTIQUE ARCH & BOTANICAL WATERMARK SVG */}
      <svg
        className="absolute inset-0 w-full h-full object-cover opacity-[0.14]"
        viewBox="0 0 1440 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="#C89B6E" strokeWidth="0.75" fill="none">
          {/* LEFT MARGIN: Boutique Architectural Arch & Botanical Motifs */}
          {/* Outer Romanesque Arch */}
          <path d="M -40 700 L -40 220 Q -40 50 130 50 Q 300 50 300 220 L 300 700" />
          {/* Inner Concentric Fine-Dotted Arch */}
          <path
            d="M 0 700 L 0 230 Q 0 85 130 85 Q 260 85 260 230 L 260 700"
            strokeDasharray="3 3"
          />
          {/* Keyhole Medallion on Left Arch Apex */}
          <circle cx="130" cy="50" r="14" />
          <circle cx="130" cy="50" r="5" fill="#C89B6E" fillOpacity="0.25" />
          {/* Left Botanical Vine & Laurel Flourishes */}
          <path d="M 130 85 Q 160 130 140 180 Q 110 230 140 280 Q 170 330 130 380 Q 100 430 130 480 Q 160 530 130 580" />
          <path d="M 140 140 Q 170 130 160 150 Q 140 155 140 140 Z" />
          <path d="M 130 200 Q 100 190 110 210 Q 130 215 130 200 Z" />
          <path d="M 140 250 Q 175 240 165 260 Q 140 265 140 250 Z" />
          <path d="M 135 305 Q 105 295 115 315 Q 135 320 135 305 Z" />
          <path d="M 135 355 Q 170 345 160 365 Q 135 370 135 355 Z" />
          <path d="M 130 410 Q 100 400 110 420 Q 130 425 130 410 Z" />
          <path d="M 135 460 Q 170 450 160 470 Q 135 475 135 460 Z" />

          {/* Starlight Sparkles framing Left */}
          <path d="M 230 140 Q 230 148 238 148 Q 230 148 230 156 Q 230 148 222 148 Q 230 148 230 140 Z" />
          <path d="M 60 320 Q 60 326 66 326 Q 60 326 60 332 Q 60 326 54 326 Q 60 326 60 320 Z" />

          {/* RIGHT MARGIN: Mirrored Boutique Architectural Arch & Botanical Motifs */}
          {/* Outer Romanesque Arch */}
          <path d="M 1140 700 L 1140 220 Q 1140 50 1310 50 Q 1480 50 1480 220 L 1480 700" />
          {/* Inner Concentric Fine-Dotted Arch */}
          <path
            d="M 1180 700 L 1180 230 Q 1180 85 1310 85 Q 1440 85 1440 230 L 1440 700"
            strokeDasharray="3 3"
          />
          {/* Keyhole Medallion on Right Arch Apex */}
          <circle cx="1310" cy="50" r="14" />
          <circle cx="1310" cy="50" r="5" fill="#C89B6E" fillOpacity="0.25" />
          {/* Right Botanical Vine & Laurel Flourishes */}
          <path d="M 1310 85 Q 1280 130 1300 180 Q 1330 230 1300 280 Q 1270 330 1310 380 Q 1340 430 1310 480 Q 1280 530 1310 580" />
          <path d="M 1300 140 Q 1270 130 1280 150 Q 1300 155 1300 140 Z" />
          <path d="M 1310 200 Q 1340 190 1330 210 Q 1310 215 1310 200 Z" />
          <path d="M 1300 250 Q 1265 240 1275 260 Q 1300 265 1300 250 Z" />
          <path d="M 1305 305 Q 1335 295 1325 315 Q 1305 320 1305 305 Z" />
          <path d="M 1305 355 Q 1270 345 1280 365 Q 1305 370 1305 355 Z" />
          <path d="M 1310 410 Q 1340 400 1330 420 Q 1310 425 1310 410 Z" />
          <path d="M 1305 460 Q 1270 450 1280 470 Q 1305 475 1305 460 Z" />

          {/* Starlight Sparkles framing Right */}
          <path d="M 1210 140 Q 1210 148 1218 148 Q 1210 148 1210 156 Q 1210 148 1202 148 Q 1210 148 1210 140 Z" />
          <path d="M 1380 320 Q 1380 326 1386 326 Q 1380 326 1380 332 Q 1380 326 1374 326 Q 1380 326 1380 320 Z" />

          {/* Delicate Bottom Baseline Border */}
          <line x1="0" y1="699" x2="1440" y2="699" strokeOpacity="0.4" />
        </g>
      </svg>
    </div>
  );
}
