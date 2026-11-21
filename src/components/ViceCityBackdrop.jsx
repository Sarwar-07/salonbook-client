'use client';

import React from 'react';

export default function ViceCityBackdrop({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Official GTA VI Leonida Dusk Sky Gradient: #3B2667 -> #B85D8E -> #F4977A */}
          <linearGradient id="vcSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B2667" />
            <stop offset="42%" stopColor="#B85D8E" />
            <stop offset="80%" stopColor="#F4977A" />
            <stop offset="100%" stopColor="#FCD385" />
          </linearGradient>

          {/* Glowing Horizon Sun Gradient */}
          <linearGradient id="vcSun" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF7A1" />
            <stop offset="35%" stopColor="#F4977A" />
            <stop offset="75%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#7E22CE" />
          </linearGradient>

          {/* Retro Sun Scanline Mask */}
          <mask id="vcSunMask">
            <rect width="1440" height="680" fill="#FFFFFF" />
            <rect x="500" y="380" width="440" height="3" fill="#000000" />
            <rect x="500" y="396" width="440" height="5" fill="#000000" />
            <rect x="500" y="415" width="440" height="8" fill="#000000" />
            <rect x="500" y="437" width="440" height="11" fill="#000000" />
            <rect x="500" y="462" width="440" height="15" fill="#000000" />
            <rect x="500" y="490" width="440" height="20" fill="#000000" />
          </mask>

          {/* Sun Glow Filter */}
          <filter id="vcGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="40" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Ocean Water Gradient */}
          <linearGradient id="vcOcean" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#251447" />
            <stop offset="35%" stopColor="#170B30" />
            <stop offset="100%" stopColor="#0E061E" />
          </linearGradient>

          {/* Water Sun Reflection Gradient */}
          <linearGradient id="vcReflection" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F4977A" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#E11D48" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.05" />
          </linearGradient>

          {/* Left-to-Right Readability Scrim Overlay */}
          <linearGradient id="vcReadabilityScrim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#110B22" stopOpacity="0.90" />
            <stop offset="55%" stopColor="#110B22" stopOpacity="0.68" />
            <stop offset="100%" stopColor="#110B22" stopOpacity="0.20" />
          </linearGradient>
        </defs>

        {/* 1. Sky Canvas */}
        <rect width="1440" height="520" fill="url(#vcSky)" />

        {/* Subtle Stars in Upper Atmosphere */}
        <g opacity="0.55">
          <circle cx="120" cy="45" r="1.5" fill="#FFF" />
          <circle cx="280" cy="70" r="1" fill="#FFF" />
          <circle cx="430" cy="35" r="2" fill="#FFF" opacity="0.8" />
          <circle cx="620" cy="60" r="1.5" fill="#FFF" />
          <circle cx="890" cy="40" r="1" fill="#FFF" />
          <circle cx="1080" cy="75" r="2" fill="#FFF" opacity="0.9" />
          <circle cx="1320" cy="50" r="1.5" fill="#FFF" />
          <circle cx="750" cy="90" r="1" fill="#FFF" />
        </g>

        {/* 2. Low Horizon Glowing Striped Sun */}
        <g filter="url(#vcGlow)">
          <circle
            cx="720"
            cy="420"
            r="140"
            fill="url(#vcSun)"
            mask="url(#vcSunMask)"
          />
        </g>

        {/* 3. Ocean / Horizon Water */}
        <rect y="500" width="1440" height="180" fill="url(#vcOcean)" />
        <polygon points="630,500 810,500 920,680 520,680" fill="url(#vcReflection)" />
        <line x1="560" y1="515" x2="880" y2="515" stroke="#F4977A" strokeWidth="1.5" opacity="0.4" />
        <line x1="520" y1="535" x2="920" y2="535" stroke="#E11D48" strokeWidth="1.5" opacity="0.35" />
        <line x1="470" y1="560" x2="970" y2="560" stroke="#38BDF8" strokeWidth="1" opacity="0.3" />
        <line x1="420" y1="595" x2="1020" y2="595" stroke="#E11D48" strokeWidth="1" opacity="0.25" />

        {/* 4. Pastel Art Deco Hotel Silhouettes on the Right */}
        <g opacity="0.92">
          {/* Hotel 1: Stepped Art Deco Tower */}
          <rect x="990" y="380" width="75" height="130" fill="#1C0E3E" />
          <rect x="1005" y="355" width="45" height="25" fill="#1C0E3E" />
          <rect x="1020" y="335" width="15" height="20" fill="#1C0E3E" />
          <line x1="1027" y1="335" x2="1027" y2="305" stroke="#38BDF8" strokeWidth="2" opacity="0.8" />
          <line x1="1027" y1="355" x2="1027" y2="500" stroke="#F43F5E" strokeWidth="2" opacity="0.6" />

          {/* Hotel 2: Rounded Ocean Drive Pavilion */}
          <rect x="1075" y="405" width="95" height="105" fill="#150B33" />
          <path d="M1075 405 Q1122 375 1170 405 Z" fill="#150B33" />
          <circle cx="1100" cy="425" r="3.5" fill="#38BDF8" opacity="0.6" />
          <circle cx="1122" cy="425" r="3.5" fill="#38BDF8" opacity="0.6" />
          <circle cx="1145" cy="425" r="3.5" fill="#38BDF8" opacity="0.6" />
          <circle cx="1100" cy="450" r="3.5" fill="#F4977A" opacity="0.6" />
          <circle cx="1122" cy="450" r="3.5" fill="#F4977A" opacity="0.6" />
          <circle cx="1145" cy="450" r="3.5" fill="#F4977A" opacity="0.6" />

          {/* Hotel 3: Classic Neon Pylon */}
          <rect x="1185" y="360" width="65" height="150" fill="#1A0D3A" />
          <rect x="1200" y="330" width="35" height="30" fill="#1A0D3A" />
          <polygon points="1217,290 1210,330 1224,330" fill="#38BDF8" opacity="0.75" />
          <line x1="1217" y1="330" x2="1217" y2="500" stroke="#38BDF8" strokeWidth="2" opacity="0.5" />

          {/* Hotel 4: Distant skyline blocks */}
          <rect x="1260" y="420" width="80" height="90" fill="#13092C" />
          <rect x="1350" y="435" width="70" height="75" fill="#100725" />
        </g>

        {/* 5. Layered Dark-Violet Palm Tree Silhouettes */}
        <g fill="#0D0622">
          {/* Left Palms */}
          <path d="M70 540 Q110 380 180 260 Q170 260 100 390 Q60 480 50 540 Z" />
          <path d="M180 260 Q260 210 320 250 Q250 260 180 260 Z" />
          <path d="M180 260 Q280 260 320 310 Q250 300 180 260 Z" />
          <path d="M180 260 Q230 330 250 380 Q210 340 180 260 Z" />
          <path d="M180 260 Q170 180 200 130 Q180 190 180 260 Z" />
          <path d="M180 260 Q110 180 70 170 Q120 220 180 260 Z" />
          <path d="M180 260 Q90 240 40 270 Q110 275 180 260 Z" />
          <path d="M180 260 Q100 300 60 350 Q120 320 180 260 Z" />

          <path d="M140 540 Q150 430 190 340 Q182 340 132 440 Q120 490 120 540 Z" fill="#140A2E" />
          <path d="M190 340 Q250 300 290 320 Q240 335 190 340 Z" fill="#140A2E" />
          <path d="M190 340 Q250 360 270 410 Q225 385 190 340 Z" fill="#140A2E" />
          <path d="M190 340 Q140 280 90 290 Q140 320 190 340 Z" fill="#140A2E" />
          <path d="M190 340 Q130 350 80 390 Q135 375 190 340 Z" fill="#140A2E" />

          {/* Right Palms */}
          <path d="M1390 540 Q1360 390 1290 280 Q1300 280 1370 400 Q1400 480 1410 540 Z" />
          <path d="M1290 280 Q1210 230 1150 270 Q1220 280 1290 280 Z" />
          <path d="M1290 280 Q1190 280 1150 330 Q1220 320 1290 280 Z" />
          <path d="M1290 280 Q1240 350 1220 400 Q1260 360 1290 280 Z" />
          <path d="M1290 280 Q1300 200 1270 150 Q1290 210 1290 280 Z" />
          <path d="M1290 280 Q1360 200 1400 190 Q1350 240 1290 280 Z" />
          <path d="M1290 280 Q1380 260 1430 290 Q1360 295 1290 280 Z" />
        </g>

        {/* 6. Dark Left-to-Right Readability Scrim (Ensures maximum contrast for hero text) */}
        <rect width="1440" height="680" fill="url(#vcReadabilityScrim)" />
      </svg>
    </div>
  );
}
