'use client';

import React, { useSyncExternalStore, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

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

export default function ThemeToggle({ className = '' }) {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerThemeSnapshot);
  const mounted = useSyncExternalStore(subscribeMounted, getMountedSnapshot, getServerMountedSnapshot);

  // Synchronize the DOM class on <html> without calling setState
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

  // Fixed size placeholder on SSR / before hydration
  if (!mounted) {
    return <div className={`w-28 h-9 shrink-0 ${className}`} aria-hidden="true" />;
  }

  const isGta6 = theme === 'gta6';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isGta6 ? 'Switch back to Atelier default luxury theme' : 'Switch to GTA 6 Vice City theme'}
      title={isGta6 ? 'Switch back to Atelier default theme' : 'Switch to GTA 6 Vice City theme'}
      className={`relative inline-flex items-center justify-center gap-1.5 px-3 py-1.5 h-9 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer select-none active:scale-95 shrink-0 shadow-sm ${
        isGta6
          ? 'text-white border border-[#FF2E93]/80 shadow-[0_0_15px_rgba(255,46,147,0.55)] hover:shadow-[0_0_22px_rgba(0,240,255,0.7)]'
          : 'bg-[#FAF7F2] text-stone-700 hover:text-[#181512] border border-stone-300 hover:border-[#C89B6E] hover:bg-stone-50'
      } ${className}`}
      style={
        isGta6
          ? {
              background: 'linear-gradient(135deg, #FF2E93 0%, #FF7A00 50%, #00F0FF 100%)',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            }
          : undefined
      }
    >
      {isGta6 ? (
        <>
          {/* Neon Palm Tree Icon */}
          <svg className="w-4 h-4 fill-white drop-shadow-[0_0_4px_#FF2E93]" viewBox="0 0 24 24">
            <path d="M12 2c.4 1.5.3 3.1-.3 4.6 2.3-1.6 5.1-2.2 7.7-1.6-1.9 2-4.6 3.1-7.4 3 2.5 1.2 4.6 3.2 5.9 5.6-2.6-.5-5.2-1.8-7.1-3.6.4 2.8.1 5.7-.9 8.3L8.5 22l-.9-7.5c-1.9 1.8-4.5 3.1-7.1 3.6 1.3-2.4 3.4-4.4 5.9-5.6-2.8.1-5.5-1-7.4-3 2.6-.6 5.4 0 7.7 1.6-.6-1.5-.7-3.1-.3-4.6 1.8 1.4 3.8 2.3 5.6 2.3 1.8 0 3.8-.9 5.6-2.3z" />
          </svg>
          <span className="font-extrabold tracking-widest text-white">Vice 6: ON</span>
        </>
      ) : (
        <>
          <Sparkles className="w-3.5 h-3.5 text-[#C89B6E]" />
          <span className="font-semibold text-stone-700">Vice 6 Mode</span>
        </>
      )}
    </button>
  );
}
