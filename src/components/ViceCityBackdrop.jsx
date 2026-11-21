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
          {/* Authentic GTA VI Key Art Leonida Dusk Sky Gradient:
              #5B4296 (twilight periwinkle) -> #D4729C (flamingo rose) -> #F8B385 (golden peach horizon) */}
          <linearGradient id="vcSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5B4296" />
            <stop offset="46%" stopColor="#D4729C" />
            <stop offset="82%" stopColor="#F8B385" />
            <stop offset="100%" stopColor="#FCE7BA" />
          </linearGradient>

          {/* Soft Horizon Sun Radiance */}
          <radialGradient id="vcSunGlow" cx="62%" cy="72%" r="48%">
            <stop offset="0%" stopColor="#FFF2B2" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#F8B385" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#D4729C" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#5B4296" stopOpacity="0" />
          </radialGradient>

          {/* Ocean Water Gradient */}
          <linearGradient id="vcOcean" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2D1A4E" />
            <stop offset="45%" stopColor="#22123D" />
            <stop offset="100%" stopColor="#160B2B" />
          </linearGradient>

          {/* Water Sun Reflection Gradient */}
          <linearGradient id="vcReflection" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8B385" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#D4729C" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FCE7BA" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* 1. Sky Canvas (Vibrant, sun-drenched sunset sky without heavy black veil) */}
        <rect width="1440" height="515" fill="url(#vcSky)" />
        <rect width="1440" height="515" fill="url(#vcSunGlow)" />

        {/* 2. Distant Flying Birds (Seagulls from GTA VI Key Art) */}
        <g fill="#4B367C" opacity="0.68">
          {/* Bird 1 */}
          <path d="M590 135 Q605 118 622 134 Q638 118 654 135 Q638 127 622 139 Q605 127 590 135 Z" />
          {/* Bird 2 (Lower Left) */}
          <path d="M575 165 Q587 150 600 164 Q614 150 626 165 Q614 158 600 168 Q587 158 575 165 Z" />
          {/* Bird 3 (Small High Distant) */}
          <path d="M660 110 Q669 98 678 109 Q688 98 698 110 Q688 104 678 113 Q669 104 660 110 Z" />
        </g>

        {/* 3. Pastel Lavender Vice City High-Rise Skyline */}
        {/* Layer A: Far Distant Pastel Towers */}
        <g fill="#9372B0" opacity="0.55">
          <rect x="70" y="445" width="40" height="70" />
          <rect x="115" y="430" width="30" height="85" />
          <rect x="150" y="455" width="45" height="60" />
          <polygon points="125,410 135,410 130,430" />
          <rect x="230" y="440" width="55" height="75" />
          <rect x="310" y="435" width="40" height="80" />
          <rect x="360" y="420" width="50" height="95" />
          <polygon points="380,395 390,395 385,420" />
          <rect x="420" y="450" width="60" height="65" />
        </g>

        {/* Layer B: Midground Twilight Lavender Skyline */}
        <g fill="#5F3B82" opacity="0.85">
          {/* Left Cluster */}
          <rect x="90" y="460" width="50" height="55" />
          <rect x="145" y="440" width="40" height="75" />
          <rect x="200" y="465" width="60" height="50" />
          <rect x="280" y="450" width="45" height="65" />
          <rect x="340" y="435" width="65" height="80" />
          <rect x="355" y="415" width="35" height="20" />
          <line x1="372" y1="415" x2="372" y2="390" stroke="#F8B385" strokeWidth="1.5" opacity="0.75" />

          {/* Right Skyline (Ocean Drive towers) */}
          <rect x="980" y="410" width="65" height="105" />
          <rect x="995" y="385" width="35" height="25" />
          <line x1="1012" y1="385" x2="1012" y2="360" stroke="#FCE7BA" strokeWidth="1.5" opacity="0.75" />
          <rect x="1055" y="430" width="85" height="85" />
          <path d="M1055 430 Q1097 405 1140 430 Z" />
          <rect x="1150" y="390" width="60" height="125" />
          <polygon points="1175,360 1185,360 1180,390" />
          <rect x="1220" y="425" width="70" height="90" />
          <rect x="1300" y="445" width="85" height="70" />
        </g>

        {/* 4. Ocean / Coastal Water Reflection */}
        <rect y="510" width="1440" height="170" fill="url(#vcOcean)" />
        <polygon points="560,510 880,510 1020,680 420,680" fill="url(#vcReflection)" />
        <line x1="500" y1="525" x2="940" y2="525" stroke="#F8B385" strokeWidth="1.5" opacity="0.5" />
        <line x1="460" y1="545" x2="980" y2="545" stroke="#D4729C" strokeWidth="1.5" opacity="0.4" />
        <line x1="410" y1="570" x2="1030" y2="570" stroke="#FCE7BA" strokeWidth="1.2" opacity="0.35" />
        <line x1="350" y1="605" x2="1090" y2="605" stroke="#F8B385" strokeWidth="1" opacity="0.25" />

        {/* 5. Layered Dark-Plum Palm Tree Silhouettes (Framing Both Edges) */}
        <g fill="#1A0E30">
          {/* LEFT PALMS */}
          <path d="M60 540 Q100 380 180 250 Q170 250 90 390 Q50 480 40 540 Z" />
          <path d="M180 250 Q265 200 325 240 Q255 250 180 250 Z" />
          <path d="M180 250 Q285 250 325 300 Q255 290 180 250 Z" />
          <path d="M180 250 Q235 320 255 370 Q215 330 180 250 Z" />
          <path d="M180 250 Q170 170 200 120 Q180 180 180 250 Z" />
          <path d="M180 250 Q110 170 70 160 Q120 210 180 250 Z" />
          <path d="M180 250 Q90 230 40 260 Q110 265 180 250 Z" />
          <path d="M180 250 Q100 290 60 340 Q120 310 180 250 Z" />

          {/* Secondary Left Palm */}
          <path d="M130 540 Q145 425 190 330 Q182 330 128 435 Q115 485 115 540 Z" fill="#251645" />
          <path d="M190 330 Q255 290 295 310 Q245 325 190 330 Z" fill="#251645" />
          <path d="M190 330 Q255 350 275 400 Q230 375 190 330 Z" fill="#251645" />
          <path d="M190 330 Q140 270 90 280 Q140 310 190 330 Z" fill="#251645" />
          <path d="M190 330 Q130 340 80 380 Q135 365 190 330 Z" fill="#251645" />

          {/* RIGHT PALMS */}
          <path d="M1400 540 Q1370 385 1295 270 Q1305 270 1380 395 Q1410 480 1420 540 Z" />
          <path d="M1295 270 Q1215 220 1155 260 Q1225 270 1295 270 Z" />
          <path d="M1295 270 Q1195 270 1155 320 Q1225 310 1295 270 Z" />
          <path d="M1295 270 Q1245 340 1225 390 Q1265 350 1295 270 Z" />
          <path d="M1295 270 Q1305 190 1275 140 Q1295 200 1295 270 Z" />
          <path d="M1295 270 Q1365 190 1405 180 Q1355 230 1295 270 Z" />
          <path d="M1295 270 Q1385 250 1435 280 Q1365 285 1295 270 Z" />

          {/* Secondary Right Palm */}
          <path d="M1330 540 Q1320 435 1275 340 Q1283 340 1335 440 Q1345 490 1345 540 Z" fill="#251645" />
          <path d="M1275 340 Q1210 300 1170 320 Q1220 335 1275 340 Z" fill="#251645" />
          <path d="M1275 340 Q1210 360 1190 410 Q1235 385 1275 340 Z" fill="#251645" />
          <path d="M1275 340 Q1325 280 1375 290 Q1325 320 1275 340 Z" fill="#251645" />
        </g>
      </svg>
    </div>
  );
}
