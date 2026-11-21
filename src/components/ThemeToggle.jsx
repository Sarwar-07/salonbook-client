'use client';

import React, { useSyncExternalStore, useEffect } from 'react';

function subscribe(callback) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('salonbook-theme-change', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('salonbook-theme-change', callback);
    window.removeEventListener('storage', callback);
  };
}

function getThemeSnapshot() {
  if (typeof window === 'undefined') return 'atelier';
  try {
    return localStorage.getItem('salonbook-theme') === 'gta6' ? 'gta6' : 'atelier';
  } catch {
    return 'atelier';
  }
}

function getServerThemeSnapshot() {
  return 'atelier';
}

function subscribeMounted() {
  return () => {};
}

function getMountedSnapshot() {
  return true;
}

function getServerMountedSnapshot() {
  return false;
}

/* GTA wanted-star SVG (5-point) */
function WantedStar({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.9 6.3L22 9.2l-5 5.1L18.2 22 12 18.5 5.8 22 7 14.3l-5-5.1 7.1-.9z" />
    </svg>
  );
}

/* Crisp 4-point sparkle diamond icon */
function SparkleDiamond({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}

export default function ThemeToggle({ className = '' }) {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerThemeSnapshot);
  const mounted = useSyncExternalStore(subscribeMounted, getMountedSnapshot, getServerMountedSnapshot);

  useEffect(() => {
    if (theme === 'gta6') {
      document.documentElement.classList.add('gta6');
    } else {
      document.documentElement.classList.remove('gta6');
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'gta6' ? 'atelier' : 'gta6';
    try {
      localStorage.setItem('salonbook-theme', nextTheme);
    } catch {
      // ignore
    }

    if (nextTheme === 'gta6') {
      document.documentElement.classList.add('gta6');
    } else {
      document.documentElement.classList.remove('gta6');
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('salonbook-theme-change', {
          detail: { theme: nextTheme },
        })
      );
    }
  };

  /* Symmetrical fixed-size placeholder for SSR / before hydration */
  if (!mounted) {
    return <div className={`w-[156px] h-10 shrink-0 ${className}`} aria-hidden="true" />;
  }

  const isGta6 = theme === 'gta6';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isGta6}
      onClick={toggleTheme}
      aria-label={isGta6 ? 'Switch back to Atelier default luxury theme' : 'Switch to GTA Mode'}
      title={isGta6 ? 'Switch back to Atelier default theme' : 'Switch to GTA Mode'}
      className={`w-[156px] h-10 rounded-full p-1 relative inline-flex items-center justify-between cursor-pointer select-none transition-all duration-300 shrink-0 ${
        isGta6
          ? 'bg-[#160D30] border border-[#F7B286]/80 shadow-[0_0_18px_rgba(236,72,153,0.45)]'
          : 'bg-[#F5EFE6] border border-[#C89B6E]/60 shadow-[inset_0_1px_2px_rgba(24,21,18,0.08)]'
      } ${className}`}
    >
      {/* Symmetrical Track Labels */}
      <span
        className={`text-[10px] font-extrabold tracking-widest uppercase z-10 w-[70px] text-center transition-colors duration-300 ${
          isGta6 ? 'text-[#E9D5FF]' : 'text-transparent'
        }`}
        aria-hidden="true"
      >
        SALON
      </span>

      <span
        className={`text-[10px] font-extrabold tracking-widest uppercase z-10 w-[70px] text-center transition-colors duration-300 ${
          isGta6 ? 'text-transparent' : 'text-[#4A3728]'
        }`}
        aria-hidden="true"
      >
        GTA
      </span>

      {/* Symmetrical Sliding Thumb */}
      <span
        className={`absolute top-1 left-1 w-[70px] h-8 rounded-full transition-transform duration-300 ease-out flex items-center justify-center gap-1.5 shadow-md z-20 ${
          isGta6
            ? 'translate-x-[74px] bg-gradient-to-r from-[#FDE08D] via-[#F7B286] to-[#F472B6] text-[#1B103B]'
            : 'translate-x-0 bg-gradient-to-r from-[#A85A32] via-[#C89B6E] to-[#B87A4B] text-white'
        }`}
        aria-hidden="true"
      >
        {isGta6 ? (
          <>
            <WantedStar className="w-3.5 h-3.5 text-[#1B103B]" />
            <span className="text-[10px] font-black tracking-wider leading-none text-[#1B103B]">GTA</span>
          </>
        ) : (
          <>
            <SparkleDiamond className="w-3.5 h-3.5 text-white" />
            <span className="text-[10px] font-black tracking-wider leading-none text-white">SALON</span>
          </>
        )}
      </span>
    </button>
  );
}
