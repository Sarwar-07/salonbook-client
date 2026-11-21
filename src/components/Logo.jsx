import React from 'react';

/**
 * SalonBook Bespoke Luxury Brand Logo & Emblem
 *
 * @param {'default' | 'light'} variant - 'default' for light backgrounds, 'light' for dark backgrounds (#1C1917)
 * @param {boolean} showTagline - whether to display "HAUTE SALON & SPA" micro-tagline
 * @param {boolean} iconOnly - whether to render only the 40x40 SVG emblem
 * @param {string} className - extra wrapper CSS classes
 */
export default function Logo({
  variant = 'default',
  showTagline = false,
  iconOnly = false,
  className = '',
}) {
  const isLight = variant === 'light';

  const strokeColor = isLight ? '#F59E0B' : '#B45309';
  const strokeSecondary = isLight ? '#FBBF24' : '#D97706';
  const fillColor = isLight ? 'rgba(245, 158, 11, 0.08)' : 'rgba(180, 83, 9, 0.05)';
  const sparkleColor = isLight ? '#FDE68A' : '#D97706';

  const emblemSvg = (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={isLight ? 'goldGradLight' : 'goldGradDefault'}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={strokeSecondary} />
          <stop offset="100%" stopColor={strokeColor} />
        </linearGradient>
      </defs>

      {/* Outer Arch Frame */}
      <path
        d="M 8 36 L 8 18 C 8 11.37 13.37 6 20 6 C 26.63 6 32 11.37 32 18 L 32 36 C 32 36.55 31.55 37 31 37 L 9 37 C 8.45 37 8 36.55 8 36 Z"
        fill={fillColor}
        stroke={`url(#${isLight ? 'goldGradLight' : 'goldGradDefault'})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner Concentric Delicate Arch */}
      <path
        d="M 11 35 L 11 18 C 11 13 15 9 20 9 C 25 9 29 13 29 18 L 29 35"
        stroke={strokeSecondary}
        strokeWidth="0.75"
        strokeOpacity={isLight ? '0.6' : '0.45'}
        strokeDasharray="1.5 2"
        fill="none"
      />

      {/* Crown 4-Point Starlight Sparkle */}
      <path
        d="M 20 1 C 20 3.2 21.5 4.5 23.5 4.5 C 21.5 4.5 20 5.8 20 8 C 20 5.8 18.5 4.5 16.5 4.5 C 18.5 4.5 20 3.2 20 1 Z"
        fill={sparkleColor}
        stroke={strokeColor}
        strokeWidth="0.5"
      />

      {/* Center Botanical Lotus Petal */}
      <path
        d="M 20 32 C 18 26.5 18 20 20 14 C 22 20 22 26.5 20 32 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left Sweeping Ribbon Petal */}
      <path
        d="M 20 30 C 15.5 28.5 12 24.5 13 18.5 C 15 18 18 21.5 20 25.5"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Right Sweeping Ribbon Petal */}
      <path
        d="M 20 30 C 24.5 28.5 28 24.5 27 18.5 C 25 18 22 21.5 20 25.5"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Inner Radiant Gem Diamond at Core */}
      <polygon
        points="20,10.5 21.8,12.5 20,14.5 18.2,12.5"
        fill={sparkleColor}
      />

      {/* Pedestal Accent Filigree */}
      <line
        x1="13"
        y1="34"
        x2="27"
        y2="34"
        stroke={strokeSecondary}
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
    </svg>
  );

  if (iconOnly) {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {emblemSvg}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {emblemSvg}
      <div className="flex flex-col text-left leading-none">
        <span className="font-serif text-2xl font-bold tracking-tight">
          <span className={isLight ? 'text-[#FAF8F5]' : 'text-[#1C1917]'}>Salon</span>
          <span className={isLight ? 'text-[#F59E0B]' : 'text-[#B45309]'}>Book</span>
        </span>
        {showTagline && (
          <span
            className={`text-[9.5px] uppercase tracking-[0.25em] font-sans font-semibold mt-1 ${
              isLight ? 'text-stone-400' : 'text-stone-500'
            }`}
          >
            HAUTE SALON &amp; SPA
          </span>
        )}
      </div>
    </div>
  );
}
