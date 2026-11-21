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

  /* Fixed-size placeholder for SSR / before hydration */
  if (!mounted) {
    return <div className={`w-36 h-9 shrink-0 ${className}`} aria-hidden="true" />;
  }

  const isGta6 = theme === 'gta6';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isGta6}
      onClick={toggleTheme}
      aria-label={isGta6 ? 'Switch back to Atelier default luxury theme' : 'Switch to GTA Mode'}
      title={isGta6 ? 'Switch back to default Salon theme' : 'Switch to GTA Mode'}
      className={`relative inline-flex items-center justify-between w-36 h-9 rounded-full p-1 cursor-pointer select-none transition-all duration-300 shrink-0 ${
        isGta6
          ? 'border border-[#F7B286]/70'
          : 'bg-[#1C1917] border border-stone-600/80 shadow-inner'
      } ${className}`}
      style={
        isGta6
          ? {
              backgroundColor: '#160D30',
              boxShadow: '0 0 16px rgba(236,72,153,0.45), inset 0 1px 3px rgba(0,0,0,0.4)',
            }
          : undefined
      }
    >
      {/* Fixed track labels */}
      <span
        className={`text-[10px] font-extrabold tracking-widest uppercase z-10 px-2.5 transition-colors duration-300 ${
          isGta6 ? 'text-stone-500' : 'text-transparent'
        }`}
        aria-hidden="true"
      >
        SALON
      </span>
      <span
        className={`text-[10px] font-extrabold tracking-widest uppercase z-10 px-2 transition-colors duration-300 ${
          isGta6 ? 'text-transparent' : 'text-stone-500'
        }`}
        aria-hidden="true"
      >
        GTA VI
      </span>

      {/* Sliding thumb */}
      <span
        className={`absolute top-1 left-1 w-[68px] h-7 rounded-full transition-transform duration-300 ease-out flex items-center justify-center gap-1 shadow-md ${
          isGta6
            ? 'translate-x-[60px]'
            : 'translate-x-0 bg-[#C89B6E] text-[#1C1917]'
        }`}
        style={
          isGta6
            ? {
                background: 'linear-gradient(135deg, #FDE08D 0%, #F7B286 50%, #F472B6 100%)',
                color: '#1B103B',
              }
            : undefined
        }
        aria-hidden="true"
      >
        {isGta6 ? (
          <>
            <WantedStar className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black tracking-wider leading-none">GTA VI</span>
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            </svg>
            <span className="text-[10px] font-black tracking-wider leading-none">SALON</span>
          </>
        )}
      </span>
    </button>
  );
}
